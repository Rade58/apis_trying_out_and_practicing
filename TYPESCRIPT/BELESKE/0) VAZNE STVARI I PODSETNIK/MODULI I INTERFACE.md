# OVDE CU DATI SAMO NEKE INFORMACIJE O MODULIMA U TYPESCRIPT-U; ALI O TOME KAKO MOGU KORISTITI NEKE SAMO TYPESCRIPT FEATURE-E (NA PRIMER Interface), KAO MODULE

PRVO DA KAZEM DA SAM JA TYPESCRIPT ZA PLAYING AROUND, KORISTIO KAO Node.js CODE

EVO KAK OSAM KORISTIO TYPESCRIPT COMPILER

- *tsc src/blah.ts --outDir output_blah --module commonjs --target ES2017 --watch*

**U SUSTINI ENTYY POINT MI JE BIO src/blah.ts** (VIDI SE IZ GORNJIH CLI KOMANDI)

**JAVASCRIPT JE BIO OUTPUTED U output_blah FOLDER-U** (VIDI SE IZ GORNJIH CLI KOMANDI)

```linux
├───output_blah
│       blah.js (PORED OVOG FAJLA BICE I GENERISANI MODULI U OVOM FOLDER-U)
│
│
│
│
└───src
        blah.ts (OVO JE ENTRY POINT)
        
        (OVO DOLE SU MODULI)
        
        Kontrabas.ts
        violine.ts
```

STO SE TICE DEBUGGING-A KORISTIO SAM Node.js NA VEC DOBRO POZNATI NACIN

- *node --inspect --insbect-brk ./output_blah/blah.js* (FAJL KOJI JE TS KOMPAJLER GENERISAO JE blah.js U FOLDERU output_blah, ZATO DEBUGG-UJEM TAJ JAVASCRIPT FAJL)

## :one: INTERFACE NISAM NIKAKO USPEO DA UVEZEM UZ POMOC import(); ON UVEK BIVA 'PRESKOCEN'

OVO SU MODULI:

*src\Kontrabas.ts*

```typescript
export interface Kontrabas {
    br_zica: number;
    ime: string;
    maessage: "neki message"
}
```

*src\violine.ts*

```typescript
// EXPORT-UJEM OVDE JEDAN INTERFEJS
export interface Violina {
    zice: boolean,
    velicina: number,
    ime: "violina"
}

// A OVDE EXPORT-UJEM OBJEKAT, KOJI SAM KREIRAO, POMENUTIM INTERFEJSOM
export let instrument: Violina = {
    zice: false,
    velicina: 48,
    ime: "violina"
};
```

OVO JE CODE ENTRYPOINT-A *src\blah.ts*

```typescript
import {Kontrabas} from './Kontrabas';  // UVOZIM JEDAN INTERFACE 'STATICKIM' IMPORT-OM
                                        // IZ FAJLA src/Kontrabas.ts

async function makeBand(): Promise<{}> {        // OVO NIKAD RANIJE NISAM KORISTIO A DEFINISAO SAM DA POVRATNA VREDNOST
                                                // MORA BITI PROMISE INSTANCA RESOLVED/REJECTED SA OBJEKTOM
    // KORISTICU OVDE 'DINAMICKI' IMPORT
    let moduleViolina = await import('./violine')
    // POKUSAO SAM DA PROCITAM VREDNSOTI UVEZENIH
    // MODULA IZ src/violine.ts
    debugger;
    // NISAM USPEO DA PROCITAM INTERFACE IZ POMENUTOG OBJEKTA, JER IZGLEDA DA NE MOZE BITI UVEZEN
    // JEDIN OJE UVEZEN ONAJ

    // ! DAKLE OVOGA NEMA             moduleViolina.Violina
    // ALI OVOGA IMA        
                    //              moduleViolina.instrument  (OBJEKAT KOJI SAM NAPRAVIO Violina INTERFACE-OM
                    //                                              U FAJLU MODULA)
    let instrument = moduleViolina.instrument;


    // NESMETANO MOGU KORISTITI ONAJ INTERFACE KOJ ISAM UVEZAO STATICKIM IMPORT-OM
    const kontrabas: Kontrabas = {
        br_zica: 58,
        ime: "Neko",
        maessage: "neki message"
    }

    return {
        kontrabas,
        instrument
    };
  
}
  
makeBand()
```
