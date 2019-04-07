# SERVICE WORKER-I

> Service workers essentially act as proxy servers that sit between web applications, the browser, and the network (when available).

TAKO PISE NA [MOZIILLA DEV](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

IZMEDJU OSTALOG NAMENJENI SU ZA:

- KREIRANJE EFEKTIVNIH OFFLINE EXPERIENCE-A

- INTERCEPTING ("PRESECANJE", ODNOSNO PRAVILNIJE BI BILO RECI **PRESRETANJE**) NETWORK REQUEST-OVA

- TAKING APPROPRIATE ACTION-A, U ODNOSU NA TO DA LI JE NETWORK DOSTUPAN ILI NE

- UPDATE-OVANJE ASSET-OVA ("SREDSTAVA"), KOJI RESIDE-UJU ON THE SERVER

A OMOGUCUJU ACCESS:

- [PUSH NOTIFICATION-IMA](https://developers.google.com/web/fundamentals/push-notifications/)

- [BACKGROUND SYNC](https://developers.google.com/web/updates/2015/12/background-sync) API-U

NA [MOZZILA DEV](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) I NA [GOOGLE DEV](https://developers.google.com/web/fundamentals/primers/service-workers/) MOGU SAZNATI VISE O NJIMA

**U BUDUCNOSTI SERVICE WORKER-I CE MOZDA PODRZATI**

1. [periodic sync](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/periodicSync)

2. geofencing

> Geofencing is a service that triggers an action when a device enters a set location. Coupons, notifications, engagement features, security alerts — businesses are finding creative ways to make use of these virtual boundaries.

## OBAVEZNO CITATI SERVICE WORKER COOKBOOK

>>>> The Service Worker Cookbook is a collection of working, practical examples of using service workers in modern web sites.

[SERVICE WORKER COOKBOOK](https://serviceworke.rs/)

## OFFLINE FIRST

[OFFLINE FIRST](http://offlinefirst.org/) JE ODLICNA WEB STRANICA, KOJA SE BAVI OFFLINE EXPERIENCEM

ODNOSNO KAKO U DEVELOPMENTU POSTOJE PRINICIPI: RESPONSIVE FIRST, ILI MOBILE FIRST, TAKODJE POSTOJI I PRINCIP OFFLINE FIRST

[GIT REPOZITORIJUMI](https://github.com/offlinefirst)

## STVARI, KOJE BI TREBAO ZNATI O SERVICE WORKERIMA

- ONI SU JAVASCRIPT WORKERI, I NEMAJU, DIREKTNI ACCESS DOM-U

- MOGU SLATI PORUKE, UZ POMOC **self.postMessage()** FUNKCIJE

- > SERVICE WORKERS IS programmable network proxy, allowing you to control how network requests from your page are handled.

- TERMINATED JE KADA SE NE KORISTI I RESTARTED, KADA JE POTREBAN, I ZBOG TOGA SE NE MOZES OSLONITI NA GLOBALNO STANJE UNUTAR SERVICE WORKEROVIH **onfetch** I **onmessage** HANDLER-A; I AKO NEKA INFORMACIJA TREBA DA PERSIST (USTRAJE), IZMEDJU RESTART-OVA, KORISTI SE:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[indexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) KOJEM SERVICE WORKER IMA PRISTUP

- SERVICE WORKER-I, U OGROMNOJ MERI UPOTREBLJAVAJU [Promise-E](https://developers.google.com/web/fundamentals/primers/promises)

## ZIVOTNI CIKLUS SERVICE WORKER-A

[CHEATSHEET](https://mdn.mozillademos.org/files/12638/sw101.png)

1. **INSTALACIJA**

LIFECYCLE, JE U POTPUNOSTI ODVOJEN OD MOJE WEB STRANICE

DA BI GA INSTALIRAO (SERWICE WORKER-A), POTREBNO GA JE REGISTROVATI, U JAVASCRIPT FAJLU, KOJI JE CONNECTED SA MOJIM PAGE-OM

REGISTRACIJA SERVICE WORKERA, CE POKRENUTI NJEGOV KORAK INSTALIRANJA, U BACKGROUND-U STRANICE

TIPICNO, TOKOM INSTALACIJE, JA ZELIM DA CACHE-UJEM, NEKE STATICNE ASSET-OVE

AKO SU SVI FAJLOVI SUCCESSFULLY CACHED, ONDA CE SERVICE WORKER POSTATI INSTALIRAN

AKO BILO KOJI OD FAJLOVA NIJE USPEO DA POSTANE CACHED, ONDA JE INSTALL KORAK (INSTALL STEP) FAILED, I SERVICE WORKER NECE BITI ACTIVATED (ODNOSNO NECE BITI INSTALIRAN)

AKO SE TO DOGODI, NE TREBAM BRINUTI, JER CE POSTOJATI NOVI ATTEMPT, SLEDECEG PUTA

AKO SE INSTALIRA, TO ZNACI DA IMAS, POMENUTE STATICNE ASSET-OVE, U CACHE-U

2. **AKTIVACIJA**

KADA JE SERVICE WORKER INSTALIRAN, ACTIVATION STEP CE USLEDITI

OVO JE SJAJNA PRILIKA ZA HANDLING MENAGEMENT-A, STARIJIH CACHE-A

NAKON AKTIVACIJE, SERVICE WORKER CE KONTROLISATI SVE STRANICE, KOJE PODPADAJU POD NJEGOV OBIM

ALI STRANICE, KOJE REGISTRUJU SERVICE WORKER-A, PO PRVI PUT, NECE BITI KONTROLISANE, OD POMENUTOG SERVICE WORKER-A, SVE DOK SE TE STRANICE OPET NE LOAD-UJU

**DVA STANJA, U KOJIMA SERVICE WORKER MOZE BITI KAD JE IN CONTROLL**

- MOZE BITI **TERMINATED**, TO SAVE MEMORY

- MOZE HANDLE-OVATI **'fetch'** (U SLUCAJ UNETWORK REQUEST-A) I **'message'** (U SLUCAJU DA MU SE POSALJE PORUKA) EVENT-OVE

[OVO JE OVER SIMPLIFIED VIZUALIZACIJA ZIVOTNOG CIKLUSA](https://developers.google.com/web/fundamentals/primers/service-workers/images/sw-lifecycle.png)

## PREREQUISITES

### BROWSER TREBA DA PODRZAVA SERVICE WORKERE

SLEDECI LINKOVI SU ONI GDE MOGU PRATITI BROWSER SUPPORT

[caniuse](https://caniuse.com/#search=service%20workers)

[jake archibald](https://jakearchibald.github.io/isserviceworkerready/)

### DA BI DEPLOY-OVA NA STRANICU POTREBAN MI JE HTTPS

A TOKOM DEVELOPMENT-A MOGU KORISTITI SRVICE WORKERE, KROZ **localhost**, BEZ IKAKVIH PROBLEMA

RAZLOG ZASTO NISU DOZVOLJENI KROZ HTTP:

> Using service worker you can hijack connections, fabricate, and filter responses. Powerful stuff. While you would use these powers for good, a man-in-the-middle might not. To avoid this, you can only register service workers on pages served over HTTPS, so we know the service worker the browser receives hasn't been tampered with during its journey through the network.

**[GITHUB PAGES](https://pages.github.com/) SU SJAJNE ZA HOSTOVANJE, MOJIH DEMO-A, JER SU SERVED KROZ HTTPS**

## REGISTROVANJE SERVICE WORKER-A

- NAJBOLJE DA PRVO PROVERIM DA LI BROWSER PODRZAVA SERVICE WORKER

- ZATIM JE NAJBOLJE DA GA REGISTRUJEM U OBIMU, window-OVOG onload HANDLER-A

- I NAJBOLJE JE DA DEFINISEM CODE ZA USPESNU I NEUSPESNU REGISTRACIJU UZ POMOC Promise-A, JER JE POVRATNA VREDNOST **register** METODE, UPRAVO PROMISE INSTANCA

```JAVASCRIPT
if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register("/sw.js").
        then(function(registration){
            // REGISTRACIJA USPESNA
            console.log("Service workser successfully registered, with a scope: ", registration.scope)
        }, function(err){
            // REGISTRACIJE NEUSPESNA
            console.log("Service worker failed to register: ", err)
        });
    });
}
```

MOZE DA SE POZIVA register NEBROJENO PUTA, NAKON STO SE STRANICA LOAD-UJE, BEZ IKAKVE BRIGE, JER CE BROWSER VODITI RACUNA O TOME DA LI JE SERVICE WORKER, VEC REGISTROVAN, ODNOSNO NA BROWSER-U JE TO FIGURE OUT DA LI JE SERVICE WORKER VEC REGISTROVAN

LOKACIJE SERVICE WORKER FAJLA, KAO STO SE I VIDI IZ GORNJEG PRIMERA, JESTE U ROOT-U DOMENA, ODNOSNO U ISTOM FOLDERU (ODNOSNO NA ISTOM NIVOU KAO I MOJ index.html)

TO ZNACI DA JE:

*OBIM SERVICE WORKER-A, CEO ORIGIN*

IZ CEGA PROIZILAZI DA CE:

*SERVICE WORKERE RECEIVE-OVATI **fetch** EVENT-OVE, ZA SVE SA POMENUTOG DOMENA*

>>>> If we register the service worker file at /example/sw.js, then the service worker would only see fetch events for pages whose URL starts with /example/ (i.e. /example/page1/, /example/page2/).

## PROVERA DA LI JE SERVICE WORKER REGISTROVAN

**chrome://inspect/#service-workers**

PRIKAZANO MOGU KUCATI U ADRESS BARU, I TAMO CU VIDETI DA LI JE SERVICE WORKER REGISTROVAN

- A JA SAM U MOJOJ APLIKACIJI REGISTROVAO SERVICE WORKER-A

``
Service Worker http://localhost:7006/public/sw.js

http://localhost:7006/public/sw.js

inspect terminate
``

- PORED MOG SERVICE WORKERA, ZA MOJ DEVELOPMENT DOMEN, ODNOSNO PRE NJEGA, NALAZI SE I SERVICE WORKER:

``
Service Worker https://www.google.com/_/chrome/newtab-serviceworker.js

https://www.google.com/_/chrome/newtab-serviceworker.js

inspect terminate
``

KAO STO VIDIM, ODAVDE GA JE MOGUCE INSPECT-OVATI, ALI I TERMINATE-OVATI

*KADA SE SERVICE WORKER, PRVI PUT REGISTRUJE, MOGU JE JE VIDETI SVE DETALJE U VEZI S TIM, UPORAVO OVDE*

**chrome://serviceworker-internals**

OVO JE EKSTENZIVNA LISTA, JER SU U PITANJU SVE APLIAKCIJE, KOJE SAM OTVORIO U CHROMEU, IKADA, A KOJE SU REGISTROVALE SERVICE WORKERE

*MEDJUTIM RECENO JE DA SE TO USKORO NECE MOCI VIDETI, JER CE CHROME, JEDINO OSTAVITI DOSTUPNIM, ONO O CEM USAM VEC GOVORIO:*

chrome://inspect/#service-workers

> the previous service worker won't affect the new window. Any registrations and caches created from within an Incognito window will be cleared out once that window is closed

POMENUTO CU PROVERITI, JEDNOM PRILIKOM

## INSTALIRANJE SERVICE WORKER-A

DAKLE GOVORIO SAM O TOME KAKO KONTROLISNA STRANICA (MISLI SE NA STRANICU, KOJA JE LINKED SA HTML-OM I KOJA IMA DIRECT PRISTUP DOM-U), KIKS OFF, ODNOSNO OTPOCINJE REGISTRACIJU SERVICE WORKER-A, ALI NISAM GOVORIO O INSTALACIJI; A TO SE OTPOCINJE U, JAVASCRIPT FAJLU, MOG SERVICE WORKER-A

TAKO DA CU SADA PROMENITI PERSPEKTIVU I POSMATRATI THREAD, TOG FAJLA

TAJ SCRIPT FAJL DAKLE HANDLE-UJE **install** EVENT-OM

ZA MOST BASIC EXAMPLE, MORA DA SE OBEZBEDI, ODNOSNO DEFINISE ON install HANDLER; I TADA MORAM DA SE ODLUCIM, KOJE TO FAJLOVE ZELIM DA CACHE-UJEM

```JAVASCRIPT
self.addEventListener('install', function(ev){
    // OBAVI KORAKE INSTALACIJE
});
```

### KORACI INSTALACIJE

1. OTVORI CACHE
1. CACHE-IRAJ FAJLOVE (POPULATE CACHE)
1. CONFIRM-UJ, DA LI SU REQUIRED ASSETS, CACHED OR NOT

```JAVASCRIPT
let CACHE_NAME = 'my-site-cache-v1';
let urlsToCache = [
    '/',
    '/src/css/app.css',
    '/src/css/feed.css',
    '/src/js/app.js',
    '/src/js/feed.js',
    '/help/help.html'
];

self.addEventListener('install', function(ev){

    ev.waitUntil(
        selfEventListener.caches.open(CACHE_NAME)
        .then(function(cache){
            console.log('Cache is opened!');
            return cache.addAll(urlsToCache);
        })
    );
});
```

1. DAKLE, GORE SAM POZVAO caches.open() SA ZELENIM IMENOM CACHE-A
1. ONDA SAM POZVAO cache.addAll() I DODAO ARRAY, U KOJEM SU PATH-OVI (URL-OVI) FAJLOVA ZA CACHING
1. ev.waitUntil METODI JE ARGUMENT, UPRAVO Promise, A KORISTI GA DA BI ZNALA, KOLIKO CE INSTALACIJA DA TRAJE, I DA LI CE BITI USPESNA ILI NE

**AKO SU SVI FAJLOVI SUCCESSFULLY CACHED, ONDA CE SERVICE WORKER BITI INSTALIRAN**

**AKO BILO KOJIH FAJLOVA (CIJI SU PATH-OVI ZDATI ARGUMENTI), USTVARI FAILS, ONDA JE, I INSTALL STEP FAILED**

>>>>>This allows you to rely on having all the assets that you defined, but does mean you need to be careful with the list of files you decide to cache in the install step. Defining a long list of files will increase the chance that one file may fail to cache, leading to your service worker not getting installed.

>>>>>This is just one example, you can perform other tasks in the install event or avoid setting an install event listener altogether.

## CACHE I RETURNED REQUESTS

POSTO INSTALIRAM SERVICE WORKER-A, ONO STO VEROVASTNO ZELIM DA URADIM, JESTE DA RETURN-UJEM, JEDAN OD CACHED RESPONSE-OVA

**NAKON STO JE SERVICE WORKER INSTALIRAN, I KORISNIK NAVIGATES TO A DIFFERENT PAGE ILI URADI PAGE REFRESH, SERVICE WORKER CE POCETI DA RECEIVE-UJE**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**fetch** EVENT-OVE

```JAVASCRIPT
self.addEventListener('fetch', function(ev){
    ev.respondWith(
        self.caches.match(ev.request)
        .then(function(response){
            // CACHE HIT - RETURN RESPONSE
            if(response){
                return response;
            }

            return self.fetch(ev.request);
        })
    );
});
```

!! (DA POMENEM OPET, SERVICE WORKER, TREBA PRVO DA BUDE ACTIVATED DA BIH MOGAO RECEIVE-OVATI fetch EVENT-OVE)

DAKLE, GORE SAM ZAKACIO ON fetch EVENT HANDLER

ZATIM NAD FetchEvent INSTANCOM PRIMENJUJEM **respondWith** METODU, KOJOJ JE OPET ARGUMENT Promise INSTANCA

A TA PROMISE INSTANCA PROIZILAZI IZ CHAINING-A, PROMISE-A KOJE POCINJE SA **caches.match()** METODOM

OVA METODA POSMATRA REQUEST (ev.request JE NJEN ARGUMENT), I PRONALAZI CACHED RESULTS, IZ BILO KOJIH CACHE-OVA, KOJE JE MOJ SERVICE WORKER KREIRAO (PRONALAZI Response INSTANCU)

AKO POSTOJI MATCHING Response, RETURNOVACU UPRAVO TU Response INSTANCU, A AKO NEMAM MATCHING RESPONSE, ONDA CU RETURN-OVATI REZULTAT POZIVANJA **fetch** METODE (DAKLE, OPET ZAHTEVAM ISTI FAJL)

CIME BI SE NAPRAVIO NOVI NETWORK REQUEST, I ONDA BI SE RETURN-OVALI PODACI, AKO SE BILO STA MOZE RETRIEVE-OVATI OD NETWORKA

PREDHODNI PRIMER JE BIO SIMPLE EXAMPLE, I KORISTI BILO KOJE CACHED ASSETS-E, KOJE SAM CACHE-OVA, TOKOM INSTALL STEP-A

## AKO ZELIM DA CACHE-UJE, NOV REQUEST-OVE KUMULATIVNO (OVO MI JE NEJASNO :small_red_triangle:), MOGAO BIH URADITI SLEDECE

(**DAKLE OVAJ NASLOV ZAHTEVA NAKNADNO PROUCAVANJE, JER MI NIJE JASAN**) :small_red_triangle:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HANDLOVANJE RESPONSE-OVA, FETCH REQUEST-A

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  I ONDA, IH STAVLJAO U CACHE

```JAVASCRIPT
self.addEventListener('fetch', function(ev){
    respondWith(
        self.caches.match(ev.request)
        .then(function(response){
            if(response){
                // CACHE HIT - RETURN RESPONSE
                return response;
            }

            return self.fetch(ev.request)
            .then(function(response){
                if(!response || response.status !== 200 || response.type !== 'basic'){
                    return response;
                }

                // VAZNO!
                // TREBA SE KLONIRATI RESPONSE, ZATO STO RESPONSE JESTE STREAM
                // I ZATO STO ZELIM DA BROWSER KONZUMIRA RESPONSE
                // A TAKODJE ZELIM I DA CACHE KONZUMIRA RESPONSE
                // ZATO RESPONSE TREBAM KLONIRATI, KAKO BI IMAO DVA STREAM-A

                let responseToCache = response.clone();

                self.caches.open(CACHE_NAME)
                .then(function(cache){
                    cache.put(ev.request, responseToCVache)
                });

                return response;

            })
        })
    );
});
```

ONO STO SAM GORE URADIO JESTE SLEDECE:

1. CHAIN-OVAO SAM then (SA CALLBACK-OM KAO ARGUMENTOM) NA fetch REQUEST

2. KADA DOBIJEM RESPONSE, OBAVLJAM SLEDECE PROVERE (CHECKS)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UVERAVAM SE (ENSURE) DA JE RESPONSE VALID

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PROVERAVAM DA LI JE STATUS RESPONSEA, 200

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; UVERAVAM SE DAJE TIP RESPONSA **basic**

OVO POSLEDNJE INDICIRA DA JE U PITANJU REQUEST SA MOG ORIGIN-A, A TO ZNACI DA NISU, TAKODJE CACHED REQUESTOVI ZA THIRD PARTY ASSETS

3. AKO SU PROVERE USPESNE ONDA [KLONIRAM (KORISCENJEM clone METODE)](https://fetch.spec.whatwg.org/#dom-response-clone) RESPONSE

RALOG OVOME JESTE TO, ZATO STO JE RESPONSE, USTVARI [STREAM](https://streams.spec.whatwg.org/)

STO ZNACI DA BODY TOG RESPONSE-A, MOZE BITI UPOTREBLJEN SAMO JEDNOM

A POSTO ZELIM DA RETURN-UJEM RESPONSE, KAKO BI GA BROWSER KORISTIO, A TAKODJE GA ZELIM PROSLEDITI CACHE-U, KAKO BI GA ON KORISTIO, POTREBNO JE DA KLONIRAM RESPONSE, KAKO BI JEDAN RESPONSE MOGAO POSLATI BROWSERU, A DRUGI CACHE-U

(**DAKLE SVE POMENUTO ZAHTEVA NAKNADNO PROUCAVANJE, JER MI NIJE JASNO, ZASTO SE SVE OVO RADI; KONKRETNO MI JE SVE JASNO STA SE OVIME POSTIZE, ALI ZASO SE RADI fetch PONOVO, TO MI NIJE JASNO**) :small_red_triangle:

## :whale2::whale2::whale2::whale2: REZIME, VEOMA VAZAN, PRE NEGO STO NASTAVIM BILO STA DRUGO :whale2::whale2::whale2::whale2:

SA SERVICE WORKER-OM, SLEDECI KORACI SU KORACI, KOJI SE POSMATRAJU U SLUCAJU OSNOVNOG SETUP-A

1. :penguin: URL SEERVICE WORKER-A SE FETCHUJE, I REGISTRUJE, PUTEM:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**serviceWorkerContainer.register()**

2. :penguin: AKO JE REGISTRACIJA USPESNA **SERVICE WORKER CE BITI EXECUTED** U:

&nbsp;&nbsp;&nbsp;&nbsp;**ServiceWorkerGlobalScope**

A TO PREDSTAVLJA SPECIJALNU VRSTU CONTEXT-A, KOJI RUNN-UJE IZVAN MAIN SCRIPT EXECUTION THREAD-A, I TAJ WORKER-OV GLOBALNI OBIM NEMA PRISTUP DOM-U

3. :penguin: SERVICE WORKER JE SADA SPREMAN ZA PROCESS-OVANJE EVENT-OVA

4. :penguin: INSTALACIJA SERVICE WORKER-A, JE POKUSANA KADA SU STRANICE KONTROLISANE OD STRANE SERVICE WORKERA (SERVICE WORKER - CONTROLLDED PAGES), ACESSED SUBSEQUENTLY (ACCESED NAKNADNO (DAKLE, NE TOKOM ONE PRVE POSETE, KADA SE DOGADJA REGISTRACIJA, VEC TOKOM SLEDECE POSETE STRANICI))

**install** EVENT JE EVENT, KOJI JE UVEK PRVI POSLAT SERVICE WORKER-U (MOGUCE JE KORISTITI TAJ EVENT, KAKO BIH STARTOVAO PROCESS POPULATINGA **indexedDB**-A, I CACHE-IRANJE ASSET-OVA MOG SITE-A), I POMENUTO JE, U SUSTINI ISTA PROCEDURA, POPUT ONE PRI KOJOJ SE INSTALIRA native Firefox OS app (DAKLE CINJENJE DA SVE BUDE AVAILABLE FOR USE OFFLINE)

5. :penguin: KADA **oninstall** HANDLER COMPLETES, SERVICE WORKER SE SMATRA INSTALIRANIM

6. SLEDI **activation**

KADA JE SERVICE WORKER INSTALIRAN, ON ONDA RECEIVE-UJE **activate** EVENT

PRIMARNA UPOTREBA **onactivate**-A JESTE ZA CLEANUP RESURSA, U PREDHODNOJ VERZIJI SERVICE WORKER SCRIPT-A

7. :penguin: SERVICE WORKER CE SADA KONTROLISATI STRANICE, I TO SAMO ONE OTVORENE, NAKON STO JE **register()** IZVRSENO USPESNO; ODNOSNO document POCINJE ZIVOT SA ILI BEZ SERVICE WORKER-A, I TO ODRZAVA TOKOM SVOG LIFETIMA-A

TAKO DA documentS MORAJU BITI RELOADED, KAKO BI STVARNO MOGLI BITI KONTROLISANI OD STRANE SERVICE WORKER-A

[GRAFICKI PRIKAZ POMENUTOGA](https://mdn.mozillademos.org/files/12636/sw-lifecycle.png)

A OVO SU [EVENTOVI](https://mdn.mozillademos.org/files/12632/sw-events.png) SERVICE WORKER-A

- **install**

- **activate**

- **message**

FUNCTIONAL EVENTS:

- **fetch**

- **sync**

- **push**

## UPDATE-OVANJE SERVICE WORKER-A

>>> There will be a point in time where your service worker will need updating. When that time comes, you'll need to follow these steps:

1. UPDATE-UJ TVOJ SERVICE WORKER JAVASCRIPT FILE

KADA KORISNIK NAVIGATES TO YOUR SITE, BROWSER CE POKUSATI DA REDOWNLOAD-UJE SCRIPT FILE, KOJI JE DEFINISAO SERVICE WORKER-A, U BACKGROUND-U (PREDPOSTAVLJAM DA SE OVDE MISLI O FAJLU CIJI JE CONTEXT ServiceWorkerGlobalScope, A NE O FAJLU KOJI JE REGISTROVAO SW-A)

AKO POSTOJI, CAK JEDAN BYTE RAZLIKE, U SERVICE WORKER-OVOM, DOWNLOADED FILE-U, U POREDJENJU STA, ON SADA IMA, BROWSER CE GA SMATRATI NOVIM

2. TVOJ NOVI SERVICE WORKER CE STARTOVATI, I install EVENT CE BITI FIRED

3. U OVOJ TACKI, **STARI SERVICE WORKER, I DALJE KONTROLISE TRENUTNE STRANICE, TAK ODA CE NOVI SERVICE WORKER, UCI U *waiting* STATE**

4. **KADA SE TRENUTNO OTVORENE STRANICE, TVOG SITE-A ZATVORE, STARI SERVICE WORKER CE BITI KILLED, I NOVI SERVICE WORKER CE PREUZETI KONTROLU**

5. KADA TVOJ NOVI SERVICE WORKER PREUZME KONTROLU, NJEGOV **activate** EVENT CE BITI FIRED

DAKLE, U **onactivate** HANDLER-U, TREBA DA SE OBAVLJA JEDA NUOBICAJENI TASK, A TO JE:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**CACHE MENAGEMENT**

>>>>The reason you'll want to do this in the onactivate listener

>>> is because if you were to wipe out any old caches in the install step, any old service worker, which keeps control of all the current pages, will suddenly stop being able to serve files from that cache.
(ZATO STO BI TOKOM INSTLACIJE, CACHED FAJLOVI BILI OBRISANI (OVO NE BI IMALO NIKAKVOG EFEKTA, I ONDA, NAKON SLEDECEG RELOADA, OPET ISTO, OPET SE FAJLOVI BRISU...))

### SIMPLE PRIMER UPDATING-A SERVICE WORKERA

NA PRIMER, IMAM JEDAN DEFINISANI CACHE, NA NIVOU CELOG SAJTA I NJEGOVO IME JE 'moj-site-cache-v1'

UVIDEO SAM DA JE BOLJE DA TAJ CACHE PODELIM NA CACHE FILE-OVA, MOG SITE, I CACHE BLOG POST-OVA

DAKLE ZELIM DVA CACHE-A, SA SLEDECIM IMENIMA:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 'page-cache-v1'

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 'blog-posts-cache-v1'

*OVO ZNACI DA CU U **install** STEP-U, MORATI KREIRATI DVA POMENUTA CACHE-A, A U **activate** STEP-U, CU MORATI DA DELET-UJEM, STARIJI CACHE 'moj-site-cache-v1'*

```JAVASCRIPT
self.addEventListener('activate', function(ev){
    let cacheWhitelist = ['page-cache-v1', 'blog-posts-cache-v1'];

    ev.waitUntil( // INICIJALIZUJEM
        self.caches.keys()
        .then(function(cacheNames){
            return Promise.all(
                cacheNames.map(function(caheName){
                    if(cacheWhitelist.indexOf(cacheName) === -1){
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
})
```

## ROUGH EDGES AND GOTCHAS (PROCITAJ SVE O OVOME NA google.developers)

>>>This stuff is really new. Here's a collection of issues that get in the way. Hopefully this section can be deleted soon, but for now these are worth being mindful of.

[PROCITAJ IH OVDE](https://developers.google.com/web/fundamentals/primers/service-workers/#top_of_page)

## CEO OVAJ DOKUMENT IZISKUJE DETASLJNIJA OBJASNJENA I BOLJE FORMIRANE TEHNIKE

VRACA CU SE NA OVO