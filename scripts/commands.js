// ===========================================
// COMMANDS.JS — MULTIPLAYER GHOST COMMAND SYSTEM
// ===========================================

// Use the global DB passed from index.html
const db = window.__DB;

let evidenceRef  = db.ref("evidence");
let statusRef    = db.ref("status");
let locationRef  = db.ref("locations");
let ghostRef     = db.ref("ghostlog");
let liveEventRef = db.ref("ghostEvent/live");

// ===========================================
// MAIN COMMAND HANDLER
// ===========================================
window.handleCommand = function (rawText, playerName = "Player") {
    if (!rawText.startsWith("!")) return;

    const text = rawText.trim();

    // --- HELP ---
    if (text === "!help") {
        ghostRef.push(`${playerName} opened help: Commands → !evidence:  !dead:  !revive:  !location:  !hunt  !event  !manifest  !flicker  !slam  !curse`);
        return;
    }

    // --- EVIDENCE ---
    if (text.startsWith("!evidence:")) {
        const ev = text.split(":")[1]?.trim();
        if (!ev) return;
        evidenceRef.push({ by: playerName, text: ev });
        return;
    }

    // --- DEAD ---
    if (text.startsWith("!dead:")) {
        const who = text.split(":")[1]?.trim();
        if (!who) return;
        statusRef.push({ text: `💀 ${who} is dead`, by: playerName });
        return;
    }

    // --- REVIVE ---
    if (text.startsWith("!revive:")) {
        const who = text.split(":")[1]?.trim();
        if (!who) return;
        statusRef.push({ text: `❤️ ${who} revived`, by: playerName });
        return;
    }

    // --- LOCATION ---
    if (text.startsWith("!location:")) {
        const info = text.split(":")[1]?.trim();
        if (!info) return;
        locationRef.push({ text: info, by: playerName });
        return;
    }

    // ===========================================
    // 🔥 GHOST EVENTS — send to hunt.js listener
    // ===========================================
    const eventList = ["!hunt", "!event", "!manifest", "!flicker", "!slam", "!curse"];
    const eventType = text.replace("!", "");

    if (eventList.includes(text)) {
        liveEventRef.set({
            type: eventType,
            by: playerName,
            time: Date.now()
        });
        return;
    }

    // --- UNKNOWN ---
    ghostRef.push(`Unknown command from ${playerName}: ${text}`);
};
