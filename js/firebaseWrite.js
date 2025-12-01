// ----------------------------------------------------
// FIREBASE WRITE OPERATIONS MODULE — FINAL
// This file is now fully synced with firebaseListeners.js
// No more edits will ever be needed.
// ----------------------------------------------------

import {
    collection,
    addDoc,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import { db, CURRENT_USER_ID } from "./firebase.js";

// ----------------------------------------------------
// COLLECTION PATHS (MATCH LISTENERS PERFECTLY)
// ----------------------------------------------------
const CHAT_PATH      = (appId) => `/artifacts/${appId}/public/data/chat_messages`;
const EVENTS_PATH    = (appId) => `/artifacts/${appId}/public/data/global_events`;
const EVIDENCE_PATH  = (appId) => `/artifacts/${appId}/public/data/evidence_tracker`;
const STATUS_PATH    = (appId) => `/artifacts/${appId}/public/data/player_status`;
const PROFILE_PATH   = (appId) => `/artifacts/${appId}/public/data/user_profiles`;


// appId is injected globally by index.html
const APP_ID = window.__app_id || "default-app";


// ----------------------------------------------------
// SAFETY CHECK
// ----------------------------------------------------
function requireUser() {
    if (!CURRENT_USER_ID) {
        console.error("Write blocked — user not authenticated yet.");
        return false;
    }
    return true;
}


// ----------------------------------------------------
// SEND CHAT MESSAGE
// ----------------------------------------------------
export async function sendChatMessage(text) {
    if (!requireUser()) return;

    await addDoc(collection(db, CHAT_PATH(APP_ID)), {
        userId: CURRENT_USER_ID,
        message: text,
        timestamp: Date.now(),
        isCommand: false
    });
}


// ----------------------------------------------------
// TRIGGER GLOBAL EVENT (hunt, slam, flicker, etc.)
// ----------------------------------------------------
async function writeGhostEvent(type) {
    if (!requireUser()) return;

    const intensity = Math.floor(Math.random() * 5) + 1;

    await addDoc(collection(db, EVENTS_PATH(APP_ID)), {
        type,
        intensity,
        timestamp: Date.now(),
        triggeredBy: CURRENT_USER_ID
    });
}


// ----------------------------------------------------
// SAVE EVIDENCE
// ----------------------------------------------------
async function writeEvidence(evidence) {
    if (!requireUser()) return;

    await addDoc(collection(db, EVIDENCE_PATH(APP_ID)), {
        userId: CURRENT_USER_ID,
        evidence,
        timestamp: Date.now()
    });
}


// ----------------------------------------------------
// UPDATE PLAYER STATUS (alive/dead + map + room)
// ----------------------------------------------------
async function writePlayerStatus({ isDead = null, location = null, map = null }) {
    if (!requireUser()) return;

    const ref = doc(db, STATUS_PATH(APP_ID), CURRENT_USER_ID);

    const update = {
        userId: CURRENT_USER_ID,
        timestamp: Date.now()
    };

    if (isDead !== null) update.isDead = isDead;
    if (location !== null) update.location = location;
    if (map !== null) update.map = map;

    await setDoc(ref, update, { merge: true });
}


// ----------------------------------------------------
// SAVE PROFILE
// ----------------------------------------------------
export async function saveUserProfile(displayName, photoUrl) {
    if (!requireUser()) return;

    await setDoc(doc(db, PROFILE_PATH(APP_ID), CURRENT_USER_ID), {
        displayName,
        photoUrl,
        lastSeen: Date.now()
    }, { merge: true });
}


// ----------------------------------------------------
// MASTER COMMAND HANDLER
// ----------------------------------------------------
export async function sendCommand(command, value, rawMessage) {
    if (!requireUser()) return;

    // 1. Log command to chat
    await addDoc(collection(db, CHAT_PATH(APP_ID)), {
        userId: CURRENT_USER_ID,
        message: rawMessage,
        timestamp: Date.now(),
        isCommand: true
    });

    // 2. Route command to correct handler
    switch (command) {
        case "hunt":
        case "slam":
        case "flicker":
        case "curse":
        case "manifest":
        case "event":
            return writeGhostEvent(command);

        case "evidence":
            return writeEvidence(value);

        case "dead":
            return writePlayerStatus({ isDead: true });

        case "revive":
            return writePlayerStatus({ isDead: false });

        case "location":
            // support map or map/room
            const parts = value.split("/");
            if (parts.length === 2) {
                return writePlayerStatus({
                    map: parts[0],
                    location: parts[1]
                });
            }
            return writePlayerStatus({ location: value });

        default:
            console.warn("Unknown command:", command);
    }
}
