# WEBPACK PO DEFAULT-U MOZE DA RESOLVE-UJE JSON, WebAssembly, .MGS I JavaScript

POMENUTO MOZE BITI ZANIMALJIVO, AKO NA PRIMER KORISTIM JSON, U "DINAMICKOM" CODE SPLITTING-U

POKAZACU TO NA PRIMERU IZ PREDHODNOG md FAJLA

## ON IZGLEDA OVAKO

```linux
 src
    |   ...
    │   button-style.js
    │   index.js
    │
    └───button-styles
            almond.js
            olive.js
            tomato.js
```

**tomato.js** FAJL:

```javascript
export default "color: tomato;";
```

**olive.js** FAJL:

```javascript
export default "color: olive;";
```

**almond.js** FAJL:

```javascript
export default "color: blanchedalmond;";
```

****
****

**button-style.js** FAJL:

```javascript
export default (button, style) => {
    button.style = style;
}
```

**index.js** FAJL:

```javascript
import butonStyleFunc from './button-style'
const bringButtonStyleDinamicly = fileName => import(`./button-styles/${fileName}`);

const hipsterButton = document.createElement('button');
hipsterButton.innerText = "hipster";
document.body.appendChild(hipsterButton);

hipsterButton.onclick = ev => {

    // OVDE SAM PROSLEDIO STRING "olive"
    bringButtonStyleDinamicly('olive')
    .then(module => buttonStyleFunc(ev.target, module.default))

}
```

## DODACU SLEDECI JSON FAJL U button-styles FOLDER

**doomer.json** FAJL

```JSON
{
    "default": "color: cyan; width: 480px;"
}
```

```linux
 src
    |   ...
    |   doomer.JSON
    │   button-style.js
    │   index.js
    │
    └───button-styles
            almond.js
            olive.js
            tomato.js
```

JA SAM U JSON FAJLU DEFINISAO default PROPERTI, SAMO IZ RAZLOGA STO SE CALLBACK-U, KOJI JE ARGUMENT then-A (KOJI JE CHAINED IZA import()), PROSLEDJUJE OBJEKAT, KOJEG OBINO IMENIJEM SA modul, I CIJI PROPERTI JESTE default (AKO SE RADILO O KORISCENJU DEFAULT EXPORT-A, ZAJEDNO SA DINAMICKIM import())

## REDEFINISACU CODE ENTRY POINTA, ODNOSNO ONAJ DEO CODE-A, GDE PROSLEDJUJEM VARIJABLU, PRILIKOM "DINAMICKOG" CODE SPLITTING-A

**index.js** FAJL:

```javascript
import butonStyleFunc from './button-style'
const bringButtonStyleDinamicly = fileName => import(`./button-styles/${fileName}`);  //  1

const hipsterButton = document.createElement('button');
hipsterButton.innerText = "hipster";
document.body.appendChild(hipsterButton);

hipsterButton.onclick = ev => {

    // OVDE CE ARGUMENT, SADA BITI "doomer"
    bringButtonStyleDinamicly('doomer')                             //   2
    .then(module => buttonStyleFunc(ev.target, module.default))  // JEDINO STO SAM OVDE MORAO PRISTUPITI
                                                                // JOS JEDNOM DEFAULT, JER JE WEBPACK PARSE-OVAO JSON
}                                                               // KAKO BI IMAO OBJEKAT KOJI SAM JA DEFINISAO {default: "..."}
                                                                // A ON JE SADA VREDNOST, PROPERTIJA default OBJEKTA, SA KOJIM JE
                                                                // RESOLVED DINAMICKI import()
```

- GORE GDE SAM STAVIO 1 **WEBPACK, RESOLVEUJE FAJLOVE NA PATH-U**

**STO ZNACI DA JE U TOM SLUCAJU KREIRAN-O 5 BUNDLE-OVA, JEDAN GLAVNI (INSERTED U DOM), I 4 BUNDLE-A, KOJI SU BUNDLE-OVI MODULA IZ button-styles FOLDERA**

(ALI MISLIM DA CE TU (BUNDLED) BITI JOS JEDAN FAJL, PRIMETIO SAM NEKE SA BASE64 ENCODING-OM U SEBI (ODNSI SE NA JSON))

- ALI POSTO SAM DODAO CODE, KOJI SAM OZNACIO SA JEDAN

**SVI BUNDLEOVI SE UKLANJAJU OSIM GLAVNOG I ONOG KOJI JE BUNDLE doomer.JSON FAJLA**

**PREDPOSTAVLJAM DA JE TO SASDA JAVASCRIPT BUNDLE, SA UGRADJENIM PARSED JSON-OM IZ MODULA** (PROVERIO SAM I JESTE) 

## A DA SAM ZELO DA WEBPACK, SAMO RESOLVE-UJE FAJLOVE, KOJI SU JSON FORMATA MOGAO SAM KORISTITI EKSTENZIJU (ODNOSNO DA BUDEM STRIKTNIJI, U VEZI MOJIH FILTERA)

REKAO SAM OVO I U PROSLOM FAJLU

NAIME, KADA BIH DODAO, .JSON EKSTENZIJU TEMPLATE STRINGU ARGUMENTU DINAMICKOG import, **OMOGUCIO BI DA SE RESOLVE-UJU FAJLOVI, KOJI SU U *JSON* FORMATA, STO ZNACI DA BI SE SAM OZA TE FAJLOVE KREIRAKI BUNDLE-OVI**

**index.js** FAJL:

```javascript
import butonStyleFunc from './button-style'
// OBRATI PAZNJU DODAO SAM .JSON SLEDECEM TEMPLATE STRING-U
const bringButtonStyleDinamicly = fileName => import(`./button-styles/${fileName}.json`);  //  1

// STO ZNACI DA SU KREIRANI BUNDLE-OVI SAM OZA JSON MODULE, ODNOSNO FAJLOVE

const hipsterButton = document.createElement('button');
hipsterButton.innerText = "hipster";
document.body.appendChild(hipsterButton);

hipsterButton.onclick = ev => {

    // A POZIVANJEM SLEDECEG, SVI SE JSON BUNDLE-OVI BRISU (AKO IH IMA VISE), A OSTAJU SAMO
    // BUNDLE FAJLA doomer.JSON I GLAVNI BUNDLE
    bringButtonStyleDinamicly('doomer')                             //   2
    .then(module => buttonStyleFunc(ev.target, module.default.default))

}
```

SVE OVO MOGU PROVERITI I U dist FOLDER-U, NAKON STO RUNN-UJEM PRODUCTION SCRIPT