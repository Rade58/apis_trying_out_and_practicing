# GRID VS FLEXBOX

PRE NEGO STO SE, DETALJNO POZABAVIM GRIDOM, POZBAVICU SE FLEXBOX-OM

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

AKO POGLEDAM GORNJI PRIMER (), VIDI SE DA SAM ITEM-IMA ZADAO *flex-basis* OD 250px

I ITEMI, MOGU DA RASTU, I DA SE SKUPLJAJU, ZAVISNO OD POVECANJA/SMANJENJA VELICINE VIEWPORTA

VIDIM ISTO MARGINU OD 10 PIKSELA OKO ITEM-A (TAKO DA IZGLEDA DA ITEMI IMALU NICE LITTLE GUTTER IN BETWEEN THEM)

>>>> MEDJUTIM SADA CU NESTO PROMENITI

DEFINISACU display: none NA JEDNOM OD ITEM-A