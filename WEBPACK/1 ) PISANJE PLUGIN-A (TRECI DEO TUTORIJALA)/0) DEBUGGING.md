# ODLUCIO SAM OPET DA OBJASNIM, KAKO JE Node.js CODE (U OVOM SLUCAJU WEBPACK-OV CODE) MOGUCE DEBUGGOVATI U SAMOM CHROME-U

## STA ZNAM O WEBPACK-U

PA DA BI SAGRADIO KONFIGURACIJU JA KORISTIM Node.js SINTAKSU; DAKLE U PITANJU JE Node.js CODE

## SAZNAO SAM RANIJE DA MOGU DEBUGG-OVATI, MOJ WEBACK CODE RUNN-UJUCI, SLEDECI SCRIPT

**"node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js"**

I JA SAM ZADAO OVOM SCRIPTU IME **debug**

NASRAVNO, JA MOGU COMPOSE-OVATI SCRIPT, PRI KOJEM CU KORISTITI I WEBPACK-OV MODE

EVO POGLEDAJ OVE SCRIPT-OVE

- "dev": "npm run webpack-dev-server -- --env.mode development --hot",

- "prod": "npm run webpack -- --env.mode production",

- "dev:debug": "npm run debug -- --env.mode development",

-"prod:debug": "npm run debug -- --env.mode production"

## POGLEDAJ SADA TVOJ PLUGIN, KOJI SI DELIMICNO DEFINISAO

build_utils/MyFirstWebpackPlugin.js

```javascript
class MyFirstWebpackPlugin {

    apply(compiler){

        compiler.hooks.done.tapAsync("MyFirstWebpackPlugin", (stats, callback) => {

            //
            console.log(stats);

            debugger;

            //
            callback();

        })
    }
}

module.exports = MyFirstWebpackPlugin;

```

**NARAVNO, TI SI OVAJ PLUGIN TAKODJE UVEZAO U SVOJ *webpack.config.js* I TAM OSI GA INSTATICIZIRAO U plugins NIZU**

NARAVNO, TI SI GA MOGAO KORISTITI I U BILO KOJEM PRESET-U

ALI BITNO JE DA ZNAS DA SADA POSTO MOZES DA DEBUGG-UJES WEBPACK-OV Node.js CODE

TI MOZES, I DEBUGG-OVATI CODE SVOG PLUGINA, KOJEG SI INSTATICIZIRAO

## RUNN-UJ SADA DEBUGGING SCRIPT

NA PRIMER **dev:debug**

## U TERMINALU CE TI ODMAH BITI PROVIDED URL, U OVAKVOM FORMATU

`ws://127.0.0.1:9229/27f3718d-b399-4197-a7ce-80f64a59fdc5`

PREDPOSTAVLJAM DA ws ZNACI **WINDOWS**

## AKO UBACIS POMENUTI SCRIPT U CHROME ADRESS BAR, NA STRANICI CES VIDETI 'This site can’t be reached'

RECI CE TI JOS DA JE U PITANJU *ERR_DISALLOWED_URL_SCHEME*

## ALI KADA OTVORIS CHROME DEV TOOLS, NA GORNJOJ TRACI TOOL-OVA, VIDECES ODMAH MALO DUGME, U OBLIKU Node.js LOGO-A; E PA AKO PRITISNES TO DUGME OTVORICES `Dedicated DevTools FOR Node.js`

CIM PRITISNES TO OTVARA SE NOVI WINDOW

ON OSTO TE OVDE ZANIMA JESTE **Sources** TAB

E PA TU MOZES DA SE IZRAZIM DEBUGG-OVATI CODE WEBPACK-A, ODNONO CODE, TVOG INSTATICIZIRANOG PLUGINA

## MOZES PRITISNUTI DUGME KOJE LICI NA PLAY I KOJE ZNACI DA TREBAS NASTAVITI ILI POCETI SA EXECUTION-OM SCRIPT-A

TI SI NA PRIMER POKRENUO DEVELOPMENT SCRIPT UZ DEBUGGING SCRIPT

TO ZNACI DA CE SE CODE EXECUTE-OVATI TACNO DO ONOG MESTA GDE SI ZADAO debugger STATEMENT U TVOM PLUGIN-U

POSTO SI TVOJ PLUGIN DEFINISAO OVAKO:

build_utils/MyFirstWebpackPlugin.js

```javascript
class MyFirstWebpackPlugin {

    apply(compiler){

        compiler.hooks.done.tapAsync("MyFirstWebpackPlugin", (stats, callback) => {

            
            // ODNOSNO POSTO SI OVDE ZADAO STAMPANJE

            console.log(stats);


            // I POSTO SI OVDE ZADA O DEBUGGER
            debugger;

                    // U KONZOLI, POMENUTOG Node Dev Tools WINDOW-A
                    // VIDECES ODSTAMPANE stats

                    // NARAVNO, U TERMINALU U KOJEM SI POKRENUO DEBUGGING SCRIPT
                    // OUTPUT-OVACE SE ISTO


            
            callback();

        })
    }
}

module.exports = MyFirstWebpackPlugin;

```

## SAM ODA ZANS DA SADA KADA POGLEDAS stats OUTPUTED U KONZOLI POMENUTOG Node Dev Tools WINDOW-A VIDECES DA OUTPUTED stats OBJEKAT, IMA I PROPERTI compilation, ALI O TOME CU NASTAVITI

[OVDE](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/WEBPACK/1%20%29%20PISANJE%20PLUGIN-A%20(TRECI%20DEO%20TUTORIJALA)/2.%20KREIRANJE%20PLUGIN-A.md#posto-sada-zanas-kako-da-debugg-ujes-svoj-plugin-odnosno-posto-si-proucio-on-osto-sam-napisao-na-md-fajlu-do-kojeg-je-vodio-predhodni-link-mozes-uspesno-da-nastavis-definsianje-svog-pluggin-a)

ALI PROCITAJ SVE DOKRAJA DOK NE ODES NA GORE OSTAVLJENI LINK

## CAK POSTOJI MOGUCNOST DA OVAJ DEBUGGER KORISTIS I IZ SAMOG VS CODE IDE-A (STO JE CAK BOLJA OPCIJA)

DA OBJASNIM I TO

- DAKLE MOGU POCETI TAK OSTO CU POKRENUTI DEBUGING SCRIPT

SACEKAM DA SE U TEMINALU OUTPUT-UJE ONAJ LINK SA `ws://`

- ZATIM OTVARAM **Debug** TAB U VS CODE-U

- TAMO PRITISKAM ZUPCANIK, I TU DODAJEM NOVU DEBUGGING KONFIGURACIJU (POSTOJI DUGME I SVE CE SAMO BITI GENERISANO) (JA USTVARI IZ SUGESTION-A-A, KOJI SE OTVARA NKON PRITISKA DUGMETA, BIRAM USTVARI 'Attach' OPCIJU) (OVO SE MORA URADITI SAMO JEDNOM ZA JEDAN PROJEKAT, ODNOSNO JEDAN CODEBASE, KOJ UDEBUG-UJEM (U OVOM SLUCAJU TO JE WEBPACK, MOG JEDNOG PROJEKTA) (VIDECES KAKO CE SE U SPECIJALNI DEBUGGING FAJL DODATI OPCIJE KOJE ODGOVARAJU MOM PROJEKTU))

- **MOZDA PRE SVEG SAM MOGAO OTVORITI MALU BUBICU (ONA JE ONA IKONICA KOJA STOJI ZAJEDNO SA GIT IKONOM, SEARCH, FILE EXPLORER) NA LEVOJ STRANI (ONA PREDSTAVLJAD DEBUGGER-A)**

- KADA PRISTISNEM NA BUBICU SADA VIDIM PLAY DUGME DEBUGGER-A, I PADAJUCI MENU, PORED TOG DUGMETA

- KADA OTVORIM PADAJUCI MENU, PRITISNEM, NA Attach 

- SADA MOGU PRITISNUTI PLAY I ODPOCETI SA DEBUGGING-OM

## U SUSTINI KADA GOVORIM O BRAKPOINTIMA U CODE, KOJI SU NASTALI STAVLJANJEM debugger STATMENT-A, JA U SUSTINI PRISTISKAJU CI PLAY IDEM OD BRAKPOINT-A DO BREAKPOINTA

I TAKO LAKO MOGU DEBUGG-OVATI MOJ CODE

SJAJNO

A SADA ZNAM DA TO MOGU RADITI I IZ VS CODE-A

## DEBUG KONZOLA

ONA POSTOJI I U VS CODE IDE-U, A POSTOJI TAMO I U NODE DEDICATED DEV TOOLS CHROME-A

## U TOJ KONZOLI JA IMAM PRISTUP SVIM PROPERTIJIMA, ODNSON OSVIM VARIJABLAMA, MOG CODE-A KOJEG DEBUGG-UJEM, DO POMENUTOG BREAKPOINTA

**MIND BLOWING**

ZASTO OVO NISAM RANIJE RADIO

## POGOTOVO JE OVO SJANO STO GA MOGU KORISTITI IZ VS CODE IDE-A

OVO CU SADA STALNO KORISTITI

## JOS MOZDA STA NISAM REKAO JESTE DA JA U VS CODE-U MOGU VIDETI SVE VARIJABLE U ONONM SCOPE-U GDE JE MOJ BREAKPOINT

DAKLE U LEVOM DELU TAMO GDE NORMALNO STOJI FILE EXPLORER, VIDECES DOSTUPNE GLOBALNE I LOKALNE VARIJABLE

**DAKLE DOSTUPNE SU TI I GLOBALNE I LOKALNE VARIJABLE** (STO JE I LOGICNO)

## MEDJUTIM TO NIJE SVE, JA U TOM DESNOM MENU-U, GDE SE PRIKAZUJU VARIJABLE, MOGU VIDETI I CLOSURE-E
