// sw.js
self.addEventListener('install', (event) => {
    async function buildCache() {
      const cache = await caches.open(cacheName);
      return cache.addAll([
        '/main.css',
        '/main.mjs',
        '/offline.html',
      ]);
    }
    event.waitUntil(buildCache());
  });
  
  self.addEventListener('fetch', (event) => {
    async function cachedFetch(event) {
      const cache = await caches.open(cacheName);
      let response = await cache.match(event.request);
      if (response) return response;
      response = await fetch(event.request);
      cache.put(event.request, response.clone());
      return response;
    }
    event.respondWith(cachedFetch(event));
  });

  const catTaxonomies = {};

function catCategorizer(cat) {
  let catTaxonomy = catTaxonomies[cat.id];
  if (!catTaxonomy) {
    catTaxonomy = complexCatAnalysis();
    catTaxonomies[cat.id] = catTaxonomy;
  }
  return catTaxonomy;
}
const { get, set } = require('./basicCache');

function catCategorizer(cat) {
  let catTaxonomy = get(cat.id);
  if (!catTaxonomy) {
    catTaxonomy = complexCatAnalysis();
    set(cat.id, catTaxonomy);
  }
  return catTaxonomy;
}

// main.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service worker registered:', registration);
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  }