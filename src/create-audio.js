// modal form submiting to append quiz item
let totalQuizItems = 0; // Initialize the counter to track the number of quiz items

document.querySelector(".btn-audio").addEventListener("click", function () {
  // Get all quiz sections
  const quizSections = document.querySelectorAll(".quizz-section-audio");
  const quizData = [];

  quizSections.forEach((section) => {
    const questionNumber = totalQuizItems + 1; // Calculate question number

    // Get the audio link
    const audioInput = section.querySelector(
      'input[placeholder="Enter Audio Link"]'
    );
    const audioLink = audioInput.value.trim();

    // Get the question text
    const questionInput = section.querySelector(
      'input[placeholder="Enter the question"]'
    );
    const questionText = questionInput.value.trim();

    // Get all answers and checkboxes
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

    // Get the pause limit
    const pauseLimit = section.querySelector("select#pause").value;

    // Validate and store the data
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

  // Check if there are valid quiz data
  if (quizData.length > 0) {
    console.log("Quiz Data:", quizData);

    // Create HTML for the new quiz item and inject it into #quizContainer
    const quizContainer = document.getElementById("quizContainer");

    // Increment the total quiz counter
    totalQuizItems++;

    // Generate the markup for the new quiz item
    const quizItemHTML = `
    <div class="quiz-item">
      <h1 class="font-medium ml-2 text-2xl relative text-start py-5">
        <span class="text-primary text-2xl">
          <i class="fa-regular fa-square-check"></i>
        </span>
        ${totalQuizItems}.
        <span class="font-normal text-lg text-start py-5">${
          quizData[0].questionText
        }</span>
        <a href="edit-audio.html" class="capitalize text-xs absolute right-[5%] px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold">edit</a>
      </h1>
      <div class="p-4 ml-2 flex justify-start overflow-hidden">
        <audio controls>
          <source src="${quizData[0].audioLink}" type="audio/ogg" />
        </audio>
      </div>
      <div class="grid grid-cols-1 px-2 md:grid-cols-2 gap-2">
        ${quizData[0].answers
          .map(
            (answer) => `
          <label class="flex items-center p-4 bg-gray-100 rounded-lg mb-4 cursor-pointer">
            <input type="radio" name="question${totalQuizItems}" class="peer w-4 h-4 cursor-pointer" ${
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

    // Append the new quiz item to the quiz container
    quizContainer.insertAdjacentHTML("beforeend", quizItemHTML);

    // Optional: Scroll to the newly added quiz item
    quizContainer.scrollTop = quizContainer.scrollHeight;

    // Close the modal
    const modal = document.getElementById("audioModal");
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
