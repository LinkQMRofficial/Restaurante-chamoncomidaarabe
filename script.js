/* ========================================
   CHAMÓN COMIDA ÁRABE - LANDING PAGE
   JavaScript - Animations & Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            initGSAPAnimations();
        }, 2000);
    });
    
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            initGSAPAnimations();
        }
    }, 4000);
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 100
        });
    }
    
    // Navigation
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
    
    // Menu Category Filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCards = document.querySelectorAll('.menu-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const category = this.dataset.category;
            
            menuCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // Testimonials Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (testimonialTrack && testimonialCards.length > 0) {
        let currentSlide = 0;
        const totalSlides = testimonialCards.length;
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            sliderDotsContainer.appendChild(dot);
        }
        
        const dots = document.querySelectorAll('.slider-dot');
        
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function goToSlide(index) { currentSlide = index; updateSlider(); }
        function nextSlide() { currentSlide = (currentSlide + 1) % totalSlides; updateSlider(); }
        function prevSlide() { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateSlider(); }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        let autoplayInterval = setInterval(nextSlide, 5000);
        testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
        testimonialTrack.addEventListener('mouseleave', () => { autoplayInterval = setInterval(nextSlide, 5000); });
        
        let touchStartX = 0, touchEndX = 0;
        testimonialTrack.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
        testimonialTrack.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) nextSlide();
            if (touchEndX > touchStartX + 50) prevSlide();
        });
    }
    
    // Back to Top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // GSAP Animations
    function initGSAPAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);
        
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from('.hero-badge', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' })
            .from('.title-line', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
            .from('.title-arabic', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.6')
            .from('.title-subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
            .from('.hero-description', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
            .from('.hero-cta .btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
            .from('.hero-social .social-link', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.2');
        
        gsap.to('.spice-1', { y: -100, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.spice-2', { y: -150, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
        
        gsap.from('.experience-content', { x: -50, opacity: 0, duration: 1, scrollTrigger: { trigger: '.experience', start: 'top 70%', toggleActions: 'play none none reverse' } });
        gsap.from('.stack-image', { y: 50, opacity: 0, duration: 0.8, stagger: 0.2, scrollTrigger: { trigger: '.experience-visual', start: 'top 70%', toggleActions: 'play none none reverse' } });
        gsap.from('.menu-card', { y: 40, opacity: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '.menu-grid', start: 'top 80%', toggleActions: 'play none none reverse' } });
        gsap.from('.trust-badge', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: '.trust-badges', start: 'top 85%', toggleActions: 'play none none reverse' } });
        gsap.from('.info-card', { x: -30, opacity: 0, duration: 0.5, stagger: 0.1, scrollTrigger: { trigger: '.info-cards', start: 'top 80%', toggleActions: 'play none none reverse' } });
        gsap.from('.footer-grid > div', { y: 40, opacity: 0, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: '.footer', start: 'top 85%', toggleActions: 'play none none reverse' } });
    }
    
    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.removeAttribute('data-aos');
            el.removeAttribute('data-aos-delay');
        });
    }
    
    // Console branding
    console.log('%c🥙 Chamón Comida Árabe', 'font-size: 24px; font-weight: bold; color: #d4a853; background: #1e3a52; padding: 10px 20px; border-radius: 8px;');
});

// Animation keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(styleSheet);
