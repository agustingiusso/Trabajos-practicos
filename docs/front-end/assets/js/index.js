document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --- Spotlight que sigue al mouse --- */
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });

    /* --- Scroll reveal --- */
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const selector = '.section-header, .feature-card, .materia-card, .stack-badge, .tech-stack-section h3';
    const targets = document.querySelectorAll(selector);

    targets.forEach(el => {
        // Índice entre hermanos -> delay escalonado
        const siblings = [...el.parentElement.children].filter(c => c.matches(selector));
        el.style.setProperty('--i', siblings.indexOf(el));
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add('is-visible');
            observer.unobserve(el);

            // Al terminar, limpio las clases para que vuelvan tus transiciones/hover originales
            setTimeout(() => el.classList.remove('reveal', 'is-visible'), 1200);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
});