// Archivo: graficos_fourier.js
// Desc: Funciones reutilizables para dibujar sumas parciales de Fourier en Canvas.

const FourierPlots = {
    // Colores para S1 (Azul), S2 (Verde), S3 (Rojo)
    colors: ['#3b82f6', '#10b981', '#ef4444'],

    /**
     * Dibuja una serie de Fourier en un canvas.
     * @param {string} canvasId - El ID del elemento <canvas>
     * @param {number} a0 - Coeficiente a0
     * @param {function} anFunc - Función que retorna el coeficiente a_n dado n
     * @param {function} bnFunc - Función que retorna el coeficiente b_n dado n
     * @param {number[]} nTermsList - Array con la cantidad de términos para S1, S2, S3 (ej: [1, 3, 5])
     * @param {number} xMin - Valor mínimo de X (matemático)
     * @param {number} xMax - Valor máximo de X (matemático)
     * @param {number} yMin - Valor mínimo de Y (para escalar el gráfico)
     * @param {number} yMax - Valor máximo de Y (para escalar el gráfico)
     * @param {number} L - Semiperíodo de la función (por defecto 1)
     */
    plotSeries: function(canvasId, a0, anFunc, bnFunc, nTermsList, xMin, xMax, yMin, yMax, L = 1) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return; // Si no existe el canvas en la página actual, ignora.

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // Limpiar fondo
        ctx.clearRect(0, 0, width, height);
        
        // Dibujar Ejes X e Y
        ctx.strokeStyle = '#cbd5e1'; 
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        // Mapeo del origen Y (0 matemático) al canvas
        const originY = height - ((0 - yMin) / (yMax - yMin)) * height;
        // Mapeo del origen X (0 matemático) al canvas
        const originX = ((0 - xMin) / (xMax - xMin)) * width;

        // Trazar Eje X
        if (originY >= 0 && originY <= height) {
            ctx.moveTo(0, originY); 
            ctx.lineTo(width, originY);
        }
        // Trazar Eje Y
        if (originX >= 0 && originX <= width) {
            ctx.moveTo(originX, 0); 
            ctx.lineTo(originX, height);
        }
        ctx.stroke();

        // Calcular la frecuencia base
        const w0 = Math.PI / L;

        // Graficar cada suma parcial especificada en nTermsList
        nTermsList.forEach((maxN, index) => {
            ctx.beginPath();
            ctx.strokeStyle = this.colors[index % this.colors.length];
            ctx.lineWidth = 1.5;
            
            for (let px = 0; px < width; px++) {
                // Mapear píxel al valor X matemático
                let x = xMin + (px / width) * (xMax - xMin); 
                let y = a0 / 2;
                
                // Calcular la sumatoria
                for (let n = 1; n <= maxN; n++) {
                    let an = anFunc(n);
                    let bn = bnFunc(n);
                    y += an * Math.cos(n * w0 * x) + bn * Math.sin(n * w0 * x);
                }
                
                // Mapear el valor Y matemático al píxel Y
                let py = height - ((y - yMin) / (yMax - yMin)) * height;
                
                if (px === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        });
    },

    // Inicializador específico para el TP1 de Análisis Numérico
    initTP1: function() {
        // a) Onda Cuadrada: términos impares (1, 3, 5)
        this.plotSeries('canvas-f-a', 0, (n)=>0, (n)=> (2/(n*Math.PI))*(1 - Math.pow(-1, n)), [1, 3, 5], -2, 2, -2, 2);
        
        // b) Pulso: términos impares (1, 3, 5)
        this.plotSeries('canvas-f-b', 1, (n)=> (2/(n*Math.PI))*Math.sin(n*Math.PI/2), (n)=>0, [1, 3, 5], -2, 2, -0.5, 1.5);
        
        // c) f(x)=x: términos (1, 2, 3)
        this.plotSeries('canvas-f-c', 0, (n)=>0, (n)=> 2*Math.pow(-1, n+1)/(n*Math.PI), [1, 2, 3], -2, 2, -1.5, 1.5);
        
        // d) f(x)=x-1: términos (1, 2, 3)
        this.plotSeries('canvas-f-d', -2, (n)=>0, (n)=> 2*Math.pow(-1, n+1)/(n*Math.PI), [1, 2, 3], -2, 2, -2.5, 0.5);
        
        // e) f(x)=|x|: términos impares (1, 3, 5)
        this.plotSeries('canvas-f-e', 1, (n)=> (2/Math.pow(n*Math.PI, 2))*(Math.pow(-1, n) - 1), (n)=>0, [1, 3, 5], -2, 2, -0.2, 1.2);
        
        // f) f(x)=x^2: términos (1, 2, 3)
        this.plotSeries('canvas-f-f', 2/3, (n)=> 4*Math.pow(-1, n)/Math.pow(n*Math.PI, 2), (n)=>0, [1, 2, 3], -2, 2, -0.2, 1.2);
        
        // g) f(x)=3x-2x^2: términos (1, 2, 3)
        this.plotSeries('canvas-f-g', -4/3, (n)=> -8*Math.pow(-1, n)/Math.pow(n*Math.PI, 2), (n)=> 6*Math.pow(-1, n+1)/(n*Math.PI), [1, 2, 3], -2, 2, -5, 2);
    }
};

// Se ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página del TP1 (verifica que exista un canvas de ese TP)
    if (document.getElementById('canvas-f-a')) {
        FourierPlots.initTP1();
    }
});