function filterCourses(category) {
  // Hide all sections
  const sections = document.querySelectorAll(".course-section");
  sections.forEach((section) => section.classList.add("hidden"));

  // Remove active class from all buttons and reset styles
  const buttons = document.querySelectorAll(".menu-btn");
  buttons.forEach((button) =>
    button.classList.remove("font-bold", "text-black", "text-gray-400")
  );

  // Show the selected section and add active class to the corresponding button
  const selectedSection = document.querySelector(`.${category}`);
  if (selectedSection) {
    selectedSection.classList.remove("hidden");
  }

  const activeButton = document.querySelector(`#${category}-btn`);
  if (activeButton) {
    activeButton.classList.add("font-bold", "text-gray-400"); // Change text color to light gray when active
  }
}

// Show "Overview" section by default
document.addEventListener("DOMContentLoaded", () => {
  filterCourses("overview");
});

// faq
const accordionButtons = document.querySelectorAll(".accordion-toggle");
const accordionContents = document.querySelectorAll(".accordion-content");

// Add event listener to each accordion button
accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;

    // Toggle the active class on content for smooth opening/closing
    content.classList.toggle("active");

    // Close all other accordions (if desired, remove this part if you want to allow multiple open accordions)
    accordionContents.forEach((otherContent) => {
      if (otherContent !== content) {
        otherContent.classList.remove("active");
      }
    });
  });
});
