import { fetchSheetData } from '../services/api.js';

export async function init() {
    const data = await fetchSheetData('Mapping!A2:C200');
    const grid = document.getElementById('rackGrid');

    grid.innerHTML = data.map(r => {
        const status = r[1].toLowerCase() === 'terisi' ? 'slot-filled' : 'slot-empty';
        return `<div class="rack-slot ${status}" onclick="alert('Item: ${r[2] || 'Kosong'}')">${r[0]}</div>`;
    }).join('');
}