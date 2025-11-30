// =============================
// COMMANDS.JS — MULTIPLAYER VERSION
// Syncs Evidence, Status, Locations, Ghost Log
// =============================

// Firebase references injected from index.html
let db = null;
let evidenceRef = null;
let statusRef = null;
let locationRef = null;
let ghostRef = null;

// Called from index.html after Firebase initializes
export function setupCommandRefs(firebaseDB) {
  db = firebaseDB;

  evidenceRef = db.ref("evidence");
  statusRef   = db.ref("status");
  locationRef = db.ref("locations");
  ghostRef    = db.ref("ghostlog");
}

// ------------------------------
// Add entries to the UI panels
// ------------------------------
function addEvidenceToUI(text) {
  const list = document.getElementById("evidence-list");
  const p = document.createElement("p");
  p.innerHTML = `<span class="tag">📘 Evidence</span> ${text}`;
  list.appendChild(p);
}

function addStatusToUI(text) {
  const list = document.getElementById("status-list");
  const p = document.createElement("p");
  p.innerHTML = text;
  list.appendChild(p);
}

function addLocationToUI(text) {
  const list = document.getElementById("location-list");
  const p = document.createElement("p");
  p.innerHTML = `<span class="tag">📍 Location</span> ${text}`;
  list.appendChild(p);
}

function addGhostToUI(text) {
  const list = document.getElementById("ghost-log");
  const p = document.createElement("p");
  p.textContent = text;
  list.appendChild(p);
}

// -----------------------------------
// MAIN COMMAND HANDLER
// -----------------------------------
export function handleCommand(rawText, playerName = "Player") {
  if (!rawText.startsWith("!")) return;

  const text = rawText.trim();

  // ---------------- HELP ----------------
  if (text === "!help") {
    ghostRef.push(`${playerName} opened help.`);
    addGhostToUI("Commands: !help, !evidence:, !dead:, !revive:, !location:");
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
}
