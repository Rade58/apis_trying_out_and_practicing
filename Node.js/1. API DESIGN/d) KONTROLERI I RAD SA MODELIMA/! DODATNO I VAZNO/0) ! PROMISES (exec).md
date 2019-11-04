# CRUD METODE mongoos-A RETURN-UJU 'FAKE' PROMISES (ODNOSNO NJIHOVU VERZIJU) PROMISE-A; ALI JA MOGU TAJ PROMISE PRETVORITI U 'REAL' PROMISE, KORISCENJEM exec METODE

POSMATRAJ OVAJ PRIMER

```javascript
import { Item } from './item.model'
import mongoose from 'mongoose' // MONGOOSE MI OVDE TREBA ZA NEKE UTILITY METODE KOJE DONOSI

import { connect } from '../../utils/db'

const run = async () => {
  connect('mongodb://localhost:27017/api-test')

  const item = await Item.create({
    name: 'Blah up',
    createdBy: mongoose.Types.ObjectId(),
    list: mongoose.Types.ObjectId()
  })

  ////////////////// EVO TI GLEDAJ OVDE

  console.log(

    await Item.findById(item._id).exec()          // UPOTRBIO SAM exec DA BI IMAO KLASICNU Promise INSTANCU

  )

  //////////////////////////////////////////

}

run()
```

**TAJ TAKOZVANI FAKE PROMISE IAM SAMO then METODU**

## A JA KORISTIM exec METODU KAKO BI GA TRANSFORMISAO U Promise INSTANCU, DA BIH IMAO I catch METODU

TO ZNACI I DA GA NESMETANO MOGU KORISTITI SA await SAMO AKO FAKE PROMISE TRANSFORMISEM U Promise INSTANCU

## ST OSE TICE TOG FAKE PROMISE, KOJE DAJE MONGOOSE, ON MI OMOGUCAVA I DODATNI QUERYING

## STAVLJANJE exec A USTVARI GOVORI: `I'm DONE ADDING MORE QUERY PARAMETERS AFTER THIS` 