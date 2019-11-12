# OVDE CU SAMO OSTAVITI CODE

******

digresija:

DA LAKSE KORISTIS TESTOVE STAVI I --watch FLAG KAD IGH BUDES RUNN-OVAO

******

## RESENJE

```javascript
const Post = require('./post')

const postByTitle = (title) => {
  return Post.findOne({title})
}

////////////// 
// OBA OVA RESENJA SU FUNKCIONISALA

/* const postsForAuthor = (authorId) => {
  return Post.find({author: {$in: authorId}})
}
 */
const postsForAuthor = (authorId) => {
  return Post.find({author: authorId}).exec()
}
//////////////////// NIJE NI BITNO, JER JE OVO DRUGO SIMPLER


const fullPostById = (id) => {
  return Post.findById(id).populate('author').exec()
}

const allPostsSlim = (fieldsToSelect) => {
  return Post.find({}).select(fieldsToSelect)
}

const postByContentLength = (maxContentLength, minContentLength) => {
  return Post.find({
    contentLength: {$gt: minContentLength, $lt: maxContentLength}
  }).exec()
}


// AKO PROCITAM TESTOVE U SLUCAJU SLEDECE FUNKCIJE VIDECU:

//  -       similarPosts    REPREZENTUJE NIZ OBJEKATA KOJI TREB DA IMAJU SPECIFICIRANE VREDNOSTI ID-JEVA, NEKIH

      // MORACES DA ODES U post SCHEMA-U, I DA DODAS similarPosts I RECI CU KOJI NJEGOV TYPE TREBA DA BUDE

      /*
          similarPosts: [{
                          type: mongoose.Schema.Types.ObjectId,
                          
                          ref: 'post'   
                        
                        }]

      */
    // PRIMECUJES KAKO OVDE IMAS  DA SE U      post      SCHEMA-I, KORISTI REFERENCA ZA postS KOLEKCIJU
    // TO JE KAO POPUT NEKOG 'SELF REFERENCING'-A

//                          


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

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts
}

```
