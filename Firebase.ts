import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCoVeRx5-nQ72NJBIpPzrHBDF0T_RSm_HM",
    authDomain: "school-attendance-bf864.firebaseapp.com",
    projectId: "school-attendance-bf864",
    storageBucket: "school-attendance-bf864.firebasestorage.app",
    messagingSenderId: "120661903849",
    appId: "1:120661903849:web:f9a73f5e0b4629049ae378",
    measurementId: "G-LZY0BPB3FQ"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export  {db};
