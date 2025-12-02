// --------------------------------------------------------------
// MODULAR APPLICATION INITIALIZER — FINAL & CLEANED FOR MODULES
// --------------------------------------------------------------

// ==== App Imports ====
import { initializeFirebase } from "./firebase.js";
import { initializeFirebaseListeners } from "./firebaseListeners.js";
import {
    registerChatCallback,
    registerEventCallback,
    registerEvidenceCallback,
    registerStatusCallback,
    registerProfilesCallback
} from "./firebaseListeners.js";
import {
    renderChat,
    renderGhostEvent,
    renderEvidence,
    renderSquadStatus,
    renderMap,
    populateGhostDropdown,
    renderGhostProfile,
    populateCaseFiles,
    closeModal as uiCloseModal
} from "./uiRenderer.js";
import {
    setupChatInput,
    setupProfileForm,
    setupGhostDropdown
} from "./uiForms.js";
import { GHOST_DATA } from "./ghostData.js";
import { loadCaseFiles } from "./caseFiles.js";
import { getMapImage } from "./mapData.js";

// ==== Tab Switching/Modal in JS (no more window/global use) ====
function switchTab(tabId) {
    document.querySelectorAll(".tab-page").forEach(page => page.classList.add("hidden"));
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active-tab"));
    const contentElement = document.getElementById(`tab-${tabId}`);
    const buttonElement = document.getElementById(`tab-btn-${tabId}`);
    if (contentElement) contentElement.classList.remove("hidden");
    if (buttonElement) buttonElement.classList.add("active-tab");
}

function showInitialTab() {
    switchTab("chat");
}

// ==== Modal closing for case files
function closeModal() {
    const modal = document.getElementById("case-file-modal");
    modal.classList.add("hidden");
}

// ==== Setup all UI Event Listeners
function setupTabEventListeners() {
    [
        "chat", "evidence", "log", "casefiles", "squad", "lobby"
    ].forEach(tab => {
        const btn = document.getElementById(`tab-btn-${tab}`);
        if (btn) btn.addEventListener("click", () => switchTab(tab));
    });
}
function setupModalCloseListener() {
    const closeModalBtn = document.querySelector("#case-file-modal button");
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
}
function setupJitsiButton() {
    const jitsiBtn = document.getElementById("btn-open-jitsi");
    if (jitsiBtn) {
        jitsiBtn.addEventListener("click", () => {
            window.open("https://meet.jit.si/PhasmoBroadsHQ", "_blank", "width=800,height=600");
        });
    }
}

// ==== APP STARTUP & INITIALIZATION ====
window.addEventListener("DOMContentLoaded", async () => {
    // 1. Initialize Firebase
    await initializeFirebase();

    // 2. Setup UI interactions/forms
    setupChatInput();
    setupProfileForm();
    setupGhostDropdown();

    // 3. Populate ghost dropdown & case file gallery
    populateGhostDropdown(GHOST_DATA);
    loadCaseFiles();             // Loads window.__BROAD_IMAGES
    populateCaseFiles();         // Renders thumbnails

    // 4. Attach all realtime listeners
    registerChatCallback(renderChat);
    registerEventCallback(renderGhostEvent);
    registerEvidenceCallback(renderEvidence);

    registerProfilesCallback((profiles) => {
        window.__PROFILES = profiles; // Stored globally for squad panel
    });
    registerStatusCallback((statuses) => {
        const profiles = window.__PROFILES || {};
        renderSquadStatus(statuses, profiles);
        // Update map image using mapData.js
        const mapEntry = Object.values(statuses).find(x => x.map);
        if (mapEntry && mapEntry.map) {
            const url = getMapImage(mapEntry.map);
            renderMap(mapEntry.map, url);
        }
    });

    // 5. Start realtime listeners
    initializeFirebaseListeners();

    // 6. Set initial tab and setup tab/modal/Jitsi listeners
    setupTabEventListeners();
    setupModalCloseListener();
    setupJitsiButton();
    showInitialTab();
});
