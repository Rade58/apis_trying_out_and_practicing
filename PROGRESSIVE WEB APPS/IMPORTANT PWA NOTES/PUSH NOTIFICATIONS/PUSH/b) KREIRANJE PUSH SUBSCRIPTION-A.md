# KREIRANJE PUSH SUBSCRIPTION-A

KREIRAM GA PRIMENOM

- subscribe

METODE, NAD PushManager INSTANCOM, ODNOASNO NAD OBJEKTOM, KOJIM PRISTUPAM, PREKO ServiceWorkerRegistration INSTANCE

app.js FAJL:

```javascript
const enableNotificationsButtons = document.querySelectorAll('button.enable-notifications');

if('Notification' in window && 'serviceWorker' in navigator){  

    const displayConfirmNotification = function(){

        const options = {
            body: "You successfully subscribed to our notification service",
            icon: '/src/images/icons/icon-96x96.png',
            image: '/src/images/keyboard.jpg',
            dir: "ltr",
            lang: 'en-US',
            vibrate: [100, 50, 200],
            badge: '/src/images/icons/icon-96x96.png',

            tag: 'confirm-notification',
            renotify: true,

            actions: [
                {action: "confirm", title: "Ok", icon: '/src/images/icons/icon-96x96.png'},
                {action: "cancel", title: "Cancel", icon: '/src/images/icons/icon-96x96.png'}
            ]

        }

        const title = 'Sucessfully subscribed!';

        if('serviceWorker' in window.navigator){

            navigator.serviceWorker.ready
            .then(swreg => {

                swreg.showNotification(title + "(from sw)", options);

            })

            return;

        }

        new Notification(title, options);

        return;
    }

  //////////////////////////////////////////////////////
    const configurePushSub = function(){

        if(!('serviceWorker' in window.navigator)){ 
            return;
        }

        // OVOJ VARIJABLOJ CE BITI ASSIGNED ServiceWorkerRegistration INSTANCA, JER CE MI TREBATI NA VISE 
        // MESTA (I U OBIMU CALLBACKA-A, DRUGOG then-A U LANCU)

        let swregistration;

        window.navigator.serviceWorker.ready
        .then(swreg => {

            // OVDE DOLDELJUJEM POMENUTU ServiceWorkerRegistration INSTANCU
            swregistration = swreg;

            return swreg.pushManager.getSubscription()    // ZA OVO SAM I UPROSLOM md FAJLU REKAO DA 
                                                          // return-UJE Promise, RESOLVED SA
                                                          // PushSubscription INSTANCOM

        })
        .then(sub => {

            if(sub === null){
                // JER ZELIM DA KORISTIM TU INSTANCU OVDE, KAKO BI OPET MOGAO PRISTUPITI
                // pushManager-U, NAD KOJIM CU PRIMENITI METODU         subscribe()

                swregistration.pushManager.subscribe();

            }else{

                // U SUPROTNOM, VEC IMA SUBSCRIPTION
                // I KORISTICU, TAJ EXISTING SUBSCRIPTION
                // STO SAM REKAO U PROSLOM md FAJLU
            }

        })

    }
  /////////////////////////////////////////////////////////

    const askForNotificationPremission = event => {

        window.Notification.requestPermission(result => {

            if(result !== "granted"){

                console.log("No notifications premissions are granted");

            }else{

                ///////////////////////////

                configurePushSub();

                ///////////////////////////

                // displayConfirmNotification();

            }

        });

    };


    enableNotificationsButtons.forEach(button => {
        button.style.display = "inline-block";
        button.addEventListener('click', askForNotificationPremission)
    })

}
```

ServiceWorkerRgistrationINSTANCA.pushManager.subscribe() &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CE:

- **KREIRATI NOVI SUBSCRIPTION ZA DATI BROWSER, NA DATOM DEVICE-U**

## JA SAD IMAM NOVI SUBSCRIPTION, ALI POMENUTO DEFINISANJE SE NE VRSI NA OVAKAV NACIN, KAKO SAM GA PREDSTAVIO, ODNOSNO JA SAM SAMO POZVAO POMENUTU subscribe METODU, CISTO RADI SHOWCASE-A

## SUBSCRIPTION CONTAIN-UJE ENDPOINT URL, VENDOR-OVOG, ODNOSNO BROWSER-OVOG SERVER-A

SVAKO SA OVIM ENDPOINT-OM, MOZE SLATI PORUKE DO POMENUTOG VENDOR SERVERA, A TA JSERVER CE IH FORWARD-OVATI DO MOG WEB APP-A

:exclamation::exclamation::exclamation::exclamation: **AKO BILO KO SAZNA MOJ ENDPOINT URL, ON ODNA MOZE POCETI SLATI PORUKE, DO MOG KORISNIKA** :exclamation::exclamation::exclamation::exclamation:

:exclamation::exclamation::exclamation::exclamation: *IZGLEDACE KAO DA OVE PORUKE DOLAZE OD MENE* :exclamation::exclamation::exclamation::exclamation:

**TAKO DA MORAM PROTECT-OVATI TAJ**

- *PushSubscription*

**KOJI JE POVRATNA VREDNOST *subscription()* METODE**

## MORAM PODESITI CONFIGURATION OBJEKAT, KOJEG DODAJEM KAO ARGUMENT subscription() METODE; I TU PODESAVAM PROPERTI userVisibleOnly

app.js FAJL:

```javascript
const enableNotificationsButtons = document.querySelectorAll('button.enable-notifications');

if('Notification' in window && 'serviceWorker' in navigator){  

    const displayConfirmNotification = function(){

        const options = {
            body: "You successfully subscribed to our notification service",
            icon: '/src/images/icons/icon-96x96.png',
            image: '/src/images/keyboard.jpg',
            dir: "ltr",
            lang: 'en-US',
            vibrate: [100, 50, 200],
            badge: '/src/images/icons/icon-96x96.png',

            tag: 'confirm-notification',
            renotify: true,

            actions: [
                {action: "confirm", title: "Ok", icon: '/src/images/icons/icon-96x96.png'},
                {action: "cancel", title: "Cancel", icon: '/src/images/icons/icon-96x96.png'}
            ]

        }

        const title = 'Sucessfully subscribed!';

        if('serviceWorker' in window.navigator){

            navigator.serviceWorker.ready
            .then(swreg => {

                swreg.showNotification(title + "(from sw)", options);

            })

            return;

        }

        new Notification(title, options);

        return;
    }

  //////////////////////////////////////////////////////
    const configurePushSub = function(){

        if(!('serviceWorker' in window.navigator)){
            return;
        }

        let swregistration;

        window.navigator.serviceWorker.ready
        .then(swreg => {

            swregistration = swreg;

            return swreg.pushManager.getSubscription();

        })
        .then(sub => {

            if(sub === null){

                // ODJEDNOM CU DEFINISATI I PROSLEDITI, POMENUTI CONFIGURATION OBJEKAT

                swregistration.pushManager.subscribe({
                    userVisibleOnly: true     // DAKLE DEFINISAO SAM USER VISIBILITY NA true
                                             // A STA TO ZNACI, OBJASNICU DOLE U TEKSTU
                });

            }else{


            }

        })

    }
  /////////////////////////////////////////////////////////

    const askForNotificationPremission = event => {

        window.Notification.requestPermission(result => {

            if(result !== "granted"){

                console.log("No notifications premissions are granted");

            }else{

                ///////////////////////////

                configurePushSub();

                ///////////////////////////

                // displayConfirmNotification();

            }

        });

    };

    enableNotificationsButtons.forEach(button => {
        button.style.display = "inline-block";
        button.addEventListener('click', askForNotificationPremission)
    })

}
```

*userVisibility*: **true** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ZNACI SLEDECE:

- **PUSH NOTIFICATIONS POSLATE, KROZ MOJ SERVIS, SU SAM OVIDLJIVE ZA OVOG KORISNIKA**

ALI TO I NIJE SECURITY MECHANISM, UOPSTE

SECURTY MECHANISM SE OGLEDA U TOME DA CU JA DA IDENTIFIKUJEM, SOPSTVENI SERVER, MOJE APLIKACIJE

:large_orange_diamond::large_orange_diamond::large_orange_diamond::large_orange_diamond: DAKLE, MOJ BACKEND SERVER, TREBA DA BUDE JEDINI VALID SOURCE, KOJI SALJE PUSH MESSAGE-OVE; TAKO DA BILO KO KO SALJE PUSH MESSAGE-OVE DO API ENDPOINT-A, VEDOR-OVOG SERVERA, WILL SIMPLY NOT GET THROUGH, I NJEGOVE PUSH MESSAGES WONT BE DELIVERED:large_orange_diamond::large_orange_diamond::large_orange_diamond::large_orange_diamond:

## KAK OBI IDENTIFIKOVAO MOJ SERVER, ODNOSNO SERVER, MOJE APLIKACIJE, PASSING, SAMOG IP-A, ILI NECEG SLICNOG, ZAISTA NIJE DOVOLJNO

TO BE BILO EAST TO TRICK, AND NOT REALLY SECURE

## UPRAVO IZ TOG RAZLOKA KORISTICU JEDAN PRISTUP, KOJI SE ZOVE "VAPID Approach"

[VAPID Approach](https://blog.mozilla.org/services/2016/04/04/using-vapid-with-webpush/)

**OVO JE PRISTUP PRI KOJEM IMAM DVA KLJUCA, ONA JPUBLIC, I ONAJ PRIVATE**

- PUBLIC JE ONAJ, KAKO MU I MIME KAZE, KAOJI MOZE BITI EXPOSED TO PUBLIC, **I TAJ JE ONAJ KOJI CU KORISTITI U JAVASCRIPT-U, POSTO POZNATA JE CINJENICA DA SVAKO MOZE CITATI, MOJ JAVASCRIPT, I TAM OSE NE MOGU KRITI INFORMACIJE** I ZATO CE TO BITI MESTO GDE CU KORISTITI PUBLIC ONE

- PRIVATE KEY JE CONNECTED, SA PUBLIC KEY-OM, ALI NE MOZE BITI DERIVED, ODNOSNO IZVEDEN OD PUBLIC ONE-A; **I STORED JE SAMO NA SERVER-U, MOJE APLIKACIJE**; *DAKLE IT RUNNS FROM THE SERVER, AND CAN'T BE ACCESSED, BEZ TOGA DA LJUDI HAKUJU, MOJ SERVER*; I TEK BI TADA MOGAO POSLATI PUSH NOTIFICATION SA MOG SERVER-A DO MOJIH KORISNIKA

>>>> AKO JE DOSTUPAN, SMAO PUBLIC, TO NECE BITI DOVOLJNO ZA SLANJE NOTIFICATION-A

## DAKLE POMENUTI VAPID PRISTUP, JESTE PRISTUP, KOJI CU KORISTITI, I ZA TO SU MI POTREBNI, TAKOZVANI VAPID KEYS

ONI SU USTVARI JSON WEB TOKENS KONVERTOVANI U BASE64 STRINGS

MOGU SE KREIRATI FROM SCRATCH MANUALLY, ALI TO UOPSTE NIJE ZAHVALAN POSAO; ZATO CU KORISTITI PACKAGE. ODNOSNO JAVASCRIPT BIBLIOTEKU, KOJA CE GENERISATI, POMENUTE KLJUCEVE

## A TREBACE MI I LIBRARY, KOJIM SE SALJU PUSH NOTIFICATION, ALI S TIM CU SE UPOZNATI NESTO KASNIJE

NAIMEW, IAK OSE SVE MOZE BUILD-OVATI FROM SCRATCH, NE POSTOJI NI JE DAN RAZLOG DA SE TO RADI

**POSTOJI GREAT PUSH LIBRARY, KOJI CU KORISTITI** I KOJA SE ZOVE

- [Web Push](https://github.com/web-push-libs/web-push)

## ONO CIME CU SE SLEDECE POZABAVITI JESTE INSTALIRANJE Web Push LIBRARY-JA, KOJI CU KORISTITI DA BIH GENERISAO VAPID KEYS, KOJE CU ONDA KORISTITI KAKO BI SECURE-OVAO PUSH MESSAGES