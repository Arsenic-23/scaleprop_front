import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMauLSidxe-nxnWXUIssg3x3fNqJgKo50",
  authDomain: "scalefund-cdf50.firebaseapp.com",
  projectId: "scalefund-cdf50",
  storageBucket: "scalefund-cdf50.appspot.com",
  messagingSenderId: "478851023803",
  appId: "1:478851023803:web:e95db12c6c891cb424fa9e",
  measurementId: "G-9W0VWRBGTS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
