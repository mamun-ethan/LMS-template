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

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown-menu");
  dropdown.classList.toggle("hidden");
}

// Close dropdown if clicking outside
document.addEventListener("click", (event) => {
  const button = document.getElementById("menu-button");
  const dropdown = document.getElementById("dropdown-menu");

  if (!button.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.add("hidden");
  }
});
