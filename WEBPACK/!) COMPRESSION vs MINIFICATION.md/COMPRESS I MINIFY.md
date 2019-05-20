# COMPRESS I MINIFY

KOJE SU RAZLIKE IZMEDJU POMENUTIH, I OBJASNJENJA VEZANA ZA POMENUTE TERMINE MOZES PROCITATI U [CLANKU SA CSS TRICKS](https://css-tricks.com/the-difference-between-minification-and-gzipping/)

>>>> Minification does things like removing whitespace, removing comments, removing non-required semicolons, reducing hex code lengths...

>>>> Gzipping finds all repetitive strings and replaces them with pointers to the first instance of that string.

>>>> Gzipping is far more effective. Doing both is ideal.

## ON OSTO TRENUTNO NE ZNAM JESTE, DA WEBPACK MINIFICIRA BUNDLEPO DEFAULT-U, U PRODUCTION MODE-U

[OVDE](https://webpack.js.org/configuration/optimization#optimizationminimize) MOGU SAZNATI VISE O POMENUTOME

```javascript
optimization: {
    minzimization: false;
}
```

TAMO POSTOJE MNOGE OPCIJE, KAO STO JE I minimizer, GDE MOGU DEFINISATI, KOJI TO MINIMIZER DA KORISTIM, ALI KAO STO REKOH, TO JE SVE DEFINISANO PO DEFAULT-U