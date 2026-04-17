export function exportToPDF(elementId, filename = 'Laporan.pdf') {
    const element = document.getElementById(elementId);
    const opt = {
        margin: 10,
        filename: filename,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save();
}

export function exportToExcel(tableId, filename = 'Laporan.xlsx') {
    const table = document.getElementById(tableId);
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, filename);
}