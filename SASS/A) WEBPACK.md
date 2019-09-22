# ZASTO SAM OVAJ FAJL NASLOVIO SA WEBPACK? PA ZATO UPRAVO STO POSTOJI JOS MNOGO STVARI KOJE TREBA DA ZNAM U POGLEDU WEBPACK-A, A TICU SE KONKRETNO CSS-A, PA I SASS-A; TO JE PRRE SVEGA KORISCENJE, MOG CSS-A, U 'MODULARNOM' OBLIKU, JER MI WEBPACK NUDI I TU ABSTRAKCIJU

> RECI CU NESTO DA BI SEBI OTKLONIO JEDNU ZABLUDA ALI I DA BI SE PODSETIO CODE SPLITTING-A

**CODE SPLITTING I SASS, ODNOSNO CSS MODULI NISU ISTO** (NEMOJ DA TI OVO PADA NA PAMET)

****

ALI TI TREBAS ZNATI, MOZDA NESTO STO SI ZABORAVIO:

>>>> U WEBPOACK-U CODE SPLITTING NASTAJE KORISCENJEM **DINAMICKOG** *import*-A, ODNOSNO PRI KORISCENJU:

- **import()**

**BEZ OBZIRA STA SE IMPORT-UJE JAVASCRIPT, CSS ILI SASS, SA POMENUTOM *FUNKCIJOM,* POSTOJACE CODE SPLITTING**

A MODULI SU MODULI, BEZ OBZIRA DA LI IM JE PRATECA STVAR CODE SPLITTING ILI NE

DAKLE KROZ OVAJ MD DOKUMENT JA CU OBJASNJAVATI KAKO DA NAPRAVIM DOBRU WEBPACK KONFIGURACIJU, U KOJOJ CU IMPLEMENTIRATI LOADER-E ZA CSS I SASS, ALI ZELIM I DA PRVO OBJASNIM STA SU TO CSS, ODNOSNO SASS MODULI

**DAKLE KORISSCENJE 'STILOVA (BOLJE RECI CSS SELEKTORA) POPUT MODULA', JE POTPUNO NESTO DRUGO I TO CU OBJASNITI**

## PRVO DA KAZEM KOJI RESURSI SU MI POMOGLI DA SAZNAM NESTO VISE O SVEMU OVOME

[KONFIGURIRANJE SASS MODULA ZA WEBPACK](https://developerhandbook.com/webpack/how-to-configure-scss-modules-for-webpack/)

[JEDAN REPLY NA JEDAN ISSUE U GITHUB-U](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/545#issuecomment-309413602)

KONKRETNO CEGA ZELIM DA SE DOTAKNEM JESU **CSS MODULI I SASS MODULI**

**ONO STO NE MOGU SADA RADITI JESTE *IZLISNO OBJASNJAVANJE, JER MNOGO BI MI TO ODUZELO VREMENA*** (ALI DAO SAM DOSTA INFORMACIJA ,TAK OCE SE ISPOSTAVITI)

## PRVO SAMO DA NAPOMENEM KADA SAM ODLUCIO DA SE POZABAVIM, SVIME POMENUTIM

NAKON SAMO UPOZNAVANJA SA SASS-OM, USTVARI JA SE UOPSTE NISAM BIO DOBRO UPOZNAO SA SASS-OM, JSUT TASTED IT AFTER ONE DAY OF PRACTICING (TAKO DA MOJE POZNAVANJE SASS-A U TOKU PISANJA OVOGA NIJE BILO BAS DOBRO, ALI TO NIJE BAS NI BITNO ZA ONO STA ZELIM DA OBJASNIM)

*TAKO DA JE OVAJ MD FAJL SA INDEKSOM **A)**, NASTAO NAKON PISANJA PRVOG MD DOKUMENTA U OVOM FOLDERU (ODNSNO NAKON UVODA)* ALI TO NIJE BITNO

BITNO MI JE DA KAZEM DA CU SE U TOKU OVOG OBJASNAJVANJA, KONKRETNO BAVITI SETTING-OM WEBAPACK KONFIGURACIJE, I BAVLJENJEM KAKO USTVARI MOGU KORISTITI CSS SELEKTORE U MODULARNOM OBLIKU, U MOM JAVASCRIPT-U (ENTRY POINT-U)

## STA MISLIM POD 'KORISCENJEM MODULARNOG OBLIKA SELEKTORA' (MOJA KONSTRUKCIJA)

PA IZA SVEGA STOJI 'WEBPACK-OVA ABSTRAKCIJA'

ZNAS KAKO UVOZIS JAVASCRIPT U SVOJ ENTRY POINT NA PRIMER

```javascript
 import {nesto} from './scriptovi/blah_script;
```

ISTO TAKO TI UVOZIS STILOVE

```javascript
 import './styles/blah_style.css';
```

>>>> SADRZINA CSS FAJLOVA SE STRINGIFIKUJE I ONDA SE PROLASKOM KROZ 'WEBPACK PIPLINE' NA DRGOJ STRANI, PRAVI BUNDLE OD SVIH STILOVA, A AKO SI KORISTIO DINAMICKI IMPORT (GORE TO NISI URADIO), PRAVE SE CHUNK-OVI

NARAVNO KORISTE SE POTREBNI LOADER-I, KOJI POPUT NA PRIMER "css-laoder"-A, RESOLVE-UJU @import I url()

E SAD SAM STIGAO I DO MODULA:

**NAIME, ONO STO TI WEBPACK MOZE OMOGUCITI JESTE NESTO OVAKO**

___________________________

```html
<div class="container"></div>
```

FAJL: **blah.css**

```css
.dark_theme {
    background-color: darkolivegreen;
}

```

NA PRIMER ENTRYPOINT: **index.js**

```javascript
// NAIME KADA KORISTIS CSS MODULE CLASS NAME-OVI SU EXPOSED

import {dark_theme} from './blah.css'

document.querySelector('.container').classList.add(dark_theme)
```

**SADA KADA, NA PRIMER BUILD-UJES SVOJ CODE, I NA PRIMER DEPLOY-UJES GA NA LOCALHOST, I NAKON STO SE TVOJ JAVASCRIPT IZVRSI, U HTML-U CES IMATI OVAKVU SITUACIJU**

```html
<div class="container dark_theme"></div>
```

*E SADA TI JESI KORISTIO CSS MODULE*

___________________________

**U SUSTINI, UZ POMENUTU SINTAKSU MOCI CES DA 'PROCITAS' IME KLASE**

**I DA JE NA OVAJ NACIN ASSIGN-UJES NEKOM ELEMENT-U**

**U NEKIM SLUCAJEVIMA, USTVARI KONKRETNO KOD SASS-A, IMENA KALSA CE BITI HASHED (OVERKILL ILI NE, NISAM SIGURAN)**

## A STA CE TI OMOGUCITI DA USTVARI KORISTIS TE CSS MODULE

**PA PODESAVANJE JEDNE OPCIJE ZA "css-loader"**

## SPOMENUCU PAR CINJENICA, KOJE BI TRBALE DA TI BUDU JASNE, ALI ZELIM DA PODVUCEM CRTU U POGLEDU TOGA

U POGLEDU CSS-A

- *"css-loader"* I *"mini-css-extract-plugin"* KORISTIM ZAJEDNO SA **production MODE-OM**

- A *"css-loader"* I *"style-loader"* KOSRISTIM ZAJEDNO SA **development MODE-OM**

**STO SE TICE SASS-A I WEBPACK-OVOG MODE-A, ISTA JE SITUACIJA, SAMO STO SE U SLUCAJU SASS-A, KORISTII sass-loader ZAJEDNO SA GORE POMENUTIM LOADER-IMA**

DA TI SITUACIJA IMALO BUDE JASNIJA PROCITAJ SLEDECE [NAVODE](https://developerhandbook.com/webpack/how-to-configure-scss-modules-for-webpack/)

⏩⏩⏩⏩ **DAKLE DA CISTO NAPOMENEM CISTO CEMU SLUZE SVI, ONI VEC POZNATI, I NEPOZNATI LOADER-I KOJE KORISTIM** ⬅️⬅️⬅️⬅️

> - *node-sass* **provides binding for Node.js to LibSass, a Sass compiler** (OVO NIJE LOADER, A SAMO, OVO TREBAS ISNTALIRATI AKO HOCES DA KORISTIS "sass-loader" SA WEBPACKOM)

> - *sass-loader* **is a loader for Webpack for compiling SCSS/Sass files**

> - *style-loader* **injects our styles into our DOM** (ON DEFINITIVNO NIJE ZA PRODUCTION, VEC ZA DEVELOPMENT) (DAKLE ON USTVARI CITA CSS FAJLOVE I TO INSERT-UJE U DOM U VIDU style TAGA-ILI TAGOV-A)

> - *css-loader* **interprets *@import* and *url()*, like *import/require()* and resolves them** (ON JESTE ZA PRODUCTION I DEVELOPMENT)

> - *mini-css-extract-plugin* **extracts our CSS out of the JavaScript bundle into a separate file, essential for production builds** (I ON JE SAMO ZA PRODUCTION)

___________________________

AKO SI ZABORAVIO 'JAVASCRIPT MODULE ABSTRACTION', KAKO GA JA NAZIVAM, MISLIM DA JE DOBRO DA SE PODSETIM SLEDECEG

- JAVASCRIPT ENTRY POINT-A, I SVIH KORISCENIH MODUL-A, BIVA BUNDLED U JEDAN FAJL, KADA SVE PRODJE KOROZ 'WEBPACK-OV PIPLEINE'; NARAVNO JAVASCRIPT NIJE TAKO JEDNOSTAVAN I WEBPACK-OV JAVASCRIPT BUNDLE JE TRANSPILED TO ES5 I CODE JE KONSTRUISAN NA NACIN, CIJEM OBJASNJENJU SAM POSVETIO CEO JEDAN FOLDER U OVOM MOM REPOZITORIJUMU (CEO JEDAN FOLDER md FAJLOVA I ZATO NECU DODATNO OVDE KOMENTARISATI O TOME OVDE, VEC MOGU TAMO POGLEDATI AKO ME ZANIMA KAK OSE GRADI BUNDLE I KAKO IZGLEDA BUNDLED CODE)

- NARAVNO AKO KORISTITIM DINAMICKI IMPORT ( import() ) IMACU CHUNK-OVE JAVASCRIPT-A

- E PA ISTA STVAR JE I SA CSS-OM, I CSS BIVA BUNDLED, SAMO NA MNOGO JEDNOSTAVNIJI NACIN; POD TIME MISLIM DA JE FINALNI BUILD, USTVARI CSS FAJL, SAGRADJEN OD SVIH ONIH CSS FAJLOVA KOJE SAM JA KORISTIO, ODNOSNI IMPORT-OVAO PRI DEVELOPINGU APLIKACIJE, A TAJ CSS BUNDLE JE TAKAV DA SU EMPTY SPACES ELIMINATED I DA JE SVE STAVLJENO U JEDAN RED

- I CSS MOGU IMPORT-OVATI DINAMICKIM IMPORTOM

- PA CAK AKO SAM NA PRIMER DINAMICKIM IMPORT-OM UVEZAO JEDAN JAVASCRIPT MODUL, PORED TOGA STO CE NAKON BUILDA TAJ JAVASCRIPT MODUL BITI CHUNKED, BICE TAKODJE CHUNKED I ONAJ CSS, KOJI JE KORISTIO TAJ MODUL, KROZ SVOJ (MODUL-OV) FAJL

___________________________

**[OVDE](https://medium.com/faceyspacey/webpacks-import-will-soon-fetch-js-css-here-s-how-you-do-it-today-4eb5b4929852) U OVOM CLANKU IZ 2017 PISE DA CE DINAMICKI *import()* PODRZVATI FETCHING *javascropt-A PLUS CSS-A*** (PREDPOSTAVLJAM DA SE MISLI O ONOME STO SAM REKAO U PREDHODNOM PASUSU)

U VREME PISANJA OVOGA BIO JE SECOND PART OF 2019 GODINE, TAKO DA CU OVO STAVITI NA TEST, NAKON PODESVANJA KONFIGURACIJE
___________________________

## 🌕🌕🌕🌕 IZ OBJASNJENJ IZ PREDHODNOG NASLOVA, MOGU VIDETI CEMU "css-loader", STVARNO SLUZI 🌕🌕🌕🌕

ON DAKLE SAMO SLUZI ZA INTERPRETACIJU *@import* and *url()*, KAO *import/require()* I RESOLVE-UJE IH

**DAKLE ON PREDSTAVLJA KRUCIJALNI LOADER U POGLEDU CSS-A**

**ZA OVAJ LOADER JA DEFINISEM modules OPCIJU** (NE ZABORAVI TO)

___________________________

*ZA SASS JA NE DEFINISEM modules OPCIJU*

>>>> JER MOJOM SLOBODNOM ITERPRETACIJOM MOGU RECI SLEDECE:

- **POSTO JE IONAKO SASS SUPERSET CSS-A, JA USTVARI 'IZDVAJAM' ('IZOLUJEM') CSS SELEKTORE, KADA BI KORISTIO POMENUTU CSS MODUL SINTAKSU**

___________________________

*STO SE TICE OSTALIH LOADER-A, GORE SJE SVE POPRILICNO DOBRO OBJASNJENO, TAK ODA NEMA POTREBE DA BLO STA DRUGO DODAJEM*

SADA CU DA POCNEM OD POCETKA, ODNOSNO PRIAKZACU STA BIH SVE TREBAO INSTALIRATI; PA CU ONDA ODPOCETI SA GRADNJOM WEBPACK KONFIGURACIJE

## :one: DAKLE PRE BILO KAKVOG PODESVANJA KONFIGURACIJE POTREBNO JE INSTALIRATI node-sass I sass-loader

GORE SAM NAPISAO STA JE TO USTVARI **node-sass**, TAK ODA NECU DODATNO OBJASNJAVATI

PODRAZUMEVA SE DA JE WEBPACK VEC RANIJE BIO INSTALIRAN, NARAVNO JA VEC IMAM MOJU PRIPREMLJENU WEBPACK KONFIGURACIJU KOJU CU DA REDEFINISEM, 'IMPLEMNTIRAJUCI CSS I SASS MODULE'

- **npm install sass-loader node-sass --save-dev**

## :two: SADA MOGU POCETI SA DEFINISANJEM KONFIGURACIJE

**PLAN** JE SLEDECI:

- ZELIM DA IMAM FAJLOVE SA EKSTENZIJOM **.module.css** I ONI CE BIT CSS MODULI ZA *`COMPONENT BASED STYLING`*, ONNOSNO IZ NJIH CU IZDVAJATI IMENA KLASA IKORISTITI UJAVASCRIPT-U

- ZELIM DA IMAM FAJLOVE SA EKSTENZIJOM **.module.scss** ILI **module.sass** I ONI CE BIT SASS MODULI ZA *`COMPONENT BASED STYLING`*, ONNOSNO IZ NJIH CU IZDVAJATI IMENA KLASA IKORISTITI UJAVASCRIPT-U

- ZELIM DA IMAM I *`GLOBAL BASED STYLING`* (FAJLOVI **BEZ** *`.module.`* U SVOM IMENU)

**DAKLE IMACU UKUPNO 4 'LOADER POSTAVKE', KOJE SE ODNOSE NA CSS I SASS** (PO DVE ZA CSS I PO DVE ZA SASS)

**NARAVNO POSTAVKE ZA *'development'* I ZA *"production"* CE SE RAZLIKOVATI**

- PRVENSTVENO STO CU ZA DEVELOPMENT KORISTITI **style-loader** SA **css-loader**-OM I **sass-laoder**-OM

- A ZA PRODUCTION, KORISTITI *loder* OD **'mini-css-extract-plugin'**-A, UMESTO "style-loader"-A

CISTO JOS DA KAZEM DA SE UPOTREBA CSS MODULA *PREPORUCUJE*

## :three: OSTAJE JEDINO, JEDNA NEDOUMICA U POGLEDU KORISCENJA SOURCE MAP-A, A ONA SE ODNOSI NA TO: DA LI SE TREBAJU SOURCE MAPS KORISTITI ZA DEVELOPMENT ILI ZA PRODUCTION

VIDEO SAM DA DEVELOPERI U SVOJIM KONFIGURACIJAMA SOURCE MAPS KORISTE PRVENSTVENO U DEVELOPMENT MODE-U

>> NIKDA ZA PRODUCTION

**PO LARKIN-U, TO NIJE NI BITNO, JER NE MOZE SE 'SAKRITI' FRONT END CODE, ON JE SVIMA NA IZVOLITE**

*ALI SIGURNO MALICIOUS KORISNIKU NE ZELIM NISTA DA OLAKSAVAM*

**JA CU USTVARI KORISTITI SOURCE MAPS ZA MOJ PRODUCTION CODE, CISTO DA VIDIM STA MOZDA NE VALJA U BUNDLE-OVIMA, KADA PRODUCTION CODE NE RADI ONAKO KAKO BI TREBALO DA RADI**

*A KADA SE DEPLOY-UJE, MOZE SE NAPRAVITTI BUILD BEZ SOURCE MAP-A*

NAIME, TREBAO BI DA USLOVNO DEFINISEM I UPOTREBU SOURCE MAP-A, ODNOSNO DA AKO ZELIM DA KORISTIM SOURCE MAPS, DA PROMENIM VREDNOST VARIJABLE, KOJU BI ONDA KORISTIO U KONFIGURACIJI, CIME BI SE ODLUCILO, KADA DA SE KORISTE SOURCE MAPS, ODNOSNO TAKO RECI PO ZELJI

## :four: ONO STO BI MOZDA BILO LAKSE JESTE DEFINISATI SVE, POMENUTO U GLAVNOJ KONFIGURACIJI, BEZ MODE KONFIGURACIJA, I TO U ZAVISNOSTI OD PROSLEDJENOG mode-A, KOJI SE VEC IONAKO PROSLEDJUJE, ALI POSTO JA IMAM, I USVOJIO SAM KONFIGURACIJSKU POSTAVKU, PO KOJOJ KORISTIM RAZLICITE KONFIGURACIJE I PREST KONFIGURACIJE, KOJE ONDA MERGE-UJEM SA GLAVNOM, JA CU IPAK IMATI I DAJLE DVE ODVOJENE mode KONFIGURACIJE, U KOJIMA CU DEFINISATI ZA SVAKU RAZLICIT LAODING CSS I RALICIT LOADING SASS-A

KRENUCU DAKLE OD NEKIH KOREKCIJA KOJE MORAM DEFINISATI U **webpack.config.js** FAJL-U

```javascript
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// DEFINISAO SAM DA modeConfig FUNKCIJA MOZE DA DOBIJE I mapUsage ARGUMENT
// ON CE BITI BOOLEAN
const modeConfig = (mode, mapUsage) => require(`./build-utils/webpack.${mode}`)(mode, mapUsage);
const addMergedPresetsConfigs = require('./build-utils/loadPresets');

/* const MyFirstWebpackPlugin = require('./build-utils/MyFirstWebpackPlugin'); */

module.exports = ({mode, presets} = {mode: "none", presets: []}) => {

    // STO SE TICE SOURCE MAPA, ODLUCIO SAM SE NA SLEDECI POTEZ
    // DEFINISACU OVDE VARIJABLU, KOJA CE PO POTREBI IMATI true ILI false
    // DAKLE MENJACU TO PO POTREBI

    // A U ODNSOU NA TU VARIJABLU, KOJU CU NARAVNO PROSLEDITI
    // ODLUCICE SE DA LI CE SE SORUCE MAP KORISTITI ILI NE (LAKO JE PO ZELJI MENJATI VREDNSOT JEDNE VARIJABLE U GLAVNOJ KONFIGURACIJI)

    let mapUsage = true;    // NE ZABOTRAVI DA GORE U modeConfig FUNKCIJI DAFINISES DA SE
                            // MODE CONFIGURACIJI PROSLEDJUJEI mapUsage

    // ISTO TAKO NEMOJ DA ZABORAVIS DA SI MOGAO IZABRATI RAZLICITE OPCIJE ZA SOURCE MAP-E
    // JER POSTOJE ONE POGODNE ZA DEVELOPMENT I ONE POGODNE ZA PRODUCTION
    // 


    // DALJE OVA SE VARIJABLA PROSLEDJUJE POZIVANJU modeConfig FUNKCIJE


    return webpackMerge(
        {
            /* optimization: {      //  ZABORAVI OSAM STA TACNO OVO RADI ALI ZA SADA MI I NIJE BITNO
                                    //  PROVERI OVDE (ZANEMARI SAD OVO)
                                               // https://webpack.js.org/plugins/split-chunks-plugin/#configuration
                splitChunks: {chunks: "all"}
            }, */
            mode,
            output: {
                filename: 'bundle.js'
            },
            plugins: [
                new webpack.ProgressPlugin(),
                /* new MyFirstWebpackPlugin(), */
            ],

            /* resolveLoader: { // NE OBRACAJ PAZNJU NA OVO, OVO SAM KORISTIO KADA SAM SE BAVIO PRAVLJANJEM 
                                    // MY OWN LAODER-A, ALI SAM OSTAVIO COMMENTED OUT CODE (NE SMETA)
                alias: {
                    // "my-loader": require.resolve('../my-loader.js')
                    // "my-loader": require.resolve('./build-utils/my-loader.js')
                }
        
            }, */

            module: {
                rules: [
                    {
                        test: /\.(jpe?g|png|svg)$/i,
                        use: [
                            {loader: "url-loader", options: {limit: 5000}},
                        ]
                    },
                    
                    
                ]
            }
        },
        modeConfig(mode, mapUsage),       // SADA U MODE CONFIG DODAJEM I INFO O map-I (DA LI JE KORISTITI ILI NE)
                                            // I SADA OSTAJE DA DEFINISEM KAKO DA SE UPOTREBI POMENUTI mapUsage ARGUMENT
                                            // U MODE KONFIGURACIJI
        addMergedPresetsConfigs({presets, mode})
    )
}
```

SADA, PRVO DEFINISEM, ODNOSNO REDEFINISEM CODE **build-utils\webpack.production.js** FAJL-A

**ZAPAMTI DA *module* OPCIJU TREBAS DEFINISATI SAMO ZA CSS LAODER** (POSTO JE REC O )

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//  -------------------         OVO JE NEKI INFO OD RANIJE -----------  KOJI MORAM ZNATI
// DON'T FORGET THAT MiniCssExtractPlugi NEEDS HtmlWebpackPlugin (INFO OD RANIJE)
// output -->       filename SET TO '[chunkhash].js' FOR FINAL PRODUCTION BUILD (ime ce tada biti generated)
// chunkfilename -->        FOR LAZY LOADING import() (USE MAGIC COMMENTS) (INFO OD RANIJE) (INFO OD RANIJE)
// DON'T EVER USE style-loader FOR PRODUCTION, ESPECIALLY WHEN YOU HAVE mini-css-extract-plugin 
//          (WATCH FOR MERGING WITH SOME CONFIG THAT HAS MENTIONED LOADER (IT WILL CAUSE ERROR))
                                                                    //        (INFO OD RANIJE)
// ---------------------------------------------------------------------------------------------------

// DAKLE SADA CU DA OBJASNIM STA JE VAZNO DA DEFINISEM ZA PRODUCTION A TICE SE SASS-A
// CISTO DA NAPOMENEM DA KADA NE KORISTIM KONFIGURACIJE, KOJE SE MERGE-UJU UZ POMOC webpackMerge FUNKCIJE
// U GLAVNOJ KONFIGURACIJI (SADA UPRAVO TO KORISTIM, MERGE-UJEM OBJEKTE KOJE return-UJU FUNKCIJE)
// MORAO BIH KORISTITI      
//                                           process.env.NODE_ENV         KAKO BI ISMO VREDNSOT mode-A


// ALI PSOTO JA RADIM 'ZESTOKI' COMPOSITION PRI GRADNJI KONFIGURACIJE, (A TO ZNACI DA JA USTVARI UMESTO
// JEDNOG KONFIGURACIJSKOG OBJEKTA, USTVARI KORISTITM MNOSTVO PA IH MERGE-UJEM),
// JA USTVARI NECU KORISTITI GORE POMENUTO, KAKO BI USLOVNO
// DEFINISAO NEKI PROIPERTI, ALI CISTO DA ZNAM DA PSOTOJI TAKVA MOGUCNOST

// OVDE TO NE BI RADILO JER NIJE REC O FAJLU webpack.config.js NA TOP LEVELU, MOG APP-A 
//                  (PREDPOSTAVLJAM DA NE BIH MOGAO KORISTITI U OVOM FAJLU ILI PRESET-OVIMA)

// MEDJUTIM JA IMAM DRUGACIJU MOGUCNOST, MOGU MODE DA PROSLEDIM OVOJ FUNKCIJI

                            // POSTOJI I FUNKCIJA modeConfig
                            // KOJU SAM DEFINISAO U GLAVNOJ KONFIGURACIJI
                            // CIJI JE CILJ DA REQUIRE-UJE 
                            // POTREBNU KONFIGURACIJU
                            // A JA SAM REDEFINISAO TAKVU FUNKCIJU, KAKO BI ONA
                            // PROSLEDJIVALA mode, MOJOJ FUNKCIJI 
                            // (A TO JE MOJA FUNKCIJA KOJA JE DEFULT EXPORT OVOG FAJLA) 

                                    // CISTO DA POKAZEM KAKO IZGLEDA modeConfig U webpack.config.js FAJLU:
                                    // const modeConfig = (mode) => require(`./build-utils/webpack.${mode}`)(mode);

// DAKLE mode JE PROSLEDJEN

module.exports = (mode, mapUsage) => { // ALI mode JE OVDE U SLUCAJU ONOGA STA JA ZELIM DA URADIM NEPOTREBAN JER
                                        // ZNAM DA JE OVO PRODUCTION KONFIGURACIJA I NE TREBAM NISTA CONTITIONALLY U ODNOSU NA
                                        // mode DEFINISATI

    // DAKLE TREBAM SAMO DA VODIM RACUNA
    // O TOME STA JA USTVARI ZELIM DA DEFINISEM ZA PRODUCTION, A TICE SE CSS-A I SASS-A

    // A TAKODJE MOZES DA VIDIS DA SE OVOJ FUNKCIJI PROSLEDJUJE I BOOLEAN
    // KOJI M SE ODLUCUJE DA L ICE SE KORISTITI SOURCE MAPS

    //________________________________________________________________________________________________
    // !!!!!    ONO STO JE JAKO BITN OJE STE CHAINING LOADER-A      SKROZ DESNO SU LAODER-I KOJI PRVI LOADUJU TVOJE CSS FAJLOVE
    // !!!!                                                         STA POD TIME MISLIM

    //                                                          EVO OVO BI BIO PRAVILAN RASPORED

    //                                          [MiniCssExtractPlugin.loader, "css-laoder", "sass-laoder"]

    //                                            LOADING POCINJE OD sass-A AKO JE U PITANJU SASS
                                            // OVO IZGLEDA NAOPAKO ALI SE TAKO MORA DEFINISATI
    ///!!!!!!_____________________________________________________________________________________________

    return {
        devtool: mapUsage? "source-map": false,      // EVO OVDE DEFINISEM UPOTREBU SORCE MAP U ODNSU NA 
                                                     // NA PROSLEDJENU VREDNSOT IZ MAIN CONFIG FAJLA

        // DIGRESIJA:  devtool  MOZE IAMTI I RAZLICITE DRUGE VREDNOSTI
        // https://webpack.js.org/configuration/devtool/#devtool

        output: {
            filename: 'bundle.js',  // POGLEDAJ MOZDA JE OVO OVERWRITEN IZ NEKOG PRESET-A
            chunkFilename: '[id].[name]-lazy-load.js'   // OVO MISLIM DA NIJE
        },
        
        module: {
            rules: [
                // JA USTVARI ZELIM DA ZADRZIM MOGUCNOS DA LOAD-UJEM I PURE css FAJLOVE

                // ALI ZELIM DA IMAM MOGUCNOST DA LOAD-UJEM SASS

                // ISTO TAKO ZELIM DA SAM U MOGUCNOSTI DA I IZ CSS FALJOVA A I IZ SASS FAJLOVA DA
                // IZOLUJEM KLASE U JAVASCRIPTU (ODNOSNO CSS MODULE)

                // PRETEZNO ZELIM DA KORISTIM .scss JER JE TO USTVARI SUPERSET CSS-A
                // ALI KORISTICU LOADER POSTAVKE SPECIJALNO ZA CSS I SPECIJALNO ZA SASS
                // ZATO CU IMATI NESTO VISE MATCHING-A
                
                // MODULE CU, TOKO MDEVELOPINGA APLIAKCIJE 'IZOLOVATI' IZ FAJLOVA, KOJI IMAJU 
                // .module.css u SVOM IMENU
                // ALI PRVO DA DEFINISEM ZA GLOBAL CSS FAJL

                // OPET NEMOJ DA ZABORAVIS DA JE REDOSLED DEFINISANJA LAODER-A ,ZAISTA VAZAN I DA SE /// 'CITA OD DESNA NA LEVO' (TAKVA JE KONVENCIJA)

                {   
                    test: /\.css$/i,
                    exclude: /\.module\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {loader: "css-loader", options: {sourceMap: mapUsage}}
                                            // ZAPAMTI CSS LAODER UVEK NAKON JER SE POSMATRA OBRNUTO SA DESNA
                    ]                      // KAO STO SAM GORE OBJASNIO I POSTUJ OVO
                                           // https://docs.google.com/presentation/d/1hFtMCMo62DgOIc-9OwgaVwPZHwv1cgMELArHcMbXlSI/edit#slide=id.g15e96ef847_0_438
                },
                
                // EVO DEFINISEM ZA CSS (ZADAJEM DODATNE OPCIJE)

                {
                    test: /\.module\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {loader: "css-loader", options: {modules: true, sourceMap: mapUsage}}  // 
                    ]
                },
                
                // DAKLE TREBA MI REGULAR EXPRESSION KOJI MATCH-UJE 'SASS BUNDLE', ODNOSNO GLOBAL FAJL
                // (ALI USTVARI PRVO ZELIM DA MATCH-UJEM SASS FAJLOVE SA .module.scss)
                // A STRIKTNO CU DEFINISATI DA U IMENU SASS FAJLA KOJI JE MODUL IMA .module.scss (TOKOM GRADNJE MOG APP-A)
                {
                    test: /\.module\.s[ac]ss$/i,
                    // A STO SE TICE LOADER-A, KOJE KORISTIM ZA PRODUCTION U POGLED U SASS-A, TO CU SADA DEFINISATI
                    // I TREBACE NESTO DETALJNIJE DEFINISANJE POMENUTOGA

                    use: [

                        // PRVI LOADER, KOJI CU DEFINISATI DA BUDE U UPOTREBI JE MiniCssExtractPlugin.loader

                        MiniCssExtractPlugin.loader, // U plugin DELU CU KONFIGURIRATI OVAJ PLUGIN, KAKO BI
                                                     // USTVARI MORAM DEFINISATI DA OVAJ PLUGIN KORISTI CHUNKOVE CSS-A


                        // SELDECI CE BITI css-loader, A ONO STO CU ZA NJEGA OMOGUCITI JESU MODULI 
                        // MISLIM DA SAM NAPOMENUO ZASTO SAMO ZA NJEGA
                        {loader: "css-loader", options: {modules: true}},
                         

                        // DEFINISEM I KORISCENJE SASS LAODER-A   (ON JE DAKLE LOADER KOJI CE PRVI LOAD-OVATI)
                                                                  //( ALI OPET NAPOMINJEM DA JE USVOJENA KONVENCIJA
                                                                  // DA ONAJ KOJI PRVI LOAD-UJE SE OVDE DEFINISAN POSLEDNJI )
                        {
                            loader: "sass-loader",
                            options: {sourceMap: mapUsage}
                        }

                    ]
                },

                {
                    // GORE SAM MATCH-OVAO SASS KOJ ICE KORISTITI SELEKTORE KAO MODULE, A SADA DEFINISEM MATCHING GLOBAL FAJLOVA KOJI CE SAMO IMATI
                    // .scss ILI sass EKSTENZIJE

                    test: /\.s(a|c)ss$/i,
                    exclude:  /\.module\.s[ac]ss$/i,
                    use: [

                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {loader: "sass-loader", options: {sourceMap: mapUsage}}

                    ]


                }

            ]
            
        },

        // MEDJUTIM TU NIJE POSAO ZVRSEN, JER ZELIM DA MiniCssExtractPlugin INSERTUJE
        // CHUNK-OVE CSS-A, KAO POSLEDICA CODE SPLITTING-A, ODNOSNO, KAO POSLEDICA DINAMICKOG IMPORT-A
        // KADA SE SCSS TRANSPILE-UJE U CSS, JA NE ZELIM, SAMO JEDAN CSS FAJL, VEC
        // ZELIM DA I CSS CODE BUDE CHUNKED (BEZ OBZITRA NASTAO ON OD SASS-A ILI NE)

        // SVE POMENUTO MOGU RESITI, KROZ NEKOLIKO POSTAVKI ZA          MiniCssExtractPlugin

        plugins: [
            new HtmlWebpackPlugin(),
            new MiniCssExtractPlugin({
                // DAKLE DEFINISEWM FILENAME I CHUNK FILENAME KOJI CE SE SASTOJATI I OD HASH-A (HEX STRING-A)
                filename: "[name].[hash].css",

                // DEFINISEM I CHUNK FILENAME, KOJE CE SE SASTOJATI OD ID-JA I OD HEX-A
                chunkFilename: "[id].[name].[hash].css"

            }),

            new HtmlWebpackPlugin({  // PROVIDING FALLBACK PAGE (CODE OD RANIJE)
                filename: "fallback_offline.html",
                chunks: ["fallback_offline"],
                template: 'src/templates/fallback_offline.html',
            }),
        ],

        // MOZE SE DEFINISATI I RESOLVEMENT FAJLOVA KOJI IMAJU SASS EKSTENZIJE
        // AL INE ZABORAVI DA SE PO DEFAULT-U RESOLVE-OVAO JAVASCRIPT (E AKO DODAJES NESTO, MORAS EKSPLICITNO DEFINISATI I ZA .js)

        // OVO SE USTVARI DEFINISE, AKO NE ZELIM DA KUCAM EKSTENZIJU PRILIKOM DEFINISANJA import STATEMENT-A
        // AKO SE SECAS IMPORTING-A JAVASCRIPT MODULA, JASNO TI JE DA NE MORAS KUCATI .js EKSTENZIJU

        // ALI IPAK STO SE TICE CSS JA ZELIM DA IMAM EKSTENZIJU, PROSTO ZBOG CITLJIVOSTI, DA NE BI POSMISLI ODA JE NEKI
        // SASS-OV IMPORT, USTVARI JAVASCRIPT-OV
            
            /* 
        resolve: {
            extensions: ['.js', '.sass', '.scss']
        }
            */

    }
}
```

STO SE TICE **build-utils\webpack.development.js**

SVE CE BITI ISTO DEFINISANO, KAO I U PREDHODNOJ MODE KONFIGURACIJI, SAMO STO UMESTO 'mini-css-extract-plugin'-A, JA KORISTIM **"style-loader"**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (mode, mapUsage) => ({

    devtool: mapUsage? "source-map": false,

    output: {
        chunkFilename: '[name]-lazy-load.js',
    },
    module: {
        rules: [
            {   
                test: /\.css$/i,
                exclude: /\.module\.css$/i,
                use: [
                    "style-loader",
                    {loader: "css-loader", options: {sourceMap: mapUsage}}
                ]
                                      
            },
            
            {
                test: /\.module\.css$/i,
                use: [
                    "style-loader",
                    {loader: "css-loader", options: {modules: true, sourceMap: mapUsage}}  // 
                ]
            },

            {
            
                test: /\.s(a|c)ss$/i,
                exclude:  /\.module\.s[ac]ss$/i,
                use: [

                    "style-loader",
                    "css-loader",
                    {loader: "sass-loader", options: {sourceMap: mapUsage}}

                ]

            },
            
            {
                test: /\.module\.s[ac]ss$/i,
                
                use: [

                    "style-loader", 
                    
                    {loader: "css-loader", options: {modules: true}},
                  
                    {
                        loader: "sass-loader",
                        options: {sourceMap: mapUsage}
                    }

                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({                         // PROVIDING FALLBACK PAGE
            filename: "fallback_offline.html",
            chunks: ["fallback_offline"],
            template: 'src/templates/fallback_offline.html',
        }),

    
    ]

})
```

**ONO STA MOZES DA PRIMETIS U GORNJIM KONFIGURACIJAMA, JESTE DA SI SAMO ZA "css-laoder" DEFINISAO *true* ZA *modules* OPCIJU** (TAKO I TREBA, NECU ULAZITI ZASTO NE BI TREBAL ODA SE ISTO URADI ZA sass-loader)

**I MOZES DA PRIMETIS DA PRI MATCHING-U SASS FAJLOVA, KADA DEFINISES UPOTREBU "sass-laoder"-A KORISTIS, MOGUCI SOURCE MAP SAMO ZA "sass-laoder"**

**I MOZES DA PRIMETIS DA PRI MATCHING-U CSS FAJLOVA, KADA DEFINISES UPOTREBU "css-laoder"-A KORISTIS, MOGUCI SOURCE MAP SAMO ZA "css-laoder"** (MISLI MDA BI TREBAL ODA BUDE JASNO ZASTO, PA ZATO STO MI JE CILJ DA PRI DEBUGGING-U DODJEM DO ORIGINALNOG PRE BUILD CODE-A, A TO SE RADI UZ POMOC SOURCE MAPA)

OPET NAPOMINJEM IAKO SVAKAKO SOURCE MAPS NISU TEMA OVE LEKCIJE, DA [POSTOJI STRANICA NA KOJOJ MOGU VIDETI RAZLICITE TIPOVE SOURCE MAP-A, I TAKODJE JE OBJASNJENJO KOJE SE KORISTE ZA DEVELOPMENT A KOJE SE KORISTE ZA PRODUCTION MODE](https://webpack.js.org/configuration/devtool/#devtool)

**PREDHODNO SAMO VAZI ZA devtool PROPERTI KONFIGURACIJE**

MISLIM DA JE DOSTA BILO PRICE I DA BI TREBALO DA IZSTETIRAM SASS, ODNOSNO CSS MODULE

## SHOWCASE CSS I SASS MODULA

KROZ OVAJ SHOWCASE, JA CU SE PODSETITI I CODE SPLITTING-A (import()); A NE SAMO UPOZNATI SE SA 'SASS, ODNOSNO CSS MODULIMA'

```javascript
// src\index.js         ODNOSNO ENTRYPOINT

import {buildBlahElement} from './blah_element';

buildBlahElement();


```

```javascript
//  src\blah_element.js

// **********EVO OVO JE CSS MODUL, ODNSONO SASS MODUL, ODNSONO CSS KALSA IZOLOVNA IZ SASS FAJLA
//********** OVAKO NESTO SAM MOGAO URADITI I SA CSS-OM
import {colory_blah} from "./styles/sass_modules/blah_element.module.scss";


const preFetchChangeSize = () => import(
    './change_blah'
    /* webpackPrefetch: true */
    /* webpackChunkName: 'resizing' */
)

export const buildBlahElement = () => {

    const rectangle = document.createElement('div');

    rectangle.classList.add(colory_blah);               // EVO OVDE DODAJEM POMENUTU KLASU

    // U SUSTINI KADA SE CODE BUNDLE-UJE
    // U CSS BUNDLE-U CE POSTOJATI HASHED KLASA   NA PRIMER     .fgfhgf321312hgfhgf11
    // ODNOSNO ONO IME KOJE SAM ZADAO U FAJLU KOJI JE BIO U SOURCE FOLDERU
    // VISE NECE POSTOJATI, VEC CE TI STILOVI BITI ZAVEDAENI POD HASHED KLASU U BUNDLE-U

    // A ELEMENT CE IMATI TU NOVU HASHED KLASU, KAO VREDNOST class ATRIBUTA

    const buttonPixel = document.createElement('button');

    buttonPixel.textContent = "change size with pixels";

    const buttonShrink = document.createElement('button');

    buttonShrink.textContent = "shrink it";

    ////////////////////////////

    buttonPixel.addEventListener('click', e => {

        // EVO OVDE KORISTIM DINAMICKI IMPORT
        // I SVAKI STIL KOJI KORISTI UVEZENI JAVASCRIPT, BICE CHUNKED ISTO KAO I JAVASCRIPT
        // DAKLE IAMCU CODE SPLITTING I U POGLEDU CSS-A

        preFetchChangeSize()
        .then(module => {

            let changeWithPixels = module.pixelEl;

            changeWithPixels(e.target.parentNode)

        })

    })

    buttonShrink.addEventListener('click', e => {

        preFetchChangeSize()
        .then(module => {

            let changeWithShrink = module.shrinkEl;

            changeWithShrink(e.target.parentNode)

        })

    })

    /////////////////////////////////

    rectangle.append(buttonPixel, buttonShrink);

    document.body.append(rectangle);

}
```

```javascript
// src\change_blah.js

import {shrink, pixel_size} from './styles/sass_modules/change_size.module.scss';
// EVO I OVDE KORISTIM SASS MODULE

export const shrinkEl = target => {

    target.classList.add(shrink);
    target.classList.remove(pixel_size);

}


export const pixelEl = target => {

    target.classList.add(pixel_size);
    target.classList.remove(shrink);

}
```

SASS FAJLOVI KOJE SAM KORISTIO:

```scss
//  src\styles\sass_modules\blah_element.module.scss


.colory_blah {

    border-style: double;
    border-width: 12px;
    border-color: mediumaquamarine;

    height: 20vw;
    width: 80vw;


    .blah_theme & {
        background-color: chocolate;
    }

}
```

```javascript
//      src\styles\sass_modules\change_size.module.scss

.shrink {

    width: 28vw;
    height: 58vw;

}

.shrink::after {
    content: "SHRINK"
}

.pixel_size {

    width: 400px;
    height: 280px;

}

.pixel_size::after {
    content: "PIXEL"
}

```

**STO SE TICE CODE SPLITTING, SECAS SE DA POSTOJE I "DINAMICKI" I STATICKI CODE SPLITTING**

TI SI KORISTIO STATICKI SADA

*OVO SE CISTO PODSECAM*

["DINAMICKI" TI JE OBJASNJEN OVDE](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/WEBPACK/0%29%20WEB%20PERFORMANCE%20%28DRUGI%20DEO%20TUTORIJALA%29/a%28%20%60%60DINAMICKI%60%60%20CODE%20SPLITTING.md#dinamicki-code-splitting) (VEC SI PISAO O TOME)
