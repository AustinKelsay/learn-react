import React from "react";
import "./Buttons.css";

export const Buttons = () => {
  return (
    <div className="buttons">
      <button onClick={() => alert("Send")}>Send</button>
      <button onClick={() => alert("Receive")}>Receive</button>
    </div>
  );
};

export default Buttons;
