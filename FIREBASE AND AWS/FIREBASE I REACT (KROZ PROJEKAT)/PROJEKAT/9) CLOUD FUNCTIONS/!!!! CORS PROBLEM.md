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


// OVA FUNKCIJA JE BILA PROBLEMATICNA
exports.getAllPosts = functions.https.onRequest(async (request, response) => {
    const querySnapshot = await firestore.collection('posts').get();
    const posts = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

    response.set('Access-Controll-Allow-Origin', '*');
    response.json({posts});
})


// PRAVIM NOVU CLOUD FUNKCIJU, KOJA KORISTI onCall

exports.getPostDocuments = functions.https.onCall((data, context) => {

    const {uid} = context.auth;

    return Promise.resolve(uid);

})

// OVO NIJE FUNKCIONISALO, IPAK PRVO MORAM DA PRODJEM CEO KINNEY-JEV TUTORIJAL

```

## STO SE TICE DEPLOYMENT-A, MOGUC JE I PARCIJALNI DEPLOYMENT (TO ZNACI DEPLOYMENT, SAMO ZELJENE FUNKCIJE, KOJU NAVODIM)

## NEKE OD DODATNIH STVARI CU OSTAVITI OVDE

NAIME, AKO SE SECAM POSTOJAO JE I cors PAKET, KOJI JE (MISLIM DA MI JE ON U PWA PROJEKTU ZADAVAO DOSTA PROBLEMA); POKUSACU MOZDA DA GA U POMENUTOM PWA PROJEKTU NE UPOTREBLJAVAM

POGLEDAJ I OVU POLEMIKU O TOME [STA DA SE KORISTI (KOJI API) STO SE TICE REQUEST-A KA ENDPOINT-U CLOUD FUNKCIJA FIREBASE-A, KADA **Access-Control-Allow-Origin NIJE DOZVOLJEN**](https://stackoverflow.com/questions/42755131/enabling-cors-in-cloud-functions-for-firebase)