# MOJA KONFIGURACIJA

EVO GA EVO GA DIREKTORIJUM/DATOTEKA STRUKTURA KOD MOJE KONFIGURACIJE I ZAPAMTI DA webpack.config.js TREBA DA BUDE NA NAJVISEM NIVOU

```javascript

│   package.json
│   README.md
│   webpack.config.js
│   yarn.lock
│   .gitignore
│
├───build-utils
│   │   loadPresets.js
│   │   webpack.development.js
│   │   webpack.none.js
│   │   webpack.production.js
│   │
│   └───presets
│           webpack.analyze.js
│           webpack.compress.js
│           webpack.typescript.js
│
├───node_modules
│
├───dist    // FOLDER ZA BUILD-OVE
|
└───src
    │
    │   index.js        // ENTRY POINT
    │
    │   // OSTALI FAJLOVI (MODULI)

```

## package.json SA SVIM DEFINISANIM SCRIPT-OVIMA, KOJI KORISTE WEBPACK I SVIM SPECIFICIRANIM DEV DEPENDANCIES-IMA

```javascript
{
  "name": "rade_webpack",
  "version": "1.0.0",
  "description": "Practicing webpack",
  "main": "index.js",
  "scripts": {
    "webpack": "webpack",
    "webpack-dev-server": "webpack-dev-server",
    "debug": "node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js",
    "dev": "npm run webpack-dev-server -- --env.mode development --hot",
    "prod": "npm run webpack -- --env.mode production",
    "prod:typescript": "npm run prod -- --env.presets typescript",
    "dev:debug": "npm run debug -- --env.mode development",
    "prod:debug": "npm run debug -- --env.mode production",
    "prod:analyze": "npm run prod -- --env.presets analyze",
    "prod:compress": "npm run prod -- --env.presets compress",
    "prod:compress:analyze": "npm run prod:compress -- --env.presets analyze", // OVO MI JE BIO JEDINI NACIN DA DEFINISEM VISE OD JEDNOG PRESET-A
    "dev:compress": "npm run dev -- --env.presets compress"
  },
  "keywords": [
    "webpack",
    "plugins",
    "configuration"
  ],
  "author": "Rade",
  "license": "ISC",
  "dependencies": {
    "file-loader": "^3.0.1",  // NE ZNAM KAK OSE file-loder OVDE NASO (ON TREBA DA BUDE DEV DEPENDANCY (MORA DA SAM GA GLOBALNO INSTALIRAO))
    "gsap": "^2.1.3"           // gsap library cu nekada nauciti (onaje installed globalno)
  },
  "devDependencies": {
    "compression-webpack-plugin": "^2.0.0",
    "css-loader": "^2.1.1",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.6.0",
    "style-loader": "^0.23.1",
    "ts-loader": "^6.0.0",
    "typescript": "^3.5.0-rc",
    "url-loader": "^1.1.2",
    "webpack": "^4.31.0",
    "webpack-bundle-analyzer": "^3.3.2",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.3.1",
    "webpack-merge": "^4.2.1"
  }
}
```

## GLAVNA KONFIGURACIJA (webpack.config.js)

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const addMergedPresetsConfigs = require('./build-utils/loadPresets');

module.exports = ({mode, presets} = {mode: "none", presets: []}) => {

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
                    },
                    {test: /.css$/, use: ["style-loader", "css-loader"]}
                ]
            }
        },
        modeConfig(mode),
        addMergedPresetsConfigs({presets})
    )
}
```

## PRODUCTION, DEVELOPMENT I NONE KONFIGURACIJA (ZAVISI OD --env.mode)

**webpack.production.js**

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    return {
        devtool: "source-map",
        output: {
            filename: 'bundle.js',    // moze ovd i '[chunkhash].js' MOZDA JE CAK I POZELJNIJE
            chunkFilename: '[name]-lazy-load.js'  // ZAPAMTI DA TI ZA [name] TREBAJU MAGIC COMMENTS KOD DINAMICKOG import()
        },
        module: {
            rules: [
                {test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"]}
            ]
        },
        plugins: [
            new MiniCssExtractPlugin()
        ]

    }
}

```

**webpack.development.js**

```javascript
module.exports = () => ({
    devtool: "eval",      // OVO MOZDA TREBAM DA PROMENIM
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name]-lazy-load.js'
    }
})
```

**webpack.none.js**

```javascript
module.exports = () => {};
```

## MOJA loadPresets FUNKCIJA (NALAZI SE U build-utils/loadPresets.js)

```javascript

const webpackMerge = require("webpack-merge");

module.exports = (env = {presets: []}) => {  // NE ZNAM ZASTO JE DODAO OVAJ DEFAULT, JER CE GA undefined
                                             // PROSLEDJENO OD env.presets IZ ENVIROMENTA, ZAISTA
                                             // OVERRIDE-OVATI

    // USTVARI ON JE KORISTIO POMENUTI DEFAULT ARGUMENT DA BIH MOGAO PRISTUPITI OVAKO:     env.presets
    // A OVDE JE URADIO ODLICNIU STVAR
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

## PRESETS (ZAVISE OD --env.presets FLAG-A)

**webpack.analyze.js**

```javascript
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => ({
    plugins: [new WebpackBundleAnalyzer()]
})
```

**webpack.compress.js** (MOZDA BI OVO TREBAO DA KORISTIM UVEK ZA PRODUCTION)

```javascript
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = () => ({
    plugins: [new CompressionWebpackPlugin()]
})
```

**webpack.typescript.js** (NJEMU TAKODJE TREBAJU, ZA NJEGA SPECIJALNI TYPESCRIPT CONFIGURATIO NFAJLOVI ILI JEDAN FAJL, NISAM SIGURAN)

```javascript
module.exports = () => ({

    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'}
        ]
    }

})
```