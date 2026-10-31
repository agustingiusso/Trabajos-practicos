const FourierPlots = {
    colors: ['#3b82f6', '#10b981', '#ef4444'],

    plotSeries(canvasId, a0, anFunc, bnFunc, nTermsList, xMin, xMax, yMin, yMax, L = 1) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        const xRange = xMax - xMin;
        const yRange = yMax - yMin;
        const xScale = xRange / width;
        const yScale = height / yRange;
        const baseA0 = a0 / 2;
        const w0 = Math.PI / L;

        ctx.clearRect(0, 0, width, height);

        // Dibujar Ejes X e Y
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.beginPath();

        const originY = height + yMin * yScale;
        const originX = (-xMin / xRange) * width;

        if (originY >= 0 && originY <= height) {
            ctx.moveTo(0, originY);
            ctx.lineTo(width, originY);
        }
        if (originX >= 0 && originX <= width) {
            ctx.moveTo(originX, 0);
            ctx.lineTo(originX, height);
        }
        ctx.stroke();

        // Precalcular coeficientes a_n y b_n una sola vez hasta el máximo N requerido
        const maxTotalN = Math.max(...nTermsList);
        const anCache = new Float64Array(maxTotalN + 1);
        const bnCache = new Float64Array(maxTotalN + 1);
        for (let n = 1; n <= maxTotalN; n++) {
            anCache[n] = anFunc(n);
            bnCache[n] = bnFunc(n);
        }

        // Graficar cada suma parcial
        nTermsList.forEach((maxN, index) => {
            ctx.beginPath();
            ctx.strokeStyle = this.colors[index % this.colors.length];
            ctx.lineWidth = 1.5;

            for (let px = 0; px < width; px++) {
                const wx = w0 * (xMin + px * xScale);
                let y = baseA0;

                for (let n = 1; n <= maxN; n++) {
                    const angle = n * wx;
                    y += anCache[n] * Math.cos(angle) + bnCache[n] * Math.sin(angle);
                }

                const py = height - (y - yMin) * yScale;
                if (px === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        });
    },

    initTP1() {
        const alt = (n) => (n % 2 === 0 ? 1 : -1); // Equivalente rápido a (-1)^n
        const zero = () => 0;

        this.plotSeries('canvas-f-a', 0, zero, (n) => (2 / (n * Math.PI)) * (1 - alt(n)), [1, 3, 5], -2, 2, -2, 2);
        this.plotSeries('canvas-f-b', 1, (n) => (2 / (n * Math.PI)) * Math.sin((n * Math.PI) / 2), zero, [1, 3, 5], -2, 2, -0.5, 1.5);
        this.plotSeries('canvas-f-c', 0, zero, (n) => (2 * -alt(n)) / (n * Math.PI), [1, 2, 3], -2, 2, -1.5, 1.5);
        this.plotSeries('canvas-f-d', -2, zero, (n) => (2 * -alt(n)) / (n * Math.PI), [1, 2, 3], -2, 2, -2.5, 0.5);
        this.plotSeries('canvas-f-e', 1, (n) => (2 / (n * Math.PI) ** 2) * (alt(n) - 1), zero, [1, 3, 5], -2, 2, -0.2, 1.2);
        this.plotSeries('canvas-f-f', 2 / 3, (n) => (4 * alt(n)) / (n * Math.PI) ** 2, zero, [1, 2, 3], -2, 2, -0.2, 1.2);
        this.plotSeries('canvas-f-g', -4 / 3, (n) => (-8 * alt(n)) / (n * Math.PI) ** 2, (n) => (6 * -alt(n)) / (n * Math.PI), [1, 2, 3], -2, 2, -5, 2);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('canvas-f-a')) {
        FourierPlots.initTP1();
    }
});