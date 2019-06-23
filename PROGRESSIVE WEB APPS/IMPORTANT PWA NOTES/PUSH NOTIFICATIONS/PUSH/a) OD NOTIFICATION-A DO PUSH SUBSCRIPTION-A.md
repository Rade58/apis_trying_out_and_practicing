# FROM NOTIFICATION TO PUSH SUBSCRIPTION

## POCECU SA SUBSCRIPTION-OM

OTICICU U app.js GDE SAM DEFINISAO DA KADA KORISNIK PRITISNE NA ENABLE NOTIFICATION DUGMAD MOJE APLIAKCIJE, DA SE TADA ON I PROPMPT-UJE ZA TO DA LI DOZVOLJAVA NOTIFICATIONS ILI NE

TADA SAM PRIMENIO requestPermission METODU, NAD ServiceWorkerRegistration INSTANCOM

HAJDE DA PRIKAZEM JOS JEDNOM SAV CODE, KOJI SE TICAO NOTIFIKACIJA, A KOJI SAM DEFINISAO U TOM FAJLU, KOJI NIJE SERVICE WORKER FAJL

app.js FAJL:

```javascript
const enableNotificationsButtons = document.querySelectorAll('button.enable-notifications');

if('Notification' in window){

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

    // DAKLE, KAO STO VIDIM, GORE SAM DEFINISAO FUNKCIJU, KOJOM SE DISPLAY-E NOTIFICATION, KADA
    // SU NOTIFICATIONS GRANTED OD STRANE KORISNIKA

    // FUNKCIJA KOJA SE NALAZI DOLE JESTE ON click EVENT HANDLER, KOJI SAM ZAKACIO NA SVAKO DUGME
    // KOJE IMA TEKST 'ENABLE NOTIFICATIONS' U MOM APP-U

    const askForNotificationPremission = event => {

        window.Notification.requestPermission(result => {

            if(result !== "granted"){

                console.log("No notifications premissions are granted");

            }else{

                displayConfirmNotification();

            }

        });

    };


    enableNotificationsButtons.forEach(button => {
        button.style.display = "inline-block";
        button.addEventListener('click', askForNotificationPremission)
    })

}
```

## KREIRACU NOVU FUNKCIJU, KOJA CE SE ZVATI configurePushSub

FUNKCIJU CU DEKLARISATI I DEFINISATI, ODMAH PRE askForNotificationPremission FUNKCIJE

I NJU TREBA DA POZOVEM PRE displyConfirmNotification , KOJA PRIKAZUJE ONJ PRVI NOTIFICATION, KOJI SE POJAVLJUJE KADA KORISNIK GRANTS ACCESS (JA SAM DEFINISAO DA SE ON PRIKAZUJE)

USTVARI JA NECU VISE NI PRIKAZIVATI TAJ INICIJALNI NOTIFICATION, JER MI JE KORISTIO RANIJE SAMO ZA UPOZNAVANJE SA NOTIFICATION INTERFEJSOM

app.js FAJL:

```javascript
const enableNotificationsButtons = document.querySelectorAll('button.enable-notifications');

if('Notification' in window && 'serviceWorker' in navigator){   // DODAO SAM I SERVICE WORKER DEO U OVU 
                                                                // USLOVNU IZJAVU

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

    // DAKLE, OVDE CU DEFINISATI, POMENUTU FUNKCIJU
    const configurePushSub = function(){
        //  MOGAO SAM I NA DRUGOM MESTU DO URADITI ALI IPAK, PROVERAVAM DA LI POSTOJI SERVICE WORKER SUPPORT

        if(!('serviceWorker' in window.navigator)){ // ALI JA SAM PROVERIO NA POCETKU, POMENUTO, TAKO DA
            return;                                 // TAKO DA JE OVO MOZDA (JESTE) SUVISNO, ALI NEKA OSTANE
        }

        // AKO IMAM SERVICE WORKER SUPPORT, ONDA CE SE IZVRSITI SLEDECE

        // IAKO SAM VEC RANIJE TRAZIO PRISTUP ServiceWorkerRegistration INSTANCI, OPET CU TO OVDE
        // URADITI, JER MI TREBA

        window.navigator.serviceWorker.ready
        .then(swreg => {
            // OVDE ZELIM DA PRISTUPIM pushManager-U
            // I DA PROVERIM ZA EXISTING SUBSCRIPTION-IMA
            // TAKO STO CU NA pushManager-U PRIMENITI   getSubscription()   METODU

            return swreg.pushManager.getSubscription()  // METODA RETURN-UJE ANY EXISTING SUBSCRIPTION
                                                        // ODNOSNO RETURN-UJE PROMISE, KOJI JE RESOLVED SA
                                                        // BILO KOJIM SUBSCRIPTION-IMA KOJI SU FETCHED
                                                        // I KOJE SADA HOCU DA KORISTIM U OBIM CALLBACKA-A,
                                                        // SLEDECEg then-A

        })
        .then(sub => {              // DAKLE SA OVOM VREDNOSCU (sub) JE RESOLVED PREDHODNI PROMISE

                                    // ALI KAKO BIH DODAO PAR VAZNIH STAVRI U SLEDECEM NASLOVU, OVDE
                                    // CU STATI SA DEFINISANJEM, JER MISLIM DA SE VAZNO PODSETITI
                                    // U KOM KONTEKSTU GOVORIM O SUBSCRIPTION-U
                                    // I STA REC SUBSCRIPTION UOPSTE ZNACI

        })

    }

    const askForNotificationPremission = event => {

        window.Notification.requestPermission(result => {

            if(result !== "granted"){

                console.log("No notifications premissions are granted");

            }else{

                // KADA DOBIJEM DOZVOLU DA SE NOTIFICATION PRIKAZUJU, POPTREBNO JE KONFIGURURATI PUSH
                // SUBSCRIPTION

                // ODNOSNO POZIVAM FUNKCIJU, KOJ USAM GORE DEFINISAO, A KOJA SE BAVI KONFIGURURANJEM PUSH
                // SUBSCRIPTION-A

                configurePushSub();

                // displayConfirmNotification(); // OVO COMMENT-UJEM OUT JER MI NECE BITI POTREBNO
                // UOSTALOM, KORISTIO SAM GA SAMO PRI UPOZNAVANJU SA OPCIJAMA I ACTIONIMA VEZANIM
                // ZA Notification

            }

        });

    };


    enableNotificationsButtons.forEach(button => {
        button.style.display = "inline-block";
        button.addEventListener('click', askForNotificationPremission)
    })

}
```

## DAKLE, REKAO SAM RANIJE DA SUBSCRIPTION PREDSTAVLJA UREDJAJA, ALI STA TO ZNACI KADA KORISTIM pushManager I PROVERAVAM DA LI I MA SUBSCRIPTIONA?

DALI JE NEKI UREDJAJ SUBSCRIBED I DA LI JE NEKUI UREDJAJ GRANTE-OVAO NOTIFIKACIJE, JESU DVE RAZLICITE STVARI

SUBSCRIPTION SE, NAIME ODNOSI NA PUSH TEHNOLOGIJU

A MOGU GOVORITI O SUBSCRIPTION-U, I U KONTEKSTU KONKRETNOG UREDJAJA KOJI JE SUBSCRIBED NA NOTIFIKACIJE, MOJE APLIKACIJE

PA TO ZNACI DA PROVERAVAM (KORISCENJEM pushManager.getSubscription()) DA LI JE TRENUTNI UREDJAJ SUBSCRIBED

ON PROVERAVA 'FOR THIS BROWSER, ON THIS DEVICE'

AKO JE OTVOREN APP, NA NEKOM DRUGOM BROWSER-U, NA NEKOM DRUGOM UREDJAJU, NJEMU CE BITI ASSIGNED KAO STO ZNAM, POTPUNO NOVI SERVICE WORKER, POTPUNO NOVI SCOPE (DAKLE TO CE BITI POTPUNO NOVI APP)

I ZATO JA PROVERAVAM DA LI JE TRENUTNI UREDJAJ SUBSCRIBED

**DAKLE SVAKI BROWSER, SVAKI DEVICE YIELDS (RADJA) JEDAN SUBSCRIPTION**

**DAKLE ON OSTA JA PROVERAVAM SA getSubscription JESTE SLEDECE**

- *DA LI OVAJ SERVICE WORKER, HANDLE-OVAN IZ OVOG BROWSER-A, NA OVOM UREDJAJU, IMA EXISTING SUBSCRIPTION, ZA OVAJ UREDJAJ*

```javascript
const enableNotificationsButtons = document.querySelectorAll('button.enable-notifications');

if('Notification' in window && 'serviceWorker' in navigator){   // DODAO SAM I SERVICE WORKER DEO U OVU 
                                                                // USLOVNU IZJAVU

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

        window.navigator.serviceWorker.ready
        .then(swreg => {

            return swreg.pushManager.getSubscription()

        })
        .then(sub => {

            // I UPRAVO ZATO, ONO PRVO STO PROVERAVAM JESTE:
            // DA LI JE sub, USTVARI null

            if(sub === nul){
                // AKO JESTE null, ONDA KREIRAM NOVI SUBSCRIPTION

            }else{

                // U SUPROTNOM, VEC IMA SUBSCRIPTION
                // I KORISTICU, TAJ EXISTING SUBSCRIPTION
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

## U SLEDECEM md FAJLU, POSTO NEMA EXISTING SUBSCRIPTIONA, DEFINISACU KREIRANJE NOVOG SUBSCRIPTION-A