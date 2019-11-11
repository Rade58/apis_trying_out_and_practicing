# upsert

OVDE ZELIM DA DODAM PAR STVARI O METODAMA KOJE QUERY-UJU I ONDA RADE UPDATE

TO SU METODE POPUT

- findByIdAndUpdate

- findOneAndUpdate

**OVIM METODAMA SE MOGU DODATATI I DODATNE OPCIJE**

JEDNU ZNAM, I TO JE new

## POSTOJI MOGUCNOST DA, OVE METODE NE PRONADJU NISTA, JER TAJ DOCUMENT, ZA KOJIM SU SU QUERY-OVALE, ZAISTA NE POSTOJI

TADA MOGU PODESITI OPCIJU **upsert** NA *true*

**TIME CE SE KREIRATI DOKUMENT, KOJI NEDOSTAJE**

```javascript
const strange = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  amount: Number
})

const Strange = mongoose.model('strange', strange)



const strange = await Strange.findOneAndUpdate(
  {firstName: "Jessy James"},  // OVO JE ZA QUERYING ,ALI DOKUMENT SA OVAKVIM FIELD-OVIM NE POSTOJI (NIJE REANIJE KREIRAN)
  {amount: 48}, // OVO ZELI MDA UPDATE-UJEM
  {
    new: true,
    upsert: true        // AKO NE POSTOJI DOKUMENT OVO OSIGUARAVA DA CE BITI KREIRAN
  }
)

console.log(strange)

```

ON OSTO CE BITI STAMPANO JE NOVI DOKUMENT

```javascript
{ _id: 5dc8b795f8af27184a7c3f9b,
  firstName: 'Jessy James',
  __v: 0,
  amount: 48 }
```
