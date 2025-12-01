// =====================================================
// commands.js — Global Ghost Commands + Player Sync
// Works with the restored index AND hunt.js
// =====================================================

// Pull global DB reference created in index.html
const db = window.__DB;

// Firebase paths
const evidenceRef  = db.ref("evidence");
const statusRef    = db.ref("status");
const locationRef  = db.ref("locations");
const ghostLogRef  = db.ref("ghostlog");
const eventRef     = db.ref("ghostEvent/live");

// =====================================================
// MAIN COMMAND HANDLER
// index.html calls window.handleCommand()
// =====================================================
window.handleCommand = function(raw, playerName = "Player") {
  if (!raw.startsWith("!")) return;

  const text = raw.trim().toLowerCase();

  // ----------------------
  // HELP
  // ----------------------
  if (text === "!help") {
    ghostLogRef.push(`${playerName} checked the help menu.`);
    return;
  }

  // ----------------------
  // EVIDENCE
  // ----------------------
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

  // ----------------------
  // PLAYER STATUS (DEAD)
  // ----------------------
  if (text.startsWith("!dead:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({
      by: playerName,
      text: `<span class="tag">💀 Dead</span> ${who}`
    });

    ghostLogRef.push(`💀 ${who} has died! (Reported by ${playerName})`);
    return;
  }

  // ----------------------
  // REVIVE
  // ----------------------
  if (text.startsWith("!revive:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({
      by: playerName,
      text: `<span class="tag">❤️ Revived</span> ${who}`
    });

    ghostLogRef.push(`❤️ ${who} was revived! (Thanks to ${playerName})`);
    return;
  }

  // ----------------------
  // LOCATIONS
  // ----------------------
  if (text.startsWith("!location:")) {
    const loc = text.split(":")[1]?.trim();
    if (!loc) return;

    locationRef.push({
      by: playerName,
      text: loc
    });

    ghostLogRef.push(`📍 ${playerName} updated location → ${loc}`);
    return;
  }

  // =====================================================
  // ⭐ GHOST EVENT COMMANDS — These also trigger HUNT.JS
  // =====================================================

  function ghostEvent(type, playerName) {
    ghostLogRef.push(`👻 ${type.toUpperCase()} triggered by ${playerName}`);
    eventRef.set({ type, by: playerName, time: Date.now() });
  }

  // ---- HUNT ----
  if (text === "!hunt") {
    ghostEvent("hunt", playerName);
    return;
  }

  // ---- MANIFEST ----
  if (text === "!manifest") {
    ghostEvent("manifest", playerName);
    return;
  }

  // ---- FLICKER ----
  if (text === "!flicker") {
    ghostEvent("flicker", playerName);
    return;
  }

  // ---- DOOR SLAM ----
  if (text === "!slam") {
    ghostEvent("slam", playerName);
    return;
  }

  // ---- CURSE ----
  if (text === "!curse") {
    ghostEvent("curse", playerName);
    return;
  }

  // ---- RANDOM EVENT ----
  if (text === "!event") {
    ghostEvent("event", playerName);
    return;
  }

  // ----------------------
  // UNKNOWN COMMAND
  // ----------------------
  ghostLogRef.push(`Unknown command from ${playerName}: ${raw}`);
};
