document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form Handling with Manual Webhook
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // ניצור אנימציה של טעינה
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'שולח...';
            submitButton.disabled = true;
            
            // נאסוף את הנתונים מהטופס
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value || '',
                area: document.getElementById('area').value,
                reason: document.getElementById('reason').value || '',
                'form-id': 'physio-contact-form'
            };
            
            // Submit to Netlify forms
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'form-name': 'contact',
                    ...formData
                }).toString()
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                // גם מעבירים ל-webhook באופן מפורש
                return fetch('/api/form-submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
            })
            .then(response => {
                // מאתחלים את הטופס
                contactForm.reset();
                
                // מציגים הודעת הצלחה
                submitButton.textContent = 'נשלח בהצלחה!';
                submitButton.style.backgroundColor = '#38A169';
                
                // מחזירים את הכפתור למצב המקורי לאחר 3 שניות
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
                
                alert('פרטיך נשלחו בהצלחה! אחזור אליך בהקדם האפשרי.');
            })
            .catch(error => {
                console.error('Error:', error);
                submitButton.textContent = 'אירעה שגיאה, נסה שוב';
                submitButton.style.backgroundColor = '#E53E3E';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            });
        });
    }
    
    // אנימציות נוספות בעת גלילה
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // מגדירים את האלמנטים להיות מוסתרים בתחילה
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // מופעל בטעינת העמוד ובעת גלילה
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});
