window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true //
    },
    options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    },
    svg: { fontCache: 'global' }
};

(function() {
    if (document.getElementById('MathJax-script')) return;

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.id = 'MathJax-script';
    script.async = true;
    document.head.appendChild(script);
})();