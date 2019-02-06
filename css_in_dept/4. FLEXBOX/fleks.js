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



const resFleksKontejner = document.querySelector('.kont_fl');

/* const onKeysResize = function(ev){

    ev.preventDefault();

    const code = ev.code;
    
    let isArrow = (code === "ArrowUp" ||
                    code === "ArrowDown" ||
                    code === "ArrowLeft" ||
                    code === "ArrowRight")?true:false;    

    if(!isArrow) return;

    const incr_or_decr = 8;

    const scrollbarSizeX = elem.offsetWidth -
                           elem.clientWidth -
                           elem.clientLeft*2;
    const scrollbarSizeY = elem.offsetHeight -
                           elem.clientHeight -
                           elem.clientTop*2;
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

const mouseDownHandler = function(ev){
    document.body.addEventListener('keydown', onKeysResize, false);

};

const flekKontUp = function(ev){
    document.body.removeEventListener('keydown', onKeysResize);
};

resFleksKontejner.addEventListener('mousedown', mouseDownHandler, false);
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
    
        const incr_or_decr = 18;
    
        const scrollbarSizeX = elem.offsetWidth -
                               elem.clientWidth -
                               elem.clientLeft*2;
        const scrollbarSizeY = elem.offsetHeight -
                               elem.clientHeight -
                               elem.clientTop*2;
        let size;
    
        if(code === "ArrowUp"){
            size = elem.clientHeight;
            elem.style.height = `${Math.abs(size + incr_or_decr + scrollbarSizeY)}px`;
            return;
        }
        if(code === "ArrowDown"){
            let a = 0;
            size = elem.clientHeight;

            if(2*(incr_or_decr + Math.abs(scrollbarSizeY)) > size){
                a = Math.abs(size) + incr_or_decr + Math.abs(scrollbarSizeY);
            }else{
                a = size - incr_or_decr + Math.abs(scrollbarSizeY);
            }

            elem.style.height = `${Math.abs(a)}px`;
            return;
        }
        if(code === "ArrowLeft"){
            let a = 0;
            size = elem.clientWidth;

            if(2*(incr_or_decr + Math.abs(scrollbarSizeX)) > size){
                a = Math.abs(size) + incr_or_decr + Math.abs(scrollbarSizeX);
            }else{
                a = size - incr_or_decr + scrollbarSizeX;
            }

            elem.style.width = `${Math.abs(a)}px`;
            return;
        }
        if(code === "ArrowRight"){
            size = elem.clientWidth;
            elem.style.width = `${Math.abs(size + incr_or_decr + Math.abs(scrollbarSizeX))}px`;
            return;
        }
        
    };
    
    // IGNORE THE NAME OF THIS HANDLER, IT SHOULD BE CALLED 'kontMousedownHandler'

    const mouseDownHandler = function(ev){
        isMousedDown = true;
        document.body.addEventListener('keydown', onKeysResize, false);
    };
    
    const onBodyUp = function(ev){
        if(!isMousedDown) return;
        document.body.removeEventListener('keydown', onKeysResize);
        isMousedDown = false;
        console.log('removed');
    };
    
    elem.addEventListener('mousedown', mouseDownHandler, false);
    document.body.addEventListener('mouseup', onBodyUp, false);
};

const resFleksKonte = document.querySelector('.kont_fl');

resizing_element_with_arrows(resFleksKonte);