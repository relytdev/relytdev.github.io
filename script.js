const subtitleElement = document.querySelector('.hero-subtitle');
const phrases = ['Gamer', 'Developer', 'Creator'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    let display = currentPhrase.substring(0, charIndex);
    
    subtitleElement.innerHTML = display + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex <= currentPhrase.length) {
        charIndex++;
        setTimeout(typeLoop, 110);
    } else if (isDeleting && charIndex >= 0) {
        charIndex--;
        setTimeout(typeLoop, 60);
    } else if (!isDeleting && charIndex > currentPhrase.length) {
        setTimeout(() => { isDeleting = true; typeLoop(); }, 1400);
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 350);
    }
}

window.addEventListener('load', () => {
    typeLoop();
});
