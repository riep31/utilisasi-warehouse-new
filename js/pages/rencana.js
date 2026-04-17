import { fetchSheetData } from '../services/api.js';

export async function init() {
    const data = await fetchSheetData('Rencana!A2:F100');
    const tbody = document.querySelector('#tableRencana tbody');

    const render = (rows) => {
        tbody.innerHTML = rows.map(r => `
            <tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[5]}</td></tr>
        `).join('');
    };

    render(data);
    document.getElementById('monthFilter').onchange = (e) => {
        const filtered = data.filter(r => r[0].includes(e.target.value));
        render(filtered);
    };
}