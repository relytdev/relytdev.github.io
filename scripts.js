// Typing Animation for Hero Subtitle
const subtitleElement = document.querySelector('.hero-subtitle');
const subtitleText = 'Gamer • Developer • Content Creator';
let charIndex = 0;

function typeSubtitle() {
    if (charIndex < subtitleText.length) {
        subtitleElement.textContent = subtitleText.slice(0, charIndex + 1);
        charIndex++;
        setTimeout(typeSubtitle, 100); // Speed of typing (100ms per character)
    } else {
        // Add blinking cursor effect after typing completes
        subtitleElement.innerHTML = subtitleText + '<span class="cursor">|</span>';
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    subtitleElement.textContent = ''; // Clear initial text
    setTimeout(typeSubtitle, 500); // Delay before typing starts
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all cards for scroll animations
document.querySelectorAll('.about-card, .gaming-card, .project-card').forEach(card => {
    observer.observe(card);
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(147, 51, 234, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add particle effect to hero section (optional enhancement)
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    
    document.querySelector('.hero-bg-particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Generate particles periodically
setInterval(createParticle, 300);

// Add hover effect sound (optional - can be removed if too much)
const cards = document.querySelectorAll('.about-card, .gaming-card, .project-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Logo special interaction
const heroLogo = document.querySelector('.hero-logo');
let logoRotation = 0;

heroLogo.addEventListener('click', () => {
    logoRotation += 360;
    heroLogo.style.transform = `rotate(${logoRotation}deg) scale(1.2)`;
    setTimeout(() => {
        heroLogo.style.transform = `rotate(${logoRotation}deg) scale(1)`;
    }, 300);
});


});
