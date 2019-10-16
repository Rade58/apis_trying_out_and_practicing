# INFERED TYPE

NISAM DOVOLJNO PAZNJE OBRATIO NA OVAKO NESTO

**UVEK KADA DODELIS VREDNOST NEKOJ VARIJABLI, A DA EKSPLICITNO NISI ZADAO TYPE, TA VARIJABLA CE BITY TYPED IMPLICITNO, ODNONO PODRAZUMEVACE SE, ODNOSNO INFER-OVACE JOS JE TYPE**

EVO POSMATRAJ PRIMER

```typescript
// EVO POSMATRAJ OVE DVE VARIJABLE, KOJE NISI STRIKNO TYPEOVAO

let a = 8;

let ob1 = {no: 8, person: "Personson"}

//  AKO HOVERUJE S PREKO NJIH MOZES PRIMETITI SLEDECE

// ****             a       JE INFERLY TYPED KAO         number

// ****             ob1     JE INFERLY TYPED KAO       {no: number, person: string}     (OVO JE INTERFACE
```

## ALI OBRATI PAZNJU KADA ASSIGN-UJES OBJECT LITERAL

```typescript
let nestoFoo: {id: string};         // JASNO JE DA JE VARIJABLA DESCRIBED SA JEDNIM INTERFACE-OM
                                    // I TO STRIKTNO (JA SAM ZADAO, I NISTA NIJE INFERED)

// DRUGA VARIJABLA JE DESCRIBED INTERFACE-OM, KOJI JE DRUGACIJI
// DVA INTERFACE-A SU OVERLAPPING

let nestoBar: {id: string, name: string} = {id: "48", name: "neko"};

// I ZATO STO SU DVA TYPE-A OVERALAPPING JA MOGU URADITI OVAKO NESTO

nestoFoo = nestoBar // **** OVO JE SASVIM VALIDNO, PREDPOSTAVLJAM ZATO STO JE REC O DVA OVERALPPING TYPE

// ****  I OVAKO NESTO BI BILO TACNO

let nestoBaz = {id: "number 46", age: 48}; // OVO IMA **INFERED** TYPE KAO   {id: string, age: number}

// **** I ZATO JE DOZVOLJENO SLEDECE

nestoFoo = nestoBaz;            //  ****     NOVA ASSIGNED VREDNSOT JE TYPE KOJI JE OVERLAPPING SA
                                // ****         TYPE-OM VARIJABLE nestoFoo
                                // *** IAKO JE nestoBaz ONFERED TYPE (TO NEMA NIKAKVE VEZE, JER JE 
                                // ONO IPAK TYPED INFERED ILI EKSPLICITNO)

// !!!!!!    ALI ZAPMATI DA NE MOZES RADITI OVAKO NESTO      !!!!!!

nestoFoo = {id: "248", name: "foo person"}         // !!!!   -->       ERROR

// !!!! ZASTO JE GORE DOSLO DO ERROR-A?

// !!!! GORE CE BITI PODVUCENO name

// !!!!         USTVARI IMACU OVKAV MESSAGE ON HOVER:       

//  !                       Type '{ id: string; name: string; }' is not assignable to type '{ id: string; }'
//  !                       Object literal may only specify known properties, and 'name' does not exist in type '{ id: string; }'


// !!!! OBJEKAT KOJEG SAM DODELIO NIJE IMAO VREMENA DA SE TYPE-UJE
// !!!! ON DAKLE PREDSTAVLJA            **   OBJECT LITERAL   **

```

