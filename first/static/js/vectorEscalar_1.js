document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const info = document.getElementById('info');

    const player = { x: 250, y: 200 };
    const viewDir = { x: 1, y: 0 };
    const cosAngleThreshold = Math.cos(Math.PI / 4);
    let enemy = { x: 300, y: 200 };

    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        enemy.x = e.clientX - rect.left;
        enemy.y = e.clientY - rect.top;
        drawScene();
    });

    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(player.x, player.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(player.x + viewDir.x * 50, player.y + viewDir.y * 50);
        ctx.stroke();

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, 10, 0, Math.PI * 2);
        ctx.fill();

        const toEnemy = {
            x: enemy.x - player.x,
            y: enemy.y - player.y
        };
        const mag1 = Math.hypot(viewDir.x, viewDir.y);
        const mag2 = Math.hypot(toEnemy.x, toEnemy.y);
        const unitView = { x: viewDir.x / mag1, y: viewDir.y / mag1 };
        const unitToEnemy = { x: toEnemy.x / mag2, y: toEnemy.y / mag2 };
        const dot = unitView.x * unitToEnemy.x + unitView.y * unitToEnemy.y;
        const isVisible = dot >= cosAngleThreshold;

        ctx.strokeStyle = 'gray';
        ctx.beginPath();
        ctx.moveTo(player.x, player.y);
        ctx.lineTo(enemy.x, enemy.y);
        ctx.stroke();

        info.innerHTML = `
        <p>Producto escalar: <strong>${dot.toFixed(4)}</strong></p>
        <p>¿Está en el campo de visión? <strong style="color:${isVisible ? 'green' : 'red'}">${isVisible ? 'SÍ' : 'NO'}</strong></p>
      `;
    }

    drawScene();
})