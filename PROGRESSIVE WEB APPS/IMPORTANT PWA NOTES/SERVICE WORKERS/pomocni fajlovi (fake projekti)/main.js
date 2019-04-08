console.log('test');
const image = new Image();
image.rel = "synthwave picture";

document.body.append(image);

window.setTimeout(function(){
    image.src = "/images/com_screen.jpg";
}, 3800);

window.navigator.serviceWorker.register('/service.js')
.then(function(registration){
    console.log("Registration of service.js SUCESSFULL", registration);
})
.catch(function(error){
});

for(let i = 1; i <= 6; i++){
    let img = new Image();
    let src = `/images/synth_pictures/synth_${i}.jpg`;
    img.src = src;
    img.rel = `synth image ${i}`;
    document.body.append(img);
}

document.querySelectorAll(`img[src^="/images/synth_pictures"]`).forEach(function(img){
    img.style.visibility = "hidden";
});


const ankor = document.createElement('a');

//----------------
const urlA = new URL('/images/doll_car.jpg', 'http://localhost:7200/images/doll_car.jpg');
//----------------

ankor.href = urlA;
ankor.textContent = "slika";
document.body.append(ankor);

console.log(urlA);
