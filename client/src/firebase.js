import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA-V4ZUJzq-AC0vU7bgd1XsQOhL0grKqvc",
  authDomain: "shopping-list-4e5fe.firebaseapp.com",
  projectId: "shopping-list-4e5fe",
  storageBucket: "shopping-list-4e5fe.appspot.com",
  messagingSenderId: "676211769038",
  appId: "1:676211769038:web:2ee1b9cb62b9af1aebda9f",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
