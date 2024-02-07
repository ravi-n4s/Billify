import { useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../config";
import Settings from "./Settings";
import { toast } from "react-toastify";
import {
  createPayment,
  deletePaymentById,
  readAllPayments,
} from "../services/paymentDetailService";
import { payment } from "../model/payment";

const Menu = (props) => {
  const [showSettings, setShowSettings] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState([payment]);
  const [newPaymentDetail, setNewPaymentDetail] = useState("");

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  // const handleChange = (e, field) => {
  //   const { value } = e.target;
  // };

  // const addPayment = () => {
  //   setPaymentDetails([...paymentDetails, payment]);
  // };

  const handleSave = () => {
    // if (newPaymentDetail !== "") {
    //   setPaymentDetails([...paymentDetails, { details: newPaymentDetail }]);
    // }
    handleCloseSettings();
    toast.promise(createPayment({ details: newPaymentDetail }), {
      pending: "Saving payment details...",
      success: "Payment details saved successfully",
      error: "Error saving payment details",
    });
    setNewPaymentDetail("");
  };

  const getPaymentDetails = async () => {
    const paymentDetails = await readAllPayments();
    setPaymentDetails(paymentDetails);
  };

  const handleNewPaymentDetailChange = (e) => {
    setNewPaymentDetail(e.target.value);
  };

  const deletePayment = async (id) => {
    {
      if (window.confirm("Are you sure you want to delete this payment? "))
        toast.promise(
          deletePaymentById(id).then(() => {
            setPaymentDetails(
              paymentDetails.filter((payment) => payment.id !== id)
            );
          }),
          {
            pending: "Deleting payment details...",
            success: "Payment details deleted successfully",
            error: "Error deleting payment details",
          }
        );
    }
  };

  return (
    <div
      style={{
        // backgroundColor: "#f0f0f0", // Replace with your desired color code
        // minHeight: "100vh", // Ensure the body covers the full height of the viewport
        margin: 0, // Reset default body margin
        padding: 0, // Reset default body padding
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand ms-2 ms-md-3">
            {config.brand}
          </Link>
          <div className="d-flex align-items-center">
            <i
              className="bi bi-gear-fill text-white ms-auto me-2 me-md-3"
              style={{ cursor: "pointer" }}
              onClick={() => {
                getPaymentDetails();
                setShowSettings(true);
              }}
            ></i>
          </div>
          {showSettings && (
            <Settings
              handleCloseModal={handleCloseSettings}
              handleConfirm={handleSave}
              header="Payment Details"
              confirmBtnText="Save"
              paymentDetails={paymentDetails}
              setPaymentDetails={setPaymentDetails}
              deletePayment={deletePayment}
              newPaymentDetail={newPaymentDetail}
              handleNewPaymentDetailChange={handleNewPaymentDetailChange}
            />
          )}
        </div>
      </nav>
      {props.children}
    </div>
  );
};

export default Menu;
