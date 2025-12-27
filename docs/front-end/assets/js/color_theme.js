document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const body = document.body;
    
    // Si ya pusiste la clase manualmente en el HTML (ej: <body class="algoritmos-page">),
    // no hacemos nada para evitar conflictos.
    if (body.classList.length > 0) return;

    // Lógica para detectar en qué sección estamos según el nombre del archivo o carpeta
    if (path.includes('algoritmos')) {
        body.classList.add('algoritmos-page'); // El CSS se encarga del rojo
        // Si es un TP específico, podemos agregar una clase extra si fuera necesario
        if (path.includes('tp1')) body.classList.add('tp1-algoritmos-page');
        
    } else if (path.includes('fisica')) {
        body.classList.add('fisica-page'); // El CSS se encarga del verde
        
    } else if (path.includes('algebra')) {
        body.classList.add('algebra-page'); // El CSS se encarga del amarillo
        
    } else {
        // Si no es ninguna de las anteriores, asumimos que es el Index
        body.classList.add('index-page');
    }
});