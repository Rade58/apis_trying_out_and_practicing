window.navigator.serviceWorker.register('/service-worker.js');

/* setTimeout(function(){

    window.fetch("https://httpbin.org/ip") // FETCH-UJEM IP ADRESU
    .then(function(response){

        console.log(response.bodyUsed);

        response.json()
        .then(function(data){
            console.log('podaci:', data);
        })

    })
                                                                    // DAKLE ONO STA ZELIM DA VIDIM JESTE
                                                                    // DA LI JE BODY ISKORISCENO
                                                                    // NAKO NSTO JE RESPONSE SERVIRAN IZ
                                                                    // CACHE-A
                                                                    // (ON CE NARAVNO BITI SERVIRAN IZ CACHE-A, TEK NAKON STO
                                                                    // SE SERVICE WORKER INSTALIRA I AKTIVIRA,
                                                                    // NAKO NCEGA CE INTERCEPT-OVATI REQUEST
                                                                    // (JER SAM JA TAK ODEFINISAO U onfetch HANDLER-U
                                                                    // SERVICE WORKER-A), I CACHIRATI RESPONSE)
                                                                    // TEK ONDA CE CACHIRANI RESPONSE BITI STALNO SERVIRAN
                                                                    // U BUDUCNOSTI
                                                                    // ALI TO SVE MOGU VIDETI DOLE U CODE-U onfetch HANDLER-A
}, 2000); */


const urlSlike = 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Paris_Metro_construction_03300288-3.jpg';

const imageContainer = document.querySelector('div.image-container');           // OVDE CU INSERT-OVATI SLIKU

fetch(urlSlike)                // FETCH-UJEM SLIKU
.then(function(response){

    return response.blob();    // RETURN-UJEM Promise, KOJI JE RESOLVED SA, Blob INSTANCOM

})
.catch(function(err){          // AKO JE NEUSPESAN FETCH IZ fetch MEDODE CE PROIZICI Response KOJI JE REJECTED SA ERROR INSTANCOM
                               // OVO JE NEKI MOJ NACIN CHAINING-A, KOJ ISAM USVOJIO
    console.log(err);          // KAKO NE BIH IMAO CALLBACK HELL

})
.then(function(blobInstanca){       // 

    console.log(blobInstanca instanceof Blob); // --> true

    const image = new Image();
    image.rel = 'old stuff';

    const url = URL.createObjectURL(blobInstanca);    // PRIMENJUJEM POMENUTU METODU          URL.createObjectUrl

    image.src = url;                                  // UCITAVAM IMAGE

    imageContainer.append(image);                     // INSERT-UJEM JE
})