// =====================================================
// commands.js — Global Ghost Commands + Player Sync
// SAFE VERSION (NO duplicate db declarations)
// =====================================================

// Pull DB reference created in index.html
const cmdDB = window.__DB;  // renamed to avoid conflicts

// Firebase database paths
const evidenceRef  = cmdDB.ref("evidence");
const statusRef    = cmdDB.ref("status");
const locationRef  = cmdDB.ref("locations");
const ghostLogRef  = cmdDB.ref("ghostlog");
const eventRef     = cmdDB.ref("ghostEvent/live");

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

    ghostLogRef.push(`📘 Evidence updated by ${playerName}: ${ev}`);
    return;
  }

  // ----------------------
  // DEAD
  // ----------------------
  if (text.startsWith("!dead:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;

    statusRef.push({
      by: playerName,
      text: `<span class="tag">💀 Dead</span> ${who}`
    });

    ghostLogRef.push(`💀 ${who} died! Reported by ${playerName}`);
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

    ghostLogRef.push(`❤️ ${who} was revived by ${playerName}`);
    return;
  }

  // ----------------------
  // LOCATION
  // ----------------------
  if (text.startsWith("!location:")) {
    const loc = text.split(":")[1]?.trim();
    if (!loc) return;

    locationRef.push({
      by: playerName,
      text: loc
    });

    ghostLogRef.push(`📍 ${playerName} moved to → ${loc}`);
    return;
  }

  // =====================================================
  // ⭐ GHOST EVENT COMMANDS (Sync to ALL players)
  // =====================================================
  function ghostEvent(type) {
    ghostLogRef.push(`👻 ${type.toUpperCase()} triggered by ${playerName}`);
    eventRef.set({
      type,
      by: playerName,
      time: Date.now()
    });
  }

  // Supported ghost commands
  const ghostCommands = ["hunt", "manifest", "flicker", "slam", "curse", "event"];

  if (ghostCommands.includes(text.substring(1))) {
    ghostEvent(text.substring(1));
    return;
  }

  // ----------------------
  // UNKNOWN COMMAND
  // ----------------------
  ghostLogRef.push(`Unknown command from ${playerName}: ${raw}`);
};
