import anime from "animejs";

document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("anime-box");
  if (!box) return;

  anime({
    targets: "#anime-box",
    translateX: 250,
    direction: "alternate",
    loop: true,
    duration: 1500,
    easing: "easeInOutSine"
  });
});
