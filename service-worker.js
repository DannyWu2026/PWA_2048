const CACHE_NAME = "2048-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./style/main.css",
  "./style/fonts/clear-sans.css",
  "./style/fonts/ClearSans-Bold-webfont.eot",
  "./style/fonts/ClearSans-Bold-webfont.svg",
  "./style/fonts/ClearSans-Bold-webfont.woff",
  "./style/fonts/ClearSans-Light-webfont.eot",
  "./style/fonts/ClearSans-Light-webfont.svg",
  "./style/fonts/ClearSans-Light-webfont.woff",
  "./style/fonts/ClearSans-Regular-webfont.eot",
  "./style/fonts/ClearSans-Regular-webfont.svg",
  "./style/fonts/ClearSans-Regular-webfont.woff",
  "./js/animframe_polyfill.js",
  "./js/application.js",
  "./js/bind_polyfill.js",
  "./js/classlist_polyfill.js",
  "./js/game_manager.js",
  "./js/grid.js",
  "./js/html_actuator.js",
  "./js/keyboard_input_manager.js",
  "./js/local_storage_manager.js",
  "./js/tile.js",
  "./meta/icon-192.png",
  "./meta/icon-512.png",
  "./meta/icon-maskable-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (cacheName) {
        if (cacheName !== CACHE_NAME) {
          return caches.delete(cacheName);
        }
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});
