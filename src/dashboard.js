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

// Select all dropdown buttons and menus
const dropdownBtns = document.querySelectorAll(".dropdown_btn");
const dropdownMenus = document.querySelectorAll(".dropdown_menu");

// Add event listeners to each dropdown button
dropdownBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    console.log("Hello");
    dropdownMenus[index].classList.toggle("hidden");
  });
});
