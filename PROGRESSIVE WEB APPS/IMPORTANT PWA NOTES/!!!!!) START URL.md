# NE ZABORAVI DA KADA DEPLOY-UJES APP DA ZADAS START URL U MANIFESTU

RELATIVNA ADRESA NAIME, U MOM SLUCAJU NIJE FUNKCIONISALA

KADA SAM ZADAO URL MOJE DEPLOYED APLIKACIJE RESIO SAM PROBLEM

```javascript

// DAKLE U JASON OBJEKAT U PWA MANIFESTU DODAO SAM SLEDECU VREDNOST, ZA SLEDECI PROPERTI
"start_url": "https://instapwaclone.firebaseapp.com/",
```

## POSTO SI OVO DEFINISAO, SLEDECI PUT KADA IZVRSIS TAPPING NA IKONICU NA HOMESCREEN-U, BICE OTVOREN TVOJ APP U SEPARATE WINDOW-U

NECE SE VISE VIDETI ADRESS BAR, A NA MOBILNOM UREDJAJU, KORISNIK VISE NECE PRIMECIVATI DA JE REC O WEB APLIKACIJI

ONA CE SADA IMATI NATIVE FEEL

## AKO ZA scope PROPERTI NE DEFINISES ISTO, TO STO SI DEFINISAO ZA scope, BICE IGNORISANO (MOZDA GRESIM OVDE, MISLIM DA JE DOSLO DO UPOZORENJA ZATO STO SAM KORISTIO APP NA localhost-U, A ZADO MU DEPLOYMENT-OV URL KAO start_url)

ZATO CU JA DA DEFINISEM I SLEDECE

```javascript
"scope": "https://instapwaclone.firebaseapp.com/"
```
