# PRIPAZI KADA WRAPPUJES INLINE ELEMENTE

AKO PROMENIS DIMENZIJE INLINE ELEMENATA, KAO STO JE SPAN; KONKRETNO AKO IM DODAS MARGINE I BORDER-E, PAZI NA EFEKAT, KAKAV MOGU IZAZVATI

DAKLE, ONI SU INLINE ELEMENTEI OBUHVATAJU DELOVE TEKSTA, A TEKST SE WRAPP-UJE, U REDOVE, KOJI IMAJU PREDEFINISAN LINE HEIGHT

OTPRILIKE U BROWSERIMA, ON IZNOSI OKO 1.2em (TO JE PO DEFAULTU **line-height: normal;**)

ONO STO SE MOZE DOGODITI, JESTE DA WRAPPUJUCI SE, ONO STO JE POSLEDICA STILIZOVANJA INLINE ELEMENTA (**PADDING**, KOJI SAM DODAO (**MISLIM DA SAMO ON PROUZROKUJE PROBLEM U OVOM SLUCAJU**)), POSTANE ONO STO BI MOGLO PREKRITI PREDHODNI RED, TEKSTA TOKOM WRAPPINGA

EVO JEDNOG TAKVOG PRIMERA

```HTML

<div class="some">
    <span>1</span>
    <span>2</span>
    <span>3</span>
    <span>4</span>
    <span>5</span>
    <span>6</span>
    <span>7</span>
    <span>8</span>
    <span>9</span>
    <span>10</span>
    <span>11</span>
    <span>12</span>
</div>

<style>

    div.some span {
        background-color: pink;
        border: 1px solid currentColor;
        font-size: 1.2em; /* UZROKOVALO PROBLEM */
        padding: 1.3em;   /* UZROKOVALO PROBLEM */
    }

</style>

```

POMENUTO IZGLEDA ZANIMLJIVO, KADA SUZIM ELEMENT, ELEMENTI WRAPPUJUCI SE PREKRIVAJU JEDAN DRUGOG

ALI AKO NE ZELIM TO, POMENUTO MOZE BITI ANOYING

POSTOJI NEKOLIKO MOGUCIH RESENJA DA OVO ISPRAVIM

- PROMENOM **line-height** VREDNOSTI NA SLEDECI NACIN

```CSS
div.some span {

    /* (font-size) + (padding-top) + (padding-bottom) */

    /* 1.2em + 1.3em + 1.3em   =    3.8em  */

    line-height: 3.8em;

}
```

- DEFINISANJEM DA ELEMENTI BUDU DISPLAYED &nbsp;&nbsp;&nbsp;&nbsp; **inline-block**

```CSS

div.some span {

    display: inline-block;

}

```