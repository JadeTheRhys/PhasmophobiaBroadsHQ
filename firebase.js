
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
 apiKey: "AIzaSyB2WA7yotRlqNidwIgJcT19JNrK8ukMgs4",
 authDomain: "phasmophobiabroads.firebaseapp.com",
 projectId: "phasmophobiabroads",
 storageBucket: "phasmophobiabroads.firebasestorage.app",
 messagingSenderId: "503659624108",
 appId: "1:503659624108:web:6e57fbc6bf36b0d5989109"
};

const app = initializeApp(firebaseConfig);
window.db = getFirestore(app);
