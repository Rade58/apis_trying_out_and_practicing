# box-shadow PROPERTI

OVAJ PROPERTI IMA ISTO VREDNOSTI ZA LEVI OFFSET I ZA GORNJI OFFSET

ALI KADA SE ISPRED TIH VREDNOSTI STAVI KEYWORD **inset** ONDA SU TO VREDNOSTI, KOJE SU INSET VREDNSOTI, I SHADOW CE BITI PRIKAZAN, NE IZA NEGO 'ISPRED' ELEMENTA (ODNOSNO UNUTAR ELEMENATA)

MOGUCE JE PRI TAKVIM VREDNOSTIMA 'OFARBATI' I CELU PREDJU STRANU TAKO STO BIH, NA PRIMER ZADAO BLUR RADIUS, DOVOLJNO VELIK

MEDJUTIM ST SE TICE BOX SHADOW-A, POSTOJI I JOS JEDNA LENGTH VREDNOST, A TO JE SPREAD RADIUS, KOJI CE OMOGUCITI DA SHADOW BUDE JOS VECI

**DAKLE, NAVESCU *REDOSLEDNO*, VREDNSOTI box-shadow PROPERTIJA**

- **inset** KEYWORD (*OPCIONO*)

- LEFT OFFSET (LENGTH VREDNSOT)

- TOP OFFSET (LENGTH VREDNOST)

- BLUR RADIUS (LENGTH VREDNOST) (*OPCIONO*)

- SPREAD RADIUS (LENGTH VREDNOST) (*OPCIONO*)

- COLOR VREDNOST

## MULTIPLE BOX SHADOWS

DAKLE, MOGUCE JE DEFINISATI VISE BOX SHADOW-A, NA JEDNOM ELEMENTU

VREDNOSTI SE ODVAJAJ UZAREZIMA, A ONAJ POSLEDNJI DEFINISANI SHADOW JE ISPOD SVIH, A PRVI JE STACKED PREK OSVIH OSTALIH SHADOWA (ZA TEXT SHADOW, JE POMENUTO OBRNUTO)

EVO GA JEDAN PRIMER U KOJEM KORISTIM MULTIPLE BOX SHADOWS

```HTML
<div class="neki_shadowed_el"></div>

<style>

    div.neki_shadowed_el {
        width: 38vw;
        height: 28vw;
        border: currentColor solid 1px;
        margin: auto;
        padding-top: 38px;
        text-align: center;

        box-shadow: 10px 38px  rgba(255, 0, 43),
                    inset 5px 10px 0px 5px rgb(1, 253, 190),
                    5px 2px 1px purple,
                    inset 20px 12px 10px 20px orange;
        ;
    }

    /* A PROVEZBAO SAM I text-shadow N GENERATED CONTNET-U */
    div.neki_shadowed_el::before {
        content: '\1F42E';
        font-size: 4rem;

        text-shadow: 28px 28px 5px rgba(148, 35, 69, 0.829) 

    }

</style>
```

## ALAT ZA PRAVLJENJE BOX SHADOW-A

ESTELLE MI KAZE DA MI I NE TREBA

I JA TAKO MISLIM ALI IPAK CU OSTAVITI [LINK DO ALATA](http://westciv.com/tools/box-properties/index.html#-webkit-box-shadow:2px%202px%202px%202px%20#333333;%0A-moz-box-shadow:2px%202px%202px%202px%20#333333;%0A-o-box-shadow:2px%202px%202px%202px%20#333333;%0A-ms-box-shadow:2px%202px%202px%202px%20#333333;%0Abox-shadow:2px%202px%202px%202px%20#333333;%0A-webkit-column-count:;%0A-moz-column-count:;%0A-o-column-count:;%0A-ms-column-count:;%0Acolumn-count:;%0A-webkit-column-count:10px;%0A-moz-column-width:10px;%0A-o-column-width:10px;%0A-ms-column-width:10px;%0Acolumn-width:10px;%0A-webkit-column-count:2px;%0A-moz-column-gap:2px;%0A-o-column-gap:2px;%0A-ms-column-gap:2px;%0Acolumn-gap:2px;%0A-webkit-border-radius:1em;%0A-moz-border-radius:1em;%0A-o-border-radius:1em;%0A-ms-border-radius:1em;%0Aborder-radius:1em;%0Abackground-color:%20#FFFFFF;%0Acolor:%20#666666;%0Afont-size:%201.2em;%0A-ms-border-radius:1.0em;%0A)