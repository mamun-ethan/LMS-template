document.getElementById("add-quiz-btn").addEventListener("click", function () {
  const quizContainer = document.getElementById("quiz-sections-container");

  // HTML structure for a new quiz section without duplicate ID
  const newQuizSection = `
    <div class="quiz-section">
      <div class="title">
        <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
        <input
          class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 bg-transparent"
          type="text"
          placeholder="Enter the question"
        />
      </div>
      <div class="answare md:mt-8">
        <h6 class="py-5 capitalize font-bold text-xl">Enter your answer</h6>
        <div class="grid grid-cols-2 gap-4">
          ${Array(4)
            .fill(0)
            .map(
              (_, i) => `
                <div>
                  <h6 class="py-5 capitalize font-bold text-xl">${i + 1}.</h6>
                  <div class="flex justify-around gap-2 items-end">
                    <input
                      class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 bg-transparent"
                      type="text"
                      placeholder="Answer"
                    />
                    <input type="checkbox" class="checkbox checkbox-primary" />
                  </div>
                </div>`
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  // Add the new quiz section to the container
  quizContainer.insertAdjacentHTML("beforeend", newQuizSection);
});

document
  .getElementById("substract-quiz-btn")
  .addEventListener("click", function () {
    const quizContainer = document.getElementById("quiz-sections-container");

    // Check if there's at least one section to remove
    if (quizContainer.children.length > 0) {
      // Remove the last quiz section
      quizContainer.removeChild(quizContainer.lastElementChild);
    }
  });
