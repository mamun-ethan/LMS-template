document.querySelectorAll(".add-quiz-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const quizContainer = this.closest(".content").querySelector(
      ".quiz-sections-container"
    );

    // Calculate the section number based on existing sections
    const sectionNumber = quizContainer.children.length + 1;

    // HTML structure for a new quiz section with dynamic section number
    const newQuizSection = `
      <div class="quiz-section mb-14">
        <h1 class="capitalize text-4xl text-start font-semibold">${sectionNumber}.</h1>
        <div class="title">
          <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
          <input
            class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
            type="text"
            placeholder="Enter the question"
          />
        </div>
        <div class="answare md:mt-8">
          <h6 class="py-5 capitalize font-bold text-xl">Enter your answer</h6>
          <div class="grid grid-cols-1 gap-4">
            <div class="flex justify-start gap-2 items-end">
              <input
                class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                type="text"
                placeholder="Answer"
              />
            </div>
          </div>
          <h6 class="py-5 mt-8 capitalize font-bold text-xl">Alternative answer</h6>
          <div class="grid grid-cols-1 gap-4">
            <div class="flex justify-start gap-2 items-end">
              <input
                class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                type="text"
                placeholder="Answer"
              />
            </div>
          </div>
        </div>
      </div>
    `;

    // Add the new quiz section to the container
    quizContainer.insertAdjacentHTML("beforeend", newQuizSection);
  });
});

document.querySelectorAll(".substract-quiz-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const quizContainer = this.closest(".content").querySelector(
      ".quiz-sections-container"
    );

    // Check if there's at least one section to remove
    if (quizContainer.children.length > 0) {
      // Remove the last quiz section
      quizContainer.removeChild(quizContainer.lastElementChild);
    }
  });
});

// submiting form

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

  // Log the collected data
  console.log("Quiz Data appended!");

  // Clear modal content and close the modal
  quizSectionsContainer.innerHTML = ""; // Reset modal content
  modal.classList.add("hidden"); // Hide the modal
});
