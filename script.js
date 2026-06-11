// Typing Effect for Hero Section
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const roles = JSON.parse(typingText.getAttribute('data-roles'));
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// Sticky Header Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Scroll Animation (Intersection Observer)
const sections = document.querySelectorAll('.section, .hero');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

sections.forEach(section => {
    observer.observe(section);
});

// Animated Counter Effect
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const endValue = parseFloat(target.getAttribute('data-target'));
            const suffix = target.getAttribute('data-suffix') || '';
            const duration = 2000;
            const increment = endValue / (duration / 16);
            let currentValue = 0;
            
            const updateCounter = () => {
                currentValue += increment;
                if (currentValue < endValue) {
                    let displayValue = endValue % 1 !== 0 ? currentValue.toFixed(2) : Math.ceil(currentValue);
                    target.textContent = displayValue + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    target.textContent = endValue + suffix;
                }
            };
            updateCounter();
            observer.unobserve(target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

// Contact Form Submission Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Basic Validation
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        
        if(!name || !email || !message) {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Fill required fields';
            submitBtn.style.backgroundColor = '#dc3545';
            submitBtn.style.color = '#fff';
            submitBtn.style.borderColor = '#dc3545';
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style = '';
            }, 3000);
            return;
        }

        submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        fetch("https://formsubmit.co/ajax/gowshickdurai2007@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
                submitBtn.style.backgroundColor = '#28a745';
                submitBtn.style.color = '#fff';
                submitBtn.style.borderColor = '#28a745';
                contactForm.reset();
            } else {
                submitBtn.innerHTML = '<i class="fas fa-times-circle"></i> Failed to send';
                submitBtn.style.backgroundColor = '#dc3545';
                submitBtn.style.color = '#fff';
                submitBtn.style.borderColor = '#dc3545';
            }
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style = '';
            }, 3000);
        })
        .catch(error => {
            console.error("Error:", error);
            submitBtn.innerHTML = '<i class="fas fa-times-circle"></i> Error occurred';
            submitBtn.style.backgroundColor = '#dc3545';
            submitBtn.style.color = '#fff';
            submitBtn.style.borderColor = '#dc3545';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style = '';
            }, 3000);
        });
    });
}
