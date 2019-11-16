# KREIRANJE GraphQL SCHEMA-E, BASED ON VEC KREIRANIM MONGOOSE MODELIMA

DOBRO JE OVDE IMATI OTVOREN ONAJ GRAPHQL CHEATSHET DOK RADIM OVU VEZBU

SAMO CU POKAZATI PRVO

```javascript
│   db.js
│   index.js
│   server.js
│
├───config
│       dev.js
│       index.js
│       testing.js
│
├───types
│   ├───coupon
│   │       coupon.gql
│   │       coupon.model.js
│   │       coupon.resolvers.js
│   │
│   ├───product
│   │   │   product.gql                  // OVDE BI TREBALO DA KREIRAM SCHEMA-U BASED ON MODELS
│   │   │   product.model.js             // OVDE JE MODEL
│   │   │   product.resolvers.js
│   │   │
│   │   └───__tests__
│   │           product.resolvers.spec.js
│   │           product.type.spec.js
│   │
│   └───user
│           user.gql
│           user.model.js
│           user.resolvers.js
│
└───utils
        auth.js
        schema.js
```

STO SE TICE GRAPHQL FAJLOVA ONI MOGU IMATI EKSTENZIJU **.graphql** ILI SKRACENO **.gql** (AUTOR WORKSHOP-A KORISTI SKRACNI NACIN)

## CHEATSHEET MI JE VAZNA DA BIH SAZNAO STA SU NA PRIMER ENUMS (U VEZBI  USCHEMA-I SE KORISTI KEYWORD enum)

ZA ENUMS, SCOTT MOSS KAZE DA SU HARDCODED VALUES KOJE SE NE MOGU PROMENITI (ON KAZE DA SU ONE TO U SVASKOM LANGUAGE-U)

PREDPOSTAVLJAM DA TO NEMA VEZE SA ODREDNICOM ENUMERABLE (ISPITACU OVO) (enum CAK POSTOJI I U TYPESCRIPTU, ALI TAMO NISU TYPE-OVI, ODNSONO SA NJIMA SE NE VRSI TYPE ASSERTION, VEC DAJU VREDNOSTI)

OVDE SE ONI KORISTE DAKLE KAO TYPE-OVO

ONI OVDE PREDSTAVLJAJU STRINGOVE

```linux
enum BikeType {
  KIDS
  MOUNTAIN
  ELECTRIC
  BEACH
}
```

PREDPOSTAVLJAM DA TO ZNACI DA **MONTAIN** IMA VREDNOST A TO JE *"MOUNTAIN"*

## extend

NEMOJ DA ZABORAVIS DA ISPRED DEKLARACIJE TYPE-A **Query**, I TYPE-A **Mutation** UVEK STAVIS *extend*

ZASTO?

ZATO STO TI KORISTIS TAKVA DVA TYPE UPRAVO OVDE

```javascript
import { ApolloServer } from 'apollo-server'
import { loadTypeSchema } from './utils/schema'
import { merge } from 'lodash'
import config from './config'
import { connect } from './db'
import product from './types/product/product.resolvers'
import coupon from './types/coupon/coupon.resolvers'
import user from './types/user/user.resolvers'

const types = ['product', 'coupon', 'user']

export const start = async () => {

  // EVO OVDE, U OVO Mschema OBIMU
  // KADA U MOJI MFAJLOVIAM NE BIH STAVIO extend IMAO BI ERROR KOJI GOVORI DA SAM NESTO DEKLARISAO VISE PUTA

  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `
  const schemaTypes = await Promise.all(types.map(loadTypeSchema))

  const server = new ApolloServer({

    // A EVO OVDE SE SVI TI TYPE-OVI STAVLJAJU U JEDAN NIZ

    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, product, coupon, user),
    context({ req }) {
      // use the authenticate function from utils to auth req, its Async!
      return { user: null }
    }
  })

  await connect(config.dbUrl)
  const { url } = await server.listen({ port: config.port })

  console.log(`GQL server ready at ${url}`)
}
```

I UPRAVO TO JE DO APPOLO-A (**SAMO APPOLO DOZVOLJAVA DA SE OVO URADI**) (*DRUGI SERVERI OVO NE DOZVOLJAVAJU, USTVARI VECINA NJIH*)

## PREDSTAVICU OVDE SADA RESENJE VEZBE, UZ MOZDA NEKE KOMENTARE
