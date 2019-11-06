# CRUD CONTROLLER VEZBA

DA POGLEDAM, JOS JEDNOM STRUKTURU PROJEKTA (MINUST OSTALI KONFIGURACIJSKI I TESTING FAJLOVI)

```javascript
│   index.js
│   server.js
│
│
├───resources       // JA CU USTVARI DEFINISATI CRUD KONTROLERE
|   |               // ALI TAKO DA IH SVI RESURSI MOGU KORISTITI
│   ├───item
│   |
│   │      item.model.js
│   │      item.router.js
│   │
│   ├───list
│   |
│   │       list.model.js
│   │       list.router.js
│   │
│   └───user
│           user.model.js
│           user.router.js
│
├───utils
│       crud.js         // OVDE CU ODMAH DEFINISATI POMENUTE CONTROLLERE
│       db.js
```

## NEKE VAZNE STAVRI VEZANE ZA MONGO I UOPSTENO O ROUTE-OVIM I CRUDU

******

**OVO JE VAZNO ZA RAZUMEVANJE STVARI**

OVDE GOVORIM O 

- **`req.params.id`** (KORISTI params JER JE param DEPRECATED (params NOSI SVE QUERY STRING PROPERTIJE I NJIHOVE VREDNOSTI))

**ODNOSNO GOVORIM O ID-JU, KOJI SE CITA SA ROUTE-A '/:id'**

:one: *KADA SE U MONGO-U KREIRA DOKUMENT, ONO STO MU JE DATO AUTOMATSKI, JESTE PROPERTI **_id** (DAKLE UVEK MU JE DAT TAJ ID)* (TO JE ODGOVORNOST SAME BAZE PODATAKA)

:two: *KADA SE DEFINISU ROUTE-OVI, ONO STO SE IMA NA UMU KADA SE DEFINISE **'/:id'** JETE DA TO TREBA DA PREDSTAVLJA UPRAVO TAJ ID KOJI MONGO ZADAJE NOVOKREIRANOM DOKUMENTU*

>> VIDIS LI KAKAV, TREBA DA JE RELACIJA SADA, IZMEDJU TOG ID-JA NA ROUTE-U I ID-JA KOJI MONGO ZADAJE, PRI KREIRANJU DOKUMENTA

MOZES NAPRAVITI OVAKVU PARALELU

- KADA BUDES PRAVIO NOVI DOKUMANT (A TADA SE KORISTI ROUTE '/'), TI CES INICIRATI KREIRANJE NOVOG DOKUMENTA (A MONGO CE MU DODELITI _id)

- KADA BUDES QUERY-OVAO ZA TAJ ISTI DOKUMENT, (A TADA SE KORISTI ROUTE '/:id'), TI CES INICIRATI 'DOHVATANJE' TOG DOKUMENTA IZ DATABASE, UZ POMOC TOG :id-JA

******

******

**ALI TO NIJE JEDINI ID; DRUGI ID JESTE ID KOJI DOLAZI OD KORISNIKA, ODNOSNO USER-A**

**KADA SE KREIRA KORISNIK (KADA SE AUTHENTIFIKUJE), NJEMU SE ASSIGN-UJE ID**

*ALI, TAKAV ID TREBA DA SE PROSLEDI SVAKOM DOKUMENTU (KAO DODATNI DATA, KOJI CE BITI DODAT IZ MOG KONTROLERA), PRILIKOM NJEGOVOG KREIRANJA*

>> OBICNO SE DOKUMENT UDAKLE DODAJE I **createdBy** I ON TREBA DA BUDE ID KORISNIKA, ODNOSNO ID USER-A

ON SE CITA SA

**`req.user._id`**

>>> OVO NE VAZI NARAVNO ZA SVAKI REQUEST (user SE MORA 'USADITI' ) (TO CU VIDETI KADA SAZNAM MALO VISE O AUTHENTICATION-U)

******

******

MEDJUTIM CAK SAM NEGDE VIDEO DA SE POSTU DODAJE I

- createdAt

A TU SE DODAJE CURRENT DATE, ODNOSNO DATE U NEKOM FORMATU

******

******

SAM AUTOR WORKSHOPA, REKAO JE OVO NA TEMU POSTOJANJA MULTIPLE ID-JEVA I ZASTO SU ONI NEOPHODNI

>> What are the chances that two different users will have an item with the same id? Hopefully, none, cuz your database doesn't give out conflicting IDs. And that would be really bad. But we should still namespace our query with a user id anyway, just to guarantee that somebody isn't getting something that doesn't belong to them.

******

******

DA SUMIRAM

- *req.params.id* JESTE USTVARI *_id* DOKUMENTA

- *req.user._id* JESTE USTVARI *createdBy* DOKUMENTA

******

******

digresija VEZANA ZA SCHEMAS

VIDECES U OVOM WORKSHOPU DA JE MONGOOSE ODGOVORAN ZA TYPING ID-JA, ODNOSNO U SCHEMI KOJU KORISTIM TYPING JE DEFINISAN SA Mongoos-OVIM TYPEOVIMA

- ONO STO SAM VIDEO JESTE DA SE ZA TO UPOTREBLAJVA MONGOOSEOVA METODA KOJA GENERISE TAKAV ID (A TAKODJE SI VIDEO DA SE U MODELU DEFINISE I TACNO TAJ TYPE ID-JA, KOJI DOLAZI OD MONGOOSE-OVE METODE)

- U PITANJU JE GENERISANJE ID-JA UZ POMOC **mongoose.Types.ObjectId()** (NJEGOV TYPE IZ SCHEMA-E JESTE **mongoose.SchemaTypes.ObjectId**)

SAZNACU KADA BUDEM UCIO AUTHENTICATION KAKO SE GENERISE ID, DA LI JE PRAKSA DA SE KORISTI, POMENUTI MONGOOSE-OV NACIN

******

******

IAKO AUTOR WORKSHOPA TOKOM LIVE CODINGA, NIJE KORISTIO try catch BLOKOVE

JA CU IH KORISTITI U SVOJIM PRIMERIMA

digresija:

U SOLUTION BRANCH-U SE NALAZI CODE SA try catch

TAKO DA NISI POGRSIO STO SI GA DEFINISAO

******

******

PRI KREIRANJU KONTROLERA ZA OVU VEZBU TREBA DA BUDE TAKVA SITUACIJA DA SAMO AUTHENTICATED USER MOZE GET-OVATI, DOKUMENT, KOJI JE ON I KREIRAO

*TO SAM PRIMETIO*

******

## DEFINISEM U crud.js FAJLU

******

digresija:

[LISTA STATUS CODE-OVA](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)(DA TI SE NADJE)

******

### CREATE ONE ('/')

```javascript

const createOne = model => async (req, res) => {
  // VIDIS DA OVDE KORISTIM ONAJ EKSPERIMENTALNI SPREAD ZA OBJEKAT
  // (STO BI TREBALO DA BUDE EKSPERIMENTALNO) A BABEL CE GA
  // TRANSPILE-OVATI U NESTO STO NODE MOZE DA CITA

  // STO SE TICE USEROVOG ID-JA, VIDI DA SE ON SA REQUEST MOZE PROCITATI KAKO SAM DOLE POKAZAO

  try {
    // ONO STA SAM DODAO JESTE    createdBy
    const document = await model.create({ ...req.body, createdBy: req.user._id }) // ZAPAMTI DA TI OVDE NE TREBA exec 
                                                                  // (ON U STVARI OVDE I NE POSTOJI), JER JE POVRATNA 
                                                                  // VREDNOST create METODE , VALIDNI Promise

    res.status(201).json({data: document})    // STAUS CODE ZA KREIRAN JE 201

  }catch(error){

    console.log(error)

    res.status(400).end()       // 400 JE BAD REQUEST

  }

}
```

### GET ONE ('/:id')

KAKO GET-OVATI JEDAN DOKUMENT, AKO SAM SADA U OVU PRICU UVEO I ID, KOJI JE USER SPECIFC

*MORAS SHVATITI DA SU U OBICAJENOJ PRAKSI DVA ID-JA O KOJIMA SAM GOVORIO ZISTA NEOPHODNA, KAKO NE BI DOSLO DO MOZDA NEKOG KONFLIKTA, ODNSONO POSTOJANJA DVA ISTA ID-JA*

DAKLE U OVAKVOM SLUCAJU JA NECU MOCI KORISTIT model.findById, JER IMAM JOS JEDAN ID, KOJI MORA BITI VALIDATED

ZATO MORAM KORISTITI METODU &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **`model.findOne`**

**DAKLE :id-JU, IZ ROUTE-A, TREBA DA ODGOVARA _id DOKUMENTA, KOJEG ZELIM NAZAD**

```javascript

const getOne = model => async (req, res) => {

  const _id = req.params.id     // OPET TI NAPOMINJEM DA TI JE OVO USTVARI ID IZ ROUTE-A (DAKLE :id IZ '/:id')

  const createdBy = req.user._id    // ID USERA, KOJI JE KREIRAO SAM POST

  // ****    digresija:       'ISTI USER ZAHTEVA ISTI POST'

  try{

    const document = await model.findOne({
      _id, createdBy
    })
    .lean()   // lean UKLANJA NEKE METODE SA QueryDocument (MORAM VISE SAZNATI O lean-U)
    .exec()

    // AKO NISTA NIJE PRONADJENO END-UJ REQUEST I RETURNUJ CONTROLLER

    if(!document){
      return res.status(404).end()        // 404    JE STATUS CODE, KADA JE NUSPESAN QUERY-ING
    }

    res.status(200).json({data: document})      // 200 JE KAD JE NESTO USPESNO PRONADJENO

  }catch(error){

    res.status(400).end()           // BAD REQUEST

  }

}

```

## UPDATE ONE (':id/')

```javascript
const updateOne = model => async (req, res) => {

  const _id = req.params.id
  const createdBy = req.user._id

  try{

    const document = await model.findOneAndUpdate(
      {_id, createdBy},   //PRONALAZIM GA OVAKO
      req.body            // SA OVIM GA UPDATE-UJEM
      {new: true}             // ZELIM NOVI DOKUMENT
    )
    .lean()
    .exec()

    if(!document){
      return res.status(404).end()
    }

    res.status(200).json({data: document})

  }catch(error){

    res.status(400).end()

  }

}
```

## DELETE ONE ('/:id')

```javascript
const removeOne = model => async (req, res) => {

  const _id = req.params.id

  const createdBy = req.user._id

  try{

    const document = await model.findOneAndRemove({_id, createdBy}).exec()

    if(!document){
      return res.status(404).end()
    }

    res.status(200).json({data: document})      // SALJEM REMOVED DOKUMENT


  }catch(error){

    res.status(400).end()

  }

}
```

## GET MANY ('/')

**KADA GETT-UJEM MANY, TREBAO BI DA KORISTIM find METODU I DA SAMO QUERY-UJEM UZ POMOC USER ID-JA** (NEMA :id -JA, JER NEMA NI TAKVOG ROUTE-A)

```javascript
const getMany = model => async (req, res) => {

  const createdBy = req.user._id

  try{
    const documents = await model.find({createdBy}).lean().exec()

    if(!documents){

      return res.status(404).end()

    }

    res.status(200).json({data: documents})

  }catch(error){
    res.status(400).end()
  }

}
```

### REKAO SAM DA CU NAPRAVITI FUNKCIJU, KOJA UZIMA MODEL, A OUTPUTUJE OBJEKAT, SA CONTROLLERIMA

```javascript
export const crudControllers = model => ({
  getMany: getMany(model),
  getOne: getOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
  crateOne: createOne(model)
})
```

## EVO POGLEDAJ SAV CODE FAJLA crud.js

```javascript
const createOne = model => async (req, res) => {
  
  try {
    // 
    const document = await model.create({
      ...req.body,
      createdBy: req.user._id
    }) 

    res.status(201).json({ data: document }) 
  } catch (error) {
    console.log(error)

    res.status(400).end()
  }
}

const getOne = model => async (req, res) => {
  const _id = req.params.id 

  const createdBy = req.user._id

  try {
    const document = await model
      .findOne({
        _id,
        createdBy
      })
      .lean()
      .exec()

    if (!document) {
      return res.status(404).end()
    }

    res.status(200).json({ data: document })
  } catch (error) {
    res.status(400).end()
  }
}

const updateOne = model => async (req, res) => {
  const _id = req.params.id
  const createdBy = req.user._id

  try {
    const document = await model
      .findOneAndUpdate(
        { _id, createdBy },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!document) {
      return res.status(404).end()
    }

    res.status(200).json({ data: document })
  } catch (error) {
    res.status(400).end()
  }
}

const removeOne = model => async (req, res) => {
  const _id = req.params.id

  const createdBy = req.user._id

  try {
    const document = await model.findOneAndRemove({ _id, createdBy }).exec()

    if (!document) {
      return res.status(404).end()
    }

    res.status(200).json({ data: document })
  } catch (error) {
    res.status(400).end()
  }
}

const getMany = model => async (req, res) => {
  const createdBy = req.user._id

  try {
    const documents = await model
      .find({ createdBy })
      .lean()
      .exec()

    if (!documents) {
      return res.status(404).end()
    }

    res.status(200).json({ data: documents })
  } catch (error) {
    res.status(400).end()
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})

```

******

STO SE TICE TESTOVA, STALNO SU FAILOVALI (USTVARI I TEST SUITE JE FAILOVAO)

TAK ODA SAM OD TESTOVA ODUSTAO

******