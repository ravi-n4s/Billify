import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  calculateTotal,
  formatPriceWithCommas,
  formatPriceWithCurrencyAndCommasForPDF,
} from "../util";

// Register fonts if needed
// Font.register({
//   family: "Roboto",
//   fonts: [
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kvnz.woff2",
//       fontWeight: "normal",
//     },
//     {
//       src: "https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4.woff2",
//       fontWeight: "bold",
//     },
//   ],
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Times-Roman",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "blue",
  },
  companyName: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
    color: "red",
  },
  companyDetails: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    color: "green",
  },
  companyBox: {
    border: "1px solid #000",
    borderRadius: 25,
    padding: 10,
    // marginBottom: 10,
  },
  particularsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
    border: "0px",
    padding: 10,
    marginBottom: 5,
    marginTop: 10,
  },
  particularsLeft: {
    textAlign: "left",
  },
  particularsRight: {
    textAlign: "right",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  particularHeader: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
  particularContent: {
    fontSize: 12,
    marginLeft: 8,
    marginBottom: 10,
    textAlign: "left",
  },
  table: {
    width: "80%",
    marginBottom: 50,
    // marginTop: 5,
    marginLeft: "auto",
    marginRight: "auto",
    border: "2px solid #000",
    // nthChild: {
    //   odd: {
    //     backgroundColor: "#f2f2f2",
    //   },
    // },
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },
  tableSerialNumberCell: {
    flex: 0.3,
    padding: 8,
    fontSize: 12,
    textAlign: "center",
  },
  tableItemCell: {
    flex: 1.9,
    padding: 8,
    fontSize: 12,
    textAlign: "center",
  },
  tableQtyCell: {
    flex: 0.8,
    padding: 8,
    fontSize: 12,
    textAlign: "center",
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
  border: {
    borderBottom: "1px solid #000",
  },
  signature: {
    textAlign: "center",
    fontSize: 12,
    color: "purple",
    marginTop: 10,
    marginBottom: 10,
  },
  paymentDetailsBox: {
    fontSize: 12,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
});

// Create Document Component
const Bill = ({ event, paymentDetails, config }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Cash {event.type}</Text>

          {/* Company Details */}
          <View style={styles.companyBox}>
            <Text style={styles.companyName}>{config.company.name}</Text>
            <Text style={styles.companyDetails}>{config.company.address}</Text>
            <Text style={styles.companyDetails}>{config.company.contact}</Text>
          </View>

          {/* Client Address */}
          <View style={styles.particularsBox}>
            <View style={styles.particularsLeft}>
              {!!event.ref && (
                <View style={styles.flexRow}>
                  <Text style={styles.particularHeader}>Ref: </Text>
                  <Text style={styles.particularContent}>{event.ref}</Text>
                </View>
              )}
              {!!event.address && (
                <View style={styles.flexRow}>
                  <Text style={styles.particularHeader}>For: </Text>
                  <Text style={styles.particularContent}>
                    {`${event.name}\n`}
                    {event.address}
                  </Text>
                </View>
              )}
            </View>
            {!!event?.billDate && (
              <View style={styles.particularsRight}>
                <View style={styles.flexRow}>
                  <Text style={styles.particularHeader}>Date:</Text>
                  <Text style={styles.particularContent}>
                    {new Date(event.billDate).toLocaleDateString("en-GB")}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {/* Expense Table */}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableSerialNumberCell, styles.textCenter]}>
                S No.
              </Text>
              <Text style={[styles.tableItemCell, styles.textCenter]}>
                Item
              </Text>
              <Text style={[styles.tableQtyCell, styles.textCenter]}>Qty</Text>
              <Text style={[styles.tableCell, styles.textCenter]}>Amount</Text>
            </View>

            {event?.expenses.map((expense, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableSerialNumberCell, styles.textCenter]}>
                  {index + 1}
                </Text>
                <Text style={[styles.tableItemCell, styles.textCenter]}>
                  {expense.item}
                </Text>
                <Text style={[styles.tableQtyCell, styles.textCenter]}>
                  {expense.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.textCenter]}>
                  {formatPriceWithCommas(expense.quantity * expense.cost)}
                </Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text
                style={[styles.tableSerialNumberCell, styles.textCenter]}
              ></Text>
              <Text style={[styles.tableItemCell, styles.textCenter]}>
                {event?.transport
                  ? "Total Amount (including transport)"
                  : "Total Amount"}
              </Text>
              <Text style={[styles.tableQtyCell, styles.textCenter]}></Text>
              <Text style={[styles.tableCell, styles.textCenter]}>
                {" " +
                  formatPriceWithCurrencyAndCommasForPDF(
                    calculateTotal(event.expenses) +
                      parseInt(event?.transport ? event.transport : 0)
                  )}
              </Text>
            </View>
          </View>

          {/* Signature */}
          <View style={styles.signature}>
            <Text>{config.signature}</Text>
            <Text>{config.thankyouNote}</Text>
          </View>

          {/* Bank Details */}
          <View style={styles.paymentDetailsBox}>
            <Text style={{}}>Payment Details:</Text>
            <Text>{paymentDetails}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Bill;
