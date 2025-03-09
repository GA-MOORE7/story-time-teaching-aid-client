document.getElementById('toggleFullscreenBox3').addEventListener('change', function () {
    const box3 = document.getElementById('expandableBox3');
    const lightbox = document.getElementById('lightboxBackground');

    if (this.checked) {
        box3.classList.add('fullscreen');  // Expand box3 to fullscreen
        lightbox.style.display = 'block'; // Show background
        setTimeout(() => lightbox.style.opacity = '1', 10); // Fade in lightbox
    } else {
        box3.classList.remove('fullscreen'); // Restore box3 to original size
        lightbox.style.opacity = '0'; // Fade out background
        setTimeout(() => lightbox.style.display = 'none', 300); // Hide lightbox after fade
    }
});
