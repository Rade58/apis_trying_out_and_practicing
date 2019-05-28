# RANIJE SAM DEFINISAO modeConfig FUNKCIJU, A NISAM UZEO U OBZIR SLUCAJ DA CE SE PROSLEDITI undefined KADA BUDEM POZIVAO SAMO webpack SCRIPT, DAKLE BEZ PROSLEDJIVANJA ENVIROMENT VARIJABLE (DAKLE U SLUCAJU KADA NISTA NECU PROSLEDITI IZ ENVIROMENTA PUTEM ENVIROMENT VARIJABLE env.mode)

USTVARI TADA TREBAM OBEZBEDITI DA SE GLAVNOJ KONFIGURACIJI DEFINISE "none" KAO VREDNOST mode-A

TO GOVORIM ZBOG PRIRODE MOJE KONFIGUTRACIJE, KOJU SAM DEFINISAO KAO FUNKCIJU, KOJA PRIHVATA ONO IZ ARGUMENTA STO JOJ DEFINISE mode

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
//
const webpackMerge = require('webpack-merge');
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

                ]

            }
        },
        modeConfig(mode),
        addMergedPresetsConfigs({presets})

    )

}
```

## RESENJE KOJE SAM JA PREDSTAVIO JESTE KREIRANJE webpack.none.js FAJLA U bild-utils FOLDERU

```javascript
module.exports = () => {};
```

ON RETURN-UJE PRAZAN OBJEKAT ZA MERGING U GLAVNOJ KONFIGURACIJI, ALI ONO STO JESTE BITNO JESTE ODREDNICA none U IMENU FAJLA, JER SE TO PROSLEDJUJE
