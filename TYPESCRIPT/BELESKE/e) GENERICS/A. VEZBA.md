# VEZBA ZA GENERICS

[POSTAVKU VEZBE MOSES VIDETI NA STRANICI 23 SLAJDOVA](https://drive.google.com/file/d/170oHzpLNeprUa-TMmOAnSU4caEFDSb3e/view)

U OVOM PRIMERU CE SE KORISTITI *DICTIONARY*, KOJI SE JOS NAZIVAI [Associative array](https://en.wikipedia.org/wiki/Associative_array) (a collection of key-value pairs, that ensures key uniqueness)

MORAS ZNATI OVO ZA DICTIONARY:

**TYPE ANNOTATIO NZA SVAKI VALUE KOD DICTIONARY-JA JE ISTI TYPE ANNOTATION** (NARAVNO UZ IZUZETAK KORISCENJA `|`) (ALI U MOM SLEDECEM PRIMERU, IAMCI SAMO JEDAN TYPE ZA VALUE, A TO CE BITI TYPE PARAMETER)

## U OVOM PRIMERU TREBAM DA NAPRAVIM map I reduce METODE, ALI DA OVE METODE BUDU METODE, KOJE CE SE KORISTITI ZA DICTIONARY TYPE

***GENERIC TYPE* BI TREBAO DA DESCRIBE-UJE VALUE IZ KEY/VALUE PARA DICTIONARY-JA**

NAJBOLJEJE POCETI OD INPUTA FUNKCIJE, KOJU CU NAZVATI **mapDict**

OVAKAV DICTIONARY, MOZE BITI ONO STO CE SE DODAVATI KAO ARGUMENT FUNKCIJE

```typescript
const fileEkstenzije = {
    typescript: ['ts'],
    javascript: ['js'],
    jpeg: ['jpg','jpeg'],
    html: ['html', 'htm']
}

```

### :one: DA PREDSTAVIM MOJE RESENJE ZA mapDic :hibiscus:

```typescript
function mapDict<T>(

    dictionary: {[name: string]: T},
    callback: (value: T) => any

): {[name: string]: T} {

    let output: {[name: string]: T};

    output = {}

    for(let name in dictionary){

        let temp;

        if(temp = callback(dictionary[name])){
            Object.assign(output, {[name]: temp})
        } 
    }

    return output;

}

const res = mapDict(fileEkstenzije, function(value){

    return value.join("<=>");
});

console.log(res)
```

### :two: MEDJUTIM MOGUCE JE IZOLOVATI `{[name: string]: T}` IZ PREDHODNOG PRIMERA, TAKO DA TO BUDE JEDAN REUSABLE INTERFACE; USTVARI TO MOZE BITI JEDAN REUSABLE TYPE ALIAS :leaves:

```typescript
type dictionary1<T = any> = {  // OVDE IMAM         DEFAULT TYPE ARGUMENT (I TO JE VAZNO JER CU SADA IAMTI FALLBACK)
    [name: string]: T
}

//  I UPRAVO U MOJOJ REDEFINISANOJ FUNKCIJI, KORISTICE SE UPRAVO FALLBACK ZA T

function mapDictFunk(

    dictionary: dictionary1,
    callback: (value: any) => any

): dictionary1 {

    let output: dictionary1;

    output = {}

    for(let name in dictionary){

        let temp;

        if(temp = callback(dictionary[name])){
            Object.assign(output, {[name]: temp})
        } 
    }

    return output;

}


```

MEDJUTIM ONO STO MOJA FUNKCIJA NEMA JESTE GENRIC, KOJI MOZE BITI PASSED

RAZMISLLI I O OVOME:

**AKO BI MOJA GORNJA FUNKCIJA IMALA GENERIC (KOJI SADA NEMA), TAJ TYPE PARAMETER BI MOGAO BITI PROSLEDJEN DO GENERIC-A, dictionary1 TYPE-A**

ALI TO CU POKAZATI, KROZ AUTOROVO RESENJE, POMENUTOG PRIMER-A

AUTOR JE USTVARI KOD mapDict FUNKCIJE DEFINISAO DA CALLBACK OUTPUT-UJE DRUGI GENERIC TYPE

A I RETURNED VALUE CELE FUNKCIJE TREBAO BI DA BUDE TYPE-A NASTALOG TAKO STO, TAJ DRUGI GENERIC PROSLEDIM DO TYPE-A, KOJI DESCRIBE-UJE DICTIOANRY

EVO POGLEDAJ KAKVU SAM SITUACIJU MOGAO IMATI

```typescript
interface DiktInt<T> {
    [key: string]: T | undefined;
    // TAKODJE JE DOBRO ZADATI I UNDEFINED
}

function mapDictFunc<T, S>(dict: DiktInt<T>, callback: (val: T) => S): DiktInt<S> {

    // SADA IMAM DVA TYPE PARAMETRA, KOJA MOGU PROSLEDITI

    // A FORMIRAM TYPE ZA PARAMETRE FUNKCIJE, TAK OSTO T ILI S PROSLEDJUJEM DRUGIM TYPE-OVIMA

    // MISLI MDA JE SVE JASNO KADA BACIM POGLED, ZATO NECU DODATNO KOMENTARISATI
}
```

RAZMISLI O OVOM GORE

## DAKLE AUTOR TUTORIJALA JE IMAO ZNATNO BOLJE RESENJE I ZATO CU SE SADA POZABAVITI EXPLORINGOM, NJEGOVOG RESENJA I ZA mapDict (TU SAMO OSTAJE DA DEFINISEM ONO U OBIMU FUNKCIJE), A I ZA reduceDict (OVAJ DRUGI NISAM SAM POCEO DA KREIRAM)

*MOGU SADA SAMO DA NASTAVIM SA DEFINISANJEM OBIMA FUNKCIJE, KOJI JE PREDSTAVLJEN GORE*

ZA ITERACIJU KROZ DICTIONARY AUTOR JE IZABRAO DA KORISTI Object.keys

A TAKODJE ZELI MDA ISKOMENTARISEM SAV CODE, KAKO BIH LAKSE SHVATIO STA SU DOBRE PRAKSE (OVO SE NECE TICATI SAMO TYPESCRIPT-A, VEC UOPSTENO) (TU PRVENSTVENO MISLI MDA OBRATIS PAZNJU NA SVE FALSY VREDNOSTI, A NE SAMO undefined)

```typescript
interface DiktInte<T> {
    [key: string]: T | undefined;
}

function mapDictFunc<T, S>(dict: DiktInte<T>, callback: (val: T, index: number) => S): DiktInte<S> {

    // TAKODJE POGLEDAJ GORNJI CALLBACK PARAMETAR
    // DODAO SAM MOGUCNOST DA SE TOM CALLBACKU PROSLEDJUJE I
    // ON OSTO BI TREBAO DA BUDE index PRI DEFINISANJU NOVIH

    const output: DiktInte<S> = {};

    // PRISTUPAM SVIM KLJUCEVIMA dict ARGUMENTA
    
    Object.keys(dict).forEach((key, keyIndex) => {          // forEach JE CONVINIENT JER IMA I PARAMETAR KOJI SE ONDOSI NA INDEKS NIZA

        // MORAM OBRATITI PAZNJU NA SVE MOGUCE FALSY VREDNOSTI

        // TO KAZEM JER MENE USTVARI ZANIMA SAMO DEFINISANJE, KADA 

        const currentValue = dict[key];
        
        if(currentValue !== undefined){

            output[key] = callback(currentValue, keyIndex);
        }

    })

    return output;

}
```

STO SE TICE dictReduce METODE, NJENO RESENJE SE NALAZI U REPOZITORIJUMU, A ZA SADA U CILJU USTEDE VREENA NECU SE NJOME BAVITI, PA MI TO OSTAJE DA URADIM NEKOM DRUGOM PRILIKOM
