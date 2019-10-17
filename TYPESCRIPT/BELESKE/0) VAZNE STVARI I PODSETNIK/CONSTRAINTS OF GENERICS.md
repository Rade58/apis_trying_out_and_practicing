# OVDE ZELIM DA OBJASNIM *GENERIC CONSTAINTS*, NESTO BOLJE, JER MISLIM DA U LEKCIJI NISAM POCEO OD JEDNOSTAVNOG PRIMERA

:bangbang::bangbang: EVO, ZA POCETAK POGLEDAJ PRIMER KAKO U STVARI **NE MOZES** KORISTITI GENERICS

```typescript
interface Plain {
    model: string;
    wings: boolean
}

function plainFunction<T extends Plain>(flyingStuff: T){

    // OVAKO NESTO NE MOGU DA KORISTIM

    let nekaLokalnaVarijabla: T;

    nekaLokalnaVarijabla = {model: "cesna", wings: false};      // !! ---->        ERROR

    // ERROR GLASI OVAKO

    // !        Type '{ model: string; wings: false; }' is not assignable to type 'T'.
    // !        '{ model: string; wings: false; }' is assignable to the constraint of type 'T',
    // !        but 'T' could be instantiated with a different subtype of constraint 'Plain'

    // OVO IMA SMISLA JER JA ZAISTA JER SE NE ZNA KAKAV JE      T       USTVARI TYPE

    // I NA POMENUTI NACIN, JA NE BIH MOGAO KORISTITI GENERICS
}
```

**DAKLE, U GORNJEM PRIMERU *T* JE, NEDOVOLJNO ODREDJENOG TYPE-A, DA BIH JA MOGAO TAKO *loosely* KORISTITI**

**NAIME TO IMA SMISLA: *"ZASTO USTVARI RADITI NESTO NELOGICNO KAO STO JE ASSIGN-OVANJE VREDNSOT VARIJABLI ODREDJENOG TYPE, KADA ZNAS DA JE TAJ TYPE NEPOZNAT (ON JE TYPE VARIJABLA, ODNOSNO PARAMETAR)"***

**I JOS JEDNA STVAR JE NELOGICNA: *"TYPING NECEGA, SA TYPE PARAMETROM, I UPOTREBA TOG TYPE NA TAKAV NAIN DA JA USTVARI ZELI MDA SE BAVIM **`INTERNAL ENTITETIMA TOG TYPE-A`**"***

STO ME NAVODI DA DAM SLEDECI ZAKLJUCAK

## 