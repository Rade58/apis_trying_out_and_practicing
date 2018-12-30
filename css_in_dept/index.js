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
