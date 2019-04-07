const CACHE_NAME = 'page-cache-v1';

const dollPictureUrl = '/images/doll_car.jpg';

const SYNTH_IMAGES_CACHE = 'synth-images-cache-v1';

const synth_files_to_cache = [
    '/images/synth_pictures/synth_1.jpg',
    '/images/synth_pictures/synth_2.jpg',
    '/images/synth_pictures/synth_3.jpg',
    '/images/synth_pictures/synth_4.jpg',
    '/images/synth_pictures/synth_5.jpg',
    '/images/synth_pictures/synth_6.jpg',
];

self.addEventListener('install', function(ev){
    ev.waitUntil(
        self.caches.open(CACHE_NAME)
        .then(function(cache){
            self.fetch(dollPictureUrl)
            .then(function(response){
                cache.put('/images/doll_car.jpg', response);
            })
        })
    );
})

self.addEventListener('activate', function(ev){
    console.log('SW ACTIVATED', ev);
});

self.addEventListener('fetch', function(ev){
    
    const url = new URL(ev.request.url);

    if(url.origin === location.origin && url.pathname === '/images/com_screen.jpg'){
        ev.respondWith(
            self.caches.open(CACHE_NAME)
            .then(function(cache){
                return cache.match('/images/doll_car.jpg')
            })
        );
    }

});