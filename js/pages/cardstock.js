import { fetchSheetData } from '../services/api.js';
import { exportToPDF } from '../services/export.js';

export async function init() {
    const allData = await fetchSheetData('CardStock!A2:F1000');
    const select = document.getElementById('materialSelect');
    
    const items = [...new Set(allData.map(r => r[0]))];
    select.innerHTML = items.map(i => `<option value="${i}">${i}</option>`).join('');

    select.onchange = () => {
        const filtered = allData.filter(r => r[0] === select.value);
        document.getElementById('material-name').innerText = select.value;
        document.querySelector('#tableCard tbody').innerHTML = filtered.map(r => `
            <tr><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>
        `).join('');
    };
    
    document.getElementById('btnPDFCard').onclick = () => exportToPDF('pdf-area', `CardStock-${select.value}.pdf`);
}