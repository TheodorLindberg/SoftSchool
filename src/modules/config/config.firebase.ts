import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // <- needed if using firestore

import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import store from "store";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMKsU9M9q6LkKAslQK475qEb93i8rNnas",
  authDomain: "softschool-322007.firebaseapp.com",
  projectId: "softschool-322007",
  storageBucket: "softschool-322007.appspot.com",
  messagingSenderId: "693406989546",
  appId: "1:693406989546:web:aa3113aa0612334334ab93",
  measurementId: "G-CQ7Y4F356X",
};

export const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore(); // <- needed if using firestore
  console.log("Init");
}
// Initialize firebase instance

// Initialize other services on firebase instance

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
