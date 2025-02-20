import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUyx026ozpPJqiwIEWMYr_oBsMQndaPCI",
  authDomain: "twende-8e22d.firebaseapp.com",
  projectId: "twende-8e22d",
  storageBucket: "twende-8e22d.firebasestorage.app",
  messagingSenderId: "894046701088",
  appId: "1:894046701088:web:df0bd341f125c2b734de45"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
