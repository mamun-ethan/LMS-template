// course filter

document.addEventListener("DOMContentLoaded", (event) => {
  filterCourses("web-development");
});

function filterCourses(category) {
  // Remove active class from all menu buttons
  const menuButtons = document.querySelectorAll(".menu-btn");
  menuButtons.forEach((button) => button.classList.remove("active"));

  // Add active class to the clicked menu button
  const activeButton = document.getElementById(`${category}-btn`);
  activeButton.classList.add("active");

  // Hide all courses
  const courses = document.querySelectorAll(".course-box");
  courses.forEach((course) => (course.style.display = "none"));

  // Show courses of the selected category
  const selectedCourses = document.querySelectorAll(`.${category}`);
  selectedCourses.forEach((course) => (course.style.display = "block"));
}
