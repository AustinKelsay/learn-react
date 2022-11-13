import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Transactions.css";

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const headers = {
      "X-Api-Key": "f007cbf3992046f8ae00be3c7bc58b37",
    };
    axios
      .get("https://legend.lnbits.com/api/v1/payments", { headers })
      .then((res) => {
        console.log(res.data);
        // Divide our balance by 1000 since it is denomiated in millisats
        setTransactions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const parseTx = (tx) => {
    if (tx.amount > 0) {
      if (tx.pending) return null;
      // turn unix timestamp into a date with utc time
      const date = new Date(tx.time * 1000);
      const formattedDate = date.toLocaleDateString("en-US");
      return (
        <div className="tx-item">
          <p>Received from {tx.bolt11}</p>
          <p>+ {tx.amount / 1000} sats</p>
          <p className="transaction-date">{formattedDate}</p>
        </div>
      );
    }

    if (tx.amount < 0) {
      if (
        tx.preimage ===
        "0000000000000000000000000000000000000000000000000000000000000000"
      )
        return null;
      return (
        <div className="tx-item">
          <p>Sent with {tx.bolt11}</p>
          <p className="tx-amount">- {tx.amount / 1000} sats</p>
          <p className="tx-date">{tx.time}</p>
        </div>
      );
    }
  };

  return (
    <div>
      {transactions.map((transaction) => {
        return parseTx(transaction);
      })}
    </div>
  );
};

export default Transactions;
