// --------------------------------------------------------------
// UI RENDERER — FINAL PRODUCTION VERSION
// Handles all DOM updates for:
// chat, ghost events, evidence, ghost profiles, squad status,
// map display, case file gallery, and modal interactions.
// --------------------------------------------------------------

import { getMapImage } from "./mapData.js";

// --------------------------------------------------------------
// CHAT RENDERING
// --------------------------------------------------------------
export function renderChat(messages) {
    const box = document.getElementById("chat-messages");
    if (!box) return;
    box.innerHTML = "";

    messages.forEach(msg => {
        const time = formatTime(msg.timestamp);

        const div = document.createElement("div");
        div.className = "flex items-start space-x-3 log-entry";

        div.innerHTML = `
            <img class="w-7 h-7 rounded-full border border-soft-cyan" 
                 src="${msg.photoUrl}" />
            <div class="flex-grow">
                <span class="text-xs text-gray-500">${time}</span>
                <span class="font-bold text-neon-purple ml-2">${msg.displayName}:</span>
                <span class="${msg.isCommand ? "log-entry-command" : "text-gray-200"}">
                    ${msg.message}
                </span>
            </div>
        `;

        box.appendChild(div);
    });

    box.scrollTop = box.scrollHeight;
}

// --------------------------------------------------------------
// GHOST EVENT RENDERING
// --------------------------------------------------------------
export function renderGhostEvent(event) {
    if (!event) return;

    const log = document.getElementById("ghost-activity-log");
    if (!log) return;

    const time = formatTime(event.timestamp);

    const div = document.createElement("p");
    div.className = "log-entry log-entry-event";
    div.innerHTML = `[${time}] EVENT — ${event.message}`;

    log.appendChild(div);
    log.scrollTop = log.scrollHeight;

    triggerScreenEffect(event.type);
}

function triggerScreenEffect(type) {
    const body = document.body;

    if (type === "hunt" || type === "slam" || type === "curse") {
        body.classList.add("scare-shake");
        setTimeout(() => body.classList.remove("scare-shake"), 1000);
    } else {
        body.classList.add("scare-flicker");
        setTimeout(() => body.classList.remove("scare-flicker"), 800);
    }
}

// --------------------------------------------------------------
// EVIDENCE PANEL
// --------------------------------------------------------------
export function renderEvidence(list) {
    const box = document.getElementById("evidence-display");
    if (!box) return;

    if (!list.length) {
        box.innerHTML = `<p class="text-gray-500 italic p-2">No evidence collected yet.</p>`;
        return;
    }

    box.innerHTML = "";

    list.forEach(ev => {
        box.innerHTML += `
            <div class="p-3 border-l-4 border-soft-cyan bg-white/5 rounded-md flex justify-between items-center">
                <span class="font-bold text-soft-cyan text-lg">${ev.evidence}</span>
                <span class="text-xs text-gray-400 ml-4">By ${ev.displayName}</span>
            </div>
        `;
    });

    box.scrollTop = box.scrollHeight;
}

// --------------------------------------------------------------
// GHOST PROFILE PANEL
// --------------------------------------------------------------
export function populateGhostDropdown(data) {
    const select = document.getElementById("ghost-select");
    if (!select) return;

    select.innerHTML = `<option value="">--- Select Ghost Type ---</option>`;

    Object.keys(data).sort().forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
    });
}

export function renderGhostProfile(name, data) {
    const info = document.getElementById("ghost-info");
    if (!info) return;

    if (!name || !data[name]) {
        info.innerHTML = `<p class="text-gray-400">Select a ghost above.</p>`;
        return;
    }

    const g = data[name];

    info.innerHTML = `
        <h4 class="text-xl font-orbitron text-soft-cyan">${name}</h4>
        <div class="border-b border-neon-purple/50 pb-2 mb-2"></div>

        <p><span class="text-neon-purple font-bold">Evidence:</span> ${g.evidence.join(", ")}</p>
        <p><span class="text-neon-purple font-bold">Strength:</span> ${g.strength}</p>
        <p><span class="text-neon-purple font-bold">Weakness:</span> ${g.weakness}</p>
    `;
}

// --------------------------------------------------------------
// SQUAD STATUS
// --------------------------------------------------------------
export function renderSquadStatus(statuses, profiles) {
    const box = document.getElementById("status-display");
    if (!box) return;

    box.innerHTML = "";

    Object.values(statuses).forEach(st => {
        const profile = profiles[st.userId] || {};
        const name = profile.displayName || "Unknown";
        const photo = profile.photoUrl || "/assets/profiles/default.jpg";

        const isDead = st.isDead;
        const map = st.map || "Unknown Map";
        const loc = st.location || "Unknown Room";

        const statusColor = isDead ? "border-red-500" : "border-green-500";
        const statusIcon = isDead ? "fa-skull text-red-500" : "fa-heartbeat text-green-500";

        box.innerHTML += `
            <div class="flex items-center space-x-3 p-4 rounded-lg border-2 ${statusColor} bg-white/5">
                <img class="w-10 h-10 rounded-full border border-soft-cyan" src="${photo}" />

                <div class="flex-grow">
                    <span class="font-bold text-white text-lg">${name}</span>
                    <div class="text-sm text-gray-400">
                        <i class="fas fa-map-marker-alt text-neon-purple mr-1"></i>
                        ${isDead ? "DECEASED" : `${map} — ${loc}`}
                    </div>
                </div>

                <i class="fas ${statusIcon} text-2xl"></i>
            </div>
        `;
    });
}

// --------------------------------------------------------------
// MAP RENDERER
// --------------------------------------------------------------
export function renderMap(mapName, mapUrl) {
    const img = document.getElementById("map-location-image");
    if (!img) return;

    img.src = mapUrl || getMapImage(mapName);
    img.alt = mapName || "Map Location";
}

// --------------------------------------------------------------
// CASE FILE GALLERY + MODAL
// --------------------------------------------------------------
export function populateCaseFiles() {
    const gallery = document.getElementById("case-files-gallery");
    if (!gallery || !window.__BROAD_IMAGES) return;

    gallery.innerHTML = "";

    window.__BROAD_IMAGES.forEach((item, i) => {
        const img = document.createElement("img");
        img.src = item.url;
        img.className =
            "w-full h-32 object-cover rounded-lg border-2 border-neon-purple hover:border-soft-cyan cursor-pointer shadow-lg";
        img.onclick = () => openCaseFileModal(i);

        gallery.appendChild(img);
    });
}

export function openCaseFileModal(index) {
    const modal = document.getElementById("case-file-modal");
    const img = document.getElementById("modal-image");
    const title = document.getElementById("modal-title");
    const desc = document.getElementById("modal-description");

    const item = window.__BROAD_IMAGES[index];
    if (!item) return;

    img.src = item.url;
    title.textContent = item.title;
    desc.textContent = item.description;

    modal.classList.remove("hidden");
}

export function closeModal() {
    const modal = document.getElementById("case-file-modal");
    modal.classList.add("hidden");
}

// --------------------------------------------------------------
// UTILITY
// --------------------------------------------------------------
function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleTimeString("en-US", { hour12: false });
}
