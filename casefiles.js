/* ============================================================
   PHASMOPHOBIA BROADS — CASE FILES MODULE
   GitHub Safe | Dynamic Polaroid Gallery | Clean + Fast
   ============================================================ */

// Elements
const casefilesEl = document.getElementById("casefiles");
const closeBtn = document.querySelector(".close-casefiles");
const grid = document.querySelector(".cf-grid");

// ===============================================
// CASE FILES DATA — Updated with your provided image filenames
// ===============================================
const caseFiles = [
  // These names MUST match the files you upload to the assets/casefiles folder
  { src: "assets/casefiles/ChatGPT Image Nov 25, 2025, 01_35_48 PM.jpg", label: "Case File 01" },
  { src: "assets/casefiles/ChatGPT Image Nov 25, 2025, 06_40_24 PM.jpg", label: "Case File 02" },
  { src: "assets/casefiles/ChatGPT Image Nov 25, 2025, 06_58_04 PM.jpg", label: "Case File 03" },
  { src: "assets/casefiles/ChatGPT Image Nov 25, 2025, 07_06_20 PM.jpg", label: "Case File 04" },
  { src: "assets/casefiles/ChatGPT Image Nov 25, 2025, 07_27_30 PM.jpg", label: "Case File 05" },
  { src: "assets/casefiles/ChatGPT Image Nov 25, 2025, 07_39_52 PM.jpg", label: "Case File 06" }
];

// ===============================================
// BUILD CASE FILE CARDS
// ===============================================
function buildCaseFiles() {
  grid.innerHTML = "";

  caseFiles.forEach(file => {
    const card = document.createElement("div");
    card.className = "cf-card";

    const img = document.createElement("img");
    img.src = file.src;

    const caption = document.createElement("p");
    caption.textContent = file.label;

    card.appendChild(img);
    card.appendChild(caption);

    grid.appendChild(card);
  });
}

// ===============================================
// OPEN / CLOSE
// ===============================================
export function openCaseFiles() {
  buildCaseFiles();
  casefilesEl.classList.remove("hidden");
}

export function closeCaseFiles() {
  casefilesEl.classList.add("hidden");
}

// Close button hook
closeBtn?.addEventListener("click", closeCaseFiles);

// Expose globally for buttons written in HTML
window.openCaseFiles = openCaseFiles;
window.closeCaseFiles = closeCaseFiles;
// Placeholder casefiles.js
