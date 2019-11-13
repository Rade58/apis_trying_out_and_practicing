# VEZBA ZA VIRTUALS, HOOKS I INDEXES

DAKLE OVDE CU SAMO PRIKAZATI FAJLOVE IZ VEZBE A I NA NJIMA CE BITI OBJASNJENJE

project.js

```javascript
const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  org: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'org',
    required: true
  },
  dueOn: Date,
  budget: {
    type: Number,
    default: 0
  },
  spent: {
    type: Number,
    default: 0
  },
  onTrack: {
    type: Boolean,
    default: false
  }
})

// PRAVIM COMPOUND INDEKS SA org AND COMBINATION OF name
// I ZELIM DA TO BUDE UNIQUE INDEKS

projectSchema.index({
  org: 1,
  name: 1
}, {unique: true})


// DODAO SAM I GETTER-A
projectSchema.virtual('budgetLeft')
  .get(function(){
    return this.budget - this.spent
  })


module.exports = mongoose.model('project', projectSchema)

```

org.js

```javascript
const mongoose = require('mongoose')
const Project = require('./project')
const cdnUrl = 'https://cdn.adminapp.com'

const orgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  subscription: {
    status: {
      type: String,
      required: true,
      default: ['active'],
      enum: ['active', 'trialing', 'overdue', 'canceled']
    },
    last4: {
      type: Number,
      min: 4,
      max: 4
    }
  }
})

// DODAO SAM I OVAJ GETTER
orgSchema.virtual('avatar')
  .get(function(){
    return cdnUrl + "/" this.id
  })


// DEFINISAO SAM MIDLEWARE

orgSchema.post('remove', function(doc, next){   // OVO JE DAKLE async FUNKCIJA
                                                // ONA MOZE BIT Iasync FUNKCIJA, BITNO JE SAM ODA NE BUDE ARROW

  const docArray = await Project.find({org: {$in: id}})       // PRONALAZIM SVAKI DOKUMENT
                                                              // PREKO VREDNOSTI ID-JA REMOVED org-A
  docArray.forEach(project => project.remove())     // UKLANJAM SVAKI  project RELATED TO REMOVED org      
  
  next()      // POZIVAM next JER SE SAM OTAKO MOZE IZVRSITI NOVI MIDDLEWARE
              // STO SAMO VAZI KADA JE CALLBACK ARGUMENT post METODE, ASINHRONA FUNKCIJA 

})

// U OVOM GORNJEM MIDDLEWARE-U, MOGAO SAM KORITITI I METODU     deletMany, ILI findAndDelete

// JER MOZDA CE     remove      POSTATI DEPRECATED

module.exports = mongoose.model('org', orgSchema)
```

STO SE TICE MIDDLEWARE-A, AUTOR WORKSHOPA JE CAK NAPOMENUO DA SE MOZE RETURN-OVATI I PROMISE UMESTO next POZIVA (STO VAZI ZA SAMO NOVIJE VERZIJE MONGOOSE-A)

PROSAO SAM SVE TESTOVE

******

digrsija1:

AKO IMAS STARIJU VERZIJU MONGO-A (LESS THAN 4.0), A MONGOOSE-A, ABOVE 5; DESICE TI SE MOZDA DA TI MIDDLEWARE-OVI NE RADE

******

******

digrsija2:

U PRODUCTION-U KADA SE NESTO UKLANJA RAD ISE 'SOFT DELETE', AKO TVOJE MUSTERJJE ZELE DA SE VRATE NAZAD (SAZNAJ STA JE SOFT DELETE)

******