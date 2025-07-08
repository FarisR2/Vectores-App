document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvasFiltro');
    const ctx = canvas.getContext('2d');
    const filterDiv = document.getElementById('filterInputs');
    const btnAplicar = document.getElementById('btnAplicarFiltro');

    const imageMatrix = [
        [100, 100, 100, 100, 100],
        [100, 150, 150, 150, 100],
        [100, 150, 255, 150, 100],
        [100, 150, 150, 150, 100],
        [100, 100, 100, 100, 100],
    ];

    // Inicializar filtro por defecto (Prewitt vertical)
    const defaultFilter = [
        [-1, 0, 1],
        [-1, 0, 1],
        [-1, 0, 1],
    ];

    function crearInputsFiltro() {
        filterDiv.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = defaultFilter[Math.floor(i / 3)][i % 3];
            input.step = "any";
            filterDiv.appendChild(input);
        }
    }

    function getFiltro() {
        const inputs = filterDiv.querySelectorAll('input');
        const filtro = [];
        for (let i = 0; i < 3; i++) {
            filtro[i] = [];
            for (let j = 0; j < 3; j++) {
                filtro[i][j] = parseFloat(inputs[i * 3 + j].value);
            }
        }
        return filtro;
    }

    function drawImage(matrix) {
        const cellSize = 40;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                const gray = matrix[i][j];
                ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }

    function aplicarFiltro() {
        const filtro = getFiltro();
        const resultado = [];

        for (let i = 1; i < imageMatrix.length - 1; i++) {
            const fila = [];
            for (let j = 1; j < imageMatrix[0].length - 1; j++) {
                let suma = 0;
                for (let fi = -1; fi <= 1; fi++) {
                    for (let fj = -1; fj <= 1; fj++) {
                        const valor = imageMatrix[i + fi][j + fj];
                        const coef = filtro[fi + 1][fj + 1];
                        suma += valor * coef;
                    }
                }
                fila.push(Math.min(255, Math.max(0, Math.round(suma))));
            }
            resultado.push(fila);
        }

        const finalImage = Array(5).fill().map(() => Array(5).fill(0));
        for (let i = 0; i < resultado.length; i++) {
            for (let j = 0; j < resultado[0].length; j++) {
                finalImage[i + 1][j + 1] = resultado[i][j];
            }
        }

        drawImage(finalImage);
    }

    btnAplicar.addEventListener('click', aplicarFiltro);

    crearInputsFiltro();
    drawImage(imageMatrix);
});
