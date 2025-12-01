// =======================================================
// hunt.js — Version B (SYNCED TO animations.css)
// Listens to Firebase ghostEvent/live and applies effects
// =======================================================

// DB reference from firebase.js (already created globally)
const db = window.__DB;

// Firebase event path
const liveEventRef = db.ref("ghostEvent/live");

// ---------------------------------------------
// APPLY EFFECTS TO <body>
// ---------------------------------------------
function playEffect(type, by) {
    console.log("🔥 Ghost event received:", type, "by", by);

    // Clear any existing effects so animations re-trigger cleanly
    document.body.classList.remove(
        "hunt-active",
        "ghost-manifest",
        "lights-flicker",
        "door-slam",
        "curse-effect",
        "ghost-event"
    );

    // Force reflow (ensures animation restarts properly)
    void document.body.offsetWidth;

    // Apply correct effect
    switch (type) {

        case "hunt":
            document.body.classList.add("hunt-active");
            break;

        case "manifest":
            document.body.classList.add("ghost-manifest");
            break;

        case "flicker":
            document.body.classList.add("lights-flicker");
            break;

        case "slam":
            document.body.classList.add("door-slam");
            break;

        case "curse":
            document.body.classList.add("curse-effect");
            break;

        case "event":
            document.body.classList.add("ghost-event");
            break;
    }

    // Optional: remove the effect after animation duration
    setTimeout(() => {
        document.body.classList.remove(
            "hunt-active",
            "ghost-manifest",
            "lights-flicker",
            "door-slam",
            "curse-effect",
            "ghost-event"
        );
    }, 6000);
}

// ---------------------------------------------
// LISTEN FOR EVENTS FROM FIREBASE
// ---------------------------------------------
liveEventRef.on("value", snap => {
    const data = snap.val();
    if (!data) return;

    playEffect(data.type, data.by);
});
