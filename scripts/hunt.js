// =======================================================
// hunt.js — GLOBAL Ghost Event Animation Engine
// Works for ALL connected players
// Reads events from Firebase in real time
// =======================================================

// Pull DB reference created in index.html
const db = window.__DB;

// Firebase event path
const liveEventRef = db.ref("ghostEvent/live");

// =======================================================
// PLAY EFFECT — Runs the correct animation on the screen
// =======================================================
function playEffect(type, by) {
  console.log("🔥 Ghost event:", type, "| triggered by:", by);

  // Remove ALL previous effects first (clean reset)
  document.body.classList.remove(
    "hunt-active",
    "lights-flicker",
    "ghost-manifest",
    "door-slam",
    "curse-effect",
    "ghost-event",
  );

  // Then apply the new one
  switch (type) {

    case "hunt":
      document.body.classList.add("hunt-active");
      setTimeout(() => document.body.classList.remove("hunt-active"), 5000);
      break;

    case "flicker":
      document.body.classList.add("lights-flicker");
      setTimeout(() => document.body.classList.remove("lights-flicker"), 1500);
      break;

    case "manifest":
      document.body.classList.add("ghost-manifest");
      setTimeout(() => document.body.classList.remove("ghost-manifest"), 3000);
      break;

    case "slam":
      document.body.classList.add("door-slam");
      setTimeout(() => document.body.classList.remove("door-slam"), 1500);
      break;

    case "curse":
      document.body.classList.add("curse-effect");
      setTimeout(() => document.body.classList.remove("curse-effect"), 4000);
      break;

    case "event":
      document.body.classList.add("ghost-event");
      setTimeout(() => document.body.classList.remove("ghost-event"), 2000);
      break;

    default:
      console.warn("Unknown ghost event:", type);
  }
}

// =======================================================
// LISTEN FOR LIVE GHOST EVENTS FROM FIREBASE
// =======================================================
liveEventRef.on("value", snap => {
  const data = snap.val();
  if (!data) return;

  const { type, by } = data;

  playEffect(type, by);
});
