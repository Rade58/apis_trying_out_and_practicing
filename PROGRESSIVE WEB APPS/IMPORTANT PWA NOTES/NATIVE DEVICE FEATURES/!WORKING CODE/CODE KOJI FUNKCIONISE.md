# OPET KREIRAM NOVA OBJASNJENJA, IZ RAZLOGA STO TOKOM DEFINISANJA CODA, VEZANOG ZA NATIVE DEVICE FEATURE-E, OPET NESTO NIJE FUNKCIONISALO; A U NASTAVKU CU I RECI STA JE MOZDA BILO PROBLEMATICNO

MOGUCI UZROCI:

- MOZDA POGRESNO KREIRANJE I UPOTREBA Blob INSTANCE

- MOZDA POGRESNA UPOTREBA FormData INSTANCE (MOGUCE DA SAM JOJ POGRESNO DODAO (APPEND-OVAO) Blob INSTANCU)

- MOZDA POGRESNO PROSLEDJIVANJE PODATKA U INDEKSIRANU BAZU (ON submit)

- ILI POGRESANO PODNOSENJE 'POST' REQUEST U SERVICE WORKER-U (TU SE PODACI, CITAJU IZ INDEXED DB-JA, I ONI SE APPENDUJU, NA INSTATICIZIRANU FormData INSTACU) (**GOVORIM O ON *sync* HANDLER-U SERVICE WORKER-A**)

- **ONO STO SIGURNO ZNAM JESTE DA JE @google-cloud/storage (FIREBASE STORAGE JE USTVARI GOOGLE CLOUD STORAGE) PAKET BIO UPOREABLJEN SA OUTDATED SITAKSOM, A MISLIM DA TA SINTAKSA, VISE NIJE SUPPORTED** (TO JE SERVER SIDE CODE)

- MOGUCE DA SU I DRUGI PAKETI U CLOUD FUNKCIJI UZROKOVALI PROBLEME (I TO NAMERAVAM DA OTKRIJEM)

ZATO OVAJ PROCES DEFINISANJA OTPOCINJEM PONOVO UZ, JOS TEMELJNIJE TESTIRANJE, MOG CODE-A

## STA CU USTVARI PONOVO FROM THE SCRATCH DEFINISATI

- SLANJE PODATAKA U indexedDB (UKLJUCUJUCI I Blob KORI REPREZENTUJE CAPTURED IMAGE)

- DEFINISANJE DIREKTNOG PODNOSENJA FormData (ON submit), U SLUCAJU KADA NISU PODRZANI window.navigator.serviceWorker ILI window.SyncManager (TADA NEMA INDEKSIRANE BAZE BROWSER-A, KAO POSREDNIKA, JER KADA SERVICE WORKER-A NEMA, ILI NEMA BACKGROUND SYNCHRONIZATION-A, **NE MOGU** IZ ON sync (**NE POSTOJI**) CITATI PODATKE OD indexedDB-JA I SLATI IH SERVERU )

- CITANJE PODATAKA IZ indexedDB, STO OBAVLJAM ON sync; I INSTANTICIZIRANJE FormData, ZATIM APPENDOVANJE PODATAKA PROCITANIH IZ indexedDB-JA I NJIHOVO APPEND-OVANJE NA FormData INSTANCU, I ONDA PRAVLJENJE 'POST' REQUESTA, SA FormData INSTANCOM U BODY-JU Request-A

**A EVO GA TRENUTNI CODE, KOJI FUNKCIONISE** (NEKA OVO IMAM PRIKAZANO KAO POLAZNU TACKU, UOSTALOM DOBRO JE DA IMAM PRIKAZAN CODE, KOJI JE FUNKCIONISAO U POTPUNOSTI)

>>> NE PRIKAZUJEM CODE FAJLOVA U POTPUNOSTI, VEC SAM ODEO CODE FAJLOVA, KOJI ME TRNUTNO ZANIMA, ODNOSNO PRIKAZUJEM CODE, GORE POMENUTIH STVARI

1. PRVO CU PRIKAZATI HELPER FUNKCIJU, KOJA 'PRETVARA' (BOLJE RECI KORISTI) DATA URI (BASE64) KAKO BI FORMIRAO Blob INSTANCU

IMAJ NA UMU DA Blob INSTANCA REPREZENTUJE FILE (U MOM SLUCAJU MENE ZANIMA IMAGE), KOJI JE NA NEKOJ LOKACIJI

A BASE64 JE STRING, USTVARI JESTE SLIKA, PREDSTAVLJENA STRINGOM U POSEBNOM FORMATU (DATA URI) (ODNOSNO TA JSTRING JESTE SLIKA TRANSFORMISANA U POSEBAN STRING)

**utility.js**:

``` javascript
function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], {type: mimeString});
    return blob;
}
```

2. PRIKAZUJEM CODE feed.js (SAMO ONAJ DEO CODE, KOJI ME ZANIMA)

**feed.js** FAJL:

```javascript
const videoPlayer = document.querySelector('video#player');
const canvasElement = document.querySelector('canvas#canvas');
const captureButton = document.querySelector('button#capture-btn');
const imagePicker = document.querySelector('input#image-picker');
const imagePickerArea = document.querySelector('div#pick-image');

let picture;    // DOLE U CODEU SAM DEFINISAO
                // DA SE NAKON KLIKA NA CAPTURE DUME
                // INICIJALIZUJE CAPTURING IMAGE, ODNOSNO SNAPSHOT-A
                // FROM VIDEO ELEMENT, UZ KORISCENJE CANVAS ELEMENT-A


// SLEDECA FUNKCIJA CE BITI POZVANA NA OTVARANJU MODAL-A, SA INPUT FIELD-OVIMA
// SVRHA JOJ JE DA PRIKAZE KAMERIN STREAM, UCITAN U VIDEO ELEMENT-U, ILI DA PRIKAZE FILE PICKER, AKO
// KAMERI NSTREAM NIJE MOGUC

const initializeMedia = function(){

    // ZELIM DA KORITIM MediaStream INSTANCU KAMERE, UREDJAJA

                                                    // PRVO ISPITATI DA LI POSTOJE mediaDevices
                                                    // U window.navigator-U
    if(!('mediaDevices' in window.navigator)){

        window.navigator.mediaDevices = {};             // AKO NE POSTOJI, PRAVIM GA

    }

    if(!('getUserMedia' in window.navigator.mediaDevices)){                     // AKO FUNKCIJA NE POSTOJI, I NJU PRAVIM
                                                                                // ODNOSNO KORISTIM POLYFILL
        window.navigator.mediaDevices.getUserMedia = function(constraints){

            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;   // ODNOSNO KORISTIM LEGACY FEATURE, KOJI IMA ISTU NAMENU

            if(!getUserMedia){

                return Promise.reject(new Error('getUserMedia is not implemented'));         // AKO NISTA NIJE DODELJENO NECU MOCI KORISTITI
                                                                                            // MediaStream KAMERE

            }

            return new Promise((resolve, reject) => {             // AKO FUNKCIJA POSTOJI, POZIVAM JE
                                                                // NADAM SE DA CE SVE BITI RESOLVED SA
                                                                // MediaStream INSTANCOM
                getUserMedia.call(
                    window.navigator,
                    constraints,
                    resolve,
                    reject
                );
                                                                // MediaStrema INSTANCA MI TREBA ZA CANVAS,
            })                                                  // KAO UNOS, KAKO IZ CANVAS-A, PROCITAO
                                                                // IMAGE, ODNOSNO BASE64 (DATA URI) IMAGE-A

        }

    }


    window.navigator.mediaDevices.getUserMedia({video: true})     // OVDE SAM UPRAVO POZVAO, POMENUTU FUNKCIJU
                                                                  // I MOGUCE JE DA JE REDEFINISANA, AKO UREDJAJ
                                                                  // NIJE PODRZAVAO mediaDevices ILI mediaDevices.getUserMedia
    .then(mediaStream => {

        videoPlayer.srcObject = mediaStream;                // AKO SVE USPE IMAM MediaStream INSTANCU
                                                            // I MOGU JE UCITATI U VIDO ELEMENT
        videoPlayer.style.display = "block";            // AKO SVE USPE, DAKLE VIDEO MOZE BITI PRIKAZAN
    })

    .catch(err => {
                        // AKO NIJE USPELO
        console.log('-o-o-o-o-o-o-o-o--o-o ERROR media devices -o-o-o-o-using picker insteado-o-o-o-o-o-: ', err)

        imagePickerArea.style.display = "block";     // PRIKAZUJEM FILE PICKER

        captureButton.style.display = "none";       // A CANVAS I VIDEO ELEMENT MI VISE NISU POTREBNI
        canvasElement.style.dysplay = "none";

    })


};

// ********************************************************
// ********************************************************
//      OVDE PRIKAZUJEM HANDLER, KOJI JE ZAKACEN NA CAPTURE DUGME
//      REKAO SAM GORE DA POSTOJI MOGUCNOST DA OVO DUGME I NE BUDE
//      PRIKAZANO (TAK OSAM DEFINISAO), AKO NEMAM PRISTUP KAMERI

//***************************************

// CONTEXT CANVASA (TO CE BITI)

let context;

//*************************************


captureButton.addEventListener('click', ev => {

    // PRVO STA DEFINISEM JESTE PRIKAZIVANJE SAMOG canvas ELEMENTA, KOJI JE PO DEFAULT-U SAKRIVEN (TAKO SAM DEFINISAO NA POCETKU U CSS-U)

    canvasElement.style.display = "block";

    // POSTO JE USER KLIKNUO OVO CAPTURE DUGME, TO BI TREBAL ODA SAKRIJE videoPlayer, ODNOSNO video ELEMENT
    // NE MORA BITI DISPLAYED VISE (I DALJE MOGU IZ NJEGA UZETI SNAPSHOT UZ POMOC CANVAS-A)

    videoPlayer.style.display = "none";

    // CAK IAKO SAKRIJEM ELEMENT, STREAM, KOJI JE UCITAN U NJEMU SA KAMERE, I DALJE GOING ON, ODNOSNO I 
    // DALJE TECE

    // DAKLE JA GA MOGU SAKRITI, A I DALJE DOBITI ACCESS TO CURRENTLY RUNNING STREAM

    // ZELIM I DA SAKRIJEM CAPTURE BUTTON

    captureButton.style.display = "none";

    // KONACNO CU SADA DEFINISATI, KAKO DA DOVEDEM STREAM DO CANVAS-A

    // MORAM KREIRATI CONTEXT ZA canvas, I TAJ CONTEXT CU STORE-OVATI U VARIJABLOJ

    // RANIJE JE CONTEXT BIO OVDE I DEKLARISAN, ALI ZAKLJUCIO SAM DA CE MI TA VARIJABLA
    // TREBATI DA SE CANVAS CLER-UJE OD SLIKE, PRILIKO MZATVARANJA MODAL-A

    context = canvasElement.getContext('2d');

    // TO JE METODA KOJOM INICIJALIZUJEM NACIN NA KOJI CU CRTATI NA POMENUTOM CANVAS-U
    // I ONO STA SAM DEFINISAO JESTE
                                        //  ZELI MDA CRTAM 2d IMAGE
                        //  JER ZELIM IMAGE SCREENSHOT, ODNOSNO SNAPSHOT MOG VIDEA

    // SADA MOGU KORISTITI, TAJ CONTEXT TO DRAW AN IMAGE
    // ZVUCI KOMPLIKOVANO, ALI IPAK NIJE

    // ARGUMENTI CE BITI IMAGE ELEMENT, A TO JE MOJ videoPlayer, STO CE CANVAS-U AUTOMATSKI DATI STREAM
    // A SLEDECI ARGUMENTI SU BOUNARIES, A TO SU DIMANZIJE CANVAS-A

    // POCINJEM U TOP LEFT CORNERU :         KORDINATE        0    I    0
    // ZATIM DEFINISEM SIRINU, A TO MOZE BITI DEFAULT CANVAS WIDTH:        canvasElement.width

    // A STO SE TICE VISINE, TREBA DA NAPRAVIK KALKULACIJU
    //  TREBA MI VISINA KOJA JE U SKLADU SA ASPECT RATIOM VIDEA

    //    PRONALAZIM ASPECT RATIO STREAM-A, ODNOSNO VIDEA-A

    //      videoPlayer.videoWidth /  videoPlayer.videoHeight

    // A POSTO ZELIM DA ISTI ASPECT RATIO IMA SLIK-A, A ONDA DEFINISEM SLEDECU JEDNACINU

    //      videoPlayer.videoWidth /  videoPlayer.videoHeight   =   canvasElement.width / h

    //    I REZULTAT JE     h = canvasElement.width / (videoPlayer.videoWidth /  videoPlayer.videoHeight)


    context.drawImage(
        videoPlayer,
        0,
        0,
        canvasElement.width,
        canvasElement.width / (videoPlayer.videoWidth /  videoPlayer.videoHeight)
    );

    // KADA SE OVO ZAVRSI, SNAPSHOT IS TAKEN I MOZE SE VIDETI U CANVAS ELEMENTU

    // SADA MOGU ZAUSTAVITI STREAM VIDEO-A

    // AKO TO NE URADIM, VIDECE SE KAMERA I DALJE; A NA MAC-U, CE TO BITI VIDLJEVO PO EED LIGHT-U KAMERE,
    // KOJI CE POINT-OVATI U KORISNIKA

    //  ALI MORAM ACCESS-OVATI      srcObject-U VIDE-A

    //  MOGU POMISLITI DA MU TREBAM DODELITI null, ALI TO NIJE ONO STA CU URADITI

    //  PRIMENICU METODU        getVideoTracks

    // TO MI DAJE ACCESS TO ALL RUNNING STREAMS ONT HE ELEMENT

    // I ONDA MORAM PRIMENITI forEach METODU

    //  LOOPUJEM KROZ SVE RUNNING TRACKS (IAKO IMA SAMO JEDNA)

    //  NA KOJIM PRIMENJUJEM stop

    videoPlayer.srcObject.getVideoTracks().forEach(track => {
        track.stop();
    })

    picture = dataURItoBlob(canvasElement.toDataURL());          // OVDE SAM ISKORITI ONU UTILITY METODU
                                                                 //  KAKO BI NAPRAVIO Blob INSTANCU, KORISTECI DATA URI SLIKE
                                                                 // DATA URI (BASE64) JE PROCITAN IZ CANVAS-A

                                                                 // I TO JE ONO GLAVNO
                                                                 // KADA IMAM OVAJ Blob, MOGU RAZMISLATI KAKO DA GA ZAJEDNO SA
                                                                 // OSTALIM PODACIMA, IZ OSTALIF INPUT FIELD-EVA POSALJEM SERVERU
                                                                 // UZ BACKGROUND SYNC ILI DIREKTNO (DIREKTNO JE FALLBACK)
    console.log(picture);

})

// ********************************************************
// ********************************************************

// OVO JE DAKLE CODE, KOJI JE TU BIO I RANIJE, A ODNOSI SE NA OTVARANJE I ZATVARANJE MODALA
// SA INPUT FIELD-OVIMA

const buttonOther = document.querySelector('.plusButtonOther');

const openCreatingPostModal = ev => {

    // canvas ne treba biti prikazan

    canvasElement.style.display = 'none';  // O NCE BITI PRIKAZAN KADA SE PRITISNE CAPTURE DUGME

    initializeMedia();   // TO JE ONA FUNKCIJA, KOJU CU POZVATI U HANDLER-U, KOJI OTVORI MODAL
                        // A ONA CE ODLUCITI DA LI CE VIDEO (CAMERA STREAM) BITI DEO MODALA, ILI
                        // CE DEO MODALA BITI FILE PICKER

    const elem = document.querySelector('div#create-post');
    elem.classList.remove('closeP');
    elem.classList.add('openP');
};

const closeCreatingPostModal = ev => {                          // OVO JE HANDLER, KOJI JE ZAKACEN ZA DUGME ZA ZATVARANJE MODAL-A
    const elem = document.querySelector('div#create-post');

    elem.classList.remove('openP');
    elem.classList.add('closeP');

    videoPlayer.style.display = "none";             // KAD SE ZATVARA MODAL, NEKA SI CANVAS I VIDEO ZATVORE
    imagePickerArea.style.display = "none";         // A AKO JE IMAGE PICKER BIO TU UMESTO NJIH, NEKA SE ON ZATVORI

    canvasElement.style.display = "none";


    /* videoPlayer.srcObject.getVideoTracks().forEach(track => {
        track.stop();
    }) */

    // TREBAO BIH SADA DA OCISTIM CANVAS, ODNOSNO DA UKLONIM SLIKU IZ NJEGA
    // JER AKO KORISNIK, OPET OTVORI MODALNI MENU SA INPUTIMA, BICE CAPTURED SLIKA
    // U CANVASU, A TO NIJE DOBRO

    if(context) context.clearRect(0, 0, canvasElement.width, canvasElement.width / (videoPlayer.videoWidth /  videoPlayer.videoHeight));


    // CAPTURE BUTTON, MOZE PONOVO BITI DISPLAYED

    captureButton.style.display = 'block';

}

buttonOther.addEventListener('click', openCreatingPostModal);

buttonClose.addEventListener('click', closeCreatingPostModal);

//* JA SAM PREDHODNO DAO DOBRO OBJASNJENJ, STA SE DESAVA, KAO POSLEDICE SVEG POMENUTOG CODE-A
// I DAO SAM OBJASNJENJA, KOJA SU SE TICALA NEKISH INSTANCI, KAKO BI IH BOLJE RAZUMEO

/* /////////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////////// */
/* ////////////////////////////////BACKGROUND SYNC//////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////////// */

// U SUSTINI, SLEDECI CODE CE BITI ONAJ CODE, KOJI CU MORATI REDEFINISATI
// A SADA CU RECI STYA CU TO REDEFINISATI

// SLEDECA FUNKCIJA, JE FALLBACK FUNKCIJA, KOJA SE POZIV, KADA BROWSER NE PODRZAVA window.SyncManager
// ILI window.navigator.serviceWorker
// ODNOSNO DOLE SAM DEFINISAO DA SE TADA POZIVA

const sendData = function(){

    // OVAJ OBJEKAT (NAKON NJEGOVOG STRINGIFYING-A) VISE NECE BITI TA VREDNOST, KOJA CE BITI U BODY-JU Request-A
    // PODNESENOM CLOUD FUNCTION-U

    const dataObject = {
        id: new Date().toISOString(),
        title: titleInput.value,
        location: locationInput.value,
        image: 'https://firebasestorage.googleapis.com/v0/b/instapwaclone.appspot.com/o/burgers_food.jpeg?alt=media&token=001349ec-8c02-4c16-87df-9db24b252256'
    }

    // DAKLE KADA SAM DEFINISAO body Request-A JA SAM MU ZADAO JSON STRING KAO VREDNOST
    // TO BI TREBALO DA ZAMENIM SA       FormData
    // A TAJ FormData BI TREBALO DA IMA I APPENDED Blob INSTANCU, KOJU SADA REFERENCIRA GLOBALNA VARIJABLA picture
    // TA BLOB INSTANCA REPREZENTUJE ONAJ MOJ, TAKEN SNAPSHOT

    fetch('https://us-central1-instapwaclone.cloudfunctions.net/storePostData', {
        method: "POST",
        body: JSON.stringify(dataObject),  // OVO BI BILO ZAMENJENO SA          FormData
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(resp => {
        console.log("Send Data: ", resp);
        updateUI(dataObject)
    })
};

// I OVA, GORE PRIKAZANA FALLABCK FUNKCIJA
// JE ISKORISCENA, ONDA KADA NE POSTOJI ServiceWorker ILI SyncManager

// DAKLE, DEFINISAO SAM TAKO
// DA CE U onsubmit HANDLER-U, POMENUTA FUNKCIJA BITI POZVANA KADA POMENUTE STVARI NISU PODRZANE

const titleInput = document.querySelector('input#title');
const locationInput = document.querySelector('input#location');
const form = document.querySelector('div#create-post form');

form.addEventListener('submit', ev => {

    ev.preventDefault();


    if(titleInput.value.trim() === "" || locationInput.value.trim() === ""){
        alert("Please enter valid data!");

        return;
    }

    closeCreatingPostModal();   // POST MODAL SE ZATVARA I KADA SE PRITISNE POST DUGME, ODNOSNO ON submit


    if('serviceWorker' in window.navigator && 'SyncManager' in window){    // AKO UOPSTE POSTOJI SyncManager I AKO BROWSER PODRZAVA ServiceWorker-E
                                                                           // BICE IZVRSEN SLEDECI CODE

        navigator.serviceWorker.ready       // AKO JE SERVICE WORKER REGISTROVAN, DOSTUPNA MI JE
        .then(swr => {                      // NJEGOVA ServiceWorkerRegistration

            // DEFINISEM, KOJE CU DATA, POSLATI U indexedDB

            // !!!!!!! OVO JE ONO STO SLEDECE ZELIM PROMENITI
            
            // !!!!!! PORED SLEDECIH PODATAKA, ONO STO BIH TREBAO POSLATI
            // U INDEKSIRANU BAZU BROWSER-A, JESTE I ONAJ Blob
            // KOJI SADA REFERENCIRA GLOBALNA       picture VARIJABLA

            let post = {
                id: new Date().toISOString(),
                title: titleInput.value,
                location: locationInput.value
                // OVDE BI SE DAKLE NASLA I Blob INSTANCA PROCITANA OD picture VARIJABLE
            }

            // SALJEM, ODNOSNO ZAPISUJEM, TAJ DATA U indexedDB
            writeData('sync-posts', post)
                                                // NAKO NSTO JE DATA UPISANA U indexedDB, MOGU SE
            .then(() => {                       // POSVETITI REGISTRACIJOM SYNC TASK-A
                                                // OVA REGISTRACIJA CE USTVARI DTI INFORMACIJU SERVICE WORKERU
                                                // DA JE ZAKAZANO STO PRE TRIGGER-OVANJE sync EVENTA

                // POSTO ZA OVO SyncManager.register() (TO JE DEFINISANO DOLE)
                // POVRATNA VREDNOST, JESTE Promise INSTANCA
                // MOGU JE RETURN-OVATI (TO NISAM RANIJE RADIO) (A NIJE NI BITNO, MOZDA SAMO ZBOG OBJASNJENJA KOJI CE BITI PARAMETAR CALLBACK-A, SLEDECEG CHAINED then-A)

                return swr.sync.register('sync-new-post');  // POVRATNA VREDNOST OVAGA JE SyncRegistration INSTANCA

                // POMENUTO (MISLIM NA POZIVANJE registration()) JE MOZDA NAJVAZNIJE ZATO STO:

                                                        // !!!!!!!! UPRAVO JE POMENUTO TRIGGER-OVALO
                                                        // !!!!!!!!        sync EVENT
                                                        // !!!!!!!! U RELATED      ServiceWorkerGlobalScope-U

                                                        // ODNOSNO KOREKTNIJE RECENO ZAKAZANO JE DA SE TAJ
                                                        // TRIGGERING DOGODI
                                                        // TO JE NARAVNO TACNO ZA ONLINE
                                                        // A AKO JE OFFLINE BIO U PITANJU
            })

            .then((syncRegistration) => {    // IAKO JE NECU KORISTITI SyncRegistration INSTANCA JE PROSLEDJENA OVOM CALLBACK-U

                let snackbarContainer = document.querySelector('#confirmation-toast');    // OVO SAMO UKAZUJE KORISNIKU DA JE
                let data = {message: "Your post was saved for synching!"};                // DATA PRVO POSLATA
                                                                                          // U INDEXED DB

                                                        // I ZATO JE MOZDA BILO KOREKTNIJE DA JE OVAJ then BIO
                                                        // CHAINED PRE PREDHODNOG
                                                        // ALI NIJE VAZNO ZA TACNOST CODE-A

                snackbarContainer.MaterialSnackbar.showSnackbar(data)

            })
            .catch(err => {
                console.log(
                    err, "STORING POST IN IndexedDb WAS UNSUCCESSFUL!" // ILI REGISTRACIJA SYNC TASKA ISTO
                );
            })

        })

    }else{      // OVO JE ELSE IZJAVA U CIJEM OBIMU EXECUTE-UJE FALLBACK, AKO NE POSTOJ I SERVICE WORKER ILI SyncMangaer

        sendData();     // DAKLE OVDE SAM POZVAO POMENUTU FALLBACK FUNKCIJU
                        // KOJA DIREKTNO SALJE 'POST' REQUEST SERVERU, SA FormDatA-OM NARAVNO
                        // TU DAKLE NECE BITI BACKGROUND SYNC
    }

})
```

3. **BACKGROUND SYCHRONIZATION U SERVICE WORKER-U**

sw.js FAJL:

```javascript

// RECI CU STA CU OVDE PROMENITI, ALI DACU I DODATNA OBJASNJENJA

self.addEventListener('sync', function(ev){

    console.log('--+---+-- SyncEvent --+---+--+---+-   ', ev);

    if(ev.tag === 'sync-new-post'){  // NARAVNO, AKO JE TRIGGER-OVAN sync EVENT, RELATED SA POMENUTOM REGISTRACIJOM
                                     // MOGU OVAJ STRING NAZVATI I REGISTRATION TAG-OM, TU JE DOSTUPAN, DA BIH ZNAO
                                     // STA DA VADIM IZ indexedDB-JA

        ev.waitUntil(                       // SERVICE WORKER DAKLE CEKA DOK SE SLEDECE NE IZVRSI

            readAllData('sync-posts')      // CITAM ONE PODATKE, KOJI SU POTREBNI ZA SLANJE SERVER-U

            .then(dataArray => {

                for(let data of dataArray){

                    fetch('https://us-central1-instapwaclone.cloudfunctions.net/storePostData', {
                        method: "POST",
                        body: JSON.stringify({             // !!!! DAKLE OVO JE ONO STO CU MENJATI
                            id: data.id,                   // !!!! POSTO ZELIM DA PODATKE SALJEM KROZ FormData INSTANCA (DAKLE, ZELIM DA ONA BUDE U BODY-JU)
                            title: data.title,             // !!!! JA NE ZELIM STRINGIFIED OBJEKAT, KOJI JE SADA OVDE
                            location: data.location,       // !!!! A ONO STO JOS TREBA BITI APPENDED NA FormData INSTANCU, JESTE, ONAJ BLOB, KOJI SAM RANIJE SMESTIO U indexedDB

                            image: 'https://firebasestorage.googleapis.com/v0/b/instapwaclone.appspot.com/o/burgers_food.jpeg?alt=media&token=001349ec-8c02-4c16-87df-9db24b252256'

                            // OVO JE BIO DUMMY IMAGE I ZATO JE OVO HARD CODED URL, KAKO GA NAZIVAJU
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    })
                    .then(resp => {
                        console.log("Send Data: ", resp);

                        if(resp.ok){

                            deleteItemFromData('sync-posts', data.id)     // KADA SU PODACI USPESNO POSLATI DO CLOUD FUNKCIJE,
                                                                          // ONI VISE NISU POTREBNI U indexedDB-JU
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

## SADA MOGU POCETI SA DEFINISANJEM FormData INSTANCE, SVUDA U CODE GDE JE TO POTREBNO (BIO TO FALLBACK ILI SERVICE WORKER)

feed.js FAJL:

```javascript
const videoPlayer = document.querySelector('video#player');
const canvasElement = document.querySelector('canvas#canvas');
const captureButton = document.querySelector('button#capture-btn');
const imagePicker = document.querySelector('input#image-picker');
const imagePickerArea = document.querySelector('div#pick-image');

let picture;
let context;

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

        console.log('-o-o-o-o-o-o-o-o--o-o ERROR media devices -o-o-o-o-using picker insteado-o-o-o-o-o-: ', err)

        imagePickerArea.style.display = "block";

        captureButton.style.display = "none";
        canvasElement.style.dysplay = "none";

    })


};

captureButton.addEventListener('click', ev => {

    canvasElement.style.display = "block";

    videoPlayer.style.display = "none";

    captureButton.style.display = "none";

    context = canvasElement.getContext('2d');

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


const buttonOther = document.querySelector('.plusButtonOther');

const openCreatingPostModal = ev => {

    canvasElement.style.display = 'none';

    initializeMedia();

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

    canvasElement.style.display = "none";

    if(context) context.clearRect(0, 0, canvasElement.width, canvasElement.width / (videoPlayer.videoWidth /  videoPlayer.videoHeight));

    captureButton.style.display = 'block';

}

buttonOther.addEventListener('click', openCreatingPostModal);

buttonClose.addEventListener('click', closeCreatingPostModal);


/* /////////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////////// */
/* ////////////////////////////////BACKGROUND SYNC//////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////////// */
                // ODAVDE POCINJE MOJA IMPLEMENTACIJA FormData

const sendData = function(){    // FALLBACK FUNKCIJA

    /* const dataObject = {
        id: new Date().toISOString(),
        title: titleInput.value,
        location: locationInput.value,
        image: 'https://firebasestorage.googleapis.com/v0/b/instapwaclone.appspot.com/o/burgers_food.jpeg?alt=media&token=001349ec-8c02-4c16-87df-9db24b252256'
    } */

    // PREDHODNI OBJEKAT JE COMMENTED OUT, JER CU KORISTITI FormData

    const postData = new FormData();



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
};


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


    if('serviceWorker' in window.navigator && 'SyncManager' in window){

        navigator.serviceWorker.ready
        .then(swr => {


            let post = {
                id: new Date().toISOString(),
                title: titleInput.value,
                location: locationInput.value
            }

            writeData('sync-posts', post)

            .then(() => {

                return swr.sync.register('sync-new-post');
            })

            .then((syncRegistration) => {

                let snackbarContainer = document.querySelector('#confirmation-toast');
                let data = {message: "Your post was saved for synching!"};

                snackbarContainer.MaterialSnackbar.showSnackbar(data)

            })
            .catch(err => {
                console.log(
                    err, "STORING POST IN IndexedDb WAS UNSUCCESSFUL!, OR REGISTRATION OF SYNC TASK"
                );
            })

        })

    }else{

        sendData();
    }

})
```
