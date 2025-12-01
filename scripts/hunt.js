// =============================
// HUNT MODE — animations + sync
// =============================

// Firebase reference
let huntRef = null;

// Setup from index.html
window.setupHuntRef = function(db) {
  huntRef = db.ref("hunt");
};

// Listen for hunt events
if (!window.huntListenerAdded) {
  window.huntListenerAdded = true;

  firebase.database().ref("hunt").on("child_added", snap => {
    const event = snap.val();
    if (!event) return;

    if (event.type === "start") startHuntAnimation(event.by);
    if (event.type === "stop") stopHuntAnimation(event.by);
  });
}

// ------------------------------
// ✦ Triggered by command.js
// ------------------------------
window.triggerHunt = function(playerName) {
  huntRef.push({
    type: "start",
    by: playerName,
    time: Date.now()
  });

  // Auto-stop hunt after 7 seconds
  setTimeout(() => {
    huntRef.push({
      type: "stop",
      by: playerName,
      time: Date.now()
    });
  }, 7000);
};

// ------------------------------
// VISUAL EFFECTS
// ------------------------------
function startHuntAnimation(playerName) {
  console.log("Hunt started by", playerName);

  document.body.classList.add("hunt-active");

  // Add log entry
  const log = document.getElementById("ghost-log");
  const p = document.createElement("p");
  p.innerHTML = `💥 <strong>HUNT!</strong> The ghost begins its chase! (Triggered by ${playerName})`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

function stopHuntAnimation(playerName) {
  console.log("Hunt stopped by", playerName);

  document.body.classList.remove("hunt-active");

  const log = document.getElementById("ghost-log");
  const p = document.createElement("p");
  p.innerHTML = `😮‍💨 The hunt ends… (Stopped by ${playerName})`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}
