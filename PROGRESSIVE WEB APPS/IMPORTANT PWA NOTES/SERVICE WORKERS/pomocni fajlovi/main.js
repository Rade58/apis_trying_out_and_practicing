console.log('test');
const image = new Image();
image.rel = "synthwave picture";

document.body.append(image);

window.setTimeout(function(){
    image.src = "/images/com_screen.jpg";
}, 3800);

window.navigator.serviceWorker.register('/service.js')
.then(function(registration){
    console.log('***************');
    console.log("Registration of service.js SUCESSFULL");
    console.log(registration);
    console.log('***************');
})
.catch(function(error){
    console.log('***************');
    console.log("Registration of service.js FAILED");
    console.log(error);
    console.log('***************');
});

for(let i = 1; i <= 6; i++){
    let img = new Image();
    let src = `/images/synth_pictures/synth_${i}.jpg`;
    img.src = src;
    img.rel = `synth image ${i}`;
    document.body.append(img);
}