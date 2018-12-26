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

