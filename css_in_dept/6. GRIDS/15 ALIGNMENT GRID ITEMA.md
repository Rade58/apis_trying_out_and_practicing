# ALIGNMENT GRID ITEMA

KADA SE DEFINISE ALIGMENT, POTREBNO JE POZNAVATI DVE OSE, PO KOJIMA SE TAJ ALIGMENT DESAVA

NAIME, POSTOJI **INLINE AXIS**, KOJI PREDSTAVLJA ONU OSU, KOJA PRATI PROSTIRANJE KOLONA (JA SAM OVO REKAO KAKO BI UPROSTIO OBJASNJENJE), ILI JE OSA SECE KOLONE POD PRAVIM UGLOM; DAKLE, TA OSA BI KADA POSMATRAM ELEMENT DISPLAYED AS GRID, BILA HORIZONTALA

I POSTOJI **BLOCK AXIS**, KOJA BI ELEMENTU, KOJI JE DISPLAYED AS GRID, SEKLA PO D PRAVIM UGLOM, GRID-OVE REDOVE

## PROPERTIES

PROPERTIJI, KOJI SE DEFINISU NA CONTAINER-U (GRID-U)

- justify-items

- align-items

- place-items (SHORTHAND ZA DVA PREDHODNO POMENUTA)

- justify-content

- align-content

PROPERTIJI KOJI SE DEFINISU NA GRID ITEM-IMA

- justify-self

- align-self

****
****

## ALIGNMENT ITEM-A, PO INLINE OSI (justify-items PROPERTI)

KADA POSMATRAM CONTAINER, DISPLAYED AS GRID, I KADA JE WRITING MODE PO DEFAULTU, HORIZONTLAN, I OD LEVE KA DESNOJ STRANI; INLINE OSA SE PROSTIRE HORIZONTALNO

I U SUSTINI OVAJ PROPERTI, U SLUCAJU GRIDA ALIGNUJE, SVAKI ITEME, PO DEFINISANIM PRAVILIM, PO TOJ OSI

ESTELLE, KAZE DA OVO, GOTOVO NIKADA NIJE KORISTILA

> THIS STUFF IS REALY UGLY, AND I NEVER USE, THIS PROPERTY, BECAUSE I NEVER NEEDED TO DO THIS, BECAUSE I DON'T FIND IT ATTRACTIVE

I JA SE SNJENOM RECENICOM U POTPUNOSTI SLAZEM, ALI JE NEOPHODNO RAZUMETI DA JE ONO STO SE POSTIZE OVIM PROPERTIJEM, ZAISTA DOABLE

A [MOGUCE VREDNOSTI](https://estelle.github.io/cssmastery/grid/#slide36) SU:

normal | stretch (DEFAULT) | baseline | start |  end | center | flex-end | flex-start | **legacy** | **safe** | **unsafe** | left | right | center | self-end | self-start | start | stretch | unset

> IMAJ NA UMU DA CE KORISCENJE, OVOG PROPERTIJA, IZMENITI SIRINU (VELICINU) ITEM-A

**PREDHODNA TRI PROPERTIJA KOJA ZAM GORE PODEBLJAO BI TREBLOA OBJASNITI, JER PREDSTAVLJAJU NOVINU, ALI JA SADA ZA TO NEMAM VREMENA**

JA SAM JEDINO MOGAO SAGLEDATI, OVAJ ALIGNMENT, PUTEM PRIMERA

KORISTIO SAM auto-fill VREDNOST, ZA DEFINICIJU KOLONA, SAMO ZATO DA BIH IMAO, TAJ EFEKAT 'MAKE BEILEVE WRAPPINGA', ODNOSN ODA BI PRI ODREDJENIM SIRINAMA GRIDA IMAO RAZLICITI BROJ KOLONA I REDOVA, I TIME, BOLJE VIDEO ALIGNMENT

```HTML
<div class="gridachy">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>
        Item 2<br>Dodatni tekst
    </div>
    <div>Item 4</div>
    <div>
        Item 5<br>Dodatni tekst<br>Jos teksta
    </div>
    <div>Item 6</div>
    <div>Item 7</div>
    <div>Item 8</div>
    <div>Item 9</div>
    <div>Item 10</div>
</div>

<style>
    div.gridachy {
        padding: 18px;
        border: olive solid 1px;
        height: 50vh;

        display: grid;
        grid-gap: 4px;
        grid-template-columns: repeat(auto-fill, 200px);

        justify-items: center; /* MENJAJ OVU VREDNOSTI, SA ONIM GORE NAVEDENIM, PA VIDI, KAKAV CE TO EFEKAT DATI U
                                POGLEDU ALIGNMENT-A, PO INLINE OSI */
    }

    div.gridachy div {
        padding: 10px;
        border: 1px currentColor solid;
    }
</style>
```

## ALIGNMENT ITEM-A, PO BLOCK OSI (align-items PROPERTI)

KADA POSMATRAM CONTAINER, DISPLAYED AS GRID, I KADA JE WRITING MODE PO DEFAULTU, HORIZONTLAN, I OD LEVE KA DESNOJ STRANI; BLOCK OSA SE PROSTIRE VERTIKALNO

MOGUCE VREDNOSTI:

baseline | center | end | flex-end | flex-start | left | normal | right | safe | self-end | self-start | start | stretch | unsafe

```HTML
<div class="gridachy">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>
        Item 2<br>Dodatni tekst
    </div>
    <div>Item 4</div>
    <div>
        Item 5<br>Dodatni tekst<br>Jos teksta
    </div>
    <div>Item 6</div>
    <div>Item 7</div>
    <div>Item 8</div>
    <div>Item 9</div>
    <div>Item 10</div>
</div>

<style>
    div.gridachy {
        padding: 18px;
        border: olive solid 1px;
        height: 50vh;

        display: grid;
        grid-gap: 4px;
        grid-template-columns: repeat(auto-fill, 200px);

        justify-items: center;

        align-items: end; /* IGRAJ SE SA VREDNOSTIMA, OVOG PROPERTIJA */
    }

    div.gridachy div {
        padding: 10px;
        border: 1px currentColor solid;
    }
</style>
```

## place-items PROPERTI, ZAMENJUJE UPOTREBU, PREDHODNO DCA POMENUTA PROPERTIJA

```HTML
<div class="gridachy">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>
        Item 2<br>Dodatni tekst<br>Jos teksta<br>Jos teksta
    </div>
    <div>Item 4</div>
    <div>
        Item 5<br>Dodatni tekst<br>Jos teksta<br>Jos teksta<br>Jos teksta<br>Jos nekog onog blah bla teksta<br>Jos teksta
    </div>
    <div>Item 6</div>
    <div>Item 7</div>
    <div>Item 8</div>
    <div>Item 9</div>
    <div>Item 10</div>
</div>

<style>
    div.gridachy {
        padding: 18px;
        border: olive solid 1px;
        height: 50vh;

        display: grid;
        grid-gap: 4px;
        grid-template-columns: repeat(auto-fill, 200px);

        /* DAKLE OVOJ */
        /*  justify-items: center;  
            align-items: end;           */
        /* SE MOZE ZAMENITI OVIM:       */

        place-items end center;         /* DAKLE , PRVO SE DEFINISE VREDNOST ZA align-items, PA onda za justify-items */


        /* AKO MU SE ZADA SAMO JEDNA VREDNOST, TA VREDNOST CE BITI PRIMENJEN I ZA align-items, I ZA justify-items */

        place-items: flex-end;
    }

    div.gridachy div {
        padding: 10px;
        border: 1px currentColor solid;
    }
</style>
```

## DODATNA ZAPAZANJA

DAKLE, ESTELLE JE REKLA DA OVO NE KORISTI

ALI KADA BIH MOGAO KORISTITI, POMENUTI ALIGNMENT GRID ITEMA

PA NA PRIMER, ONAJ EXAMPLE U KOJEM DUGME TREBA DA BUDE POSTAVLJENO NA DNU, TADA BIH KORISTIO flex-end VREDNOST
