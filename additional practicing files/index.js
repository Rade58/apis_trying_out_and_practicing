console.log('test');
const nekiDivZaPractice = document.querySelector('.neki_div_practicing');

// DRUGI ARGUMENT getComputedStyle METODE SE ODNOSI NA STRING, KOJI ODGOVARA PSEUDO ELEMENTU
// U SLUCAJU REGULARNIH ELEMENATA, OVAJ ARGUMENT JE   
console.log(            window.getComputedStyle(nekiDivZaPractice, null).getPropertyValue('box-sizing') );
// PREDHODNO JE BILA SAMO PROVERA

// SAZNAO SAM DA JE U   scrollHeight    TAKODJE PORED VISINE SAME VIDLJIVE I NEVIDLJIVE SADRZINE, I PORED
// GORNJEG I DONJEG PADDING-A, ULAZI JOS NESTO
// NE ZNAM STA JE TO
// ALI, UGLAVNOM KADA URADIM SLEDECE: el.style.height = el.scrollHeight + 'px';   ; VISINA ELEMENTA 
// CE BITI VECE OD (NJEGOVE SADRZINE + GORNJI PADDING + DONJI PADDING)
// NAIME TU CE, ODNOSNO NA KRAJU BITI PRISUTAN, JEDAN PRAZAN PROSTOR

// MOJA PREDPOSTAVKA JESTE DA SE PADDING MULTIPLICIRA, I DA TAKO NASTAJE PRAZAN PROSTOR
// MEDJUTIM POSTO ZELI MSVE DA PROVERI, URADICU I SLEDECE
// IDEJA JE DA IZMERIM
                    //  KOLIKO SE PUTA, JEDAN       clientHeight        MOZE NACI U        scrollHeight
                    //  ZATIM, KOLIKI JE OSTATAK PRI TOM DELEJNJU

const client_H_inside_scroll_H_times = nekiDivZaPractice.scrollHeight/nekiDivZaPractice.clientHeight;
console.log(client_H_inside_scroll_H_times);        //-->       3.925
const ostatakH = nekiDivZaPractice.scrollHeight%nekiDivZaPractice.clientHeight;         //-->222
console.log(ostatakH);
const topPaddingValue = window.getComputedStyle(nekiDivZaPractice).getPropertyValue('padding-top');
const bottomPaddingValue = window.getComputedStyle(nekiDivZaPractice).getPropertyValue('padding-bottom');

const topPadd = parseInt(/[0-9]+/ig.exec(topPaddingValue)[0]);
const bottomPadd = parseInt(/[0-9]+/ig.exec(bottomPaddingValue)[0]);

console.log('padding str: ', topPaddingValue, bottomPaddingValue);
console.log('padding num: ', topPadd, bottomPadd);

const paddingAddition = Math.floor(client_H_inside_scroll_H_times) * (topPadd + bottomPadd);

console.log('paddingAdition: ', paddingAddition);

const clientHeighPacticeDiv = nekiDivZaPractice.clientHeight;
const cssHeightPracticeDiv = window.getComputedStyle(nekiDivZaPractice).getPropertyValue('height');
const scrollHeightPracticeDiv = nekiDivZaPractice.scrollHeight;

console.log("HEIGHTS:", cssHeightPracticeDiv, clientHeighPacticeDiv, scrollHeightPracticeDiv);
// taking paddings into account
nekiDivZaPractice.style.height = nekiDivZaPractice.scrollHeight - 
    topPadd - 
    bottomPadd + 'px';
// nekiDivZaPractice.style.height = (nekiDivZaPractice.scrollHeight - nekiDivZaPractice.clientHeight) + 'px';

///////////////////////////////////////////////////////////////////////////////////////////////////////////

console.log(document.querySelector('.some_div').getBoundingClientRect());
console.log(document.documentElement.getBoundingClientRect());

console.log(document.documentElement.clientHeight, document.documentElement.offsetHeight);

console.log(window.scrollY === window.pageYOffset);
console.log(document.documentElement.scrollTop === window.scrollY);

console.log(window.scrollY, window.pageYOffset);
console.log(document.documentElement.scrollTop, window.scrollY);






const runOnKeys = function(callback, element, ...codes){
    const codesSet = new Set();

    element.addEventListener('keydown', function(ev){
        ev.preventDefault();
        
        for(let code of codes){
            if((code === ev.code)){
                codesSet.add(code);
            }
        }

        if(codesSet.size === codes.length){
            callback();
        }

    });


    element.addEventListener('keyup', function(ev){
        codesSet.clear();
    })

};


runOnKeys(
    () => window.alert('Wanted keys are pressed'),
    document.querySelector('.lorem_paragraf'),
    'KeyO',
    'KeyL',
    'KeyK'
);




// OVO JE MOJA VERZIJA
const invocateOnKeys = function(element, funk, ...kodovi){
    const kodSet = new Set;     // DA, MOGUCE JE INSTANTICIRATI Set, BEZ DODAVANJA ZAGRADA KONSTRUKTORU
    element.addEventListener('keydown', function(ev){
        
        for(let code of kodovi){
            if(code === ev.code){       // DODAJEM SET-U, CLANOVE, SAMO AKO ODGOVARAJU NEKOM OD
                kodSet.add(ev.code);    // code ARGUMENTA
            }
        }

        if(kodSet.size === kodovi.length && ev.repeat){   // OVDE JE PRESUDILO ev.repeat
            funk();                                       // DA SAM DEFINISAO DA MORA BEZ REPEAT-A keydown-A
            kodSet.clear();                               // MOGLO BI I SA UZASTOPNO (DAKLE NE
        }                                                 // ISTOVREMENO, VEC UZASTOPNO) PRITISNUTIM  
                                                          // KEY-OVIMA (SPECIFICIRANIH code-OVA)

                                                            //A ZASTO SE SET CLEAR-UJE?
                                                            // PA MORA, JER DA NIJE, ONDA 
                                                            // KADA BI SE SLEDECI PUT BUDE
                                                            // TRIGGER-OVAO keydown, BEZ OBZIRA
                                                            // KOLIKO JE DUGMADI    
    }, false);
};

// U OVOM PRIMERU, KAO STO SE VIDI, NISAM UPOTREBIO I keyup EVENT

invocateOnKeys(
    document.querySelector('.lorem_ipsum'),
    () => {alert('the real keys')},
    'KeyJ',
    'KeyK',
    'KeyL'
);

// U PRIMERU IZ CLANKA, DUGMAD SE KRACE DRZE NEGO U SLUCAJU MOG RESENJA, KOJE ZAHTEVA REPEATING TRIGGERING
// keydown-A 

// URADICU I TAJ PRIMER




