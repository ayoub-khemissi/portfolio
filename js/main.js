// Update current year
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

// Feature detection - Motion library
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasMotion = typeof Motion !== 'undefined' && !prefersReducedMotion;

if (hasMotion) {
    document.body.classList.add('motion-loaded');
} else {
    document.body.classList.add('no-motion');
    // Reveal all hidden elements immediately
    document.querySelectorAll('[data-motion-hidden]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// ==========================================
// HERO ENTRANCE SEQUENCE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (!hasMotion) return;

    const { animate } = Motion;

    const heroSelectors = {
        photo: '#about img[src*="ayoub-khemissi"]',
        title: '#about h1',
        subtitle: '#about > div > h2',
        description: '#about p[itemscope]',
        buttons: '#about .flex.flex-col.sm\\:flex-row',
        stats: '#about .stats-bar',
        mockup: '#about .mockup-glow',
        marqueeLabel: '#about .text-gray-500.uppercase',
        marqueeContainer: '#about .marquee-container',
        scrollArrow: '#about a[href="#expertise"]'
    };

    const elements = {};
    for (const [key, selector] of Object.entries(heroSelectors)) {
        elements[key] = document.querySelector(selector);
    }

    // Set initial hidden state
    const allEls = Object.values(elements).filter(Boolean);
    allEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    // Helper: animate and commit final styles
    function animateAndCommit(el, keyframes, options) {
        try {
            const controls = animate(el, keyframes, options);
            if (controls && controls.finished) {
                controls.finished.then(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                }).catch(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                });
            } else {
                // If no .finished promise, commit after estimated duration
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                }, ((options.delay || 0) + (options.duration || 0.5)) * 1000 + 100);
            }
        } catch (e) {
            el.style.opacity = '1';
            el.style.transform = 'none';
        }
    }

    // Choreographed entrance
    const sequence = [
        { el: elements.photo, keyframes: { opacity: [0, 1], scale: [0.8, 1], y: [40, 0] }, options: { duration: 0.8, easing: [0.22, 1, 0.36, 1] } },
        { el: elements.title, keyframes: { opacity: [0, 1], y: [30, 0] }, options: { duration: 0.7, easing: [0.22, 1, 0.36, 1] } },
        { el: elements.subtitle, keyframes: { opacity: [0, 1], y: [20, 0] }, options: { duration: 0.6, easing: [0.22, 1, 0.36, 1] } },
        { el: elements.description, keyframes: { opacity: [0, 1], y: [20, 0] }, options: { duration: 0.5, easing: [0.22, 1, 0.36, 1] } },
        { el: elements.buttons, keyframes: { opacity: [0, 1], y: [20, 0] }, options: { duration: 0.5, easing: [0.22, 1, 0.36, 1] } },
        { el: elements.stats, keyframes: { opacity: [0, 1], y: [20, 0] }, options: { duration: 0.5, easing: [0.22, 1, 0.36, 1] } },
        { el: elements.mockup, keyframes: { opacity: [0, 1], y: [30, 0], scale: [0.95, 1] }, options: { duration: 0.7, easing: [0.22, 1, 0.36, 1] } },
        { el: elements.marqueeLabel, keyframes: { opacity: [0, 1] }, options: { duration: 0.4 } },
        { el: elements.marqueeContainer, keyframes: { opacity: [0, 1], y: [15, 0] }, options: { duration: 0.5 } },
        { el: elements.scrollArrow, keyframes: { opacity: [0, 1] }, options: { duration: 0.3 } }
    ];

    let delay = 0.15;
    sequence.forEach(({ el, keyframes, options }) => {
        if (el) {
            animateAndCommit(el, keyframes, { ...options, delay });
            delay += 0.12;
        }
    });

    // Safety fallback: reveal everything after 3s no matter what
    setTimeout(() => {
        allEls.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }, 3000);
});

// ==========================================
// SCROLL-TRIGGERED ANIMATIONS (Motion inView)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (!hasMotion) return;

    const { animate, inView, stagger } = Motion;

    // Expertise section
    inView('#expertise', ({ target }) => {
        const h2 = target.querySelector('h2');
        const cards = target.querySelectorAll('.card-gold-glow');
        if (h2) animate(h2, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6, easing: [0.22, 1, 0.36, 1] });
        if (cards.length) animate(cards, { opacity: [0, 1], y: [40, 0], scale: [0.95, 1] }, { delay: stagger(0.15, { start: 0.3 }), duration: 0.6, easing: [0.22, 1, 0.36, 1] });
    }, { amount: 0.2 });

    // Services section
    inView('#services', ({ target }) => {
        const h2 = target.querySelector('h2');
        const packs = target.querySelectorAll('.rounded-3xl');
        if (h2) animate(h2, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6 });
        if (packs.length) animate(packs, { opacity: [0, 1], y: [50, 0] }, { delay: stagger(0.2, { start: 0.3 }), duration: 0.7, easing: [0.22, 1, 0.36, 1] });
    }, { amount: 0.15 });

    // Testimonials section
    inView('#testimonials', ({ target }) => {
        const h2 = target.querySelector('h2');
        const cards = target.querySelectorAll('.card-gold-glow');
        if (h2) animate(h2, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6 });
        if (cards.length) animate(cards, { opacity: [0, 1], y: [30, 0], scale: [0.97, 1] }, { delay: stagger(0.1, { start: 0.3 }), duration: 0.5 });
    }, { amount: 0.1 });

    // Showcase section - each project article individually
    const showcaseArticles = document.querySelectorAll('#showcase article');
    showcaseArticles.forEach(article => {
        inView(article, () => {
            animate(article, { opacity: [0, 1], y: [60, 0] }, { duration: 0.8, easing: [0.22, 1, 0.36, 1] });
        }, { amount: 0.15 });
    });

    // Showcase section title
    inView('#showcase', ({ target }) => {
        const h2 = target.querySelector('h2');
        if (h2) animate(h2, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6 });
    }, { amount: 0.05 });

    // FAQ section
    inView('#faq', ({ target }) => {
        const h2 = target.querySelector('h2');
        const items = target.querySelectorAll('.faq-item');
        if (h2) animate(h2, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6 });
        if (items.length) animate(items, { opacity: [0, 1], x: [-20, 0] }, { delay: stagger(0.1, { start: 0.3 }), duration: 0.5 });
    }, { amount: 0.2 });

    // Contact section
    inView('#contact', ({ target }) => {
        const h2 = target.querySelector('h2');
        const calendly = target.querySelector('.calendly-inline-widget');
        if (h2) animate(h2, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6 });
        if (calendly) animate(calendly, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: 0.3 });
    }, { amount: 0.15 });
});

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    let animated = false;

    function animateCounters() {
        if (animated) return;
        animated = true;
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            const duration = 2000;
            const start = performance.now();
            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                // ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        });
    }

    // Trigger after hero entrance (1.5s delay) or on scroll
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    }, { threshold: 0.3 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        observer.observe(statsBar);
        // Fallback: if stats-bar is already visible but observer missed it
        setTimeout(animateCounters, 2000);
    }
});

// ==========================================
// 3D PERSPECTIVE TILT ON CARDS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    const tiltCards = document.querySelectorAll('.card-gold-glow');

    tiltCards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            card.style.transition = 'transform 0.4s ease-out';
        });
    });
});

// ==========================================
// MAGNETIC EFFECT ON CTA BUTTONS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
            btn.style.transition = 'transform 0.1s ease-out';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
            btn.style.transition = 'transform 0.3s ease-out';
        });
    });
});

// ==========================================
// CURSOR SPOTLIGHT (Desktop only)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const glow = document.getElementById('cursor-glow');
    if (!glow || window.innerWidth < 1024 || prefersReducedMotion) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(updateGlow);
    }
    updateGlow();
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// PROJECT GALLERIES - Individual carousel
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.project-gallery');

    galleries.forEach(gallery => {
        const track = gallery.querySelector('.gallery-track');
        const slides = gallery.querySelectorAll('.gallery-slide');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');
        const dots = gallery.querySelectorAll('.gallery-dots button');

        let currentSlide = 0;
        const totalSlides = slides.length;
        let touchStartX = 0;
        let touchEndX = 0;

        function updateGallery() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.className = 'w-2 h-2 rounded-full bg-white transition-all duration-300';
                } else {
                    dot.className = 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 transition-all duration-300';
                }
            });
            prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
            nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
        }

        function goToPrev() { if (currentSlide > 0) { currentSlide--; updateGallery(); } }
        function goToNext() { if (currentSlide < totalSlides - 1) { currentSlide++; updateGallery(); } }
        function goToSlide(index) { currentSlide = index; updateGallery(); }

        prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goToPrev(); });
        nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goToNext(); });
        dots.forEach((dot, index) => { dot.addEventListener('click', (e) => { e.stopPropagation(); goToSlide(index); }); });

        track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) { if (diff > 0) goToNext(); else goToPrev(); }
        });

        updateGallery();
    });
});

// ==========================================
// FULLSCREEN IMAGE MODAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const showcaseImages = document.querySelectorAll('.showcase-image');

    function openModal(imageSrc, imageAlt) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModalFunc() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
            if (!modal.classList.contains('show')) {
                modalImage.src = '';
                modalImage.alt = '';
            }
        }, 300);
    }

    showcaseImages.forEach(imageContainer => {
        imageContainer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openModal(imageContainer.dataset.src, imageContainer.dataset.alt);
        });
    });

    closeModal.addEventListener('click', (e) => { e.stopPropagation(); closeModalFunc(); });
    modalOverlay.addEventListener('click', closeModalFunc);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('show')) closeModalFunc(); });
    modalImage.addEventListener('click', (e) => { e.stopPropagation(); });
    modalImage.addEventListener('error', () => { closeModalFunc(); });
});

// ==========================================
// FAQ ACCORDION (Enhanced with Motion)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    if (hasMotion) {
                        Motion.animate(otherItem.querySelector('.faq-answer'), { opacity: 0 }, { duration: 0.2 });
                    }
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                if (hasMotion) {
                    Motion.animate(answer, { opacity: [0, 1] }, { duration: 0.4, easing: [0.22, 1, 0.36, 1] });
                }
            } else {
                item.classList.remove('active');
            }
        });
    });
});