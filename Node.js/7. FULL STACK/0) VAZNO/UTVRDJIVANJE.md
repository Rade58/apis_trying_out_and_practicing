# NESTO VISE O Nginx KONFIGURACIJI; Node-U, KOMANDAMA, ARHITEKTURI APLIKACIJE

*OVDE DAKLE ZELIM DA SE MALO PODSETIM, SVEGA STO JE UCENO U OVOM WORKSHOP-U, LAI I DA URADIM NEKE PRIMERE, PA DA O NJIMA OVDE DAJEM ZAKLJUCKE* (ZA SADA SE OVO POKAZALO KAO DOBAR PRINCIP)

**PRE SVEGA DA KAZEM JESTE DA CITAS SVE NOTES KOJE SAM NAPISAO**, ALI GLEDAJ I OLD WORKSHOP-OVE, KOJE JE JEM SNIMIO

**ONO STA CU JOS URADITI JESTE DA CU PRIKAZATI SAV SETTING, ZA JEDAN PROJEKAT**

ZELIM DA RAZUMEM Nginx KONFIGURACIJU, ALI I DA PREDSTAVIM, JEDAN SETTING ZA CEO PROJEKAT

## INSTALACIJA I STARTOVANJE Nginx-A

- sudo apt install nginx

- sudo service nginx start

## CONFIG FAJL ZA POCETAK

- sudo cat /etx/nginx/sites-available/default

```linux
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
##

# Default server configuration
#
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        # SSL configuration
        #
        # listen 443 ssl default_server;
        # listen [::]:443 ssl default_server;
        #
        # Note: You should disable gzip for SSL traffic.
        # See: https://bugs.debian.org/773332
        #
        # Read up on ssl_ciphers to ensure a secure configuration.
        # See: https://bugs.debian.org/765782
        #
        # Self signed certs generated by the ssl-cert package
        # Don't use them in a production server!
        #
        # include snippets/snakeoil.conf;

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }

        # pass PHP scripts to FastCGI server
        #
        #location ~ \.php$ {
        #       include snippets/fastcgi-php.conf;
        #
        #       # With php-fpm (or other unix sockets):
        #       fastcgi_pass unix:/var/run/php/php7.0-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #       deny all;
        #}
}


# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#       listen 80;
#       listen [::]:80;
#
#       server_name example.com;
#
#       root /var/www/example.com;
#       index index.html;
#
#       location / {
#               try_files $uri $uri/ =404;
#       }
#}

```

## MOGAO BI DA SREDIS OVE KOMENTARE, ODNOSNO UKLONI SVAKI KOMENTAR, KOJI GOVORI NESTO O PHP-U, JER GA NIKDA NECU KORISITI

```linux
# Default server configuration
#
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        # SSL configuration
        #
        # listen 443 ssl default_server;
        # listen [::]:443 ssl default_server;
        #
        # Note: You should disable gzip for SSL traffic.
        # See: https://bugs.debian.org/773332
        #
        # Read up on ssl_ciphers to ensure a secure configuration.
        # See: https://bugs.debian.org/765782
        #
        # Self signed certs generated by the ssl-cert package
        # Don't use them in a production server!
        #
        # include snippets/snakeoil.conf;

        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }

}
```

EVO SADA JE BOLJE UKLONIO SAM KOMENTARA KOLIKO SAM MISLIO DA TREBA POSTO VIDIM DA NEKI KOMENTARI MOGU BITI HINTS, NJIH NISAM UKLONIO

**NAJVAZNIJE JE DA VIDIS GORNJI** *server* BLOK U CELOSTI

**serve** BLOK PREDSTAVLJA JEDAN SERVE, TO KAZEM JER MOGU IMATI VISE SERVERA U Nginx KONFIGURACIJI (JEM NA PRIMER ZA NJEGOVE RAZLICITE DELOVE SAJTA RUNN-UJE RAZLICITE SERVER-E)

MOGU BITI SPLITTED ACROSS FILES ILI MOG BITI SVI server BLOKOVI U JEDNOM FAJLU

## PO OVOJ DEFAULT KONFIGURACIJI SERVIRA SE DEFAULT HTML PAGE, KOJI IMA NAPISAN ONAJ TEKST, KAOJI UKAZUJE DA JE Nginx INSTALIRAN

OVO SAM IZOLOVAO IZ KONFIGURACIJE DA BI POKAZAO STA ZNACI

```linux
root /var/www/html;
```

**OVO GORE TI JE DIREKTORIJUM U KOJI UBACUJES SVE PROJEKTE (DEFAULT)**

**U TOM DIREKTORIJUMU IMA SAMO** *index.nginx-debian.html*

```linux
index index.html index.htm index.nginx-debian.html;
```

ZATO SE SERVIRA STO KAO STO VIDIS OVO PREDHODNO, TO JE ZADANJI FAJL U POMENUTOJ POSTAVCI, A PREDHODNIH SPECIFICIRANIH FAJLOVA NEMA, I ZATO SE TAJ NGINX-OV DEFAULT HTML I SERVIRA

## DODAVANJEM index.html U /var/www/html SERVIRACE SE TAJ, NOVI index.html

JER SE NECI SERVIRATI DRUGI DFAULT-OVI SA LISTE

## MENI NEKAKO BOLJE ZVUCI DA NE DODAJEM JOS HTML STRANICU; **TO JE ZBOG GIT-A**

**ODNSNO NEMOJ DA JE DODAJES SVE DOK NE BUDES KREIRAO SVE POTREBNE SSH KLJUCEVE I IMAO JEDAN REMOTE REPO**

ZELIM DA KRENEM FRESH SA GIT-OM; (TO KAZEM ZBOG ONIH STVARI SA KOJIMA SAM RANIJE IMAO PROBLEM,A KADA INICIRAM NEKOLIK OREMOTE REPOZITORIJUMA, A DA U NJIMA ONDA IMAM BEZVEZNI CODE, KOJI MOZE DA BUDE U COLLISIONU WITH EACHOTHER)

USTVARI NAJBOLJE JE DA IMAS OVAKU ARHITEKTURU

## ARHITEKTURA, GDE CES PORED POSTOJECEG html FOLDER-A IMATI I app FOLDER

USTVARI JA VOLIM ARHITEKTURU, KOA JE POGODNA ZA PWA, STO SE TICE UI-A

**ODNOSNO VODI RACUNA DA I U UI FOLDERU, index.html BUDE TAJ, KOJI CE BITI U TOP LEVEL-U ui-A**

EVO POGLEDAJ NESTO OVAKO MOZES DA KREIRAS LOKALNO

NEKA TI OVO BUDE OBRAZAC

**OVO NEKA TI SE NALAZI U *var/www/***

:one: POSTOJECI *html* FOLDER OSTAJE NA MESTU

:two: PORED NJEGA STAVLJAM **app** FOLDER (ON CE BITI FOLDER ZA MOJE API-EVE (DAKLE SAMO BACKEND))

**U html FOLDER CU STAVLJATI ui**

### EVO KAKO CE TI IZGLEDATI html FOLDER (*AKO SI ZABORAVIO, Nginx KONFIGURACIJA TI JE I PODESENA DA ON BUDE root FOLDER*)

USTVARI EVO POGLEDAJ KAKO CE IZGLEDATI TVOJ CEO **/var/www**

```linux
├───app
│   ├───authentication
│   ├───databse
│   ├───helpers
│   └───utility
└───html
    │   index.nginx-debian.html               // OVO NARAVNO NECU KORISTITI, A MOGU GA DODATI U .gitignore 
    │                                         // KASNIJE KADA GA BUDES KREIRAO, NECU GA UKLANJATI, NE SMETA IAKO SE NECE KORITITI
    ├───helpers
    ├───ui
    │   ├───css
    │   ├───js
    │   └───pages
    └───utility
```

## KAKO TI JE VEC OBJASNJENO U WORKSHOPU, PROMENI OWNERSHIP ZA OVAJ *var/www* FOLDER, ODNOSNO NE ZELIS DA ZA NJEGA STALNO KORISTIS sudo

MNOGO CES RADITI U NJEMU I sudo CE BITI NEPOTREBNO

- sudo chown -R $USER:$USER /var/www

ZAPAMTI GORE IMAS DVA PUTA $USER (MOZES TO KORISTITI ,MOZES I SVOJ PRAVI NAME, $USER JE SAMO VARIJABLA ZA TVOJ NAME)

## POCECU SADA SA VERSION CONTROLL-OM

KREIRACU ssh KLJUCEVE NA SERVER-U, (OVO CE BITI NAMENJENO GITHUB-U) (CISTO POGLEDAJ DA LI IMAS STARIH KLJUCEVA NA GITHUB-U OD UNISTENIH SERVER-A, NJIH MOZES PRETY MUCH DA UKLONIS JER BEZVEZE TAMO STOJE)

- cd ~/.ssh

- ssh-keygen

NE MORAS DA MU DAJES IME, NEKA TO BUDE DEFAULT

KOPIRAJ SADA PUBLIK KLJUC NA GITHUB

KREIRAJ PRAZAN REPO NA GITHUB-U, PULLUJ GA DOWN LOKALNO, IZVRSI NEKE PROMENE KOJE ZELIS, PRE NEGO STO GA PUSHUJES BACK

******

digresija:

AKO SI NESTO POGRESIO KREIRAO GIT REPO, .git , ILI NEKI FOLDER PUN FAJLOVA MOZES UKLONITI SAMO SA

- rm -rf IME_FOLDERA

******

******

digresija:

AKO IMAS DVA INITATED GIT REPO (RANIJE SAM GOVORIO O VOOM PROBLEMU), KADA NE MOZES DA PULL-UJES

OVO JE ZATO STO SU IM UNRELATED HISTORY-JI

A TI RECIMO ZELIS DA PULLUJES NA SERVER PROMENE IZ GIT REPO-A

SAMO URADI SLEDECE

- git pull origin master  --allow-unrelated-histories

OTVORICE TI SE FAJL, SAMO NAPISI PORUKU PA MOZES DA IZADJES

*MEDJUTIM OVO GORE NIJE DOBRO JER OPET NE POVEZUJE HISTORY*

*USTVARI OVO JE BOLJI IZBOR*

**git branch --set-upstream-to=origin/master master**

IONAKO TI PISE U GIT OUTPUTU

******

## INITUJ GIT U www FOLDERU (SMES, UPRAVO CE TI OVO GORE RESITI PROBLEM STO SAM REKAO)

DOBRO SADA MOZES DA RADIS DEVELOPMENT LOKALNO JER SI KLONIRAO LOKALNO NA RACUANRU REPO, NAPRAVIO PROMENE, PA PUSHOVAO

SSH KLJUCEVI SU PODESENI
PREBRODIO SI ONO SA DIFFERENT HISTORYJEM JER TI JE REPO NA SERVERU BIO INITED

I MOZES DA POCNES DEVELOPMENT

## MOZES DA PROMENIS DAKLE ONAJ html PAGE, KOJI CE SE SERVIRATI UMESTO ONOG Nginx-OVOG

ZNAS KAKO SUVISN OJE VISE OBJASNJAVATI

## KADA DODAJES SAMO HTML WEBPAGE, KOJA JE JEDAN OD IZBORA VEC SPECIFICIRAN U Nginx KONFIGURACIJI, NE MORAS DA RESTART-UJES NGINX

ALI INACE **UVEK IZVRSI RELOADING Nginx SERVICE-A, KADA IZMENIS NESTO**

- sudo service nginx reload

**AKO NISI PRAVILNO DEFINISAO NGINX KONFIGURACIJU**, RUNNUJ OVO

- sudo nginx -t

*RESICE TI MNOGE GLAVOBOLJE*, JER CE TI RECI STA NE VALJA

## INSTALIRAO SAM PROCESS MANAGER-A, ZATIM BI BILO DOBRO DA SADA REDEFINISEM Nginx KONFIGURACIJU

CISTO FOR THE SAKE OF PLAYING AROUND, ZELIM DA DODAM JOS DVA LOCATION BLOK-A

DA DEFINISEM proxy_pass U OBA BLOKA

CILJ JE USTVARI DA IMAM DVA EXPRESS SERVER-A KOJI CE SERVE-OVATI NEKI DATA

ALI ZELIM DA SVAKI OD NJIH KORISTI ZASEBAN PORT

- sudo vi /etc/nginx/sites-available/default

OVO SAM DODAO U KONFIGURACIJU

```linux
location /app/ {
        proxy_pass http://127.0.0.1:3000/;
}
location /socket/ {
        proxy_pass http://127.0.0.1:3400/;
}
```

**EDITOVAO SI KONFIGURACIJU, RED JE I DA RELOADUJES NGINX SERVICE, DA BI SE PROMENE PALICIRALE**

- sudo service nginx reload

**AKO NISI PRAVILNO DEFINISAO NGINX KONFIGURACIJU**, RUNNUJ OVO

- sudo nginx -t

## NAVIGATE-UJEM U /var/www, INITIALIZUJEM NPM INSTALIRAM EXPRESS I KRECEM DA DEFINISEM PROSTE APPLICATION SERVERE

-cd /var/www

- npm init

- npm i express --save

MADA SAM SVE OVO MOGAO I LOKALNO DA URADIM, LAKSE JE I TO CU URADITI DALJE

## EXPRESS (MISLIM DA JE OVO JAKO VAZNO)

A TICE SE PATH-OVA U EXPRESS-U

ONI SU VIRTUELNI

ODNOSNO KADA GLEDAM IZ UGLA OTVORENOG PORTA, TREBA DA KAZEM, DA ZA TAJ EXPRESS APP 

**PORT PREDSTAVLJA '/' MESTO U EXPRESS APLIKACIJI, ODNONO U BILO KAKVOM NODEJS SERVERU**

TO GOVORIM JER SAM RANIJE DEFINISAO SPECIFICNI location BLOK, SA ODGOVARAJUCOM RUTOM, KAO STO SI VIDEO GORE

EVO GA

```linux
location /app/ {
        proxy_pass http://127.0.0.1:3000/;
}
```

*GORE TI JE KAO STO VIDIS location*  **/app/**

A OVAKOO SAM DEFINISAO www/app/app.js FAJL

```javascript
onst express = require('express')

const app = express()

app.get('/blah', (req, res) => {                // POGLEDAJ, OVDE TI JE ROUTE  /blah/


  res.status(200).send('bableng is this ones teht blah')
})


app.listen(3000, () => {
  
})
```

**PA TO ZNACI DA MORAS REQUESTOVATI SA ROUTE-OM**

app/blah/

EVO POGLEDAJ SVOJAJAVSCRIPT FRONTEND CODE

POGLEDAJ OVDE www/html/ui/js/main.js

```javascript
const button = document.createElement("button");

button.textContent = "press"

const responseArea = document.createElement('div')


document.body.prepend(button, responseArea)

button.addEventListener('mousedown', (e) => {
  
  // EVO POGLEDAJ PATH, ON JE VALIDAN
  fetch('/app/blah')
  .then((res) => {
    return res.text()
  })
  .then(data => {
    responseArea.textContent += `DATA: ${data}`
  })
  .catch(err => [
    console.log(err)
  ])
})
```

## OVO ME DOVODI DO ZAKLJUCKA DA I NEMORAM IMATI MNOGO OTVORENIH PORTOVA, VEC SAMO MOZDA TREBAM IMATI: location / I U NJEMU JEDAN proxy_pass ZA NEKI ZELJENI PORT

A SVE DRUGE ROUTE-OVE NEKA HANDKLE-UJE EXPRESS, VALJDA JE ZATO I POGOFDAN ZA KORISCENJE

## JA SAM OTVORIO JOS JEDAN PORT (3400), SAMO U CILJU TESTIRANJA WEB SOCKET-A

TIME CU SE POZABAVITI, U DRUGOM MD FAJLU, ALI TO CU RADITI KASNIJE

******

IMAM DILEMU

DA LI MOZE DA SE OSTVARI WEBSOCKET KONEKCIJA, AKO JE ENABLED HTTP/2

SAMO ZBOG OVOGA, U OVOM FAJLU NECU SE PODSECATI TOGA KAK OSE ENABLEUJE HTTP/2

TO CU URADITI U DRUGOM MD FAJLU, TEK KADA USPESNO BUDEM OSTVARIO WEBSOCKET KONEKCIJU

******

## :sunny::sunny: SAD ZELIM DA NASTAVIM, MOJE PODSECANJE SA ONIM STA SAM JOS NAUCIO TOKOM WORKSHOPA :sunny::sunny:

OVDE CU SADA PRVO ODRADITI NEKE STVARI KOJE SE TICU SECURITY CHECKLIST-E

### UNATTENDED UPGRADES (TO BI VEC TREBALO DA DODJE SA UBUNTU-OM)

NECU PRETERANO OBJASNJAVATI VEC CU INSTALIRATI PROGRAM, KOJI UPDATE-UJE AUTOMATSKI SISTEM, RADI SIGURNOSTI I MANJIH ISPRAVKI

- sudo apt install unattended-upgrades

AKO HOCES DA PROVERIS STA IMA UKONFIGURACIJSKOM FAJLU

- less /etc/apt/apt.conf.d/50unattended-upgrades

*I DA ZAISTA JE unnatended-upgrades BIO INSTALIRAN RANIJE*

### nmap KOMANDA (VIDECU SA OVOM KOMANDOM STA MOZDA VIDI I NEKI ZLOCUDNIK) (INFORMACIJE O PORTOVIMA)

DAJE UVID O PORTOVIMA NA SAJTU KADA SE RUNN-UJE

- sudo apt install nmap

RUNNUJEM JE SA IP-JEM

- nmap MOJ_IP

ILI

- nmap -sV MOJ_IP (*OVO DAJE I CAK VISE INFORMACIJA, (ODNOSNO STA SKORISTI PORT)*)

*RUNNUJ OVU KOMANDU PRE I POSLE TWEAKINGA FIREWALL-A*

```linux
Not shown: 997 closed ports
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp   open  http    nginx 1.14.0 (Ubuntu)
3000/tcp open  http    Node.js Express framework
```

KAO STO VIDIS VIDI SE SVE SE ZNA

### DA SE POZABAVIM SADA FIREWALL-OM, ODNOSTO UNCOMLICATED FIREWALL-OM (ufw)

VIDI DA LIJE JE ufw AKTIVAN

- sudo ufw status

**ENABLE-UJ GA ALI PAZI**

- sudo ufw enable

:heavy_exclamation_mark::heavy_exclamation_mark::heavy_exclamation_mark::heavy_exclamation_mark:
BRZO KUCAJ SLEDECU KOMANDU DA SE NE ZAKLUCAS (BRZO ENBLE-UJ SSH) (JEDINI NACIN DA SE ULOGUJES AKO SI SE ZAKLJUCAO JESTE KROZ TERMINAL DIGITAL OCEAN-A)
:heavy_exclamation_mark::heavy_exclamation_mark::heavy_exclamation_mark::heavy_exclamation_mark:

- sudo ufw allow ssh

KADA SI TO URADIO, ENABLE-UJ I HTTP

- sudo ufw allow http

KADA RUNN-UJES SLEDECE

- sudo ufw status verbose (VERBOSE CE DATI NESTO VISE INFORMACIJA)

VIDECES U REPORTU SAMO ssh (PORT 22) I PISACE DA JE ALLOWED

ALLOW-UJ SADA I http (PORT 80)

- sudo ufw allow http

- sudo ufw status verbose (VIDECES I DA JE HTTP ALLOWED)

******

OVO SU NEKA MOJA ZAPAZANJA:

- HTTP SAM EKSPLICITNO ALLOW-OVAO

- IMAM OTVOREN I PORT 3000

- PORT 80 MOZE PIOPE-OVATI U 3000

- DAKLE AKO POSALJEM VALIDAN GET REQUEST NA APPLICATION SERVER, KOJI SLUSA NA PORTU 3000 IMACES USPESAN ODGOVOR

**OVASJ SLEDECI TEST KOJI CU ODRADITI BICE JAKO VAZAN**

AKO NAPISES U ADRESS BAR-U OVO

- `www.mojsajt.com:3000`

*BICES BLACKHOLED* (SVE CE HANGOVATI, SVE DOK SE NE DESI `This site can’t be reached...To long to respond`)

SVAKO KO POMENUTO POKUSA BICE BLACKHOLED DAKLE

ALI HAJDE ALLOW-UJ PORT 3000

- sudo ufw allow 3000

POKUSAJ SADA

- `www.mojsajt.com:3000`

U ADRESS BARU

I NA STRANICI CE TI BITI RENDERED RESPONSE

```html
Cannot GET /
```

**DAKLE DOBIO SI RESPONE I TO JE 404**

OVO ATTACKERU MOZE UKAZATI DA JE PORT OTVOREN,M ODNSNO DA NIJE ZASTICEN FIREWALL-UM, I TO NIJE DOBRO

ON BI TREBAL ODA UVEK BUDE BLACKHOLED

*DAKLE DENY-UJ PONOVO PORT 300*

- **`sudo ufw deny 3000`**

*`KEEP IT FIREWALLED`*

******

*DAKLE SADA NIKO NE MOZE DIREKTNO KORITITI PORT 3000, **ALI PRKO PORTA 80 MOZE SE 'PRICI' PORTU 3000*** (DA NIJE TAKO TVOJ EXPRESS APPLICATION NE BI NI FUNKCIONISAO, A NARAVNO DA SADA FUNKCIONISE, JER PORT 80 MOZE DA PRICA SA PORTOM 3000, ALI NE MOZE SE DIREKTNO PRICATI SA PORTOM 3000)

### ZELIS SADA DA IZVRSISIS UPGRADE NodeJS-A

SA apt-OM SAM INSTALIRAO STARIJU VERZIJU NODE-A (TO SE TREBA UPGRADE-OVATI)

- nodejs --version

**USTVARI OVDE CE SE MODIFIKOVATI *STA CE TO BITI IZVOR KADA SE INSTALIRA I UPDATE-UJE NODEjs***

*PA CU POSLE NARAVNO POKRENUTI INSTALACIJU*

******

OVDE SE KORISTI *curl*; DA SAZNAS STA JE TO PROCITAJ [OVO](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/Node.js/7.%20FULL%20STACK/g%29%20SECURITY/10.%20UPGRADE%20Nodejs.md#upgrade-nodejs)

******

PRVO KREIRAS JEDAN FAJL U SVOM `home/$USER`, I TO SA curl KOMANDOM

- curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

OVO CE SDA BITI JEDINI FAJL KOJI NIJE PREFIXED SA TACKOM U `home$USER`

- cat nodesource_setup.sh

POMENUTO JE **BASH SCRIPT**, KOJI VALJDA SLUSZI DA SE NESTO PODESI TAKO DA KADA BUDEM SLEDECI PUT INSTALIRAO NODE, DA SE INSTALIRA NOVIJA VERZIJA (CITAJUCI GA VIDEO SAM DA INSTALIRA CAK I *yarn*)

EXECUTE-UJ GA *NE ZABORSVI **sudo***

- sudo bash nodesource_setup.sh

INSTALIRA OPET (ODNOSNO UPDATE-UJ NODE)

- sudo apt install nodejs

PROVERI VERZIJU

- nodejs --version

**NODE JE UPDATED**

### UPDATE-UJ SADA I VERZIJE SVIH GLOBALNIH npm PCKAGE-A

*TO TI JE OMOGUCENO KAO POSLEDICA ONOGA STO SAM POSTIGA IZ PROSLOG NASLOVA*

- sudo npm update -g

### ONO STO SAM ZABORAVIO DA URADIM JESTE DA ZADAM seerver_name U MOJOJ Nginx KONFIGURACIJI

USTVARI POTREBNO JE DODATI DOMAIN NAME (@ I www)

OVAKO

```linux
server_name mojsajt.com www.mojsajt.com;
```

TAKO DA CU SADA TO DA URADIM

- sudo vi /etc/nginx/sites-available/default

NAKON STO SI TO URADIO, MOZES DA RELOAD-UJES NGINX SERVICE

- sudo service nginx reload

## OSTAJE MI SADA DA POKRENEM CERTBOT-A, KAKO BI OMOGUCIO SSL (ODNSNO ZELIM DA KORISTIM HTTPS UMESTO HTTP-A)

*KADA EXECUTE-UJES KOMANDE, EXECUTE-UJ IH U HOME DIRECTORY-JU, ODNSONO `/home/$USER/`*

NARAVNO, IDEM TAMO NA ZVANICNI WEB PAGE, GDE UNOSIM, KOJI IMAM TIP WEB SERVERA I NA KOJEM OPERATIVNOM SISTEMU RUNN-UJEM WEB SERVER

DAKLE BIRAM Nginx  I UBUNTU LST 18 VERZIJU I BICE MI GENERISANO SVE STO TREBAM EXECUTE-OVATI

UNOSIM SVE GENERISANE KOMANDE (OBJASNJENO MI JE SVE u MD DOKUMENATu KOJEg IMAM)

******

PROVERI KAKO TI SADA IZGLEDA NGINX CONFIGURACIJA

- sudo cat /etc/nginx/sites-available/default

*OVO SAM PROVERIO JER SAM TOKOM WORKSHOPA OVDE POGRESIO I DODAT JE NEK IDUPLI CONTENT* (PREDPOSTAVLJAM DA JE TO BILO JER SAM CACEL-OVAO CERTBOT-A U JEDNOM TRENUTKU, A SADA SAM SVE URADIO KAKO TREBA)

******

## SADA KORISTI ufw DA ALLOW-UJES HTTPS (443)

- sudo ufw allow https

- sudo ufw status verbose

I ZAISTA SAM GA ALLOW-OVAO

IDI NA https VERZIJU TVOG SITE

MOJ SITE SADA KORISTI SSL

## MISLIM DA JE DOBRO DA SADA NAPRAVIM REDIRECTION, AONO STO ZELIM DA URADIM JESTE DA REDIRECT-UJEM ONAJ TRAFFIC SA 80, I POSALJEM GA NA 443

USTVARI ISPRAVKA' **REDIRECTION NIJE POTREBAN, SAMI CERTBOT GA JE DEFINISAO** (POGLEDAJ NGINX KONFIGURACIJU I IF STATEMENT, KOJI SE NALZI NA KRAJU)

## MOZES SADA DA OMOGUCIS HTTP/2

- sudo vi /etc/nginx/sites-available/default

**UMECES** *http2* NA MESTIMA U NGINX KONFIGURACIJI (OBJASNJENO TOKOM WORKSHOPA, POGLEDAJ TAMO)

RELOAD-UJ NGINX SERVICE

- sudo service nginx reload

PROMENU MOZES VIDETI U NETWOKT SEKCI CHROME DEV TOOLSA, NA SAMOM REQUEST-U (Protocol KOLONA)

## JA U KONFIGURACIJI IMAM JOS JEDAN location BLOK, ON JE NAMENJEN ZA WEBSOCKET KONEKCIJU

TO CU POKAZATI U DRUGOM MD DOKUMENTU OVOG FOLDER-A