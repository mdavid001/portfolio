// Loading Animation
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loading').classList.add('hidden');
    }, 1000);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', function(e) {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
});

// Cursor hover effect on links and buttons
const links = document.querySelectorAll('a, button, .work-item');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
    });
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

// Parallax effect on hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.work-item, .service-card, .about-content > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
});

// Form submission (prevent default for demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form.');
    });
}

// Hide mobile menu when clicking a link (for better UX)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});