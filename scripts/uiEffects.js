// =======================================================================
// uiEffects.js — Version B (Non-Module Safe Build)
// Visual effects for ghost events, hunts, flicker, shake, frost, breathing
// All functions attached to window.* for global access
// =======================================================================


// ------------------------------------------------------------
// SCREEN FLICKER EFFECT
// ------------------------------------------------------------
window.flicker = function (color = "white") {
    const overlay = document.createElement("div");
    overlay.className = "flicker-overlay";

    if (color === "red") overlay.classList.add("flicker-red");
    if (color === "pulse") overlay.classList.add("flicker-pulse");

    document.body.appendChild(overlay);

    setTimeout(() => overlay.remove(), 500);
};


// ------------------------------------------------------------
// SCREEN SHAKE EFFECT
// ------------------------------------------------------------
window.shake = function () {
    document.body.classList.add("shake-effect");

    setTimeout(() => {
        document.body.classList.remove("shake-effect");
    }, 600);
};


// ------------------------------------------------------------
// COLD BREATH PARTICLE FX
// ------------------------------------------------------------
window.coldBreathFX = function () {
    for (let i = 0; i < 15; i++) {
        const puff = document.createElement("div");
        puff.className = "cold-breath";

        puff.style.left = `${50 + (Math.random() * 40 - 20)}vw`;
        puff.style.top = `${50 + (Math.random() * 40 - 20)}vh`;

        document.body.appendChild(puff);

        setTimeout(() => puff.remove(), 2000);
    }
};


// ------------------------------------------------------------
// FROST OVERLAY EFFECT
// ------------------------------------------------------------
window.frost = function () {
    const frostLayer = document.createElement("div");
    frostLayer.className = "frost-overlay";
    document.body.appendChild(frostLayer);

    setTimeout(() => frostLayer.classList.add("fade"), 1500);
    setTimeout(() => frostLayer.remove(), 3000);
};


// ------------------------------------------------------------
// DEBUG LOAD FLAG
// ------------------------------------------------------------
console.log("✨ uiEffects.js (Version B) loaded.");
