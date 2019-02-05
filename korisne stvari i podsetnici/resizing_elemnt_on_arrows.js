// ADD AN ELEMENT TO THIS FUNCTION AS AN ARGUMENT
// CLICK ON THE ELEMENT, MOVE MOUSE ARROWS TO RESIZE IT
// RELEASE MOUSE BUTTON AND IT WON'T BE RESIZABLE ANYMORE
// REPEAT THE PROCESS

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
    
    // IGNORE THE NAME OF THIS HANDLER, THEY

    const flekKontDown = function(ev){
        isMousedDown = true;
        document.body.addEventListener('keydown', onKeysResize, false);
    };
    
    const onBodyUp = function(ev){
        if(!isMousedDown) return;
        document.body.removeEventListener('keydown', onKeysResize);
        isMousedDown = false;
    };
    
    elem.addEventListener('mousedown', flekKontDown, false);
    document.body.addEventListener('mouseup', onBodyUp, false);
};
