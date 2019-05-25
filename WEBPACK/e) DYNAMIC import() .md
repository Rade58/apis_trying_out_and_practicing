# DYNAMIC import() (OVDE GA MOZDA NISAM NA DOVOLJNO DOBAR NACIN POBJASNIO IZ RAZLOGA STO SE WBPACK-OV DINAMICKI IMPORT, RAZLIKUJE OD ONOG IZ SPECIFIKACIJA)

:collision::collision::collision::collision: [OVDE JE SVE BOLJE OBJASNJENO, TJ DETALJNIJE](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/WEBPACK/0%29%20WEB%20PERFORMANCE%20(DRUGI%20DEO%20TUTORIJALA)/5.%20TIPOVI%20CODE%20SPLITTING-A.md#dinamicki-import-import-razlika-izmedju-import-u-specifikacijam-i-onog-import-iz-webpack-a-postoji) (MEDJUTIM PRIMER (VEZBICA), KOJI SAM RADIO U OVOM md FAJLU JE KOREKTAN NARAVNO)

[caniuse](https://caniuse.com/#search=dynamic%20import) (KADA SAM PISAO OVO EDGE I FIREFOX NISU IMALI PODRSKU ZA OVO) (OVO JE ONAJ DINAMIC import IZ BROWSER LAND-A)

## WEBPACK-OV DYNAMIC import()

SAMO CU UKRATKO RECI NESTO O NJEMU, ALI POSEBNO CU SE BAVITI, OVIM, UPRAVO ONDA KADA SE BUDEM BAVIO PERFORMANSAMA

OVAJ DYNAMIC IMPORT BI SE NMOGAO KORISTITI KOD LAZY LOADING-A

ZNAM DA LAZY LOADING MOGU DEFINISATI, UZ POMOC IntersectionObserver-a, ILI PRATECI SCROLLING (STO JE TEZI NACIN), ALI U OVOM SLUCAJU, U CILJU USTEDE VREMENA, U MOM PROJEKTU DEFINISACU, DA SE KLIKOM NA DUGME IMPORT-UJE NEKI ELEMENT I NAKON TOGA REDERUJE (DAKLE, SAMO SIMULIRAM LAZY LOADING)

ELEMNT CU DEFINISATI OVDE:

**neki_element.js** FAJL:

```javascript
const element_1 = document.createElement('div');
const element_2 = document.createElement('div');
const elementBlah = document.createElement('section');
element_1.textContent = "Nek itekst 1";
element_2.textContent = "Nek itekst 2";

elementBlah.append(element_1);
elementBlah.append(element_2);

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
document.body.prepend(neko_dugme);

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

## PRIMETIO SAM, KADA DEFINISEM DINAMICKI IMPORT U MOM CODE-U, KOJI SE BUNDLEUJE UZ POMOC WEBPACKA-A, DA IMAM DODATNI BUNDLE (KADA DEVELOPERI GOVORE, IN TERMS OF WEBPACK, ONI KAZU CODE SPLITTING) (ALI TEK NAKON STO JE DINAMICKI import EXECUTED, TO JE JSNO NARAVNO)

ZASTO JE OVO **CODE SPLITTING**, BICE MI JASNIJE KASDA PROCITAM SLEDECE RECENICE

CODE JE FUNKCIONISAO U PRODUCTION-U, STO ZNACI DA SU TAJ NOVI BUNDLE I MOJ, 'NORMALNI' BUNDLE NEKAKO POVEZANI

A CODE JE TAKODJE FUNKCIONISAO U DEVELOPMENT MODE-U (I TAMO SAM IMAO PRISUTNA DVA JS FAJLA)

KADA SAM KORISTIO PRODUCTION CODE UZ POMOC http-server

**ONO STO SE DESILO KAD SAM KLIKNUO DUGME, JESTE DA SE IZVRSIO NETWORK REQUEST, ZA TIM NOVIM SCRIPT-OM, TIM DODATNIM BUNDLE-OM**

STVARI SU SADA JASNIJE

**DAKLE KORISCENJEM DINAMICKOG IMPORT-A, CODE MODULA JE BUNDLED U SEPARATE FAJL, KOJI SE LOAD-UJE, TEK NAKON EXECUTION-A, DINAMICKOG IMPORT-A**

**KADA NEKI DEVELOPER POMENE CODE SPLITTING, U TERMINU WEBPACK-A, ON USTVARI MISLI NA OVAJ PROCES KOJI SAM POMENUO**

KAO STO KAZE LARIN:

>> ZA CODE SPLITTING MI NE TREBA NIKAKAV PLUGIN, VEC JE ON SAMO IMPERATIVE, OVOG CODE-A, KOJEG PISEM

UPRAVO JE CODE, IZ POMENUTIH RAZLOGA, VEOMA POWERFUL I EXPRESSIVE

## A KADA POKUSAM DA UVEZEM IMENOVANI EXPORT (KOJI NIJE DEFAULT), MOGU JEDNOSTAVNO DA KORISTIM TO IMENOVANJE, PRILIKOM IMPORTA, A POKAZACU I KAKO

```javascript
// REDEFINISEM CODE   neki_element.js
const element_1 = document.createElement('div');
const element_2 = document.createElement('div');
const elementBlah = document.createElement('section');
element_1.textContent = "Nek itekst 1";
element_2.textContent = "Nek itekst 2";

elementBlah.append(element_1);
elementBlah.append(element_2);

// NECU VISE DA IMAM DEFAULT EXPORT VEC ZELIM DA IZVEZEM NEKOLIKO VREDNOSTI

const nekiString = "neka string vrednost";

// PROMENICU IME JEDNOM EXPORT-U
export {elementBlah as moj_element, nekiString}
```

SADA MOGU DA IZMENIM I CODE **index.js** (ODNOSNO TAMO GDE SAM DEFINISAO LAZY LOADING)

```javascript
import neko_dugme from './dugme_blah';

neko_dugme.addEventListener('click', function(ev){
    import('./neki_element')
    .then(function(modul){
        // SADA IMAM IMENOVANE IMPORTE, KAO PROPERTIJE, OBJEKTA, SA KOJIM JE Promise RESOLVED
        console.log(modul.nekiString);       // STAMPAM ONAJ STRING, KOJI JE JEDAN OD EXPORT-ED VREDNOSTI   neki_element.js FAJLA
        document.body.append(modul.moj_element);  // A KACIM IMPORTED ELEMENT
    })

})
```

## VAZNO!!! AKO KORISTIM BABEL, MORAM DODATI JOS JEDAN PLUGIN KAKO BI BILA PODRZANA SINTAKSA DINAMICKOG import(); A U WEBPACK-U, JE SINTAKSA DINAMICKOG import(), PO DEFAULT-U SUPPORTED

ALI PREDPOSTAVLJAM DA JE TO DINAMICKI IMPORT IZ SPECIFIKACIJA (NE ZNAM DA LI JE TAJ import SINHRON ILI NE)

## TYPESCRIPT PODRZAVA SINTAKSU (SAMO MI NIJE JASNO JE LI TO import() IZ SPECIFIKACIJA ILI WEBPACKOV)
