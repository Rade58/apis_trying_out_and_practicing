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

1. **INSTALACIJA**

LIFECYCLE, JE U POTPUNOSTI ODVOJEN OD MOJE WEB STRANICE

DA BI GA INSTALIRAO (SERWICE WORKER-A), POTREBNO GA JE REGISTROVATI, U JAVASCRIPT FAJLU, KOJI JE CONNECTED SA MOJIM PAGE-OM

REGISTRACIJA SERVICE WORKERA, CE POKRENUTI NJEGOV KORAK INSTALIRANJA, U BACKGROUND-U STRANICE

TIPICNO, TOKOM INSTALACIJE, JA ZELIM DA CACHE-UJEM, NEKE STATICNE ASSET-OVE

AKO SU SVI FAJLOVI SUCCESSFULLY CACHED, ONDA CE SERVICE WORKER POSTATI INSTALIRAN

AKO BILO KOJI OD FAJLOVA NIJE USPEO DA POSTANE CACHED, OND JE INSTALL KORAK (INSTALL STEP) FAILED, I SERVICE WORKER NECE BITI ACTIVATED (ODNOSNO NECE BITI INSTALIRAN)

AKO SE TO DOGODI, NE TREBAM BRINUTI, JER CE POSTOJATI NOVI ATTEMPT, SLEDECEG PUTA

AKO SE INSTALIRA, TO ZNACI DA IMAS, POMENUTE STATICNE ASSET-OVE, U CACHE-U

2. **AKTIVACIJA**

KADA JE SERVICE WORKER INSTALIRAN, ACTIVATION STEP CE USLEDITI

OVO JE SJAJNA PRILIKA ZA HANDLING MENAGEMENT-A, STARIJIH CACHE-A

NAKON AKTIVACIJE, SERVICE WORKER CE KONTROLISATI SVE STRANICE, KOJE PODPADAJU POD NJEGOV OBIM

AL ISTRANICE, KOJE REGISTRUJU SERVICE WORKER-A, PO PRVI PUT, NECE BITI KONTROLISANE, OD POMENUTOG SERVICE WORKER-A, SVE DOK SE TE STRANICE OPET NE LOAD-UJU

**DVA STANJA, U KOJIMA SERVICE WORKER MOZE BITI KAD JE IN CONTROLL**

- MOZE BITI **TERMINATED**, TO SAVE MEMORY

- MOZE HANDLE-OVATI **'fetch'** (U SLUCAJ UNETWORK REQUEST-A) I **'message'** (U SLUCAJ UDA M USE POSALJE PORUKA) EVENT-OVE

[OVO JE OVER SIMPLIFIED VIZUALIZACIJA ZIVOTNOG CIKLUSA](https://developers.google.com/web/fundamentals/primers/service-workers/images/sw-lifecycle.png)

## PREREQUISITES

### BROWSER TREBA DA PODRZAVA SERVICE WORKERE

SLEDECI LINKOVO SU ONI GDE MOGU PRATITI BROWSER SUPPORT

[caniuse](https://caniuse.com/#search=service%20workers)

[jake archibald](https://jakearchibald.github.io/isserviceworkerready/)

### DA BI DEPLOY-OVA NA STRANICU POTREBAN MI JE HTTPS

A TOKO DEVELOPMENT MOGU KORISTITI SRVICE WORKERE, KROZ **localhost**, BEZ IKAKVIH PROBLEMA

RAZLOG ZASTO NSU DOZVOLJENI KROZ HTTP:

> Using service worker you can hijack connections, fabricate, and filter responses. Powerful stuff. While you would use these powers for good, a man-in-the-middle might not. To avoid this, you can only register service workers on pages served over HTTPS, so we know the service worker the browser receives hasn't been tampered with during its journey through the network.

**[GITHUB PAGES](https://pages.github.com/) SU SJAJNE ZA HOSTOVANJE, MOJIH DEMO-A, JER SU SERVED KROZ HTTPS**

## REGISTROVANJE SERVICE WORKER-A

- NAJBOLJE DA PRVO PROVERIM DA LI BROWSER PODRZAVA SERVICE WORKER

- ZATIM JE NAJBOLJE DA GA REGISTRUJEM U OBIMU, window-OVOG onload HANDLER-A

- I NAJBOLJE JE DA DEFINISEM CODE ZA USPESNU I NEUSPESNU REGISTRACIJU UZ POMOC PROMISE-A, JER JE POVRATNA VREDNOST **register** METODE, UPRAVO PROMISE INSTANCA

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

MOZE DA SE POZIVA register NEBROJENO PUTA, NAKON STO SE STRANICA LOAD-UJE, BEZ IKAKVE BRIGE, JER CE BROWSER VODITI RACUNA O TOME DA LI JE SERVICE WORKER, VEC REGISTROVAN, ODNOSNO NA BROWSER-U JE TO FIGURE OUT DA LI J SERVICE WORKER VEC REGISTROVAN

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

- PORED MOG SERVICE WORKERA, ZA MOJ DEVELOPMENT DOMEN, ODNOSNO PRE NJEGA, NALAZI SE I SERVICE WORKER

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

> he previous service worker won't affect the new window. Any registrations and caches created from within an Incognito window will be cleared out once that window is closed

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

1. OTVARI CACHE
1. CACHE-IRAJ FAJLOVA
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
1. ONDA SAM POZVAO cache.addAll() I DODAO ARRAY, U KOJEM SU PATH-OVI FAJLOVA ZA CACHING
1. ev.waitUntil METODI JE ARGUMENT, UPRAVO Promise, A KORISTI GA DA BI ZNALA, KOLIKO CE INSTALACIJA DA TRAJE, I DA LI CE BITI USPESNA ILI NE

**AKO SU SVI FAJLOVI SUCCESSFULLY CACHED, ONDA CE SERVICE WORKER BITI INSTALIRAN**

**AKO BILO KOJIH FAJLOVA (CIJI SU PATH-OVI ZDATI ARGUMENTI), USTVARI FAILS ONDA JE I INSTALL STEP FAILED**

>>>>>This allows you to rely on having all the assets that you defined, but does mean you need to be careful with the list of files you decide to cache in the install step. Defining a long list of files will increase the chance that one file may fail to cache, leading to your service worker not getting installed.

>>>>>This is just one example, you can perform other tasks in the install event or avoid setting an install event listener altogether.

## CACHE I RETURNED REQUESTS

POSTO INSTALIRA MSERVICE WORKER-A, ONO STO VEROVASTN OZELIM DA URADIM, JESTE DA RETURN-UJEM, JEDA NOD CACHED RESPONSE-OVA

**NAKON STO JE SERVICE WORKER INSTALIRAN, I KORISNIK NAVIGATES TO A DIFFERENT PAGE ILI URADI PAGE REFRESH, SERVICE WORKER CE POCETI DA RECEIVE-UJE**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**fetch** EVENT-OVE

```JAVASCRIPT
self.addEventListener('fetch', function(ev){
    ev.respondWith(
        self.caches.match(ev.request)
        .then(function(response){
            if(response){
                return response;
            }

            return self.fetch(ev.request)
        })
    );
});
```