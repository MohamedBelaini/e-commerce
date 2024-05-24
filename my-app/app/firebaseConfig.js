
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCGAVruHPDW8w3VdUOo0D73Tyb6WEY2D_o",
  authDomain: "admin-panel-abe1d.firebaseapp.com",
  projectId: "admin-panel-abe1d",
  storageBucket: "admin-panel-abe1d.appspot.com",
  messagingSenderId: "1058035328181",
  appId: "1:1058035328181:web:4b5dae0b5b4fe825848afc",
  measurementId: "G-GLZMBK6CV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
