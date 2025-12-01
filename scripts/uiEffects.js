/* ============================================================
   PHASMOPHOBIA BROADS — UI EFFECTS ENGINE (FIXED MODULAR VERSION)
   Handles: Flicker, Shake, Frost, Cold Breath
   ============================================================ */

/* ------------------------------------------------------------
   UTILITY: Add + auto-remove CSS class
------------------------------------------------------------ */
/**
 * Applies a CSS class for a duration and then removes it.
 * @param {HTMLElement} target - The element to modify (usually document.body).
 * @param {string} className - The CSS class to apply.
 * @param {number} duration - How long the class should stay (in ms).
 */
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
    let className = 'fx-flicker'; // Base class from chatrooms.css

    // NOTE: Your original CSS only defined .fx-flicker. If you want colored/pulse
    // effects, you need to add .fx-flicker-red and .fx-flicker-pulse to chatrooms.css.
    // For now, we use the classes defined in the earlier chatrooms.css fix.

    if (colorMode === "red") {
        className = 'fx-flicker-red'; 
    } else if (colorMode === "pulse") {
        className = 'fx-flicker-pulse';
    }

    // Flicker duration is determined by the CSS animation (e.g., 0.7s)
    applyTempClass(body, className, 700); 
}

/* ------------------------------------------------------------
   SCREEN SHAKE
------------------------------------------------------------ */
export function shake(duration = 1100) {
    // Uses the .fx-shake class and animation defined in chatrooms.css
    applyTempClass(document.body, "fx-shake", duration); 
}

/* ------------------------------------------------------------
   FROSTED SCREEN EFFECT
------------------------------------------------------------ */
export function frost() {
    // Uses the .fx-frost class which creates the overlay via CSS background image
    // and handles the fade animation (1.6s)
    
    const frostEl = document.createElement('div');
    frostEl.className = 'fx-frost'; 
    document.body.appendChild(frostEl);

    // Remove the element after the CSS animation is finished
    setTimeout(() => {
        frostEl.remove();
    }, 1600);
}

/* ------------------------------------------------------------
   COLD BREATH EFFECT
------------------------------------------------------------ */
export function coldBreathFX() {
    // Uses the .fx-breath class which creates the element via CSS
    // and handles the appearance/fade animation (2.4s)

    const breathEl = document.createElement("div");
    breathEl.className = "fx-breath"; 
    document.body.appendChild(breathEl);

    // Remove the element after the CSS animation is finished
    setTimeout(() => breathEl.remove(), 2400);
}


/* ------------------------------------------------------------
   AMBIENT EFFECTS (from the original main.js for completeness)
------------------------------------------------------------ */

// Element references from index.html
const shadowSweepEl = document.getElementById('shadow-sweep');
const dustContainer = document.getElementById('dust-container');


/**
 * Creates a single dust particle for the ambient background.
 */
export function spawnDustParticle(x, y) {
  const dust = document.createElement('div');
  dust.className = 'dust-particle';
  dust.style.left = `${x}px`;
  dust.style.top = `${y}px`;
  dust.style.animationDelay = `-${Math.random() * 6}s`;

  if (dustContainer) {
    dustContainer.appendChild(dust);
  }
}

/**
 * Triggers the shadow sweep effect (ghost passing by).
 */
export function shadowSweepFX() {
  if (!shadowSweepEl) return;
  // Use the .shadow-sweep.active class we added to your CSS
  shadowSweepEl.classList.remove('active');
  void shadowSweepEl.offsetWidth; 
  shadowSweepEl.classList.add('active');
  
  // Remove the class after the CSS animation duration (2s)
  setTimeout(() => {
      shadowSweepEl.classList.remove('active');
  }, 2000); 
}
