// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmq4Ug_NCcOuObgd4LSiFDYQsXffQg6Xk",
  authDomain: "fir-auth-12d76.firebaseapp.com",
  projectId: "fir-auth-12d76",
  storageBucket: "fir-auth-12d76.appspot.com",
  messagingSenderId: "392043818240",
  appId: "1:392043818240:web:354ece92d4032646d257e5",
  measurementId: "G-DY9T8EVY5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth();