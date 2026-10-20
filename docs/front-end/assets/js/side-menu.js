document.addEventListener("DOMContentLoaded", function() {
    const sideMenuContainer = document.getElementById("side-parts-menu");
    const toggleBtn = document.getElementById("side-menu-toggle");
    const partLinks = document.querySelectorAll(".part-link");
    const sections = document.querySelectorAll(".part-section");

    if (toggleBtn && sideMenuContainer) {
        
        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            sideMenuContainer.classList.toggle("open");
        });

        partLinks.forEach(link => {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const partNumber = this.getAttribute("data-part");

                // Actualizar enlace activo en el menú
                partLinks.forEach(l => l.classList.remove("active"));
                this.classList.add("active");

                // Ocultar todas las secciones principales
                sections.forEach(section => {
                    section.style.display = "none";
                    section.classList.remove("active");
                });
                
                // Mostrar la sección objetivo (Parte 1 o Parte 2)
                const targetSection = document.getElementById(`contenedor-parte-${partNumber}`);
                targetSection.style.display = "block";
                targetSection.classList.add("active");

                // Contar cuántos slides tiene esta nueva sección
                const currentSlides = targetSection.querySelectorAll('.slide');
                const navPoints = document.querySelectorAll('.nav-point');
                
                // Ocultar dinámicamente los puntitos que sobran
                navPoints.forEach((punto, index) => {
                    if (index < currentSlides.length) {
                        punto.style.display = ''; // Muestra el punto
                    } else {
                        punto.style.display = 'none'; // Oculta el punto
                    }
                });

                // Reiniciar el selector de puntos a la primera diapositiva (01)
                if (typeof window.setActive === 'function') {
                    window.setActive(0);
                }

                // Cerrar el menú lateral
                sideMenuContainer.classList.remove("open");
            });
        });

        document.addEventListener("click", (e) => {
            if (sideMenuContainer.classList.contains("open") && !sideMenuContainer.contains(e.target)) {
                sideMenuContainer.classList.remove("open");
            }
        });
    }
});