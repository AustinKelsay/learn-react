import React from "react";
import axios from "axios";
import "./Buttons.css";

export const Buttons = () => {
  const handleSend = () => {
    const headers = {
      "X-Api-Key": "52cac212fc664da393ac45df991fdb84",
    };
    const data = {
      amount: 1000,
      memo: "test",
      out: false,
    };
    axios
      .post("https://legend.lnbits.com/api/v1/payments", data, { headers })
      .then((res) => alert(res.data.payment_request))
      .catch((err) => console.log(err));

    return;
  };

  const handleReceive = () => {};

  return (
    <div className="buttons">
      <button onClick={() => handleSend()}>Send</button>
      <button onClick={() => alert("Receive")}>Receive</button>
    </div>
  );
};

export default Buttons;
