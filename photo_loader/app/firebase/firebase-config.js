// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEh7I4whzwqiHTLXwzuljCjrX5QfQJKys",
  authDomain: "uploadtravelfile.firebaseapp.com",
  projectId: "uploadtravelfile",
  storageBucket: "uploadtravelfile.appspot.com",
  messagingSenderId: "741704225780",
  appId: "1:741704225780:web:a34feaeb474a9d468c5fa1",
  measurementId: "G-3C66CMV116"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);