// Wait for DOM and GSAP to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initAnimations();
    } else {
        console.error('GSAP or ScrollTrigger not loaded');
    }
});

function initAnimations() {
    // Create a master timeline for better performance
    const masterTl = gsap.timeline();
    
    // Logo animation
    masterTl.from(".logo .letter", {
        duration: 0.8,
        opacity: 0,
        y: -100,
        rotationX: 90,
        transformOrigin: "bottom",
        stagger: {
            amount: 0.6,
            from: "end"
        },
        ease: "power3.out"
    });
    
    // Navigation animation
    masterTl.from("nav > *, .nav-links p, .bottom", {
        duration: 0.6,
        opacity: 0,
        y: -30,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.4"); // Overlap with previous animation
    
    // Scroll animation
    initScrollAnimation();
    
    // Hover effects
    initHoverEffects();
}

function initScrollAnimation() {
    // Check if we have enough content to scroll
    const contentSections = document.querySelectorAll('.content-section');
    if (contentSections.length === 0) return;
    
    // Set initial states for performance
    gsap.set(".page1", { position: "fixed", top: 0, left: 0, width: "100%", height: "100vh" });
    
    // Create scroll timeline with performance optimizations
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#main",
            start: "top top",
            end: "+=150%",
            scrub: 1.2, // Slightly faster scrub for better feel
            pin: true,
            anticipatePin: 1,
            markers: false, // Set to true for debugging
            
        }
    });
    
    // Main content movement
    scrollTl.to(".page1-content", {
        y: "-100%",
        ease: "power2.inOut",
        duration: 1
    }, 0);
    
    // Video scale effect
    scrollTl.to(".page1 video", {
        scale: 1.08,
        ease: "power1.out",
        duration: 0.6
    }, 0);
}



function initHoverEffects() {
    // Efficient event delegation for word hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('word')) {
            gsap.to(e.target, {
                y: -3,
                color: '#ccc',
                duration: 0.2,
                ease: "power2.out"
            });
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('word')) {
            gsap.to(e.target, {
                y: 0,
                color: '#fff',
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
}

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
});