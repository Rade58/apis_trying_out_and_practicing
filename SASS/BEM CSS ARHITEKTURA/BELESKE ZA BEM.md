# BEM JE USTVARI SKRACENICA KOJA ZNACI 'BLOCK ELEMENT MODIFIER', I SVAKA OD TE TRI STVARI PREDSTAVLJA 'TIP' KALSE KOAJ SE MOZE ZADATI ELEMENT-U

NECU MNOGO SIRITI PRICU OVDE (LEPSE MI JE DA PRIKAZEM PUTEM CODE EXAMPLA)

AKO HOCES NESTO VISE DA ZNAS O OVOME POGLEDAJ VIDEO SNIMKE I 5. STRANICU [OVIH SLAJDOVA](https://drive.google.com/file/d/0B7LIdu29tPZRVmJVeXpvOHhaUW8/view), KOJE IMAS I NA SVOM GOOGLE DISKU; ZA POCETAK

```html
<!-- POPSMATRAJ OVAJ HTML -->
<div class="textfield textfield--state-validated">
    <label for="first-name" class="textfield__label">
        First Name!
    </label>
    <input name="first-name" type="email" class="textfield__input" />
    <span class="textfield__validation-error">
        Must be two characters or longe!
    </span>
</div>

```

GORE

**BLOK JESTE *.textfield*** (standalone entity, meaningful on its own)

**ELEMENTI JESU *.textfield__label* I *.textfield__input*** (A part of a block that has no standalone meaning, and
is semantically tied to its block)

**MODIFIERS JESU *textfield__validation-error* I *textfield--state-validated***   (A flag on a block or element, used to change
appearance and/or behavior)

DAKLE TREBA SE USVOJITI OVAKAVA KONVERNCIJA NAMING-A KLASA

## DA SUMIRAM

U POGLEDU NAMING-A, ODNOSNO DELOVA IMENA BLOCK-A, ELEMENT-A I MODIFIER-A MOGU RECI SLEDECE

- BLOK DEO SE KORISTITI SAMOSTALNO KADA DEFINISEM STILOVE ZA BLOK (NIJE UPITNO)

- BLOK DEO SE KORISTITI KAO PREFIKS PRI NAMING-U *ELEMENT DELA* (STIM STO POSTOJI SEPARACIJA UZ POMOC DVA __ (**UNDERSCORE-A**))

- BLOK DEO SE KORISTITI KAO PREFIKS PRI NAMING-U *MODIFIER DELA* (STIM STO POSTOJI SEPARACIJA UZ POMOC DVA -- (**DASH-A**))


## NECU VISE PRETERANO GOVORITI, O SVEMU OVOME, SAMO BIH TREBAL ODA ODRADIM VEZBU

PRE SVEG DA PREDSTAVIM HTML U KOJEM JE UPOTREBLJEN BEM NAMING KLASA

```html
<p>
    <button class='btn btn--mode-primary'>
        Buy now! <span class="btn__price">$1.00</span>
    </button>
    <label>Primary</label>
</p>

<p>
    <button class='btn btn--mode-secondary'>
        Buy now! <span class="btn__price">$1.00</span>
    </button>
    <label>Secondary</label>
</p>

<p>
    <button class='btn btn--mode-primary' disabled>
        Buy now! <span class="btn__price">$1.00</span>
    </button>
    <label>Primary Disabled</label>
</p>

<p>
    <button class='btn btn--mode-secondary' disabled>
        Buy now! <span class="btn__price">$1.00</span>
    </button>
    <label>Secondary Disabled</label>
</p>
```

**VEZBU KONKRETNO RADIM SAM ODA BIH PRIKAZAO DA JE MOGUCA SKARACENA SINTAKSA, U SLUCAJU KORISCENJA BEM FILOZOFIJE**

:one: OVO JE DUZI NACIN

**A U KOMENTARIAM CU POKAZTI STA SE TO MOGLO SKRATITI**

```scss
.btn {
    padding: 2px 10px;
    border-style: solid;
    border-width: 1px;
    line-height: 20px;
    border-radius: 2px;

    &.btn--mode-primary {                       // OVO
        background-color:rgb(204, 68, 102);
        color:rgb(255, 255, 255);
    }

    &.btn--mode-primary, &.btn--mode-secondary {        // OVO
        &:disabled {
            opacity: 0.5;
        }
    }

    &.btn--mode-secondary {                         // OVO
        background-color:rgb(237, 188, 200);
    }

    &:disabled {
        > .btn__price {                         // OVO NE MOZE JER SE NE KORISTI SA & (AMPERSANDOM)
            background-color: #aaaaaa;          // JER .btn__price JESTE CHILD
        }
    }

    > .btn__price {                             // OVO NE MOZE JER SE NE KORISTI SA & (AMPERSANDOM)
        padding: 1px 3px;                       // JER .btn__price JESTE CHILD
        background-color:#008000;
        color:#ffffff;
    }
}
```

:two: MOGUC JE I KRACI NACIN NA PRIKAZANIM M,ESTIMA GDE SE KORISTI AMPERSAND

POGLEDAJ

```scss
.btn {
    padding: 2px 10px;
    border-style: solid;
    border-width: 1px;
    line-height: 20px;
    border-radius: 2px;

    &--mode-primary {                       // EVO
        background-color:rgb(204, 68, 102);
        color:rgb(255, 255, 255);
    }

    &--mode-primary, &--mode-secondary {    // EVO
        &:disabled {
            opacity: 0.5;
        }
    }

    &--mode-secondary {                             // EVO
        background-color:rgb(237, 188, 200);
    }

    &:disabled {
        > .btn__price {                         // REKAO SAM DA OVO NE MOZE
            background-color: #aaaaaa;
        }
    }

    > .btn__price {                             // REKAO SAM DA OVO NE MOZE
        padding: 1px 3px;
        background-color:#008000;
        color:#ffffff;
    }
}
```

## CISTO NAPOMINJEM DA KADA POSMATRAS NEKI LIBRARY (NJENE KOMPONENTE), MOZES VIDETI OVAKVU 'NAMIN KONVENCIJU KLASA'

MISLI MDA JE OVO BIO SLUCAJ SA MATERIAL DESIGN LITE BIBLIOTEKOM, KOJ USAM JEDNOM PRILIKOM KORISTIO
