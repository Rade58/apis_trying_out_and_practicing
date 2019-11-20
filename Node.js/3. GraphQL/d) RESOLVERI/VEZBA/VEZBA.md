# VEZBA

NECU PREVISE KOMENTARISATI, SAMO CU OSTAVITI CODE

JA SAM USTVARI GLEDAO SCHEMA-U, PA SAM NA OSNOVU NJE FORMIRAO RESOLVERE

EVO JE SCHEMA:

product.gql

```javascript
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
  bikeType: BikeType
  range: String
}

input UpdateProductInput {
  name: String
  price: String
  image: String
  description: String
  liquidCooled: Boolean
  bikeType: BikeType
  range: String
}


extend type Query {
  products: [Product]!
  product(id: ID!): Product!
}

extend type Mutation {
  newProduct(input: NewProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  removeProduct(id: ID!): Product!
}

```

product.resolvers.js

```javascript
import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

// RESOLVERI

const products = (_, args) => {
  return Product.find({})
    .lean()
    .exec()
}

const product = (_, args) => {
  return Product.findById(args.id)
    .lean()
    .exec()
}

// OVDE CES KORISTITI USERA, KOJI JE ZAKACEN ZA context
// O TOME CU DETALJNIJE KADA SE BUDEM BAVIO AUTHENTICATION-OM

const newProduct = (_, args, context) => {
  return Product.create({ ...args.input, createdBy: context.user._id })
}

const updateProduct = (_, args) => {
  return Product.findByIdAndUpdate(args.id, args.input, { new: true })
    .lean()
    .exec()
}

const removeProduct = (_, args) => {
  return Product.findByIdAndRemove(args.id)
    .lean()
    .exec()
}

// SECAS SE populate IZ MONGOOSE-A
// OVDE CES TO OVAKO URADITI

// CITAS createdBy SA Product TYPE-A (VIDI DILE ZASTO)

const createdBy = (product, args) => {
  return User.findById(product.createdBy)
    .lean()
    .exec()
}

//

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
    __resolveType(product) {},
    createdBy     // POSTO JE CreatedBy NA PRODUCTU TO ZNACI DA 
                  // CE MU PRI ARGUMENT UVEK BITI OBJEKAT, KOJI JE
                  // JE NASTAO QUERYINGOM Product TYPE-A
  }
}

```

STO SE TICE OSTALOG, POGLEDAJ VIDEO ILI PONOVO POKUSAJ DA ODRADIS OVU VEZBU KADA BUDES IMAO BOLJU PERSPEKTIVU, KADA KOMPLETIRAS OVAJ WORKSHOP
