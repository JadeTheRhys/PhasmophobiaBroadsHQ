/* ============================================================
   PHASMOPHOBIA BROADS — LOBBY SYSTEM (FINAL BUILD)
   Firebase room list + create/join UI
   ============================================================ */

import { db } from './firebase.js';
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/* ============================================================
   DOM
   ============================================================ */
const lobbyScreen = document.getElementById('lobby-screen');
const roomList = document.getElementById('roomList');
const newRoomName = document.getElementById('newRoomName');
const createRoomBtn = document.getElementById('createRoomBtn');

// Firebase path
const roomsRef = ref(db, 'rooms');

/* ============================================================
   OPEN + CLOSE LOBBY
   ============================================================ */
export function openLobby() {
  lobbyScreen.classList.remove('hidden');
}

export function closeLobby() {
  lobbyScreen.classList.add('hidden');
}

// Expose globally for HTML onclick
window.openLobby = openLobby;

/* ============================================================
   CREATE ROOM
   ============================================================ */
createRoomBtn?.addEventListener('click', () => {
  const name = newRoomName.value.trim();
  if (!name) return;

  push(roomsRef, { name });
  newRoomName.value = '';
});

/* ============================================================
   DISPLAY ROOMS
   ============================================================ */
onChildAdded(roomsRef, snap => {
  const data = snap.val();
  addRoomToList(data.name);
});

function addRoomToList(name) {
  const li = document.createElement('li');
  li.textContent = name;

  li.addEventListener('click', () => {
    alert(`Joining room: ${name} (voice + chat coming next ❤️)`);
  });

  roomList.appendChild(li);
}
// Placeholder lobby.js
