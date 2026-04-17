const CACHE_NAME = 'utilisasi-wh-spa-v1.1';

// Daftar semua file yang wajib ada untuk offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './js/services/api.js',
  './js/services/export.js',
  // Potongan HTML (Views)
  './views/dashboard.html',
  './views/rawmaterial.html',
  './views/finishgoods.html',
  './views/kapasitas.html',
  './views/cardstock.html',
  './views/mapping.html',
  './views/floor.html',
  './views/rencana.html',
  './views/salahmuat.html',
  // Logika JS (Pages)
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
  // JANGAN cache data dari Google Sheets (API) agar data selalu update
  if (event.request.url.includes('googleapis.com')) {
    return event.respondWith(fetch(event.request));
  }

  // Untuk file statis, gunakan Cache First, lalu update di background (Stale-while-revalidate)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});