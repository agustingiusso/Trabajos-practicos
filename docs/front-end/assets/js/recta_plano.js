/**
 * Archivo: recta_plano.js
 * Optimización: Rendimiento con requestAnimationFrame y MathJax asíncrono.
 */

(function() {
    // Variables locales
    let rpChart2D = null;
    let rpColors = {}; // Caché de colores para no consultar el DOM a cada rato
    let isUpdating = false; // Bandera para rendimiento (Throttle)

    document.addEventListener('DOMContentLoaded', () => {
        const canvas2D = document.getElementById('grafico2D');
        const container3D = document.getElementById('grafico3D');

        // Si no existen los contenedores, salimos (evita errores en otras páginas)
        if (!canvas2D || !container3D) return;

        initRPApp();
    });

    function initRPApp() {
        // Referencias UI
        const ui = {
            // 2D Controls
            sliderM: document.getElementById('slider-m'),
            sliderD: document.getElementById('slider-d'),
            valM: document.getElementById('val-m'),
            valD: document.getElementById('val-d'),
            calculoBox: document.getElementById('calculo-2d'),

            // 3D Controls
            sliderA: document.getElementById('slider-A'),
            sliderB: document.getElementById('slider-B'),
            sliderDelta: document.getElementById('slider-delta'),
            valA: document.getElementById('val-A'),
            valB: document.getElementById('val-B'),
            valDelta: document.getElementById('val-delta')
        };

        // 1. Cargar colores iniciales
        updateRPThemeColors();

        // 2. Función maestra de actualización (Optimizada)
        const requestUpdate = () => {
            if (!isUpdating) {
                isUpdating = true;
                requestAnimationFrame(() => {
                    updateRPChart2D(ui);
                    updateRPChart3D(ui);
                    isUpdating = false;
                });
            }
        };

        // 3. Listeners (Unificados)
        const inputs = [
            ui.sliderM, ui.sliderD, 
            ui.sliderA, ui.sliderB, ui.sliderDelta
        ];

        inputs.forEach(input => {
            if(input) input.addEventListener('input', requestUpdate);
        });

        // 4. Render inicial
        requestUpdate();

        // 5. Responsive y Tema
        window.addEventListener('resize', () => {
            const container3D = document.getElementById('grafico3D');
            if(container3D && window.Plotly) Plotly.Plots.resize(container3D);
        });

        // Observador de cambio de tema (Claro/Oscuro)
        new MutationObserver(() => {
            updateRPThemeColors();
            requestUpdate(); // Redibujar con nuevos colores
        }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    // --- GESTIÓN DE COLORES (Caché) ---
    function updateRPThemeColors() {
        const style = getComputedStyle(document.body);
        rpColors = {
            accent: style.getPropertyValue('--color-algebra').trim() || '#f1c40f',
            text: style.getPropertyValue('--text-color').trim() || '#333',
            grid: style.getPropertyValue('--table-border-color').trim() || '#ccc',
            // Versión transparente del color de acento
            fill: (style.getPropertyValue('--color-algebra').trim() || '#f1c40f') + '33' 
        };
    }

    // --- GRÁFICO 2D Y FÓRMULAS ---
    function updateRPChart2D(ui) {
        if (!ui.sliderM) return;

        const m = parseFloat(ui.sliderM.value);
        const d = parseFloat(ui.sliderD.value);

        // Actualizar textos de valores
        if(ui.valM) ui.valM.textContent = m.toFixed(1);
        if(ui.valD) ui.valD.textContent = d.toFixed(0);

        // --- MATHJAX (Fórmula Dinámica) ---
        if (ui.calculoBox) {
            const T_limit = 10;
            let res = (T_limit - d) / m;
            let txtRes = (res < 0) ? "\\text{Imposible}" : (!isFinite(res) ? "\\infty" : `${res.toFixed(1)}`);
            
            // Construir LaTeX
            const latex = `$$ x = \\frac{10 - ${d}}{${m}} = \\mathbf{${txtRes}} $$`;
            
            // Renderizado seguro (Solo si el contenido cambió)
            if (ui.calculoBox.getAttribute('data-last-latex') !== latex) {
                ui.calculoBox.innerHTML = latex;
                ui.calculoBox.setAttribute('data-last-latex', latex);
                
                if (window.MathJax && MathJax.typesetPromise) {
                    MathJax.typesetPromise([ui.calculoBox]).catch(() => {});
                }
            }
        }

        // --- CHART.JS (Gráfico) ---
        const xVals = [0, 10, 20, 30, 40, 50];
        const yVals = xVals.map(x => m * x + d);
        const ctx = document.getElementById('grafico2D').getContext('2d');

        if (rpChart2D) {
            // Actualización eficiente (sin recrear el gráfico)
            rpChart2D.data.datasets[0].data = yVals;
            rpChart2D.data.datasets[0].label = `T = ${m.toFixed(1)}x + ${d}`;
            rpChart2D.data.datasets[0].borderColor = rpColors.accent;
            rpChart2D.data.datasets[0].backgroundColor = rpColors.fill;
            
            // Actualizar colores de ejes si cambió el tema
            rpChart2D.options.scales.x.ticks.color = rpColors.text;
            rpChart2D.options.scales.y.ticks.color = rpColors.text;
            rpChart2D.options.scales.x.grid.color = rpColors.grid;
            rpChart2D.options.scales.y.grid.color = rpColors.grid;
            rpChart2D.update('none'); // 'none' para animación fluida en sliders
        } else {
            // Creación inicial
            rpChart2D = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: xVals,
                    datasets: [{
                        label: `T = ${m}x + ${d}`,
                        data: yVals,
                        borderColor: rpColors.accent,
                        backgroundColor: rpColors.fill,
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: { duration: 0 }, // Desactivar animación pesada al crear
                    scales: {
                        x: { title: { display: true, text: 'Usuarios (x)', color: rpColors.text }, ticks: { color: rpColors.text }, grid: { color: rpColors.grid } },
                        y: { title: { display: true, text: 'Tiempo (T)', color: rpColors.text }, ticks: { color: rpColors.text }, grid: { color: rpColors.grid }, beginAtZero: true }
                    },
                    plugins: { legend: { labels: { color: rpColors.text } } }
                }
            });
        }
    }

    // --- GRÁFICO 3D (PLOTLY) ---
    function updateRPChart3D(ui) {
        const container = document.getElementById('grafico3D');
        if (!container || !ui.sliderA || !window.Plotly) return;

        const A = parseFloat(ui.sliderA.value);
        const B = parseFloat(ui.sliderB.value);
        const delta = parseFloat(ui.sliderDelta.value);

        if(ui.valA) ui.valA.textContent = A.toFixed(1);
        if(ui.valB) ui.valB.textContent = B.toFixed(1);
        if(ui.valDelta) ui.valDelta.textContent = delta.toFixed(0);

        // Generar datos de superficie
        const xVals = [0, 10, 20, 30, 40, 50];
        const yVals = [0, 20, 40, 60, 80, 100];
        const zVals = yVals.map(y => xVals.map(x => A * x + B * y + delta));

        const data = [{
            type: 'surface',
            x: xVals, y: yVals, z: zVals,
            colorscale: 'Viridis', showscale: false, opacity: 0.9,
            contours: { z: { show: true, usecolormap: true, highlightcolor: "#42f462", project: { z: true } } }
        }];

        const layout = {
            title: { text: `z = ${A}x + ${B}y + ${delta}`, font: { color: rpColors.text } },
            autosize: true,
            margin: { l: 0, r: 0, b: 0, t: 30 },
            paper_bgcolor: 'transparent', 
            plot_bgcolor: 'transparent',
            scene: {
                xaxis: { title: 'Usuarios', color: rpColors.text, tickcolor: rpColors.text },
                yaxis: { title: 'Archivos', color: rpColors.text, tickcolor: rpColors.text },
                zaxis: { title: 'Tiempo', color: rpColors.text, tickcolor: rpColors.text }
            }
        };

        Plotly.react(container, data, layout, { responsive: true, displayModeBar: false });
    }

})();