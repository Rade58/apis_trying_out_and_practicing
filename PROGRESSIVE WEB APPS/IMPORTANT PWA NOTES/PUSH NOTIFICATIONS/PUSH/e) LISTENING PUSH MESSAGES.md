# SLUSANJE push EVENT-OVA

PRIKAZACU BACKEND CODE, KOJI MSAM SE BAVIO U PROSLOM MD FAJLU

DAKLE REC JE O FIREBASE FUNKCIJI, ODNOSNO O HANDLE-OVANJU POST REQUEST-OVA NA SERVER STRANI

PORED TOGA STO SE STORE-UJU POSTED DATA U DATABASE, POMENUTOM FUNKCIJOM SAM DEFINISAO I SLANJE PUSH REQUESTA VENDOR (BROWSER PROVIDER) SERVERU

NARAVNO, DA SE U SLOBODNOM STILU IZRAZIM, KRIPTOGRAFSKI JE ZASTICENO SLANJE PUSH REQUEST-OVA, GENERISANJEM NECEG STO SE ZOVU VAPID KLJUCEVI

functions/**index.js** FAJL:

```javascript
const functions = require('firebase-functions');

const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true
});

const serviceAccount = require("./instaclone-fb-key.json");

// MOGU GA OVDE REQUIRE-OVATI

const webpush = require('web-push');

const privateVapidKey = "oC8DBLaEzbmom6BtrF6z7_pVY";  // OVI KLJUCEVI NISU PRAVI, JER NE ZELIM DA BILO KO KO CITA OVO
                                                      // MOZE SLATI PUSH REQUESTS U SLUCAJU MOJE WEB APLIKACIJE
const publicVapidKey = "BMfwPHs40w8CDWGnf2HSq-vAGVOZMLhIgcDWDRgFzvrBCChNxX_spJoSM";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://instapwaclone.firebaseio.com/"
});

exports.storePostData = functions.https.onRequest(function (request, response) {
	  
	cors(request, response, function () {
    	admin.database().ref('posts').push({
      		id: request.body.id,
      		title: request.body.title,
      		location: request.body.location,
      		image: request.body.image
    	})
		.then(function () {
			webpush.setVapidDetails(
				"mailto:bajic.rade2@gmail.com",
				publicVapidKey,
				privateVapidKey
			);
			return admin.database().ref('subscriptions').once('value');
		})
		.then(function (subscriptions) {
			subscriptions.forEach(function (sub) {
				var pushConfig = {
					endpoint: sub.val().endpoint,
					keys: {
						auth: sub.val().keys.auth,
						p256dh: sub.val().keys.p256dh
					}
				};

				webpush.sendNotification(
					pushConfig, 
					JSON.stringify({title: 'New Post', content: 'New Post added!'}
				))
				.catch(function(err) {
					console.log(err);
				})

			});
			
			return response.status(201).json({message: 'Data stored', id: request.body.id});
		})
		.catch(function (err) {
			response.status(500).json({error: err});
		});
  
	});
});
```

## POSLEDICA SVEGA OVOGA BI TREBALA DA BUDE TRIGGER-OVANJE push EVENT-A, U GLOBALNOM OBIMU, SVAKOG SERVICE WORKERA, CIJI JE CLIENT SUBSCRIBED NA NOTIFIKACIJE

TO UKLJUCUJE I SAM UREDJAJ, ODNOSNO BROWSER, KOJI JE PODNEO POST REQUEST

SLUSACU SADA TAJ push EVENT U ServiceWorkerGlobalScope-U

sw.js FAJL

```javascript
// PREDJASNJI CODE SERVICE WORKER-A NE MORAM PRIKAZIVATI

/* LISTENING ON push EVENTS, NA SAMO M DNU SERVICE WORKER FAJLA */

self.addEventListener('push', ev => {
    console.log('********PUSH MESSAGE RECEIVED*********');
    console.log(ev);
    console.log('*********************');
})
```

JA SAM USTVARI MOJ APP TESTIRAO NA NEKOLIKO BROWSER-A, KOJE SAM SUBSCRIBE-OVAO NA PUSH NOTIFICATIONS

NA SVIMA NJIAM SE **TRIGGER-UJE push EVENT, KADA NA BILO KOM OD NJIH POPUNIM I PROSLEDIM FORMULAR (KAO STO SAM REKAO TAK OSAM DEFINISAO DA SE NA SERVER STRANI SALJE PUSH REQUEST, ONDA KADA SE HANDLE-UJE POST REQUEST)**

## DAKLE, RANIJE SAM REKAO ALI PONOVICU I OVDE, POSTO SU PUSH MESSAGES RECEIVED OD STRANE SERVICE WORKER-A, TO OMOGUCAVA DA SE EVENT-OVI TRIGGER-UJU, KADA JE BROWSER ZATVOREN; TO JE ZATO STO SERVICE WORKER RUNN-UJE U BACKGROUND-U, ON NAIME NIJE JEDAN OD SCRIPT-OVA INSERTED INTO THE DOM, KOJI NEMAJU TU MOGUCNOST

## DAKLE JA ZELIM DA SLUSAM NA PUSH MESSAGES KADA NEMAM OTVOREN WEBPAGE (AKO SAM DOBRO ZAPAMTIO NA ANDROIDU NE MORA DA BUDE OTVOREN NI BROWSER), I ZATO JEDINO MESTO U KOME MOGU DA SLUSAM PUSH MESSAGES JESTE SERVICE WORKER

## DA SE PODSETIM I OVOGA: AKO UNREGISTER-UJEM SERVICE WORKER-A, SUBSCRIPTION CE ZA TOG CLIENT-A BITI NEVAZECI, IAKO SAM GA RANIJE SUBSCRIBE-OVAO; DAKLE ONAJ SUBSCRIPTION KOJI JE STORED NA SERVERU I KOJI IMA ENDPOINT VENDOR SERVER-A (URL), NECE VISE BITI UPOTREBLJEN, JER CE NOVI SERVICE

DAKLE pushManager.subscribe (pushManager JE INTERFEJS ServiceWorkerRegistration INSTANCE) JE PRIMENJENO NA STAROM SERVICE WORKER-U

ZATIM JE SUBSCRIPTION, KOJI JE RELATED DO TOG POMENUTOG SERVICE WORKER-A, PROSLEDJEN SERVERU

AKO DEREGISTRUJEM POMENUTOG SERVICE WORKER, ONI SUBSCRIPTION PODACI KOJI SU PROSLEDJENI SERVERU, VISE NECE IMATI SERVICE WORKERA, SA KOJI MCE BITI RELATED

SAMIM TIM KADA BACKEND BUDE SLAO PUSH MESSAGES ONE NE MOGU BITI RECEIVED OD STRANE SERVICE WORKER-A, KOJI VISE NE POSTOJI

DA, NARAVNO REGISTROVACE SE NOVI SERVICE WORKER, I POTREBNO JE PONOVO SUBSCRIBTION CODE DA SE RUNN-UJE I BICE GENERISAN NOVI SUBSCRIPTION (TO ZNAC IDA CE ONI NEVAZECI SUBSCRIPTION PODACI, KOJE NISTA NE MOZE DA KORISTI ZAJEDNO SA NOVIM SUBSCRIPTION-OM, KOJ ICE BITI UPOTREBLJIVAN) (MOJE UPROSCENO OBJASNJENJE)

SVE SAM POMENUTO DEFINISAO U app.js FAJLU

## SADA CU DA ISPITAM PROPERTIJE KOJE IMA PushEvent INSTANCA (KONKRETNO ME ZNAIMA data PROPERTI)

NAIME, JA SAM NA SERVER STRANI DEFINISAO SLANJE PAYLOAD-A (MORAM SAZNATI ZNACENJ OVOG TERMINA, ODNOSNO USVOJITI NJEGOVU UPOTREBU)

U SUSTINI, TA JPAYLOAD JESTE OBJEKAT, KOJI JE IMAO DVA PROPERTIJA, *title* I *content* (OVO MOGU VIDETI U SERVER SIDE CODE-U, NECU GA PRIKAZIVATI OVDE)

**PA PushEvent INSTANCA NOSI TAJ PAYLOAD, KOJEM MOGU PRISTUPITI, PUTEM INSTANCINOG data PROPERTIJA**

```javascript

/* LISTENING ON push EVENTS, NA SAMOM DNU SERVICE WORKER FAJLA */

self.addEventListener('push', ev => {
    console.log('********PUSH MESSAGE RECEIVED*********');
    console.log(ev);
    console.log('*********************');

    // PROVERAVAM UOPSTE DA LI PAYLOAD POSTOJI

    // ALI KREIRAM I DUMMY OBJECT, KOJI CU KORISITIT AKO NEMA PAYLOAD-A

    let data = {title: 'novo', content: 'Nesto novo se dogodilo'};       // DAKLE OVO CE BITI FALLBACK

    if(ev.data){ // VRSIM PROVERU
        // AKO IMA DATA, MOGU DA JE EXTRACTUJEM

        data = JSON.parse(ev.data.text());      // MORAM PARSE-OVATI JSON DATA (MORAO SAM KORISITI text METODU)

        // ZASTO SAM UPOTREBIO text METODU
        // PA ZATO STO JE REC O ReadableStream-U

        // PREDPOSTAVLJAM ONDA DA PYLOAD MOGU UPOTREBITI SAMO JEDNOM
        // MOGUCE SU I METODE json I blob (KAO STO ZNAM blob JE ZA SLIKU, ODNOSN OZA FAJL KOJI JE TRANSPILED U BASE64 (PREDPOSTAVLJAM DA JE U PITANJ UBASE64))


        // AKO NEMA PAYLOADA, OVAJ ASSIGMENT SE NARAVNO NIJE DOGODIO
        // I ONO STO JE ZZADATO KAO FALLBACK MOZE BITI UPOTREBLJEN OZA GRADNJU Notification INSTANCE
    }

})
```

## Notification MOGU DA INSTANTIATE,  IDIREKTNO IZ SERVICE WORKER-A

RANIJE SAM POKAZAO DA MOGU DEFINISATI new Notification(title, options) U JAVASCRIPTU, KOJI JE INSERTED INTO THE DOM

PA SAM POKAZAO DA TAMO MOGU KORISTITI I ServiceworkerRgistration INSTANCU NA KOJOJ BI PRIMENIO **showNotification** METODU ,SA title-OM I options OBJEKTOM KAO ARGUMENTIMA

**ALI JA MOGU KORISTITI ServiceworkerRgistration INSTANCU U OBIMU SERVICE WORKER-A** (TO CU POKAZATI DOLE U CODE-U), KAKO BI POKAZAO NOTIFICATION

```javascript

/* LISTENING ON push EVENTS, NA SAMOM DNU SERVICE WORKER FAJLA */

self.addEventListener('push', ev => {
    console.log('********PUSH MESSAGE RECEIVED*********');
    console.log(ev);
    console.log('*********************');

    let data = {title: 'novo', content: 'Nesto novo se dogodilo'};

    if(ev.data){

        data = JSON.parse(ev.data.text());

    }

    // PRVO MOGU DA FORMIRAM options OBJEKAT ,STO SAM POKAZO I ONDA KADA SAM GOVORIO O Notification
    // INSTANCI, ODNOSNO U DELU NOTIFICATION OBJASNJENAJ ZA OVA MOJA PUSH NOTIFICATIO NOBJASNJENJA

    let options = {
        body: data.content,
        icon: '/src/images/icons/icon-96x96.png',
        badge: '/src/images/icons/icon-96x96.png'
    }

    // JA SAM MOGAO POSLATI I URL, KAO DEO PAYLOAD-A
    // PAYLOAD JE OGRANICEN NA 4kB
    // STO ZNACI DA NE MOGU POSLATI CELU SLIKU
    // ALI BIH MOGAO OBEZBEDITI URL SLIKE

    // DAKLE MORAM KORISTITI 'DEO SERVICE WORKERA' KOJI SE RUNN-UJE U BROWSERU
    // GOVORIM O ServiceWorkerRegistration INSTANCI; A KAKO BIH
    // PRIKAZAO NOTIFICATION

    // POMENUTOJ INSTANCI PRISTUPAM PUTEM       self.registration

    // NAIME, TAKODJE MORAM OPET KORISTITI METODU        waitUntil


    ev.waitUntil(

        self.registration.showNotification(data.title, options)

    );

})
```

## NAKON STO UPDATE-UJEM SERVICE WORKER, MOGU SADA ISPITATI MOJ CODE

> ps .KAO STO SAM GOVORIO RANIJE NEMOJ DA CLEAR-UJES SITE DATA JER CE TO UNREGISTER SERVICE WORKER [1](#da-se-podsetim-i-ovoga-ako-unregister-ujem-service-worker-a-subscription-ce-za-tog-client-a-biti-nevazeci-iako-sam-ga-ranije-subscribe-ovao-dakle-onaj-subscription-koji-je-stored-na-serveru-i-koji-ima-endpoint-vendor-server-a-url-nece-vise-biti-upotrebljen-jer-ce-novi-service)

SUBMITTOVATI FORMULAR MOG APP, ODNOSNO POSLATI POST REQUEST, STO CE AN BACKENDU TAKODJE INICIJALIZOVATI I SLANJE PUSH REQUESTA, JER SAM JA TAK OTAM ODEFINISAO

SADA POSTO SAM U SERVICE WORKER-U DEFINISAO PRIKAZ NOTIFIKACIJE, KOJA TREBA DA SE PRIKAZE I SA PAYLOAD-OM POSLATIM SA PUSH MESSAGE-OM, JER SAM JA TAK ODEFINISAO 

SADA MOGU VIDETI DA LI CE SE NOTIFICATIO NSTVARNO PRIKAZATI