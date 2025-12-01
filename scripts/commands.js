// ======================================================================
// commands.js — Version B (ES MODULE)
// Handles Evidence, Status, Locations + Ghost Event Commands
// Works with firebase.js, main.js, hunt.js
// ======================================================================

import { db, playerName } from "./firebase.js";
import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Safety check
if (!db) console.error("❌ commands.js: Firebase DB missing!");

// Firebase references
const evidenceRef  = ref(db, "evidence");
const statusRef    = ref(db, "status");
const locationRef  = ref(db, "locations");
const ghostLogRef  = ref(db, "ghostlog");

// Global ghost event reference (hunt.js listens to this)
const eventRef     = ref(db, "ghostEvent/live");

// ======================================================================
// PUSH GHOST EVENT — hunt.js picks this up and animates screen
// ======================================================================
function emitGhostEvent(type) {
    const payload = {
        type,
        by: playerName,
        time: Date.now()
    };

    push(ghostLogRef, `👻 ${type.toUpperCase()} triggered by ${playerName}`);
    set(eventRef, payload);
}

// ======================================================================
// MAIN COMMAND HANDLER (called from main.js)
// ======================================================================
export function handleCommand(rawText) {

    if (!rawText.startsWith("!")) return;

    const text = rawText.trim().toLowerCase();

    // ------------------------------------------------------------
    // HELP
    // ------------------------------------------------------------
    if (text === "!help") {
        push(ghostLogRef, `${playerName} opened the help menu.`);
        return;
    }

    // ------------------------------------------------------------
    // EVIDENCE
    // ------------------------------------------------------------
    if (text.startsWith("!evidence:")) {
        const ev = text.split(":")[1]?.trim();
        if (!ev) return;

        push(evidenceRef, {
            by: playerName,
            text: ev
        });

        push(ghostLogRef, `📘 Evidence by ${playerName}: ${ev}`);
        return;
    }

    // ------------------------------------------------------------
    // DEAD
    // ------------------------------------------------------------
    if (text.startsWith("!dead:")) {
        const who = text.split(":")[1]?.trim();
        if (!who) return;

        push(statusRef, {
            by: playerName,
            text: `<span class="tag">💀 Dead</span> ${who}`
        });

        push(ghostLogRef, `💀 ${who} reported dead by ${playerName}`);
        return;
    }

    // ------------------------------------------------------------
    // REVIVE
    // ------------------------------------------------------------
    if (text.startsWith("!revive:")) {
        const who = text.split(":")[1]?.trim();
        if (!who) return;

        push(statusRef, {
            by: playerName,
            text: `<span class="tag">❤️ Revived</span> ${who}`
        });

        push(ghostLogRef, `❤️ ${who} revived by ${playerName}`);
        return;
    }

    // ------------------------------------------------------------
    // LOCATION UPDATE
    // ------------------------------------------------------------
    if (text.startsWith("!location:")) {
        const loc = text.split(":")[1]?.trim();
        if (!loc) return;

        push(locationRef, {
            by: playerName,
            text: loc
        });

        push(ghostLogRef, `📍 ${playerName} → ${loc}`);
        return;
    }

    // ======================================================================
    // GHOST EVENT COMMANDS — synced through Firebase + animated by hunt.js
    // ======================================================================

    if (text === "!hunt")     return emitGhostEvent("hunt");
    if (text === "!manifest") return emitGhostEvent("manifest");
    if (text === "!flicker")  return emitGhostEvent("flicker");
    if (text === "!slam")     return emitGhostEvent("slam");
    if (text === "!curse")    return emitGhostEvent("curse");
    if (text === "!event")    return emitGhostEvent("event");

    // ------------------------------------------------------------
    // UNKNOWN COMMAND
    // ------------------------------------------------------------
    push(ghostLogRef, `❓ Unknown command from ${playerName}: ${rawText}`);
}
