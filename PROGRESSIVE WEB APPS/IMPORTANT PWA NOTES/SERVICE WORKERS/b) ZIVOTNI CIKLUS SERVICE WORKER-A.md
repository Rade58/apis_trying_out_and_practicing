# THE SERVICE WORKER LIFECYCLE

>The lifecycle of the service worker is its most complicated part.

AKO NE ZNAS STA ON POKUSAVA DA URADI, I KOJI SU NJEGOVI BENEFITI, MOZES IMATI OSECAJ KAO DA SE BORI SA TOBOM

ALI KADA SAZNAS KAKO RADI, MOZES DELIVER-OVATI SEAMLESS ('''You use seamless to describe something that has no breaks or gaps in it or which continues without stopping.'''), NENEMETLJIVE (unobtrusive), UPDATE-OVE KORISNIKU, MIKSUJUCI NAJBOLJE WEB I NATIVE PATTERN-E

I KAKO Jake Archibald KAZE:

>>> This is a deep dive, but the bullets at the start of each section cover most of what you need to know.

## INTENT (NAMERA)

NAMERA LIFECYCLE-A SERVICE WORKER-A, JESDE DA

- UCINI OFFLINE-FIRST, MOGUCIM

- DOZVOLI NOVOM SERVICE WORKER-U, DA POSTANE READY, BEZ TOGA DA DISRUPT-UJE, TRENUTNI SERVICE WORKER

- OBEZBEDI DA JE, STRANICA U OBIMU (IN SCOPE PAGE) KONTROLISANA OD STRANE ISTOG SERVICE WORKER-A (ILI NI JEDNOG SERVICE WORKER-A), TOKOM CELOG PERIODA

- OBEZBEDI DA SE, SAMO JEDNA JEDINA VERZIJA MOG SAJTA, RUNN-UJE ODJEDNOM

**OVO POSLEDNJE JE JAKO VAZNO**

BEZ SERVICE WORKER-A, KORISNIK MOZE LOAD-OVATI JEDAN TAB ZA MOJ SITE, I ONDA MOZE OTVORITI JOS JEDAN; STO MOZE REZULTOVATI TIME DA DVE VERZIJE MOG SITE-A, RUN-UJU ISTOVREMEN-O

PONEKAD POMENUTO JESTE OK, ALI NAJCESCE BI PROUZROKOVALO NEZELJENOSTI, JER DVA TABA-A BI IMALA DRUGACIJE MISLENJE O TOME KAKO TREBA DA SE MENAGE-UJU, NJIHOV SHARED STORAGE (DAKLE OVO MOZE UZROKOVATI ERRORS, ILI JOS KORE DATA LOSS)

**PAZLJIVO!***KORISNICI AKTIVNO DISLIKE-UJU GUBITAK PODATAKA, TO IM ZADFAJE VELIKU TUGU*

## PRVI SERVICE WORKER :new_moon:

UKRATKO:

- **'install'** EVENT JE PRVI EVENT, KOJEG SERVICE WORKER DOBIJA, I DESAVA SE SAMO JEDNOM

- Promise PROSLEDJEN installEvent.waitUntil(), SIGNALAIZIRA, TRAJANJE, I SUCCESS ILI FAILIURE, INSTALIRANJA SERVICE WORKER-A

- SERVICE WORKER NECE RECIEVE-OVATI EVENT-OVE, KAO STO SU **'fetch'** I **'push'**, SVE DOK ONOG TRENUTKA KADA SUCESSFULLY FINISH-IRA, SVOJE INSTALIRANJE, I POSTANE **active**

- PO DEFAULTU, FETCH-EVI STRANICA, NECE PROCI KROZ SERVICE WORKER-A, SEM AKO, SAM REQUEST ZA STRANICOM, NIJE PROSAO PREKO SERVICE WORKER-A (ODNOSNO SEMA AKO NIJE PODESEN); I ZBOG TOGA CE SE MORATI URADITI PAGE REFRESH DA BIH VIDEO EFEKTE SERVICE WORKER-A

- [Clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim), MOZE OVERRIDE-OVATI ,POMENUTO PONASANJE, I PREUZETI KONTROLU NAD NON-CONTROLLED PAGE-OVIMA

****

POSMATRACU SLEDECU STRANICU

```HTML
<!DOCTYPE html>

slika ce ovde pojaviti za 3 sekunde

<script>

    navigator.serviceWorker.register('/sw.js')
    .then(function(registration){
        console.log('Service Worker Registered', registration);
    })
    .catch(function(error){
        console.log('Service Worker registration failed', error);
    });

    window.setTimeout(function(){
        const image = new Image();
        image.src="/dog.svg";
        document.body.appendChild(image);
    }, 3000);

</script>
```

SKRIPT, OVE STRANCE REGISTRUJE SERVICE WORKER-A, I ONO STA JOS RADI JESTE DA DODAJE SLIKU PSA STRANICI, NAKON 3 SEKUNDE

A SLEDECE JE CODE sw.js FAJLA

```javascript
self.addEventListener('install', function(ev){
    console.log('V1 is installing...');

    // CACHING A cat SVG
    ev.waitUntil(
        self.caches.open('static-v1')
        .then(function(cache){
            cache.add('/cat.svg');
        })
    );
});

self.addEventListener('activate', function(ev){
    console.log('V1 is now ready to handle fetches.');
});

self.addEventListener('fetch', function(ev){
    const url = new URL(ev.request.url);

    // SERVE THE cat SVG IZ CACHE-A, AKO JE REQUEST SAME-ORIGIN, I AKO JE PATH '/dog.svg'

    if(url.origin === location.origin && url.pathname === '/dog.svg'){
        event.respondWith(
            caches.match('/cat.svg')
        );
    }
});
```

OVO ZNACI DA CE SE PRILIKOM PRVOG OTVARANJA STRANICE, UCITATI SLIKA PSA, A KADA KORISNIK RELOAD-UJE STRANICU, ONO STO CE BITI UCITANO JESTE SLIKA MACKE

****

### SCOPE AND CONTROL :first_quarter_moon:

DEFAULT OBIM SERVICE WORKER-A JESTE **'./' RELATIVAN** NA URL SCRIPT-A SERVICE WORKER-A

TO ZNACI DA AKO REGISTRUJEM SERVICE WORKER NA //example.com/foo/srrvice.js

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NJEGOV DEFAULT SCOPE JE //example.com/foo/

ONO STO SE NAZIVA:

- **[CLIENT](https://developer.mozilla.org/en-US/docs/Web/API/Client)-IMA**

USTARI JESU **PAGES, WORKERS I SHARED WORKERS** (PREDSTAVLJENI SU Clients INSTANCOM U SCOPE SERVICE WORKER-A)

TVOJ SERVICE WORKER, MOZE KONTROLISATI SAMO ONE CLIENTE-E, KOJI SU U SCOPE-U

KADA JE CLIENT 'CONTROLLED', NJGOVO FETCHES-I, IDU KROZ IN-SCOPE SERVICE WORKER-A

*DA LI JE CLIENT CONTROLLED ILI NE, PROVERAVA SE PUTEM:*

- **navigator.serviceWorker.controller** (NATAVNO U CLIENT-OVOM CONTEXT-U)

MOGUCE SU DVE VREDNOSTI ZA OVAJ PROPERTI: **ServiceWorker** INSTANCA ILI **null**

### DOWNLOAD-OVANJE, PARSING I EXECUTION :first_quarter_moon:

TVOJ PRVI SERVICE WORKER SE DOWNLOAD-UJE, KADA POZOVEM **.register()**

AKO TVOJ SCRIPT FAILS DA SE DOWNLOAD-UJE, ILI FAIL-UJE DA SE PARESE-UJE ILI THROW-UJE ERROR U SVOM INITAL EXECUTION-U, PROMISE KOJE PROIZILAZI IZ register IZVRSENJA, CE BITI REJECTED, I SERVICE WORKER CE BITI DISCARDED

CHROME DEV TOOLS POKAZUJU ERROR U KONZOLI, I [SERVICE WORKER SECTION-U, U Applicvation TAB-U](https://developers.google.com/web/fundamentals/primers/service-workers/images/register-fail.png)

### INSTALL :first_quarter_moon:

PRVI EVENT, KOJ ITVOJ SERVICE WORKER DOBIJE JESTE install, A TRIGGERED AS SOON AS THE SERVICE WORKER EXECUTES

I TRIGGERUJE SE SAMO JEDANPUT, PO SERVICE WORKER-U

**AKO IZMENIS (ALTER-UJES) SCRIPT, SVOG SERVICE WORKER-A, BROWSER CE GA SMATRATI RAZLICITIM, NOVI MSERVICE WORKER-OM, I ON CE ONDA DOBITI install EVENT**

(OVO JE POSEBNO BITNO ZA SERVICE WORKER UPDATING, O KOJEM CU GOVORITI KASNIJE)

install EVENT JE TVOJ SANSA DA SVE CACHE-UJES SVE STO JE POTREBNO, PRE NEGO STO DOBIJES MOGUCNOT DA KONTROLISES clients

**Promise INSTANCA, KOJU PROSLEDIS POZIVANJU event.waitUntill() FUNKCIJE, OMOGUCUJE BROWSER-U DA SAZNA, KADA SE INSTALACIJA COMPLETE-OVALA, I DA LI JE BILA SUCESSFUL**

**A AKO TAJ Promise REJECTS, TO SIGNALIZIRA DA JA INSTALL PROCESS FAILED, I TAJ SERVICE WORKER BIVA THROWN AWAY OD STRANE BROWSER-A**

*AND IT WILL NEVER CONTROLL CLIENTS*

ZATO U SLUCAJU PREDHODNOG PRIMERA, NE MOGU SE UZDATI DA CE **cat.svg** , BITI PRISUTNA U CACHE-U, TOKOM fetch EVENT-A (it's a dependancy)

### ACTIVATE :first_quarter_moon:

KADA JE TVOJ SERVICE WORKER SPREMAN DA KONTROLISE CLIENT-E, I HANDLE-UJE FUNCTIONAL EVENTS, KAO STO SU push I sync; ONO STO CE SERVICE WORKER THREAD DOBITI, JESTE **activate** EVENT

ALI TO NE ZNACI DA CE PAGE, KOJI JE POZVAO .register() BITI CONTROLLED

PRVI PUT KADA LOAD-UJES STRANICU, IZ GORNJEG PRIMERA, KOJEG SAM DEFINISAO; UPRKOS STO JE **dog.svg** REQUESTED (MISLI SE NA ONAJ REQUEST U OBIMU onfetch HANDLER-A), DUGO NAKON STO SE SERVICE WORKER AKTIVIRAO; SERVICE WORKER NECE HANDLE-OVATI REQUEST, I I DALJE CES VIDETI SLIKU PASA NA STRANICI

DEFAULT JE *KONSTANTNOST*, KOJA SE OGLEDA U TOME, DA **AKO SE TVOJ PAGE LOAD-UJE, BEZ SERVICE WORKER-A (*A PRVI LOAD, ZA KOJI JE DEFINISANA REGISTRACIJA SE ZAISTA LOAD-OVAO BEZ SERVICE WORKERA, JER SE SERVICE WORKER, TEK NAKON TOG PRVOG LOADA REGISTROVAO*), NECE SE NI, NJEGOVI SUBRESURSI (U OVOM SLUCAJU SLIKE) LOAD-OVATI SA TIM SERVICE WORKER-OM, KOJI SE TEK NAKON PRVOG LOAD-A REGISTROVAO**

KADA LOAD-UJES STRANICU DRUGI PUT, ODNOSNO NAKON STO REFRESH-UJES STRANICU, PAGE CE BITI CONTROLED

OBOJE, I PAGE I IMAGE, CE PROCI KROZ **fetch** EVENT-OVE

I ONO STO CE BITI PRIKAZANO (UMESTO SLIKE PSA), JESTE SLIKA MACKE

### clients.claim :first_quarter_moon:

MEDJUTIM, MOGUCE JE **PREUZETI KONTROLU, NAD UNCONTROLLED CLIENTS, POZIVANJEM**:

- **[clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)**

IZ TVOG SERVICE WORKER-A, **ONDA KADA JE ACTIVATED**

DAKLE, MORAM POZVATI clients.claim(), U OBIMU **onactivate** HANDLERA, ALI MORAM TAKODJE *PRODUZITI AKTIVACIJU, SVE DOK SE CLIENTI NE CLAIM-UJU* (KORISTITI event.waitUntil)

SADA CU DEFINISATI PRIMER, U KOJEM CU KORISTITI clients.claim() **(ISTI PRIMER KAO SA SLIKOM MACKE I PSA, ALI U OVOM SLUCAJU KORISTIM DRUGE SLIKE (SLIKU SCREEN MONITORA, I SLIKI DOLLOREAN AUTOMOBILA (OVU DRUGU SLIK UZELIM DA CACHE-UJEM)), ALI TO NIJE NI BITNO; BITNO JE DA CU KORISTITI clients.claim() U onactivate HANDLERU, A TO clients.claim() CE BITI ARGUMENT event.waitUntil() POZIVANJA)**

****

**index.html** FAJL:

```HTML
<!DOCTYPE html>
<body>

    <script src="/main.js"></script>
</body>
```

**main.js** FAJL:

```javascript
window.navigator.serviceWorker.register('/service-worker.js');

console.log(window.navigator.serviceWorker.controller);

const image = new Image();

image.style.width = "38vw";
image.rel = "syntwave image";

window.setTimeout(function(image){

    // OBRATI PAZNJU DA ZADAVANJE src PROPERTIJA DEFINISES OVDE, JER
    // ONO STO ZELI MDA POSTIGNEM JETE DA SE NETWORK REQUEST EXECUTE-UJE
    // NAKON OKO 4 SEKUNDE
    // JER NE ZELIM DA SE CLAIMING RESURSA, TOKO MAKTIVACIJE DOGODI POSLE NETWORK REQUEST
    // ODNOSNO JA ZELIM DA SE NETWORK REQUEST DOGODI POSLE SVEGA TOGA
    // KAKO BI SE TRIGGEROVAO fetch EVENT

    image.src = "/images/com_screen.jpg";
    document.body.prepend(image);

}, 3800, image);

```

**service-worker.js** FAJL:

```javascript
const CAHE_NAME = 'page-cache-v1';
const pictureUrl = '/images/doll_car.jpg';

self.addEventListener('install', function(ev){
    ev.waitUntil(
        self.caches.open(CAHE_NAME)
        .then(function(cache){
            return self.fetch(pictureUrl)
            .then(function(response){
                return cache.put(pictureUrl, response)
            })
        })
    );
});

self.addEventListener('activate', function(ev){
    console.log('SERVICE WORKER ACTIVATION...');

    // OVDE SAM DEFINISAO CLAIMING SVIH CLIENAT-A

    ev.waitUntil(
        clients.claim()
    );
});

self.addEventListener('fetch', function(ev){

    // NAKON AKTIVACIJA fetch SE MOZE TRIGGER-OVATI
    // A TRIGGER-OVACE SE KAO REZULTAR DEFINISANJAONOG src PROPERTIJA ZA SLIKU
    // STO SAM DEFINISAO DA SE DOGODI ODLOZENO NAKON OKO 4 SEKUNDE

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
});
```

****

SA GOOGLE DEV STRANICE:

>>>> You should see a image of computer monitor the first time. I say "should", because this is timing sensitive. You'll only see a image of computer monitor if the service worker activates and clients.claim() takes effect before the image tries to load.

>>>> If you use your service worker to load pages differently than they'd load via the network, clients.claim() can be troublesome, as your service worker ends up controlling some clients that loaded without it.

>>>> Note: I see a lot of people including clients.claim() as boilerplate, but I rarely do so myself. It only really matters on the very first load, and due to progressive enhancement the page is usually working happily without service worker anyway. (Jake Archibald)

## UPDATING THE SERVICE WORKER :palm_tree:

UKRATKO:

- **UPDATE CE BITI TRIGGERED, KADA SE BILO STA OD SLEDECEG NAVEDENOG DOGODI**

    - NAVIGACIJA DO, IN-SCOPE STRANICE

    - FUNCTIONAL EVENTS, KAO STO SU **push** I **sync**, SEM AKO SE NIJE DESIO UPDATE CHECK TOKOM PREDHODNA 24 CASA;

    - POZIVANJE .register() SAMO ONDA KADA SE URL SERVICE WORKER-A, PROMENIO (ALI TREBAS IZBECI MENJANJE URL-A, TVOG SERVICE WORKER SCRIPT-A (A O TOME CU GOVORITI I KASNIJE))

- OVO SLEDECE BAS I NE RAZUMEM (ALI CU OSTAVITI [LINK](https://developers.google.com/web/updates/2018/06/fresher-sw#updateviacache) KAKO BI SE OVIME POZBAVIO)

>>> Most browsers, [including Chrome 68 and later](https://developers.google.com/web/updates/2018/06/fresher-sw), default to ignoring caching headers when checking for updates of the registered service worker script. They still respect caching headers when fetching resources loaded inside a service worker via importScripts(). You can override this default behavior by setting the updateViaCache option when registering your service worker.

- TVOJ SERVICE WORKER SE SMATRA UPDATE-OVANIM, AKO JE RAZLICIT U SAMO JEDNOM BYTE-U, OD ONOGA KOJI BROWSER, TRENUTNO IMA (We're extending this to include imported scripts/modules too.)

- **UPDATED SERVICE WORKER, JE LAUNCHED ALONGSIDE ONOG KOJI JE POSTOJECI, I DOBIJA SVOJ SOPSTVENI install EVENT**

- **AKO TVOJ NOVI SERVICE WORKER IMA NON-OK STATUS CODE (NA PRIMER 404), AKO FAILS TO PARSE, THROW-UJE ERROR TOKOM EXECUTION-A, ILI REJECTS DURING INSTALL, NEW WORKER IS THROWN AWAY, BUT  THE CURRENT ONE REMAINS ACTIVE**

- **KADA JE SUCCESSFULLY INSTALLED, UPDATE-OVAN WORKER CE CEKATI (wait), SVE DOK POSTOJECI WORKER NE BUDE KONTROLISAO NULA CLIENTS** (IMAJ U VIDU DA SE CLIENT-I OVERLAP (PREKLAPAJU), TOKOM REFRESH-A)

- **self.skipWaiting()** SPRECAVA (PREVENTS) TO CEKANJE, STO ZNACI DA CE SERVICE WORKER BITI AKTIVIRAN, ODMAH NAKON ZAVRSI SA INSTALIRANJEM

****

**PRIMER:**

:cd: CODE SERVICE WORKERA, PRE UPDATE-OVANJA:

```javascript
const CACHE_NAME = 'page-cache-v1';
const carUrl = '/images/car.jpg';

self.addEventListener('install', function(ev){
    ev.waitUntil(
        self.caches.open(CACHE_NAME)
        .then(function(cache){
            self.fetch(carUrl)
            .then(function(response){
                cache.put(carUrl, response.clone());
            })
        })
    )
})

self.addEventListener('activate', function(ev){
    console.log('v1 instlation completed, acivating now...');
});

self.addEventListener('fetch', function(ev){
    const url = new URL(ev.request.url);

    if(url.origin === location.origin && url.pathname === '/images/monitor.jpg'){
        ev.respondWith(
            self.caches.open(CACHE_NAME)
            .then(function(cache){
                return cache.match(carUrl)
                .then(function(response){
                    return response.clone();
                })
            })
        )
    }
});
```

:dvd: ONO STO CU SADA URADITI, JESTE IZMENITI SCRIPT SERVICE WORKER-A (GORNJI CODE, CE DAKLE ZAMENITI SLEDECIM), A ONO STA ZELIM DA DEFINISEM JESTE DA SCRIPT RESPONDUJE SA SLIKOM ZIRAFE, UMESTO SA SLIKOM AUTOMOBILA

```javascript

// DEFINISAO SAM niz, A TAJ NIZ TREBA DA IMA IMENA NOVIH CACHE-OVA
// ZA SADA TO JE SAMO JEDNO IME, ODNONO TO JE DRUGA VERZIJA CACHE-A MOG PAGE-A (ALI JE IDEJA DA U BUDUCE 
// IMAM NIZ, JER CE TAK OBITI CONVINIET ZA BUDUCE UPDATE-OVE)
const cacheWhitelist = ['page-cache-v2'];
// URL NOVE SLIKE KOJA TREBA DA SE CACHE-UJE (ZELI MNJOME DA ZAMENIM ONU KOJA SE SADA SERVUJE UMESTO SLIKE MONITORA)
const giraffeUrl = '/images/animal.jpg';

self.addEventListener('install', function(ev){
    // DAKLE ON INSTALL, JA CACHE-IRAM NOVU SLIKU, KOJA JE SLIKA ZIRAFE
    console.log('v2 instalation...');

    ev.waitUntil(
        self.caches.open('page-cache-v2')
        .then(function(cache){
            return self.fetch(giraffeUrl)
            .then(function(response){
                return cache.put(giraffeUrl, response.clone());
            })
        })
    );

});

self.addEventListener('activate', function(ev){
    console.log('v2 activating...');

    // DEFINISEM BRISANJE SVIH CASHE-OVA, KOJI NISU 'page-cahe-v2', ODNOSNO IZUZEV ONIH CACHEA
    // KOJI SU DEO WHITELIST-E CACHE-A
    // NA TAJ NACIN CU SE OTARASITI CACHE-A 'page-cache-v1'

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
        .then(function(){
            console.log('v2 activated and ready to handle fetches...')
        })
    )
});

self.addEventListener('fetch', function(ev){
    const url = new URL(ev.request.url);

    // SERVIRANJE SLIKE ZIRAFE KADA SE REQUEST-UJE SLIKA monitor.jpg

    if(url.origin === location.origin && url.pathname === '/images/monitor.jpg'){
        ev.respondWith(
            self.caches.open('page-cache-v2')
            .then(function(cache){
                return cache.match(giraffeUrl)
                .then(function(response){
                    return response.clone();
                })
            })
        );
    }
});
```

****

DAKLE, RANIJE, PRE NEGO STO SAM DEFINISAO UPDATING, PRIKAZIVALA SE SLIKA AUTOMOBILA, JER SAM DEFINISAO DA SE onfetch, ONA SERVE-UJE, UMESTO SLIKE RACUNARA, ODNOSNO MONITORA

**ALI SADA, I DALJE CE SE PRIKAZIVATI SLIKA AUTOMOBILA**

ZASTO? PA OBJASNICU TO U SLEDECIM PODNASLOVIMA

### INSTALL :seedling:

TREBAS IMATI NA UMU DA, KADA DEFINISES NOVI CACHE 'page-cahe-v2', TO ZNACI DA SI PODESIO NOVI CACHE, BEZ DA SI OVERWRITE-OVAO STVARI U ONOM TRENUTNOM CACHE-U ('page-cache-v1'), A KOJEG STARI SERVICE WORKER I DALJE KORISTI

OVAKAVI PATTERN-OVI, KREIRAJU VERSION-SPECIFIC CACHE-OVE, SRODNE (AKIN) ONIM ASSET-OVIMA KOJE BI NATIVE APP BOUNDLE-OVALA, SA SVOJOM EXECUTABLE (NE ZNAM STA JE TO JER MI NIJE POZNAT NATIVE CODE)

TAKODJE TI MOZES IMATI I CACHE-E, KOJI NISU VERSION-SPECIFIC, KAO STO JE NA PRIMER CACHE, KOJI BI NOSIO IME *'avatars'* (PREDPOSTAVLJAM DA BI ON BIO JEDAN OD CASHE-OVA, CIJA BIH STRING IMENA DEFINISAO KAO CLANOVE NIZA, KOJI JE U GORNJEM PRIMERU SKLADISTILA VARIJABLA cacheWhitelist)

### WAITING :seedling:

NAKON STO JE SUCCSESSFULLY INSTALLED, UPDATE-OVANI SERVICE WORKER, USTVARI ODLAZE AKTIVACIJU, SVE DOK TRENUTNI SERVICE WORKER PRESTANE DA KONTROLISE CLIENTS-E

OVO STANJE SE NAZIVA **WAITING**

I UPRAVO POMENUTIM STANJEM, BROWSER OSIGURAVA DA POSTOJI SAMO JEDNA VERZIJA, KOJA SE, TRENUTNO RUNN-UJE

**DAKLE, TI I DALJE VIDIS SLIKU AUTOMOBILA, JER SE *V2* WORKER, NIJE JOS AKTIVIRAO**

A MOZES VIDETI, DA JE NOVI SERVICE WORKER U STANJU WAITING-A, TAKO STO CES OTVORITI **Application" tab of Chrome DevTools**-A

**CAK IAKO IMAS OTVOREN, SAMO JEDAN TAB, REFRESHING STRANICE, NIJE DOVOLJAN DA SE NOVOJ VERZIJI OMOGUCI TO TAKE OVER, DA ONA BUDE IN CONTROL**

>>> This is due to how browser navigations work

>>> When you navigate, the current page doesn't go away until the response headers have been received, and even then the current page may stay if the response has a [Content-Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) header.

>>> Because of this overlap, the current service worker is always controlling a client during a refresh.

>>> To get the update, close or navigate away from all tabs using the current service worker. Then, when you navigate to the demo again, you should see the GIRAFFE.

>>> This pattern is similar to how Chrome updates. Updates to Chrome download in the background, but don't apply until Chrome restarts. In the mean time, you can continue to use the current version without disruption. However, this is a pain during development, but DevTools has ways to make it easier, which I'll cover later in this article.

**DAKLE I DA OTVORIM NOVI TAB ZA MOJU APLIKACIJI, NE BIH SE, MOJ NOVI SERVICE WORKER AKTIVIRAO**

**DAKLE, POTREBNO JE ZATVORITI TAB MOJE APLIKACIJE, I ONDA GA OPET OTVORITI, I TEK CE SE TADA SERVICE WORKER AKTIVIRATI, I MOCI CE DA RECEIVE-UJE fetch EVENTS**

### ACTIVATE :seedling:

OVO SE FIRE-UJE, ONDA, KADA JE OLD SERVICE WORKER, GONE, I KAD JE TVOJ NOVI SERVICE WORKER U MOGUCNOSTI DA KONTROLISE CLIENTS-E

OVO JE IDEALNO VREME DA URADIS STVARI, KOJE NISI MOGAI, KADA JE STARI SERVICE WORKER BIO, STILL IN USE, KAO STO SU MIGRATE-OVANE DATABASES-SOVA, I CREAR-OVANJE CACHE-OVA

U PRIMERU GORE, JA MAINTAIN-UJEM LISTU CACHE-OVA, ZA KOJE OCEKUJEM DA BUDU TAMO (VARIJABLA cacheWhitelist), A PO TRIGGER-U activate EVENT-A, JA SE OTARASLJAVAM, BILO KOJIH DRUGIH CACHE-OVA, A U GORNJEM PRIMERU JA SAM UKLONIO 'page-cache-v1'

>>>> Caution: You may not be updating from the previous version. It may be a service worker many versions old.

If you pass a promise to event.waitUntil() it'll buffer functional events (fetch, push, sync etc.) until the promise resolves. So when your fetch event fires, the activation is fully complete.

>>>> Caution: The cache storage API is "origin storage" (like localStorage, and IndexedDB). If you run many sites on the same origin (for example, yourname.github.io/myapp), be careful that you don't delete caches for your other sites. To avoid this, give your cache names a prefix unique to the current site, eg myapp-static-v1, and don't touch caches unless they begin with myapp-.

### SKIPPING WAITING PHASE (PRESKAKANJE WAITING FAZE) :seedling:

WAITING FAZA OSIGURAVA DA SAMO RUN-UJES JEDNU VERZIJI SVOG SITE-A, ISTOVREMENO; ALI AKO TI NIJE POTREBAN, TAJ FEATURE, MOZES UCINITI DA TVOJ SERVICE WORKER POSTANE, ACTIVATED SOONER, TAKO STO CES POZVATI

- **self.skipWaiting()**

OVO OMOGUCAVA DA TVOJ NOVI SERVICE WORKER, KICK-UJE OUT, CURRENT ACTIVE WORKER-A, I AKTIVIRA SE STO JE SKORIJE MOGUCE NAKON ULASKA U WITING FAZU, ILI ODMAH (IMMEDIATELLY) AKO JE VEC U WAITING FAZI

**OVO NECE PROUZROKOVATI DA TVOJ SERVICE WORKER SKIP-UJE INSTALACIJU, VEC SAMO WAITING**

**NEMA ZAISTA VEZE, KADA SE TO TREBA POZVATI self.skipWaiting(), AL ITO MORA DA BUDE PRE WAITINGA IL IDURING WAITING (TOKO MWAITING-A)**

**UOBICAJENO JE DA SE POZOVE U ON install HANDLER-U**

```javascript
self.addEventListener('install', function(ev){
    self.skipWaiting();

    ev.waitUntil(
        // CACHING, ITD.
    )
})
```

****

(SLEDECI PRIMER (DA, URADICU JEDAN PRIMER) CU JOS JEDNOM URADITI U SLEDECEM md FAJLU, KADA SE
BOLJE UPOZNAM SA PROPERTIJIMA ServiceWorkerRegistration INSTANCE, ALI I KADA SE POZABAVIM SA state PROPERTIJEM ServiceWorker INSTANCE)

:alien:

**ALI TI MOZES DA POZOVES *self.skipWaiting()*, KAO REZULTAT postMessage(), ODNOSNO SLANJA PORUKE, IZ NEKOG DRUGOG SCRIPTA, ODNOSNO IZ MAIN SCRIPTA**

**I TO MOZE BITI REZULTAT KORISNIKOVE INTERAKCIJE**

ISKORISTICU PROSLI PRIMER DA TO DEFINISEM. A STA CU USTVARI URADITI

- U MAIN SCRIPTU CU DEFINISATI, DA SE DUGME RENDERUJE, SAMO U SLUCAJU KADA SE POKRENE UPDATE-OVANJE; I ONO STO CU TADA KORISTITI U MAIN SCRIPTU, JESTE **updatefound** EVENT; TAJ EVENT CE SE PREDPOSTAVLJAM TRIGGEROVATI ZA **ServiceWorkerRegistration** INSTANCU; A TA INSTANCA JESTE INSTANCA, SA KOJOM JE RESOLVED Promise, KOJI JE POVRATNA VREDNOST navigator.serviceWorker.register('/sw.js') METODE

- NA TOM DUGETU KACIM ON mousedown HANDLER, KOJI TREBA DA POSALJE PORUKU (postMessage) THREAD-U, SERVICE WORKERA (ALI NOVOG SERVICE WORKER-A)

- A NA TU PORUKU, DEFINISACU DA SERVICE WORKER, ODGOVARA TIME DA EXECUTE-UJE self.skipWaiting()

**main.js** FILE:

```javascript
window.navigator.serviceWorker.register('/service-worker.js')
.then(function(regi){   // IZ REGISTRACIJE PROIZILAZI Promise RESOLVED SA       ServiceWorkerRegistration       INSTANCOM

    regi.onupdatefound = function(){

        console.log('UPDATEFOUND !!!!');

        // NOVOM WORKERU MOGU PRITUPITI TAKO STO PRISTUPIM installing PROPERTIJU (OBRATI PAZNJU DA OVO MOZE BITI I ONAJ PRVI WORKER
        //                                                                      PRE UPDATE-A, IAKO JA ZELIM ONOG NOVOG UPDATED WORKER-A) 
        const newWorker = regi.installing;

        // JA DUGME ZELIM DA KREIRAM SAMO KADA POSTOJI NOVI SERVICE WORKER, KOJI UPDATE-UJE (I KOJI CEKA DA SE ZATVORI TAB, PA PONOVO OTVORI)
        // DAKLE, SLEDECI USLOV CE BITI TACAN, KADA IMAM NOVOG SERVICE WORKERA, KOJI JE U FAZI INSTALIRANJA, I IMAM, TRENUTNOG KOJI JE
        // IN CONTROLL
        if(newWorker && window.navigator.serviceWorker.controller){

            // TADA KREIRAM DUGME, KOJE CE POSLATI PORUKU SERVICE WORKER-U DA PREKINE SA CEKANJEM

            const button = document.createElement('button');
            button.textContent = "skip waiting";
            document.body.prepend(button);

            button.onmousedown = function(ev){
                console.log(window.navigator.serviceWorker.controller);

                // OBRATI PAZNJU DA TI NOVOM SERVICE WORKERU, ZELIS DA STAVIS DO ZNANJA DA PREKINE CEKANJE
                // (OVO KAZEM, JER MOZES SLUCAJNO ZAPASTI U ZABLUDU, PA ONOM CURRENT SERVICE WORKER-U (CONTROLLER-U) POSLATI PORUKU
                // A TO NE ZELI MDA URADIM

                newWorker.postMessage('skip waiting');
                ev.target.onmousedown = null;
                ev.target.disabled = true;
            }
        }

    }

});

///////////////////////////////////////////////////

const image = new Image();

image.style.width = '38vw';
image.rel = "syntwave image";

window.setTimeout(function(image){
    document.body.prepend(image);
    image.src = "/images/monitor.jpg";
}, 3800, image);
```

**service-worker.js** FAJL (**PRE UPDATE-OVANJA**)

```javascript
const CACHE_NAME = 'page-cache-v1';
const carUrl = '/images/car.jpg';

self.addEventListener('install', function(ev){
    ev.waitUntil(
        self.caches.open(CACHE_NAME)
        .then(function(cache){
            self.fetch(carUrl)
            .then(function(response){
                cache.put(carUrl, response.clone());
            })
        })
    )
});

self.addEventListener('activate', function(ev){
    console.log('v1 instlation completed, acivating now...');
});

self.addEventListener('fetch', function(ev){
    const url = new URL(ev.request.url);

    if(url.origin === location.origin && url.pathname === '/images/monitor.jpg'){
        ev.respondWith(
            self.caches.open(CACHE_NAME)
            .then(function(cache){
                return cache.match(carUrl)
                .then(function(response){
                    return response.clone();
                })
            })
        )
    }
});
```

**service-worker.js** FAJL, **NAKON UPDATE-OVANJA** (IL IDA GA NZOVEM NOVI MSERVICE WORKER-OM (TO JE ONAJ KOJI CEKA))

```javascript

// DEFINISAO SAM DA NOVI SERVICE WORKER, AKO PRIMI, ODGOVARAJUCU PORUKU IZ MAIN SCRIPT-A
// POZOVE self.skipWaiting()

self.addEventListener('message', function(ev){
    console.log('MESSAGE', ev);
    if(ev.data === 'skip waiting'){
        self.skipWaiting();
    }
});

///////////////////////////////////////////////////////////

const cacheWhitelist = ['page-cache-v2'];
const giraffeUrl = '/images/animal.jpg';

self.addEventListener('install', function(ev){

    console.log('v2 instalation...');

    ev.waitUntil(
        self.caches.open('page-cache-v2')
        .then(function(cache){
            return self.fetch(giraffeUrl)
            .then(function(response){
                return cache.put(giraffeUrl, response.clone());
            })
        })
    );

});

self.addEventListener('activate', function(ev){
    console.log('v2 activating...');

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
        .then(function(){
            console.log('v2 activated and ready to handle fetches...')
        })

    )
});

self.addEventListener('fetch', function(ev){
    const url = new URL(ev.request.url);

    if(url.origin === location.origin && url.pathname === '/images/monitor.jpg'){
        ev.respondWith(
            self.caches.open('page-cache-v2')
            .then(function(cache){
                return cache.match(giraffeUrl)
                .then(function(response){
                    return response.clone();
                })
            })
        );
    }
});
```

SADA KADA SE DESI UPDATING, DUGME CE SE POJAVITI, A KADA PRITISNEM DUGME, POSLACE SE PORUKA NOVOM SERVICE WORKERU, DA PRESTANE SA WAITING FAZOM, I DA SE POTPUNO INSTALIRA I AKTIVIRA

**GOVORICU JA JOS O SVIM PROPERTIJIMA ServiceWorkerRegistration INSTANCE; TOKOM OVOG PRIMERA SAM IH SAMO MALO DOTAKAO**

****

>>>> Caution: skipWaiting() means that your new service worker is likely controlling pages that were loaded with an older version. This means some of your page's fetches will have been handled by your old service worker, but your new service worker will be handling subsequent fetches. If this might break things, don't use skipWaiting().

**DAKLE U GORNJEM CITATU JE RECENO, ZASTO SE self.skipWaiting, UOPSTE NE TREBA KORISTITI**

### MANUAL UPDATES :seedling:

KAO STO JE I RECENO RANIJE:

**BROWSER CHECKS FOR UPDATES, AUTOMATSKI, NAKON NAVIGATIONING-A, I FUNCTIONAL EVENT-OVA**

**ALI ONI MOGU BITI [TRIGGERED I MANUALLY](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update)**

```javascript
navigator.serviceWorker.register('/sw.js')
.then(function(regi){
    // sometime later...

    regi.update();
})
```

>>> If you expect the user to be using your site for a long time without reloading, you may want to call update() on an interval (such as hourly).

### IZBEGAVAJ PROMENE URL-A, TVOG SERWICE WORKER SCRIPT-A

[TREBA SE PROCITATI JACKE ARCHIBALD-OV POST O NAJBOLJIM PRAKSAMA](https://jakearchibald.com/2016/caching-best-practices/)

NAIME, MOZDA RZMOTRAS TO, DA DAJES, SVAKOJ VERZIJI SVOG SERVICE WORKERA, NJEGOV UNIQUE URL

**NEMOJ TO RADITI!!!**

OVO JE NAJCESCE LOSA PRAKSA

**POTREBNO JE UPDATE-OVATI SCRIPT NA NJEGOVOJ TRENUTNOJ LOKACIJI**

TO JE IZ RAZLOGA KOJI SU U OVOM CITATU

> It can land you with a problem like this:

>> index.html registers sw-v1.js as a service worker.
>> sw-v1.js caches and serves index.html so it works offline-first.
>> You update index.html so it registers your new and shiny sw-v2.js.
>> If you do the above, the user never gets sw-v2.js, because sw-v1.js is serving the old version of index.html from its cache. You've put yourself in a position where you need to update your service worker in order to update your service worker. Ew.

## MAKING DEVELOPMENT EASY :electric_plug:

>>> The service worker lifecycle is built with the user in mind, but during development it's a bit of a pain. Thankfully there are a few tools to help out:

### UPDATE ON RELOAD

U SERVICE WORKER SEKCIJI , KOJA SE NALAZI U APPLICATION SEKCIJI DEV TOOLS-A, POSTOJI MOGUCNOST DA SE CHECK-IRA **Update on reload**

SVAKI NAVIGATION NA STRANICI CE URADITI I SLEDECE:

- REFETCH-OVATI SERVICE WORKER

- INSTALIRACE GA, KAO NOVU VERZIJU, CAK IAKO JE BYTE-IDENTICAL, STO ZNACI DA CE SE TRIGGER-OVATI install EVENT,  I TVOJ CACHE CE SE UPDATE-OVATI

- PRESKOCICE WAITING FAZU KAKO BI SE NOVI SERVICE WORKER AKTIVIRAO

- NAVIGATE-OVACE STRANICU

OVO ZNACI DA CES DOBITI UPDATE-OVE NA SVAKI NAVIGATIONING (UKLJUCUJUCI I REFRESH), BEZ TOGA DA CES MORATI DA RELOAD-UJES DVA PUTA ILI ZATVORIS TAB

### SKIP WAITING

U APPLICATION SEKCIJI DEV TOOLSA (U DELU ZA SERVICE WORKER-E), TAKODJE POSTOJI MOGUCNOST DA SE PRITISE skipWaiting

TAKO NOVI SERVICE WORKER, POSTATI IMMEDIATELLY PROMOTED U 'active'

### Shift-RELOAD

AKO URADIS FORCE-RELOAD STRANICE (shift + reload), BYPASS-OVACES SERVICE WORKER U POTPUNOSTI

BICE *UNCONTROLLED*

OVAJ FEATURE JE U SPECIFIKACIJAMA, TAKO DA RADI I U DRUGIM BROWSER-IMA, KOJI SUPPORT-UJU SERVICE WORKER-E

## HANDLE-OVANJE UPDATE-OVA :shell:

[PROCITAJ SA LINKA ZASTO JE SVAKI PROCES, KOJI SE TICE BROWSER-A, USTAVRI MOGUCE OBSERVOVATI](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#handling_updates) (POSTOJI I PETICIJE KOJE DEV-OBVI PISU BROWSERIMA, KAKO NE BI POSTOJALI SAMO, USKI HIGH-LEVEL API-JEVI)

U SUSTINI, TO SE TICE I SERVICE WORKER-A

A ONO STO JE ZBOG TOGA IMPLEMETIRANO JESTE SLEDECE

MOGUCE JE OBSERVE-OVATI RAZNE PROCESE, U POGLEDU TVOJIH SERVICE WORKER-A, KAO STO JE INSTALACIJA, I UPDATING, I TO SVE KROZ

- [ServiceWorkerRegistration INSTANCU](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration)

**TO JE ONO STO SAM KORISTIO U PROSLOM PRIMERU, KAKO BIH postMessage MOM SERVICE WORKERU, KADA SE UPRAVO NESTO DOGODILO SA SERVICE WORKEROM (U TOM SLUCAJU RADIO SAM NESTO KAO REZULTAT UPDATING-A)**

ZATO JE NAJBOLJE PROCITATI, SVE O TOJ INSTANCI

DAKLE,, SVE O NJENIM PROPERTIJIMA, METODAMA I EVENT-OVIMA
