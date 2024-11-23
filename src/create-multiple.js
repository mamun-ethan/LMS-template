// Add quiz items from modal
document.querySelector(".btn").addEventListener("click", function () {
  const quizSectionsContainer = document.getElementById(
    "quiz-sections-container"
  );
  const quizSections = quizSectionsContainer.querySelectorAll(".quizz-section");
  const quizContainer = document.getElementById("quizContainer");
  const quineModal = document.getElementById("quineModal");

  quizSections.forEach((section) => {
    const questionText = section.querySelector(".title input").value;
    const answers = [];
    const checkboxes = section.querySelectorAll(".checkbox");
    const answerInputs = section.querySelectorAll(
      ".answare input[type='text']"
    );

    answerInputs.forEach((input, i) => {
      answers.push({
        answerText: input.value,
        isCorrect: checkboxes[i].checked,
      });
    });

    // Create the question HTML
    const questionHTML = `
            <div class="flex justify-between items-center">
              <h1 class="font-medium text-2xl ml-5 relative text-start py-5">
                <span class="text-primary text-2xl">
                  <i class="fa-regular fa-square-check"></i>
                </span>
                ${quizContainer.children.length + 1}.
                <span class="font-normal text-lg text-start py-5">
                  ${questionText}
                </span>
              </h1>
              <div class="flex gap-5">
                <a href="#edit" class="capitalize edit-btn text-xs px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold">edit</a>
                <a href="#delete" class="capitalize cursor-pointer delete-btn text-xs px-3 py-1.5 text-red-600 rounded-lg bg-red-300 font-semibold">delete</a>
              </div>
            </div>
            <div class="grid grid-cols-1 px-10 md:grid-cols-2 gap-2">
              ${answers
                .map(
                  (answer) => `
                <label class="flex items-center p-4 bg-gray-100 rounded-lg mb-4 cursor-pointer">
                  <input type="radio" name="question${
                    quizContainer.children.length + 1
                  }" class="peer w-4 h-4 cursor-pointer" ${
                    answer.isCorrect ? "checked" : ""
                  } />
                  <span class="ml-2 text-sm font-medium text-gray-900">${
                    answer.answerText
                  }</span>
                </label>
              `
                )
                .join("")}
            </div>
          `;

    const questionElement = document.createElement("div");
    questionElement.innerHTML = questionHTML;

    // Add edit and delete event listeners
    questionElement
      .querySelector(".edit-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        quineModal.classList.remove("hidden");
      });

    questionElement
      .querySelector(".delete-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        questionElement.remove();
      });

    quizContainer.appendChild(questionElement);
  });

  // Clear modal input fields after adding quiz item
  quizSections.forEach((section) => {
    const inputs = section.querySelectorAll("input[type='text']");
    const checkboxes = section.querySelectorAll(".checkbox");

    inputs.forEach((input) => {
      input.value = "";
    });

    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  });

  // Hide modal
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
});

// Close modal functionality
document
  .getElementById("cancelBtn-multiple")
  .addEventListener("click", function () {
    const quineModal = document.getElementById("quineModal");
    quineModal.classList.add("hidden");
  });

// Close modal when clicking outside it
window.addEventListener("click", function (event) {
  const quineModal = document.getElementById("quineModal");
  if (event.target === quineModal) {
    quineModal.classList.add("hidden");
  }
});

// Show modal on edit button click
document.querySelectorAll(".edit-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const quineModal = document.getElementById("quineModal");
    quineModal.classList.remove("hidden");
  });
});
