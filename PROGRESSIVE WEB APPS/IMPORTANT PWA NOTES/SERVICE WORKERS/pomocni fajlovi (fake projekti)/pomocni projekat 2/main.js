window.navigator.serviceWorker.register('/service-worker.js');

console.log(window.navigator.serviceWorker.controller);

const image = new Image();

image.style.width = '38vw';
image.rel = "syntwave image";

window.setTimeout(function(image){
    document.body.prepend(image);
    image.src = "/images/com_screen.jpg";
}, 3800, image);
