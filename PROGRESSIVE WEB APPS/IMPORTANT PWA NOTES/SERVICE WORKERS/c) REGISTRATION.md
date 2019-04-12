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
                // ALI MOZE SE PRISTUPITI SERVICE WORKERU, KOJI JE U DRUGOM STANJU, KAO STO JE AKTIVACIJA ILI WAITING

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                let instalirajuciWorker = regiOb.installing;    // ServiceWorker INSTANCA U STANJU INSTALIRANJA, ILI JE INSTALIRANA

              ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                let cekajuciWorker = regiOb.waiting;            // ServiceWorker INSTANCA U STANJU CEKANJA NA AKTIVACIJU (OVO JE
                                                                // INSTALLED INSTANCA, KOJA CEKA AKTIVACIJU)

                // DAKLE, PREDHODNIM CODE-OM SE MOZE PRISTUPITI WAITING SERVICE WORKER-U, ALI I INSTALLED SERVICE WORKER

                // ONDA, PREDPOSTAVLJAM DA JE TACNA, MOJA PREDPOSTAVKA DA JE MOGUCE DA BUDE TACNO SLEDECE:

                                                                regiOb.installing === regiOb.waiting

              ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                let activeWorker = regiOb.active;               // ServiceWorker INSTANCA U STANJU AKTIVIRANJA ILI ACTIVATED

              /*********************************************************************************************************************/

                // MEDJUTIM, SERVICE WORKER-OVOM, STATE-U MOZE BITI PRISTUPLJENO I PREKO SAMOG ServiceWorker-A

                // KOJA SE MOGU SAZNATI IZ    state    PROPERTIJA:
                                                                        instalirajuciWorker.state
                                                    // MOGUCE VREDNOSTI:

                                                        // - "installing"         ('install' EVENT JE FIRED, ALI NIJE JOS COMPLETED)
                                                        // - "installed"          (INSTALATION COMPLETED)

                                                                        cekajuciWorker.state
                                                    // MOGUCE VREDNOSTI:

                                                        // - "installed"          (INSTALATION COMPLETED)

                                                                        activeworker.state
                                                    // MOGUCE VREDNOSTI:

                                                        // - "activating"         ('activate' EVENT JE FIRED, ALI NIJE JOS COMPLETED)
                                                        // - "activated"          (ACTIVATION COMPLETED)


                                                // SERVICE WORKER MOZE BITI, I U SLEDECEM STANJU

                                            // - "redundant"          (SERVICE WORKER JE DISCARDED. NAIME ILI JE INSTLATION FAILED, ILI
                                            //                          JE REPLACED SA NOVIJOM VERZIJOM)

                // TA STANJA MOGU PRATITI, TAKO STO SLUSAM              'statechange'       EVENT NA
                // POMENUTOJ ServiceWorker INSTANCI



                instalirajuciWorker.onstatechange = function(){

                    // OVDE CU KORISTITI        switch      STATEMENT, KAKO BIH DEFINISAO RAZLICIT CODE
                    // U SLUCAJU RAZLICITIH STATE-OVA INSTALIRAJUCEG SERVICE WORKER-A

                    switch(instalirajuciWorker.state){

                        case 'installed':

                            if(navigator.serviceWorker.controller){ /*DAKLE, KADA JE SERVICE WORKER INSTALIRAN COMLETELLY */
                                                                    /* I KADA POSTOJI SERVICE WORKER, KOJI CONTROLISE PAGE ASSETS */
                                                                    /* I MISLIM DA SE OVDE RADI O JEDNOM TE ISTOM ServiceWorker-U */
                                                                    /* A DA JE BILO RECI O 'installing' STATE-U, TADA
                                                                    BI NOVI WORKER BIO ONAJ KOJ ISE INSTALIRA I JOS NIJE ZAVRSIO 
                                                                    INSTALACIJU, DOK BI STARI WORKER, JOS BIO IN CONTROL */

                                // U OVOJ TACKI, STARIJI CONTENT BI BIO OCISCEN (PURGED)
                                // I SVEZI CONTENT BI BIO DODAT U CACHE

                                // SAVRSENO VREME DA SE DISPLAY-UJE:
                                                                        "New, or updated content is awailable, please refresh"
                                // U PAGE-OVOM INTERFACE-U

                                console.log('Novi ili updated content je dostupan.');

                            }else{          /*OVO BI ZNACILO DA NI JEDAN SERVICE WORKER NIJE IN CONTROLL, A SERVICE WORKER JE
                                                                                                            INSTALLED */

                                // U OVOJ TACKI, SVE JE POSTALO PRECASHED
                                // SAVRSENO JE VREME DA SE DISPLAY-UJE:
                                                                        "Conten is cached for offline use"
                                // MESSAGE
                            }

                            break;

                        case 'redundant':

                            console.log('INSTALLED Service Worker BECAME redundant');

                            break;
                    }

                }

            }

        })
        .catch(function(err){
            console.log('Error during installation of service worker.', err);
        })

    })
}


```

## U NASTAVKU CU SAMO OSTAVITI LINKOVE OD NASLOVA IZ GOOGLE DEV CLANKA

TO RADIM JER JE ONO STO JE TAMO, JESU OBJASNJENJA, ILI STRATEGIJE, PRI REGISTRACIJI SERVICE WORKERA (TO BI SVE TREBAO DETALJNO PROCITATI)

[KORISNIKOVA PRVA POSETA](https://developers.google.com/web/fundamentals/primers/service-workers/registration#a_users_first_visit)

[POBOLJSANJE BOILERPLATE-A](https://developers.google.com/web/fundamentals/primers/service-workers/registration#improving_the_boilerplate)

[SLEDECE POSETE (ONE POSLE PRVE)](https://developers.google.com/web/fundamentals/primers/service-workers/registration#subsequent_visits)

[RAZLOG DA SE REGISTRUJE RANO](https://developers.google.com/web/fundamentals/primers/service-workers/registration#reasons_to_register_early)

[TESTIRANJE](https://developers.google.com/web/fundamentals/primers/service-workers/registration#testing_things_out)

[ZAKLJUCAK](https://developers.google.com/web/fundamentals/primers/service-workers/registration#conclusion)

