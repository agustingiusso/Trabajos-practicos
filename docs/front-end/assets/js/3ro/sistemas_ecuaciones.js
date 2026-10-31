document.addEventListener("DOMContentLoaded", () => {
    const sistemas = {
        'p4': {
            A: [
                [13, 5, -3, 1],
                [2, 12, 1, -4],
                [3, -4, 10, 1],
                [2, 1, -3, 9]
            ],
            b: [18, 13, 20, 31]
        }
    };

    document.querySelectorAll('.simulador-sistemas[data-metodo="gs"]').forEach(sim => {
        const selectFn = sim.querySelector('.sim-funcion');
        const inputTol = sim.querySelector('.sim-tol');
        const inputIter = sim.querySelector('.sim-max-iter');
        const btn = sim.querySelector('.btn-simular');
        const resultBox = sim.querySelector('.sim-result');
        const tableBox = sim.querySelector('.sim-table-container');

        const updateInputs = () => {
            if (!selectFn) return;
            const { tol, iter } = selectFn.options[selectFn.selectedIndex].dataset;
            inputTol.value = tol || 0.0001;
            inputIter.value = iter || 15;
        };

        if (selectFn) selectFn.addEventListener('change', () => { updateInputs(); btn.click(); });

        btn.addEventListener('click', () => {
            const fnKey = selectFn ? selectFn.value : "p4";
            const tol = parseFloat(inputTol.value) || 0;
            const maxIter = parseInt(inputIter.value) || 10;

            const { A, b } = sistemas[fnKey];
            const n = b.length;
            const x = new Array(n).fill(0);

            const theadVars = Array.from({ length: n }, (_, i) => `<th>$x_${i + 1}^{(k)}$</th>`).join('');
            const zeroCols = '<td>0.0000</td>'.repeat(n);
            let rows = `<tr><td>0</td>${zeroCols}<td>-</td></tr>`;

            let actualIters = 0;

            for (let k = 1; k <= maxIter; k++) {
                let maxError = 0;

                for (let i = 0; i < n; i++) {
                    let s = 0;
                    const rowA = A[i];
                    for (let j = 0; j < n; j++) {
                        if (j !== i) s += rowA[j] * x[j];
                    }

                    const prevXi = x[i];
                    x[i] = (b[i] - s) / rowA[i];

                    const err = Math.abs(x[i] - prevXi);
                    if (err > maxError) maxError = err;
                }

                const cols = x.map(val => `<td><strong style="color:var(--accent);">${val.toFixed(4)}</strong></td>`).join('');
                rows += `<tr><td>${k}</td>${cols}<td>${maxError.toFixed(4)}</td></tr>`;

                actualIters = k;
                if ((tol > 0 && maxError <= tol) || maxError < 1e-12) break;
            }

            tableBox.innerHTML = `<table class="tabla-iteraciones"><thead><tr><th>$k$</th>${theadVars}<th>$E_{Max}$</th></tr></thead><tbody>${rows}</tbody></table>`;

            const strVec = x.map(v => v.toFixed(4)).join(", ");
            resultBox.innerHTML = `
                <span style="display:block; color: var(--text-muted); font-size: 0.9em;">Iteraciones realizadas: <strong>${actualIters}</strong></span>
                <span style="display:block; color: var(--accent); font-weight: bold; margin-top:5px; font-size: 1.1em;">Vector Final: [${strVec}]</span>
            `;

            window.MathJax?.typesetPromise?.([tableBox]);
        });

        updateInputs();
        btn.click();
    });
});