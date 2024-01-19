import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register fonts if needed
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kvnz.woff2",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4.woff2",
      fontWeight: "bold",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 12,
    textAlign: "center",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
  },
  textCenter: {
    textAlign: "center",
  },
});

// Create Document Component
const Bill = ({ expenses }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}>
          Expense Report
        </Text>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.textCenter]}>Item</Text>
            <Text style={[styles.tableCell, styles.textCenter]}>Qty</Text>
            <Text style={[styles.tableCell, styles.textCenter]}>Amount</Text>
          </View>

          {expenses.map((expense, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.textCenter]}>
                {expense.item}
              </Text>
              <Text style={[styles.tableCell, styles.textCenter]}>
                {expense.quantity}
              </Text>
              <Text style={[styles.tableCell, styles.textCenter]}>
                {expense.cost}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default Bill;
