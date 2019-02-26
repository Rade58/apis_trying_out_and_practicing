# DODATNA ZAPAZANJA O BACKGROUND PROPERTIJIMA

## VISE VREDNOSTI ODVOJENIH ZAREZOM ZA SVE BACKGROUND PROPERTIJE

POSTO JE MOGUCE DEKLARISANJE VISE BACKGROUND IMAGE-A

ZA SVE BACKGROUND PROPERTIJE, MOGUCE JE DEFINISATI MULTIPLE VALUES

DAKLE MOGUCE JE DEFINISANJE VISE VREDNOSTI, KOJE BI SE ONDA APLICIRALE NA SVAKI IMAGE

TE VREDNOSTI SE RAZDVAJAJU ZAREZIMA

****

AKO NA PRIMER IMAM DEKLARISANA TRI IMAGE-A

```CSS
div.nekiElement {

    background-image: url(./slike/prva_slika.jpg),
        linear-gradient(8deg, tomato, orange 38%, olive 38%, palegoldenrod 56% 82%, crimson),
        url(./slike/druga_slika.jpg);
}
```

**JA MOGU, NA PRIMER DEFINISATI SIZE ILI ORIGIN ZA SVAKI OD TRI IMAGE**, UZ KORISCENJE BACKGROUND PROPERTIJA:

```CSS
div.nekiElement {

    background-image: url(./slike/prva_slika.jpg),
        linear-gradient(8deg, tomato, orange 38%, olive 38%, palegoldenrod 56% 82%, crimson),
        url(./slike/druga_slika.jpg);

    /* OVAKO */
    background-size: 20% 80%, 60% 100%, 100%;
    background-origin: content-box, border-box, padding-box;


    /* JEDINO CU BACKGROUND REOPEAT DEFINISATI ZA SVE IMAGEO-VE */

    background-repeat: no-repeat;

    /* IMAJ NA UMU DA SAMI ZA becakground-repeat MOGAO IMATI MULTIPLE VREDNOSTI */

}
```

****

**NE ZABORAVI DA JE VISE IMAGE-OVA, STACKED JEDAN NA DRUGE (PRVI DEFINISANI JE STACKED ON TOP)**