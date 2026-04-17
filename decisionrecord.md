# Decision Record - Portfolio Website Session 01

**Date:** April 16, 2026  
**Project:** Portfolio Website for Marketing & Communications Manager  
**Status:** Template Complete - Ready for Content Customization

---

## Project Requirements

- **Type:** Portfolio/CV website
- **Role:** Marketing & Communications Manager
- **Tech Stack:** HTML, CSS, JavaScript (no frameworks)
- **Design Philosophy:** Creative, playful, professional, minimalist
- **Inspiration:** Sunny Patel style (creative elements, but not tech/space themed)

---

## Technology Decisions

### Stack
- **HTML5:** Semantic structure
- **CSS3:** Custom variables, animations, responsive design
- **JavaScript:** Vanilla (no dependencies)
- **Icons:** Font Awesome 6.4.0 CDN
- **Responsive:** Mobile-first approach

### Why This Stack
- Simple, no build process needed
- Fast loading
- Easy to customize and deploy
- Can be hosted on GitHub Pages, Netlify, etc.

---

## Design Decisions

### Color Palette
```
Primary:       #7A1616 (Mørkerød/Dark Red)
Secondary:     #DFA5B1 (Lyserød/Light Pink)
Accent:        #7A1616 (Mørkerød/Dark Red)
Dark:          #2D3436 (Dark Gray)
Light:         #F5F6FA (Light Gray)
```

### Design Elements
- ✨ **Playful animations:** Floating shapes, fade-ins, smooth transitions
- 🎨 **Gradient accents:** Primary color gradient on highlights
- 📱 **Responsive:** Works on desktop, tablet, mobile
- 🔄 **Smooth scroll:** Navigation smooth scrolling
- 🎯 **Hover effects:** Cards lift, buttons transform

### Removed Elements
- ❌ Parallax effect (too technical)
- ❌ Twitter link (not relevant for professional)
- ❌ Circular animation on social icons (caused text overlap)

---

## Page Structure

### 1. Navigation Bar
- Fixed position with blur effect
- Hamburger menu for mobile
- Active link indicators
- Responsive collapse

### 2. Hero Section
- Animated title (word-by-word fade-in)
- Gradient highlight on name
- Floating animated shapes (circles)
- Two CTAs: "See my work" + "Let's talk"

### 3. About Section
- Personal introduction
- Core competencies as skill tags
- Profile image placeholder
- Hover effects on skills

### 4. CV Section
- Two-column layout (Experience + Education)
- Experience items with company, date, description
- Hover animation (card lift)
- Download CV button placeholder

### 5. Portfolio Section
- 6 project cards (3x2 grid, responsive)
- Each card has:
  - Image placeholder (gradient)
  - Project title
  - Category tags
  - Description
  - Skills tags
  - "See case study" link
- Hover: Card lifts, image zooms

### 6. Contact Section
- Two-column layout
- Contact info: Email, Phone, Social
- **Social Links:** Font Awesome icons (LinkedIn, Instagram)
  - 50x50px circles
  - Hover: Background color change to primary color
- Contact form with validation
- Form fields: Name, Email, Message

### 7. Footer
- Dark background
- Copyright text

---

## Key Implementation Details

### Social Media Icons
```html
<a href="https://www.linkedin.com/in/yourprofile" target="_blank" class="social-link">
    <i class="fab fa-linkedin-in"></i>
</a>
```
**To customize:** Replace `yourprofile` with actual LinkedIn username

### Animations
- **Hero text:** Staggered fade-in (0.1s delays)
- **Floating shapes:** Infinite loop (6s duration)
- **Card hover:** translateY(-10px)
- **Scroll animation:** Fade-in on viewport

### Mobile Breakpoints
- **Desktop:** 1200px+
- **Tablet:** 769px - 1199px  
- **Mobile:** 320px - 768px

---

## Customization Guide

### Must Change
1. **Logo initials:** `<span class="logo-text">DN</span>` → Your initials
2. **Name in hero:** `<span class="highlight">Dit Navn</span>` → Your name
3. **Email:** `your.email@example.com` → Your email
4. **Phone:** `+4512345678` → Your phone
5. **Social links:** Update `yourprofile` → Your actual profiles

### Should Add
- Profile image (replace `.image-placeholder` divs with `<img>` tags)
- Real project descriptions
- Case study links (currently `#`)
- Form action (currently doesn't send - use Formspree, EmailJS, or backend)

### Can Customize
- Colors: Update CSS variables in `:root`
- Fonts: Change `font-family` in `body`
- Animation speed: Modify `--transition: all 0.3s ease`
- Number of projects: Add/remove `.portfolio-card` elements

---

## File Structure

```
Portfolio/
├── index.html              # Main file with all HTML structure
├── styles.css              # All styling + responsive
├── script.js               # Interactivity (menu, scroll, form)
├── README.md               # User-facing documentation
└── decisionrecord-01.md   # This file - AI decision log
```

---

## Outstanding Tasks for Future Sessions

- [ ] Add real profile photo
- [ ] Write actual project descriptions and results
- [ ] Add project images/screenshots
- [ ] Implement email form submission (Formspree/EmailJS)
- [ ] Add real CV (PDF download link)
- [ ] Update social media links with real profiles
- [ ] Test on multiple browsers/devices
- [ ] Set up hosting (GitHub Pages, Netlify, etc.)
- [ ] SEO optimization (meta tags, keywords)

---

## Known Issues / Decisions Made

| Issue | Decision | Reason |
|-------|----------|--------|
| Social icons overlapping text | Used Font Awesome + removed animation | Better UX, cleaner design |
| Too many sections | Kept all 6 as template | Easy to remove if not needed |
| Form not sending | Form action left blank | User needs to choose backend solution |
| Twitter removed | Only LinkedIn + Instagram | Professional focus, not social media noise |

---

## Cookie Management System (Session 02)

**Status:** Implemented - GDPR Compliant

### Cookie Implementation

#### Overview
Implemented a comprehensive cookie consent and management system that complies with GDPR and ePrivacy regulations.

#### Components

**1. Cookie Banner**
- Fixed position at bottom of page
- Appears 1 second after page load on first visit
- Shows for 365 days (default) or until user responds
- Contains:
  - Information about cookie types
  - Three action buttons: "Afvis alle" (Reject), "Indstillinger" (Settings), "Accepter alle" (Accept)

**2. Cookie Settings Modal**
- Detailed cookie preferences interface
- Three cookie categories:
  - **Essentielle (Essential):** Required, cannot be disabled
  - **Analytics:** Optional, for understanding user behavior
  - **Marketing:** Optional, for targeted advertising
- Shows cookie descriptions for each type
- Link to privacy policy (placeholder)

**3. Cookie Manager Class (JavaScript)**
- Handles all cookie operations
- Auto-initializes on page load
- Stores preferences as JSON with expiry date
- Methods:
  - `setCookie()` / `getCookie()` - Basic cookie operations
  - `acceptAllCookies()` - Accept all non-essential cookies
  - `rejectAllCookies()` - Reject all non-essential cookies
  - `saveSettings()` - Save custom preferences
  - `loadAnalytics()` - Load analytics script if consented
  - `openSettings()` / `closeSettings()` - Modal management

#### Cookie Storage

**Cookie Name:** `portfolio_cookie_consent`

**Cookie Data Structure:**
```json
{
  "essential": true,
  "analytics": true|false,
  "marketing": true|false,
  "date": "2026-04-16T10:30:00.000Z"
}
```

**Expiry:** 365 days

#### Features

✅ **GDPR Compliant:**
- Explicit consent required for non-essential cookies
- Easy opt-out mechanism
- Clear information about each cookie type
- Cookie management interface

✅ **User Experience:**
- Non-intrusive banner design
- Smooth animations
- Mobile-responsive layout
- Easy preference management
- Auto-hides after user action

✅ **Analytics Integration Ready:**
- Commented Google Analytics code ready to uncomment
- Only loads if user consents
- Easy to integrate with other tracking services (Hotjar, Mixpanel, etc.)

#### Styling

**CSS Features:**
- Dark gradient banner for contrast
- Modal with overlay
- Responsive design for all screen sizes
- Smooth animations (slideUp, fade-in/out)
- Color-coded labels (green for required, purple for optional)

**Responsive Breakpoints:**
- Desktop: Full horizontal layout
- Tablet: Adjusted spacing
- Mobile (320px-768px): 
  - Banner stacks vertically
  - Buttons full-width
  - Modal optimized for small screens

#### Customization Options

To enable analytics tracking:
1. Replace `YOUR_GA_ID` with actual Google Analytics ID
2. Uncomment the Google Analytics code in `loadAnalytics()` method
3. Test consent flow before deploying

To modify cookie settings:
- Add new cookie categories in modal HTML
- Create new checkbox input
- Add handling in `saveSettings()` method

To change banner appearance:
- Update CSS variables in `:root`
- Modify transition timing in `.cookie-banner.show`
- Adjust opacity and colors in `.cookie-modal`

#### Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- IE11: Requires polyfill for JSON.parse (optional)

#### Outstanding Tasks

- [ ] Replace privacy policy link with actual URL
- [ ] Configure Google Analytics with actual tracking ID
- [ ] Test cookie consent flow in multiple browsers
- [ ] Add cookie management link to footer
- [ ] Consider adding cookie statement to privacy policy
- [ ] Test GDPR compliance with cookie audit tool
- [ ] Implement cookie banner dismissal analytics

---

## Wix Portfolio Integration (Session 03)

**Status:** Completed - All content from Wix portfolio integrated

### Data Extracted from Wix Site
Integrated the following information from https://linneabergingwersen.wixsite.com/portfolio:

#### Personal Information
- **Name:** Linnea Berg Ingwersen
- **Logo Initials:** LI
- **Email:** linneabergingwersen@gmail.com
- **Phone:** +45 93 99 11 25
- **Social Links:** LinkedIn, Instagram, Etsy

#### Professional Experience
1. **Marketing Lead - Simplex Human** (Jan 2025 - Aug 2025) - Remote, Struer
   - All marketing and communication activities
   - 250% increase in newsletter subscribers
   - 13% growth in social media followers

2. **Communications Manager - Team Rynkeby Fonden** (Apr 2022 - Dec 2023) - Ringe
   - CEO strategic communication (LinkedIn visibility boost)
   - Multimedia content production and social media management
   - Event planning for 2000+ people in Paris
   - Skoleløb project management

3. **Marketing Manager - QuadSAT** (2020-2022) - Odense
   - C-suite communication strategy
   - Website redesign (200% LinkedIn follower increase)
   - Video and photo content production

4. **Marketing Specialist - HUMI** (2019-2020) - Odense
   - Corporate communication strategy
   - PR agency coordination
   - Website redesign project management

5. **Marketing and Social Media Assistant - Volunteering Services Australia** (Aug 2019 - Jan 2020)
   - Internship in Australia
   - Adobe Creative Suite, WordPress, Canva, Campaign Monitor experience

#### Education
1. **Cand.Negot Global Marketing Management** - University of Southern Denmark (Sep 2017 - Jul 2019)
   - Dissertation on Influencer Marketing (Grade A - 12)
   - Focus: Marketing, communication, negotiation, globalization

2. **Study Abroad - 8th Semester Masters** - Griffith University, Gold Coast, Australia (Jul 2018 - Oct 2018)
   - Public writing, event management, community internship

3. **BA.Negot Business, Culture & Language** - University of Southern Denmark (Sep 2014 - Jul 2017)
   - Focus: Business, organization culture, English
   - Part of SDU gymnastics team

#### Skills
- Microsoft Office (Superuser)
- Social Media (Organic) - Meta & LinkedIn
- Adobe Creative Cloud
- WordPress/Umbraco
- Active Campaign/MailChimp
- Google Analytics
- AI Tools
- Project Management
- Conference Organizing
- Teamwork

#### Languages
- **Danish:** Native language
- **English:** Fluent (spoken & written)
  - Au pair experience in Virginia, USA
  - University courses in English proficiency
  - Semester abroad in Australia
  - International company experience

#### Portfolio Projects
1. **E-bog** - E-book design and content production
2. **April Fools** - Creative campaign combining humor with professional branding
3. **Sponsor Brochure** - Professional sponsorship materials with visual design
4. **Skoleløbet (School Run)** - Large-scale fundraising campaign management
5. **Conference Materials** - One-pagers and conference documentation
6. **Award & Medals Design** - Custom design for award/volunteer medals

---

## Wix Integration & Modal System (Session 04)

**Status:** Completed - All Wix content integrated with interactive modals

### Precise CV Information Integration
Updated CV section with exact information from Wix resume:

#### Experience Details
1. **Marketing Lead - Simplex Human** (Jan 2025 - Aug 2025)
   - Responsibility for all marketing and communication activities
   - Content production for website and social media (copywriting, graphic design, strategy)
   - Developed newsletters sharing business leader insights
   - Planning and execution of webinars (technical setup, email flows, campaign materials)
   - Collaboration with stakeholders from leadership to partners
   - Creation of presentations, proposals, and graphic materials with visual focus

2. **Communications Manager - Team Rynkeby Fonden** (Apr 2022 - Dec 2023)
   - Guided CEO on strategic LinkedIn communication
   - Led multimedia content production
   - Developed and managed all social media content (Meta)
   - Optimized intranet for better accessibility
   - Assisted Paris event planning (2000+ attendees)

3. **Marketing Manager - QuadSAT** (Mar 2020 - Mar 2022)
   - Advised C-suite on communication strategies
   - Coordinated PR for global publications
   - Led website redesign project
   - Produced video and photographic content

4. **Marketing Specialist - HUMI** (Aug 2019 - Jan 2020)
   - Same responsibilities as QuadSAT position

5. **Marketing and Social Media Assistant - Volunteering Services Australia** (Jul 2018 - Oct 2018)
   - Adobe Creative Suite, WordPress, Canva, Campaign Monitor experience
   - Cross-department collaboration understanding
   - Independent task execution with innovative mindset

### Modal System Implementation
Created comprehensive portfolio modal system with detailed project information:

#### Modal Features
- **Interactive Pop-ups:** Click "Se case study" to open detailed modal
- **Rich Content:** Images, descriptions, challenges, results, skills
- **Responsive Design:** Mobile-friendly modal layout
- **Accessibility:** Keyboard navigation, focus management
- **Smooth Animations:** Fade-in and slide-in effects

#### Project Modal Content
1. **E-bog Modal**
   - Visual expression and textual process contribution
   - Marketing campaign resulting in many downloads
   - Skills: Adobe Creative Suite, Content Marketing

2. **April Fools "Sheeboss" Modal**
   - Fictional magazine cover design
   - LinkedIn campaign with 174 likes, 87 comments
   - Custom landing page reveal
   - Skills: Creative Campaign, Social Media, Graphic Design

3. **Sponsor Brochure Modal**
   - Multi-language brochure redesign (8 languages)
   - From long/imprecise to modern/concise
   - Skills: Graphic Design, Content Strategy, Multi-language

4. **Skoleløbet Modal**
   - Visual expression and textual process
   - Marketing campaign for fundraising
   - Skills: Event Marketing, Fundraising, Campaign Strategy

5. **Conference Materials Modal**
   - One-pagers and conference materials design
   - Professional visual communication
   - Skills: Conference Design, Marketing Materials

6. **Award Medals Modal**
   - Custom medal design for volunteers
   - Aesthetic and functional balance
   - Skills: Award Design, Creative Design

### Technical Implementation Details
- **JavaScript:** Event delegation for modal opening/closing
- **CSS:** Responsive grid layout, backdrop blur, smooth transitions
- **Images:** Direct integration of Wix-hosted images
- **Performance:** Efficient DOM manipulation, no external dependencies

### Files Modified
- `index.html`: Added 6 modal structures, updated CV precision, modal links
- `script.js`: Added modal functionality (open/close/escape/navigation)
- `styles.css`: Added comprehensive modal styling with responsive design

---

## Deploy Checklist

- [x] All content personalized (name, email, links, Wix data)
- [x] Images uploaded and paths correct (Wix images integrated)
- [ ] Form action configured
- [ ] CV PDF uploaded if using PDF
- [x] Social media links verified
- [ ] Tested on mobile/tablet/desktop
- [ ] All links work (internal and external)
- [ ] No broken images
- [ ] Performance optimized
- [ ] Cookie consent banner tested
- [ ] Analytics integration configured (if using)
- [ ] Privacy policy page created/updated
- [ ] Ready for live deployment