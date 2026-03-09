const CACHE_NAME = 'hyperpop-v1';
const STATIC_ASSETS = [
  '/',
  '/assets/css/styles.css',
  '/assets/js/main.js',
  '/assets/js/cursor.js',
  '/assets/js/glitch.js',
  '/assets/js/konami.js',
  '/assets/js/search.js',
  '/assets/js/stats.js',
  '/assets/js/floating-windows.js',
  '/search-index.json',
  '/favicon.svg',
  '/hyperpop-demo.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Fetch event - cache first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              // Cache images and fonts
              if (event.request.url.match(/\.(png|jpg|jpeg|webp|svg|woff|woff2|ttf|eot)$/)) {
                cache.put(event.request, responseToCache);
              }
            });
          
          return response;
        });
      })
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
