# OBJECT TYPES AND INTERFACES

### OBJECT TYPES, JA MOGU DEFINISATI UZ POMOC CULY BRACKET-A I KORISCENJEM IMENA PROPERTIJA

```typescript
const ob: {amount: number; fruit: string} = {           // DAKLE DEFINISEM key/type OVDE
                                                        // I KAO STO VIDIS MOZES IH RAZDVAJATI SA 
                                                        // SEMICOLON
                            // AKO MI SE OCI UMORE POSMATRAJUCI CULY BRACKETE, TAJ SEMICOLON JE JOS 
                            // JEDAN PODSETNIK DA NE DEFINISEM VREDNSOTI PROPERTIJA, VEC NJIHOVE 
                            // TIPOVE

    amount: 48,

    fruit: "appple"

};
```

### PO DEFAULTU SVI PROPERTIJI SU MANDATORY

TAKO DA BI TI SLEDECE IZBACILO ERROR

```typescript
const ob: {amount: number; fruit: string} = {
    amount: 48,
    // fruit: "appple"
};
// ERROR JE TAKAV DA GOVORI DA fruit IS MISSING


ob = {              // I DA SAM 
    amount: 60
}



```

A I OVAKO NESTO BI DALO ERROR

```typescript
const ob: {amount: number; fruit: string} = {
    amount: 48,
    fruit: "appple"
};

ob = {              // ----> ERROR 
    amount: 60
}
```

### MOGUCE JE TYPE NAPRAVITI DA BUDE OPTIONAL I TO NIJE LOSA STVAR

TADA DODAJEM ZNAK PITANJA PRI DEFINISANJU TIPOVA

```typescript

const ob: {amount: number; fruit?: string} = {          // DODAO SI ZNAK PITANJA (?) KOD DEFINISANJA 
                                                        // TYPE-A ZA friut
                                                        // ZAPAMTI DA UPITNIK IDE PRE   COLON-A
    amount: 48,
    // fruit: "appple"              // NECE NBITI NIKAKVOG ERROR-A, AKO IZOSTAVIS fruit
};

//  ALI TO NE ZNACI DA CE S MOZI OVO URADITI
// OVO CE I DALJE IZBACITI ERROR, JER SI IZOSTAVIO fruit
ob = {
    amount: 60
}

// DAKLE IZGLEDA DA TA OPCIONOST, JEDINO FUNKCIONISE PRI INICIJALIZACIJI
```

A NA PRIMER, KADA BI POKUSAO DA DODAM NOVI PROPERTI, BIO BIH BUSTED

```typescript
const ob: {amount: number; fruit?: string} = {
    amount: 48,
    // fruit: "appple",     // OVO SAM DAKLE MOGAO STAVIT ILI IZOSTAVITI I SVE JE U REDU

    sorta: "jonatan"        // ----> A OVO JE SIGURAN ERROR
};
```

## INTERFACES

INTERFACE-OVIMA CU SE PRILICNO DETALJNO POZABAVITI, ALI NE OVDE

OVDE CU IH SAMO POKAZATI

```typescript
interface Vocnjak: {        // ONO NA STA ME OVO PODSECA JESTE NA KLASU ALI ONA NIJE TO
                            // JER U TYPESCRIPTU POSTOJE I KLASE
    amount: number;
    fruit?: string;
}


let jabucnjak: Vocnjak = {
    amount: 58;
    sorta: "ajdared"            // OVO MI JE SASVI MDOZVOLJENO KOD INTERFEJSA
}

```

O INTERFACE-U TREBAM RAZMISLJATI KAO O IMENU STRUKTURE, KOJ UZELIM DA KREIRAM

POSTOJE DRUGE STVARI, KOJE S INTERFEJSOM MOGU URADITI (KAO STO JE RAD S FUNKCIJAMA), A ZA SADA MOZES O INTERFACE-U RAZMISLATI, SAMO U POGLEDU TYPE-OVA

INTERFWCE-OVI SE, TAKODJE MOGU EXPORT/IMPORT-OVATI IZ/U MODULA/E
