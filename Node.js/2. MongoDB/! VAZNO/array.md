# UPDATING NEKOG ARRAY DOKUMNATA (U PITANJU JE ARRAY DOKUMENATA, NESTED U DRUGOM DOKUMANTU)

[Array Update Operators](https://docs.mongodb.com/manual/reference/operator/update-array/) (MISLIM DA TREBAS PROCITATI OVO)

U SUSTINI IMAM ARRAY NA NEKOM DOKUMENTU, ALI NJEGOVE CELIJE SU TYPE-A **mongoose.Schema.Types.ObjectId**

MORAM SE SLUZITI OPERATORIMA, KAO STO SU

- $push

- $each

POGLEDAJ PRIMER

```javascript
const addSimilarPosts = (postId, similarPosts) => {
  return Post.findByIdAndUpdate(
    postId,

    // ALI OVO JE PROBLEMATICNO SHVATITI

    // PROBLEM JE DAKLE ARRAY, I PROBLEM JE KAKO NJEGA UPDATE-OVATI, SOBZIROM DA JE TO ARRAY TYPE-OVA
    // mongoose.Schema.Types.ObjectId
    // MORAM KORISTITI OVAKVU SINTAKSU

    {$push: {similarPosts: {$each: similarPosts}}},
    
    {new: true}
  ).exec()
}
```

NE MOGU DRUGACIJE IZVRSITI UPDATE NEGO OVAKO

*PROCITAJ MALO VISE O OVOME, AKO NEGDE PRONADJES* (IMAS LINK NA POCETKU TEKSTA)
