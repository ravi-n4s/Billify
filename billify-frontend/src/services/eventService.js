import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const collectionName = "events";

// Function to update a document by ID
export const updateDocumentById = async (documentId, updatedExpenses) => {
  try {
    const docRef = doc(db, collectionName, documentId);

    await updateDoc(docRef, { expenses: updatedExpenses });
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export const readAllEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const events = [];

    querySnapshot.forEach((doc) => {
      const eventData = {
        id: doc.id,
        name: doc.data().name,
      };
      events.push(eventData);
    });

    console.log("All events:", events);
    return events;
  } catch (error) {
    console.error("Error reading events:", error);
    return [];
  }
};

export const readEventById = async (documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data());
      return docSnapshot.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error reading document:", error);
  }
};

export const createEvent = async (data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document created ", docRef);
    console.log("Document created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating document:", error);
    return null;
  }
};

export const deleteEventById = async (documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    console.log("Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
