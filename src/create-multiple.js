document.getElementById("add-quiz-btn").addEventListener("click", function () {
  const quizContainer = document.getElementById("quiz-sections-container");

  // Calculate the section number based on existing sections
  const sectionNumber = quizContainer.children.length + 1;

  // HTML structure for a new quiz section with dynamic section number
  const newQuizSection = `
    <div class="quiz-section">
      <br /><br /><br /><br />
      <h1 class="capitalize text-4xl text-start font-semibold">${sectionNumber}</h1>
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

// multiple choice form submiting
document.addEventListener("DOMContentLoaded", () => {
  // Get the "Add" button inside the modal
  const addButton = document.querySelector(".btn-primary");

  // Function to collect and log data when adding a quiz
  addButton.addEventListener("click", () => {
    const questionInput = document.querySelector(".title input").value;
    const answers = [];

    // Get all answer inputs and checkboxes
    const answerInputs = document.querySelectorAll(
      '.answare input[type="text"]'
    );
    const checkboxes = document.querySelectorAll(
      '.answare input[type="checkbox"]'
    );

    answerInputs.forEach((input, index) => {
      answers.push({
        answer: input.value,
        isCorrect: checkboxes[index].checked,
      });
    });

    // Log the collected data to the console
    console.log({
      question: questionInput,
      answers: answers,
    });
  });
});
