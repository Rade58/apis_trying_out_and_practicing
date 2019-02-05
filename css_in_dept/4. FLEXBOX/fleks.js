'use strict';

/* console.log('external script');

customElements.define('my-video', class extends HTMLVideoElement {
    constructor(){
        super();

        // const shadow = this.attachShadow({mode: 'open'});

        console.log(this.shadowRoot);

        this.elFunk = this.elFunk.bind(this);

        this.elFunk();
    }

    elFunk(par){
        console.log(this.constructor);
        // console.log(this.shadowRoot);
    }

}, {extends: 'video'}); */



const resFleksKontejner = document.querySelector('div.kont_fl');

const onKeysResize = function(ev){

    ev.preventDefault();

    const code = ev.code;
    
    let isArrow = (code === "ArrowUp" ||
                    code === "ArrowDown" ||
                    code === "ArrowLeft" ||
                    code === "ArrowRight")?true:false;

    // console.log(isArrow);    

    if(!isArrow) return;

    const incr_or_decr = 5;

    const scrollbarSizeX = document.querySelector('div.kont_fl').offsetWidth -
                           document.querySelector('div.kont_fl').clientWidth -
                           document.querySelector('div.kont_fl').clientLeft*2;
    const scrollbarSizeY = document.querySelector('div.kont_fl').offsetHeight -
                           document.querySelector('div.kont_fl').clientHeight -
                           document.querySelector('div.kont_fl').clientTop*2;

    if(code === "ArrowUp"){
        console.log(1);
        let size = resFleksKontejner.clientHeight;
        resFleksKontejner.style.height = `${Math.abs(size) + incr_or_decr + scrollbarSizeY}px`;
        return;
    }
    if(code === "ArrowDown"){
        console.log(2)
        let size = resFleksKontejner.clientHeight;
        resFleksKontejner.style.height = `${Math.abs(size) - incr_or_decr + scrollbarSizeY}px`;
        return;
    }
    if(code === "ArrowLeft"){
        console.log(3)
        let size = resFleksKontejner.clientWidth;
        resFleksKontejner.style.width = `${Math.abs(size) - incr_or_decr + scrollbarSizeX}px`;
        return;
    }
    if(code === "ArrowRight"){
        console.log(4)
        let size = resFleksKontejner.clientWidth;
        resFleksKontejner.style.width = `${Math.abs(size) + incr_or_decr + scrollbarSizeX}px`;
        return;
    }
    
};

const flekKontDown = function(ev){
    console.log('added');
    document.body.addEventListener('keydown', onKeysResize, false);

};

const flekKontUp = function(ev){

    document.body.removeEventListener('keydown', onKeysResize);

    console.log("removed");

};

resFleksKontejner.addEventListener('mousedown', flekKontDown, false);
resFleksKontejner.addEventListener('mouseup', flekKontUp, false);

