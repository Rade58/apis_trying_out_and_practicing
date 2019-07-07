# ZBOG PROBLEMA KOJE SAM RANIJE IMAO PRI DEFINISANJU, ODNOSNO IMPLEMENTACIJI NATIVE DEVICE FETURE-A U MOM APP; JA OVDE OSTAVLJAM SAV CODE, KOJI JE FUNKCIONISAO PRE NEGO STO SAM POCEO SA DEFINISANJEM NATIVE DEVICE FEATURE-AOVA

IMAJ NA UMU DA JE OVO CODE, KOJI JE DEFINISAN IZMEDJU DELA KADA SAM SE BAVIO BACKGROUND SYNCOM (A KASNIJE I NOTIFICATIONIMA ())

## PRVO DA PRIKAZEM, ONAJ WORKING SERVER-SIDE CODE, ODNOSNO CLOUD FUNCTION FIREBASE-A; JER SAM IMAO PROBLEMA; PREDPOSTAVLJAM DA SAM KORISTIO STARIJ USINTAKSU I DA SAM ZATO IMAO PROBLEMAL USTVARI TO JE BIO JEDAN OD PROBLEMA

OVU FUNKCIJU SAM OVAKVU DEFINISAO KADA SAM ZAVRSIO MOJE BAVLJENJE SA PUSH NOTIFICATIONIMA, A PRE TOGA SA BACKGROUND SYNCOM (JER OVAJ SERVER CODE, HANDLE-UJE OBE STVARI); ODNOSNO OVO JE CODE, PRE SAME IMPLEMENTACIJE NATIVE DEVICE FEATURE-A (O DEBUGGINGU TIH FEATURA CU NESTO KASNIJE)

functions/index.js FAJL:

```javascript
const privateVapidKey = "oC8DBLahIEnXnom6BtrF6z7_p7Je3jarU6r";   // lazni kljucevi zbog sigurnosti su prikazani u md fajlu
const publicVapidKey = "BMfwPHbn5_YXc0wZZuGnf2HSq-vAGVOZMLh-vS_m122NEFkIgcDWDRFzvrBCChNxX_sp";

const functions = require('firebase-functions');

const admin = require('firebase-admin');
const cors = require('cors')({
    origin: true
});

const serviceAccount = require("./instaclone-fb-key.json");

const webpush = require('web-push');

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

MEDJUTIM MENI JE OVDE NAJBITNIJI BACKGROUND SYNC

## SADA CU PRIKAZATI CEO CODE feed.js, ALI OBRATI PAZNJU NA BACKGROUND SYNC DEO, I ONO STO JE RELATED WITH IT

**feed.js**

``` javascript
const buttonClose = document.querySelector('button#close-create-post-modal-btn');
const floButton = document.querySelector('div.floating-button');

if(buttonClose){
    buttonClose.addEventListener('click', function(ev){
        // ev.target.closest('div#create-post').style.display = "none";
    });
}

if(floButton){
    floButton.addEventListener('click', function(ev){
        buttonClose.closest('div#create-post').style.display = "block";
    });
}

//***************** ON DEMAN CACHING ***********************

const ON_DEMAND_CACHE = 'on-demand-cache-v1'

const cachingFunc = function(ev){

    if('caches' in window){
        window.caches.open(ON_DEMAND_CACHE)
        .then(function(cache){
            cache.addAll(['/src/images/lima.jpg', 'https://httpbin.org/get']);
        })
    }

    ev.currentTarget.remove();
    ev.currentTarget.onclick = null;
}

//******************************************************************************


//******************************************************************************

// CREATE CARD FUNCTIO (WITH POPULATING WITH DATA FROM SERVER)

const createCard = function(data){
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('momenti_kartica');
    cardWrapper.classList.add('mdl-card');
    cardWrapper.classList.add('mdl-shadow--2dp');
    cardWrapper.style.margin = 'auto';
    const titleEl = document.createElement('div');
    titleEl.classList.add('mdl-card__title');
    titleEl.style.backgroundImage = `url("${data.image}")`;  // image
    titleEl.style.backgroundSize = '100%'; // DODAO OVO
    titleEl.style.height = "180px";
    const cardTitleTextEl = document.createElement('h2');
    cardTitleTextEl.classList.add('mdl-card__title-text');
    cardTitleTextEl.textContent = data.location;          // title
    cardTitleTextEl.style.color = 'white';
    const cardSupportTextEl = document.createElement('div');
    cardSupportTextEl.classList.add('mdl-card__supporting-text');
    cardSupportTextEl.textContent = data.title;                      // location
    titleEl.appendChild(cardTitleTextEl);
    cardWrapper.appendChild(titleEl);
    cardWrapper.appendChild(cardSupportTextEl);
    componentHandler.upgradeElement(cardWrapper);
    document.querySelector('div#shared-moments').appendChild(cardWrapper);
};

// FUNKCIJU KOJA UKLANJA STARE KARTICE

const destroyOldCards = function(){
    const cards = document.querySelectorAll('div.momenti_kartica')
    if(cards){
        cards.forEach(function(card){
            document.querySelector('div#shared-moments').removeChild(card);
        })
    }
}

// FUNKCIJU, KOJA MOZE DA DODA VISE KARTICA ODJEDNOM

const updateUi = function(dataObject){
    destroyOldCards();

    for(let propertyName in dataObject){

        createCard(dataObject[propertyName]);

    }

};



//**********************************************************************************
//**********************************************************************************
// PRISTUP SERVINGA NAZAVAN 'CACHE PA NETWORK'   ****  TACNIJE indexedDB PA NETWORK     ****

let networkRponseIsHere = false;

fetch('https://instapwaclone.firebaseio.com/posts.json')
.then(function(response){
    console.log("---RESPONSE--", response)
    if(response){
        networkRponseIsHere = true;
        return response.json()
    }else{
        return Promise.reject("-----There's no network probablly-------");
    }

})
.then(function(data){

    updateUi(data);
})
.catch(function(err){
    console.log(err, "--x---x--x---x-REQUEST IS FAILED-x---x---x---x--");
})


if('indexedDB' in window){    //   DB JE NAPISANO VELIKIM SLOVIMA   !!!!! ZAPAMTI indexedDB POCINJE MALIM SLOVOM

    readAllData('posts')

    .then(function(data){

        if(!networkRponseIsHere && data){  // AKO NIJE UZETO SA NETWORKA, SERVIRACE SE IZ INDEKSIRANOG DATABASE-A BROWSERA

            console.log(data);
            console.log("!!!!!!!DATA SERVED FROM INDEXED DATABASE!!!!!")

            // POZIVANJU FUNKCIJE updateUi
            updateUi(data);
        }

    })

}


//***+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*************//
//*******OVAJ DEO PRIPADA IMPLEMENTACIJI NATIVE FEATURE-OVA***************************//
//***+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*************//

// OVAJ DEO JE BIO PROBLEMATICAN RANIJE, ZATO JE OVDE SAMO SVE DEKLARISANO I DEFINISANO,

// MEDJUTIM, OVO NIJE PROUZROKOVALO PROBLEME VEC SERVER SIDE CODE ILI POGRESNO KORISCENJE BLOB-A

const videoPlayer = document.querySelector('video#player');
const canvasElement = document.querySelector('canvas#canvas');
const captureButton = document.querySelector('button#capture-btn');
// ****************************************************************

const imagePicker = document.querySelector('input#image-picker');
const imagePickerArea = document.querySelector('div#pick-image');

let picture;

const initializeMedia = function(){

    if(!('mediaDevices' in window.navigator)){

        window.navigator.mediaDevices = {};

    }

    if(!('getUserMedia' in window.navigator.mediaDevices)){

        window.navigator.mediaDevices.getUserMedia = function(constraints){

            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if(!getUserMedia){

                return Promise.reject(new Error('getUserMedia is not implemented'));

            }

            return new Promise((resolve, reject) => {

                getUserMedia.call(
                    window.navigator,
                    constraints,
                    resolve,
                    reject
                );

            })

        }

    }

    window.navigator.mediaDevices.getUserMedia({video: true})

    .then(mediaStream => {

        videoPlayer.srcObject = mediaStream;

        videoPlayer.style.display = "block";
    })

    .catch(err => {

        imagePickerArea.style.display = "block";
        captureButton.style.display = "none";

    })


};


captureButton.addEventListener('click', ev => {

    canvasElement.style.display = "block";

    videoPlayer.style.display = "none";

    captureButton.style.display = "none";

    let context = canvasElement.getContext('2d');

    context.drawImage(
        videoPlayer,
        0,
        0,
        canvasElement.width,
        canvasElement.width / (videoPlayer.videoWidth /  videoPlayer.videoHeight)

    );


    videoPlayer.srcObject.getVideoTracks().forEach(track => {
        track.stop();
    })

    picture = dataURItoBlob(canvasElement.toDataURL());

    console.log(picture);

})

//***+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*************//
//*******++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++**********//
//***+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*************//



// ********************************************************
// ********************************************************

const buttonOther = document.querySelector('.plusButtonOther');

const openCreatingPostModal = ev => {

    // initializeMedia();      // DAKLE INICIJALIZACIJU, ODNOSNO PRIKAZ VIDEA ILI FILE PICKERA, JOS NECU DEFINISATI, DOK NE OTKLONIM GRESKE
                               //  AL ISAM SAZNAO KASNIJE DA OVO NIJE PROUZROKOVALO GRESKU (PROBLEM JE BIO SA SERVER CODE-OM)

    const elem = document.querySelector('div#create-post');
    elem.classList.remove('closeP');
    elem.classList.add('openP');
};

const closeCreatingPostModal = ev => {
    const elem = document.querySelector('div#create-post');

    elem.classList.remove('openP');
    elem.classList.add('closeP');

    videoPlayer.style.display = "none";
    imagePickerArea.style.display = "none";

}

buttonOther.addEventListener('click', openCreatingPostModal)

buttonClose.addEventListener('click', closeCreatingPostModal);

/* /////////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////////// */
/* ////////////////////////////////BACKGROUND SYNC//////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////////// */

/* OVO MI JE DAKLE NAJVAZNIJE U OVOM FAJLU (JER MORAM OVO SHVATITI) */

function sendData(){                   // FALLBACK FUNKCIJA

    const dataObject = {
        id: new Date().toISOString(),
        title: titleInput.value,
        location: locationInput.value,
        image: 'https://firebasestorage.googleapis.com/v0/b/instapwaclone.appspot.com/o/burgers_food.jpeg?alt=media&token=001349ec-8c02-4c16-87df-9db24b252256'
    }

    fetch('https://us-central1-instapwaclone.cloudfunctions.net/storePostData', {
        method: "POST",
        body: JSON.stringify(dataObject),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(resp => {
        console.log("Send Data: ", resp);
        updateUI(dataObject)
    })
}


const titleInput = document.querySelector('input#title');
const locationInput = document.querySelector('input#location');
const form = document.querySelector('div#create-post form');


form.addEventListener('submit', ev => {

    ev.preventDefault();


    if(titleInput.value.trim() === "" || locationInput.value.trim() === ""){
        alert("Please enter valid data!");

        return;
    }
    closeCreatingPostModal();


    if('serviceWorker' in window.navigator && 'SyncManager' in window){     // (POTREBNO JE DEBELO ISTRAZITI, KADA CE OVAJ USLOV BITI true)
                                                                            // JER RANIJE MI SE DESAVALO DA JE OVO SAMO BILO POZIVANO

                                                                            // ODNOSNO SLANJE PODATAKA U indexedDB JE STALNO BILO
                                                                            // INICIJALIZOVANO

                                                                            // A U SERVICE WORKERU SE NIJE TRIGGER-OVAO         sync            EVENT
                                                                            // I ONDA SE ZBOG TOGA NIJE MOGLO IZ SERVICE WORKERA
                                                                            // POCETITI SA CITANJEM PODATKAK IZ indexedDB, ODNOSNO
                                                                            // NIJE SE IS SERVICE WORKERA MOGAO POSLATI 'POST'
                                                                            // REQUEST, SA TIM PODACIMA

                                                                            // !!!!!! ALI MISLIM DA GRESIM,U PREDHODNOM
                                                                            //!!!!!! MISLIM DA SE TRIGGER-OVAO sync EVENT !!!!!!
                                                                            // !!!!!!!!!!! A DA JE PROBLEM NASTAO PRI POGRESNOM SLANJU !!!!!!
                                                                            // !!!!!!!!!! 'POST' REQUEST-A, IZ SERVICE WORKER-A !!!!!
                                                                            
                                                                            // I ZATO SAM IMAO PUN OBJECT STORE, A NISTA OD TOGA NIJE STIZAL ODO SERVER-A

                                                                        // MEDJUTIM POMENUTO SADA NE ZADAJE PROBLEM-E
                                                                        // MORAM PROVERITI DA LI SE TO DESILO JER NISAM DOBRO
                                                                        // DEFINISAO INPUT NADIVE FEATUREA ('KAMERE PREKO CANVAS-A')

                                                                // DAKLE OPET PONAVLJAM DA JE OVAJ TRENUTNI CODE, ZAISTA DOBAR, ODNOSNO ERRORLESS

        navigator.serviceWorker.ready
        .then(swr => {

            // DA SE SAMO PODSETIM DA SE OVDE PODACI SALJU INDEKSIRANOJ BAZI PODATAKA BROWSER-A

            let post = {
                id: new Date().toISOString(),
                title: titleInput.value,
                location: locationInput.value
            }


            writeData('sync-posts', post)
            .then(() => {
                swr.sync.register('sync-new-post');
            })

            .then(() => {

                let snackbarContainer = document.querySelector('#confirmation-toast');
                let data = {message: "Your post was saved for synching!"}

                snackbarContainer.MaterialSnackbar.showSnackbar(data)

            })
            .catch(err => {
                console.log(
                    err, "STORING POST IN IndexedDb WAS UNSUCCESSFUL!"
                );
            })

        })

    }else{      // OVO JE ELSE IZJAVA U CIJEM OBIMU EXECUTE-UJE FALLBACK

        sendData();   // DAKLE OVDE SAM POZVAO POMENUTU FALLBACK FUNKCIJU

    }

})

```

## ONO STO CU PRIKAZATI IZ SERVICE WORKER-A, JESTE SAMO ON sync EVENT HANDLER, JER MISLIM DA SAM S NJIM IMAO PROBLEMA RANIJE; I NEKA MI OVO BUDE KAO PODSETNIK, USTVARI KAKO DA SAZNAM, KADA SE TAJ sync EVENT, SVE RTIGGER-UJE; ONIO STO NEMA DILEME JESTE DA SLEDECI CODE FUNKCIONISE, ALI NAPOMINJEM DA SAM IMAO PROBLEMA, I DA MORAM SAZNATI, STA IH JE TO UZROKOVALO

SAMO ON sync HANDLER IZ sw.js FAJLA:

**POSTO SERVICE WORKER IMA PRISTUP KONZOLI BROWSER-A, MOGU DA STAMPAM EVENT, PA DA PROVERIM OD CEGA SE SASTOJE, NJEGOVI PROPERTIJI**

**ILI, UOPSTE DA SAZNAM, KADA SE TRIGGERUJE, POMENUTI *sync* EVENT**

```javascript
self.addEventListener('sync', function(ev){

    console.log('--+---+-- SyncEvent --+---+--+---+-   ', ev);      // DAKLE OVDE STAMPAM       SyncEvent

    if(ev.tag === 'sync-new-post'){  

        ev.waitUntil(
            readAllData('sync-posts')

            .then(dataArray => {

                for(let data of dataArray){


                    fetch('https://us-central1-instapwaclone.cloudfunctions.net/storePostData', {
                        method: "POST",
                        body: JSON.stringify({
                            id: data.id,
                            title: data.title,
                            location: data.location,
                            image: 'https://firebasestorage.googleapis.com/v0/b/instapwaclone.appspot.com/o/burgers_food.jpeg?alt=media&token=001349ec-8c02-4c16-87df-9db24b252256'
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    .then(resp => {
                        console.log("Send Data: ", resp);

                        if(resp.ok){

                            deleteItemFromData('sync-posts', data.id)

                        }


                    })
                    .catch(function(err){
                        console.log('Error, while sending data', err)
                    })

                }
            })
        );
    }
})
```

## STA SAM OTKRIO STAMPAJUCI EVENT

**PA OTKRIO SAM DA SE ON TRIGGER-UJE, UVEK NAKON STO POPUNIM I PODNSEM FORMULAR ODNOSNO**

- JA POPUNIM FORMULAR

- PODACI SE POSALJU U INDEKSIRANI DATABASE BROWSER-A

**JA ONDA RELOAD-UJEM STRANICU** (ovo je greska jer stranica i ne mora reload-ovati)

- U ON sync HANDLERU SE VADE IZ TOG DATABASE-A

- I SA TIM PODACIMA SE VRSI PODNOSENJE 'POST' REQUEST-A

**I OVO JE DIVNO**

**ALI STA MI NIJE JASNO**

RECI CU TO U SLEDECEM NASLOVU

## STA USTVARI TRIGGERUJE sync EVENT; I DALI SER ON TRIGGER-UJE, PRI SVAKOM RELOAD-U STRANICE ILI JE NESTO DRUGO U PITANJU

PRVO OBRATI PANJU DA PRE BILO KAKAVE UPOTREBE SYNC-A, TI USTVARI STORE-UJES PODATKE U INDEKSIRANU BAZU PODATKAKA

I OBRATI PAZNJU DA SE TEK ONDA BAVIS SA SYNCHRONIZATION-OM

OBRATI PAZNJU DA ***ServiceWorkerRegistration.sync** USTVARI **RETURN-UJE *SyncManager* INSTANCU**

NAD SyncManager INSTANCOM, MOZES PRIMENTITI register() METODU (SA DAVANJEM ZELJENOG STRINGA KAO ARGUMENTA (*TO JE USTVARI ***SYNCHRONIZATION TAG**)), KOJA RETURN-UJE Promise, KOJI JE RESOLVED SA **SyncRegistration** INSTANCOM

>>> TI SI TADA USTVARI REGISTROVAO SYNC TASK

ps. OVO JE MOJE MISLJENJE:

MISLIM DA TO REGISTROVANJE SYNC TASK-A (ODNOSNO *INSTATICIZIRANJE* **SyncRegistration** INSTANCE), USTVARI **TRIGGER-UJE sync EVENT U SERVICE WORKER-U**

POGLEDAJ, PONOVO CODE feed.js FAJLA (VEZANOG SAMO ZA sync) I OBRATI PAZNJU NA KOMENTARE KOJE SAM OSTAVIO:

ODNOSNO SAMO CU PREDSTAVITI ON submit EVENT HANDLER

```javascript
form.addEventListener('submit', ev => {

    ev.preventDefault();


    if(titleInput.value.trim() === "" || locationInput.value.trim() === ""){
        alert("Please enter valid data!");

        return;
    }
    closeCreatingPostModal();


    if('serviceWorker' in window.navigator && 'SyncManager' in window){    // AKO UOPSTE POSTOJI SyncManager I AKO BROWSER PODRZAVA ServiceWorker-E
                                                                           // BICE IZVRSEN SLEDECI CODE

        navigator.serviceWorker.ready       // AKO JE SERVICE WORKER REGISTROVAN, DOSTUPNA MI JE
        .then(swr => {                      // NJEGOVA ServiceWorkerRegistration

            // DEFINISEM, KOJE CU DATA, POSLATI U indexedDB

            let post = {
                id: new Date().toISOString(),
                title: titleInput.value,
                location: locationInput.value
            }

            // SALJEM, ODNOSNO ZAPISUJEM, TAJ DATA U indexedDB
            writeData('sync-posts', post)
                                                // NAKO NSTO JE DATA UPISANA U indexedDB, MOGU SE
            .then(() => {                       // POSVETITI REGISTRACIJOM SYNC TASK-A
                                                // OVA REGISTRACIJA CE USTVARI 

                // POSTO ZA OVO SyncManager.register() (TO JE DEFINISANO DOLE)
                // POVRATNA VREDNOST, JESTE Promise INSTANCA
                // MOGU JE RETURN-OVATI (TO NISAM RANIJE RADIO)
                
                return swr.sync.register('sync-new-post');  // POVRATNA VREDNOST OVAGA JE SyncRegistration INSTANCA

                // POMENUTO JE MOZDA NAJVAZNIJE ZATO STO:

                                                        //!!!!!!!!!!! UPRAVO JE POMENUTO TRIGGER-OVALO
                                                        // !!!!!!!!!!        sync EVENT
                                                        // !!!!!!!! U RELATED      ServiceWorkerGlobalScope-U

                                                        // ODNOSNO KOREKTNIJE RECENO ZAKAZANO JE DA SE TAJ
                                                        // TRIGGERING DOGODI
            })

            .then((syncRegistration) => {    // IAKO JE NECU KORISTITI SyncRegistration INSTANCA JE PROSLEDJENA OVOM CALLBACK-U

                let snackbarContainer = document.querySelector('#confirmation-toast');    // OVO SAMO UKAZUJE KORISNIKU DA JE 
                let data = {message: "Your post was saved for synching!"}                 // DATA PRVO POSLATA
                                                                                          // U INDEXED DB

                                                        // I ZATO JE MOZDA BILO KOREKTNIJE DA JE OVAJ then BIO
                                                        // CHAINED PRE PREDHODNOG
                                                        // ALI NIJE VAZNO ZA TACNOST CODE-A

                snackbarContainer.MaterialSnackbar.showSnackbar(data)

            })
            .catch(err => {
                console.log(
                    err, "STORING POST IN IndexedDb WAS UNSUCCESSFUL!" // ILI REGISTRACIJA SYNC TASKA
                );
            })

        })

    }else{      // OVO JE ELSE IZJAVA U CIJEM OBIMU EXECUTE-UJE FALLBACK, AKO NE POSTOJ I SERVICE WORKER ILI SyncMangaer

        sendData();   // DAKLE OVDE SAM POZVAO POMENUTU FALLBACK FUNKCIJU
                     // KOJA DIREKTNO SALJE 'POST' REQUEST SERVERU, SA DATOM NARAVNO

    }

})

```

**POSTO SAM OBJASNIO KADA SE TRIGGER-UJE sync EVENT U SERVICE WORKER-U, POGLEDAJ STA CE BITI IZVRSENO U ON sync HANDLER-U**

POGLEDAJ SADA KOMENTARE, KOJE SAM OSTAVIO U SERVICE WORKER-U (sw.js FAJL) (MISLIM SAMO NA sync DEO NARAVNO)

```javascript
self.addEventListener('sync', function(ev){

    console.log('--+---+-- SyncEvent --+---+--+---+-   ', ev);      // DAKLE OVDE STAMPAM       SyncEvent

    if(ev.tag === 'sync-new-post'){                 // REGISTROVAO SAM SYNC TASK, POD OVIM IMENOM,
                                                    // JA SAM TO USTVARI URADIO DA ZNAM KOJI DATA
                                                    // RELATED SA TIM TASKOM, SADA ZELIM DA HANDLE-UJEM

        ev.waitUntil(                               // JOS JEDNOM DA NAPOMENEM DA waitUntil GOVORI SERVICE WORKER-U, KAKO
                                                    // WORK ONGOING, KAKO SERVICE WORKER NE BI BIO TERMINATED UNTIL WORKS
                                                    // COMPLETION

            readAllData('sync-posts')          // CITA MSVE PODATKE IZ OBJECT STORE-A

            .then(dataArray => {

                for(let data of dataArray){      // ZA SVAKI OBJEKAT PRAVIM PO 'POST' REQUEST


                    fetch('https://us-central1-instapwaclone.cloudfunctions.net/storePostData', {
                        method: "POST",
                        body: JSON.stringify({
                            id: data.id,
                            title: data.title,
                            location: data.location,
                            image: 'https://firebasestorage.googleapis.com/v0/b/instapwaclone.appspot.com/o/burgers_food.jpeg?alt=media&token=001349ec-8c02-4c16-87df-9db24b252256'
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    .then(resp => {
                        console.log("Send Data: ", resp);

                        if(resp.ok){

                            deleteItemFromData('sync-posts', data.id)

                        }


                    })
                    .catch(function(err){
                        console.log('Error, while sending data', err)
                    })

                }
            })
        );
    }
})
```

## HAJDE DA ZAKLJUCIM NESTO VEZANO ZA TRIGGERING sync EVENT-A

PRVO CU DA VIDIM **ONLINE**:

- PODACI SE SALJU U INDEKSIRANU BAZU BROWSER-A (A TI PODACI SU 'RELATED' SA ODGOVARAJUCIM SYNC TASKOM) (TASK SAM SAMO REGISTROVAO, NAKON STO SU PODACI STAVJLENI U indexedDB (ONI NEMAJU NEKU KLJUC/VALUE VEZU, VEC SAMO SAM DEFINSAO REGISTRACIJU TASKA (ON SAD IMA RELATED TAG (TO JE STRING ARGUMENT REGISTRACIJE)), NAKON POHRANJIVANJA U BAZU (UZ POMOC Promise-A NARAVNO)))

- U SERVICE WORKERU CE SE sync EVENT, ODMAH TRIGGER-OVATI NAKON SVEGA OVOGA; I JA SAM U NJEMU DEFINISAO DA SE ZA TASK (UZ POMOC POMENUTOG REGISTRATION TAG-A), PODACI SADA VADE IZ BAZE I DA SE ZA SVAKI OBJEKAT IZ RELATED OBJECT STORE, SALJE POJEDINACNI 'POST' REQUEST

SADA CU DA VIDIM **OFFLINE**

SITUACIJA JE DRUGACIJA

- SADA IMAM SAMO STAVLJANJE PODATAKA U indexedDB

- I ONI CE TAKO CEKATI NA USPOSTAVLJANJE NETWORK CONNECTIONA; I TEK KADA SE USPOSTAVI NETWORK CONNECTION, NZAVISNO OD BROWSERA, ON MOZE BITI I ZATVORE NA UREDJAU; E TADA CE SE TRIGGER-OVATI sync EVENT U SERVICE WORKER GLOBAL SCOPE-U, I ODPOCECE VADJENJE PODATKA IZ BAZE I SLANJE TIH PODATAKA 'POST' REQUEST-OVIMA

