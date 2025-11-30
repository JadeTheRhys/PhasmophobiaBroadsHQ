/* ============================================================
   PHASMOPHOBIA BROADS — MAIN BOOTLOADER (FINAL BUILD)
   Handles: tabs, ambient FX, dust, loading screen,
            random ghost loop, button wiring
   ============================================================ */

import { startGhostLoop } from './ghostEvents.js';
import { shadowSweepFX, spawnDustParticle } from './uiEffects.js';
import './lobby.js';
import './casefiles.js';
import './voice.js';

/* ============================================================
   LOADING SCREEN → JOURNAL FADE-IN
   ============================================================ */
window.addEventListener('load', () => {
  const loading = document.getElementById('loading-screen');
  const journal = document.getElementById('journal-wrapper');

  setTimeout(() => {
    loading.classList.add('fade-out');
    setTimeout(() => {
      loading.remove();
      journal.classList.remove('hidden');
    }, 600);
  }, 600);
});

/* ============================================================
   TAB SWITCHING
   ============================================================ */
const tabButtons = document.querySelectorAll('.tabs button[data-tab]');
const sections = document.querySelectorAll('.page-section');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    if(!target) return;

    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(target)?.classList.add('active');
  });
});

/* ============================================================
   SPAWN DUST PARTICLES (ambient)
   ============================================================ */
function spawnDust() {
  for (let i = 0; i < 18; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    spawnDustParticle(x, y);
  }
}
spawnDust();

/* ============================================================
   SHADOW SWEEP (ghost shadow passing by)
   ============================================================ */
setInterval(() => {
  if (Math.random() < 0.12) shadowSweepFX();
}, 8000);

/* ============================================================
   START RANDOM GHOST EVENTS
   ============================================================ */
startGhostLoop();

/* ============================================================
   BUTTON WIRING — LOBBY, CASE FILES, VOICE
   ============================================================ */
const caseBtn = document.querySelector('button[onclick="openCaseFiles()"]');
const lobbyBtn = document.querySelector('button[onclick="openLobby()"]');
const voiceBtn = document.querySelector('.voice-btn');

if (caseBtn) caseBtn.addEventListener('click', () => window.openCaseFiles?.());
if (lobbyBtn) lobbyBtn.addEventListener('click', () => window.openLobby?.());
if (voiceBtn) voiceBtn.addEventListener('click', () => window.openVoiceChat?.());
// Placeholder main.js
