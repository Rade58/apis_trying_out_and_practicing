# IGRAJ SE SA SLEDECIM PRIMERIMA

## POKUSAJ DA SLEDECEM PRIMERU RESIS, ANOYING (ILI ZANIMLIVO) DELIMICNO PREKRIVANJE JEDNOG ELEMENTA PREKO DRUGOG (HINT: PROBLEM NIJE U GENERATED CONTENT-U, JOS JEDAN HINT: PADDING)

```HTML

<div class="gri">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>

<style>

    div.gri {
        counter-reset: itemText;
    }

    div.gri > span::before {
        counter-increment: itemText;
        content: counter(itemText);

        background-color: pink;
        border: 1px solid currentColor;
        font-size: 1.2em;
        padding: 1.2em;
    }

</style>


```
