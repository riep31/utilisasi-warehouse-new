import { fetchSheetData } from '../services/api.js';
import { exportToExcel } from '../services/export.js';

export async function init() {
    const data = await fetchSheetData('RawMaterial!A2:E500');
    const tbody = document.querySelector('#tableRM tbody');
    
    const render = (rows) => {
        tbody.innerHTML = rows.map(r => `
            <tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>
        `).join('');
    };

    render(data);
    document.getElementById('searchRM').oninput = (e) => {
        const filtered = data.filter(r => r.join('').toLowerCase().includes(e.target.value.toLowerCase()));
        render(filtered);
    };
    document.getElementById('btnExportRM').onclick = () => exportToExcel('tableRM', 'RawMaterial.xlsx');
}