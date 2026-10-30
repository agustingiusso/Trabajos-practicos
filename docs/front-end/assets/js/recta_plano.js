(function() {
    let rpChart2D = null;
    let rpColors = {};
    let isUpdating = false;

    const X_VALS = [0, 10, 20, 30, 40, 50];
    const Y_VALS_3D = [0, 20, 40, 60, 80, 100];

    document.addEventListener('DOMContentLoaded', () => {
        const canvas2D = document.getElementById('grafico2D');
        const container3D = document.getElementById('grafico3D');
        if (!canvas2D || !container3D) return;

        initRPApp(canvas2D, container3D);
    });

    function initRPApp(canvas2D, container3D) {
        const ui = {
            ctx2D: canvas2D.getContext('2d'),
            container3D,
            sliderM: document.getElementById('slider-m'),
            sliderD: document.getElementById('slider-d'),
            valM: document.getElementById('val-m'),
            valD: document.getElementById('val-d'),
            calculoBox: document.getElementById('calculo-2d'),
            sliderA: document.getElementById('slider-A'),
            sliderB: document.getElementById('slider-B'),
            sliderDelta: document.getElementById('slider-delta'),
            valA: document.getElementById('val-A'),
            valB: document.getElementById('val-B'),
            valDelta: document.getElementById('val-delta')
        };

        updateRPThemeColors();

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

        [ui.sliderM, ui.sliderD, ui.sliderA, ui.sliderB, ui.sliderDelta].forEach(input => {
            input?.addEventListener('input', requestUpdate);
        });

        requestUpdate();

        window.addEventListener('resize', () => {
            if (window.Plotly) Plotly.Plots.resize(container3D);
        });

        new MutationObserver(() => {
            updateRPThemeColors();
            requestUpdate();
        }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    function updateRPThemeColors() {
        const style = getComputedStyle(document.body);
        const accent = style.getPropertyValue('--color-algebra').trim() || '#f1c40f';
        rpColors = {
            accent,
            text: style.getPropertyValue('--text-color').trim() || '#333',
            grid: style.getPropertyValue('--table-border-color').trim() || '#ccc',
            fill: accent + '33'
        };
    }

    function updateRPChart2D(ui) {
        if (!ui.sliderM) return;

        const m = parseFloat(ui.sliderM.value);
        const d = parseFloat(ui.sliderD.value);

        if (ui.valM) ui.valM.textContent = m.toFixed(1);
        if (ui.valD) ui.valD.textContent = d.toFixed(0);

        if (ui.calculoBox) {
            const res = (10 - d) / m;
            const txtRes = res < 0 ? "\\text{Imposible}" : (!isFinite(res) ? "\\infty" : res.toFixed(1));
            const latex = `$$ x = \\frac{10 - ${d}}{${m}} = \\mathbf{${txtRes}} $$`;

            if (ui.calculoBox.dataset.lastLatex !== latex) {
                ui.calculoBox.innerHTML = latex;
                ui.calculoBox.dataset.lastLatex = latex;
                window.MathJax?.typesetPromise?.([ui.calculoBox]).catch(() => {});
            }
        }

        const yVals = X_VALS.map(x => m * x + d);

        if (rpChart2D) {
            const dataset = rpChart2D.data.datasets[0];
            dataset.data = yVals;
            dataset.label = `T = ${m.toFixed(1)}x + ${d}`;
            dataset.borderColor = rpColors.accent;
            dataset.backgroundColor = rpColors.fill;

            const { x, y } = rpChart2D.options.scales;
            x.ticks.color = y.ticks.color = rpColors.text;
            x.grid.color = y.grid.color = rpColors.grid;
            rpChart2D.update('none');
        } else {
            rpChart2D = new Chart(ui.ctx2D, {
                type: 'line',
                data: {
                    labels: X_VALS,
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
                    animation: { duration: 0 },
                    scales: {
                        x: { title: { display: true, text: 'Usuarios (x)', color: rpColors.text }, ticks: { color: rpColors.text }, grid: { color: rpColors.grid } },
                        y: { title: { display: true, text: 'Tiempo (T)', color: rpColors.text }, ticks: { color: rpColors.text }, grid: { color: rpColors.grid }, beginAtZero: true }
                    },
                    plugins: { legend: { labels: { color: rpColors.text } } }
                }
            });
        }
    }

    function updateRPChart3D(ui) {
        if (!ui.container3D || !ui.sliderA || !window.Plotly) return;

        const A = parseFloat(ui.sliderA.value);
        const B = parseFloat(ui.sliderB.value);
        const delta = parseFloat(ui.sliderDelta.value);

        if (ui.valA) ui.valA.textContent = A.toFixed(1);
        if (ui.valB) ui.valB.textContent = B.toFixed(1);
        if (ui.valDelta) ui.valDelta.textContent = delta.toFixed(0);

        const zVals = Y_VALS_3D.map(y => X_VALS.map(x => A * x + B * y + delta));

        const data = [{
            type: 'surface',
            x: X_VALS, y: Y_VALS_3D, z: zVals,
            colorscale: 'Viridis', showscale: false, opacity: 0.9,
            contours: { z: { show: true, usecolormap: true, highlightcolor: "#42f462", project: { z: true } } }
        }];

        const axisStyle = (title) => ({ title, color: rpColors.text, tickcolor: rpColors.text });

        const layout = {
            title: { text: `z = ${A}x + ${B}y + ${delta}`, font: { color: rpColors.text } },
            autosize: true,
            margin: { l: 0, r: 0, b: 0, t: 30 },
            paper_bgcolor: 'transparent',
            plot_bgcolor: 'transparent',
            scene: {
                xaxis: axisStyle('Usuarios'),
                yaxis: axisStyle('Archivos'),
                zaxis: axisStyle('Tiempo')
            }
        };

        Plotly.react(ui.container3D, data, layout, { responsive: true, displayModeBar: false });
    }
})();