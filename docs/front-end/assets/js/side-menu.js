document.addEventListener("DOMContentLoaded", () => {
    const sideMenuContainer = document.getElementById("side-parts-menu");
    const toggleBtn = document.getElementById("side-menu-toggle");
    if (!toggleBtn || !sideMenuContainer) return;

    const partLinks = document.querySelectorAll(".part-link");
    const sections = document.querySelectorAll(".part-section");
    const navPoints = document.querySelectorAll(".nav-point");

    toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        sideMenuContainer.classList.toggle("open");
    });

    partLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const partNumber = this.dataset.part;

            partLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            sections.forEach(section => {
                section.style.display = "none";
                section.classList.remove("active");
            });

            const targetSection = document.getElementById(`contenedor-parte-${partNumber}`);
            if (targetSection) {
                targetSection.style.display = "block";
                targetSection.classList.add("active");

                const slideCount = targetSection.querySelectorAll('.slide').length;
                navPoints.forEach((punto, index) => {
                    punto.style.display = index < slideCount ? '' : 'none';
                });
            }

            if (typeof window.setActive === 'function') window.setActive(0);
            sideMenuContainer.classList.remove("open");
        });
    });

    document.addEventListener("click", (e) => {
        if (sideMenuContainer.classList.contains("open") && !sideMenuContainer.contains(e.target)) {
            sideMenuContainer.classList.remove("open");
        }
    });
});