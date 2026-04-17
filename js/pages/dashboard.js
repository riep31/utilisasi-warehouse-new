import { fetchSheetData } from '../services/api.js';

export async function init() {
    const data = await fetchSheetData('Dashboard!A2:B10');
    const ctx = document.getElementById('dashboardChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(r => r[0]),
            datasets: [{
                label: 'Utilisasi %',
                data: data.map(r => r[1]),
                backgroundColor: '#3498db'
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    document.getElementById('total-sku').innerText = data.length;
}