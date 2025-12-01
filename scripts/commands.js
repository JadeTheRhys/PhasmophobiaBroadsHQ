// ===========================================
// COMMANDS.JS — FULL MULTIPLAYER GHOST ENGINE
// ===========================================

const db = window.__DB;

const evidenceRef = db.ref("evidence");
const statusRef   = db.ref("status");
const locationRef = db.ref("locations");
const ghostRef    = db.ref("ghostlog");

// Ghost Event System
const liveEventRef = db.ref("ghostEvent/live");
const historyRef   = db.ref("ghostEvent/history");

function triggerGlobalEvent(type, player, extra = "") {
  const eventObj = {
    type,
    by: player,
    time: Date.now(),
    extra
  };

  // history
  historyRef.push(eventObj);

  // live event triggers animation for everyone
  liveEventRef.set(eventObj);
}

window.handleCommand = function (raw, player = "Player") {
  if (!raw.startsWith("!")) return;

  const cmd = raw.trim();

  // ----- EVIDENCE -----
  if (cmd.startsWith("!evidence:")) {
    const ev = cmd.split(":")[1]?.trim();
    if (!ev) return;
    evidenceRef.push({ by: player, text: ev });
    return;
  }

  // ----- DEAD -----
  if (cmd.startsWith("!dead:")) {
    const who = cmd.split(":")[1]?.trim();
    statusRef.push({ by: player, text: `💀 Dead: ${who}` });
    return;
  }

  // ----- REVIVE -----
  if (cmd.startsWith("!revive:")) {
    const who = cmd.split(":")[1]?.trim();
    statusRef.push({ by: player, text: `❤️ Revived: ${who}` });
    return;
  }

  // ----- LOCATION -----
  if (cmd.startsWith("!location:")) {
    const info = cmd.split(":")[1]?.trim();
    locationRef.push({ by: player, text: info });
    return;
  }

  // ========================================
  // GHOST EVENTS
  // ========================================

  if (cmd === "!hunt")      return triggerGlobalEvent("hunt", player);
  if (cmd === "!flicker")   return triggerGlobalEvent("flicker", player);
  if (cmd === "!manifest")  return triggerGlobalEvent("manifest", player);
  if (cmd === "!slam")      return triggerGlobalEvent("slam", player);
  if (cmd === "!curse")     return triggerGlobalEvent("curse", player);
  if (cmd === "!event")     return triggerGlobalEvent("event", player);
// WHISPER
if (text === "!whisper") {
  ghostRef.push(`🫥 A ghost whispers into ${playerName}'s ear...`);
  db.ref("effects/whisper").set({ by: playerName, time: Date.now() });
  return;
}

// SHADOW FIGURE
if (text === "!shadow") {
  ghostRef.push(`👤 A shadowy figure appears in the hallway near ${playerName}!`);
  db.ref("effects/shadow").set({ by: playerName, time: Date.now() });
  return;
}

// ELECTRICAL EXPLOSION
if (text === "!explode") {
  ghostRef.push(`⚡ Lights BURST violently! (${playerName})`);
  db.ref("effects/explode").set({ by: playerName, time: Date.now() });
  return;
}

// CRAWLING GHOST
if (text === "!crawl") {
  ghostRef.push(`🕷 A crawling ghost scurries near ${playerName}!`);
  db.ref("effects/crawl").set({ by: playerName, time: Date.now() });
  return;
}

// COLD BREATH
if (text === "!breath") {
  ghostRef.push(`❄ You see ghostly breath forming around ${playerName}...`);
  db.ref("effects/breath").set({ by: playerName, time: Date.now() });
  return;
}

// ELECTROMAGNETIC DISTORTION
if (text === "!electro") {
  ghostRef.push(`🔌 EMF spikes! The environment distorts violently around ${playerName}!`);
  db.ref("effects/electro").set({ by: playerName, time: Date.now() });
  return;
}

  // Unknown
  ghostRef.push(`Unknown command from ${player}: ${cmd}`);
};
