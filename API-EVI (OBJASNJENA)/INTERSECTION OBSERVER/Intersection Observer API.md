# Intersection Observer API

IMAS PARENTA, ILI DALJEG ANCESTORA (TO NE MORA DA BUDE SAMO ANCESTOR) KOJI IMA overflow-y, SA VREDNOSCU scroll

IMAS DESCENDANT, KOJI SE SCROLL-UJE SA OSTALOM SADRZINOM, POMENUTOG PARENTA, ILI DALJEG ANCESTORA

DAKLE, U OVOM SLUCAJU, TI DEFINISES OBSERVER, KOJI POSMATRA, KAKO SE TO IVICE ANCESTORA I ODREDJENOG DESCENDANTA, **SUSRECU**, ODNOSNO **UKRSTAJU** TOKOM SCROLLINGA

## POSMATRAJ STVARI NA OVAKAV NACIN

KADA JE DESCENDANT NEVIDLJIV (SCROLL-OVAN IZVAN (NEKI JE OD POSLEDNJIH DESCENDANTREN-A))

**ODNOSNO, KADA JE DESCENDANT 0% VIDLJIV**,

I KADA GA BUDES POVLACIJO NA VIDLJIVOST (U VIDLJIVI DEO ANCESTORA), UZMI U OBZIR DA CE SE PRVO NA PRIMER, VIDETI

- 0 % DESCENDANT-A

- PA 1%

- PA 2%

- PA DALJE PROCENAT VIDLJIVOSTI RASTE, DOK ELEMENT NE BUDE 100% VIDLJIV

KADA JE DESCENDANT VIDLJIV (NIJE SCROLLED IZVAN JER JE NA PRIMER NEKI OD PRVIH DESCENDANTREN-A),

**ODNOSNO, KADA JE DESCENDANT 100% VIDLJIV**

I KADA GA BUDES POVLACIO U NEVIDLJIVOST (U NEVIDLJIVI DEO ANCESTORA), UZMI U OBZIR DA CE SE PRVO VIDETI

- STO PROCENATA ELEMENTA

- PA 99% ELEMENTA

- PA 98% PROCENATA

- PA DALJE SVE DOK SE DODJE DO TOGA DA NULA PROCENATA ELEMENTA BUDE VIDLJIVO

OVO STO SAM REKAO JE VEOMA VAZNO ZA LOGIKU, OVOG OBSERVERA

ODNOSNO ZA THRESHOLD-OVE DESCENDANTA (A IDEJA JE DA SE ZA ZELJENE TRESHOLDOVE, DEFINISE POZIVANJE COLLBACK-OVA)

**DAKLE, ZAPAMTI DA KADA POVLACIS U VIDLJIVOST, PROCENTE BROJIS OD 0 DO 100, AKAD POVLACIS U NEVIDLJIVOST PROCENTE BROJIS OD 100 DO 0%**

## options OBJEKAT (ARGUMENT)

```JAVASCRIPT
const nekiOptionsOb = {
    root: document.querySelector('div.nekiParent'),
    rootMargin: "-10%",
    threshold: [0.25, 0.50, 0.75]
}
```

- root

TO JE, USTVARI ANCESTOR ELEMENT (KOJI IMA overflow-y SA VREDNOSCU scroll (U OVOM SLUCAJ POSMATRACU SAMO PO y JER SE, TO U NAJVECEM BROJU SLUCAJA I RADI, A TO NE ZNACI DA SE SVE MOZE DEFINISATI I PO x))

- rootMargin

PO DEFAULTU PREDSTAVLJAJU ZAMISLJENE MARGINE, U ODNOSU NA KOJE SE DOGADJA INTERSECTION

AKO SE DEFINISE NULA PIKSELA ILI NULA POSTO, JASNO JE DA CE SE INTERSECTION, POSMATRATI U ODNOSU NA SAMU GRANICU ELEMENTA

NARAVNO MOGUCE JE DEFINISATI STRING, KOJI IMA OD JEDNE DO CETRI VREDNOSTI, DAKLE ZA SVAKU OD STRANICA ELEMENTA

MOGUCE SU I NEGATIVNE VREDNOSTI, TADA TA MARGINA, 'ULAZI U ELEMENT'

- treshold

DEFINISE KARAKTERISTICNE LINIJE NA DESCENDANT-U

MOZE BITI JEDNA VREDNOST OD NULA DO JEDAN

ILI MOZE BITI NIZ VREDNOSTI OD NULA DO JEDAN

(NARAVNO VREDNOSTI MOGU BITI I DECIMALNE, A MOGU RECI DA 0 PREDSTAVLJA NULA POSTO ELEMENTA, A JEDAN PREDSTAVLJA 100% ELEMENTA, A NA PRIMER 0.68 JESTE 68% ELEMENTA)

AKO JE JEDNA VREDNOST DEFINISANA, ONA DEFINISE LINIJU DESCENDANT-A, U ODNOSU NA KOJU SE POSMATRA INTERSECTION

A AKO JE DEFINISAN NIZ, ONDA JE DEFINISANO VISE KARAKTERISTICNIH LINIJA NA DESCENDANT ELEMENTU, U ODNOSU NA KOJE SE POSMATRA INTERSECTION

**(KOLIKO THRESHOLD-OVA, TOLIKO I POZIVANJA CALLBACK-A) + ONO POZIVANJE KOJI SE ODVIJA NAKON RELOAD-A STRANICE (onload)**

## MOJ CALLBACK, I MOJ options OBJEKAT SU ARGUMENTI IntersectionObserver KONSTRUKTORA

```JAVASCRIPT

const nekiIntersObserver = new IntersectionObserver(function(observer, entries){

    console.log(entries);
    console.log(observer);

}, nekiOptopnsOb);

```

## entries PARAMETAR (OBJEKAT) IMA INFORMACIJE, O DESCENDANT ELEMENTIMA, CIJI SE INTERSECTION SA ANCESTOR-OM POSMATRA, A observer IMA INFORMACIJE O ANCESTOR-U

OBA OBJEKTA IMAJU BOUNDING RECT INFORMACIJE (ODNOSNO KOORDINATE), ALI I JOS VAZNIJE INFORMACIJE ZA INTERSECTION

entries OBJEKAT (Array like), JE PRVENSTVENO OBJEKAT DESCENDANT-A, ILI DESCENDANTREN-A, CIJI SE INTERESCTION POSMATRA U ODNSU NA ANCESTOR

```JAVASCRIPT
// POSMATRAM intersectionRatio ZA PRVI ODNOSNO NULTI DESCENDANT
const nekiIntersObserver = new IntersectionObserver(function(observerOb, entriesOb){

    console.log(entriesOb[0].intersectionRatio);

}, nekiOptopnsOb);

```

**AKO JE ELEMENT, POTPUNO SAKRIVEN (NEKI OD DESCENDANT-OVANA ZACELJU (OBICNO SU ONI NAKON STO RELOADUJE STRANICA SAKRIVENI)), NJEGOV**

intersectionRatio &nbsp;&nbsp;&nbsp;&nbsp;JE 0 (NULA)

**AKO JE ELEMENT, POTPUNO VIDLJIV (NEKI OD DESCENDANT-OVANA NA POCETKU (OBICNO SE ONI NAKON STO SE RELOAD-UJE STRANICA, NALAZE U VIDLJIVOM DELU ANCESTOR-A)), NJEGOV**

intersectionRatio &nbsp;&nbsp;&nbsp;&nbsp;JE 1 (NULA)

**STO MI GOVORI DA AKO JE ELEMENT NA PRIMER DELOM VIDLJIV, ILI MU JE VIDLJIVO SAMO 30%**

intersectionRatio &nbsp;&nbsp;&nbsp;&nbsp;JE 0.3 (NULA)

MEDJUTIM POSTOJI JOS VREDNOSTI

```javascript
const callback = function(entries, observer) { 
  entries.forEach(entry => {
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};

// isIntersecting      JE BOOLEAN KOJI MOI GOVORI DA LI SU ANCESTOR I DESCENDANT INTERSECTED ILI NE

```

## ALI JOS NISAM ZAPOCEO OBSERVING

TO MOGU URADITI, SAMO PRIMENOM observe METODE NA IntersectionObserver INSTANCI, A KAO ARGUMENT DODAJEM DESCENDANT ELEMENT REFERENCU

```JAVASCRIPT
nekiIntersObserver.observe(document.querySelector('div.parent div:nth-of-type(1).DESCENDANT'));
```

**I TEK CE SE SADA CALLBACK IZVRSAVATI PRI SVAKOM INTERSECTIONU**

A AKO ZELIM DA PREKINEM OBSERVING, POZIVAM unobserve METODU, NA ISTI NACIN KAKO SAM POZVAO I observe

```JAVASCRIPT
nekiIntersObserver.unobserve(document.querySelector('div.parent div:nth-of-type(1).DESCENDANT'));
```

## BROWSER-OV Window KAO root ELEMENT

NA **POGRESAN** NACIN SAM POKUSAVAO DA DEFINISEM, DA MI root BROWSER-OV WINDOW, TAKOS STO SAM KAO root DEFINISAO document.documentElement

```JAVASCRIPT
const nekiOptionsOb = {
    root: document.documentElement, // POGRESNO
    rootMargin: "-10%",
    threshold: [0.25, 0.50, 0.75]
}
```

**KADA IZOSTAVIM root SETTING, TO ZNACI DA JE root ELEMENT USTVARI BROWSER-OV WINDOW**

```JAVASCRIPT
const nekiOptionsOb = { //OVO JE DAKLE PRAVILNO
    rootMargin: "-10%",
    threshold: [0.25, 0.50, 0.75]
}
```

## DEFAULT OPTIONS

AKO INSTATICIZIRAM IntersactionObserver BEZ options OBJEKTA

```javascript
const intersObs = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        console.log(entries);
    });
});  //KAO STO VIDIM, NEMA KONSTRUKTOROVOG DRUGOG ARGUMENTA, ODNOSNO options OBJEKTA
```

TO ZNACI DA JE root ELEMENT, UPRAVO BROWSER-OV WINDOW

TO ZNACI DA JE rootMargin, USTVARI NULA PIKSELA

I TO ZNACI DA JE treshold, USTVARI JEDAN (1)

## OBSERVING, I UNOBSERVING JE MOGUCE DEFINISATI I U SAMOM CALLBACK ARGUMENTU IntersactionObserver KONSTRUKTORA

EVO GA OVAJ PRIMER, KOJI SAM RADIO U JAVASCRIPTU, MOJE PRVE PWA

```javascript
const intersObs = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(entry.isIntersecting){  // AKO SU ROOT I DESCENDANT, VEC INTERSECTED
            loadImage(entry.target.querySelector('img'));
            observer.unobserve(entry.target); // VISE NEMA POTREBA DA VISE OBSERVUJEM INTERSECTIO NSA TAKVIM ELEMENTOM
        }
    });
}, options);
```

## JEDAN PROSTI PRIMER, PRIKAZUJE OSOBINE IntersectionObserver-A

STAVIO SAM GA NA [codepen](https://codepen.io/RadeIsRade/pen/PLVWNm) TAKODJE

OVO JE CODE:

```HTML
<div class="info">Downthere, I'm observing intersection of left parent and one of his DESCENDANTren
<br>
Also I'm observing intersection of right parent and one of his DESCENDANTren
<br>
Move scrollbar of both elements, for some time while looking waht is happening
</div>
<!-- OVAJ ELEMENT, CE SLUZITI SAMO DA PREKLOPI SLEDECI (TAKO CU GA POZICIONIATI)
KAKO BI PREDSTAVLJAO NEKAKAV GRID PREKO SLEDCA DVA ELEMENTA -->
<div class="relPozSusedPreko">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
<div class="showValues">
    <div>intersectionRatio for olive: <span></span></div>
    <div>intersectionRatio for crimson: <span></span></div>
</div>
<!--POSMATRACU INTERSECTION IZMEDJU FATHER-A, DRUGOG DESCENDANTA-->
<div class="father">
    <div></div>
    <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
    <!--POSMATRACU INTERSECTION IZMEDJU MOTHER-A, I DRUGOG OD POZADI DESCENDANTA-->
<div class="mother">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div></div>
</div>

<style>

    body, html {
        scroll-behavior: smooth;
    }

    div.info {
        font-size: 2.8em;
    }

    div.showValues {
        height: 60px;
        box-sizing: border-box;
        border: outset rosybrown 10px;
        width: 88vw;
    }

    div.showValues div {
        display: inline-block;
        width: calc(50% - 18px);
        padding-left: 14%;
        box-sizing: border-box;
        font-size: 1.6em;
    }
    
    div.showValues div span {
        color: purple;
    }

    div.relPozSusedPreko {
        width: 88vw;
        height: 74vh;
        position: relative;
        top: calc(74vh + 4px + 60px);
        z-index: -1;
    }

    div.relPozSusedPreko div {
        height: 10%;
        border: dotted 2px transparent;
        box-sizing: border-box;
    }

    div.relPozSusedPreko div:first-DESCENDANT {
        border-bottom-color: rgb(170, 27, 51);
        border-bottom-style: dashed;
    }
    
    div.relPozSusedPreko div:nth-DESCENDANT(2) {
        border-top-style: none;
    }
    div.relPozSusedPreko div:last-DESCENDANT {
        border-top-color: rgb(170, 27, 51);
        border-top-style: dashed;
    }
    
    div.relPozSusedPreko div:nth-last-DESCENDANT(2) {
        border-bottom-style: none;
    }
    
    div.relPozSusedPreko div:nth-DESCENDANT(2)::before,  div.relPozSusedPreko div:nth-last-DESCENDANT(2)::before {
        display: block;
        content: "-10% is rootMargin";
        width: min-content;
        margin-left: 52%;
    }

    div.relPozSusedPreko div:nth-last-DESCENDANT(2)::before {
        margin-top: 80px;
    }


    div.father, div.mother {
        border: tomato solid 4px;
        width: 44vw;
        height: 74vh;
        margin: auto;
        padding: 0;
        overflow-y: scroll;
        counter-reset: someCounter;
        display: inline-block;
    }

    div.father > div, div.mother > div {
        border: orange 4px solid;
        height: 38%;
        margin: 10px 24%;
    }

    div.father > div:nth-of-type(2) {
        background-color: olive;
        border-color: aqua;
        counter-reset: someCounter 100;
    }

    div.mother > div:nth-last-of-type(2) {
        background-color: crimson;
        border-color: blanchedalmond;
        counter-reset: someCounter 0;
    }

    div.father div div,  div.mother div div {
        height: 25%;
        border: currentColor 1px dashed;
        box-sizing: border-box;
        position: relative;
    }
    
    div.father div div::after, div.mother div div::after {
        content: counter(someCounter) "%";
        position: absolute;
        top: 100%;
        left: -18%;
        color: rgb(11, 12, 9);
        font-weight: 800;
        font-size: 1.1em;
    }

    div.father div div::after {
        counter-increment: someCounter -25;
    }

    div.mother div div::after {
        counter-increment: someCounter 25;
    }

    div.father div.almonding {
        background-color: blanchedalmond;

    }
    
    div.mother div.almonding {
        background-color: blanchedalmond;

    }

</style>

<script defer>
    setTimeout(function(){ scrollTo(0, document.documentElement.scrollHeight)}, 2000);

    const state = {
        almondedElementOlive: null,
        almondedElementCrimson: null
    };

    const spanOliveRat = document.querySelector('div.showValues div:first-DESCENDANT span');
    const spanCrimsonRat = document.querySelector('div.showValues div:last-DESCENDANT span');
    const olive = document.querySelector('div.father > div:nth-of-type(2)');
    const crimson = document.querySelector('div.mother > div:nth-last-of-type(2)');

    const optionsOlive = {
        root: document.querySelector('div.father'),
        rootMargin: '-10%',
        threshold: [0.25, 0.50, 0.75, 1]
    }
    
    const optionsCrimson = {
        root: document.querySelector('div.mother'),
        rootMargin: '-10%',
        threshold: [0.25, 0.50, 0.75, 1]
    }

    const oliveInObs = new IntersectionObserver(function(entries, observer){

        // console.log(entries[0]);

        spanOliveRat.textContent = entries[0].intersectionRatio.toFixed(2);


        if(entries[0].intersectionRatio > 0 && entries[0].intersectionRatio < 0.25){
            const deepElement = entries[0].target.querySelector('div:nth-of-type(4)');
            if(state.almondedElementOlive){
                state.almondedElementOlive.classList.remove('almonding');
            }
            deepElement.classList.add('almonding');
            state.almondedElementOlive = deepElement;
        }
        if(entries[0].intersectionRatio > 0.25 && entries[0].intersectionRatio < 0.50){
            const deepElement = entries[0].target.querySelector('div:nth-of-type(3)');
            if(state.almondedElementOlive){
                state.almondedElementOlive.classList.remove('almonding');
            }
            deepElement.classList.add('almonding');
            state.almondedElementOlive = deepElement;
        }
        if(entries[0].intersectionRatio > 0.50 && entries[0].intersectionRatio < 0.75){
            const deepElement = entries[0].target.querySelector('div:nth-of-type(2)');
            if(state.almondedElementOlive){
                state.almondedElementOlive.classList.remove('almonding');
            }
            deepElement.classList.add('almonding');
            state.almondedElementOlive = deepElement;
        }
        if(entries[0].intersectionRatio > 0.75 && entries[0].intersectionRatio < 1){
            const deepElement = entries[0].target.querySelector('div:nth-of-type(1)');
            if(state.almondedElementOlive){
                state.almondedElementOlive.classList.remove('almonding');
            }
            deepElement.classList.add('almonding');
            state.almondedElementOlive = deepElement;
        }
    }, optionsOlive);

    const crimsonInObs = new IntersectionObserver(function(entries, observer){

        // console.log(entries[0]);

        spanCrimsonRat.textContent = entries[0].intersectionRatio.toFixed(2);


        if(entries[0].intersectionRatio > 0 && entries[0].intersectionRatio < 0.25){
            const deepElement = entries[0].target.querySelector('div:nth-of-type(1)');
            if(state.almondedElementCrimson){
                state.almondedElementCrimson.classList.remove('almonding');
            }
            deepElement.classList.add('almonding');
            state.almondedElementCrimson = deepElement;
        }
        if(entries[0].intersectionRatio > 0.25 && entries[0].intersectionRatio < 0.50){
            const deepElement = entries[0].target.querySelector('div:nth-of-type(2)');
            if(state.almondedElementCrimson){
                state.almondedElementCrimson.classList.remove('almonding');
            }
            deepElement.classList.add('almonding');
            state.almondedElementCrimson = deepElement;
        }
        if(entries[0].intersectionRatio > 0.50 && entries[0].intersectionRatio < 0.75){
            const deepElement = entries[0].target.querySelector('div:nth-of-type(3)');
            if(state.almondedElementCrimson){
                state.almondedElementCrimson.classList.remove('almonding');
            }
            deepElement.classList.add('almonding');
            state.almondedElementCrimson = deepElement;
        }
        if(entries[0].intersectionRatio > 0.75 && entries[0].intersectionRatio < 1){
            const deepElement = entries[0].target.querySelector('div:nth-of-type(4)');
            if(state.almondedElementCrimson){
                state.almondedElementCrimson.classList.remove('almonding');
            }
            deepElement.classList.add('almonding');
            state.almondedElementCrimson = deepElement;
        }
    }, optionsCrimson);

    oliveInObs.observe(olive);
    crimsonInObs.observe(crimson);

</script>
```

****
EVO GA I LAZY LOADING, KOJI SAM DEFINISAO UZ POMOC INTERSECTION OBSERVER-A, U MOJOJ PRVOJ PWA

```javascript
if('IntersectionObserver' in window){
    const options = {
        rootMargin: '0px',
        threshold: 0.38
    };

    window.console.log('IntersectionObserver' in window);

    const intersObs = new IntersectionObserver(function(entries, observer){
        entries.forEach(entry => {
            console.log(entry.target);

            if(entry.isIntersecting){
                loadImage(entry.target.querySelector('img'));
                observer.unobserve(entry.target);
            }
        });
    }, options);

    document.querySelectorAll('section#content article').forEach(article => {
        intersObs.observe(article);
    });

}else{

    document.querySelectorAll('img[data-src]').forEach(image => {
        loadImage(image);
    });

}


// FOR INSERTING data-src VALUE IN scr
function loadImage(imageEl){
imageEl.src = imageEl.dataset.src;

imageEl.onload = function() {
    imageEl.removeAttribute('data-src');
};

}
```

****