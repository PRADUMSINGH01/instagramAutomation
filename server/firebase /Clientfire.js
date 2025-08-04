// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1c1gBmc1qPZEYwbbDKvoyJtgzCawQPrw",
  authDomain: "instagramauto-2bbce.firebaseapp.com",
  projectId: "instagramauto-2bbce",
  storageBucket: "instagramauto-2bbce.firebasestorage.app",
  messagingSenderId: "408631545921",
  appId: "1:408631545921:web:39b8c6e28d8786583af6c0",
  measurementId: "G-0GHPQZWHCJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
