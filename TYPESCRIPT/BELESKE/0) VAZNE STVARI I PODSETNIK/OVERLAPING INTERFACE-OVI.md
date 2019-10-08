# OVERLAPING INTERFACE-OVI (PRIMER IZ POSLEDNJEG NASLOVA JE MOZDA NAJVAZNIJI)

POCECU OD POSTAVKE, MOG PRIMER-A

```typescript
// INTERFACE-OVI

// OVAJ INTERFACE NE OVERLAPUJE, A NITI JE OVERLAPED BY, U OVOM PRIMERU
interface Mocvara {
    lokvanji: boolean;
    boja: string;
    ime: string
}


// OVAJ INTERFACE JE OVERLAPED BY More
interface Jezero {
    plovnost: boolean;
    brodovi: number;
    ime: string
}

// OVAJ INTERFACEJE OVERALPER, ODNOSNO ON OVERLAPUJE  Jezero
interface More {
    plovnost: boolean;
    brodovi: number;
    ime: string;
    odmaralista: string
    pasos: boolean
}

/////////////////////////////////////
/////////////////////////////////////
// KREIRACU TRI OBJEKTA

// NON OVERLAPING U OVOM PRIMERU
let nekaMocvara: Mocvara = {
    lokvanji: true,
    boja: "zeleno maslinasta",
    ime: "Rit u malom ritu"
} 

// OVERLAPED BY
let nekoJezero: Jezero = {
    plovnost: false,
    brodovi: 16,
    ime: "Balaton"
}

// OVERLAPER
let nekoMore: More = {
    plovnost: true,
    brodovi: 28,
    ime: "Balticko",

    odmaralista: "Eskimsko selo",
    pasos: true
}
///////////////////////////////////////////////
///////////////////////////////////////////////

// ARGUMENT NAMENJEN NON OVERLAPING OBJEKTU
function stampajMocvaru(x: Mocvara){
    console.log(x);
}

// ARGUMENT NAMENJEN ZA OVERLAPED BY TYPE
function stampajJezero(x: Jezero){
    console.log(x)
}

// ARGUMENT NAMENJEN ZA OVERLAPBED TYPE
function stampajMore(x: More){
    console.log(x);
}

//////////////////////////////////////////////
//////////////////////////////////////////////
// Array ZA NON OVERLAPING TYPE
let mocvarniNiz: Mocvara[]; 
// Array ZA OVERLAPPED BY TYPE
let jezerskiNiz: Jezero[];
// ARRAY ZA OVERLAPER TYPE
let morskiNiz: More[];

////////////////////////////////////////////////
////////////////////////////////////////////////
```

## DA SE MALO POZABAVIM TERMINOLOGIJOM

**KADA SU DVA INTERFACE OVERLAPPPING**?

>>> KADA JEDAN INTERFACE, PORED SEBI SVOJIH SVOJSTVENIH DEFINICIJA PROPERTIJA I NJIHOVIH TYPE-OVA,  IMA  SVE, U POTPUNOSTI ISTE DEFINICIJE PROPERTIJE (SA TYPE-OVIMA), KAO NEKI DRUGI INTERFACE, IZUZEV OPCIONIH PROPERTIJA, JER SE ONI NE RACNAJU

TAKVI SU U MOM, GORE PRIKAZANOM PRIMERU, INTERFACEOVI **Jezero** I **More**

- S TIM STO **More** JESTE TAJ SA DODATNIM DEFINICIJAMA TYPE-OVA

JA SAM GA ZATO NAZVAO *OVERLAPPER*

A ZA Jezero SAM REKAO DA JE *OVERALPPED BY*

>> KASNIJE U NASTAVKU PRIMERA, VIDES KAKO JE BITNO KOJE JE INTERFACE *OVERLAPPER*, A KOJI JE *OVERLAPPED BY*

## KADA DEFINISEM DOZVOLJENI TYPE, ZA NEKI OD 'ENTITETA', BILAS TO FUNKCIJA, NIZ, ILI PROPERTI, BICE VAZNO DA LI SU TYPE-OVI OVERLAPING

DA OPET POKAZEM POSTAVKU MOG PRIMERA

```typescript
// INTERFACE-OVI

// OVAJ INTERFACE NE OVERLAPUJE, A NITI JE OVERLAPED BY, U OVOM PRIMERU
interface Mocvara {
    lokvanji: boolean;
    boja: string;
    ime: string
}


// OVAJ INTERFACE JE OVERLAPED BY More
interface Jezero {
    plovnost: boolean;
    brodovi: number;
    ime: string
}

// OVAJ INTERFACEJE OVERALPER, ODNOSNO ON OVERLAPUJE  Jezero
interface More {
    plovnost: boolean;
    brodovi: number;
    ime: string;
    odmaralista: string
    pasos: boolean
}

/////////////////////////////////////
/////////////////////////////////////
// KREIRACU TRI OBJEKTA

// NON OVERLAPING U OVOM PRIMERU
let nekaMocvara: Mocvara = {
    lokvanji: true,
    boja: "zeleno maslinasta",
    ime: "Rit u malom ritu"
} 

// OVERLAPED BY
let nekoJezero: Jezero = {
    plovnost: false,
    brodovi: 16,
    ime: "Balaton"
}

// OVERLAPER
let nekoMore: More = {
    plovnost: true,
    brodovi: 28,
    ime: "Balticko",

    odmaralista: "Eskimsko selo",
    pasos: true
}
///////////////////////////////////////////////
///////////////////////////////////////////////

// ARGUMENT NAMENJEN NON OVERLAPING OBJEKTU
function stampajMocvaru(x: Mocvara){
    console.log(x);
}

// ARGUMENT NAMENJEN ZA OVERLAPED BY TYPE
function stampajJezero(x: Jezero){
    console.log(x)
}

// ARGUMENT NAMENJEN ZA OVERLAPBED TYPE
function stampajMore(x: More){
    console.log(x);
}

//////////////////////////////////////////////
//////////////////////////////////////////////
// Array ZA NON OVERLAPING TYPE
let mocvarniNiz: Mocvara[] = []; 
// Array ZA OVERLAPPED BY TYPE
let jezerskiNiz: Jezero[] = [];
// ARRAY ZA OVERLAPER TYPE
let morskiNiz: More[] = [];

////////////////////////////////////////////////
////////////////////////////////////////////////
```

SADA KONACNO DA UPOTREBIM GORNJE STVARI, NA NACIN, NA KOJI BI MOGAO DA DOKAZEM TVRDNJE

```typescript
// OVO NIJE NIKAKO SPORNO//////
stampajJezero(nekoJezero);
jezerskiNiz.push(nekoJezero);
//////////

// ALI
// **** OVO JE U REDU
stampajJezero(nekoMore);
jezerskiNiz.push(nekoMore);
// ******

// !!!!!!!! A OVO NIJE U REDU
stampajMore(nekoJezero);         //! -->  ERROR
morskiNiz.push(nekoJezero)       //! -->  ERROR
// !!!!!!!!!!!!!!!!!!!!!!!

// A POSTOJI I JEDAN OBJEKAT, CIJI TIP      NIJE DOVOLJNO (INSUFFICIENTLY) OVERRLAPING

// !!! TAKO DA, NA PRIMER OVO NE MOZE
stampajMocvaru(nekoMore)                // !! --> ERROR
mocvarniNiz.push(nekoJezero)            // !! --> ERROR

```

## ALI IMAJ NA UMU DA MOZE POSTOJATI VISE NON MEDJUSOBNO OVERLAPING INTERFACE-OVA; ALI DA ONI ZAJEDNO IMAJU OVERLAPPERA

POGLEDAJ SLEDECA DVA INTERFACE-A

```typescript
// ONI SU DVA NEDOVOLNO (INSUFFICIENTLY) OVERRLAPING TYPE-A

interface Mocvara {
    lokvanji: boolean;
    boja: string;
    ime: string
}

interface Jezero {
    plovnost: boolean;
    brodovi: number;
    ime: string
}
////////////////////////////////////////////////////

// EVO I H I OBJEKTI U SKLADU SA TYPE-OVIMA

let nekaMocvara: Mocvara = {
    lokvanji: true,
    boja: "zeleno maslinasta",
    ime: "Rit u malom ritu"
}

let nekoJezero: Jezero = {
    plovnost: false,
    brodovi: 16,
    ime: "Balaton"
}


// ********************* PORED TA DVA INTERFACE-A I DVA OBJEKTA, JA SAM ODLUCIO DA NAPRAVIM FUNKCIJU

// FUNKCIJA PRIHVATA SLEDECI TYPE           Mocvara & Jezero

function stampajVodu(y: Mocvara & Jezero){
    console.log(y)
}
```

*GORE PRIKAZANA FUNKCIJA JE UPRAVO TAKVA DA ZAHTEVA DA JOJ SE KAO ARGUMENT DODA NEKI OBJEKAT, KOJI IMA TYPE, KOJI JE OVERLAPPER DVEMA DEFINISANIM TYPE-OVIMA*

*ILI IDA TO BUDE NEKI OBJEKAT, KOJI UOPSTE NEMA TYPE ANNOTATION, A KOJI BI BIO TAKAV, DA ON IMPLICITNO IMA TYPE, KOJI JE OVERLAPPER*

JA CU ZADATI JEDAN OBJEKAT, BEZ TYPE ANNOTATION-A, NA KRAJU KRAJEVA NIJE NI BITNO, SAMO JE BITNO DA STVORIM 'OVERRLAPPER-OVSKI' OBJEKAT, UODNSU NA OBJEKTE DEFINISANIH TYPE-OVA, KOJ ISU PRISUTNI U MOM PRIMERU

```typescript
let okeanObjekat = {
    // OVI PROPERTIJI (I TYPEOVI) SU U SKLADU SA JEDNIM INTERFACE-OM (Mocvara)
    lokvanji: false,
    boja: "plavetnilo",

    // OVAJ PROPERTIJI (I TYPE) JE U SKLADU SA OBA POMENUTA INTERFACE-A (Mocvara & Jezero)
    ime: "Atlantik",

    // OVI PROPERTIJI (I TYPEOVI) SU U SKLADU SA DRUGIM INTERFACE-OM (Jezero)
    plovnost: true,
    brodovi: 1280000,

    // OVO SU NJEGOVI, SAMO NJEMU SVOJSTVENI

    br_ajkula: 6800000,
    br_zebri: 0

}


// SADA CU PROSLEDITRI OVAJ OBJEKAT, FUNKCIJI, NA MESTO NJENOG PARAMETRA, CIJI JE TYPE ANNOTATION:
//                                                                              Mocvara & Jezero
// ***************** NEMA NIAKAVE GRESKE, SVE JE U REDU
stampajVodu(okeanObjekat);

// *****************
```

## CISTO DA NAPOMENEM, BEZ OBZIRA NA TYPECHECKING, null CE UVEK BITI VALIDNI TYPE, KOJI OVERLAP-UJE SVE MOGUCE

```typescript
// ***************** NEMA NIAKAVE GRESKE, SVE JE U REDU
stampajVodu(null);

// *****************
```
