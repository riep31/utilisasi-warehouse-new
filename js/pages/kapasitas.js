import { fetchSheetData } from '../services/api.js';

export async function init() {
    const data = await fetchSheetData('Kapasitas!A2:F20');
    const tbody = document.querySelector('#tableKapasitas tbody');
    
    tbody.innerHTML = data.map(r => `
        <tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[5]}%</td></tr>
    `).join('');

    new Chart(document.getElementById('utilChart'), {
        type: 'pie',
        data: {
            labels: data.map(r => r[1]),
            datasets: [{ data: data.map(r => r[5]), backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'] }]
        }
    });
}