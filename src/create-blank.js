document.getElementById("add-quiz-btn").addEventListener("click", function () {
  const quizContainer = document.getElementById("quiz-sections-container");

  // Calculate the section number based on existing sections
  const sectionNumber = quizContainer.children.length + 1;

  // HTML structure for a new quiz section with dynamic section number
  const newQuizSection = `
    <div class="quiz-section">
      <br /><br /><br /><br />
      <h1 class="capitalize text-4xl text-start font-semibold">${sectionNumber}.</h1>
      <div class="title">
        <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
        <input
          class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
          type="text"
          placeholder="Enter the question"
        />
      </div>
      <div class="answare md:mt-8">
        <div>
          <h6 class="py-5 capitalize font-bold text-xl">Enter your answer</h6>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <div class="flex justify-start gap-2 items-end">
                <input
                  class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                  type="text"
                  placeholder="Answer"
                />
              </div>
            </div>
          </div>
          <h6 class="py-5 mt-8 capitalize font-bold text-xl">Alternative answer</h6>
          <div class="grid grid-cols-1 gap-4">
            <div>
              <div class="flex justify-start gap-2 items-end">
                <input
                  class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                  type="text"
                  placeholder="Answer"
                />
              </div>
            </div>
          </div>
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
