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
    console.log(ev);                                                   // --> InstallEvent {}
    console.log(ev.__proto__);                                         // --> InstallEvent {}
    console.log(ev.__proto__.__proto__);                               // --> ExtendableEvent {}
    console.log(ev.__proto__.__proto__.__proto__);                     // --> Event {}
});

self.addEventListener('activate', function(ev){
    console.log(ev);
    console.log(ev.__proto__);
    console.log(ev.__proto__.__proto__);
    console.log(ev.__proto__.__proto__.__proto__);
    console.log(ev instanceof Event);               // -->    true
    console.log(ev instanceof ExtendableEvent);     // -->    true
    console.log(ev.type);                           // -->  'activate'    
});
