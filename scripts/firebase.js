/* ============================================================
   PHASMOPHOBIA BROADS — FIREBASE INITIALIZER (MODULAR FIX)
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

console.log("🔥 Firebase initialized (Modular V10)");


// ----------------------
// PLAYER NAME
// ----------------------
let playerName = localStorage.getItem("playerName");

if (!playerName) {
  // Use prompt to get the name if it's not stored
  // Note: prompt() is blocked in some browsers/security contexts, but fine for local testing.
  playerName = prompt("Enter your name:") || "Player";
  localStorage.setItem("playerName", playerName);
}

console.log("🎮 Player:", playerName);


// ----------------------
// EXPORTS for ES modules
// ----------------------
export { app, db, playerName };

// ----------------------
// EXPOSE GLOBALS
// ----------------------
// We can skip the global window.__DB and window.PLAYER_NAME exports
// since all your other modules (lobby.js, chat.js, ghostEvents.js)
// are already importing 'db' and 'playerName' directly from this file.
// If commands.js or other files still use the old globals, they need to be updated.
