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

// threee dot icon to dropdown
document.addEventListener("DOMContentLoaded", function () {
  const dropdownButton = document.getElementById(
    "dropdownMenuIconHorizontalButton"
  );
  const dropdownMenu = document.getElementById("dropdownDotsHorizontal");

  dropdownButton.addEventListener("click", function () {
    dropdownMenu.classList.toggle("hidden");
  });
});
