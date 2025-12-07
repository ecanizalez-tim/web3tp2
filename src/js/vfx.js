document.addEventListener("DOMContentLoaded", () => {
  const groups = document.querySelectorAll(".knob-group");

  groups.forEach(group => {
    const knob = group.querySelector(".knob");
    const input = group.querySelector(".knob-input");
    const valueEl = group.querySelector(".knob-value");

    if (!knob || !input || !valueEl) return;

    const updateKnob = () => {
      const value = Number(input.value);
      // On mappe 0–100 à -135deg → +135deg
      const angle = -135 + (value / 100) * 270;
      knob.style.setProperty("--angle", `${angle}deg`);
      valueEl.textContent = value;
    };

    // Init
    updateKnob();
    // Sur changement
    input.addEventListener("input", updateKnob);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ... ton code existant (knobs etc.) ...

  // AUDIO REACTOR
  const reactorCanvas = document.getElementById("reactor-canvas");
  if (reactorCanvas) {
    const ctx = reactorCanvas.getContext("2d");

    const resizeReactor = () => {
      const dpr = window.devicePixelRatio || 1;
      reactorCanvas.width = reactorCanvas.clientWidth * dpr;
      reactorCanvas.height = reactorCanvas.clientHeight * dpr;
    };
    resizeReactor();
    window.addEventListener("resize", resizeReactor);

    let t = 0;

    const draw = () => {
      const w = reactorCanvas.width;
      const h = reactorCanvas.height;
      if (!w || !h) {
        requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(0, 5, 15, 0.9)";
      ctx.fillRect(0, 0, w, h);

      const bars = 32;

      // Est-ce que la musique joue ?
      let isPlaying = false;
      if (window.Tone && Tone.Transport) {
        isPlaying = Tone.Transport.state === "started";
      }

      for (let i = 0; i < bars; i++) {
        const x = (i + 0.5) * (w / bars);

        // intensité de base selon volume
        let amp = 0.3;
        if (window.Tone && Tone.Destination) {
          amp = (Tone.Destination.volume.value + 20) / 20; // ~0–1
        }

        const noise = Math.sin(t + i * 0.4) * 0.5 + 0.5;

        // si pas de son → bars basses
        const activity = isPlaying ? 1 : 0.25;

        const value = Math.max(
          0.08,
          Math.min(1, activity * (amp * 0.4 + noise * 0.6))
        );

        const barHeight = value * (h * 0.7);
        const y = h - barHeight;

        const gradient = ctx.createLinearGradient(x, y, x, h);
        gradient.addColorStop(0, "rgba(0,246,255,0.9)");
        gradient.addColorStop(1, "rgba(0,246,255,0.0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(x - 4, y, 8, barHeight);
      }

      t += isPlaying ? 0.03 : 0.01; // plus lent en idle
      requestAnimationFrame(draw);
    };


    draw();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sourceItems = document.querySelectorAll(".source-item");
  sourceItems.forEach(item => {
    item.addEventListener("click", () => {
      sourceItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
});

