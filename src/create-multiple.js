document.getElementById("add-quiz-btn").addEventListener("click", function () {
  const quizContainer = document.getElementById("quiz-sections-container");

  // Calculate the section number based on existing sections
  const sectionNumber = quizContainer.children.length + 1;

  // HTML structure for a new quiz section with dynamic section number
  const newQuizSection = `
    <div class="quiz-section">
      <br /><br /><br /><br />
      <h1 class="capitalize text-4xl text-start font-semibold">${sectionNumber}</h1>
      <div class="title">
        <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
        <input
          class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 bg-transparent"
          type="text"
          placeholder="Enter the question"
        />
      </div>
      <div class="answare md:mt-8">
        <h6 class="py-5 capitalize font-bold text-xl">Enter your answer</h6>
        <div class="grid grid-cols-2 border-2 rounded-lg p-2 gap-4">
          ${Array(4)
            .fill(0)
            .map(
              (_, i) => `
                <div>
                  <h6 class="py-5 capitalize font-bold text-xl">${i + 1}.</h6>
                  <div class="flex justify-around gap-2 items-end">
                    <input
                      class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 bg-transparent"
                      type="text"
                      placeholder="Answer"
                    />
                    <input type="checkbox" class="checkbox checkbox-primary" />
                  </div>
                </div>`
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  // Add the new quiz section to the container
  quizContainer.insertAdjacentHTML("beforeend", newQuizSection);
});

document
  .getElementById("substract-quiz-btn")
  .addEventListener("click", function () {
    const quizContainer = document.getElementById("quiz-sections-container");

    // Check if there's at least one section to remove
    if (quizContainer.children.length > 0) {
      // Remove the last quiz section
      quizContainer.removeChild(quizContainer.lastElementChild);
    }
  });

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
