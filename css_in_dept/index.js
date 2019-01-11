console.log(document.querySelector('img[alt="fotografija fotke"]'));
console.log(document.querySelector('div[nesto|=blah]'));
console.log(document.querySelector('div[nesto~=sejmur]'));

console.log(document.querySelector('div[nesto|=blah]'));
console.log(document.querySelectorAll('div[nesto$=filip]')[0]);

console.log('********************************************************');

console.log(document.querySelectorAll('section[nesto^=blah]'));
console.log(document.querySelectorAll('section[nesto$=ajovaska]'));

console.log(document.querySelector('div[neki*=sand]'));

console.log(document.querySelector('img[sign|=bull-cow]'))
console.log(document.querySelector('img[sign~=bull-cow]'))
console.log(document.querySelector('img[sign^=bull-cow]'))
console.log(document.querySelector('img[sign$=bull-cow]'))
console.log(document.querySelector('img[sign*=bull-cow]'))


console.log(document.querySelector('div[custom^=nesto]'));

console.log(document.querySelector('img[sign=bull-cow][alt=baklava]'));

console.log(document.querySelectorAll('section[face|=miki]'));
console.log(document.querySelectorAll('section[face|=maus]'));

/* console.log(document.querySelector('section[face=miki]'));
console.log(document.querySelector('section[face=miki]')); */

console.log(    document.querySelectorAll(':first-child')    );


console.log(document.querySelector('.kont_blah_blah li:nth-child(1):nth-last-child(2)').clientWidth);
console.log(document.querySelector('.kont_blah_blah li:nth-child(2):nth-last-child(1)').clientWidth);

console.log(document.querySelector('.kont_blah_blah ul:nth-child(2)').clientWidth);
console.log(document.querySelector('.kont_blah_blah li:nth-child(1):nth-last-child(2)').clientWidth + document.querySelector('.kont_blah_blah li:nth-child(2):nth-last-child(1)').clientWidth);

console.log(document.querySelector(':root'));


const tableEl = document.createElement('table');
tableEl.classList.add('neka_tabela');
const tableRow = document.createElement('tr');
const tableData = document.createElement('td');
const cellTextNode = document.createTextNode('cell');
tableData.appendChild(cellTextNode);

for(let i = 0; i < 22; i++){

    let rowClone = tableRow.cloneNode();

    for(let j = 0; j < 18; j++) {
        rowClone.appendChild(tableData.cloneNode(true));
    }

    tableEl.appendChild(rowClone);
}

document.body.prepend(tableEl);


document.body.prepend(document.createElement('br'));


const usTable = document.createElement('table');
const usRow = document.createElement('tr');
const usCell = document.createElement('td');
const star = document.createTextNode("\u2605"); // OVO CE MI POSLUZITI ZA ONU TABELU, U KOJU CU DA UMECEM
                                                // ZVEZDICE (UPAMTI DA KAD KORISTIS UNICODE KARAKTERE
                                                // JAVASCRIPT-U, ONI SU PREFIKSOVANI SA    \u    )
usTable.classList.add('us_flag');

for(let i = 0; i < 13; i++){
    let rowClone = usRow.cloneNode();

    if(i === 0){
        rowClone.appendChild(usCell.cloneNode()); // UMECEM SAMO JEDNU CELIJU, KOJA CE BITI CONTAINER TABELE
    }                                             // SA ZVEZDICAMA

    // DEO SA ZVEZDICAMA (KOJI TREBA DO BUDE TAKODJE DRUGA TABELA, TREBA DA ZAUZIMA 7 REDOVA)
    // ZATO U TOM SLUCAJU NE UMECEM PO 30 CELIJA U PRVIH 7 REDOVA, VEC UMECEM 18
    // DAKLE PRAVIM PROSTOR ZA JEDNU CELIJU, KOJA CE OBUHVATATI TABELU SA ZVEZDICAMA

    if(i < 7){
        
        for(let k = 0; k < 18; k++){
            rowClone.appendChild(usCell.cloneNode());
        }

    }else{

        for(let j = 0; j < 30; j++){
            rowClone.appendChild(usCell.cloneNode());
        }

    }

    usTable.appendChild(rowClone);
}

document.body.prepend(usTable);

// PRISTUPAM PRVOJ CELIJI DA BIH JE PROSIRIO
let firstCell =  document.querySelector('table.us_flag tr:first-child td:first-child');
// NA SLEDECI NACIN (DAKLE TREBA DA SE PROSTIRE PREKO 12 KOLONA I 7 REDOVA)
firstCell.setAttribute('colspan', 12);
firstCell.setAttribute('rowspan', 7);

// UMETNUCU NOVU TABELA U, POMENUTU PRVU CELIJU

firstCell.append(document.createElement('table'));

// TABELA TREBA DA IMA 9 REDOVA, A KOLONA 12

const nestedTable = firstCell.querySelector('table');

nestedTable.cellPadding = 0;
nestedTable.cellSpacing = 0;

for(let i = 0; i < 9; i++){
    let tempRow = usRow.cloneNode();

    for(let j = 0; j < 12; j++){
        tempRow.appendChild(tableData.cloneNode());
    }

    nestedTable.append(tempRow);
}

// SADA MOGU DA SE POSVETIM, UMETANJEM ZVEZDICA

nestedTable.querySelectorAll('tr:nth-of-type(2n + 1) > td:nth-of-type(2n + 1)').forEach(tData => {

    tData.appendChild(star.cloneNode());          // UMECEM ZVEZDICU U SVAKI NEPARNI RED, U SVAKU NEPARNU CELIJU

});

nestedTable.querySelectorAll('tr:nth-of-type(2n) > td:nth-of-type(2n)').forEach(tData => {

    tData.appendChild(star.cloneNode());          // UMECEM ZVEZDICU U SVAKI PARNI RED, U SVAKU PARNU CELIJU

});

document.body.prepend(document.createElement('br'));

const flagTabela = document.createElement('table');
flagTabela.id = 'flag';

for(let i = 0; i < 13; i++){

    let tRow = document.createElement('tr');

    for(let j = 0; j < 16; j++){
        
        let tData = document.createElement('td');
        tData.textContent = 'cell';
        tRow.appendChild(tData);
    
    }

    flagTabela.appendChild(tRow);
}

// TABELA CE IMATI SLEDECE ATRIBUTE

flagTabela.border = 0;          // NEMA GRANICE
flagTabela.cellPadding = 0;     // NEMA PADDING-A
flagTabela.cellSpacing = 0;     // NEMA PROSTORA MEDJU CELIJAMA

document.body.prepend(flagTabela);


console.log(    document.querySelectorAll('div.blah_div div:empty')    );  //-->  NodeList      od dva prazna div-a
console.log(    document.querySelectorAll('div.blah_div p:empty')    );  //-->    NodeList     od jednog praznog paragrafa  

// NEKA PROVERA
/* window.oblikac.onscroll = function(ev){

    console.log(ev.cancelable);

    console.log(this.scrollTop);
    console.log(this.scrollHeight);
} */

window.oblikac.onwheel = function(ev){

    console.log(ev.cancelable);

    console.log(this.scrollTop);
    console.log(this.scrollHeight);

    ev.preventDefault();
}
////////////////////////////////////////////////

/* let paragrafi =  document.querySelectorAll(`:-moz-any(div.tekst_kont, section.tekst_sek) p`) ||
document.querySelectorAll(`:-webkit-any(div.tekst_kont, section.tekst_sek) p`); */

// console.log(paragrafi);


// console.log(document.querySelectorAll(':-webkit-any(article, aside) :-webkit-any(article, aside)'))


// console.log(document.querySelector('html:lang(fr)'));
// console.log(document.querySelector('p:lang(*-CS)'));


console.log(document.querySelectorAll(':link'));
console.log(document.querySelectorAll(':any-link'));
console.log(document.querySelectorAll(':visited'));
// document.querySelector('body > div:nth-last-child(11)').tabIndex = 0;

console.log(document.querySelector('body > div:nth-last-child(11)'));

// document.querySelector('body > div:nth-last-of-type(2)').tabIndex = 0;



document.querySelector('body > div:nth-last-of-type(2)').addEventListener('mousedown', ev => {
    // ev.currentTarget.nextElementSibling.focus({preventScroll: false});
    // ev.currentTarget.blur();
    // ev.preventDefault()
    console.log(ev.currentTarget);
    console.log(ev.currentTarget.nextElementSibling);
  

    /* window.scrollBy(200, -200);
    window.scrollTo(20,400); */
});


console.log(document.querySelector('body > p:nth-last-of-type(5)'));

const focusEvent = new KeyboardEvent('art-focus');

focusEvent.code = "Tab";

document.querySelector('body > p:nth-last-of-type(5)').addEventListener('mousedown', function(ev){
    console.log(ev);

    ev.currentTarget.addEventListener('art-focus', function(){
        console.log('fokusirano');
        console.log(ev.code);
        console.log(ev.key);
    });

    ev.currentTarget.dispatchEvent(focusEvent);

    ev.currentTarget.focus();

});

document.querySelector('body > p:nth-last-of-type(5)').addEventListener('focus', ev => {
    console.log(ev);

    console.log(ev instanceof FocusEvent, ev instanceof Event)
});





