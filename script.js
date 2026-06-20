// ===== NAVIGATION FUNCTIONALITY =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Close menu when clicking nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// ===== ACTIVE LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav-link[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link?.classList.add('active');
        } else {
            link?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', scrollActive);

// ===== HEADER SHADOW ON SCROLL =====
const header = document.getElementById('header');

const scrollHeader = () => {
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

window.addEventListener('scroll', scrollHeader);

// ===== TESTIMONIALS SLIDER =====
let currentSlide = 0;
const testimonialsContainer = document.getElementById('testimonials-container');
const sliderDots = document.getElementById('slider-dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Render testimonials
const renderTestimonials = () => {
    testimonialsContainer.innerHTML = '';
    sliderDots.innerHTML = '';

    testimonialsData.forEach((testimonial, index) => {
        // Create testimonial card
        const card = document.createElement('div');
        card.className = `testimonial-card ${index === 0 ? 'active' : ''}`;
        card.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-avatar">${testimonial.initials}</div>
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <div class="testimonial-rating">
                        ${generateStars(testimonial.rating)}
                    </div>
                </div>
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
        `;
        testimonialsContainer.appendChild(card);

        // Create dot
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
};

// Generate stars HTML
const generateStars = (rating) => {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star">★</span>';
        } else {
            stars += '<span class="star" style="color: var(--color-gray-light);">★</span>';
        }
    }
    return stars;
};

// Go to specific slide
const goToSlide = (index) => {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dot');

    cards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
};

// Next slide
const nextSlide = () => {
    currentSlide = (currentSlide + 1) % testimonialsData.length;
    goToSlide(currentSlide);
};

// Previous slide
const prevSlide = () => {
    currentSlide = (currentSlide - 1 + testimonialsData.length) % testimonialsData.length;
    goToSlide(currentSlide);
};

// Event listeners for slider controls
if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

// Auto-play slider
let autoplayInterval = setInterval(nextSlide, 5000);

// Pause autoplay on hover
if (testimonialsContainer) {
    testimonialsContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    testimonialsContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });
}

// Initialize testimonials
renderTestimonials();

// ===== GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
        }
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

// Close lightbox on background click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

// Close lightbox on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
    }
});

// ===== CONTACT FORM VALIDATION & SUBMISSION =====
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate field
const validateField = (field, errorElement, validator, errorMsg) => {
    const value = field.value.trim();
    
    if (!value) {
        field.classList.add('error');
        errorElement.textContent = 'This field is required';
        errorElement.classList.add('show');
        return false;
    }
    
    if (validator && !validator(value)) {
        field.classList.add('error');
        errorElement.textContent = errorMsg;
        errorElement.classList.add('show');
        return false;
    }
    
    field.classList.remove('error');
    errorElement.classList.remove('show');
    return true;
};

// Clear error on input
const setupFieldValidation = (fieldId, errorId, validator, errorMsg) => {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(errorId);
    
    if (field && errorElement) {
        field.addEventListener('input', () => {
            if (field.value.trim()) {
                field.classList.remove('error');
                errorElement.classList.remove('show');
            }
        });
        
        field.addEventListener('blur', () => {
            if (field.value.trim()) {
                validateField(field, errorElement, validator, errorMsg);
            }
        });
    }
};

// Setup validation for all fields
setupFieldValidation('name', 'name-error');
setupFieldValidation('email', 'email-error', 
    (value) => emailRegex.test(value), 
    'Please enter a valid email address'
);
setupFieldValidation('subject', 'subject-error');
setupFieldValidation('message', 'message-error');

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');
        
        // Validate all required fields
        const isNameValid = validateField(nameField, nameError);
        const isEmailValid = validateField(
            emailField, 
            emailError, 
            (value) => emailRegex.test(value), 
            'Please enter a valid email address'
        );
        const isSubjectValid = validateField(subjectField, subjectError);
        const isMessageValid = validateField(messageField, messageError);
        
        // If any validation fails, stop submission
        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            return;
        }
        
        // Collect form data
        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            phone: phoneField.value.trim(),
            subject: subjectField.value.trim(),
            message: messageField.value.trim()
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        formMessage.classList.remove('show', 'success', 'error');
        
        try {
            // Use mock function (will be replaced with actual API call)
            const response = await mockContactFormSubmit(formData);
            
            // Show success message
            formMessage.textContent = response.message;
            formMessage.classList.add('show', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
            
        } catch (error) {
            // Show error message
            formMessage.textContent = error.message;
            formMessage.classList.add('show', 'error');
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('show');
            }, 5000);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for reveal animation
const revealElements = document.querySelectorAll('.about-card, .academic-card, .why-choose-item, .gallery-item');
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== CONSOLE LOG =====
console.log('ASKAPS Academy Website Loaded Successfully! 🎓');
