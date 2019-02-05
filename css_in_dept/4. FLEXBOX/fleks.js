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

/* const onKeysResize = function(ev){

    ev.preventDefault();

    const code = ev.code;
    
    let isArrow = (code === "ArrowUp" ||
                    code === "ArrowDown" ||
                    code === "ArrowLeft" ||
                    code === "ArrowRight")?true:false;    

    if(!isArrow) return;

    const incr_or_decr = 8;

    const scrollbarSizeX = document.querySelector('div.kont_fl').offsetWidth -
                           document.querySelector('div.kont_fl').clientWidth -
                           document.querySelector('div.kont_fl').clientLeft*2;
    const scrollbarSizeY = document.querySelector('div.kont_fl').offsetHeight -
                           document.querySelector('div.kont_fl').clientHeight -
                           document.querySelector('div.kont_fl').clientTop*2;
    let size;

    if(code === "ArrowUp"){
        size = resFleksKontejner.clientHeight;
        resFleksKontejner.style.height = `${Math.abs(size) + incr_or_decr + scrollbarSizeY}px`;
        return;
    }
    if(code === "ArrowDown"){
        size = resFleksKontejner.clientHeight;
        resFleksKontejner.style.height = `${Math.abs(size) - incr_or_decr + scrollbarSizeY}px`;
        return;
    }
    if(code === "ArrowLeft"){
        size = resFleksKontejner.clientWidth;
        resFleksKontejner.style.width = `${Math.abs(size) - incr_or_decr + scrollbarSizeX}px`;
        return;
    }
    if(code === "ArrowRight"){
        size = resFleksKontejner.clientWidth;
        resFleksKontejner.style.width = `${Math.abs(size) + incr_or_decr + scrollbarSizeX}px`;
        return;
    }
    
};

const flekKontDown = function(ev){
    document.body.addEventListener('keydown', onKeysResize, false);

};

const flekKontUp = function(ev){
    document.body.removeEventListener('keydown', onKeysResize);
};

resFleksKontejner.addEventListener('mousedown', flekKontDown, false);
resFleksKontejner.addEventListener('mouseup', flekKontUp, false); */

const resizing_element_with_arrows = function(elem){

    let isMousedDown;
    
    const onKeysResize = function(ev){

        ev.preventDefault();
    
        const code = ev.code;
        
        let isArrow = (code === "ArrowUp" ||
                        code === "ArrowDown" ||
                        code === "ArrowLeft" ||
                        code === "ArrowRight")?true:false;    
    
        if(!isArrow) return;
    
        const incr_or_decr = 8;
    
        const scrollbarSizeX = document.querySelector('div.kont_fl').offsetWidth -
                               document.querySelector('div.kont_fl').clientWidth -
                               document.querySelector('div.kont_fl').clientLeft*2;
        const scrollbarSizeY = document.querySelector('div.kont_fl').offsetHeight -
                               document.querySelector('div.kont_fl').clientHeight -
                               document.querySelector('div.kont_fl').clientTop*2;
        let size;
    
        if(code === "ArrowUp"){
            size = elem.clientHeight;
            elem.style.height = `${Math.abs(size) + incr_or_decr + scrollbarSizeY}px`;
            return;
        }
        if(code === "ArrowDown"){
            size = elem.clientHeight;
            elem.style.height = `${Math.abs(size) - incr_or_decr + scrollbarSizeY}px`;
            return;
        }
        if(code === "ArrowLeft"){
            size = elem.clientWidth;
            elem.style.width = `${Math.abs(size) - incr_or_decr + scrollbarSizeX}px`;
            return;
        }
        if(code === "ArrowRight"){
            size = elem.clientWidth;
            elem.style.width = `${Math.abs(size) + incr_or_decr + scrollbarSizeX}px`;
            return;
        }
        
    };
    
    const flekKontDown = function(ev){
        document.body.addEventListener('keydown', onKeysResize, false);
        isMousedDown = true;
    };
    
    const onBodyUp = function(ev){
        if(!isMousedDown) return;
        document.body.removeEventListener('keydown', onKeysResize);
        console.log("removed");
    };
    
    elem.addEventListener('mousedown', flekKontDown, false);
    document.body.addEventListener('mouseup', onBodyUp, false);
};

const resFleksKonte = document.querySelector('div.kont_fl');

resizing_element_with_arrows(resFleksKonte);