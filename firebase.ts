import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPYJBg5S4mPFSZ1v790SXsQVBYifb5j5c",
  authDomain: "chatgptclone-9a732.firebaseapp.com",
  projectId: "chatgptclone-9a732",
  storageBucket: "chatgptclone-9a732.appspot.com",
  messagingSenderId: "916191941404",
  appId: "1:916191941404:web:c5aecd8cc3a57c41a320d9"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };