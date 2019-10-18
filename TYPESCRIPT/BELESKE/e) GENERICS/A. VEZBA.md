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

## :one: DA PREDSTAVIM MOJE RESENJE ZA mapDic

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

