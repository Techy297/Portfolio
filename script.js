document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // Active nav + header bg
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    function updateHeaderBackground() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateHeaderBackground();
    });

    // Typing animation
    function typeWriter() {
        const professionElement = document.querySelector('.hero-profession');
        if (!professionElement) return;
        const text = 'DCJSP Certified Security Professional & Bug Hunter';
        const speed = 100;
        let i = 0;
        professionElement.textContent = '';
        function type() {
            if (i < text.length) {
                professionElement.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        setTimeout(type, 1000);
    }
    typeWriter();

    // Reveal animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.portfolio-item, .skill-item, .stat');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    function initAnimations() {
        const elements = document.querySelectorAll('.portfolio-item, .skill-item, .stat');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    initAnimations();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Section reveal
    function revealSections() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
    }
    revealSections();
});

// Throttle scroll performance
function throttle(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
window.addEventListener('scroll', throttle(function() {}, 16));
