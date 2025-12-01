// ============================================================
// main.js — Version B
// Core UI Engine for Tabs, Chat, Posters, Case Files, Listeners
// ============================================================

// -----------------------------
// GLOBALS FROM firebase.js
// -----------------------------
const db = window.__DB;
const playerName = window.PLAYER_NAME;

// Safety check
if (!db) console.error("🔥 FIREBASE NOT FOUND — Check firebase.js load order.");


// ============================================================
// UI: TAB SWITCHING
// ============================================================
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));

        btn.classList.add("active");
        const panel = document.getElementById(btn.dataset.target);
        if (panel) panel.classList.add("active");
    });
});


// ============================================================
// CHAT SYSTEM
// ============================================================
const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const chatForm = document.getElementById("chat-form");

const messagesRef = db.ref("messages");

// ---- Add a chat line
function addChatLine(user, text) {
    const line = document.createElement("div");
    line.className = "chat-line";
    line.innerHTML = `<span class="user">[${user}]</span> ${text}`;
    chatLog.appendChild(line);
    chatLog.scrollTop = chatLog.scrollHeight;
}

// ---- Send chat message
chatForm.addEventListener("submit", e => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    messagesRef.push({ user: playerName, text });
    window.handleCommand?.(text, playerName);

    chatInput.value = "";
});

// ---- Receive chat messages
messagesRef.limitToLast(100).on("child_added", snap => {
    const msg = snap.val();
    if (!msg) return;
    addChatLine(msg.user, msg.text);
});


// ============================================================
// DATABASE LISTENERS FOR PANELS
// ============================================================
const evidenceRef  = db.ref("evidence");
const statusRef    = db.ref("status");
const locationRef  = db.ref("locations");
const ghostLogRef  = db.ref("ghostlog");

// ---- Evidence Panel
evidenceRef.on("child_added", snap => {
    const item = snap.val();
    const div = document.createElement("p");
    div.innerHTML = `<span class="tag">📘 ${item.by}:</span> ${item.text}`;
    document.getElementById("evidence-list").appendChild(div);
});

// ---- Status Panel
statusRef.on("child_added", snap => {
    const item = snap.val();
    const div = document.createElement("p");
    div.innerHTML = `${item.text} <small>— ${item.by}</small>`;
    document.getElementById("status-list").appendChild(div);
});

// ---- Locations Panel
locationRef.on("child_added", snap => {
    const item = snap.val();
    const div = document.createElement("p");
    div.innerHTML = `<span class="tag">📍 ${item.by}</span> → ${item.text}`;
    document.getElementById("location-list").appendChild(div);
});

// ---- Ghost Log Panel
ghostLogRef.on("child_added", snap => {
    const item = snap.val();
    const div = document.createElement("p");
    div.textContent = item;
    document.getElementById("ghost-log").appendChild(div);
});


// ============================================================
// POSTER MODAL (Version B)
// ============================================================
window.openPoster = function(num) {
    const modal = document.getElementById("poster-modal");
    const img = document.getElementById("poster-modal-img");
    const caption = document.getElementById("poster-caption");

    const posters = [
        "Summoning Circle Incident",
        "Dragged From the Van",
        "Voodoo Doll Tackle",
        "Ouija Board Chaos",
        "Running from the Ghost",
        "Ghost Writing in the Basement"
    ];

    img.src = `assets/posters/poster${num}.png`;
    caption.textContent = posters[num - 1];

    modal.style.display = "block";
};

window.closePoster = function() {
    document.getElementById("poster-modal").style.display = "none";
};


// ============================================================
// CASEFILES (READY FOR EXPANSION IF YOU ADD MORE FILES)
// ============================================================
// Nothing needed here yet — index handles file layout.


// ============================================================
// JITSI LOBBY (Version B)
// ============================================================
window.openJitsi = () => {
    window.open("https://meet.jit.si/PhasmophobiaBroadsHQ", "_blank");
};


// ============================================================
// YEAR FOOTER
// ============================================================
document.getElementById("year").textContent = new Date().getFullYear();


// ============================================================
// READY LOG
// ============================================================
console.log("🎮 main.js (Version B) loaded successfully.");
