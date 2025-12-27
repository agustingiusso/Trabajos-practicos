// Desc: Configuración y carga segura de MathJax 3

// 1. Configuración Global
window.MathJax = {
    tex: {
        // Habilita $ para fórmulas en línea y $$ para bloque
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    options: {
        // No procesar etiquetas internas de código
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    }
};

// 2. Carga del Script (Optimizada y sin Polyfill peligroso)
(function() {
    // Evita cargar el script si ya existe en el DOM
    if (document.getElementById('MathJax-script')) return;

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.id = 'MathJax-script';
    script.async = true;
    document.head.appendChild(script);
})();