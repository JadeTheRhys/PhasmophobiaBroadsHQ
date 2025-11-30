/* ============================================================
   PHASMOPHOBIA BROADS — CASE FILES MODULE
   GitHub Safe | Dynamic Polaroid Gallery | Clean + Fast
   ============================================================ */

// Elements
const casefilesEl = document.getElementById("casefiles");
const closeBtn = document.querySelector(".close-casefiles");
const grid = document.querySelector(".cf-grid");

// ===============================================
// CASE FILES DATA — you can add/remove images here
// ===============================================
const caseFiles = [
  { src: "assets/casefiles/1.jpg", label: "Case File 01" },
  { src: "assets/casefiles/2.jpg", label: "Case File 02" },
  { src: "assets/casefiles/3.jpg", label: "Case File 03" },
  { src: "assets/casefiles/4.jpg", label: "Case File 04" },
  { src: "assets/casefiles/5.jpg", label: "Case File 05" },
  { src: "assets/casefiles/6.jpg", label: "Case File 06" }
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
