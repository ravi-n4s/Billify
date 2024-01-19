import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import Bill from "../Templates/Bill";
import { readEventById, updateDocumentById } from "../services/eventService";
import { Link, useParams } from "react-router-dom";

const EventExpenses = () => {
  const { eventId } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [disableConfirmBtn, setDisableConfirmBtn] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    readEventById(eventId).then((data) => {
      setEventName(data.name);
      setExpenses(data.expenses);
    });
  }, []);

  const [newExpense, setNewExpense] = useState({
    item: "",
    quantity: "",
    cost: "",
  });

  const handleSaveToDB = () => {
    updateDocumentById(eventId, expenses);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setExpenses([...expenses, newExpense]);
    setShowDialog(false);
  };

  const handleAddExpenseChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
    if (newExpense.item && newExpense.quantity && newExpense.cost)
      setDisableConfirmBtn(false);
    else setDisableConfirmBtn(true);
  };

  const handleExpenseChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExpenses = [...expenses];
    updatedExpenses[index][name] = value;
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    console.log(index);
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  const calculateTotal = () => {
    let total = 0;
    expenses.forEach((expense) => {
      console.log(expense.quantity, expense.cost, total);
      total += parseFloat(expense.quantity) * parseFloat(expense.cost);
    });
    return total;
  };

  const DownloadButton = ({ pdf }) => {
    const downloadPDF = () => {
      const blob = new Blob([pdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bill.pdf";
      a.click();
    };

    return (
      <button onClick={downloadPDF} className="btn btn-warning">
        Download PDF
      </button>
    );
  };

  return (
    <div className="text-center mt-5">
      <Link to={"/"}>
        <h3>Home</h3>
      </Link>
      <h2 className="mt-3 mb-5 text-center">{eventName}</h2>
      <div className="col-8 offset-sm-2 mb-5 d-flex justify-content-evenly">
        {" "}
        <button
          onClick={() => {
            console.log("clicked");
            setShowDialog(true);
          }}
          className="btn btn-primary"
        >
          Add Expense
        </button>
        <button onClick={handleSaveToDB} className="btn btn-success">
          Save to DB
        </button>
        <BlobProvider document={<Bill expenses={expenses} />}>
          {({ blob, url, loading, error }) => {
            return <DownloadButton pdf={blob} />;
          }}
        </BlobProvider>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-9">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Actions</th>
                  <th>S No.</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>
                      {/* <td className="d-flex justify-content-around"> */}
                      {/* <i className="bi bi-pencil text-warning"></i> */}
                      <i
                        className="bi bi-trash3-fill text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteExpense(index)}
                      ></i>
                    </td>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="item"
                        value={expense.item}
                        onChange={(e) => handleExpenseChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="quantity"
                        value={expense.quantity}
                        onChange={(e) => handleExpenseChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="cost"
                        value={expense.cost}
                        onChange={(e) => handleExpenseChange(e, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-center fw-bold">
                    Total
                  </td>
                  <td colSpan="1">
                    {
                      calculateTotal()
                      //TODO - need to format
                    }
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {showDialog && (
        <Modal
          handleCloseDialog={handleCloseDialog}
          handleConfirm={handleConfirm}
          disableConfirmBtn={disableConfirmBtn}
          handleAddExpenseChange={handleAddExpenseChange}
          newExpense={newExpense}
        />
      )}
      {JSON.stringify(expenses)}
      <br />
      <PDFViewer>
        <Bill expenses={expenses} />
      </PDFViewer>
    </div>
  );
};

export default EventExpenses;
