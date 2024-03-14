// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDBfvEBCztc6HyrhTRVBXtsKFWChc6RTLU",
  authDomain: "brickchain-50164.firebaseapp.com",
  projectId: "brickchain-50164",
  storageBucket: "brickchain-50164.appspot.com",
  messagingSenderId: "26842498726",
  appId: "1:26842498726:web:fb36a088f4931546725667",
  measurementId: "G-YLCPF6QE2V"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const database = getDatabase(app);
export const db = getFirestore(app);