// Initialize the counter
var quizCounter = 0;

document.querySelector(".btn-image").addEventListener("click", function () {
  // Get the modal and all quiz sections
  const modal = document.getElementById("imageModal");
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

              
               <div  class="flex  justify-between items-center">
                <h1 class="font-medium ml-2 text-2xl relative text-start py-5">
                  <span class="text-primary text-2xl"><i class="fa-regular fa-square-check"></i></span>
                  ${quiz.questionNumber}.
                  <span class="font-normal text-lg text-start py-5">${
                    quiz.questionText
                  }</span>
                 
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

                ${
                  quiz.imageURL
                    ? `<img src="${quiz.imageURL}" class="w-[30%] ml-2 md:w-[20%] py-5" alt="Uploaded Image"/>`
                    : ""
                }
                <div class="grid grid-cols-1 px-2 md:grid-cols-2 gap-2">
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

    // Clear only the input fields in the modal
    quizSections.forEach((section) => {
      const imageInput = section.querySelector('input[type="file"]');
      const questionInput = section.querySelector(
        'input[placeholder="Enter the question "]'
      );
      const answerInputs = section.querySelectorAll(
        '.answare input[type="text"]'
      );
      const checkboxes = section.querySelectorAll(
        '.answare input[type="checkbox"]'
      );

      // Reset the image input
      if (imageInput) imageInput.value = "";

      // Reset the question input
      if (questionInput) questionInput.value = "";

      // Reset the answer inputs
      answerInputs.forEach((input) => {
        input.value = "";
      });

      // Uncheck all checkboxes
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    });

    // Hide the modal without resetting its structure
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
