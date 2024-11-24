// Initialize the counter
var quizCounter = 0; // Same as in image modal

document.querySelector(".btn-audio").addEventListener("click", function () {
  const modal = document.getElementById("audioModal");
  const quizSections = document.querySelectorAll(".quizz-section-audio");
  const quizData = [];

  quizSections.forEach((section) => {
    const questionNumber = quizCounter + 1; // Adjust the question number based on counter

    const audioInput = section.querySelector(
      'input[placeholder="Enter Audio Link"]'
    );
    const audioLink = audioInput.value.trim();

    const questionInput = section.querySelector(
      'input[placeholder="Enter the question"]'
    );
    const questionText = questionInput.value.trim();

    const answers = [];
    const answerInputs = section.querySelectorAll(
      '.answare input[type="text"]'
    );
    const checkboxes = section.querySelectorAll(
      '.answare input[type="checkbox"]'
    );

    answerInputs.forEach((answerInput, idx) => {
      const answerText = answerInput.value.trim();
      const isCorrect = checkboxes[idx].checked;

      if (answerText) {
        answers.push({ text: answerText, isCorrect });
      }
    });

    const pauseLimit = section.querySelector("select#pause").value;

    if (audioLink && questionText && answers.length > 0) {
      quizData.push({
        questionNumber,
        audioLink,
        questionText,
        answers,
        pauseLimit,
      });
    }
  });

  if (quizData.length > 0) {
    const quizContainer = document.getElementById("quizContainer");

    quizData.forEach((quiz) => {
      const quizHTML = `
          <div class="quiz-item" data-question-number="${quiz.questionNumber}">
            <div class="flex justify-between items-center">
              <h1 class="font-medium ml-2 text-2xl relative text-start py-5">
                <span class="text-primary text-2xl">
                  <i class="fa-regular fa-square-check"></i>
                </span>
                ${quiz.questionNumber}.
                <span class="font-normal text-lg text-start py-5">
                  ${quiz.questionText}
                </span>
              </h1>

              <!-- Button Container with Flexbox for spacing -->
              <div class="flex gap-5"> 
                <a class="capitalize edit-btn-audio text-xs px-3 cursor-pointer py-1.5 text-white rounded-lg bg-blue-700 font-semibold">
                  edit
                </a>
                <a class="capitalize delete-btn-audio mr-3 text-xs px-3 cursor-pointer py-1.5 text-red-600 rounded-lg bg-red-300 font-semibold">
                  delete
                </a>
              </div>
            </div>

            <div class="p-4 ml-2 flex justify-start overflow-hidden">
              <audio controls>
                <source src="${quiz.audioLink}" type="audio/ogg" />
              </audio>
            </div>

            <div class="grid grid-cols-1 px-2 md:grid-cols-2 gap-2">
              ${quiz.answers
                .map(
                  (answer) => `
                    <label class="flex items-center p-4 bg-gray-100 rounded-lg mb-4 cursor-pointer">
                      <input type="radio" name="question${
                        quiz.questionNumber
                      }" class="peer w-4 h-4 cursor-pointer" ${
                    answer.isCorrect ? "checked" : ""
                  } />
                      <span class="ml-2 text-sm font-medium text-gray-900">${
                        answer.text
                      }</span>
                    </label>
                  `
                )
                .join("")}
            </div>
          </div>
        `;
      quizContainer.insertAdjacentHTML("beforeend", quizHTML);
    });

    // Update the counter
    quizCounter += quizData.length;

    // Hide the modal and clear input fields
    quizSections.forEach((section) => {
      section.querySelector('input[placeholder="Enter Audio Link"]').value = "";
      section.querySelector('input[placeholder="Enter the question"]').value =
        "";
      section
        .querySelectorAll('.answare input[type="text"]')
        .forEach((input) => (input.value = ""));
      section
        .querySelectorAll('.answare input[type="checkbox"]')
        .forEach((checkbox) => (checkbox.checked = false));
      section.querySelector("select#pause").value = ""; // Reset the select dropdown
    });

    modal.classList.add("hidden");
  } else {
    console.error("Please fill out all required fields before saving.");
  }
});

// Cancel button to close the modal without saving
document
  .getElementById("cancelAudioModal")
  .addEventListener("click", function () {
    const modal = document.getElementById("audioModal");
    modal.classList.add("hidden");
  });

// Handle edit button click
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-btn-audio")) {
    const quizItem = event.target.closest(".quiz-item");
    const questionNumber = quizItem.getAttribute("data-question-number");

    const audioLink = quizItem.querySelector("audio source").src;
    const questionText = quizItem.querySelector(
      "h1 span.font-normal"
    ).textContent;

    // Fill the edit modal with current quiz data
    const modal = document.getElementById("audioModal-edit");
    modal.querySelector('input[placeholder="Enter Audio Link"]').value =
      audioLink;
    modal.querySelector('input[placeholder="Enter the question"]').value =
      questionText;

    // Populate answers
    const answerInputs = modal.querySelectorAll('.answare input[type="text"]');
    const checkboxes = modal.querySelectorAll(
      '.answare input[type="checkbox"]'
    );
    const answers = quizItem.querySelectorAll(
      '.grid input[type="radio"]:checked'
    );

    answers.forEach((answer, idx) => {
      answerInputs[idx].value =
        answer.parentElement.querySelector("span").textContent;
      checkboxes[idx].checked = true;
    });

    modal.classList.remove("hidden");
  }
});

// Cancel edit modal
document
  .getElementById("cancelAudioModal-edit")
  .addEventListener("click", function () {
    const modal = document.getElementById("audioModal-edit");
    modal.classList.add("hidden");
  });

// Handle update button click in edit modal
document
  .querySelector(".btn-audio-edit")
  .addEventListener("click", function () {
    const modal = document.getElementById("audioModal-edit");

    const audioLink = modal
      .querySelector('input[placeholder="Enter Audio Link"]')
      .value.trim();
    const questionText = modal
      .querySelector('input[placeholder="Enter the question"]')
      .value.trim();

    const answers = [];
    const answerInputs = modal.querySelectorAll('.answare input[type="text"]');
    const checkboxes = modal.querySelectorAll(
      '.answare input[type="checkbox"]'
    );

    answerInputs.forEach((answerInput, idx) => {
      const answerText = answerInput.value.trim();
      const isCorrect = checkboxes[idx].checked;

      if (answerText) {
        answers.push({ text: answerText, isCorrect });
      }
    });

    if (audioLink && questionText && answers.length > 0) {
      // Update the quiz item
      const quizItem = document.querySelector(
        `.quiz-item[data-question-number="${questionNumber}"]`
      );
      quizItem.querySelector("audio source").src = audioLink;
      quizItem.querySelector("h1 span.font-normal").textContent = questionText;

      // Update answers
      const radioButtons = quizItem.querySelectorAll(
        '.grid input[type="radio"]'
      );
      radioButtons.forEach((radioButton, idx) => {
        radioButton.checked = checkboxes[idx].checked;
        radioButton.nextElementSibling.textContent = answerInputs[idx].value;
      });

      modal.classList.add("hidden");
    } else {
      console.error("Please fill out all required fields before updating.");
    }
  });

// Handle delete button click
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn-audio")) {
    const quizItem = event.target.closest(".quiz-item");
    quizItem.remove();
    quizCounter--; // Adjust the counter when an item is deleted
  }
});

// Close the edit modal when clicking outside of it
document.addEventListener("click", function (e) {
  const modal = document.getElementById("audioModal-edit");

  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
