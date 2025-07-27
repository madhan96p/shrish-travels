const CACHE_NAME = 'shrish-cache-v1';

const urlsToCache = [
    '/',
    '/home.html',
    '/booking.html',
    '/contact.html',
    '/hiring.html',
    '/services.html',
    '/tariff.html',
    '/routes.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/robots.txt',
    '/sitemap.xml',
    '/ads.txt',
    '/Home.jpg',

    // SVG & Images
    '/assets/transparent_hiring.png',
    '/assets/hero.avif',
    '/assets/background.jpg',
    '/assets/preview-image.jpg',
    '/assets/city-tours.jpg',
    '/assets/outstation-trips.jpg',
    '/assets/luxury-car.avif',
    '/assets/airport-transfer.avif',
    '/assets/sh1.jpg',
    '/assets/sh1.png',

];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
