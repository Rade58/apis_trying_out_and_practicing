# as OPERATOR; OVERLAPING TYPE, ODNOSNO OVERLAPING INTERFACE-OVI

NA POCETKU DA KAZEM DA SAM JA ['KONCEPT OVERLAPING-A'](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/TYPESCRIPT/BELESKE/0%29%20VAZNE%20STVARI%20I%20PODSETNIK/OVERLAPING%20INTERFACE-OVI.md), BOLJE OBJASNIO U DRUGOM DOKUMENTU ,ALI MISLI MDA SAM I OVDE DAO KOREKTNE PRIMERE

*NE ZNAM DA LI SU MOJI PRIMERI SUVISNI*

*U SUSTINI U ZADNJEM NASLOVU SAM DAO PRIMER, KAKAVA JE I NA [ZVANICNO JSTRANICI](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions) (**TAM OSE KORISCENJE as-A NAZIVA "TYPE ASSERTION-OM"**)*

## DA NASTAVIM

DA ZAISTA, JE MOGUCE I MENJANJE TYPE-A, USTVARI TACNIJE JE RECI **NADOGRADNJE TYPE-A**, PO POTREBI

PODELICU OVA OBJASNJENJA NA DVA DELA

PRVO CE BITI BAVLJENJE, U OPSTEM SMISLU SA as-OM, A DRUGI DEO CU POSVETITI NIZOVIMA

## :one: as OPERATOR I 'RAZLICITE VERZIJE' JEDNOG TE ISTOG OBJEKTA

### MEDJUTIM PRE NEGO STO OBJASNIM STA SE POSTIZE SA as OPERATOROM, JA MORAM OBJASNITI, KADA TO JEDAN INTERFACE OVERLAP-UJE DRUGI

POSMATRAJ TO NA PRIMER-U

```typescript
// EVO OVDE CU PRVO KREIRATI DVA INTERFACE-A
// ALI S TIM STO JEDAN INTERFACE OVERALP-UJE DRUGI

// ODNOSNO TACNIJE JE RECI DA SE DVA INTERFACE-A OVERALAPUJU (JEDAN OVERLP-UJE DRUGI, ALI I DRUGE OVERLAPUJE TOG JEDNOG)

// STA TO USTVARI ZNACI?

// PA JEDAN INTERFACE, PORED SAMO SEBI SVOJSTVENIH DEFINICIJA TYPE-OVA
// * IMA I ONE DEFINICIJE TYPE-OVA, KOJE IMA I NEKI DRUGI INTERFACE

export interface Visnja {
    peteljka: boolean;
    boja: string;
    rok_upotrebe: number

    // IMA JEDAN OPCIONI TYPE (KOJ INIJE BITAN ZA OVERLAPING)
    tezina?: number
}

export interface Tresnja {
    // OVAJ INTERFACE IMA OVA DVA TYPE-A, KOJA SU NJEM USVOJSTVENA
    dzem: boolean;
    etikeata: string;

    // ALI IMA I DODATNE
    // SLEDECI TYPE-OVI KOJI OVAJ INTERFACE IMA, POTPUNO SU IDENTICNI PREDHODNOM INTERFACE-U
    // IZOSTAVLJAJUCI NARAVNO OPCIONE

    // ** ODNOSNO BOLJE JE RECI DA OVAJ INTERFACE OVERLAP-UJE, PREDHODNI
    rok_upotrebe: number;
    peteljka: boolean;
    boja: string
}
```

### UPRAVO ZBOG POMENUTE SITUACIJE OBA INTERFACE-A, BEZ OBZIRA KOJI OVERLAPUJE ILI JE OVERALPED BY, IMAJU DODATNE 'TYPING MOCI'

**OVO BUKVALNO ZNACI DA OBJEKAT, KOJI JE U SKLADU SA TAKVIM INTERFACE-OM IMA 'DVA LICA'** (A NEKAD I VISE, AKO POSTOJI SITUACIJA, PO KOJOJ GA OVERLAP-UJE VECI BROJ INTERFACE-OVA)

POSMATRAJ UPRAVO JEDAN OBJEKAT, KOJEM CU ZADATI TYPE ANNOTATION U SKLADU SA, GORE DEKLARISANIM Visnja INTERAFACE-OM

I JEDAN OBJEKAT, KOJEM CU ZADATI TYPE ANNOTATION U SKLADU SA, GORE DEKLARISANIM Tresnja INTERFACE-OM

```typescript
let dzemOdVisanja: Visnja = {
    peteljka: false,
    boja: "bordo",
    rok_upotrebe: 1948
};

let dzemOdTresanja: Tresnja = {
    dzem: false,
    etiketa: "devojka drzi teglu",

    rok_upotrebe: 2019
    peteljka: true,
    boja: "bordo"
};

// NAIME ZELIM DA OVOM OBJEKTU, KOJI JE OVERLAPED BY, DODAM, NOVI PROPERTI
// !!!!! ALI OVO CE PROUZROKOVATI TYPE ERROR
dzemOdVisanja.etiketa = "lepa devojka koja ima tresnjin cvet u kosi";                   // --> TYPING ERROR
// !!!!! NE MOZE DA PRIHVATI TAJ PROPERTI JER NIJE U SKLADU SA TYPE-OM      Visnja

// ALI CONVINIENT JE STO JE TAJ         etiketa         PROPERTI USTVARI PROPERTI U SKLADU SA
// Tresnja      INTERFACE-OM, KOJI OVERLAPUJE       Vuisnja     INTERFACE
```

**UPRAVO ZBOG TOGA OBJEKAT REFERENCED BY dzemOdVisanja VARIABLE, MOZE DA IMA JOS JEDNU VERZIJU**

ON MOZE DA POSEDUJE I PROPERTIJE SA TYPING-OM, KOJI SU U SKLADU SA Tresnja INTERFACE-OM

**OVDE TREBA VODITI RACUNA I SHVATITI DA SU NJEGOVE VERZIJE *AGNOSTIC* JEDNA U ODNOSU NA DRUGU**

*E TU UPRAVO NA SCENU STUPA **as** OPERATOR, I PO MOJOJ SLOBODNOJ INTERPRETACIJI, ON SE PONASA KAO **ACESSOR ONE DRUGE VERZIJE OBJEKTA, ONE VERZIJE KOJA JE U SKLADU SA DRUGIM INTERFACE-OM***

```typescript
// TO NE ZNACI DA SADA OBJEKAT dzemOdVisanja IMA PROPERTI     etiketa
// USTVARI IMA GA KADA JE U DRUGOJ VERZIJI

// !!!! ZATO BI OVO PROUZROKOVALO ERROR
console.log(dzemOdVisanja.etiketa);          // ---->    ERROR

// **** ALI OVO BI BILO SASVIM U REDU
console.log(
    (dzemOdVisanja as Tresnja).etiketa
);

// STO SE TICE ONOG DRUGOG OBJEKTA KOJI JE ONAJ KOJI OVERLAPUJE DRUGI
// I ON MOZE IMATI DRUGIU VERZIJU

console.log(        // IAK OJE OVO SASVIM KOREKTNO, JA OVOM OBJEKTU (OVOJ VERZIJI) NE MOGU DAVATI DODATNE PROPERTIJE (JER ONAJ OBJEKAT, KOJI
                    // JE OVERLAPED BY HIM, PO PRIRODI ISTVARI MU NE MOZE POZAJMITI NI JEDAN NOVI PROPERTI JER IH NEMA)
    (dzemOdTresanja as Visnja).etiketa
)

```

### TAKODJE NISTA ME NE SPRECAVA DA JA VERZIJU CUVAM U VARIJABLI, FOR QUICK REFERENCE

```typescript
let dzemOdTresanja_Tresnja_version =  dzemOdVisanja as Tresnja,

// I OVO JE SASVIM KOREKTNO
dzemOdTresanja_Tresnja_version.etikeata = "lepa devojka koja ima tresnjin cvet u kosi"
```

### ALI BEZ OBZIRA NA SVE NEMOJ UCI U ZABLUDU I POMISLITI DA SU DVE VERZIJE, USTVARI DVA RAZLICITA OBJEKTA; JER OVDE SE UVEK RADI O ISTOM OBJEKTU

```typescript
//  OVO CE DAKLE PRODUCE-OVATI          true

dzemOdTresanja_Tresnja_version === dzemOdVisanja;

```

### JOS JEDNA NAPOMENA BI SE ODNSILA NA TO DA NE IGNORISES KADA TYPESCRIPT OZNACI DA SI POGRESIO; TO GOVORIM JER BEZ OBZIRA TI POGRESIO ILI NE, AKO RUNN-UJES COMPILED JAVASCRIPT, ON CE SASVI MFUNKCIONISATI (JAVASCRIPT JE AGNOSTIC U ODNSU NA TYPE-OVE TYPESCRIPTA, I ZATO NECE PAZITI NA VERZIJE, JER BILO KOLIKO VERZIJA, RADI SE O JEDNOM OBJEKTU U JAVASCRIPTU, KOJI ONDA MOZE PRISTUPATI, I DEFINISATI BILO KOJI PROPERTI)

ALI IMAS KOD SEBE ONDA UVEK 'BROKEN TYPES' U SVOM TYPESCRIPT FAJLU (I CEMU ONDA TYPESCRIPT)

ZATO NIKAD NE IGNORISI NI JEDNU GRESKU KOJU TI JAVLJA TYPESCRIPT

### ON OSTO SAM MOZDA PRESKOCIO A STO JE MOZDA VAZNO JESTE 'SLUCAJ EMPTY OBJEKTA' (OVO SAMO PO SEBI NISTA NIJE POSEBNO, A NI POTREBNO, A VIDECES NA KRAJ UPODNASLOVA I ZASTO JE TAKO)

*TO USTVARI NIJE NIKAKAV, POSEBAN SLUCAJ SLUCAJ, VEC MOZDA NACIN NA KOJI SE MOZE KORISTITI as SINTAKSA*

EVO I PRIMER-A

```typescript
interface Alkohol {
    jacina: number;
    ime: string;
    poreklo: string;
    dozvoljeno?: boolean
}

// OVDE NISTA NIJE SPORNO
// DOK NE POKRIEM SVE TYPE-OVE U SKLADU SA Alkohol INTERFACE-OM, IMAO BIH ERROR MESSAGE (PODVUCEN CODE)
let cognaque: Alkohol = {
    jacina: 680,
    ime: "bourbone",
    poreklo: "french"
}

// *** ja naime mogu odmah koristiti *  as   * sintaksu pri inicijalizaciji

// JER PRAZAN OBJEKAT JESTE TYPE-A, KOJI OVERLAP-UJE BILO KOJI DRUGI  
let wiskey = {} as Alkohol;         // ZATO MI JE OVO DOZVOLJENO

// SADA ZA RAZLIKU OD    cognaque   OBJEKTA       wiskey        OBJEKAT, MOZE PRIMATI
// PROPERTIJE ON THE RUN
// SVE DOK POTPUNO NE IZGRADI OBJEKAT, U SKALDI SA      alkohol         INTERFACE-OM

wiskey.ime = "Glendlough";
wiskey.jacina = 80000;
wiskey.poreklo = "irish";
wiskey.dozvoljeno = true;

// NARAVNO BIL OKOJI NOVI PROPERTI NE BIH MOGAO DODATI wiskey-U, JER BI TO NE BI BILO U SKLADU SA Aljkohol INTERFACE-OM
```

*U SUSTINI POMENUTO STO SAM DEFINISAO NIJE NI BITNO, JER MI JE OVO DOZVOLJENO*

```typescript
let rucak: Jelo;        // MOGU PRESKOCITI INICIJALIZACIJU, ALI ZADATI TYPE NOTATION

rucak.ime = "rucak";
rucak.kolicina = 280;
```

### unknown TYPE; ODNOSNO MOGUCE JE 'PREVARITI' UNSUFFICIENT OVERLAPING, I TO KORISCENJEM unknown TYPE-A, ILI any TYPE, MEDJUTIM TYPESCRIPT SUGERISE (PRILIKOM HOVERINGA PREKO ERROROUS CODE-A), DA KORISTIM IPAK unknown

```typescript
// EVO PAR INTERFACE-OVA KOJI IMAJU UNSUFFICIENT OVERLAPING
interface Pice {
    alkoholno: boolean;
    temperatura: number
    ime: string,
    cena?: number,
}

interface Jelo {
    ime: string;
    temperatura: number
    poreklo: string,
    kolicina?: number,
}

// JASNO JE DA PREDHODNA DVA INTERFACE-A NISU OVERLAPING
// DA BI TO BILI, ILI Jelo BI MORALO DA IMA DEFINSIAN TYPE ZA alkoholno
// ILI BI Pice MORALO DA IMA TYPE ZA poreklo 

let vecera :Jelo = {
    ime: "steak",
    temperatura: 140,
    poreklo: "britain"
}

// !!!!!     OVO BI ZATO PROUZROKOVALO ERROR
let dorucak = vecera as Pice;                   // -->  ERROR

// *** MOGAO BIH URADITI NESTO OVAKO, AKO BI ZELO DA ISKORITIM vecera OBJEKAT
let rucak = (vecera as unknown) as Pice;
// ****  ILI OVAKO
let uzina = (vecera as any) as Pice;

// I ONDA BIH MOGAO DEFINISATI PROPERTIJE U SKLADU SA Pice INTERFACE-OM
uzina.alkoholno = true;
rucak.alkoholno = false;
```

**POSTO MI JE SVE OVO JAKO NOVO, NE ZNAM JOS DA LI JE OVO NEKA PRAKSA KORISCENJA ALI IPAK JE DOBRO DA SAM PROVEZBAO**

## :two: MOGU PROSIRITI 'as PRICU' I NA NIZOVE

### PRVO MALI PODSETNIK ZA NIZOVE I TYPOVE

```typescript
// EVO PAR INTERFACE-OVA, KOJI NISU OVERLAPING, ODNSONU INSUFFICIENTLY
interface Pice {
    alkoholno: boolean;
    ime: string,
    cena?: number
}

interface Jelo {
    ime: string;
    poreklo: string,
    kolicina?: number
}

// TYPE OVOG PROPERTIJA JESTE NIZ, CIJI CLANOVI IMAJU       Pice        TYPE NOTATION
// ILI  NIZ CIJI CLANOVI IMAJU       Jelo        TYPE NOTATION
// NIZ MOZE BITI PRAZAN JER         NEMAS OGRANICENJE ZA LENGTH
let dorucak: Pice[] | Jelo[] = [];
// ALI U SLUCAJU PREDHODNOG NIZA, NE MOGU MESATI CLANOVE SA DVA TYPE-A
// TO DAKLE MORA BITI NIZ ILI SA JEDIN TYPE-OM ILI SA DRUGIM

// ALI AKO ZELIM DA MESAM TYPE-OVE, MOGU DEFINISATI NIZ, U KOJI MOGU STAVLJATI CLANOVE RAZLITIH ANNOTATED TYPE-OVA
let rucak: (Pice | Jelo)[] = [];


// PRI OVAKVOJ TYPE NOTATACIJI, VELICINA NIZA JE OGRANICENA
// ZA OVAJ PRIMER, PRI INICIJALIZACIJI MORAM IMATI NIZ OD TACNO TRI CLANA
// ALI POSTO IMA MCONDITIONAL, MOGU BIRATI IZMEDJU DVE OPCIJE U POGLEDU
// TYPE-OVA ZA CLANOVE NIZA
let vecera: [Pice, Pice, Jelo] | [Jelo, Pice, Jelo] = [
    // izabrao sam prvu opciju za ovaj objekat
    {alkoholno: false, ime: "kokta"},
    {alkoholno: true, ime: "wiskey", cena: 4800},
    {ime: "steak", kolicina: 200, poreklo: "french"}
];

```

## OVERLAPING TYPE-OVI I NIZ

NIZ, KOJI PRIHVATA CLANOVE, KOJI SU DOZVOLJENOG TYPE-A ZA NIZ; MOZE DA PRIHVATI I CLANA KOJI JE OVERLAP-UJUCI TYPE (ODNOSNO, KOJI JE 'OVERLAPER' ODNOSNO KOJI OVERLAPUJE TRENUTNOG TYPE NIZA), POMENUTOG ZDATOG, ODNOSNO DOZVOLJENOG TYPE-A

POSMATRAJ OVAJ PRIMER

```typescript
//////////////////////////////////////

// OVO SU DVA OVERALP-UJUCA TYPE-A

interface Ulica {
    brojevi: boolean;
    staniste: string;
    populacija: number;
}

interface Avenija {
    brojevi: boolean;
    staniste: string;
    populacija: number;
    
    transport: string;
    gondola: boolean
}


/////////////////////////////////
// OVO SU NEKI RANDOM OBJEKTI, KOJI NEMAJU APSOLUTNO NIKAKVE VEZE
// SA GORNJIM INTERFACE-OVIMA
let tetrebObjekat = {tetreb: true, balvan: "4 cola"};
let blavorObjekat = {blavor: true, balvan: "8 cola"};

/////////////////////////////////

// KREIRACU DVA NIZA
// JEDAN OD NJIH PRIHVATA TYPE-OVE, PRVOG OVERLAPUJUCEG TYPE-A
// A DRUGI DRUGOG OVERLAP-UJJUCEG TYPE-A
let ulicaNiz: Ulica[] = [];
let avenijaNiz: Avenija[] = [];

/////////////////////////////////

// KREIRAM JEDAN OBJEKAT KOJI JE U SKLADU SA PRVIM OVERLAP-UJUCIM TYPE-OM
let jednaUlica: Ulica = {
    brojevi: true,
    staniste: "ruralno",
    populacija: 1000
}
// KREIRAM JOS JEDAN OBJEKAT KOJI JE U SKLADU SA DRUGIM OVERLAP-UJUCIM TYPE-OM
let jednaAvenija: Avenija = {
    brojevi: true,
    staniste: "urbano",
    populacija: 2000,
    
    transport: "electric cars",
    gondola: true
}
//////////////////////////////////////////

// ********  NIZ,, USTVARI PRIHVATA I ONE TYPE-OVE
// *** KOJI OVERLAPUJU, TYPE, NJEGOVIH CLANOVA   ******

ulicaNiz[0] = jednaAvenija;
//************ DAKLE TYPESCRIPT ME NIJE NISTA UPOZORIO, DAKLE, GORE DEFINISANO JE SASVI MDOZVOLJENO

// !!!!!!!!!!   ALI NIKAKO OBRNUTO
// !!!!!!     NIZ NE MOZE PRIHVATITI ONE TYPE-OVE, KOJI SU TAKVI DA SU OVERLAPED BY TYPE
// !!!!!!     CLANOVA

// TO I IMA SMISLA, JER OVERLAPER IMA DODADTNE PROPERTIJE U ODNSU NA OVERLAPED BY-A

avenijaNiz.push(jednaUlica);  // ---->    ERROR
///////////////////////////////////////////////////////////////////////////////////
```

### SADA NISTA NE BI TREBAL ODA BUDE SPORNO IZ GORNJEG CODE-A, ALI HAJDE DA SADA UPOTREBIM as OPERATOR (VERUJEM DA U SLEDECEM PRIMERU NISTA NISAM POGRESIO, ALI MOZDA BI VALJAL OJEDNOM PRILIKOM ODRADITI ISTI PRIMER)

OPET CU KORISTITI PRIMER, A OVO CE BITI 'POSTAVKA' I U MNOGOME TOME CU PROVEZBATI, ONO STA SAM PRIKAZAO U PROSLOM PODNASLOVU

```typescript
// IMAM DVA OVRLLAPING INTERFACE-A
////////////////////////////////////
interface Gvanaka {
    krzno: string;
    tezina: number;

    kandze?: boolean;
}

interface Alpaka {
    krzno: string;
    tezina: number;

    poreklo: string;
    tovarnost: string;
    jestivost?: boolean    

}
///////////////////////////////////////////

// NAPRAVICU NEKOLIKO OBJEKATA U SKLADU SA      Gvanaka         TYPE-OM

var lama1: Gvanaka = {
    krzno: "crveno barsunasto",
    tezina: 58,
    kandze: false
};
var lama2: Gvanaka = {
    krzno: "sivo umerena",
    tezina: 69,
    kandze: true
};
var lama3: Gvanaka = {
    krzno: "brown prolivska",
    tezina: 54,
    kandze: false
};
var lama4: Gvanaka = {
    krzno: "providno sarena",
    tezina: 68,
    kandze: false
};
var lama5: Gvanaka = {
    krzno: "zelenkaso bujna",
    tezina: 42,
    kandze: true
};
var lama6: Gvanaka = {
    krzno: "farbana",
    tezina: 62,
    kandze: true
};

/////////////////////////////////////////////////

// CISTO ZBOG DEMONSTRACIJE, KREIRACU I JEDAN OBJEKAT, KOJI JE U SKLADU SA INTERFACE-OM
// Alpaka

var lamaAl: Alpaka = {
    krzno: "maslinasto bujno",
    tezina: 128,
    poreklo: "Chile",
    tovarnost: "srednje do navise"
}

/////////////////////////////////////////////

let lamaArray: Gvanaka[] = [];          // kreiram array koji jedino prima clanove koji su type 
                                        //              Gvanaka

for(let i = 0; i < 6; i++){

    // DODAJEM SVE OBJEKTE (U SKALD USA Gvanaka INTERFACE-OM) U POMENUTI NIZ

    lamaArray.push(window[`lama${i + 1}`])


}

////////////////////////////////////////////////////

// MOGU DA DODAM I ONAJ JEDAN OBJEKAT U SKLADU SA Alpaka INTERFACE-OM
// TO MI JE DOZVOLJENO ZA OVAJ NIZ JER JE Alpaka OVERLAPER U ODNOSU NA Gvanaka TYPE

lamaArray.push(lamaAl);

///////////////////////////////////////////////////
```

**SADA CU UPOTREBITI as NA TAKAV NACIN, *KAO DA IMAM DVE VERZIJE JEDNOG TE ISTOG NIZA***

```typescript
/ DAKLE JA MOGU KORISITI as, I KAKO BI DODAO JEDNOSJ VERZIJI, ONE OPCIONE CLANOVE

// A U DRUGOJ VERZIJI, KOJU CU KORIRIRI U TYPE-U, KOJI JE OVERLAPED BY
// KAKO BI DODAO NEDOSTAJAJUCE CLANOVE

(lamaArray as Alpaka[]).forEach(lamaClan => {
    lamaClan.poreklo = "Juzna Amerika"
    lamaClan.tovarnost = "SREDNJA"
});

lamaArray.forEach(lamaClan => { 
    lamaClan.kandze = true
});



///////////////////////////////////////////////////
// OVDE MOGU PROVERITI DA L UISAM SVE DODAO 
(lamaArray as Alpaka[]).forEach(lamaClan => {

    //**** TYPESCRIPT NIJE DAO NIAKAKV ERROR, DAKLE SVE JE KOREKTNO
    console.log(lamaClan.poreklo);          
    console.log(lamaClan.tovarnost);

});

// !!!!!!!!!!! A OVO BI DA LO I ERROR JER SE NE RADI O PRAVOJ VERZIJI

lamaArray.forEach(lamaClan => {

    // !!!!!!!          ERROR
    console.log(lamaClan.poreklo);      // --> ERROR          
    console.log(lamaClan.tovarnost);    // ERROR

})


// ******* OVO JE KOREKTNO
lamaArray.forEach(lamaClan => {
    console.log(lamaClan.kandze)
});

// ****** ALI I OVO JE KOREKTNO, MADA JE SUVISNO
(lamaArray as Gvanaka[]).forEach(lamaClan => {
    console.log(lamaClan.kandze)
})
```

## STO SE TICE as OTKRIO SAM DA SE ON NA PRIMER TREBA KORITITI AKO IMAM VARIJABLU, KOJA JE DECLARED SA any

POGLEDAJ PRIMER

```typescript
// IMAM NEKU OVAKVU VARIJABLU, KOJA IMA any TYPE ANNOTATION
let nekakvoNesto: any;
//
//
// ALI NEGDE SAM ODLUCIO DA JOJ DODELIM STRING KAO VREDNSOT
//
nekakvoNesto = "Neki tekst blah, blah";

// A as PRVENSTVEN KORISTIM DA BIH IAMO SUGESTIJE OD TYPESCRIPTA, KADA NA PRIMER
// ZELIM DA PRISTUPIM NEKOJ METODI String-OVOG PROTOTIPA
let brojKaraktera: number = (nekakvoNesto as string).length;

// NE BIH IMAO SUGESTIJE ZA         length      DA NISAM KORISTIO as KORISTECI VREDNOST KA OSTRING

// UMESTO as MOZE SE UPOTREBITI I       <>

let numberOfChars: number = (<string>nekakvoNesto).length

```
