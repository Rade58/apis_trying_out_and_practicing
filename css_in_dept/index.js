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

document.body.append(tableEl);


document.body.append(document.createElement('br'));


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

document.body.appendChild(usTable);

// PRISTUPAM PRVOJ CELIJI DA BIH JE PROSIRIO
let firstCell =  document.querySelector('table.us_flag tr:first-child td:first-child');
// NA SLEDECI NACIN (DAKLE TREBA DA SE PROSTIRE PREKO 12 KOLONA I 7 REDOVA)
firstCell.setAttribute('colspan', 12);
firstCell.setAttribute('rowspan', 7);

// UMETNUCU NOVU TABELA U, POMENUTU PRVU CELIJU

firstCell.append(document.createElement('table'));

// TABELA TREBA DA IMA 9 REDOVA, A KOLONA 12

const nestedTable = firstCell.querySelector('table');

for(let i = 0; i < 9; i++){
    let tempRow = usRow.cloneNode();

    for(let j = 0; j < 12; j++){
        tempRow.appendChild(tableData.cloneNode());
    }

    nestedTable.append(tempRow);
}

firstCell.style.width = `${100/(30/12)}%`;  // DA IZRACUNAM KOLIKO PROCENATA TREBA DA ZAUZIMA
// firstCell.style.height = `${100/(13/7)}%`;  

nestedTable.width = '100%';
nestedTable.height = '100%';
// SADA MOGU DA SE POSVETIM, UMETANJEM ZVEZDICA

nestedTable.querySelectorAll('tr:nth-of-type(2n + 1) > td:nth-of-type(2n + 1)').forEach(tData => {

    tData.appendChild(star.cloneNode());          // UMECEM ZVEZDICU U SVAKI NEPARNI RED, U SVAKU NEPARNU CELIJU

});

nestedTable.querySelectorAll('tr:nth-of-type(2n) > td:nth-of-type(2n)').forEach(tData => {

    tData.appendChild(star.cloneNode());          // UMECEM ZVEZDICU U SVAKI PARNI RED, U SVAKU PARNU CELIJU

});

