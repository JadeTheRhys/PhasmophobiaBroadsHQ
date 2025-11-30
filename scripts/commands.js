// =============================
// COMMANDS.JS — FINAL VERSION
// No images, no sounds, no placeholders.
// Safe + GitHub-friendly.
// =============================

// Handles special chat commands like: !help, !clear, etc.
export function handleCommand(command) {

  // Basic built-in commands
  switch (command) {

    case "!help":
      systemMessage(`
Available Commands:
!help – Show this help message
!clear – Clear your chat window (local only)
      `);
      break;

    case "!clear":
      clearChat();
      systemMessage("Chat cleared (local only).");
      break;

    default:
      systemMessage(`Unknown command: ${command}`);
  }
}

// Injects a system message into the chat
function systemMessage(text) {
  const box = document.getElementById("messages");
  const div = document.createElement("div");
  div.className = "message-entry";
  div.style.opacity = "0.7";
  div.style.fontStyle = "italic";
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// Clears chat on YOUR screen only
function clearChat() {
  const box = document.getElementById("messages");
  box.innerHTML = "";
}
// commands js
