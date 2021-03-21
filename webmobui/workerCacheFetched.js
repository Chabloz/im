const CACHE_VERSION = '1';
const CACHE_FILES = [

];

self.addEventListener('install', event => {
  self.skipWaiting();
  const preCache = async () => {
    const cache = await caches.open(CACHE_VERSION);
    return cache.addAll(CACHE_FILES);
  };
  event.waitUntil(preCache());
});

self.addEventListener('fetch', event => {
  const fetchCacheFirst = async () => {
    const cache = await caches.open(CACHE_VERSION);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    let response = await fetch(event.request);
    if (response) cache.put(event.request, response.clone());
    return response;
  };
  event.respondWith(fetchCacheFirst());
});

self.addEventListener('activate', event => {
  const clearOldCache = async () => {
    let keys = await caches.keys();
    keys = keys.filter(key => key !== CACHE_VERSION);
    return Promise.all(keys.map(key => caches.delete(key)));
  }
  event.waitUntil(clearOldCache());
});
