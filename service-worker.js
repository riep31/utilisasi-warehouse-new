// ========================================
// PWA SERVICE WORKER - SPA VERSION
// ========================================

const CACHE_NAME = 'utilisasi-warehouse-v1.1.0';

// Assets yang wajib di-cache untuk struktur SPA
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './js/services/api.js',
  './js/services/export.js',
  // Views (Potongan HTML)
  './views/dashboard.html',
  './views/rawmaterial.html',
  './views/finishgoods.html',
  './views/kapasitas.html',
  './views/cardstock.html',
  './views/mapping.html',
  './views/floor.html',
  './views/rencana.html',
  './views/salahmuat.html',
  // Pages (Logika JS)
  './js/pages/dashboard.js',
  './js/pages/rawmaterial.js',
  './js/pages/finishgoods.js',
  './js/pages/kapasitas.js',
  './js/pages/cardstock.js',
  './js/pages/mapping.js',
  './js/pages/floor.js',
  './js/pages/rencana.js',
  './js/pages/salahmuat.js',
  // Icons
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // STRATEGI: Google Sheets API - Selalu ambil dari Network (No Cache)
  if (url.hostname === 'sheets.googleapis.com') {
    event.respondWith(fetch(event.request));
    return;
  }

  // STRATEGI: Stale-While-Revalidate untuk file statis lokal
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
          // Jika offline dan tidak ada di cache, arahkan ke offline fallback jika perlu
      });
      return cachedResponse || fetchPromise;
    })
  );
});
