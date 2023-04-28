import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhf-zdbj086RdjUW9GzVv6aDiHwDJjjG8",
  authDomain: "bark-and-beyond.firebaseapp.com",
  projectId: "bark-and-beyond",
  storageBucket: "bark-and-beyond.appspot.com",
  messagingSenderId: "576071278336",
  appId: "1:576071278336:web:eaf5868cc3689fc1819de5",
  measurementId: "G-WR80XTCQVG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
