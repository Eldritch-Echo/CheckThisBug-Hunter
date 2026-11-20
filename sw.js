const base = self.registration.scope;
const namespace = 'checkboxes:' + base + ':';
const version = namespace + '9';
const files = ['./','./index.html','./style.css','./app.js','./catalog.js','./icon-192.png','./icon-512.png','./app.webmanifest'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(version).then(cache => cache.addAll(files)));
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(namespace) && key !== version) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || !url.href.startsWith(base)) return;
  const relative = './' + url.pathname.slice(new URL(base).pathname.length);
  if (!files.includes(relative)) return;
  event.respondWith((async () => {
    const cache = await caches.open(version);
    return await cache.match(new URL(relative,base).href) || fetch(event.request);
  })());
});
