// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe1Kp4l9oXdA_NDnBvFih9-nZP-HhMNXM",
  authDomain: "food-delivery-f8f05.firebaseapp.com",
  projectId: "food-delivery-f8f05",
  storageBucket: "food-delivery-f8f05.firebasestorage.app",
  messagingSenderId: "166915738035",
  appId: "1:166915738035:web:9db385969aa2d3758823c6",
  measurementId: "G-25VH77E4W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);