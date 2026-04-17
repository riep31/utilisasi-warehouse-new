import { fetchSheetData } from '../services/api.js';

export async function init() {
    const data = await fetchSheetData('Floor!A2:C100');
    const grid = document.getElementById('floorGrid');

    grid.innerHTML = data.map(r => `
        <div class="rack-slot ${r[1] === 'Full' ? 'slot-filled' : 'slot-empty'}">${r[0]}</div>
    `).join('');
}