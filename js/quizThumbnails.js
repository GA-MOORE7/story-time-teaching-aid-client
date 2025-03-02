import { initSlides } from './slide-show.js'; // Import the initSlides function

document.addEventListener("DOMContentLoaded", function () {
    const thumbnailsContainer = document.getElementById("thumbnails-container");
    const container = document.getElementById("slideshow"); // ✅ Define container

    if (!thumbnailsContainer || !container) {
        console.error("Error: Required elements not found");
        return;
    }

    async function fetchQuizzes() {
        try {
            const response = await fetch("http://localhost:3000/api/quizzes-info");
            if (!response.ok) {
                throw new Error("Failed to fetch quizzes");
            }
            const quizzes = await response.json();
            displayThumbnails(quizzes);
        } catch (error) {
            thumbnailsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }

    function displayThumbnails(quizzes) {
        thumbnailsContainer.innerHTML = quizzes.map(quiz => `
            <div class="quiz-thumbnail" data-id="${quiz._id}">
                <h3>${quiz.name}</h3>
            </div>
        `).join("");
    }

    // Attach a single event listener to the container (Event Delegation)
    thumbnailsContainer.addEventListener("click", function (event) {
        const thumbnail = event.target.closest(".quiz-thumbnail");
        if (thumbnail) {
            const quizId = thumbnail.getAttribute("data-id");

            // Call initSlides to load and display the quiz questions as slides
            initSlides(quizId); // Use initSlides to display the quiz in slides
        }
    });

    fetchQuizzes();
});
