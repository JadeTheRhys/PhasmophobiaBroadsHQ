// ============================================================
// ANIMATIONS.JS — FINAL MODULAR FIX
// Converts old SDK syntax (db.ref) to new modular syntax (ref, onValue)
// ============================================================

// ----------------------
// MODULAR IMPORTS
// ----------------------
import { db } from "./firebase.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


// ============================================================
// VISUAL ANIMATION LOGIC (UNCHANGED)
// ============================================================

window.playFlicker = function() {
  document.body.classList.add("flicker-effect");
  setTimeout(() => {
    document.body.classList.remove("flicker-effect");
  }, 1200);
};

window.playSlam = function() {
  const flash = document.createElement("div");
  flash.className = "slam-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 400);

  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 600);
};

window.playHunt = function() {
  const overlay = document.createElement("div");
  overlay.className = "hunt-overlay";
  document.body.appendChild(overlay);

  document.body.classList.add("shake");

  setTimeout(() => {
    overlay.remove();
    document.body.classList.remove("shake");
  }, 4500);
};

function playWhisperEffect() {
  const w = document.createElement("div");
  w.className = "whisperFX";
  w.textContent = "psssst...";
  document.body.appendChild(w);
  setTimeout(()=> w.remove(), 2000);
}

function playShadowFigure() {
  const s = document.createElement("div");
  s.className = "shadowFigure";
  document.body.appendChild(s);
  setTimeout(()=> s.remove(), 3000);
}

function playExplosion() {
  document.body.classList.add("screenShake");
  setTimeout(()=> document.body.classList.remove("screenShake"), 800);
}

function playCrawlGhost() {
  const g = document.createElement("div");
  g.className = "crawlGhost";
  document.body.appendChild(g);
  setTimeout(()=> g.remove(), 4000);
}

function playColdBreath() {
  const fog = document.createElement("div");
  fog.className = "coldBreath";
  document.body.appendChild(fog);
  setTimeout(()=> fog.remove(), 2500);
}

function playElectroDistortion() {
  document.body.classList.add("electroFX");
  setTimeout(()=> document.body.classList.remove("electroFX"), 1000);
}


// ============================================================
// FIREBASE LISTENERS (CONVERTED TO MODULAR SYNTAX)
// ============================================================

// WHISPER EFFECT
onValue(ref(db, "effects/whisper"), snap => {
  if (!snap.val()) return;
  playWhisperEffect();
});

// SHADOW FIGURE
onValue(ref(db, "effects/shadow"), snap => {
  if (!snap.val()) return;
  playShadowFigure();
});

// EXPLOSION
onValue(ref(db, "effects/explode"), snap => {
  if (!snap.val()) return;
  playExplosion();
});

// CRAWLING GHOST
onValue(ref(db, "effects/crawl"), snap => {
  if (!snap.val()) return;
  playCrawlGhost();
});

// COLD BREATH
onValue(ref(db, "effects/breath"), snap => {
  if (!snap.val()) return;
  playColdBreath();
});

// ELECTRICAL DISTORTION
onValue(ref(db, "effects/electro"), snap => {
  if (!snap.val()) return;
  playElectroDistortion();
});
