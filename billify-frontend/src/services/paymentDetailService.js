import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const collectionName = "payments";

export const readPaymentById = async (documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDocs(docRef);
    const paymentData = docSnap.data();
    console.log("Payment data:", paymentData);
    return paymentData;
  } catch (error) {
    console.error("Error reading payment:", error);
    return null;
  }
};

export const createPayment = async (payment) => {
  return await addDoc(collection(db, collectionName), payment);
};

export const readAllPayments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const payments = [];

    querySnapshot.forEach((doc) => {
      const paymentData = {
        id: doc.id,
        details: doc.data()?.details,
      };
      payments.push(paymentData);
    });

    console.log("All payments:", payments);
    return payments;
  } catch (error) {
    console.error("Error reading payments:", error);
    return [];
  }
};

export const deletePaymentById = async (documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
