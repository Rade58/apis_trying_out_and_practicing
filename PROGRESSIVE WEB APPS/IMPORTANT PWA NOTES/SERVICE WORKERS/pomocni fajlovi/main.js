console.log('test');
const image = new Image();
image.rel = "synthwave picture";

document.body.append(image);

window.setTimeout(function(){
    image.src = "/images/com_screen.jpg";
}, 3800);

window.navigator.serviceWorker.register('/service.js')
.then(function(registration){
    console.log("Registration of service.js SUCESSFULL");
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

window.onfetch = function(ev){
    console.log(ev, "OVO JE IZ WINDOW-A!!!!!!!!!");
    // NECE SE NIKAD IZVRSITI JER fetc EVENT NE MOZE DOCI DO MAIN THREAD-A
};
