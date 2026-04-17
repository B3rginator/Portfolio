# Portfolio Website Template

En kreativ og professionel portfolio-hjemmeside lavet med HTML, CSS og JavaScript. Perfekt til marketing- og kommunikationschefer.

## 🎨 Features

- **Responsiv Design** - Fungerer perfekt på desktop, tablet og mobil
- **Smooth Animations** - Elegant transitions og fade-in effekter
- **Kreativt Design** - Playful elementer med professionel udtryk
- **Mobile Menu** - Hamburger menu til mindre skærme
- **Optimeret Performance** - Hurtigt og effektivt
- **Scroll Animations** - Elementer animeres når de kommer i view
- **Contact Form** - Integreret kontaktformular

## 📁 Filstruktur

```
Portfolio/
├── index.html       # Hovedside med al strukturen
├── styles.css       # Alle stilarter og animations
├── script.js        # JavaScript interaktivitet
└── README.md       # Denne fil
```

## 🚀 Hurtig Start

1. **Åbn `index.html`** i din browser eller upload filerne til din hosting
2. **Tilpas indholdet:**
   - Erstat "Dit Navn" med dit rigtige navn
   - Opdater dit email og telefon nummer
   - Tilføj dine rigtige projekter

## ✏️ Vigtige Tilpasninger

### 1. Personlig Information (index.html)
```html
<!-- Linje 16 - Logo -->
<span class="logo-text">DN</span>  <!-- Ændr til dine initialer -->

<!-- Linje 44 - Hero sektion -->
<span class="word highlight">Dit Navn</span>  <!-- Dit navn her -->

<!-- Linje 131 - About sektion -->
<p>Jeg er en erfaren marketing...</p>  <!-- Din personlige intro -->

<!-- Linje 194-224 - CV - Tilføj dine arbejdserfaringer -->
<h4>Din Position</h4>
<p class="cv-company">Din Virksomhed</p>
```

### 2. Portfolio Projekter
Erstat template-projekterne med dine egne:
- **Projektbeskrivelse** - Hvad gjorde du?
- **Resultater** - Konkrete tal og resultater
- **Tags** - Relevante kompetencer brugt
- **Billeder** - Tilføj billeder af dine projekter

### 3. Kontakt Information
```html
<!-- Linje 389-398 i index.html -->
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="tel:+4512345678">+45 12 34 56 78</a>
```

### 4. Sociale Medier
```html
<a href="https://www.linkedin.com/in/yourprofile/">LinkedIn</a>
<a href="https://twitter.com/yourprofile">Twitter</a>
<a href="https://www.instagram.com/yourprofile">Instagram</a>
```

## 🖼️ Tilføjelse af Billeder

Erstat placeholder billeder:
```html
<!-- I stedet for -->
<div class="image-placeholder">Dit profilbillede</div>

<!-- Brug -->
<img src="path/to/your-image.jpg" alt="Profilbillede">
```

## 🎨 Farvepalette

Du kan tilpasse farverne i `styles.css` ved at ændre CSS variables:

```css
:root {
    --primary-color: #7A1616;      /* Mørkerød/Primær */
    --secondary-color: #DFA5B1;    /* Lyserød/Sekundær */
    --accent-color: #7A1616;       /* Mørkerød/Accent */
    --dark-color: #2D3436;         /* Mørkegrå */
    --light-color: #F5F6FA;        /* Lys grå */
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 769px - 1199px
- **Mobile**: 320px - 768px

## ⚙️ Formular Integration

For at få emails fra kontaktformularen, kan du:

### Option 1: Emailjs (Gratis, nemt)
```javascript
// 1. Tilmeld på emailjs.com
// 2. Installer EmailJS SDK
// 3. Opdater script.js med dine API nøgler
```

### Option 2: Formspree
```html
<!-- Ændr form action i index.html -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
```

### Option 3: Backend Service
Byg en simpel backend som modtager POST requests fra formen.

## 🔧 Customization Tips

### Ændre Font
```css
body {
    font-family: 'Din Font her', sans-serif;
}
```

### Ændre Animationshastighed
```css
--transition: all 0.3s ease;  /* Ændr 0.3s til f.eks. 0.5s */
```

### Deaktivér Parallax Effect
Kommentér denne sektion i `script.js`:
```javascript
// window.addEventListener('scroll', () => { ... })
```

## 📊 SEO Optimering

Opdater meta tags i `index.html`:
```html
<meta name="description" content="Portfolio af [Dit Navn] - Marketing & Kommunikationschef">
<meta name="keywords" content="marketing, portfolio, kommunikation">
<meta property="og:title" content="[Dit Navn] - Portfolio">
```

## 🌐 Deployment

### GitHub Pages (Gratis)
1. Upload filer til GitHub repo
2. Gå til Settings → Pages
3. Vælg "Deploy from a branch"
4. Dit site er live på `yourusername.github.io`

### Andre Hosting
- Netlify
- Vercel
- 000webhost
- Bluehost

## 🐛 Troubleshooting

**Menu lukker ikke på mobil?**
- Kontroller at `script.js` er loaded
- Check browser console for fejl

**Animationer virker ikke?**
- Kontroller at CSS `animation` properties ikke overskrives
- Tjek browser support for CSS animations

**Formularen sender ikke?**
- Implementér formspree eller emailjs
- Kontroller form action URL

## 📞 Support

Hvis du har spørgsmål:
1. Tjek kommentarer i koden
2. Se CSS variables til styling
3. Kontroller JavaScript funktioner i script.js

## 📝 Changelog

### Version 1.0
- Initial template
- 6 portfolio projekter
- Responsiv design
- Alle basis funktionaliteter

## 📄 Licens

Du kan frit bruge og tilpasse denne template til dine behov.

---

**Lykke til med dit portfolio! 🚀**
