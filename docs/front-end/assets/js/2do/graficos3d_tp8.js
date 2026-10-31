document.addEventListener('DOMContentLoaded', () => {
    const bodyStyle = getComputedStyle(document.body);
    const getCssVar = (name, fallback) => bodyStyle.getPropertyValue(name).trim() || fallback;

    const textColor = getCssVar('--text-color', '#ffffff');
    const gridColor = getCssVar('--table-border-color', '#444444');
    const colorB = '#3498db';
    const colorE = '#e74c3c';
    const colorFm = '#9b59b6';
    const colorV = '#f1c40f';
    const colorLoop = '#2ecc71';

    const createAxis = (title, range) => ({
        title,
        range,
        color: textColor,
        gridcolor: gridColor,
        zerolinecolor: textColor
    });

    const createSceneLayout = (range, eye = { x: 1.5, y: 1.5, z: 1.2 }) => ({
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { l: 0, r: 0, b: 0, t: 0 },
        scene: {
            aspectmode: 'cube',
            xaxis: createAxis('X', range),
            yaxis: createAxis('Y', range),
            zaxis: createAxis('Z', range),
            camera: { eye }
        },
        showlegend: false
    });

    function createVector(name, color, x, y, z, origin = [0, 0, 0], lineWidth = 6, endMarkerSize = 5) {
        return {
            type: 'scatter3d',
            mode: 'lines+markers+text',
            x: [origin[0], x],
            y: [origin[1], y],
            z: [origin[2], z],
            line: { width: lineWidth, color },
            marker: { size: [0, endMarkerSize], color, symbol: 'diamond' },
            text: ['', name],
            textposition: 'top center',
            textfont: { color, size: 14, weight: 'bold' },
            hoverinfo: 'none'
        };
    }

    function renderEj4() {
        const plotContainer = document.getElementById('plot3d-ej4');
        if (!plotContainer) return;

        const data = [
            createVector('Velocidad (v)', colorV, 2, 0, 0),
            createVector('Campo B', colorB, 0, 2, 0),
            createVector('Campo E', colorE, 0, 0, -2),
            createVector('Fuerza Mag.', colorFm, 0, 0, -1),
            createVector('Fuerza Eléc.', colorE, 0, 0, 1),
            {
                type: 'scatter3d',
                mode: 'markers+text',
                x: [0], y: [0], z: [0],
                marker: { size: 8, color: textColor },
                text: ['e-'],
                textposition: 'bottom right',
                textfont: { color: textColor }
            }
        ];

        Plotly.newPlot(plotContainer, data, createSceneLayout([-2.5, 2.5]), { displayModeBar: false });
    }

    function renderEj13() {
        const plotContainer = document.getElementById('plot3d-ej13');
        if (!plotContainer) return;

        const thetaRad = (60 * Math.PI) / 180;
        const n_x = Math.sin(thetaRad);
        const n_y = Math.cos(thetaRad);
        const w_x = n_y;
        const w_y = -n_x;

        const a = 2.5, b = 3.5;
        const p1 = { x: a * w_x, y: a * w_y, z: b };
        const p2 = { x: -a * w_x, y: -a * w_y, z: b };
        const p3 = { x: -a * w_x, y: -a * w_y, z: -b };
        const p4 = { x: a * w_x, y: a * w_y, z: -b };

        const f2_mid = [(p2.x + p3.x) / 2, (p2.y + p3.y) / 2, 0];
        const f4_mid = [(p4.x + p1.x) / 2, (p4.y + p1.y) / 2, 0];

        const arcX = [], arcY = [], arcZ = [];
        for (let t = 0; t <= 60; t += 5) {
            const rad = (t * Math.PI) / 180;
            arcX.push(2 * Math.sin(rad));
            arcY.push(2 * Math.cos(rad));
            arcZ.push(0);
        }

        const data = [
            {
                type: 'mesh3d',
                x: [p1.x, p2.x, p3.x, p4.x],
                y: [p1.y, p2.y, p3.y, p4.y],
                z: [p1.z, p2.z, p3.z, p4.z],
                i: [0, 0], j: [1, 2], k: [2, 3],
                opacity: 0.15,
                color: colorLoop,
                hoverinfo: 'none',
                name: 'Área'
            },
            {
                type: 'scatter3d',
                mode: 'lines',
                x: [p1.x, p2.x, p3.x, p4.x, p1.x],
                y: [p1.y, p2.y, p3.y, p4.y, p1.y],
                z: [p1.z, p2.z, p3.z, p4.z, p1.z],
                line: { color: colorLoop, width: 8 },
                hoverinfo: 'none'
            },
            {
                type: 'scatter3d',
                mode: 'text',
                x: [0, f2_mid[0], 0, f4_mid[0]],
                y: [0, f2_mid[1], 0, f4_mid[1]],
                z: [b + 0.5, 0, -b - 0.5, 0],
                text: ['I ←', '↓ I', '→ I', 'I ↑'],
                textfont: { color: colorLoop, size: 15, weight: 'bold' },
                hoverinfo: 'none'
            },
            createVector('n (Normal)', textColor, n_x * 4, n_y * 4, 0),
            {
                type: 'scatter3d',
                mode: 'lines',
                x: [0, 0, null, -2.5, -2.5, null, 2.5, 2.5],
                y: [-4, 4, null, -4, 4, null, -4, 4],
                z: [0, 0, null, 0, 0, null, 0, 0],
                line: { color: colorB, width: 4 },
                hoverinfo: 'none'
            },
            {
                type: 'scatter3d',
                mode: 'text',
                x: [0, -2.5, 2.5],
                y: [4.2, 4.2, 4.2],
                z: [0, 0, 0],
                text: ['B →', 'B →', 'B →'],
                textposition: 'middle right',
                textfont: { color: colorB, size: 16, weight: 'bold' },
                hoverinfo: 'none'
            },
            {
                type: 'scatter3d',
                mode: 'lines+text',
                x: arcX, y: arcY, z: arcZ,
                line: { color: textColor, width: 2, dash: 'dot' },
                text: [...Array(arcX.length - 1).fill(''), 'θ=60°'],
                textposition: 'top right',
                textfont: { color: textColor, size: 14, weight: 'bold' },
                hoverinfo: 'none'
            },
            createVector('F', colorFm, f2_mid[0] + 3, f2_mid[1], 0, f2_mid),
            createVector('-F', colorFm, f4_mid[0] - 3, f4_mid[1], 0, f4_mid),
            createVector('Torque (τ)', '#e67e22', 0, 0, 4.5, [0, 0, 0], 8, 8),
            {
                type: 'scatter3d',
                mode: 'lines',
                x: [0, 0], y: [0, 0], z: [-5, 5],
                line: { color: '#e67e22', width: 2, dash: 'dashdot' },
                hoverinfo: 'none'
            }
        ];

        Plotly.newPlot(plotContainer, data, createSceneLayout([-5, 5], { x: 1.5, y: 2.0, z: 1.2 }), { displayModeBar: false });
    }

    setTimeout(() => {
        renderEj4();
        renderEj13();
    }, 100);
});