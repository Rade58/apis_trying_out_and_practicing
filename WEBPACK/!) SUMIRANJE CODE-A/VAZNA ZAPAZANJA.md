# VAZNA ZAPAZANJA (VECINOM O PLUGIN-OVIMA I LOADERIMA) 

TREBA CITATI [webpack-contrib](https://github.com/webpack-contrib) STRANICU, ODNOSNO TREBA PROCITATI O SVAKOM OD LOADER-A I PLUGIN-OVA, JER ONI ZAISTA IMAJU MNOGO OPACIJA

## file-loader I url-loader (!!! VAZNO , UKEK IH INSTALIRAJ ZAJEDNI, JER url-loader KORITI file-loader UNDER THE HOOD)

>>>> file-loader will copy files to the build folder (dist FOLDER PO DEFAULT-U) and insert links to them where they are included. url-loader will encode entire file bytes content as base64 and insert base64-encoded content where they are included. So there is no separate file.

**[file-loader](https://github.com/webpack-contrib/file-loader)** JE DAFAULT (PREDPOSTAVLJAM DA JE file-loader DEFAULT, POSTO SAM GA MOGAO KORISTITI, ALI MORAO SAM INSTALIRATI TAJ MODUL (USTVARI JA SAM GA INSTALIRAO A NE ZNAM DA LI JE TREBALO))

DEFINISANJE LIMITA U POGLEDU [url-loader](https://github.com/webpack-contrib/url-loader) -A:

>> This technique may make page load faster because there are fewer http-requests to the server to download files.

**DAKLE AKO SLIKA IMA MALU VELICINU, ZASTO TO NE PRETVORITI U BASE64 I IMATI DIREKTNO U MOM JAVASCRIPTU, JER NA TAJ NACIN SMANJIO SAM BROJ REQUEST-OVA**

**PROBLEM JE AKO JE SLIKA VELIKA (I TADA NA SCENU STUPA LIMIT (KOJI MOGU DEFINISATI)), I OVO JE JAKO VAZNO: KADA SE PREWKORACI LIMIT, KORISTICE SE file-loader KAO FALLBACK**

**VAZNO!!!! url-loader KORISTI FILE LOADER UNDER THE HOOD, KAKO BI JE LOAD-OVAO I PARSE-OVAO U BASE64**

POTREBAN TI JE file-loader U SVAKO MSLUCAJU

A url-laoder KORISTI SAMO ZA SLIKE KOJE IMAJU MALU TEXINU

ZATO JE OVAKVA KONFIGURACIJA DOBRA

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
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
                        test: /\.jpe?g$/,   // OVDE BIH MOGAO UVRSTITI I png , OVAKO     /\.png|\.jpe?g$/
                        use: [
                            {loader: "url-loader", options: {limit: 5000}}   // LIMIT SE DEFINSE IN bytes
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

**EVO GA JOS BOLJI REGULAR EXPRESSION ZA test PROPERTI**

- `/\.(png|jpe?g|gif)$/` **(U OVOM SLUCAJU IMAM I gif SUPPOR)**

**A PRONASAO SAM NA STRANICI file LOADE-RA, DA IMA OPCIJA DA SE ZADA CUSTOM URL (A PO DEFAULT-U, ON CE BITI HASHED)**