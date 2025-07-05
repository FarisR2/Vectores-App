document.addEventListener('DOMContentLoaded', () => {
    const modal3D = document.getElementById('modal3D');
    const openBtn3D = document.getElementById('openModal3D');
    const closeBtn3D = document.getElementById('close3D');
    const resultado2 = document.getElementById('resultado2');
    const form3D = document.getElementById('operationForm3D');

    openBtn3D.onclick = () => modal3D.style.display = 'block';
    closeBtn3D.onclick = () => modal3D.style.display = 'none';

    const operaciones3D = {
        suma: (a, b) => a + b,
        resta: (a, b) => a - b,
        multiplicacion: (a, b) => a * b,
    };

    form3D.onsubmit = (e) => {
        e.preventDefault();

        const x1 = parseFloat(document.getElementById('x1_3d').value);
        const y1 = parseFloat(document.getElementById('y1_3d').value);
        const z1 = parseFloat(document.getElementById('z1_3d').value);

        const x2 = parseFloat(document.getElementById('x2_3d').value);
        const y2 = parseFloat(document.getElementById('y2_3d').value);
        const z2 = parseFloat(document.getElementById('z2_3d').value);

        const operation = document.getElementById('operation_3d').value;
        const oper = operaciones3D[operation];

        if (!oper || [x1, y1, z1, x2, y2, z2].some(isNaN)) {
            alert('Por favor, ingrese todos los valores correctamente.');
            return;
        }

        try {
            let resultado;

            if (operation === 'multiplicacion') {
                resultado = x1 * x2 + y1 * y2 + z1 * z2;
                resultado2.innerHTML = `<p>Producto escalar: ${resultado.toFixed(2)}</p>`;
            } else {
                const resultadoX = oper(x1, x2);
                const resultadoY = oper(y1, y2);
                const resultadoZ = oper(z1, z2);

                resultado2.innerHTML = `
            <p>Resultado en \( \\mathbb{R}^3 \): (${resultadoX.toFixed(2)}, ${resultadoY.toFixed(2)}, ${resultadoZ.toFixed(2)})</p>
        `;
            }

            if (window.MathJax) MathJax.typeset();
        } catch (err) {
            alert(err.message);
        }

    };
});
