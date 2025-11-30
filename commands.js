/* ============================================================
   PHASMOPHOBIA BROADS — COMMAND ENGINE (FINAL BUILD)
   Handles: Ghost commands, Van commands, Player commands,
            Evidence, Locations, Death/Revive, Map, Voice Chat
   ============================================================ */

import { flicker, shake, frost, coldBreathFX } from './uiEffects.js';
import { logGhostActivity, ghostWrite } from './ghostEvents.js';

/*  
  These functions are provided by other modules:

  window.updateLocation(player, loc)
  window.addEvidence(ev)
  window.markDead(player)
  window.markAlive(player)
  window.showRandomMap()
  window.toggleLights()
  window.showThermometer()
  window.radioInterference()
  window.vanSafeMode()
  window.openVoiceChat()
  window.openLobby()
  window.openCaseFiles()
*/

/* ------------------------------------------------------------
   HELPERS
------------------------------------------------------------ */
function scream(text){
  const box = document.getElementById('messages');
  if(!box) return;

  const div = document.createElement('div');
  div.className = 'message-entry ghost-text';
  div.textContent = text;

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function play(sound){
  if(window.play){
    window.play(sound);
  }
}

/* ============================================================
   COMMAND HANDLER
   ============================================================ */
export function handleCommand(cmd){

  /* ============================================================
     🔥 GHOST COMMANDS
     ============================================================ */
  if(cmd === '!hunt'){
    play('heartbeat');
    shake();
    flicker('blue');
    scream('THE GHOST IS HUNTING! RUN!');
    logGhostActivity('Ghost initiated a hunt!');
    return;
  }

  if(cmd === '!emf'){
    play('emf');
    flicker('red');
    logGhostActivity('EMF 5 spike detected.');
    return;
  }

  if(cmd === '!ghost'){
    play('whisper');
    flicker();
    logGhostActivity('Ghost presence detected.');
    return;
  }

  if(cmd === '!breathe'){
    play('breathe');
    coldBreathFX();
    frost();
    return;
  }

  if(cmd === '!manifest'){
    play('rumble');
    shake();
    scream('It’s manifesting…');
    logGhostActivity('Ghost manifestation detected.');
    return;
  }

  if(cmd === '!footsteps'){
    play('steps');
    flicker('dim');
    logGhostActivity('Footsteps heard nearby.');
    return;
  }

  if(cmd === '!giggle'){
    play('giggle');
    flicker('pulse');
    return;
  }

  if(cmd === '!slam'){
    play('slam');
    shake();
    logGhostActivity('Ghost slammed a door.');
    return;
  }

  if(cmd === '!appear'){
    play('whisper');
    frost();
    coldBreathFX();
    return;
  }

  /* ============================================================
     🔦 VAN COMMANDS
     ============================================================ */

  if(cmd === '!lights'){
    window.toggleLights?.();
    return;
  }

  if(cmd === '!temp'){
    window.showThermometer?.();
    return;
  }

  if(cmd === '!radio'){
    window.radioInterference?.();
    logGhostActivity('Radio interference detected.');
    return;
  }

  if(cmd === '!van'){
    window.vanSafeMode?.();
    return;
  }

  if(cmd === '!map'){
    window.showRandomMap?.();
    return;
  }

  /* ============================================================
     🧍 PLAYER COMMANDS
     ============================================================ */

  if(cmd === '!help'){
    scream(`
Commands:
!hunt !emf !ghost !breathe !manifest
!footsteps !giggle !slam !appear
!lights !temp !radio !van !map
!location:<place>
!evidence:<type>
!dead:<name>
!revive:<name>
!voice
!lobby
!casefiles
    `);
    return;
  }

  // LOCATION
  if(cmd.startsWith('!location:')){
    const loc = cmd.replace('!location:','').trim();
    const player = window.username || 'Player';
    window.updateLocation?.(player, loc);
    logGhostActivity(`${player} moved to: ${loc}`);
    return;
  }

  // EVIDENCE
  if(cmd.startsWith('!evidence:')){
    const ev = cmd.replace('!evidence:','').trim();
    window.addEvidence?.(ev);
    logGhostActivity(`Evidence logged: ${ev}`);
    return;
  }

  // DEATH
  if(cmd.startsWith('!dead:')){
    const who = cmd.replace('!dead:','').trim();
    window.markDead?.(who);
    logGhostActivity(`${who} has died.`);
    return;
  }

  // REVIVE
  if(cmd.startsWith('!revive:')){
    const who = cmd.replace('!revive:','').trim();
    window.markAlive?.(who);
    logGhostActivity(`${who} has returned to life.`);
    return;
  }

  /* ============================================================
     🎤 VOICE COMMANDS
     ============================================================ */
  if(cmd === '!voice'){
    window.openVoiceChat?.();
    return;
  }

  /* ============================================================
     🏠 LOBBY / CASE FILES
     ============================================================ */
  if(cmd === '!lobby'){
    window.openLobby?.();
    return;
  }

  if(cmd === '!casefiles'){
    window.openCaseFiles?.();
    return;
  }

  /* ============================================================
     END
     ============================================================ */
}
// Placeholder commands.js
