# VEZBA ZA INTERFACES, FRAGMENTS

NECU DODATNO KOMENTARISATI OVDE, SAMO CU OSTAVITI CODE OVDE, I TRUDICU SE DA TAJ CODE BUDE KOMENTARISAN

IMAO SAM PROBLEMA DA MI TESTOVI PRODJU IAKO JE SVE BILO DEFINISANO KAKO TREBA (NEMAM VREMENA DA DEBUGG-UJEM TESTOVE)

******
******

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

# NISAM ZNAO RANIJE DA SE KOMENTARI U GRAPHQL-U PISU SA HASH-OM ILI SA TROSTRUKIM """ ovako""" 

# OVO JE NAKAD BIO Product TYPE A SADA CE BITI INTERFACE

interface Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String

  # SLEDECA TRI FIELD TYPE-A CE BITI UKLONJENA
        """ 
  liquidCooled: Boolean
  range: String
  bikeType: BikeType 
        """
}

# KREIRAM NOVE TYPE-OVE KOJI CE IMPLEMENTIRATI GORNJI INTERFACE

# Bike TYPE, KOJ ICE IMATI DODATNI FIELD TYPE bikeType

# GamingPc TYPE, KOJ ICE IMATI DODATNI FIELD TYPE liguidCooler

# Drone TYPE, KOJ ICE IMATI DODATNI FIELD TYPE range

# NE ZABORAVI DA SVI OVI NOVI FIELD-OVI MORAJU BITI NON NULLABLE

type Bike implements Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
        #
  bikeType: String!
}

type GamingPc implements Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
          # 
  liguidCooled: Boolean!
}

type Drone implements Product {
  name: String!
  price: Float!
  image: String!
  type: ProductType!
  createdBy: User!
  description: String
          #
  range: String!
}

# OVO OSTALO JE ISTO KAO I RANIJE

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

//  JEDINA STVASR KOJA JE OVDE DEFINISANA JESTE       __resolveType     ZA      Product   INTERFACE


const productsTypeMatcher = {
  GAMING_PC: 'GamingPc',
  BIKE: 'Bike',
  DRONE: 'Drone'
}

/** product */
const product = (_, args, ctx) => {
  return Product.findById(args.id)
    .lean()
    .exec()
}

const newProduct = (_, args, ctx) => {
  // use this fake ID for createdBy for now until we talk auth
  const createdBy = mongoose.Types.ObjectId()
  return Product.create({ ...args.input, createdBy })
}

const products = (_, args, ctx) => {
  return Product.find({})
    .lean()
    .exec()
}

const updateProduct = (_, args, ctx) => {
  const update = args.input
  return Product.findByIdAndUpdate(args.id, update, { new: true })
    .lean()
    .exec()
}

const removeProduct = (_, args, ctx) => {
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
      // EVO OVO SAM DEFINISAO, A TI ZAKLJUCI STA ZNACI
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