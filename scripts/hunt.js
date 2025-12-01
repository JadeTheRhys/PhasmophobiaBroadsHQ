// ============================================================
// hunt.js — Version B (ES MODULE)
// Global Ghost Event Listener + Visual Effects
// Works with commands.js + firebase.js + animations.css
// ============================================================

import { db } from "./firebase.js";
import {
    ref,
    onValue
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Safety check
if (!db) console.error("❌ hunt.js: Firebase DB missing!");

// Firebase event path — commands.js writes here
const eventRef = ref(db, "ghostEvent/live");

// ============================================================
// APPLY VISUAL EFFECT
// Adds a class → waits → removes it
// ============================================================
function runEffect(className, duration = 2000) {
    document.body.classList.add(className);
    setTimeout(() => {
        document.body.classList.remove(className);
    }, duration);
}

// ============================================================
// HANDLE REMOTE GHOST EVENTS
// ============================================================
function handleGhostEvent(type, by) {
    console.log(`👻 Ghost event received: ${type} by ${by}`);

    switch (type) {
        case "hunt":
            runEffect("hunt-active", 5000);
            break;

        case "manifest":
            runEffect("ghost-manifest", 3000);
            break;

        case "flicker":
            runEffect("lights-flicker", 1500);
            break;

        case "slam":
            runEffect("door-slam", 1500);
            break;

        case "curse":
            runEffect("curse-effect", 4000);
            break;

        case "event":
            runEffect("ghost-event", 2000);
            break;

        default:
            console.warn("⚠ Unknown ghost event:", type);
    }
}

// ============================================================
// LISTEN FOR LIVE EVENTS
// ALL players receive the ghost events instantly
// ============================================================
onValue(eventRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    const { type, by } = data;
    if (!type) return;

    handleGhostEvent(type, by);
});

// Done
console.log("👹 hunt.js (Version B) loaded.");
