// ===== SCROLL ANIMATIONS MODULE =====

export function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    // Intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe portfolio cards and CV items
    document.querySelectorAll('.portfolio-card, .cv-column').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Parallax effect (optional)
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const heroShapes = document.querySelectorAll('.shape');

        if (hero) {
            const scrollPosition = window.scrollY;
            heroShapes.forEach((shape, index) => {
                shape.style.transform = `translateY(${scrollPosition * (0.3 + index * 0.1)}px)`;
            });
        }
    });
}

// Counter animation (optional - for stats)
export function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}
