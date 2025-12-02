import {
    collection,
    addDoc,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { db, CURRENT_USER_ID } from "./firebase.js";

function requiredUser() {
    if (!CURRENT_USER_ID) {
        alert("Write blocked — no authenticated user yet."); // Show alert if wanted
        return false;
    }
    return true;
}

export async function sendChatMessage(text, isCommand = false) {
    if (!requiredUser()) return;
    await addDoc(collection(db, "/app/chat"), {
        userId: CURRENT_USER_ID,
        text,
        isCommand,
        timestamp: Date.now()
    });
}

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

export async function saveEvidence(evidence) {
    if (!requiredUser()) return;
    await addDoc(collection(db, "/app/evidence"), {
        userId: CURRENT_USER_ID,
        evidence,
        timestamp: Date.now()
    });
}

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

export async function saveUserProfile(displayName, photoUrl) {
    if (!requiredUser()) return;
    await setDoc(doc(db, "/app/profiles", CURRENT_USER_ID), {
        displayName,
        photoUrl,
        lastSeen: Date.now()
    }, { merge: true });
}

// COMMAND PARSER!
export async function sendCommand(command, value, raw) {
    command = command.toLowerCase();
    if (["hunt", "flicker", "manifest", "curse", "slam", "event"].includes(command)) {
        await triggerGhostEvent(command);
    } else if (command === "evidence" && value) {
        await saveEvidence(value);
    } else if (command === "dead" && value) {
        await updatePlayerStatus({ isDead: true });
    } else if (command === "revive" && value) {
        await updatePlayerStatus({ isDead: false });
    } else if (command === "location" && value) {
        await updatePlayerStatus({ location: value });
    } else {
        alert("Unknown command: !" + command);
    }
}
