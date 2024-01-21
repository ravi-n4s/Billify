import React from "react";

const ExpenseModal = (props) => {
  const {
    handleCloseDialog,
    handleConfirm,
    disableConfirmBtn,
    handleModalOnChange,
    newExpense,
    confirmBtnText,
    header,
    cancelBtnText,
    removeExpense,
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
            <h5 className="modal-title">{header}</h5>
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
                      value={newExpense?.item ?? ""}
                      onChange={handleModalOnChange}
                      autoFocus
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
                      value={newExpense?.quantity ?? ""}
                      onChange={handleModalOnChange}
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
                      value={newExpense?.cost ?? ""}
                      onChange={handleModalOnChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                cancelBtnText === "Remove"
                  ? removeExpense()
                  : handleCloseDialog();
              }}
            >
              {cancelBtnText}
            </button>
            <button
              className="btn btn-primary"
              onClick={handleConfirm}
              disabled={disableConfirmBtn}
            >
              {confirmBtnText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
