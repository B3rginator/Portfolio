// ===== INTERNATIONALIZATION MODULE =====

import { closeMobileMenu } from './navigation.js';

const translations = {
    da: {
        'nav.home': 'Hjem',
        'nav.about': 'Om mig',
        'nav.cv': 'CV',
        'nav.portfolio': 'Portfolio',
        'nav.contact': 'Kontakt',
        'hero.greeting': 'Hej,',
        'hero.intro': 'jeg er',
        'hero.subtitle': 'Omsætter ideér til handling | Kreativ & proaktiv marketing- og kommunikationsspecialist',
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
        'whatIBring.title': 'What I Bring',
        'whatIBring.subtitle': 'Mine styrker ligger i at kombinere ide, struktur og handling, så jeg skaber reel fremdrift og mærkbar værdi.',
        'whatIBring.card1.title': 'Creative thinking with structure',
        'whatIBring.card1.subtitle': 'Ideas are only valuable if they can be executed and scaled.',
        'whatIBring.card2.title': 'End-to-end understanding',
        'whatIBring.card2.subtitle': 'I connect content, website and user journey into one cohesive experience.',
        'whatIBring.card3.title': 'From idea to execution',
        'whatIBring.card3.subtitle': 'I don’t just develop concepts – I build and implement them.',
        'whatIBring.card4.title': 'Fast learner, strong executor',
        'whatIBring.card4.subtitle': 'I quickly adapt to new tools and turn ideas into action.',
        'cv.title': 'CV & Erfaring',
        'cv.experience': 'Arbejdserfaring',
        'cv.education': 'Uddannelse',
        'cv.download': 'Download fuldt CV',
        'portfolio.title': 'Projekter hvor jeg har gjort en forskel',
        'portfolio.subtitle': 'Et udvalg af projekter fra mit portfolio, hvor fokus på forbedring af budskab, arbejde kreativt og struktureret.',
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
        'hero.subtitle': 'Turning ideas into action | Creative & proactive marketing and communication specialist',
        'hero.traitStrategic': 'Strategic',
        'hero.traitCreative': 'Creative',
        'hero.traitCurious': 'Curious',
        'hero.traitRelational': 'People-first',
        'hero.traitInternational': 'International',
        'hero.traitDriven': 'Hands-on',
        'hero.curiosity': 'More sides of me, gathered in one glance.',
        'hero.dragHint': 'Click and drag',
        'hero.ctaWork': 'View my work',
        'hero.ctaContact': 'Let\u2019s talk',
        'about.title': 'About me',
        'about.p1': 'I am an experienced marketing and communications manager specialized in strategic communication, content creation and digital transformation. With a Master in Global Marketing Management and several years as a marketing lead at international companies, I have proven my ability to create targeted campaigns that deliver results.',
        'about.p2': 'My focus is on combining creative storytelling with data-driven strategy. I have experience ranging from brand development and social media strategy to event management and multimedia content production. With fluent Danish and English language skills, I navigate international projects easily.',
        'about.skillsTitle': 'Core skills',
        'whatIBring.title': 'What I Bring',
        'whatIBring.subtitle': 'The strengths, mindset and execution I bring to every project I take on.',
        'whatIBring.card1.title': 'Creative thinking with structure',
        'whatIBring.card1.subtitle': 'Ideas are only valuable if they can be executed and scaled.',
        'whatIBring.card2.title': 'End-to-end understanding',
        'whatIBring.card2.subtitle': 'I connect content, website and user journey into one cohesive experience.',
        'whatIBring.card3.title': 'From idea to execution',
        'whatIBring.card3.subtitle': 'I don’t just develop concepts – I build and implement them.',
        'whatIBring.card4.title': 'Fast learner, strong executor',
        'whatIBring.card4.subtitle': 'I quickly adapt to new tools and turn ideas into action.',
        'cv.title': 'CV & Experience',
        'cv.experience': 'Work Experience',
        'cv.education': 'Education',
        'cv.download': 'Download full CV',
        'portfolio.title': 'Projects where I’ve made a difference',
        'portfolio.subtitle': 'A selection of projects from my portfolio focused on improving the message, working creatively and structured.',
        'portfolio.project1.title': 'E-book Project',
        'portfolio.project1.category': 'Content Creation \u2022 Design',
        'portfolio.project1.description': 'Development and production of a professional e-book with layout, copywriting and graphic design.',
        'portfolio.project1.cta': 'View case study \u2192',
        'portfolio.project2.title': 'April Fools Campaign',
        'portfolio.project2.category': 'Creative Campaign \u2022 Social Media',
        'portfolio.project2.description': 'Creative and playful campaign combining humor with professional branding. Showed the company\u2019s personality.',
        'portfolio.project2.cta': 'View case study \u2192',
        'portfolio.project3.title': 'Sponsor Brochure',
        'portfolio.project3.category': 'Design \u2022 Marketing Materials',
        'portfolio.project3.description': 'Professional sponsor brochure with visually attractive design and persuasive copy that communicates the value proposition.',
        'portfolio.project3.cta': 'View case study \u2192',
        'portfolio.project4.title': 'Skoleløbet - School Run Campaign',
        'portfolio.project4.category': 'Event \u2022 Campaign \u2022 Fundraising',
        'portfolio.project4.description': 'Managed the Skoleløbet campaign including visual identity, marketing material development and fundraising support.',
        'portfolio.project4.cta': 'View case study \u2192',
        'portfolio.project5.title': 'Conference Materials',
        'portfolio.project5.category': 'Design \u2022 Marketing Materials',
        'portfolio.project5.description': 'Development of professional one-pagers and conference materials with a strong focus on visual communication and branding consistency.',
        'portfolio.project5.cta': 'View case study \u2192',
        'portfolio.project6.title': 'Award & Medals Design',
        'portfolio.project6.category': 'Design \u2022 Creative',
        'portfolio.project6.description': 'Design and production of gold medal concepts for an awards event, combining aesthetic value with functional craftsmanship.',
        'portfolio.project6.cta': 'View case study \u2192',
        'contact.title': 'Let\u2019s talk',
        'contact.subtitle': 'Interested in working together? I look forward to hearing from you',
        'contact.emailTitle': 'Email',
        'contact.phoneTitle': 'Phone',
        'contact.socialTitle': 'Social media',
        'contact.namePlaceholder': 'Your name',
        'contact.emailPlaceholder': 'Your email',
        'contact.messagePlaceholder': 'Your message',
        'contact.submit': 'Send message',
        'footer.text': '\u00a9 2026 Linnea Berg Ingwersen. All rights reserved.',
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

function translatePage(lang) {
    const translationSet = translations[lang] || translations.da;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = translationSet[key];
        if (translation) {
            el.textContent = translation;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = translationSet[key];
        if (translation) {
            el.placeholder = translation;
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
}

export function initI18n() {
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            translatePage(button.dataset.lang);
            closeMobileMenu();
        });
    });

    const savedLanguage = localStorage.getItem('preferredLanguage') || 'da';
    translatePage(savedLanguage);
}
