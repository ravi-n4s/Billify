import React from "react";

const Modal = (props) => {
  const { handleCloseDialog, handleConfirm, enableConfirm } = props;

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
            <h5 className="modal-title">Add new expense</h5>
            <button
              className="close"
              onClick={handleCloseDialog}
              disabled={enableConfirm}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex flex-column">
            <table>
              <tr>
                <td>
                  <label htmlFor="item">Item: </label>
                </td>
                <td>
                  <input type="text" id="item" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="qty">Qty: </label>
                </td>
                <td>
                  <input type="text" id="qty" />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="amount">Amount: </label>
                </td>
                <td>
                  <input type="text" id="amount" />
                </td>
              </tr>
            </table>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-danger"
              onClick={handleCloseDialog}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
