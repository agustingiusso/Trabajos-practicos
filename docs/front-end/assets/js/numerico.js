document.addEventListener("DOMContentLoaded", () => {

    // --- 1. DICCIONARIO DE FUNCIONES MATEMÁTICAS ---
    const fns = {
        'p3a': { f: (x) => Math.pow(x, 4) - 4 * x + 1 },
        'p3b': { f: (x) => Math.pow(x, 3) + 4 * Math.pow(x, 2) - 10 },
        
        'p4a': { f: (x) => x - 0.8 - 0.2 * Math.sin(x), df: (x) => 1 - 0.2 * Math.cos(x) },
        'p4b': { f: (x) => Math.exp(x) + x,             df: (x) => Math.exp(x) + 1 },
        'p4c': { f: (x) => Math.exp(x) - 3 * x,         df: (x) => Math.exp(x) - 3 },
        
        'p5a': { f: (x) => Math.pow(x, 3) - x - 1 },
        
        'p6':  { f: (i) => {
            if (i === 0) return 0;
            return (Math.pow(1 + i, 10) - 1) / (i * Math.pow(1 + i, 10)) - 5;
        }},
        
        'p7a': { 
            f: (x) => Math.pow(x, 2) - 4 * x - 45, 
            df: (x) => 2 * x - 4 
        },
        'p8a': {
            f: (x) => x - Math.cos(x),
            df: (x) => 1 + Math.sin(x)
        },
        'p8b': {
            f: (x) => Math.exp(x) + 2 * x + 2 * Math.cos(x) - 6,
            df: (x) => Math.exp(x) + 2 - 2 * Math.sin(x)
        },
        'p8c': {
            f: (x) => Math.pow(x, 3) - 2 * Math.pow(x, 2) - 3 * x + 10,
            df: (x) => 3 * Math.pow(x, 2) - 4 * x - 3
        },
        
        'p9': {
            f: (t) => 80 * Math.exp(-2 * t) + 20 * Math.exp(-0.5 * t) - 7,
            df: (t) => -160 * Math.exp(-2 * t) - 10 * Math.exp(-0.5 * t)
        }
    };


    // --- 2. INICIALIZAR TODOS LOS SIMULADORES DE BISECCIÓN ---
    document.querySelectorAll('.simulador-biseccion').forEach(sim => {
        const selectFn = sim.querySelector('.sim-funcion');
        const inputA = sim.querySelector('.sim-a');
        const inputB = sim.querySelector('.sim-b');
        const inputTol = sim.querySelector('.sim-tol');
        const inputIter = sim.querySelector('.sim-max-iter');
        const btn = sim.querySelector('.btn-simular');
        const resultBox = sim.querySelector('.sim-result');
        const tableBox = sim.querySelector('.sim-table-container');

        const updateInputs = () => {
            if(!selectFn) return;
            const opt = selectFn.options[selectFn.selectedIndex];
            inputA.value = opt.dataset.a;
            inputB.value = opt.dataset.b;
            inputTol.value = opt.dataset.tol;
            inputIter.value = opt.dataset.iter;
        };

        if(selectFn) selectFn.addEventListener('change', () => { updateInputs(); btn.click(); });

        btn.addEventListener('click', () => {
            const fnKey = selectFn ? selectFn.value : sim.dataset.fn;
            const a = parseFloat(inputA.value);
            const b = parseFloat(inputB.value);
            const tol = parseFloat(inputTol.value) || 0; // Si el usuario pone 0, se forzan todas las iteraciones
            const maxIter = parseInt(inputIter.value) || 10;

            if (isNaN(a) || isNaN(b)) {
                resultBox.innerHTML = "<span style='color: var(--color-boton-eliminar);'>Completá los campos A y B.</span>";
                return;
            }

            const func = fns[fnKey].f;

            if (func(a) * func(b) >= 0) {
                resultBox.innerHTML = "<span style='color: var(--color-boton-eliminar);'>Error de Bolzano: f(a) y f(b) deben tener signos opuestos.</span>";
                tableBox.innerHTML = "";
                return;
            }

            let html = `<table class="tabla-iteraciones"><thead><tr><th>$n$</th><th>$a$</th><th>$b$</th><th>$mk_n$</th><th>$f(mk_n)$</th></tr></thead><tbody>`;
            let curA = a, curB = b, mk = 0;

            for (let n = 1; n <= maxIter; n++) {
                mk = (curA + curB) / 2;
                let f_mk = func(mk);

                html += `<tr><td>${n}</td><td>${curA.toFixed(6)}</td><td>${curB.toFixed(6)}</td><td><strong style="color:var(--accent);">${mk.toFixed(6)}</strong></td><td>${f_mk.toFixed(6)}</td></tr>`;

                // Criterio de parada modificado: Corta por tolerancia SOLO si la tolerancia es mayor a 0
                if (tol > 0 && (curB - curA) / 2 <= tol) break;
                // Límite por precisión de máquina para no iterar sobre el mismo número al infinito
                if (Math.abs(f_mk) < 1e-14) break; 

                if (func(curA) * f_mk < 0) curB = mk;
                else curA = mk;
            }

            html += `</tbody></table>`;
            tableBox.innerHTML = html;

            let theoricalN = tol > 0 ? Math.ceil(Math.log2((b - a) / tol)) : '∞ (Forzado por usuario)';
            resultBox.innerHTML = `
                <span style="display:block; color: var(--text-muted); font-size: 0.9em;">Nº Iteraciones Teóricas (Tol): <strong>${theoricalN}</strong></span>
                <span style="display:block; color: var(--accent); font-weight: bold; margin-top:5px; font-size: 1.1em;">Raíz Estimada: ${mk.toFixed(6)}</span>
            `;

            if (window.MathJax) MathJax.typesetPromise([tableBox]);
        });

        updateInputs();
        btn.click();
    });


    // --- 3. INICIALIZAR TODOS LOS SIMULADORES DE NEWTON-RAPHSON ---
    document.querySelectorAll('.simulador-newton').forEach(sim => {
        const selectFn = sim.querySelector('.sim-funcion');
        const inputX0 = sim.querySelector('.sim-x0');
        const inputTol = sim.querySelector('.sim-tol');
        const inputIter = sim.querySelector('.sim-max-iter');
        const btn = sim.querySelector('.btn-simular');
        const resultBox = sim.querySelector('.sim-result');
        const tableBox = sim.querySelector('.sim-table-container');

        const updateInputs = () => {
            if(!selectFn) return;
            const opt = selectFn.options[selectFn.selectedIndex];
            inputX0.value = opt.dataset.x0;
            inputTol.value = opt.dataset.tol;
            inputIter.value = opt.dataset.iter;
        };

        if(selectFn) selectFn.addEventListener('change', () => { updateInputs(); btn.click(); });

        btn.addEventListener('click', () => {
            const fnKey = selectFn ? selectFn.value : sim.dataset.fn;
            let x = parseFloat(inputX0.value);
            const tol = parseFloat(inputTol.value) || 0;
            const maxIter = parseInt(inputIter.value) || 10;

            if (isNaN(x)) {
                resultBox.innerHTML = "<span style='color: var(--color-boton-eliminar);'>Completá el campo X₀.</span>";
                return;
            }

            const func = fns[fnKey].f;
            const dfunc = fns[fnKey].df;

            let html = `<table class="tabla-iteraciones"><thead><tr><th>$n$</th><th>$x_n$</th><th>$x_{n+1}$</th><th>$|x_{n+1} - x_n|$</th></tr></thead><tbody>`;
            let actualIters = 0;

            for (let n = 1; n <= maxIter; n++) {
                let fx = func(x);
                let dfx = dfunc(x);

                if (Math.abs(dfx) < 1e-14) {
                    html += `<tr><td colspan="4" style="color:var(--color-boton-eliminar);">Fallo: Derivada nula</td></tr>`;
                    break;
                }

                let x_new = x - (fx / dfx);
                let error = Math.abs(x_new - x);

                html += `<tr><td>${n}</td><td>${x.toFixed(6)}</td><td><strong style="color:var(--accent);">${x_new.toFixed(6)}</strong></td><td>${error.toFixed(6)}</td></tr>`;
                
                x = x_new;
                actualIters = n;

                if (tol > 0 && error <= tol) break;
                if (error < 1e-14) break;
            }

            html += `</tbody></table>`;
            tableBox.innerHTML = html;

            resultBox.innerHTML = `
                <span style="display:block; color: var(--text-muted); font-size: 0.9em;">Iteraciones realizadas: <strong>${actualIters}</strong></span>
                <span style="display:block; color: var(--accent); font-weight: bold; margin-top:5px; font-size: 1.1em;">Raíz Estimada: ${x.toFixed(6)}</span>
            `;

            if (window.MathJax) MathJax.typesetPromise([tableBox]);
        });

        updateInputs();
        btn.click();
    });

});