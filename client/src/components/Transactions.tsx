import { TransactionContextProvider } from "../context/TransactionsContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/DummyData.json";
import { shortenAddress } from "../utils/ShortenAddress";
type TransactionsCardType = {
  addressTo?: string;
  addressFrom?: string;
  timestamp?: string;
  keyword?: string;
  url?: string;
  message: string;
  amount: { _hex: string } | string;
};
const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}: TransactionsCardType) => {
  const gifUrl = useFetch({ keyword } as { keyword: string });

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[350px]
      2xl:max-w-[400px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full">
        <div className="display-flex justify-start w-full mb-2 p-2">
          <a
            href={`https://sepolia.etherscan.io/tx/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              <span className="text-gray-300">From:</span>{" "}
              {shortenAddress(addressFrom as string)}
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/tx/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              <span className="text-gray-300">To:</span>{" "}
              {shortenAddress(addressTo as string)}
            </p>
          </a>
          <p className="text-white text-base">
            <span className="text-gray-300">Amount:</span> {amount as string}{" "}
            ETH
          </p>
          {message && (
            <>
              <p className="text-white text-base mt-3">
                <span className="text-gray-300">Message:</span> {message}
              </p>
            </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = TransactionContextProvider();
  const transactionsData = transactions.length ? transactions : dummyData;

  return (
    <div
      id="transactions"
      className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions"
    >
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactionsData.reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
