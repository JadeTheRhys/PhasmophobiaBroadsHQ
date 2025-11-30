// =============================
// COMMANDS.JS — GHOST EVENTS + MULTIPLAYER
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
    ghostRef.push(`${playerName} opened help: Commands → !evidence:  !dead:  !revive:  !location:  !hunt  !event  !manifest  !flicker  !slam`);
    return;
  }

  // ---------------- EVIDENCE ----------------
  if (text.startsWith("!evidence:")) {
    const ev = text.split(":")[1]?.trim();
    if (!ev) return;
    evidenceRef.push({ by: playerName, text: ev });
    return;
  }

  // ---------------- DEAD ----------------
  if (text.startsWith("!dead:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;
    statusRef.push({ text: `<span class="tag">💀 Dead</span> ${who}`, by: playerName });
    return;
  }

  // ---------------- REVIVE ----------------
  if (text.startsWith("!revive:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;
    statusRef.push({ text: `<span class="tag">❤️ Revived</span> ${who}`, by: playerName });
    return;
  }

  // ---------------- LOCATION ----------------
  if (text.startsWith("!location:")) {
    const info = text.split(":")[1]?.trim();
    if (!info) return;
    locationRef.push({ text: info, by: playerName });
    return;
  }

  // =================================================
  // 🔥 GHOST EVENT COMMANDS
  // =================================================

  // HUNT
  if (text === "!hunt") {
    ghostRef.push(`👹 The ghost has started a HUNT triggered by ${playerName}! RUN!`);
    return;
  }

  // RANDOM EVENT
  if (text === "!event") {
    ghostRef.push(`👻 A ghost event just happened near ${playerName}…`);
    return;
  }

  // MANIFEST
  if (text === "!manifest") {
    ghostRef.push(`🫥 The ghost is manifesting in front of ${playerName}!`);
    return;
  }

  // LIGHT FLICKER
  if (text === "!flicker") {
    ghostRef.push(`💡 The lights begin flickering violently! (${playerName})`);
    return;
  }

  // DOOR SLAM
  if (text === "!slam") {
    ghostRef.push(`🚪 A door SLAMS shut behind ${playerName}!`);
    return;
  }

  // CURSED EVENT
  if (text === "!curse") {
    ghostRef.push(`🔮 A cursed presence surrounds ${playerName}… something feels WRONG.`);
    return;
  }

  // ---------------- UNKNOWN ----------------
  ghostRef.push(`Unknown command from ${playerName}: ${text}`);
};
