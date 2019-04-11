# REGISTRATION

SERVICE WORKERI, MOGU ZNACAJNO UBRZATI PONOVNE POSETE (REPEAT VISITS), MOJOJ WEB APLIKACIJI, ALI TREBAS PREDUZETI KORAKA, KAKO BI OMOGUCIO DA INICIJALNA INSTLACIJA SERVICE WORKER-A, NE DEGRADIRA KORISNIKOV FIRST VISIT EXPERIENCE

**ONO STO BIH TREBAO URADITI, JESTE ODLAGANJE REGISTRACIJE, DOK INITAL PAGE NIJE ZAVRSILA SA LOAD-OVANJEM**

```javascript
window.addEventListener('load'. function(){
    // OVDE OTPOCETI REGISTRACIJU
});
```

OVO CE OBEZBEDITI BEST EXPERIENCE ZA KORISNIKA, NAROCITO ONE KOJI SU NA MOBILNIM UREDJAJIMA SA SLOWER NETWORK CONNECTION-OM

## UOBICAJENI REGISTRATION BOILERPLATE

DAKLE, PRE BILO KOG DEFINISANJA NEOPHODNA JE PROVERA DA LI BROWSER PODRZAVA SERVICE WORKER-E

```javascript
if('ServiceWorker' in window.navigator){
    //
}
```

NA SLEDECEM LINKU SE NALAZI [CODE REGISTRACIJE, KOJI JE TAKODJE, VEOM DETALJNO KOMENTARISAN](https://github.com/GoogleChromeLabs/sw-precache/blob/master/demo/app/js/service-worker-registration.js#L20); ODNOSNO DETALJNO JE OBJASNJEN I SAV ONAJ CODE, KOJI SE MOZE NACI U OBIMU ON **updatefound** HANDLER-A, *ServiceWorkerRegistration* INSTANCE

ZATO CU I JA UPRAVO POSMATRATI TAJ CODE, PA CU I KREIRATI SVOJU VERZIJU, KOJU CU ISKOMENTARISATI, SA MENI LOGICNIM KOMENTARIMA

```javascript
'use strict';

if('ServiceWorker' in window.navigator){

    // ODLOZI REGISTRACIJU, SVE DOK SE INITIAL PAGE, MOJE APLIKACIJE, NE LOAD-UJE
    window.addEventListener('load', function(){

        navigator.serviceWorker.register('/service-worker.js')
        .then(function(regiOb){
            // OVOM CALLBACKU SE PROSLEDJUJE ServiceWorkerRegistration INSTANCA

            // EVENT        'updatefound'           SE TRIGGER-UJE SVAKI PUT, KADA SE SERVICE WORKER PROMENI

            // ALI TRIGGERUJE SE I NA POCETKU
            // ODNOSNO BOLJE DA KAZEM DA SE POMENUTI EVENT TRIGGER-UJE, NA POCETKU INSTLACIJIJE SERVICE
            // WORKERA, I KADA SE SERVICE WORKER UPDATE-UJE (UPDATE JE, USTVARI PROMENA NA FAJLU SERVICE
            // WORKER-A, (ODNOSNO TO JE INSTLACIJA NOVOG WORKERA)) (ALI IPAK DA NE SIRIM PRICU O TOME
            // JER SAM O TOME GOVORIO U PROSLOM md FAJLU)

            // DAKLE, REC JE O PROMENAMA, TAKO DA JE VALIDNO RECI DA SE OVAJ EVENT TRIGGER-UJE, KADA SE DESI
            // PROMENA NA SERVICE WORKER-U, BILO DA JE TO INSTLACIJA ILI UPDATE

            regiOb.onupdatefound = function(){

                // U OBIMU, OVOG HANDLER, JA MOGU PRISTUPITI, ONOM SERVICE WORKERU, KOJI SE INSTALIRA
                // BILO TO INSTALIRANJE PRVOG SERVICE WORKER-A, ILI UPDATE (ODNOSNO INSTALIRANJE NOVOG)

                let instalirajuciWorker = regiOb.installing;     // ServiceWorker INSTANCA

                // MEDJUTIM, OVAJ, INSTALLING SERVICE WORKER, MOZE BITI, U NEKOLIKO STANJA

                // KOJA SE MOGU SAZNATI IZ SLEDECEG PROPERTIJA:
                                                                        instalirajuciWorker.state

                // - "installing"         ('install' EVENT JE FIRED, ALI NIJE JOS COMPLETED)
                // - "installed"          (INSTALATION COMPLETED)
                // - "activating"         ('activate' EVENT JE FIRED, ALI NIJE JOS COMPLETED)
                // - "activated"          (ACTIVATION COMPLETED)
                // - "redundant"          (SERVICE WORKER JE DISCARDED. NAIME ILI JE INSTLATION FAILED, ILI
                //                          JE REPLACED SA NOVIJOM VERZIJOM)

                // TA STANJA MOGU PRATITI, TAKO STO SLUSAM              'statechange'       EVENT NA
                // POMENUTOJ ServiceWorker INSTANCI

                instalirajuciWorker.onstatechange = function(){
                    
                    // OVDE CU KORISTITI        switch      STATEMENT, KAKO BIH DEFINISAO RAZLICIT CODE
                    // U SLUCAJU RAZLICITIH STATE-OVA INSTALIRAJUCEG SERVICE WORKER-A


                }

            }

        })

    })
}


```