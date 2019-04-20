/* self.addEventListener('activate', function(ev){
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
}) */

let cacheName = 'cache1-dynamic';

self.addEventListener('fetch', function(ev){
    const url = new URL(ev.request.url);

    if(url.origin !== location.origin && url.pathname === '/ip'){   

        ev.respondWith(
            self.caches.open(cacheName)         
            .then(function(cache){

                return cache.match(ev.request)
                .then(function(posibleResponse){     

                    if(posibleResponse){                
                        console.log(posibleResponse);
                        console.log('RESPONSE JE BIO I CACHE I SERVIRAM GA...');

                        return posibleResponse;

                    }else{                                   
                        return self.fetch(ev.request)
                        .then(function(response){

                            // PROVERAVAM DA LI JE body ISKORISCEN
                            console.log('before --> BODY IS USED: ', response.bodyUsed);     // --> false   (NRAVNO DA NIJE KORISCEN)


                            //**************OVO JE NAJVAZNIJE****************** 
                            // RESPONSE CACHE-IRAM
                            // USTVARI OVOG PUTA CACHE-IRAM,         KLONIRANI       RESPONSE
                            cache.put(ev.request, response.clone());
                            //*************************************************

                            // OPET PROVERAVAM DA LI JE body KORISCEN, NE BI TREBALO, JER NISAM CAHE-IRAO Response INSTANCU KOJA JE
                            // PASSED OVOM CALLBACK-U, USTVARI SAM CAHE-IRAO, NJEN CLONE

                            console.log('after --> BODY IS USED: ', response.bodyUsed);      // --> false   
                                                                            //           (ZAISTA NIJE NIJE KORISCEN KOORISCEN)
                                                                            // JER NIJE BILA ARGUMENT, PRI POZIVANJ Uput METODE

                            // DAKLE, MOGU Response INSTANCU, BEZ IKAKVE BRIGE RETURN-OVATI, ODNOSNO SERVE-OVATI                                            
                            return response;
                        })
                    }

                });
            })
        );

    }

});
