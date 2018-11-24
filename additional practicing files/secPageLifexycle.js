/* console.log(    window.getComputedStyle(document.querySelector('p:last-of-type')).textAlign    );
console.log(    window.getComputedStyle(document.querySelector('p:last-of-type')).borderColor    );
console.log(    window.getComputedStyle(document.querySelector('p:last-of-type'))    );
console.log(    window.getComputedStyle(document.querySelector('p:last-of-type'))    );
 */


//  MISLIM DA OVAKO MOGU UPOTREBITI POVRATNU VREDNOST       getComputedStyle        METODE

const poslednjiParagraf = document.querySelector('p:last-of-type');

console.log(
    window.getComputedStyle(poslednjiParagraf).textAlign,
    window.getComputedStyle(poslednjiParagraf)['text-align'],
    window.getComputedStyle(poslednjiParagraf).getPropertyValue('text-align')
);

console.log(
    window.getComputedStyle(document.querySelector('p:last-of-type')).borderColor,
    window.getComputedStyle(document.querySelector('p:last-of-type'))['border-color'],
    window.getComputedStyle(document.querySelector('p:last-of-type')).getPropertyValue('border-color')
);

console.log(
    window.getComputedStyle(document.querySelector('p:last-of-type'))['border-right-color'],
    window.getComputedStyle(document.querySelector('p:last-of-type')).borderLeftColor,
    window.getComputedStyle(document.querySelector('p:last-of-type')).getPropertyValue('border-top-color'),
    window.getComputedStyle(document.querySelector('p:last-of-type')).borderBottomColor
);




const secParag = document.querySelector('body p:nth-of-type(4)')

/* console.log(secParag); */

/* const customEvent = new CustomEvent('blah', {cancelable: true, bubbles: false});

secParag.addEventListener('blah', function(ev){

    ev.preventDefault();
    console.log(ev.currentTarget);
}); */

/* window.onbeforeunload = function(ev){

    //OVA J CODE JE SAMO TU DA PROVERIM DA LI CE SE IZVRSITI
    let a = 4;
    a++;
    while(a < 18){
        a++;
    }
    console.log(a, ev);
    ///////////////////////////////////////////////////////////

    ev.preventDefault();

    return null;
    // OVA PORUKA CE BITI PRIKAZANA U INTERNET EXPLORERU KADA SE BUDE NAPUSTALA STRANICA
    ev.returnValue = 'Da li zelis da napustis stranicu? Ovo je vrednost brojaca: ' + a;
    // U SVIM OSTALIM BROWSERIMA NECE BITI PRIKAZANA OVA PORUKA, JER ONI IMAJU SVOJU CUSTOM PORUKU
}; */




