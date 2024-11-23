// submiting modal by entering data

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
  <h1 class="font-medium text-2xl ml-5 relative text-start py-5">
    <span class="text-primary text-2xl">
      <i class="fa-regular fa-square-check"></i>
    </span>
    ${quizContainer.children.length + 1}.
    <span class="font-normal text-lg text-start py-5">
      ${questionText}
    </span>
    <a
      href="./edit-multiple.html"
      class="capitalize text-xs absolute right-[5%] px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold"
    >
      edit
    </a>
  </h1>
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

  // Clear the modal content and close it
  quizSectionsContainer.innerHTML = ""; // Clear modal content
  modal.classList.add("hidden"); // Hide the modal
});
