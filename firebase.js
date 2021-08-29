// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmL2HR6ym-i8jmokvxfSAFeV-0sJD5GHA",
  authDomain: "fakebook-43e8e.firebaseapp.com",
  projectId: "fakebook-43e8e",
  storageBucket: "fakebook-43e8e.appspot.com",
  messagingSenderId: "330021011220",
  appId: "1:330021011220:web:afdbc30ba6f71551ec4c01",
  measurementId: "G-Q4KFKGSZVL",
};
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
// const firebaseApp = !getApps().length
//   ? initializeApp(firebaseConfig)
//   : getApp();

// const db = getFirestore();

// const storage = getStorage(firebaseApp);

export { db, storage };
