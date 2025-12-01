// ======================================================================
// hunt.js — Version B
// Global Ghost Event Animation Engine
// Every player sees the SAME effects in real-time
// ======================================================================

// DB reference (created in firebase.js and exposed globally)
const db = window.__DB;

if (!db) console.error("❌ hunt.js: Missing Firebase DB reference!");

// Firebase ghost event listener
const liveEventRef = db.ref("ghostEvent/live");

// ======================================================================
// 🔥 PLAY EFFECT — Trigger CSS Animations From animations.css
// ======================================================================
function playEffect(type, by) {
    console.log(`👻 Running effect: ${type} (triggered by ${by})`);

    // --------------------------
    // HUNT
    // --------------------------
    if (type === "hunt") {
        document.body.classList.add("hunt-active");
        setTimeout(() => {
            document.body.classList.remove("hunt-active");
        }, 5000);
    }

    // --------------------------
    // MANIFEST
    // --------------------------
    if (type === "manifest") {
        document.body.classList.add("ghost-manifest");
        setTimeout(() => {
            document.body.classList.remove("ghost-manifest");
        }, 3000);
    }

    // --------------------------
    // FLICKER
    // --------------------------
    if (type === "flicker") {
        document.body.classList.add("lights-flicker");
        setTimeout(() => {
            document.body.classList.remove("lights-flicker");
        }, 1500);
    }

    // --------------------------
    // DOOR SLAM
    // --------------------------
    if (type === "slam") {
        document.body.classList.add("door-slam");
        setTimeout(() => {
            document.body.classList.remove("door-slam");
        }, 1500);
    }

    // --------------------------
    // CURSE
    // --------------------------
    if (type === "curse") {
        document.body.classList.add("curse-effect");
        setTimeout(() => {
            document.body.classList.remove("curse-effect");
        }, 3500);
    }

    // --------------------------
    // RANDOM EVENT
    // --------------------------
    if (type === "event") {
        document.body.classList.add("ghost-event");
        setTimeout(() => {
            document.body.classList.remove("ghost-event");
        }, 2000);
    }
}

// ======================================================================
// 🔥 LISTEN FOR GHOST EVENTS FROM FIREBASE
// This updates instantly for EVERY PLAYER.
// ======================================================================
liveEventRef.on("value", (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    const { type, by } = data;

    // Execute the effect visually
    playEffect(type, by);
});
