// --------------------------------------------------------------
// CASE FILE DATA MODULE — FINAL
// Loads Phasmophobia Broads case-file images + descriptions.
// Renderer (uiRenderer.js) uses window.__BROAD_IMAGES.
// --------------------------------------------------------------

export function loadCaseFiles() {
    window.__BROAD_IMAGES = [
        {
            url: "/assets/profiles/case1.jpg",
            title: "The Silent Approach",
            description:
                "Case File 001: Encounter at Brownstone High School. Docile at first—but EMF spikes were undeniable."
        },
        {
            url: "/assets/profiles/case2.jpg",
            title: "Closet Panic",
            description:
                "Case File 002: Trapped in a closet during a hunt. EMF went critical. Survivor's adrenaline record."
        },
        {
            url: "/assets/profiles/case3.jpg",
            title: "Emergency Extraction",
            description:
                "Case File 003: A Demon rushed the group. Dragged back to the van with seconds to spare."
        },
        {
            url: "/assets/profiles/case4.jpg",
            title: "Ouija Board Gamble",
            description:
                "Case File 004: Asked the wrong question. Sanity wiped instantly. High-risk intel retrieval."
        },
        {
            url: "/assets/profiles/case5.jpg",
            title: "The Voodoo Threat",
            description:
                "Case File 005: Mimic puppeteering a Voodoo Doll. Aggressive, persistent, and personal."
        },
        {
            url: "/assets/profiles/case6.jpg",
            title: "Circle of Summoning",
            description:
                "Case File 006: Ritual circle activation. Immediate manifestation—danger level extreme."
        }
    ];
}
