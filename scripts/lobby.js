/* ============================================================
   PHASMOPHOBIA BROADS — LOBBY SYSTEM (FINAL FIX)
   Firebase room list + create/join UI
   ============================================================ */

import { db } from './firebase.js';
import { ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/* ============================================================
   DOM ELEMENTS
   ============================================================ */
const lobbyScreen = document.getElementById('lobby-screen');
const roomList = document.getElementById('roomList');
const newRoomName = document.getElementById('newRoomName');
const createRoomBtn = document.getElementById('createRoomBtn');

// Firebase path
const roomsRef = ref(db, 'rooms');

// Expose globally for HTML/main.js
window.openLobby = openLobby;
window.closeLobby = closeLobby;

/* ============================================================
   OPEN + CLOSE LOBBY
   ============================================================ */
export function openLobby() {
  // Use the 'display: flex' style from your provided code
  if (lobbyScreen) lobbyScreen.style.display = 'flex';
}

export function closeLobby() {
  if (lobbyScreen) lobbyScreen.style.display = 'none';
}

/* ============================================================
   CREATE ROOM
   (This pushes the new room name to Firebase)
   ============================================================ */
if (createRoomBtn && newRoomName) {
  createRoomBtn.addEventListener('click', () => {
    const name = newRoomName.value.trim();
    if (!name) return;

    // Push the room name to the Firebase database
    push(roomsRef, { name });
    newRoomName.value = '';
    
    // Store the created room name locally and close
    localStorage.setItem("phasmo-room", name);
    closeLobby();
  });
}

/* ============================================================
   DISPLAY ROOMS (Listens to Firebase for new rooms)
   ============================================================ */
onChildAdded(roomsRef, snap => {
  const data = snap.val();
  // Ensure the data has a name property
  if (data && data.name) {
    addRoomToList(data.name);
  }
});

function addRoomToList(name) {
  if (!roomList) return;

  const li = document.createElement('li');
  li.textContent = name;

  // Add event listener to join the room
  li.addEventListener('click', () => {
    // Store the room name locally
    localStorage.setItem("phasmo-room", name);
    closeLobby();

    // Optionally notify the user in the chat log (if messages element exists)
    const messages = document.getElementById("messages");
    if (messages) {
      const div = document.createElement("div");
      div.className = "message-entry";
      div.style.opacity = "0.7";
      div.textContent = `Joined room: ${name}`;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }
  });

  roomList.appendChild(li);
}
