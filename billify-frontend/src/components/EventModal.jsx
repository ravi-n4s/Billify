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
            <div className="col-9 row mx-auto my-3">
              {["Bill", "Estimate"].map((type) => (
                <div
                  className={`col-4 text-left border rounded-3 p-1 ${
                    event.type === type
                      ? " border-3 border-secondary bg-secondary text-white"
                      : "border-dark"
                  }`}
                  style={{ cursor: "pointer" }}
                  name="type"
                  value={"event.type"}
                  onClick={() => {
                    handleChange({
                      target: {
                        name: "type",
                        value: type,
                      },
                    });
                  }}
                >
                  {type}
                </div>
              ))}
            </div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="name">
                      Name: <span className="text-danger fw-bold">*</span>
                    </label>
                  </td>
                  <td className="text-start">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={event.name}
                      onChange={handleChange}
                      className="my-2"
                      autoFocus
                    />
                  </td>
                </tr>
                {/* <tr>
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
                </tr> */}
                <tr>
                  <td>
                    <label htmlFor="clientAddress">Address: </label>
                  </td>
                  <td className="text-start">
                    <textarea
                      id="clientAddress"
                      name="address"
                      value={event?.address ?? ""}
                      className="form-control my-2"
                      onChange={(e) => {
                        handleChange(e, "address");
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="billDate">Bill Date : </label>
                  </td>
                  <td className="text-start">
                    <input
                      type="date"
                      id="billDate"
                      name="billDate"
                      value={event?.billDate ?? ""}
                      className="my-2"
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
                  <td className="text-start">
                    <input
                      type="text"
                      id="ref"
                      name="ref"
                      value={event?.ref ?? ""}
                      className="my-2"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="transport">Transport : </label>
                  </td>
                  <td className="text-start">
                    <input
                      type="text"
                      id="transport"
                      name="transport"
                      // checked={event?.transport ?? false}
                      value={event?.transport ?? ""}
                      className="my-2"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      placeholder="input cost here"
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
                        className={`text-left border rounded-3 p-1 my-2 ${
                          payment.id === event?.paymentId
                            ? " border-2 border-success"
                            : "border-dark"
                        }`}
                        style={{ cursor: "pointer" }}
                        name="paymentId"
                        value={"payment.id"}
                        onClick={() => {
                          handleChange({
                            target: {
                              name: "paymentId",
                              value: payment.id,
                            },
                          });
                        }}
                      >
                        <pre> {payment.details.trim()} </pre>
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
