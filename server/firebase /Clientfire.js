// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXTAPIKEY,
  authDomain: process.env.NEXTAUTHDOMAIL,
  projectId: process.env.NEXTPRODUCTID,
  storageBucket: process.env.NEXTSTORAGEBUCKET,
  messagingSenderId: process.env.NEXTMESSAGINGSENDERID,
  appId: process.env.NEXTAPPID,
  measurementId: process.env.NEXTMEASUREMENT,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
