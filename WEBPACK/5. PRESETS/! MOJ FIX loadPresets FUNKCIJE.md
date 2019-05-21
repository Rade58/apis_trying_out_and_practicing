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

        const object = webpackMerge({}, ...configsArray);

        return object;
    }

    return {};
}
```