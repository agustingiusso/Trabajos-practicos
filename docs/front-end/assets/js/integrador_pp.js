const memoryBoard = document.getElementById('memory-board');
const colName = document.getElementById('col-name');
const transcriptOut = document.getElementById('transcript-output');
const activeOpBadge = document.getElementById('active-op-badge');
const platUsed = document.getElementById('plat-used');
const platFree = document.getElementById('plat-free');
const platBar = document.getElementById('plat-bar');
const platCountBadge = document.getElementById('plat-count-badge');
const objNuevoP8 = document.getElementById('obj-nuevo-p8');

const INITIAL_DATA = {
    '1': { tit: 'Inception', calif: '9', type: 'peli', tam: '3500' },
    '2': { tit: 'Toy Story', calif: '8.5', type: 'peli', tam: '1500' },
    '3': { tit: 'Zoolander', calif: '6.5', type: 'peli', tam: '1200' },
    '4': { tit: 'El Conjuro', calif: '7.5', type: 'peli', tam: '1800' },
    '5': { tit: 'Gladiador', calif: '8.5', type: 'peli', tam: '4000' },
    '6': { tit: 'Breaking Bad', calif: '9.5', type: 'serie', tam: '12000' },
    '7': { tit: 'Stranger Things', calif: '8.5', type: 'serie', tam: '9500' },
    '8': { tit: 'The Office', calif: '9', type: 'serie', tam: '15000' },
    '9': { tit: 'Dark', calif: '8.5', type: 'serie', tam: '8000' },
    '10': { tit: 'Los Simpson', calif: '8', type: 'serie', tam: '25000' },
    '11': { tit: 'Interstellar', calif: '9.2', type: 'peli', tam: '4500' }
};

const AUTO_RUNNERS = {
    1: runPunto1,
    2: runPunto2,
    3: runPunto3,
    4: runPunto4,
    5: runPunto5,
    6: runPunto6,
    7: runPunto7,
    8: () => runPunto8('valida'),
    9: runPunto9,
    10: runPunto10,
    11: runPunto11,
    12: runPunto12,
    13: runPunto13
};

function mountBoardUnder(pointNumber) {
    const slot = document.getElementById('mount-' + pointNumber);
    if (slot && memoryBoard) slot.appendChild(memoryBoard);
}

function selectPoint(pointNumber) {
    const panels = document.querySelectorAll('.point-panel');
    const navItems = document.querySelectorAll('#sim-nav-points .nav-point');
    const activeIdx = pointNumber === 0 ? 13 : pointNumber - 1;

    navItems.forEach((li, idx) => li.classList.toggle('active', idx === activeIdx));

    if (pointNumber === 0) {
        panels.forEach(p => p.classList.add('active-panel'));
        mountBoardUnder(1);
        resetSim();
    } else {
        panels.forEach(p => p.classList.toggle('active-panel', p.id === 'step-' + pointNumber));
        mountBoardUnder(pointNumber);
        resetSim();
        AUTO_RUNNERS[pointNumber]?.();
    }
}

function getVisibleObjects() {
    return Array.from(document.querySelectorAll('.mem-object')).filter(
        obj => obj.style.display !== 'none'
    );
}

function updatePlatformBar(usedMB, count) {
    const cap = 100000;
    platUsed.innerText = usedMB;
    platFree.innerText = cap - usedMB;
    platBar.style.width = Math.min(100, (usedMB / cap) * 100) + '%';
    platBar.style.background = usedMB > cap ? '#e74c3c' : 'var(--color-paradigmas)';
    platCountBadge.innerText = count + ' objetos';
}

function cleanVisualStates() {
    document.querySelectorAll('.mem-object').forEach(obj => {
        const type = obj.dataset.type || (obj.classList.contains('peli') ? 'peli' : 'serie');
        obj.className = 'mem-object ' + type;
    });
}

function prepareStep(pointNumber, colText, badgeText) {
    mountBoardUnder(pointNumber);
    cleanVisualStates();
    colName.innerText = colText;
    activeOpBadge.innerText = badgeText;
    return getVisibleObjects();
}

function resetSim() {
    if (objNuevoP8) {
        objNuevoP8.style.display = 'none';
        objNuevoP8.dataset.cod = '11';
        objNuevoP8.querySelector('.obj-header span').innerHTML = '#11 a Pelicula (Nuevo)';
    }

    document.querySelectorAll('.mem-object').forEach(obj => {
        if (obj.id === 'obj-nuevo-p8') return;

        obj.style.display = '';
        const codReal = obj.id.replace('mem-obj-', '');
        obj.dataset.cod = codReal;

        const init = INITIAL_DATA[codReal];
        if (init) {
            obj.dataset.tit = init.tit;
            obj.dataset.calif = init.calif;
            obj.dataset.tam = init.tam;
            obj.className = 'mem-object ' + init.type;

            const titEl = obj.querySelector('.val-tit');
            const califEl = obj.querySelector('.val-calif');
            const headerSpan = obj.querySelector('.obj-header span');

            if (titEl) titEl.innerText = `'${init.tit}'`;
            if (califEl) califEl.innerText = init.calif;
            if (headerSpan) headerSpan.innerText = `#${codReal} a ${init.type === 'peli' ? 'Pelicula' : 'Serie'}`;
        }
    });

    cleanVisualStates();
    colName.innerText = 'contenidos (10 instancias)';
    activeOpBadge.innerText = 'Estado Inicial';
    transcriptOut.innerHTML =
        `&gt; Plataforma 'StreamUTN' restaurada (81.500 / 100.000 MB).<br>` +
        `&gt; 10 objetos activos en la OrderedCollection contenidos.`;
    updatePlatformBar(81500, 10);
}

function runPunto1() {
    const objs = prepareStep(1, 'colFil (select: [:c | c verCalificacion >= 7])', 'Punto 1: select: + do:');
    const lines = ['--- CALIFICACION &gt;= 7 ---'];

    objs.forEach(obj => {
        const calif = parseFloat(obj.dataset.calif);
        if (calif >= 7) {
            obj.classList.add('highlighted');
            lines.push(`${obj.dataset.tit} (${calif})`);
        } else {
            obj.classList.add('dimmed');
        }
    });
    transcriptOut.innerHTML = lines.join('<br>');
}

function runPunto2() {
    const gen = document.getElementById('select-genero')?.value || 'Ficcion';
    const objs = prepareStep(2, `colFil (select: [:c | c verGenero = '${gen}'])`, 'Punto 2: pedirTexto value: + select:');
    const lines = [`&gt; Evaluando pedirTexto value:... (Retorna '${gen}')`, `--- GÉNERO: ${gen} ---`];

    objs.forEach(obj => {
        if (obj.dataset.gen === gen) {
            obj.classList.add('highlighted');
            lines.push(obj.dataset.tit);
        } else {
            obj.classList.add('dimmed');
        }
    });
    transcriptOut.innerHTML = lines.join('<br>');
}

function runPunto3() {
    const objs = prepareStep(3, 'colFil (select: [:c | c esRecomendable])', 'Punto 3: Polimorfismo y Binding Dinámico');
    const lines = ['--- RECOMENDADOS PARA MARATÓN ---'];

    objs.forEach(obj => {
        const { tit } = obj.dataset;
        const calif = parseFloat(obj.dataset.calif);
        const isPeli = obj.classList.contains('peli');
        const isSerie = !isPeli && obj.classList.contains('serie');

        const ok = isPeli
            ? parseFloat(obj.dataset.dur) <= 120 && calif >= 7
            : isSerie && obj.dataset.fin === 'true' && parseFloat(obj.dataset.temp) <= 3 && calif >= 7;

        obj.classList.add(ok ? 'poly-true' : 'poly-false');
        if (ok) {
            const clsName = isPeli ? 'Pelicula' : 'Serie';
            lines.push(`${tit}  <span style="color:#94a3b8;">[${clsName} &gt;&gt; esRecomendable -&gt; true]</span>`);
        }
    });
    transcriptOut.innerHTML = lines.join('<br>');
}

function runPunto4() {
    const objs = prepareStep(4, 'colFil (select: [:c | c verTamanio > prom])', 'Punto 4: Promedio con do: y select:');
    const suma = objs.reduce((acc, obj) => acc + parseFloat(obj.dataset.tam), 0);
    const prom = objs.length > 0 ? Math.round((suma / objs.length) * 100) / 100 : 0;
    const lines = ['--- TAMAÑOS ---', `Promedio general: ${prom} MB`, 'Superan el promedio:'];

    objs.forEach(obj => {
        const tam = parseFloat(obj.dataset.tam);
        if (tam > prom) {
            obj.classList.add('highlighted');
            lines.push(`- ${obj.dataset.tit} (${tam} MB)`);
        } else {
            obj.classList.add('dimmed');
        }
    });
    transcriptOut.innerHTML = lines.join('<br>');
}

function runPunto5() {
    mountBoardUnder(5);
    cleanVisualStates();
    const objs = getVisibleObjects();
    if (objs.length === 0) return;

    colName.innerText = 'mejor (Objeto con mayor calificación)';
    activeOpBadge.innerText = 'Punto 5: Búsqueda de Máximo con do:';

    let mejorObj = objs[0];
    let maxCalif = parseFloat(mejorObj.dataset.calif);

    objs.forEach(obj => {
        const calif = parseFloat(obj.dataset.calif);
        if (calif > maxCalif) {
            maxCalif = calif;
            mejorObj = obj;
        }
    });

    objs.forEach(obj => obj.classList.add(obj === mejorObj ? 'highlighted-detect' : 'dimmed'));
    transcriptOut.innerHTML = `--- MEJOR CALIFICADO ---<br>${mejorObj.dataset.tit} con ${maxCalif} puntos.`;
}

function runPunto6() {
    const objs = prepareStep(6, 'netflix modContenidos: (solo disponibles)', 'Punto 6: select: not + modContenidos:');
    const eliminados = [];
    let nuevoUsado = 0, activosCount = 0;

    objs.forEach(obj => {
        if (obj.dataset.disp !== 'true') {
            obj.classList.add('highlighted-danger');
            eliminados.push(`- ${obj.dataset.tit}`);
        } else {
            obj.classList.add('highlighted');
            nuevoUsado += parseFloat(obj.dataset.tam);
            activosCount++;
        }
    });

    updatePlatformBar(nuevoUsado, activosCount);
    transcriptOut.innerHTML =
        `--- CONTENIDOS ELIMINADOS ---<br>` +
        eliminados.join('<br>') +
        `<br><span style="color:#60a5fa;">[MessageBox notify:] Se eliminaron los contenidos listados en el Transcript.</span>`;
}

function runPunto7() {
    const objs = prepareStep(7, 'dic (Dictionary clave: género -> valor: cantidad)', 'Punto 7: collect: + asSet + Dictionary');
    const conteo = {};

    objs.forEach(obj => {
        obj.classList.add('collected');
        const gen = obj.dataset.gen;
        conteo[gen] = (conteo[gen] || 0) + 1;
    });

    const lines = ['--- CANTIDAD POR GÉNERO (Dictionary keysDo:) ---'];
    Object.entries(conteo).forEach(([g, cant]) => lines.push(`Género: ${g} - Cantidad: ${cant}`));
    transcriptOut.innerHTML = lines.join('<br>');
}

function runPunto8(modo) {
    mountBoardUnder(8);
    resetSim();
    activeOpBadge.innerText = 'Punto 8: Sobrescritura y Capacidad';

    if (modo === 'valida') {
        if (objNuevoP8) {
            objNuevoP8.style.display = '';
            objNuevoP8.classList.add('highlighted-detect');
        }
        colName.innerText = 'contenidos (11 objetos tras add:)';
        updatePlatformBar(86000, 11);
        transcriptOut.innerHTML =
            `<span style="color:#60a5fa;">[MessageBox notify:] Espacio disponible en la plataforma: 18500 MB.</span><br>` +
            `&gt; detect: [:c | c verCodigo = 11] ifNone: [nil] -&gt; <strong>nil</strong>.<br>` +
            `&gt; Pelicula crearPeli:11 tit:'Interstellar' ... tam:4500.<br>` +
            `&gt; Evaluando (81500 + 4500 &lt;= 100000) -&gt; <strong>true</strong>.<br>` +
            `<span style="color:#2ecc71;">[MessageBox notify:] Operación finalizada. Contenido guardado exitosamente.</span>`;
    } else if (modo === 'overwrite') {
        const objViejo = document.getElementById('mem-obj-3');
        if (objViejo) objViejo.style.display = 'none';

        if (objNuevoP8) {
            objNuevoP8.style.display = '';
            objNuevoP8.dataset.cod = '3';
            objNuevoP8.querySelector('.obj-header span').innerHTML = '#3 a Pelicula (Sobrescrito)';
            objNuevoP8.classList.add('highlighted-detect');
        }

        colName.innerText = 'contenidos (10 objetos tras reject: y add:)';
        updatePlatformBar(84800, 10);
        transcriptOut.innerHTML =
            `<span style="color:#60a5fa;">[MessageBox notify:] Espacio disponible en la plataforma: 18500 MB.</span><br>` +
            `&gt; detect: [:c | c verCodigo = 3] ifNone: [nil] -&gt; <strong>a Pelicula ('Zoolander')</strong>.<br>` +
            `&gt; <span style="color:#f39c12;">[MessageBox confirm:] El código 3 YA EXISTE. ¿Sobrescribir? -&gt; true</span><br>` +
            `&gt; netflix modContenidos: (... reject: [:c | c verCodigo = 3]).<br>` +
            `&gt; netflix agregarContenido: nuevoObj.<br>` +
            `<span style="color:#2ecc71;">[MessageBox notify:] Operación finalizada. Contenido guardado exitosamente.</span>`;
    } else if (modo === 'exceso') {
        colName.innerText = 'contenidos (Rechazado por capacidad)';
        platBar.style.width = '100%';
        platBar.style.background = '#e74c3c';
        transcriptOut.innerHTML =
            `<span style="color:#60a5fa;">[MessageBox notify:] Espacio disponible en la plataforma: 18500 MB.</span><br>` +
            `&gt; Intentando agregar contenido de 25000 MB...<br>` +
            `&gt; Evaluando (81500 + 25000 &lt;= 100000) -&gt; <strong>false</strong>.<br>` +
            `<span style="color:#e74c3c; font-weight:bold;">[MessageBox warning:] El tamaño supera el espacio disponible (18500 MB).</span>`;
    }
}

function runPunto9() {
    mountBoardUnder(9);
    cleanVisualStates();
    const codBuscado = document.getElementById('select-cod-mod')?.value || '3';
    const objs = getVisibleObjects();

    activeOpBadge.innerText = 'Punto 9: Bucle de Modificación';
    const encontrado = objs.find(obj => obj.dataset.cod === codBuscado);

    if (!encontrado) {
        objs.forEach(obj => obj.classList.add('dimmed'));
        colName.innerText = 'encontrado := nil (Bloque ifNone:)';
        transcriptOut.innerHTML =
            `&gt; Buscando código ${codBuscado} con detect: ...<br>` +
            `<span style="color:#f1c40f; font-weight:bold;">[MessageBox warning:] No se encontró ningún contenido con ese código.</span>`;
        return;
    }

    const titActual = encontrado.dataset.tit;
    const nuevoTit = titActual.includes('(Ed. Especial)') ? titActual : `${titActual} (Ed. Especial)`;
    const nuevaCal = '9.8';
    const nuevoTam = '3000';

    objs.forEach(obj => {
        if (obj === encontrado) {
            obj.classList.add('highlighted-detect');
            obj.dataset.tit = nuevoTit;
            obj.dataset.calif = nuevaCal;
            obj.dataset.tam = nuevoTam;

            const titEl = obj.querySelector('.val-tit');
            const califEl = obj.querySelector('.val-calif');
            const tamEl = obj.querySelector('.tam-display');

            if (titEl) titEl.innerText = `'${nuevoTit}'`;
            if (califEl) califEl.innerText = nuevaCal;
            if (tamEl) tamEl.innerText = `${nuevoTam} MB`;
        } else {
            obj.classList.add('dimmed');
        }
    });

    colName.innerText = `encontrado (Cód #${codBuscado} alterado iterativamente)`;
    transcriptOut.innerHTML =
        `&gt; detect: encontró el objeto #${codBuscado} ('${titActual}').<br>` +
        `&gt; <span style="color:#94a3b8;">[seguirModificando] whileTrue: ... Iniciado</span><br>` +
        `&gt; Ejecutando encontrado modTitulo: '${nuevoTit}'.<br>` +
        `&gt; <span style="color:#f39c12;">[MessageBox confirm:] ¿Desea modificar algo más? -&gt; true</span><br>` +
        `&gt; Ejecutando encontrado modCalificacion: ${nuevaCal}.<br>` +
        `&gt; <span style="color:#f39c12;">[MessageBox confirm:] ¿Desea modificar algo más? -&gt; false</span><br>` +
        `<span style="color:#2ecc71;">[MessageBox notify:] Contenido modificado con éxito.</span>`;
}

function runPunto10() {
    const codEliminar = document.getElementById('select-cod-del')?.value || '5';
    const objs = prepareStep(10, `contenidos (reject: [:c | c verCodigo = ${codEliminar}])`, 'Punto 10: reject: + modContenidos:');

    let nuevoUsado = 0, activosCount = 0, titEliminado = '';

    objs.forEach(obj => {
        if (obj.dataset.cod === codEliminar) {
            obj.classList.add('highlighted-danger');
            titEliminado = obj.dataset.tit;
        } else {
            obj.classList.add('highlighted');
            nuevoUsado += parseFloat(obj.dataset.tam);
            activosCount++;
        }
    });

    updatePlatformBar(nuevoUsado, activosCount);
    transcriptOut.innerHTML =
        `&gt; Evaluando reject: [:c | c verCodigo = ${codEliminar}]...<br>` +
        `&gt; Se excluye el objeto #${codEliminar} ('${titEliminado}') y se actualiza con modContenidos:.<br>` +
        `<span style="color:#60a5fa;">[MessageBox notify:] Actualización finalizada (Si el código existía, fue eliminado).</span>`;
}

function renderCatalogByFilter(pointNumber, colText, badgeText, headerTitle, filterClass = null) {
    const objs = prepareStep(pointNumber, colText, badgeText);
    const lines = [headerTitle];

    if (objs.length === 0 && !filterClass) {
        lines.push('La plataforma está vacía.');
    } else {
        objs.forEach(obj => {
            if (filterClass && !obj.classList.contains(filterClass)) {
                obj.classList.add('dimmed');
                return;
            }
            obj.classList.add('highlighted');
            const { cod, tit, gen, anio, tam, calif, dur, cine, temp, fin } = obj.dataset;
            lines.push(`Cód: ${cod} | ${tit} (${gen})`);
            lines.push(`   Año: ${anio} | ${tam} MB | Calif: ${calif}`);

            if (obj.classList.contains('peli')) {
                lines.push(`   -&gt; PELÍCULA | Duración: ${dur} min | En Cine: ${cine === 'true' ? 'Sí' : 'No'}`);
            } else if (obj.classList.contains('serie')) {
                lines.push(`   -&gt; SERIE | Temporadas: ${temp} | Finalizada: ${fin === 'true' ? 'Sí' : 'No'}`);
            }
            lines.push('');
        });
    }
    transcriptOut.innerHTML = lines.join('<br>');
}

function runPunto11() {
    renderCatalogByFilter(11, 'netflix verContenidos (do: + isKindOf:)', 'Punto 11: isKindOf: (Polimorfismo Visual)', '--- CATÁLOGO COMPLETO (ATRIBUTOS) ---');
}

function runPunto12() {
    renderCatalogByFilter(12, 'colFil (select: [:c | c isKindOf: Pelicula])', 'Punto 12: select: + isKindOf: Pelicula', '--- TODAS LAS PELÍCULAS ---', 'peli');
}

function runPunto13() {
    renderCatalogByFilter(13, 'colFil (select: [:c | c isKindOf: Serie])', 'Punto 13: select: + isKindOf: Serie', '--- TODAS LAS SERIES ---', 'serie');
}

document.addEventListener('DOMContentLoaded', () => {
    selectPoint(1);
});