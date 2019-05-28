# POPRAVLJENA loadPresets FUNKCIJA

OVAKO SAM DEFINISAO DA SE POMENUTA FUNKCIJA KORISTI U GLAVNOJ KONFIGURACIJI

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const webpackMerge = require('webpack-merge');

// OVDE UVOZIM POMENUTU loadPresets FUNKCIJU
const addMergedPresetsConfigs = require('./build-utils/loadPresets');

module.exports = ({mode, presets} = {mode: "production", presets: []}) => {

    return webpackMerge(
        {
            mode,
            output: {
                filename: 'bundle.js'
            },
            plugins: [
                new HtmlWebpackPlugin(),
                new webpack.ProgressPlugin()
            ],
            module: {
                rules: [
                    {
                        test: /\.jpe?g$/,
                        use: [
                            {loader: "url-loader", options: {limit: 5000}}
                        ]
                    }
                ]

            }
        },
        modeConfig(mode),
        // KORISTIM OVDE, POMENUTU FUNKCIJU KAO ARGUMENT MERGING-A
        // I NISAM UZEO U OBZIR KONKRETAN SLUCAJ, KADA NE ZELIM NI JEDAN PRESET (ODNOSNO KADA SAMO ZELIM DEVELOPMENT ILI PRODUCTION BEZ DODATNIH SETTING-A)
        // DAKLE, TADA, ON OSTO BI BILO POVRATNA VREDNSOT, OVE FUNKCIJE JESTE undefined
        // DAKLE, MORAM REDEFINISATI, POMENUTU FUNKCIJU
        addMergedPresetsConfigs({presets})
    )

}
```

## MORAM UZETI U OBZIR DA CE DOCI DO ERROR-A, AKO NE ZELIM DA MERGE-UJEM NIKAKVE PRESETS

DAKLE POTREBNO JE REDEFINISATI POMENUTU FUNKCIJU ZA SLUCAJ KADA NE ZELIM DA DODAJEM NI JEDAN PRESET, MOJOJ GLAVNOJ KONFIGURACIJI (ZATO STO CE SE POMENUTA FUNKCIJA POZVATI I KADA NE ZELIM PRESET, JER SAM NJENO POZIVANJE DEFINISAO U GLAVNOJ KONFIGURACIJI)

```javascript
const webpackMerge = require("webpack-merge");

module.exports = env => {
    const {presets} = env;

    // DAKLE, KADA NI JEDAN PRESET NIJE PROSLEDNJEN, KROZ ENVIROMENT VARIJABLU
    // POTREBNO JE DEFINISATI DA SE RETURN-UJE PRAZAN OBJEKT, KAKO BI ON MOGAO
    // BITI MERGED U GLAVNOJ KONFIGURACIJI
    if(presets){

        const presetsArrayFlatten = [].concat(...[presets]);
        const configsArray = presetsArrayFlatten.map(
            presetName => require(`./presets/webpack.${presetName}`)(env)
        );

        return webpackMerge({}, ...configsArray);
    }

    return {};
}
```

## LARKIN JE OVO CAK URADIO NA PAMETNIJI NACIN, BEZ USLOVNE IZJAVE, VEC JE KORISTIO SAMO OR STATEMENT

```javascript
const webpackMerge = require("webpack-merge");

module.exports = (env = {presets: []}) => {  // NE ZNAM ZASTO JE DODAO OVAJ DEFAULT, JER CE GA undefined
                                             // PROSLEDJENO OD env.presets IZ ENVIROMENTA, ZAISTA
                                             // OVERRIDE-OVATI

    // USTVARI ON JE KORISTIO POMENUTI DEFAULT ARGUMENT DA BIH MOGAO PRISTUPITI OVAKO:     env.presets
    // A OVD EJE URADIO ODLICNIU STVAR
    const presets = env.presets || [];
    // DAKLE AKO JE env.presets , USTVARI undefined, ONDA CE VREDNOST presets VARIJABLE BITI []

    const presetsArrayFlatten = [].concat(...[presets]);  // TADA JE I OVO PRAZAN NIZ

    const configsArray = presetsArrayFlatten.map(      // TADA CE I OVO RETURN-OVATI PRAZAN NIZ
        presetName => require(`./presets/webpack.${presetName}`)(env)
    );

    // OVO MOZE BITI NERAZUMLJIVO U POGLEDU SPREAD SINTAKSE, KADA IMAM PRAZAN NIZ
    // NAIME U TOM SLUCAJU IZGLEDA DA SPRED SINTAKSA POPRAVLJA SAMA STVARI

    // JER ONO STO CE SE DOGODITI JESTE DA U SLUCAJU KADA JE PRAZNA NIZ KORISTI SA SPREAD SINTAKSOM DOLE
    // TADA JEDINI ARGUMENT FUNKCIJE BIVA ONO STO SE NALAZI PORED SPREAD SINTAKSE
    // U OVOM SLUCAJU DAKLE JEDINI ARGUMENT CE BITI PRAZAN OBJEKAT
    // I TO CE BITI I RETURNED IZ OVE FUNKCIJE, JER NECE BITI NIKAKVOG MERGING-A (STO ZNACI DA SU 
    //KREATORI webpack-merge NAPRAVILI DA JE MOGUCE DODATI JEDAN ARGUMENT OBJEKAT)
    return webpackMerge({}, ...configsArray);

    // TO VAZI ZA SVAKU FUNKCIJU, KOJO JSE DODAJE OVAKO SPREAD SINTAKSA U SLUCAJU PRAZNOG NIZA
}
```