// ============================================================
// casefiles.js — FINAL CONTENT
// Creates poster cards and provides global functions for the modal.
// This is required to populate the "Case Files" tab.
// ============================================================

// Poster data based on the file names and the labels in index.html
const posterData = [
  { file: "poster1.png", label: "Summoning Circle", num: 1 },
  { file: "poster2.png", label: "Dragged From the Van", num: 2 },
  { file: "poster3.png", label: "Voodoo Doll Tackle", num: 3 },
  { file: "poster4.png", label: "Ouija Board Chaos", num: 4 },
  { file: "poster5.png", label: "Running From Ghost", num: 5 },
  { file: "poster6.png", label: "Ghost Writing", num: 6 }
];

// The container element where the grid of cards is placed (from index.html)
const caseGrid = document.querySelector(".case-grid");

// ============================================================
// CARD CREATION LOGIC
// ============================================================
function buildCaseFiles() {
  if (!caseGrid) return;
  
  caseGrid.innerHTML = ""; // Clear existing content

  posterData.forEach(item => {
    const card = document.createElement("div");
    card.className = "case-card";
    
    // Add the onclick handler to use the global function defined in index.html
    // NOTE: This relies on the openPoster() function defined in the <script> block of index.html
    card.setAttribute("onclick", `openPoster(${item.num})`);

    const img = document.createElement("img");
    // Path is correct: index.html is root, posters are in assets/posters
    img.src = `assets/posters/${item.file}`; 

    const caption = document.createElement("div");
    caption.textContent = item.label;

    card.appendChild(img);
    card.appendChild(caption);
    caseGrid.appendChild(card);
  });
}

// ============================================================
// INITIALIZE
// ============================================================

// Run the function to build the cards when the page loads
window.addEventListener('load', buildCaseFiles);
