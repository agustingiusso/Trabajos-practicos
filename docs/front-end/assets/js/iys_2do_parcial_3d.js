/**
 * iys_2do_parcial_3d.js
 * Visualizador 3D Interactivo para Defensa de Ingeniería y Sociedad (Nébolas NB)
 * Modos: 1) Geometría detallada de Nébola NB (rotación fija) | 2) Planta Automatizada 330 m² (flujo Pull)
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('nebolas-3d-canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    let scene, camera, renderer, controls;
    let cookieGroup, plantGroup;
    let conveyorCookies = [];
    let isWireframe = false;
    let currentMode = 'cookie';
    let currentRecipe = 'tradicional';
    let demandSpeed = 1.0;
    const FIXED_COOKIE_ROTATION_SPEED = 0.0045; // Velocidad de rotación fija para la galletita sola

    // Textura procedural para simular la porosidad real de la masa horneada
    let bakedBumpTexture = null;

    function createBakedBumpTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const imgData = ctx.createImageData(256, 256);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
            const grain = 115 + Math.floor(Math.random() * 55);
            data[i] = grain;
            data[i + 1] = grain;
            data[i + 2] = grain;
            data[i + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(6, 6);
        return texture;
    }

    function getThemeColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        return {
            bg: isDark ? 0x1a1a1a : 0xf2f6fa,
            gridMain: isDark ? 0x9b59b6 : 0x8e44ad,
            gridSec: isDark ? 0x333333 : 0xcbd5e1
        };
    }

    function getRecipePalette() {
        if (currentRecipe === 'tradicional') {
            // Dorado clásico de nébola horneada (según foto de referencia)
            return {
                base: 0xdca157,      // Fondo interior de los rombos (tostado medio)
                ridge: 0xedc07e,     // Nervaduras superiores y letras NB (dorado claro)
                recess: 0xc28338     // Sombra del sello central
            };
        } else {
            // Tono violáceo característico de harina de orujo de uva tinta
            return {
                base: 0x6c3483,      // Base violácea intensa de orujo
                ridge: 0x9b69b3,     // Relieve superior y letras NB en lavanda/violeta horneado
                recess: 0x4a235a     // Fondo tostado violáceo oscuro en el sello central
            };
        }
    }

    function init3D() {
        const colors = getThemeColors();
        bakedBumpTexture = createBakedBumpTexture();

        scene = new THREE.Scene();
        scene.background = new THREE.Color(colors.bg);

        const width = container.clientWidth || 600;
        const height = container.clientHeight || 420;

        camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
        camera.position.set(0, 6.8, 7.8);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;

        // Iluminación calibrada para resaltar el relieve gofrado y el sello NB
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xfff8e7, 0.9);
        dirLight.position.set(7, 14, 9);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const fillLight = new THREE.DirectionalLight(0xe2d4f0, 0.4);
        fillLight.position.set(-8, -6, -5);
        scene.add(fillLight);

        // Grilla base de referencia ingenieril
        const gridHelper = new THREE.GridHelper(18, 18, colors.gridMain, colors.gridSec);
        gridHelper.position.y = -2.2;
        gridHelper.name = 'baseGrid';
        scene.add(gridHelper);

        buildCookieModel();
        buildPlantModel();
        updateModeVisibility();
        animate();
    }

    // Crea un cuadro con esquinas levemente achaflanadas (marco central de la nébola)
    function createChamferedSquareShape(halfSize, chamfer) {
        const s = new THREE.Shape();
        s.moveTo(-halfSize + chamfer, -halfSize);
        s.lineTo(halfSize - chamfer, -halfSize);
        s.lineTo(halfSize, -halfSize + chamfer);
        s.lineTo(halfSize, halfSize - chamfer);
        s.lineTo(halfSize - chamfer, halfSize);
        s.lineTo(-halfSize + chamfer, halfSize);
        s.lineTo(-halfSize, halfSize - chamfer);
        s.lineTo(-halfSize, -halfSize + chamfer);
        s.closePath();
        return s;
    }

    // Construye el sello central (marco cuadrado + letras "NB" en relieve 3D) para una cara
    function createCenterStampGroup(ridgeMat, recessMat, isTopFace) {
        const stampGroup = new THREE.Group();
        const sign = isTopFace ? 1 : -1;

        // 1. Placa interior del cuadrado (fondo levemente hundido donde se apoyan las letras NB)
        const innerPlateShape = createChamferedSquareShape(0.84, 0.08);
        const innerPlateGeo = new THREE.ExtrudeGeometry(innerPlateShape, {
            depth: 0.06,
            bevelEnabled: false
        });
        innerPlateGeo.rotateX(Math.PI / 2);
        const innerPlateMesh = new THREE.Mesh(innerPlateGeo, recessMat);
        innerPlateMesh.position.y = sign * 0.13;
        stampGroup.add(innerPlateMesh);

        // 2. Marco cuadrado exterior en relieve (borde del sello central)
        const outerFrameShape = createChamferedSquareShape(0.92, 0.11);
        const holePath = createChamferedSquareShape(0.76, 0.06);
        outerFrameShape.holes.push(holePath);

        const frameGeo = new THREE.ExtrudeGeometry(outerFrameShape, {
            depth: 0.11,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.015,
            bevelSegments: 2
        });
        frameGeo.rotateX(Math.PI / 2);
        const frameMesh = new THREE.Mesh(frameGeo, ridgeMat);
        frameMesh.position.y = isTopFace ? 0.22 : -0.11;
        stampGroup.add(frameMesh);

        // 3. Letras "NB" esculpidas en relieve 3D dentro del cuadrado
        const lettersGroup = new THREE.Group();
        const barHeight = 0.11;
        const yPos = isTopFace ? 0.165 : -0.165;

        const addBar = (w, d, x, z, rotY = 0) => {
            const geo = new THREE.BoxGeometry(w, barHeight, d);
            const mesh = new THREE.Mesh(geo, ridgeMat);
            mesh.position.set(x, yPos, z);
            mesh.rotation.y = rotY;
            lettersGroup.add(mesh);
        };

        // --- Letra "N" (lado izquierdo del cuadro) ---
        addBar(0.11, 0.86, -0.48, 0);               // Columna izquierda de la N
        addBar(0.11, 0.86, -0.12, 0);               // Columna derecha de la N
        addBar(0.10, 0.92, -0.30, 0, 0.40);        // Travesaño diagonal de la N

        // --- Letra "B" (lado derecho del cuadro) ---
        addBar(0.11, 0.86, 0.12, 0);                // Columna vertical izquierda de la B
        // Barras horizontales de la B (superior, media, inferior)
        addBar(0.28, 0.105, 0.24, -0.375);
        addBar(0.26, 0.10, 0.23, 0.0);
        addBar(0.28, 0.105, 0.24, 0.375);

        // Arcos curvos superior e inferior de la "B"
        const loopGeo = new THREE.CylinderGeometry(0.22, 0.22, barHeight, 20, 1, false, 0, Math.PI);
        const topLoop = new THREE.Mesh(loopGeo, ridgeMat);
        topLoop.position.set(0.32, yPos, -0.19);
        lettersGroup.add(topLoop);

        const bottomLoop = new THREE.Mesh(loopGeo, ridgeMat);
        bottomLoop.position.set(0.33, yPos, 0.19);
        lettersGroup.add(bottomLoop);

        // Huecos internos de la "B" para definir perfectamente los dos ojos de la letra
        const holeGeo = new THREE.CylinderGeometry(0.11, 0.11, barHeight + 0.02, 16);
        const topHole = new THREE.Mesh(holeGeo, recessMat);
        topHole.position.set(0.28, yPos, -0.19);
        lettersGroup.add(topHole);

        const bottomHole = new THREE.Mesh(holeGeo, recessMat);
        bottomHole.position.set(0.29, yPos, 0.19);
        lettersGroup.add(bottomHole);

        if (!isTopFace) {
            lettersGroup.scale.x = -1; // Lectura correcta al girar la cara inferior
        }

        stampGroup.add(lettersGroup);
        return stampGroup;
    }

    // 1. Modelo 3D de alta precisión de la Galletita Nébola NB
    function buildCookieModel() {
        cookieGroup = new THREE.Group();
        const palette = getRecipePalette();

        const baseMat = new THREE.MeshStandardMaterial({
            color: palette.base,
            roughness: 0.78,
            metalness: 0.04,
            bumpMap: bakedBumpTexture,
            bumpScale: 0.025,
            wireframe: isWireframe
        });

        const ridgeMat = new THREE.MeshStandardMaterial({
            color: palette.ridge,
            roughness: 0.68,
            metalness: 0.05,
            bumpMap: bakedBumpTexture,
            bumpScale: 0.02,
            wireframe: isWireframe
        });

        const recessMat = new THREE.MeshStandardMaterial({
            color: palette.recess,
            roughness: 0.82,
            metalness: 0.03,
            bumpMap: bakedBumpTexture,
            bumpScale: 0.03,
            wireframe: isWireframe
        });

        // A. Disco base con borde festoneado/ondulado (36 ondas perimetrales como en la foto)
        const baseShape = new THREE.Shape();
        const numWaves = 36;
        const totalPts = 360;
        const baseRadius = 3.42;
        const waveAmp = 0.095;

        for (let i = 0; i <= totalPts; i++) {
            const theta = (i / totalPts) * Math.PI * 2;
            const r = baseRadius + waveAmp * Math.cos(numWaves * theta);
            const x = r * Math.cos(theta);
            const y = r * Math.sin(theta);
            if (i === 0) baseShape.moveTo(x, y);
            else baseShape.lineTo(x, y);
        }

        const extrudeSettings = {
            depth: 0.18,
            bevelEnabled: true,
            bevelSegments: 3,
            steps: 1,
            bevelSize: 0.04,
            bevelThickness: 0.035
        };

        const discGeo = new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
        discGeo.center();
        discGeo.rotateX(Math.PI / 2);
        const discMesh = new THREE.Mesh(discGeo, baseMat);
        cookieGroup.add(discMesh);

        // B. Rejilla de nervaduras diagonales formando rombos (ángulo de 34° respecto al eje Z)
const angle = 0.59; // ~34 grados para producir rombos estilizados como en la imagen
const spacing = 0.64;
const clipRadius = 3.36;
const stampHalf = 0.92;   // medio lado del cuadrado del sello (marco exterior)
const stampClearance = stampHalf + 0.06; // margen extra para no tocar el marco

// Devuelve los intervalos [t0,t1] del segmento P(t)=O + t*D (|D|=1) que están
// dentro del círculo de radio clipRadius y fuera del cuadrado [-stampClearance, stampClearance]^2
// en el plano rotado (coordenadas locales: eje "u" = a lo largo de la barra, eje "v" = perpendicular)
function clipSegmentAgainstStamp(oU, oV, dU, dV) {
    // 1) Recorte contra el círculo (en coords locales el círculo sigue siendo círculo)
    const b = 2 * (oU * dU + oV * dV);
    const c = oU * oU + oV * oV - clipRadius * clipRadius;
    const disc = b * b - 4 * c;
    if (disc <= 0) return [];
    const sq = Math.sqrt(disc);
    let t0 = (-b - sq) / 2;
    let t1 = (-b + sq) / 2;
    if (t1 <= t0) return [];

    // 2) Recorte contra el cuadrado central (en coords locales el cuadrado está rotado -angle,
    //    así que lo tratamos en coords globales del plano rotado; pero como estamos en locales,
    //    convertimos punto local -> global para testear el cuadrado)
    const cosA = Math.cos(-angle), sinA = Math.sin(-angle); // local -> global del plano rotado
    // En realidad el cuadrado del sello está alineado con los ejes X/Z del mundo (no rotado),
    // y nuestras barras están rotadas por rotAngle. Trabajamos en coords del mundo del plano:
    // punto mundo = rot(rotAngle) * punto local. Pero oU,oV ya están en el sistema de la barra.
    // Para simplificar, pasamos a coords mundo del plano (X,Z) y recortamos ahí.

    // Convertir origen y dirección al sistema mundo del plano (X,Z)
    const ca = Math.cos(angle), sa = Math.sin(angle);
    // (rotación aplicada a la barra: X = u*cos - v*sin ; Z = u*sin + v*cos) según el código original
    function toWorld(u, v) {
        return { x: u * ca - v * sa, z: u * sa + v * ca };
    }
    // Ojo: en el código original la barra se posiciona con rotation.y = -rotAngle,
    // y las posiciones se calculan como localX*cos - localZ*sin, etc. Mantenemos esa convención.
    // Reconstruimos O y D en mundo:
    // Para la barra con rotAngle = +angle o -angle, la dirección "a lo largo" en mundo es:
    // D_world = (cos(rotAngle), sin(rotAngle)) aprox. Usamos directamente la parametrización
    // del código original: punto = rot(-rotAngle) aplicado a (localX, localZ).
    // Es más simple: en el código, para cada offset, el punto medio de la barra es
    // (offset*cos(rotAngle), offset*sin(rotAngle)) y la dirección de la barra es
    // (-sin(rotAngle), cos(rotAngle)) * t  (porque la barra es larga en Z local).
    return null; // se reemplaza abajo
}

// Implementación directa y clara: para cada barra, parametrizamos en mundo (X,Z)
[-angle, angle].forEach(rotAngle => {
    const cosR = Math.cos(rotAngle);
    const sinR = Math.sin(rotAngle);
    // Dirección unitaria a lo largo de la barra (eje Z local rotado)
    const dirX = -sinR;
    const dirZ = cosR;

    for (let offset = -3.3; offset <= 3.3; offset += spacing) {
        // Punto de la barra más cercano al origen (centro de la galletita)
        const ox = offset * cosR;
        const oz = offset * sinR;

        // Recorte contra el círculo (en mundo, el círculo está centrado en 0)
        const b = 2 * (ox * dirX + oz * dirZ);
        const c = ox * ox + oz * oz - clipRadius * clipRadius;
        const disc = b * b - 4 * c;
        if (disc <= 0) continue;
        const sq = Math.sqrt(disc);
        let t0 = (-b - sq) / 2;
        let t1 = (-b + sq) / 2;
        if (t1 - t0 < 0.25) continue;

        // Recorte contra el cuadrado central [-stampClearance, stampClearance]^2
        // Para cada eje, calculamos el intervalo de t donde el punto está DENTRO del cuadrado.
        // Luego restamos ese intervalo del [t0,t1] para obtener los tramos fuera.
        let tIn0 = -Infinity, tIn1 = Infinity;
        // Eje X
        if (Math.abs(dirX) < 1e-6) {
            if (Math.abs(ox) > stampClearance) { tIn0 = Infinity; tIn1 = -Infinity; }
        } else {
            let ta = (-stampClearance - ox) / dirX;
            let tb = ( stampClearance - ox) / dirX;
            if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; }
            tIn0 = Math.max(tIn0, ta);
            tIn1 = Math.min(tIn1, tb);
        }
        // Eje Z
        if (Math.abs(dirZ) < 1e-6) {
            if (Math.abs(oz) > stampClearance) { tIn0 = Infinity; tIn1 = -Infinity; }
        } else {
            let ta = (-stampClearance - oz) / dirZ;
            let tb = ( stampClearance - oz) / dirZ;
            if (ta > tb) { const tmp = ta; ta = tb; tb = tmp; }
            tIn0 = Math.max(tIn0, ta);
            tIn1 = Math.min(tIn1, tb);
        }

        // Intervalos fuera del cuadrado dentro de [t0,t1]
        const segments = [];
        if (tIn1 <= t0 || tIn0 >= t1) {
            // No se solapa con el cuadrado: tramo completo
            segments.push([t0, t1]);
        } else {
            if (tIn0 > t0) segments.push([t0, tIn0]);
            if (tIn1 < t1) segments.push([tIn1, t1]);
        }

        segments.forEach(([a, b2]) => {
            const len = b2 - a;
            if (len < 0.2) return;
            const midT = (a + b2) / 2;
            const px = ox + dirX * midT;
            const pz = oz + dirZ * midT;
            const segGeo = new THREE.BoxGeometry(0.11, 0.30, len);
            const segMesh = new THREE.Mesh(segGeo, ridgeMat);
            segMesh.position.set(px, 0, pz);
            segMesh.rotation.y = -rotAngle;
            cookieGroup.add(segMesh);
        });
    }
});

        // C. Sello cuadrado central con las letras "NB" en ambas caras de la galletita
        cookieGroup.add(createCenterStampGroup(ridgeMat, recessMat, true));
        cookieGroup.add(createCenterStampGroup(ridgeMat, recessMat, false));

        // Inclinación inicial para apreciar el relieve y el cuadro NB de frente
        cookieGroup.rotation.x = 0.42;
        scene.add(cookieGroup);
    }

    // 2. Modelo 3D del Layout de Planta de 330 m² (4 Estaciones Automatizadas)
    function buildPlantModel() {
        plantGroup = new THREE.Group();
        conveyorCookies = [];
        const palette = getRecipePalette();

        // Cinta transportadora central
        const beltGeo = new THREE.BoxGeometry(14, 0.25, 1.6);
        const beltMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7, wireframe: isWireframe });
        const beltMesh = new THREE.Mesh(beltGeo, beltMat);
        beltMesh.position.y = -1.0;
        plantGroup.add(beltMesh);

        // 4 Estaciones: Dosificación, Cocción, Enfriamiento, Envasado
        const stations = [
            { name: 'Dosificación', x: -5.2, color: 0x3498db, h: 2.2 },
            { name: 'Horno Gofrador', x: -1.8, color: 0xe67e22, h: 2.5 },
            { name: 'Túnel Enfriamiento', x: 1.8, color: 0x2ecc71, h: 2.0 },
            { name: 'Flow-Pack', x: 5.2, color: 0x9b59b6, h: 2.3 }
        ];

        stations.forEach(st => {
            const stGeo = new THREE.BoxGeometry(2.1, st.h, 2.2);
            const stMat = new THREE.MeshStandardMaterial({
                color: st.color,
                transparent: true,
                opacity: 0.82,
                wireframe: isWireframe
            });
            const stMesh = new THREE.Mesh(stGeo, stMat);
            stMesh.position.set(st.x, -1.0 + st.h / 2, 0);
            plantGroup.add(stMesh);
        });

        // Lote de nébolas circulando según demanda (Pull)
        const miniCookieGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 24);
        for (let i = 0; i < 8; i++) {
            const miniMat = new THREE.MeshStandardMaterial({
                color: palette.base,
                roughness: 0.7,
                wireframe: isWireframe
            });
            const miniMesh = new THREE.Mesh(miniCookieGeo, miniMat);
            miniMesh.position.set(-6.5 + i * 1.8, -0.78, 0);
            plantGroup.add(miniMesh);
            conveyorCookies.push(miniMesh);
        }

        scene.add(plantGroup);
    }

    function refreshMaterials() {
        scene.remove(cookieGroup);
        scene.remove(plantGroup);
        buildCookieModel();
        buildPlantModel();
        updateModeVisibility();
    }

    function updateModeVisibility() {
        if (!cookieGroup || !plantGroup) return;
        cookieGroup.visible = (currentMode === 'cookie');
        plantGroup.visible = (currentMode === 'plant');

        // Mostrar el control de Ritmo de Demanda (Pull) únicamente en el modo Planta
        const speedGroup = document.getElementById('group-3d-speed');
        if (speedGroup) {
            speedGroup.style.display = (currentMode === 'plant') ? 'block' : 'none';
        }

        const telemetryBox = document.getElementById('box-3d-telemetry');
        if (telemetryBox) {
            if (currentMode === 'cookie') {
                const tipo = currentRecipe === 'tradicional'
                    ? 'Clásica Italiana (Dorada)'
                    : 'Harina de Orujo (Violácea)';
                telemetryBox.textContent = `Variedad: ${tipo} | Sello Central: NB | Espesor: 3.2 mm`;
            } else {
                const uHora = Math.round(1450 * demandSpeed);
                telemetryBox.textContent = `Planta 330 m² | Flujo Pull: ${uHora} unid/h | Merma < 1.8%`;
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        if (currentMode === 'cookie' && cookieGroup) {
            // Rotación a velocidad fija e independiente del slider de demanda
            cookieGroup.rotation.y += FIXED_COOKIE_ROTATION_SPEED;
        } else if (currentMode === 'plant' && conveyorCookies.length > 0) {
            // El flujo de la cinta en planta sí responde al ritmo de demanda toyotista
            conveyorCookies.forEach(c => {
                c.position.x += 0.025 * demandSpeed;
                if (c.position.x > 6.8) c.position.x = -6.8;
            });
        }

        if (controls) controls.update();
        if (renderer && scene && camera) renderer.render(scene, camera);
    }

    // Eventos de UI
    const modeSelect = document.getElementById('select-3d-mode');
    if (modeSelect) {
        modeSelect.addEventListener('change', e => {
            currentMode = e.target.value;
            updateModeVisibility();
        });
    }

    const recipeSelect = document.getElementById('select-3d-recipe');
    if (recipeSelect) {
        recipeSelect.addEventListener('change', e => {
            currentRecipe = e.target.value;
            refreshMaterials();
        });
    }

    const speedSlider = document.getElementById('slider-3d-speed');
    const speedLabel = document.getElementById('label-3d-speed');
    if (speedSlider) {
        speedSlider.addEventListener('input', e => {
            demandSpeed = parseFloat(e.target.value);
            if (speedLabel) speedLabel.textContent = `${demandSpeed.toFixed(1)}x`;
            updateModeVisibility();
        });
    }

    const wireBtn = document.getElementById('btn-3d-wireframe');
    if (wireBtn) {
        wireBtn.addEventListener('click', () => {
            isWireframe = !isWireframe;
            refreshMaterials();
        });
    }

    // Observador de cambio de tema claro/oscuro
    const observer = new MutationObserver(() => {
        if (!scene) return;
        const colors = getThemeColors();
        scene.background = new THREE.Color(colors.bg);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    window.addEventListener('resize', () => {
        if (!camera || !renderer || !container) return;
        const w = container.clientWidth || 600;
        const h = container.clientHeight || 420;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });

    init3D();
});