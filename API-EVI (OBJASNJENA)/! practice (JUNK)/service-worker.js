let cacheName = 'cache1-dynamic';


self.addEventListener('activate', function(ev){
    ev.waitUntil(
        caches.keys()
        .then(function(caNames){
            caNames.map(function(caName){
                if(cacheName !== caName){
                    return caches.delete(caName);
                }
            })
        })
    )
})

self.addEventListener('fetch', function(ev){
    const url = new URL(ev.request.url);

    //console.log(ev.request);
    //console.log(url);

    //console.log(url.origin !== location.origin && url.pathname === 'https://httpbin.org/ip');

    //console.log(url.origin);
    //console.log(location.origin);

    if(url.origin !== location.origin && url.pathname === '/ip'){
        ev.respondWith(
        self.caches.open(cacheName)
        .then(function(cache){
            return cache.match(ev.request)
            .then(function(posibleResponse){
                if(posibleResponse){
                    console.log(posibleResponse);
                    console.log('RESPONSE JE BIO I CACHEI SERVIRAN JE');
                    //ev.respondWith(posibleResponse);

                    return posibleResponse;
                }else{
                    return self.fetch(ev.request)
                    .then(function(resp){
                        console.log('STAVLJAM RESPONE U CACHE, A SADA ODGOVARAM SA MACKOM');
                        const init = {status: 200, statusText: 'edamer nije sir, i mackega ne vole'}
                        const macka = new Response(new Blob(), init);
                        //ev.respondWith(macka);
                        cache.put(ev.request, resp);

                        return macka;
                    })
                }
            });
        })
        )
    }
});
