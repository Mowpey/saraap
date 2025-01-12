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

export type Product = {
  id: string;
  productName: string;
  category: string;
  price: number;
  status: boolean;
  img: string;
  storeId: string; // Changed from storeName to storeId
};

const productsRef = collection(db, "products");

export const getProducts = async (
  storeId: string, // Changed parameter from storeName to storeId
  sortDirection: "asc" | "desc" = "asc"
) => {
  try {
    const q = query(
      productsRef,
      where("storeId", "==", storeId), // Changed filter field
      orderBy("productName", sortDirection)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      productName: doc.data().productName,
      category: doc.data().category,
      price: doc.data().price,
      status: doc.data().status,
      img: doc.data().img || "",
      storeId: doc.data().storeId, // Changed field
    })) as Product[];
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

export const updateProductStatus = async (id: string, status: boolean) => {
  try {
    const productRef = doc(productsRef, id);
    await updateDoc(productRef, { status });
  } catch (error) {
    console.error("Error updating product status:", error);
    throw error;
  }
};

export const addProduct = async (product: Product) => {
  try {
    const newProductRef = await addDoc(productsRef, {
      productName: product.productName,
      category: product.category,
      price: product.price,
      status: product.status,
      img: product.img,
      storeId: product.storeId, // Changed from storeName to storeId
    });
    console.log("Product added with ID:", newProductRef.id);
    return newProductRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, product: Product) => {
  try {
    const productRef = doc(productsRef, id);
    await updateDoc(productRef, {
      productName: product.productName,
      category: product.category,
      price: product.price,
      status: product.status,
      img: product.img,
      storeId: product.storeId, // Changed from storeName to storeId
    });
    console.log("Product updated with ID:", id);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const productRef = doc(productsRef, id);
    await deleteDoc(productRef);
    console.log("Product deleted with ID:", id);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};