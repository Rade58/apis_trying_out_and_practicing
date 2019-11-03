# ROUTER AND SUB ROUTES VEZBA

UPUTSTVA ZA VEZBU SU U README FAJLU REPO-A

IMAM PROBLEMA SA DEPENDANCIES-IMA OCIGLEDNO, JER NE MOGU DA PASS-UJEM TESTS IAKO JE SVE U REDU

U JEDNOM TRENUTKU SAM PROSAO TEST ALI SAM TWEAK-OVAO NESTO SA DEPENDANCIESIMA

**USTVARI TREBAO SAM DA KORISTIM yarn ZA UPDATING SVIH PAKETA** (JER SAM VEROVATNO NESTO POGRESNO INSTALIRAO, ODNOSNO 'VUKAO' SAM node_modules SA SOBOM, A MENJAO SAB BRANCHE-VE)

- yarn

U SUSTINI KADA NAUCIM TESTIRANJE SA JEST-OM, TREBALO BI DA ZNAM STA RADIM, A ZA SADA SE TIME NECU BAVITI

## STRUKTURA PROJEKTA

```javascript
│   index.js
│   server.js
│
└───resources
    └───item
            item.controllerss.js
            item.model.js
            item.router.js
```

## MISLIM DA JE BILO STA SUVISNO OBJASNJAVATI, SAMO CU PREDSTAVITI STRUKTURU FAJLOVA (NARAVNO index.js FAJL SE RUNN-UJE KAO CLI EXECUTABLE)

index.js

```javascript
import { start } from './server'
start()

```

server.js

```javascript
import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './utils/db' // NE OBRACAJ PAZNJU NA OVO ZA SDDA, TO JE USTVARI VEZANO ZA MongoDB

// UVOZIM ROUTER
import itemRouter from './resources/item/item.router'
/// /

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// MOUNT-UJEM GA, ALI GA KORISTIM ZA ROUTE `'api/item'`
app.use('/api/item', itemRouter)
// MISLIM DA JE DOBRO DA OVDE KORISTIS 'CELE PATH-OVE', JER TO TI DAJE BOLJI UVID U PROJEKAT
// STO SI GORE I URADIO

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

item.controllerss.js

```javascript
export const getOne = (req, res) => {
  console.log('getting')
  res.send({ message: 'ok' })
}

export const createOne = (req, res) => {
  console.log('creating')
  res.send({ message: 'ok' })
}

export const updateOne = (req, res) => {
  console.log('updating')
  res.send({ message: 'ok' })
}

export const removeOne = (req, res) => {
  console.log('removing')
  res.send({ message: 'ok' })
}

//

export const getAll = (req, res) => {
  console.log('updating')
  res.send({ message: 'ok' })
}

export const createAll = (req, res) => {
  console.log('removing')
  res.send({ message: 'ok' })
}

```

item.router.js

```javascript
// NEMA POTREBE DA ISTA DODAJEM OD KOMENTARA ZA ROUTER JER JE BIO GOTOVO PRAZAN
// KADA SAM POCINJAO DA PISEM CODE U NJEMU

import { Router } from 'express'

import controllers from './item.controllers'

const router = Router()

// A OVO JE MOZDA NAJVAZNIJI DEO, I TU KONKRETNO MISLIM NA ROUTE-E
// ON JE KAO STO VIDIS OBICNI SLASH

router
  .route('/')
  .get(controllers.getAll)
  .post(controllers.createAll)

router
  .route('/:id')
  .put(controllers.updateOne)
  .delete(controllers.removeOne)
  .get(controllers.getOne)

// ZASTO MISLIM DA JE OVO VAZNO
// PA MISLIM DA CE OVAJ ROUTER NA TAJ NACIN BITI VISE REUSABLE

// JER DA SI STAVIO NA PRIMER /item ILI api/item TI TAMO GDE GA BUDES KORISTIO NECES IMATI
// DOBAR UVIT KOJE ROUTE-OVE OVAJ ROUTER HANDLE-UJE

// U OSTALOM ZATO SAM U SERVER FAJLU MOUNT-OVAO OVAJ ROUTER UPRAVO NA api/item

export default router

```

## AUTOR WORKSHOPA KAZE DA POSTOJI JOS MNOGO NACINA DA SE OVO URADI, ALI OVAKAV NACIN ON KORISTI

NE VIDIM ZASTO JA, OVAJ ISTI NACIN NE BI USVOJIO
