document.addEventListener('DOMContentLoaded', () => {
    // אתחול ספריית AOS לאנימציות
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    const formModal = document.getElementById('formModal');
    const successModal = document.getElementById('successModal');
    const openFormBtn = document.getElementById('openFormBtn');
    const closeBtns = document.querySelectorAll('.close');
    const contactForm = document.getElementById('contactForm');

    // פונקציית ולידציה לטופס
    const validateForm = () => {
        const fullName = document.getElementById('fullName').value.trim();
        const position = document.getElementById('position').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // איפוס הודעות שגיאה קודמות
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));

        let isValid = true;

        // בדיקת שם מלא
        if (fullName.length < 2) {
            showError('fullName', 'נא להזין שם מלא תקין');
            isValid = false;
        }

        // בדיקת תפקיד
        if (position.length < 2) {
            showError('position', 'נא להזין תפקיד תקין');
            isValid = false;
        }

        // בדיקת טלפון
        const phoneRegex = /^05\d{8}$|^07\d{8}$|^0\d{8}$/;
        if (!phoneRegex.test(phone)) {
            showError('phone', 'נא להזין מספר טלפון תקין');
            isValid = false;
        }

        // בדיקת אימייל
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'נא להזין כתובת אימייל תקינה');
            isValid = false;
        }

        return isValid;
    };

    // פונקציה להצגת הודעת שגיאה
    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.classList.add('error-input');
        input.parentNode.appendChild(errorDiv);
    };

    // פתיחת המודל של הטופס
    openFormBtn.addEventListener('click', () => {
        formModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // סגירת המודלים
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            formModal.style.display = 'none';
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // ניקוי הודעות שגיאה בעת סגירת הטופס
            document.querySelectorAll('.error-message').forEach(error => error.remove());
            document.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
        });
    });

    // סגירת המודל בלחיצה מחוץ לתוכן
    window.addEventListener('click', (event) => {
        if (event.target === formModal) {
            formModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // ניקוי הודעות שגיאה
            document.querySelectorAll('.error-message').forEach(error => error.remove());
            document.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
        }
        if (event.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // אנימציה לכרטיסי התכונות
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // טיפול בשליחת הטופס
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // בדיקת ולידציה לפני שליחה
        if (!validateForm()) {
            return;
        }

        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'שולח...';

        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            position: document.getElementById('position').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim()
        };

        try {
            const response = await fetch('https://hook.eu2.make.com/fmxpncdup3zxn604re75ydkj7hkjtg30', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                formModal.style.display = 'none';
                successModal.style.display = 'block';
                contactForm.reset();
                // ניקוי הודעות שגיאה
                document.querySelectorAll('.error-message').forEach(error => error.remove());
                document.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
            } else {
                throw new Error('שגיאה בשליחת הטופס');
            }
        } catch (error) {
            console.error('שגיאה:', error);
            alert('אירעה שגיאה בשליחת הטופס. אנא נסו שוב מאוחר יותר.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'שליחה';
        }
    });

    // אנימציה לכפתור ה-CTA
    const ctaButton = document.getElementById('openFormBtn');
    let isHovered = false;

    ctaButton.addEventListener('mouseenter', () => {
        if (!isHovered) {
            isHovered = true;
            ctaButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                if (isHovered) {
                    ctaButton.style.transform = 'scale(1)';
                }
            }, 200);
        }
    });

    ctaButton.addEventListener('mouseleave', () => {
        isHovered = false;
        ctaButton.style.transform = 'scale(1)';
    });
}); 