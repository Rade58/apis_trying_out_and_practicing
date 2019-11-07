# POZABAVICES SE INDEKSIMA MOZDA KAD NESTO VISE SAZNAS O MONGO-U

SAM ODA POKAZEM STA SI RADIO U OVOM FAJLU

```javascript
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active'
    },
    notes: String,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true
    }
  },
  { timestamps: true }
)

// EVO OVDE
// ON OSTO ME ZBUNJUJE JESTE STO I list, ALI I name, IMAJU ZADAT BROJ 1
itemSchema.index({ list: 1, name: 1 }, { unique: true })

export const Item = mongoose.model('item', itemSchema)
```