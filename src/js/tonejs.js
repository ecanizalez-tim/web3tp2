// Tone.js global (chargé via <script src="./node_modules/tone/build/Tone.js">)

document.addEventListener("DOMContentLoaded", () => {
  if (typeof Tone === "undefined") {
    console.error("Tone n'est pas chargé.");
    return;
  }

  const waveformEl = document.querySelector(".waveform-bars");
  const btnPlay = document.getElementById("btn-play");
  const btnStop = document.getElementById("btn-stop");

  if (!btnPlay || !btnStop) return;

  // --- SYNTHS & CHAÎNE AUDIO ---

  const synthKick = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.2 },
  });

  const synthHat = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.08 },
  });

  // Filtre commun
  const filter = new Tone.Filter(800, "lowpass").toDestination();
  synthKick.connect(filter);
  synthHat.connect(filter);

  // Loop rythmique
  const loop = new Tone.Loop((time) => {
    synthKick.triggerAttackRelease("C2", "8n", time);
    synthHat.triggerAttackRelease("C5", "16n", time + Tone.Time("8n"));
  }, "4n");

  let started = false;

  const setWaveformPlaying = (isPlaying) => {
    if (!waveformEl) return;
    if (isPlaying) {
      // reset l'anim pour qu'elle reparte à chaque Play
      waveformEl.classList.remove("playing");
      void waveformEl.offsetWidth;
      waveformEl.classList.add("playing");
    } else {
      waveformEl.classList.remove("playing");
    }
  };

  // --- PLAY / PAUSE ---

  btnPlay.addEventListener("click", async () => {
    await Tone.start(); // nécessaire pour le son (Chrome autoplay)

    if (!started) {
      loop.start(0);
      started = true;
    }

    Tone.Transport.start();
    setWaveformPlaying(true);
  });

  btnStop.addEventListener("click", () => {
    Tone.Transport.pause();
    setWaveformPlaying(false);
  });

  // --- MASTER VOLUME (slider en haut des sliders) ---

  const masterSlider = document.querySelector(
    ".hud-sliders .slider-group:first-child .hud-range"
  );

  if (masterSlider) {
    const updateVolume = () => {
      const value = Number(masterSlider.value); // 0–100
      const gain = (value - 50) / 50; // -1 à +1
      Tone.Destination.volume.value = gain * 10; // -10dB à +10dB
    };

    updateVolume();
    masterSlider.addEventListener("input", updateVolume);
  }

  // --- KNOBS : Filter / Attack / Release ---

  const knobGroups = document.querySelectorAll(".knob-group");
  const filterInput = knobGroups[0]?.querySelector(".knob-input");
  const attackInput = knobGroups[1]?.querySelector(".knob-input");
  const releaseInput = knobGroups[2]?.querySelector(".knob-input");

  // filtre
  if (filterInput) {
    const updateFilter = () => {
      const v = Number(filterInput.value); // 0–100
      const freq = 200 + (v / 100) * 6000; // 200–6200 Hz
      filter.frequency.value = freq;
    };
    updateFilter();
    filterInput.addEventListener("input", updateFilter);
  }

  // envelopes
  const updateEnvelope = () => {
    const atk = attackInput ? (Number(attackInput.value) / 100) * 0.4 + 0.001 : 0.01;
    const rel = releaseInput ? (Number(releaseInput.value) / 100) * 0.8 + 0.05 : 0.2;

    synthKick.envelope.attack = atk;
    synthKick.envelope.release = rel;
    synthHat.envelope.attack = atk * 0.5;
    synthHat.envelope.release = rel * 0.5;
  };

  if (attackInput && releaseInput) {
    attackInput.addEventListener("input", updateEnvelope);
    releaseInput.addEventListener("input", updateEnvelope);
    updateEnvelope();
  }

  // --- ROTATION VISUELLE DES KNOBS ---

const knobConfigs = [
  { rangeId: "filter-range", valueId: "filter-value", knobSelector: "[data-knob='filter']" },
  { rangeId: "attack-range", valueId: "attack-value", knobSelector: "[data-knob='attack']" },
  { rangeId: "release-range", valueId: "release-value", knobSelector: "[data-knob='release']" },
];

knobConfigs.forEach(({ rangeId, valueId, knobSelector }) => {
  const range = document.getElementById(rangeId);
  const valueEl = document.getElementById(valueId);
  const knob = document.querySelector(knobSelector);

  if (!range || !valueEl || !knob) return;

  const updateKnob = () => {
    const val = Number(range.value);  // 0–100
    valueEl.textContent = val;

    // 0–100 → 0° à 360°
    const angle = (val / 100) * 360;
    knob.style.setProperty("--angle", `${angle}deg`);
  };

  range.addEventListener("input", updateKnob);
  updateKnob();
});


  // --- PRESETS ---

  const applyPresetValues = (vol, filt, atk, rel) => {
    if (masterSlider) {
      masterSlider.value = vol;
      masterSlider.dispatchEvent(new Event("input"));
    }
    if (filterInput) {
      filterInput.value = filt;
      filterInput.dispatchEvent(new Event("input"));
    }
    if (attackInput) {
      attackInput.value = atk;
      attackInput.dispatchEvent(new Event("input"));
    }
    if (releaseInput) {
      releaseInput.value = rel;
      releaseInput.dispatchEvent(new Event("input"));
    }
  };

  const setPresetTheme = (name) => {
    const grid = document.getElementById("hud-grid");
    if (!grid) return;
    grid.classList.remove("preset-chill", "preset-drive", "preset-glitch");
    if (name) grid.classList.add(`preset-${name}`);
  };

  const presetButtons = document.querySelectorAll("[data-preset]");
  presetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = btn.getAttribute("data-preset");

      if (p === "chill") {
        applyPresetValues(55, 40, 40, 60);
      } else if (p === "drive") {
        applyPresetValues(80, 80, 20, 30);
      } else if (p === "glitch") {
        applyPresetValues(70, 65, 10, 15);
      }

      setPresetTheme(p);
    });
  });
});
