document.addEventListener("DOMContentLoaded", () => {
  // Tooltips Bootstrap pour tous les éléments qui ont data-bs-toggle="tooltip"
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll("[data-bs-toggle='tooltip']")
  );

  tooltipTriggerList.forEach(el => {
    // bootstrap vient de bootstrap.bundle.min.js (global)
    new bootstrap.Tooltip(el);
  });
});
