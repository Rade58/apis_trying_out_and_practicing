# REST VEZBA

SAM OCU PRIKAZATI FAJLOVE

todo.js

```javascript
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    unique: true
  },
  complete: {
    type: Boolean,
    default: false,
    required: true
  },
  dueOn: Date
}, {timestamps: true})


module.exports = mongoose.model('todo', todoSchema)

```

OVDE CE BITI SVE DEFINISAN OSTO SAM TREBA O ZA VEZBU

index.js

```javascript
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const connect = require('../connect')
const {json, urlencoded} = require('body-parser')
const cors = require('cors')


const app = express()
const Todo = require('./todo')

app.disable('x-powered-by')


app.use(cors())
app.use(morgan('dev'))
app.use(urlencoded({extended: true}))
app.use(json())

app.get('/todo/:id', async (req, res) => {
  const todoId = req.params.id

  try{

    const item = await Todo.findById(todoId)
      .lean()
      .exec()

    if(!item){
      return res.status(404).end()
    }

    res.status(200).json(item)

  }catch(error){
    res.status(500).send({error})
  }

})

app.get('/todos', async (req, res) => {
  try{

    const items = await Todo.find({})     // ZANIMLJIVO JE DA CEO await STATEMANT SCOTT MOSS INLINE-OVAO SOLE U json POZIV
      .sort('asc')                        // A JA SAM KORISTIO REFERENCE (AL ISWEET THING ABOUT await JESTE DA MOZE BITI INLINED)
      .skip(10)
      .limit(10)
      .lean()
      .exec()

    if(!items){
      return res.status(404).end()
    }

    res.status(200).json(items)

  }catch(error){
    res.status(500).send({error})
  }

})

app.post('/todo', async (req, res) => {
  const todoToCreate = req.body.todo

  //  KADA BUDES TESTIRAO OVO, IZ INSOMNIAE SALJI JSON KOJI IZGLEDA OVAKO {todo: {message: '',,} }
  // ZATO STO JE AUTOR PRIMERA OBEZBEDI OGORNJI LINE (ZELI DA TAKO IZGLEDA)

  try{
    const item = await Todo.create(todoToCreate)

    if(!item){
      return res.status(500).end()
    }

    res.status(201).json(item.toJSON())     // toJSON METODA JE MALO MISLEADING
                                            // ONA USTVARI RETURN-UJE OBJEKAT
                                            // MOZES DA KORISTIS      toObject
                                            // THEY BOTH DO KINDA SAME THING
    

  }catch(error){

    // DOBRO JE UVEK KORISTITI console.error

    console.error(error)

    res.status(500).send({error})
  }

})

connect('mongodb://localhost:27017/yo')
  .then(() => app.listen(4000, () => {
    console.log('server on http://localhost:4000')
  }))
  .catch(e => console.error(e))
```

******

DODATNO

AKO U TERMINALU ODNSNO OUTPUT-U VIDIM **CastError** TO ZNACI:

DA SI DAO DIFFERENT TYPE VREDNOSI OD ONE KOJU EXPECT-UJE

******

******

digresija

toJSON METODA JE MALO MISLEADING

ONA USTVARI RETURN-UJE OBJEKAT

MOZES DA KORISTIS      toObject

THEY BOTH DO KINDA SAME THING

******

******

DA VIDIS KAKO TI RADI OVO ST SI DEFINISAO

NAJBOLJE JE PRVO DA SALJES POST REQUEST, ODNOSNO KREIRAS JEDAN DOKUMENT (OBRATI PAZNJU DA U SCHEME NIJE SVE REQUIRED, TAK ODA NE MORAS SVE DEFINISATI U ONOM JASONU KOJI SALJES)

PA ONDA POKUSAJ DA GETT-UJES SVE I TU CES VIDETI OBJEKAT KOJI SI KREIRAO (U NIZU JER CES GETOVATI SVE)

PREKOPIRAJ NEKI ID I ONADA POKUSAJ DA GET-UJES UZ POMOC TOG ID-JA (DODAS KONKRETAN ID N URL U INSOMIJI) (SECAS SE /:id)

KORISTI INSOMNIA-U

******

******

AKO TE ZANIMAJU PITANJA I ODGOVORI U KOJIM MOZES SAZNATI JOS INFORMACIJA, POGLEDAJ POSLEDNJA 4 VIDEO-A WORKSHOPA

******
