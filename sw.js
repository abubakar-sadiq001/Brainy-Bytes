// self.addEventListener("install", async () => {
//     const cache = await caches.open("swdemo_2");
//     cache.add("./index.html");
//     cache.add("./script.js");
//     cache.add("./subtract.html");
//     cache.add("./multiply.html");
//     cache.add("./divide.html");
//     cache.add("./style.css");
//   });
  
//   self.addEventListener('fetch', event => {
//     event.respondWith(
//       async function() {
//       const cache = await caches.open("swdemo_2")
//       const match = cache.match(event.request);
  
//       if (match) {
//         return match;
//       }
  
//       return fetch(event.request);
//     }())
//   })