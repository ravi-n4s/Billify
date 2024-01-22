import React, { useState } from "react";

const Settings = (props) => {
  const {
    header = "Settings",
    cancelBtnText = "Cancel",
    confirmBtnText = "Save",
    handleConfirm,
    handleCloseModal,
    disableConfirmBtn,
    paymentDetails,
    setPaymentDetails,
    deletePayment,
    newPaymentDetail,
    handleNewPaymentDetailChange,
  } = props;

  const [addClicked, setAddClicked] = useState(false);

  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{header}</h5>
            <button className="close" onClick={handleCloseModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex flex-column">
            {paymentDetails.map((payment) => (
              <div className="d-flex justify-content-evenly" key={payment.id}>
                <div className="text-center d-flex align-content-center">
                  <i
                    className="bi-trash3-fill text-danger"
                    onClick={(e) => deletePayment(payment.id)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
                <div
                  name="paymentDetails"
                  id="paymentDetails"
                  className="border border-dark border-1 rounded-3 p-1 m-1"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                >
                  <pre> {payment.details}</pre>
                </div>
              </div>
            ))}
            {addClicked && (
              <textarea
                className="m-2"
                rows="4"
                name="newPaymentDetail"
                value={newPaymentDetail}
                onChange={(e) => handleNewPaymentDetailChange(e)}
                autoFocus
              ></textarea>
            )}
            {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
            {!addClicked && (
              <button
                className="btn btn-warning col-2 rounded-pill"
                onClick={() => {
                  setAddClicked(true);
                }}
              >
                Add
              </button>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-danger"
              onClick={handleCloseModal}
            >
              {cancelBtnText}
            </button>
            {confirmBtnText && (
              <button
                className="btn btn-primary"
                onClick={handleConfirm}
                disabled={disableConfirmBtn}
              >
                {confirmBtnText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
