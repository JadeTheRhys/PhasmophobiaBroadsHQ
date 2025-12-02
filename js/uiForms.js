// --------------------------------------------------------------
// UI FORMS HANDLING — FINAL VERSION
// Handles: chat input, profile form, ghost dropdown selection.
// --------------------------------------------------------------

import { sendChatMessage, sendCommand } from "./firebase.js";
import { renderGhostProfile } from "./uiRenderer.js";
import { GHOST_DATA } from "./ghostData.js";

// --------------------------------------------------------------
// CHAT INPUT SETUP
// --------------------------------------------------------------
export function setupChatInput() {
    const input = document.getElementById("chat-input");
    if (!input) return;

    input.addEventListener("keydown", async (e) => {
        if (e.key !== "Enter") return;

        const raw = input.value.trim();
        if (!raw) return;

        // Commands start with !
        if (raw.startsWith("!")) {
            handleCommand(raw);
        } else {
            await sendChatMessage(raw);
        }

        input.value = "";
    });
}

// --------------------------------------------------------------
// COMMAND PARSER
// --------------------------------------------------------------
function handleCommand(raw) {
    const txt = raw.substring(1); // remove "!"
    const parts = txt.split(":");
    const command = parts[0].toLowerCase();
    const value = parts[1] ? parts[1].trim() : "";

    sendCommand(command, value, raw);
}

// --------------------------------------------------------------
// PROFILE FORM SETUP
// --------------------------------------------------------------
export function setupProfileForm() {
    const saveBtn = document.getElementById("profile-save-btn");
    const nameInput = document.getElementById("display-name-input");
    const photoSelect = document.getElementById("photo-select");
    const preview = document.getElementById("profile-preview");

    if (!saveBtn || !nameInput || !photoSelect || !preview) return;

    // Update preview when selecting a photo
    photoSelect.addEventListener("change", () => {
        preview.src = photoSelect.value;
    });

    // Save profile button
    saveBtn.addEventListener("click", async () => {
        const name = nameInput.value.trim();
        const photo = photoSelect.value;

        if (name.length < 3) {
            alertBox("Display name must be at least 3 characters.", "bg-red-500");
            return;
        }

        await window.__saveProfile(name, photo);
    });
}

// --------------------------------------------------------------
// GHOST DROPDOWN SETUP
// --------------------------------------------------------------
export function setupGhostDropdown() {
    const select = document.getElementById("ghost-select");
    if (!select) return;

    select.addEventListener("change", () => {
        const ghostName = select.value;
        renderGhostProfile(ghostName, GHOST_DATA);
    });
}
