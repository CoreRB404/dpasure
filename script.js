document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // If target is just #, scroll to top
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate scroll position
            let scrollPosition = targetElement.offsetTop;
            
            // If scrolling to home, don't subtract the navbar offset
            if (targetId !== '#home') {
                scrollPosition -= 70; // Adjust for navbar height
            }
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    });
});

    // ===== ANIMATE BARS =====
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const delay = bar.style.getPropertyValue('--1');
        bar.style.animation = `show-bars .4s ease-in-out forwards ${delay * 0.1}s`;
    });

    

    // ===== PORTFOLIO FILTER =====
    const filterButtons = document.querySelectorAll('.portfolio__filter li');
    const portfolioItems = document.querySelectorAll('.portfolio__gallery .mix');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize portfolio items
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200);
    });

    // ===== VIDEO POPUP =====
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('href');
            window.open(videoUrl, '_blank');
        });
    });

    // ===== FORM SUBMISSION =====
    const contactForm = document.querySelector('.php-email-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const loading = this.querySelector('.loading');
            const errorMessage = this.querySelector('.error-message');
            const sentMessage = this.querySelector('.sent-message');
            
            loading.style.display = 'block';
            errorMessage.style.display = 'none';
            sentMessage.style.display = 'none';
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                loading.style.display = 'none';
                sentMessage.style.display = 'block';
                contactForm.reset();
                
                setTimeout(() => {
                    sentMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // ===== SKILLS ANIMATION =====
    const skillsSection = document.querySelector('.skills-animation');
    if (skillsSection) {
        const animateSkills = () => {
            const skills = document.querySelectorAll('.progress-bar');
            skills.forEach(skill => {
                const skillValue = skill.parentElement.querySelector('.val').textContent;
                skill.style.width = skillValue;
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }

    // ===== SERVICE ITEM ANIMATION =====
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
    });

    // ===== SECTION REVEAL ANIMATION =====
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });
});

// ===== DYNAMIC CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes show-bars {
        100% {
            transform: translateY(0%);   
        }
    }
    
    .scrolled {
        background-color: rgba(0, 0, 0, 0.9) !important;
        padding: 15px 9% !important;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }
    
    .progress-bar {
        transition: width 1.5s ease-in-out;
    }
    
    .service-item:hover {
        transform: translateY(-10px) !important;
        box-shadow: 0 0 20px rgba(255, 0, 0, 0.3) !important;
    }
`;
document.head.appendChild(style);

 function toggleMenu() {
    document.querySelector('.navbar').classList.toggle('active');
  }