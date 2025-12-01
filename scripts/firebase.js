// ============================================================
// firebase.js — Version B (ES Module)
// Initializes Firebase and exports db + playerName globally
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// -----------------------------
// PLAYER NAME
// -----------------------------
export const playerName = prompt("Enter your name:") || "Player";

// -----------------------------
// FIREBASE CONFIG
// -----------------------------
const firebaseConfig = {
    apiKey: "AIzaSyB2WA7yotRlqNidwIgJcT19JNrK8ukMgs4",
    authDomain: "phasmophobiabroads.firebaseapp.com",
    databaseURL: "https://phasmophobiabroads-default-rtdb.firebaseio.com",
    projectId: "phasmophobiabroads",
    storageBucket: "phasmophobiabroads.firebasestorage.app",
    messagingSenderId: "503659624108",
    appId: "1:503659624108:web:6e57fbc6bf36b0d5989109"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Export the real-time database
export const db = getDatabase(app);

console.log("🔥 firebase.js loaded. User:", playerName);
