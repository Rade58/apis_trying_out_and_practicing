# UOPSTENO O TYPE-OVIMA

**MOZDA SAM PREVISE OVDE OBRACO PAZNJU NA TYPE-OVE, KAO STO SU *string*, *number***

**OVAJ MD FAJL USTVARI MOZE DA PREDSTAVLJA NEKO ISPITIVANJE** 

- INTERSECTION-A I UNION-A

- OVERLAPPING-A

- TYPE SET-OVA

- NAROW AND WIDE TYPES

- TOP AND BOTTOM TYPES

**ALI PRVENSTVENO ZELIM DA VIDIM KAKO SE INTERSECTION TYPE-OVI PONASAJU, ODNOSNO UZIMAJUCI U OBZIR DA SADA POZNAJEM I TOP I BOTTOM TYPE-OVE, ODNOSNO POZNAJEM STA JE TO NARROWER A STA JE WIDER TYPE, ZELIM DA SE POMALO POZABAVIM I PODSETIM INTERSECTION-A, KADA U TYPE SET-U IMA WIDER TYPES KAO STO SU any I unknown**

IMAM DAKLE VREDNOSTI TYPE-OVA RAZDVOJENE SA **|** (TO PREDSTAVLJA INTERSECTION TYPES)

A ONO CIME CU SE JOS BAVITI JESTE I OVAJ OPERATOR **&** (UNION TYPES)

**VERUJEM DA NA PREDHODNA DVA TERMINA (INTERSECTION I UNION) PRVENSTVENO TREBAM KORISTITI KADA GOVORIM O INTERFACE-OVIMA, ALI ZELIM DA VIDIM IMAJU LI ONI IKAKVU ZA MENE LOGICNOST PRI KORISCENJU SA TYPE-OVIMA, KAO STO SU number, string...**

:exclamation::exclamation::exclamation:exclamation::exclamation::exclamation:exclamation::exclamation::exclamation:exclamation::exclamation::exclamation ISTO TAKO ZELEO BIH DA VIDIM STA IZADJE KADA SE OVI OPERTORI (| i &) KORISTE ZAJEDNO :exclamation::exclamation::exclamation:exclamation::exclamation::exclamation:exclamation::exclamation::exclamation

**PRIKAZACU NEKE PRIMERE U KOJIMA KORISTIM ZAJEDNO OVA DVA OPERATORA, ALI *VERUJEM DA SE OVO NE KORISTI JER PREVISE KOMPLIKUJE STVARI***

## :one: DA SE SADA PODSETIM UNION-A, UZ NEKE VEZBE

*KONKRETNO NE VIDIM ZASTO BIH MESAO **&** I **|** ALI HAJDE DA VIDIM STA OD TOGA MOZE NASTATI*

```typescript

type type1 = string & 48;               // OVA DVA TYPE-A NISU OVERLAPPED U BILO KOM SMISLU
                                        // NESTO STO JE string NE MOZE U ISTO VREME BITI I NEKI BROJ
                                        // KONKRETNO NE MOZE BITI 48

                                        // ZATO JE OVO GORE EVALUATED KAO           never     (STO SE VIDI KADA
                                        //                                                             HOVERUJEM)

// EVO GLEDAJ I OVO GDE SAM MESAO & I | OPERATOR

type fooType = string & number | {nesto: string}

// U GORNJEM SLUCAJU            string & number     JE EVALUETED TO never     *****  ( DAKLE STVARNO JE NEMOGUCE 
                                                                            //DA SE OVI TYPE-OVI INTERSECT-UJU, 
                                                                            //STO JE I LOGICNO)

//  A fooType CE NA KRAJU BITI EVALUATED KAO            {nesto: string}


// STO PREDPOSTAVLJAM DA MI NIKAD NECE TREBATI JER TADA VALJDA 'KOMBINUJE' INTERSECTION I UNION (PREDPOSTAVLJAM)

// OVO JE DAKLE UNION TYPE
// IZGLEDA INTERESANTNO, IZ JEDNOG RAZLOGA, JER CE JEDAN PROPERTI EVALUATED KAO     never
// JASNO JE DA CE TYPE KOJI HOLDE-UJE type2 BITI   OBJEKAT, ODNOSNO INTERFACE
type type2 = {blah: string} & {nesto: number} & {nesto: string};

// (1) NIJE SPORAN blah PROPERTI, ON MORA DA BUDE       string

// (2) SPORAN JE        nesto       PROPERTI
// E PA ON JE       never       TYPE-A, ZATO STO NE MOZE U ISTO VREME BITI I number I string

// PREDPOSTAVLJAM DA KADA DEKLARISEM OBJEKAT, KOJI SA Type2 TYPE ANNOTATION-OM,
// !!! ALI POGRESNO PREDPOSTAVLJAM POGRESNO  

let strangeObject: type2 = {

    blah: "ovo je neki error"

    nesto: new Error("blah")        //!! ----> Error        (NIJE ASSIGNABLE TYPE-U       never)

}
// PODSETI JE BOTTOM TYPE-OVA (IMAJ MD FAJL U KOJEM SI PIAO O NJIMA)
// IZ TOGA ZNAS DA BI never JEDINO MOGAO KORISTITI KOD                 "NARROWING EXHAUSTIVELY"

// OVO ME MOZDA ZABRINJAVA ALI, PREDPOSTAVLJAM DA OVAKVO PISANJE NIKAD NECU KORISTITI

type type3 = {nesto: string } & [number, boolean]       // OVAKO NESTO  **  **NIJE** EVALUATED KAO never**

// STVARI SU MI MALO NELOGICNE

// **PREDOSTAVLJAM DA GORNJE NIJE BILO never ,JER JE NIZ, TAKODJE I OBJEKAT** (MOZDA GRESIM)

//  U SUSTINI ONO STO BI NOSILO OVAJ TYPE, USTVARI U ISTO VREME BI TREBALO DA BUDE I TUPLE I OBJEKAT

// U PITANJU SU DAKLE DVA TYPE TUPPLE I U PITANJU JE INTERFACE

// CIM TYPESCRIPT NIJE JAVIO GRESKU ZNACI DA JE GORNJI UNION MOGUC

// NE ZNAM ZASTO JE OVAKO I MOZDA PREVISE KOMPLIKUJEM SITUACIJU, ZATO CU OVDE STATI DA SE POZBAVIM NECIM DRUGIM

```

## :two: TYPE SETS I INTERSECTION TYPES SHOWCASE

```typescript

// DAKLE any I unknown SU OVERLAPPER TYPE-OVI ZA BILO STA

type anything1 = string | any | "nesto";             // OVO JE AUTOMATSKI            any

type anything2 = number | unknown | string;           // OVO JE AUTOMATSKI            unknown

type anything3 = any | unknown | boolean;             // any        CE POBEDITI     unknown   (DAKLE any CE BITI 
                                                                                        // VREDNOST ALIAS-A)
// GORE JASNO MI JE DA POSTOJI INTERSECTION, ALI DA JE TYPE MOST WIDE, I ZATO JE 'BOLO STA', ONO STO SE 
// INTERSECT-UJE SA SVACIM

///////////////////////////////////////////////////////////////////////

// SADA MOGU VIDETI KAK OSE PONASA never

type nesto1 = "blah" | never | 48;                  // EVALUATED KAO            "blah" | 48

// never SE UVEK UKLANJA KADA JE SA NECIM WIDER OD NJEGA

//  DA JE DEFINISAN SAM ON BI BIO PRIHVACEN KAO TYPE, AI SA BILO CIM WIDER OD NJEGA
// DAKLE I never JE TYPE KOJI INTERSECT-UJE SVAKI DRUGI, CISTO NAPOMINJEM DA JE ZATO BILO MOGUCE DA SE IZBACI IZ 
// SETA

/////////////////////////////////////////////////////////////////////////

```

STO SE TICE INTERSECTION-A I INTERFACE-A, TU MI INTERSECTION MOZE BITI NAJVIDLJIVIJI

ZATO GA SE OPET PODSECAM

```typescript

interface HasHouse {
    name: string;
    
    floors: boolean;
    tra: number
}

interface HasLoft {
    name: string;
    garden: boolean;
    blah: number;
}


// GORNJA  DVA INTERFACE KOJI IMAJU

//      - ZAJEDNICKI DEO

//      - RAZLICIT DEO

// POGLEDAJ PRIMER, MADA MISLI MDA INTERCEPTION TREBAS DA POSMATRAS KAO OBICNO OR IZJAVU

type IntersectionTypeBlah = HasHouse | HasLoft;

// MOZE OVAKO

let morgage: IntersectionTypeBlah = {
    name: "blahson",
    garden: true,
    blah: 46
}

// ILI OVAKO

let loan: IntersectionTypeBlah = { 
    name: "ejraldson",
    floors: true,
    tra: 68
}

// DRUGIH MOGUCNOSTI, PORED  POMENUTIH , NEMA
```

STA JE ZAKLUCAK

**KAD BOLJE RAZMISLIM MOGU INTERCEPTION DA POSMATRAM KAO OBICNU OR IZJAVU**

**ODNOSNO SAM OTREBAS DA ZNAS KOJE PROPERTIJE MOZES KOMBINOVATI A KOJE NE MOZES**