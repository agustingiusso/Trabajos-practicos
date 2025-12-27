document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.theme-btn');
    const root = document.documentElement;
    const STORAGE_KEY = 'tp-theme';

    // Iconos SVG Minificados
    const icons = {
        sun: '<svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.5 4.9l1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1zm14.2 14.2 1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1zm-14.2 0 2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4zm14.2-14.2 2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4z"/></svg>',
        moon: '<svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/></svg>'
    };

    // 1. Obtener tema inicial (LocalStorage > Sistema > Dark por defecto)
    const getPreferredTheme = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // 2. Función para aplicar el tema
    const setTheme = (theme, animate = false) => {
        // Si es carga inicial, desactivamos transición para evitar "flash"
        if (!animate) root.style.transition = 'none';

        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        
        // Actualizar icono si el botón existe
        if (toggleBtn) {
            toggleBtn.innerHTML = theme === 'dark' ? icons.moon : icons.sun;
        }

        // Restaurar transición CSS después de un breve delay
        if (!animate) {
            setTimeout(() => root.style.transition = '', 20);
        }
    };

    // 3. Inicializar
    setTheme(getPreferredTheme(), false);

    // 4. Listener del botón
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            
            // Efecto visual de rebote en el botón
            toggleBtn.classList.add('theme-active');
            setTimeout(() => toggleBtn.classList.remove('theme-active'), 300);
            
            setTheme(next, true);
        });
    }
});