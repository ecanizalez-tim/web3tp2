// MapLibre global (chargé via <script src="./node_modules/maplibre-gl/dist/maplibre-gl.js">)

document.addEventListener("DOMContentLoaded", () => {
  if (typeof maplibregl === "undefined") {
    console.error("MapLibre n'est pas chargé.");
    return;
  }

  const container = document.getElementById("hud-map-container");
  if (!container) return;

  const map = new maplibregl.Map({
    container: "hud-map-container",
    style: "https://demotiles.maplibre.org/style.json",
    center: [-73.56, 45.5], // Montréal 💙
    zoom: 2.5
  });

  map.addControl(new maplibregl.NavigationControl(), "top-right");

  // Quelques "streams" fictifs
  const points = [
    { lng: -73.56, lat: 45.5, label: "Montreal" },
    { lng: -0.13, lat: 51.5, label: "London" },
    { lng: 139.69, lat: 35.68, label: "Tokyo" },
    { lng: 127.03, lat: 37.5, label: "Seoul" }
  ];

  points.forEach(p => {
    const el = document.createElement("div");
    el.className = "hud-map-marker";
    el.title = p.label;

    new maplibregl.Marker(el)
      .setLngLat([p.lng, p.lat])
      .addTo(map);
  });
});

