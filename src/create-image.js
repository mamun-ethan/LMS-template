document.getElementById("add-quiz-btn").addEventListener("click", function () {
  const quizContainer = document.getElementById("quiz-sections-container");

  // HTML structure for a new quiz section
  const newQuizSection = `
   <div class="quizz-section">
                <div class="title">
                  <h6 class="py-5 capitalize font-bold text-xl">
                    upload the image
                  </h6>
  
                  <form action="">
                    <input
                      class="w-[50%] text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                      type="file"
                      accept="image/*"
                    />
                  </form>
                  <div class="title">
                    <h6 class="py-5 capitalize font-bold text-xl">Question</h6>
                    <input
                      class="w-full text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                      type="text"
                      placeholder="Enter the question "
                    />
                  </div>
                </div>
                <div class="answare md:mt-8">
                  <div>
                    <h6 class="py-5 capitalize font-bold text-xl">
                      enter your answare
                    </h6>
                    <div class="grid grid-cols-2 gap-4">
                      <div>
                        <h6 class="py-5 capitalize font-bold text-xl">1.</h6>
                        <div class="flex justify-around gap-2 items-end">
                          <input
                            class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                            type="text"
                            placeholder="answare "
                          />
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            class="checkbox checkbox-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <h6 class="py-5 capitalize font-bold text-xl">2.</h6>
                        <div class="flex justify-between gap-4 items-end">
                          <input
                            class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                            type="text"
                            placeholder="answare "
                          />
                          <input
                            type="checkbox"
                            class="checkbox checkbox-primary"
                            name=""
                            id=""
                          />
                        </div>
                      </div>
                      <div>
                        <h6 class="py-5 capitalize font-bold text-xl">3.</h6>
                        <div class="flex justify-around gap-2 items-end">
                          <input
                            class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                            type="text"
                            placeholder="answare "
                          />
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            class="checkbox checkbox-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <h6 class="py-5 capitalize font-bold text-xl">4.</h6>
                        <div class="flex justify-between gap-4 items-end">
                          <input
                            class="w-2/3 text-xl border-0 border-b-2 border-black focus:outline-none focus:ring-0 focus:border-b-2 focus:border-black bg-transparent"
                            type="text"
                            placeholder="answare "
                          />
                          <input
                            type="checkbox"
                            class="checkbox checkbox-primary"
                            name=""
                            id=""
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
