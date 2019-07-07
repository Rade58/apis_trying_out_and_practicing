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

**A EVO GA TRENUTNI CODE, KOJI FUNKCIONISE** (NEKA OVB IMAM PRIKAZANO KAO POLAZNU TACKU, UOSTALO MDOBRO JE DA IMAM PRIKAZAN CODE, KOJI JE FUNKCIONISAO U POTPUNOSTI)

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

2. PRIKAZUJEM CODE feed.js (SAMO ONAJ DEO CODE-, KOJI ME ZANIMA)

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

    })


};

// ********************************************************
// ********************************************************
//      OVDE CU DA ZAKACIM POMENUTI HANDLER

captureButton.addEventListener('click', ev => {

    // PRVO STA DEFINISEM JESTE PRIKAZIVANJE SAMOG canvas ELEMENTA, KOJI JE PO DEFAUKLT-U SAKRIVEN

    canvasElement.style.display = "block";

    // POSTO JE USER KLIKNUO OVO CAPTURE DUGME, TO BI TREBAL ODA SAKRIJE videoPlayer ,ODNOSNO video ELEMENT

    videoPlayer.style.display = "none";

    // CAK IAKO SAKRIJEM ELEMENT, STREAM, KOJI JE UCITAN U NJEMU SA KAMERE, I DALJE GOING ON, ODNOSNO I 
    // DALJE TECE

    // DAKLE JA GA MOGU SAKRITI, A I DALJE DOBITI ACCESS TO CURRENTLY RUNNING STREAM

    // ZELIM I DA SAKRIJEM CAPTURE BUTTON

    captureButton.style.display = "none";

    // KONACNO CU SADA DEFINISATI, KAKO DA GETT-UJEM STREAM DO CANVAS-A

    // MORAM KREIRATI CONTEXT ZA canvas, I TA JCONTEXT CU STORE-OVATI U VARIJABLOJ

    let context = canvasElement.getContext('2d');

    // TO JE METODA KOJOM INICIJALIZUJEM NACIN NA KOJI CU CRTATI NA POMENUTOM CANVAS-U
    // I ONO STA SAM DEFINISAO JESTE
                                        //  ZELI MDA CRTAM 2d IMAGE
                        //  JER ZELIM IMAGE SCREENSHOT, ODNOSNO SNAPSHOT MOG STREAM-A

    // SADA MOGU KORISTITI, TAJ CONTEXT TO DRAW AN IMAGE
    // ZVUCI KOMPLIKOVANO, ALI IPAK NIJE

    // ARGUMENTI CE BITI IMAGE ELEMENT, A TO JE MOJ videoPlayer, STO CE MI AUTOMATSKI DATI STREAM
    // A SLEDECI ARGUMENTI SU BOUNARIES, A TO SU DIMANZIJE CANVAS-A

    // POCINJEM U TOP LEFT CORNERU :         KORDINATE        0    I    0
    // ZATI MDEFINISEM SIRINU, A TO MOZE BITI DEFAULT CANVAS WIDTH:        canvasElement.width

    // A STO SE TICE VISINE, TREBA DA NAPRAVIK KALKULACIJU
    //  TREBA MI VISINA KOJA JE U SKLADU SA ASPECT RATIOM VIDEA

    //    PRONALAZIM ASPECT RATIO STREAM-A, ODNOSNO VIDEA-A

    //      videoPlayer.videoWidth /  videoPlayer.videoHeight

    // A POSTO ZELI MDA ISTI ASPECT RATIO IMA SLIK,A ONDA DEFINISEM SLEDECU JEDNACINU

    //      videoPlayer.videoWidth /  videoPlayer.videoHeight   =   canvasElement.width / h

    //    I REZULTAT JE     h = canvasElement.width / (videoPlayer.videoWidth /  videoPlayer.videoHeight)


    context.drawImage(
        videoPlayer,
        0,
        0,
        canvasElement.width,
        canvasElement.width / (videoPlayer.videoWidth /  videoPlayer.videoHeight)
    );

    // SADA MOGU ZAUSTAVITI STREAM VIDEO-A

    // AKO TO NE URADIM, VIDECE SE KAMERA I DALJE; A NA MAC-U, CE TO BITI VIDLJEVO PO EED LIGHT-U KAMERE,
    // KOJ ICE POINT-OVATI U KORISNIKA

    //  ALI MORAM ACCESS-OVATI      srcObject-U VIDE-A

    //  MOGU POMISLITI DA MU TREBAM DODELITI null, AL ITO NIJE ONO STA CU URADITI

    //  PRIMENICU METODU        getVideoTracks

    // TO MI DAJE ACCESS TO ALL RUNNING STREAMS ONT HE ELEMENT

    // I ONDA MORAM PRIMENITI forEach METODU

    //  LOOPUJEM KROZ SVE RUNNING TRACKS

    //  NA KOJIM PRIMENJUJEM stop

    videoPlayer.srcObject.getVideoTracks().forEach(track => {
        track.stop();
    })

    picture = dataURItoBlob(canvasElement.toDataURL());

    console.log(picture);

})

// ********************************************************
// ********************************************************

const buttonOther = document.querySelector('.plusButtonOther');

const openCreatingPostModal = ev => {

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


    videoPlayer.srcObject.getVideoTracks().forEach(track => {
        track.stop();
    })

}

buttonOther.addEventListener('click', openCreatingPostModal);

buttonClose.addEventListener('click', closeCreatingPostModal);

/* /////////////////////////////////////////////////////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////////// */
/* ////////////////////////////////BACKGROUND SYNC//////////////////////////////////// */
/* /////////////////////////////////////////////////////////////////////////////////// */

function sendData(){

    const dataObject = {
        id: new Date().toISOString(),
        title: titleInput.value,
        location: locationInput.value,
        image: 'https://firebasestorage.googleapis.com/v0/b/instapwaclone.appspot.com/o/burgers_food.jpeg?alt=media&token=001349ec-8c02-4c16-87df-9db24b252256'
    }

    // DAKLE KADA SAM DEFINISAO body Request-A JA SAM MU ZADAO JSON STRING KAO VREDNOST
    // TO BI TREBALO DA ZAMENIM SA       FormData

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

// I OVA POMENUTA FALLABCK FUNKCIJA
// JE ISKORISCENA, ONDA KADA NE POSTOJI ServiceWorker ILI SyncManager

// DAKLE, DEFINISAO SAMTAKO
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