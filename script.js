const subtitleElement = document.querySelector('.hero-subtitle');
const fullPhrase = 'Gamer • Developer • Creator';
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    if (!isDeleting && charIndex <= fullPhrase.length) {
        subtitleElement.innerHTML = fullPhrase.substring(0, charIndex) + '<span class="cursor">|</span>';
        charIndex++;
        setTimeout(typeLoop, 80);
    } else if (isDeleting && charIndex >= 0) {
        subtitleElement.innerHTML = fullPhrase.substring(0, charIndex) + '<span class="cursor">|</span>';
        charIndex--;
        setTimeout(typeLoop, 35);
    } else if (!isDeleting && charIndex > fullPhrase.length) {
        // Pause at end before erasing
        setTimeout(() => { isDeleting = true; typeLoop(); }, 1300);
    } else if (isDeleting && charIndex < 0) {
        // Pause at start before re-typing
        isDeleting = false;
        setTimeout(typeLoop, 350);
    }
}

window.addEventListener('load', () => {
    subtitleElement.textContent = '';
    setTimeout(typeLoop, 200);
});
