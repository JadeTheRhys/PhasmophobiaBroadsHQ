// ======================================================================
// commands.js — Version B (Full UI, Casefiles, Ghost Events, Safe Sync)
// Works with index.html + hunt.js + animations.css
// ======================================================================

// Use global Firebase DB injected from index.html
const db = window.__DB;

// Database references
const evidenceRef = db.ref("evidence");
const statusRef   = db.ref("status");
const locationRef = db.ref("locations");
const ghostLogRef = db.ref("ghostlog");
const eventRef    = db.ref("ghostEvent/live");

// Helper → Push a ghost event to Firebase
function triggerGhostEvent(type, playerName) {
  eventRef.set({
    type,
    by: playerName,
    time: Date.now()
  });

  ghostLogRef.push(`👻 ${type.toUpperCase()} triggered by ${playerName}`);
}

// ======================================================================
// MAIN COMMAND HANDLER
// ======================================================================
window.handleCommand = function(rawText, playerName = "Player") {
  if (!rawText.startsWith("!")) return;

  const text = rawText.trim().toLowerCase();

  // ------------------------------------------------------------------
  // HELP
  // ------------------------------------------------------------------
  if (text === "!help") {
    ghostLogRef.push(
      `${playerName} checked help → Commands: !evidence !dead !revive !location !hunt !manifest !flicker !slam !curse !event`
    );
    return;
  }

  // ------------------------------------------------------------------
  // EVIDENCE
  // ------------------------------------------------------------------
  if (text.startsWith("!evidence:")) {
    const ev = rawText.split(":")[1]?.trim();
    if (!ev) return;

    evidenceRef.push({
      by: playerName,
      text: ev
    });

    ghostLogRef.push(`📘 Evidence logged by ${playerName}: ${ev}`);
    return;
  }

  // ------------------------------------------------------------------
  // PLAYER STATUS → DEAD
  // ------------------------------------------------------------------
  if (text.startsWith("!dead:")) {
    const who = rawText.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({
      by: playerName,
      text: `<span class="tag">💀 Dead</span> ${who}`
    });

    ghostLogRef.push(`💀 ${who} has died! Reported by ${playerName}`);
    return;
  }

  // ------------------------------------------------------------------
  // PLAYER STATUS → REVIVE
  // ------------------------------------------------------------------
  if (text.startsWith("!revive:")) {
    const who = rawText.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({
      by: playerName,
      text: `<span class="tag">❤️ Revived</span> ${who}`
    });

    ghostLogRef.push(`❤️ ${who} revived by ${playerName}`);
    return;
  }

  // ------------------------------------------------------------------
  // LOCATION UPDATES
  // ------------------------------------------------------------------
  if (text.startsWith("!location:")) {
    const loc = rawText.split(":")[1]?.trim();
    if (!loc) return;

    locationRef.push({
      by: playerName,
      text: loc
    });

    ghostLogRef.push(`📍 Location updated by ${playerName}: ${loc}`);
    return;
  }

  // ------------------------------------------------------------------
  // ⭐ GHOST EVENT COMMANDS (syncs all players)
  // ------------------------------------------------------------------

  if (text === "!hunt") {
    triggerGhostEvent("hunt", playerName);
    return;
  }

  if (text === "!manifest") {
    triggerGhostEvent("manifest", playerName);
    return;
  }

  if (text === "!flicker") {
    triggerGhostEvent("flicker", playerName);
    return;
  }

  if (text === "!slam") {
    triggerGhostEvent("slam", playerName);
    return;
  }

  if (text === "!curse") {
    triggerGhostEvent("curse", playerName);
    return;
  }

  if (text === "!event") {
    triggerGhostEvent("event", playerName);
    return;
  }

  // ------------------------------------------------------------------
  // UNKNOWN COMMAND
  // ------------------------------------------------------------------
  ghostLogRef.push(`Unknown command from ${playerName}: ${rawText}`);
};
