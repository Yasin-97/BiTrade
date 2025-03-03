import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  ChangeEvent,
} from "react";
import { ethers } from "ethers";
// import ethers from "ethers";

import { contractABI, contractAddress } from "../utils/contracts";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}

type TransactionProviderType = { children: ReactNode };
type transactionType = {
  addressTo?: string;
  receiver?: string;
  sender?: string;
  addressFrom?: string;
  timestamp?: string;
  message: string;
  keyword: string;
  amount: { _hex: string } | string;
};

type FromDataType = Omit<transactionType, "addressFrom" | "timestamp">;

type TransactionContextType = {
  currentAccount: string | null;
  connectWallet: () => Promise<void>;
  sendTransaction: () => Promise<void>;
  handleChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
  formData: FromDataType;
  isLoading: boolean;
  transactions: transactionType[];
  transactionCount: string | null;
};

export const TransactionContext = createContext<TransactionContextType>({
  currentAccount: null,
  connectWallet: async () => {
    throw new Error("connectWallet function not implemented");
  },
  sendTransaction: async () => {
    throw new Error("sendTransaction function not implemented");
  },
  handleChange: () => {
    throw new Error("handleChange function not implemented");
  },
  formData: {
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  },
  transactions: [
    {
      addressTo: "",
      amount: "",
      keyword: "",
      message: "",
    },
  ],
  transactionCount: null,
  isLoading: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { ethereum } = window;

const createEthereumContract = () => {
  const porvider = new ethers.providers.Web3Provider(ethereum);
  const signer = porvider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }: TransactionProviderType) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>("");
  const [formData, setFormData] = useState<transactionType>({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    console.log("hte data", formData);

    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const checkIfWalletIsConnected: () => Promise<void> = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      }
    } catch (error) {
      throw new Error("No ethereum object");
    }
  };

  const connectWallet: () => Promise<void> = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts: string[] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("Please install Matamask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = createEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount as string);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        keyword,
        message
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash();
      console.log(`Success - ${transactionHash.hash}`);
      setIsLoading(false);

      const transactionCount = await transactionsContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      throw new Error("No ethereum object");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction: transactionType) => {
            let _amount;
            if (
              typeof transaction.amount === "object" &&
              transaction.amount &&
              "_hex" in transaction.amount
            ) {
              _amount = transaction.amount._hex;
            }
            return {
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(
                +(transaction.timestamp as string) * 1000
              ).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(_amount as string) / 10 ** 18,
            };
          }
        );
        console.log(structuredTransactions);
        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionExists = async () => {
    try {
      if (ethereum) {
        const transactionContract = createEthereumContract();
        const currentTransactionCount =
          await transactionContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        handleChange,
        formData,
        isLoading,
        sendTransaction,
        transactions,
        transactionCount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const TransactionContextProvider = () => useContext(TransactionContext);
