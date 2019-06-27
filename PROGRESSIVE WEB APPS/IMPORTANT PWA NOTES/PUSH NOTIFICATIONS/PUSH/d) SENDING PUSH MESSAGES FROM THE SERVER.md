# SENDING PUSH MESSAGES FROM THE SERVER

## :sweat::sweat::sweat::sweat: OVAJ NASLOV JE NASLOV, KOJI SAM STAVIO, KADA SAM ZAVRSIO SAV CODE, JER SAM TOKOM OVOG DEVELOPMENTA IMAO MNOGO PROBLEMA :sweat::sweat::sweat::sweat:

ZATO OVDE KOPIRAM SAV CODE KOJI SAM DEFINISAO U *functions*/**index.js** FJLU (BACKEND)

OVAJ CODE JE PUN WARNING-A, ZBOG TOGA STO SVI then-OVI MORAJU IMATI return STAEMENTS, TO I NIJE UPITNO JER BI TO USTVARI IZBACILO ERROR; ON OSTO JE USTVARI DALO WARNINGE JESTE TO DA SAM IMAO NESTED PROMISE, ODNOSNO NESTED then-OVE (PREDPOSTAVLJAM ZATO STO SE TREBA IZBEGAVATI CALLBACK HELL)

ALI IPAK TO NIJE BITNO, JER JA USTVARI NISAM MOGAO TOKOM KODIRANJA DA ISKORISTIM VAPID KEYS I ENDPOINT NA PRAVI NACIN, KAKO BI POSLAO PUSH REQUEST VENDOR SERVER-U (PREDPOSTAVLJAM DA JE TO BILO U PITANJU)

**MOZDA SU ONI ERROR-I, KOJI SU USLEDILI, UPRAVO ZBOG NEPOTPUNIH PROSLEDJENIH VAPID KEYS**

UGLAVNOM, SLEDECI CODE JE FUNKCIONISAO I NA OPERI I NA FIREFOX-U, I NA CHROMEU (ZA SVE NJIH SAM USPEO DA DODJEM DO ENPOINTA (VENDOR SERVERA), NA KOJI SAM USPESNO SLAO PUSH REQUESTS)

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

## __________________ODAVDE SAM POCEO DA DEFINISEM MOJ CODE, I MOZDA VREDI SVE OPET PRECI I ISTRAZITI IMA LI NEKIH ERRORA___________________________I DOBRO JE MOZDFA PROCITATI SVA OBJASNJENJA

IDEM SADA U functions FOLDER, U FAJL index.js I TAMO CU SADA DA DEFINISEM CODE, KOJIM CE SE SLATI PUSH NOTIFICATIONS

**imaj na umu da je to moj Node.js CODE, KOJI RUNN-UJE NA FIREBASE SERVER-U** (JA TAJ CODE TAKODJE MOGU RANN-OVATI NA SVOME Node WEB SERVERU, KOJEG JOS NEMAM; A MOGAO SAM KORISTI NA PRIMER MongoDB KAO BAZU PODATAKA, ALI NI TO JOS NISAM NAUCIO)

## POTREBNO JE DA IMPORT-UJEM, JEDAN PAKET KOJI SAM RANIJE INSTALIRAO, A I KORISTIO SAM GA ZA GENERISANJE VAPID KLJUCEVA, A KOJI SE ZOVE web-push

functions/**index.js** FAJL:

```javascript
const functions = require('firebase-functions');

const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true
    // origin: 'https://instapwaclone.firebaseapp.com/',
    // optionsSuccessStatus: 200
});


const serviceAccount = require("./instaclone-fb-key.json");


// MOGU GA OVDE REQUIRE-OVATI

const webpush = require('web-push');

// A S NIJM PRVO STO ZELI MDA URADIM JESTE U OBIMU ONOG CALLBACK-A, ONOG then-A
// KOJI JE EXECUTED, KADA JE NESTO SUCCESSFULLY STORED U DATABASE-U


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://instapwaclone.firebaseio.com"
});

exports.storePostData = functions.https.onRequest(((request, response) => {


    cors(request, response, () => {

        admin.database().ref('posts').push({
            id: request.body.id,
            title: request.body.title,
            location: request.body.location,
            image: request.body.image
        })
        .then(() => {

            /* response.status(201).json({

                message: "Podaci su stored",
                id: request.body.id
            }) */


            // MISLIM NA OBIM OVOG CALLBACK-A

            // DAKLE OVDE ZELIM DA POCNEM SA SLANJEM MOJIH PUSH NOTIFIKACIJA

            // PRVO STO MORAM DA URADIM JESTE DA PODESIM VAPID DETALJE UZ POMOC PRIMENE SLEDECE FUNKCIJE


            // KAO STO SE VIDI OVDE KORISTIM ONAJ PRIVATNI VAPID KEY, KOJI SAM GENERISAO RANIJE, ALI TO NIJE 
            // SVE STA SAM DEFINISAO

            // MORAO SAM OBEZBEDITI I VALIDNI email
            // TAJ VALIDNI EMAIL PREDSTAVLJA            IDETIFIER OF MYSELF     ARGUMENT (DEFINISANO SA 
            // mailto: PREFIKSOM)

            // MOZE SE ZADATI I FAKE ONE, ALI AKO SAM SERIOUS ABOUT MY BUSYNESS I NIST NE KRIJEM,
            // OBEZBEDICU TAJ MAIL
            webpush.setVapidDetails(
                "mailto:bajic.rade2@gmail.com",

                "BBtfVYvMS-imQPqpXR8nJnNBKozSlm-8GMvqXZobvk8gGTAvkjp4vQBZEedj9t2gr3man1RfLyZ-rLgge6L32GA", // PUBLIC KEY JE DRUGI ARGUMENT (PREKOPIRAJ IZ app.js)

                "ZRyyHnrahAznbLaudchr2NOClTBOD9C"   //  PRIVATE KEY
                                                    // NARAVNO OVDE SAMO PRIKAZUJEM NEKI FAKE
                                                   // PRIVATE VAPID KEY, JER SU OVI MOJI md FAJLOVI
                                                   // NAMENJENI ZA SHOWCASE, I NE ZELIM DA NEKO
                                                   // PROCITA PRAVI PRIVATE VAPID KEY
            );

            // STO SE TICE POMENUTIH ARGUMENATA, TO JE SVE

            // POTREBNO JE SADA FETCH-OVATI subscriptions IZ DATABASE-A

            // I DATA FETC-UJEM ONCE, I ZATO NECU DEFINISATI PERMANENT LISTENER (OVO SU NAIME ODLIKE Node.js
            // KOJE SVE MORAM NAKNADNO NAUCITI)
            // U SUSTINI POZIVA SE once METODA SA 'value' STRINGOM, KAO ARGUMENTOM

            return admin.database.ref('subscriptions').once('value')
            .then(subscriptions => {    // OVAJ CALLBACK IMA MOJE SUBSCRIPTIONS SADA

                // SADA MOGU DA POSALJEM MOJE PUSH MESSAGES
                // LOOP-UJEM KROZ CEO subscriptions OBJEKAT (NIJE NIZ NEGO JE OBJEKAT),
                // UZ POMOC forEach METODE

                return subscriptions.forEach(sub => {   // IMAM PRISTUP INDIVIDUALNIM SUBSCRIPTIONIMA
                    // SADA IMA PRISTUP PROPERTIJIMA endpoint AND keys TRENUTNOG SUBSCRIPTION OBJEKTA
                    // O KOJIMA SAM GOVORIO RANIJETIM PROPERTIJIMA SAM GOVORIO U PROSLOM md FAJLU

                    // TO SU INFORMACIJE KOJE MI TREBAJ UZA SLANJE NOVOG PUSH REQUEST-A

                    // KREIRAM NOVU VARIJABLU, KOJA CE SE ZVATI pushConfig, KOJ ICE IAMTI OBJEKAT
                    // KAO VREDNOST

                    // TAJ OBJEKAT CE IMATI endpoint KAO PROPERTI

                    // UZ TO CU KORISTITI I val METODU KOJA SLUZI ZA EXTRACTING REAL JAVASCRIPT VALUE-A
                    // PREDPOSTAVLJAM DA JE FETCHED DATA U JASON FORMATU (STRING) I DA GA ZATO PRETVARAM
                    // U OBJEKAT UZ POMOC val

                    const pushConfig = {
                        endpoit: sub.val().endpoint,   // UZIMAM URL VENDOR-BROWSER SERVERA

                        // DRUGI PROPERTI SU KLJUCEVI KOJE CI EXTRACTOVATI NA ISTI NACIN

                        keys: {
                            auth: sub.val().keys.auth,           // GOVORIO SAM O OVIM KLJUCEVIMA U PROSLOM md
                                                                 // fajlu
                            p256dh: sub.val().keys.p256dh
                        }

                    }

                    // MOGAO SAM DEFINISATI DA pushConfig BUDE JEDNAKO sub.val()
                    // ALI AUTOR TUTORIJALA NIJE TO URADIO KAKO BI NA NAJBOLJI NACIN POKAZO
                    // OD CEGA TREBA DA SE SASTOJI pushConfig
                    // DAKLE DA BIH EPHASISE-OVAO CEO PROCES



                    // SADA KORISTIM webpush KAKO BI POSLAO NOTIFICATION

                    webpush.sendNotification(
                        pushConfig,             // KAO STO VIDIS, pushConfig JE PRVI ARGUMENT

                        // DRUGI ARGUMENT MOZE BITI BILO KOJI PAYLOAD, KOJI ZELIM DA POSALJEM

                        // DAKLE OVO JE IMPORTANT, JER ZA MNOGE MESSAGE-OVE JA ZELI MDA POSALJEM PAYLOAD

                        // OVO TREBA DA BUDE STRING

                        // MOGU KORISTITI JSON.stringify

                        JSON.stringify({
                            title: "Novi post",
                            content: "Novi post je dodadt"
                        })

                    )            // OVO ISTO RETURN-UJE Promise INSTANCU

                    .catch(err => {     // CATCH-UJEM BILO KOJI ERROR
                        console.log(err)  // ZELIM DA ZNAM AKO DODJE DO NEKOG ERROR-A
                    })

                })


                // SALJEM RESPONSE

                response.status(201).json({

                    message: "Podaci su stored (posts), ali i poslate su push poruke",
                    id: request.body.id
                })
            })


        })
        .catch(error => {

            response.status(500).json({
                error: error
            });

        });

    });

}))


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


// JEDNA NAPOMENA: KADA DEFINISES CALLBACK-OVE then-OVA NA SERVER STRANI, VODI RACUNA DA SVAKOI OD NJIH MORA 
// IMATI return IZJAVU, JER U SUPROTNO MCE DOCI DO ERROR-A

// A WARNINGE CES DOBITI AKO IMAS NESTED then-OVE, STO JA U MOM CODE-U IMAM (ALI TU DOBIJAS SAMO WARNING)

```

## DAKLE DEFINISAO SAM CEO SERVER SIDE SETTUP I MOGU DEPLOY-OVATI SOLUTIONM

firebase deploy

## STA SAM JA USTVARI GORE DEFINISAO

TREBALO BI MALO DA PREGLEDAM POMENUTI CODE function/index.js FAJLA

JA SAM SAMO 'NADOGRADIO' CODE, KOJ ISE ODNOSI NA HANDLE-OVANJE POST REQUEST-OVA NA SERVER STRANI (ODNOSNO FIREBASE-U)

DAKLE, KADA KORISNIK IZVRSI POSTING, SALJE SE POST REQUEST, JER SAM TAKO DEFINISAO NA CLIENT STRANI, A PORED STORING-A U DATABASE NA FIREBASEU, ONO STO CE SE SADA DOGODITI JESTE I SLANJE PUSH REQUEST-OVA SA SERVERA (FIREBASE SERVERA) (UZ SVA VAPID KEY I ENDPOINT SETTING-SE), PA DO VENDOR SERVERA

SA SVI MTI MSTVARIMA, POSLAT JE TITLE ALI I PORUKA, KOJI PREDPOSTAVLAM DA CE NA KRAJU BITI INSERTED U NOTIFICATION-U

ALI JA JIOS NISAM DOSAO DO DISPLAY-OVANJA NOTIFIKACIJA, NA CLIENT-U

**DAKLE, JA SAM DO SADA SAM ODEFINISAO SLANJE PUSH MESSAGE-OVA SA SERVERA**

ZBUNJUJEUCE MOZE BITI PRIMENA FUNKCIJE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; webpush.sendNotification

TO JE DAKLE SAMO POSLALO MOJ DEFINISANI MESSAGE, SA TITLE-OM, POMENUTOM VENDOR, ODNOSNO GOOGLOVOM SERVERU KOJI JE MIDDLE MAN IZMEDJU MOG SERVERA I SUBSCRIBED CLIENT-A

## ZASTO NEMA NOTIFIKACIJE, PREDPOSTAVLJAM DA SE TICE LISTENINGA push EVENT-A, U SERVICE WORKER GLOBAL SCOPE-U, KOJI JOS NISAM DEFINISAO

## MOGU OVO TESTIRATI TAKO STO CU NAPRAVITI NOVI POST U MOM APPP-U

ZATIM MOGU PRITISNUTI ENABLE NOTIFICATIONS DUGME (AKO VEC OD RANIJE NISAM (ALI JA VOLIM DA KAD ZAVRSIM TESTIRANJE DA NOTIFICATION PODESIM OPET NA DEFAULT (ASK AGAIN OPCIJU)))

MOGU I U FIREBASE DATABASE-U IZBRISATI SUBSCRIPTIONS (OVO JE SAMO TOKO MTESTING-A) (OVO BI INACE OBRISALO SVE SUBSCRIPTION-E KOJE IMAM)

I MOGU CLEAR-OVATI SITE DATA, TAK ODA KRECEM OD NULE (I OVO BI DOPRINELO DA NA CLIENT STRANI BUDE OBRISAN SERVICE WORKER CIME BI OPET SUBSCRIPTIONS NE BI BILI VALIDNI, JER CE OPET BITI POSLATI KROZ NOVI SERVICE WORKER, KADA ON BUDE REGISTROVAN)

ONDA MOGU NAPRAVITI JEDAN POST REQUEST, TAK OSTO CU POPUNITI FORMULAR

> ON OSTO CE SE DESITI

- PRVI NOTIFICATION JE ONAJ KOJ ISAMO JAVLJA DA JE CLIENT ENABLE-OVAO NOTIFIKACIJE (OVO SAM DEFINISAO NA CLIENT STRANI U FAJLU KOJI JE CONNECTED TO THE DOM, CEGA SE MORAM PODSETITI I VRATITI DA ISCITAM SAV TAJ CODE, ALI TO CU KAD SE BUDEM PODSECAO CELOG PWA CODE, ILI KAD BUDEM PRAVIO, NEKI NOWI PROGRESSIVE WEB APP)

- subscription OBJECT STORE JE STVOREN U MOM DATABASE-U, A IMAM JEDAN OBJEKAT KOJI PREDSTAVLJA JEDNU SUBSCKRIBCIJU, STO MOGU PROVERITI U DATABASE-U NA FIREBASE-U

>> **KAKO DA PROVERIM DA LI JE SERVER CODE IZVRSEN, KAKO TREBA, ODNOSNO KAK ODA PROVERI MDA LI JE POSLAT, TAJ PUSH REQUEST ONOM VENDOR SERVERU (MIDDLEMAN)**

**MOZES DA ODES U FIREBASE U** *Function* **TAB ILI SEKCIJU, I TAMO POGLEDAS LOGS** (OBRATI PAZNJU KOJI DATUM GLEDAS, TREBA TI POSLEDNJI (JA SAM UPAO U ZABLUDU I GLEDAO U POGRESNO IZVRSENJE FUNKCIJE, KOJE JE IMAL OERROR, A BILO OD STARIJEG DATUMA (PODESI DA TI SE NOVIJI DATUMI POKAZUJU ON TOM), ALI USTVARI CIM OTVORIS LOG, BICES BACEN NA NAJNOVIJ IDATUM, I TADA GLEDAS ZADNJU STAVKU))

