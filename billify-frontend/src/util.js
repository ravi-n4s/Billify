export const formatPriceWithCurrencyAndCommas = (price) => {
  return `${"₹ "}${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

export const calculateTotal = (expenses) => {
  let total = 0;
  expenses.forEach((expense) => {
    // console.log(expense.quantity, expense.cost, total);
    total += parseFloat(expense.quantity) * parseFloat(expense.cost);
  });
  return total;
};
