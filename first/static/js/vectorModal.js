document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.querySelector(".close");
    const form = document.getElementById("vectorForm");
    const ctx = document.getElementById("vectorChart").getContext("2d");
    let chart = null;

    openBtn.onclick = () => modal.style.display = "block";
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    form.onsubmit = (e) => {
        e.preventDefault();
        const x = parseFloat(document.getElementById("x").value);
        const y = parseFloat(document.getElementById("y").value);

        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: `Vector (${x}, ${y})`,
                    data: [{ x: 0, y: 0 }, { x, y }],
                    showLine: true,
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                    pointRadius: 4,
                    tension: 0
                }]
            },
            options: {
                scales: {
                    x: { type: 'linear', min: -10, max: 10 },
                    y: { min: -10, max: 10 }
                }
            }
        });
    };
});
