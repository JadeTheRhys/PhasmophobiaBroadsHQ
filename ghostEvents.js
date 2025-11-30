/* ============================================================
   GHOST EVENTS ENGINE — FINAL BUILD
   Random ghost events, writing, logging
   ============================================================ */

import { flicker, shake, frost, coldBreathFX } from './uiEffects.js';

/* -----------------------------  
   LOGGING  
----------------------------- */
export function logGhostActivity(text){
  const list = document.getElementById('ghostLog');
  if(!list) return;

  const li = document.createElement('li');
  li.textContent = text;
  list.appendChild(li);
}

/* -----------------------------  
   GHOST WRITING  
----------------------------- */
export function ghostWrite(message){
  const wrap = document.createElement('div');
  wrap.className = 'ghost-writing-container';

  const msg = document.createElement('div');
  msg.className = 'ghost-writing-text';
  msg.textContent = message;

  wrap.appendChild(msg);
  document.body.appendChild(wrap);

  setTimeout(() => wrap.classList.add('fade'), 2500);
  setTimeout(() => wrap.remove(), 4500);
}

/* -----------------------------  
   RANDOM EVENT  
----------------------------- */
export function triggerGhostEvent(){
  const type = Math.floor(Math.random() * 6) + 1;

  switch(type){
    case 1:
      flicker();
      logGhostActivity('A soft whisper passes...');
      break;

    case 2:
      coldBreathFX();
      frost();
      logGhostActivity('Cold breath detected...');
      break;

    case 3:
      shake();
      logGhostActivity('The ghost manifested briefly.');
      break;

    case 4:
      flicker('red');
      shake();
      logGhostActivity('The ghost grows angry...');
      break;

    case 5:
      ghostWrite('RUN');
      logGhostActivity('Ghost writing appeared.');
      break;

    case 6:
      flicker('pulse');
      logGhostActivity('Ghost energy spike.');
      break;
  }
}

/* -----------------------------  
   LOOP  
----------------------------- */
export function startGhostLoop(){
  const delay = 120000 + Math.random() * 120000; // 2–4 minutes

  setTimeout(() => {
    triggerGhostEvent();
    startGhostLoop();
  }, delay);
}
// Placeholder ghostEvents.js
