document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.querySelector('.nav-points'); 
    const counter = document.getElementById('current-punto');
    
    let activeIndex = 0;

    window.setActive = function(index) {
        // 1. Identificar la sección actual visible o usar el contenedor general si no hay partes
        const activeSection = document.querySelector('.part-section.active') || document.querySelector('.slides-container');
        if (!activeSection) return;

        // 2. Obtener SOLO los slides de la sección actual
        const currentSlides = activeSection.querySelectorAll('article.slide');
        
        // 3. Obtener SOLO los puntos de navegación que están VISIBLES
        // Array.from permite usar filter() en un NodeList
        const visiblePoints = Array.from(document.querySelectorAll('.nav-point')).filter(p => p.style.display !== 'none');

        // 4. Validar límites
        if (index < 0 || index >= currentSlides.length || index >= visiblePoints.length) return;

        // 5. Apagar el punto que estaba activo
        const currentActivePoint = document.querySelector('.nav-point.active');
        if (currentActivePoint) currentActivePoint.classList.remove('active');
        
        // Apagar el slide que estaba activo
        const currentActiveSlide = activeSection.querySelector('article.slide.active');
        if (currentActiveSlide) currentActiveSlide.classList.remove('active');

        // 6. Actualizar y encender el nuevo
        activeIndex = index;
        visiblePoints[activeIndex].classList.add('active');
        currentSlides[activeIndex].classList.add('active');

        // 7. Actualizar contador visual si existe
        if (counter) counter.textContent = activeIndex + 1;

        // 8. Scroll suave
        visiblePoints[activeIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    };

    // Event Listener 1: Clics 
    if (navContainer) {
        navContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.nav-point');
            if (!btn) return;
            
            const newIndex = parseInt(btn.dataset.point) - 1;
            
            // Solo cambia si se tocó un punto distinto al actual
            if (newIndex !== activeIndex) {
                window.setActive(newIndex);
            }
        });
    }

    // Event Listener 2: Teclado (Flechas)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') window.setActive(activeIndex - 1);
        else if (e.key === 'ArrowRight') window.setActive(activeIndex + 1);
    });

    // Inicialización: Esperar un pequeño delay para que side-menu oculte los puntos si es necesario
    setTimeout(() => {
        window.setActive(0);
    }, 10);
});