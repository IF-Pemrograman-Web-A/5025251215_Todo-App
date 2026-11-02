const CACHE_NAME = "todo-pwa-v1";
const ASSETS = [
    "/todo/style.css", 
    "/todo/script.js",
    "/todo/offline.html",
    "/todo/icon-192.png",
    "/todo/icon-512.png"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
});

self.addEventListener("fetch", (e) => {
    if (e.request.method !== "GET") return;
    
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                return res;
            })
            .catch(() => {
                return caches.match(e.request).then((cachedResponse) => {
                    if (cachedResponse) return cachedResponse;
                    return caches.match("/todo/offline.html");
                });
            })
    );
});