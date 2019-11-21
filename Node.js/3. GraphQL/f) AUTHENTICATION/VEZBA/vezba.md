# AUTHENTICATION VEZBA

POCECU TAKO STO CU POKAZATI STRUKTURU FILE-OVA I FOLDER-A

```javascript
│   db.js
│   index.js
│   server.js       // OVDE CU DEFINISATI AUTHENTICATION U OBIMU context FUNKCIJE, KOJA SE DODAJE PRI INSTATICIRANJU APPOLO SERVER-A
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
│   │   │   product.gql
│   │   │   product.model.js
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
        auth.js             // OVD SE NALAZE FUNKCIJE ZA AUTH
        schema.js
```

KRENUCU PRVO OD User-OVOG MODELA (FAJL user.model.js)

```javascript
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'          // KORISTICE SE ZA HASHING PASSWORD-A

export const roles = {            // OVE VREDNSOTI TREBAJ UDA BUDU ENUMERABLE ZA USEROV FIELD role
  member: 'member',
  admin: 'admin'
}

// JASNO MI JE DA JEDAN User DOKUMENT TREBA DA IMA email, password, role (DA LI JE ADMIN ILI MEMEBER)
// I IMACE Api KEY KOJI MU DOZVOLJAVA DA KORISTI API

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
    role: {
      type: String,
      enum: Object.keys(roles),
      required: true,
      default: roles.member             // "member" JE DEFAULT
    },
    apiKey: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
)

userSchema.pre('save', function(next) {    // PRE NEGO STO SE IZVRSI MUTATION OVAJ MIDDLEWARE SE POKRECE
                                           // IZVRSAVA SE NAKON VALIDACIJE
                                           // ASINHRONA JE FUNKCIJA (ZATO STO IMA next)
  if (!this.isModified('password')) {      // AKO JE password FIELD PROMENJEN ODMAH SE POZIVA next 
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {        // HASHING PASSWORD-A, KOJI SE ISTIO OBAVLJA ASINHRONO
    if (err) {
      return next(err)
    }

    this.password = hash        // NA DOKUMENT SE KACI      pasword     PROPERTI SA HASHED PASSWORD-OM
    next()
  })
})

userSchema.methods.checkPassword = function(password) {         // METODA KOJA MATCH-UJE PASSWORD
                                                                // IAMCE JE QUERIED User DOCUMENT
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

A SADA ZELIM DA POKAZEM I auth.js FAJL

```javascript
import { User } from '../types/user/user.model'                 // KAO STO VIDIS UVDEN JE User MODEL
import cuid from 'cuid'             // OVIM TREBA DA SE KREIRA API Key

export const newApiKey = () => {
  return cuid()
}

export const authenticate = async req => {
  const apiKey = req.headers.authorization               // API KEY CE SE CITATI SA AUTHORIZATIO NHEADER-A

  if (!apiKey) {                // AKO NEMA API KEY-A FUNKCIJA SE ZAVRSAVA SA ERROR-OM
    return
  }

  const user = await User.findOne({ apiKey })                           // PRONALZI SE USER DOKUMENT
                                                                        // SAMO KORISCENJEM API KEY-A
    .select('-password')
    .lean()
    .exec()

        // UZIMA SE USER BEZ PASSWORD-A

  return user                   // NE ZABORAVI DA SI RETURN-OVAO Promise
}

```

UVESCU authenticate FUNKCIJU U server.js FAJL, KAK OBI U OBIMU context FUNKCIJE UZ POMOC REQUESTA PROVERO DA LI JE USER AUTHENTICATED


```javascript
import { ApolloServer } from 'apollo-server'
import { loadTypeSchema } from './utils/schema'
import { merge } from 'lodash'
import config from './config'
import { connect } from './db'
import product from './types/product/product.resolvers'
import coupon from './types/coupon/coupon.resolvers'
import user from './types/user/user.resolvers'

import { authenticate } from './utils/auth'   // UVEZAO SAM authenticate
                                              // OVOJ FUNKCIJI SE DODAJE SAMO REQUEST OBJEKAT
                                              // ONA DALJE PROVERAVA DA LI JE USER AUTHENTICATED


const types = ['product', 'coupon', 'user']

export const start = async () => {
  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `
  const schemaTypes = await Promise.all(types.map(loadTypeSchema))

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, product, coupon, user),
    async context({ req }) {      // OD context FUNKCIJE PRAVIM ASINHRONU FUNKCIJU, ZATO STO JE authenticate VRACE Promise
      // use the authenticate function from utils to auth req, its Async!
      
      const user = await authenticate(req)

      return { user }      // DAKLE SAM OJE OVO POTREBNO URADITI 
                          // AKO JE USER AUTHENTICATED BICE USER OBJEKAT TU 
                          // AKO NIJE TO JE undefined
    }
  })

  await connect(config.dbUrl)
  const { url } = await server.listen({ port: config.port })

  console.log(`GQL server ready at ${url}`)
}

```

AKO JE USER AUTHENTICATED BICE PROSLEDJEN DO RESOLVER-A, A AKO NIJE undefined CE BITI PROSLEDJENO

SHODNO MORAM DEFINISATI SLEDECE U RESOLVERIMA U product.resolvers.js FAJLU

MORA SE THROWOWATI AuthorizationError (ON SE UVOZI IZ appolo-server PAKETA)

- AKO SE VRSI MUTATION U SLUCAJU KADA JE context.user USTVARI undefined

- AKO SE VRSI MUTATION U SLUCAJU DA context.user NIJE undefined, A DA KORISNIK NIJE ADMIN

- AKO SE VRSI QUERY-ING U SLUCAJU DA context.user JESTE undefined

```javascript
import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'   // OVAJ ERROR SAM POMENUO
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

  // TAMO GDE JE QUERYING DOVOLJNO JE PROVERITI DA LI JE user USTVARI undefined

  // A TAM OGDE JE MUTATION PROVERAVAM TAKODJE DA LI JE user-OV role USTVARI ADMIN ROLE


/** product */
const product = (_, args, ctx) => {

  if (!ctx.user) {
    throw new AuthenticationError()
  }
  
  return Product.findById(args.id)
    .lean()
    .exec()
}

const newProduct = (_, args, ctx) => {
  // use this fake ID for createdBy for now until we talk auth
  // AKO VIDIS GORNJU PORUKU USTVARI OVDE VISE NE TREBAM GENERISATI ID
  // VEC TREBAM KORISTITI user-OV _id KAO VREDNSOT ZA createdBy

  if (!ctx.user || roles[ctx.user.role] !== 'admin') {
    throw new AuthenticationError()
  }
              // OVO
    /* 
  const createdBy = mongoose.Types.ObjectId()
  return Product.create({ ...args.input, createdBy }) */
  
  // MENJAM SA OVIM

  return Product.create({ ...args.input, createdBy: ctx.user._id })
}

const products = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }

  return Product.find({})
    .lean()
    .exec()
}

const updateProduct = (_, args, ctx) => {
  if (!ctx.user || roles[ctx.user.role] !== 'admin') {
    throw new AuthenticationError()
  }

  const update = args.input
  return Product.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeProduct = (_, args, ctx) => {

  if (!ctx.user || roles[ctx.user.role] !== 'admin') {
    throw new AuthenticationError()
  }

  return Product.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

export default {
  Query: {
    products,
    product
  },
  Mutation: {
    newProduct,
    updateProduct,
    removeProduct
  },
  Product: {
    __resolveType(product) {
      return productsTypeMatcher[product.type]
    },
    createdBy(product) {
      return User.findById(product.createdBy)
        .lean()
        .exec()
    }
  }
}

```

I TO JE SVE, SAM OSTO SAM OPET IMAO PROBLEMA DA PODESIM DA MI PRODJU TESTOVI (NEMAM VREMENA DA IH DEBUGG-UJEM ILI PROVERAVAM DEPENDANCIES)

>>>>  it's pretty cool to have flexible authentication using GraphQL. I mean, you could authenticate only field level which is kinda ridiculous. I really like that. And you can abstract away so many different things, different roles. If you're like a B to B multi tenant app, this is amazing because you can have so many restrictions and different roles on different pieces of data, it's kinda crazy.
