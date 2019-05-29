# KAD SE INSTALIRA NEKI PAKET, ON MOZE BITI BROKEN (ILI DA NE RADI KAO RANIJE), IZ RAZLOGA STO, I SAM KORISTI NEKE DPENDANCY-JE, KOJI SU IZAZVALI PROBLEM

TADA, KAO NAJBOLJE RESENJE SE NAMECE TO DA DOWNGRADE-UJEM MOJ OSNOVI PAKET, ODNOSNO DA KORISTIM STARIJU VERZIJU, PRI KOJOJ JE SVE FUNKCIONISALO KAKO TREBA

POKAZACU OVO NA PRIMERU http-server DEPENDANCY-JA, KOJI NIJE RADIO KAKO TREBA, A NIJE RADIO JER JE NJEGOV DEPENDANCY KOJI ON KORISTI BIO BROKEN

## KADA INSTALIRAM NEKI DEPENDANCY, ONI DEPENDANCY-JI, KOJE ON KORISTI, TAKODJE SU INSTALIRANI I NALAZE SE KAO NJEGOVI SUSEDNI FOLDERI U node_modules

PRIMER: http-server

KADA SAM INSTALIRAO, SAMO JEDAN PAKET U MOM PROJEKTU, A TO JE BIO http-server, EVO STA SE SVE OD FOLDERA NASLO U node_modules

```javascript
node_modules

|───.bin
├───async
│   └───lib
├───colors
│   ├───examples
│   ├───lib
│   │   ├───custom
│   │   ├───maps
│   │   └───system
│   ├───screenshots
│   ├───tests
│   └───themes
├───corser
│   └───lib
├───debug
│   ├───dist
│   └───src
├───ecstatic
│   ├───example
│   │   └───public
│   │       ├───beep
│   │       └───subdir
│   └───lib
│       └───ecstatic
├───eventemitter3
│   └───umd
├───follow-redirects
├───he
│   ├───bin
│   └───man
├───http-proxy
│   ├───.nyc_output
│   ├───coverage
│   │   └───lcov-report
│   │       ├───http-proxy
│   │       │   └───passes
│   │       └───lib
│   │           └───http-proxy
│   │               └───passes
│   └───lib
│       └───http-proxy
│           └───passes
├───http-server                 // EVO GA I http-server KOJI KORISTI SVE OSTALO OKO NJEGA (ODNOSN OVECINU STVARI)
│   ├───lib
│   ├───public
│   │   └───img
│   ├───screenshots
│   └───test
│       └───fixtures
│           └───root
├───mime
│   └───src
├───minimist
│   ├───example
│   └───test
├───mkdirp
│   ├───bin
│   ├───examples
│   ├───node_modules
│   │   └───minimist
│   │       ├───example
│   │       └───test
│   └───test
├───ms
├───opener
├───optimist
│   ├───example
│   ├───node_modules
│   │   └───minimist
│   │       ├───example
│   │       └───test
│   └───test
│       └───_
├───portfinder
│   ├───lib
│   └───test
│       └───fixtures
├───qs
│   ├───lib
│   └───test
├───requires-port
├───union
│   ├───examples
│   │   ├───after
│   │   ├───simple
│   │   │   └───middleware
│   │   └───socketio
│   ├───lib
│   └───test
│       ├───fixtures
│       │   └───static
│       └───helpers
├───url-join
│   ├───lib
│   └───test
└───wordwrap
    ├───example
    └───test
```

## U FOLDERU MOG DEPENDANCY-JA MOGU PRONACI, NJEGOV SPECIFICNI package.json U KOJEM JE SPECIFICIRANO STA TO ON KORISTI

DAKLE MOJ PROJEKAT IMA package.json KOJI SAM JA KREIRAO, ALI I SVAKI OD DEPENDANCY-JA IMAJU SVOJ SOPSTVENI package.json

EVO POGLEDAJ **node_modules / http-server** FOLDER

```javascript

http-server

│   .npmignore
│   .travis.yml
│   LICENSE
│   package.json            // EVO GA I package.json
│   README.md
│
├───bin
│       http-server
│
├───lib
│       http-server.js
│
├───public
│   │   404.html
│   │   index.html
│   │
│   └───img
│           turtle.png
│
├───screenshots
│       directory.png
│       public.png
│       start.png
│
└───test
    │   http-server-test.js
    │
    └───fixtures
        └───root
                canYouSeeMe
                file

```

KASO STO MOZES VIDETI TAM OSE NALAZI OVAJ **package.json** FAJL"

OTVORICU GA KOMANDOM

- start package.json

```javascript
{
  "_from": "http-server@0.9.0",
  "_id": "http-server@0.9.0",
  "_inBundle": false,
  "_integrity": "sha1-jxsGvcczYY1NxCgxx7oa/04GABo=",
  "_location": "/http-server",
  "_phantomChildren": {},
  "_requested": {
    "type": "version",
    "registry": true,
    "raw": "http-server@0.9.0",
    "name": "http-server",
    "escapedName": "http-server",
    "rawSpec": "0.9.0",
    "saveSpec": null,
    "fetchSpec": "0.9.0"
  },
  "_requiredBy": [
    "#DEV:/",
    "#USER"
  ],
  "_resolved": "https://registry.npmjs.org/http-server/-/http-server-0.9.0.tgz",
  "_shasum": "8f1b06bdc733618d4dc42831c7ba1aff4e06001a",
  "_spec": "http-server@0.9.0",
  "_where": "C:\\Users\\Rade\\Documents\\PROGRAMIRANJE\\vezbe_za_web_aplikacije\\insta_clonede",
  "bin": {
    "http-server": "./bin/http-server",
    "hs": "./bin/http-server"
  },
  "bugs": {
    "url": "https://github.com/nodeapps/http-server/issues"
  },
  "bundleDependencies": false,
  "contributors": [
    {
      "name": "Charlie Robbins",
      "email": "charlie.robbins@gmail.com"
    },
    {
      "name": "Marak Squires",
      "email": "marak.squires@gmail.com"
    },
    {
      "name": "Charlie McConnell",
      "email": "charlie@charlieistheman.com"
    },
    {
      "name": "Joshua Holbrook",
      "email": "josh.holbrook@gmail.com"
    },
    {
      "name": "Maciej Małecki",
      "email": "maciej.malecki@notimplemented.org"
    },
    {
      "name": "Matthew Bergman",
      "email": "mzbphoto@gmail.com"
    },
    {
      "name": "brad dunbar",
      "email": "dunbarb2@gmail.com"
    },
    {
      "name": "Dominic Tarr"
    },
    {
      "name": "Travis Person",
      "email": "travis.person@gmail.com"
    },
    {
      "name": "Jinkwon Lee",
      "email": "master@bdyne.net"
    }
  ],
  "dependencies": {                   // EVO OVDE MOGU VIDETI NEKE DEPENDANCY-JE, CIJI FOLDERI SU U
    "colors": "1.0.3",                // node_modules
    "corser": "~2.0.0",
    "ecstatic": "^1.4.0",
    "http-proxy": "^1.8.1",
    "opener": "~1.4.0",
    "optimist": "0.6.x",
    "portfinder": "0.4.x",
    "union": "~0.4.3"
  },
  "deprecated": false,
  "description": "A simple zero-configuration command-line http server",
  "devDependencies": {
    "common-style": "^3.0.0",
    "request": "2.49.x",
    "vows": "0.7.x"
  },
  "homepage": "https://github.com/indexzero/http-server#readme",
  "keywords": [
    "cli",
    "command"
  ],
  "license": "MIT",
  "main": "./lib/http-server",
  "name": "http-server",
  "preferGlobal": "true",
  "repository": {
    "type": "git",
    "url": "git://github.com/indexzero/http-server.git"
  },
  "scripts": {
    "pretest": "common bin/http-server lib/ test",
    "start": "node ./bin/http-server",
    "test": "vows --spec --isolate"
  },
  "version": "0.9.0"
}

```

## POSTOJE DVA NACINA KAKO BI RESIO "BROKEN DEPENDANCY OF MY DEPENDANCY"

- PRVI MUKOTRPNIJI NACIN, PRONALAZENJE KOJI JE DEPANDANCY, MOG DEPENDANCY-JA, USTVARI BROKEN, TRAZENJEM NA GOOGLE-U AKO LJUDI IMAJU ISTIH PROBLEMA, PA KADA PRONADJEM KOJI JE DEPENDANCY U PITANJU ULAZIM U NJEGOV FOLDER I ONDA NJEGA D

ps. DOBRO, GOOGLE CU UVEK KORISTITI

- DRUGI NACIN, DA **DOWNGRADE-UJEM VERZIJU OSNOVNOG DEPENDANCY-JA** (*STO ZVUCI ZNATNO PRIMANJIVIJE, JER AKO NAKON TOGA RUNN-UJEM MOJ APP I PROBLEMA VISE NE BUDE, NE MORAM SE OSVRTATI NA TAJ PROBLEM*)

## DA VIDIM OVO NA PRIMERU KADA MI NIJE KAKO TREBA FUNKCIONISAO http-server

ON JE NAIME IMAO VERZIJU 1.11.1 A TO SAM SAZNO OVAKO, U DIRECTORY-JU MOG APP-A

- npm list http-server

A ON OSTO JE PRAVILO PROBLEM JESTE NJEGOV ectatic DEPENDANCY, KOJI JE U NAJNOVIJOJ VERZIJI IMAO GRESKU (ZBOG NJEGA NISTA NIJE BIL OSERVIRANO NA localhost-u ,VEC SE MORALO ICI NA /index.html)

**PA SAM ODLUCIO DA DOWNGRADE-UJEM http-server, KOJI U TOJH NIZOJ VERZIJI, KORISTI I NIZU VERZIJU ecstatic-A** 

TO SAM URADIO OVAKO

- npm install http-server@0.9.0

DAKLE POSLE @ SAM ZADAO BROJ VERZIJE

KASNIJ JE SVE FUNKCIONISALO, ALI http-server ISTO TAKO INSTALIRAN GLOBALNO

DA PROVERIM

- npm list http-server -g

VERZIJA KOJA JE POKAZAN U TERMINALU JE 1.0.1

> AKO BUDEM ZELEO DA NA NEKO MDRUGOM MESTU, U NEKO MDRUGOM PROJEKTU, KORISTIM GLOBALNU VERZIJU http-serve, DOSLO BI DO GRESKE

ZATO SAM IPAK MOGAO OVO URADITI (RUNN-OVATI U TERMINALU) U FOLDERU MOG PROJEKTA

- npm install http-server@0.9.0 -g

DAKLE POSTO SAM DODAO -g FALG I GLOBALNO CE SE DOWNGRADE-OVATI POMENUTI PAKET

A U MOM PROJEKTU ISTO TAKO BI SE DOWNGRADE-OVAO (AKO SAM TAMO KUCAO KOMANDU), STO BIH MOGAO I PROVERITI U oackage.json FAJLU, GDE BI SE PROMENILA VERZIJA DEPENDANCY-JA

## MEDJUTIM POSTOJI NESTO STO MOZES ZABORAVITI AKO NA PRIMER IMAS NAJNOVIJU VERZIJU GLOBALNO, A LOKALNU IMAS DOWNGRADED

OVO JE MOJA PREDPOSTAVKA A TICE SE package.json FAJLA

``` javascript
"http-server": "0.9.0"
"http-server": "^0.9.0"     // MOZDA BI OVAJ CARET IZAVAO PROBLEM
                            // ODNOSNO MISLIM DA BI SE MOZDA OPET RUNN-OVAL NAJNOVIJA (GLOBALNA) VERZIJA
                            // I ZATO KAD DOWNGRADE-UJES LOKALNO, UKLONI CARET ISPRED VERZIJE
```