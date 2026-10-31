(function() {
    const STORAGE_KEY = 'tp-theme';
    const root = document.documentElement;

    const initialTheme = localStorage.getItem(STORAGE_KEY) ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    root.setAttribute('data-theme', initialTheme);

    window.applyThemeUI = function(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const body = document.body;
    const path = window.location.pathname;
    const toggleBtn = document.getElementById('theme-toggle') || document.querySelector('.theme-btn');

    if (body.classList.length === 0 || (body.classList.length === 1 && body.classList.contains('fisica-page'))) {
        if (path.includes('algoritmos')) {
            body.classList.add('algoritmos-page');
            if (path.includes('tp1')) body.classList.add('tp1-algoritmos-page');
        } else if (path.includes('fisica')) {
            body.classList.add('fisica-page');
        } else if (path.includes('algebra')) {
            body.classList.add('algebra-page');
        } else if (path.includes('index') || path.endsWith('/')) {
            body.classList.add('index-page');
        }
    }

    const icons = {
        sun: '<svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.5 4.9l1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1zm14.2 14.2 1.4 1.4-2.1 2.1-1.4-1.4 2.1-2.1zm-14.2 0 2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4zm14.2-14.2 2.1-2.1 1.4 1.4-2.1 2.1-1.4-1.4z"/></svg>',
        moon: '<svg class="theme-icon" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z"/></svg>'
    };

    if (toggleBtn) {
        const updateIcon = (theme) => {
            toggleBtn.innerHTML = theme === 'dark' ? icons.moon : icons.sun;
        };

        updateIcon(root.getAttribute('data-theme'));

        toggleBtn.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            toggleBtn.classList.add('theme-active');
            setTimeout(() => toggleBtn.classList.remove('theme-active'), 300);

            window.applyThemeUI(next);
            updateIcon(next);
        });
    }

    setTimeout(() => {
        root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    }, 100);

    document.querySelectorAll('.materia-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.1}s`;
    });
});