importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1'},
    { url: '/schedule.html', revision: '1'},
    { url: '/team.html', revision: '1'},
    { url: '/manifest.json', revision: '1'},
    { url: '/main.js', revision: '1'},
    { url: '/push.js', revision: '1'},
    { url: '/service-worker.js', revision: '1'},
    { url: '/css/materialize.min.css', revision: '1'},
    { url: '/css/style.css', revision: '1'},
    { url: '/js/data-source.js', revision: '1'},
    { url: '/js/db.js', revision: '1'},
    { url: '/js/idb.js', revision: '1'},
    { url: '/js/materialize.min.js', revision: '1'},
    { url: '/js/moment.js', revision: '1'},
    { url: '/js/nav.js', revision: '1'},
    { url: '/js/detail-match.js', revision: '1'},
    { url: '/js/detail-team.js', revision: '1'},
    { url: '/images/clean-football.png', revision: '1'},
    { url: '/images/football-player.jpg', revision: '1'},
    { url: '/images/icon.png', revision: '1'},
    { url: '/images/no-pict.png', revision: '1'},
    { url: '/icons/icon-72x72.png', revision: '1'},
    { url: '/icons/icon-96x96.png', revision: '1'},
    { url: '/icons/icon-128x128.png', revision: '1'},
    { url: '/icons/icon-144x144.png', revision: '1'},
    { url: '/icons/icon-192x192.png', revision: '1'},
    { url: '/icons/icon-256x256.png', revision: '1'},
    { url: '/icons/icon-384x384.png', revision: '1'},
    { url: '/icons/icon-512x512.png', revision: '1'},
], {
  // Ignore all URL parameters.
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football\-data\.org\//,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "football-data-api",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 120,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  let options = {
    body: body,
    icon: '/images/clean-football.png',
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