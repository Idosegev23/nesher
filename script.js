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
        });
    });

    // סגירת המודל בלחיצה מחוץ לתוכן
    window.addEventListener('click', (event) => {
        if (event.target === formModal) {
            formModal.style.display = 'none';
            document.body.style.overflow = 'auto';
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

        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'שולח...';

        const formData = {
            fullName: document.getElementById('fullName').value,
            position: document.getElementById('position').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
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