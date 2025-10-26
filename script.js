const subtitleElement = document.querySelector('.hero-subtitle');
const fullPhrase = 'Gamer • Developer • Creator';
let charIndex = 0;

function typeOnce() {
    if (charIndex <= fullPhrase.length) {
        subtitleElement.innerHTML = fullPhrase.substring(0, charIndex) + '<span class="cursor">|</span>';
        charIndex++;
        setTimeout(typeOnce, 80);
    } else {
        subtitleElement.innerHTML = fullPhrase + '<span class="cursor">|</span>';
        // Optional: If you want it to erase and re-type, you can call erase() here instead.
    }
}

window.addEventListener('load', () => {
    subtitleElement.textContent = '';
    setTimeout(typeOnce, 200);
});
