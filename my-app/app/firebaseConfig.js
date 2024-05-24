
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChaMqDXm0Ocg2NJnwG186ncHwMTnagtAw",
  authDomain: "e-commmerce-ed90b.firebaseapp.com",
  projectId: "e-commmerce-ed90b",
  storageBucket: "e-commmerce-ed90b.appspot.com",
  messagingSenderId: "969094576773",
  appId: "1:969094576773:web:ad21fcbab470ec7d22c7ec"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
