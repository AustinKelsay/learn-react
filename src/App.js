import React, { useEffect, useState } from "react";
import ChartImage from "./assets/BTCUSD.png";
import Buttons from "./components/Buttons";
import Transactions from "./components/Transactions";
import axios from "axios";
import "./App.css";

function App() {
  // useState lets us store/update data inside of this component
  // Though this data will be lost on a refresh since we dont have a database
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(null);

  const getPrice = () => {
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      .then((res) => {
        setPrice(res.data.data.amount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect is a 'hook' or special function that will run code based on a trigger
  // On line 29 the brackets hold the trigger
  // Since it is empty [] that means this code will run every time the page is refreshed
  // So now we can call the LNBits API when the page loads to get our current wallet balance
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

  // Get the price on page load
  useEffect(() => {
    getPrice();
  }, []);

  // Call the API to get the price of BTC every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getPrice();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
