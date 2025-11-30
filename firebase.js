/* ============================================================
   PHASMOPHOBIA BROADS — FIREBASE INITIALIZER (FINAL BUILD)
   Modular Firebase v10 | GitHub-safe | No placeholders executed
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/* ============================================================
   🔥 IMPORTANT — INSERT YOUR REAL FIREBASE CONFIG BELOW
   ============================================================ */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
/* ============================================================
   END CONFIG
   ============================================================ */

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);
