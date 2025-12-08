// src/js/zdog.js
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Zdog === "undefined") {
    console.error("ZDog n'est pas chargé.");
    return;
  }

  const elem = document.getElementById("reactor-orbit");
  if (!elem) return;

  const illo = new Zdog.Illustration({
    element: elem,
    dragRotate: false,
    rotate: { x: -0.4, y: 0.6 },
    zoom: 1.6,
  });

  // anneau principal
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 40,
    stroke: 6,
    color: "#00f6ff",
  });

  // anneau interne
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 22,
    stroke: 3,
    color: "#ff00aa",
    translate: { z: 6 },
  });

  // petit satellite
  const satellite = new Zdog.Shape({
    addTo: illo,
    stroke: 5,
    color: "#ffffff",
    translate: { x: 20, y: -8, z: 10 },
  });

  function animate() {
    let isPlaying = false;
    if (window.Tone && Tone.Transport) {
      isPlaying = Tone.Transport.state === "started";
    }

    // rotation de l’orbite
    illo.rotate.y += isPlaying ? 0.06 : 0.02;

    // léger wobble du satellite
    satellite.translate.y = -8 + Math.sin(Date.now() / 300) * 2;

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  animate();
});
