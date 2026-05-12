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

                partLinks.forEach(l => l.classList.remove("active"));
                this.classList.add("active");

                sections.forEach(section => {
                    section.style.display = "none";
                    section.classList.remove("active");
                });
                
                const targetSection = document.getElementById(`contenedor-parte-${partNumber}`);
                targetSection.style.display = "block";
                targetSection.classList.add("active");

                sideMenuContainer.classList.remove("open");

                if (typeof inicializarPuntos === 'function') {
                    inicializarPuntos();
                }
            });
        });

        document.addEventListener("click", (e) => {
            if (sideMenuContainer.classList.contains("open") && !sideMenuContainer.contains(e.target)) {
                sideMenuContainer.classList.remove("open");
            }
        });
    }
});