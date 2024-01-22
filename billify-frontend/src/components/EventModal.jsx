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
    paymentDetailList,
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
                      Event name: <span className="text-danger fw-bold">*</span>
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
                <tr>
                  <td>
                    <label htmlFor="billDate">Bill Date : </label>
                  </td>
                  <td>
                    <input
                      type="date"
                      id="billDate"
                      name="billDate"
                      value={event?.billDate ?? ""}
                      // className="ms-2 "
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="ref">Ref : </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="ref"
                      name="ref"
                      value={event?.ref ?? ""}
                      // className="ms-2 "
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="bankAccountId">Payment Details : </label>
                  </td>
                  <td className="text-start" style={{ maxWidth: "175px" }}>
                    {paymentDetailList.map((payment) => (
                      <div
                        key={payment.id}
                        className={`text-left border rounded-3 p-1 my-1 ${
                          payment.id === event?.paymentId
                            ? " border-2 border-success"
                            : "border-dark"
                        }`}
                        style={{ cursor: "pointer" }}
                        name="paymentId"
                        value={"payment.id"}
                        onClick={(e) => {
                          handleChange({
                            target: {
                              name: "paymentId",
                              value: payment.id,
                            },
                          });
                          console.log(payment.id);
                        }}
                      >
                        <pre> {payment.details} </pre>
                      </div>
                    ))}
                  </td>
                </tr>
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
