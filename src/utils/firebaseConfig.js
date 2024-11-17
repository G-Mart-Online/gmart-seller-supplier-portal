import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7m88i_0xZo98-FCRpap-KZvs27TaDkqM",
  authDomain: "gmart-online-d1ca6.firebaseapp.com",
  projectId: "gmart-online-d1ca6",
  storageBucket: "gmart-online-d1ca6.firebasestorage.app",
  messagingSenderId: "561674025511",
  appId: "1:561674025511:web:46a176d7ae6cb92d9eac02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
