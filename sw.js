const CACHE = 'fatscran-v1';
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
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/fatscran/index.html'))));
});