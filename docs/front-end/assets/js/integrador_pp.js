// integrador_pp.js

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
    '1': { tit: 'Inception', calif: '9' },
    '2': { tit: 'Toy Story', calif: '8.5' },
    '3': { tit: 'Zoolander', calif: '6.5' },
    '4': { tit: 'El Conjuro', calif: '7.5' },
    '5': { tit: 'Gladiador', calif: '8.5' },
    '6': { tit: 'Breaking Bad', calif: '9.5' },
    '7': { tit: 'Stranger Things', calif: '8.5' },
    '8': { tit: 'The Office', calif: '9' },
    '9': { tit: 'Dark', calif: '8.5' },
    '10': { tit: 'Los Simpson', calif: '8' },
    '11': { tit: 'Interstellar', calif: '9.2' }
};

// Mueve el simulador de memoria exactamente debajo del punto activo
function mountBoardUnder(pointNumber) {
    const slot = document.getElementById('mount-' + pointNumber);
    if (slot && memoryBoard) {
        slot.appendChild(memoryBoard);
    }
}

// Cambia entre vista individual de cada punto (1..10) o "Ver Todos" (0)
function selectPoint(pointNumber) {
    const panels = document.querySelectorAll('.point-panel');
    const navItems = document.querySelectorAll('#sim-nav-points .nav-point');

    navItems.forEach((li, idx) => {
        if (pointNumber === 0) {
            li.classList.toggle('active', idx === 10);
        } else {
            li.classList.toggle('active', idx === pointNumber - 1);
        }
    });

    if (pointNumber === 0) {
        panels.forEach(p => p.classList.add('active-panel'));
        mountBoardUnder(1);
        resetSim();
    } else {
        panels.forEach(p => {
            p.classList.toggle('active-panel', p.id === 'step-' + pointNumber);
        });
        mountBoardUnder(pointNumber);
        resetSim();

        // Ejecuta automáticamente la demostración visual del punto seleccionado
        const autoRunners = {
            1: runPunto1,
            2: runPunto2,
            3: runPunto3,
            4: runPunto4,
            5: runPunto5,
            6: runPunto6,
            7: runPunto7,
            8: () => runPunto8(false),
            9: runPunto9,
            10: runPunto10
        };
        if (autoRunners[pointNumber]) autoRunners[pointNumber]();
    }
}

function getVisibleObjects() {
    return Array.from(document.querySelectorAll('.mem-object')).filter(
        obj => obj.style.display !== 'none'
    );
}

function updatePlatformBar(usedMB, count) {
    const cap = 100000;
    const freeMB = cap - usedMB;
    const pct = Math.min(100, (usedMB / cap) * 100);
    platUsed.innerText = usedMB;
    platFree.innerText = freeMB;
    platBar.style.width = pct + '%';
    platBar.style.background = usedMB > cap ? '#e74c3c' : 'var(--color-paradigmas)';
    platCountBadge.innerText = count + ' objetos';
}

function cleanVisualStates() {
    document.querySelectorAll('.mem-object').forEach(obj => {
        const tipo = obj.classList.contains('peli') ? 'peli' : 'serie';
        obj.className = 'mem-object ' + tipo;
    });
}

function resetSim() {
    if (objNuevoP8) objNuevoP8.style.display = 'none';

    document.querySelectorAll('.mem-object').forEach(obj => {
        const cod = obj.getAttribute('data-cod');
        if (cod !== '11') {
            obj.style.display = '';
        }
        if (INITIAL_DATA[cod]) {
            obj.setAttribute('data-tit', INITIAL_DATA[cod].tit);
            obj.setAttribute('data-calif', INITIAL_DATA[cod].calif);
            const titEl = obj.querySelector('.val-tit');
            const califEl = obj.querySelector('.val-calif');
            if (titEl) titEl.innerText = "'" + INITIAL_DATA[cod].tit + "'";
            if (califEl) califEl.innerText = INITIAL_DATA[cod].calif;
        }
    });

    cleanVisualStates();
    colName.innerText = 'contenidos (10 instancias)';
    activeOpBadge.innerText = 'Estado Inicial';
    updatePlatformBar(81500, 10);
    transcriptOut.innerHTML =
        "&gt; Plataforma 'StreamUTN' restaurada (81.500 / 100.000 MB).<br>" +
        "&gt; 10 objetos activos en la OrderedCollection contenidos.";
}

// PUNTO 1: Listado calificación >= 7
function runPunto1() {
    mountBoardUnder(1);
    cleanVisualStates();
    const objs = getVisibleObjects();
    colName.innerText = 'colFil (select: [:c | c verCalificacion >= 7])';
    activeOpBadge.innerText = 'Punto 1: select: + do:';

    let lines = ['--- CALIFICACION &gt;= 7 ---'];
    objs.forEach(obj => {
        const calif = parseFloat(obj.getAttribute('data-calif'));
        const tit = obj.getAttribute('data-tit');
        if (calif >= 7) {
            obj.classList.add('highlighted');
            lines.push(`${tit} (${calif})`);
        } else {
            obj.classList.add('dimmed');
        }
    });
    transcriptOut.innerHTML = lines.join('<br>');
}

// PUNTO 2: Filtrar por género
function runPunto2() {
    mountBoardUnder(2);
    cleanVisualStates();
    const objs = getVisibleObjects();
    const genSelect = document.getElementById('select-genero');
    const gen = genSelect ? genSelect.value : 'Ficcion';

    colName.innerText = `colFil (select: [:c | c verGenero = '${gen}'])`;
    activeOpBadge.innerText = 'Punto 2: Prompter + select:';

    let lines = [`--- GÉNERO: ${gen} ---`];
    objs.forEach(obj => {
        const objGen = obj.getAttribute('data-gen');
        const tit = obj.getAttribute('data-tit');
        if (objGen === gen) {
            obj.classList.add('highlighted');
            lines.push(tit);
        } else {
            obj.classList.add('dimmed');
        }
    });
    transcriptOut.innerHTML = lines.join('<br>');
}

// PUNTO 3: Recomendables para maratón (Polimorfismo)
function runPunto3() {
    mountBoardUnder(3);
    cleanVisualStates();
    const objs = getVisibleObjects();
    colName.innerText = 'colFil (select: [:c | c esRecomendable])';
    activeOpBadge.innerText = 'Punto 3: Polimorfismo y Binding Dinámico';

    let lines = ['--- RECOMENDADOS PARA MARATÓN ---'];
    objs.forEach(obj => {
        const tit = obj.getAttribute('data-tit');
        const calif = parseFloat(obj.getAttribute('data-calif'));

        if (obj.classList.contains('peli')) {
            const dur = parseFloat(obj.getAttribute('data-dur'));
            if (dur <= 120 && calif >= 7) {
                obj.classList.add('poly-true');
                lines.push(`${tit}  <span style="color:#94a3b8;">[Pelicula &gt;&gt; esRecomendable -&gt; true]</span>`);
            } else {
                obj.classList.add('poly-false');
            }
        } else if (obj.classList.contains('serie')) {
            const temp = parseFloat(obj.getAttribute('data-temp'));
            const fin = obj.getAttribute('data-fin') === 'true';
            if (fin && temp <= 3 && calif >= 7) {
                obj.classList.add('poly-true');
                lines.push(`${tit}  <span style="color:#94a3b8;">[Serie &gt;&gt; esRecomendable -&gt; true]</span>`);
            } else {
                obj.classList.add('poly-false');
            }
        }
    });
    transcriptOut.innerHTML = lines.join('<br>');
}

// PUNTO 4: Tamaño promedio y superiores
function runPunto4() {
    mountBoardUnder(4);
    cleanVisualStates();
    const objs = getVisibleObjects();
    colName.innerText = 'colFil (select: [:c | c verTamanio > prom])';
    activeOpBadge.innerText = 'Punto 4: Promedio con do: y select:';

    let suma = 0;
    objs.forEach(obj => {
        suma += parseFloat(obj.getAttribute('data-tam'));
    });
    const cant = objs.length;
    const prom = cant > 0 ? Math.round((suma / cant) * 100) / 100 : 0;

    let lines = [
        '--- TAMAÑOS ---',
        `Promedio general: ${prom} MB`,
        'Superan el promedio:'
    ];

    objs.forEach(obj => {
        const tam = parseFloat(obj.getAttribute('data-tam'));
        const tit = obj.getAttribute('data-tit');
        if (tam > prom) {
            obj.classList.add('highlighted');
            lines.push(`- ${tit} (${tam} MB)`);
        } else {
            obj.classList.add('dimmed');
        }
    });
    transcriptOut.innerHTML = lines.join('<br>');
}

// PUNTO 5: Contenido con mayor calificación
function runPunto5() {
    mountBoardUnder(5);
    cleanVisualStates();
    const objs = getVisibleObjects();
    if (objs.length === 0) return;

    colName.innerText = 'mejor (Objeto con mayor calificación)';
    activeOpBadge.innerText = 'Punto 5: Búsqueda de Máximo con do:';

    let mejorObj = objs[0];
    let maxCalif = parseFloat(mejorObj.getAttribute('data-calif'));

    objs.forEach(obj => {
        const calif = parseFloat(obj.getAttribute('data-calif'));
        if (calif > maxCalif) {
            maxCalif = calif;
            mejorObj = obj;
        }
    });

    objs.forEach(obj => {
        if (obj === mejorObj) {
            obj.classList.add('highlighted-detect');
        } else {
            obj.classList.add('dimmed');
        }
    });

    const mejorTit = mejorObj.getAttribute('data-tit');
    transcriptOut.innerHTML =
        '--- MEJOR CALIFICADO ---<br>' +
        `${mejorTit} con ${maxCalif} puntos.`;
}

// PUNTO 6: Eliminar NO disponibles
function runPunto6() {
    mountBoardUnder(6);
    cleanVisualStates();
    const objs = getVisibleObjects();
    colName.innerText = 'netflix modContenidos: (solo disponibles)';
    activeOpBadge.innerText = 'Punto 6: select: not + modContenidos:';

    let eliminados = [];
    let nuevoUsado = 0;
    let activosCount = 0;

    objs.forEach(obj => {
        const isDisp = obj.getAttribute('data-disp') === 'true';
        const tit = obj.getAttribute('data-tit');
        const tam = parseFloat(obj.getAttribute('data-tam'));
        if (!isDisp) {
            obj.classList.add('highlighted-danger');
            eliminados.push(`- ${tit}`);
        } else {
            obj.classList.add('highlighted');
            nuevoUsado += tam;
            activosCount++;
        }
    });

    updatePlatformBar(nuevoUsado, activosCount);
    transcriptOut.innerHTML =
        '--- CONTENIDOS ELIMINADOS ---<br>' +
        eliminados.join('<br>') +
        '<br><span style="color:#60a5fa;">[MessageBox notify:] Se eliminaron los contenidos listados en el Transcript.</span>';
}

// PUNTO 7: Cantidad por género (Diccionario)
function runPunto7() {
    mountBoardUnder(7);
    cleanVisualStates();
    const objs = getVisibleObjects();
    colName.innerText = 'dic (Dictionary clave: género -> valor: cantidad)';
    activeOpBadge.innerText = 'Punto 7: collect: + asSet + Dictionary';

    const conteo = {};
    objs.forEach(obj => {
        obj.classList.add('collected');
        const gen = obj.getAttribute('data-gen');
        conteo[gen] = (conteo[gen] || 0) + 1;
    });

    let lines = ['--- CANTIDAD POR GÉNERO (Dictionary keysDo:) ---'];
    Object.keys(conteo).forEach(g => {
        lines.push(`Género: ${g} - Cantidad: ${conteo[g]}`);
    });
    transcriptOut.innerHTML = lines.join('<br>');
}

// PUNTO 8: Agregar nuevo contenido
function runPunto8(excederCapacidad) {
    mountBoardUnder(8);
    resetSim();
    activeOpBadge.innerText = 'Punto 8: agregarContenido: y Capacidad';

    if (!excederCapacidad) {
        if (objNuevoP8) {
            objNuevoP8.style.display = '';
            objNuevoP8.classList.add('highlighted-detect');
        }
        colName.innerText = 'contenidos (11 objetos tras add:)';
        updatePlatformBar(86000, 11);
        transcriptOut.innerHTML =
            '<span style="color:#60a5fa;">[MessageBox notify:] Espacio disponible en la plataforma: 18500 MB.</span><br>' +
            "&gt; Pelicula crearPeli:11 tit:'Interstellar' ... tam:4500.<br>" +
            '&gt; Evaluando (81500 + 4500 &lt;= 100000) -&gt; <strong>true</strong> (contenidos add: nuevoObj).<br>' +
            '<span style="color:#2ecc71;">[MessageBox notify:] Operación finalizada.</span>';
    } else {
        colName.innerText = 'contenidos (Rechazado por capacidad)';
        platBar.style.width = '100%';
        platBar.style.background = '#e74c3c';
        transcriptOut.innerHTML =
            '<span style="color:#60a5fa;">[MessageBox notify:] Espacio disponible en la plataforma: 18500 MB.</span><br>' +
            "&gt; Intentando agregar contenido de 25000 MB...<br>" +
            '&gt; Evaluando (81500 + 25000 &lt;= 100000) -&gt; <strong>false</strong>.<br>' +
            '<span style="color:#e74c3c; font-weight:bold;">[MessageBox errorMsg:] No hay suficiente capacidad en la plataforma.</span>';
    }
}

// PUNTO 9: Buscar y modificar por código
function runPunto9() {
    mountBoardUnder(9);
    cleanVisualStates();
    const codSelect = document.getElementById('select-cod-mod');
    const codBuscado = codSelect ? codSelect.value : '3';
    const objs = getVisibleObjects();

    activeOpBadge.innerText = 'Punto 9: detect: ifNone: + Setters';
    const encontrado = objs.find(obj => obj.getAttribute('data-cod') === codBuscado);

    if (!encontrado) {
        objs.forEach(obj => obj.classList.add('dimmed'));
        colName.innerText = 'encontrado := nil (Bloque ifNone:)';
        transcriptOut.innerHTML =
            `&gt; Buscando código ${codBuscado} con detect: ...<br>` +
            '<span style="color:#f1c40f; font-weight:bold;">[MessageBox warning:] No se encontró ningún contenido con ese código.</span>';
    } else {
        const titActual = encontrado.getAttribute('data-tit');
        const nuevoTit = titActual.includes('(Ed. Especial)') ? titActual : titActual + ' (Ed. Especial)';
        const nuevaCal = '9.8';

        objs.forEach(obj => {
            if (obj === encontrado) {
                obj.classList.add('highlighted-detect');
                obj.setAttribute('data-tit', nuevoTit);
                obj.setAttribute('data-calif', nuevaCal);
                const titEl = obj.querySelector('.val-tit');
                const califEl = obj.querySelector('.val-calif');
                if (titEl) titEl.innerText = "'" + nuevoTit + "'";
                if (califEl) califEl.innerText = nuevaCal;
            } else {
                obj.classList.add('dimmed');
            }
        });

        colName.innerText = `encontrado (Cód #${codBuscado} modificado en RAM)`;
        transcriptOut.innerHTML =
            `&gt; detect: encontró el objeto #${codBuscado} ('${titActual}').<br>` +
            `&gt; Ejecutando encontrado modTitulo: '${nuevoTit}'.<br>` +
            `&gt; Ejecutando encontrado modCalificacion: ${nuevaCal}.<br>` +
            '<span style="color:#2ecc71;">[MessageBox notify:] Contenido modificado con éxito.</span>';
    }
}

// PUNTO 10: Eliminar contenido por código
function runPunto10() {
    mountBoardUnder(10);
    cleanVisualStates();
    const codSelect = document.getElementById('select-cod-del');
    const codEliminar = codSelect ? codSelect.value : '5';
    const objs = getVisibleObjects();

    activeOpBadge.innerText = 'Punto 10: reject: + modContenidos:';
    colName.innerText = `contenidos (reject: [:c | c verCodigo = ${codEliminar}])`;

    let nuevoUsado = 0;
    let activosCount = 0;
    let titEliminado = '';

    objs.forEach(obj => {
        const cod = obj.getAttribute('data-cod');
        const tam = parseFloat(obj.getAttribute('data-tam'));
        if (cod === codEliminar) {
            obj.classList.add('highlighted-danger');
            titEliminado = obj.getAttribute('data-tit');
        } else {
            obj.classList.add('highlighted');
            nuevoUsado += tam;
            activosCount++;
        }
    });

    updatePlatformBar(nuevoUsado, activosCount);
    transcriptOut.innerHTML =
        `&gt; Evaluando reject: [:c | c verCodigo = ${codEliminar}]...<br>` +
        `&gt; Se excluye el objeto #${codEliminar} ('${titEliminado}') y se actualiza con modContenidos:.<br>` +
        '<span style="color:#60a5fa;">[MessageBox notify:] Actualización finalizada (Si el código existía, fue eliminado).</span>';
}

// Al cargar la página, acopla el simulador debajo del Punto 1
document.addEventListener('DOMContentLoaded', () => {
    selectPoint(1);
});