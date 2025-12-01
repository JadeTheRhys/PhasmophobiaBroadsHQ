// =============================================
// HUNT.JS — GLOBAL GHOST EVENT ANIMATION HANDLER
// =============================================

const db = window.__DB;
const liveEventRef = db.ref("ghostEvent/live");

function playEffect(type, by) {
  console.log("Playing effect:", type, "by", by);

  if (type === "hunt") {
    document.body.classList.add("hunt-active");
    setTimeout(() => document.body.classList.remove("hunt-active"), 5000);
  }

  if (type === "flicker") {
    document.body.classList.add("lights-flicker");
    setTimeout(() => document.body.classList.remove("lights-flicker"), 1500);
  }

  if (type === "manifest") {
    document.body.classList.add("ghost-manifest");
    setTimeout(() => document.body.classList.remove("ghost-manifest"), 3000);
  }

  if (type === "slam") {
    document.body.classList.add("door-slam");
    setTimeout(() => document.body.classList.remove("door-slam"), 1500);
  }

  if (type === "curse") {
    document.body.classList.add("curse-effect");
    setTimeout(() => document.body.classList.remove("curse-effect"), 4000);
  }

  if (type === "event") {
    document.body.classList.add("ghost-event");
    setTimeout(() => document.body.classList.remove("ghost-event"), 2000);
  }
}

// Listen for ghost events
liveEventRef.on("value", snap => {
  const data = snap.val();
  if (!data) return;

  playEffect(data.type, data.by);
});
