document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM
    const navContainer = document.querySelector('.nav-points'); // Contenedor para delegación
    const points = document.querySelectorAll('.nav-point');
    const slides = document.querySelectorAll('.slide');
    const counter = document.getElementById('current-punto');
    
    // Estado interno: índice actual (empieza en 0 para coincidir con Arrays)
    let activeIndex = 0;

    // Función optimizada: Solo toca los elementos necesarios
    const setActive = (index) => {
        // 1. Validar límites
        if (index < 0 || index >= points.length) return;

        // 2. Apagar el elemento que estaba activo antes
        points[activeIndex].classList.remove('active');
        slides[activeIndex].classList.remove('active');

        // 3. Actualizar índice
        activeIndex = index;

        // 4. Encender el nuevo elemento
        points[activeIndex].classList.add('active');
        slides[activeIndex].classList.add('active');

        // 5. Actualizar contador visual (+1 porque el array es base 0)
        if (counter) counter.textContent = activeIndex + 1;

        // 6. Scroll suave en el menú (UX móvil)
        points[activeIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    };

    // Event Listener 1: Clics (Delegación de eventos)
    if (navContainer) {
        navContainer.addEventListener('click', (e) => {
            // Detectar si el clic fue en un botón o dentro de uno
            const btn = e.target.closest('.nav-point');
            if (!btn) return;

            // Leer el número del atributo data-point y restar 1 para obtener índice
            const newIndex = parseInt(btn.dataset.point) - 1;
            setActive(newIndex);
        });
    }

    // Event Listener 2: Teclado (Flechas)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') setActive(activeIndex - 1);
        if (e.key === 'ArrowRight') setActive(activeIndex + 1);
    });

    // Inicialización: Asegurar que el primero esté activo
    // (Opcional: Si el HTML ya tiene la clase 'active' en el primero, esto no hace falta, pero previene errores)
    if (points.length > 0) {
        setActive(0);
    }
});