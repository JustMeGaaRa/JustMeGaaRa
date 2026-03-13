
const cursorContainer = document.getElementById('cursor-container');
const glow = document.getElementById('cursor-glow');
const socialLinks = document.querySelectorAll('.social-link');

// Mouse move listener for the lighting effect
window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Move the container which holds both dot and glow
    requestAnimationFrame(() => {
        cursorContainer.style.left = `${x}px`;
        cursorContainer.style.top = `${y}px`;
        
        // Update proximity variables for the border highlight effect
        socialLinks.forEach(link => {
            const rect = link.getBoundingClientRect();
            // Calculate mouse position strictly relative to the element's local space
            const linkX = x - rect.left;
            const linkY = y - rect.top;
            link.style.setProperty('--mouse-x', `${linkX}px`);
            link.style.setProperty('--mouse-y', `${linkY}px`);
        });
    });
});


// Hide cursor container when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursorContainer.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursorContainer.style.opacity = '1';
});

// --- 16-bit Bug Animation Logic ---
function triggerBug() {
    const bugContainer = document.getElementById('bug-container');
    const bugSvg = document.getElementById('pixel-bug');
    const sideView = document.getElementById('side-view');
    const frontView = document.getElementById('front-view');
    if (!bugContainer || !bugSvg || !sideView || !frontView) return;

    // Reset bug position and view
    bugContainer.style.transition = 'none';
    bugContainer.style.transform = `translateX(-100px)`; 
    bugSvg.style.transform = 'scale(1, 1)';
    bugSvg.style.transition = 'none';
    sideView.style.display = 'block';
    frontView.style.display = 'none';
    
    // Force reflow
    void bugContainer.offsetWidth;

    // Calculate time based on a constant speed (pixels per second)
    const speed = 250; 
    const walkInDistance = (window.innerWidth / 2) + 100;
    const walkInTime = walkInDistance / speed; // Time in seconds
    
    // Start running in
    bugContainer.style.transition = `transform ${walkInTime}s linear`;
    bugContainer.style.transform = `translateX(${window.innerWidth / 2}px)`;
    bugSvg.classList.add('bug-running');
    
    // Stop in the middle
    setTimeout(() => {
        bugSvg.classList.remove('bug-running');
        bugSvg.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        bugSvg.style.transform = 'scale(1.1, 0.8)'; // little squash
        
        // Turn to look at user
        setTimeout(() => {
            bugSvg.style.transform = 'scale(1, 1)'; // unsquash
            sideView.style.display = 'none';
            frontView.style.display = 'block';
            
            // Wait for a few seconds
            setTimeout(() => {
                // Turn back
                sideView.style.display = 'block';
                frontView.style.display = 'none';
                
                // Run off screen
                setTimeout(() => {
                    const walkOutDistance = (window.innerWidth / 2) + 100;
                    const walkOutTime = walkOutDistance / speed;
                    
                    bugSvg.style.transition = 'none';
                    bugSvg.classList.add('bug-running');
                    bugContainer.style.transition = `transform ${walkOutTime}s linear`;
                    bugContainer.style.transform = `translateX(${window.innerWidth + 100}px)`;
                    
                    // Reset for next time
                    setTimeout(() => {
                        bugSvg.classList.remove('bug-running');
                        bugContainer.style.transition = 'none';
                        bugContainer.style.transform = `translateX(-100px)`; 
                    }, (walkOutTime * 1000) + 100);
                    
                }, 300); 
            }, 2000); 
        }, 300); 
    }, walkInTime * 1000); 
}

// Ensure the bug runs once shortly after load
setTimeout(triggerBug, 1500);

// And then periodically random chances
setInterval(() => {
    const transform = document.getElementById('bug-container').style.transform;
    if (transform.includes('-100px')) {
        if (Math.random() > 0.4) {
            triggerBug();
        }
    }
}, 10000);