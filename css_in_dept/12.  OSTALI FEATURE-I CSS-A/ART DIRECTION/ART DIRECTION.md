# ART DIRECTION

## SHADERS (CUSTOM FILTERS)

REC JE O PROPERTIJU: **filter**

A POSTOJI VECI BROJ FUNKCIJA, KOJE MOGU BITI VREDNSOTI, POMENUTOG PROPERTIJA

ESTELLE JE OVO NAZVALA SHADER-IMA, AL IJA NIKAK ODA PRONADJEM STRANICU SA DETALJNIM CLANKOM, KOJI BI BIO NASLOVLJEN SA "SHADERS"

JEDINO SAM NA [OVOJ STRANICI PRONASAO](https://developers.google.com/web/updates/2013/03/Introduction-to-Custom-Filters-aka-CSS-Shaders) DA IM JE STARO IME USTVARI "SHADERS", A DA BI TREBALI DA SE NAZIVAJU CUSTOM FILTER-IMA

A [OVO JE MDN-OV TUTORIJAL](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) KOJI SE BAVI, POMENUTIM

A OVO JE [PODRZANOST U BROWSERIMA](https://caniuse.com/#feat=css-filters)(caniuse)

NIJE PODRZANO U EDGE-U (USTVARI, SAMO PARTIAL SUPPORT)

**ESTELLE JE U SVOJI MPRIMERIMA KORISTILA -webkit PREFIXE** (PREDPOSTAVLJAM, KAKO BI POKRILA I STARIJE VERZIJE BROWSER-A)

## MOGUCE VREDNOSTI filter PROPERTIJA

KADA SA IGRAM SA OVIM PROPERTIJE, NAJBOLJE JE KORISTITI [OVAJ 'ALAT'](http://html5-demos.appspot.com/static/css/filters/index.html) KAKOBIH VIDEO KAKO KOJA VREDNOST UTICE NA IZGLED

REKAO SAM DA SU POMENUTOM PROPERTIJU, VREDNOSTI JESU 'FUNKCIJE', KOJIMA SE DODAJU ARGUMENTI

KAKVI SE ARGUMENTI DODAJU, I KOJI BROJ ARGUMENATA SE DODAJE, KOJOJ FUNKCIJI [JASNO SE VIDI IZ TOOL-A](http://html5-demos.appspot.com/static/css/filters/index.html), I ZATO TO NECU OBJASNJAVATI, JER BI BILO PREOPSIRNO

**DAKLE, JA MOGU ZA filter PROPERTI DEFINISATI, JEDNU ILI VISE SLEDECIH FUNKCIJA, KAO VREDNSOTI**

- blur()

- grayscale()

- drop-shadow()

- sepia()

- brightness()

- contrast()

- hue-rotate()

- contrast()

- invert()

- saturate()

- opacity()

PRIMER:

```HTML
<!-- EVO GA PRIMER SA JEDNIM IMAGE-OM -->
<!-- KOJEG SAM UCITAO U DVA RAZLICITA ELEMENTA -->
<!-- A NA DRUGO MELEMENTU SAM KORISTIO filter -->
<div class="walker"></div>
<div class="walker artistic"></div>

<style>
    div.walker {
        width: 20vw;
        height: 38vw;
        margin: auto;
        border: currentColor 2px solid;
        background-size: 22vw;
        background-image: url(../images/images_for_grid/slika_50.jpg);
    }

    div.walker.artistic {

        filter: sepia(0.8) saturate(6.2) hue-rotate(152deg) contrast(0.8)
                invert(0.1) brightness(0.9) opacity(0.9) drop-shadow(1px 1px 20px tomato)
                grayscale(0.6) blur(1px);
    }

    /* POKUSAO SAM OVO U OPERI CHROME-U, I FIREFOX-U, I SVE JE FUNKCIONISALO */
    /* DAKLE NISAM MORAO DA KORISTIM PREFIKS, ALI NE IJE BIL ONA ODMET DA GA DODAM
    TAKO DA CU OVDE SAMO NAPOMENUTI DA BIH IPAK TREBAO KORISTITI -webkit- PREFIKS */

</style>
```

### DOBRA IDEJA OD ESTELLE, VEZANA ZA sepia() VREDNOST filter PROPERTIJA

MOGU KORISTITI sepia() KAKO BIH UCINO DA MOJE SLIKE IZGLEDAJU OLD SCHOOL (BLACK AND WHITE)

MOGU UCINITI DA SLIKA VISE NIJE OLD SCHOOL, ON HOVER

A UZ SVE TO MOGU KORISTITI I ANIMACIJU

**DAKLE KORISCENJE FILTERA, JESTE 'DOING ART' BEZ DODAVANJA EKSTRA SLIKA**

## BACKGROUND BLEND MODE

NAIME, UZ POMOC PROPERTIJA **background-blend-mode** ,I NJEGOVIH KARAKTERISTICNIH VREDNOSTI, JA MOGU DEFINISATI DA SE BLENDUJE, ODNOSNO MESAJU:

BACKGROUND IMAGE-I MEDJU SOBOM, ALI I BACKGROUND COLOR I BECKGROUND IMAGE-I, AKO JE DEFINISAN BACKGROUND COLOR

OVO SU MOGUCE VREDNOSTI background-blend-mode PROPERTIJA:

- normal

- multiply

- screen

- overlay

- darken

- lighten

- color-dodge

- color-burn

- hard-light

- soft-light

- difference

- exclusion

- hue

- saturation

- color

- luminosity

EVO JEDNOG PRIMERA, GDE SAM DEFINISAO DA SE MEDJU SOBOM MESAJU NEKOLIKO BACKGROUND IMAGE-A

****

PRIMER:

```HTML
<div class="mixof"></div>

<style>
    div.mixof {
        width: 20vw;
        height: 38vw;
        margin: auto;
        border: currentColor 2px solid;
        background-size: 22vw;

        background-color: aqua;

        background-image: linear-gradient(90deg, rgba(255, 99, 71, 0.233) 30%, rgba(255, 166, 0, 0.5) 60%, rgb(128, 128, 0) 90%),
                            radial-gradient(farthest-corner at top right, crimson 50%, purple),
                            url(../images/images_for_grid/slika_50.jpg);

        /* IZABRAO SAM luminosity VREDNOST */
        background-blend-mode: luminosity;
    }

    /* IMAGE CE SADA IZGLEDATI JAKO INTERESANTNO */
</style>
```

****

****

EVO JOS JEDNOG PRIMERA U KOJEM KORISTIM I ANIMACIJU

```HTML
<div class="mixof"></div>

<style>
    div.mixof {
        width: 20vw;
        height: 38vw;
        margin: auto;
        border: currentColor 2px solid;
        background-size: 22vw;

        background-color: aqua;

        background-image: linear-gradient(90deg, rgba(255, 99, 71, 0.233) 30%, rgba(255, 166, 0, 0.5) 60%, rgb(128, 128, 0) 90%),
                            radial-gradient(farthest-corner at top right, crimson 50%, purple),
                            url(../images/images_for_grid/slika_50.jpg);


        animation: blending 10s 500ms forwards linear;

    }


    @keyframes blending {
        from {
            background-blend-mode: darken;
        }

        10% {
            background-blend-mode: difference;
        }

        20% {
            background-blend-mode: exclusion;
        }

        30% {
            background-blend-mode: hue;
        }

        42% {
            background-blend-mode: lighten;
        }

        78% {
            background-blend-mode: screen;
        }

        100% {
            background-blend-mode: luminosity;
        }
    }

</style>
```

****

### DOBRE IDEJE VEZANE ZA BLEND MODE

ESTELLE JE RADILA [JEDAN PRIMER](https://estelle.github.io/cssmastery/other/files/blendmode.html) (USTVARI POZAJMILA GA JE), KOJI KORISTI ANIMACIJU I SVG, ZAJEDNO SA BLENDINGOM

ESTELLE KAZE DA JE UZASNO KORISTITI ANIMACIJU POZADINE, POGOTOVA AKO JE ANIMACIJA infinite (TAK ODA SE TREBA TOGA USTRUCAVATI)

A [NA CSS TRICKS STRANICI, IMAM ODLICNE PRIMERE](https://css-tricks.com/basics-css-blend-modes/#article-header-id-0)

PREGLEDATI I ODRADITI SVE PRIMERE, I IDEJE SU ODLICNE

SAMA JEDNA FOTOGRAFIJA, KOJA SE BLEND-UJE SA JEDNOM BOJOM IZGLEDA ODLICNO

ALI POSTOJI MNOGI PRIMERI, KADA SE SLIKAK BLENDUJE SA TRANSPARENTNOM SLIKOM KOJA IMA TEKST U BOJI

ALI IPAK JE NAJBOLJE DA POGLEDAM SVE TE PRIMERE

[ESTELLE JE OSTAVILA I OVAJ LINK](https://css-tricks.com/almanac/properties/b/background-blend-mode/)