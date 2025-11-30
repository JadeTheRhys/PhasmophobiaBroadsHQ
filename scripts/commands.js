// ==========================================
// COMMANDS.JS — MULTIPLAYER SYNC VERSION
// Works with Firebase Compat + Window Global
// ==========================================

// Firebase DB refs (firebase is global because of compat scripts)
const db = firebase.database();
const evidenceRef  = db.ref("evidence");
const statusRef    = db.ref("status");
const locationRef  = db.ref("locations");
const ghostRef     = db.ref("ghostlog");

// UI elements
const evidenceList  = document.getElementById("evidence-list");
const statusList    = document.getElementById("status-list");
const locationList  = document.getElementById("location-list");
const ghostLog      = document.getElementById("ghost-log");

// Helper to append rows
function addRow(target, html) {
  const p = document.createElement("p");
  p.innerHTML = html;
  target.appendChild(p);
}

// Log ghost events (also send to Firebase)
function logGhost(text) {
  addRow(ghostLog, text);
  ghostRef.push(text);
}

// =====================================================
// RECEIVE REALTIME UPDATES FROM FIREBASE
// =====================================================

// Evidence sync
evidenceRef.on("child_added", snap => {
  addRow(evidenceList, `<span class="tag">📘 Evidence</span> ${snap.val()}`);
});

// Status sync
statusRef.on("child_added", snap => {
  const v = snap.val();
  if (v.type === "dead") {
    addRow(statusList, `<span class="tag">💀 Dead</span> ${v.name}`);
  }
  if (v.type === "revive") {
    addRow(statusList, `<span class="tag">❤️ Revived</span> ${v.name}`);
  }
});

// Locations sync
locationRef.on("child_added", snap => {
  addRow(locationList, `<span class="tag">📍 Location</span> ${snap.val()}`);
});

// Ghost log sync
ghostRef.on("child_added", snap => {
  addRow(ghostLog, snap.val());
});

// =====================================================
// MAIN COMMAND HANDLER
// (NO EXPORT — MADE GLOBAL AT BOTTOM)
// =====================================================
function handleCommand(text) {

  if (!text.startsWith("!")) return;

  const cmd = text.toLowerCase();

  // ------------------------------
  // !help
  // ------------------------------
  if (cmd === "!help") {
    logGhost("Commands: !help, !clear, !evidence, !dead, !revive, !location");
    return;
  }

  // ------------------------------
  // !clear — LOCAL ONLY
  // ------------------------------
  if (cmd === "!clear") {
    evidenceList.innerHTML = "";
    statusList.innerHTML   = "";
    locationList.innerHTML = "";
    ghostLog.innerHTML     = "";
    return;
  }

  // ------------------------------
  // !evidence: EMF 5
  // ------------------------------
  if (cmd.startsWith("!evidence:")) {
    const ev = text.split(":")[1]?.trim();
    if (!ev) return;

    evidenceRef.push(ev);
    ghostRef.push(`New evidence logged: ${ev}`);
    return;
  }

  // ------------------------------
  // !location: Starla -> Basement
  // ------------------------------
  if (cmd.startsWith("!location:")) {
    const loc = text.split(":")[1]?.trim();
    if (!loc) return;

    locationRef.push(loc);
    ghostRef.push(`Location updated: ${loc}`);
    return;
  }

  // ------------------------------
  // !dead: Starla
  // ------------------------------
  if (cmd.startsWith("!dead:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({ type: "dead", name: who });
    ghostRef.push(`${who} was marked DEAD.`);
    return;
  }

  // ------------------------------
  // !revive: Starla
  // ------------------------------
  if (cmd.startsWith("!revive:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({ type: "revive", name: who });
    ghostRef.push(`${who} has been REVIVED.`);
    return;
  }

  // ------------------------------
  // Unknown
  // ------------------------------
  ghostRef.push(`Unknown command: ${text}`);
}

// Make globally accessible for index.html
window.handleCommand = handleCommand;
