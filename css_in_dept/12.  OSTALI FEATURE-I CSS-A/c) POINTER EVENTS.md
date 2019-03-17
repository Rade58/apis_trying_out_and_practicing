# pointer-events PROPERTI

U SUSTINI, OVO JE PROPERTI, KOJI SLUZI DA SE DISBLE-UJU POINER EVENT-OVI NA NEKOM ELEMENTU

**TO BI U SUSTINI ZNACILO DA**

**KADA SE NA ELEMENTU DEFINISE** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**pointer-events: none;**

**POINTER EVENT-OVI NECE BITI REGISTROVANI NA ELEMENTU VEC CE, SAMO PROLAZITI KROZ ELEMENT**

TO ZNACI DA AKO JE, I JEDAN LISTENER ZAKACEN NA ELEMENTU, ON ZAISTA NECE BITI IZVRSEN

## PROLAZAK POINTER EVENTA KROZ ELEMENT

NAIME, AKO IMAM NEKO CSS POZICIONIRANJE ELEMENATA, I JEDAN ELEMENT PREKRIVA U CELOSTI, DRGI ELEMENT, U NORMALNIM USLOVIMA, NA ONOM PREKRIVENOM ELEMENTU, NECE SE MOCI TRIGGEROVATI MOUSE EVENT-OVI

ALI JA MOGU DISABLE-OVATI POINTER EVENT-OVE NA ONOM ELEMENTU, KOJI JE PREKRIVA DRUGI ELEMENT

TIME POINTER EVENT-OVI PROLAZE KROZ ELEMENT, KOJI PREKRIVA, I ONI SE NE REGISTRUJU NA TOM ELEMENTU KOJI PREKRIVA

CIME JE OMOGUCENO NA ONI PROLAZE KROZ TAJ ELEMENT I DOLAZE DO ONOG ELEMENTA, KOJI JE ISPOD, I TAM OSE TRIGGERUJU

****

POKAZACU TO PUTEM PRIMERA:

```HTML
<div class="cont_fruit">
    <div class="tomato"></div>
    <div class="olive"></div>
</div>

<style>

    div.cont_fruit {
        border: currentColor solid 2px;
        width: 60vw;
        height: 38vw;

        position: relative;
    }

    div.cont_fruit div {
        height: 100%;
        width: 100%;
    }

    div.cont_fruit div.tomato {
        background-color: tomato;
    }

    div.cont_fruit div.olive {
        background-color: olive;

        /* olive CE PREKRIVATI tomato PO OVAKVIM POSTAVKAMA POZICIONIRANJA */
        position: absolute;
        top: 0;
        left: 0;

        /* ALI MU DISABLE-UJEM POINTER EVENT-OVE */
        pointer-events: none;
    }

</style>

<script>
    const fruits = document.querySelector('div.cont_fruit');
    const tomato = fruits.querySelector('div.tomato');
    const olive = fruits.querySelector('div.olive');

    // mousedown EVENT SE NECE TRIGGER-OVATI NA olive ELEMENTU, ZATO STO SU ZA TAJ ELEMENT
    // POINTER EVENT-OVI DISABLED
    // STO ZNACI DA SE ZAKACENI HANDLER NECE EXECUTE-OVATI
    olive.addEventListener('mousedown', (ev) => {
        console.log('OLIVE is a fruit!');
    }, false);


    // mousedown CE SE TRIGGER-OVATI NA NA tomato ELEMENTU, KOJI SE NALAZI ISPOD
    // I IZVRSICE SE ZAKACENI HANDLER
    tomato.addEventListener('mousedown', (ev) => {
        console.log('TOMATO is a fruit!');
    }, false);

</script>
```

****

OVDE CU OSTAVITI I [ESTELL-IN SLAJD, VEZAN ZA OVU TEMU](https://estelle.github.io/cssmastery/other/#slide32)