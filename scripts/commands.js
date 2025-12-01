// ======================================================================
// commands.js — Version B
// Unified Ghost Commands, Evidence Sync, Player Status, Locations
// Works with main.js + hunt.js + firebase.js
// ======================================================================

// GLOBAL FIREBASE DB (set in firebase.js)
const db = window.__DB;

// Safety check
if (!db) console.error("❌ commands.js: Firebase DB missing!");

// Firebase references
const evidenceRef  = db.ref("evidence");
const statusRef    = db.ref("status");
const locationRef  = db.ref("locations");
const ghostLogRef  = db.ref("ghostlog");

// GLOBAL ghost event reference (hunt.js listens here)
const eventRef     = db.ref("ghostEvent/live");

// ======================================================================
// GHOST EVENT EMITTER
// ======================================================================
function emitGhostEvent(type, playerName) {
    const payload = {
        type,
        by: playerName,
        time: Date.now()
    };

    ghostLogRef.push(`👻 ${type.toUpperCase()} triggered by ${playerName}`);
    eventRef.set(payload);
}

// ======================================================================
// MAIN COMMAND HANDLER
// (Called directly from main.js whenever a player types "!something")
// ======================================================================
window.handleCommand = function(rawText, playerName = "Player") {

    if (!rawText.startsWith("!")) return;

    const text = rawText.trim().toLowerCase();

    // ------------------------------------------------------------
    // HELP
    // ------------------------------------------------------------
    if (text === "!help") {
        ghostLogRef.push(`${playerName} opened the help menu.`);
        return;
    }

    // ------------------------------------------------------------
    // EVIDENCE
    // ------------------------------------------------------------
    if (text.startsWith("!evidence:")) {
        const ev = text.split(":")[1]?.trim();
        if (!ev) return;

        evidenceRef.push({
            by: playerName,
            text: ev
        });

        ghostLogRef.push(`📘 Evidence update by ${playerName}: ${ev}`);
        return;
    }

    // ------------------------------------------------------------
    // DEAD
    // ------------------------------------------------------------
    if (text.startsWith("!dead:")) {
        const who = text.split(":")[1]?.trim();
        if (!who) return;

        statusRef.push({
            by: playerName,
            text: `<span class="tag">💀 Dead</span> ${who}`
        });

        ghostLogRef.push(`💀 ${who} reported dead by ${playerName}`);
        return;
    }

    // ------------------------------------------------------------
    // REVIVE
    // ------------------------------------------------------------
    if (text.startsWith("!revive:")) {
        const who = text.split(":")[1]?.trim();
        if (!who) return;

        statusRef.push({
            by: playerName,
            text: `<span class="tag">❤️ Revived</span> ${who}`
        });

        ghostLogRef.push(`❤️ ${who} revived by ${playerName}`);
        return;
    }

    // ------------------------------------------------------------
    // LOCATION UPDATE
    // ------------------------------------------------------------
    if (text.startsWith("!location:")) {
        const loc = text.split(":")[1]?.trim();
        if (!loc) return;

        locationRef.push({
            by: playerName,
            text: loc
        });

        ghostLogRef.push(`📍 ${playerName} → ${loc}`);
        return;
    }

    // ======================================================================
    // GHOST EVENT COMMANDS
    // (ALL synced through Firebase + animations handled in hunt.js)
    // ======================================================================

    if (text === "!hunt") {
        emitGhostEvent("hunt", playerName);
        return;
    }

    if (text === "!manifest") {
        emitGhostEvent("manifest", playerName);
        return;
    }

    if (text === "!flicker") {
        emitGhostEvent("flicker", playerName);
        return;
    }

    if (text === "!slam") {
        emitGhostEvent("slam", playerName);
        return;
    }

    if (text === "!curse") {
        emitGhostEvent("curse", playerName);
        return;
    }

    if (text === "!event") {
        emitGhostEvent("event", playerName);
        return;
    }

    // ------------------------------------------------------------
    // UNKNOWN COMMAND
    // ------------------------------------------------------------
    ghostLogRef.push(`❓ Unknown command from ${playerName}: ${rawText}`);
};
