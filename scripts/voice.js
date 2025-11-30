// ========================================
// VOICE.JS — FINAL VERSION
// Opens a Jitsi pop-out voice/video room
// ========================================

// Random room name generator
function randomRoom() {
  return "phasmo-" + Math.random().toString(36).substring(2, 10);
}

// Open voice chat popup
export function openVoiceChat() {
  // Use stored room OR generate new one
  let room = localStorage.getItem("phasmo-room");
  if (!room) {
    room = randomRoom();
    localStorage.setItem("phasmo-room", room);
  }

  const url = `https://meet.jit.si/${room}`;

  window.open(
    url,
    "_blank",
    "width=900,height=600,toolbar=no,menubar=no,location=no"
  );
}

// Attach to the button
const vcBtn = document.querySelector(".voice-btn");
if (vcBtn) {
  vcBtn.onclick = openVoiceChat;
}
// voice js
