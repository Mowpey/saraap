import { db } from "../FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import { createSlug } from "@/lib/slugify";

export type StoreData = {
  id: string;
  storeName: string;
  productQuantity: number;
  status: boolean;
  actionUrl: string;
};

const storesRef = collection(db, "stores");

export const getStores = async (sortDirection: "asc" | "desc" = "asc") => {
  try {
    const q = query(storesRef, orderBy("storeName", sortDirection));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      storeName: doc.data().storeName,
      productQuantity: doc.data().productQuantity,
      status: doc.data().status,
      actionUrl: "/admin_products/",
    })) as StoreData[];
  } catch (error) {
    console.error("Error getting stores:", error);
    throw error;
  }
};

export const updateStoreStatus = async (id: string, status: boolean) => {
  try {
    const storeRef = doc(storesRef, id);
    await updateDoc(storeRef, { status });
  } catch (error) {
    console.error("Error updating store status:", error);
    throw error;
  }
};
