const CACHE_NAME = "swdemo_3";
const ASSETS_TO_CACHE = [
  "/",
  "./index.html",
  "./script.js",
  "./subtract.html",
  "./multiply.html",
  "./divide.html",
  "./style.css",
  "/assets/background-removed-image (1).png",
  "/assets/correct-6033.mp3",
  "/assets/error-2-36058.mp3",
];

// Install event: Cache resources
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch(err => console.error("Error caching assets during install:", err))
  );
  console.log("Service Worker Installed");
});

// Fetch event: Serve cached resources or fetch from network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse; // Return cached resource
        }
        return fetch(event.request) // Fetch from network if not cached
          .then(networkResponse => {
            // Optionally update cache with new resources
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
      })
      .catch(err => console.error("Fetch failed:", err))
  );
});

// Optional: Activate event to clean old caches
self.addEventListener("activate", event => {
  const allowedCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!allowedCaches.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});






// The first worker
// self.addEventListener("install", async () => {
//     const cache = await caches.open("swdemo_3");
//     cache.add("/")
//     cache.add("./index.html")
//     cache.add("./script.js")
//     cache.add("./subtract.html")
//     cache.add("./multiply.html")
//     cache.add("./divide.html")
//     cache.add("./style.css")
//     cache.add("/assets/background-removed-image (1).png");
//   });
  
//   self.addEventListener('fetch', event => {
//     event.respondWith(
//       async function() {
//       const cache = await caches.open("swdemo_3")
//       const match = cache.match(event.request);
  
//       if (match) {
//         return match;
//       }
  
//       return fetch(event.request);
//     }())
//   })
