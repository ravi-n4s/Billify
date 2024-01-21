const EventModal = (props) => {
  const {
    handleCloseEventModal,
    handleConfirm,
    disableConfirmBtn,
    handleChange,
    header,
    cancelBtnText,
    confirmBtnText,
    event,
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
            <button className="close" onClick={handleCloseEventModal}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body d-flex flex-column">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">
                      Event name<span className="text-danger">*</span>:{" "}
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={event.name}
                      onChange={handleChange}
                      autoFocus
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="clientName">Client name: </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="clientName"
                      name="client.name"
                      value={event.client?.name ?? ""}
                      onChange={(e) => {
                        handleChange(e, "client.name");
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="clientAddress">Client address: </label>
                  </td>
                  <td>
                    <textarea
                      id="clientAddress"
                      name="client.address"
                      value={event.client?.address ?? ""}
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e, "client.address");
                      }}
                    />
                  </td>
                </tr>
                {/* <tr>
                  <td>
                    <label htmlFor="paymentStatus">Payment Status: </label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      id="paymentStatus"
                      name="paymentStatus"
                      value={event.paymentStatus}
                      onChange={handleChange}
                    />
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-outline-danger"
              onClick={handleCloseEventModal}
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

export default EventModal;
