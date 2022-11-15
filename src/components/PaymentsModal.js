import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./PaymentsModal.css";

const customStyles = {
  content: {
    top: "20%",
    left: "40%",
    right: "40%",
    bottom: "auto",
  },
};

const PaymentsModal = ({ modalState, setModalState }) => {
  const [formData, setFormData] = useState({
    amount: 0,
    invoiceToPay: "",
  });
  const [invoice, setInvoice] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({
    paymentHash: "",
    checkingId: "",
  });

  const handleSend = (e) => {
    // Keep the page from refreshing when the form is submitted
    e.preventDefault();

    const headers = {
      "X-Api-Key": "52cac212fc664da393ac45df991fdb84",
    };
    const data = {
      bolt11: formData.invoiceToPay,
      out: true,
    };
    axios
      .post("https://legend.lnbits.com/api/v1/payments", data, { headers })
      .then((res) =>
        setPaymentInfo({
          paymentHash: res.data.payment_hash,
          checkingId: res.data.checking_id,
        })
      )
      .catch((err) => console.log(err));

    return;
  };

  const handleReceive = (e) => {
    // Keep the page from refreshing when the form is submitted
    e.preventDefault();

    const headers = {
      "X-Api-Key": "52cac212fc664da393ac45df991fdb84",
    };
    const data = {
      amount: formData.amount,
      out: false,
      memo: "LNBits",
    };
    axios
      .post("https://legend.lnbits.com/api/v1/payments", data, { headers })
      .then((res) => setInvoice(res.data.payment_request))
      .catch((err) => console.log(err));

    return;
  };

  // Function to clear all of our state when we close the modal
  const clearForms = () => {
    setModalState({
      type: "",
      open: false,
    });
    setInvoice("");
    setPaymentInfo({
      paymentHash: "",
      checkingId: "",
    });
    setFormData({
      amount: 0,
      invoiceToPay: "",
    });
  };

  return (
    <Modal
      isOpen={modalState.open}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <p
        className="close-button"
        onClick={() => {
          clearForms();
        }}
      >
        X
      </p>
      {/* If it is a send */}
      {modalState.type === "send" && (
        <form>
          <label>paste an invoice</label>
          <input
            type="text"
            value={formData.invoiceToPay}
            onChange={(e) =>
              setFormData({ ...formData, invoiceToPay: e.target.value })
            }
          />
          <button className="button" onClick={(e) => handleSend(e)}>
            Submit
          </button>
        </form>
      )}
      {/* If it is a receive */}
      {modalState.type === "receive" && (
        <form>
          <label>enter amount</label>
          <input
            type="number"
            min="0"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
          <button className="button" onClick={(e) => handleReceive(e)}>
            Submit
          </button>
        </form>
      )}
      {/* If we are displaying our newly created invoice */}
      {invoice && (
        <section>
          <h3>Invoice created</h3>
          <p>{invoice}</p>
          {/* ToDo: Create a QR code out of this invoice as well */}
        </section>
      )}
      {/* If we are displaying the status of our successful payment */}
      {paymentInfo.paymentHash && (
        <section>
          <h3>Payment sent</h3>
          <p>Payment hash: {paymentInfo.paymentHash}</p>
          <p>Checking id: {paymentInfo.checkingId}</p>
        </section>
      )}
    </Modal>
  );
};

export default PaymentsModal;
