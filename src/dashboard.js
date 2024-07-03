// Toggle dropdown menu on button click

const toggle_btn = document.getElementById("toggle_btn");
const collapse_btn = document.getElementById("collapse_btn");

const sidebar = document.getElementById("logo-sidebar");

toggle_btn.addEventListener("click", function () {
  sidebar.classList.toggle("-translate-x-full");
});

collapse_btn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});
