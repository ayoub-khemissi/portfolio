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

// Showcase horizontal scroll carousel
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtnMobile = document.getElementById('prevBtnMobile');
    const nextBtnMobile = document.getElementById('nextBtnMobile');
    const progressDots = document.getElementById('progressDots');
    const progressText = document.getElementById('progressText');
    
    let currentScrollPosition = 0;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    const totalItems = track.children.length;
    
    // Function to get responsive scroll amount
    function getScrollAmount() {
        const screenWidth = window.innerWidth;
        let itemWidth, gap;
        
        if (screenWidth < 640) { // sm breakpoint
            itemWidth = 256; // w-64 = 16rem = 256px
            gap = 12; // gap-3 = 0.75rem = 12px
        } else if (screenWidth < 1024) { // lg breakpoint
            itemWidth = 288; // w-72 = 18rem = 288px
            gap = 16; // gap-4 = 1rem = 16px
        } else {
            itemWidth = 320; // w-80 = 20rem = 320px
            gap = 24; // gap-6 = 1.5rem = 24px
        }
        
        return itemWidth * 2 + gap; // Scroll by 2 items at a time
    }
    
    // Get track bounds for scroll limits
    function getScrollBounds() {
        const trackWidth = track.scrollWidth;
        const containerWidth = track.parentElement.offsetWidth;
        const maxScroll = Math.max(0, trackWidth - containerWidth);
        return { maxScroll };
    }
    
    // Function to create progress dots
    function createProgressDots() {
        progressDots.innerHTML = '';
        const dotsCount = Math.ceil(totalItems / 2); // Show progress by pairs
        
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'w-2 h-2 rounded-full bg-white/30 transition-all duration-300 cursor-pointer hover:bg-white/50';
            dot.addEventListener('click', () => goToSlide(i));
            progressDots.appendChild(dot);
        }
    }
    
    // Function to update progress indicator
    function updateProgressIndicator() {
        const scrollAmount = getScrollAmount();
        const currentSlide = Math.round(currentScrollPosition / scrollAmount);
        const totalSlides = Math.ceil(totalItems / 2);
        
        // Update dots
        const dots = progressDots.children;
        for (let i = 0; i < dots.length; i++) {
            if (i === currentSlide) {
                dots[i].className = 'w-6 h-2 rounded-full bg-white transition-all duration-300 cursor-pointer';
            } else {
                dots[i].className = 'w-2 h-2 rounded-full bg-white/30 transition-all duration-300 cursor-pointer hover:bg-white/50';
            }
        }
        
        // Update text
        progressText.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }
    
    // Function to go to specific slide
    function goToSlide(slideIndex) {
        const scrollAmount = getScrollAmount();
        const { maxScroll } = getScrollBounds();
        currentScrollPosition = Math.min(maxScroll, slideIndex * scrollAmount);
        updateScroll();
    }
    
    // Function to update carousel scroll position
    function updateScroll() {
        track.style.transform = `translateX(-${currentScrollPosition}px)`;
        
        const { maxScroll } = getScrollBounds();
        
        // Update button states for desktop
        prevBtn.style.opacity = currentScrollPosition <= 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentScrollPosition >= maxScroll ? '0.5' : '1';
        
        // Update button states for mobile
        if (prevBtnMobile && nextBtnMobile) {
            prevBtnMobile.style.opacity = currentScrollPosition <= 0 ? '0.5' : '1';
            nextBtnMobile.style.opacity = currentScrollPosition >= maxScroll ? '0.5' : '1';
        }
        
        // Update progress indicator
        updateProgressIndicator();
    }
    
    // Function for previous navigation
    function goToPrevious() {
        const scrollAmount = getScrollAmount();
        currentScrollPosition = Math.max(0, currentScrollPosition - scrollAmount);
        updateScroll();
    }
    
    // Function for next navigation
    function goToNext() {
        const scrollAmount = getScrollAmount();
        const { maxScroll } = getScrollBounds();
        currentScrollPosition = Math.min(maxScroll, currentScrollPosition + scrollAmount);
        updateScroll();
    }
    
    // Previous navigation - Desktop
    prevBtn.addEventListener('click', goToPrevious);
    
    // Next navigation - Desktop
    nextBtn.addEventListener('click', goToNext);
    
    // Mobile navigation buttons
    if (prevBtnMobile && nextBtnMobile) {
        prevBtnMobile.addEventListener('click', goToPrevious);
        nextBtnMobile.addEventListener('click', goToNext);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.querySelector('#showcase').getBoundingClientRect().top < window.innerHeight && 
            document.querySelector('#showcase').getBoundingClientRect().bottom > 0) {
            if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        }
    });
    
    // Initialize carousel
    setTimeout(() => {
        createProgressDots();
        updateScroll();
    }, 100);
    
    // Update on window resize
    window.addEventListener('resize', () => {
        updateScroll();
    });
    
    // Enhanced touch and drag support
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Mouse drag support
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = currentScrollPosition;
        track.style.cursor = 'grabbing';
        track.style.transition = 'none';
    });
    
    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.cursor = 'grab';
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    track.addEventListener('mouseup', () => {
        isDragging = false;
        track.style.cursor = 'grab';
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        snapToNearestSlide();
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        const newPosition = scrollLeft - walk;
        const { maxScroll } = getScrollBounds();
        currentScrollPosition = Math.max(0, Math.min(maxScroll, newPosition));
        track.style.transform = `translateX(-${currentScrollPosition}px)`;
    });
    
    // Touch support for mobile with smooth dragging
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        scrollLeft = currentScrollPosition;
        track.style.transition = 'none';
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].clientX;
        const walk = (touchStartX - touchX) * 1.2;
        const newPosition = scrollLeft + walk;
        const { maxScroll } = getScrollBounds();
        currentScrollPosition = Math.max(0, Math.min(maxScroll, newPosition));
        track.style.transform = `translateX(-${currentScrollPosition}px)`;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        snapToNearestSlide();
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - scroll right
                goToNext();
            } else {
                // Swipe right - scroll left
                goToPrevious();
            }
        }
    }
    
    // Function to snap to nearest slide after dragging
    function snapToNearestSlide() {
        const scrollAmount = getScrollAmount();
        const nearestSlide = Math.round(currentScrollPosition / scrollAmount);
        const { maxScroll } = getScrollBounds();
        const maxSlide = Math.floor(maxScroll / scrollAmount);
        const targetSlide = Math.max(0, Math.min(maxSlide, nearestSlide));
        currentScrollPosition = targetSlide * scrollAmount;
        updateScroll();
    }
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