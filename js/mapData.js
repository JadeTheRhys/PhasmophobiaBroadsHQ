// --------------------------------------------------------------
// MAP DATA MODULE — FINAL
// Provides map names + URLs for squad status + map panel.
// Called by: uiRenderer.js & main.js
// --------------------------------------------------------------

export const MAP_DATA = {
    Grafton: {
        name: "Grafton Farmhouse",
        url: "/assets/maps/grafton.jpg"
    },

    Tanglewood: {
        name: "Tanglewood Street House",
        url: "/assets/maps/tanglewood.jpg"
    },

    Edgefield: {
        name: "Edgefield Street House",
        url: "/assets/maps/edgefield.jpg"
    },

    Ridgeview: {
        name: "Ridgeview Road House",
        url: "/assets/maps/ridgeview.jpg"
    },

    Willow: {
        name: "Willow Street House",
        url: "/assets/maps/willow.jpg"
    },

    Bleasdale: {
        name: "Bleasdale Farmhouse",
        url: "/assets/maps/bleasdale.jpg"
    },

    Brownstone: {
        name: "Brownstone High School",
        url: "/assets/maps/brownstone.jpg"
    }
};

// Default fallback image
const DEFAULT_MAP =
    "https://placehold.co/600x300/0a0a0f/5dfdff?text=Map+Not+Set";

// --------------------------------------------------------------
// Returns the correct map image URL for UI
// --------------------------------------------------------------
export function getMapImage(mapName) {
    if (!mapName) return DEFAULT_MAP;

    const key = mapName.trim();
    if (MAP_DATA[key]) {
        return MAP_DATA[key].url;
    }

    return DEFAULT_MAP;
}
