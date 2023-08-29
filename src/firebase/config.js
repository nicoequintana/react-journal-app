// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {

  apiKey: "AIzaSyClKP9fwnE14-UHQKT3reW1RWUk-5EHZcU",

  authDomain: "react-curso-69988.firebaseapp.com",

  projectId: "react-curso-69988",

  storageBucket: "react-curso-69988.appspot.com",

  messagingSenderId: "499179780958",

  appId: "1:499179780958:web:378261cb9a94875e1a2dcf"

};


// Initialize Firebase

export const FirebaseApp = initializeApp( firebaseConfig );
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );