// Update current year
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

// Scroll animation - Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    // Staggered animation for technologies
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-fade-in-up');
    });
});

// Smooth scroll with offset for navigation
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

// Parallax effect on sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Expertise cards hover animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-modern');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) scale(1)';
        });
    });
});

// Project galleries - Individual carousel for each project
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

        // Update gallery position
        function updateGallery() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.className = 'w-2 h-2 rounded-full bg-white transition-all duration-300';
                } else {
                    dot.className = 'w-2 h-2 rounded-full bg-white/40 hover:bg-white/60 transition-all duration-300';
                }
            });

            // Update button states
            prevBtn.style.opacity = currentSlide === 0 ? '0.3' : '1';
            nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.3' : '1';
        }

        // Previous slide
        function goToPrev() {
            if (currentSlide > 0) {
                currentSlide--;
                updateGallery();
            }
        }

        // Next slide
        function goToNext() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateGallery();
            }
        }

        // Go to specific slide
        function goToSlide(index) {
            currentSlide = index;
            updateGallery();
        }

        // Event listeners
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            goToPrev();
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            goToNext();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(index);
            });
        });

        // Touch support
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToNext();
                } else {
                    goToPrev();
                }
            }
        });

        // Initialize
        updateGallery();
    });
});

// Full screen image modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const showcaseImages = document.querySelectorAll('.showcase-image');
    
    // Function to open modal
    function openModal(imageSrc, imageAlt) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent page scrolling
    }
    
    // Function to close modal
    function closeModalFunc() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Clean up image after transition
        setTimeout(() => {
            if (!modal.classList.contains('show')) {
                modalImage.src = '';
                modalImage.alt = '';
            }
        }, 300);
    }
    
    // Open modal on image click
    showcaseImages.forEach(imageContainer => {
        imageContainer.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const imageSrc = imageContainer.dataset.src;
            const imageAlt = imageContainer.dataset.alt;
            
            openModal(imageSrc, imageAlt);
            
            // Notify that user interacted (for auto-play)
            // Look for handleUserInteraction function in carousel scope
            const showcaseSection = document.getElementById('showcase');
            if (showcaseSection && typeof window.handleCarouselInteraction === 'function') {
                window.handleCarouselInteraction();
            }
        });
    });
    
    // Close modal with X button
    closeModal.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModalFunc();
    });
    
    // Close modal by clicking overlay
    modalOverlay.addEventListener('click', closeModalFunc);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });
    
    // Prevent closing by clicking on image itself
    modalImage.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Handle image loading errors
    modalImage.addEventListener('error', () => {
        console.error('Error loading image');
        closeModalFunc();
    });
});