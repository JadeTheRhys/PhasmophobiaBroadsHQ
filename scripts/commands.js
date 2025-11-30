// =============================
// COMMANDS.JS — FULL GAME LOGIC
// Evidence, Status, Locations
// =============================

// Cached UI references
const evidenceList  = document.getElementById("evidence-list");
const statusList    = document.getElementById("status-list");
const locationList  = document.getElementById("location-list");
const ghostLog      = document.getElementById("ghost-log");

// Log ghost events in the Ghost Log panel
function logGhost(text) {
  const p = document.createElement("p");
  p.textContent = text;
  ghostLog.appendChild(p);
}

// ------------------------------------
// MAIN COMMAND ROUTER
// ------------------------------------
export function handleCommand(text) {

  if (!text.startsWith("!")) return;

  // Normalize command
  const cmd = text.toLowerCase();

  // --------------------------------
  // 1) HELP COMMAND
  // --------------------------------
  if (cmd === "!help") {
    logGhost("Available: !help, !clear, !evidence, !dead, !revive, !location");
    return;
  }

  // --------------------------------
  // 2) CLEAR (local only)
  // --------------------------------
  if (cmd === "!clear") {
    evidenceList.innerHTML = "";
    statusList.innerHTML = "";
    locationList.innerHTML = "";
    ghostLog.innerHTML = "";
    return;
  }

  // --------------------------------
  // 3) EVIDENCE — !evidence: EMF 5
  // --------------------------------
  if (cmd.startsWith("!evidence:")) {
    const ev = text.split(":")[1]?.trim();
    if (!ev) return;

    const p = document.createElement("p");
    p.innerHTML = `<span class="tag">📘 Evidence</span> ${ev}`;
    evidenceList.appendChild(p);

    logGhost(`New evidence logged: ${ev}`);
    return;
  }

  // --------------------------------
  // 4) LOCATION — !location: Starla -> Basement
  // --------------------------------
  if (cmd.startsWith("!location:")) {
    const info = text.split(":")[1]?.trim();
    if (!info) return;

    const p = document.createElement("p");
    p.innerHTML = `<span class="tag">📍 Location</span> ${info}`;
    locationList.appendChild(p);

    logGhost(`Location updated: ${info}`);
    return;
  }

  // --------------------------------
  // 5) DEAD — !dead: Starla
  // --------------------------------
  if (cmd.startsWith("!dead:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;

    const p = document.createElement("p");
    p.innerHTML = `<span class="tag">💀 Dead</span> ${who}`;
    statusList.appendChild(p);

    logGhost(`${who} was marked as dead.`);
    return;
  }

  // --------------------------------
  // 6) REVIVE — !revive: Starla
  // --------------------------------
  if (cmd.startsWith("!revive:")) {
    const who = text.split(":")[1]?.trim();
    if (!who) return;

    const p = document.createElement("p");
    p.innerHTML = `<span class="tag">❤️ Revived</span> ${who}`;
    statusList.appendChild(p);

    logGhost(`${who} has been revived.`);
    return;
  }

  // --------------------------------
  // 7) GENERIC — unknown command
  // --------------------------------
  logGhost(`Unknown command: ${text}`);
}
