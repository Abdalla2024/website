// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            navbar.style.borderBottom = '1px solid rgba(147, 51, 234, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            navbar.style.borderBottom = '1px solid rgba(147, 51, 234, 0.2)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and screenshot cards
    const animatedElements = document.querySelectorAll('.feature-card, .screenshot-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Phone mockup hover effect
    const phoneMockups = document.querySelectorAll('.phone-mockup, .phone-mockup-large');
    phoneMockups.forEach(phone => {
        phone.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateY(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });

        phone.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
        });
    });

    // Add floating animation to hero phone
    const heroPhone = document.querySelector('.hero .phone-mockup');
    if (heroPhone) {
        setInterval(() => {
            heroPhone.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                heroPhone.style.transform = 'translateY(0px)';
            }, 2000);
        }, 4000);
        heroPhone.style.transition = 'transform 2s ease-in-out';
    }

    // Form validation (if you add a contact form later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // App store button - now links to actual App Store
    const appStoreBtn = document.querySelector('.app-store-btn');
    if (appStoreBtn) {
        // App Store link is now active in HTML, no need for JavaScript override
    }

    // Feature card stagger animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Screenshot card stagger animation
    const screenshotCards = document.querySelectorAll('.screenshot-card');
    screenshotCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Parallax effect removed to prevent hero image from moving during scroll

    // Add counter animation for stats (if you want to add animated counters)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Lazy loading for images (when you add real screenshots)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    lazyLoadImages();

    // Add subtle typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    // Add scroll indicator
    function addScrollIndicator() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L12 18L17 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 6L12 11L17 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        
        scrollIndicator.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
            color: white;
            padding: 12px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 100;
            animation: bounce 2s infinite;
            box-shadow: 0 4px 20px rgba(147, 51, 234, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;

        // Add bounce animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateX(-50%) translateY(0);
                }
                40% {
                    transform: translateX(-50%) translateY(-10px);
                }
                60% {
                    transform: translateX(-50%) translateY(-5px);
                }
            }
        `;
        document.head.appendChild(style);

        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#features').scrollIntoView({ behavior: 'smooth' });
        });

        // Hide indicator when scrolled past hero
        window.addEventListener('scroll', () => {
            const heroHeight = document.querySelector('.hero').offsetHeight;
            if (window.scrollY > heroHeight * 0.8) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });

        document.body.appendChild(scrollIndicator);
    }

    // Initialize scroll indicator only on the main page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '') {
        addScrollIndicator();
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(function() {
        // Your scroll-based functions here
    }, 16)); // ~60 FPS

    console.log('Unwind website loaded successfully! 🚀');

    // Generate a circular favicon from the favicon.png image
    function setCircularFavicon(src = 'favicon.png', size = 256) {
        try {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');

                ctx.clearRect(0, 0, size, size);
                ctx.save();
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                // Draw image with "cover" behavior
                const scale = Math.max(size / img.width, size / img.height);
                const drawWidth = img.width * scale;
                const drawHeight = img.height * scale;
                const dx = (size - drawWidth) / 2;
                const dy = (size - drawHeight) / 2;
                ctx.drawImage(img, dx, dy, drawWidth, drawHeight);

                ctx.restore();

                let link = document.querySelector('link[rel="icon"]');
                if (!link) {
                    link = document.createElement('link');
                    link.rel = 'icon';
                    document.head.appendChild(link);
                }
                link.type = 'image/png';
                link.href = canvas.toDataURL('image/png');
            };
            img.src = src;
        } catch (e) {
            // Fallback silently if canvas is blocked (e.g., file:// origins)
        }
    }

    // Initialize circular favicon
    setCircularFavicon();
}); 