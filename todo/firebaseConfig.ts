import { initializeApp } from 'firebase/app';
//import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAnxggICw1OHb0A3VDT07O1N_5EgvjVLeE",
    authDomain: "todo-7ec50.firebaseapp.com",
    projectId: "todo-7ec50",
    storageBucket: "todo-7ec50.appspot.com",
    messagingSenderId: "575378561068",
    appId: "1:575378561068:web:edc4e282592b9f978e9989"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
//export const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
