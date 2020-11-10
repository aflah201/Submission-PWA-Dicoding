importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

if (workbox) {

    console.log(`Workbox Berhasil Di Muat`);
    workbox.precaching.precacheAndRoute([
        {url: '/', revision: '1'},
        {url: '/index.html', revision: '1'},
        {url: '/detailTim.html', revision: '1'},
        {url: '/nav.html', revision: '1'},
        {url: '/manifest.json', revision: '1'},
        {url: '/css/materialize.css', revision: '1'},
        {url: '/css/materialize.min.css', revision: '1'},
        {url: '/css/style.css', revision: '1'},
        {url: '/js/api.js', revision: '1'},
        {url: '/js/db.js', revision: '1'},
        {url: '/js/idb.js', revision: '1'},
        {url: '/js/materialize.js', revision: '1'},
        {url: '/js/materialize.min.js', revision: '1'},
        {url: '/js/nav.js', revision: '1'},
        {url: '/js/push.js', revision: '1'},
        {url: '/js/regis-sw-index.js', revision: '1'},
        {url: '/js/regis-sw-detail.js', revision: '1'},
        {url: '/img/icon72.png', revision: '1'},
        {url: '/img/icon96.png', revision: '1'},
        {url: '/img/icon128.png', revision: '1'},
        {url: '/img/icon144.png', revision: '1'},
        {url: '/img/icon192.png', revision: '1'},
        {url: '/img/icon256.png', revision: '1'},
        {url: '/img/icon384.png', revision: '1'},
        {url: '/img/icon512.png', revision: '1'},
        {url: '/img/PP.jpg', revision: '1'},
    ], {
        ignoreUrlParametersMatching: [/.*/],
    });
    
    workbox.routing.registerRoute(
        ({ url }) => url.origin === "https://api.football-data.org",
        workbox.strategies.staleWhileRevalidate({
            cacheName: "dataLiga",
            plugins: [
                new workbox.expiration.Plugin({
                     maxAgeSeconds: 60 * 30
                })
            ]
        }),
    );

    workbox.routing.registerRoute(
        ({ url }) => url.origin,
        workbox.strategies.staleWhileRevalidate({
            cacheName: "cache-football",
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages',
        }),
    );
    
    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 80,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
            ],
        }),
    );
    
    workbox.routing.registerRoute(
        /\.(?:js)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'js',
        })
    );

    // Menyimpan Cache dari CSS Google Font
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );
    
    // Menyimpan cache untuk file Font selama 1 tahun
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.gstatic\.com/,
        workbox.strategies.cacheFirst({
            cacheName: 'google-fonts-webfonts',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200],
                }),
                new workbox.expiration.Plugin({
                    maxAgeSeconds: 60 * 60 * 24 * 365,
                    maxEntries: 30,
                }),
            ],
        }),
    );
    
    workbox.routing.registerRoute(
        new RegExp('https://crests.football-data.org/'),
        workbox.strategies.cacheFirst({
            cacheName: 'liga-img',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 80,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                }),
            ],
        }),
    );
} else {
    console.log(`Workbox gagal dimuat`);
}    

self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'img/icon72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});