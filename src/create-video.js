// Initialize the quiz counter
var quizCounter = 0;

// Modal form submitting for video quizzes
document.querySelector(".btn-video").addEventListener("click", function () {
  const modal = document.getElementById("videoModal");
  const videoLink = modal.querySelector("input[type='text']").value.trim(); // Get video link
  const questionText = modal
    .querySelectorAll("input[type='text']")[1]
    .value.trim(); // Get question text

  // Validate the inputs
  if (!videoLink || !questionText) {
    alert("Video link and question text are required.");
    return;
  }

  const answers = [];
  const answerInputs = modal.querySelectorAll(".answare input[type='text']");
  const checkboxes = modal.querySelectorAll(".answare input[type='checkbox']");

  answerInputs.forEach((input, i) => {
    const answerText = input.value.trim();
    const isCorrect = checkboxes[i].checked;
    if (answerText) {
      answers.push({ text: answerText, correct: isCorrect });
    }
  });

  if (answers.length === 0) {
    alert("Please enter at least one answer.");
    return;
  }

  const pauseLimit = modal.querySelector("#pause").value;

  quizCounter++;

  // Create the new question HTML structure
  const newQuestion = document.createElement("div");
  newQuestion.classList.add(
    "bg-white",
    "rounded-lg",
    "shadow-lg",
    "p-5",
    "mb-6"
  );
  newQuestion.innerHTML = `
 <div class="flex justify-between items-center">
   <h1 class="font-medium text-2xl relative text-start py-5">
     <span class="text-primary text-2xl">
       <i class="fa-regular fa-square-check"></i>
     </span>
     ${quizCounter}.
     <span class="font-normal text-lg text-start py-5">${questionText}</span>
   </h1>
   <div class="flex gap-5"> 
     <a class="capitalize edit-btn-video  cursor-pointer text-xs  px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold">
       edit
     </a>
     <a class="capitalize delete-btn-video text-xs px-3 py-1.5 cursor-pointer text-red-600 rounded-lg bg-red-300 font-semibold">
       delete
     </a>
   </div>
 </div>
 <video class="w-96 rounded-lg my-4" controls>
   <source src="${videoLink}" type="video/mp4" />
 </video>
 <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
   ${answers
     .map(
       (answer, idx) => `
     <label class="flex items-center p-4 bg-gray-100 rounded-lg mb-4 cursor-pointer">
       <input type="radio" name="question${quizCounter}" class="peer w-4 h-4 cursor-pointer" ${
         answer.correct ? "checked" : ""
       } />
       <span class="ml-2 text-sm font-medium text-gray-900">${
         answer.text
       }</span>
     </label>
   `
     )
     .join("")}
 </div>
`;

  // Append the new question to the quiz container
  const quizContainer = document.getElementById("quizContainer");
  quizContainer.appendChild(newQuestion);

  // Close the modal
  modal.classList.add("hidden");

  // Optionally clear the form inputs
  modal.querySelector("input[type='text']").value = "";
  modal.querySelectorAll("input[type='text']")[1].value = "";
  modal
    .querySelectorAll(".answare input[type='text']")
    .forEach((input) => (input.value = ""));
  modal
    .querySelectorAll(".answare input[type='checkbox']")
    .forEach((checkbox) => (checkbox.checked = false));
});

// Add event listeners for the edit buttons
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn-video")) {
    const quizItem = e.target.closest(".bg-white");
    const videoLink = quizItem.querySelector("video source").src;
    const questionText = quizItem
      .querySelector("h1 span.font-normal")
      .textContent.trim();
    const answers = [
      ...quizItem.querySelectorAll(".grid input[type='radio']"),
    ].map((input) => ({
      text: input.nextElementSibling.textContent.trim(),
      correct: input.checked,
    }));

    // Populate the edit modal with the current quiz data
    const editModal = document.getElementById("videoModal-edit");
    const inputVideoLink = editModal.querySelector("input[type='text']");
    const inputQuestionText =
      editModal.querySelectorAll("input[type='text']")[1];
    const answerInputs = editModal.querySelectorAll(
      ".answare input[type='text']"
    );
    const checkboxes = editModal.querySelectorAll(
      ".answare input[type='checkbox']"
    );

    inputVideoLink.value = videoLink;
    inputQuestionText.value = questionText;

    answerInputs.forEach((input, i) => {
      input.value = answers[i].text;
      checkboxes[i].checked = answers[i].correct;
    });

    // Show the edit modal
    editModal.classList.remove("hidden");

    // Mark the quiz item as editing
    quizItem.classList.add("editing");
  }

  // Delete button functionality
  if (e.target.classList.contains("delete-btn-video")) {
    const quizItem = e.target.closest(".bg-white");
    quizItem.remove(); // Delete the quiz item
  }

  // Add event listener to close the modal when clicking outside or on the close icon
  if (
    e.target === document.getElementById("videoModal-edit") ||
    e.target.id === "closeModalEdit"
  ) {
    console.log("Hi");
    document.getElementById("videoModal-edit").classList.add("hidden");
  }
});
const closeEditModal = document.getElementById("cancelVideoModal-edit");
closeEditModal.addEventListener("click", () => {
  console.log("hi");
  document.getElementById("videoModal-edit").classList.add("hidden");
});

// Handle the update button in the edit modal
document
  .querySelector(".btn-video-edit")
  .addEventListener("click", function () {
    const modal = document.getElementById("videoModal-edit");
    const videoLink = modal.querySelector("input[type='text']").value.trim();
    const questionText = modal
      .querySelectorAll("input[type='text']")[1]
      .value.trim();

    // Validate the inputs
    if (!videoLink || !questionText) {
      alert("Video link and question text are required.");
      return;
    }

    const answers = [];
    const answerInputs = modal.querySelectorAll(".answare input[type='text']");
    const checkboxes = modal.querySelectorAll(
      ".answare input[type='checkbox']"
    );

    answerInputs.forEach((input, i) => {
      const answerText = input.value.trim();
      const isCorrect = checkboxes[i].checked;
      if (answerText) {
        answers.push({ text: answerText, correct: isCorrect });
      }
    });

    if (answers.length === 0) {
      alert("Please enter at least one answer.");
      return;
    }

    // Update the quiz item
    const quizItem = document.querySelector(".bg-white.editing"); // Identify the editing quiz
    quizItem.querySelector("video source").src = videoLink;
    quizItem.querySelector("h1 span.font-normal").textContent = questionText;

    // Update the answers
    const answerLabels = quizItem.querySelectorAll(".grid label");
    answerLabels.forEach((label, index) => {
      label.querySelector("span").textContent = answers[index].text;
      label.querySelector("input[type='radio']").checked =
        answers[index].correct;
    });

    // Close the modal
    modal.classList.add("hidden");

    // Remove the editing class from the quiz item
    quizItem.classList.remove("editing");
  });

// Close the modal if clicked outside of it
document.addEventListener("click", function (e) {
  const modal = document.getElementById("videoModal-edit");
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
