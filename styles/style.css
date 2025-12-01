/* ============================================================
   ghostEvents.js — Version B
   Optional ambient ghost activity engine
   Works with uiEffects.js and main panels
   ============================================================ */

import { flicker, shake, frost, coldBreathFX } from "./uiEffects.js";

/* ------------------------------------------------------------
   Helper: Add text to Ghost Log panel
------------------------------------------------------------ */
function logGhost(text) {
    const box = document.getElementById("ghost-log");
    if (!box) return;

    const p = document.createElement("p");
    p.textContent = text;
    box.appendChild(p);
}

/* ------------------------------------------------------------
   Ghost Writing popup effect
------------------------------------------------------------ */
function ghostWrite(message = "RUN") {
    const wrap = document.createElement("div");
    wrap.className = "ghost-writing-popup";

    const text = document.createElement("div");
    text.className = "ghost-writing-text";
    text.textContent = message;

    wrap.appendChild(text);
    document.body.appendChild(wrap);

    setTimeout(() => wrap.classList.add("fade"), 2500);
    setTimeout(() => wrap.remove(), 4500);
}

/* ------------------------------------------------------------
   Trigger a single randomized ghost event
------------------------------------------------------------ */
export function triggerGhostEvent() {
    const eventType = Math.floor(Math.random() * 6) + 1;

    switch (eventType) {
        case 1:
            flicker();
            logGhost("💡 Lights flicker softly…");
            break;

        case 2:
            coldBreathFX();
            frost();
            logGhost("❄ Cold breath detected nearby…");
            break;

        case 3:
            shake();
            logGhost("👻 A shadow moves behind you…");
            break;

        case 4:
            flicker("red");
            shake();
            logGhost("🔥 The ghost grows aggressive!");
            break;

        case 5:
            ghostWrite("RUN");
            logGhost("✏ Ghost Writing appeared on the wall!");
            break;

        case 6:
            flicker("pulse");
            logGhost("📡 EMF spike detected…");
            break;
    }
}

/* ------------------------------------------------------------
   Automatic loop every 2–4 minutes (optional)
------------------------------------------------------------ */
export function startGhostLoop() {
    const delay = 120000 + Math.random() * 120000; // 2–4 minutes

    setTimeout(() => {
        triggerGhostEvent();
        startGhostLoop();
    }, delay);
}
