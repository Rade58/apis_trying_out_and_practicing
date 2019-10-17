# NEKA ZAPAZANJA O INTERFACE-OVIMA

## :one: OBJEKTI DESCRIBED SA NEKIM INTERFACE-OM, NE NASLEDJUJU METODE Object-OVOG PROTOTIPA, ALI SE MOGU, NESMETANO KORISTITI SA for in LOOPS

EVO PRIMER-A

```typescript
interface Diktejsn {
    [name: string]: {hrenovka: string, virsla: string}
}

let kobaja: Diktejsn = {
    kobas: {hrenovka: "sa renom", virsla: "tandemska"},
    tetreb: {hrenovka: "sa senfom", virsla: "genclovana"}
};

// NESMETANO MOGU KORISTITI, DICTIONARY OBJEKAT SA for in LOOP-OM
for(let name in kobaja){
    console.log(kobaja[name]["hrenovka"])
}

// MEDJUTIM OBJEKTI DESCRIBED SA INTERDACEOM NE NASLEDJUJU METODE Object-OVOG PROTOTIPA
// ODNOSNO NISU PROVIDED KROZ TYPESCRIPT

kobaja.hasOwnProperty       // !!!!   OVO NECE PROUZROKOVATI ERROR ALI NECU
                            // !!!!   IMATI SUGESTIJE OD TYPESCRIPTA, DA JE TO ZISTA METOD, KOJU MOGU KORISTITI

//  ALI MOGU KORISTITI      as      ZA POTREBU TOGA, OVAKO

(kobaja as Object).hasOwnProperty("tetreb")         // -->      true


```

## :two: AKO ZELIM DA MOJ OBJEKAT BUDE DESCRIBED SA Object, UMESTO DA KORISTIM as, MOGAO BIH DODATI TAKAV TYPING

```typescript
interface Diktejsn1 {
    [name: string]: {hrenovka: string, virsla: string}
}

let kobaja1: Diktejsn1 & Object = {                     // OBRATI PAZNJU SADA JE TYPE 
                                                        // VARIJABLE TAKODJEI       Object  INTERFACE
    kobas: {hrenovka: "sa renom", virsla: "tandemska"},
    tetreb: {hrenovka: "sa senfom", virsla: "genclovana"}
};

kobaja1.propertyIsEnumerable("kobas")   // MOGU NESMETANO DA PRISTUPAM PROPERTIJIMA I METODAMA
                                        // Object-OVOG PROTOTIPA; NARAVNO, KOJE MI SUGERISE
                                        // TYPESCRIPT

```