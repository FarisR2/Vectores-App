document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.querySelector(".close");
    const resultado = document.getElementById('resultado');
    const operationForm = document.getElementById('operationForm');

    openBtn.onclick = () => modal.style.display = "block";
    closeBtn.onclick = () => modal.style.display = "none";

    const operaciones = {
        'suma': (a, b) => a + b,
        'resta': (a, b) => a - b,
    };

    operationForm.onsubmit = (e) => {
        e.preventDefault();

        const x = parseFloat(document.getElementById("x1").value);
        const y = parseFloat(document.getElementById("y1").value);
        const x2 = parseFloat(document.getElementById("x2").value);
        const y2 = parseFloat(document.getElementById("y2").value);
        const operation = document.getElementById('operation').value;

        if ([x, y, x2, y2].some(isNaN)) {
            resultado.innerHTML = `<p style="color:red;">Por favor, ingrese todos los valores correctamente.</p>`;
            return;
        }

        if (operation === 'multiplicacion') {
            const productoEscalar = x * x2 + y * y2;
            resultado.innerHTML = `<p>Producto escalar: ${productoEscalar.toFixed(2)}</p>`;
        } else {
            const oper = operaciones[operation];
            const resultadoX = oper(x, x2);
            const resultadoY = oper(y, y2);
            resultado.innerHTML = `<p>Resultado: (${resultadoX.toFixed(2)}, ${resultadoY.toFixed(2)})</p>`;
        }
    };
});
