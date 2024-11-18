self.addEventListener("install", async () => {
    const cache = await caches.open("swdemo_2");
    // cache.add("/");
    // cache.add("assets/dark_mode_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png");
    // cache.add("assets/light_mode_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png");
    // cache.add("assets/correct-6033.mp3");
    // cache.add("assets/error-2-36058.mp3");
    // cache.add("assets/FacultyGlyphic-Regular.ttf");
    // cache.add("./assets/background-removed-image (1).png");
    // cache.add("./assets/cancel.png");
    // cache.add("./assets/check.png");
    // cache.add("assets/maths edit.png");
    // cache.add("assets/maths.png");
    cache.add("./index.html");
    cache.add("./script.js");
    cache.add("./subtract.html");
    cache.add("./multiply.html");
    cache.add("./divide.html");
    cache.add("./style.css");
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      async function() {
      const cache = await caches.open("swdemo_2")
      const match = cache.match(event.request);
  
      if (match) {
        return match;
      }
  
      return fetch(event.request);
    }())
  })