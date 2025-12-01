// ======================================================================
// commands.js — FINAL MODULAR FIX
// Unified Ghost Commands, Evidence Sync, Player Status, Locations
// ======================================================================

// ------------------------------------------------------------
// MODULAR IMPORTS
// ------------------------------------------------------------
import { db, playerName } from "./firebase.js";

// Import modular database functions
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Safety check
if (!db) console.error("❌ commands.js: Firebase DB missing!");


// ------------------------------------------------------------
// FIREBASE REFERENCES (Modular Style)
// ------------------------------------------------------------
const evidenceRef = ref(db, "evidence");
const statusRef = ref(db, "status");
const locationRef = ref(db, "locations");
const ghostLogRef = ref(db, "ghostlog");

// GLOBAL ghost event reference (hunt.js listens here)
const eventRef = ref(db, "ghostEvent/live");


// ======================================================================
// GHOST EVENT EMITTER
// ======================================================================
function emitGhostEvent(type, playerName) {
    const payload = {
        type,
        by: playerName,
        time: Date.now()
    };

    // Log ghost activity (using modular push)
    push(ghostLogRef, `👻 ${type.toUpperCase()} triggered by ${playerName}`);

    // Push event to hunt.js listeners (using modular set)
    set(eventRef, payload);
}


// ======================================================================
// MAIN COMMAND HANDLER
// (Attached globally so main.js/chat.js can call it)
// ======================================================================
window.handleCommand = function(rawText, playerName = "Player") {

    if (!rawText.startsWith("!")) return;

    // Use a clean version of playerName if the global one isn't set yet
    const currentName = window.PLAYER_NAME || playerName || "Player";

    const text = rawText.trim().toLowerCase();

    // ------------------------------------------------------------
    // HELP
    // ------------------------------------------------------------
    if (text === "!help") {
        push(ghostLogRef, `${currentName} opened the help menu.`);
        return;
    }

    // ------------------------------------------------------------
    // EVIDENCE
    // ------------------------------------------------------------
    if (text.startsWith("!evidence:")) {
        const ev = text.split(":")[1]?.trim();
        if (!ev) return;

        push(evidenceRef, {
            by: currentName,
            text: ev
        });

        push(ghostLogRef, `📘 Evidence update by ${currentName}: ${ev}`);
        return;
    }

    // ------------------------------------------------------------
    // DEAD
    // ------------------------------------------------------------
    if (text.startsWith("!dead:")) {
        const who = text.split(":")[1]?.trim();
        if (!who) return;

        push(statusRef, {
            by: currentName,
            text: `<span class="tag">💀 Dead</span> ${who}`
        });

        push(ghostLogRef, `💀 ${who} reported dead by ${currentName}`);
        return;
    }

    // ------------------------------------------------------------
    // REVIVE
    // ------------------------------------------------------------
    if (text.startsWith("!revive:")) {
        const who = text.split(":")[1]?.trim();
        if (!who) return;

        push(statusRef, {
            by: currentName,
            text: `<span class="tag">❤️ Revived</span> ${who}`
        });

        push(ghostLogRef, `❤️ ${who} revived by ${currentName}`);
        return;
    }

    // ------------------------------------------------------------
    // LOCATION UPDATE
    // ------------------------------------------------------------
    if (text.startsWith("!location:")) {
        const loc = text.split(":")[1]?.trim();
        if (!loc) return;

        push(locationRef, {
            by: currentName,
            text: loc
        });

        push(ghostLogRef, `📍 ${currentName} → ${loc}`);
        return;
    }

    // ======================================================================
    // 🔥 GHOST EVENT COMMANDS
    // ======================================================================

    if (["!hunt", "!manifest", "!flicker", "!slam", "!curse", "!event"].includes(text)) {
        // Extract command name without '!'
        const eventType = text.substring(1); 
        emitGhostEvent(eventType, currentName);
        return;
    }

    // ------------------------------------------------------------
    // UNKNOWN COMMAND
    // ------------------------------------------------------------
    push(ghostLogRef, `❓ Unknown command from ${currentName}: ${rawText}`);
};
