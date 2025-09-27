// Wait for DOM and GSAP to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Register ScrollTrigger plugin
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initAnimations();
        initReelToggle();
    } else {
        console.error('GSAP or ScrollTrigger not loaded');
    }
});

function initAnimations() {
    // Create a master timeline for better performance
    gsap.set(".page1-content", { 
       y: "-100%", 
       opacity: 0 
   });
    const masterTl = gsap.timeline();

    // Animate page1-content sliding DOWN into view
    masterTl.to(".page1-content", {
        duration: 1,
        y: "0%",
        opacity: 1,
        ease: "power3.out",
        delay: 0.8
    });

    // Logo animation
    masterTl.from(".logo .letter", {
        duration: 0.8,
        opacity: 0,
        y: -100,
        rotationX: 90,
        transformOrigin: "bottom",
        stagger: {
            amount: 0.3,
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
    masterTl.call(() => {
        initScrollAnimation();
    });
    // Hover effects
    initHoverEffects();
}

function initScrollAnimation() {
    // Store the original text and SVG
    const originalHeading = "The Growth Accelerator";
    const newHeadingSvg = `<svg width="68" height="12" fill="none" viewBox="0 0 68 12" class="nav-logo"><path fill="currentColor" d="M32.606 5.931c0-3.353-2.36-5.23-5.074-5.23S22.46 2.598 22.46 5.93c0 3.353 2.36 5.27 5.073 5.27 2.715 0 5.074-1.936 5.074-5.27M0 10.932h1.73v-5.48c0-1.916 1.004-2.95 2.597-2.95h1.062V.854H4.366C2.262.854 0 2.157 0 5.318zm5.731-5c0 3.525 2.321 5.268 5.055 5.268 2.596 0 4.326-1.418 4.68-3.43h-1.77c-.334 1.17-1.278 1.878-2.871 1.878-1.691 0-3.127-.958-3.284-3.161h7.925a6 6 0 0 0 .06-.843c0-2.453-1.515-4.905-4.8-4.943C7.876.662 5.732 2.655 5.732 5.93M7.58 5.03c.256-1.974 1.495-2.778 3.107-2.778 1.495 0 2.793.785 3.01 2.778zm8.308 6.016h1.022c2.105 0 4.366-1.303 4.366-4.464V.969h-1.73v5.48c0 1.916-1.003 2.95-2.596 2.95h-1.062zm8.36-5.097c0-2.567 1.514-3.697 3.284-3.697s3.285 1.13 3.285 3.697c0 2.472-1.515 3.698-3.285 3.698s-3.284-1.226-3.284-3.698m9.49 1.016c0 3.065 2.4 4.234 4.445 4.234s4.444-1.168 4.444-4.234V.969h-1.73v5.652c0 2.223-1.121 3.046-2.714 3.046s-2.714-.823-2.714-3.046V.97h-1.73zm10.27 3.966h1.731V.969h-1.73zm2.71-5c0 3.352 2.321 5.268 5.075 5.268 2.556 0 4.582-1.533 4.779-4.292h-1.75c-.256 1.84-1.495 2.74-3.069 2.74-1.79 0-3.245-1.226-3.245-3.698 0-2.567 1.475-3.697 3.226-3.697 1.553 0 2.851.613 3.087 2.452h1.75C56.376 1.985 54.31.701 51.774.701c-2.714 0-5.054 1.897-5.054 5.23m10.688 0c0 3.525 2.32 5.268 5.054 5.268 2.596 0 4.327-1.418 4.681-3.43h-1.77c-.334 1.17-1.278 1.878-2.871 1.878-1.692 0-3.127-.958-3.285-3.161h7.926a6 6 0 0 0 .059-.843C67.2 3.19 65.686.739 62.401.7c-2.851-.039-4.995 1.954-4.995 5.23m1.849-.901c.255-1.974 1.494-2.778 3.107-2.778 1.495 0 2.793.785 3.009 2.778z"></path></svg>`;

    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#main",
            start: "top top",
            end: "+=150%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            onUpdate: function(self) {
                // Handle text/SVG transition based on scroll progress
                const heading = document.querySelector("nav > .heading");
                if (!heading) return;

                const progress = self.progress;
                
                if (progress > 0.5) {
                    // Scroll down past 50% - show SVG
                    if (!heading.querySelector('.nav-logo')) {
                        heading.style.opacity = 0;
                        setTimeout(() => {
                            heading.innerHTML = newHeadingSvg;
                            heading.style.opacity = 1;
                        }, 150);
                    }
                } else {
                    // Scroll back up - show text
                    if (heading.querySelector('.nav-logo') || heading.innerHTML === newHeadingSvg) {
                        heading.style.opacity = 0;
                        setTimeout(() => {
                            heading.textContent = originalHeading;
                            heading.style.opacity = 1;
                        }, 150);
                    }
                }
            }
        }
    });
    
    scrollTl.to(".page1-content", {
        y: "-100%",
        opacity: 0,
        ease: "power2.inOut",
        duration: 1
    }, 0);
    
    scrollTl.to("nav", {
        y: "10%",
        ease: "power2.out",
        duration: 1
    }, 0);
    
    scrollTl.to(".page1 video", {
        scale: 1.08,
        ease: "power1.out",
        duration: 0.6
    }, 0);
}

function initHoverEffects() {
    // Efficient event delegation for word hover effects
    document.addEventListener('mouseover', function (e) {
        if (e.target.classList.contains('word')) {
            gsap.to(e.target, {
                y: -3,
                color: '#ccc',
                duration: 0.2,
                ease: "power2.out"
            });
        }
    });

    document.addEventListener('mouseout', function (e) {
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
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function () {
    if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
});


// Reel toggle functionality
function initReelToggle() {
    const reelContainer = document.querySelector('.reel');
    const playReelBtn = document.querySelector('.play-reel');
    const closeReelBtn = document.querySelector('.close-reel');
    const video = document.querySelector('.page1 video');
    
    if (!reelContainer || !video) return;
    
    // Initially hide the close button
    gsap.set(closeReelBtn, { opacity: 0, display: 'none' });
    
    // Click handler for play reel button
    video.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleReel(true);
    });
    
    // Optional: Click on video to close reel
    video.addEventListener('click', function() {
        if (closeReelBtn.style.display !== 'none') {
            toggleReel(false);
        }
    });
    
    function toggleReel(play) {
        if (play) {
            // Show close button, hide play button
            gsap.to(playReelBtn, {
                opacity: 0,
                duration: 0.1,
                scrub:1.2,
                onComplete: () => {
                    playReelBtn.style.display = 'none';
                    closeReelBtn.style.display = 'block';
                    gsap.to(closeReelBtn, {
                        opacity: 1,
                        duration: 0.3
                    });
                }
            });

            
            // Play video (if paused)
            if (video.paused) {
                video.play().catch(error => {
                    console.log('Video play failed:', error);
                });
            }
            
        } else {
            // Show play button, hide close button
            gsap.to(closeReelBtn, {
                opacity: 0,
                duration: 0.1,
                scrub:1.2,
                onComplete: () => {
                    closeReelBtn.style.display = 'none';
                    playReelBtn.style.display = 'block';
                    gsap.to(playReelBtn, {
                        opacity: 1,
                        duration: 0.3
                    });
                }
            });
            
            // Pause video
            video.pause();
        }
    }
}
