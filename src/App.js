import React, { useEffect, useState } from "react";
import ChartImage from "./assets/BTCUSD.png";
import Buttons from "./components/Buttons";
import Transactions from "./components/Transactions";
import axios from "axios";
import "./App.css";

function App() {
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const headers = {
      "X-Api-Key": "f007cbf3992046f8ae00be3c7bc58b37",
    };
    axios
      .get("https://legend.lnbits.com/api/v1/wallet", { headers })
      .then((res) => {
        console.log(res.data);
        setBalance(res.data.balance);
      })
      .catch((err) => console.log(err));
  }, []);

  setTimeout(() => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      .then((res) => {
        setPrice(res.data.data.amount);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000);

  return (
    <div className="App">
      <header>
        <h1>pleb wallet</h1>
      </header>
      <Buttons />
      <div className="row">
        <div className="balance-card">
          <h2>Balance</h2>
          <p>{balance} sats</p>
        </div>
        <div className="balance-card">
          <h2>Price</h2>
          <p>${price}</p>
        </div>
      </div>
      <div className="row">
        <div className="row-item">
          <Transactions />
        </div>
        <div className="row-item">
          <img src={ChartImage} alt="chart" />
        </div>
      </div>
      <footer>
        <p>Made by plebs, for plebs.</p>
      </footer>
    </div>
  );
}

export default App;
