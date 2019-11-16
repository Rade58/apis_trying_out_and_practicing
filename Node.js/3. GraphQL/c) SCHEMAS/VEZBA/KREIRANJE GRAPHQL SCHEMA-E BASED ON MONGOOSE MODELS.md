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