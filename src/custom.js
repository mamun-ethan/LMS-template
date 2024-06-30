// course filter

document.addEventListener("DOMContentLoaded", (event) => {
  filterCourses("web-development");
});

function filterCourses(category) {
  const menuButtons = document.querySelectorAll(".menu-btn");
  menuButtons.forEach((button) => button.classList.remove("active"));

  const activeButton = document.getElementById(`${category}-btn`);
  activeButton.classList.add("active");

  const courses = document.querySelectorAll(".course-box");
  courses.forEach((course) => (course.style.display = "none"));

  const selectedCourses = document.querySelectorAll(`.${category}`);
  selectedCourses.forEach((course) => (course.style.display = "block"));
}

// navbar

// // Get the dropdown toggle button and dropdown menu
// const dropdownToggle = document.getElementById("dropdownToggle");
// const dropdownMenu = document.getElementById("dropdownMenu");

// // Function to toggle the dropdown menu
// function toggleDropdown() {
//   const isOpen = dropdownMenu.classList.contains("hidden");
//   dropdownMenu.classList.toggle("hidden", !isOpen);
//   dropdownToggle.setAttribute("aria-expanded", !isOpen);
// }

// // Close the dropdown menu when clicking outside of it
// document.addEventListener("click", function (event) {
//   const isClickInside =
//     dropdownToggle.contains(event.target) ||
//     dropdownMenu.contains(event.target);
//   if (!isClickInside) {
//     dropdownMenu.classList.add("hidden");
//     dropdownToggle.setAttribute("aria-expanded", "false");
//   }
// });

// // Toggle the dropdown menu on button click
// dropdownToggle.addEventListener("click", function (event) {
//   event.stopPropagation(); // Prevent closing when clicking inside the dropdown
//   toggleDropdown();
// });

// Get elements
const navbarToggle = document.getElementById("navbar-toggle");
const navbarDropdown = document.getElementById("navbar-dropdown");
const dropdownToggle = document.getElementById("dropdownToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

// Function to toggle mobile menu
function toggleMobileMenu() {
  const isOpen = navbarDropdown.classList.contains("hidden");
  navbarDropdown.classList.toggle("hidden", !isOpen);
  navbarToggle.setAttribute("aria-expanded", !isOpen);
}

// Function to toggle dropdown menu
function toggleDropdown() {
  const isOpen = dropdownMenu.classList.contains("hidden");
  dropdownMenu.classList.toggle("hidden", !isOpen);
  dropdownToggle.setAttribute("aria-expanded", !isOpen);
}

// Close menus when clicking outside
document.addEventListener("click", function (event) {
  const isClickInsideNavbar =
    navbarToggle.contains(event.target) ||
    navbarDropdown.contains(event.target);
  const isClickInsideDropdown =
    dropdownToggle.contains(event.target) ||
    dropdownMenu.contains(event.target);

  if (!isClickInsideNavbar) {
    navbarDropdown.classList.add("hidden");
    navbarToggle.setAttribute("aria-expanded", "false");
  }

  if (!isClickInsideDropdown) {
    dropdownMenu.classList.add("hidden");
    dropdownToggle.setAttribute("aria-expanded", "false");
  }
});

// Toggle mobile menu on button click
navbarToggle.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevent closing when clicking inside the mobile menu
  toggleMobileMenu();
});

// Toggle dropdown menu on button click
dropdownToggle.addEventListener("click", function (event) {
  event.stopPropagation(); // Prevent closing when clicking inside the dropdown
  toggleDropdown();
});
