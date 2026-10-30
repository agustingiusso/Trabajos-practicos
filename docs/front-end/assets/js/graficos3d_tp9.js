document.addEventListener("DOMContentLoaded", () => {
    initEj2();
    initEj3();
    initEj4();
    initEj5();
    initEj7();
    initEj10();
    initEj15();
});

function setupScene(containerId, cameraZ = 50) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e1e1e);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(cameraZ, cameraZ * 0.8, cameraZ);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const canvas = renderer.domElement;
    container.appendChild(canvas);

    const controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(50, 50, 50);
    scene.add(dirLight);
    scene.add(new THREE.AxesHelper(cameraZ * 0.6));

    const animate = () => {
        requestAnimationFrame(animate);
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width <= 0 || height <= 0) return;

        if (canvas.width !== width || canvas.height !== height) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    return { scene, camera };
}

const wireMat = new THREE.MeshStandardMaterial({ color: 0xb87333, roughness: 0.3, metalness: 0.8 });
const wireMatBlue = new THREE.MeshStandardMaterial({ color: 0x3377ff, roughness: 0.3, metalness: 0.8 });
const bFieldMat = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.6 });

const addTube = (scene, curve, segments, radius, mat) => {
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, segments, radius, 8, false), mat));
};

const addLineTube = (scene, v1, v2, segments, radius, mat) => {
    addTube(scene, new THREE.LineCurve3(new THREE.Vector3(...v1), new THREE.Vector3(...v2)), segments, radius, mat);
};

function initEj2() {
    const setup = setupScene('tp9-ej2-3d', 40);
    if (!setup) return;
    const { scene } = setup;

    addLineTube(scene, [-30, 0, 0], [-10, 0, 0], 20, 0.5, wireMat);

    const topPts = new THREE.EllipseCurve(0, 0, 10, 10, 0, Math.PI, false, 0)
        .getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0));
    addTube(scene, new THREE.CatmullRomCurve3(topPts), 50, 0.3, wireMatBlue);

    const botPts = new THREE.EllipseCurve(0, 0, 10, 10, Math.PI, 2 * Math.PI, false, 0)
        .getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0));
    addTube(scene, new THREE.CatmullRomCurve3(botPts), 50, 0.6, wireMat);

    addLineTube(scene, [10, 0, 0], [30, 0, 0], 20, 0.5, wireMat);
}

function initEj3() {
    const setup = setupScene('tp9-ej3-3d', 50);
    if (!setup) return;
    const { scene } = setup;

    const ptsR2 = new THREE.EllipseCurve(0, 0, 20, 20, 0, Math.PI, false, 0)
        .getPoints(50).map(p => new THREE.Vector3(p.x, p.y, 0));
    addTube(scene, new THREE.CatmullRomCurve3(ptsR2), 50, 0.6, wireMat);

    addLineTube(scene, [20, 0, 0], [0, 0, 10], 10, 0.6, wireMat);
    addLineTube(scene, [-20, 0, 0], [0, 0, -10], 10, 0.6, wireMat);

    const ptsR1 = new THREE.EllipseCurve(0, 0, 10, 10, 0, Math.PI, false, 0)
        .getPoints(50).map(p => new THREE.Vector3(0, p.y, p.x));
    addTube(scene, new THREE.CatmullRomCurve3(ptsR1), 50, 0.6, wireMatBlue);
}

function initEj4() {
    const setup = setupScene('tp9-ej4-3d', 40);
    if (!setup) return;
    const { scene } = setup;

    const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-20, 10, 0),
        new THREE.Vector3(-10, 10, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(10, 10, 0),
        new THREE.Vector3(20, 10, 0)
    ]);
    addTube(scene, path, 64, 0.6, wireMat);

    const pMesh = new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    pMesh.position.set(0, 10, 0);
    scene.add(pMesh);
}

function initEj5() {
    const setup = setupScene('tp9-ej5-3d', 40);
    if (!setup) return;
    const { scene } = setup;

    addLineTube(scene, [0, -40, 0], [0, 40, 0], 20, 0.5, wireMat);

    for (let r = 5; r <= 20; r += 5) {
        const pts = new THREE.EllipseCurve(0, 0, r, r, 0, 2 * Math.PI, false, 0)
            .getPoints(50).map(p => new THREE.Vector3(p.x, 0, p.y));
        scene.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), bFieldMat));
    }
}

function initEj7() {
    const setup = setupScene('tp9-ej7-3d', 40);
    if (!setup) return;
    const { scene } = setup;

    const pts = [new THREE.Vector3(-10, -20, 0), new THREE.Vector3(-10, 0, 0)];
    for (let i = 0; i <= 20; i++) {
        const t = (i / 20) * Math.PI * 1.5;
        pts.push(new THREE.Vector3(-10 + 10 * Math.cos(t), 10 * Math.sin(t), 0));
    }
    pts.push(new THREE.Vector3(0, -10, 0), new THREE.Vector3(0, -20, 0));

    addTube(scene, new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1), 100, 0.6, wireMat);
}

function initEj10() {
    const setup = setupScene('tp9-ej10-3d', 30);
    if (!setup) return;
    const { scene } = setup;

    const coreMesh = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 40, 32), wireMat);
    coreMesh.rotation.x = Math.PI / 2;
    scene.add(coreMesh);

    const shieldMat = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa, metalness: 0.8, roughness: 0.2,
        side: THREE.DoubleSide, transparent: true, opacity: 0.4
    });
    const shieldMesh = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 40, 32, 1, true), shieldMat);
    shieldMesh.rotation.x = Math.PI / 2;
    scene.add(shieldMesh);
}

function initEj15() {
    const setup = setupScene('tp9-ej15-3d', 40);
    if (!setup) return;
    const { scene } = setup;

    addLineTube(scene, [-30, 10, 0], [30, 10, 0], 20, 0.8, wireMat);
    addLineTube(scene, [-30, -10, 0], [30, -10, 0], 20, 0.8, wireMatBlue);

    scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -9, 0), 6, 0xff0000, 2, 2));
    scene.add(new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, -11, 0), 6, 0x00ff00, 2, 2));
}