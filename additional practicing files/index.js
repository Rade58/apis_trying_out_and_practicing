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

nekiDivZaPractice.style.height = nekiDivZaPractice.scrollHeight - 2*30 + 'px';
// nekiDivZaPractice.style.height = (nekiDivZaPractice.scrollHeight - nekiDivZaPractice.clientHeight) + 'px';



