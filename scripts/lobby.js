// ========================================
// LOBBY.JS — FINAL VERSION
// Simple room selector (frontend only)
// ========================================

// Open the lobby overlay
export function openLobby() {
  const lobby = document.getElementById("lobby-screen");
  if (lobby) lobby.style.display = "flex";
}

// Close lobby overlay
export function closeLobby() {
  const lobby = document.getElementById("lobby-screen");
  if (lobby) lobby.style.display = "none";
}

// Create or join room
const createBtn = document.getElementById("createRoomBtn");
const nameInput = document.getElementById("newRoomName");

if (createBtn && nameInput) {
  createBtn.addEventListener("click", () => {
    const room = nameInput.value.trim();
    if (!room) return;

    // Store room name in localStorage
    localStorage.setItem("phasmo-room", room);

    // Close lobby
    closeLobby();

    // Notify user locally
    const messages = document.getElementById("messages");
    const div = document.createElement("div");
    div.className = "message-entry";
    div.style.opacity = "0.7";
    div.textContent = `Joined room: ${room}`;
    messages.appendChild(div);
  });
}
// lobby js
