# MAGIC COMMENTS

[OVDE MOGU NACI UPUTSTVA](https://webpack.js.org/api/module-methods#magic-comments)

POMENUTO JE ZAVEDENO POD [MODULE METHODS](https://webpack.js.org/api/module-methods)

TU MOGU NACI NEKE METODE KOJE SAM VEC KORISTIO (require, import, import(), export...(MNOGE, PA MOZDA I VECIN SA TE EKSTENZIVNE LISTE NISAM NI KORISTIO))

DA SE SADA VRATIM NA MAGIC COMMENTS

ODNOSNO PRE MAGIC COMMENTS, MORAM SE POZABAVITI, JEDNIM PROBLEMOM

## JEDNA STVAR, KOJU CU PRIMETITI, PRI KORISCENJU CODE SPLITTING-A JESTE TEHNIKA, PRI KOJOJ NEMA KONKRETNOG IMENA ZA BUNDLE-A KOJI JE KREIRAN, DAKLE VIDIM GA DA SU TI BUNDLE-OVI GENERISANI KAO 

NA PRIMER: (PORED OSNOVNOG BUNDLEA, KOJI JE *bundle.js*)

```javascript
0.bundle.js

1.bundle.js

2.bundle.js

3.bundle.js

4.bundle.js
```

PREDPOSTAVLJAM DA OVO MOZE BITI PROBLEMATICNO U "developer" MODE-U, JER NE ZNAM KOJI SU FAJLOVI GENERISANI, PRI CODE SPLITTING-U

ISTO MOZE BITI PROBLEMATICNO KADA SAGRADIM, MOJE BUNDLE-OVE ZA PRODUCTION, A UZ TO OBEZBEDIMA I SOURCE MAP FAJLOVE; DEBUGGING UZ POMOC .map FAJLOVA ISTO TAKO MOZE BITI PROBLEMATICAN, JER OPET SU IMENA FAJLOVA NE RAZUMLJIVA, ODNOSNO NE SUGERISU NA TO, KOJI CODE HOUSE-UJU

NISAM JOS STIGAO DO MAGIC COMMENTS-A, ALI ZNAM KAKO DA NA PRIMER PROMENIM IMENA BUNDLE-OVIMA, NASTALIM CODE SPLITTING-OM; TAK OSTO CU MODIFIKOVATI KONFIGURACIJU

## NAIME FAJLOVI KOJI SU NASTALI CODE SPLITTING-OM SE NAZIVAJU I CHUNK-OVIMA (ALI NE MORAM DA NAZIVAM SAMO TE FAJLOVE CHUNK-OVIMA, TAK OSE NAZIVAJU I FAJLOVI U SLUCAJU KADA IMAM MULTIPLE OUTPUT FAJLOVE; CISTO NAPOMINJEM)

OTUDA I PROPERTI KONFIGURACIJE, KOJI SE ZOVE

- **chunkFilename**

TU MOGU DEFINISATI, KAKO DA SE ZOVE CHUNK

*U TOM SLUCAJU OPET SE JAVLJA PROBLEM*

webpack.development.js FAJL

```javascript
module.exports = () => ({
    devtool: "eval",
    output: {
        filename: 'bundle.js',
        // ZADACU NEKO DRUGO IME, KOJE U KAZUJE DA JE U PITANJU LAZY LOADING CHUNK
        chunkFilename: "[name]-lazy-load.js"
        // A KO STO VIDIM GORE, DOZVOLJENO MI JE DA KORISTIM I [name] , U NASTAVKU CU OBJASNITI
        // STA NA TOM MESTU BIVA PROSLEDJENO OD STRANE WEBPACK-A, TOKOM BUNDLEINGA
    },
    module: {
        rules: [
            {test: /.css$/, use: ["style-loader", "css-loader"]}
        ]
    },
})
```

AKO RANUJEM DEVELOPMENT SCRIPT VIDECU SLEDECE U TERMINALU:

ZA CHUNK-OVE SU EMMITED OVAKVI FAJLOVI:

```linux
0-lazy-laod.js

1-lazy-laod.js

2-lazy-laod.js
```

DAKLE NA MESTO `[name]` PROSLEDJUJE SE BROJ (PO DEFAULT-U)

POMENUT `[name]` JESTE NSTO STO SE ZOVE I **NAME HELPER TEMPLATE**

**SADA IMENA CHUNKOVA NISU IMENOVANI KAO NUMERISANI bundle.js FAJLOVI ,VEC IMAJU ODREDNICU lazy-load, ALI, OPET NE ZNAM STA JE U TIM FAJLOVIMA, JER NJIHOVO IME NIJE SUGESTIVNO U POGLEDU TOGA STA ONI SADRZAVAJU, I MORAO BIH DA OTVORI MSVAKI OD NJIH DA POGLEDAM (NAKON GENERISANJA PRODUCTION CODE-A), A OPET ON ICE BITI MINIFIED I TESKI ZA CITANJE**

JOS JEDAN PROBLEM JE STO SE SADA OVDE UOPSTE NE ZNA DA LI SU TI FAJLOVI NASTALI CODE SPLITTING-OM (ODNOSNO IMPLEMENTACIJOM LAZY LOADING PRINCIPA) ILI SU NASTALI JER SAM U CODE-U, NA PRIMER U GLAVNOJ KONFIGURACIJI DEFINISAO MULTIPLE OUTPUT FAJLOVE, ODNOSNO CHUNK-OVE

U TOM SLUCAJU lazy-load ODREDNICA U IMENU FAJLA MOZE BITI MISLEADING AKO NIJE REC O LAZY LOADING-U

## E TU NA SCENU STUPAJU MAGIC COMMENTS, JER ONI MOGU PROSLEDITI VREDNOST `[name]`-U I NA TAJ NACIN RECI WEBPACK-U, KAKO DA IMENUJE CHUNK NASTAO CODE SPLITTING-OM (ODNOSNO NASTAO UPOTREBOM LAZY LOADING PRINCIPA)

NJIH ZADAJEM PRE ARGUMENTA U import() FUNKCIJI

SASTOJE SE OD PROPERTIJA I VREDNOSTI

A NAJPOPULARNIJI PROPERTIJI SU

- webpackChunkName

- webpackMode (KOJI SE KONKRETNO ODNOSZI NA LAZY LOADING) (DAFAULT VREDNSOT JE "lazy")

NAJBOLJE DA O [OVIM DRUGIM PROPERTIJEM] POZABAVIM NEKOM DRUGOM PRILIKOM (IZMEDJU OSTALIH MOGUCIH VREDNOSTI, ON MOZE OBZNANITI DA LI JE RED O STATICKOM CODE SPLITTING-U ILI "DINAMICKOM")

A SADA DA DEFINISEM MAGIC COMMENTS U MOM PRIMERU, ODNOSNO U ENTRY POINT FAJLU

**index.js** FAJL:

```javascript
import {gvanaka} from './lame';
import delfinFunkcija from './nesto';
import button from './dugme';
import footerElement from './footer';
import headerEl from './header';
import './footer_dodatno.css';
import imageUrl from './slika.jpg';
import makeImage from './slika';
import buttonStyleFunc from './button-style';
import neko_dugme from './dugme_blah';

// CODE SPLITTING

// I UPOTREBA MAGIC COMMENTS 

const getGsap = () => import(/* webpackChunkName: "gsap-library" */ /* webpackMode: "lazy" */"gsap");

const bringButtonStyleDinamicly = fileName =>
    import(
        /* webpackChunkName: "json-data" */
        `./button-styles/${fileName}.json`
    );

const importElementDynamically = () => import(
    /* webpackChunkName: "some-balh" */
    './neki_element'
);

///////////////////////////////////////////////////////////////

document.body.prepend(neko_dugme);

neko_dugme.addEventListener('click', function(ev){
    importElementDynamically()
    .then(function(modul){
        console.log(modul.nekiString);
        document.body.append(modul.moj_element);
    })

    getGsap();

})

//////////////////////////////////////////////////////////////////////

headerEl.textContent = 'header element'
document.body.prepend(headerEl);
document.body.append(button);
console.log(gvanaka, delfinFunkcija('pink'));
document.body.appendChild(footerElement);
console.log(imageUrl);
document.body.append(makeImage(imageUrl));
///////////////////////////////////////////////////////////////////////////////

const hipsterButton = document.createElement('button');
hipsterButton.innerText = "hipster";
document.body.appendChild(hipsterButton);

hipsterButton.onclick = ev => {

    // debugger;

    bringButtonStyleDinamicly('doomer')
    .then(module => {
        buttonStyleFunc(ev.target, module.default.default);
        console.log(module)
    })
}
```

EVO STA CE SADA BITI, IZMEDJU OSTALOG EMMITED, KADA RUNN-UJEM DEVELOPMENT SCRIPT

```linux
 json-data0-lazy-load.js              462 bytes        json-data0               [emitted]
 some-balh-lazy-load.js               1.23 KiB         some-balh                [emitted]
 vendors~gsap-library-lazy-load.js    452 KiB          vendors~gsap-library     [emitted]
```

MADA PRIMECUJEM NEKE RAZLICITE DODATE OZNAKE, ODNOSNO ODREDNICE KAO STO SU: vendor~, ZATIM JE NEGDE OPET DODAT BROJ (VIDECU STA JE U PITANJU NEKO MDRUGOM PRILIKOM)

**PREDPOSTAVLJAM DA JE `~vendor` ZNACILO DA JE UPITANJU UVOZ GLOBALNOG MODULA (KOJI JE GLOBALNO INSTALLED)**

LARKIN KAZE DA BAS I NE KORISTI, POMENUTI FEATURE (MAGIC COMMENTS), ALI DRUGI LJUDI NALAZE DA JE OVO INCEDIBLY VALUABLE

## A ZASTO SE UOPSTE KORISTE KOMENTARI, UMESTO PRAVIH VREDNOSTI

PA ZBOG ESM-A, KOJI TO NE PODRZAVA (DAKLE TO MOZE BREAK-OVATI PEOPLES CODE)

OVO JE SAMO WEBPACK-OV FEATURE I NIJE STANDARD APPROVED

## U STVARI O webpackMode PROPERTIJU, MAGIC COMMENTS-A, GOVORICU U SLEDECEM md FAJLU