/**
 * graficos3d_tp9.js
 * Renderizado 3D para los problemas de Magnetostática - Física II
 * Utiliza Three.js y OrbitControls. Adaptado para sliders/pestañas dinámicas.
 */

document.addEventListener("DOMContentLoaded", () => {
    initEj2();
    initEj3();
    initEj4();
    initEj5();
    initEj7();
    initEj10();
    initEj15();
});

/**
 * Función base: Crea la escena, cámara, luces y controles.
 * Maneja dinámicamente el redimensionamiento en contenedores ocultos.
 */
function setupScene(containerId, cameraZ = 50) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e1e1e);

    // Inicialización arbitraria, se corregirá automáticamente en el primer frame visible
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(cameraZ, cameraZ * 0.8, cameraZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // Se inserta en el DOM pero no forzamos setSize inmediato
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 50, 50);
    scene.add(dirLight);

    // Ejes de coordenadas (X: Rojo, Y: Verde, Z: Azul)
    const axesHelper = new THREE.AxesHelper(cameraZ * 0.6);
    scene.add(axesHelper);

    // Función vital para sliders: Adapta el canvas al tamaño real mostrado
    function resizeCanvasToDisplaySize() {
        const canvas = renderer.domElement;
        const width = container.clientWidth;
        const height = container.clientHeight;

        if (width > 0 && height > 0 && (canvas.width !== width || canvas.height !== height)) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    }

    const animate = function () {
        requestAnimationFrame(animate);
        resizeCanvasToDisplaySize();
        controls.update();
        
        // Solo renderizar si el contenedor es visible (tamaño > 0)
        if (container.clientWidth > 0 && container.clientHeight > 0) {
            renderer.render(scene, camera);
        }
    };
    animate();

    return { scene, camera };
}

// --- MATERIALES GLOBALES ---
const wireMat = new THREE.MeshStandardMaterial({ color: 0xb87333, roughness: 0.3, metalness: 0.8 }); // Cobre
const wireMatBlue = new THREE.MeshStandardMaterial({ color: 0x3377ff, roughness: 0.3, metalness: 0.8 }); // Derivación
const bFieldMat = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.6 }); // Líneas B

/**
 * Ejercicio 2: Cables semicirculares en paralelo
 */
function initEj2() {
    const setup = setupScene('tp9-ej2-3d', 40);
    if (!setup) return; const { scene } = setup;

    // Cable recto de entrada
    const pathIn = new THREE.LineCurve3(new THREE.Vector3(-30, 0, 0), new THREE.Vector3(-10, 0, 0));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(pathIn, 20, 0.5, 8, false), wireMat));

    // Semicírculo superior (R1 - Menos corriente, lo hacemos más delgado)
    const topCurve = new THREE.EllipseCurve(0, 0, 10, 10, 0, Math.PI, false, 0);
    const topPts = topCurve.getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(topPts), 50, 0.3, 8, false), wireMatBlue));

    // Semicírculo inferior (R2 - Más corriente)
    const botCurve = new THREE.EllipseCurve(0, 0, 10, 10, Math.PI, 2 * Math.PI, false, 0);
    const botPts = botCurve.getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(botPts), 50, 0.6, 8, false), wireMat));

    // Cable recto de salida
    const pathOut = new THREE.LineCurve3(new THREE.Vector3(10, 0, 0), new THREE.Vector3(30, 0, 0));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(pathOut, 20, 0.5, 8, false), wireMat));
}

/**
 * Ejercicio 3: Espira doblada 90°
 */
function initEj3() {
    const setup = setupScene('tp9-ej3-3d', 50);
    if (!setup) return; const { scene } = setup;

    // Espira exterior en el plano XY (R2=20)
    const curveR2 = new THREE.EllipseCurve(0, 0, 20, 20, 0, Math.PI, false, 0);
    const ptsR2 = curveR2.getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsR2), 50, 0.6, 8, false), wireMat));

    // Tramos rectos sobre el eje X
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(20,0,0), new THREE.Vector3(0,0,10)), 10, 0.6, 8, false), wireMat));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(new THREE.Vector3(-20,0,0), new THREE.Vector3(0,0,-10)), 10, 0.6, 8, false), wireMat));

    // Espira interior (R1=10) doblada hacia el plano YZ
    const curveR1 = new THREE.EllipseCurve(0, 0, 10, 10, 0, Math.PI, false, 0);
    const ptsR1 = curveR1.getPoints(50).map(p => new THREE.Vector3(0, p.y, p.x));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(ptsR1), 50, 0.6, 8, false), wireMatBlue));
}

/**
 * Ejercicio 4: Alambre genérico con Punto P
 */
function initEj4() {
    const setup = setupScene('tp9-ej4-3d', 40);
    if (!setup) return; const { scene } = setup;

    const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-20, 10, 0),
        new THREE.Vector3(-10, 10, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(10, 10, 0),
        new THREE.Vector3(20, 10, 0)
    ]);
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(path, 64, 0.6, 8, false), wireMat));

    // Punto P en rojo
    const pMesh = new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    pMesh.position.set(0, 10, 0);
    scene.add(pMesh);
}

/**
 * Ejercicio 5: Hilo recto y curvas Amperianas
 */
function initEj5() {
    const setup = setupScene('tp9-ej5-3d', 40);
    if (!setup) return; const { scene } = setup;

    const path = new THREE.LineCurve3(new THREE.Vector3(0, -40, 0), new THREE.Vector3(0, 40, 0));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(path, 20, 0.5, 8, false), wireMat));

    // Líneas concéntricas de B
    for (let r = 5; r <= 20; r += 5) {
        const curve = new THREE.EllipseCurve(0, 0, r, r, 0, 2 * Math.PI, false, 0);
        const pts = curve.getPoints(50).map(p => new THREE.Vector3(p.x, 0, p.y));
        scene.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), bFieldMat));
    }
}

/**
 * Ejercicio 7: Espira en forma de Gancho
 */
function initEj7() {
    const setup = setupScene('tp9-ej7-3d', 40);
    if (!setup) return; const { scene } = setup;

    const pts = [];
    pts.push(new THREE.Vector3(-10, -20, 0), new THREE.Vector3(-10, 0, 0));
    
    // Bucle curvo
    for (let i = 0; i <= 20; i++) {
        let t = (i / 20) * Math.PI * 1.5;
        pts.push(new THREE.Vector3(-10 + 10 * Math.cos(t), 10 * Math.sin(t), 0));
    }
    pts.push(new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, -20, 0));

    const path = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1);
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(path, 100, 0.6, 8, false), wireMat));
}

/**
 * Ejercicio 10: Cable Coaxial
 */
function initEj10() {
    const setup = setupScene('tp9-ej10-3d', 30);
    if (!setup) return; const { scene } = setup;

    // Núcleo interno
    const coreMesh = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 40, 32), wireMat);
    coreMesh.rotation.x = Math.PI / 2;
    scene.add(coreMesh);

    // Malla exterior hueca transparente
    const shieldMat = new THREE.MeshStandardMaterial({ 
        color: 0xaaaaaa, metalness: 0.8, roughness: 0.2, 
        side: THREE.DoubleSide, transparent: true, opacity: 0.4 
    });
    const shieldMesh = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 40, 32, 1, true), shieldMat);
    shieldMesh.rotation.x = Math.PI / 2;
    scene.add(shieldMesh);
}

/**
 * Ejercicio 15: Dos conductores y fuerzas compensadas
 */
function initEj15() {
    const setup = setupScene('tp9-ej15-3d', 40);
    if (!setup) return; const { scene } = setup;

    // Conductor fijo
    const pathA = new THREE.LineCurve3(new THREE.Vector3(-30, 10, 0), new THREE.Vector3(30, 10, 0));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(pathA, 20, 0.8, 8, false), wireMat));

    // Conductor móvil
    const pathB = new THREE.LineCurve3(new THREE.Vector3(-30, -10, 0), new THREE.Vector3(30, -10, 0));
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(pathB, 20, 0.8, 8, false), wireMatBlue));

    // Fuerza repulsiva (hacia arriba) y Gravedad (hacia abajo)
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -9, 0), 6, 0xff0000, 2, 2));
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, -11, 0), 6, 0x00ff00, 2, 2));
}