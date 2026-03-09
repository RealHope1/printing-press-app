// app.js - General Application Logic

document.addEventListener('DOMContentLoaded', function() {
    // Initialize app
    console.log('Inkwatt App Loaded');

    // Hamburger menu toggle
    window.toggleMenu = function() {
        const menu = document.getElementById('nav-menu');
        const hamburger = document.querySelector('.hamburger');
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    };

    // Close menu on link click
    const links = document.querySelectorAll('#nav-menu a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('nav-menu');
            const hamburger = document.querySelector('.hamburger');
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});