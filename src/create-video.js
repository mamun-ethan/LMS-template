// Initialize the quiz counter
var quizCounter = 0;

// Modal form submitting for video quizzes
document.querySelector(".btn-video").addEventListener("click", function () {
  // Get the modal and form inputs
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

  // Get the answers
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

  // Get pause limit
  const pauseLimit = modal.querySelector("#pause").value;

  // Increment the counter for the new quiz
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
<h1 class="font-medium text-2xl relative text-start py-5">
<span class="text-primary text-2xl">
<i class="fa-regular fa-square-check"></i>
</span>
${quizCounter}.  <!-- Increment the quiz number -->
<span class="font-normal text-lg text-start py-5">${questionText}</span>
<a href="./edit-video.html" class="capitalize text-xs absolute right-[5%] px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold">edit</a>
</h1>
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
  <span class="ml-2 text-sm font-medium text-gray-900">${answer.text}</span>
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
