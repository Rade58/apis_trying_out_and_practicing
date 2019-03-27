# MOGU SADA KRIRATI FOLDER, FAJL STRUKTURU MOJE APLIKACIJE

NEKA SE MAIN FOLDER ZOVE: my_first_pwa

U NJEMU:

- *public* FOLDER

- A U *public* FOLDERU, STAVICU

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**index.html**

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*favicon.ico*

PORED public FOLDER-A, 'U SUSEDSTVU' NEKA BUDU

- POMENUTI *package.json* FAJL

- KREIRACU *README.md*

U NJEMU (README.md) CU STAVITI NEKE OSNOVNE STVARI

```md
# MOJ PRVI PROGRESSIVE WEB APP

Ovo je moj prvi `progressive web app`, kojeg cu graditi dok budem ucio progressive web apps

Cak sve ovo sto, sada pisem, u dokumentu `2.%20Moj%20PRVI%20pwa.md`, sam ustvari mogao staviti u ovaj README.md (ali to necu sada uraditi)
```

- ZATIM CU KREIRATI src FOLDER U public FOLDER-U (NISAM IMAO NAMERU TU DA GA STAVIM, ZAMISLIO SAM DA BUDE SUSEDNI FOLDER public FOLDERU, KAO KOD React-A, ALI NISAM U STANJU DA KONFIGURIRAM http-server PACKAGE, TAKO DA BIH MOGAO ICI UNZAD IZ public FOLDERA, KADA DEFINISEM UCITAVANJA script I css FAJLOVA (ILI POSTOJI CAKA, KOJU JA, TRENUTNO NE POZNAJEM))

A U src FOLDERU SLEDECE:

1. *css* FOLDER
1. *script* FOLDER

- U *script* FOLDERU CE BITI MOJ **index.js** KOJEG SAM, U package.json FAJLU NAVEO POD 'main'

- A U *css* FOLDERU NEKA BUDE **app.css**

## NEKI BOILERPLATE HTML, KOJI CU ZA POCETAK KORISTITI

NEKA OVO BUDE POCETNI HTML, KOJI CU KORISTITI U index.html

```HTML
<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="theme-color" content="#e24c60;">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Moj prvi pwa</title>
</head>
<body>

</body>
</html>
```

## JOS MI OSTAJE DA UCITAM CSS I JAVASCRIPT FAJLOVE IZ src FOLDERA

DAKLE, U MOJ HTML FAJL index.js KOJI SE NALAZI U public FOLDERU, JA UCITAVAM JAVASCRIPT FAJL KOJI SE NALAZI NA public/src/js, I CSS FAJL, KOJI SE NALAZI NA public/src/css

```HTML
<!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="theme-color" content="#e24c60;">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Moj prvi pwa</title>
    <link rel="stylesheet" type="text/css" media="screen" href="src/css/app.css"> <!--DODAO CSS-->
    <link rel="shortcut icon" type="image/png" href="favicon.png"> <!-- DODAVANJE I FAVICONA-A-->
</head>
<body>
    
    <script src="src/js/app.js"></script> <!--DODAO SCRIPT-->
</body>
</html>
```

I MOGU ODPOCETI SA DALJIM DEVELOPMENT-OM

# MOJ PRVI PROGRESSIVE WEB APP

## OVO JOS NIJE PWA

SADA MOGU POCETI DEVELOPMENT, TAKO STO CU DEFINISATI NEKOLIKO ELEMENATA

index.html :

```HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="theme-color" content="#e24c60;">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Moj prvi pwa</title>
    <link rel="stylesheet" type="text/css" media="screen" href="src/css/app.css">
    <link rel="shortcut icon" type="image/png" href="favicon.png">
</head>
<body>
    <!-- EVO IH -->
    <div class="naslov">
        <h1>Progresivne Web Aplikacije</h1>
    </div>
    <div class="sadrzina">
        <div>Moguće ih je instalirati! (bez upotreba app store-a)</div>
        <div>One rade i offline!</div>
        <div>Izgledaju lepo na bilo kom uređjaju !</div>
        <div>Od njih mogu dobijati PUSH MESSAGES !</div>
        <div>Mogu da prikazuju notifikacije !</div>
        <div>Ove aplikacije, kao i native aplikacije, mogu da koriste feature-e uredjaja,
            kao što je, na primer, kamera.
        </div>
        <div>Pwa mogu i mnoštvo drugih stvari.</div>
    </div>
    <div class="ispocetka">
        <button>Počni</button>
    </div>
    <!-- /////////////////////////////////// -->
    <script src="src/js/app.js"></script>
</body>
</html>
```

>>>DEFINISAO SAM I CSS U /src/css/app.css FAJLU

```CSS
html, body {
    margin: 0;
    padding: 0;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

div.naslov {
    width: 100%;
    background-color: rgb(231, 84, 175);
    text-align: center;
    padding: 48px 0;
}

div.naslov h1 {
    font-size: 1.8em;
    color: blanchedalmond;
    text-shadow: 2px 2px 1px black;
}

div.sadrzina div {
    padding: 4px;
    box-shadow: 2px 2px 1px 1px rgb(230, 91, 161);
    -webkit-box-shadow: 2px 2px 1px 1px rgb(230, 91, 161);
    -moz-box-shadow: 2px 2px 1px 1px rgb(230, 91, 161);
    text-align: center;
    font-size: 1.1em;
    width: 84%;
    max-width: 480px;
    margin: 10px auto;
    color: rgb(13, 15, 15);
    opacity: 0;
}

div.ispocetka {
    text-align: center;
    margin-top: 20px;
}

div.ispocetka button{
    border: currentColor solid 0px;
    font-size: 1.4em;
    box-shadow: 1px 1px 1px 1px crimson;
    cursor: pointer;
    background-color: aliceblue;
}

div.ispocetka button:hover {
    outline: crimson solid 1px;
    font-size: 1.5em;
    background-color: bisque;
}

div.sadrzina div:nth-of-type(2n + 1) {
    background-color: rgb(151, 165, 165);
}
div.sadrzina div:nth-of-type(2n + 2) {
    background-color: darkkhaki;
}

.animate {
    animation-name: translacijaNaPocetak;
    animation-direction: normal;
    animation-timing-function: ease-in;
    animation-duration: 1.2s;
    animation-fill-mode: forwards;
    animation-play-state: running;
}

@keyframes translacijaNaPocetak {
    from {
        transform: translateY(58px);
    }

    50% {
        opacity: 0;
        ransform: translateY(22px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

>>>DEFINISAO SAM I JAVASCRIPT U /src/js/app.js FAJLU

```javascript
const contentDivs = document.querySelectorAll('div.sadrzina div');
const button = document.querySelector('div.ispocetka button');
let times = 0;
let isAgain = false;

const onMdHandler = function(ev){

    contentDivs.forEach(function(divEl){

        if(divEl.classList.contains('animate')){
            divEl.classList.remove('animate');
        }

        window.setTimeout((div) => {
            div.classList.add('animate');
        }, times, divEl);
        times += 1280;
    });
}

button.addEventListener('mousedown', onMdHandler, false);

contentDivs[contentDivs.length - 1].addEventListener('animationend', function(ev){
    if(!isAgain){
        button.innerHTML = button.innerHTML + " opet";
        isAgain = true;
    }
    times = 0;
}, false);
```

DAKLE, OVDE IMAM NEKOLIKO ELEMENATA, I NEKE ANIMACIJE, KOJE TRIGGER-UJEM PRITISKOM NA DUGME

A ELEMENTI POKAZUJU, ODNOSNO SHOWCASE-UJU NEKE INFORMACIJE VEZANE ZA PWE

**DAKLE, OVO NIJE PROGRESSIVE WEB APP**

OVO JE NORMALNI WEBSITE

A SADA ZELIM DA PRETVORIM OVAJ WEBSITE U PROGRESSIVE WEB APP

## PRETVARANJE MOG WEBSITE-A, U PROGRESSIVE WEB APP

DAKLE, SADA CU ODRADITI NEKOLIKO STVARI, ALI BEZ NEKOG VELIKOG OBJASNJAVANJA

U pyublic FOLDERU CU KREIRATI FAJL

- sw.js

VEC MOZES NASLUTITI DA SE RADI O

**SERVICE WORKER-U**

ALI JOS GA NISAM KREIRAO, VEC SAM SAMO KREIRAO FAJL

ALI ONO STO CU URADITI JESTE REGISTRACCIJA SERVICE WORKER-A, U MOM app.js FAJLU

```JAVASCRIPT
// DAKLE U app.js FAJLU (MOGU NEGDE NA POCETKU (NE MORA NA SAMOM POCETKU))
// CU STAVITI OVO

navigator.serviceWorker.register('/sw.js');
```

ALI POTREBNO JE U sw.js FAJLU, KREIRATI SERVICE WORKER-A ,STO SADFA NECU POKAZATI, VEC CU SAMO PREKOPIRATI CODE, JER U OVOM PODNSLOVU, CILJ MI JE SAMO DA OD WEBSITE-A, NAPRAVI PROGRESIVNU WEB APLIKACIJU, A U NEKI MNAREDNIM md FAJLOVIMA, JA CU SE DETALJNO POZBAVITI RUKOVANJEM SERVICE WORKER-IMA

DAKLE U *sw.js* FAJL, STAVICU SLEDECI CODE:

```javascript
// self JE, SPECIJALNI KEYTERM, KOJI SE ODNOSI NA window
//  ALI TIME CU SE DETALJNO POZBAVITI
// MISLIM DA SE SPECIJALNO KORISTITI ZA WEB WORKERE, KOJI SU NESTO SASVIM DRUGO U ODNOSU NA
// SERVICE WORKER-E
// ALI OVDE SU KORISCENI ZA SERVICE WORKER
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('my_first_pwa')
        .then(function(cache) {
          cache.addAll([
            '/',
            '/index.html',
            '/src/css/app.css',
            '/src/js/app.js'
          ])
        })
    );
    return self.clients.claim();
});
  
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(res) {
            return res;
        })
    );
});
```

> DETALNO O [self](https://developer.mozilla.org/en-US/docs/Web/API/Window/self)

****

OVDE SAM ODLUCIO DA PREKINEM OBJASNJENJA O OVOM PROJEKTU, JER NISAM USPEO DA DEFINISEM, TO DA SE APLIKACIJA MOZE KORITITI I OFFLINE

I UPRAVO ZATO PRELAZI MNA, ODNOSNO MOZZILIN TUTORIJAL

****