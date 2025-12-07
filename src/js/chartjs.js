import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("chartjs-test");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Kick", "Snare", "HiHat", "Bass", "Lead"],
      datasets: [{
        label: "Volume",
        data: [12, 19, 7, 15, 10]
      }]
    },
    options: {
      responsive: true
    }
  });
});
