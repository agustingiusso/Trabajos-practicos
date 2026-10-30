/**
 * iys_2do_parcial_2d.js
 * Controlador de Pestañas de Exposición y Simulador 2D en Canvas
 * (Modelo Toyotista Pull vs Fordista + KPIs ODS 8, 9 y 12)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================================
       1. NAVEGACIÓN DE PANELES DE EXPOSICIÓN (SLIDE CONTROLS)
       ========================================================================= */
    const navTabs = document.querySelectorAll('#iys-nav-tabs .nav-point');
    const slidePanels = document.querySelectorAll('.iys-slide-panel');

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');

            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (targetId === 'ALL') {
                slidePanels.forEach(panel => panel.classList.add('active-slide'));
            } else {
                slidePanels.forEach(panel => {
                    if (panel.id === targetId) {
                        panel.classList.add('active-slide');
                    } else {
                        panel.classList.remove('active-slide');
                    }
                });
            }

            // Redimensionar canvas 2D y 3D al mostrar la pestaña de simuladores
            window.dispatchEvent(new Event('resize'));
            draw2DSimulation();
        });
    });

    /* =========================================================================
       2. SIMULADOR 2D EN CANVAS: TOYOTISMO (PULL) VS FORDISMO + MÉTRICAS ODS
       ========================================================================= */
    const canvas = document.getElementById('nebolas-2d-canvas');
    const sliderDemanda = document.getElementById('sim2d-demanda');
    const sliderOrujo = document.getElementById('sim2d-orujo');
    const sliderPolivalencia = document.getElementById('sim2d-polivalencia');

    const valDemanda = document.getElementById('val-sim2d-demanda');
    const valOrujo = document.getElementById('val-sim2d-orujo');
    const valPolivalencia = document.getElementById('val-sim2d-polivalencia');
    const summaryBox = document.getElementById('sim2d-summary-box');

    function draw2DSimulation() {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        const width = parent.clientWidth - 24 || 550;
        const height = parent.clientHeight - 24 || 360;

        canvas.width = width;
        canvas.height = height;

        const demanda = parseInt(sliderDemanda ? sliderDemanda.value : 12000, 10);
        const orujoPct = parseInt(sliderOrujo ? sliderOrujo.value : 15, 10);
        const polivalenciaPct = parseInt(sliderPolivalencia ? sliderPolivalencia.value : 85, 10);

        if (valDemanda) valDemanda.textContent = demanda.toLocaleString('es-AR');
        if (valOrujo) valOrujo.textContent = `${orujoPct}%`;
        if (valPolivalencia) valPolivalencia.textContent = `${polivalenciaPct}%`;

        // Cálculos de simulación ingenieril
        const mermaToyotistaPct = Math.max(1.1, (4.2 - (polivalenciaPct * 0.025))).toFixed(1);
        const mermaFordistaPct = (9.5 + (25000 - demanda) * 0.0003).toFixed(1);
        const kwhPorPack = (0.19 - (polivalenciaPct * 0.0004)).toFixed(2);
        const orujoRevalorizadoKg = Math.round(demanda * 0.18 * (orujoPct / 100));
        const oeeScore = Math.min(96, Math.round(68 + polivalenciaPct * 0.26));

        if (summaryBox) {
            summaryBox.innerHTML = `
                <strong>Telemetría Estimada de Planta:</strong><br>
                • <strong>Merma Nébolas NB (Pull):</strong> ${mermaToyotistaPct}% vs. ${mermaFordistaPct}% (Fordismo)<br>
                • <strong>Eficiencia Energética (ODS 9/12):</strong> ${kwhPorPack} kWh / paquete<br>
                • <strong>Orujo Revalorizado (ODS 12):</strong> ${orujoRevalorizadoKg} kg / mes<br>
                • <strong>Índice OEE / Calidad (ODS 8/9):</strong> ${oeeScore}% unidades óptimas
            `;
        }

        // Colores adaptados al tema
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#e0e0e0' : '#1e293b';
        const mutedColor = isDark ? '#94a3b8' : '#64748b';
        const gridColor = isDark ? '#2d3748' : '#cbd5e1';

        ctx.clearRect(0, 0, width, height);

        // Título del gráfico
        ctx.fillStyle = textColor;
        ctx.font = 'bold 14px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Desempeño Comparado: Sistema Híbrido Nébolas NB vs. Producción por Oferta', width / 2, 24);

        const metrics = [
            {
                label: 'Aprovechamiento Materia Prima (%)',
                nebolas: 100 - parseFloat(mermaToyotistaPct),
                tradicional: 100 - parseFloat(mermaFordistaPct),
                color: '#9b59b6'
            },
            {
                label: 'Eficiencia OEE y Calidad de Lote (%)',
                nebolas: oeeScore,
                tradicional: 71,
                color: '#8e44ad'
            },
            {
                label: 'Índice ODS (Trabajo + Circularidad)',
                nebolas: Math.min(98, Math.round(polivalenciaPct * 0.65 + orujoPct * 1.1)),
                tradicional: 45,
                color: '#2ecc71'
            }
        ];

        const chartTop = 60;
        const chartBottom = height - 45;
        const chartLeft = 55;
        const chartRight = width - 25;
        const chartHeight = chartBottom - chartTop;

        // Líneas horizontales de escala (0% a 100%)
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.font = '11px monospace';
        ctx.fillStyle = mutedColor;
        ctx.textAlign = 'right';

        for (let pct = 0; pct <= 100; pct += 25) {
            const y = chartBottom - (pct / 100) * chartHeight;
            ctx.beginPath();
            ctx.moveTo(chartLeft, y);
            ctx.lineTo(chartRight, y);
            ctx.stroke();
            ctx.fillText(`${pct}%`, chartLeft - 8, y + 4);
        }

        // Dibujo de barras agrupadas
        const groupWidth = (chartRight - chartLeft) / metrics.length;
        const barWidth = Math.min(48, groupWidth * 0.28);

        metrics.forEach((m, idx) => {
            const centerX = chartLeft + groupWidth * idx + groupWidth / 2;

            // Barra Nébolas NB
            const hNeb = (m.nebolas / 100) * chartHeight;
            const xNeb = centerX - barWidth - 4;
            const yNeb = chartBottom - hNeb;

            ctx.fillStyle = m.color;
            ctx.beginPath();
            ctx.roundRect(xNeb, yNeb, barWidth, hNeb, [5, 5, 0, 0]);
            ctx.fill();

            ctx.fillStyle = textColor;
            ctx.font = 'bold 12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(`${m.nebolas.toFixed(0)}%`, xNeb + barWidth / 2, yNeb - 6);

            // Barra Tradicional (Fordista)
            const hTrad = (m.tradicional / 100) * chartHeight;
            const xTrad = centerX + 4;
            const yTrad = chartBottom - hTrad;

            ctx.fillStyle = isDark ? '#475569' : '#94a3b8';
            ctx.beginPath();
            ctx.roundRect(xTrad, yTrad, barWidth, hTrad, [5, 5, 0, 0]);
            ctx.fill();

            ctx.fillStyle = mutedColor;
            ctx.font = '11px monospace';
            ctx.fillText(`${m.tradicional.toFixed(0)}%`, xTrad + barWidth / 2, yTrad - 6);

            // Etiqueta eje X
            ctx.fillStyle = textColor;
            ctx.font = '600 11.5px "Segoe UI", sans-serif';
            ctx.fillText(m.label, centerX, chartBottom + 20);
        });

        // Leyenda inferior
        ctx.font = '11.5px "Segoe UI", sans-serif';
        ctx.fillStyle = '#9b59b6';
        ctx.fillRect(chartLeft, height - 14, 12, 12);
        ctx.fillStyle = textColor;
        ctx.textAlign = 'left';
        ctx.fillText('Nébolas NB (Híbrido Toyotista + ERP + CTS)', chartLeft + 18, height - 4);

        ctx.fillStyle = isDark ? '#475569' : '#94a3b8';
        ctx.fillRect(chartLeft + 290, height - 14, 12, 12);
        ctx.fillStyle = mutedColor;
        ctx.fillText('Modelo Tradicional por Oferta (Sin Trazabilidad)', chartLeft + 308, height - 4);
    }

    [sliderDemanda, sliderOrujo, sliderPolivalencia].forEach(sl => {
        if (sl) sl.addEventListener('input', draw2DSimulation);
    });

    window.addEventListener('resize', draw2DSimulation);

    const themeObserver = new MutationObserver(draw2DSimulation);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    draw2DSimulation();
});