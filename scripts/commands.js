// =============================
// COMMANDS.JS — MULTIPLAYER VERSION
// Syncs Evidence, Status, Locations, Ghost Log
// =============================

// Firebase shortcuts (db is created in index.html)
const evidenceRef  = firebase.database().ref("evidence");
const statusRef    = firebase.database().ref("status");
const locationRef  = firebase.database().ref("locations");
const ghostRef     = firebase.database().ref("ghostlog");

// UI elements
const evidenceList  = document.getElementById("evidence-list");
const statusList    = document.getElementById("status-list");
const locationList  = document.getElementById("location-list");
const ghostLog      = document.getElementById("ghost-log");

// Helper: add <p> entry
function addRow(target, html) {
  const p = document.createElement("p");
  p.innerHTML = html;
  target.appendChild(p);
}

// Helper: add ghost log entry
function logGhost(text) {
  addRow(ghostLog, text);
  ghostRef.push(text);     // sync online
}

// =====================================================
// RECEIVE UPDATES FROM FIREBASE
// =====================================================

// Evidence
evidenceRef.on("child_added", snap => {
  addRow(evidenceList, `<span class="tag">📘 Evidence</span> ${snap.val()}`);
});

// Status
statusRef.on("child_added", snap => {
  const val = snap.val();
  if (val.type === "dead") {
    addRow(statusList, `<span class="tag">💀 Dead</span> ${val.name}`);
  }
  if (val.type === "revive") {
    addRow(statusList, `<span class="tag">❤️ Revived</span> ${val.name}`);
  }
});

// Locations
locationRef.on("child_added", snap => {
  addRow(locationList, `<span class="tag">📍 Location</span> ${snap.val()}`);
});

// Ghost log
ghostRef.on("child_added", snap => {
  addRow(ghostLog, snap.val());
});

// =====================================================
// MAIN COMMAND HANDLER
// =====================================================
export function handleCommand(text) {

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
  // !clear (local only)
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
