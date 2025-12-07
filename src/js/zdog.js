// Petit objet ZDog qui tourne dans AUDIO REACTOR

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
    zoom: 1.4,
  });

  // Anneau principal
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 38,
    stroke: 6,
    color: "#00f6ff",
  });

  // Anneau interne
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 20,
    stroke: 3,
    color: "#ff00aa",
    translate: { z: 6 },
  });

  // Petit "satellite"
  new Zdog.Shape({
    addTo: illo,
    stroke: 4,
    color: "#ffffff",
    translate: { x: 18, y: -6, z: 10 },
  });

  function animate() {
    // si le son joue, on peut ajouter un léger spin plus rapide
    let isPlaying = false;
    if (window.Tone && Tone.Transport) {
      isPlaying = Tone.Transport.state === "started";
    }

    illo.rotate.y += isPlaying ? 0.04 : 0.015;
    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  animate();
});
