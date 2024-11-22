// Initialize the question counter
let questionCounter = 1;

// Get modal and buttons
const openModalButton = document.getElementById("openModal");
const modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancelBtn");

// Show modal on button click
openModalButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent any default action
  modal.classList.remove("hidden"); // Show modal
});

// Hide modal on cancel button click
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden"); // Hide modal
});

// Optional: Hide modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Fill in the Blank Modal
  const openBlankModal = document.getElementById("openBlankModal");
  const blankModal = document.getElementById("blankModal");
  const cancelBlankModal = document.getElementById("cancelBlankModal");

  openBlankModal.addEventListener("click", (event) => {
    event.preventDefault();
    blankModal.classList.remove("hidden");
  });

  cancelBlankModal.addEventListener("click", () => {
    blankModal.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (event.target === blankModal) {
      blankModal.classList.add("hidden");
    }
  });

  // video modal
  const openVideoModal = document.getElementById("openVideoModal");
  const videoModal = document.getElementById("videoModal");
  const cancelVideoModal = document.getElementById("cancelVideoModal");

  openVideoModal.addEventListener("click", (event) => {
    event.preventDefault();
    videoModal.classList.remove("hidden");
  });

  cancelVideoModal.addEventListener("click", () => {
    videoModal.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (event.target === videoModal) {
      videoModal.classList.add("hidden");
    }
  });

  // image modal
  const openImageModal = document.getElementById("openImageModal");
  const imageModal = document.getElementById("imageModal");
  const cancelImageModal = document.getElementById("cancelImageModal");

  openImageModal.addEventListener("click", (event) => {
    event.preventDefault();
    imageModal.classList.remove("hidden");
  });

  cancelImageModal.addEventListener("click", () => {
    imageModal.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      imageModal.classList.add("hidden");
    }
  });

  // image modal
  const openAudioModal = document.getElementById("openAudioModal");
  const audioModal = document.getElementById("audioModal");
  const cancelAudioModal = document.getElementById("cancelAudioModal");

  openAudioModal.addEventListener("click", (event) => {
    event.preventDefault();
    audioModal.classList.remove("hidden");
  });

  cancelAudioModal.addEventListener("click", () => {
    audioModal.classList.add("hidden");
  });

  window.addEventListener("click", (event) => {
    if (event.target === audioModal) {
      audioModal.classList.add("hidden");
    }
  });
});
