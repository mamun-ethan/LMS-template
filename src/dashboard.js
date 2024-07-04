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

// dropdown menu
const drop_down_menu = document.getElementById("drop_down_menu");
const dropdown_btn = document
  .getElementById("user_drop_down")
  .addEventListener("click", () => {
    drop_down_menu.classList.toggle("hidden");
  });
