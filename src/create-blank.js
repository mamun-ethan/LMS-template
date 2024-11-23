// Global variables to track the editing state
let isEditing = false;
let currentEditingElement = null;

// Event listener for the "Save" button in the modal
document.querySelector(".blank-btn").addEventListener("click", function () {
  const modal = document.getElementById("blankModal");
  const quizSectionsContainer = modal.querySelector(".quiz-sections-container");
  const quizSections = quizSectionsContainer.querySelectorAll(".quiz-section");

  const quizContainer = document.getElementById("quizContainer"); // Get the quiz container

  quizSections.forEach((section, index) => {
    const questionText = section.querySelector(".title input").value.trim();

    // Skip if question text is empty
    if (!questionText) {
      alert(`Question ${index + 1} cannot be empty!`);
      return;
    }

    const answers = [];
    const answerInputs = section.querySelectorAll(
      ".answare input[type='text']"
    );

    answerInputs.forEach((input) => {
      const answerText = input.value.trim();
      if (answerText) {
        answers.push(answerText); // Collect non-empty answers
      }
    });

    // Create the new quiz item dynamically
    const newQuizItemHTML = `
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
    <a
      href="#"
      class="capitalize edit-btn text-xs px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold"
    >
      edit
    </a>
    <a
  class="capitalize delete-btn text-xs px-3 py-1.5 text-red-600 rounded-lg bg-red-300 font-semibold cursor-pointer"
>
  delete
</a>

  </div>
</div>

  <div class="p-4 rounded-lg mb-4">
    <textarea
      class="w-full border-b border-gray-400 focus:border-primary outline-none resize-none"
      rows="1"
      placeholder="Type your answer here..."
    >${answers[0] || ""}</textarea>
  </div>
`;

    // Append the new quiz item to the quiz container
    const newQuizElement = document.createElement("div");
    newQuizElement.innerHTML = newQuizItemHTML;

    // Add edit and delete button functionality
    newQuizElement
      .querySelector(".edit-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        openEditModal(newQuizElement, questionText, answers);
      });

    newQuizElement
      .querySelector(".delete-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        newQuizElement.remove();
      });

    quizContainer.appendChild(newQuizElement);
  });

  // Clear only the input data in the modal
  quizSections.forEach((section) => {
    const questionInput = section.querySelector(".title input");
    const answerInputs = section.querySelectorAll(
      ".answare input[type='text']"
    );

    // Clear the question input
    if (questionInput) questionInput.value = "";

    // Clear the answer inputs
    answerInputs.forEach((input) => {
      input.value = "";
    });
  });

  // Hide the modal
  modal.classList.add("hidden");
});

// Open the Edit Modal with Pre-filled Data
function openEditModal(quizElement, question, answers) {
  const modal = document.getElementById("blankModal");
  modal.classList.remove("hidden");

  // Set current editing element
  isEditing = true;
  currentEditingElement = quizElement;

  // Populate the modal with the question and answers
  const questionInput = modal.querySelector(".title input");
  const answerInputs = modal.querySelectorAll(".answare input[type='text']");

  questionInput.value = question;
  answerInputs[0].value = answers[0] || "";
  answerInputs[1].value = answers[1] || "";
}

// Save Changes in the Edit Modal
document.getElementById("saveEditModal").addEventListener("click", function () {
  if (!isEditing || !currentEditingElement) return;

  const modal = document.getElementById("blankModal");
  const questionInput = modal.querySelector(".title input").value.trim();
  const answerInputs = modal.querySelectorAll(".answare input[type='text']");
  const updatedAnswers = Array.from(answerInputs).map((input) =>
    input.value.trim()
  );

  if (!questionInput) {
    alert("Question cannot be empty!");
    return;
  }

  // Update the quiz item
  const titleElement = currentEditingElement.querySelector(
    "h1 span:nth-child(3)"
  );
  titleElement.textContent = questionInput;

  const answerTextarea = currentEditingElement.querySelector("textarea");
  answerTextarea.value = updatedAnswers[0] || "";

  // Close modal
  modal.classList.add("hidden");
  isEditing = false;
  currentEditingElement = null;
});

// Event listener for the cancel button
document
  .getElementById("cancelBlankModal-edit")
  .addEventListener("click", function () {
    const modal = document.getElementById("blankModal");
    modal.classList.add("hidden");
    isEditing = false;
    currentEditingElement = null;
  });
