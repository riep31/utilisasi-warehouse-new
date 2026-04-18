export const CONFIG = {
    SPREADSHEET_ID: '1ngP7PTE4mNKtkcTQU5sRYswdYmdC401M4ioxxkt-Hxw',
   
};

export async function fetchSheetData(range) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SPREADSHEET_ID}/values/${range}?key=${CONFIG.API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Gagal mengambil data');
        const data = await response.json();
        return data.values || [];
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}
