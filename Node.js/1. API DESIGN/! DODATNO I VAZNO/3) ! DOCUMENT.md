# OVDE ZELIM MALO DA POSMATRAM METODE, MONGOOSE-OVE Document INSTANCE, ALI I DA VIDIM KAK OIH MOGU LISTATI I VIDETI CEMU SLUZE

PRVO DA KAZEM DA JE **Document** (ILI NIZ Document INSTANCI) INSTANCA ONO SA CIME JE RESOLVED *FAKE PROMISE* (**DocumentQuery** INSTANCA), KOJI JE NASTAO OD ONIH METODA, MODELA, KOJE VRSE QUERYING

*****

digresija:

model.create()

JEDINA VRACA *RAVI* Promise

*****

EVO POGLEDAJ PRIMER

```javascript
import { Item } from './item.model'

// CISTO DA ZNAS      Item      JE U OVOM SLUCAJU:       mongoose.Model     INSTANCA

someRouter.get('/:id', async (req, res) => {

  const documentInstanca = await Item.findOne({createdBy: req.user._id, _id: req.params.id}).exec()

  // ON OSTO JE NAJBITNIJE IZ OVOGA (ODNOSNO STA SAM ZELEO DA OBJASNIM JESTE DA GORNJA KONSTANTA
  // REFERENCIRA          Document          INSTANCU    )

  // MOGU LAKO PROVERITI KOJE METODE I PROPERTIJE IMA OVA INSTANCA

  documentInstanca.


  // ONE KOJE MENE TRENUTN OZANIMAJU JESU ONE METODE, KOJE PRODUCE-UJU BOOLEAN, I KOJE ISPRED SEBE IMAJU
  // PREFIKS is

  // TAKVA JE isModified

  documentInstanca.isModified("ime propertija modela")

  // >> Returns true if this document was modified, else false. If path is given, checks if a path or any full path 
  // >> containing path as part of its path chain has been modified.


})

```
