/* ============================================================
   PHASMO VOICE CHAT — JITSI POP-OUT LAUNCHER
   GitHub Safe | No embeds | Opens real Jitsi window
   ============================================================ */

export function openVoiceChat() {
  // Create a unique room name per session
  const roomName = "phasmobroads_" + Math.random().toString(36).substring(2, 10);

  // Jitsi public server (safe + free)
  const jitsiURL = `https://meet.jit.si/${roomName}`;

  // Open pop-out window
  window.open(
    jitsiURL,
    "_blank",
    "width=900,height=700,noopener"
  );
}

// Make button work
const voiceBtn = document.querySelector(".voice-btn");
if (voiceBtn) {
  voiceBtn.addEventListener("click", openVoiceChat);
}

// Export globally for any HTML onclick fallback
window.openVoiceChat = openVoiceChat;
// Placeholder voice.js
