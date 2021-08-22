import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // <- needed if using firestore

import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import store from "store";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn_egwkyVLAOiq-Gc2U63E4OOIEz3Kwcs",
  authDomain: "softschool1.firebaseapp.com",
  projectId: "softschool1",
  storageBucket: "softschool1.appspot.com",
  messagingSenderId: "251945559351",
  appId: "1:251945559351:web:855a4004e83e4dd01226b2",
  measurementId: "G-3CLBQKTL2B",
};

export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore(); // <- needed if using firestore
}
// Initialize firebase instance

// Initialize other services on firebase instance

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
