document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const cards = document.querySelectorAll('.materia-card');
    const STORAGE_KEY = 'tp-theme';

    // Iconos SVG (Minificados para ahorrar espacio)
    const icons = {
        sun: '<svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.5 4.9l1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1zm14.2 14.2 1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1zm-14.2 0 2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4zm14.2-14.2 2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4z"/></svg>',
        moon: '<svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/></svg>'
    };

    // 1. Determinar tema inicial (Preferencia guardada > Sistema > Dark por defecto)
    const getStoredTheme = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // 2. Función para aplicar cambios
    const setTheme = (theme, withTransition = true) => {
        // Evitar transiciones al cargar la página para que no haya "flashes"
        if (!withTransition) {
            root.style.transition = 'none';
        }

        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        toggleBtn.innerHTML = theme === 'dark' ? icons.moon : icons.sun;

        // Reactivar transiciones si se desactivaron
        if (!withTransition) {
            setTimeout(() => {
                root.style.transition = ''; // Vuelve al valor del CSS
            }, 50);
        }
    };

    // 3. Inicializar (Sin transición)
    setTheme(getStoredTheme(), false);

    // 4. Event Listener para el botón
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            
            // Animación visual del botón
            toggleBtn.classList.add('theme-active');
            setTimeout(() => toggleBtn.classList.remove('theme-active'), 300);
            
            setTheme(next, true);
        });
    }

    // 5. Efecto cascada para las tarjetas (Animation Delay)
    if (cards.length > 0) {
        cards.forEach((card, i) => card.style.animationDelay = `${i * 0.1}s`);
    }
});