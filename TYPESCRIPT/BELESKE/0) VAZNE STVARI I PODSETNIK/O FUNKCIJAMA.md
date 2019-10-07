# OVDE CU OSTAVITI, NEKE DODATNE VAZNE INFORMACIJE O FUNKCIJAMA

## :one: TI NAIME MOZES ZDATI I TYPE ANOTATION DA BUDE FUNKCIJA, A UJEDNO MOZES DEFINISATI I KAKVA JE ZAHTEVANA POVRATNA VREDNOST TE FUNKCIJE

```typescript
function nekaFunkcija(callback: () => string): string {
    // *** KAO STO VIDIS PARAMETAR FUNKCIJE IMA TYPE ANNOTATION       FUNKCIJA,    CIJA JE POVRATNA
    //                                                                              VREDNSOT, USTVARI
                                                                        // string

    // KAO PROVERU OPOMENUTOGA ZADA OSAM DA POZIVANJE CALLBCAKA BUDE POVRATNA VREDNOST
    // BAS ZATO STO JE TYPE ANNOTATION POVRATNE VREDNOSTI ISTO STRING

    return callback();
    // I OVO GORE JE U REDU
}


// !!!!! DA SAM ZADA O NESTO OVAKO IMAO BIH PROBLEM

function nekaFunkcija(callback: () => number): string {
    // KAO STO VIDIS SADA JE PARAMETRU TYPE ANNOTATION TAKAV, DA JE TO FUNKCIJA SA number TYPE-OM 
    // POVRATNE VREDNOSTI

    return callback();      // ! -->>       ERROR   (POVRATNA VREDNOST ARGUMENT FUNKCIJE NIJE string )

}

```
