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

## ALI OVAJ as OPERATOR SE MOZE KORISTITI I NA DRUGACIJI NACIN, ALI TO ZAHTEVA JOS POZNAVANJA INTERFACE-A, USTVARI POZNAVANJA, NA KOJE JOS NACINE JA MOGU KORISTITI INTERFACE

OBJASNICU KROZ PRIMER

```typescript
interface Pomorandza {
    kora: boolean;
    boja: string;
    tezina?: number
}

// OVO SLEDECA DEKLARACIJA I INICIJALIZACIJA
// U SUSTINI ZNACI
//                    *   DA JE TYPE, ZA VARIJABLU, USTVARI NIZ
//                    *   ALI TO JE NIZ CIJ ICLANOVI MORAJ UDA BUDU OBJEKTI, KOJI SU U SKLADU SA ZADATIM INTERFEJSOM

let nerancha: Pomorandza[] = [];            // NE MORAM DA INICIJALIZUJEM SA NIZOM, KOJI CE VEC IMANI OBJEKTE
                                            // U SKLADU SA ZADATIM INTERFEJSOM (STO MI JE MALO CUDNO)
                                            // ALI U OSTALOM KADA BOLJE RAZMISLIM, ZASTO NE BI BIO DOZVOLJEN
                                            // EMPTY ARRAY BIL OCEGA

// DAKLE OVO JE DOZVOLJENO, JER SU, SVI PUSHED OBJEKTI U SKLADU SA INTERFACE-OM, KOJI JE ANNOTATED TYPE ZA SVAKI
// CLAN OVOG NIZA
nerancha.push(
    {kora: true, boja: "nendzarasta"},
    {kora: false, boja: "boja narandze", tezina: 58},
    {kora: true, boja: "trula nerandzasta"}
)

// ! ALI PVO BI PROUZROKOVALO ERROR
// (A I SAM TYPESCRIPT HOVERING-OM TO CE MI  IRECI, A RECI CE MI I KOJI KOREKTAN TYPE TREBA M KORISTITI)
nerancha.push({specificni_pritisak: 64});           // !  ---->      ERROR
```

**SADA KADA SAM VIDEO GORNJI PRIMER TREBAO BIH DA ZNAM DA JA MOGU KORISTITI I *as* OPERATOR**

```typescript
let pomodoro = [] as Pomorandza[];

// * KOREKTNO
pomodoro.push({kora: true, boja: "nendzarasta"})

// ! ERROR
pomodoro.push({specificni_pritisak: 64});               // ----> ERROR
```

**NARAVNO JA NEISAM MORAO KORISTITI INTERFACE, KAO TYPE, TO PROVE MY POINT, MOGAO SAM UMESTO NJEGA UGORNJIM PRIMERIMA KORISTITI I NEKI DRUGI TYPE, KAO STO JE number IL Istring**

## ALI UZ POMOC as OPERATORA, MOZE SE KREIRATI POTPUNO NOVI OBJEKAT, ILI POTPUNO NOVI NIZ; ODNOSNO OVAJ OPERATOR MOZE SLUZITI I ZA 'EXTAHOVANJE' TACNO ONIH VREDNOSTI, KOJE JA ZELIM DA UZMEM, ODNONO KOJE SU U SKLADU SA NEKIM TYPE-OM, UKLJUCUJUCI I INTERFACE

**MOZDA JE NA KRAJU KRAJEVA I ZA OVO as NAMENJEN** (SAMO PREDPOSTAVLJA MDA JE TAKO)