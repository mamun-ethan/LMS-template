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
  <div class="quiz-item my-8" data-question-number="${quiz.questionNumber}">
    <div class="flex justify-between items-center">
      <h1 class="font-medium ml-2 text-2xl relative text-start py-5">
        <span class="text-primary text-2xl"><i class="fa-regular fa-square-check"></i></span>
        ${quiz.questionNumber}.
        <span class="font-normal text-lg text-start py-5">${
          quiz.questionText
        }</span>
      </h1>
      <div class="flex gap-5"> 
        <a class="capitalize edit-btn text-xs px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold">edit</a>
        <a class="capitalize delete-btn text-xs px-3 py-1.5 text-red-600 rounded-lg bg-red-300 font-semibold">delete</a>
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
          <input type="radio" name="question${quiz.questionNumber}" ${
            answer.isCorrect ? "checked" : ""
          } class="peer w-4 h-4 cursor-pointer" />
          <span class="ml-2 text-sm font-medium text-gray-900">${
            answer.text
          }</span>
        </label>`
        )
        .join("")}
    </div>
  </div>`;

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

// Edit button functionality
document
  .getElementById("quizContainer")
  .addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("edit-btn")) {
      const quizItem = event.target.closest(".quiz-item");
      const questionNumber = quizItem.getAttribute("data-question-number");

      // Open the edit modal and pre-fill data
      const modal = document.getElementById("imageModal-update");
      const quizData = getQuizDataByQuestionNumber(questionNumber);

      if (quizData) {
        const { imageURL, questionText, answers } = quizData;

        // Set the modal data
        const imageInput = modal.querySelector('input[type="file"]');
        const questionInput = modal.querySelector(
          'input[placeholder="Enter the question "]'
        );
        const answerInputs = modal.querySelectorAll(
          '.answare input[type="text"]'
        );
        const checkboxes = modal.querySelectorAll(
          '.answare input[type="checkbox"]'
        );

        questionInput.value = questionText;

        // Set answers
        answers.forEach((answer, idx) => {
          answerInputs[idx].value = answer.text;
          checkboxes[idx].checked = answer.isCorrect;
        });

        // Set the image (if any)
        const imgElement = modal.querySelector("img");
        if (imgElement) {
          imgElement.src = imageURL;
        } else {
          // If no img element, show placeholder or handle accordingly
          console.warn("Image element not found in the modal.");
        }

        modal.classList.remove("hidden");
      }
    }
  });

// Delete button functionality
document
  .getElementById("quizContainer")
  .addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("delete-btn")) {
      const quizItem = event.target.closest(".quiz-item");
      quizItem.remove();
    }
  });

// Helper function to get quiz data by question number
function getQuizDataByQuestionNumber(questionNumber) {
  const quizItems = document.querySelectorAll(".quiz-item");
  for (let quizItem of quizItems) {
    if (quizItem.getAttribute("data-question-number") == questionNumber) {
      return {
        imageURL: quizItem.querySelector("img")
          ? quizItem.querySelector("img").src
          : null,
        questionText: quizItem.querySelector("h1 span.text-start").textContent,
        answers: Array.from(
          quizItem.querySelectorAll("input[type='radio']")
        ).map((input, idx) => {
          return {
            text: quizItem.querySelectorAll("span.text-sm")[idx].textContent,
            isCorrect: input.checked,
          };
        }),
      };
    }
  }
  return null;
}

// Update button functionality in the edit modal
document.querySelector(".update-btn").addEventListener("click", function () {
  const modal = document.getElementById("imageModal-update");
  const imageInput = modal.querySelector('input[type="file"]');
  const questionInput = modal.querySelector(
    'input[placeholder="Enter the question "]'
  );
  const answerInputs = modal.querySelectorAll('.answare input[type="text"]');
  const checkboxes = modal.querySelectorAll('.answare input[type="checkbox"]');

  const questionText = questionInput.value.trim();
  const answers = [];

  answerInputs.forEach((answerInput, idx) => {
    const answerText = answerInput.value.trim();
    const isCorrect = checkboxes[idx].checked;

    if (answerText) {
      answers.push({ text: answerText, isCorrect });
    }
  });

  if (questionText && answers.length > 0) {
    // Save the updated quiz data here
    const quizItem = document.querySelector(
      `.quiz-item[data-question-number="${quizCounter}"]`
    );
    if (quizItem) {
      quizItem.querySelector("span.text-start").textContent = questionText;
      answers.forEach((answer, idx) => {
        quizItem.querySelectorAll("span.text-sm")[idx].textContent =
          answer.text;
        quizItem.querySelectorAll("input[type='radio']")[idx].checked =
          answer.isCorrect;
      });

      // If image was updated
      if (imageInput.files[0]) {
        const imgElement = quizItem.querySelector("img");
        if (imgElement) {
          imgElement.src = URL.createObjectURL(imageInput.files[0]);
        }
      }
    }

    modal.classList.add("hidden");
  } else {
    console.error("Please fill out all required fields.");
  }
});
const cancel_image_modal_edit = document.getElementById(
  "cancelImageModal-update"
);
cancel_image_modal_edit.addEventListener("click", () => {
  const modal = document.getElementById("imageModal-update");
  modal.classList.add("hidden");
});
// Close modal by clicking outside
window.addEventListener("click", function (event) {
  const modal = document.getElementById("imageModal-update");
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});
