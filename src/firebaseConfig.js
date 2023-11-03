// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// import exp from "constants";
// import { get } from "http";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPSfZDHbxVK2ZEKU18EKfEMcpB-e_IizE",
  authDomain: "scribble-3587c.firebaseapp.com",
  projectId: "scribble-3587c",
  storageBucket: "scribble-3587c.appspot.com",
  messagingSenderId: "328594979202",
  appId: "1:328594979202:web:468ee7ef3a10dd7b5ef79b",
  measurementId: "G-PHR5QZY0L2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {db,app,storage};
export default firebaseConfig;