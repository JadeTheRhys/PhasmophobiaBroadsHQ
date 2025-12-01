// =======================================================
// hunt.js — Global Ghost Event Animation Engine
// Works for ALL connected players
// =======================================================

// Pull DB reference from index.html
const db = window.__DB;

// Firebase event path
const liveEventRef = db.ref("ghostEvent/live");

// =======================================================
// PLAY EFFECT — runs the screen animation based on command
// =======================================================
function playEffect(type, by) {
  console.log("🔥 Ghost event:", type, "by", by);

  // ---- HUNT ----
  if (type === "hunt") {
    document.body.classList.add("hunt-active");
    setTimeout(() => document.body.classList.remove("hunt-active"), 5000);
  }

  // ---- FLICKER ----
  if (type === "flicker") {
    document.body.classList.add("lights-flicker");
    setTimeout(() => document.body.classList.remove("lights-flicker"), 1500);
  }

  // ---- MANIFEST ----
  if (type === "manifest") {
    document.body.classList.add("ghost-manifest");
    setTimeout(() => document.body.classList.remove("ghost-manifest"), 3000);
  }

  // ---- DOOR SLAM ----
  if (type === "slam") {
    document.body.classList.add("door-slam");
    setTimeout(() => document.body.classList.remove("door-slam"), 1500);
  }

  // ---- CURSE ----
  if (type === "curse") {
    document.body.classList.add("curse-effect");
    setTimeout(() => document.body.classList.remove("curse-effect"), 4000);
  }

  // ---- RANDOM EVENT ----
  if (type === "event") {
    document.body.classList.add("ghost-event");
    setTimeout(() => document.body.classList.remove("ghost-event"), 2000);
  }
}

// =======================================================
// LISTEN FOR LIVE GHOST EVENTS FROM FIREBASE
// =======================================================
liveEventRef.on("value", snap => {
  const data = snap.val();
  if (!data) return;

  playEffect(data.type, data.by);
});
