
const timerID = window.setInterval(function(){

    console.log(document.readyState);

    if(document.readyState === "complete"){

        console.log(
            document.querySelectorAll('img')[4].offsetHeight,
            window.getComputedStyle(document.querySelectorAll('img')[4]).getPropertyValue('height')
        );

        window.clearInterval(timerID);
    }

}, 1);
 

document.addEventListener('readystatechange', function(ev){

    console.log(document.readyState)
    
    if(document.readyState === 'complete'){

        console.log(
            document.querySelectorAll('img')[3].offsetWidth,
            window.getComputedStyle(document.querySelectorAll('img')[3]).getPropertyValue('width')
        );

    }

});

const lodashScript = document.createElement('script');
lodashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js';
document.head.append(lodashScript);

lodashScript.onload = function(ev){
    console.log(_)
}

/* const someScript = document.createElement('script');
someScript.src = 'https://example.com/404.js';        //OVAJ SCRIPT NE POSTOJI
document.head.append(someScript);

someScript.onerror = function(ev){
    console.log('Error loading ' + this.src);
}; */



/*IZ RUSKOK CLANKA PRIMER*/ 

const preloadImages = function(sources, callback){
    const imgNum = sources.length;
    let counter = 0;

    for(let source of sources){
        let img = document.createElement('img');
        img.onload = img.onerror = function(){
            counter++;
            if(counter === imgnum) callback();
        };
        img.src = source;
    }
}

// http://next.plnkr.co/edit/6CS08hJfAcs2TX4PZ3Gr?p=preview&preview
