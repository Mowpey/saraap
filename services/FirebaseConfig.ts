// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3FNa4HBT7WeBJ6mZuoYkkwB6BOwkofRU",
  authDomain: "sample-db-f2f07.firebaseapp.com",
  projectId: "sample-db-f2f07",
  storageBucket: "sample-db-f2f07.firebasestorage.app",
  messagingSenderId: "73209412204",
  appId: "1:73209412204:web:d69248956e50a446143649",
  measurementId: "G-JYLBYNMHB1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
