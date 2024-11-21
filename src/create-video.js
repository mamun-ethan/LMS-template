// Select the buttons and the container where the quiz sections are added
const addQuizBtn = document.getElementById("add-quiz-btn-video");
const substractQuizBtn = document.getElementById("substract-quiz-btn-video");
const quizSectionsContainer = document.getElementById(
  "quiz-sections-container-video"
);

// Function to update the counters for all quiz sections
function updateCounters() {
  const quizSections = quizSectionsContainer.querySelectorAll(".quizz-section");
  quizSections.forEach((section, index) => {
    const counterElement = section.querySelector(".counter");
    counterElement.textContent = `${index + 1}.`; // Update the counter to reflect the section number
  });
}

// Function to add a new quiz section
function addQuizSection() {
  const newQuizSection = document.createElement("div");
  newQuizSection.classList.add("quizz-section", "mb-14");

  // Here you can clone the structure of your existing quiz section, with a new counter
  newQuizSection.innerHTML = `
    <h1 class="counter capitalize text-4xl text-start font-semibold"></h1>
    <div class="title">
      <h6 class="py-5 capitalize font-bold text-xl">upload the video</h6>
      <form action="">
        <input class="w-[50%] text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent" type="file" accept="video/*" />
      </form>
      <div class="title">
        <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
        <input class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent" type="text" placeholder="Enter the question" />
      </div>
    </div>
    <div class="answare md:mt-8">
      <div>
        <h6 class="py-5 capitalize font-bold text-xl">enter your answare</h6>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <h6 class="py-5 capitalize font-bold text-xl">1.</h6>
            <div class="flex justify-around gap-2 items-end">
              <input class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent" type="text" placeholder="answare" />
              <input type="checkbox" class="checkbox checkbox-primary" />
            </div>
          </div>
          <div>
            <h6 class="py-5 capitalize font-bold text-xl">2.</h6>
            <div class="flex justify-between gap-4 items-end">
              <input class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent" type="text" placeholder="answare" />
              <input type="checkbox" class="checkbox checkbox-primary" />
            </div>
          </div>
          <div>
            <h6 class="py-5 capitalize font-bold text-xl">3.</h6>
            <div class="flex justify-around gap-2 items-end">
              <input class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent" type="text" placeholder="answare" />
              <input type="checkbox" class="checkbox checkbox-primary" />
            </div>
          </div>
          <div>
            <h6 class="py-5 capitalize font-bold text-xl">4.</h6>
            <div class="flex justify-around gap-2 items-end">
              <input class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent" type="text" placeholder="answare" />
              <input type="checkbox" class="checkbox checkbox-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append the new quiz section to the container
  quizSectionsContainer.appendChild(newQuizSection);

  // Update counters
  updateCounters();
}

// Function to remove the last quiz section, ensuring the first one is never removed
function removeQuizSection() {
  const quizSections = quizSectionsContainer.querySelectorAll(".quizz-section");

  // Remove the last section if there are more than 1 section
  if (quizSections.length > 1) {
    quizSectionsContainer.removeChild(quizSections[quizSections.length - 1]);
    updateCounters();
  }
}

// Add event listeners to the buttons
addQuizBtn.addEventListener("click", addQuizSection);
substractQuizBtn.addEventListener("click", removeQuizSection);

// Initialize counters on page load
updateCounters();
