// Global variables to track the editing state
let isEditing = false;
let currentEditingElement = null;

// Get references to all inputs for the upload section
const imageInput = document.getElementById("imageInput");
const audioInput = document.getElementById("audioInput");
const videoInput = document.getElementById("videoInput");
const uploadImage = document.getElementById("uploadImage");
const uploadAudio = document.getElementById("uploadAudio");
const uploadVideo = document.getElementById("uploadVideo");
const submitButton = document.getElementById("submitButton");

// Add event listeners to radio buttons for upload options
uploadImage.addEventListener("change", () => {
  imageInput.disabled = !uploadImage.checked;
  audioInput.disabled = true;
  videoInput.disabled = true;
  audioInput.value = "";
  videoInput.value = "";
});

uploadAudio.addEventListener("change", () => {
  audioInput.disabled = !uploadAudio.checked;
  imageInput.disabled = true;
  videoInput.disabled = true;
  imageInput.value = "";
  videoInput.value = "";
});

uploadVideo.addEventListener("change", () => {
  videoInput.disabled = !uploadVideo.checked;
  imageInput.disabled = true;
  audioInput.disabled = true;
  imageInput.value = "";
  audioInput.value = "";
});

// Event listener for the "Save" button in the modal
document.querySelector(".blank-btn").addEventListener("click", function () {
  const modal = document.getElementById("blankModal");
  const quizSectionsContainer = modal.querySelector(".quiz-sections-container");
  const quizSections = quizSectionsContainer.querySelectorAll(".quiz-section");

  const quizContainer = document.getElementById("quizContainer"); // Get the quiz container

  quizSections.forEach((section, index) => {
    const questionText = section.querySelector(".title input").value.trim();

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

    // Handle media upload
    let uploadedMedia = null;
    if (uploadImage.checked && imageInput.files.length > 0) {
      uploadedMedia = {
        type: "image",
        src: URL.createObjectURL(imageInput.files[0]),
      };
    } else if (uploadAudio.checked && audioInput.files.length > 0) {
      uploadedMedia = {
        type: "audio",
        src: URL.createObjectURL(audioInput.files[0]),
      };
    } else if (uploadVideo.checked && videoInput.value.trim()) {
      uploadedMedia = {
        type: "video",
        src: videoInput.value.trim(),
      };
    }

    // Create the new quiz item dynamically
    const newQuizItemHTML = `
<div class="flex justify-between items-center">
  <h1 class="font-medium text-2xl ml-5 relative text-start py-5">
    <span class="text-primary text-2xl">
      <i class="fa-regular fa-square-check"></i>
    </span>
    ${quizContainer.children.length + 1}.
    <span class="font-normal text-lg text-start py-5">
      ${questionText}
    </span>
  </h1>

  <div class="flex gap-5"> 
    <a
      href="#"
      class="capitalize edit-btn text-xs px-3 py-1.5 text-white rounded-lg bg-blue-700 font-semibold"
    >
      edit
    </a>
    <a
      class="capitalize delete-btn text-xs px-3 py-1.5 text-red-600 rounded-lg bg-red-300 font-semibold cursor-pointer"
    >
      delete
    </a>
  </div>
</div>

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

    // Add the uploaded media (if any) to the new quiz item
    if (uploadedMedia) {
      let mediaElement;
      if (uploadedMedia.type === "image") {
        mediaElement = document.createElement("img");
        mediaElement.src = uploadedMedia.src;
        mediaElement.alt = "Uploaded Image";
        mediaElement.style.marginTop = "1rem"; // mt-4 equivalent
        mediaElement.style.width = "200px";
        mediaElement.style.height = "150px";
      } else if (uploadedMedia.type === "audio") {
        mediaElement = document.createElement("audio");
        mediaElement.controls = true;
        const audioSource = document.createElement("source");
        audioSource.src = uploadedMedia.src;
        audioSource.type = "audio/mp3";
        mediaElement.appendChild(audioSource);
        mediaElement.classList.add("mt-4");
      } else if (uploadedMedia.type === "video") {
        mediaElement = document.createElement("video");
        mediaElement.controls = true;
        const videoSource = document.createElement("source");
        videoSource.src = uploadedMedia.src;
        videoSource.type = "video/mp4";
        mediaElement.appendChild(videoSource);
        mediaElement.classList.add("mt-4", "w-[200px]", "h-[150]");
      }

      newQuizElement.querySelector(".p-4").appendChild(mediaElement);
    }

    // Add edit and delete button functionality
    newQuizElement
      .querySelector(".edit-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        openEditModal(newQuizElement, questionText, answers);
      });

    newQuizElement
      .querySelector(".delete-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        newQuizElement.remove();
      });

    quizContainer.appendChild(newQuizElement);
  });

  // Clear only the input data in the modal
  quizSections.forEach((section) => {
    const questionInput = section.querySelector(".title input");
    const answerInputs = section.querySelectorAll(
      ".answare input[type='text']"
    );

    // Clear the question input
    if (questionInput) questionInput.value = "";

    // Clear the answer inputs
    answerInputs.forEach((input) => {
      input.value = "";
    });
  });

  // Hide the modal
  modal.classList.add("hidden");
});

// Open the Edit Modal with Pre-filled Data
function openEditModal(quizElement, question, answers) {
  const modal = document.getElementById("blankModal");
  modal.classList.remove("hidden");

  // Set current editing element
  isEditing = true;
  currentEditingElement = quizElement;

  // Populate the modal with the question and answers
  const questionInput = modal.querySelector(".title input");
  const answerInputs = modal.querySelectorAll(".answare input[type='text']");

  questionInput.value = question;
  answerInputs[0].value = answers[0] || "";
  answerInputs[1].value = answers[1] || "";
}

// Save Changes in the Edit Modal
document.getElementById("saveEditModal").addEventListener("click", function () {
  if (!isEditing || !currentEditingElement) return;

  const modal = document.getElementById("blankModal");
  const questionInput = modal.querySelector(".title input").value.trim();
  const answerInputs = modal.querySelectorAll(".answare input[type='text']");
  const updatedAnswers = Array.from(answerInputs).map((input) =>
    input.value.trim()
  );

  if (!questionInput) {
    alert("Question cannot be empty!");
    return;
  }

  // Update the quiz item
  const titleElement = currentEditingElement.querySelector(
    "h1 span:nth-child(3)"
  );
  titleElement.textContent = questionInput;

  const answerTextarea = currentEditingElement.querySelector("textarea");
  answerTextarea.value = updatedAnswers[0] || "";

  // Close modal
  modal.classList.add("hidden");
  isEditing = false;
  currentEditingElement = null;
});

// Event listener for the cancel button
document
  .getElementById("cancelBlankModal-edit")
  .addEventListener("click", function () {
    const modal = document.getElementById("blankModal");
    modal.classList.add("hidden");
    isEditing = false;
    currentEditingElement = null;
  });

// Handle form submission for upload options
submitButton.addEventListener("click", () => {
  let selectedData = null;

  if (uploadImage.checked) {
    selectedData = imageInput.files[0] ? imageInput.files[0].name : null;
  } else if (uploadAudio.checked) {
    selectedData = audioInput.files[0] ? audioInput.files[0].name : null;
  } else if (uploadVideo.checked) {
    selectedData = videoInput.value.trim() || null;
  }

  console.log("Selected Data:", selectedData);
});
