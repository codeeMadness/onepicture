// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq2_F4ND3zmF0mnX1JwhMixPL3CJSs3FQ",
  authDomain: "onepicture-76c36.firebaseapp.com",
  projectId: "onepicture-76c36",
  storageBucket: "onepicture-76c36.firebasestorage.app",
  messagingSenderId: "446336872266",
  appId: "1:446336872266:web:7e2a8ecb1cb1299cd99bb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export default app;