# DODATNE INFORMACIJE O GENERICS-U

## :one: TYPE ALIASES, KAO I INTERFACE MOZE KORISITIT GENERIC

EVO PRIMERA

```typescript

type dictionary1<T = any> = {  // OVDE IMAM         DEFAULT TYPE ARGUMENT
    [name: string]: T
}

interface Dictionary2<T> {            // OVDE NISAM ZELEO DA ZADAM DEFAULT TYPE ARGUMENT

    [name: string]: T

}


// KADA VRSIS TYPE ANNOTATION

let diktOb2: Dictionary2<string> = {} // IMAJ NA UMU DA OVDE MORAS PROSLEDITI
                                                                        // TYPE ARGUMENT

let diktOb1: dictionary1 = {};      // OVDE NE MORAS

// I ZATO MOZES ZADATI ANY VALUE
diktOb1.blah = ["blah"]
```
