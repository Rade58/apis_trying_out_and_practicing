/* const CAHE_NAME = 'page-cache-v1';
const pictureUrl = '/images/doll_car.jpg';

self.addEventListener('install', function(ev){
    ev.waitUntil(
        self.caches.open(CAHE_NAME)
        .then(function(cache){
            return self.fetch(pictureUrl)
            .then(function(response){
                cache.put(pictureUrl, response)
            })
        })
    );
});

self.addEventListener('activate', function(ev){
    console.log('SERVICE WORKER ACTIVATION', ev);

    ev.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener('fetch', function(ev){

    console.log('fetch happened');

    const url = new URL(ev.request.url);

    if(url.origin === location.origin && url.pathname === '/images/com_screen.jpg'){

        ev.respondWith(
            self.caches.open(CAHE_NAME)
            .then(function(cache){
                return cache.match('/images/doll_car.jpg')
                .then(function(response){
                    return response;
                })
            })
        );
    }

}); */

const ocekujuciCachei =['page-cahe-v2'];
const giraffeUrl = '/images/giraffe.jpg';

self.addEventListener('install', function(ev){

    console.log('V2 is installing...');

    ev.waitUntil(
        self.caches.open('page-cache-v2')
        .then(function(cache){
            self.fetch(giraffeUrl)
            .then(function(response){
                cache.put(giraffeUrl, response);
            })
        })
    );
});

self.addEventListener('activate', function(ev){
    ev.waitUntil(
        self.caches.keys()
        .then(function(keys){

            return Promise.all(

                keys.map(function(currentCacheName){

                    if(!ocekujuciCachei.includes(currentCacheName)){
                        return self.caches.delete(currentCacheName);
                    }

                })
            );
        })
        .then(function(){
            console.log('V2 is ready to handle fetches');
        })
    );
});

self.addEventListener('fetch', function(ev){
    const url = new URL(ev.request.url);

    if(url.origin === self.location.origin && url.pathname === '/images/com_screen.jpg'){
        ev.respondWith(
            self.caches.open('page-cache-v2')
            .then(function(cache){
                return cache.match(giraffeUrl)
                .then(function(response){
                    return response;
                })
            })
        )
    }
});