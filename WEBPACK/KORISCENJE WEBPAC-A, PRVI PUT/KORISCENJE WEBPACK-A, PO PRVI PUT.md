## KORISCENJE WEBPACK-A, PO PRVI PUT

[REPO](https://github.com/TheLarkInn/webpack-workshop-2018)

- FORKUJ OVAJ REPO

- ODNDA IDI U SVOJ PROFIL I OTVORO OVAJ FORK

- git clone urlForka

> OVO SLEDECE NIJE NISTA URADILO

- git fetch --all

**MORAM SLEDECE**

UDJEM U ONO STO SAM KLONIRAO SA REMOTE-A

DA PROVERIM BRANCHES (KOJE SU I DALJE REMOTE)

- git branch -a

DA IZADJEM IZ PROCESA

- ctrl + Z

DA UDJEM U SPECIFICAN BRANCH, KOJ ICE TIME POSTATI LOKALNI

- git checkout -b LocalName origin/remotebranchname

**ALI MOZE I OVAKO**

- git checkout imeRemoteBrancha (TADA CE REMOTE POSTATI LOKALAN)

**AKO NE MOZES DA ZATVOTRIS LISTING SVIH BRANCH-EVA**

KUCAJ

- q (SLOVO Q)

## DA INSTALIRAM DEPENDENCIES U PROJEKTU, MOGU KORISTITI SAMO yarn KOMANDU, UMESTO npm install

## SADA CU SE POZABAVITI TIME, KAKO SCRIPTS FUNKCIONISU (TO CU URADITI POSMATRAJUCI package.json CODE)

KAKO SE USTVARI RUN-UJU SCRIPT-OVI

PA KORISCENJEM **Node.js**

STA USTVARI **npm** RADI?

ON DODAJE **bin** FOLDER U node_modules FOLDER-U

**TAMO SU EXECUTABLES ZA SVE MODULE KOJI SU DOWNLOADED, ODNOSNO INSTALISANI UZ POMOC**

- npm install --save-dev (SAMO SE PODSECVAM KAK OSE INSTALIRAJU LOKALNO MODULI)

- npm instasll -D (RADI ISTO STO I GORNJE)

DAKLE ISTO VAZI I ZA WEBPACK (I ON U bin-U IMA FAJL KOJI JE FAJL SA .cli IL I.cmd EKSTENZIJOM)

KAKO DEFINISATI RUN-OVANJE SCRIPT-OVA

PA DEFINISANJEM ODGOVARAJUCE VREDNOSTI U "scripts" OBJEKTU package.json FAJLA

```javascript
{
  "name": "webpack-workshop-2018",
  "version": "1.0.0",
  "description": "Learning resources for the webpack academy workshop series for 2018",
  "main": "index.js",
  "scripts": {              // EVO OVDE SAM UPRAVO DEFINISAO RUN-OVANJE WEBPACK-A
    "webpack": "webpack"
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
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "fork-ts-checker-webpack-plugin": "^0.4.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "http-server": "^0.11.1",
    "mini-css-extract-plugin": "^0.4.0",
    "postcss-loader": "^2.1.5",
    "style-loader": "^0.21.0",
    "ts-loader": "^4.2.0",
    "url-loader": "^1.0.1",
    "webpack": "^4.8.0",
    "webpack-bundle-analyzer": "^2.11.1",
    "webpack-cli": "^3.1.2",
    "webpack-node-externals": "^1.7.2",
    "workbox-webpack-plugin": "^3.2.0"
  },
  "dependencies": {
    "d3": "^5.1.0"
  }
}
```

JA SAM USTVARI MOGAO ZADATI BILO KOJE IME ZA SCRIPT (TO JE MOGL OBITI I "rade")

```javascript
{
  "name": "webpack-workshop-2018",
  "version": "1.0.0",
  "description": "Learning resources for the webpack academy workshop series for 2018",
  "main": "index.js",
  "scripts": {
      // EVO OVDE SAM ZADAO NOVO IME ZA, ONO STO SE TREBA RUN-OVATI, A TO JESTE webpack
    "rade": "webpack"
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
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "fork-ts-checker-webpack-plugin": "^0.4.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "http-server": "^0.11.1",
    "mini-css-extract-plugin": "^0.4.0",
    "postcss-loader": "^2.1.5",
    "style-loader": "^0.21.0",
    "ts-loader": "^4.2.0",
    "url-loader": "^1.0.1",
    "webpack": "^4.8.0",
    "webpack-bundle-analyzer": "^2.11.1",
    "webpack-cli": "^3.1.2",
    "webpack-node-externals": "^1.7.2",
    "workbox-webpack-plugin": "^3.2.0"
  },
  "dependencies": {
    "d3": "^5.1.0"
  }
}
```

## KAKO RUN-OVATI SCRIPT

PA MOGU KUCATI KOMANDU

- npm run '<ime_script-a>'

U SLUCAJU MOG PRIMERA TO BI BILO

- npm run rade

MEDJUTIM KAKO BI ZNAO STA USTVARI RUN-UJEM, BOLJE JE KORISTITI webpack KAO IME

```javascript
{
  "name": "webpack-workshop-2018",
  "version": "1.0.0",
  "description": "Learning resources for the webpack academy workshop series for 2018",
  "main": "index.js",
  "scripts": {
      // DAKLE NEKA IMA SCRIPT-A BUDE "webpack"
    "webpack": "webpack"
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
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "fork-ts-checker-webpack-plugin": "^0.4.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "http-server": "^0.11.1",
    "mini-css-extract-plugin": "^0.4.0",
    "postcss-loader": "^2.1.5",
    "style-loader": "^0.21.0",
    "ts-loader": "^4.2.0",
    "url-loader": "^1.0.1",
    "webpack": "^4.8.0",
    "webpack-bundle-analyzer": "^2.11.1",
    "webpack-cli": "^3.1.2",
    "webpack-node-externals": "^1.7.2",
    "workbox-webpack-plugin": "^3.2.0"
  },
  "dependencies": {
    "d3": "^5.1.0"
  }
}
```

SADA CU DA RUN-UJEM WEBPACK

- npm run webpack

I WEBPACK JE RUN-OVAN SUCCESSFULLY, I U COMMAND LINE CU VIDETI OUTPUT

I TO SE SVE DOGODILO BEZ IAKAVOG webpack.config.js

- webpack.config.js JE BIO POTREBAN PRE **WEBPACK 4**

U POMENUTOM FAJLU SE SPECIFICIRAO input I output

AUTORI WEBPACK-A SU ODLUCIL IDA SE TO NE TREBA RADITI PO DEFAULTU

**WEBPACK TRAZI entry PROPERTI, A PO DEFAULT-U, TO JE U WEBPACK-U 4 PODESENO DA BUDE src/index.js, USTVARI TO JE SAMO ./src (ZATO ENTRY POINT MOZE BITI I U SLUCAJU TYPESCRIPT-A, UPRAVO index.ts)**

DA SE SADA VRATIM NA OUTPUT

TAMO MOGU VIDETI HELPFULL WARNING:

>>> WARNING in configuration
>> The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
>> You can also set it to 'none' to disable any default behavior. Learn more: <https://webpack.js.org/concepts/mode/>

- mode JE POTREBNO PODESITI

PO DEFAULTU, TO JE DEFINISANO KAO 'production'

KASNIJE CU SE POZABAVITI TIME, STA JE TO USTVARI mode

## npm IMA MOGUCNOST COMPOSINGA SCRIPT-OVA (I yarn TO PODRZAVA)