// ===========================
// ANIMATIONS — Triggered by Ghost Commands
// ===========================

window.playFlicker = function() {
  document.body.classList.add("flicker-effect");
  setTimeout(() => {
    document.body.classList.remove("flicker-effect");
  }, 1200);
};

window.playSlam = function() {
  const flash = document.createElement("div");
  flash.className = "slam-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 400);

  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 600);
};

window.playHunt = function() {
  const overlay = document.createElement("div");
  overlay.className = "hunt-overlay";
  document.body.appendChild(overlay);

  document.body.classList.add("shake");

  setTimeout(() => {
    overlay.remove();
    document.body.classList.remove("shake");
  }, 4500);
};
