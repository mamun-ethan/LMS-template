// course filtler
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

// skills filter
document.addEventListener("DOMContentLoaded", (event) => {
  filterSkills("skill-web-development");
});

function filterSkills(category) {
  const skillMenuButtons = document.querySelectorAll(".skill-menu-btn");
  skillMenuButtons.forEach((button) => button.classList.remove("skill-active"));

  const skillActiveButton = document.getElementById(`${category}-btn`);
  skillActiveButton.classList.add("skill-active");

  const skills = document.querySelectorAll(".skill-course-box");
  skills.forEach((course) => (course.style.display = "none"));

  const selectedSkills = document.querySelectorAll(`.${category}`);
  selectedSkills.forEach((course) => (course.style.display = "block"));
}

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

//hero section

const contentSlides = document.querySelectorAll(".content-slide");
const imageSlides = document.querySelectorAll(".image-slide");

let currentIndex = 0;

function updateSlider(index) {
  // Hide all slides
  contentSlides.forEach((slide) => slide.classList.add("hidden"));
  imageSlides.forEach((slide) => slide.classList.add("hidden"));

  // Show the current slide
  contentSlides[index].classList.remove("hidden");
  imageSlides[index].classList.remove("hidden");
}

function autoSlide() {
  currentIndex = (currentIndex + 1) % contentSlides.length;
  updateSlider(currentIndex);
}

// Start auto-sliding every 3 seconds
setInterval(autoSlide, 3000);

// Initialize slider
updateSlider(currentIndex);
