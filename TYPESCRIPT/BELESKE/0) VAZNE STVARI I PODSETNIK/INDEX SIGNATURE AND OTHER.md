# OVDE ZELIM DA SE POZABAVIM INDEX SIGNATURE-OM, ALI TAKODJE I DA PREGLEDAM OSOBINE ARRAY-EVA I TUPLE-OVA

POSMATRAJ PRIMER

```typescript
// **           NARAVNO ZNAS ZA ARRAY

let arr: (number | (string | number)[])[];

arr = [];

arr.push(1, 4, 8, ["blah"])

//////////////////////////////

//**             ZNAS I ZA TUPLE

let tup: [string, number];

tup = ["nesto", 8];         // KADA ASSIGNUJES, TREBAS ZNATI DA RASPORED JESTE VAZAN

tup.push(8)         // I TREBAS ZNATI DA MOZES UPOTREBITI METODE Array-EVOG PROTOTIPA
                    // ALI MORAS KORISTITI VREDNSOTI SAMO DEFINISANOG TYPE-A 
tup.shift();

// NAKO NSTO SAM UPOTREBIO METODE, U JAVASCRIPTU CE OVO NA KRAJU BITI       [8, 8]

// ALI PREDPOSTAVLJAM DA SE METODE Array-EVOG PROTOTIPA, MOZDA NE BI TREBALE KORISTITI SA TUPLE-OM
//////////////////////////////

// ALI NARAVNO NEKADA TUPLE MOZE DA SE PODUDARA SA ARRAY TYPE-OM I OBRNUTO
arr.push(tup)

/////////////////////////////////////////

// **           ZNAS I ZA DESCRIBING INDEX SIGNATURES-A, U INTERFACE-U 

interface IndSig {
    [index: number]: (string | number)[]
}

let indexedOb1: IndSig;
let indexedOb2: IndSig; 

indexedOb1 = {};            // OBRATI PAZNJU NA OVO
indexedOb2 = [];            // MOZES DA ASSIGN-UJES I CURLY (! ZABRINJAVAJUCE) 
                            // I SQUARE BRACKETS

// **** ovo nije sporno

indexedOb1[8] = ["blah", 88]

// !!!!! ali ovo za mene jeste sporno jer je dozvoljeno
// !!!!! UPOTREBA INDEXED SIGNATURE-A NA {} NE DAJE NIKAKV ERROR
// !!!!! PA CAK I NEMA NIKAKVE VEZE ZA TYPING
// !!!!  RACUNAO SAM DA CE BITI ERROR I ZA INDEX, I ZA ASSIGNED BVALUE (ALI NEMA ERROR-A NIGDE)
indexedOb2["blah"] = "nesto"

// **         ALI MORAS ZNATI DA OBJEKTI DESCRIBED SA  

// **       VODI RACUNA DA OBJEKTI DESCRIBED SA INDEX SIGNATURE-OM NE NASLEDJUJ UMETODE
// **       OD ARRAY-A

// ZATO CES OVDE IAMTI ERROR

// JER METODE ARRAY-EVOG PROTOTYPA SE NE NASLEDJU

indexedOb1.push         // ! --->   ERROR
```
