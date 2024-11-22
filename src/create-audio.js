let sectionNumber = 1; // Initial section number

// Event listener for adding a new quiz section
document
  .getElementById("add-quiz-btn-audio")
  .addEventListener("click", function () {
    const quizContainer = document.getElementById(
      "quiz-sections-container-audio"
    );

    // HTML structure for a new quiz section with dynamic section number
    const newQuizSection = `
      <div class="quizz-section-audio mb-14">
        <h1 class="capitalize text-4xl text-start font-semibold">${sectionNumber}.</h1>
        <div class="title">
          <h6 class="py-5 capitalize font-bold text-xl">Upload the video</h6>
          <form action="">
            <input
              class="w-[50%] text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
              type="file"
              accept="video/*"
            />
          </form>
          <div class="title">
            <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
            <input
              class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
              type="text"
              placeholder="Enter the question"
            />
          </div>
        </div>
        <div class="answare md:mt-8">
          <div>
            <h6 class="py-5 capitalize font-bold text-xl">Enter your answer</h6>
            <div class="grid grid-cols-2 border-2 rounded-lg p-2 gap-4">
              ${[1, 2, 3, 4]
                .map(
                  (num) => `
                <div>
                  <h6 class="py-5 capitalize font-bold text-xl">${num}.</h6>
                  <div class="flex justify-around gap-2 items-end">
                    <input
                      class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                      type="text"
                      placeholder="Answer"
                    />
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary"
                    />
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="mt-5">
              <label class="capitalize text-lg font-semibold" for="pause">Pause Limit</label>
              <select id="pause" class="text-xl border-b-2 border-black bg-transparent">
                <option value="1">0</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add the new quiz section to the container
    quizContainer.insertAdjacentHTML("beforeend", newQuizSection);

    // Increment the section number for the next added section
    sectionNumber++;
  });

// Event listener for removing the last quiz section
document
  .getElementById("substract-quiz-btn-audio")
  .addEventListener("click", function () {
    const quizContainer = document.getElementById(
      "quiz-sections-container-audio"
    );

    // Check if there's at least one section to remove
    if (quizContainer.children.length > 0) {
      // Remove the last quiz section
      quizContainer.removeChild(quizContainer.lastElementChild);
      // Decrement the section number if it's greater than 1
      if (sectionNumber > 1) sectionNumber--;
    }
  });
