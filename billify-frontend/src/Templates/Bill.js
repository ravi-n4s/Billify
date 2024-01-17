import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Bill component which consists of a PDF of A4 size with header, address to whom it's billed, reference number, date, and table of items with their prices and total price and footer with bank details.
const Bill = (props) => {
  const { expenses } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Header</Text>
        </View>
        <View style={styles.section}>
          <Text>Address</Text>
          <Text>Reference Number</Text>
          <Text>Date</Text>
        </View>
        <View style={styles.section}>
          {/* <Table>
            <TableHeader>
              <TableCell>Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Cost</TableCell>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow>
                  <TableCell>{expense.item}</TableCell>
                  <TableCell>{expense.quantity}</TableCell>
                  <TableCell>{expense.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <Text>Total Price</Text>
        </View>
        <View style={styles.section}>
          <Text>Footer</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Bill;
