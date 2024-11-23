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
<div class="flex  justify-between items-center">
  <h1 class="font-medium text-2xl ml-5 relative text-start py-5">
    <span class="text-primary text-2xl">
      <i class="fa-regular fa-square-check"></i>
    </span>
    ${quizContainer.children.length + 1}.
    <span class="font-normal text-lg text-start py-5">
      ${questionText}
    </span>
  </h1>

  <!-- Button Container with Flexbox for spacing -->
  <div class="flex gap-5"> 
    <a
      href="./edit-multiple.html"
      class="capitalize edit-btn text-xs px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold"
    >
      edit
    </a>
    
    <a
      class="capitalize delete-btn text-xs px-3 py-1.5 text-red-600 rounded-lg bg-red-300 font-semibold"
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

  // Hide the modal without resetting its structure
  modal.classList.add("hidden");
});
