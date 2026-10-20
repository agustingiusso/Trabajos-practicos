document.addEventListener('DOMContentLoaded', () => {
    
    // Obtener colores del tema actual del CSS
    const getCssVar = (name) => getComputedStyle(document.body).getPropertyValue(name).trim();
    const textColor = getCssVar('--text-color') || '#ffffff';
    const gridColor = getCssVar('--table-border-color') || '#444444';
    const colorB = '#3498db'; // Azul para Campo Magnético
    const colorE = '#e74c3c'; // Rojo para Campo Eléctrico / Fuerzas Eléctricas
    const colorFm = '#9b59b6'; // Violeta para Fuerza Magnética
    const colorV = '#f1c40f'; // Amarillo para Velocidad
    const colorLoop = '#2ecc71'; // Verde para la Espira

    // Configuración común de la cámara y escena 3D
    const commonSceneLayout = {
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: { l: 0, r: 0, b: 0, t: 0 },
        scene: {
            aspectmode: 'cube',
            xaxis: { title: 'X', color: textColor, gridcolor: gridColor, zerolinecolor: textColor },
            yaxis: { title: 'Y', color: textColor, gridcolor: gridColor, zerolinecolor: textColor },
            zaxis: { title: 'Z', color: textColor, gridcolor: gridColor, zerolinecolor: textColor },
            camera: { eye: { x: 1.5, y: 1.5, z: 1.2 } }
        },
        showlegend: false
    };

    // Helper para crear vectores 3D (Línea + Marcador en la punta)
    function createVector(name, color, x, y, z) {
        return {
            type: 'scatter3d',
            mode: 'lines+markers+text',
            x: [0, x], y: [0, y], z: [0, z],
            line: { width: 6, color: color },
            marker: { size: [0, 5], color: color, symbol: 'diamond' },
            text: ['', name],
            textposition: 'top center',
            textfont: { color: color, size: 14, weight: 'bold' },
            hoverinfo: 'none'
        };
    }

    // ==================================================
    // GRÁFICO 3D - EJERCICIO 4 (Filtro de Velocidades)
    // ==================================================
    function renderEj4() {
        const plotContainer = document.getElementById('plot3d-ej4');
        if (!plotContainer) return;

        // Vectores: v(X), B(Y), E(-Z), Fm(-Z), Fe(+Z)
        const traceV = createVector('Velocidad (v)', colorV, 2, 0, 0);
        const traceB = createVector('Campo B', colorB, 0, 2, 0);
        const traceE = createVector('Campo E', colorE, 0, 0, -2);
        
        // Fuerzas
        const traceFm = createVector('Fuerza Mag.', colorFm, 0, 0, -1);
        const traceFe = createVector('Fuerza Eléc.', colorE, 0, 0, 1);

        // Electrón en el centro
        const electron = {
            type: 'scatter3d',
            mode: 'markers+text',
            x: [0], y: [0], z: [0],
            marker: { size: 8, color: textColor },
            text: ['e-'],
            textposition: 'bottom right',
            textfont: { color: textColor }
        };

        const data = [traceV, traceB, traceE, traceFm, traceFe, electron];
        
        const layout = JSON.parse(JSON.stringify(commonSceneLayout));
        layout.scene.xaxis.range = [-2.5, 2.5];
        layout.scene.yaxis.range = [-2.5, 2.5];
        layout.scene.zaxis.range = [-2.5, 2.5];

        Plotly.newPlot(plotContainer, data, layout, {displayModeBar: false});
    }

    // ==================================================
    // GRÁFICO 3D - EJERCICIO 13 MEJORADO (Espira Rectangular Rotante)
    // ==================================================
    function renderEj13() {
        const plotContainer = document.getElementById('plot3d-ej13');
        if (!plotContainer) return;

        // Ángulo de 60 grados para el vector Normal (n) respecto al eje Y (Campo B)
        const thetaRad = 60 * Math.PI / 180;
        const n_x = Math.sin(thetaRad); // 0.866
        const n_y = Math.cos(thetaRad); // 0.5
        
        // El ancho de la espira está en el plano XY perpendicular a n
        const w_x = Math.cos(thetaRad); // 0.5
        const w_y = -Math.sin(thetaRad); // -0.866
        
        // Dimensiones proporcionales (para simular 6x8 cm a escala visual)
        const a = 2.5; // Mitad del ancho (X/Y)
        const b = 3.5; // Mitad del alto (Z)

        // Vértices de la espira
        const p1 = { x: a*w_x, y: a*w_y, z: b };
        const p2 = { x: -a*w_x, y: -a*w_y, z: b };
        const p3 = { x: -a*w_x, y: -a*w_y, z: -b };
        const p4 = { x: a*w_x, y: a*w_y, z: -b };

        // 1. Superficie translúcida de la espira (hace que el plano se note 100% mejor)
        const espiraSurface = {
            type: 'mesh3d',
            x: [p1.x, p2.x, p3.x, p4.x],
            y: [p1.y, p2.y, p3.y, p4.y],
            z: [p1.z, p2.z, p3.z, p4.z],
            i: [0, 0], j: [1, 2], k: [2, 3],
            opacity: 0.15,
            color: colorLoop,
            hoverinfo: 'none',
            name: 'Área'
        };

        // 2. Bordes de la espira (Cables más gruesos)
        const espiraEdges = {
            type: 'scatter3d',
            mode: 'lines',
            x: [p1.x, p2.x, p3.x, p4.x, p1.x],
            y: [p1.y, p2.y, p3.y, p4.y, p1.y],
            z: [p1.z, p2.z, p3.z, p4.z, p1.z],
            line: { color: colorLoop, width: 8 },
            hoverinfo: 'none'
        };

        // 3. Indicadores de Corriente (Textos sobre los cables)
        const currentMarkers = {
            type: 'scatter3d',
            mode: 'text',
            x: [0, (p2.x+p3.x)/2, 0, (p4.x+p1.x)/2],
            y: [0, (p2.y+p3.y)/2, 0, (p4.y+p1.y)/2],
            z: [b+0.5, 0, -b-0.5, 0],
            text: ['I ←', '↓ I', '→ I', 'I ↑'],
            textfont: { color: colorLoop, size: 15, weight: 'bold' },
            hoverinfo: 'none'
        };

        // 4. Vector Normal / Momento Magnético (m)
        const traceN = createVector('n (Normal)', textColor, n_x*4, n_y*4, 0);

        // 5. Campo Magnético B (Líneas a lo largo del eje Y con etiquetas "B")
        const traceB = {
            type: 'scatter3d',
            mode: 'lines',
            x: [0, 0, null, -2.5, -2.5, null, 2.5, 2.5],
            y: [-4, 4, null, -4, 4, null, -4, 4],
            z: [0, 0, null, 0, 0, null, 0, 0],
            line: { color: colorB, width: 4 },
            hoverinfo: 'none'
        };
        const traceB_arrows = {
            type: 'scatter3d',
            mode: 'text',
            x: [0, -2.5, 2.5],
            y: [4.2, 4.2, 4.2],
            z: [0, 0, 0],
            text: ['B →', 'B →', 'B →'],
            textposition: 'middle right',
            textfont: { color: colorB, size: 16, weight: 'bold' },
            hoverinfo: 'none'
        };

        // 6. Arco del Ángulo (60 grados entre Y y la Normal)
        const arcX = [], arcY = [], arcZ = [];
        for(let t=0; t<=60; t+=5) {
            let rad = t * Math.PI / 180;
            arcX.push(2 * Math.sin(rad));
            arcY.push(2 * Math.cos(rad));
            arcZ.push(0);
        }
        const traceAngle = {
            type: 'scatter3d',
            mode: 'lines+text',
            x: arcX, y: arcY, z: arcZ,
            line: { color: textColor, width: 2, dash: 'dot' },
            text: [...Array(arcX.length-1).fill(''), 'θ=60°'],
            textposition: 'top right',
            textfont: { color: textColor, size: 14, weight: 'bold' },
            hoverinfo: 'none'
        };

        // 7. Fuerzas Magnéticas en los laterales
        const f2_mid = { x: (p2.x+p3.x)/2, y: (p2.y+p3.y)/2, z: 0 };
        const force2 = createVector('F', colorFm, f2_mid.x + 3, f2_mid.y, 0);
        force2.x = [f2_mid.x, f2_mid.x + 3]; force2.y = [f2_mid.y, f2_mid.y];
        
        const f4_mid = { x: (p4.x+p1.x)/2, y: (p4.y+p1.y)/2, z: 0 };
        const force4 = createVector('-F', colorFm, f4_mid.x - 3, f4_mid.y, 0);
        force4.x = [f4_mid.x, f4_mid.x - 3]; force4.y = [f4_mid.y, f4_mid.y];

        // 8. Eje de Rotación (Z) y Vector Torque (τ)
        const traceTorque = createVector('Torque (τ)', '#e67e22', 0, 0, 4.5);
        traceTorque.line.width = 8;
        traceTorque.marker.size = [0, 8];
        const axisZ = {
            type: 'scatter3d',
            mode: 'lines',
            x: [0, 0], y: [0, 0], z: [-5, 5],
            line: { color: '#e67e22', width: 2, dash: 'dashdot' },
            hoverinfo: 'none'
        };

        // Construir la data final a graficar
        const data = [
            espiraSurface, espiraEdges, currentMarkers, 
            traceN, traceB, traceB_arrows, traceAngle, 
            force2, force4, traceTorque, axisZ
        ];

        // Clonamos la escena común y ajustamos cámara
        const layout = JSON.parse(JSON.stringify(commonSceneLayout));
        layout.scene.xaxis.range = [-5, 5];
        layout.scene.yaxis.range = [-5, 5];
        layout.scene.zaxis.range = [-5, 5];
        // Ángulo de cámara ideal para notar la inclinación y el torque
        layout.scene.camera = { eye: { x: 1.5, y: 2.0, z: 1.2 } }; 

        Plotly.newPlot(plotContainer, data, layout, {displayModeBar: false});
    }

    // Renderizar
    setTimeout(() => {
        renderEj4();
        renderEj13();
    }, 100); // Pequeño delay para asegurar que el DOM esté listo
});