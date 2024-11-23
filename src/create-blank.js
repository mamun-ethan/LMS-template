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
  <h1 class="font-medium ml-2 text-2xl relative text-start py-5">
    <span class="text-primary text-2xl">
      <i class="fa-regular fa-square-check"></i>
    </span>
    ${quizContainer.children.length + 1}.
    <span class="font-normal text-lg text-start py-5">
      ${questionText}
    </span>
    <a
      href="./edit-blank.html"
      class="capitalize text-xs absolute right-[5%] px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold"
    >
      edit
    </a>
  </h1>
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
