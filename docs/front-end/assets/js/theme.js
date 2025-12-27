/**
 * Archivo: theme.js (Unificado)
 * Funciones:
 * 1. Control del Tema (Oscuro/Claro) - Previene parpadeo (FOUC).
 * 2. Detección de Sección (Asigna clases al body según la URL).
 * 3. Animaciones del Index (Si corresponde).
 */

(function() {
    // --- 1. LÓGICA CRÍTICA (Se ejecuta inmediatamente) ---
    const STORAGE_KEY = 'tp-theme';
    const root = document.documentElement;
    const body = document.body;
    const path = window.location.pathname;

    // A. Gestión del Tema
    const getPreferredTheme = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const initialTheme = getPreferredTheme();
    root.setAttribute('data-theme', initialTheme);

    // B. Gestión de Clases por Página (Reemplaza a color_theme.js)
    // Solo agrega clase si no tiene una ya asignada manualmente en el HTML
    if (body.classList.length === 0 || (body.classList.length === 1 && body.classList.contains('fisica-page'))) {
        if (path.includes('algoritmos')) {
            body.classList.add('algoritmos-page');
            if (path.includes('tp1')) body.classList.add('tp1-algoritmos-page');
        } else if (path.includes('fisica')) {
            body.classList.add('fisica-page');
        } else if (path.includes('algebra')) {
            body.classList.add('algebra-page');
        } else if (path.includes('index') || path === '/' || path.endsWith('/')) {
            body.classList.add('index-page');
        }
    }

    // Exponer función global para cambios
    window.applyThemeUI = function(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    };
})();

// --- 2. LÓGICA DE UI (Al cargar el DOM) ---
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle') || document.querySelector('.theme-btn');
    const root = document.documentElement;
    const cards = document.querySelectorAll('.materia-card'); // Elementos del Index
    
    // Definición de Iconos
    const icons = {
        sun: '<svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.5 4.9l1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1zm14.2 14.2 1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1zm-14.2 0 2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4zm14.2-14.2 2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4z"/></svg>',
        moon: '<svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/></svg>'
    };

    // A. Inicializar Botón
    if (toggleBtn) {
        const currentTheme = root.getAttribute('data-theme');
        toggleBtn.innerHTML = currentTheme === 'dark' ? icons.moon : icons.sun;

        toggleBtn.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            
            // Animación visual
            toggleBtn.classList.add('theme-active');
            setTimeout(() => toggleBtn.classList.remove('theme-active'), 300);
            
            // Aplicar cambio
            window.applyThemeUI(next);
            toggleBtn.innerHTML = next === 'dark' ? icons.moon : icons.sun;
        });
    }

    // B. Activar transiciones suaves (Delay para evitar flash inicial)
    setTimeout(() => {
        root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);

    // C. Animaciones del Index (Solo si existen tarjetas)
    if (cards.length > 0) {
        cards.forEach((card, i) => card.style.animationDelay = `${i * 0.1}s`);
    }
});