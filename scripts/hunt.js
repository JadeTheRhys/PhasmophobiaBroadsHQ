// ===========================================
// HUNT.JS — GLOBAL GHOST EVENT ANIMATIONS
// ===========================================

// Use global DB
const db = window.__DB;
const liveEventRef = db.ref("ghostEvent/live");

// PLAY EFFECT
function playEffect(type, by) {
    console.log("Playing effect:", type, "from", by);

    // Hunt overlay
    if (type === "hunt") {
        document.body.classList.add("hunt-active");
        setTimeout(() => document.body.classList.remove("hunt-active"), 5000);
    }

    // Flicker
    if (type === "flicker") {
        document.body.classList.add("lights-flicker");
        setTimeout(() => document.body.classList.remove("lights-flicker"), 1500);
    }

    // Manifest
    if (type === "manifest") {
        document.body.classList.add("ghost-manifest");
        setTimeout(() => document.body.classList.remove("ghost-manifest"), 2500);
    }

    // Slam
    if (type === "slam") {
        document.body.classList.add("door-slam");
        setTimeout(() => document.body.classList.remove("door-slam"), 1200);
    }

    // Curse
    if (type === "curse") {
        document.body.classList.add("curse-effect");
        setTimeout(() => document.body.classList.remove("curse-effect"), 3000);
    }

    // Simple ghost event
    if (type === "event") {
        document.body.classList.add("ghost-event");
        setTimeout(() => document.body.classList.remove("ghost-event"), 2000);
    }
}

// LISTEN FOR GHOST COMMANDS
liveEventRef.on("value", snap => {
    const data = snap.val();
    if (!data) return;

    playEffect(data.type, data.by);
});
