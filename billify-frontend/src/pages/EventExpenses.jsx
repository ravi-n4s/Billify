import { useEffect, useRef, useState } from "react";
import ExpenseModal from "../components/ExpenseModal";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import Bill from "../Templates/Bill";
import { readEventById, updateDocumentById } from "../services/eventService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Menu from "../components/Menu";
import { calculateTotal, formatPriceWithCurrencyAndCommas } from "../util";
import EventModal from "../components/EventModal";
import { event as eventObj, expense } from "../model/event";
import { config } from "../config";
import { payment } from "../model/payment";
import { readAllPayments } from "../services/paymentDetailService";
import ShareButton from "../components/ShareButton";

const EventExpenses = () => {
  const { eventId } = useParams();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showEditExpenseModal, setshowEditExpenseModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [disableConfirmBtn, setDisableConfirmBtn] = useState(true);
  const [event, setEvent] = useState(eventObj);
  const [editedEvent, setEditedEvent] = useState(eventObj);
  const [newExpense, setNewExpense] = useState(expense);
  const [paymentDetailList, setPaymentDetailList] = useState([payment]);

  const currentIndex = useRef(-1);
  // const selectedPaymentDetails = useRef("");
  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState("");

  const isWebShareSupported = navigator.share !== undefined;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await readEventById(eventId);
        setEvent(eventData);
        setEditedEvent(eventData);

        const paymentData = await readAllPayments();
        setPaymentDetailList(paymentData);

        const selectedPayment = paymentData.find(
          (obj) => obj.id === eventData.paymentId
        );
        setSelectedPaymentDetails(selectedPayment?.details);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [eventId]);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const paymentData = await readAllPayments();
        setPaymentDetailList(paymentData);

        const selectedPayment = paymentData.find(
          (obj) => obj.id === editedEvent.paymentId
        );
        setSelectedPaymentDetails(selectedPayment?.details);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [editedEvent.paymentId]);

  useEffect(() => {
    if (newExpense.item && newExpense.quantity && newExpense.cost)
      setDisableConfirmBtn(false);
  }, [newExpense]);

  const handleSaveToDB = () => {
    toast.promise(updateDocumentById(eventId, editedEvent), {
      pending: "Saving ... ",
      success: "Successfully saved",
      error: "Failed to save",
    });
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setDisableConfirmBtn(true);
  };

  const handleCloseExpenseModal = () => {
    setShowExpenseModal(false);
    setDisableConfirmBtn(true);
  };

  const handleCloseEditExpenseModal = () => {
    setshowEditExpenseModal(false);
    setDisableConfirmBtn(true);
    setNewExpense({ item: "", quantity: "", cost: "" });
  };

  const handleAddExpenseConfirm = (e) => {
    //on clicking confirm button in modal
    e.preventDefault();
    setEditedEvent({
      ...editedEvent,
      expenses: [...editedEvent.expenses, newExpense],
    });
    setNewExpense({ item: "", quantity: "", cost: "" });
    handleCloseExpenseModal();
  };

  const handleModalOnChange = (e) => {
    //on key press
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const editExpense = (index) => {
    //on clicking a expense row from table
    setNewExpense({ ...editedEvent.expenses[index] });
    currentIndex.current = index;
    setshowEditExpenseModal(true);
  };

  const handleModalEditBtn = () => {
    let newEvent = editedEvent;
    newEvent["expenses"][currentIndex.current] = newExpense;
    setEditedEvent(newEvent);
    currentIndex.current = -1;
    handleCloseEditExpenseModal();
  };

  const editEventModalConfirmBtn = () => {
    setShowEventModal(false);
  };

  const removeExpense = () => {
    //on clicking remove button in modal
    if (
      window.confirm(
        `Are you sure you want to remove - '${
          editedEvent.expenses[currentIndex.current].item
        }' from the list of expenses?`
      )
    ) {
      const updatedExpenses = editedEvent.expenses;
      updatedExpenses.splice(currentIndex.current, 1);
      setEditedEvent({ ...editedEvent, expenses: updatedExpenses });
      currentIndex.current = -1;
      handleCloseEditExpenseModal();
    }
  };

  const handleChangeEditEvent = (e, nestedProperty) => {
    const { name, value } = e.target;

    setEditedEvent((prevEvent) => {
      // Split the nested property string into an array
      const nestedProperties = nestedProperty ? nestedProperty.split(".") : [];

      // Create a copy of the previous state
      const updatedEvent = { ...prevEvent };

      // Traverse the nestedProperties array to update the correct nested property
      let currentLevel = updatedEvent;
      for (let i = 0; i < nestedProperties.length; i++) {
        const propertyName = nestedProperties[i];
        currentLevel[propertyName] = currentLevel[propertyName] || {};
        if (i === nestedProperties.length - 1) {
          // If it's the last property, update its value
          currentLevel[propertyName] = value;
        } else {
          // Move to the next level
          currentLevel = currentLevel[propertyName];
        }
      }

      // If it's not a nested property, update directly
      if (!nestedProperty) {
        updatedEvent[name] = value;
        if (name === "paymentId") {
          setPaymentDetailList(paymentDetailList);
          // setEditedEvent({
          //   ...editedEvent,
          //   paymentId: value,
          // });
        }
      }

      return updatedEvent;
    });
  };

  const handleEditEvent = () => {
    readAllPayments().then((data) => {
      setPaymentDetailList(data);
    });
    setShowEventModal(true);
  };

  const DownloadButton = ({ pdf }) => {
    const downloadPDF = () => {
      const blob = new Blob([pdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${editedEvent.name}-${config.brand}_${editedEvent.type}.pdf`;
      a.click();
    };

    return (
      <button
        onClick={downloadPDF}
        className="btn btn-warning rounded-pill px-3 px-sm-5"
      >
        <i className="bi bi-download me-2"></i>
      </button>
    );
  };

  return (
    <Menu>
      <div className="text-center mt-5">
        <br />
        <div className=" d-flex my-3 justify-content-center">
          <h4 className="">
            {`${editedEvent?.name ?? "NA"}'s ${editedEvent.type}`}
          </h4>
          <i
            className="bi bi-pencil bi-sm text-warning ms-1 ms-sm-2 d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handleEditEvent}
          ></i>
        </div>
        {/* <p className="mb-4"> Client Name : {event?.client?.name ?? "NA"}</p> */}
        <div className="col-8 offset-2 my-3 d-flex justify-content-between fixed-bottom">
          {" "}
          <button
            onClick={() => {
              setShowExpenseModal(true);
            }}
            className="btn btn-primary rounded-pill px-3 px-sm-5"
          >
            Add
          </button>
          <button
            onClick={handleSaveToDB}
            className="btn btn-success rounded-pill px-3 px-sm-5"
          >
            Save
          </button>
          <BlobProvider
            document={
              <Bill
                event={editedEvent}
                config={config}
                paymentDetails={selectedPaymentDetails}
              />
            }
          >
            {({ blob }) => {
              return <DownloadButton pdf={blob} />;
            }}
          </BlobProvider>
          <BlobProvider
            document={
              <Bill
                event={editedEvent}
                config={config}
                paymentDetails={selectedPaymentDetails}
              />
            }
          >
            {({ blob }) => {
              return (
                <ShareButton
                  isWebShareSupported={isWebShareSupported}
                  pdf={blob}
                  editedEvent={editedEvent}
                  config={config}
                />
              );
            }}
          </BlobProvider>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            {!editedEvent?.expenses?.length ? (
              <p className="fw-bold my-5">It feels empty here</p>
            ) : (
              <div className="">
                <table className="table table-bordered table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th></th>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Cost</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editedEvent.expenses.map((expense, index) => (
                      <tr
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          editExpense(index);
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <span value={expense.item}>{expense.item}</span>
                        </td>
                        <td>
                          <span>{expense.quantity}</span>
                        </td>
                        <td>
                          <span>{expense.cost}</span>
                        </td>
                        <td>
                          {formatPriceWithCurrencyAndCommas(
                            expense.quantity * expense.cost
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="4" className="text-center fw-bold">
                        {editedEvent?.transport
                          ? "Total Amount (including transport)"
                          : "Total Amount"}
                      </td>
                      <td colSpan="1">
                        {" " +
                          formatPriceWithCurrencyAndCommas(
                            calculateTotal(editedEvent.expenses) +
                              parseInt(
                                editedEvent?.transport
                                  ? editedEvent.transport
                                  : 0
                              )
                          )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <PDFViewer>
                  <Bill
                    event={editedEvent}
                    config={config}
                    paymentDetails={selectedPaymentDetails}
                  />
                </PDFViewer>
                {editedEvent.expenses.length && (
                  <>
                    <div className="my-3">
                      <label htmlFor="paymentStatus">Payment done : </label>
                      <input
                        type="checkbox"
                        id="paymentStatus"
                        className="form-check-input ms-2"
                        autoComplete="off"
                        checked={editedEvent.paymentStatus === "done"}
                        onChange={(e) => {
                          setEditedEvent({
                            ...editedEvent,
                            paymentStatus: e.target.checked
                              ? "done"
                              : "pending",
                          });
                        }}
                      />
                    </div>
                    {/* Notes */}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {showExpenseModal && (
          <ExpenseModal
            handleCloseDialog={handleCloseExpenseModal}
            handleConfirm={handleAddExpenseConfirm}
            disableConfirmBtn={disableConfirmBtn}
            handleModalOnChange={handleModalOnChange}
            newExpense={newExpense}
            confirmBtnText="Add"
            header="Add Expense"
            cancelBtnText="Cancel"
          />
        )}

        {showEditExpenseModal && (
          <ExpenseModal
            handleCloseDialog={handleCloseEditExpenseModal}
            handleConfirm={handleModalEditBtn}
            disableConfirmBtn={disableConfirmBtn}
            handleModalOnChange={handleModalOnChange}
            newExpense={newExpense}
            confirmBtnText="Edit"
            cancelBtnText="Remove"
            header="Edit Expense"
            removeExpense={removeExpense}
          />
        )}

        {showEventModal && (
          <EventModal
            event={editedEvent}
            newExpense={newExpense}
            paymentDetailList={paymentDetailList}
            header={`Edit Event - ${editedEvent.name}`}
            cancelBtnText="Close"
            disableConfirmBtn={false}
            confirmBtnText={false}
            handleConfirm={editEventModalConfirmBtn}
            handleCloseEventModal={handleCloseEventModal}
            handleModalOnChange={handleModalOnChange}
            handleChange={handleChangeEditEvent}
          />
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </Menu>
  );
};

export default EventExpenses;
