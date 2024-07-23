import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtyHlwgPVmgnO5vALQenceMulXqR4-gx4",
  authDomain: "filmeo-64ef8.firebaseapp.com",
  projectId: "filmeo-64ef8",
  storageBucket: "filmeo-64ef8.appspot.com",
  messagingSenderId: "1086812467696",
  appId: "1:1086812467696:web:75dd31b439a9c601622d35",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
