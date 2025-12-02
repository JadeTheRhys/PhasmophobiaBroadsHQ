import { sendChatMessage, sendCommand, saveUserProfile } from "./firebaseWrite.js";
import { renderGhostProfile } from "./uiRenderer.js";
import { GHOST_DATA } from "./ghostData.js";

// --- CHAT INPUT ---
export function setupChatInput() {
    const input = document.getElementById("chat-input");
    if (!input) return;
    input.addEventListener("keydown", async (e) => {
        if (e.key !== "Enter") return;
        const raw = input.value.trim();
        if (!raw) return;
        if (raw.startsWith("!")) {
            handleCommand(raw);
        } else {
            await sendChatMessage(raw);
        }
        input.value = "";
    });
}

function handleCommand(raw) {
    const txt = raw.substring(1);
    const parts = txt.split(":");
    const command = parts[0].toLowerCase();
    const value = parts[1] ? parts[1].trim() : "";
    sendCommand(command, value, raw);
}

// --- PROFILE FORM ---
export function setupProfileForm() {
    const saveBtn = document.getElementById("profile-save-btn");
    const nameInput = document.getElementById("display-name-input");
    const photoSelect = document.getElementById("photo-select");
    const preview = document.getElementById("profile-preview");

    if (!saveBtn || !nameInput || !photoSelect || !preview) return;

    photoSelect.addEventListener("change", () => {
        preview.src = photoSelect.value;
    });

    saveBtn.addEventListener("click", async () => {
        const name = nameInput.value.trim();
        const photo = photoSelect.value;
        if (name.length < 3) {
            alert("Display name must be at least 3 characters.");
            return;
        }
        await saveUserProfile(name, photo);
    });
}

// --- GHOST DROPDOWN ---
export function setupGhostDropdown() {
    const select = document.getElementById("ghost-select");
    if (!select) return;
    select.addEventListener("change", () => {
        const ghostName = select.value;
        renderGhostProfile(ghostName, GHOST_DATA);
    });
}
