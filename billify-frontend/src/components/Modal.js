import React from "react";

const Modal = (props) => {
  const {
    handleCloseDialog,
    handleConfirm,
    disableConfirmBtn,
    handleAddExpenseChange,
    newExpense,
  } = props;

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
            <button className="close" onClick={handleCloseDialog}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex flex-column">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="item">Item: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="item"
                      name="item"
                      value={newExpense.item}
                      onChange={handleAddExpenseChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="qty">Qty: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="qty"
                      name="quantity"
                      value={newExpense.quantity}
                      onChange={handleAddExpenseChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="amount">Amount: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="amount"
                      name="cost"
                      value={newExpense.cost}
                      onChange={handleAddExpenseChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-danger"
              onClick={handleCloseDialog}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleConfirm}
              disabled={disableConfirmBtn}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
