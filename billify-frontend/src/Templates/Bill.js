// import React from "react";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Font,
// } from "@react-pdf/renderer";

// // Register fonts if needed
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

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#ffffff",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   table: {
//     width: "100%",
//     marginBottom: 10,
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottom: "1px solid #000",
//   },
//   tableCell: {
//     flex: 1,
//     padding: 8,
//     fontSize: 12,
//     textAlign: "center",
//   },
//   tableHeader: {
//     backgroundColor: "#f2f2f2",
//     fontWeight: "bold",
//   },
//   textCenter: {
//     textAlign: "center",
//   },
//   border: {
//     borderBottom: "1px solid #000",
//   },
// });

// // Create Document Component
// const Bill = ({ expenses }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}>
//           Expense Report
//         </Text>

//         <View style={styles.table}>
//           <View style={[styles.tableRow, styles.tableHeader]}>
//             <Text style={[styles.tableCell, styles.textCenter]}>Item</Text>
//             <Text style={[styles.tableCell, styles.textCenter]}>Qty</Text>
//             <Text style={[styles.tableCell, styles.textCenter]}>Amount</Text>
//           </View>

//           {expenses.map((expense, index) => (
//             <View key={index} style={styles.tableRow}>
//               <Text style={[styles.tableCell, styles.textCenter]}>
//                 {expense.item}
//               </Text>
//               <Text style={[styles.tableCell, styles.textCenter]}>
//                 {expense.quantity}
//               </Text>
//               <Text style={[styles.tableCell, styles.textCenter]}>
//                 {expense.cost}
//               </Text>
//             </View>
//           ))}
//         </View>
//       </View>
//     </Page>
//   </Document>
// );

// export default Bill;

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
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  companyName: {
    fontSize: 16,
    marginBottom: 5,
    color: "red",
  },
  companyAddress: {
    fontSize: 12,
    marginBottom: 10,
  },
  companyBox: {
    border: "1px solid #000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
  border: {
    borderBottom: "1px solid #000",
  },
});

// Create Document Component
const Bill = ({ expenses }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Cash Bill</Text>

        {/* Company Details */}
        <View style={styles.companyBox}>
          <Text style={styles.companyName}>Your Company Name</Text>
          <Text style={styles.companyAddress}>Your Company Address</Text>
        </View>

        {/* Address */}
        <Text style={styles.companyAddress}>Customer Address</Text>

        {/* Expense Table */}
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

        {/* Bank Details */}
        <Text style={styles.companyAddress}>Bank Details:</Text>
        <Text style={styles.companyAddress}>
          Account Number: XXXX-XXXX-XXXX
        </Text>
        <Text style={styles.companyAddress}>Bank: Your Bank Name</Text>
      </View>
    </Page>
  </Document>
);

export default Bill;
