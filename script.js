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
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // בשלב זה בפרויקט אמיתי נשלח את הטופס לשרת
            // כרגע יצרנו סימולציה של שליחה מוצלחת
            
            // נאסוף את כל הנתונים מהטופס
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                area: document.getElementById('area').value,
                reason: document.getElementById('reason').value
            };
            
            console.log('Form data submitted:', formData);
            
            // ניצור אנימציה של טעינה
            const submitButton = this.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'שולח...';
            submitButton.disabled = true;
            
            // סימולציה של זמן שליחה
            setTimeout(() => {
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
            }, 1500);
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
