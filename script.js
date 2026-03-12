// Initialize Lucide icons
lucide.createIcons();

const cursorContainer = document.getElementById('cursor-container');
const glow = document.getElementById('cursor-glow');

// Mouse move listener for the lighting effect
window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Move the container which holds both dot and glow
    requestAnimationFrame(() => {
        cursorContainer.style.left = `${x}px`;
        cursorContainer.style.top = `${y}px`;
    });
});

// Highlight interaction logic
const interactiveElements = document.querySelectorAll('.social-link, h1');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        glow.style.width = '550px';
        glow.style.height = '550px';
        // Consistent gradient with more stops to prevent Firefox banding
        glow.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 30%, rgba(255, 255, 255, 0.03) 60%, rgba(255, 255, 255, 0) 80%)';
    });

    el.addEventListener('mouseleave', () => {
        glow.style.width = '350px';
        glow.style.height = '350px';
        glow.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 30%, rgba(255, 255, 255, 0.02) 60%, rgba(255, 255, 255, 0) 80%)';
    });
});

// Hide cursor container when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursorContainer.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursorContainer.style.opacity = '1';
});