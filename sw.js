/* WiseTrack service worker: keeps the app usable offline (tracking works without internet;
   mirroring needs the network). Bump VERSION when files change. */
const VERSION = 'wisetrack-v7';
const SHELL = [
  './', './index.html', './izle.html', './manifest.webmanifest', './izle.webmanifest',
  './vendor/peerjs.min.js', './vendor/qrcode.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-64.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== VERSION + '-rt').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isFont) return;             // PeerJS signalling etc. go straight to the network
  // stale-while-revalidate: answer from cache, refresh in the background
  e.respondWith((async () => {
    const cache = await caches.open(sameOrigin ? VERSION : VERSION + '-rt');
    const hit = await cache.match(req, { ignoreSearch: sameOrigin });
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const res = await net;
    if (res) return res;
    if (req.mode === 'navigate') { const idx = await cache.match('./index.html'); if (idx) return idx; }
    return new Response('Çevrimdışı', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  })());
});
