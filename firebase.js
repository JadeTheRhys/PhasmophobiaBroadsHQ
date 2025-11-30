/* ============================================================
   PHASMOPHOBIA BROADS — FIREBASE INITIALIZER (FINAL BUILD)
   Modular Firebase v10 | GitHub-safe | No placeholders executed
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/* ============================================================
   FIREBASE CONFIGURATION (Provided by user)
   ============================================================ */
const firebaseConfig = {
  apiKey: "AIzaSyB2WA7yotRlqNidwIgJcT19JNrK8ukMgs4",
  authDomain: "phasmophobiabroads.firebaseapp.com",
  // Database URL is required for getDatabase, inferred from projectId
  databaseURL: "https://phasmophobiabroads-default-rtdb.firebaseio.com",
  projectId: "phasmophobiabroads",
  storageBucket: "phasmophobiabroads.firebasestorage.app",
  messagingSenderId: "503659624108",
  appId: "1:503659624108:web:6e57fbc6bf36b0d5989109"
};
/* ============================================================
   END CONFIG
   ============================================================ */

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);
