// -------------------------------
// Firebase Core Initialization
// -------------------------------

// Import from Firebase CDN modules (cleanest, future-proof setup)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
    getAuth, 
    signInAnonymously,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// -------------------------------
// Your Firebase Project Config
// (You already confirmed these values)
// -------------------------------

const firebaseConfig = {
    apiKey: "AIzaSyB2WA7yotRlqNidwIgJcT19JNrK8ukMgs4",
    authDomain: "phasmophobiabroads.firebaseapp.com",
    projectId: "phasmophobiabroads",
    storageBucket: "phasmophobiabroads.firebasestorage.app",
    messagingSenderId: "503659624108",
    appId: "1:503659624108:web:6e57fbc6bf36b0d5989109"
};

// -------------------------------
// Firebase Initialize
// -------------------------------

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// This will hold the UID once auth completes
export let CURRENT_USER_ID = null;

// -------------------------------
// Anonymous Login Initialization
// -------------------------------

export function initializeFirebaseAuth(callback) {
    // Watches for status changes
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            CURRENT_USER_ID = user.uid;
            console.log("🔥 Firebase Auth Ready — UID:", CURRENT_USER_ID);

            // Return control to app.js so it can start listeners
            if (callback) callback(CURRENT_USER_ID);
        } else {
            console.log("⚠ No user detected — signing in anonymously...");
            await signInAnonymously(auth);
        }
    });
}
