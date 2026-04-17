import { fetchSheetData } from '../services/api.js';

export async function init() {
    const data = await fetchSheetData('SalahMuat!A2:D50');
    const tbody = document.querySelector('#tableSalahMuat tbody');

    tbody.innerHTML = data.map(r => `
        <tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>
    `).join('');

    document.getElementById('btnAddReport').onclick = () => {
        window.open('https://docs.google.com/forms/d/YOUR_FORM_ID', '_blank');
    };
}