// Main Application JavaScript for INKWATT Platform

class InkwattApp {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize WhatsApp bot globally
            initializeWhatsAppBot();
            
            // Initialize animations
            initAnimations();
            
            // Initialize navigation
            initNavigation();
            
            // Initialize scroll effects
            initScrollEffects();
            
            // Initialize mobile menu
            initMobileMenu();
        });
    }

    // Global WhatsApp Bot Initialization
    initializeWhatsAppBot() {
        // Check if WhatsAppBot class is available
        if (typeof WhatsAppBot !== 'undefined') {
            // Create global instance
            window.whatsappBot = new WhatsAppBot();
            console.log('WhatsApp Bot initialized successfully');
        } else {
            console.warn('WhatsAppBot class not found');
        }
    }

    // Enhanced navigation with smooth scroll
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Handle internal anchor links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Enhanced scroll effects
    initScrollEffects() {
        const header = document.querySelector('.glass-nav');
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Enhanced mobile menu
    initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        }
    }

    // Enhanced animations
    initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('animate-fade-in')) {
                        entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                    } else if (entry.target.classList.contains('animate-slide-up')) {
                        entry.target.style.animation = 'slideInFromBottom 0.8s ease forwards';
                    } else if (entry.target.classList.contains('animate-slide-in-left')) {
                        entry.target.style.animation = 'slideInFromLeft 0.8s ease forwards';
                    } else if (entry.target.classList.contains('animate-slide-in-right')) {
                        entry.target.style.animation = 'slideInFromRight 0.8s ease forwards';
                    }
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up, .animate-slide-in-left, .animate-slide-in-right');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Global utility functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#25D366' : type === 'error' ? '#ff6b6b' : '#0066cc'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 10002;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Global WhatsApp helper function
    sendWhatsAppMessage(message) {
        if (window.whatsappBot) {
            window.whatsappBot.sendProductOrder('General Inquiry', { message: message });
        } else {
            const whatsappUrl = `https://wa.me/233594188747?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    }

    // Export for global access
    window.inkwattApp = {
        showNotification,
        sendWhatsAppMessage,
        initializeWhatsAppBot
    };

    // Navigation setup
    setupNavigation() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Mobile menu setup
    setupMobileMenu() {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        `;

        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(mobileMenuBtn);
        }

        const navMenu = document.querySelector('.nav-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-menu-active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('mobile-menu-active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('mobile-menu-active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });
    }

    // Scroll effects
    setupScrollEffects() {
        let lastScrollTop = 0;
        const nav = document.querySelector('.glass-nav');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Hide/show navigation on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;

            // Add shadow to navigation when scrolled
            if (scrollTop > 50) {
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }
        });
    }

    // Form validation
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm(form)) {
                    this.submitForm(form);
                }
            });
        });

        // Real-time validation
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Remove previous error states
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Validation rules
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (fieldType === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (fieldType === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        } else if (field.getAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
            isValid = false;
            errorMessage = `Minimum ${field.getAttribute('minlength')} characters required`;
        }

        // Show error if invalid
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            errorDiv.style.cssText = `
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            `;
            field.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    submitForm(form) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            if (typeof animationController !== 'undefined') {
                animationController.showNotification('Message sent successfully! We\'ll contact you soon.', 'success');
            }
            
            // Reset form
            form.reset();
        }, 2000);
    }

    // Search functionality
    setupSearch() {
        const searchInputs = document.querySelectorAll('#search, .search-input');
        
        searchInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.performSearch(query);
            });
        });
    }

    performSearch(query) {
        const searchableElements = document.querySelectorAll('.product, .service-item, .gallery-item');
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query)) {
                element.style.display = '';
                element.classList.add('search-highlight');
            } else {
                element.style.display = 'none';
                element.classList.remove('search-highlight');
            }
        });

        // Show no results message if needed
        const visibleElements = document.querySelectorAll('.product:not([style*="display: none"]), .service-item:not([style*="display: none"]), .gallery-item:not([style*="display: none"])');
        const noResultsMsg = document.querySelector('.no-results');
        
        if (visibleElements.length === 0 && query) {
            if (!noResultsMsg) {
                const msg = document.createElement('div');
                msg.className = 'no-results glass-card';
                msg.innerHTML = `<p>No results found for "${query}"</p>`;
                msg.style.cssText = `
                    text-align: center;
                    padding: 2rem;
                    margin: 2rem auto;
                    max-width: 500px;
                `;
                
                const container = document.querySelector('.container');
                if (container) {
                    container.appendChild(msg);
                }
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Theme management
    setupTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('inkwatt-theme');
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        this.applyTheme(theme);
        
        // Add theme toggle button
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle glass-btn';
        themeToggle.innerHTML = theme === 'dark' ? '🌙' : '☀️';
        themeToggle.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1000;
            padding: 0.5rem;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        `;
        
        document.body.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            this.applyTheme(newTheme);
            localStorage.setItem('inkwatt-theme', newTheme);
            themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
        });
    }

    applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    // WhatsApp integration
    initWhatsAppIntegration() {
        // Auto-popup WhatsApp bot after 4 seconds
        setTimeout(() => {
            this.showWhatsAppBot();
        }, 4000);

        // Track user interactions for personalized messaging
        this.trackUserInteractions();
    }

    showWhatsAppBot() {
        const existingBot = document.querySelector('.whatsapp-bot-popup');
        if (existingBot) return;

        const bot = document.createElement('div');
        bot.className = 'whatsapp-bot-popup glass-card';
        bot.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            z-index: 1001;
            max-width: 300px;
            padding: 1.5rem;
            animation: slideInRight 0.5s ease-out;
        `;
        
        bot.innerHTML = `
            <button onclick="this.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem;">&times;</button>
            <h4 style="margin-bottom: 0.5rem; color: #25D366;">💬 Need Help?</h4>
            <p style="margin-bottom: 1rem; font-size: 0.9rem;">Have questions about our printing services? Chat with us on WhatsApp!</p>
            <a href="https://wa.me/233594188747?text=Hi%20Inkwatt!%20I%20need%20help%20with%20printing%20services." target="_blank" class="whatsapp-btn" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.5rem 1rem; background: #25D366; color: white; border-radius: 20px; font-size: 0.9rem;">
                <span>📱</span> Chat Now
            </a>
        `;
        
        document.body.appendChild(bot);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (document.body.contains(bot)) {
                bot.style.animation = 'slideOutRight 0.5s ease-out';
                setTimeout(() => bot.remove(), 500);
            }
        }, 10000);
    }

    trackUserInteractions() {
        const interactions = {
            pagesViewed: [],
            servicesViewed: [],
            timeSpent: 0,
            lastActivity: Date.now()
        };

        // Track page views
        const currentPage = window.location.pathname;
        interactions.pagesViewed.push(currentPage);

        // Track service clicks
        document.querySelectorAll('.service-item, .printer-card').forEach(item => {
            item.addEventListener('click', () => {
                const serviceName = item.querySelector('h3')?.textContent || 'Unknown Service';
                interactions.servicesViewed.push(serviceName);
            });
        });

        // Track time spent
        setInterval(() => {
            interactions.timeSpent += 5;
            interactions.lastActivity = Date.now();
        }, 5000);

        // Store interactions for WhatsApp message personalization
        localStorage.setItem('inkwatt_interactions', JSON.stringify(interactions));
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Cookie management
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    }
}

// Add mobile menu styles
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    .mobile-menu-btn {
        display: none !important;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block !important;
        }
        
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
        }
        
        .nav-menu.mobile-menu-active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .nav-link {
            font-size: 1.2rem;
            padding: 1rem 2rem;
        }
    }
    
    .dark-theme {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        color: #ffffff;
    }
    
    .dark-theme .glass-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .dark-theme .service-item {
        background: rgba(255, 255, 255, 0.05);
        color: #ffffff;
    }
    
    .dark-theme .service-item h3 {
        color: #ffffff;
    }
    
    .dark-theme .service-item p {
        color: rgba(255, 255, 255, 0.8);
    }
    
    .search-highlight {
        animation: pulse 1s ease-in-out;
    }
    
    input.error, textarea.error, select.error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2) !important;
    }
`;
document.head.appendChild(mobileMenuStyles);

// Initialize the app
const inkwattApp = new InkwattApp();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InkwattApp;
}
