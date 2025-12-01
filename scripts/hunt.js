// =======================================================
// hunt.js — Global Ghost Event Animation Engine
// SAFE VERSION (NO duplicate db declarations)
// =======================================================

// Pull DB reference created in index.html
const huntDB = window.__DB;   // renamed to avoid conflicts

// Firebase event path
const liveEventRef = huntDB.ref("ghostEvent/live");

// =======================================================
// PLAY EFFECT — runs screen animation based on ghost command
// =======================================================
function playEffect(type, by) {
  console.log("🔥 Ghost event:", type, "triggered by", by);

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
  }
}

// =======================================================
// LISTEN FOR LIVE GHOST EVENTS
// =======================================================
liveEventRef.on("value", snap => {
  const data = snap.val();
  if (!data) return;

  playEffect(data.type, data.by);
});
