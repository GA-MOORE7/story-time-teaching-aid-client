import { displayQuestions } from "./splitTextDisplay.js";

let slideIndex = 1;

async function initSlides(quizId) {
    const container = document.getElementById("slideshow");

    // Ensure container exists
    if (!container) {
        console.error("Error: Slideshow container not found.");
        return;
    }

    // Clear any existing slides
    container.innerHTML = "";

    try {
        // Fetch quiz details
        const response = await fetch(`https://arcane-savannah-49690-577a6c1c393a.herokuapp.com/api/quizzes/${quizId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch quiz details");
        }
        const quiz = await response.json();
        const questions = quiz.questions;

        if (!questions || questions.length === 0) {
            container.textContent = "No questions available.";
            return;
        }

        // Create slides dynamically for each question
        questions.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("slides");

            // Pass the div to displayQuestions to populate it
            displayQuestions(quizId, index, div);

            container.appendChild(div);
        });

        // Log the container to ensure slides are appended correctly
        console.log(container.innerHTML);

        // Show the first slide when the page loads
        showSlides(slideIndex);

        // Add event listeners for the next and previous buttons
        const nextButton = document.getElementById("next-slide");
        const prevButton = document.getElementById("prev-slide");

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', nextSlide);
            prevButton.addEventListener('click', prevSlide);
        }

    } catch (error) {
        console.error("Error fetching quiz data:", error);
        container.textContent = "Failed to load quiz.";
    }
}

function plusSlide(n) {
    showSlides(slideIndex + n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slides");

    // Log slides to see if they are populated
    console.log("Slides: ", slides);
    console.log("Slide index: ", slideIndex);

    if (slides.length === 0) {
        console.error("No slides found!");
        return;
    }

    // Wrap the slide index for navigation
    if (n > slides.length) {
        slideIndex = 1; // Loop back to the first slide if next exceeds the length
    } else if (n < 1) {
        slideIndex = slides.length; // Loop to the last slide if prev goes below 1
    } else {
        slideIndex = n;
    }

    // Log the current slide index
    console.log("Updated slideIndex: ", slideIndex);

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";

    // Log the slide that is shown
    console.log(`Showing slide ${slideIndex}`);
}

// Event handler for next slide
function nextSlide() {
    plusSlide(1);
}

// Event handler for previous slide
function prevSlide() {
    plusSlide(-1);
}

// Call initSlides with a quiz ID when a quiz is selected
export { initSlides };

