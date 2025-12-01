// -----------------------------------------------------
// FIREBASE LISTENERS MODULE
// This file ONLY listens to Firestore changes and
// passes them to callback functions provided by main.js
// -----------------------------------------------------

import { 
    collection, 
    onSnapshot,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import { db, CURRENT_USER_ID } from "./firebase.js";

// Callback registry
const listeners = {
    chat: null,
    events: null,
    evidence: null,
    status: null,
    profiles: null,
};

// -----------------------------------------------------
// REGISTER CALLBACKS
// -----------------------------------------------------

export function registerChatCallback(fn) {
    listeners.chat = fn;
}

export function registerEventCallback(fn) {
    listeners.events = fn;
}

export function registerEvidenceCallback(fn) {
    listeners.evidence = fn;
}

export function registerStatusCallback(fn) {
    listeners.status = fn;
}

export function registerProfilesCallback(fn) {
    listeners.profiles = fn;
}

// -----------------------------------------------------
// LISTENER INITIALIZATION
// Called once Firebase Auth is ready
// -----------------------------------------------------

export function initializeFirebaseListeners() {
    console.log("🔥 Firebase listeners starting…");

    setupChatListener();
    setupGlobalEventListener();
    setupEvidenceListener();
    setupStatusListener();
    setupProfilesListener();

    console.log("✨ All listeners active.");
}

// -----------------------------------------------------
// CHAT LISTENER
// -----------------------------------------------------

function setupChatListener() {
    const chatRef = collection(db, "/app/chat");
    const q = query(chatRef, orderBy("timestamp", "asc"));

    onSnapshot(q, (snapshot) => {
        const messages = [];
        snapshot.forEach(doc => {
            messages.push({ id: doc.id, ...doc.data() });
        });

        if (listeners.chat) listeners.chat(messages);
    });
}

// -----------------------------------------------------
// GHOST EVENT LISTENER (Hunts, Flickers, Slams…)
// -----------------------------------------------------

function setupGlobalEventListener() {
    const eventsRef = collection(db, "/app/events");

    onSnapshot(eventsRef, (snapshot) => {
        snapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                const data = change.doc.data();
                if (listeners.events) {
                    listeners.events({
                        id: change.doc.id,
                        ...data
                    });
                }
            }
        });
    });
}

// -----------------------------------------------------
// EVIDENCE TRACKER LISTENER
// -----------------------------------------------------

function setupEvidenceListener() {
    const evRef = collection(db, "/app/evidence");
    const q = query(evRef, orderBy("timestamp", "asc"));

    onSnapshot(q, (snapshot) => {
        const list = [];
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));

        if (listeners.evidence) listeners.evidence(list);
    });
}

// -----------------------------------------------------
// PLAYER STATUS LISTENER (Alive, Dead, Map, Room…)
// -----------------------------------------------------

function setupStatusListener() {
    const statusRef = collection(db, "/app/status");

    onSnapshot(statusRef, (snapshot) => {
        const statuses = {};
        snapshot.forEach(doc => statuses[doc.id] = doc.data());

        if (listeners.status) listeners.status(statuses);
    });
}

// -----------------------------------------------------
// USER PROFILES LISTENER (Display name, photo…)
// -----------------------------------------------------

function setupProfilesListener() {
    const profRef = collection(db, "/app/profiles");

    onSnapshot(profRef, (snapshot) => {
        const profiles = {};
        snapshot.forEach(doc => profiles[doc.id] = doc.data());

        if (listeners.profiles) listeners.profiles(profiles);
    });
}
