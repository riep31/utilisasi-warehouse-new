// ========================================
// SPA ROUTER - FINAL VERSION
// ========================================

const routes = {
    'dashboard': { view: 'views/dashboard.html', script: './pages/dashboard.js' },
    'rawmaterial': { view: 'views/rawmaterial.html', script: './pages/rawmaterial.js' },
    'finishgoods': { view: 'views/finishgoods.html', script: './pages/finishgoods.js' },
    'cardstock': { view: 'views/cardstock.html', script: './pages/cardstock.js' },
    'kapasitas': { view: 'views/kapasitas.html', script: './pages/kapasitas.js' },
    'mapping': { view: 'views/mapping.html', script: './pages/mapping.js' },
    'floor': { view: 'views/floor.html', script: './pages/floor.js' },
    'rencana': { view: 'views/rencana.html', script: './pages/rencana.js' },
    'salahmuat': { view: 'views/salahmuat.html', script: './pages/salahmuat.js' }
};

async function router() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const route = routes[hash] || routes['dashboard'];

    const contentArea = document.getElementById('app-content');
    const pageTitle = document.getElementById('page-title');

    if (contentArea) {
        contentArea.innerHTML = '<div style="padding:20px;">Memuat Halaman...</div>';
    }

    try {
        // 1. Fetch HTML Template dari folder views
        const response = await fetch(route.view);
        if (!response.ok) throw new Error(`Gagal load view: ${route.view}`);
        
        const html = await response.text();
        contentArea.innerHTML = html;

        // 2. Update Judul Halaman
        if (pageTitle) {
            pageTitle.innerText = hash.toUpperCase().replace(/([A-Z])/g, ' $1').trim();
        }

        // 3. Load JS Module secara dinamis dari folder pages
        const module = await import(route.script);
        if (module && module.init) {
            module.init();
        }
    } catch (error) {
        console.error("Router Error:", error);
        if (contentArea) {
            contentArea.innerHTML = `
                <div style="padding:20px; color:red;">
                    <h3>⚠️ Halaman Gagal Dimuat</h3>
                    <p>${error.message}</p>
                    <small>Pastikan file ${route.view} dan ${route.script} sudah diupload.</small>
                </div>`;
        }
    }
}

// Event Listeners
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    // Cek keamanan sebelum menjalankan router
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    } else {
        router();
    }
});
