# KADA KORISTIM CommonJS MODULE, MOGU POGRESNO KORISTITI RELATIVE PATHS

DA TO POKAZEM NA PROJEKTU

RECIMO DA IMAM SLEDECU FILE STRUKTURU

```javascript
 U FOLDERU PROJEKTA NALAZE SE SLEDECI FAJLOVI I FOLDERI

+
│   main.js
│
└───assets
    │   dodajLamu.js
    │
    └───deep
            alpaka.js
            gvanaka.js

```

DA PRIKAZEM I CODE FAJLOVA POCEVSI OD FAJLOVA, KOJI SU NAJDUBLJE

U **depp** FOLDERU, KOJI SE NALAZI U **assets** FOLDERU, KOJI JE SUSED SA main.js (NJEGA CU RUNN-OVATI)

gvnaka.js FAJL

```javascript
const gvanaka = "GVANAKA";

module.exports = gvanaka;
```

I alpaka.js FAJL

```javascript
const alpaka = "ALPAKA";

module.exports = alpaka;
```

U assets FOLDERU SE PORED, POMENUTOG deep FOLDERA NALAZI I FAJL dodajLamu.js

```javascript

const izbaciLamu = function(vrstaLame){
    return require(`./assets/deep/${vrstaLame}`);    // OBRATI PAZNJU NA OVAJ PATH
}

module.exports = izbaciLamu;

```

**AKO SAM PRIMETIO GORE, POSTO JE MOJA NAMERA DA OVU FUNKCIJU ZOVEM U main.js FAJLU, TAKODJE SAM PATH DEFINISAO DA BUDE RELATIVAN U ODNOSU NA TAJ FAJL**

main.js FAJL

```javascript
const addLama = require('./assets/dodajLamu');

console.log(
    addLama("gvanaka")
);
```

**ALI POGRESIO SAM**

- node main.js (KUCAM U TERMINALU)

**NAIME, OUTPUT U TERMINALU CE BITI SLEDECI**

```linux
 throw err;
    ^

Error: Cannot find module './assets/deep/gvanaka'
```

ZBOG POGRESNOG PATHA require-A U FAJLU dodajLamu.js

## IAKO SAM UVEO FUNKCIJU, U CIJEM OBIMU SE NALAZI POZIVANJE require-A SA PATH-OM, KOJI JE RELATIVAN, NA MAIN FAJL; BICE IZBACEN ERROR, JER PATH MORA BITI RELATIVAN NA ONAJ FAJL IZ KOJEG POTICE FUNKCIJA

OVO MI JE MALO NELOGICNO, ALI TAKO JE

TREBAM DA IMAM NA UMU POMENUTO

A STO SE TICE MOG PRIMERA, ISPRAVLJAM GRESKU FAJLU dodajLamu.js

```javascript

const izbaciLamu = function(vrstaLame){
    // return require(`./assets/deep/${vrstaLame}`);

    // OVAKO JE PRAVILNO
    return require(`./deep/${vrstaLame}`);
}

module.exports = izbaciLamu;

```

SADA KADA RUNN-UJEM

- node main.js

U TERMINALU CE BITI STAMPANO ZADATO, I NECE BITI ERROR-A