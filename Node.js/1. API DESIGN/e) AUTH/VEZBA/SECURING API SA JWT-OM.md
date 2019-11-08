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
│           user.router.js      // (3) OVDE CU KORISTITI POMENUTE KONTROLERE ZA SIGNING IN AND UP, I MIDDLEWARE
│
├───utils
│   │   auth.js  // (1) OVDE SE NALAZE TVOJE FUNKCIJE ZA KREIRANJE NOVOG TOKENA I ZA VERIFIKACIJU TOKENA
|   |           //U ISTOM FAJLU CES PRAVITI KONTROLERE, KOJE SLUZE ZA SIGNING IN I SIGNING UP
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

export const signIn = async (req, res) => {}
export const signUp = async (req, res) => {}

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
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
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

**OVDE MOZES ZAKLJUCITI DA SE, SVE POMENUTO TREBA UPOTREBLJAVATI, UPRAVO KOD *SIGNING IN*-A**

DAKLE NA OSNOVU TOGA USER CE SE IDENTIFIKOVATI ILI NE (PREDPOSTAVLJAM DA JE RIGHT TERM OVDE IDENTIFICATION)

JOS PAR ZAPAZANJA:

- AKO JE PASSWORD PREDHODNO BIO MODIFIED, SIGURNO NECE BITI MATCH-A, JER CE TADA Document.password BITI undefined

## HAJDE SADA DA SE VRATIM NA auth.js GDE CU DEFINISATI PRVO signUp KONTROLER

```javascript
const signUp = async (req, res) => {

  // AKO KORISNIK NIJE UNEO PASSWORD ILI MAIL, ENDUJ REQUEST I POSLAJI MI STATUS 400

  if(!req.body.email || !req.body.password) {
    
    return res.status(400).send({ message: 'email and password needed' })
  }

  // SADA POKUSAVAS KREIRANJE NOVOG DOKUMENTA (NOVOG USER DOKUMENTA)

  try{
    // User JE MODEL KOJI SI UVEZAO (CISTO DA ZNAS)

    const user = await User.create(body)

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

PRILIKOM SIGNUP-A, TOKEN JE KREIRAN I POSLAT DO CLIENT-A (TO TI JE JASNO)

**AKO TOKEN NIJE KREIRAN I POSLAT NAZAD, ZNAJ DA TO TREBA DA ZNACI DA KORISNIK NIJE AUTHORIZED**

RANIJE SAM REKA ODA CU KREIRATI protect MIDDLEWARE, KOJEM CE CILJ BITI DA PROVERAVA DA LI JE CLIENT AUTHORIZED

- DAKLE TO ZNACI DA CU U TOM MIDDLEWARE-U DEFINISATI DA SE POZIVA FUNKCIJA **verifyToken**

- A ON OCIME CE BITI HRANJENA TA FUNKCIJA JESTE UPRAVO TOKEN UZET OD CLIENT-A

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

- TO ZNACI AKO VERIFIKACIJA TOKENA JESTE NEUSPESNA ONDA BI STVARNO I SIGNING IN ILI SIGNING UP, TREBAL IDA BUDU PREKINUTI

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

- TO ZNACI AKO VERIFIKACIJA TOKENA JESTE NEUSPESNA ONDA BI STVARNO I SIGNING IN ILI SIGNING UP, TREBAL IDA BUDU PREKINUTI

******

## SLEDECI KONTROLER KOJIM CU SE POZABAVITI JESTE signIn

```javascript

```

