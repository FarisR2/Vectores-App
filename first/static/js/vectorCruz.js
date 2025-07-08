document.addEventListener("DOMContentLoaded", () => {

    const modalCruzado = document.getElementById('modalCruzado');
    document.getElementById('abrirCruzado').onclick = () => modalCruzado.style.display = 'block';

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const info = document.getElementById('info');

    const A = { x: 150, y: 300 };
    const B = { x: 350, y: 300 };
    let C = { x: 250, y: 100 };

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        C.x = e.clientX - rect.left;
        C.y = e.clientY - rect.top;
        draw();
    });

    function crossProduct2D(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.lineTo(C.x, C.y);
        ctx.closePath();
        ctx.stroke();

        const AB = { x: B.x - A.x, y: B.y - A.y };
        const AC = { x: C.x - A.x, y: C.y - A.y };
        const crossZ = crossProduct2D(AB, AC);
        const normal = (crossZ >= 0) ? '↗️ fuera de la pantalla (Z+)' : '↙️ dentro de la pantalla (Z−)';

        info.innerHTML = `
        <p>Producto cruzado (Z): <strong>${crossZ.toFixed(2)}</strong></p>
        <p>Dirección de la normal: <strong>${normal}</strong></p>
      `;

        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.stroke();

        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(C.x, C.y);
        ctx.stroke();

        [A, B, C].forEach(p => {
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.fillStyle = 'black';
        ctx.fillText('A', A.x - 15, A.y);
        ctx.fillText('B', B.x + 10, B.y);
        ctx.fillText('C', C.x + 5, C.y);
    }

    draw();
})