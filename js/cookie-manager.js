// ===== COOKIE MANAGEMENT MODULE =====

export class CookieManager {
    constructor() {
        this.cookieName = 'portfolio_cookie_consent';
        this.cookieExpiry = 365; // days
        this.handleEscapeKey = this.handleEscapeKey.bind(this);
        this.lastFocusedElement = null;
        this.init();
    }

    init() {
        // Check if user has already made a choice
        const existingConsent = this.getCookie(this.cookieName);
        const banner = document.getElementById('cookie-banner');

        if (!banner) {
            return;
        }

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

        document.addEventListener('keydown', this.handleEscapeKey);

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
        this.lastFocusedElement = document.activeElement;
        modal.classList.add('show');
        document.body.classList.add('cookie-modal-open');
        this.updateCheckboxes();

        const closeButton = modal.querySelector('.cookie-modal-close');
        closeButton?.focus();
    }

    closeSettings() {
        const modal = document.getElementById('cookie-modal');
        modal.classList.remove('show');
        document.body.classList.remove('cookie-modal-open');

        if (this.lastFocusedElement instanceof HTMLElement) {
            this.lastFocusedElement.focus();
        }
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
        if (!banner) {
            return;
        }

        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }

    handleEscapeKey(event) {
        if (event.key !== 'Escape') {
            return;
        }

        const modal = document.getElementById('cookie-modal');
        if (modal?.classList.contains('show')) {
            this.closeSettings();
        }
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
