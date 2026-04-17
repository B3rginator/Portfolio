// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function setMobileMenuState(isOpen) {
    navMenu.classList.toggle('active', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
}

hamburger.addEventListener('click', () => {
    setMobileMenuState(!navMenu.classList.contains('active'));
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        setMobileMenuState(false);
    });
});

// ===== SMOOTH SCROLLING =====
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

// ===== NAVBAR TRANSPARENCY ON SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const envelopePreview = document.querySelector('.letter-image');
if (envelopePreview) {
    const openEnvelope = () => {
        envelopePreview.classList.add('is-open');
    };

    envelopePreview.addEventListener('mouseenter', openEnvelope, { once: true });
    envelopePreview.addEventListener('click', openEnvelope);
    envelopePreview.addEventListener('focusin', openEnvelope);
}

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

// ===== FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message (you can integrate with email service later)
            alert(`Tak ${name}! Jeg har modtaget din besked og vender tilbage snarest.`);
            contactForm.reset();
        } else {
            alert('Venligst udfyld alle felter');
        }
    });
}

// ===== ACTIVE NAVIGATION LINK =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-color)';
        }
    });
});

// ===== COUNTER ANIMATION (OPTIONAL - for stats) =====
function animateCounter(element, target, duration = 2000) {
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

// ===== PARALLAX EFFECT (OPTIONAL) =====
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

// ===== HERO CUBE DRAG INTERACTION =====
function initHeroCubeInteraction() {
    const heroCuriosity = document.querySelector('.hero-curiosity');
    const profileCube = document.querySelector('.profile-cube');
    const helperHint = heroCuriosity?.querySelector('.curiosity-helper');

    if (!heroCuriosity || !profileCube || !helperHint) {
        return;
    }

    document.body.appendChild(helperHint);

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let rotationX = -18;
    let rotationY = 18;
    let autoRotating = true;
    let isHovered = false;
    let recovering = false;
    let resumeTimer = null;
    let hintTimer = null;
    let hintDismissed = false;
    const AUTO_SPEED = 20;          // degrees per second (Y-axis spin)
    const RESUME_DELAY = 1500;      // ms before recovery starts
    const RECOVER_SPEED = 90;       // degrees per second for X-axis return
    const REST_X = -18;             // the "readable" tilt angle
    const HINT_DURATION = 3000;
    const HINT_OFFSET_Y = 20;

    const applyRotation = () => {
        profileCube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    };

    // --- Normalize angle to [-180, 180) ---
    const normalizeAngle = (a) => ((a % 360) + 540) % 360 - 180;

    // --- Animation loop ---
    let lastTime = null;
    const tick = (timestamp) => {
        if (lastTime !== null && !isDragging) {
            const dt = (timestamp - lastTime) / 1000;

            // Phase 1: recover X towards REST_X
            if (recovering) {
                const diff = normalizeAngle(REST_X - rotationX);
                if (Math.abs(diff) < 0.5) {
                    rotationX = REST_X;
                    recovering = false;
                    autoRotating = !isHovered;
                } else {
                    const step = Math.sign(diff) * Math.min(RECOVER_SPEED * dt, Math.abs(diff));
                    rotationX += step;
                }
            }

            // Phase 2: steady Y spin
            if (autoRotating) {
                rotationY += AUTO_SPEED * dt;
            }
        }
        lastTime = timestamp;
        applyRotation();
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    const stopAutoRotation = () => {
        autoRotating = false;
        recovering = false;
        if (resumeTimer) {
            clearTimeout(resumeTimer);
            resumeTimer = null;
        }
    };

    const clearHintTimer = () => {
        if (hintTimer) {
            clearTimeout(hintTimer);
            hintTimer = null;
        }
    };

    const hideHint = () => {
        clearHintTimer();
        helperHint.classList.remove('is-visible');
    };

    const dismissHint = () => {
        hintDismissed = true;
        hideHint();
    };

    const positionHint = (event) => {
        if (event.clientX === undefined || event.clientY === undefined) {
            return;
        }

        const tooltipWidth = helperHint.offsetWidth;
        const tooltipHeight = helperHint.offsetHeight;
        const nextLeft = Math.min(
            Math.max(event.clientX, 12 + tooltipWidth / 2),
            window.innerWidth - 12 - tooltipWidth / 2
        );
        const nextTop = Math.max(12, event.clientY - tooltipHeight - HINT_OFFSET_Y);

        helperHint.style.left = `${nextLeft}px`;
        helperHint.style.top = `${nextTop}px`;
    };

    const showHint = (event) => {
        if (event.pointerType === 'touch' || hintDismissed) {
            return;
        }

        positionHint(event);
        helperHint.classList.add('is-visible');
        clearHintTimer();
        hintTimer = setTimeout(() => {
            dismissHint();
            hintTimer = null;
        }, HINT_DURATION);
    };

    const scheduleResume = () => {
        if (isHovered) {
            return;
        }
        if (resumeTimer) {
            clearTimeout(resumeTimer);
        }
        resumeTimer = setTimeout(() => {
            // Start recovering X back to the readable angle first
            recovering = true;
        }, RESUME_DELAY);
    };

    const handleHoverStart = (event) => {
        isHovered = true;
        stopAutoRotation();
        showHint(event);
    };

    const handleHoverEnd = () => {
        isHovered = false;
        hideHint();
        if (!isDragging) {
            scheduleResume();
        }
    };

    const handlePointerMove = (event) => {
        if (helperHint.classList.contains('is-visible')) {
            positionHint(event);
        }

        drag(event);
    };

    // --- Drag handlers ---
    const startDrag = (event) => {
        event.preventDefault();
        isDragging = true;
        stopAutoRotation();
        dismissHint();
        startX = event.clientX ?? event.pageX;
        startY = event.clientY ?? event.pageY;
        heroCuriosity.classList.add('is-dragging');

        if (event.pointerId !== undefined) {
            heroCuriosity.setPointerCapture(event.pointerId);
        }
    };

    const drag = (event) => {
        if (!isDragging) {
            return;
        }
        event.preventDefault();

        const clientX = event.clientX ?? event.pageX;
        const clientY = event.clientY ?? event.pageY;
        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        rotationY += deltaX * 0.45;
        rotationX -= deltaY * 0.35;
        startX = clientX;
        startY = clientY;
    };

    const endDrag = (event) => {
        if (!isDragging) {
            return;
        }

        isDragging = false;
        heroCuriosity.classList.remove('is-dragging');
        scheduleResume();

        if (event.pointerId !== undefined) {
            try { heroCuriosity.releasePointerCapture(event.pointerId); } catch (_) {}
        }
    };

    heroCuriosity.addEventListener('pointerdown', startDrag);
    heroCuriosity.addEventListener('pointermove', handlePointerMove);
    heroCuriosity.addEventListener('pointerup', endDrag);
    heroCuriosity.addEventListener('pointercancel', endDrag);
    heroCuriosity.addEventListener('lostpointercapture', endDrag);
    heroCuriosity.addEventListener('pointerenter', handleHoverStart);
    heroCuriosity.addEventListener('pointerleave', handleHoverEnd);
}

// ===== PRELOAD ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Animate hero text on page load
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'slideInLeft 0.8s ease';
    }

    initHeroCubeInteraction();
});

// ===== PORTFOLIO MODALS =====
document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const modalLinks = document.querySelectorAll('.portfolio-link[data-modal]');
    const modals = document.querySelectorAll('.portfolio-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Open modal when clicking portfolio links
    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = link.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.portfolio-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    });
    
    // Close modal when clicking outside modal content
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
});

// ===== COOKIE MANAGEMENT =====
class CookieManager {
    constructor() {
        this.cookieName = 'portfolio_cookie_consent';
        this.cookieExpiry = 365; // days
        this.init();
    }
    
    init() {
        // Check if user has already made a choice
        const existingConsent = this.getCookie(this.cookieName);
        const banner = document.getElementById('cookie-banner');
        const modal = document.getElementById('cookie-modal');
        
        if (!existingConsent) {
            // Show banner if no previous consent
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000);
        } else {
            // Load saved preferences
            this.loadSavedPreferences();
        }
        
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        // Banner buttons
        document.getElementById('cookie-accept')?.addEventListener('click', () => {
            this.acceptAllCookies();
        });
        
        document.getElementById('cookie-reject')?.addEventListener('click', () => {
            this.rejectAllCookies();
        });
        
        document.getElementById('cookie-settings')?.addEventListener('click', () => {
            this.openSettings();
        });
        
        // Modal buttons
        document.getElementById('cookie-modal-save')?.addEventListener('click', () => {
            this.saveSettings();
        });
        
        document.getElementById('cookie-modal-reject')?.addEventListener('click', () => {
            this.rejectAllCookies();
        });
        
        document.querySelector('.cookie-modal-close')?.addEventListener('click', () => {
            this.closeSettings();
        });
        
        // Close modal when clicking outside
        document.getElementById('cookie-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'cookie-modal') {
                this.closeSettings();
            }
        });
    }
    
    acceptAllCookies() {
        const preferences = {
            essential: true,
            analytics: true,
            marketing: true,
            date: new Date().toISOString()
        };
        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieExpiry);
        this.hideBanner();
        this.loadAnalytics();
    }
    
    rejectAllCookies() {
        const preferences = {
            essential: true,
            analytics: false,
            marketing: false,
            date: new Date().toISOString()
        };
        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieExpiry);
        this.hideBanner();
        this.closeSettings();
    }
    
    saveSettings() {
        const preferences = {
            essential: true, // Always true
            analytics: document.getElementById('cookie-analytics').checked,
            marketing: document.getElementById('cookie-marketing').checked,
            date: new Date().toISOString()
        };
        this.setCookie(this.cookieName, JSON.stringify(preferences), this.cookieExpiry);
        this.hideBanner();
        this.closeSettings();
        
        // Load analytics if accepted
        if (preferences.analytics) {
            this.loadAnalytics();
        }
    }
    
    openSettings() {
        const modal = document.getElementById('cookie-modal');
        modal.classList.add('show');
        this.updateCheckboxes();
    }
    
    closeSettings() {
        const modal = document.getElementById('cookie-modal');
        modal.classList.remove('show');
    }
    
    updateCheckboxes() {
        const consent = this.getCookieObject(this.cookieName);
        if (consent) {
            document.getElementById('cookie-analytics').checked = consent.analytics || false;
            document.getElementById('cookie-marketing').checked = consent.marketing || false;
        }
    }
    
    loadSavedPreferences() {
        const consent = this.getCookieObject(this.cookieName);
        if (consent && consent.analytics) {
            this.loadAnalytics();
        }
    }
    
    loadAnalytics() {
        // Example: Google Analytics
        // Uncomment and replace with your Google Analytics ID
        /*
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'YOUR_GA_ID');
        
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID';
        document.head.appendChild(script);
        */
        console.log('Analytics cookies enabled');
    }
    
    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }
    
    setCookie(name, value, expiryDays) {
        const date = new Date();
        date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + date.toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/';
    }
    
    getCookie(name) {
        const nameEQ = name + '=';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    }
    
    getCookieObject(name) {
        const cookie = this.getCookie(name);
        try {
            return cookie ? JSON.parse(cookie) : null;
        } catch (e) {
            return null;
        }
    }
}

// Initialize cookie manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CookieManager();
    });
} else {
    new CookieManager();
}

const translations = {
    da: {
        'nav.home': 'Hjem',
        'nav.about': 'Om mig',
        'nav.cv': 'CV',
        'nav.portfolio': 'Portfolio',
        'nav.contact': 'Kontakt',
        'hero.greeting': 'Hej,',
        'hero.intro': 'jeg er',
        'hero.subtitle': 'Marketing & Kommunikationschef med erfaring i brand strategy, content création og digital transformation',
        'hero.traitStrategic': 'Strategisk',
        'hero.traitCreative': 'Kreativ',
        'hero.traitCurious': 'Nysgerrig',
        'hero.traitRelational': 'Relationsstærk',
        'hero.traitInternational': 'International',
        'hero.traitDriven': 'Handlekraftig',
        'hero.curiosity': 'Flere sider af mig, samlet i ét blik.',
        'hero.dragHint': 'Klik og træk',
        'hero.ctaWork': 'Se mit arbejde',
        'hero.ctaContact': 'Lad os tale',
        'about.title': 'Om mig',
        'about.p1': 'Jeg er en erfaren marketing- og kommunikationschef specialiseret i strategisk kommunikation, content creation og digital transformation. Med en master i Global Marketing Management og flere års erfaring som marketing lead hos internationale virksomheder, har jeg demonstreret evnen til at skabe målrettede kampagner, der driver resultater.',
        'about.p2': 'Mit fokus ligger på at kombinere kreativ storytelling med datadriven strategi. Jeg har erfaring med alt fra brand development og social media strategi til event management og multimedia content production. Med flydende dansk og engelsk samt fluent sprog kompetencer, navigerer jeg nemt i internationale projekter.',
        'about.skillsTitle': 'Kernekompetencer',
        'cv.title': 'CV & Erfaring',
        'cv.experience': 'Arbejdserfaring',
        'cv.education': 'Uddannelse',
        'cv.download': 'Download fuldt CV',
        'portfolio.title': 'Mit Portfolio',
        'portfolio.subtitle': 'Udvalgte projekter der viser mit arbejde inden for marketing og kommunikation',
        'portfolio.project1.title': 'E-bog Projekt',
        'portfolio.project1.category': 'Content Creation • Design',
        'portfolio.project1.description': 'Udvikling og produktion af professionel e-bog med layout, copywriting og graphic design.',
        'portfolio.project1.cta': 'Se case study →',
        'portfolio.project2.title': 'April Fools Campaign',
        'portfolio.project2.category': 'Creative Campaign • Social Media',
        'portfolio.project2.description': 'Kreativ og sjov kampagne der kombinerer humor med professionel branding. Viste virksomhedens personlighed.',
        'portfolio.project2.cta': 'Se case study →',
        'portfolio.project3.title': 'Sponsor Brochure',
        'portfolio.project3.category': 'Design • Marketing Materials',
        'portfolio.project3.description': 'Professionel sponsor brochure med visuelt attraktiv design og overbevisende copy der kommunikerer værdipropositionen.',
        'portfolio.project3.cta': 'Se case study →',
        'portfolio.project4.title': 'Skoleløbet - School Run Kampagne',
        'portfolio.project4.category': 'Event • Campaign • Fundraising',
        'portfolio.project4.description': 'Ledelse af "Skoleløbet" kampagne. Udvikling af alt marketingmateriale og strategi for en stor event der indsamlede betydelige midler.',
        'portfolio.project4.cta': 'Se case study →',
        'portfolio.project5.title': 'Conference Materials',
        'portfolio.project5.category': 'Design • Marketing Materials',
        'portfolio.project5.description': 'Udvikling af professionelle one-pagers og konferencematerialer. Fokus på visuel kommunikation og branding consistency.',
        'portfolio.project5.cta': 'Se case study →',
        'portfolio.project6.title': 'Award & Medals Design',
        'portfolio.project6.category': 'Design • Creative',
        'portfolio.project6.description': 'Design og produktion af guldmedaljeunikatser til award-begivenhed. Kombinerer æstetik med funktion.',
        'portfolio.project6.cta': 'Se case study →',
        'contact.title': 'Lad os tale',
        'contact.subtitle': 'Interesseret i at arbejde sammen? Jeg glæder mig til at høre fra dig',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Telefon',
        'contact.socialTitle': 'Sociale medier',
        'contact.namePlaceholder': 'Dit navn',
        'contact.emailPlaceholder': 'Din email',
        'contact.messagePlaceholder': 'Din besked',
        'contact.submit': 'Send besked',
        'footer.text': '© 2026 Linnea Berg Ingwersen. Alle rettigheder forbeholdt.',
        'cookie.bannerTitle': '🍪 Cookies og privatlivs',
        'cookie.bannerText': 'Vi bruger cookies til at forbedre din oplevelse på vores hjemmeside. Nogle er essentielle for at hjemmesiden fungerer, mens andre hjælper os med at forstå, hvordan du bruger siden.',
        'cookie.essentialTitle': 'Essentielle cookies:',
        'cookie.essentialText': 'Påkrævet for at hjemmesiden fungerer',
        'cookie.analyticsTitle': 'Analytics cookies:',
        'cookie.analyticsText': 'Hjælper os med at forstå brugeradfærd (valgfrit)',
        'cookie.btnReject': 'Afvis alle',
        'cookie.btnSettings': 'Indstillinger',
        'cookie.btnAccept': 'Accepter alle',
        'cookie.modalTitle': 'Cookie indstillinger',
        'cookie.modalText': 'Vælg hvilke cookies du giver tilladelse til:',
        'cookie.required': '(Påkrævet)',
        'cookie.essentialDesc': 'Nødvendige for at hjemmesiden fungerer korrekt. Disse kan ikke deaktiveres.',
        'cookie.analyticsDesc': 'Hjælper os med at forstå hvordan du bruger hjemmesiden, så vi kan forbedre den.',
        'cookie.marketingTitle': 'Marketing cookies',
        'cookie.marketingDesc': 'Bruges til at vise relevante annoncer og holde styr på markedsføringskampagner.',
        'cookie.optional': '(Valgfrit)',
        'cookie.saveBtn': 'Gem indstillinger',
        'cookie.modalReject': 'Afvis alle',
        'cookie.policyLink': 'Læs vores privatlivspolitik'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.cv': 'CV',
        'nav.portfolio': 'Portfolio',
        'nav.contact': 'Contact',
        'hero.greeting': 'Hi,',
        'hero.intro': 'I am',
        'hero.subtitle': 'Marketing & Communications Manager with experience in brand strategy, content creation and digital transformation',
        'hero.traitStrategic': 'Strategic',
        'hero.traitCreative': 'Creative',
        'hero.traitCurious': 'Curious',
        'hero.traitRelational': 'People-first',
        'hero.traitInternational': 'International',
        'hero.traitDriven': 'Hands-on',
        'hero.curiosity': 'More sides of me, gathered in one glance.',
        'hero.dragHint': 'Click and drag',
        'hero.ctaWork': 'View my work',
        'hero.ctaContact': 'Let’s talk',
        'about.title': 'About me',
        'about.p1': 'I am an experienced marketing and communications manager specialized in strategic communication, content creation and digital transformation. With a Master in Global Marketing Management and several years as a marketing lead at international companies, I have proven my ability to create targeted campaigns that deliver results.',
        'about.p2': 'My focus is on combining creative storytelling with data-driven strategy. I have experience ranging from brand development and social media strategy to event management and multimedia content production. With fluent Danish and English language skills, I navigate international projects easily.',
        'about.skillsTitle': 'Core skills',
        'cv.title': 'CV & Experience',
        'cv.experience': 'Work Experience',
        'cv.education': 'Education',
        'cv.download': 'Download full CV',
        'portfolio.title': 'My Portfolio',
        'portfolio.subtitle': 'Selected projects that show my work in marketing and communications',
        'portfolio.project1.title': 'E-book Project',
        'portfolio.project1.category': 'Content Creation • Design',
        'portfolio.project1.description': 'Development and production of a professional e-book with layout, copywriting and graphic design.',
        'portfolio.project1.cta': 'View case study →',
        'portfolio.project2.title': 'April Fools Campaign',
        'portfolio.project2.category': 'Creative Campaign • Social Media',
        'portfolio.project2.description': 'Creative and playful campaign combining humor with professional branding. Showed the company’s personality.',
        'portfolio.project2.cta': 'View case study →',
        'portfolio.project3.title': 'Sponsor Brochure',
        'portfolio.project3.category': 'Design • Marketing Materials',
        'portfolio.project3.description': 'Professional sponsor brochure with visually attractive design and persuasive copy that communicates the value proposition.',
        'portfolio.project3.cta': 'View case study →',
        'portfolio.project4.title': 'Skoleløbet - School Run Campaign',
        'portfolio.project4.category': 'Event • Campaign • Fundraising',
        'portfolio.project4.description': 'Managed the Skoleløbet campaign including visual identity, marketing material development and fundraising support.',
        'portfolio.project4.cta': 'View case study →',
        'portfolio.project5.title': 'Conference Materials',
        'portfolio.project5.category': 'Design • Marketing Materials',
        'portfolio.project5.description': 'Development of professional one-pagers and conference materials with a strong focus on visual communication and branding consistency.',
        'portfolio.project5.cta': 'View case study →',
        'portfolio.project6.title': 'Award & Medals Design',
        'portfolio.project6.category': 'Design • Creative',
        'portfolio.project6.description': 'Design and production of gold medal concepts for an awards event, combining aesthetic value with functional craftsmanship.',
        'portfolio.project6.cta': 'View case study →',
        'contact.title': 'Let’s talk',
        'contact.subtitle': 'Interested in working together? I look forward to hearing from you',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Phone',
        'contact.socialTitle': 'Social media',
        'contact.namePlaceholder': 'Your name',
        'contact.emailPlaceholder': 'Your email',
        'contact.messagePlaceholder': 'Your message',
        'contact.submit': 'Send message',
        'footer.text': '© 2026 Linnea Berg Ingwersen. All rights reserved.',
        'cookie.bannerTitle': '🍪 Cookies & privacy',
        'cookie.bannerText': 'We use cookies to improve your experience on our website. Some are essential for the site to work, while others help us understand how you use the site.',
        'cookie.essentialTitle': 'Essential cookies:',
        'cookie.essentialText': 'Required for the site to function',
        'cookie.analyticsTitle': 'Analytics cookies:',
        'cookie.analyticsText': 'Help us understand user behavior (optional)',
        'cookie.btnReject': 'Reject all',
        'cookie.btnSettings': 'Settings',
        'cookie.btnAccept': 'Accept all',
        'cookie.modalTitle': 'Cookie settings',
        'cookie.modalText': 'Choose which cookies you allow:',
        'cookie.required': '(Required)',
        'cookie.essentialDesc': 'Necessary for the website to function correctly. These cannot be disabled.',
        'cookie.analyticsDesc': 'Help us understand how you use the website so we can improve it.',
        'cookie.marketingTitle': 'Marketing cookies',
        'cookie.marketingDesc': 'Used to show relevant ads and manage marketing campaigns.',
        'cookie.optional': '(Optional)',
        'cookie.saveBtn': 'Save settings',
        'cookie.modalReject': 'Reject all',
        'cookie.policyLink': 'Read our privacy policy'
    }
};

const languageButtons = document.querySelectorAll('.lang-btn');
const translateElements = document.querySelectorAll('[data-i18n]');
const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');

function translatePage(lang) {
    const translationSet = translations[lang] || translations.da;

    translateElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translationSet[key];
        if (translation) {
            el.textContent = translation;
        }
    });

    placeholderElements.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = translationSet[key];
        if (translation) {
            el.placeholder = translation;
        }
    });

    languageButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
}

languageButtons.forEach(button => {
    button.addEventListener('click', () => {
        translatePage(button.dataset.lang);

        if (navMenu.classList.contains('active')) {
            setMobileMenuState(false);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'da';
    translatePage(savedLanguage);
});

console.log('Portfolio website initialized successfully!');
