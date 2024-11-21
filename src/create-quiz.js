// Initialize the question counter
let questionCounter = 1;

// Get modal and buttons
const openModalButton = document.getElementById("openModal");
const modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancelBtn");

// Show modal on button click
openModalButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent any default action
  modal.classList.remove("hidden"); // Show modal
});

// Hide modal on cancel button click
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden"); // Hide modal
});

// Optional: Hide modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// Multiple choice form submitting
document.addEventListener("DOMContentLoaded", () => {
  // Get the "Add" button inside the modal
  const addButton = document.querySelector(".btn-primary");

  // Function to collect and log data when adding a quiz
  addButton.addEventListener("click", () => {
    const questionInput = document.querySelector(".title input").value;
    const answers = [];

    // Get all answer inputs and checkboxes
    const answerInputs = document.querySelectorAll(
      '.answare input[type="text"]'
    );
    const checkboxes = document.querySelectorAll(
      '.answare input[type="checkbox"]'
    );

    answerInputs.forEach((input, index) => {
      answers.push({
        answer: input.value,
        isCorrect: checkboxes[index].checked,
      });
    });

    // Create a new question section dynamically
    const newQuestionSection = document.createElement("div");
    newQuestionSection.classList.add("question-section", "my-5");

    // Add the question title with dynamic counter
    const questionTitle = document.createElement("h1");
    questionTitle.classList.add(
      "font-medium",
      "text-2xl",
      "relative",
      "text-start",
      "py-5",
      "ml-5"
    );
    questionTitle.innerHTML = `
      <span class="text-primary counter text-2xl">
        <i class="fa-regular fa-square-check"></i>
      </span>
      ${questionCounter}. 
      <span class="font-normal multiple-question-title text-lg text-start py-5">${questionInput}</span>
      <a href="./edit-multiple.html" class="capitalize text-xs absolute right-[5%] px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold">edit</a>
    `;

    // Create the answers section
    const answersSection = document.createElement("div");
    answersSection.classList.add(
      "grid",
      "answare",
      "grid-cols-1",
      "md:grid-cols-2",
      "gap-2",
      "mx-5"
    );

    answers.forEach((answer, index) => {
      const label = document.createElement("label");
      label.classList.add(
        "flex",
        "items-center",
        "p-4",
        "bg-gray-100",
        "rounded-lg",
        "mb-4",
        "cursor-pointer"
      );

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${new Date().getTime()}`; // Use a unique name for each question
      input.classList.add("peer", "w-4", "h-4", "cursor-pointer");
      if (answer.isCorrect) {
        input.checked = true; // Mark the correct answer as selected
      }

      const span = document.createElement("span");
      span.classList.add("ml-2", "text-sm", "font-medium", "text-gray-900");
      span.textContent = answer.answer;

      label.appendChild(input);
      label.appendChild(span);
      answersSection.appendChild(label);
    });

    // Append the question title and answers to the new question section
    newQuestionSection.appendChild(questionTitle);
    newQuestionSection.appendChild(answersSection);

    // Append the new question section to the container (e.g., #quizContainer)
    const quizContainer = document.getElementById("quizContainer");
    quizContainer.appendChild(newQuestionSection);

    // Close the modal after submission
    modal.classList.add("hidden");

    // Increment the question counter
    questionCounter++;
  });
});
