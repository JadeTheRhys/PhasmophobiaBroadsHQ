// ========================================
// MAIN.JS — FINAL VERSION
// Handles tab switching + UI setup
// ========================================

// Grab tab buttons & content sections
const tabButtons = document.querySelectorAll(".sidebar button[data-tab]");
const sections = document.querySelectorAll(".section");

// Default: show chat
showSection("chat");

// Switch between pages
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-tab");
    showSection(target);
  });
});

// Show only the selected section
function showSection(id) {
  sections.forEach(sec => sec.style.display = "none");
  const el = document.getElementById(id);
  if (el) el.style.display = "block";
}
// main js
