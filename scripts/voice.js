/* ============================================================
   VOICE.JS — FINAL VERSION (FIXED)
   Opens a Jitsi pop-out voice/video room
   ============================================================ */

// Random room name generator
function randomRoom() {
  // Generates a unique room name like 'phasmo-a3b7c2d8'
  return "phasmo-" + Math.random().toString(36).substring(2, 10);
}

// ========================================
// CORE FUNCTION
// ========================================
export function openVoiceChat() {
  // Use stored room name OR generate a new one if this is the first time
  let room = localStorage.getItem("phasmo-room");
  if (!room) {
    room = randomRoom();
    localStorage.setItem("phasmo-room", room);
  }

  // The Jitsi Meet URL
  const url = `https://meet.jit.si/${room}`;

  // Open the URL in a new pop-up window
  window.open(
    url,
    "_blank", // Opens in a new tab/window
    "width=900,height=600,toolbar=no,menubar=no,location=no" // Pop-up features
  );
}

// ========================================
// EXPOSE GLOBALLY
// ========================================
// Attach the function to the global window object so it can be called
// by HTML 'onclick' attributes (e.g., in index.html) and by commands.js.
window.openVoiceChat = openVoiceChat;
