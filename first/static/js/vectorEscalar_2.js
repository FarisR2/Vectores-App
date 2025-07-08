document.addEventListener('DOMContentLoaded', () => {
    const modalGustos = document.getElementById('modalGustos');
    const modalVision = document.getElementById('modalVision');

    document.getElementById('abrirGustos').onclick = () => modalGustos.style.display = 'block';
    document.getElementById('abrirVision').onclick = () => modalVision.style.display = 'block';

    document.getElementById('formGustos').onsubmit = function (e) {
        e.preventDefault();
        const a1 = parseFloat(document.getElementById('a1').value);
        const a2 = parseFloat(document.getElementById('a2').value);
        const a3 = parseFloat(document.getElementById('a3').value);
        const b1 = parseFloat(document.getElementById('b1').value);
        const b2 = parseFloat(document.getElementById('b2').value);
        const b3 = parseFloat(document.getElementById('b3').value);

        const productoEscalar = a1 * b1 + a2 * b2 + a3 * b3;

        document.getElementById('resultadoGustos').innerHTML = `<strong>Producto escalar:</strong> ${productoEscalar}`;
    }

})