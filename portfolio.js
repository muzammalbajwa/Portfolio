document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the form from actually submitting

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value || "No Subject";
    var message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
    }

    // Construct the mailto link
    var mailtoLink = `mailto:muzammalbajwa56@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

    // Open the user's email client
    window.location.href = mailtoLink;
});

// Smooth Scrolling for Testimonials
document.addEventListener("scroll", function () {
    let section = document.querySelector('.testimonial-container');
    let wrapper = document.querySelector('.testimonial-wrapper');
    let sectionPos = section.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;

    if (sectionPos < windowHeight && sectionPos > -section.clientHeight) {
        wrapper.scrollLeft += 2; // Scroll Speed
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';

    // Change navbar background on scroll
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'null');
    darkModeToggle.innerHTML = body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Scroll Animations
const animatedElements = document.querySelectorAll('.animated');

const checkIfInView = () => {
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
            element.classList.add('show');
        }
    });
};

window.addEventListener('load', checkIfInView);
window.addEventListener('scroll', checkIfInView);

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({top: targetElement.offsetTop - 70, behavior: 'smooth'});
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        }
    });
});

// GSAP Scroll Animations (If using GSAP)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const testimonialSection = document.getElementById('testimonialSection');
        const testimonialContainer = document.getElementById('testimonialContainer');
        const scrollProgress = document.getElementById('scrollProgress');
        const scrollMessage = document.getElementById('scrollMessage');
        const testimonialCards = document.querySelectorAll('.testimonial-card');

        const totalWidth = Array.from(testimonialCards).reduce((width, card) => {
            return width + card.offsetWidth + parseInt(window.getComputedStyle(card).marginRight);
        }, 0);

        const scrollAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: testimonialSection,
                pin: true,
                start: "top top",
                end: `+=${totalWidth}`,
                scrub: 1,
                onUpdate: (self) => {
                    scrollProgress.style.width = `${self.progress * 100}%`;
                    scrollMessage.style.opacity = self.progress > 0.1 ? '0' : '1';
                }
            }
        });

        scrollAnimation.to(testimonialContainer, {
            x: () => -(totalWidth - testimonialSection.offsetWidth + 40),
            ease: "none"
        });

        testimonialCards.forEach((card, index) => {
            ScrollTrigger.create({
                trigger: testimonialSection,
                start: "top top",
                end: `+=${totalWidth}`,
                scrub: true,
                onUpdate: (self) => {
                    const totalCards = testimonialCards.length;
                    const cardPosition = index / (totalCards - 1);
                    const distanceFromCenter = Math.abs(self.progress - cardPosition);
                    const scale = 1 - (distanceFromCenter * 0.1);
                    gsap.set(card, {
                        scale: Math.max(0.95, Math.min(1.05, scale))
                    });
                }
            });
        });

        window.addEventListener('resize', () => ScrollTrigger.refresh());
    }
});
// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if filter buttons exist
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                const projectItems = document.querySelectorAll('.project-item');
                projectItems.forEach(item => {
                    // Show all items if 'all' is selected
                    if (filterValue === 'all') {
                        item.classList.add('show');
                        item.classList.remove('hide');
                    } else {
                        // Check if item has the category
                        const categories = item.getAttribute('data-category').split(' ');
                        if (categories.includes(filterValue)) {
                            item.classList.add('show');
                            item.classList.remove('hide');
                        } else {
                            item.classList.add('hide');
                            item.classList.remove('show');
                        }
                    }
                });
            });
        });
    }
    
    // Initialize animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });
});

// Update navigation to include Projects
document.addEventListener('DOMContentLoaded', function() {
    // Find the commented out projects nav item and uncomment it
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link && link.getAttribute('href') === '#projects') {
            item.style.display = 'block';
        }
    });
});