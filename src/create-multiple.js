document.querySelector(".btn").addEventListener("click", function () {
  const quizSectionsContainer = document.getElementById(
    "quiz-sections-container"
  );
  const quizSections = quizSectionsContainer.querySelectorAll(".quizz-section");
  const quizContainer = document.getElementById("quizContainer");
  const modal = document.getElementById("modal");

  quizSections.forEach((section, index) => {
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

    // Create the question section dynamically
    const questionHTML = `
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

  
  <div class="grid grid-cols-1 px-10 md:grid-cols-2 gap-2">
    ${answers
      .map(
        (answer, i) => `
        <label class="flex items-center p-4 bg-gray-100 rounded-lg mb-4 cursor-pointer">
          <input
            type="radio"
            name="question${quizContainer.children.length + 1}"
            class="peer w-4 h-4 cursor-pointer"
            ${answer.isCorrect ? "checked" : ""}
          />
          <span class="ml-2 text-sm font-medium text-gray-900">
            ${answer.answerText}
          </span>
        </label>
      `
      )
      .join("")}
  </div>
`;

    // Append the question to the quiz container
    const questionElement = document.createElement("div");
    questionElement.innerHTML = questionHTML;

    quizContainer.appendChild(questionElement);
  });

  // Clear the modal input fields but keep the structure
  quizSections.forEach((section) => {
    const inputs = section.querySelectorAll("input[type='text']");
    const checkboxes = section.querySelectorAll(".checkbox");

    // Clear text inputs
    inputs.forEach((input) => {
      input.value = "";
    });

    // Uncheck checkboxes
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  });

  // Hide the modal
  modal.classList.add("hidden");
});
