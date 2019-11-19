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

DAKLE ISPRED SEBE IMAM MONGOOSE-OVU SCHEMA-U, I PREMA NJEMU JA TREBA DA NAPRAVIM GRAPHQL SCHEMA-U

product.model.js FAJL:

```javascript
import mongoose from 'mongoose'
import validator from 'validator'

export const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true,
      default: 'https://via.placeholder.com/150',
      validate: [v => validator.isURL(v), 'Not a valid image url']
    },
    type: {
      type: String,
      required: true,
      enum: ['GAMING_PC', 'BIKE', 'DRONE']
    },
    description: String,
    liquidCooled: {
      type: Boolean,
      required() {
        return this.type === 'GAMING_PC'
      }
    },
    bikeType: {
      type: String,
      enum: ['KIDS', 'MOUNTAIN', 'ELECTRIC', 'BEACH'],
      required() {
        return this.type === 'BIKE'
      }
    },
    range: {
      type: String,
      required() {
        return this.type === 'DRONE'
      }
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    }
  },
  { timestamps: true }
)

export const Product = mongoose.model('product', productSchema)

```

******

digresija:

U SCHEMA-I VIDIN NEKE NOVE STVARI, SA KOJIMA SE RANIJE NISAM NI SUSRETAO, A TO JE enum PROPERTI KOD DEFINISANJA TYPE-OVA

ZATIM NISAM ZNAO DA SE MOGU DEFINISATI FUNKCIJE ZA required PROPERTI (IMA SMISLA...DAKLE U ODNSU AN NESTO FIELD MOZE BITI REQUIRED, I OVO JE NACI NDA SE TO ODRADI)

******

******

*POGLEDAJ JOS JEDNOM GORNJU MONGOOSE-OVU SCHEMA-U*

POSMATRAJUCI GORNJU MONGOOSE SCHEMA-U, MOGU ZAKLJUCITI DA OVO enum BUKVALNO ODREDJUJE, KOJE SVE VREDNOSTI SMEJU BITI ODREDJENI FIELD-OVI

- FIELD *type* MOZE BITI JEDNA OD OVE TRI VREDNOSTI: *'GAMING_PC', 'BIKE', 'DRONE'*

- FIELD *bikeType* MOZE BITI JEDNA OD OVE TRI VREDNOSTI: *'KIDS', 'MOUNTAIN', 'ELECTRIC', 'BEACH'*

**MOZES DA PRIMETIS DA SU DEFINIANE I FUNKCIJE ZA *required* SETTING FIELD-A**

TE FUNKCIJE SE ZOVU [STATIC FUNKCIJE](https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html) (this KOJI JE U NJIMA REFERENCIRA mongoose.SchemaTypeOpts)

**TAKODJE NA ZA *validate* SETTING JE ISTO DEFINISANA FUNKCIJA** (U OVOJ JE KORISCEN I [validator](https://www.npmjs.com/package/validator) PAKET, KOJI PROVERAVA DA LI JE U PITANJU STRING U URL FORMATU)

OVA FUNKCIJA JE PRUZILA DAKLE NEKI CUSTOM VALIDATION (SASVIM JE JASNO DA UZIMA SAM VALUE (TO JOJ JE ARGUMENT) NAMENJEN ZA FIELD I PROVERAVA (ODNOSNO PAKET PROVERAVA) DA LI JE U URL FORMAT-U)

ZATO PREDPOSTAVLJAM DA SE OVA FUNKCIJA USTVARI RUNN-UJE ZA MODEL, ODNOSNO TEK ONDA KADA SE POKUSA PRIMENITI NEKA CRUD METODA NA MODELU

******

******

AKO POGLEDAS GORNJU MONGOOSE SCHEMA-U VIDECES DA TYPE-OVI NEKIH FIELD-OVA ZAVISE OD TYPE-OVA DRUGIH, ODNOSNO ZAVISI TO DA LI CE, POMENUTI FIELD-OVI BITI REQUIRED

******

## HAJDE SADA DA DEFINISEM TYPE-OVE, KOJI CE SE KORISTITI U QUERY I MUTATION TYPE-OVIMA

- PRVI TYPE, KOJI CU KREIRATI CE BITI Product

product.gql FAJL:

```typescript
enum ProductType {
  GAMING_PC
  BIKE
  DRONE
}

enum BikeType {
  KIDS
  MOUNTAIN
  ELECTRIC
  BEACH
}

type Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}
```

NEMOJ DA TE ZBUNJUJE User TYPE, ON JE KREIRAN NEGDE (POZABAVICU SE SA NJIM U DRUGIM VEZBAMA)

U SUSTINI, GORNJI Product TYPE, TREBA DA BUDE TYPE, ONOGA STO JE QUERIED FROM DATBASE 

SLEDECI TYPE CE PREDSTAVLJATI DATA, KOJI SE KORISTI KA OPAYLOAD

U SUSTINI SVE JE ISTO OSIM STO IZOSTAVLJAM createdBy FIELD (JER SE TO TREBA DODAVATI U OBIMU RESOLVERA, KAO POSLEDICA AUTHENTICATION-A (CIME CU SE TEK BAVITI, KASNIJE U WORKSHOP-U))

**ALI NAJVAZNIJA STVAR JE DA JE TO *input* TYPE (MORAM KORISTITI input KEYWORD)**

```typescript
enum ProductType {
  GAMING_PC
  BIKE
  DRONE
}

enum BikeType {
  KIDS
  MOUNTAIN
  ELECTRIC
  BEACH
}

type Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

input NewProductInput {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

```

**KAD JE REC O UPDATEING-U, TU NE TREBA NISTA DEFINISATI DA BUDE REQUIRED**

I NECE SE MOCI UPDATE-OVATI FIELD type

OPET JE input TYPE U PITANJU

```typescript
enum ProductType {
  GAMING_PC
  BIKE
  DRONE
}

enum BikeType {
  KIDS
  MOUNTAIN
  ELECTRIC
  BEACH
}

type Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

input NewProductInput {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

input UpdateProductInput {
  name: String
  price: Float
  image: String
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

```

ZASTO NISTA GORE NIJE REQUIRED

>> KADA BI BILO REQUIRED MORAO BIH DA PORED TE JEDNE STVARI KOJU UPDATE-UJEM , ISTO TAKO DA UPDATE-UJEM I SVE OSTALO, STO MI NARAVNO NE ODGOVARA

## SADA CU DEFINISATI PRODUCT QUERY TYPE

PRIMER ZAHTEVA DA SE TAJ TYPE NAZIVA product (JASNO JE DA CE SE TAKO ZVATI I RESOLVER)

A TAKODJE MORAM KREIRATI I QUERY ZA VISE PRODUCTOVA (TU MORAS KORISTITI ARRY TYPE)

NE ZABORAVI DA SE QUERYING-UJE PREMA ID-JU

```typescript
enum ProductType {
  GAMING_PC
  BIKE
  DRONE
}

enum BikeType {
  KIDS
  MOUNTAIN
  ELECTRIC
  BEACH
}

type Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

input NewProductInput {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

input UpdateProductInput {
  name: String
  price: Float
  image: String
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

extend type Query {
  product(id: ID!): Product!
  products: [Product]!
}

```

## SADA KREIRAM MUTATION TYPE

KADA UPATE-UJES NESTO TREBA TI ID ONOGA STO UPDAYTUJES I PAYLOAD SA KOJIM UPDATE-UJES, U SKLADU S TIM DEFINISSI I TYPE ZA UPDATE MUTATIO

```typescript
enum ProductType {
  GAMING_PC
  BIKE
  DRONE
}

enum BikeType {
  KIDS
  MOUNTAIN
  ELECTRIC
  BEACH
}

type Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

input NewProductInput {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

input UpdateProductInput {
  name: String
  price: Float
  image: String
  description: String
  liquidCooled: Boolean
  range: String
  bikeType: BikeType
}

extend type Query {
  product(id: ID!): Product!
  products: [Product]!
}

extend type Mutation {
  newProduct(input: NewProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  removeProduct(id: ID!): Product!
}

```

## IMAO SAM PROBLEM DA MI TESTOVI PRODJU IAK OJE SVE DEFINISANO KAKO TREBA

## AKO TE ZANIMA KAKO AUTOR WORKSHOPA KORISTI GRAPHQL U TESTOVIMA, A KAKO NA SERVER, POGLEDAJ POSLEDNJI VIDEO FOLDERA 'SCHEMAS'

## DODATNE INFORMACIJE

AKO JE REC O NEKOM PUBLIC API TI MOZES DEFINISATI DA SE NESTO VRACA NAKON REMOVE-A (ZATO JE I OVDE TAK OZADATO) 

A U PRIVATE APIs TO SE NE RADI, MOZDA SE I NE TREBA RADITI

SLEDECA STVAR: DATABASE MI USTVARI GOVORI KOJI FIELD MORA BITI NON NULL, SAMO TREBA POGLEDATI DATABASE, ODNOSNO MONGOOSE SCHEMA-U

PS. VALIDACIJE MOGU BITI DODATE I U RESOLVERIMA
