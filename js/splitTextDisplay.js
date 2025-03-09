import { createToggleElement } from "./toggle-element.js";

export async function displayQuestions(quizId, index, container) {
    container.innerHTML = ""; // Clear existing content

    try {
        const response = await fetch(`http://localhost:3000/api/quizzes/${quizId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch quiz details");
        }
        const quiz = await response.json();
        const questions = quiz.questions;

        if (!questions || questions.length === 0) {
            container.textContent = "No questions available.";
            return;
        }

        if (index < 0 || index >= questions.length) {
            container.textContent = "Invalid question index.";
            return;
        }

        const q = questions[index];

        const qaPair = document.createElement("div");
        qaPair.classList.add("qa-pair");

        const questionSpan = document.createElement("span");
        questionSpan.classList.add("question");
        questionSpan.textContent = q.question;

        // Add a line break after the question
        qaPair.appendChild(questionSpan);
        qaPair.appendChild(document.createElement("br")); // Add a line break

        const answerSpan = document.createElement("span");
        answerSpan.classList.add("answer", "hidden"); // Start hidden
        answerSpan.textContent = q.answer;

        // Create a unique toggle element
        const toggleElement = createToggleElement(index);
        qaPair.appendChild(toggleElement);
        qaPair.appendChild(answerSpan);  // Only append answerSpan once
        container.appendChild(qaPair);

        // Add event listeners for the radio buttons in this toggle element
        const radios = toggleElement.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener("change", (event) => {
                const selectedValue = event.target.value;
                answerSpan.classList.add("hidden"); // Hide answer by default

                if (selectedValue === "Y") {
                    const sentenceHTML = q.answer
                        .split(/(\. )/)
                        .map(sentence => `<span class="sentence" onclick="toggleVisibility(this)">${sentence}</span>`)
                        .join("");
                    answerSpan.innerHTML = `<br><br><br>${sentenceHTML}`;
                    answerSpan.classList.remove("hidden"); // Show full answer
                } else if (selectedValue === "I") {
                    const wordsHTML = q.answer
                        .split(" ")
                        .map(word => `<span class="word" onclick="toggleVisibility(this)">${word}</span>`)
                        .join(" ");
                    answerSpan.innerHTML = `<br><br><br>${wordsHTML}`;
                    answerSpan.classList.remove("hidden"); // Show words
                } else if (selectedValue === "N") {
                    const words = q.answer.split(" "); // Split sentence into words
                    const wordsHTML = words
                        .map(word => {
                            // Wrap each letter inside a span, keeping words intact
                            const lettersHTML = [...word]
                                .map(char => `<span class="letter" onclick="toggleVisibility(this)">${char}</span>`)
                                .join(""); // Join letters back together
                
                            return `<span class="word" style="border-bottom: 3px solid transparent;">${lettersHTML}</span>`; // Make word underline transparent
                        })
                        .join(" "); // Preserve spaces between words
                
                    answerSpan.innerHTML = `<br><br><br>${wordsHTML}`;
                    answerSpan.classList.remove("hidden"); // Show the formatted answer
                }
                
            });
        });

        // Set default selection to "Y"
        const defaultRadio = toggleElement.querySelector('input[value="Y"]');
        if (defaultRadio) {
            defaultRadio.checked = true;
            defaultRadio.dispatchEvent(new Event("change"));
        }
    } catch (error) {
        console.error("Error fetching quiz:", error);
        container.textContent = "Failed to load quiz questions.";
    }
}

// Function to toggle visibility
window.toggleVisibility = function (element) {
    element.classList.toggle("hidden");
};


