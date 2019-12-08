# ZELIM DA DEFINISEM GOTOVO ISTI PRIMER KOJI JE AUTOR WORKSHOPA DEFINISAO, SAMO STO ZELIM DA, STO SE TICE NODE APLIKACIJE, JA NJU SERVIRAM SA RAZLICITOG PORT-A, KAKO BI BILE DOSTUPNE DVE APLIKACIJE; JEDNA NA JEDNOM A JEDNA NA DRUGOM PORTU

OVO NIJE PRESUDANO, ALI ETO, MALO VEZBAM MESSING SA NGINX KONFIGURACIJOM

******

digresija **ALI VAZNA**:

SLEDECOJ VEZBI JA HOCU DEFINISATI DA SE STATICNI FAJLOVI, ZAJENO SA HTML STRANICOM SERVIRAJU IZ EXPRESS-A

**TO JE IZUZETNO LOSA PRAKSA** (*ALI MISLIM DA JE TO SAMO SLUCAJ KOD LARGE APLIKACIJA*)

POGLEDAJ OVO (KONFIGURACIJA Nginx)

<https://docs.nginx.com/nginx/admin-guide/web-server/serving-static-content/>

ALI PRONDAJI NESTO GDE CES SAZNATI VISE O OVOME

<https://hashnode.com/post/why-is-it-not-recommended-to-serve-static-files-from-nodejs-ciibz8flv01duj3xt4lxuomp3>

MOZDA IMAM NESTO BOLJE OBJASNJENO OD PREDHODNOG LINKA, ALI NAKI TON BUDE POLAZNA TACKA

*ZA SADA U OVOJ VEZBI JA CU KORISTITI EXPRESS ZA SEVING HTML I STATIC FAJLOV-A*

U OVOM SLUCAJU STRANICA SE DVA PUTA MENJALA

PRVO JE PROMENJEN DEFAULT PAGE (NGINX PLACEHOLDER JE TU BIO RANIJE), TAKO STO SAM KREITAO NOVI index.html NA /var/www/html/

[TO JE OBJASNJENO OVDE](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/Node.js/7.%20FULL%20STACK/d%29%20SETUP%20SERVER-A/8.%20Nginx%20KONFIGURACIJA.md#sada-cu-a-little-bit-tweak-ovati-moju-nginx-konfiguraciju)

ZATIM SAM PROMENIP proxy_pass KOJI SAM RANIJE DEFINISAO ZA /, I TU SAM SLAO SAMO Hello World (GET REQUEST ZA /, NARAVNO)

JA CU U OVOM SLUCAJU MORATI MODIFIKOVATI app.js, KAKO BI SLAO HTML PAGE, A ON CE BITI U /var/www/ui/html

******

******

DIGRESIJA DVA VEZANA ZA STATICNE FAJLOVE:

GOVORIM GENERALNO:

AKO CES VSITI CACHING STATICKIH FAJLOVA U BROWSERU, MOZDA NIJE NI BITNA PRICA DA LI IH DIREKTN OSERVIRA Nginx ILI POSREDSTVOM EXPRESS-A

******

**DA SE SADA VRATIM NA VEZBU**

JEDNA APLIKACIJA CE BITI ONA POSTOJECA (Hello World) (ALI CU JE IZMENITI DA SERVIRA STATICNE FAJLOVE I HTML)

ONA JE ZA PATH /

A DRUGA CE HANDLE-OVATI WEBSOCKET

ONA MOZE BITI ZA PATH /blahchat

## U PROSLOM MD FAJLU SAM OBJASNIO KAKO DA KONFIGURIRAM Nginx, KAKO BI MOGAO DA KORISTIM WEB SOCKET, ALI POSTO SAM TO URADIO ZA POSTOJECU LOKACIJU (PORT SA KOJEG SERV-EUJEM ), A TU MI NECE TREBATI WEBSOCKET, JA SADA ZELIM OPET DA KONFIGURIRAM Nginx, KAKO BI SVE POPRAVIO

ZA NOVI PATH CU ZADATI proxy_pass I OSTALA DVA UPGRADE-A, KOJA SE ODNOSE NA WEB SOCKET

- sudo vi /etc/nginx/sites-available/default

EVO '/' LOCATION CE BITI BEZ WEB SOCKET NADOGRADNJE

A '/blahchat' CE IMATI NADOGRADNJU ZA WEBSOCKET, A; A ZADAO SAM MU I proxy_pass; I ONO STO VIDIS JESTE DA CE SE KORITITI PORT 3800

```linux
location / {
        proxy_pass http://127.0.0.1:3000/;
}

location /blahchat {
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_pass http://127.0.0.1:3800/;
}
```

## DA REDEFINISEM SADA MOJ app.js FAJL, KAKO BI UCINO DA ON BUDE SERVER, SVIH STATICNIH FAJLOVA

PRVO DA TI KAZEM DA SE TVOJI STATICKI FAJLOVI U SLUCAJU TVOG PROJEKTA NALACE (ILI TREBA DA SE NALAZE ILI NE MORAJU, JER JE OVO SAMO VEZBA) U:

/var/www/app/ui/css
/var/www/app/ui/js

JER TAM OSAM DEFINISAO ui FOLDER

HTML FAJL TREBA DA SE NALAZI U (TAM OSAM GA POSTAVIO)

SVE CU URADITI LOKALNO, U REPO-U, KOJI SAM, AKO SE SECAS OD RANIJE ODAVNO KLONIRAO (TVOJI SSH KLJUCEVI SU PODESENI, AI GITHUB REPO SECAS SE (LOKALNO RADIS PUSH-UJES NA GITHUB, PA TO PULLUJES SA GITHUB-A NA SERVER))

app.js FAJL

```javascript
const express = require('express');
const app = express();
const path = require('path')

const port = 3000;

// OPET NE ZABORAVI NEKE STVARI

//      __dirname                       JE ABSIOLUTE PATH TRENUTNOG MODULA (NE MORA ZNACITI DA JE ABSOLUTE PATH EXECUTABLE; 
//                                                                              ON JE SAM OTO KADA SE KORISTI U EXECUTABLE-U)

// DA BIH SERVIRAO STATICNE FAJLOVE, KORISTIM       express.static      MIDDLEWARE

// CIM JE MIDDLEWARE, ZNACI DA GA KORISTIS SA                   use             METODOM

// path.join CE TI POMOCI DAKLE DA PRAVILNO SPOJIS PARCIJALNE PATHOVE, KAO STO SU __dirname (APSOLUTNI APATH) I NA PRIMER
//                                                                                           'RELATIVNE' PATH-OVE FPLDERA GDE 
//                                                                                             SU STATICKI FAJLOVI)


// KADA KORISTIM                        static  MIDDLEWARE   JA PROVIDE-UJEM SAMO PATH-OVE DO FOLDER-A U KOJIMA SU TI FAJLOVI

// However, the path that you provide to the express.static function is relative to the directory from where you launch your 
// node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that 
// you want to serve ( https://expressjs.com/en/starter/static-files.html )

app.use('/static', express.static(path.join(__dirname, '/ui/css')))
app.use('/static', express.static(path.join(__dirname, '/ui/js')))

// GORNJI static CE BITI DEO VIRTUELNOG PATH-A (NEPOSTOJECEG)
// To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by 
// the express.static function, specify a mount path for the static directory

// static METODI TREBA PRAVI ABSOLUTE PATH, A use METODI SAM ZADAO (PRVI ARGUMENT) (TO JE DEO VIRTELNOG PATH-A, NEPOSTOJECEG
//                                                                                    TAKAV VIRTELNI PATH SE KORISTI U HTML-U)

// OVO ZNACI DA KADA KORISTIS FAJLOVE, KOJI SU NA PRIMER U /ui/css TI IH REQUEST-UJES KAO
//																																			/static/imefajla.css


// A SADA DEFINISEM SLANJE HTML

app.get('/', (req, res) => {
  // res.send('Hello World!');    OVO RANIJE NIJE SLUZILO NICEMU

  // A SADA CU DA DEFINISEM SLANJE               HTML-A
  // KORISTIM                     sendFile        METODU

  res.sendFile(path.join(__dirname +'/ui/html/index.html'))


});

///////// OVO NIJE BITNO (TO JE ONA VEZBA OD RANIJE ZA KOJ USI KREIRAO CUSTOM HEADER)/////////////

app.get('/blah', (req, res) => {

	res.set('X-bobby-the-trash-can', "you'we been bobied")

	res.status(418).json({message: "Hellow"})

})

/////////////////

// PORT JE U OVOM SLUCAJU 3000

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
```

## DODACU HTML FAJL, KOJI CE BITI SERVIRAN

OVO RADI NARAVNO LOKALNO JER CE SVE OVO DEFINISATI U VS CODE-U

ALI DODAJ I CSS (CSS JE TU SAMO ONAK OBEZVEZE, NICEMU NE SLUZI)

/var/www/app/ui/css/index.css

```css
* {
  background-color: bisque;
}
```

**ALI JAVASCRIPT FAJL KOJI CES DODATI BICE ZA SADA PRAZAN**

FAJL TREBA DA BUDE OVDE /var/www/app/ui/js/clientsocket.js

ZASADA CE TO BITI PRAZAN FAJLA

UPOMENUTOM JS FAJLU CU, KASNIJE DEFINISATI HANDLING WEBSOCKETA NA CLIENT STRANI, ZA SADA NEKA OSTANE OVAKO PRAZNO

DODAJ KONACNO HTML FAJL U ui/html, AKO TO VEC NISI URADIO (OPET TR NPOMINJEM DA SI MOUNT-OVAO STATIC ASSETS NA PATH static, PA ODANDE IH I REQUEST-UJ U HTML-U)

STO SE TICE HTML, ZELIM DAKLE DA DEFINISEM PRIMER, NALIK NA CHAT, A ZA TO CE MI TREBATI FORMULAR, SA DVA INPUTA, JEDAN CE BITI TEKST TIPA, A DRUGI CE BITI SUBMIT TIPA

JOPS JEDAN ELEMENT CE SLUZITI DA SE DISPLAY-UJU PORUKE

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/static/index.css"> <!-- EVO VIDIS, SAMO static -->
    <title>Your first Chat</title>
  </head>
  <body>
    <h1>Chat</h1>
    <form>
      <input type="text">
      <input type="submit">
    </form>
    <div class="messages"></div>
  </body>
</html>
```

KADA PUSHUJES, PA ONDA PULL-UJES NA SERVER, MOZES ONDA DA RESTARTUJE PROCESS MANGER-A

- pm2 reload app.js

******

SVE JE U REDU, TVOJI STATICKI ASSET-OVI SU SADA SERVIRANI SA EXPRESS-OM, BAR ONI KOJE ZA SADA IMAS

OVE PROMENE SAM PROMENIO SAM ODA VIDIM DA LI SE SVE UCITAVA KAKO TREBA, ODNOSNO GLEDAM DA LI JE HTML SERVIRAN, ALI I CSS, I SVE JE U REDU

## :suspension_railway::suspension_railway::suspension_railway: DA SE POZABAVIM DETALJNIJIM OBJASNJENJEM VEZANIM ZA WEBSOCKET :suspension_railway::suspension_railway::suspension_railway:

******

REAKO SAM RANIJE DA SE SA WEBSOCET PROTOCOLOM OBEZBEDJUJE PERISTANT CONNECTION

DATA SE PASS-UJE IN BOTH DIRRECTIONS

EVO IH I EVENT-OVI KOJI FIGURISU

:one: open – connection established,

:two: message – data received,

:tree: error – websocket error,

:four: close – connection closed.

**METODA KOJA SE KORISTI ZA SLANJE JESTE**

**socket.send()**

**METODA KOJA SE KORISTI ZA **

**socket.close()**

### PROTOCOL JESTE ws ALI MOGU KORISTITI I ENCRYPTED wss, I OVAJ DRUGI SE PREPORUCUJE

### PAKET KOJI SE KORISTI NA SERVER STRANI

<https://github.com/websockets/ws/blob/master/doc/ws.md#ws>



******
 
:tram::tram::tram::tram::tram::tram:

## ONO KAKO CU SADA DEFINISATI JESTE DA CU SAMO DEFINISATI NOVI EXPRESS SERVER, ODNONO NOVI FAJL, PORED POSTOJECEG app.js

MISLIM DA JE BOLJE DA KRENEM OD SERVER STRANE

OVO DAKLE DEFINISEM VEZANO ZA BACKEND

LOKALNO CU CAK MOCI I TESTIRATI WEB SOCKET (PREDPOSTAVLJAM DA MOGU NAPRAVITI NEKI TAKAV SETTING, ALI MOZDA TO OVDE NECU URADITI)

NEKA SE NOVI FAJL ZOVE **/socket/socket.js** (NEKA SE socket FOLDER NALAZI PORED app FOLDERA, JER KAO STO SAM REKOA RANIJE NAJBOLJ JE DA OVAKO DELIM APLIKACIJE)

I ODMAH INSTALIRAJ 'ws' PAKET O KOJEM SAM GOVORIO

- npm i ws --save

**KADA PULL-UJES NA SERVER STRANI, NE ZABORAVI DA TAM ORUNN-UJES npm, KAKO BI I TAMO INSTALIRAO PAKET**

*ZA SADA PAKET IMAS SAMO LOKALNO*

A SADA OVO DEFINISEM U /socket/socket.js

```javascript

// GLEDACU DA PRETERANO NE 


```

