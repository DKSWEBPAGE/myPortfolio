// ===================================
// Mobile Navigation Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            if (navMenu.classList.contains('active')) {
                hamburger.style.backgroundColor = 'transparent';
                hamburger.style.transform = 'rotate(45deg)';
            } else {
                hamburger.style.backgroundColor = '';
                hamburger.style.transform = '';
            }
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.style.backgroundColor = '';
            hamburger.style.transform = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.style.backgroundColor = '';
                hamburger.style.transform = '';
            }
        }
    });
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
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

// ===================================
// Navbar Background on Scroll
// ===================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
});

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission (in a real app, you'd send this to a server)
        showNotification('Thank you! Your message has been sent.', 'success');
        contactForm.reset();
    });
}

// ===================================
// Notification Function
// ===================================
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = '\
        position: fixed;\
        top: 90px;\
        right: 24px;\
        padding: 16px 24px;\
        border-radius: 8px;\
        font-weight: 500;\
        z-index: 9999;\
        animation: slideIn 0.3s ease;\
    ';

    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
        notification.style.color = '#ffffff';
    } else {
        notification.style.backgroundColor = '#ef4444';
        notification.style.color = '#ffffff';
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = '\
        @keyframes slideIn {\
            from {\
                transform: translateX(100%);\
                opacity: 0;\
            }\
            to {\
                transform: translateX(0);\
                opacity: 1;\
            }\
        }\
        @keyframes slideOut {\
            from {\
                transform: translateX(0);\
                opacity: 1;\
            }\
            to {\
                transform: translateX(100%);\
                opacity: 0;\
            }\
        }\
    ';
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// Scroll Reveal Animation
// ===================================
function revealOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .timeline-item, .skill-detail-card, .project-full-card');
    
    elements.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements with hidden state
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .achievement-card, .timeline-item, .skill-detail-card, .project-full-card');
    
    elements.forEach(function(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Initial check
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// ===================================
// Active Navigation Link
// ===================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ===================================
// Typing Effect for Hero Title (Optional)
// ===================================
function typeEffect(element, text, speed) {
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

// Uncomment below to enable typing effect on hero title
// document.addEventListener('DOMContentLoaded', function() {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         typeEffect(heroTitle, "Hi, I'm Dipak 👋", 100);
//     }
// });

// ===================================
// Project Card Hover Effect Enhancement
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card, .project-full-card');
    
    projectCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// ===================================
// Skill Progress Animation
// ===================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(function(bar) {
        const progress = bar.getAttribute('data-progress');
        const elementTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            bar.style.width = progress + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);

// ===================================
// Console Welcome Message
// ===================================
console.log('%c Welcome to Dipak\'s Portfolio! ', 'background: #2563eb; color: white; font-size: 16px; padding: 10px; border-radius: 4px;');
console.log('%c Built with HTML, CSS & JavaScript ', 'color: #64748b; font-size: 12px;');
