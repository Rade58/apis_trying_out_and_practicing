# KORISTICU PSEUDO ELEMENTE, CSS COUNTERE I :invalid PSEUDO KLASU, KAKO BI, SAMIM CSS-OM RENDER-OVAO NA STRANICI BROJ NEVALIDNIH UNOSA (OVO NIJE NESTO STO SE TREBA KORISTITI U PRODUCTION-U, ALI POKAZUJE SMAGU CSS-A)

```HTML

<ul class="blahKlasa">
    <li><input type="number" min="5" max="7"></li>
    <li><input type="number" min="5" max="7"></li>
    <li><input type="number" min="5" max="7"></li>
    <li><input type="email"></li>
</ul>
<p></p>

```

```CSS

    /* KREIRANJE COUNTERA ODNOSNO, NJEGOVO RESETOVANJE */
    body {
        counter-reset: brojInvalida;
    }

    /* INKREMENTIRANJE COUNTER-A, KADA ELEMENT POSTANE NEVALIDAN*/
    ul.blahKlasa :invalid {
        background-color: tomato;
        counter-increment: brojInvalida;
    }

    /* KORISCENJE PSEUDO ELEMENTA, PARAGRAFA, KAKO BI PRIKAZAO KOLIKO IMA INVALID INPUT ELEMENATA */

    ul.blahKlasa + p::before {
        content: 'Imas' counter(brojInvalida) 'nevalidnih unosa';
    }

```

ZAPAMTI, PPARAGRAF KOJI KORISTI COUNTER, MORA BITI POSTAVLJEN U DOM-U, POSLE ELEMENATA KOJI MENJAJU COUNTER (MORAM JOS PROVERITI ZASTO, PREDPOSTAVLJAM ZBOG CASCADE-A)