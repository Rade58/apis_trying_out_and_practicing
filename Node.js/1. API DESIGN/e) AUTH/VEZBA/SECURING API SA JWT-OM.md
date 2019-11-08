# OSIGURAVANJE API-A SA JWT-OM

## JA SADA ZELIM DA POSMATRAM KAKO JE AUTOR WORKSHOPA DEFINISAO TE FUNKCIJE I ZELI MDA VIDIM KAKO JE ON U OVOM PRIMERU KORISTIO SECRETS

******

FILE/FOLDER STRUKTURA PROJEKTA:

```unix
│   index.js
│   server.js
│
├───config                // (2) ONO STO JE INTERESANTNO JESTE DA SU SECRET UZETE ODAVDE
|                         // IZ KONFIGURACIJE DAKLE, PREDPOSTAVLJAM DA SE IZ ENVIROMENTA (env)
|                         // PROSLEDJUJE SECRET, KOJI MOZE DA OVERRIDE-UJE DEFAULT SECRET
|                         // ZADAT U KONFIGURACIJAMA (TAKO JE DEFINISAO AUTOR WORKSHOP-A)
│       dev.js
│       index.js
│       prod.js
│       testing.js
│
├───resources
│   │
│   └───user
│           user.controllers.js       // (4) OVDE SE NALAZE FUNKCIJE
│           user.model.js
│           user.router.js      // (3) OVDE CU KORISTITI POMENUTE KONTROLERE ZA signinG IN AND UP, I MIDDLEWARE
│
├───utils
│   │   auth.js  // (1) OVDE SE NALAZE TVOJE FUNKCIJE ZA KREIRANJE NOVOG TOKENA I ZA VERIFIKACIJU TOKENA
|   |           //U ISTOM FAJLU CES PRAVITI KONTROLERE, KOJE SLUZE ZA signinG IN I signinG UP
|   |             // AL ICES PRAVITI I MIDDLEWARE, PREDPOSTAVLJAM DA CE UPRAVO MIDDLEWARE BITI ODGOVORAN
|   |             // ZA VERIFICATION TOKENA
│   │   crud.js
│   │   db.js

```

******

auth.js FAJL:

```javascript
import config from '../config'      // UVOZIM DAKLE OBJEKAT U KOJEM JE SECRET
import { User } from '../resources/user.model'  // UVOZIM I MODEL ZA USER-A

// NARAVNO UVOZIM I jwt PAKET
import jwt from 'jsonwebtokens'


// SAD MOGU DEFINISATI I METODE, I MOGU KORISTITI Promise, KAKO BI WRAPP-OVAO POZIVANJE
// jwt.verify METODE (TO RADI MZATO STO JE ONA CALLBACK BASED)


// NOVI TOKEN DOBIJAM KAO POVRATNU VREDNSOT sign METODE
const newToken = user => {

  return jwt.sign(
    {id: user.id},         // OBJEKAT SA USER ID-JEM SE KORISTITI KAO PAYLOAD
    config.secrets.jwt,            // SECRET JE PROCITAN IZ config FOLDERA
    {                             // I ZADATO JE VREME KOLIK OTRAJE OVAJ OUTPUTED TOKEN (I TO JE SECRET)
      expiresIn: config.secrets.jwtExp
    }
  )

}

// TOKEN SE PRAVI SINHRONO (** NEKA TI JE NA UMU DA SVUGDE GDE NEMA CALLBACKA (err, result) => {} , 
// U PITANJU JE SINHRONO**)
// POVRATNA VREDNOST GORNJE METODE JESTE DAKLE SAM TOKEN

// DAKLE SECRET SE KORISTI KAO KLJUC U SLEDECOJ METODI

const verifyToken = token => {

  return new Promise((res, rej) => {

    jwt.verify(token, config.secrets.jwt, (err, payload) => {

      if(err) return rej(err)           // OVDE JE SVE JASNO

      res(payload)
    })

  })

}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//  U SLEDECIM KONTROLERIMA TREBA DA SE KORISTE, POMENUTE DVE METODE

export const signin = async (req, res) => {}
export const signup = async (req, res) => {}

// MISLIM DA CE SE VERIFIKACIJA ODIGRAVATI U SLEDECEM MIDDLEWARE-U

export const protect = async (req, res, next) = {

  next()

}

```

## ZELIM DA VIDIM KAKO IZGLEDA MODEL ZA USER-A

**MISLIM DA MI OVDE NECE BITI BAS NAJBOLJE RAZUMLIVO STA SU TO pre I post HOOKS U Mongoos-U (ONI PREDSTAVLJAJU MIDDLEWARE U POGLEDU MONGOOSE-A), ALI TO CU VALJDA SAZNATI KADA SE BUDE MBAVIO KONKRETNO MONGO DB-JEM I MONGOOSE-OM ,A TO JE DRUGI WORKSHOP**

*JA CU IPAK DATI KRATKA OBJASNJENJA VEZNA ZA TO DOK BUDEM EXPLORE-OVAO CODE*

******

A STO SE TICE TYPEOVA MIDDLEWARE-A (IMA IH VISE VRSTA U MONGOOSE-U), [PROCITAJ OVO](https://mongoosejs.com/docs/middleware.html)

******

*resources/user/user.model.js* FAJL:

```javascript
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'     // OVDE SE DAKLE KORISTI PAKET I ZA CRYPTING
                                // STO CE SE KORISTITI ZA HASHING PASSWORD-A

// SA SCHEMA-OM NISTA NE VIDI MSPORNO

// U PITANJU SU email, password I DODATNE OPCIJE

// MEDJUTIM OVOJ SCHEMA-I, JE 'ZAKACEN ONESTO DODATNO'
// POGLEDAJ ISPOD NJE

const userSchema = new mongoose.Schema(
  {

    // ALI HAJDE DA KAZEM NESTO I O SCHEMA-I

    email: {
      type: String,
      required: true,     // EMAIL JE REQIORED
      unique: true,       // MORA BITI JEDINSTVEN
      trim: true
    },

    password: {
      type: String,
      required: true      // I PASSWORD JE REQUIRED
    },
    settings: {
      theme: {
        type: String,
        required: true,
        default: 'dark'
      },
      notifications: {
        type: Boolean,
        required: true,
        default: true
      },
      compactMode: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  },
  { timestamps: true }
)

// EVO VIDIS 

// OVDE SE KORISTI     pre     HOOK ZA DOKUMENT

//  OVO SAM PROCITAO IZ DOKUMENTACIJE

// >>>>  Middleware (also called pre and post hooks) are functions which are passed control during 
// >>>>  execution of asynchronous functions.


// OVU FUNKCIJU CE TRIGGEROVATI NE SAMO       find IL IfindOneAndUpdate..., VEC  I            model.create


userSchema.pre('save', function(next) {         // OV FUNKCIJA KORISTI          this
                                                // ZATO NE SME BITI ARROW FUNKCIJA      JER BI this BILO GLOBAL OBJECT
                                                // OVAKO CE BITI Document INSTANCA STO MI JE I POTREBNO

  // this   SE OVDE ODNOSI NA      Document     INSTANCU

  if (!this.isModified('password')) {  // AKO PASSWORD PROPERTI NIJE MODIFIED         NASTAVLJAS DALJE   (next IS CALLED)
                                            // DAKLE U TOM SLUCAJU SE IDE DALJE NA SLEDECI MIDDLEWARE MONGOOSE-A

    // >>>   Pre middleware functions are executed one after another, when each middleware calls next
    return next()
  }

  // AKO JE         password      MODIFIKOVANO, ODNOSNO AKO JE PASSWORD PROMENJEN, ZELIM DA GA HASH-UJEM

  bcrypt.hash(this.password, 8, (err, hash) => {

    if (err) {          // AKO JE HASHING BIO NEUSPESAN PRELAZIM NA SLEDECI MIDDLEWARE
      return next(err)
    }
                    // ************** OVO JE MOZDA BITNO DA UOCIM  ************************ 

    // AKO JE     password      MODIFIED,        HASHED password      SE KACI NA      Document INSTANCU

    this.password = hash
    next()
  })
})

// DAKLE, NA PRIMER PRI SVAKOM IZVRSENJU      model.findOneAndUpdate IL Imodel.create   IZVRSICE SE GORNJI MIDDLEWARE
// AKO ERROR-UJE OUT, ERROR CE BITI PROSLEDEJEN A NECE SE IZVSITI NI JEDAN SLEDECI MIDDLEAWARE (A OVO JE JEDINI KOJI SAM 
// ZADAO)


// SLEDECA METODA       UZIMA ONAJ      HASHED PASSWORD         SA          Document      INSTANCE

// I KORISTIM TAJ HASH      ZAJEDNO SA PASSED IN PASSWORD-OM, KAKO BIH PROVERIO DA LI HASH POTICE OD PASSED IN PASSWORD-A

userSchema.methods.checkPassword = function(password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}

// DAKLE GORNJU METODU JA MOGU KORISTITI NA MODELU U OBIMU KONTROLERA-A

// AKO IMAS DILEMU ZA GORNJI COLLBACK err CE BITI false, AKO NIJE undefined
// A same CE BITI true AKO NIJE undefined


// I NAPRAVLJEN JE SADA MODEL OD POMENUTE SCHEM-E

// ONO STA JE INTERESANTNO JESTE DA CE SE PRI UPOTREBI BILO KAKVE METODENA      MODELU      (KOJA KREIRA DOKUMENT ILI 
// RADI QUERY-ING)        POKRENUTI       GORNJI      'save'      HOOK

export const User = mongoose.model('user', userSchema)

```

>>>> CISTO DA NE BUDES U ZABLUDI DOCARACU KAKAV BI BIO SCENARIO GDE BI SE POZIVALA GORNJA FUNKCIJA (checkPassword); UZ STA BI SE KORISTIO OUTPUT ONOGA STO PRODUCE-UJE MONGOOSE-OV MIDDLEWARE, ODNOSNO save HOOK

- U JEDNOM KONTROLERU SE POZOVE NA PRIMER *model*.**findById()**

- *`Document`* INSTANCA KOJA JE PRONADJENA JE ZBOG save HOOK-A, KOJI JE TRIGGERED DOBILA PROPERTI *password*

- ONDA JA MOGU ODMAH, U OBIMU POMENUTOG KONTROLERA PROCITATI, HASH VREDNOST SA POMENUTOOG password PROPERTIJA

- USTVARI UZIMAM METODU **model.methods.checkPassword()** I PROSLEDJUJEM JOJ VREDNSOT *password* PROPERTIJA DOKUMENTA

- IMACU MATCH ILI NECU IMATI MATCH

**OVDE MOZES ZAKLJUCITI DA SE, SVE POMENUTO TREBA UPOTREBLJAVATI, UPRAVO KOD *signinG IN*-A**

DAKLE NA OSNOVU TOGA USER CE SE IDENTIFIKOVATI ILI NE (PREDPOSTAVLJAM DA JE RIGHT TERM OVDE IDENTIFICATION)

JOS PAR ZAPAZANJA:

- AKO JE PASSWORD PREDHODNO BIO MODIFIED, SIGURNO NECE BITI MATCH-A, JER CE TADA Document.password BITI undefined

## HAJDE SADA DA SE VRATIM NA auth.js GDE CU DEFINISATI PRVO signup KONTROLER

```javascript
export const signup = async (req, res) => {

  // AKO KORISNIK NIJE UNEO PASSWORD ILI MAIL, ENDUJ REQUEST I POSLAJI MI STATUS 400

  if(!req.body.email || !req.body.password) {
    
    return res.status(400).send({ message: 'email and password needed' })
  }

  // SADA POKUSAVAS KREIRANJE NOVOG DOKUMENTA (NOVOG USER DOKUMENTA)

  try{
    // User JE MODEL KOJI SI UVEZAO (CISTO DA ZNAS)

    const user = await User.create(req.body)

    // KREIRAS TOKEN OD PAYLAOD-A, KOJ ICE BITI OBJEKAT SA USER-OVIM ID-JEM
    const token = newToken(user)

    // SADA JE TOKEN POSLAT NAZAD DO CLIENT-A (ZASTO? RECI CU U TEKSTU U NASTAVKU)

    return res.status(201).send({ token })


  }catch(error){

    return res.status(500).end()          // STATUS 500 PREDSTAVLJA STATUS ZA GENERIC ERROR NA SERVERU
                                          // JER IZ VISE RAZLOGA JE ERROR OVDE MOGA OBITI THROWN

  }

}
```

**DA BI SE VERIFIKOVAO, ODNSONO DA BI DOBIO PAYLAOD, POTREBN ISTI SECRET I POTREBAN JE TOKEN KOJI SI POSLAO KORISNIKU CLIENT-U, KADA SI GA KREIRAO**

**DAKLE TOKEN JE POSLAT KORISNIKU, I TAJ TOKEN I MOJ SECRET, SLUZE KAO KLJUCEVI, DA SE OPET DOBIJE PAYLAOD**

*A KAKO CLIENT CUVA, TAJ TOKEN*?

U [OVOM CLANKU](https://flaviocopes.com/jwt/) SAM SAZNAO DA TOKEN NA CLIENTU TREBA DA SE CUVA U [HttpOnly COOKIE-U](https://www.owasp.org/index.php/HttpOnly)

OVDE JE RECENO TAKODJE DA SE JWT NE BI TREBALO KORISTITI SA SESSIONS-IMA

STO SE TICE COOKIES, [PROCITAJ SVE CLANKE KOJE JE NAPISAO FLAVIO COPES](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/Node.js/1.%20API%20DESIGN/!%20DODATNO%20I%20VAZNO/4%29%20!%20COOKIES.md)

NAROCITO POSTOJI JEDAN CLANAK, KOJ ICE TI POMOCI KADA NAUCIH GraphQl, AKONKRETN OSE TICE KORISCENJA JWT-JA I GraphQl-A ZA AUTHENTICATION

## VAZNE INFORMACIJE ZA protect MIDDLEWARE I authorization HEADER

PRILIKOM signup-A, TOKEN JE KREIRAN I POSLAT DO CLIENT-A (TO TI JE JASNO)

**AKO TOKEN NIJE KREIRAN I POSLAT NAZAD, ZNAJ DA TO TREBA DA ZNACI DA KORISNIK NIJE AUTHORIZED**

RANIJE SAM REKA ODA CU KREIRATI protect MIDDLEWARE, KOJEM CE CILJ BITI DA PROVERAVA DA LI JE CLIENT AUTHORIZED (**I ON TO TREBA DA PROVERAVA ZA SVAKI ROUTE API-A**)

- DAKLE TO ZNACI DA CU U TOM MIDDLEWARE-U DEFINISATI DA SE POZIVA FUNKCIJA **verifyToken**

- A ONO CIME CE BITI HRANJENA TA FUNKCIJA JESTE UPRAVO TOKEN UZET OD CLIENT-A

KAKO UZET?

**KORISTICU authoriazation HEADER**

```javascript
req.headers.authorization
```

******

(MISLIM DA JE OVO STO CU RECI SLEDECE, NAJBITNIJA STVAR)

JOS JEDNA BITNA STVAR KOJU BI MOZDA TREBALO DA PRIMETIM JESTE, DA UZIMAJUCI U TO DA CE MIDDLEWARE BITI RUNNED PRI SVAKOM ROUTE-U (VEZANO MZA USER-A), TO ZNACI DA:

- AKO protect THROW-UJE ERROR, PRE POZIVA next-A, TO ZNACI SLEDECE"

>> YOU NEED TO lock down the API routes.

- TO ZNACI AKO VERIFIKACIJA TOKENA JESTE NEUSPESNA ONDA BI STVARNO I signinG IN ILI signinG UP, TREBAL IDA BUDU PREKINUTI

******

## VAZNE INFORMACIJE ZA PROVERU CREDENTIALS-A (E PA I TADA JE POTREBNO PRAVITI I SLATI NOVI TOKEN)

DAKLE KADA SE KORISNIK SIGN-UJE IN, KADA DODJE REQUEST, JA CU MORATI POSEGNUTI U DATBASE PO PASSWORD (TO USTVARI NECU BITI JA NEGO MONGOOSE-OV MIDDLEWARE), KAKO BI PROVERIO CREDENTILS

KORISTICES NARAVO ONU METODU, KOJU SI DEFINISAO, I KOJA SE ZOVE **checkPassword** (TU CE SE DESITI I ONAJ ABSTRACTION, PO KOJEM SE POKRECE MONGOOSE-OV MIDDLEWARE, KOJI UZIMA PASSWORD, HASH-UJE GA I KACI GA NA USER Document INSTANCU)

*AKO JE CHECKING PASSWORD-A BIO USPESAN, TREBALO BI DA OPET KREIRAM **TOKEN** KOJI SE OPET SALJE DO CLIENT-A* 

*AKO CHECKING PASSWORD-A **NIJE** BIO USPESAN, NECU PRAVITI NOVI TOKEN I ONI NECE BITI AUTORIZOVANI*

OPET CU OSTAVITI OVO

******

(MISLIM DA JE OVO STO CU RECI SLEDECE, NAJBITNIJA STVAR)

JOS JEDNA BITNA STVAR KOJU BI MOZDA TREBALO DA PRIMETIM JESTE, DA UZIMAJUCI U TO DA CE MIDDLEWARE BITI RUNNED PRI SVAKOM ROUTE-U (VEZANO MZA USER-A), TO ZNACI DA:

- AKO protect THROW-UJE ERROR, PRE POZIVA next-A, TO ZNACI SLEDECE"

>> YOU NEED TO lock down the API routes.

- TO ZNACI AKO VERIFIKACIJA TOKENA JESTE NEUSPESNA ONDA BI STVARNO I signinG IN ILI signinG UP, TREBAL IDA BUDU PREKINUTI

******

## SLEDECI KONTROLER KOJIM CU SE POZABAVITI JESTE signin

```javascript
export const signin = async (req, res) => {

  if(!req.body.email || !req.body.password){
    return res.status(400).send({ message: 'need email and password' })
  }

  const invalid = { message: 'invalid email password combination' }

  try{
    
    // KADA TRAZIM OBJEKAT IZ BAZE, MOGU KORITITI select METODU, KOJOM SE SPECIFICIRA, KOJI FIELD-OVI
    // DA BUDU INCLUDED U UZETOM DOKUMENTU

    // ONO STO MI NIJE JASNO ZASTO SU SELECTED I email I password  (AKO JE MIDDLEWARE MONGOOSE-A (save HOOK, VEC UZEO 
    // PASSWORD I ZAKACIO GA NA user DOKUMENT))
    const user = await User.findOne({ email: req.body.email }).select('email password').exec()

    if(!user) return res.status(401).send(invalid)    // 401 ZNACI UNAUTHORIZED

    // PASSWORD, KOJI JE UZEO save HOOK MONGOOSA JE U OVOM TRENU ZAKACEN ZA DOKUMENT
    // OVA METODA UNDER THE HOOD PROVERAVA DA LI JE PASSWORD ZAKAZEN ZA DOKUMENT I PASSWORD KOJI JE 

    const isMatching = await user.checkPassword(req.body.password)

    if(!isMatching) return res.status(401).send(invalid)

    // AKO JE AUTHORIZATION PROSAO SVE PROVERE OPET PRAVIM NOVI TOKEN
    // I SALJEM GA CLIENT-U

    const token = newToken(user)

    return res.status(201).send({token})

  }catch(error){
    
    console.error(error);

    return res.status(500).end()

  }

}
```

## SADA CU USE POZABAVITI SA protect MIDDLEWARE-OM

*MOZDA IMAS ZABLUDU DA CES KORISTITI protect SAMO ZA signin ILI signup ,NE TO NIJE TAKO* 

**protect TREBA DA SE POZIVA NA NIVOU CELOG API, ZA SVAKI ROUTE, ZA SVAKI PATH MOG API-A**

*DAKLE MORAM PROTECT-OVATI SVE API ROUTES*

U SLUCAJU MOG PRIMERA TO SU SVI ROUTE-OVI, KOJI POCINJU SA `'/api'`

DAKLE MIDDLEWARE protect, MORA SE RUN-OVATI ZA SVAKI POMENUTI ROUTE, I MORA DA TA TRAZI ADJACENT WEB TOKEN IZ **authorization** HEADER-A

```javascript
req.headers.authorization
```

******

digresija (FRONT END)

OVO ZNACI DA CE SE NA CLENTU MORATI POSLATI REQUEST SA HEADEROM (authorization)

TOKE NJE CUVAN U LOCAL STORAGE-U BROWSER-A, ODAKLE SE SALJE NAZAD

[link (stack overflow)](https://stackoverflow.com/questions/46379410/how-to-handle-jwt-token-on-the-client-site-in-node-js-application)

******

KADA UZMES TOKEN U OBIMU MIDDELWARE-A (protect), KORISTIS GA SA METODOM **verifyToken**, KOJ USI KREIRAO RANIJE

**AKO JE REC O PRAVOM TOKENU, SVE JE U REDU**

**AKO JE REC O POGRESNOM TOKENU, *NEKO POKUSAVA DA NAPADNE TVOJ WEB APP***

>>>> Every route that's mounted at '/api' should use this

>>>> OSIM NARAVNO ROUTE-OVA ZA signin I signup ,JER TADA NE BI BIO MOGUC signinG IN AND signinG UP

******

VAZNO

KADA NAPRAVIS SVE KONTROLERE, TADA U server.js UVOZIS signin, signup ,I protect

- **signin** TREBA DA IMA SVOJ ROUTE `'/signin'`

- **signup** TREBA DA IMA SVOJ ROUTE `'/signup'`

- **protect** CE BITI MOUNTED ZA '/api'

TAKO DA CE SE ZA SVAKI ROUTER KOJI SAM KREIRAO TOKOM VEZBI (itemRouter, listRouter) UPRAVO KORISTITI MIDDLEWARE *protect*

******

### req.headers.authorization VREDNOST

FORMAT U KOJEM TOKEN DOLAZI SA CLIENT-A, JE OVAKAV

- `"Bearer 56FEHJJGETTRHFGFGFJ"`

DAKLE STRING, KOJI SE SASTOJI OD WORDA `Bearer` I NAKON NJEGA JE TOKEN

******

VAZNO:

AKO TOKEN DODJE SAMO KAO `'SDFSDFGGDFGHDFHG34543'`, **TO NIJE U REDU**

******

**ONO STO TAKODJE MOZES DEFINISATI NAKO NVERIFIKACIJE, U OBIMU ISTOG MIDDLEWARE-A, JESTE DA SE GET-UJE USER**

*TO CES MOCI URADITI JER JE PAYLOAD, UPRAVO OBJEKAT SA USER-OVIM ID-JEM*

******

**OVDE SE KRIJE *`OTKROVERNJE`*** U POGLEDU RANIJEG KORISCENJA

>>>> A STA MOGU SA MTIM USER OBJEKTOM KADA GA GETT-UJEM

**ATTACH IT TO THEIR REQUEST OBJECT BEFORE CALLING next()**

SECAS SE KAKO SI KORISTIO ROUTES U itemRouteru IL IlistRouter-U IZ PRIMER-A

ACCESS-OVAO SI user-A OVAKO

```javascript
req.user
```

I IMAO SI DILEMU KAKO JE UOPSTE uesr NA Request OBJEKTU

**E PA ZA TO JE ODGOVORAN *protect* MIDDLEWARE (ON JE KACIO USER-A ZA *req* PRE POZIVANJA next-A) I ZATO SU OSTALI KONTROLERI, MOGLI KORISTITI *`req.user`***

SAMO JA TO TADA NISAM ZNAO

******

>>>> after you verify the token, you then need to do a database query to see if this user exists. So cool story you gave me a valid JWT, that hasn't been expired yet, but that user just deleted their profile yesterday.

I ZISATA NAKON STO SE VERIFIKUJE TOKEN ,TREBA DA SE URADI DATBASE QUERY ZA USER-OM, DA BI SE PROVERIL ODA LI USER POSTOJI

COOL STORY:

DAO SI JWT, KOJI NUISU EXPIRED YET ALI JE TAJ USER DELETE-OVAO NJEGOV PROFILE JUCE (ZATO SI PROVERAVAO DA LI USER POSTOJI)

## KAD SAM SVE TO OBJASNIO, MOGU DEFINISATI protect MIDDLEWARE, I TO JE ON OSTO CE PROTECT-OVATI SVE ROUTES, MOG API-A

```javascript
export const protect = async (req, res, next) => {

  const bearer = req.headers.authorization

  if(!bearer || !bearer.startsWith('Bearer ')){
    return res.status(401).end()                    //  401 ZNACI Unauthorized
  }

  const token = bearer.split('Bearer ')[1].trim()

  let payload

  try {

    payload = await verifyToken(token)

  }catch(error){

    return res.status(401).end()

  }

  const user = await User.findById(payload.id)
    .select('-password')        // PREDPOSTAVLJAM DA LI OVO ZNACI 'MINUS PASSWORD' (BEZ NJE DAKLE)
    .lean()   // lean JE OVDE 'PRETVORILO' MONGOOSE Document U JSON Document (moram nauciti vise o ovome)

                  // USTVARI POMENUTO SE KORISTIL ODA NE BIH MORAO RADITI   use.toJSON()

    .exec()
    
  if(!user){

    return res.status(401).end()

  }

  req.user = user       // KACIM user-A NA REQUEST, JER ZELIM DA BUDE PRIOSLEDJEN DALJE GDE CE GA MOCI KORISTITI
                        // KONTROLERI

                        // DAKLE AKO POSMATRAS RANIJE VEZBE GDE SAM KORISTITO req.user._id U KONTROLERIMA
                        // E PA TO POTICE ODAVDE JER SE OVDE KACI
  // I POZIVAM next

  next()

}

```

## POTREBNO JE SADA UVESTI signup, signin KONTROLERE U server.js; A TAKO DJE TREBA UVESTI I protect MIDDLEWARE

TAMO ZELIM DA IH UPOTREBIM NA NACIN, KOJ ISAM VEC OBJASNIO

```javascript
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { signup, signin, protect } from './utils/auth'      // EVO GA UVOZ
import { connect } from './utils/db'
import userRouter from './resources/user/user.router'
import itemRouter from './resources/item/item.router'
import listRouter from './resources/list/list.router'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// UPOTREBA DVA KONTROLERA ZA DVA POSEBNA ROUTE-A
// KORISTIS post VERB NARAVNO
app.post('/signup', signup)
app.post('/signin', signin)

// BITNO JE DA SE OVDE protect MIDDLEWARE MOUNT-UJE, PRE SVIH DRUGIH ROUTE-RA, KOJI KORISTE '/api' ROUTE
app.use('/api', protect)

app.use('/api/user', userRouter)
app.use('/api/item', itemRouter)
app.use('/api/list', listRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}

```
