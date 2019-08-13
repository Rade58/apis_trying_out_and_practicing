# KADA SAM POKUSAO DA POSALJEM NETWORK REQUEST ENDPOINT-U, UVEK SAM DOBIO ERROR VEZAN ZA CORS

SACEKACU DA KINNEY ISPRICA SVU SVOJU PRICU VEZANU ZA CLOUD FUNCTIONS PA AKO ON NE PONUDI RESENJE, NACICU GA SAM

## OVDE CU UGGRABITI PRILIKU DA UPOTREBIM JEDAN NOVIJI, FIREBASE-OV CLOUD FUNCTIONS API

[onCall](https://firebase.google.com/docs/functions/callable) (OMOGUCAVA DA ZOVEM CLOUD FUNCTIONS DIREKTNO FRO MTHE FIREBASE APP)

TU BI UMESTO onRequest KORISTIO onCall

```javascript

functions.https.onCall((data, context) => {
    // context ZE ODNOSI NA auth KOLIK OSAM RAZUMEO
    // IMA I uid PROPERTI

    // data MOZE CONTAIN-OVATI MESSAGE TEXT


    return {podatak: "blah"};   // OVO JE ONO STO JE RETURNED BACK TO THE CLIENT SA JSON ENCODING-OM

})

```

**IMA JOS MNOGO O OVOME DA SE KAZE, A JA SAM OSTAVIO I LINK, I POTREBNO JE DA OVO PREDJEM U POTPUNOSTI**

## A ZA SADA CU KREIRSTI CLOUD FUNCTION, UZ POMOC onCall API-A; BICE TO ONA ISTA FUNKCIJA SA KOJOM SAM IMAO CORS PROBLEM PRILIKOM KORISCENJA onRequest (FUNKCIJA KOJA JE GETT-OVALO SVE POSTOVE IZ FIRESTORE-A)

functions/index.js FAJL:

```javascript
const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

firestore.settings({timestampsInSnapshots: true})

//************************OVO JE ONA PRVA TEST FUNKCIJA****************
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
//**************************************************


// OVA FUNKCIJA JE BILA PROBLEMATICNA, U POGLEDU CORS-A (ODNOSNO NISAM MOGAO GETT-OVATI DATA UZ POMOC fetch API-A)
exports.getAllPosts = functions.https.onRequest(async (request, response) => {
    const querySnapshot = await firestore.collection('posts').get();
    const posts = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

    // response.set('Access-Controll-Allow-Origin', '*');   // NI OVO JOJ NIJE POMOGLO
    response.json({posts});
})


// PRAVIM NOVU CLOUD FUNKCIJU, KOJA BI TREBALA DA FETC-UJE SVE POSTOVE, KAO I GORNJA, AL IZELIM CORS DA BUDE DOPUSTEN
// STO GORE NIJE BIO SLUCAJ
// KORISTI onCall

exports.getPostDocuments = functions.https.onCall(async (data, context) => {

    const {uid} = context.auth;

    const querySnapshot = await firestore.collection('posts').get()

    const posts = querySnapshot.docs.map(document => ({id: document.id, ...document.data()}))

    // POSLACU I data.poruka (BICE TI JASNO KASNIJE ZASTO SALJEM TO I SHVATICU ODAKLE POTICE poruka PROPERTI)

    return {poruka: data.poruka, posts, uid}   // OVO BI TREBALO DA BUDE U ODGOVORU POSLATOM DO CLIENT-A
                            // A KAKO DA 'FETCH-UJES' TE PODATKE, NARAVNO MORACES DA DEFINISES
                            // NA CLIENTU, GDE CES MORATI INICIJALIZOVATI CLOUD FUNCTIONS
                            // I KORISTICES POSEBAN API ZA FETCHING

})

```

DEPLOYUJ (firebase deploy --only functions)

**SADA MOZDA MISLIS DA MOZES KORISTITI fetch API KAKO BI NAPRAVIO REQUEST I POSLAO GA NA NOVI ENDPOINT**

>> NE MOZES KORISTITI fetch API

>> VEC OPET , POSTOJI API, KOJI SE KORISTI NA CLIENT-U

AKO ZELIS DA SVE FUNKCIONISE, URADICES SLEDECE U NEKOJ OD SVOJIH KOMPONENTI

NA PRIMER  OBIMU componentDidMount, NEKE KOMPONENTE, MOZES NAPRAVITI REQUEST

- PRE TOGA CES NARAVNO UVESTI **functions**, IZ 'firebase' PAKETA

- POMENUTO JETE FUNKCIJA I TO MORAS POZVATI, KAKO BI IZ TOGA PROIZISAO OBJEKAT

- ZATIM PRIMENJUJES **httpsCallable** METODU, TAK OSTO JOJ *KAO ARGUMENT DODAJES STRING IMENA, TVOJE CLOUD FUNKCIJE*

>>> **PREDPOSTAVLJAM DA OVAJ PREDHODNI DEO ENABLE-UJE Access-Controll-Allow-Origin** (AKO ZELIM DA ZNAM KAK OTREBALO BI DA PROCITAM DOKUMENTACIJU, ALI SADA ZA TO NEMAM VREMENA)

- SADA IZ PRIMENE POMENUTE METODE, PROIZILAZI FUNKCIJA, KOJU MOGU KORISTITI DA NACINIM NETWORK REQUEST (ARGUMENT TOG NETWORK REQUEST-A, JESTE OBJEKAT, SA text PROPERTIJEM, ZA KOJI SPECIFICIRAM NEKI ZELJENI MESSAGE)

- TA PORUKA TREBA DA BUDE VREDNSOT text PROPERTIJA data PARAMETRA, CALLBACK-A, KOJI SAM DEFINISAO DA BUDE ARGUMENT onCall METODE (POGLEDAJ GORNJU CLOUD FUNKCIJU)

- UGLAVNOM TA FUNKCIJA SA KOJOM BI TREBALO DA NACINIM NETWORK REQUEST JESTE FUNKCIJA KOJA TREBA DA RETURN-UJE Promise INSTANCU, KOJA TREBA DA BUDE RESOLVED SA ONIM PODACIMA POSLATIM DO CLIENTA, OD STRANE, MOJE CLOUD FUNKCIJE

**SADA CU PRONACI NEKU KOMPONENTU IZ MOJE APLIKACIJE, KAKO BI SVE OVO ISTESTIRAO** (NACI CU NEKU KOMPONENTU, KOJA NEMA MNOGO CODE-A, NA PRIMER Comment (DAKLE OVO JE U CILJU, SAMO TESTIRANJA, A KSANIJE CU UKLONITI CODE))

src/components/Comment.jsx

```javascript
import React from 'react';
import moment from 'moment';

// UVOZIM DAKLE functions FUNKCIJU IZ firebase-A
// ALI UVESCU GA POD NOVIM IMENOM, JER ZELIM DA DEKLARISEM VARIJABLU functions
// I ZELIM DA ONA SKLADISTI ONO STO CE IZ IZVRSENJA UVEZENE FUNKCIJE PROIZICI
import {functions as func} from 'firebase';
const functions = func();        // MORAM POZVATI FUNKCIJU
// OVO SAM SAMO URADIO, JER ZELIM DA function VSRIJABLA REFERENCIRA, TAJ OBJEKAT
// NA KOJEM
// (NEVAZNO ALI MENI ZNACI Z)

// SADA JA USTVARI MOGU WRAPP-OVATI, TAJ API-I, KOJI CE UCINITI DA MOJ ENDPOINT
// ODNOSNO CLOUD FUNCTION, POSTANE 'HTTPS CALLABLE'; NAKO NCEGA MOGU POSLATI

// ODNOSNO ZELIM DA MOJ CODE WRAPP-UJEM U async FUNCTION

const getPosts = async () => {

    const getPosts = functions.httpsCallable('getPostDocuments');

    // MOGU SA PREDHODNOM FUNKCIJOM SADA FETC-OVATI PODATKE
    // GORNJA FUNKCIJA return-UJE Promise, KOJI JE RESOLVED SA DATA-OM


    const result = await getPosts({poruka: "all posts are fetched"}); // REKAO SAM DA CE OVA PORUKA BITI 
                                                                    // DOSTUPANA
                                                                  // U OBIMU CLOUD FUNKCIJE
                                                                  // JA SAM JE U CLOUD FUNKCIJI POSLAO NAZAD
                                                                  // ZELIM DA JE STAMPAM, KADA PODACI STIGNU

    // DAKLE DEFINISACU DA SE STAMPA TA PORUKA, AKO JE FETCHING USPESAN
    console.log(result.data.poruka)

    // !!!! NE ZABORAVI DA MORAS KORISTITI data PROPERTI NA OBJEKTU !!!
    // !!!! KAKO BI RETREIVE-OVAO PODATKE !!!!


    // RETURN-OVACU OBJEKAT, KOJI SE SASTOJI OD NIZA SVIH POST-OVA I UID-JA, USER-A,
    // KOJI JE ZATRAZIO SVE OVE POST-OVE

    const {uid, posts} = result.data;

    return {uid, posts};

}

// MOGU OVU FUNKCIJU, POZVATI DOLE CISTO DA JE TESTIRAM


const Comment = ({content, user, createdAt}) => {

    // POZVACU JE OVDE PA CU STAMPATI ONO STO JE FETCED
    getPosts().then(postsAndUid => {console.log(postsAndUid)})
    // I ZAISTA U KONZOLI CE BITI STAMPAN OBJEKAT KOJI U SEBI IMA UID USERA I NIZ SVIH POSTOVA


    return (
        <article className="comment">
            <span className="comment_author">{user.displayName}</span>
            <span className="comment_content">{content}</span>
            <span className="comment_timestamp">{moment(createdAt).calendar()}</span>
        </article>
    );

};

Comment.defaultProps = {
    title: 'Nesto sasvim sjajno',
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus est aut dolorem, dolor voluptatem assumenda possimus officia blanditiis iusto porro eaque non ab autem nihil! Alias repudiandae itaque quo provident.',
    user: {
        displayName: 'Dasha Nekrasova',
        email: 'dasha@mailnator.com',
        photoURL: 'http://placekitten.com/200/300'
    },
    createdAt: new Date()
};

export default Comment;
```

OVO SDA MOGU ISTESTIRATI U localhost-U (yarn start)

**ZELIM SAM ODA NAPOMENEM DA context.auth IZ CLOUD FUNKCIJE, IMA INFO O email, displayName I photoURL-U** (ALI KAO STO SE SECAM OVI PODACI SU JEDINO POTPUNI KADA SE KORISTI NEKI OAuth)

## STO SE TICE DEPLOYMENT-A, MOGUC JE I PARCIJALNI DEPLOYMENT (TO ZNACI DEPLOYMENT, SAMO ZELJENE FUNKCIJE, KOJU NAVODIM)

ALI NIJE USPELO

## NEKE OD DODATNIH STVARI CU OSTAVITI OVDE

NAIME, AKO SE SECAM POSTOJAO JE I cors PAKET, KOJI JE (MISLIM DA MI JE ON U PWA PROJEKTU ZADAVAO DOSTA PROBLEMA); POKUSACU MOZDA DA GA U POMENUTOM PWA PROJEKTU NE UPOTREBLJAVAM

POGLEDAJ I OVU POLEMIKU O TOME [STA DA SE KORISTI (KOJI API) STO SE TICE REQUEST-A KA ENDPOINT-U CLOUD FUNKCIJA FIREBASE-A, KADA **Access-Control-Allow-Origin NIJE DOZVOLJEN**](https://stackoverflow.com/questions/42755131/enabling-cors-in-cloud-functions-for-firebase)