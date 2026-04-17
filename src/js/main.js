// ===== MAIN ENTRY POINT =====

// CSS imports (order matters: variables → base → components → animations → responsive)
import '../css/variables.css';
import '../css/base.css';
import '../css/cookie.css';
import '../css/navbar.css';
import '../css/hero.css';
import '../css/about.css';
import '../css/cv.css';
import '../css/portfolio.css';
import '../css/contact.css';
import '../css/footer.css';
import '../css/modal.css';
import '../css/animations.css';
import '../css/responsive.css';

import { initNavigation } from './navigation.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initHeroCubeInteraction } from './hero-cube.js';
import { initContactForm } from './contact-form.js';
import { initModals } from './modals.js';
import { CookieManager } from './cookie-manager.js';
import { initI18n } from './i18n.js';

// Initialize all modules
// Note: ES modules are deferred by default, so the DOM is already parsed
initNavigation();
initScrollAnimations();
initContactForm();
initHeroCubeInteraction();
initModals();
initI18n();

// Initialize cookie manager
new CookieManager();

// Animate hero text on page load
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.style.animation = 'slideInLeft 0.8s ease';
}

console.log('Portfolio website initialized successfully!');
