# COMPRESS I MINIFY

[OVO SAM TAKODJE NAPISAO, I MISLIM DA JE VAZNO, PA PROCITAJ, I TICE SE COMPRESSED FAJLOVA](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/WEBPACK/f%29%20COMPRESSED%20FILE.md) (KONKRETNO GORIO SAM O TOME DA LI TREBA KORISTITI SAMO COMPRESSED FILE (DAKLE SAMO GZIPPED FAJL, UMESTO ONOG KOJI IMA SAMO .js EKSTENZIJU (ODGOVOR JE DA)))

KOJE SU RAZLIKE IZMEDJU POMENUTIH MINIFIED I COMPRESSED FAJLOVA, I OBJASNJENJA VEZANA ZA POMENUTE TERMINE MOZES PROCITATI U [CLANKU SA CSS TRICKS](https://css-tricks.com/the-difference-between-minification-and-gzipping/)

>>>> Minification does things like removing whitespace, removing comments, removing non-required semicolons, reducing hex code lengths...

>>>> Gzipping finds all repetitive strings and replaces them with pointers to the first instance of that string.

>>>> Gzipping is far more effective. Doing both is ideal.

OBRATI PAZNJU DA PO DEFOULT-U U WEBPACK-U, BUNDLE, KOJI JE GENERISAN, JESTE MINIFIED

## ONO STO TRENUTNO NE ZNAM JESTE, DA LI WEBPACK MINIFICIRA BUNDLEPO DEFAULT-U, U PRODUCTION MODE-U (ODGOVOR JE DA)

[OVDE](https://webpack.js.org/configuration/optimization#optimizationminimize) MOGU SAZNATI VISE O POMENUTOME

```javascript
optimization: {
    minzimization: false;
}
```

TAMO POSTOJE MNOGE OPCIJE, KAO STO JE I minimizer, GDE MOGU DEFINISATI, KOJI TO MINIMIZER DA KORISTIM, ALI KAO STO REKOH, TO JE SVE DEFINISANO PO DEFAULT-U

A U GORNJEM SLUCAJU, DEFINISUCI minimization: false; MINIFICATION SE NECE PRIMENITI (STO MOGU PROVERITI, U MOJOJ KONFIGURACIJI)