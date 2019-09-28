# STYLE REUSE, KORISCENJEM @extend (PS. UVEK KORISTI EXTEND PLACEHOLDER (SAZNACES STA JE TO ALI NA POCETKU NAPOMINJEM))

ZASTO I KAKO JE OVO KORISNO NAJBOLJE CU VIDETI KADA, POMENUTO UPOREDIM SA MIXIN-OM, KOJI JE TAKORECI JOS JEDAN NACIN KAOJ ISE KORISTI ZA REUSING STILOVA

## POSMATRAJ KAKAV CSS CE PRODUCE-OVATI KORISCENJE MIXINA

SASS:

```scss
@mixin dark {       // DA MIXIN SE MOZE DEFINISATI I BEZ ARGUMENT ZAGRADE

    background-color: darkgreen;
    color: white;

}


.foo {
    padding: 14px;

    @include dark()
}

.bar {
    padding: 28px;

    @include dark()
}

```

CSS:

```css
.foo {
    padding:14px;
    background-color: darkgreen;
    color: white;
}

.bar {
    padding:28px;
    background-color: darkgreen;
    color: white;
}
```

## POSMATRAJ KAKAV CES CSS PRODUCE-OVATI KORISCENJEM @extend, I TO ZA ECI BROJ KALSA

SASS:

```scss
.dark {

    background-color: darkgreen;
    color: white;

}

.foo {
    padding: 14px;

    @extend .dark;
}
.bar {
    padding: 16px;

    @extend .dark;
}
.baz {
    padding: 18px;

    @extend .dark;
}


```

CSS:

```css

.dark, .foo, .bar, .baz {

    background-color: darkgreen;
    color: white;

}

.foo {
    padding: 14px;
}
.bar {
    padding: 16px;
}
.baz {
    padding: 18px;
}


```

**DAKLE KADA SE EXTENDUJE SELEKTOR NEKIM DRUGIM, IMAM SLEDECU SITUACIJU**

- DVA SELEKTORA CE IMATI ZAJEDNICKE STILOVE, KOJU JE ONOM DRUGOM, UNEO, ILI DAO, ONAJ SELEKTOR KOJI SE kORISTI U @extend IZJAVI

- A ONOM SELEKTORU, KOJ VRSI EXTENSIONING, OSTAJU STILOVI, ODNOSNO I ON POSTAJE DEO CSS (A JASNO JE DA MIXIN NIKAD NE MOYE POSTATI DEO CSS, I OTUDA ISTO JOS JEDNA RAQYLIKA)

DAKLE JEDNA KLASA DOBIJA PROPERTIJE DRUGE

I TA KLASA SE, 'KOJA JE SLUZILA KAO EXTENSIONER' MOZE SE ISTOT TAKO, NESMETANO KORISITI KORISITI U STZLING-U

## POMENUTO POSTAJE EVIDENTNO KADA JEDNA KASA EXTENDUJE NEKOLIKO NJIH

**SASVIM JE JASNO DA KADA BIH KORISTIO MIXIN ZA OVAKO NESTO, CODE BI ZNATNO PORASTAO, ODNSONO BILI BI OUTPUTED PROPERTIJI KOJE MIXIN DAJE, U SVAKOM OBIMU U KOJEM JE MIXIN BIO INCLUDED**

## ALI KLASA EXTENDIONER, I NE MORA BITI DEO KONACNOG CSS, AKO JE DEKALRISEM SA SPECIJALNIM KARAKTEROM (%); POMENUT OSE USTVARI NAZIVA @extend PLACEHOLDER

SASS:

```scss
%dark {       //EVO SADA JE KLASA DEKLARISANA SA %, ODNSONO JEDAN @extend PLACEHOLDER
    background-color: darkgreen;
    color: white;

}

.foo {
    padding: 14px;

    @extend %dark;          // I UPOTREBLJENA SA %
}
.bar {
    padding: 16px;

    @extend %dark;
}
.baz {
    padding: 18px;

    @extend %dark;
}


```

CSS:

```css
.foo, .bar, .baz {                      /* I UPRAVO ZBOG TOGA JE I NEMA NAKON TRANSPILEINGA SASS-A */
                                                                                    /*U CSS*/
    background-color: darkgreen;
    color: white;

}

.foo {
    padding: 14px;
}
.bar {
    padding: 16px;
}
.baz {
    padding: 18px;
}

```

## DAKLE STO SE TICE @extend-A, DA JOS JEDNOM PONOVIM

ON SLUZI ZA REUSING STILOVA, ALI ELIMINISUCI BILO KAKAV REPAITING, ODNOSNO NJEGOVA UPOTREBA GARANTUJE "DRY"-ER CODE

## JEDINI TROUBLE U KOJI MOZES UPASTI KORISTECI POMENUTO JESTE LOOSING TRACK, ZA STA SE KOJA KLASA KORISTI

NA PRIMER MOZES SLUCAJNO OVERRIDE-OVATI, POMENUTU KLASU EXTENSIONER-A, ALI UPRAVO OVAJ PROBLEM RESAVA EXTEND PLACEHOLDER, O KOJEM SAM MALOCAS GOVORIO

DAKLE UPOTREBA EXTEND PLACEHOLDERA JE POTPUNO DOBRA ODLUKA, JER I KADA GA UGLEDAM U MOM CODE-U, JASNO CU ODMAH ZNATI DA JE JEDINA NAMENA TOM PALCEHOLDER-U, DA EXTEND-UJE DRUGE BLOKOVE

## MIKE NORTH NAROCITO PREPOPRUCUJE, UPOTREBU POMENUTOGA, TAMO GDE NEMAMA VARIJABLI, TAM OGDE SIMPLY, JA ZELI MDA SHARE-UJEM STYLE BLOCK, ACROSS MULTIPLE CONCERNS, ONDONO PROSTIJE RECENO DA SHARE-UJEM STYLE BLOCK SA VECIM BROJEM SELEKTORA

## GDE BI BILO PROBLEMATICNO KORISTITI @extend

NA PRIMER U SASS-U, ODNONO U BLOKU KOJI JE PODBLOK, ILI DA SE SLOBODNIJE IZRAZIM, DUBOKI PODBLOK

TADA CE DOCI DO OUTPUTINGA OGROMNOG BROJA GARBAGE CODE-A (POGLEDAJ 62 i 63 STRANICU [SLAJDOVA](https://drive.google.com/file/d/0B7LIdu29tPZRVmJVeXpvOHhaUW8/view))

NEKI LJUDUI CAK IMAJU I LINTER KOJI SPRECAVA UPOTREBU @extend-A IZ POMENUTOG RAZLOGA (ALI JA CU GA KORISTITI, SAMO PAZLJIVO)

## EVO I VEZBE

```scss
%bucket {
    padding: 2px 10px;
    border-radius: 2px;
    border-style: solid;

    &:disabled {
        opacity: 0.5;
    }
}

.btn-primary {
    @extend %bucket;
    background-color: rgb(204, 68, 102);
    color:rgb(255, 255, 255);
}

.btn-secondary {
    @extend %bucket;
    background-color:rgb(237, 188, 200);
}
```

```html
<p>
    <button class='btn btn-primary'>Click Me!</button>
    <label>Primary</label>
</p>

<p>
    <button class='btn btn-secondary'>Click Me!</button>
    <label>Secondary</label>
</p>

<p>
    <button class='btn btn-primary' disabled>Click Me!</button>
    <label>Primary Disabled</label>
</p>

<p>
    <button class='btn btn-secondary' disabled>Click Me!</button>
    <label>Secondary Disabled</label>
</p>
<p class='unstyled'>
    <button class='no-style' disabled>Click Me!</button>
    <button class='btn' disabled>Click Me!</button>
    <label>These should remain unstyled</label>
</p>
```
