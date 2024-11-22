document
  .getElementById("add-quiz-btn-image")
  .addEventListener("click", function () {
    const quizContainer = document.getElementById(
      "quiz-sections-container-image"
    );

    // Calculate the section number based on existing sections
    const sectionNumber = quizContainer.children.length + 1;

    // HTML structure for a new quiz section with dynamic section number
    const newQuizSection = `
    <div class="quizz-section-image mb-14">
      <h1 class="capitalize text-4xl text-start font-semibold">${sectionNumber}.</h1>
      <div class="title">
        <h6 class="py-5 capitalize font-bold text-xl">Upload the image</h6>
        <form>
          <input
            class="w-[50%] text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
            type="file"
            accept="image/*"
          />
        </form>
        <div class="title">
          <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
          <input
            class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
            type="text"
            placeholder="Enter the question"
          />
        </div>
      </div>
      <div class="answare md:mt-8">
        <div>
          <h6 class="py-5 capitalize font-bold text-xl">Enter your answer</h6>
          <div class="grid grid-cols-2 border-2 rounded-lg p-2 gap-4">
            ${[1, 2, 3, 4]
              .map(
                (num) => `
              <div>
                <h6 class="py-5 capitalize font-bold text-xl">${num}.</h6>
                <div class="flex justify-around gap-2 items-end">
                  <input
                    class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                    type="text"
                    placeholder="Answer"
                  />
                  <input
                    type="checkbox"
                    class="checkbox checkbox-primary"
                  />
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  `;

    // Add the new quiz section to the container
    quizContainer.insertAdjacentHTML("beforeend", newQuizSection);
  });

document
  .getElementById("substract-quiz-btn-image")
  .addEventListener("click", function () {
    const quizContainer = document.getElementById(
      "quiz-sections-container-image"
    );

    // Check if there's at least one section to remove
    if (quizContainer.children.length > 0) {
      // Remove the last quiz section
      quizContainer.removeChild(quizContainer.lastElementChild);
    }
  });

// adding new quiz item by submiting modal form

// Initialize the counter
let quizCounter = 0;

document.querySelector(".btn-image").addEventListener("click", function () {
  // Get all quiz sections
  const quizSections = document.querySelectorAll(".quizz-section-image");
  const quizData = [];

  quizSections.forEach((section, index) => {
    const questionNumber = quizCounter + index + 1; // Adjust the question number based on counter

    // Get the uploaded image
    const imageInput = section.querySelector('input[type="file"]');
    const imageFile = imageInput.files[0];
    const imageURL = imageFile ? URL.createObjectURL(imageFile) : null;

    // Get the question text
    const questionInput = section.querySelector(
      'input[placeholder="Enter the question "]'
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

    // Validate and store the data
    if (questionText && answers.length > 0) {
      quizData.push({
        questionNumber,
        imageURL,
        questionText,
        answers,
      });
    }
  });

  // Append data dynamically
  if (quizData.length > 0) {
    const quizContainer = document.getElementById("quizContainer");

    quizData.forEach((quiz) => {
      const quizHTML = `
              <div class="quiz-item my-8">
                <h1 class="font-medium text-2xl relative text-start py-5">
                  <span class="text-primary text-2xl"><i class="fa-regular fa-square-check"></i></span>
                  ${quiz.questionNumber}.
                  <span class="font-normal text-lg text-start py-5">${
                    quiz.questionText
                  }</span>
                  <a
                    href="edit-image.html"
                    class="capitalize text-xs absolute right-[5%] px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold"
                  >edit</a>
                </h1>
                ${
                  quiz.imageURL
                    ? `<img src="${quiz.imageURL}" class="w-[30%] md:w-[20%] py-5" alt="Uploaded Image"/>`
                    : ""
                }
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  ${quiz.answers
                    .map(
                      (answer, idx) => `
                    <label class="flex items-center p-4 bg-gray-100 rounded-lg mb-4 cursor-pointer">
                      <input
                        type="radio"
                        name="question${quiz.questionNumber}"
                        ${answer.isCorrect ? "checked" : ""}
                        class="peer w-4 h-4 cursor-pointer"
                      />
                      <span class="ml-2 text-sm font-medium text-gray-900">${
                        answer.text
                      }</span>
                    </label>`
                    )
                    .join("")}
                </div>
              </div>
            `;
      // Append the new quiz item
      quizContainer.insertAdjacentHTML("beforeend", quizHTML);
    });

    // Update the counter
    quizCounter += quizData.length;

    // Close the modal
    const modal = document.getElementById("imageModal");
    modal.classList.add("hidden");
  } else {
    console.error("Please fill out all required fields.");
  }
});

// Cancel button to close the modal without saving
document
  .getElementById("cancelImageModal")
  .addEventListener("click", function () {
    const modal = document.getElementById("imageModal");
    modal.classList.add("hidden");
  });
