# DYNAMIC import()

[caniuse](https://caniuse.com/#search=dynamic%20import) (LADA SAM PISAO OVO EDGE I FIREFOX NISU IMALI PODRSKU ZA OVO)

MEDJUTIM POSTO WEBPACK SVE TRANSFORMISE U ES5 CODE, PREDPOSTAVLJAM DA CE TO URADITI I U OVOM SLUCAJU

OVAJ DYNAMIC IMPORT BI SE NMOGAO KORISTITI KOD LAZY LOADING-A

ZNAM DA LAZY LOADING MOGU DEFINISATI, UZ POMOC IntersectionObserver-a, ILI PRATECI SCROLLING (STO JE TEZI NACIN), ALI U OVOM SLUCAJU, U CILJU USTEDE VREMENA, U MOM PROJEKTU DEFINISACU, DA SE KLIKOM NA DUGME IMPORT-UJE NEKI ELEMENT I NAKON TOGA REDERUJE (DAKLE, SAMO SIMULIRAM LAZY LOADING)

ELEMNT CU DEFINISATI OVDE:

**neki_element.js** FAJL:

```javascript
const element_1 = document.createElement('div');
const element_2 = document.createElement('div');
const elementBlah = document.createElement('section');
element_1.textContent = "Nek itekst 1";
element_1.textContent = "Nek itekst 2";

elementBlah.append(element_1, element_1);

export default elementBlah;
```

OVDE CU DEFINISATI DUGME

**dugme_blah.js** FAJL:

```javascript
const dugme = document.createElement('button');
dugme.innerText = "klikni";

export default dugme;
```

A U index.js FAJLU, DEFINISACI DA SE KLIKOM NA DUGME LOAD-UJE ELEMENT, I INSERTUJE

**index.js** FAJL:

```javascript
import neko_dugme from './dugme_blah';

neko_dugme.addEventListener('click', function(ev){
    // OVDE CU KORISTITI DINAMICKI import()
    import('./neki_element')
    .then(function(modul){
        console.log(modul.default);
        document.body.append(modul.default);
    })

})
```

## KAO STO VIDIM IZ PRIMERA DINAMICKI import() KORISTI Promise-E

AKO JE MODUL EXPORTED KAO DEFAULT, KADA GA IMPORTUJEM, ON CE BITI DOSTUPAN KAO ONA VREDNSOT, KOJOM JE RESOLVED Promise, KOJI JE POVRATNA VREDNOST DINAMICKOG IMPORT-A

A SAMOJ VREDNOSCU MODULA (FUNKCIJOM, OBJEKTOM, PRIMITIVOM...KOJI SU EXPORTED KAO DEFAULT-OVI) PRISTUPAM PREKO default PROPERTIJA

```javascript
import('./neki_element')
.then(function(modul){
    console.log(modul.default);
    document.body.append(modul.default);
})
```