import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Buttons.css";

const customStyles = {
  content: {
    top: "20%",
    left: "40%",
    right: "40%",
    bottom: "auto",
  },
};

export const Buttons = () => {
  const [modalState, setModalState] = useState({
    type: "",
    open: false,
  });

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

  useEffect(() => {
    console.log(modalState.type);
  }, [modalState.type]);

  const handleReceive = () => {};

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="buttons">
        <button
          className="button"
          onClick={() =>
            setModalState({
              type: "send",
              open: true,
            })
          }
        >
          Send
        </button>
        <button
          className="button"
          onClick={() =>
            setModalState({
              type: "receive",
              open: true,
            })
          }
        >
          Receive
        </button>
      </div>

      <Modal
        isOpen={modalState.open}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p
          className="close-button"
          onClick={() =>
            setModalState({
              type: "",
              open: false,
            })
          }
        >
          X
        </p>
        <form
          style={{
            margin: "2% auto",
          }}
        >
          {modalState.type === "send" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <label>paste an invoice</label>
              <input type="text" name="invoice" />
              <button className="button" onClick={() => handleSend()}>
                Send
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <label>enter amount</label>
              <input type="number" name="invoice" min="0" />
              <button className="button" onClick={() => handleSend()}>
                Send
              </button>
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default Buttons;
