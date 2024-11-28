// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeBu7JOffLCcEypRp3fXRFaBR5yq8sx2c",
  authDomain: "notesapp-becc9.firebaseapp.com",
  projectId: "notesapp-becc9",
  storageBucket: "notesapp-becc9.firebasestorage.app",
  messagingSenderId: "994211274916",
  appId: "1:994211274916:web:0c28c091c66192bfd5c631",
  measurementId: "G-4FZDJRSQ99"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);