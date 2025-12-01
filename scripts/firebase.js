// ==========================================================
// firebase.js — Version B (GLOBAL DB + PLAYER NAME)
// ==========================================================

// Prevent double-initialization if browser reloads scripts
if (!window.__FIREBASE_READY) {
    window.__FIREBASE_READY = true;

    // ---------------------------------------------
    // CONFIG — Your ONE Firebase configuration
    // ---------------------------------------------
    const firebaseConfig = {
        apiKey: "AIzaSyB2WA7yotRlqNidwIgJcT19JNrK8ukMgs4",
        authDomain: "phasmophobiabroads.firebaseapp.com",
        databaseURL: "https://phasmophobiabroads-default-rtdb.firebaseio.com",
        projectId: "phasmophobiabroads",
        storageBucket: "phasmophobiabroads.firebasestorage.app",
        messagingSenderId: "503659624108",
        appId: "1:503659624108:web:6e57fbc6bf36b0d5989109"
    };

    // ---------------------------------------------
    // INITIALIZE FIREBASE
    // ---------------------------------------------
    try {
        firebase.initializeApp(firebaseConfig);
        console.log("🔥 Firebase initialized (Version B)");
    } catch (err) {
        console.warn("Firebase already initialized, skipping.");
    }

    // ---------------------------------------------
    // Make a SINGLE GLOBAL database reference
    // ---------------------------------------------
    window.__DB = firebase.database();

    // ---------------------------------------------
    // PLAYER NAME — every script needs this
    // ---------------------------------------------
    let name = localStorage.getItem("phasmo_playername");

    if (!name) {
        name = prompt("Enter your name:") || "Player";
        localStorage.setItem("phasmo_playername", name);
    }

    window.PLAYER_NAME = name;
    console.log("🧍 Player Name:", window.PLAYER_NAME);
}
