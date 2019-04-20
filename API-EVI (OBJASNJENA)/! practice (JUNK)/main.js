window.navigator.serviceWorker.register('/service-worker.js');

setTimeout(function(){

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
}, 2000);