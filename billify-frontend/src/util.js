export const formatPriceWithCurrencyAndCommas = (price) => {
  return `${"₹ "}${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

export const formatPriceWithCommas = (price) => {
  return `${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

export const formatPriceWithCurrencyAndCommasForPDF = (price) => {
  return `${"Rs. "}${price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}/-`;
};

export const calculateTotal = (expenses) => {
  let total = 0;
  expenses.forEach((expense) => {
    total += parseFloat(expense.quantity) * parseFloat(expense.cost);
  });
  return total;
};
