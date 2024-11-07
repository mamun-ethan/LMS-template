document.getElementById("add-quiz-btn").addEventListener("click", function () {
  const quizContainer = document.getElementById("quiz-sections-container");

  // HTML structure for a new quiz section
  const newQuizSection = `
    <div class="quizz-section">
                <div class="title">
                  <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
                  <input
                    class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                    type="text"
                    placeholder="Enter the question "
                  />
                </div>
                <div class="answare md:mt-8">
                  <div>
                    <h6 class="py-5 capitalize font-bold text-xl">
                      enter your answare
                    </h6>
                    <div class="grid grid-cols-1 gap-4">
                      <div>
                        <div class="flex justify-start gap-2 items-end">
                          <input
                            class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                            type="text"
                            placeholder="answare "
                          />
                        </div>
                      </div>
                    </div>
                    <h6 class="py-5 mt-8 capitalize font-bold text-xl">
                      alternative answare
                    </h6>
                    <div class="grid grid-cols-1 gap-4">
                      <div>
                        <div class="flex justify-start gap-2 items-end">
                          <input
                            class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                            type="text"
                            placeholder="answare "
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
