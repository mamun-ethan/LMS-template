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
