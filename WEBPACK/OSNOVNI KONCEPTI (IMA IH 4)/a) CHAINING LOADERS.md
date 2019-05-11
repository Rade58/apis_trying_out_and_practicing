# CHAINING LOADERS

STA JE USTVARI LOADER

**PA TO JE FUNKCIJA, KOJA UZIMA SOURCE, I RETURN-UJE NOVI SOURCE**

POSMATRAJ OVAJ SPECIFIC SLUCAJ

```javascript
module.exports = {
    rules: [
        {
            test: /\.less$/,
            use: ['style', 'css', 'less']
        }
    ]
}
```

**LOADER-I SE, UVEK EXECUTE-UJEO OD DESNA, KA LEVO**

KADA RAZMISLJAM O KONFIGURACIJI, MOGU TO URADITI U OVOM KONKRETNO MSLUCAJU, NA SLEDECI NACIN

``` javascript
// LARKIN PAMTI OVAJ PATTERN, KADA RAZMISLJA O KONFIGURACIJI

style(css(less()))

["style", "css", "less"]
```

MOZDA MI MOZE OVA [VIZUALIZACIJA](https://docs.google.com/presentation/d/1hFtMCMo62DgOIc-9OwgaVwPZHwv1cgMELArHcMbXlSI/edit#slide=id.g15e96ef847_0_438) POMOCI DA SHVATIM, POMENUTO

