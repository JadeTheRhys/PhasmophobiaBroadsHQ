// ======================================================================
// hunt.js — Version B (Full Ghost Event Engine)
// Syncs animations across ALL connected players
// Works with commands.js + animations.css + index.html
// ======================================================================

// GLOBAL FIREBASE CONNECTION (injected from index.html)
const db = window.__DB;

// Firebase path where commands.js triggers ghost events
const liveEventRef = db.ref("ghostEvent/live");

// ======================================================================
// PLAY VISUAL EFFECT — runs the animation for everyone
// ======================================================================
function playGhostEffect(type, by) {
  console.log("👻 Ghost Event Triggered:", type, "by", by);

  // Clear all classes first (prevents stacking)
  document.body.classList.remove(
    "hunt-active",
    "lights-flicker",
    "ghost-manifest",
    "door-slam",
    "curse-effect",
    "ghost-event"
  );

  // Add event class depending on type
  switch (type) {
    case "hunt":
      document.body.classList.add("hunt-active");
      setTimeout(() => {
        document.body.classList.remove("hunt-active");
      }, 6000); // HUNT lasts 6 seconds
      break;

    case "flicker":
      document.body.classList.add("lights-flicker");
      setTimeout(() => {
        document.body.classList.remove("lights-flicker");
      }, 1400);
      break;

    case "manifest":
      document.body.classList.add("ghost-manifest");
      setTimeout(() => {
        document.body.classList.remove("ghost-manifest");
      }, 3000);
      break;

    case "slam":
      document.body.classList.add("door-slam");
      setTimeout(() => {
        document.body.classList.remove("door-slam");
      }, 1500);
      break;

    case "curse":
      document.body.classList.add("curse-effect");
      setTimeout(() => {
        document.body.classList.remove("curse-effect");
      }, 4000);
      break;

    case "event":
      document.body.classList.add("ghost-event");
      setTimeout(() => {
        document.body.classList.remove("ghost-event");
      }, 2000);
      break;

    default:
      console.warn("Unknown ghost event:", type);
  }
}

// ======================================================================
// LISTEN FOR REALTIME GHOST EVENTS
// Whenever commands.js sets an event → Every player runs animation
// ======================================================================
liveEventRef.on("value", snapshot => {
  const event = snapshot.val();
  if (!event) return;

  const { type, by } = event;

  playGhostEffect(type, by);
});
