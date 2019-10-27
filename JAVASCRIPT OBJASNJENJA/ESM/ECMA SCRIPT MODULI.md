# ECMA SCRIPT MODULI U BROWSERU

SADA IH JE MOGUCE KORISTITI BEZ UPOTREBE BUNDLER-A

PRIKAZACU SVE PUTEM PRIMERA, I NECU DAVATI DODATNA OBJASNJENJA

******

FILE STRUKTURA:

```linux

│   index.html
│
│
└───files
        app.js
        library1.mjs
        library2.mjs
```

CODE MOZES DA TESTIRAS NA:

- http-server -p 5980 -a localhost -c-1

******

## OVAKO TI IZGLEDA HTML

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Blah</title>
</head>
<body>
    
    <!-- OVAJ FAJL CE KORISTITI KAO MAIN JAVASCRIPT FAJL U KOJI CES UVOZITI MODULE -->
    <!-- KAO STO VIDIS, NJEGOV TYPE JE module -->
    <script type="module" src="files/app.js"></script>
    <!--  -->
</body>
</html>
```

KAO STO VIDIS U PITANJU JE OBICNI JAVASCRIPT ALI SE MORA INSERTOVATI KROZ SCRIPT, KOJI JE MODULE TYPE-A

## JAVASCRIPT FAJL KOJI KORISTIS KAO TVOJ APP FAJL, KOJI JE JEDINI EKSPLICITNO INSERTED BY YOU, U TVOJ PAGE, IZGLEDACE OVAKO (OVO JE PRIMER)

**app.js**

```javascript
import funkcija from './library1.mjs'
import {numero, wordings} from './library2.mjs'


funkcija();

console.log({numero, wordings})
```

## EVO GA I CODE TVOJIH MODULA, KOJI SI UVEZAO I KORISTIS IH U app.js FAJLU

ZAPAMTI DA OVO JAVASCRIPT FAJLOVI MORAJU IMATI **.mjs** EKSTENZIJU

**library1.mjs**

```javascript
const priv = 68;

export default () => {
    console.log("library 1")
}
```

**library2.mjs**

```javascript
const private = 6000;

export const numero = 4;
export let wordings = "some word blah";
```

## AKO POKUSAS DA KORISTIS ONO STO JE PRIVATE (STO NIJE IZVEZENO), DOBICES ERROR, ODNOSNO NECES MOCI DA UVEZES I TO CE THROW-OVATI ERROR