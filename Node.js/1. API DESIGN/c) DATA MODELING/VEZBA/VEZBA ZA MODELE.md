# JEDINI NACIN DA RESIM OVAJ PRIMER JESTE DA PRVO EXECUTE-UJEM TESTOVE

PO NJIAM CU ZNATI TANO STA DA RADIM

ALI PSOTO SU TESTOVI BILI PROBLEMATICNI MORACU VEROVATNO PONOVO DA POKRECEM KOMANDU yarn

**USTVARI UVEK JE PROBLEMATICNA bcypt VERZIJA TAK ODA MORAS DA JE UPDATE-UJES NA LATEST**

*ISTO TAKO PRI POKRETANJU TEST SCRIPTA KOJI KORISTI NODE_ENV, UVEK KORISTI PAKET **cross-env***

**SLEDECI PROBLEM JE TO STO MONGODB (ODNSNO MONGODB SERVER) NECE DA STARTUJE ON STARTUP WINDOWS-A** (MOZDA TI JE TO I U RANIJIM VEZBAMA IZAZIVALO PROBLEME)

TO MOZES RESITI TAKO STO ODES U **Services** (Windows Services) I TAMO MOZES DA PRONADJES MONGOsb SERVER, KOJI MOZES DA STARTUJES

MOZES U MONGODB KONPASU IZVSITI CONNECTIO NA ONAJ DEFAULT PORT

TO BI BILO TO, STO SE TICE MONGO-A, NECU VISE DODAVATI NISTA, OSIM OPET STO GOVORIM DA CU SE MONGO-VIM WORKSHOPOM NAKNADNO, POSEBNO POZABAVITI

## VEZBA SE SASTOJI OD TOGA DA DEFINISEM SCHEMA-U ZA item

STO SE TICE MODELA, ONI SE UVOZE U FAJL, KOJI SE TAMO KORISTI (NECU ULAZITI U OVO ZATO STO NO ZELIM)

## AKO POSMATRAS TESTOVE ZNACES STA TI FALI

DAKLE OVO NIJE I NEKA VEZBA , VEC SAMO 'PUKO PREPISIVANJE'; ODNSONO VIDECU U TERMINALU KAK OJE TEST FAUIL-OVAO, I SA KOJIM VREDNOSTIAM JE FAIL-OVAO

A JA TREBAM DA CITAM TE VALUE I SAM ZAKLJUCIM, KAKO DA DEFINISEM MODEL

## ZA POCETAK IMAS OAKVU SITUACIJU

STRUKTURA PROJEKTA

```javascript
│   index.js
│   server.js
│
└───resources
    └───item
            item.controllerss.js
            item.model.js       // U SUSTINI KORISTICES SAMO OVAJ FAJL ZA VEZBU
            item.router.js

// STO SE TICE FAJLA KOJI KORISTI POMENUTI FAJL (ON GA JEDINI I KORISTI) (ON SE NALAZI NEGDE U ROOT-U, ALI TO NIJE NI BITNO, JER JE U PITANJU SAM OVEZBA SA TESTOM)
```

FAJL *item.model.js* :

```javascript
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    // OVO JE ONO STO TREBAS POPUNITI
  },
  { timestamps: true }
)


// itemSchema.index({ list: 1, name: 1 }, { unique: true })     // NE OBRACAJ PAZNJU NA OVO ZA SADA

export const Item = mongoose.model('item', itemSchema) // OVO JE IZVEZENO DA BI SE KORISTILO U TESTOVIMA
```

## OSTAVICU IVDE RESENJE

FAJL *item.model.js* :

```javascript
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      maxlength: 50,
      required: true,
      trim: true,
      type: String
    },
    status: {
      default: 'active',
      enum: ['active', 'complete', 'pastdue'],
      required: true,
      type: String
    },
    notes: String,
    due: Date,
    createdBy: {
      ref: 'user',
      required: true,
      type: mongoose.SchemaTypes.ObjectId // OVO JE BILO ITERESANTNO OTKRITI
      // DA JE BAS TO ONO STO TU IDE (ALI PRILICNO JE INTUITIVNO BILO ONO OSTAVLJENO U
      // TERMINALU PRI TESTIRANJU) (TREBA MALO PROCESLAJTI TE SUGESTIJE KADA NAPISEM mongoose.)
    },
    list: {
      ref: 'list',
      required: true,
      type: mongoose.SchemaTypes.ObjectId
    }
  },
  { timestamps: true }
)

// itemSchema.index({ list: 1, name: 1 }, { unique: true })

export const Item = mongoose.model('item', itemSchema)

```

I SA GORNJIM CODE-OM SAM PROSAO SVE TESTOVE
