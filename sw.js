const CACHE_NAME = 'klev-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  // Запросы к погоде не кэшируем, они всегда должны быть свежими
  if (e.request.url.includes('api.open-meteo.com')) return;
  
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
