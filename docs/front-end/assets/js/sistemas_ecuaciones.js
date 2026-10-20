document.addEventListener("DOMContentLoaded", () => {

    // --- 1. DICCIONARIO DE SISTEMAS LINEALES (A y B) ---
    // Acá se definen las matrices de coeficientes (A) y vectores solución (B)
    const sistemas = {
        'p4': { // Sistema P4 ya reordenado por matriz diagonalmente dominante
            A: [
                [13, 5, -3, 1],
                [2, 12, 1, -4],
                [3, -4, 10, 1],
                [2, 1, -3, 9]
            ],
            b: [18, 13, 20, 31]
        }
        // Acá podés sumar futuros sistemas para interactivos (Ej: 'p1', 'p2', etc)
    };


    // --- 2. INICIALIZAR SIMULADORES DE SISTEMAS LINEALES (Gauss-Seidel) ---
    document.querySelectorAll('.simulador-sistemas[data-metodo="gs"]').forEach(sim => {
        const selectFn = sim.querySelector('.sim-funcion');
        const inputTol = sim.querySelector('.sim-tol');
        const inputIter = sim.querySelector('.sim-max-iter');
        const btn = sim.querySelector('.btn-simular');
        const resultBox = sim.querySelector('.sim-result');
        const tableBox = sim.querySelector('.sim-table-container');

        const updateInputs = () => {
            if(!selectFn) return;
            const opt = selectFn.options[selectFn.selectedIndex];
            inputTol.value = opt.dataset.tol || 0.0001;
            inputIter.value = opt.dataset.iter || 15;
        };

        if(selectFn) selectFn.addEventListener('change', () => { updateInputs(); btn.click(); });

        btn.addEventListener('click', () => {
            const fnKey = selectFn ? selectFn.value : "p4";
            const tol = parseFloat(inputTol.value) || 0;
            const maxIter = parseInt(inputIter.value) || 10;

            const A = sistemas[fnKey].A;
            const b = sistemas[fnKey].b;
            const n = b.length;
            
            // Vector Inicial [0, 0, ...]
            let x = new Array(n).fill(0);

            // Generación de cabecera dinámica según la dimensión n
            let theadVars = "";
            for(let i=1; i<=n; i++) theadVars += `<th>$x_${i}^{(k)}$</th>`;
            let html = `<table class="tabla-iteraciones"><thead><tr><th>$k$</th>${theadVars}<th>$E_{Max}$</th></tr></thead><tbody>`;
            
            // Fila Iteración 0
            let row0 = `<tr><td>0</td>`;
            for(let i=0; i<n; i++) row0 += `<td>0.0000</td>`;
            row0 += `<td>-</td></tr>`;
            html += row0;

            let actualIters = 0;
            let finalX = [];

            // Ciclo iterativo Gauss-Seidel
            for (let k = 1; k <= maxIter; k++) {
                let x_new = [...x];
                let maxError = 0;

                for (let i = 0; i < n; i++) {
                    let s = 0;
                    // Sumatoria cruzada (Usa valores recién calculados en j < i y anteriores en j > i)
                    for (let j = 0; j < n; j++) {
                        if (j !== i) s += A[i][j] * x_new[j];
                    }
                    
                    let prevXi = x_new[i];
                    x_new[i] = (b[i] - s) / A[i][i];
                    
                    let err = Math.abs(x_new[i] - prevXi);
                    if (err > maxError) maxError = err;
                }

                html += `<tr><td>${k}</td>`;
                for(let i = 0; i < n; i++) {
                    html += `<td><strong style="color:var(--accent);">${x_new[i].toFixed(4)}</strong></td>`;
                }
                html += `<td>${maxError.toFixed(4)}</td></tr>`;
                
                x = [...x_new];
                actualIters = k;
                finalX = [...x];

                // Criterio de Parada
                if (tol > 0 && maxError <= tol) break;
                if (maxError < 1e-12) break; // Límite por precisión de máquina
            }

            html += `</tbody></table>`;
            tableBox.innerHTML = html;

            let strVec = finalX.map(v => v.toFixed(4)).join(", ");
            resultBox.innerHTML = `
                <span style="display:block; color: var(--text-muted); font-size: 0.9em;">Iteraciones realizadas: <strong>${actualIters}</strong></span>
                <span style="display:block; color: var(--accent); font-weight: bold; margin-top:5px; font-size: 1.1em;">Vector Final: [${strVec}]</span>
            `;

            if (window.MathJax) MathJax.typesetPromise([tableBox]);
        });

        updateInputs();
        btn.click();
    });

});