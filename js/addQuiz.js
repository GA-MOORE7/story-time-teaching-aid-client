// Adjust container height dynamically
function adjustContainerHeight() {
    const quizBox = document.getElementById('quizBox');
    const questionsContainer = document.getElementById('questionsContainer');

    if (!quizBox || !questionsContainer) return;

    const maxHeight = window.innerHeight * 0.5; // 50% of viewport height
    questionsContainer.style.maxHeight = `${maxHeight}px`;
    questionsContainer.style.overflowY = 'auto'; // Enable scrolling if needed
}

// Adjust height on window resize
window.addEventListener('resize', adjustContainerHeight);

// Call function on page load
document.addEventListener('DOMContentLoaded', adjustContainerHeight);

document.getElementById('seeJsonButton').addEventListener('click', () => {
    // Gather the quiz data
    const quizData = getQuizData();

    // Find the JSON container and display the formatted JSON
    const jsonDisplay = document.getElementById('jsonDisplay');
    jsonDisplay.textContent = JSON.stringify(quizData, null, 2);
    jsonDisplay.style.display = 'block'; // Show the JSON display section
});

// Function to gather the quiz data
function getQuizData() {
    const nameInput = document.getElementById('name');
    const name = nameInput ? nameInput.value.trim() : ''; // Ensure input exists

    const questions = [];
    const questionElements = document.querySelectorAll('.question');

    questionElements.forEach((questionElement) => {
        const questionInput = questionElement.querySelector('.questionText');
        const answerInput = questionElement.querySelector('.answer');

        // Ensure the elements exist before accessing their values
        if (questionInput && answerInput) {
            const questionText = questionInput.value.trim();
            const answerText = answerInput.value.trim();

            // Only add the question if both fields are filled
            if (questionText && answerText) {
                questions.push({ question: questionText, answer: answerText });
            }
        }
    });

    return {
        name: name,
        questions: questions
    };
}


// Add event listener for the "Add Question" button
document.getElementById('addQuestionButton').addEventListener('click', () => {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionCount = questionsContainer.querySelectorAll('.question').length + 1;

    // Create a new question div
    const newQuestion = document.createElement('div');
    newQuestion.classList.add('question');
    newQuestion.innerHTML = `
    <label>Q${questionCount}:</label>
    <input type="text" name="question" class="questionText" required>
    <label>A:</label>
    <input type="text" name="answer" class="answer" required>
    <button type="button" class="removeQuestion">Remove Question</button>
`;

    // Add the new question to the container
    questionsContainer.appendChild(newQuestion);

    // Adjust container height after adding a new question
    adjustContainerHeight();

    // Add event listener to the "Remove Question" button
    newQuestion.querySelector('.removeQuestion').addEventListener('click', () => {
        questionsContainer.removeChild(newQuestion);
        adjustContainerHeight(); // Recalculate height after removing a question
    });
});

// Add event listener for the "Create Quiz" button
document.getElementById('quizForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather the quiz data
    const quizData = getQuizData();

    // Send the data to the server (mocked for now)
    fetch('http://localhost:3000/api/quizzes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Quiz created:', data);
            document.getElementById('success').textContent = 'Quiz created successfully!';
        })
        .catch(error => {
            console.error('Error creating quiz:', error);
            document.getElementById('error').textContent = 'Failed to create quiz!';
        });
});
