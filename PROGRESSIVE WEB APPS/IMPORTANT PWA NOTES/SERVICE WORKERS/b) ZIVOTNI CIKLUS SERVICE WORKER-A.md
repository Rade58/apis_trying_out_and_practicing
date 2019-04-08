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

- **clients.claim()**

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

* **UPDATE CE BITI TRIGGERED, KADA SE BILO STA OD SLEDECEG NAVEDENOG DOGODI**

* Bullet list
              * Nested bullet
                  * Sub-nested bullet etc
          * Bullet list item 2