import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  initializeAuth, 
  getReactNativePersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUyx026ozpPJqiwIEWMYr_oBsMQndaPCI",
  authDomain: "twende-8e22d.firebaseapp.com",
  projectId: "twende-8e22d",
  storageBucket: "twende-8e22d.appspot.com",
  messagingSenderId: "894046701088",
  appId: "1:894046701088:web:df0bd341f125c2b734de45",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Enable Persistent Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
