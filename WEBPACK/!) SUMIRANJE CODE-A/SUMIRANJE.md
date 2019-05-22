# SUMIRANJE KONFIGURACIJA KOJE SAM NAPISAO TOKOM, KRATKOG BAVLJENJA SA WEBPACK-OM (NA KRAJ UCU OSTAVITI I package.json DA VIDIM DEV DEPENDANCIES I SCRIPT-OVE)

## webpack.config.js

FILE/FOLDER STRUKTURA: NA NAJVISEM NIVOU U APP-U

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env); // za development ili production (depends on env.mode IN SCRIPTS (package.json IL IDIREKTNO U TERMINAL))
const webpackMerge = require('webpack-merge');

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

        addMergedPresetsConfigs({presets})
    )

}
```

## DEVELOPMENT KONFIGURACIJA

build-utils FOLDER:

**webpack.development.js**

```javascript
module.exports = () => ({
    devtool: "cheap-module-source-map", // PROBAJ 'source-map' (PROBAJ USTVARI RAZNE PA IH ISPITIVAJ U Sources TABU DEV TOOLS-A)
    output: {
        filename: 'bundle.js'  // NE MORA DA BUDE HASHED (LAKSE CES CITATI (MISLIM NA MOJE OCI))
    },
    module: {
        rules: [
            {test: /.css$/, use: ["style-loader", "css-loader"]}     // PROVERI DA LI TI TREBAJU OBA LAODERA
        ]
    },

})
```

## PRODUCTION KONFIGURACIJA

build-utils FOLDER:

**webpack.production.js**

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
    return {
        devtool: "source-map",
        output: {
            filename: '[chunkhash].js'    // moze ovo
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

**POSTO U PREDHODNOJ KONFIGURACIJI NE VIDIM NI JEDAN CSS LOADER, PREDPOSTAVLJAM DA JE PROVIDED PO DEFAULT-U** (OVO KAZEM JER JE PRODUCTIO NCODE FUNKCIONISAO)

## FUNKCIJA KOJA LOAD-UJE PRESETS

build-utils FOLDER:

**loadPresets.js** (BITNO JE DA IMA OVO IME JER JE UVOZIM U GLAVNU KONFIGURACIJU RADI MERGINGA) (TAM OSAM DEFINISAO require KOJE JE RQUIREJE NA OVOM PATHU I POD OVIM IMENOM)

```javascript
const webpackMerge = require("webpack-merge");

module.exports = env => {

    const {presets} = env;

    if(presets){

        const presetsArrayFlatten = [].concat(...[presets]);
        const configsArray = presetsArrayFlatten.map(
            presetName => require(`./presets/webpack.${presetName}`)(env)
        );

        const object = webpackMerge({}, ...configsArray);

        return object;
    }

    return {};
}
```

## PRESETS

U FOLDERU /build-utils/presets

### webpack.compress.js

```javascript
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = () => ({
    plugins: [new CompressionWebpackPlugin()]
})
```

### webpack.analyze.js

```javascript
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => ({
    plugins: [new WebpackBundleAnalyzer()]
})
```

## webpack.typescript.js (NE ZABORAVI DA JE ZA WEBPACK POTREBAN I SPECIJALNI ZA NJEGA KONFIGURACIJSKI FAJL (O TOME KADA SE BUDEM BAVIO UCENJEM TYPESCRIPT-A))

```javascript
module.exports = () => ({

    module: {
        rules: [
            {test: /\.ts$/, use: 'ts-loader'}
        ]
    }

})
```

## MOJ package.json

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
    "prod:compress:analyze": "npm run prod:compress -- --env.presets analyze",
    "dev:compress": "npm run dev -- --env.presets compress"
  },
  "keywords": [
    "webpack",
    "plugins",
    "configuration"
  ],
  "author": "Rade",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {
    "compression-webpack-plugin": "^2.0.0",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
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

## LARKIN-OV (ZATO STO U NJEGOVOM IMA JOS DEPENDANCIES-A), CISTO DA IMAM UVID

```javascript
{
  "name": "webpack-workshop-2018",
  "version": "1.0.0",
  "description": "Learning resources for the webpack academy workshop series for 2018",
  "main": "index.js",
  "scripts": {
    "webpack-dev-server": "webpack-dev-server",
    "webpack": "webpack",
    "debug": "node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js",
    "prod": "npm run webpack -- --env.mode production",
    "dev": "npm run webpack-dev-server -- --env.mode development --hot",
    "prod:typescript": "npm run prod -- --env.presets typescript",
    "prod:debug": "npm run debug -- --env.mode production",
    "dev:debug": "npm run debug -- --env.mode development",
    "prod:analyze": "npm run prod -- --env.presets analyze",
    "prod:compress": "npm run prod -- --env.presets compress",
    "prod:compress:analyze": "npm run prod:compress -- --env.presets analyze"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/TheLarkInn/webpack-workshop-2018.git"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "homepage": "https://github.com/TheLarkInn/webpack-workshop-2018#readme",
  "devDependencies": {
    "@babel/core": "^7.0.0-beta.46",
    "@babel/preset-env": "^7.0.0-beta.46",
    "babel-loader": "^8.0.0-beta",
    "compression-webpack-plugin": "^2.0.0",
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "fork-ts-checker-webpack-plugin": "^0.4.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "http-server": "^0.11.1",
    "mini-css-extract-plugin": "^0.4.0",
    "postcss-loader": "^2.1.5",
    "style-loader": "^0.21.0",
    "ts-loader": "^4.3.0",
    "typescript": "^2.9.0-dev.20180506",
    "url-loader": "^1.0.1",
    "webpack": "^4.8.0",
    "webpack-bundle-analyzer": "^2.11.1",
    "webpack-cli": "^3.1.2",
    "webpack-dev-server": "^3.1.4",
    "webpack-merge": "^4.1.2",
    "webpack-node-externals": "^1.7.2",
    "workbox-webpack-plugin": "^3.2.0"
  },
  "dependencies": {
    "d3": "^5.1.0"
  }
}

```