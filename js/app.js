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
    contentArea.innerHTML = '<div class="loading">Memuat Halaman...</div>';

    try {
        // 1. Fetch HTML Template
        const response = await fetch(route.view);
        const html = await response.text();
        contentArea.innerHTML = html;

        // 2. Load JS Module secara dinamis
        const module = await import(route.script);
        if (module.init) module.init();

        // 3. Update Title
        document.getElementById('page-title').innerText = hash.toUpperCase();
    } catch (error) {
        console.error("Router Error:", error);
        contentArea.innerHTML = "<h2>Halaman Gagal Dimuat</h2>";
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);