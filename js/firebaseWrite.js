// ----------------------------------------------------
// FIREBASE WRITE OPERATIONS MODULE
// FINAL — No more edits needed in the future
// ----------------------------------------------------

import { 
    collection,
    addDoc,
    setDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import { db, CURRENT_USER_ID } from "./firebase.js";

// ----------------------------------------------------
// SAFE HELPERS
// ----------------------------------------------------

function requiredUser() {
    if (!CURRENT_USER_ID) {
        console.error("Write blocked — no authenticated user yet.");
        return false;
    }
    return true;
}

// ----------------------------------------------------
// CHAT MESSAGE SENDER
// ----------------------------------------------------

export async function sendChatMessage(text, isCommand = false) {
    if (!requiredUser()) return;

    await addDoc(collection(db, "/app/chat"), {
        userId: CURRENT_USER_ID,
        text,
        isCommand,
        timestamp: Date.now()
    });
}

// ----------------------------------------------------
// TRIGGER GLOBAL GHOST EVENT
// (Hunts, flickers, curses, slams…)
// ----------------------------------------------------

export async function triggerGhostEvent(type) {
    if (!requiredUser()) return;

    const intensity = Math.floor(Math.random() * 5) + 1;

    await addDoc(collection(db, "/app/events"), {
        type,
        intensity,
        timestamp: Date.now(),
        triggeredBy: CURRENT_USER_ID
    });
}

// ----------------------------------------------------
// SAVE EVIDENCE
// ----------------------------------------------------

export async function saveEvidence(evidence) {
    if (!requiredUser()) return;

    await addDoc(collection(db, "/app/evidence"), {
        userId: CURRENT_USER_ID,
        evidence,
        timestamp: Date.now()
    });
}

// ----------------------------------------------------
// UPDATE PLAYER STATUS (Alive/Dead + Location)
// ----------------------------------------------------

export async function updatePlayerStatus({ isDead = null, location = null, map = null }) {
    if (!requiredUser()) return;

    const ref = doc(db, "/app/status", CURRENT_USER_ID);

    const update = {
        userId: CURRENT_USER_ID,
        timestamp: Date.now(),
    };

    if (isDead !== null) update.isDead = isDead;
    if (location !== null) update.location = location;
    if (map !== null) update.map = map;

    await setDoc(ref, update, { merge: true });
}

// ----------------------------------------------------
// SAVE USER PROFILE (Name + Photo URL)
// ----------------------------------------------------

export async function saveUserProfile(displayName, photoUrl) {
    if (!requiredUser()) return;

    await setDoc(doc(db, "/app/profiles", CURRENT_USER_ID), {
        displayName,
        photoUrl,
        lastSeen: Date.now()
    }, { merge: true });
}
