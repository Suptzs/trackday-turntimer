var CACHE_NAME = 'turn-timer-v1';
var urlsToCache = [
    '/',
    '/turntimer.css',
    '/clock.js',
    '/countdown.js',
    '/turntimer.html'
]

self.addEventListener('install', event => {
    console.log("service worker installed");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cacheHit => {
                if (cacheHit) {
                    return cacheHit;
                }

                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || (response.type !== 'basic') && !/fonts.(googleapis|gstatic).com/.test(event.request.url)) {
                            return response;
                        }

                        // Response is a stream and can only be consumed once! Clone it!
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});