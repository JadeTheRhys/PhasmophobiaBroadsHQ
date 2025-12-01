// ======================================================================
// hunt.js — Version B
// Global Ghost Event Animation Engine
// Listens for ghostEvent/live in Firebase + triggers animations
// Works with animations.css + commands.js + main.js
// ======================================================================

// ============================================================
// 1. GET FIREBASE DB (from firebase.js via window.__DB)
// ============================================================
const db = window.__DB;

// Safety check
if (!db) console.error("❌ hunt.js: Firebase DB missing!");


// ============================================================
// 2. LISTEN FOR LIVE GHOST EVENTS
// ============================================================
const liveEventRef = db.ref("ghostEvent/live");

liveEventRef.on("value", snap => {
    const data = snap.val();
    if (!data) return;

    console.log("👻 Ghost Event Received:", data.type, "by", data.by);
    playGhostEffect(data.type);
});


// ============================================================
// 3. MASTER EFFECT CONTROLLER
// ============================================================
function playGhostEffect(type) {

    switch(type) {

        // ------------------------------------------------------
        // 🔥 HUNT
        // ------------------------------------------------------
        case "hunt":
            addEffect("hunt-active", 5000);
            break;

        // ------------------------------------------------------
        // 👻 MANIFEST (dark pulse)
        // ------------------------------------------------------
        case "manifest":
            addEffect("ghost-manifest", 3000);
            break;

        // ------------------------------------------------------
        // 💡 FLICKER (lights flash)
        // ------------------------------------------------------
        case "flicker":
            addEffect("lights-flicker", 1500);
            break;

        // ------------------------------------------------------
        // 🚪 DOOR SLAM (white flash + shake)
        // ------------------------------------------------------
        case "slam":
            addEffect("door-slam", 1200);
            break;

        // ------------------------------------------------------
        // 🔮 CURSE (purple ripple effect)
        // ------------------------------------------------------
        case "curse":
            addEffect("curse-effect", 3500);
            break;

        // ------------------------------------------------------
        // 🎲 RANDOM EVENT
        // ------------------------------------------------------
        case "event":
            addEffect("ghost-event", 1600);
            break;
    }
}


// ============================================================
// 4. EFFECT EXECUTION
// Adds a class to <body> → waits → removes it
// ============================================================
function addEffect(className, duration) {

    document.body.classList.add(className);

    setTimeout(() => {
        document.body.classList.remove(className);
    }, duration);
}

console.log("🎮 hunt.js (Version B) loaded successfully.");
