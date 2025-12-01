// ======================================================================
// hunt.js — Version B (MODULAR FIX)
// Global Ghost Event Animation Engine
// Listens for ghostEvent/live in Firebase + triggers animations
// ======================================================================

// ============================================================
// 1. MODULAR IMPORTS
// We import db directly, replacing the old window.__DB method.
// We import the correct functions from uiEffects.js.
// ============================================================
import { db } from "./firebase.js";
import { flicker, shake, curseFX, manifestFX } from "./uiEffects.js"; 
import { logGhostActivity } from './ghostEvents.js';

// Get the correct Realtime Database functions
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Safety check
if (!db) console.error("❌ hunt.js: Firebase DB missing!");


// ============================================================
// 2. LISTEN FOR LIVE GHOST EVENTS
// ============================================================
const liveEventRef = ref(db, "ghostEvent/live");

onValue(liveEventRef, (snapshot) => {
    const data = snapshot.val();
    // Only proceed if data exists and is a complex object (not just null/true)
    if (!data || typeof data !== 'object') return; 

    console.log("👻 Ghost Event Received:", data.type, "by", data.by);
    
    // Log the activity to the Ghost Log panel
    logGhostActivity(`Real-time Event: ${data.type.toUpperCase()} by ${data.by}`);
    
    playGhostEffect(data.type);
});


// ============================================================
// 3. MASTER EFFECT CONTROLLER
// We simplify this by leveraging the functions in commands.js / uiEffects.js
// ============================================================
function playGhostEffect(type) {
    const body = document.body;

    switch(type) {
        
        // ------------------------------------------------------
        // 🔥 HUNT (Use the specialized hunt-active class)
        // ------------------------------------------------------
        case "hunt":
            // 5000ms duration from original code
            addEffect(body, "hunt-active", 5000); 
            break;

        // ------------------------------------------------------
        // 👻 MANIFEST (Use the dedicated function from uiEffects)
        // ------------------------------------------------------
        case "manifest":
            // Assume manifestFX applies 'ghost-manifest' and duration is handled in uiEffects
            // If you need specific control, you can call addEffect(body, "ghost-manifest", 3000);
            manifestFX(); 
            break;

        // ------------------------------------------------------
        // 💡 FLICKER (Use the dedicated function from uiEffects)
        // ------------------------------------------------------
        case "flicker":
            flicker();
            break;

        // ------------------------------------------------------
        // 🚪 DOOR SLAM (Use the specialized door-slam class)
        // ------------------------------------------------------
        case "slam":
            // 1200ms duration from original code
            addEffect(body, "door-slam", 1200); 
            break;

        // ------------------------------------------------------
        // 🔮 CURSE (Use the dedicated function or class)
        // ------------------------------------------------------
        case "curse":
            // Assume curseFX applies 'curse-effect' and duration is handled in uiEffects
            curseFX(); 
            break;

        // ------------------------------------------------------
        // 🎲 RANDOM EVENT (Use the specialized ghost-event class)
        // ------------------------------------------------------
        case "event":
            // 1600ms duration from original code
            addEffect(body, "ghost-event", 1600);
            break;
            
        // ------------------------------------------------------
        // ⚡ DEFAULT/OTHERS (We can use shake for unknown/generic)
        // ------------------------------------------------------
        default:
            shake();
            break;
    }
}


// ============================================================
// 4. EFFECT EXECUTION (Helper)
// NOTE: Modified to accept the target element (body)
// ============================================================
function addEffect(target, className, duration) {
    target.classList.add(className);

    setTimeout(() => {
        target.classList.remove(className);
    }, duration);
}

console.log("🎮 hunt.js (Version B) loaded successfully.");
