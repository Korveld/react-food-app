import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_Yvw-GlzeNQzQHN2umCff07-_97MeJD8",
  authDomain: "react-food-order-app-a7c-58092.firebaseapp.com",
  databaseURL: "https://react-food-order-app-a7c1a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-food-order-app-a7c1a",
  storageBucket: "react-food-order-app-a7c1a.appspot.com",
  messagingSenderId: "925575386823",
  appId: "1:925575386823:web:e5a0e6b0dbaeb0a80010e2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);