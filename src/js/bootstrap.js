// Juste pour confirmer que le fichier est bien chargé
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-bootstrap-test");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("Bootstrap + Bootstrap Icons fonctionnent ✅");
    });
  }
});
