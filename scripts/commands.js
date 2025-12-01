// =======================================================
// commands.js — FINAL SAFE VERSION
// Handles ALL player commands + ghost events
// Fully synced with index.html and hunt.js
// =======================================================

// Pull global DB reference created in index.html
const db = window.__DB;

// Firebase paths
const evidenceRef  = db.ref("evidence");
const statusRef    = db.ref("status");
const locationRef  = db.ref("locations");
const ghostLogRef  = db.ref("ghostlog");
const eventRef     = db.ref("ghostEvent/live");

// =======================================================
// HELPER — Send a live ghost event to hunt.js
// =======================================================
function triggerGhostEvent(type, playerName) {
  ghostLogRef.push(`👻 ${type.toUpperCase()} triggered by ${playerName}`);
  eventRef.set({
    type,
    by: playerName,
    time: Date.now()
  });
}

// =======================================================
// MAIN COMMAND HANDLER
// Called by index.html → window.handleCommand()
// =======================================================
window.handleCommand = function (rawInput, playerName = "Player") {

  if (!rawInput.startsWith("!")) return;

  const input = rawInput.trim();
  const rawLower = input.toLowerCase();

  // -------------------------------------------------------
  // HELP
  // -------------------------------------------------------
  if (rawLower === "!help") {
    ghostLogRef.push(`${playerName} opened the help menu.`);
    return;
  }

  // -------------------------------------------------------
  // EVIDENCE
  // -------------------------------------------------------
  if (rawLower.startsWith("!evidence:")) {
    const ev = input.split(":")[1]?.trim();
    if (!ev) return;

    evidenceRef.push({
      by: playerName,
      text: ev
    });

    ghostLogRef.push(`📘 Evidence by ${playerName}: ${ev}`);
    return;
  }

  // -------------------------------------------------------
  // DEAD
  // -------------------------------------------------------
  if (rawLower.startsWith("!dead:")) {
    const who = input.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({
      by: playerName,
      text: `<span class="tag">💀 Dead</span> ${who}`
    });

    ghostLogRef.push(`💀 ${who} is dead (reported by ${playerName})`);
    return;
  }

  // -------------------------------------------------------
  // REVIVE
  // -------------------------------------------------------
  if (rawLower.startsWith("!revive:")) {
    const who = input.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({
      by: playerName,
      text: `<span class="tag">❤️ Revived</span> ${who}`
    });

    ghostLogRef.push(`❤️ ${who} revived by ${playerName}`);
    return;
  }

  // -------------------------------------------------------
  // LOCATION
  // -------------------------------------------------------
  if (rawLower.startsWith("!location:")) {
    const loc = input.split(":")[1]?.trim();
    if (!loc) return;

    locationRef.push({
      by: playerName,
      text: loc
    });

    ghostLogRef.push(`📍 Location update from ${playerName}: ${loc}`);
    return;
  }

  // =======================================================
  // ⭐ GHOST EVENT COMMANDS (connect directly to hunt.js)
  // =======================================================

  if (rawLower === "!hunt") {
    triggerGhostEvent("hunt", playerName);
    return;
  }

  if (rawLower === "!manifest") {
    triggerGhostEvent("manifest", playerName);
    return;
  }

  if (rawLower === "!flicker") {
    triggerGhostEvent("flicker", playerName);
    return;
  }

  if (rawLower === "!slam") {
    triggerGhostEvent("slam", playerName);
    return;
  }

  if (rawLower === "!curse") {
    triggerGhostEvent("curse", playerName);
    return;
  }

  if (rawLower === "!event") {
    triggerGhostEvent("event", playerName);
    return;
  }

  // -------------------------------------------------------
  // UNKNOWN COMMAND
  // -------------------------------------------------------
  ghostLogRef.push(`Unknown command from ${playerName}: ${input}`);
};
