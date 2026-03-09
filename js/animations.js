// Animation Controller for INKWATT Platform

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        // Initialize animations when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initScrollAnimations();
            this.initHoverAnimations();
            this.initLoadingAnimations();
            this.initIntersectionObserver();
        });
    }

    // Initialize scroll-based animations
    initScrollAnimations() {
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

        // Observe all elements with scroll-animate class
        document.querySelectorAll('.scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize hover animations
    initHoverAnimations() {
        // Add hover effects to cards
        document.querySelectorAll('.printer-card, .service-item, .gallery-item').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-lift');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-lift');
            });
        });

        // Add ink splash effect to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary, .glass-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createInkSplash(e, btn);
            });
        });
    }

    // Create ink splash effect
    createInkSplash(event, element) {
        const splash = document.createElement('div');
        splash.className = 'ink-splash-effect';
        
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        splash.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(0, 102, 204, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: inkSplashExpand 0.6s ease-out forwards;
        `;
        
        element.style.position = 'relative';
        element.appendChild(splash);
        
        setTimeout(() => {
            splash.remove();
        }, 600);
    }

    // Initialize loading animations
    initLoadingAnimations() {
        // Add loading animation to images
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('animate-fade-in');
            });
        });
    }

    // Initialize Intersection Observer for animations
    initIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-scale-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }

    // Add floating animation to elements
    addFloatingAnimation(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('floating');
        });
    }

    // Add pulse animation to elements
    addPulseAnimation(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('pulse');
        });
    }

    // Add glow animation to elements
    addGlowAnimation(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('glow');
        });
    }

    // Create custom animation
    createCustomAnimation(element, keyframes, options) {
        element.animate(keyframes, options);
    }

    // Stagger animation for lists
    staggerAnimation(selector, delay = 100) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-fade-in');
            }, index * delay);
        });
    }

    // Typewriter effect
    typewriterEffect(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Count up animation
    countUpAnimation(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Page transition animation
    pageTransition(callback) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        const spinner = document.createElement('div');
        spinner.className = 'glass-spinner';
        overlay.appendChild(spinner);
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
        }, 10);
        
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                if (callback) callback();
            }, 300);
        }, 1000);
    }

    // Shake animation for validation
    shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }

    // Bounce animation for notifications
    bounceElement(element) {
        element.classList.add('bounce');
        setTimeout(() => {
            element.classList.remove('bounce');
        }, 2000);
    }

    // Progress bar animation
    animateProgressBar(element, targetPercent) {
        element.style.width = '0%';
        setTimeout(() => {
            element.style.width = targetPercent + '%';
        }, 100);
    }

    // Loading states
    showLoading(element) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-overlay';
        loadingDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
            backdrop-filter: blur(5px);
        `;
        
        const spinner = document.createElement('div');
        spinner.className = 'glass-spinner';
        loadingDiv.appendChild(spinner);
        
        element.style.position = 'relative';
        element.appendChild(loadingDiv);
    }

    hideLoading(element) {
        const loadingOverlay = element.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    // Notification animation
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `glass-alert glass-alert-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: auto; font-size: 1.2rem;">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
}

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes inkSplashExpand {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize animation controller
const animationController = new AnimationController();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}
