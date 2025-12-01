// ============================================================
// firebase.js — Version B (ES Module)
// Initializes Firebase + Database Reference
// Used by main.js, commands.js, hunt.js
// ============================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ============================================================
// YOUR FIREBASE CONFIG (LIVE + CORRECT)
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyByDJrpdTFS5kEOZYa1mkhmCjZV5QWdOQM",
    authDomain: "phasmophobia-broads-hq.firebaseapp.com",
    databaseURL: "https://phasmophobia-broads-hq-default-rtdb.firebaseio.com",
    projectId: "phasmophobia-broads-hq",
    storageBucket: "phasmophobia-broads-hq.appspot.com",
    messagingSenderId: "315034928967",
    appId: "1:315034928967:web:f197bc535b798abba8956c"
};

// ============================================================
// INIT APP + DATABASE
// ============================================================

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

// Global fallback (non-module scripts)
window.__DB = db;

// ============================================================
// PLAYER NAME HANDLING
// ============================================================

// Pull name from localStorage OR ask user
let storedName = localStorage.getItem("playerName");

if (!storedName) {
    storedName = prompt("Enter your ghost hunter name:");
    if (!storedName) storedName = "Player";
    localStorage.setItem("playerName", storedName);
}

// Export it
export const playerName = storedName;

// Expose globally
window.PLAYER_NAME = storedName;

console.log("🔥 Firebase + Player Name Loaded:", storedName);
