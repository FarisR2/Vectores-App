        document.addEventListener('DOMContentLoaded', () => {
            const modalSim = document.getElementById('modalSimulacion');
            const openSimBtn = document.getElementById('openSimulacionBtn');
            const closeSim = document.getElementById('closeSimulacion');

            openSimBtn.onclick = () => modalSim.style.display = 'block';
            closeSim.onclick = () => modalSim.style.display = 'none';

            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');

            const inputX = document.getElementById('inputX');
            const inputY = document.getElementById('inputY');
            const applyBtn = document.getElementById('applyForceBtn');

            const objeto = {
                pos: { x: 100, y: 100 },
                vel: { x: 2, y: 1 },
                acc: { x: 0, y: 0 },
                radius: 20
            };

            function sumarVectores(a, b) {
                return { x: a.x + b.x, y: a.y + b.y };
            }

            function aplicarFuerza(fuerza) {
                objeto.acc = sumarVectores(objeto.acc, fuerza);
            }

            applyBtn.addEventListener('click', () => {
                const fx = parseFloat(inputX.value) || 0;
                const fy = parseFloat(inputY.value) || 0;
                aplicarFuerza({ x: fx, y: fy });
            });

            function update() {
                objeto.vel = sumarVectores(objeto.vel, objeto.acc);
                objeto.pos = sumarVectores(objeto.pos, objeto.vel);
                objeto.acc = { x: 0, y: 0 };

                if (objeto.pos.x < 0 || objeto.pos.x > canvas.width) objeto.vel.x *= -1;
                if (objeto.pos.y < 0 || objeto.pos.y > canvas.height) objeto.vel.y *= -1;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.arc(objeto.pos.x, objeto.pos.y, objeto.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#00ff99';
                ctx.fill();

                requestAnimationFrame(update);
            }

            update();
        });