# ZBOG PROBLEMA KOJE SAM RANIJE IMAO PRI DEFINISANJU, ODNOSNO IMPLEMENTACIJI NATIVE DEVICE FETURE-A U MOM APP; JA OVDE OSTAVLJAM SAV CODE, KOJI JE FUNKCIONISAO PRE NEGO STO SAM POCEO SA DEFINISANJEM NATIVE DEVICE FEATURE-AOVA

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

// OVAJ HANDLER NIJE ZAKACEN ZA DUGME, JER ZA SADA NE ZELIM ON DEMAND CACHING
const cachingFunc = function(ev){

    // DOBRO JE OVDE NAPRAVITI I PROVERU U POGLEDU TOGA DA LI BROWSER PODRZAVA caches
    if('caches' in window){
        // OVDE OTVARAM ON_DEMAND_CACHE
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
// A NISTA NIJE POZVANO (USTVARI INICIJALIZACIJA MEDIA, ODNOSNO CITANJE OD KAMERE, PA PREKO CANVASA, SVE DO CAPTURED
// VIDEA JESTE DEFINISA, PA DO DOBIJANJA SNAPSHOT-AM JESTE DEFINISANO, ALI ZA SADA NIJE POZVANO)

// OVO 

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
        canvasElement.width / (videoPlayer.videoWidth /  videoPlayer.videoHeight)   // OVO JE NATACNO KORISCENJE ASPECT RATIO ODNOSA (PREDPOSTAVLJAM)
                                                                                    // OVO BIH MORAO REDEFINISATI
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

                                                                        // MEDJUTIM POMENUTO SADA NE ZADAJE PROBLEM-E
                                                                        // MORAM PROVERITI DA LI SE TO DESILO JER NISAM DOBRO
                                                                        // DEFINISAO INPUT NADIVE FEATUREA ('KAMERE PREKO CANVAS-A')

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




navigator.serviceWorker.addEventListener('message', function(message){
    console.log(message);
})
```