import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAavdtmGluYvzegflcoYh7Gfsgjq5Cmm3I",
  authDomain: "crudblog-28326.firebaseapp.com",
  projectId: "crudblog-28326",
  storageBucket: "crudblog-28326.appspot.com",
  messagingSenderId: "493712286512",
  appId: "1:493712286512:web:30c6a596659d9f2c91def5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };
