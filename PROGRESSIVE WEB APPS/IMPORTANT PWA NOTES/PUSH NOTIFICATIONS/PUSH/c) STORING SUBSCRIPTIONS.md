# STORING SUBSCRIPTIONS

U POSLEDNJEM md FAJLU NAPOMENUO SAM DA ZELIM DA KORISTIM VAPID KEYS, KAKO BI ZASTITIO PUSH MESSAGES, I SAMO IH SLAO SA SERVER-A, MOJE APLIKACIJE, I DA NIKO DRUGI NE MOZE DA IH SALJE OSIM MENE

## INSTALIRACU PAKET KOJI CU KORISTITI NA BACKEND-U, ODNOSNO U MOJOJ FIREBASE CLOUD FUNKCIJI (I TO JE MOJ BACKEND CODE, KOJI BI INACE MOGAO DA SE RUNN-UJE, SA NODE SERVERA (STO CU SIGURNO RADITI, KADA NAUCIM NODE))

[nmp](https://www.npmjs.com/package/web-push)(web-push)

- cd functions

- npm install web-push --save

- ILI PO NOVOM &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;npm install web-push --only=dev

DAKLE PRI INSTALIRANJU DEV DEPENDANICIES, SADA SE KORISTI --only=dev

--dev JE DEPRECATED

## U package.json FAJLU, KOJ ISE NALAZI U functions FOLDERU, DODACU SVOJE SCRIPT-OVE

- JEDA NSCRIPT CE EXECUTE-OVATI PAKET

functions/package.json FAJL:

```javascript
{
  "name": "functions",
  "description": "Cloud Functions for Firebase",
  "scripts": {
    "web-push": "web-push",   // OVAJ SCRIPT SAM DODAO, KOJI RUNN-UJE web-push PAKET
    "lint": "eslint .",
    "serve": "firebase serve --only functions",
    "shell": "firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "10"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "firebase-admin": "^8.1.0",
    "firebase-functions": "^3.0.0",
    "web-push": "^3.3.5"
  },
  "devDependencies": {
    "eslint": "^5.12.0",
    "eslint-plugin-promise": "^4.0.1",
    "firebase-functions-test": "^0.1.6"
  },
  "private": true
}

```

SADA CU DA RUNN-UJEM web-push

- npm run web-push

IZ CEGA CE PROIZICI ERROR, ALI U TERMINALU CU ONDA IMATI HINT-OVE, STA SAM USTVARI TREBAO DA RUNN-UJEM

DAKLE OVA KOMANDA SAMA PO SEBI NE RADI NISTA ALI IZ TERMINALA SAM PROCITAO NEKE HINT-OVE, O TOME, KAKO MOGU DA JE COMPOSE-UJEM KAKAO BI TAK OSA DRUGIM STVARIMA FUNKCIONISALA

NEKE OD STVARI KOJE SE MOGU POKRENUTUI ZAJEDNO S POMENUTI MSCRIPTOM JESU: send-notification (TO MI JOS NE TREBA), `--endpoint=<url>`, generate-vapid-keys ... (OVO POSLEDNJE MI VEROVATN OTREBA)

## POTREBNO JE NAIME, GENERISATI, JEDAN VAPID KEY, PO APLIKACIJI, I TO SE KASNIJE NE MENJA

MOGUCE JE MENJANJE, ALI CE SE OVERRIDE-OVATI EXISTING, STO STARI CINI USELESS

**DAKLE RUNN-UJEM SLEDECI SCRIPT, SAMO JEDNOM TOKOM DEVELOPMENT-A**

DAKLE RUNN-UJEM

- **npm run web-push generate-vapid-keys**

PRIVATE I PUBLIC KEY CE BITI GENERISANI

KOPIRACU PUBLIC KEY, A PRIVETE KEY CU KORISTITI KASNIJE

## IDEM SADA U app.js FAJL, I POMENUTI PUBLIC KEY CU STORE-OVATI U VARIJABLOJ

app.js FAJL:

```JAVASCRIPT
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

                // EVO OVDE STORE-UJEM KEY
                let vapidPublicKey = 
                'BGgs9_cddY0Cgne0p4I0BZHUR47VUr-tJ-x9wSt21h3yUL2nLGWXsKKhWW2i0wKY3uEKG0D86UWnFE-cHmkmkw8';

                // I NJEGA NECU PROSLEDITI DO subscribe METODE

                // VEC MORAM OBEZBEDITI FUNKCIJU, KOJA KONVERT-UJE BASE64 U Unit8 Array
                // TAKVU FUNKCIJU, MOGU SMESTITI U utility.js FAJL

                swregistration.pushManager.subscribe({
                    userVisibleOnly: true
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

## DAKLE U utility.js FAJLU PROSLEDICU SLEDECU FUNKCIJU (KOPIRNA JE OD NEGDE DRUGDE)

utility.js

```javascript
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
```

KOPIRANA IZ JEDNOG ODGOVAORA NA [STACK OVERFLOW-U](https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string) (JEDAN OD ODGOVORA NA ZACELJU)

## SADA CU PRIMENU OVE FUNKCIJE DEFINISATI U MOM CODE-U app.js FAJLA, KAKO BI ONA KONVERTOVALA BASE64 TO UNIT8 ARRAY; I TU VREDNOST MORAM ZADATI PROPERTIJU SUBSCRIPTION CONFIGURATION OBJECT ARGUMENTA; A TA JOBJEKAT NOSI IME applicationServerKey

```JAVASCRIPT
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

                let vapidPublicKey =
                'BGgs9_cddY0Cgne0p4I0BZHUR47VUr-tJ-x9wSt21h3yUL2nLGWXsKKhWW2i0wKY3uEKG0D86UWnFE-cHmkmkw8';

                // EVO JE PRIMENA POMENUTE NOVE FUNKCIJE

                let convertedPublicVapidKey = urlBase64ToUint8Array(vapidPublicKey);

                // SADA POMENUTA VARIJABLA IMA ASSIGNED Unit8Array, KOJI MOGU KORISTITI U
                // DONJEM KONFIGURACIJSKOM OBJEKTUI

                // I OVO SAM ZAVORAVIO DA RETURN-UJEM, A ONO CE MI BITI POTREBNO I ZATO RETURN-JEM
                return swregistration.pushManager.subscribe({
                    userVisibleOnly: true,

                    // POMENUTI Unit8 Array ASSIGNUJEM SLEDECEM PROPERTIJU

                    applicationServerKey: convertedPublicVapidKey
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

SADA JE GENERISAN SUBSCRIPTION

I TO SA JASNOM IDENTIFIKACIJOM SERVER-A, KOJI JE ALLOWED TO SEND PUSH MESSAGES

NARAVNO NISAM JOS ISKORISTIO PRIVATE KEY, KOJ ITREBAM DA ISKORISTIM NA SERVER STRANI, KAKO BI, POMENUTI ISKORISCENI PUBLIK KEY ZAISTA BIO IDENTIFIKACIJA MOGA SERVER-A

KASNIJE CU ISKORISTIT PRIVATE KEY NA SERVER STRANI

## ONO STO ZELIM DA URADIM SADE, JESTE DA NOVI SUBSCRIPTION PROSLEDIM; I KADA KAZEM SERVER MISLIM NA MOJ FIREBASE SERVER

ODNOSNO, U MOM DATABASE-U, GDE SAM STORE-OVAO posts, JA ZELIM DA STORE-UJEM, MOJE SUBSCRIPTION-E

POTREBNO JE NARAVNO NAPRAVITI, JOS JEDAN POST REQUEST

NOVI OBJEKAT CE SE ZVATI **subscriptions**

POTREBNO JE DAKLE TO DODATI URL BAZE PODATKA, ZAJEDNO SA .json EKSTENZIJOM

app.js FAJL

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

                let vapidPublicKey =
                'BGgs9_cddY0Cgne0p4I0BZHUR47VUr-tJ-x9wSt21h3yUL2nLGWXsKKhWW2i0wKY3uEKG0D86UWnFE-cHmkmkw8';

                let convertedPublicVapidKey = urlBase64ToUint8Array(vapidPublicKey);

                return swregistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedPublicVapidKey
                });

            }else{


            }

        })

        // CHAIN-UJEM NOVI then

        .then(pushSubscriptionObjectNew => {   // ONO STO JE PROSLEDJENO OVOM then-u JESTE
                                            // PushSubscription INSTANCA

            // OVDE CU PODNETI TAJ POST REQUEST, MOM FIREBASE SERVERU
            // KAKO BI U DATABASE-U, KREIRAO subscription OBJEKAT

            // pocetni URL MOGU NACI NA FIREBASE-U U DATABASE, SEKCIJI
            // SAMO STO SADA VISE NE KORISTIM posts NEGO subscriptions

            return fetch('https://instapwaclone.firebaseio.com/subscriptions.json',       // DAKLE ZADAO SAM 
                                                                            //  subscriptions.json EKSTENZIJU
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(pushSubscriptionObjectNew) // DAKLE PROSLEDIO SAM
                                                                    // NOVU PushSubscription INSTANCU
                                                                    // KOJ USAM KREIRAO U CALLBACK-U,
                                                                    // PROSLOG then-A
                }
            )



        })

        .then(response => {  // OPET CHAIN-UJEM then KAKO BI HANDLE-OVAO Response INSTANCU


            // ONU FUNKCIJU, KOJA DISPLAY-UJE CONFIRM NOTIFICATIO, ODNOSNO
            // PRVI NOTIFICATION, KOJI ZELI MDA POSALJEM KADA KORISNIK ALLOWS NOTIFICATIONS NA NJEGOVOM
            // UREDJAJU ZA MOJ APP

            if(response.ok) displayConfirmNotification()

        })

        .catch(err => {   // CATCH-UJEM BILO KOJI ERROR, KOJI MOZE BITI THROWN, BIL OGDE RANIJE U LANCU
            console.log(err)    // OUTPUT-UJEM GA U KONZOLI JER ZELIM DA TOKOM DEVELOPMENTA
                                // VIDIM STA KONKRETNO NE RADI
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

## SADA VEC MOGU ISPITATI MOJ CODE, ODNOSNO MOGU ENABLE-OVATI NOTIFICATION U MOM APP-U (PRITISKO MNA DUGME, JER SAM TAKO RANIJE DEFINISAO), I ONDA VIDETI DA LI CE SE PRIKAZATI NOTIFICATION, I ON SADA TREBA DA SE POJAVI TEK KADE SE DEFINISE NOVI SUBSCRIPTION (ODNOSNO KADA SE USPESNO OBAVI POST REQUEST I RESPONSE BUDE OK)

## MOGU DA POGLEDAM MOJ FIREBASE DATABSE I VIDEIM DA LI CE SE POJAVITI NOVI subscriptions OBJEKAT, KOJI CE SE TAMO STORE-OVATI, JER SAM TAKO DEFINISAO

MOGU POGLEDATI, OD CEGA SE SASTOJI TAJ **subscriptions** OBJEKAT, ODNOSNO BOLJE DA AG ZOVEM OBJECT STORE, U MOM DATABASE-U, KOJI JE U FIREBASE-U

NAIME U NJEM USE NALAZI JEDAN POSEBAN OBJEAKAT (**UPRVO JE TAJ OBJEKAT, ONAJ OBJEKAT KOJI JE POSTED**), KOJI IMA DVA PROPERTIJA

- **endpoint**

*NJEGOVA VREDNOST JESTE URL, JEDNOG OD GOOGLE-OVIH SERVER-A (U SUSTINI ZA CHROME)*

TO JE USTVARI ENDPOINT BROWSER-VENDOR SERVER-A, KOJI SAM POMINJAO 

TO NIJE MOJ SERVER, I JA GA NE MOGU ACCESS-OVATI, ALI TO **JESTE URL NA KOJIM MORAM SLATI PUSH MESSAGES**

>> IAKO IZGLEDA CRIPTIC, SVAKO KO ZNA TAJ URL, MOZE SLATI PORUKE NA NJEGA

ALI OVDE DOLAZI JEDAN INTERESANTAN DEO

A TO JE DRUGI PROPRTI KOJI TAJ OBJEKAT POSEDUJE

- **keys**

TO JE *PODOBJEKAT*, KOJI IMA DVA PROPERTIJA, I OBA SU KLJUCEVI

JEDAN JE **auth** KEY

DRUGI JE **p256dh** KEY

> OBA IZGLEDAJU POPRILICNO CRYPTIC

**OVA DVA KLJUCA, ZAJEDNO SA URL-OM VENDOR SERVERA NA KRAJU CE ENCORPORATE-OVATI, ONU VAPID PUBLIC KEY INFORMACIJU**

KADA BUDEM POCEO SLATI, MOJE PUSH MESSAGE-E, SA SERVER-A, MOG APP-A, MORAM PROSLEDITI, POMENUTA DVA KLJUCA, ZAJEDNO SA **PRIVATE VAPID KEY-OM**, I ONDA CE WEB PUSH PAKET ISKORISTITI SVE INFORMACIJE, KAKO BI POSLAO PUSH REQUEST, NA POMENUTI URL VENDOR SERVER-A (POMENUTI CHROME-OV, ODNOSNO GOOGLE-OV ENDPOINT), KOJI SE IDENTIFIKUJE (PUSH REQUEST) DA DOLAZI SA MOG IDENTIFIED AND VERIFIED APPLICATION SERVER-A

**DAKLE, POMENUTI KLJUCEVI I ENDPOINT, ZAJEDNO SA PRIVATE KEY-OM, KOJEG SAM GENERISAO, ALI GA JOS NISAM KORISTIO, JESU ONE INFORAMICIJE, KOJE CE MI TREBATI NA SERVER SIDE-U, ODNOSNO BACKEND-U, MOJE WEB APLIKACIJE; KAKO BI SLAO NOVE PUSH REQUEST-OVE**

## U NAREDNOM md FAJLU  CU RADITI NA SERVER STANI, KAKO BI ZA MOJU APLIKACIJU DEFINISAO SLANJE PUSH REQUEST-OVA

## MEDJUTIM, JOS PAR STAVRI NISAM REKAO

### RANIJE SAM GOVORIO DA SE SUBSCRIPTION ODNOSI NA DATI BROWSER, NA DADOM UREDJAJU, MEDJUTIM, SUBSCRIPTION SE ODNOSI I NA SERVICE WORKER-A

JA SAM SUBSCRIPTION U STVARI PODESIO KROZ SERVICE WORKERA

DA, JA SAM TO URADIO U FAJLU, KOJI JE INSERTED INTO THE DOM, ALI TO SAM RADIO SAMO AKO JE SERVICE WORKER **ready** (SVE SAM URADIO U CHAIN-OVIM then-A, KOJ ISU SE NASTAVLJALI NA navigator.serviceWorker.ready)

ZATO OBRATI PAZNJU DA AKO CLEAR-UJES SITE DATA I TIME IZBRISES, ODNOSNO UNREGISTER-UJES TRENUTNI SERVICE WORKER; SVAKI NOVI SUBSCRIPTION CE BITI USELESS

ZASTO?

PA ZATO STO SAM KORISTIO pushManager ODREDJENE SERVICE WORKER REGISTRACIJE, KOJA AKO SE IZBRISE BICE IZBRISAN I SUBSCRIPTIO (OVO PREDPOSTAVLJAM)

ZATO NE BI TREBALO DA IDEM NA CLEAR SITE DATA, VEC DA IDEM NA REGISTRACIJ UNOVOM SERVICE WORKERA, SA UPDATED CACHE VERZIJOM PRILIKOM DEVELOPMENTA

ILI DA AKO IZBRISEM NOVOG SERVICE WORKER,A DA OBRISEM I SUBSCRIPTIONS NA SERVERU, JER ONE VISE NECE BITI VALID