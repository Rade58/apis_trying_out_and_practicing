# THE SERVICE WORKER LIFECYCLE

>The lifecycle of the service worker is its most complicated part.

AKO NE ZNAS STA ON POKUSAVA DA URADI, I KOJ ISU NJEGOVI BENEFITI, MOZES IMATI OSECAJ KAO DA SE BORI SA TOBOM

ALI KADA SAZNAS KAKO RADI, MOZES DELIVER-OVATI SEAMLESS ('''You use seamless to describe something that has no breaks or gaps in it or which continues without stopping.'''), NENEMETLJIVE (unobtrusive), UPDATE-OVE KORISNIKU, MIKSUJUCI NAJBOLJE WEB I NATIVE PATTERN-E

I KAKO Jake Archibald KAZE:

>>> This is a deep dive, but the bullets at the start of each section cover most of what you need to know.

## INTENT (NAMERA)

NAMER LIFECYCLE-A SERVICE WORKER-A, JESDE DA

- UCINI OFFLINE-FIRST, MOGUCIM

- DOZVOLI NOVOM SERVICE WORKER-U, DA POSTANE READY, BEZ TOGA DA DISRUPT-UJE, TRENUTNI SERVICE WORKER

- OBEZBEDI DA JE, STRANICA U OBIMU (IN SCOPE PAGE) KONTROLISANA OD STRANE ISTOG SERVICE WORKER-A (ILI NI JEDNOG SERVICE WORKER-A), TOKOM CELOG PERIODA

- OBEZBEDI DA SE, SAMO JEDNA JEDINA VERZIJA MOG SAJTA, TRENUTNO POKRECE

**OVO POSLEDNJE JE JAKO VAZNO**

BEZ SERVICE WORKER-A, KORISNIK MOZE LOAD-OVATI JEDAN TAB ZA MOJ SITE, I ONDA MOZE OTVORITI JOS JEDAN; STO MOZE REZULTOVATI TIME DA DVE VERZIJE MOG SITE-A, RUN-UJU ISTOVREMEN-O

PONEKAD POMENUTO JESTE OK, ALI NAJCESCE BI PROUZROKOVALO NEZELJENOSTI, JER DVA TABA-A BI IMALA DRUGACIJE MISLENJE O TOME KAKO TREBA DA SE MENAGE-UJU, NJIHOV SHARED STORAGE (DAKLE OVO MOZE UZROKOVATI ERRORS, ILI JOS KORE DATA LOSS)

**PAZLJIVO!***KORISNICI AKTIVNO DISLIKE-UJU GUBITAK PODATAKA, TO IM ZADFAJE VELIKU TUGU*

## PRVI SERVICE WORKER

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

SKRIPT OVE STRANCE REGISTRUJE SERVICE WORKER-A, I ONO STA JOS RADI JESTE DA DODAJE SLIKU PSA STRANICI, NAKON 3 SEKUNDE

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

OVO ZNACI DA CE SE PRILIKO MPRVOG OTVARANJA STRANICE, UCITATI SLIKA PSA, A KADA KORISNIK RELOAD-UJE STRANICU, ONO STO CE BITI UCITANO JESTE SLIKA MACKE

****