const CACHE_NAME = 'fatscran-shell-v1';

const SHELL_FILES = [
  '/',
  '/index.html',
  '/recipes.html',
  '/shopping.html',
  '/planner.html',
  '/profile.html',
  '/recipe.html',
  '/styles.css',
  '/recipes.js',
  '/js/utils.js',
  '/js/auth.js',
  '/js/db.js',
  '/manifest.json',
  '/fatscran-icon.png',
  '/fatscran-icon-small.png',
];

const NETWORK_ONLY_HOSTS = ['supabase.co', 'sentry-cdn.com', 'googleapis.com', 'jsdelivr.net'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Never cache non-GET or requests with a query string
  if (request.method !== 'GET' || url.search) return;

  // Network-only for external APIs and CDNs
  if (NETWORK_ONLY_HOSTS.some(host => url.hostname.includes(host))) return;

  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        // Only cache valid same-origin responses
        if (response.ok && url.origin === self.location.origin) {
          caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
        }
        return response;
      }).catch(() => {
        // Navigation fallback: serve cached shell
        if (request.mode === 'navigate') return caches.match('/');
      });
    })
  );
});
