const CACHE_NAME = 'page-cache-v1';

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
        Promise.all([
            self.caches.open(CACHE_NAME)
            .then(function(cache){
                cache.add('/doll_car.jpg');
            })
            .catch(function(err){
                console.log('CACHE ', CACHE_NAME, ' FAILED TO OPEN!');
            }),

            self.caches.open(SYNTH_IMAGES_CACHE)
            .then(function(cache){
                cache.addAll(synth_files_to_cache)
            })
            .catch(function(err){
                console.log("No mucho synth images.")
            })    

        ])
    );
});

self.addEventListener('activate', function(ev){
    console.log('*****************ACTIVATION**********************');
    self.caches.open(CACHE_NAME)
    .then(function(cache){
        console.log(cache.keys());
    })
    console.log('*****************ACTIVATION**********************');
});

// AKO JE REC O PRVOM OTVARANJU STRANICE, fetch EVENT SE NECE TRIGGER-OVATI
// VEC TEK NAKON RELOAD-A

self.addEventListener('fetch', function(ev){
    
    self.caches.open(SYNTH_IMAGES_CACHE)
    .then(function(cache){
        console.log('*****************FETCH**********************');
        console.log(cache.keys());
    });
    
    self.caches.open(CACHE_NAME)
    .then(function(cache){
        console.log(cache.keys());
        console.log('********************************************');
    });

    
});
