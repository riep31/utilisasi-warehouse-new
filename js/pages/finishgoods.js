import { fetchSheetData } from '../services/api.js';

export async function init() {
    const data = await fetchSheetData('FinishGoods!A2:D500');
    const tbody = document.querySelector('#tableFG tbody');
    const alertBox = document.getElementById('minusAlert');

    const render = (rows) => {
        let hasMinus = false;
        tbody.innerHTML = rows.map(r => {
            const val = parseFloat(r[2]);
            if (val < 0) hasMinus = true;
            return `<tr class="${val < 0 ? 'row-minus' : ''}">
                <td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${val < 0 ? '?? Minus' : '? OK'}</td>
            </tr>`;
        }).join('');
        alertBox.style.display = hasMinus ? 'block' : 'none';
    };

    render(data);
}