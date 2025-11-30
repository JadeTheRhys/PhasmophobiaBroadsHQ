/* ============================================================
   UI EFFECTS — Flicker, Shake, Frost, Breath, Shadow, Dust
   Used globally by commands.js & ghostEvents.js
   ============================================================ */

/* ---------------- FLICKER ---------------- */
export function flicker(mode = 'default') {
  document.body.classList.add('fx-flicker');
  setTimeout(() => document.body.classList.remove('fx-flicker'), 600);
}

/* ---------------- SHAKE ---------------- */
export function shake() {
  document.body.classList.add('fx-shake');
  setTimeout(() => document.body.classList.remove('fx-shake'), 800);
}

/* ---------------- FROST EDGE ---------------- */
export function frost() {
  const fx = document.createElement('div');
  fx.className = 'fx-frost';
  document.body.appendChild(fx);
  setTimeout(() => fx.remove(), 1600);
}

/* ---------------- COLD BREATH ---------------- */
export function coldBreathFX() {
  const fog = document.createElement('div');
  fog.className = 'fx-breath';
  document.body.appendChild(fog);
  setTimeout(() => fog.remove(), 2400);
}

/* ---------------- SHADOW SWEEP ---------------- */
export function shadowSweepFX() {
  const sh = document.getElementById('shadow-sweep');
  if (!sh) return;
  sh.classList.remove('active');
  void sh.offsetWidth;
  sh.classList.add('active');
}

/* ---------------- DUST PARTICLE ---------------- */
export function spawnDustParticle(x, y) {
  const d = document.createElement('div');
  d.className = 'dust-particle';
  d.style.left = x + 'px';
  d.style.top = y + 'px';
  document.getElementById('dust-container')?.appendChild(d);
}
// Placeholder uiEffects.js
