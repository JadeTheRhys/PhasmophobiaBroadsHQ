/* ============================================================
   PHASMOPHOBIA BROADS — FIREBASE INITIALIZER (FINAL CLEANED)
   Modular Firebase v10 | Exposes DB and Player Name
   ============================================================ */

// ----------------------
// MODULAR IMPORTS
// ----------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ----------------------
// CONFIG
// ----------------------
const firebaseConfig = {
  apiKey: "AIzaSyB2WA7yotRlqNidwIgJcT19JNrK8ukMgs4",
  authDomain: "phasmophobiabroads.firebaseapp.com",
  databaseURL: "https://phasmophobiabroads-default-rtdb.firebaseio.com",
  projectId: "phasmophobiabroads",
  storageBucket: "phasmophobiabroads.firebasestorage.app",
  messagingSenderId: "503659624108",
  appId: "1:503659624108:web:6e57fbc6bf36b0d5989109"
};

// ----------------------
// INIT FIREBASE
// ----------------------

// 1. Initialize the App
const app = initializeApp(firebaseConfig);

// 2. Initialize the Realtime Database Service
const db = getDatabase(app);

// ----------------------
// PLAYER NAME
// ----------------------
let playerName = localStorage.getItem("playerName");

if (!playerName) {
  playerName = prompt("Enter your name:") || "Player";
  localStorage.setItem("playerName", playerName);
}

console.log("🎮 Player:", playerName);
console.log("🔥 Firebase initialized (Modular V10)"); // Combined log

// ----------------------
// EXPORTS for ES modules
// ----------------------
export { app, db, playerName };
