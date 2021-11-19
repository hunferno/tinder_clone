import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCGUEGV1rQpnfgBTxHF5TMIKuonRkK28A",
  authDomain: "tinder-clone-3339a.firebaseapp.com",
  projectId: "tinder-clone-3339a",
  storageBucket: "tinder-clone-3339a.appspot.com",
  messagingSenderId: "244827901881",
  appId: "1:244827901881:web:fe8e764eef05d449647068",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
