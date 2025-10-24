// Particle Background Animation
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mouse = { x: 0, y: 0 };
        
        this.setupCanvas();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.x -= dx * 0.01;
                particle.y -= dy * 0.01;
            }
            
            // Boundary wrapping
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`;
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * (100 - distance) / 100})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.addEventListeners();
    }
    
    addEventListeners() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.fade-in-section');
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1 }
        );
        
        this.init();
    }
    
    init() {
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }
}

// Stats counter animation
class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = false;
        this.setupObserver();
    }
    
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateCounters();
                    this.animated = true;
                }
            });
        });
        
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            observer.observe(aboutSection);
        }
    }
    
    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
}

// Form handling
class FormHandler {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.newsletterForms = document.querySelectorAll('.newsletter-form');
        
        this.addEventListeners();
    }
    
    addEventListeners() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(e);
            });
        }
        
        this.newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterForm(e);
            });
        });
    }
    
    handleContactForm(e) {
        const formData = new FormData(e.target);
        const name = e.target.querySelector('input[type="text"]').value;
        const email = e.target.querySelector('input[type="email"]').value;
        const message = e.target.querySelector('textarea').value;
        
        if (name && email && message) {
            this.showNotification('Message sent successfully! Thanks for reaching out.', 'success');
            e.target.reset();
        } else {
            this.showNotification('Please fill in all fields.', 'error');
        }
    }
    
    handleNewsletterForm(e) {
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (email) {
            this.showNotification('Successfully subscribed to updates!', 'success');
            e.target.reset();
        } else {
            this.showNotification('Please enter a valid email.', 'error');
        }
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <p>${message}</p>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#10B981' : '#EF4444',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '300px',
            animation: 'slideInRight 0.3s ease-out'
        });
        
        const button = notification.querySelector('button');
        Object.assign(button.style, {
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0',
            marginLeft: 'auto'
        });
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Back to top functionality
class BackToTop {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.addEventListener();
    }
    
    addEventListener() {
        if (this.button) {
            this.button.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
}

// Interactive effects
class InteractiveEffects {
    constructor() {
        this.addCardTiltEffects();
        this.addButtonEffects();
    }
    
    addCardTiltEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }
    
    addButtonEffects() {
        const buttons = document.querySelectorAll('.btn, .social-btn, .platform-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Typing animation for hero
class TypingAnimation {
    constructor() {
        this.element = document.querySelector('.typing-text');
        this.text = 'Gamer • Developer • Content Creator';
        this.speed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        
        if (this.element) {
            this.startTyping();
        }
    }
    
    startTyping() {
        let index = 0;
        let isDeleting = false;
        
        const type = () => {
            if (!isDeleting && index < this.text.length) {
                this.element.textContent = this.text.slice(0, index + 1);
                index++;
                setTimeout(type, this.speed);
            } else if (isDeleting && index > 0) {
                this.element.textContent = this.text.slice(0, index - 1);
                index--;
                setTimeout(type, this.deleteSpeed);
            } else if (!isDeleting && index === this.text.length) {
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, this.pauseTime);
            } else if (isDeleting && index === 0) {
                isDeleting = false;
                setTimeout(type, 500);
            }
        };
        
        type();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
    
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new StatsCounter();
    new FormHandler();
    new BackToTop();
    new InteractiveEffects();
    new TypingAnimation();
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add notification styles to head
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎮 RELYT website loaded successfully!');
});

// Add some gaming-themed console messages
console.log('%c🎮 Welcome to RELYT\'s Gaming Universe! 🎮', 'color: #9333EA; font-size: 20px; font-weight: bold;');
console.log('%cGame Mode: Activated ⚡', 'color: #06B6D4; font-size: 14px;');
console.log('%cLevel: Pro Developer 🚀', 'color: #10B981; font-size: 14px;');