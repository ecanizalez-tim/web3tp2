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


  new Zdog.Ellipse({
    addTo: illo,
    diameter: 40,
    stroke: 6,
    color: "#00f6ff",
  });

  
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 22,
    stroke: 3,
    color: "#ff00aa",
    translate: { z: 6 },
  });

  
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

    
    illo.rotate.y += isPlaying ? 0.06 : 0.02;

    
    satellite.translate.y = -8 + Math.sin(Date.now() / 300) * 2;

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
  }

  animate();
});
