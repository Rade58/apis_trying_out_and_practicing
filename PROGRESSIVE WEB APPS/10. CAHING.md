# CAHING

GOVORIO SAM VEC RANIJE O CACHINGU, I TO U [SERVICE WORKERS FOLDERU](https://github.com/Rade58/apis_trying_out_and_practicing/tree/master/PROGRESSIVE%20WEB%20APPS/IMPORTANT%20PWA%20NOTES/SERVICE%20WORKERS)

A ONO STO ZELIM JESTE DA ZA PRIMER, MOG PROSTOG PWA, DEFINISEM CACHING, SVIH RESURSA SA MOG DOMENA (SAME ORIGINA), ALI I OSTALIH RESURSA, KOJE FETCH-UJEM SA DRUGIH DOMENA, A TO SU USTVARI, MATERIAL ICON FONT, I ROBOTO FONT

FAJL **SERVICE WORKER-A**:

```javascript
////////////////////////////////////////////////////////////////////////////////////////////////
// NE OBRACJA PAZNJU NA OVAJ, IMPORTED SCRIPT (NEMA VEZE SA ONIM STA TREBAM DA OBJASNIM )
// (OVO JE SAMO PODSETNIK DA TREBAM DA NAUCIM WORKBOX)
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

if(workbox){
    console.log('Workbox is loaded');
}else{
    console.log("workbox didn't load")
}

// U BUDUCNOSTI CES KORISTITI WORKBOX ZA PRECACHING
//(**PODSETNIK** DA TREBAM NAUCITI TAJ ALAT, KOJI SE ZESTOKO OSLANJA NA RegExp, KOJI TAKODJE MORAM TEMELJNO PONOVITI)
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

/* A SADA DA SE POZABAVIM CACHING-OM */

// DAKLE SLEDECI NIZ REFERENIRA IMENA CACHE-A, KOJE TRENUTNO KORISTI MOJA APLIKACIJA
// TO JE JEDAN CACHE, NAMENJEN ZA FAJLOVE SA ISTOG, ODNOSNO MOG DOMENA, A DRUGI JE CACHE ZA FILE-OVE KOJI
// TREBA DA SE FETC-UJU SA NEKOG DRUGOG DOMEN, PA DA SE ONDA CACHE-UJU
// ODUDA I NJIHOVA IMENA (JEDAN JE STATICKI, A DRUGI JE DINAMICKI)
const cacheWhitelist = ['page-static-cache-v1', 'page-dynamic-cache-v1'];
const urls = [


// ****** JA SAM PISAO U KOMENTARIMA I OBJASNJAVAOM, DA NEKE FAJLOVE CACHIRAM ILI NEKE NE
// ******   MEDJUTIM TO NIJE NI BITNO, JER SAM DEFINISAO DA SE BILO KOJI FAJL, KOJI NISAM CACHIRAO ON install
// ****** USTVARI CACHIRA  U         ***********     onfetch     HANDLER-U ************  DAKLE DINAMICKI  *****

// JER U OVOM PRIMERU, A O TOME SE MOGU SE UVERITI U OBIMU onfetch HANDLER-A, JA PRESRECEM, SVAKI NETWORK REQUEST I
// I CACHE-IRAM, ONO STO SE, RANIJE NIJE NALAZILO U, ODGOVARAJUCEM CACHE-U, A SERVIRAM ONO STO JE BIL OCACHE-IRANO

    '/', // ZASTO SE SAMO JEDAN SLASH KORISTI, MORAM DODATNO ISPITATI (NISAM VIDEO DA OVO UZROKUJE NEKI
                                                                        // PROBLEM)
    // JEDINA STVAR JE STO BI SE DOGODIO ERROR, KADA BIO POMENUTIM URL-OM POKUSAO INSTANCITIZIRATI
                                                                                    //      URL    INSTANCU
                                                        //   new URL('/')   BI THROW-OVALO   Error

                                                        // MEDJUTIM MENI I NE TREBA INSTANCA URL ZA POMENUTI url

    '/index.html',

    '/src/js/app.js',           // app.js FAJL, JE BIO FAJL, U KOJEM SAM REGISTRVAO SERVICE WORKER-A
                                    // POSTO U NJEMU NEMA NISTA DRUGO OSIM REGISTRACIJE MISLIM DA GA NE
                                    // MORAM CACHE-OVATI ZA OFFLINE USE (OVO CU JOS PROVERITI)

                                // IPAK GA JE POTREBNO CACHE-IRATI, JER MOZDA RUKUJE NECIM DRUGIM, PORED ISTALIRANJA SERVICE
                                // WORKER-A, A U TOM FAJLU SAM DEFINISAO I      onbeforeinstallprompt I onappinstalled HANDLERE

    '/src/js/material.min.js',
    '/src/js/feed.js',



    '/src/css/material.min.css',
    '/src/css/app.css',
    '/src/css/feed.css',
    '/src/css/help.css',


    '/help/index.html',


    // '/src/images/mona_lisa.jpg',   // OVO RADIM, U CILJU PROVERE (OVAJ FAJL KADA BUDE REQUESTED NECE BITI
                                      // SERVED IZ CACHE-A, JER GA NECU STAVITI U CACHE
                                      // DAKLE ONLINE, ON TREBA DA BUDE DOSTUPAN, DOK OFFLINE ON NECE BITI
                                      // DOSTUPAN, ALI ON CE BITI CACHE-IRAN U OBIMU onfetch HANDLER-A
                                      // I ZA SVAKI NAREDNI PUT BICE SERVIRAN IZ CACHE-A
                                      // JER TAK OCU DEFINISATI U onfetch HANDLER-U  
    '/manifest.json',
    '/favicon.png',


    // OVO SU DINAMCKI ASSET-I (BAR IH JA TAKO ZOVEM)             DAKLE ONI NISU DEO, MOG DOMENA
    'https://fonts.googleapis.com/css?family=Roboto:400,700',

    'https://fonts.googleapis.com/icon?family=Material+Icons',

];

// ON install ZELIM DA CACHIRAM, SAMO ONE FAJLOVE SA ISTOG DOMENA, I TI FAJLOVI TREBA DA BUDU CACHED U CACHE, KOJI
// NAZIVAM STATICKIM CACHE-OM, A TAKO GA NIZIVAM JER SLUZI ZA CACHIRANJE FAJLOVA SA MOG DOMENA
// A POSTO SU FAJLOVI NA MOM DOMENU, ONI SE MOGU CACHIRATI, TOKOM INSTALACIJE SERVICE WORKER-A


self.addEventListener('install', function(ev){
    ev.waitUntil(
        self.caches.open('page-static-cache-v1')
        .then(function(cache){
            return urls.map(function(url){

                return self.fetch(url)
                .then(function(response){

                    return cache.put(url, response);

                })

            })
        })
    )
});

self.addEventListener('activate', function(ev){
    // CISCENJE SVIH STARIJIH CACHE-A, KOJI SE NE KORISTE
    // ODNOSNO CISTIM SVE CACHE-OVE, CIJI STRINGOVI IMENA NISU CLANOVI NIZA KOJEG SKLADISTI
    //                                                                          cacheWhitelist     VARIJABLA

    ev.waitUntil(
        self.caches.keys()
        .then(function(keys){
            return Promise.all(
                keys.map(function(cacheName){
                    if(!cacheWhitelist.includes(cacheName)){
                        return self.caches.delete(cacheName);
                    }
                })
            )
        })
    );
});

// OVDE MORAM DEFINISATI, SERVING SVIH FAJLOVA IZ CAHEA
// ************
// ALI TAKODJE MORAM DEFINISATI I CACHING DINAMICKIH RESURSA U DINAMICKI CACHE
// I KADA TO KAZEM MISILIM NA CACHING RESURSA, KOJI SE FETCH-UJU, SA DRUGIH DOMENA
// U SLUCAJU OVOG PRIMERA, TO SU ROBOTO FONT I MATERIAL ICON FONT

self.addEventListener('fetch', function(ev){

    // KREIRACU ODMAH
                      //     URL        INSTANCU, SAMO DA IMAM MOGUCNOST PROVERE origin-A

    const url = new URL(ev.request.url);

    // ZA SAME ORIGIN OTVARAM STATICKI CACHE,
    // I AKO SU FAJLOVI U CACHE-U, SERVE-UJEM IH
    // ZA DIFFERENT ORIGIN OTVARAM DINAMICKI CACHE

    // AKO NISU FETCH-UJEM IH PONOVO I CACHE-IRAM IH (ALI KLONIRAM RESPONSE, KADA VRSIM CACHING)
    // CLONE Response INSTANCE CE BITI DRUGI ARGUMENT put() METODE

    // NISAM VIDEO DA JE OVAKO NEKO READIO, NI U JEDNOM CLANKU
    // JA KORISTIM Promise.resolve KAKO BI RESOLOVE-OVAO Promise SA Cache INSTANCOM
    // A KOJI CE TO CACHE BITI (STATICKI LI DINAMICKI), O TOME CE ODLUCITI ORIGIN Location INSTANCE I TRENUTNE URL INSTANCE
    // UZ POMOC TERNARY OPERATORA, KOJEG VOLI MDA KORISTIM

    ev.respondWith(
        Promise.resolve(
            self.caches.open(
                url.origin === self.location.origin?
                'page-static-cache-v1':'page-static-cache-v1'
            )
        )
        .then(function(cache){
            return cache.match(ev.request)          // KAD OTVORIM CACHE, PROVERAVAM DA LI JE Response U CACHE-U
            .then(function(response){
                if(response){

                    return response;

                }else{                                      // AKO Response INSTANCA NIJE U CACHE-U

                    return self.fetch(url)                  // FETCH-UJEM JE
                    .then(function(re){
                        cache.put(ev.request, re.clone())       // KAKO BI NJEN CLONE, CACHE-IRAO

                        return re;                              // A NJEN ORIGINAL RETURN-OVAO
                    })
                                                            // (VEC SAM OBJASNJASNIO U RANIJEM md FAJLU, ZASTO SAM
                }                                           // KLONIRAO, POMENUTU Response INSTANCU, KOJU KORISTIAM KAO
                                                            // ARGUMENT put METODE, Cache-OVOG PROTOTIPA
            })

        })
    );

});

```
