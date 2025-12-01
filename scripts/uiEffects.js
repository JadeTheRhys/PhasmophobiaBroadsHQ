/* ============================================================
   uiEffects.js — Version B
   Shared ghost visual effects used by commands.js + hunt.js
   ============================================================ */

/* ------------------------------------------------------------
   UTILITY: Add + auto-remove CSS class
------------------------------------------------------------ */
function applyTempClass(target, className, duration = 1200) {
    if (!target) return;
    target.classList.add(className);
    setTimeout(() => target.classList.remove(className), duration);
}

/* ------------------------------------------------------------
   LIGHT FLICKER EFFECT
------------------------------------------------------------ */
export function flicker(colorMode = "normal") {
    const body = document.body;

    if (colorMode === "red") {
        applyTempClass(body, "lights-flicker-red", 1500);
        return;
    }

    if (colorMode === "pulse") {
        applyTempClass(body, "lights-flicker-pulse", 1500);
        return;
    }

    applyTempClass(body, "lights-flicker", 1500);
}

/* ------------------------------------------------------------
   SCREEN SHAKE
------------------------------------------------------------ */
export function shake(duration = 900) {
    applyTempClass(document.body, "screen-shake", duration);
}

/* ------------------------------------------------------------
   FROSTED SCREEN EFFECT
------------------------------------------------------------ */
export function frost() {
    let frostLayer = document.getElementById("frost-overlay");

    if (!frostLayer) {
        frostLayer = document.createElement("div");
        frostLayer.id = "frost-overlay";
        frostLayer.style.position = "fixed";
        frostLayer.style.top = 0;
        frostLayer.style.left = 0;
        frostLayer.style.width = "100%";
        frostLayer.style.height = "100%";
        frostLayer.style.zIndex = "9997";
        frostLayer.style.pointerEvents = "none";
        frostLayer.style.background = "rgba(180, 210, 255, 0.15)";
        frostLayer.style.backdropFilter = "blur(1px)";
        frostLayer.style.transition = "opacity 0.4s ease-out";
        document.body.appendChild(frostLayer);
    }

    frostLayer.style.opacity = "1";

    setTimeout(() => {
        frostLayer.style.opacity = "0";
    }, 1600);
}

/* ------------------------------------------------------------
   COLD BREATH EFFECT
------------------------------------------------------------ */
export function coldBreathFX() {
    const fx = document.createElement("div");
    fx.className = "cold-breath-fx";

    fx.style.position = "fixed";
    fx.style.left = "50%";
    fx.style.top = "60%";
    fx.style.transform = "translate(-50%, -50%)";
    fx.style.color = "rgba(200,240,255,0.7)";
    fx.style.fontSize = "2rem";
    fx.style.userSelect = "none";
    fx.style.pointerEvents = "none";
    fx.textContent = "❄";

    document.body.appendChild(fx);

    setTimeout(() => fx.remove(), 900);
}
