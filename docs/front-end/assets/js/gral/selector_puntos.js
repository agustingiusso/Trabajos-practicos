document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.querySelector('.nav-points');
    const allNavPoints = Array.from(document.querySelectorAll('.nav-point'));
    const fallbackContainer = document.querySelector('.slides-container');
    const counter = document.getElementById('current-punto');

    let activeIndex = 0;

    window.setActive = function(index) {
        const activeSection = document.querySelector('.part-section.active') || fallbackContainer;
        if (!activeSection) return;

        const currentSlides = activeSection.querySelectorAll('article.slide');
        const visiblePoints = allNavPoints.filter(p => p.style.display !== 'none');

        if (index < 0 || index >= currentSlides.length || index >= visiblePoints.length) return;

        document.querySelector('.nav-point.active')?.classList.remove('active');
        activeSection.querySelector('article.slide.active')?.classList.remove('active');

        activeIndex = index;
        const targetPoint = visiblePoints[activeIndex];
        targetPoint.classList.add('active');
        currentSlides[activeIndex].classList.add('active');

        if (counter) counter.textContent = activeIndex + 1;

        targetPoint.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    };

    navContainer?.addEventListener('click', (e) => {
        const btn = e.target.closest('.nav-point');
        if (!btn) return;

        const newIndex = parseInt(btn.dataset.point, 10) - 1;
        if (newIndex !== activeIndex) window.setActive(newIndex);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') window.setActive(activeIndex - 1);
        else if (e.key === 'ArrowRight') window.setActive(activeIndex + 1);
    });

    setTimeout(() => window.setActive(0), 10);
});