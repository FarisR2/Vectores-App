        document.addEventListener("DOMContentLoaded", () => {
            const modal3D = document.getElementById("modal3D");
            const openBtn3D = document.getElementById("openModal3D");
            const closeBtn3D = document.getElementById("close3D");
            const form3D = document.getElementById("vectorForm3D");

            openBtn3D.onclick = () => modal3D.style.display = "block";
            closeBtn3D.onclick = () => modal3D.style.display = "none";
            window.onclick = (e) => { if (e.target == modal3D) modal3D.style.display = "none"; };

            form3D.onsubmit = (e) => {
                e.preventDefault();
                const x = parseFloat(document.getElementById("x3").value);
                const y = parseFloat(document.getElementById("y3").value);
                const z = parseFloat(document.getElementById("z3").value);

                const data = [{
                    type: 'scatter3d',
                    mode: 'lines+markers',
                    x: [0, x],
                    y: [0, y],
                    z: [0, z],
                    line: { width: 6, color: 'blue' },
                    marker: { size: 4 }
                }];

                const layout = {
                    margin: { l: 0, r: 0, b: 0, t: 0 },
                    scene: {
                        xaxis: { range: [-10, 10] },
                        yaxis: { range: [-10, 10] },
                        zaxis: { range: [-10, 10] }
                    }
                };

                Plotly.newPlot('vectorChart3D', data, layout);
            };
        });