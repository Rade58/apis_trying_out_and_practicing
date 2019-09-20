# SETTING UP WEBPACK-A, KAKO BIH MOGAO KORISTITI SASS

<https://github.com/webpack-contrib/sass-loader>

DAKLE UPOZNACU SE S TIM KAKO BI PODESIO SASS, CITAJUCI OBJASNJENJA SA OSTAVLJENOG LINK-A

## STO SE TICE VEZBI KORISTIM SLEDECI PROJEKAT KOJI JE KREIRAO *MIKE NORTH*

<https://github.com/webpack-contrib/sass-loader>

ODNOSNO KORISTIM DELICE TOG PROJEKTA, U [MOM PROJEKTU](https://github.com/Rade58/insta_pwa_cloneW)

MEDJUTIM, POSTO MENE PRVO ZANIMA, KAK ODA PODESIM SASS ZA MOJ BUNDLER, IPAK CU SE PRVO POZABAVITI:

## DAKLE DA PODESIM SASS ZA WEBPACK, POTREBNO JE INSTALIRATI sass-loader

MEDJUTIM, **MORA SE INSTALIRATI**  I **node-sass** (DA BIH GA KORISTIO SA WEBAPCK-OM, KOJI JE USTVARI NodeJs, JA MORAM IMATI I OVAJ PAKET)

- npm install sass-loader node-sass --save-dev

USTVARI NA OSTAVLJENOM LINK-U OBJASNJENO JE ZASTO TI TREBA node-sass

!!! KADA SAM POKRENUO GORNJU INSTALACIJU, POCELI SU DA SE UKLANJAJU NEKI PAKETI, KOJE SAM OD RANIJE IMAO (NE ZNAM ZASTO), ALI NA KRAJU SU I DALJE OSTALI INSTALLED, TAKO DA NECU BRINUTI

## KADA SAM TO INSTALIRAO U MOM APP-U, NAJBOLJE BI BILO DA DEFINISEM, KAKO SE

MOGU DA PRATIM [OBJASNJENJE OVOG CLANKA](https://developerhandbook.com/webpack/how-to-configure-scss-modules-for-webpack/)

### :one: PRVO CU USKOCITI U build-utils\webpack.development.js KAKO BI PODESIO SASS ZA DEVELOPMENT

ZA PRODUCTION, AKO SE SECAS STO SE TICE CSS KRUCIJALNI SU TI BILI

- css-loader, 'mini-css-extract-plugin' (KOJI I SAM IMA LOADER ZA CSS, KOJ IISTO UPOTREBLJAVAM)

ALI HAJDE DA SVE OBJASNIM MAL ODETALJNIJE

⏩⏩⏩⏩ **DA CISTO NAPOMENEM CISTO CEMU SLUZE SVI, ONI VEC POZNATI LOADER-I KOJE KORISTIM** ⬅️⬅️⬅️⬅️

> - *node-sass* **provides binding for Node.js to LibSass, a Sass compiler**

> - *sass-loader* **is a loader for Webpack for compiling SCSS/Sass files**

> - *style-loader* **injects our styles into our DOM** (ON DEFINITIVNO NIJE ZA PRODUCTION)

> - *css-loader* **interprets *@import* and *@url()* and resolves them** (ON JESTE ZA PRODUCTION)

> - *mini-css-extract-plugin* **extracts our CSS out of the JavaScript bundle into a separate file, essential for production builds** (I ON JE ZA PRODUCTION)

*build-utils\webpack.production.js*

```javascript

```
