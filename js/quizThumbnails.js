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
        thumbnailsContainer.innerHTML = quizzes.map((quiz, index) => `
            <div class="quiz-thumbnail" data-id="${quiz._id}" ${index === 0 ? 'class="active"' : ''}>
                <h3>${quiz.name}</h3>
                <button class="delete-thumbnail" data-id="${quiz._id}">X</button>
            </div>
        `).join("");

        // Make sure the first thumbnail is active when rendered
        const firstThumbnail = thumbnailsContainer.querySelector(".quiz-thumbnail");
        if (firstThumbnail) {
            const firstQuizId = firstThumbnail.getAttribute("data-id");
            initSlides(firstQuizId); // Load the first quiz by default
        }
    }

    // Attach a single event listener to the container (Event Delegation)
    thumbnailsContainer.addEventListener("click", async function (event) {
        const thumbnail = event.target.closest(".quiz-thumbnail");

        // Handle quiz thumbnail selection
        if (thumbnail && event.target.tagName !== "BUTTON") {
            const quizId = thumbnail.getAttribute("data-id");

            // Remove the active class from all thumbnails
            const allThumbnails = thumbnailsContainer.querySelectorAll(".quiz-thumbnail");
            allThumbnails.forEach(thumbnail => thumbnail.classList.remove("active"));

            // Add the active class to the clicked thumbnail
            thumbnail.classList.add("active");

            // Call initSlides to load and display the quiz questions as slides
            initSlides(quizId); // Use initSlides to display the quiz in slides
        }

        // Handle delete button click
        if (event.target.classList.contains("delete-thumbnail")) {
            const quizId = event.target.getAttribute("data-id");

            if (confirm("Are you sure you want to delete this quiz?")) {
                try {
                    const response = await fetch(`https://arcane-savannah-49690-577a6c1c393a.herokuapp.com/api/quizzes/${quizId}`, {  // Add URL with quizId
                        method: "DELETE",  // Corrected method
                    });

                    if (!response.ok) {
                        throw new Error("Failed to delete quiz");
                    }

                    // Remove the thumbnail from the UI after successful deletion
                    event.target.closest(".quiz-thumbnail").remove();
                } catch (error) {
                    console.error("Error deleting quiz:", error);
                }
            }
        }
    });

    fetchQuizzes();
});

