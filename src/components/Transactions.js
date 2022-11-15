import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transactions.css";

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const headers = {
      "X-Api-Key": "52cac212fc664da393ac45df991fdb84",
    };
    axios
      .get("https://legend.lnbits.com/api/v1/payments", { headers })
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // A function to turn each of our transactions into the correct table row
  const parseTx = (tx) => {
    // turn unix timestamp into a date
    // Todo: format date further to include hours, minutes, and seconds
    const date = new Date(tx.time * 1000);
    const formattedDate = date.toLocaleDateString("en-US");

    if (tx.amount > 0) {
      if (tx.pending) return null;
      return (
        <div className="tx-item">
          <p>Received from {tx.bolt11.substring(0, 25)}...</p>
          <p>+{tx.amount / 1000} sats</p>
          <p className="transaction-date">{formattedDate}</p>
        </div>
      );
    }

    if (tx.amount < 0) {
      if (
        tx.preimage !==
        "0000000000000000000000000000000000000000000000000000000000000000"
      )
        return null;
      return (
        <div className="tx-item">
          <p>Sent with {tx.bolt11.substring(0, 25)}...</p>
          <p className="tx-amount">{tx.amount / 1000} sats</p>
          <p className="transaction-date">{formattedDate}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h3>Transactions</h3>
      {transactions.map((transaction) => {
        return parseTx(transaction);
      })}
    </div>
  );
};

export default Transactions;
