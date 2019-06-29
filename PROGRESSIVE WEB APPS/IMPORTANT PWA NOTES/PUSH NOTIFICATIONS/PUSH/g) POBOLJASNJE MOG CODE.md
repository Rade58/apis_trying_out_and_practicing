# HARDOCODING URL, KOJ ISE TREBA OTVORITI PRILIKOM CLICKA NA NOTIFICATION NIJE BAS NAJPOVOLJNIJI NACIN

TO GOVORIM IZ RAZLOGA STO BI TAJ URL TREBAO DOCI OD PAYLOAD-A, ODNOSNO SA SERVERA

## DAKLE IDEM OPET DA DEFINISEM SERVER SIDE CODE, TACNIJE ZELI MDA DEFINISEM OPTIONS KOJE CE BITI ARGUMENT webpush.sendNotification METODE; TACNIJE MEDJU TIM OPCIJAM JA ZELIM DA DEFINISEM PROPERTI openUrl

ZA TAJ PROPERTI ,JA MOGU ZADATI I APSOLUTNU, A MOGU ZADATI I RELATIVNU ADRESU

functions/index.js FAJL:

```javascript
const functions = require('firebase-functions');

const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true
});

const serviceAccount = require("./instaclone-fb-key.json");

const webpush = require('web-push');

const privateVapidKey = "oC8DBLahIEnXnAMEzbmom6BtrF6z7_p7";
const publicVapidKey = "BMfwPHbn5_YXc0wZZu5xEIIhs40w8CDWGnf2HSq-vAGVOZMLh-vS_m122NEFkI";

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
					JSON.stringify({
                        title: 'New Post',
                        content: 'New Post added!',

                        // DAKLE OVAJ OBJEKAT CE JOS IMATI I       openUrl    PROPERTI
                        // ZADACU RELATIVNI PATH ZA help/index.html PAGE, KOJ JE HOSTED NA ISTOM SERVERU

                        openUrl: '/help'    // NIJE POTREBNO NAVODITI I index.html JER TO JE ONO
                                            // STO SE PO DEFAULTU MORA OTVORITI NA PATH-U
                    })
                )
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

## REDEFINISEM CODE SERVICE WORKER-A, KAKO BI ZAISTA KORISTIO, POMENUTI URL IZ PAYLOAD-A

sw.js FAJL:

```javascript


// PRVO POGLEDAJ STA SAM OSTAVIO U KOMENTARIMA VEZANIM ZA
// ON push LISTENER, PA ONDA POGLEDAJ ON notificationclick
// LISTENER



self.addEventListener('notificationclick', ev => {

    const notification = ev.notification;

    console.log(notification);

    const action = ev.action;

    // POSTO SAM POGLEDAO STASAM DEFINISAO U DONJEM ON push
    // EVENT LISTENER-U, MOGU SE POZABAVITI EXTRACTING-OM PODATAKA


    if(action === 'confirm'){

        notification.close()

    }else{

        console.log(action);

        ev.waitUntil(
            self.clients.matchAll()
            .then(cls => {

                let firstVisibleClient = cls.find(client => {

                    return client.visibilityState === 'visible';

                });

                if(!firstVisibleClient === undefined){

                    // PODATKE MOGU EXTRACTOVATI OVDE TAKO STO CU PRISTUPITI data PROPERTIJU NOTIFIKACIJE

                    // visibleClient.navigate('https://instapwaclone.firebaseapp.com/')

                    visibleClient.navigate(ev.notification.data.url)

                }else{

                    // self.clients.openWindow('https://instapwaclone.firebaseapp.com/')

                    // I OVDE

                    self.clients.openWindow(ev.notification.data.url)

                }

                notification.close();

            })
        );

        // notification.close()
    }

})


/* LISTENING ON push EVENTS, NA SAMOM DNU SERVICE WORKER FAJLA */

self.addEventListener('push', ev => {
    console.log('********PUSH MESSAGE RECEIVED*********');
    console.log(ev);
    console.log('*********************');

    let data = {title: 'novo', content: 'Nesto novo se dogodilo', openUrl: "/"};   // MEDJU OVIM FALLBACK OPCIJAMA DEFINISAO SAM I URL FALLBACK
                                                                                // URL KOJI BI TREBAO DA SERVE-UJE index.html (MAIN PAGE)

    if(ev.data){

        data = JSON.parse(ev.data.text());

    }

    let options = {
        body: data.content,
        icon: '/src/images/icons/icon-96x96.png',
        badge: '/src/images/icons/icon-96x96.png',

        // OVDE CU DEFINISATI JOS JEDAN PROPERTI A TO CE BITI data
        // I OVO JE JAKO VAZNO
        // OVOM OPCIJOM DEFINISEM EXTRA METADATA
        // KOJI SE KASNIJE MOZE KORISTITI UPON INTERACTIO NSA NOTIFICATION-OM
        // ODNOSNO KADA SE TRIGGER-UJE EVENT NA POSLATOM, ODNOSNO DISPLAYED NOTIFICATION-U

        data: {
            // ovde mogu zadati koliko hocu podataka, odnosno koliko hocu propertija
            url: data.openUrl
        } 
    }


    ev.waitUntil(

        self.registration.showNotification(data.title, options)

    );

})
```

## MOGU ISPITATI TO DA KADA PRISTIGNE NOTIFICATION, DA L ICE TAPOM NA NDJEGA BITI OTVOREN ZADATI URL

