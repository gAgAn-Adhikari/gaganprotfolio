// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const contactForm = document.getElementById('contactForm');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // You would typically send this data to a server
    // For now, we'll just log it and show a success message
    console.log({ name, email, subject, message });
    
    // Show success message
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => group.style.display = 'none');
    
    const submitBtn = document.querySelector('.contact-form button');
    submitBtn.style.display = 'none';
    
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
    `;
    
    contactForm.appendChild(successMessage);
    
    // Reset form after 5 seconds
    setTimeout(() => {
        formGroups.forEach(group => group.style.display = 'block');
        submitBtn.style.display = 'block';
        successMessage.remove();
        contactForm.reset();
    }, 5000);
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.timeline-item, .skill-category, .about-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);

// Run animation check on page load
window.addEventListener('load', animateOnScroll);

// Add CSS for the animations
const style = document.createElement('style');
style.textContent = `
    .timeline-item, .skill-category, .about-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .timeline-item.animate, .skill-category.animate, .about-content.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .timeline-item:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .timeline-item:nth-child(3) {
        transition-delay: 0.4s;
    }
    
    .skill-category:nth-child(2) {
        transition-delay: 0.2s;
    }
    
    .skill-category:nth-child(3) {
        transition-delay: 0.4s;
    }
    
    .success-message {
        text-align: center;
        padding: 30px;
        color: var(--success-color);
    }
    
    .success-message i {
        font-size: 3rem;
        margin-bottom: 15px;
    }
`;

document.head.appendChild(style);

// Bubble pop effect
document.addEventListener('DOMContentLoaded', function() {
    // Create new bubbles when the page loads
    createBubbles(5);
    
    // Add click event listeners to all bubbles
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('bubble')) {
            popBubble(e.target);
        }
    });
});

// Function to pop a bubble
function popBubble(bubble) {
    // Play pop sound (optional)
    const popSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT18A'); // You can replace this with a real sound file
    popSound.volume = 0.2;
    popSound.play().catch(e => console.log('Audio play failed:', e));
    
    // Add pop animation
    bubble.style.animation = 'pop 0.5s ease forwards';
    
    // Remove the bubble after animation completes
    setTimeout(() => {
        bubble.remove();
        // Create a new bubble to replace the popped one
        createBubbles(1);
    }, 500);
}

// Function to create new bubbles
function createBubbles(count) {
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Smaller size range between 30px and 100px
        const size = Math.floor(Math.random() * 70) + 30;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Position bubbles more towards the edges
        const side = Math.random() < 0.5;
        bubble.style.left = side ? `${Math.random() * 20}%` : `${80 + Math.random() * 20}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        
        // Slower animation
        bubble.style.animationDuration = `${Math.random() * 20 + 20}s`;
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        
        document.body.appendChild(bubble);
    }
}

// Enhanced Header Functionality
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Add scrolled class to header when scrolling
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active section in navigation
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add hover effect to logo
    const logo = document.querySelector('.logo a');
    logo.addEventListener('mouseover', function() {
        this.style.textShadow = '0 0 10px rgba(74, 108, 247, 0.5)';
    });
    
    logo.addEventListener('mouseout', function() {
        this.style.textShadow = 'none';
    });
});
