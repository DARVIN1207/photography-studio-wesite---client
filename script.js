document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Header Scroll Logic
    const header = document.querySelector('.main-header');
    const topBar = document.querySelector('.top-info-bar');
    const studioName = document.querySelector('.studio-name');
    const studioSubtitle = document.querySelector('.studio-subtitle');
    const goldUnderline = document.querySelector('.gold-underline');

    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Scrolled State
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('minimal');
            topBar.classList.remove('hidden');
        }

        // Minimal State (Scroll Down vs Up)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling Down
            header.classList.add('minimal');
            topBar.classList.add('hidden');
            if (studioSubtitle) studioSubtitle.style.opacity = '0';
            if (goldUnderline) goldUnderline.style.transform = 'scaleX(0)';
        } else if (currentScrollY < lastScrollY) {
            // Scrolling Up
            header.classList.remove('minimal');
            topBar.classList.remove('hidden');
            if (studioSubtitle) studioSubtitle.style.opacity = '1';
            if (goldUnderline) goldUnderline.style.transform = 'scaleX(1)';
        }

        lastScrollY = currentScrollY;
    });

    // 3. Fade In Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger animation by adding class
                if (entry.target.classList.contains('fade-in-scroll')) {
                    entry.target.style.animationPlayState = 'running';
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-up, .glass-card').forEach(el => {
        el.classList.add('fade-in'); // Ensure base class
        observer.observe(el);
    });

    // 4. Active Link Highlight
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .bottom-nav-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href === 'index.html') || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});
