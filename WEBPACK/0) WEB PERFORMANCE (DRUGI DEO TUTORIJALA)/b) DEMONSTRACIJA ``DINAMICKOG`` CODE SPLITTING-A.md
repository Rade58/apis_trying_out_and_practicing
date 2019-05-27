# DEMONSTRACIJA "DINAMICKOG" CODE SPLITTING-A

- U src FOLDERU, KREIRAM NOVI FOLDER, KOJI SE ZOVE **button-styles** I TAMO DODAJEM NEKOLIKO FAJLOVA

- TAMO KREIRAM MODULE:

1. tomato.js

2. olive.js

3. almond.js

- A DIREKTNO U src FOLDER-U, ONI FAJLOVI, KOJI SU BITNI ZA OVU DEMONSTRACIJU SU button-style.js MODUL I, NARAVNO ENTRY POINT index.js

IMAM OVAKVU FILE/FOLDER STRUKTURU

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
export default "color: tomato";
```

**olive.js** FAJL:

```javascript
export default "color: olive";
```

**almond.js** FAJL:

```javascript
export default "color: blanchedalmond";
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

**PRATI KOMENTARE U OVOM FAJLU, POSTARAO SAM SE DA KROZ NJIH BUDE SVE RAZUMLJIVO**

```javascript
import butonStyleFunc from './button-style'

// EVO GA "DINAMICKI" CODE SPLITTING
const bringButtonStyleDinamicly = fileName => import(`./button-styles/${fileName}`);

// AKO SAMO OSTAVIM GORNJI DEO CODE-A, ODNOSNO SAMO "DYNAMIC CODE SPLITTING FUNKCIJU"
// I AKO SAVE-UJEM (NARAVNO POKRENUT MI JE DEV SERVER), BICE BUNDLED VISE FAJLOVA, BICE BUNDLED
// USTVARI:

            //      OSNOVNI BUNDLE (KOJI JE JEDINI UCITAN U HTML)

            //       3      DODATNA BUNDLE-A, KOJI SU BUNDLE-I, MODULA IZ          button-style       FOLDERA

                            // ONI NARAVNO NISU UCITANI U HTML


// ALI DALJE NASTAVLJAM DEFINISANJE

const hipsterButton = document.createElement('button');
hipsterButton.innerText = "hipster";
document.body.appendChild(hipsterButton);

hipsterButton.onclick = ev => {
    // OVDE CU UPOTREBITI "DINAMICKI" IMPORT, KAKO BI PROMENIO BOJU DUGMETA NA OLIVE

    // JA SAM USTVARI OVDE MOGAO STAVLJATI debugger IZJAVU

    bringButtonStyleDinamicly('olive')
    .then(module => buttonStyleFunc(ev.target, module.default))

    // POSTO SAM PASSED IN, "olive", NESTALI SU DODATNI BUNDLE-I
    // SADA IMA SAMO DVA
                            // GLAVNI
                            // I ONAJ KOJI JE BUNDLE olive.js FAJLA
}
```

**DAKLE JA SAM MORAO OBEZBEDITI WEBPACK-U INFORMACIJU, GDE CE USTVARI, RESOLVE-OVATI MODULE A TA INFORMACIJA JE:**

- PATH "./button-styles"

**JA SAM MOGAO VRSITI I CONCATENATION (*"./button-styles" + fileName*) ALI BILO JE, VISE CONVINIENT KORISTITI TEMPLATE STRING**
