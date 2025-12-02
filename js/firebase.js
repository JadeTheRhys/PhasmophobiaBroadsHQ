import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB2WA7yotRlqNidwIgJcT19JNrK8ukMgs4",
    authDomain: "phasmophobiabroads.firebaseapp.com",
    projectId: "phasmophobiabroads",
    storageBucket: "phasmophobiabroads.firebasestorage.app",
    messagingSenderId: "503659624108",
    appId: "1:503659624108:web:6e57fbc6bf36b0d5989109"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export let CURRENT_USER_ID = null;

export function initializeFirebase(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            CURRENT_USER_ID = user.uid;
            document.getElementById("user-id-display").textContent =
                "Investigator: " + (CURRENT_USER_ID.substring(0,8) + "…");
            if (callback) callback(CURRENT_USER_ID);
        } else {
            await signInAnonymously(auth);
        }
    });
}
