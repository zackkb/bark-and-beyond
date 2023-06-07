import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
//import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABBnuKwNmzOfC6ibMbqwiFieOJgNnPE3E",
  authDomain: "pup-planner.firebaseapp.com",
  projectId: "pup-planner",
  storageBucket: "pup-planner.appspot.com",
  messagingSenderId: "305447928112",
  appId: "1:305447928112:web:84a3de25f73334534648f5",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const storage = firebase.storage();

//export const auth = getAuth();
//export const provider = new GoogleAuthProvider();

export { firebase, storage };
