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
        <input
                          class="w-[50%] text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                          type="text"
                          placeholder="Enter video link"
                        />
      </form>
      <div class="title">
        <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
        <input class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent" type="text" placeholder="Enter the question" />
      </div>
    </div>
    <div class="answare md:mt-8">
      <div>
        <h6 class="py-5 capitalize font-bold text-xl">enter your answare</h6>
        <div class="grid grid-cols-2 border-2 rounded-lg p-2 gap-4">
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

// modal form submiting
document.querySelector(".btn-video").addEventListener("click", function () {
  // Get the modal and form inputs
  const modal = document.getElementById("videoModal");
  const videoLink = modal.querySelector("input[type='text']").value.trim(); // Get video link
  const questionText = modal
    .querySelectorAll("input[type='text']")[1]
    .value.trim(); // Get question text

  // Validate the inputs
  if (!videoLink || !questionText) {
    alert("Video link and question text are required.");
    return;
  }

  // Get the answers
  const answers = [];
  const answerInputs = modal.querySelectorAll(".answare input[type='text']");
  const checkboxes = modal.querySelectorAll(".answare input[type='checkbox']");

  answerInputs.forEach((input, i) => {
    const answerText = input.value.trim();
    const isCorrect = checkboxes[i].checked;
    if (answerText) {
      answers.push({ text: answerText, correct: isCorrect });
    }
  });

  if (answers.length === 0) {
    alert("Please enter at least one answer.");
    return;
  }

  // Get pause limit
  const pauseLimit = modal.querySelector("#pause").value;

  // Get the current number of quiz items already added
  const quizContainer = document.getElementById("quizContainer");
  const currentQuizCount = quizContainer.querySelectorAll(".bg-white").length; // Count existing quiz sections

  // Create the new question HTML structure
  const newQuestion = document.createElement("div");
  newQuestion.classList.add(
    "bg-white",
    "rounded-lg",
    "shadow-lg",
    "p-5",
    "mb-6"
  );

  newQuestion.innerHTML = `
<h1 class="font-medium text-2xl relative text-start py-5">
<span class="text-primary text-2xl">
<i class="fa-regular fa-square-check"></i>
</span>
${currentQuizCount + 1}.  <!-- Increment the quiz number -->
<span class="font-normal text-lg text-start py-5">${questionText}</span>
<a href="./edit-video.html" class="capitalize text-xs absolute right-[5%] px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold">edit</a>
</h1>
<video class="w-96 rounded-lg my-4" controls>
<source src="${videoLink}" type="video/mp4" />
</video>
<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
${answers
  .map(
    (answer, idx) => `
<label class="flex items-center p-4 bg-gray-100 rounded-lg mb-4 cursor-pointer">
  <input type="radio" name="question${
    currentQuizCount + 1
  }" class="peer w-4 h-4 cursor-pointer" ${answer.correct ? "checked" : ""} />
  <span class="ml-2 text-sm font-medium text-gray-900">${answer.text}</span>
</label>
`
  )
  .join("")}
</div>
`;

  // Append the new question to the quiz container
  quizContainer.appendChild(newQuestion);

  // Close the modal
  modal.classList.add("hidden");

  // Optionally clear the form inputs
  modal.querySelector("input[type='text']").value = "";
  modal.querySelectorAll("input[type='text']")[1].value = "";
  modal
    .querySelectorAll(".answare input[type='text']")
    .forEach((input) => (input.value = ""));
  modal
    .querySelectorAll(".answare input[type='checkbox']")
    .forEach((checkbox) => (checkbox.checked = false));
});
