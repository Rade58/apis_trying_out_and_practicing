# ONO STA JA ZELIM DA RADIM JESTE DA KORISTIM TYPESCRIPT U MOJOIM Node.js APPLIKACIJAMA, OD SAMOG STARTA (NE MORAM OD SAMOG STARTA, ALI MOZDA TEK ONDA KADA SE DO ODREDJENOG NIVOA UPOZNAM SA Nodejs-OM)

******

digresija:

NEKI LINKOVI

[ts-node](https://github.com/TypeStrong/ts-node)

[youtube video o tome kako se koristi TypeScript U Nodejs APPLIKACIJAMA](https://www.youtube.com/watch?v=1UcLoOD1lRM)

NISAM GLEDAO VIDEO, NIJE MI TREBALO

******

## PREDSTAVICU ZA POCETAK STA IMAM DEFINISANO I **tsconfig.json**

```json
{
    "compilerOptions": {
        "baseUrl": "source/index.ts",
        "outDir": "lib",
        "watch": true,      // ENABLE-OVAO SAM I WATCH MODE
        "module": "commonjs",   // OVO MI JE BITNO (MODUL SINTAKSA U KOJU CE BITI COMPILED MODULI)
        "target": "es6",
        "moduleResolution": "node",   // I KORISTIM ONAKAKAV RESOLUTION, KAKAV JE U Nodejs-U
        // "declaration": true,
        // "sourceMap": true,
        "allowJs": true
    }
}
```

## STO SE TICE SCRIPT-OVA DEFINISANIH U package.json I NJIH CU PRIKAZATI

```json
{
  "name": "nodejs-blah",
  "version": "1.0.0",
  "description": "",
  "main": "lib/index.js",
  "directories": {
    "lib": "lib"
  },
  "scripts": {
    "tscompiler": "tsc",    // TYPESCRIPT COMPILER
    "tscom": "rimraf lib && npm run tscompiler",        // OVDE GA IZMEDJU OSTALOG RUNN-UJEM
    "node:lib": "node lib/index.js"         // POSTO SAM DEFINISAO DA SE JAVASCRIPT GENERISE U
                                            // lib FOLDERU, TAMO RUNN-UJEM Node.js NA GENERISANOM
                                            // index.js
  },
  "keywords": [
    "learning",
    "practicing",
    "NodeJs",
    "TypeScript"
  ],
  "author": "Rade",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^12.11.7"
  }
}
```

## IMAM JEDAN CONCERN, A TO JE "KAKO KORISTITI GLOBALS (Nodejs-OV GLOBALS) U TypeScript CODE-U" :question:

ALI SAZNAO SAM KAKO I TO IZ ODLICNE [KNJIGE](https://basarat.gitbooks.io/typescript/docs/types/@types.html) KOJU IMAM (NE ZABORAVI DA JE ISCITAVAS)

EVO TI DALJE LINKOVI, KOIJI CE TI TREBATI, INACE (NE MISLIM KONKRETN OVEZAN OZA OVU TEMU, NEGO I UOPSTENO)

>>>> [Definitely Typed GITHUB](https://github.com/DefinitelyTyped/DefinitelyTyped#definitelytyped) is definitely one of TypeScript's greatest strengths

[svi type-ovi](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types)

<http://definitelytyped.org/> (OVIM CU SE POZABAVITI U SLEDECEM NASLOVU)

[**HANDBOOK**](http://www.typescriptlang.org/docs/handbook/basic-types.html) (OVDE CAK IMAS I UPUTSTVO KAKO KORISTITI TYPESCRIPT ZAJEDN OSA Webpack-OM I React-OM)

### :rabbit: definitelytyped.org

TAMO POSTOJI I [Type Search](https://microsoft.github.io/TypeSearch/)

### :coala: SEARCHOVAO SAM TAMO **node**

OTVOREN MI JE NPM PAGE, I TAMO IMAM UPUTSTVO DA INSTALIRAM node TYPES KAO DEPENDANCY

- npm install @types/node --save

### :beetle: POSTO SAM TO URADIO MORAM OMOGUCITI DA GLOBALS 'LEAK-IN AUTOMATICALLY', STO POSTIZEM KONFIGURIRANJEM *tsconfig.json*

TAMO DODAJEM TYPE-OVE, KOJE ZELIM DA SE LAEK-UJU IN MY APP

tsconfig.json

```json
{
    "compilerOptions": {
        "baseUrl": "source/index.ts",
        "outDir": "lib",
        "watch": true,
        "module": "commonjs",
        "target": "es6",
        "moduleResolution": "node",
        // "declaration": true,
        // "sourceMap": true,
        "allowJs": true,

        // TO JE OVO
        "types": ["node"]
    }
}
```

NAKON STO SAM OVO DEFINISAO TREBAO BI DA BUDEM U MOGUCNOSTI DA KORISTIM process ILI global IL INESTO DRUGO, A KOJI SU GLOBALS U Nodejs-U

MOZES DA TESTIRAS TAKO STO CE S NAPISATI `process` U TVOM TYPESCRIPT CODE-U (AKO TYPESCRIPT NE BUDE 'YELL-OVAO NA TEBE', GLOBALNI TYPE-OVI Nodejs-A SU LEAKED-IN)

OVAJ POSTUPAK NE VAZI SAMO ZA Node GLOBALS, JER TI MOZES BILO KOJE TYPE-OVE DA DODAS, KAO STO SU ONI Z Jquery ILI fetch FOR NodeJs
