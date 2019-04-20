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

    if(url.origin !== location.origin && url.pathname === '/ip'){   // DAKLE SAMO ZELIM DA HANDLE-UJEM JEDAN REQUEST

        ev.respondWith(
            self.caches.open(cacheName)         //DAKLE OTVARAM CACHE PRI SVAKOM TRIGGERING-U fetch EVENT-A
            .then(function(cache){

                return cache.match(ev.request)
                .then(function(posibleResponse){      // TRAZIM DA LI JE RESPONSE U

                    if(posibleResponse){                // AKO JE BIO U CACHE-U VRSIM NJEGOV SERVING
                        console.log(posibleResponse);
                        console.log('RESPONSE JE BIO I CACHE I SERVIRAM GA...');

                        return posibleResponse;

                    }else{                                   // AKO NIJE BIO, FETCHUJEM ZA NOVIM RESPONSE-OM
                        return self.fetch(ev.request)
                        .then(function(response){

                            // PROVERAVAM DA LI JE body ISKORISCEN
                            console.log('before --> BODY IS USED: ', response.bodyUsed);     // --> false   (NIJE KORISCEN)

                            // RESPONSE CACHE-IRAM
                            // ALI OVOG PUTA CACHE-IRAM KLONIRANI RESPONSE
                            cache.put(ev.request, response.clone());

                            // OPET PROVERAVAM DA LI JE body KORISCEN, NE BI TREBALO, JER NISAM CAHE-IRAO Response INSTANCU KOJA JE
                            // PASSED OVOM CALLBACK-U
                            console.log('after --> BODY IS USED: ', response.bodyUsed);      // --> true   (JESTE KOORISCEN)
                                                                        //            STO ZNACI DA KADA SAM Response INSTANCU
                                                                        //            DODAO put METODI, KAO ARGUMENT
                                                                        //            TO JE UCINILO DA SE body, POMENUTE Response
                                                                        //            INSTANCE, ZAISTA ISKORISTI

                            // SERVIRANJE RESPONSE, KOJEM JE body ISKORISCENO, NEMA NIKAKVOG EFEKTA, JER NECU MOCI ACCESS-OVATI
                            // PODACIMA USED body-JA
                            return response;
                        })
                    }

                });
            })
        );

    }

});
