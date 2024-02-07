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
export const updateDocumentById = async (documentId, updatedEvent) => {
  const docRef = doc(db, collectionName, documentId);

  return await updateDoc(docRef, updatedEvent);
};

export const readAllEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const events = [];

    querySnapshot.forEach((doc) => {
      const eventData = {
        id: doc.id,
        name: doc.data().name,
        expenses: doc.data().expenses,
        paymentStatus: doc.data().paymentStatus,
        type: doc.data().type,
        transport: doc.data().transport,
      };
      events.push(eventData);
    });

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
      return docSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error reading document:", error);
  }
};

export const createEvent = async (data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error creating document:", error);
    return null;
  }
};

export const deleteEventById = async (documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};
