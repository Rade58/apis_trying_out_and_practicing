window.navigator.serviceWorker.register('/service-worker.js')

setTimeout(function(){
    
    window.fetch("https://httpbin.org/ip")
    .then(function(response){
        console.log(response);
        console.log(response.statusText);
        console.log('***********************************');
        console.log(response.bodyUsed);
        console.log('***********************************');
    })

}, 3800);