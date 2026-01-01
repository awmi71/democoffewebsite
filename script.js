// Coffee Factory Cafe - Premium JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeIntersectionObserver();
    initializeMobileOptimizations();
});

// Navigation System
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const navLinks = document.querySelectorAll('.dropdown-menu-custom a');
    
    // Three-dot navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleNavigation();
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            closeNavigation();
        }
    });
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement);
                closeNavigation();
            }
        });
    });
    
    // Handle secondary navigation links
    const secondaryNavLinks = document.querySelectorAll('.secondary-nav a');
    secondaryNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
}

function toggleNavigation() {
    const navToggle = document.getElementById('navToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    navToggle.classList.toggle('active');
    dropdownMenu.classList.toggle('show');
    
    // Add ripple effect
    createRipple(navToggle);
}

function closeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    navToggle.classList.remove('active');
    dropdownMenu.classList.remove('show');
}

// Smooth Scrolling
function smoothScrollTo(target) {
    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
    
    // Add highlight effect to target section
    highlightSection(target);
}

function highlightSection(section) {
    section.style.transition = 'background-color 0.3s ease';
    section.style.backgroundColor = 'rgba(111, 78, 55, 0.05)';
    
    setTimeout(() => {
        section.style.backgroundColor = '';
    }, 1000);
}

// Scroll Effects
function initializeScrollEffects() {
    const secondaryNav = document.querySelector('.secondary-nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Enhanced shadow effect on secondary navigation
        if (secondaryNav) {
            if (scrollTop > 100) {
                secondaryNav.classList.add('scrolled');
                secondaryNav.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            } else {
                secondaryNav.classList.remove('scrolled');
                secondaryNav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        }
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrollTop < window.innerHeight) {
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animations
function initializeAnimations() {
    // Add entrance animations to elements
    const animateElements = document.querySelectorAll('.menu-category, .review-card, .feature-item');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Hover effects for interactive elements
    addHoverEffects();
}

function addHoverEffects() {
    // Menu items hover effect
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Feature items 3D tilt effect
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Intersection Observer for scroll animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes based on element type
                if (element.classList.contains('menu-category')) {
                    element.classList.add('slide-in-left');
                } else if (element.classList.contains('review-card')) {
                    element.classList.add('fade-in-up');
                } else if (element.classList.contains('feature-item')) {
                    element.classList.add('fade-in-up');
                } else {
                    element.classList.add('fade-in-up');
                }
                
                // Add stagger effect for multiple elements
                const siblings = Array.from(element.parentElement.children);
                const index = siblings.indexOf(element);
                element.style.animationDelay = `${index * 0.1}s`;
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToObserve = document.querySelectorAll('.menu-category, .review-card, .feature-item, section');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Mobile Optimizations
function initializeMobileOptimizations() {
    // Touch-friendly interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback
        const touchElements = document.querySelectorAll('a, button, .menu-item, .feature-item');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Optimize for mobile performance
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        const style = document.createElement('style');
        style.textContent = `
            .hero-section {
                background-attachment: scroll !important;
            }
            
            * {
                transition-duration: 0.2s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility Functions
function createRipple(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Loading optimization
function optimizeLoading() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Log performance metrics
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Add loading complete class
        document.body.classList.add('loaded');
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Initialize performance monitoring
initializePerformanceMonitoring();

// Initialize loading optimization
optimizeLoading();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes navigation
    if (e.key === 'Escape') {
        closeNavigation();
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class when using mouse
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for accessibility
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-color) !important;
        outline-offset: 2px !important;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        overflow-x: hidden;
    }
    
    .touch-device * {
        cursor: pointer !important;
    }
`;
document.head.appendChild(style);
