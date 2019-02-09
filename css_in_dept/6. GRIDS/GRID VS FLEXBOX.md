# GRID VS FLEXBOX

PRE NEGO STO SE, DETALJNO POZABAVIM GRIDOM

## POZBAVICU SE FLEXBOX-OM, NA KARATKO

KAKO BI IH UPOREDIO

FLEXBOX JE DOBAR ZA KREIRANJE DVODIMENZIONALNOG LAYOUT-A

KAKO ESTELLE KAZE: "YOU ADD AN ELEMENT AND IT GOES ACROSS THE LINE"

KREIRACU JEDAN PRIMER

```HTML
<div class="fl_kont">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
</div>

<style>

    div.fl_kont {
        display: flex;
        flex-flow: row wrap; /* */
    }

    div.fl_kont > div {
        border: olive solid 2px;
        background-color: lemonchiffon;
        font-size: 2em;
        margin: 10px;
        text-align:center;
        padding: 1.2rem;

        flex: 1 1 250px;  /* */
    }

</style>

```

AKO POGLEDAM GORNJI PRIMER, VIDI SE DA SAM ITEM-IMA ZADAO *flex-basis* OD 250px

I ITEMI, MOGU DA RASTU, I DA SE SKUPLJAJU, ZAVISNO OD POVECANJA/SMANJENJA VELICINE VIEWPORTA

VIDIM ISTO MARGINU OD 10 PIKSELA OKO ITEM-A (TAKO DA IZGLEDA DA ITEMI IMALU NICE LITTLE GUTTER IN BETWEEN THEM)

TSKODJE MOGU SMANJITI VIEWPORT, TAKO D SE PO TRI FLEX ITEM-A NALAZE JEDNOM REDU (TAKO SAP PROSTO PODESIO SIRINU VIEWPORTA, A FLEX ITEMI SE WRAP-UJU, JER SAM TAKO ZADAO)

>>>> MEDJUTIM SADA CU NESTO PROMENITI

DEFINISACU *display: none;* NA JEDNOM OD ITEM-A (TO MOZE BITI BILO KOJI ELEMENT)

```CSS

div.fl_kont > div:nth-of-type(8) {
    display: none;
}

```

ONO STO CE SE DOGODITI JESTE DA CE:

**POMENUTI ELEMENT NESTATI SA STRANICE, A NA NJEGOVOM MESTU CE SE NACI ELEMENT, KOJI GA JE SLEDIO (BIO POSLE NJEGA)**

**SVI OSTALI ELEMENTI, KOJI SU NAKON 'IZBACENOG' CE PRATITI TAJ *MOVEMENT* I 'WRAPP-OVACE SE UNAZAD'**

**POSLEDNJI RED CE PROMENITI 'SVOJU FORMU', ODNOSNO U NJEMUU CE SE NALZAITI DVA ELEMENTA, KOJA KORISTE DOSTUPNI POZITIVAN PROSTOR I SIRE SE U ISTOM OMJERU (ODNOSNO APLICIRAN IM JE POZITIVAN PROSTOR U ISTOM OMJERU)**

DOBRO, JASNO MI ZASTO SE TO DESAVA, JER SU TAKVE, PROSO OSOBINE FLEXBOX-A,

HAJDE SADA DA VRATIM (ODNOSNO RENDERUJEM TAJ 8-I FLEX ITEM NA STRANICU), A DA UKLONIM POSLEDNJI NESTE FLEX ITEM

```CSS

/* div.fl_kont > div:nth-of-type(8) {
    display: none;
} */

div.fl_kont > div:nth-last-of-type(1) {
    display: none;
}

```

U POGLEDU LAYOUT-A, IMACU ISTU SITUACIJU (DAKLE POTPUNO ISTI IZGLED) (JER SE SVI ELEMNITI 'FLEX-UJU I WRAP-UJU NA ISTI NACIN'), SAMO STO ZADA ZADNJI ITEM NECE BITI DISPLAYED

ODNOSNO LAYOUT BI ZA OVU SIRINU VIEWPORTA (KOJU SAM VEC GORE POMENUO ODNOSNO SETT-OVAO), IZGLEDAO POTPUNO ISTO, BEZ OBZIRA, KOJI SE ELEMENT DEFINISAO SA **display: none**

DA PONOVIM:

OPET LAYOUT TAKO IZGLEDA DA IMAM PO TREI ELEMENTA U SVAKOJ KOLONI, KOJI SU ISTE VELICINE JER IMAJU ISTI FLEX BASIS I DOZVOLJENI IM JE GROW (PORED TOGA I SHRINK), ALI IZUZEV POSLEDNJEG REDA KOJI SE SASTOJI OD DVA ELEMENTA

KADA BI ZADAO **dispaly: none** ZA JOS JEDAN ELEMENT, U POSLEDNJEM REDU LAYOUT-A, NASAO BI SE SAMO JEDAN ELEMENT, POPTUMNO GROWN, JER JE DOBUIO SAV POZITIVNI PROSTOR

**SVE OVO MOZE LEPO DA IZGLEDA U MOM LAYOUT-U, ALI...**

>>> ...STA AKO TAJ POSLEDNJI ITEM IMA, SAMO JEDNU, MALU SLIKU NA KOJOJ SE NALAZI MALO MACHE; I AKO JE TAJ ITEM, POTPUNO PORASTAO PO SIRINI, PA AUSEO CELU SIRINU VIEWPORTA? 

*PA NEMA DILEME DA BI TO IZGLEDALO RUZNO*

# A STA BI GRID URADIO, DA SAM NJEGA KORISTIO U OVOM SLUCAJU?

PA ON BI MI OMOGUCIJO DA SE OTARASIM TAKVOG IZGLEDA LAYOUTA, U KOJEM ELEMENT, U POSLEDNJEM REDU ZAUZIMA CELU SIRINU VIEWPORT-A

I TO CU POKAZATI U SLUCAJU ISTOG LAYOUT-A, SAMO STO CE SE U OVOM SLUCAJU RADITI O GRID CONTAINER-U, KOJEM CU DEFINISATI, NEKE GRID SPECIFICNE KARAKTERISTIKE

```HTML

<div class="gr_kont">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
</div>

<style>

    div.gr_kont {

        display: grid;

        grid-template-columns: repeat(3, 1fr); /* U SUSTINI SAM DEFINISAO DA SE */
                                                /* LAYOUT SASTOJI OD 3 KOLONE I DA SVAKA KOLONA ELEMENATA */
                                                /* UZME 1 FRACTION OD PROSTORA (O OVOME CU DETALJNO GOVORITI
                                                U DRUGIM md FAJLOVIMA VEZANIM ZA GRID) */
    }

    div.gr_kont > div {
        border: olive solid 2px;
        background-color: lemonchiffon;
        font-size: 2em;
        margin: 10px;
        text-align:center;
        padding: 1.2rem;
    }

    /* A SADA CU DA UKLONIM POSLEDNJI ELEMENT, I ONAJ ELEMENT, KOJI JE PRE PREDPOSLEDNJEG ELEMENTA */
    div.gr_kont > div:-webkit-any(:nth-last-of-type(1), :nth-last-of-type(3)) {
        display: none; 
    }

    div.gr_kont > div:-moz-any(:nth-last-of-type(1), :nth-last-of-type(3)) {
        display: none; 
    }

    /* ONAJ ELEMENT, KOJI JE BIU SUSED OD UKLONJENIH ELEMENATA (ODNOSNO KOJI SE NALAZIO IZMEDJU NJIH),
    NECE (KAO STO JE RANIJE BIO
    SLUCAJ SA FLEXBOX-OM), PORASTI I POPUNITI CEO PROSTOR, VEC CE IMATI SIRINU, KOJU IMA
    PRVA KOLONA, JER CE SE NACI U PRVOJ KOLONI (STO ZNACI DA SE WRAPP-OVAO, ODNOSNO ISKORISTIO
    JE OSLOBODJENI PROSTOR ISPRED SEBE), ALI NIJE PORASTAO, VEC JE SIROK ONOLIKO, KOLIKO
    I ONA KOLONA ELEMENATA, U KOJO SE NALAZI  */

</style>

```

## POSTOJI JOS NEKOLIKO STVARI, KOJE GRID MOZE DA URADI

U OVOM SLUCAJU (SLEDECEG PRIMERA (ALI ISTI LAYOUT JE U PITANJU, KAO U PROSLOM PODNASLOVU)), JA SAM DEFINISAO DA SE ELEMENT, KOJI SE NALZI, "U CENTRU GRIDA", SPAN-UJE, ODNOSNO ZAUZME DVE KOLONE

```HTML

<div class="gr_kont_some">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
</div>

<style>

    div.gr_kont_some {

        display: grid;

        grid-template-columns: repeat(3, 1fr);
    }

    div.gr_kont_some > div {
        border: olive solid 2px;
        background-color: lemonchiffon;
        font-size: 2em;
        margin: 10px;
        text-align:center;
        padding: 1.2rem;
    }

    div.gr_kont_some > div:-webkit-any(:nth-last-of-type(1), :nth-last-of-type(3)) {
        display: none;
    }

    div.gr_kont_some > div:-moz-any(:nth-last-of-type(1), :nth-last-of-type(3)) {
        display: none;
    }

    /* KAO STO SAM I REKAO, DEFINISACU DA SE JEDAN OD ELEMENATA (KONKRETNO NEKA TO BUDE CTVRTI GRID
    ITEM) SPANUJE, U DVE KOLONE */

    div.gr_kont_some > div:nth-of-type(4) {
        background-color: darkolivegreen;

        grid-column: auto / span 2;     /* OVO JESTE SHORTHAND SA SPECIFICNIM NACINOM DEFINISANJA VREDNOSTI */
                                        /* U GLAVNOM STA MOGU DA UCIM JESTE DA SE ELEMENT SPAN-UJE DVE KOLONE
                                        (U NEKIM OD SLEDECIH md FAJLOVA DETALJNO CU SE POZABAVITI, POMENUTIM
                                        PROPERTIJEM, I NARAVNO ONIM PROPERTIJIMA, CIJI JE ON SHORTHAND) */
    }

</style>

```

****

I NE SAMO DA SAM MOGAO DEFINISATI SPANING JEDNOG ITEME PREKO VISE KOLONA, VEC I SPANNING ITEMA, PREKO VISE REDOVA

**ALI MOGAO SAM DEFINISATI CAK, OD KOJE DO KOJE KOLONE SE ELEMENT PROSTIRE, I OD KOJEG DO KOJEG REDA SE ELEMENT PROSTIRE**

U TU SVRHU KREIRACU GRID, KOJI SE SASTOJI OD 58 ITEMA (ZA STA CU ISKORISTITI JAVASCRIPT)

```JAVASCRIPT

const gridCont = document.createElement('div');
gridCont.classList.add('some_gr_kont');

let tekst = 0;

for(let i =0; i <= 58; i++){
    let gridItem = document.createElement('div');
    gridItem.textContent = `${tekst++}`;
    gridCont.append(gridItem);
}

document.body.append(gridCont);

```

I SADA CU DEFINISATI DA SE JEDAN ITEM (NA PRIMER 28-MI), PROSTIRE OD TRECEG DO SESTOG REDA, I OD DRUGE DO OSME KOLONE (TO PROSTIRANJE, NAIME UKLJUCUJE I TE 'OD DO' REDOVE I KOLONE, ALI O TEME I NE MORAM RAZMISLJATI)

```CSS

div.some_gr_kont {

    display: grid;

    grid-template-columns: repeat(12, 1fr); /* 12 KOLONA, SIROKIH PO 1 FRAGMENT */
}

div.some_gr_kont > div {
    border: olive solid 1px;
    background-color: lemonchiffon;
    font-size: 1.1em;
    margin: 0.4em;
    text-align:center;
    padding: 0.6rem;
}

/* DEFINISEM DA SE 28-I GRID ITEM PROSTIRE PREKO 6 REDOVA I TRI KOLONE */

div.some_gr_kont > div:nth-of-type(28) {
    background-color: darkolivegreen;

    grid-column: 2 / 8 ;    /* OD KOLONE DO KOLONE (UKLJUCUJUCI I NAVEDENE)*/

    grid-row: 3 / 6             /* OD REDA DO REDA (UKLJUCUJUCI I NAVEDENE)*/

    /* MOGU MENJATI OVE POMENUTE VREDNOSTI, KAKO BI SE IGRAO SA NJIMA */
}

```

****