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
        <div class="quiz-item">
          <h1 class="font-medium ml-2 text-2xl relative text-start py-5">
            <span class="text-primary text-2xl">
              <i class="fa-regular fa-square-check"></i>
            </span>
            ${quiz.questionNumber}.
            <span class="font-normal text-lg text-start py-5">${
              quiz.questionText
            }</span>
            <a href="edit-audio.html" class="capitalize text-xs absolute right-[5%] px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold">edit</a>
          </h1>
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

    // Hide the modal and clear input fields (same as in the image modal)
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
