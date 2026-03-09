// animations.js - Additional Animations

// Add rotating paper animation to gallery
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.classList.add('rotating-paper');
});

// Ink splash on service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.classList.add('ink-splash');
});

// Zoom on hover for product images
document.querySelectorAll('.product-gallery img').forEach(img => {
    img.parentElement.classList.add('zoom-hover');
});

// Fade in on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .product-card, .printer-card').forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
});

// Add floating animation to hero elements
document.querySelectorAll('.printer-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('float');
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.querySelector('.hero-section').style.transform = `translateY(${rate}px)`;
});