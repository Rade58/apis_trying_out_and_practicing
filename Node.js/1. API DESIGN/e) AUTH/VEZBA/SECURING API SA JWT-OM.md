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

// OVDE SE KORISTIO     pre     HOOK ZA DOKUMENT

//  OVO MSAM PROCITAO IZ DOKUMENTACIJE

// >>>>  Middleware (also called pre and post hooks) are functions which are passed control during 
// >>>>  execution of asynchronous functions.


userSchema.pre('save', function(next) {

  // this   SE OVDE ODNOSI NA model 

  if (!this.isModified('password')) {

    // >>>   Pre middleware functions are executed one after another, when each middleware calls next
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

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

export const User = mongoose.model('user', userSchema)

```