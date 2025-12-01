// =======================================
// hunt.js — GLOBAL ANIMATION LISTENER
// =======================================

let huntDB = null;
let liveEventRef = null;

window.setupHuntRef = function(firebaseDB) {
  huntDB = firebaseDB;
  liveEventRef = huntDB.ref("ghostEvent/live");
  startGhostListener();
};

function startGhostListener() {
  liveEventRef.on("value", snap => {
    const data = snap.val();
    if (!data) return;

    playGhostEffect(data.type, data.by);
  });
}


// =======================================
// 🔥 Animation Effects — match animations.css
// =======================================

function playGhostEffect(type, by) {
  console.log("GHOST EVENT:", type, "by", by);

  // Remove old effects if still present
  document.body.classList.remove(
    "hunt-active",
    "lights-flicker",
    "door-slam",
    "ghost-manifest",
    "curse-effect",
    "ghost-event"
  );

  // Delay so classes re-trigger animations
  setTimeout(() => {
    if (type === "hunt") {
      document.body.classList.add("hunt-active");
      setTimeout(() => document.body.classList.remove("hunt-active"), 5000);
    }

    if (type === "flicker") {
      document.body.classList.add("lights-flicker");
      setTimeout(() => document.body.classList.remove("lights-flicker"), 1500);
    }

    if (type === "slam") {
      document.body.classList.add("door-slam");
      setTimeout(() => document.body.classList.remove("door-slam"), 1500);
    }

    if (type === "manifest") {
      document.body.classList.add("ghost-manifest");
      setTimeout(() => document.body.classList.remove("ghost-manifest"), 3000);
    }

    if (type === "curse") {
      document.body.classList.add("curse-effect");
      setTimeout(() => document.body.classList.remove("curse-effect"), 4000);
    }

    if (type === "event") {
      document.body.classList.add("ghost-event");
      setTimeout(() => document.body.classList.remove("ghost-event"), 2000);
    }
  }, 50);
}
