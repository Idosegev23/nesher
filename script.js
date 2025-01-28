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
        clearErrors();

        let isValid = true;

        // בדיקת שם מלא
        if (fullName.length < 2) {
            showError('fullName', 'נא להזין שם מלא (לפחות 2 תווים)');
            isValid = false;
        }

        // בדיקת תפקיד
        if (position.length < 2) {
            showError('position', 'נא להזין תפקיד (לפחות 2 תווים)');
            isValid = false;
        }

        // בדיקת טלפון
        const phoneRegex = /^05\d{8}$|^07\d{8}$|^0\d{8}$/;
        if (!phoneRegex.test(phone)) {
            showError('phone', 'נא להזין מספר טלפון נייד תקין (10 ספרות)');
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

    // פונקציה לניקוי שגיאות
    const clearErrors = () => {
        document.querySelectorAll('.error-message').forEach(error => error.remove());
        document.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
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

    // הוספת ולידציה בזמן אמת לכל השדות
    const inputs = ['fullName', 'position', 'phone', 'email'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('input', () => {
            // מחיקת הודעת שגיאה קודמת לשדה הנוכחי
            const currentError = input.parentNode.querySelector('.error-message');
            if (currentError) {
                currentError.remove();
            }
            input.classList.remove('error-input');
            
            // בדיקת תקינות השדה
            switch(inputId) {
                case 'fullName':
                    if (input.value.trim().length < 2) {
                        showError(inputId, 'נא להזין שם מלא (לפחות 2 תווים)');
                    }
                    break;
                case 'position':
                    if (input.value.trim().length < 2) {
                        showError(inputId, 'נא להזין תפקיד (לפחות 2 תווים)');
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^05\d{8}$|^07\d{8}$|^0\d{8}$/;
                    if (!phoneRegex.test(input.value.trim())) {
                        showError(inputId, 'נא להזין מספר טלפון נייד תקין (10 ספרות)');
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        showError(inputId, 'נא להזין כתובת אימייל תקינה');
                    }
                    break;
            }
        });

        // ניקוי שגיאה בעת מיקוד על השדה
        input.addEventListener('focus', () => {
            const currentError = input.parentNode.querySelector('.error-message');
            if (currentError) {
                currentError.remove();
            }
            input.classList.remove('error-input');
        });
    });

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

    // טיפול בטאבים
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const privateContactForm = document.getElementById('privateContactForm');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // הסרת הקלאס active מכל הכפתורים
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // הוספת הקלאס active לכפתור הנוכחי
            button.classList.add('active');

            // הסתרת כל התוכן
            tabContents.forEach(content => content.style.display = 'none');
            // הצגת התוכן המתאים
            document.getElementById(`${button.dataset.tab}Tab`).style.display = 'block';

            // ניקוי שגיאות
            clearErrors();
        });
    });

    // ולידציה לטופס הדרכה פרטנית
    const validatePrivateForm = () => {
        const fullName = document.getElementById('privateFullName').value.trim();
        const position = document.getElementById('privatePosition').value.trim();
        const phone = document.getElementById('privatePhone').value.trim();
        const email = document.getElementById('privateEmail').value.trim();
        
        clearErrors();

        let isValid = true;

        if (fullName.length < 2) {
            showError('privateFullName', 'נא להזין שם מלא (לפחות 2 תווים)');
            isValid = false;
        }

        if (position.length < 2) {
            showError('privatePosition', 'נא להזין תפקיד (לפחות 2 תווים)');
            isValid = false;
        }

        const phoneRegex = /^05\d{8}$|^07\d{8}$|^0\d{8}$/;
        if (!phoneRegex.test(phone)) {
            showError('privatePhone', 'נא להזין מספר טלפון נייד תקין (10 ספרות)');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('privateEmail', 'נא להזין כתובת אימייל תקינה');
            isValid = false;
        }

        return isValid;
    };

    // הוספת ולידציה בזמן אמת לטופס הדרכה פרטנית
    const privateInputs = ['privateFullName', 'privatePosition', 'privatePhone', 'privateEmail'];
    privateInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('input', () => {
            const currentError = input.parentNode.querySelector('.error-message');
            if (currentError) {
                currentError.remove();
            }
            input.classList.remove('error-input');
            
            switch(inputId) {
                case 'privateFullName':
                    if (input.value.trim().length < 2) {
                        showError(inputId, 'נא להזין שם מלא (לפחות 2 תווים)');
                    }
                    break;
                case 'privatePosition':
                    if (input.value.trim().length < 2) {
                        showError(inputId, 'נא להזין תפקיד (לפחות 2 תווים)');
                    }
                    break;
                case 'privatePhone':
                    const phoneRegex = /^05\d{8}$|^07\d{8}$|^0\d{8}$/;
                    if (!phoneRegex.test(input.value.trim())) {
                        showError(inputId, 'נא להזין מספר טלפון נייד תקין (10 ספרות)');
                    }
                    break;
                case 'privateEmail':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        showError(inputId, 'נא להזין כתובת אימייל תקינה');
                    }
                    break;
            }
        });

        input.addEventListener('focus', () => {
            const currentError = input.parentNode.querySelector('.error-message');
            if (currentError) {
                currentError.remove();
            }
            input.classList.remove('error-input');
        });
    });

    // טיפול בשליחת טופס הדרכה פרטנית
    privateContactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validatePrivateForm()) {
            return;
        }

        const submitButton = privateContactForm.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'שולח...';

        const formData = {
            fullName: document.getElementById('privateFullName').value.trim(),
            position: document.getElementById('privatePosition').value.trim(),
            phone: document.getElementById('privatePhone').value.trim(),
            email: document.getElementById('privateEmail').value.trim(),
            type: 'private'
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
                privateContactForm.reset();
                clearErrors();
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

    // טיפול בטאבים בדף הראשי
    const mainPageTabButtons = document.querySelectorAll('.main-page-tabs .tab-button');
    const mainPageTabContents = document.querySelectorAll('.pricing .tab-content');

    mainPageTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // הסרת הקלאס active מכל הכפתורים
            mainPageTabButtons.forEach(btn => btn.classList.remove('active'));
            // הוספת הקלאס active לכפתור הנוכחי
            button.classList.add('active');

            // הסתרת כל התוכן
            mainPageTabContents.forEach(content => content.style.display = 'none');
            // הצגת התוכן המתאים
            document.getElementById(`${button.dataset.tab}Tab`).style.display = 'block';
        });
    });
}); 