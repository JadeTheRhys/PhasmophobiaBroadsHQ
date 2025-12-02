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
    populateCaseFiles
} from "./uiRenderer.js";
import {
    setupChatInput,
    setupProfileForm,
    setupGhostDropdown
} from "./uiForms.js";
import { GHOST_DATA } from "./ghostData.js";
import { loadCaseFiles } from "./caseFiles.js";
import { getMapImage } from "./mapData.js";

window.addEventListener("DOMContentLoaded", async () => {
    // Initialize Firebase and run everything else after login
    await initializeFirebase(() => {
        setupChatInput();
        setupProfileForm();
        setupGhostDropdown();
        populateGhostDropdown(GHOST_DATA);
        loadCaseFiles();
        populateCaseFiles();

        registerChatCallback(renderChat);
        registerEventCallback(renderGhostEvent);
        registerEvidenceCallback(renderEvidence);
        registerProfilesCallback(profiles => { window.__PROFILES = profiles; });
        registerStatusCallback(statuses => {
            const profiles = window.__PROFILES || {};
            renderSquadStatus(statuses, profiles);
            // Show map image
            const mapEntry = Object.values(statuses).find(x => x.map);
            if (mapEntry && mapEntry.map) {
                const url = getMapImage(mapEntry.map);
                renderMap(mapEntry.map, url);
            }
        });

        initializeFirebaseListeners();
        showInitialTab();
    });
});

window.switchTab = function(tabId) {
    document.querySelectorAll(".tab-page").forEach(page => page.classList.add("hidden"));
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active-tab"));
    const contentElement = document.getElementById(`tab-${tabId}`);
    const buttonElement = document.getElementById(`tab-btn-${tabId}`);
    if (contentElement) contentElement.classList.remove("hidden");
    if (buttonElement) buttonElement.classList.add("active-tab");
};

window.closeModal = function() {
    const modal = document.getElementById("case-file-modal");
    modal.classList.add("hidden");
};

function showInitialTab() {
    const initial = document.getElementById("tab-chat");
    const btn = document.getElementById("tab-btn-chat");
    if (initial) initial.classList.remove("hidden");
    if (btn) btn.classList.add("active-tab");
}// --------------------------------------------------------------
// MAIN APPLICATION INITIALIZER
// FINAL — This file connects everything together.
// --------------------------------------------------------------

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
    populateCaseFiles
} from "./uiRenderer.js";

import {
    setupChatInput,
    setupProfileForm,
    setupGhostDropdown
} from "./uiForms.js";

import { GHOST_DATA } from "./ghostData.js";

// NEW IMPORTS ADDED BY DADDY (FINAL)
import { loadCaseFiles } from "./caseFiles.js";
import { getMapImage } from "./mapData.js";

// --------------------------------------------------------------
// APP STARTUP
// --------------------------------------------------------------

window.addEventListener("DOMContentLoaded", async () => {
    console.log("🚀 HQ Booting Up…");

    // 1. Initialize Firebase
    await initializeFirebase();
    console.log("🔥 Firebase Online");

    // 2. Set up UI forms
    setupChatInput();
    setupProfileForm();
    setupGhostDropdown();

    // 3. Populate ghost dropdown from GHOST_DATA
    populateGhostDropdown(GHOST_DATA);

    // 3b. Load and render case files (FINAL)
    loadCaseFiles();       // Loads into window.__BROAD_IMAGES
    populateCaseFiles();   // Renders gallery thumbnails

    // 4. Register Firebase listener callbacks → UI render functions
    registerChatCallback((messages) => {
        renderChat(messages);
    });

    registerEventCallback((event) => {
        renderGhostEvent(event);
    });

    registerEvidenceCallback((list) => {
        renderEvidence(list);
    });

    registerProfilesCallback((profiles) => {
        window.__PROFILES = profiles; // stored globally for status panel
    });

    registerStatusCallback((statuses) => {
        const profiles = window.__PROFILES || {};
        renderSquadStatus(statuses, profiles);

        // Update map image using mapData.js (FINAL)
        const mapEntry = Object.values(statuses).find(x => x.map);
        if (mapEntry && mapEntry.map) {
            const url = getMapImage(mapEntry.map);
            renderMap(mapEntry.map, url);
        }
    });

    // 5. Start Firebase listeners
    initializeFirebaseListeners();
    console.log("🎧 Realtime Listeners Active");

    // 6. Set default visible tab
    showInitialTab();
});

// --------------------------------------------------------------
// SIMPLE INITIAL TAB SETTER
// --------------------------------------------------------------

function showInitialTab() {
    const initial = document.getElementById("tab-chat");
    const btn = document.getElementById("tab-btn-chat");

    if (initial) initial.classList.remove("hidden");
    if (btn) btn.classList.add("active-tab");
}

