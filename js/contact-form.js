// ===== CONTACT FORM MODULE =====

export function initContactForm() {
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
}
