# STO SE TICE POZIVANJA `model.findOne()` , ZATIM `model.findOneAndUpdate()`, PA ZATIM `model.find()`; TESTOVI NISU PROLAZILI, BEZ DA SAM CHAIN-OVAO **`lean()`** METODU

OVAKO

```javascript
find(/*objekat*/).lean().exec()
```

*****

POMENUTU METODU IMA **DocumentQuery** OBJEKAT, KOJI PROIZILAZI IZA 'QUERYING METODA' MODELA 

ps. `TU NE UBRAJAM model.create()` (NJEGOVA POVRATNA VREDNSOT JE Promise)

*****

## DAKLE U PITANJU SU: *READ, UPDATE*, DELOVI CRUDA

GOVORIM O VEZBI (MADA SE ONA MOGLA PRIMENITI, KAO STO SAM REKAO PRIMENITI N BILO KOJEM DocumentQuery OBJEKTU)

## A STA RADI TA lean METODA

OVO SAM SAZNAO HOVERINGOM

>> Sets the lean option. Documents returned from queries with the lean option enabled are plain javascript objects, not MongooseDocuments. They have no save method, getters/setters or other Mongoose magic applied.

>> @param bool — defaults to true

## NISAM SIGURAN ZASTO JE UPOTREBLJENA OVA METODA, PA OPET NAKON NJE exec

MOZDA CU SAZNATI