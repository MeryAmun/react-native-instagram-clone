// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbqWQfljrq22sdFXmM9XvdEA4oHUMYPLw",
  authDomain: "instagram-clone-react-na-54304.firebaseapp.com",
  projectId: "instagram-clone-react-na-54304",
  storageBucket: "instagram-clone-react-na-54304.appspot.com",
  messagingSenderId: "70529720486",
  appId: "1:70529720486:web:a086833e1014d1e85d1467",
  measurementId: "G-79T0D5WB27"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { db, auth, storage };