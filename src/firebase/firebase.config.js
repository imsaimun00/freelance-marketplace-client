// src/firebase/firebase.config.js (FINAL AND CORRECT EXPORT FIX)

import { initializeApp } from "firebase/app";
// getAnalytics টি দরকার নেই, কারণ এটি AuthProvider ব্যবহার করছে না
// import { getAnalytics } from "firebase/analytics"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY, // VITE_KEY ব্যবহার করছি
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID
    // measurementId এখানে দরকার নেই
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // <-- এটি বাদ দিলাম, যেহেতু এটি দরকার নেই

// THIS IS THE CRITICAL FIX: Exporting 'app' as default
export default app;