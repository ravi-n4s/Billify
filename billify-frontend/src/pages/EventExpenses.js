import React, { useState } from "react";
import Modal from "../components/Modal";
import { BlobProvider } from "@react-pdf/renderer";
import Bill from "../Templates/Bill";

const EventExpenses = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      item: "apple",
      quantity: 1,
      cost: 200,
    },
    {
      id: 2,
      item: "mango",
      quantity: 3,
      cost: 500,
    },
    {
      id: 3,
      item: "banana",
      quantity: 7,
      cost: 1200,
    },
  ]);
  const [newExpense, setNewExpense] = useState([]);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setShowDialog(false);
  };

  const handleExpenseChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExpenses = [...expenses];
    updatedExpenses[index][name] = value;
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
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
      <button onClick={downloadPDF} className="btn btn-success">
        Download PDF
      </button>
    );
  };

  return (
    <div className="text-center mt-5">
      <h2 className="my-5 text-center">Event</h2>
      <div className="mb-5 d-flex justify-content-around">
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
        <BlobProvider document={<Bill />}>
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
                    <td className="d-flex justify-content-around">
                      <i className="bi bi-pencil text-warning"></i>
                      <i className="bi bi-trash3-fill text-danger"></i>
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
                  <td colSpan="1">{calculateTotal()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      {showDialog && <Modal handleCloseDialog={handleCloseDialog} />}
    </div>
  );
};

export default EventExpenses;
