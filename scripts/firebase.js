// ============================================================
// firebase.js — Version B
// Initializes Firebase + exposes db + playerName globally
// ============================================================

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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

console.log("🔥 Firebase initialized (Version B)");


// ----------------------
// PLAYER NAME
// ----------------------
let playerName = localStorage.getItem("playerName");

if (!playerName) {
    playerName = prompt("Enter your name:") || "Player";
    localStorage.setItem("playerName", playerName);
}

console.log("🎮 Player:", playerName);


// ----------------------
// EXPORTS for ES modules
// ----------------------
export { app, db, playerName };

// Also expose globals for non-module scripts (commands.js + hunt.js)
window.__DB = db;
window.PLAYER_NAME = playerName;
