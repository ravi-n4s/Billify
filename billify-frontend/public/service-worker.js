const CACHE_NAME = "simple-cache-v1";
const urlsToCache = [];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached response if it exists
      if (response) {
        return response;
      }

      // If there is no cached response, try fetching from the network
      return fetch(event.request)
        .then((networkResponse) => {
          // If the network request is successful, cache the response
          if (networkResponse.ok) {
            const cacheCopy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, cacheCopy);
            });
          }

          // Return the network response
          return networkResponse;
        })
        .catch(() => {
          // If both cache and network fail, respond with the offline page
          return caches.match("/offline.html");
        });
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
