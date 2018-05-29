const assets = [
    './',
    './styles.css',
    './client.js'
]

self.addEventListener('install', async event => {
    const cache = await caches.open('static-files')
    cache.addAll(assets)
})

self.addEventListener('fetch', event => {
    const request = event.request
    event.respondWith(networkFirst(request))
})

async function networkFirst(request) {
   const apiCache = await caches.open('api-responses')

   try {
       const response = await fetch(request)
       apiCache.put(request, response.clone())
       return response  
   } catch (error) {
       return await caches.match(request)
   }
}