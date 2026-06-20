const CACHE = 'fatscran-v3';
const URLS = [
  '/fatscran/',
  '/fatscran/index.html',
  '/fatscran/recipe.html',
  '/fatscran/shopping.html',
  '/fatscran/planner.html',
  '/fatscran/styles.css',
  '/fatscran/recipes.js',
  '/fatscran/fatscran-icon.png',
  '/fatscran/fatscran-icon-small.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const resClone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match('/fatscran/index.html')))
  );
});