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
} from "firebase/firestore";

// Define the Product type
export type Product = {
  id: string;
  productName: string;
  category: string;
  price: number;
  status: boolean;
  img: string;
};

// Reference to the "products" collection in Firestore
const productsRef = collection(db, "products");

// Fetch products with sorting functionality
export const getProducts = async (sortDirection: "asc" | "desc" = "asc") => {
  try {
    const q = query(productsRef, orderBy("productName", sortDirection)); // Sorting by productName
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      productName: doc.data().productName,
      category: doc.data().category,
      price: doc.data().price,
      status: doc.data().status,
      img: doc.data().img || "", // Optional image field
    })) as Product[];
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
};

// Update the product's status (assuming you have a status field for each product)
export const updateProductStatus = async (id: string, status: boolean) => {
  try {
    const productRef = doc(productsRef, id);
    await updateDoc(productRef, { status });
  } catch (error) {
    console.error("Error updating product status:", error);
    throw error;
  }
};

// Add a new product to the Firestore collection
export const addProduct = async (product: Product) => {
  try {
    const newProductRef = await addDoc(productsRef, {
      productName: product.productName,
      category: product.category,
      price: product.price,
      status: product.status,
      img: product.img,
    });
    console.log("Product added with ID:", newProductRef.id);
    return newProductRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id: string, product: Product) => {
  try {
    const productRef = doc(productsRef, id);
    await updateDoc(productRef, {
      productName: product.productName,
      category: product.category,
      price: product.price,
      status: product.status,
      img: product.img,
    });
    console.log("Product updated with ID:", id);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product from the Firestore collection
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
