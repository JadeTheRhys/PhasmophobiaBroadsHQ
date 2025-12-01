// ===========================================
// HUNT.JS — GLOBAL GHOST EVENT ANIMATION ENGINE
// ===========================================

// Use the main DB instance created in index.js
const db = window.__DB;

// Shared realtime event reference
const liveEventRef = db.ref("ghostEvent/live");

// Fire an effect for all players
function playEffect(type, by) {
  console.log("🔥 Ghost event:", type, "triggered by:", by);

  // HUNT — red pulsating overlay + shake
  if (type === "hunt") {
    document.body.classList.add("hunt-active");
    document.body.classList.add("shake");

    setTimeout(() => {
      document.body.classList.remove("hunt-active");
      document.body.classList.remove("shake");
    }, 5000);
  }

  // LIGHT FLICKER — screen flicker for everyone
  if (type === "flicker") {
    document.body.classList.add("lights-flicker");
    setTimeout(() => {
      document.body.classList.remove("lights-flicker");
    }, 1500);
  }

  // MANIFESTATION — ghost appears
  if (type === "manifest") {
    document.body.classList.add("ghost-manifest");
    setTimeout(() => {
      document.body.classList.remove("ghost-manifest");
    }, 3000);
  }

  // DOOR SLAM — white flash
  if (type === "slam") {
    const flash = document.createElement("div");
    flash.className = "slam-flash";
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 400);
  }

  // CURSE — purple / dark energy effect
  if (type === "curse") {
    document.body.classList.add("curse-effect");
    setTimeout(() => {
      document.body.classList.remove("curse-effect");
    }, 4000);
  }

  // GHOST EVENT — generic paranormal event
  if (type === "event") {
    document.body.classList.add("ghost-event");
    setTimeout(() => {
      document.body.classList.remove("ghost-event");
    }, 2000);
  }
}

// Listen for commands broadcasted to Firebase
liveEventRef.on("value", snap => {
  const data = snap.val();
  if (!data) return;

  playEffect(data.type, data.by);
});
