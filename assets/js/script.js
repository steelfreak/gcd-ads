// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Tab Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show target tab content
            const targetContent = document.getElementById(`tab-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations using Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        scrollObserver.observe(el);
    });

    // Animated counters for stats
    function animateCounter(el, target, suffix = '') {
        let current = 0;
        const increment = target / 120;
        const duration = 2000;
        const steps = duration / 16;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 1000 / 60);
    }

    // Stats animation observer
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.stat').forEach((stat, index) => {
                        const targets = [50000, 10000, 500, 25];
                        setTimeout(() => {
                            animateCounter(stat, targets[index], index >= 2 ? 'M' : '');
                        }, index * 200);
                    });
                    statsObserver.unobserve(statsSection);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    // Navbar scroll effects
    let ticking = false;
    function updateNavbar() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(102, 126, 234, 0.98)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            nav.style.backdropFilter = 'none';
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Preload critical resources for better performance
    if ('IntersectionObserver' in window) {
        // Modern browsers supported
    } else {
        // Fallback: no animations
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }
});


    // WhatsApp Button Functionality
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const whatsappFloat = document.getElementById('whatsappFloat');
    
    if (whatsappBtn) {
        // Pulse animation on hover
        whatsappBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 2s infinite';
        });
        
        whatsappBtn.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    }
    
    // Optional: Close button on click outside (for desktop)
    document.addEventListener('click', function(e) {
        if (!whatsappFloat.contains(e.target) && window.innerWidth > 768) {
            // Could add slide-out animation here if desired
        }
    });
