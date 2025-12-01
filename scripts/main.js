/* ============================================================
   PHASMOPHOBIA BROADS — MAIN BOOTLOADER (MODULAR FIX)
   Handles: tabs, ambient FX initialization, loading screen,
            random ghost loop, button wiring
   ============================================================ */

import { startGhostLoop } from './ghostEvents.js';
import { shadowSweepFX, spawnDustParticle } from './uiEffects.js';
// We remove imports for chat/lobby/casefiles as those files already
// contain the logic to run themselves when imported.

/* ============================================================
   LOADING SCREEN → JOURNAL FADE-IN
   ============================================================ */
window.addEventListener('load', () => {
  const loading = document.getElementById('loading-screen');
  const journal = document.getElementById('journal-wrapper');

  // Ensure elements exist before trying to use them
  if (!loading || !journal) return; 

  setTimeout(() => {
    loading.classList.add('fade-out');
    setTimeout(() => {
      loading.remove();
      journal.classList.remove('hidden');
    }, 600);
  }, 600);
});

/* ============================================================
   TAB SWITCHING (FIXED)
   ============================================================ */
window.addEventListener('load', () => {
    // CRITICAL FIX 1: Selecting all buttons by class '.tab-btn'
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // CRITICAL FIX 2: Selecting all panels by class '.panel'
    const sections = document.querySelectorAll('.panel'); 

    // This logic is now wrapped in window.load so buttons are available
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Targets the ID of the panel (e.g., 'panel-chat')
        const targetId = btn.getAttribute('data-target'); 
        if(!targetId) return;

        // Deactivate all sections and buttons
        sections.forEach(s => s.classList.remove('active'));
        tabButtons.forEach(b => b.classList.remove('active'));
        
        // Activate the clicked button and target section
        document.getElementById(targetId)?.classList.add('active');
        btn.classList.add('active'); 
      });
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
// Initialize the dust particles immediately
window.addEventListener('load', spawnDust);

/* ============================================================
   SHADOW SWEEP (ghost shadow passing by)
   ============================================================ */
// Start a repeating interval for a chance of shadow sweep
setInterval(() => {
  if (Math.random() < 0.12) shadowSweepFX();
}, 8000);

/* ============================================================
   START RANDOM GHOST EVENTS
   ============================================================ */
startGhostLoop();

/* ============================================================
   BUTTON WIRING — LOBBY, CASE FILES, VOICE
   (Attaches functions exposed globally by other modules)
   ============================================================ */
window.addEventListener('load', () => {
    // Note: Your index.html does not have buttons with these specific IDs, 
    // but relies on the onclick attributes in the main content. 
    // This section is now mainly for future-proofing or wiring custom buttons.
    
    const caseBtn = document.getElementById('openCaseFilesBtn');
    const lobbyBtn = document.getElementById('openLobbyBtn');
    const voiceBtn = document.getElementById('voiceLaunchBtn');
    
    // Ensure the function exists before wiring (e.g., openCaseFiles comes from casefiles.js)
    if (caseBtn) caseBtn.addEventListener('click', () => window.openCaseFiles?.());
    if (lobbyBtn) lobbyBtn.addEventListener('click', () => window.openLobby?.());
    if (voiceBtn) voiceBtn.addEventListener('click', () => window.openVoiceChat?.());
});
