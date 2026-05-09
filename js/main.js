// ==========================================
// DAIMON TECHNOLOGIES - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCustomCursor();
    initNavigation();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimation();
    initTestimonialsSlider();
    initContactForm();
    initSmoothScroll();
    initParallaxEffects();
});

// ==========================================
// CUSTOM CURSOR
// ==========================================

function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursorDot || !cursorOutline) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    // Smooth follow for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .glass-service-card, .nav-link');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--primary-light)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--primary-color)';
        });
    });
}

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const nav = document.querySelector('.glass-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll effect for navigation
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
        
        // Update active nav link based on scroll position
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Click effect for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.glass-card-large, .glass-service-card, .glass-innovation-card, .glass-product-card, .glass-feature, .section-header'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==========================================
// COUNTER ANIMATION
// ==========================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================

function initTestimonialsSlider() {
    const testimonials = document.querySelectorAll('.glass-testimonial');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;
    
    if (testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
    }
    
    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
    
    // Auto-rotate
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
}

// ==========================================
// CONTACT FORM
// ==========================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = ' Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        
        ${message}
    `;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        padding: '16px 24px',
        background: type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.95rem',
        fontWeight: '500',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// SMOOTH SCROLL
// ==========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// PARALLAX EFFECTS
// ==========================================

function initParallaxEffects() {
    const spheres = document.querySelectorAll('.gradient-sphere');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        spheres.forEach((sphere, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            sphere.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// ==========================================
// THEME TOGGLE (Optional - for future use)
// ==========================================

function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    
    if (!toggle) return;
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = toggle.querySelector('i');
        
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// ==========================================
// SERVICE CARDS INTERACTION
// ==========================================

document.querySelectorAll('.glass-service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.service-glow').style.opacity = '0.3';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.service-glow').style.opacity = '0';
    });
});

// ==========================================
// PROGRESS BAR ANIMATION
// ==========================================

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.glass-innovation-card').forEach(card => {
    progressObserver.observe(card);
});

// ==========================================
// FLOATING CARDS MOUSE INTERACTION
// ==========================================

const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        document.querySelectorAll('.floating-card').forEach((card, index) => {
            const speed = (index + 1) * 10;
            card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
    
    heroVisual.addEventListener('mouseleave', () => {
        document.querySelectorAll('.floating-card').forEach(card => {
            card.style.transform = 'translate(0, 0)';
        });
    });
}

console.log('Daimon Technologies website initialized successfully!');
