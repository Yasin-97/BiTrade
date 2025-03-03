import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TransactionProvider } from "./context/TransactionsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>
);
