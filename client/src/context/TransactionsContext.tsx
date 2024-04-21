import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { ethers } from "ethers";
// import ethers from "ethers";

import { contractABI, contractAddress } from "../utils/contracts";
import { TransactionTypes } from "ethers/lib/utils";

type TransactionProviderType = { children: ReactNode };

export const TransactionContext = createContext({ value: "" });

const { ethereum } = window;

const getEthereumContract = () => {
  const porvider = new ethers.providers.Web3Provider(ethereum);
  const signer = porvider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  console.log({
    porvider,
    signer,
    transactionContract,
  });
};

export const TransactionProvider = ({ children }: TransactionProviderType) => (
  <TransactionContext.Provider value={{ value: "hiuuu man" }}>
    {children}
  </TransactionContext.Provider>
);

export const TransactionContextProvider = () => useContext(TransactionContext);
