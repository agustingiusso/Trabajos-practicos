(function() {
    let pmContainer, pmScene, pmCamera, pmRenderer, pmParallelepiped, pmControls, pmAxesHelper;
    let pmPoints = [], pmLabels = [], pmVectors = [];

    const VECTOR_COLORS = { a: 0xff0000, b: 0x00cc00, c: 0x0000ff };
    const sharedPointGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const sharedPointMat = new THREE.MeshBasicMaterial({ color: 0x333333 });

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

    document.addEventListener('DOMContentLoaded', () => {
        pmContainer = document.getElementById('producto-mixto-canvas-container');
        if (!pmContainer) return;

        try {
            initPM(pmContainer);
            animatePM();
            setupPMThemeObserver();

            const updateButton = document.getElementById('pm-update-vectors');
            if (updateButton) {
                updateButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    updatePMParallelepiped();
                });
            }

            setTimeout(onWindowResizePM, 500);
        } catch (e) {
            console.error("Error iniciando Producto Mixto 3D:", e);
        }
    });

    function initPM(container) {
        let width = container.clientWidth || 600;
        let height = container.clientHeight;

        if (height === 0) {
            height = 400;
            container.style.height = '400px';
        }

        pmScene = new THREE.Scene();
        updatePMSceneBackground();

        pmCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        pmCamera.position.set(8, 8, 12);
        pmCamera.lookAt(0, 0, 0);

        pmRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        pmRenderer.setSize(width, height);
        pmRenderer.setPixelRatio(window.devicePixelRatio);

        container.innerHTML = '';
        container.appendChild(pmRenderer.domElement);

        pmControls = new THREE.OrbitControls(pmCamera, pmRenderer.domElement);
        pmControls.enableDamping = true;
        pmControls.dampingFactor = 0.05;

        pmScene.add(new THREE.AmbientLight(0x606060));
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.9);
        mainLight.position.set(5, 10, 7);
        pmScene.add(mainLight);

        pmAxesHelper = new THREE.AxesHelper(10);
        pmScene.add(pmAxesHelper);
        updatePMAxesColor();

        updatePMParallelepiped();
        window.addEventListener('resize', onWindowResizePM);
    }

    function onWindowResizePM() {
        if (!pmContainer || !pmCamera || !pmRenderer) return;
        const width = pmContainer.clientWidth;
        const height = pmContainer.clientHeight || 400;

        pmCamera.aspect = width / height;
        pmCamera.updateProjectionMatrix();
        pmRenderer.setSize(width, height);
    }

    function setupPMThemeObserver() {
        new MutationObserver((mutations) => {
            if (mutations.some(m => m.attributeName === 'data-theme')) {
                updatePMSceneBackground();
                updatePMAxesColor();
                updatePMParallelepiped();
            }
        }).observe(document.documentElement, { attributes: true });
    }

    function updatePMSceneBackground() {
        if (pmScene) pmScene.background = new THREE.Color(isDark() ? 0x1a1a1a : 0xf4f7f6);
    }

    function updatePMAxesColor() {
        if (pmAxesHelper) pmAxesHelper.material.color.set(isDark() ? 0x666666 : 0xaaaaaa);
    }

    function updatePMParallelepiped() {
        try {
            const getVal = (id) => parseFloat(document.getElementById(id)?.value) || 0;

            const a = new THREE.Vector3(getVal('pm-a-x'), getVal('pm-a-y'), getVal('pm-a-z'));
            const b = new THREE.Vector3(getVal('pm-b-x'), getVal('pm-b-y'), getVal('pm-b-z'));
            const c = new THREE.Vector3(getVal('pm-c-x'), getVal('pm-c-y'), getVal('pm-c-z'));

            const cross = new THREE.Vector3().crossVectors(b, c);
            const dot = a.dot(cross);
            const volume = Math.abs(dot);

            const resultBox = document.getElementById('pm-volume-result');
            if (resultBox) {
                resultBox.innerHTML = `$$ \\text{Volumen: } | \\vec{a} \\cdot (\\vec{b} \\times \\vec{c}) | = ${volume.toFixed(2)} $$`;
                window.MathJax?.typesetPromise?.([resultBox]).catch(err => console.log(err));
            }

            showPMCalculationSteps(a, b, c, cross, dot);

            clearPMObjects();
            createPMParallelepiped(a, b, c);

            const origin = new THREE.Vector3(0, 0, 0);
            drawPMVector(origin, a, VECTOR_COLORS.a);
            drawPMVector(origin, b, VECTOR_COLORS.b);
            drawPMVector(origin, c, VECTOR_COLORS.c);
        } catch (error) {
            console.warn("Esperando inputs para calcular...", error);
        }
    }

    function clearPMObjects() {
        if (pmParallelepiped) {
            pmParallelepiped.geometry.dispose();
            if (Array.isArray(pmParallelepiped.material)) {
                pmParallelepiped.material.forEach(m => m.dispose());
            } else {
                pmParallelepiped.material.dispose();
            }
            pmScene.remove(pmParallelepiped);
        }

        pmPoints.forEach(p => pmScene.remove(p));
        pmLabels.forEach(l => pmScene.remove(l));
        pmVectors.forEach(v => pmScene.remove(v));

        pmPoints = [];
        pmLabels = [];
        pmVectors = [];
    }

    function createPMParallelepiped(a, b, c) {
        const vertices = [
            new THREE.Vector3(0, 0, 0),
            a.clone(), b.clone(), c.clone(),
            a.clone().add(b), a.clone().add(c), b.clone().add(c),
            a.clone().add(b).add(c)
        ];

        const positions = [];
        vertices.forEach((v) => {
            const point = new THREE.Mesh(sharedPointGeo, sharedPointMat);
            point.position.copy(v);
            pmScene.add(point);
            pmPoints.push(point);
            positions.push(v.x, v.y, v.z);
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setIndex([
            0, 2, 1, 1, 2, 4, 0, 3, 2, 2, 3, 6,
            0, 1, 3, 3, 1, 5, 7, 5, 6, 7, 4, 5,
            7, 6, 4, 4, 6, 2, 7, 1, 4, 7, 5, 1
        ]);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhongMaterial({
            color: isDark() ? 0x1E90FF : 0x00BFFF,
            transparent: true, opacity: 0.4, side: THREE.DoubleSide,
            shininess: 70
        });

        pmParallelepiped = new THREE.Mesh(geometry, material);

        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x0047ab, transparent: true, opacity: 0.5 }));
        pmParallelepiped.add(line);

        pmScene.add(pmParallelepiped);
    }

    function drawPMVector(origin, vector, color) {
        const len = vector.length();
        if (len < 0.001) return;
        const arrowHelper = new THREE.ArrowHelper(vector.clone().normalize(), origin, len, color, 0.3, 0.2);
        pmScene.add(arrowHelper);
        pmVectors.push(arrowHelper);
    }

    function showPMCalculationSteps(a, b, c, cross, dot) {
        const stepsDiv = document.getElementById('pm-calculation-steps');
        if (!stepsDiv) return;

        const steps = [
            {
                t: "Paso 1: Vectores",
                c: `$$ \\vec{a}=(${a.x},${a.y},${a.z}) $$ $$ \\vec{b}=(${b.x},${b.y},${b.z}) $$ $$ \\vec{c}=(${c.x},${c.y},${c.z}) $$`
            },
            {
                t: "Paso 2: Producto Vectorial",
                c: `$$ \\vec{b} \\times \\vec{c} = (${cross.x.toFixed(1)}, ${cross.y.toFixed(1)}, ${cross.z.toFixed(1)}) $$`
            },
            {
                t: "Paso 3: Producto Escalar",
                c: `$$ \\vec{a} \\cdot (\\vec{b} \\times \\vec{c}) = ${dot.toFixed(1)} $$`
            },
            {
                t: "Paso 4: Módulo",
                c: `$$ \\text{Volumen} = |${dot.toFixed(1)}| = ${Math.abs(dot).toFixed(1)} $$`
            }
        ];

        stepsDiv.innerHTML = steps.map(step =>
            `<div class="producto-mixto-step"><div class="producto-mixto-step-title">${step.t}</div><div class="producto-mixto-math">${step.c}</div></div>`
        ).join('');

        window.MathJax?.typesetPromise?.([stepsDiv]).catch(err => console.log(err));
    }

    function animatePM() {
        requestAnimationFrame(animatePM);
        pmControls?.update();
        if (pmRenderer && pmScene && pmCamera) pmRenderer.render(pmScene, pmCamera);
    }
})();