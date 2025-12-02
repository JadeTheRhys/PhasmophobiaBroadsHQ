// --------------------------------------------------------------
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
