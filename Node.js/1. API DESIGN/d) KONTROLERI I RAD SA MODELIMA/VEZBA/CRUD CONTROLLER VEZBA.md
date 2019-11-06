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

:one: KADA SE U MONG-U KREIRA DOKUMENT, ONO STO MU JE DATO AUTOMATSKI, JESTE PROPERTI **_id** (DAKLE UVEK MU JE DA TAJ ID)

:two: KADA SE DEFINISU ROUTE-OVI, ONO STO SE IMA NA UMU KADA SE DEFINISE '/:id' JETE DA TO TREBA DA PREDSTAVLJA UPRAVO TAJ ID KOJI MONGO ZADA JE NOVOKREIRANOM DOKUMENTU

:three: ALI TO NIJE JEDINI ID; DRUGI ID KOJI SE TREBA ZADA TI JE USER SPECIFIC ID (ILI BOLJE RECI ID KOJI ZADAJEM JA); I OBICNO JE TO PROPERTI **createdBy** U JEDNOM DOKUMENTU

**U SUSTINI SE TREBA URADITI SLEDECE ZA createdBy**

- KADA REQUEST DODJE, PRE STAVLJANJA NOVOG DOKUMENTA U DATABASE, TREBA SE DODATI I **creadetBy** PROPERI

- TO JE UVEK ID KOJI SE CITA OD ONOGA KOJE POSLAO REQUEST, DAKLE SA AUTHENTICATED CLIENT-A, JER AUTHENTICATED CLIENT IMA JEDINI MOC DA KREIRA DOKUMENTE (TAKVA JE PRAKSA SVUGDE)

- A TAJ USER ID TREBAL OBI DA BUDE GENERATED KADA SE AUTHENTICATE-UJE USER

VIDECES U OVOM WORKSHOPU DA JE MONGOOSE ODGOVORA NZA KREIRANJE TAKVOG ID-JA

- ON OSTO SAM VIDEO JESTE DA SE ZA TO UPOTREBLAJVA MONGOOSEOVA METODA KOJA GENERISE TAKAV ID (A TAKODJE SI VIDEO DA SE U MODELU DEFINISE I TACNO TAJ TYPE ID-JA, KOJI DOLAZI OD MONGOOSE-OVE METODE)

- U PITANJU JE GENERISANJE ID-JA UZ POMOC **mongoose.Types.ObjectId()** (NJEGOV TYPE IZ SCHEMA-E JESTE **mongoose.SchemaTypes.ObjectId**)

******

SAZNACU KADA BUDEM UCIO AUTHENTICATION KAKO SE GENERISE ID, DA LI JE PRAKSA DA SE KORISTI, POMENUTI MONGOOSE-OV NACIN

******

******

IAKO AUTOR WORKSHOPA TOKOM LIVE CODINGA, NIJE KORISTIO try catch BLOKOVE

JA CU IH KORISTITI U SVOJIM PRIMERIMA

digresija:

U SOLUTION BRANCH-U SE NALAZI CODE SA try catch

TAK ODA NISI POGRSIO STO SI GA DEFINISAO

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

    const document = await model.create({ ...req.body, createdBy: req.user._id }) // ZAPAMTI DA TI OVDE NE TREBA exec (MISLIM DA NECE N IRADITI)

    // JER TO NECE BITI FAKE PROMISE

    res.status(201).json({data: document})    // STAUS CODE ZA KREIRANJE JE 201

  }catch(error){

    console.log(error)

    res.status(400).end()       // 400 JE BAD REQUEST

  }

}
```

### GET ONE ('/:id')

KAKO GETT-OVATI JEDAN DOKUMENT, AKO SAM SADA U OVU PRICU UVEO I ID, KOJ IJE USER SPECIFC

*MORAS SHVATITI DA SU U OBICAJENOJ PRAKSI DVA ID-JA O KOJIMA SAM GOVORIO ZISTA NEOPHODNA, KAKO NE BI DOSLO DO MOZDA NEKOG KONFLIKTA, ODNSONO POSTOJANJA DVA ISTA ID-JA*

DAKLE U OVAKVOM SLUCAJU JA NECU MOCI KORISTIT model.findById, JER IMAM JOS JEDAN ID, KOJI MORA BITI VALIDATED

```javascript

const getOne = model => async (req, res) => {

  // ZATO MORAM KORISTITI METODU        model.findOne

  try{

    const document = await model.findOne({
      _id: req.user._id,
      createdBy: req.param.id
    }).exec()

    // AKO NISTA NIJE PRONADJENO END-UJ REQUEST I RETURNUJ CONTROLLER

    if(!document){
      return res.status(404).end()      
    }

    res.status(200).json({data: document})

  }catch(error){

    res.status(400).end()

  }

}



export const getOne = model => async (req, res) => {
  const createdBy = req.user._id
  const _id = req.params.id

  try {
    const document = await model
      .findOne({ createdBy, _id })
      .lean()
      .exec()

    if (!document) {
      return res.status(404).end()    // 404 JE STATUS CODE ZA 'NOT FOUND'
    }

    res.status(200).json({ data: document })
  } catch (error) {
    res.status(400).end()
  }
}


```

## UPDATE ONE (':id/')

```javascript
const updateOne = model => async (req, res) => {

  try{

    const _id = req.user._id;
    const createdBy = req.param.id;

    const document = await model.findOneAndUpdate(
      {_id, createdBy},
      {new: true}             // ZELIM NOVI DOKUMENT
    ).exec()

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


  try{

    const _id = req.user._id;
    const createdBy = req.param.id;

    const document = await model.findOneAndRemove({_id, createdBy}).exec()

    if(!document){
      return res.status(404).end()
    }

    res.status(200).json({data: document})


  }catch(error){

    res.status(400).end()

  }

}
```

## GET MANY ('/')

**KADA GETT-UJEM MANY, TREBAO BI DA KORISTIM find METODU I DA SAMO QUERY-UJEM UZ POMOC USER ID-JA**

```javascript
const getMany = model => async (req, res) => {

  try{
    const documents = await model.find({createdBy: req.user._id}).exec()

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

    const document = await model.create({ ...req.body, createdBy: req.user._id }).exec()
    res.status(201).json({data: document})
  
  }catch(error){

    console.log(error)
    res.status(400).end()

  }

}

const getOne = model => async (req, res) => {

  try{

    const document = await model.findOne({
      _id: req.user._id,
      createdBy: req.param.id
    }).exec()

    if(!document){
      return res.status(404).end()
    }

    res.status(200).json({data: document})

  }catch(error){

    res.status(400).end()

  }

}


const updateOne = model => async (req, res) => {

  try{

    const _id = req.user._id;
    const createdBy = req.param.id;

    const document = await model.findOneAndUpdate(
      {_id, createdBy},
      {new: true}
    ).exec()

    if(!document){
      return res.status(404).end()
    }

    res.status(200).json({data: document})

  }catch(error){

    res.status(400).end()

  }

}

const removeOne = model => async (req, res) => {

  try{

    const _id = req.user._id;
    const createdBy = req.param.id;

    const document = await model.findOneAndRemove({_id, createdBy}).exec()

    if(!document){
      return res.status(404).end()
    }

    res.status(200).json({data: document})


  }catch(error){

    res.status(400).end()

  }

}


const getMany = model => async (req, res) => {

  try{
    const documents = await model.find({createdBy: req.user._id}).exec()

    if(!documents){

      return res.status(404).end()

    }

    res.status(200).json({data: documents})

  }catch(error){
    res.status(400).end()
  }

}



////////////////////////


export const crudControllers = model => ({
  getMany: getMany(model),
  getOne: getOne(model),
  updateOne: updateOne(model),
  removeOne: removeOne(model),
  crateOne: createOne(model)
})

```