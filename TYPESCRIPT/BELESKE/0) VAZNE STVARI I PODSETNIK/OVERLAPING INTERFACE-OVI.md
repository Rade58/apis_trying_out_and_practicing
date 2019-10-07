# OVERLAPING INTERFACE-OVI

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
let mocvarniNiz: Mocvara[]; 
// Array ZA OVERLAPPED BY TYPE
let jezerskiNiz: Jezero[];
// ARRAY ZA OVERLAPER TYPE
let morskiNiz: More[];

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
