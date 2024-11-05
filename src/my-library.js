document
  .getElementById("dropdownButton")
  .addEventListener("click", function () {
    var dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.classList.contains("hidden")) {
      dropdownMenu.classList.remove("hidden");
    } else {
      dropdownMenu.classList.add("hidden");
    }
  });

document
  .getElementById("dropdownOptions")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      const dataValue = event.target.getAttribute("data-value");
      document.getElementById("dropdownSpan").textContent = dataValue;
      document.getElementById("dropdownMenu").classList.add("hidden");
    }
  });

document.addEventListener("click", function (event) {
  var isClickInside =
    document.getElementById("dropdownButton").contains(event.target) ||
    document.getElementById("dropdownMenu").contains(event.target);
  var dropdownMenu = document.getElementById("dropdownMenu");

  if (!isClickInside) {
    dropdownMenu.classList.add("hidden");
  }
});

// dropdown
function toggleDropdown(menuId) {
  const dropdown = document.getElementById(menuId);
  dropdown.classList.toggle("hidden");
}

// Close dropdowns if clicking outside
document.addEventListener("click", (event) => {
  const buttons = ["menu-button-1", "menu-button-2"];
  const dropdowns = ["dropdown-menu-1", "dropdown-menu-2"];

  if (
    !buttons.some((id) => document.getElementById(id).contains(event.target)) &&
    !dropdowns.some((id) => document.getElementById(id).contains(event.target))
  ) {
    dropdowns.forEach((id) =>
      document.getElementById(id).classList.add("hidden")
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Select all dropdown buttons and add event listeners to each
  const dropdownButtons = document.querySelectorAll(".dropdownMenuIconButton");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Find the closest dropdown menu for this button
      const dropdownMenu = button.nextElementSibling;

      // Toggle the dropdown menu for this specific button
      if (dropdownMenu) {
        dropdownMenu.classList.toggle("hidden");
      }
    });
  });
});
// Get elements
const categorySelect = document.getElementById("category");
const courseSelect = document.getElementById("course");
const lessonSelect = document.getElementById("lesson");
const saveBtn = document.getElementById("saveBtn");
// Select all instances of the checkbox button
const checkboxButtons = document.querySelectorAll(".checkbox");

// Show course select when category is chosen
categorySelect.addEventListener("change", function () {
  if (
    categorySelect.value === "course1" ||
    categorySelect.value === "course2"
  ) {
    courseSelect.classList.remove("hidden");
  } else {
    courseSelect.classList.add("hidden");
    lessonSelect.classList.add("hidden");
    saveBtn.classList.add("hidden");
    checkboxButtons.forEach((btn) => btn.classList.add("hidden"));
  }
});

// Show lesson select when course is chosen
courseSelect.addEventListener("change", function () {
  if (courseSelect.value === "lesson1" || courseSelect.value === "lesson2") {
    lessonSelect.classList.remove("hidden");
  } else {
    lessonSelect.classList.add("hidden");
    saveBtn.classList.add("hidden");
    checkboxButtons.forEach((btn) => btn.classList.add("hidden"));
  }
});

// Show save and all checkbox buttons when lesson is chosen
lessonSelect.addEventListener("change", function () {
  if (
    lessonSelect.value === "homework" ||
    lessonSelect.value === "assignment"
  ) {
    saveBtn.classList.remove("hidden");
    checkboxButtons.forEach((btn) => btn.classList.remove("hidden"));
  } else {
    saveBtn.classList.add("hidden");
    checkboxButtons.forEach((btn) => btn.classList.add("hidden"));
  }
});
