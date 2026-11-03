const langToggle = document.getElementById('lang-toggle');
const langMenu = document.getElementById('lang-menu');
const langOptions = document.querySelectorAll('.lang-option');

// Carga el archivo JSON correspondiente a la nueva ruta
async function loadTranslations(lang) {
    try {
        const response = await fetch(`front-end/assets/languages/${lang}.json`);
        if (!response.ok) throw new Error('Error al cargar el archivo de idioma');
        
        const translations = await response.json();
        
        // Actualiza el DOM
        document.documentElement.lang = lang;
        localStorage.setItem('preferred-language', lang);
        
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            const key = elem.getAttribute('data-i18n');
            if (translations[key]) {
                elem.innerHTML = translations[key];
            }
        });
    } catch (error) {
        console.error("No se pudo aplicar la traducción:", error);
    }
}

// Lógica de detección automática
function initLanguage() {
    const savedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language.slice(0, 2); 
    
    let defaultLang = 'es'; // Fallback absoluto
    
    if (savedLang) {
        // Prioriza la elección manual del usuario
        defaultLang = savedLang;
    } else if (browserLang === 'en' || browserLang === 'es') {
        // Si no eligió nada, pero su navegador es EN o ES, usa ese
        defaultLang = browserLang;
    } 
    // Si su navegador es FR, IT, etc., defaultLang ya es 'es'.
    
    loadTranslations(defaultLang);
}

// Eventos del botón traductor
if (langToggle && langMenu) {
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation(); 
        langMenu.classList.toggle('show');
    });

    langOptions.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            loadTranslations(selectedLang);
            langMenu.classList.remove('show');
        });
    });

    // Cierra el menú al hacer clic afuera
    document.addEventListener('click', (e) => {
        if (!langMenu.contains(e.target) && !langToggle.contains(e.target)) {
            langMenu.classList.remove('show');
        }
    });
}

document.addEventListener('DOMContentLoaded', initLanguage);