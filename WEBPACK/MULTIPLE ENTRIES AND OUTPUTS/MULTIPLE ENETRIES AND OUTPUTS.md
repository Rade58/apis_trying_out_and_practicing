# VISE ENTRY-JA, I VISE OUTPUT-OVA, UKLJUCUJUCI I KORISCENJE "html-webpack-plugin"-A ZA GENERISANJE VISE PAGE-OVA

ps. PROCITAJ CLANAK OSTAVLJEN U [POSLEDNJEM PODNASLOVU](#ovo-je-odlican-clanak-u-kojem-mislim-da-je-htmlwebpackplugin-najbolje-upotrebljen), MOZDA JE BOLJE OD TVOG CONFIG-A

**DO ODREDJENOG NIVOA SAM USPEO DA KREIRAM TAKVU KONFIGURACIJU, KOJA KORISTI VISE ENTRY POINT-A I VISE OUTPUT-OVA (ALI POSTAVLJA SE PITANJE DA LI SAM KORISTIO DOBRU PRAKSU I KOLIKO JE OVAJ MOJ CODE REUSABLE), I SADA PRIKAZUJEM CODE MOJE APLIKACIJE**

DA PIKAZEM PRVO FILE/FOLDER STRUKTURU KOJU IMAM PRE POCETKA DEFINISANJA KONFIGURACIJA

```linux
│   package.json
│   README.md
│   webpack.config.js
│   yarn.lock
│
├───build-utils
│       webpack.production.js
│
├───dist
└───src
    │   app.js
    │
    └───another
            another.js
```

KAO STO VIDIM, MOJA DVA ENTRY POINT-A SE NALAZE U src FOLDERU, CA KJE JEDAN OD NJIH I U FOLDERU another KOJI JE PODFOLDER src FOLDERA

ONO STO MI JE BIO CILJ JESTE DA IMAM DVA BUNDLE-A, KOJI CE U dist FOLDERU BITI ISTO POSTAVLJENI

PREDSTAVICU SADA PRODUCTION KONFIGURACIJU, ODNOSNO ONO STO JE NAMENJENO PRODUCTION-U I STO CE SE MERGE-OVATI, SA GLAVNOM KONFIGURACIJOM

*build/utils/webpack.production.js*

```javascript
module.exports = () => ({
    entry: {
        // OVO BUKVALNO ZNACI (POD USLOVOM DA KOREKTNO DEFINISEM output) DA CU IMATI DVA FAJLA

                //      1)     app.js   U dist FOLDERU
                //      2)     another.js   U   dist/another    FOLDERU

        "app": "./src/app.js",
        "another/another": "./src/another/another.js"
    },
    output: {
        // filename DEFINISAN NA SLEDECI NACIN ZNACI DA CE BUNDLE IMATI IME, KOJE SE PROSLEDJUJE, UPRAVO
        // OD ONOG STRING-A KOJEG SAM ZADAO DA BUDE PROPERTI U GORNJEM entry OBJEKTU

        //  POMENUTE STVARI, KAO STO SU [hash]  [chunkhash]  [name]   MORAM DODATNO ISPITATI
        // U TO MSLUCAJU BIH MORAO, JOS VISE ZNATI, NEGO SADA KAKO WEBPACK FUNKCIONISE UNDER THE HOOD

        filename: "[name].bundle.js",
        // ON OSTO SAM OVDE JOS MOGAO ZADATI JE path, ALI POSTO KORISTIM __dirname (NE ZNAM DA LI JE OVAJ __dirname PROPERTI GLOBALNOG CONTEXT-A, ILI JE VEZAN DIREKTN OZA WEBPACK)
        // POGRESNO BI TAJ PATH BIO DEFINISAN I ZATO GA DEFINISEM U GLAVNOJ KONFIGURACIJI
        // ODNOSNO TAJ APTH BI BIO RELATIVAN NA OVAJ FAJL
    }
})

// POMENUTOM dirname-U NEKO PRISTUPA  I  KAO   PROPERTIJU SLEDECEG       require("path") 
```

*webpack.config.js*

```javascript
const webpack = require("webpack");
const modeConfig = mode => require(`./build-utils/webpack.${mode}`)();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");

console.log(__dirname);

// const path = require("path");

module.exports = ({mode, presets}) => {
    return webpackMerge(
        {   // STA PREDSTAVLJA optimization I chunks MORAM DODATNO ISPITATI
            optimization: {
                splitChunks: {chunks: "all"}
            },
            mode,
            output: {
                // NECU DODATNO GOVORITI O OVOME, SAM OCU RECI DA SE OVO NE NALAZI U PRODUCTION
                // KONFIGURACIJI, UPRAVO ZATO STO BI PATH BIO POGRESAN
                path: __dirname + "/dist"
            },
            plugins: [
                new HtmlWebpackPlugin({
                    // KAKO SE KORISTE CHUNK-OVI JOS NE ZNAM DO ZAVIDNOG NIVOA, ALI JSNO MI JE DA
                    // ONI PREDSTAVLJAJU BUNDLED JAVASCRIPT CODE U OVOM OVDE KONKRETNOM SLUCAJU 
                    filename: "index.html",
                    chunks: ["app"] 
                }),
                new HtmlWebpackPlugin({
                    filename: "another/another.html",           // OVO MALO IZGLEDA CUDNO, ALI MORAO SAM OVAKO DA DEFINISEM
                    chunks: ["another/another"]
                }),
                new webpack.ProgressPlugin()
            ],
        },
        modeConfig(mode)
    )
}
```

U SUSTINI KADA RUNN-UJEM PRODUCTION SCRIPT, IMACU OVAKVU FILE/FOLDER STRUKTURU U dist FOLDERU

```linux
│   app.bundle.js
│   index.html
│
└───another
        another.bundle.js
        another.html
```

DA PRIKAZEM SADA KONKRETNO another FOLDER, ODNOSNO CODE HTML FAJLA

**another.html**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
  <script type="text/javascript" src="../another/another.bundle.js"></script></body>
</html>

<!-- KAO STO VIDIM, PATH U src VREDNOSTI, IZGLEDA MAL OCUDNO; ON JESTE VALIDAN, ALI SAM DEFINISAO
DA SE 'IZLAZI IZ FOLDERA I OPET ULAZI', KAKO BI UPUTIO DO another.bundle.js  -->
<!-- NISAM ZNAO KAK ODA DRUGACIJE OVO DEFINISEM -->
<!-- ALI KADA NUCIM NESTO VISE IZ LARKIN-OVOG WORKSHOPA-A O WEB PERFORMANCE-MA I CODE SPLITTING-U
VERUJEM DA CU ZNATI NESTO VISE O SVEMU OVOME -->
```

## POSTOJI MOGUCNOST DA SE ZA HtmlWebpackPlugin (NJEGOV ARGUMENT OBJEKAT USTVARI) DEFINISE I tmplate PROPERTI, KOJI CE UPUCIVATI DO TEMPLATE-A HTML FAJLA, AKO ZELIM DA IMAM MOJ CUSTOM HTML, KOJI CE BITI SERVIRAN I U KOJEM CE BITI UCITAN BUNDLE

## OVO JE ODLICAN CLANAK, U KOJEM MISLIM DA JE HtmlWebpackPlugin NAJBOLJE UPOTREBLJEN

[CLANAK ZA WEBPACK CONFIG, FOR MULTIPLE OUTPUTS](https://www.ivarprudnikov.com/static-website-multiple-html-pages-using-webpack-plus-github-example/)

[SOURCE CODE NA GITHUB-U](https://github.com/ivarprudnikov/webpack-static-html-pages)