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

    const mouseKontDownHandler = function(ev){
        isMousedDown = true;
        document.body.addEventListener('keydown', onKeysResize, false);
    };
    
    const onBodyUp = function(ev){
        if(!isMousedDown) return;
        document.body.removeEventListener('keydown', onKeysResize);
        isMousedDown = false;
        console.log('removed');
    };
    
    elem.addEventListener('mousedown', mouseKontDownHandler, false);
    document.body.addEventListener('mouseup', onBodyUp, false);
};
