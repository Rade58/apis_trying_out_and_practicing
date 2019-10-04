# OVO MOZDA SPOMINJEM OVDE BEZ POTREBE JER CU SE POSEBNO POZABAVITI SVIM FEATURE-IMA INTERFACE, ALI ZELIM DA OBJASNIM DA SE INTERFACE MOZE KORISTITI NA DRUGACIJI NACIN, UPOTREBOM as OPERATORA

NECU DAVATI DODATNA OBJASNJENJA, POGLEDAJ CODE I KOMENTARE

```typescript
// IMAM JEDAN INTERFACE, ODNOSNO TYPE OBJEKTA
interface Konj {
    rasa: string;
    starost: number;
    ime?: string;
    broj_zuba?: number 
}

// OVO JE U REDU
const zebra: Konj = {
    rasa: "sarena",
    starost: 48,
    ime: "Zebronja"
};

/////////////////////////////////////////////////////////////////////
// OVO CE PROUZROKOVATI           ERROR
const magarac: Konj = {
    rasa: "tovarna"
}

magarac.starost = 128;        // ! I OVO ISTO NIJE MOGUCE

/////////////////////////////////////////////////////////////////////
// * ALI JA ZELIMDA BUDE MOGUCE

// JA MOGU RESITI, POMENUTI PROBLEM, TAK OSTO BI
// INICIJALIZOVAO OBJEKAT UZ POMOC
//                                          as         OPERATORA

// * OVO CE DAKLE BITI KOREKTNO

const mazga = {} as Konj;

// * SADA MO MOGU DEFINISATI BILO KOJI PROPERTI, KOJI JE U SKALDU SA Konj INTERFACE-OM

mazga.broj_zuba = 228;
mazga.rasa = "tovarna";
mazga.ime = "Mazgalo";
mazga.starost = 148;
```
