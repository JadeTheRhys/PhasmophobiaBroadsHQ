// =============================
// COMMANDS.JS — MULTIPLAYER VERSION
// Syncs Evidence, Status, Locations, Ghost Log
// =============================

// Firebase references from index.html
let db = null;
let evidenceRef = null;
let statusRef = null;
let locationRef = null;
let ghostRef = null;

// Called from index.html after Firebase initializes
window.setupCommandRefs = function(firebaseDB) {
  db = firebaseDB;
  evidenceRef = db.ref("evidence");
  statusRef   = db.ref("status");
  locationRef = db.ref("locations");
  ghostRef    = db.ref("ghostlog");
};

// -----------------------------------
// MAIN COMMAND HANDLER
// -----------------------------------
window.handleCommand = function(rawText, playerName = "Player") {
  if (!rawText.startsWith("!")) return;

  const text = rawText.trim();

  // ---------------- HELP ----------------
  if (text === "!help") {
    ghostRef.push(`${playerName} opened help.`);
    return;
  }

  // ---------------- EVIDENCE ----------------
  if (text.startsWith("!evidence:")) {
    const ev = text.split(":")[1]?.trim();
    if (!ev) return;

    evidenceRef.push({
      by: playerName,
      text: ev
    });
    return;
  }

  // ---------------- DEAD ----------------
  if (text.startsWith("!dead:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({
      text: `<span class="tag">💀 Dead</span> ${who}`,
      by: playerName
    });
    return;
  }

  // ---------------- REVIVE ----------------
  if (text.startsWith("!revive:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({
      text: `<span class="tag">❤️ Revived</span> ${who}`,
      by: playerName
    });
    return;
  }

  // ---------------- LOCATION ----------------
  if (text.startsWith("!location:")) {
    const info = text.split(":")[1]?.trim();
    if (!info) return;

    locationRef.push({
      text: info,
      by: playerName
    });
    return;
  }

  // ---------------- UNKNOWN ----------------
  ghostRef.push(`Unknown command from ${playerName}: ${text}`);
};
