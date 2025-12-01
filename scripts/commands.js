// =======================================
// commands.js — GLOBAL COMMAND HANDLER
// =======================================

let db = null;
let evidenceRef = null;
let statusRef = null;
let locationRef = null;
let ghostRef = null;
let liveEventRef = null;

// Called from index.html AFTER Firebase initializes
window.setupCommandRefs = function(firebaseDB) {
  db = firebaseDB;

  evidenceRef = db.ref("evidence");
  statusRef   = db.ref("status");
  locationRef = db.ref("locations");
  ghostRef    = db.ref("ghostlog");
  liveEventRef = db.ref("ghostEvent/live");
};


// =======================================
// MAIN COMMAND HANDLER
// =======================================

window.handleCommand = function(rawText, playerName = "Player") {
  if (!rawText.startsWith("!")) return;
  const text = rawText.trim();

  // -------------- HELP --------------
  if (text === "!help") {
    ghostRef.push(`${playerName} opened help → commands: !hunt !flicker !slam !manifest !curse !event !evidence: X !dead: X !revive: X !location: X`);
    return;
  }

  // -------------- EVIDENCE --------------
  if (text.startsWith("!evidence:")) {
    const value = text.split(":")[1]?.trim();
    if (!value) return;
    evidenceRef.push({ text: value, by: playerName });
    return;
  }

  // -------------- DEAD ------------------
  if (text.startsWith("!dead:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;
    statusRef.push({ text: `💀 Dead — ${who}`, by: playerName });
    return;
  }

  // -------------- REVIVE ------------------
  if (text.startsWith("!revive:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;
    statusRef.push({ text: `❤️ Revived — ${who}`, by: playerName });
    return;
  }

  // -------------- LOCATION ------------------
  if (text.startsWith("!location:")) {
    const value = text.split(":")[1]?.trim();
    if (!value) return;
    locationRef.push({ text: value, by: playerName });
    return;
  }


  // ==========================================================
  // 🔥 GHOST EVENT COMMANDS (send to global animation channel)
  // ==========================================================

  const sendEvent = (type) => {
    ghostRef.push(`${playerName} triggered: ${type.toUpperCase()}`);
    liveEventRef.set({ type, by: playerName, time: Date.now() });
  };

  if (text === "!hunt")     return sendEvent("hunt");
  if (text === "!flicker")  return sendEvent("flicker");
  if (text === "!slam")     return sendEvent("slam");
  if (text === "!manifest") return sendEvent("manifest");
  if (text === "!curse")    return sendEvent("curse");
  if (text === "!event")    return sendEvent("event");

  // -------------- UNKNOWN ------------------
  ghostRef.push(`Unknown command from ${playerName}: ${text}`);
};
