# SHVATANJE ZA combineReducers I ZA REDUCERE, UOPSTE

**TREBA DA TI BUDE JASNO DA SU REDUCERI ODGOVORNI ZA TO STA CE BITI POHRANJENO U STORE, ODNOSNO U STATE** (*OVO KAZEM JER SI MOZDA RANIJE BIO U ZABLUDI `DA SU REDUCERI ONO STO ODLUCUJE STA CE BITI SERVIRANO KOMPONENTAMA` (TO JE DAKLE ZABLUDA)*)

EVO TI SIMPLE EXAMPLE

```typescript
import {
  combineReducers, createStore,
  
  /* types bellow*/
  Reducer,
  Store
} from 'redux'


////////////////////////////////////////////////////////////////////////
// REDUCER      ONE
const appleReducer: Reducer = (state, action) => {
  return {porodica: "ajdared"}
}

// REDUCER      TWO
const orangeReducer: Reducer = (state, action) => {
  return {boja: "narandzasta"}
}

//        COMBINED REDUCERS
const rootReducer: Reducer = combineReducers({              // OBRATI PA<NJU DA TOKA KAKO SAM STRUKTURIRAO OVAJ OBJEKAT>
  apple: appleReducer,                                      // ZATO STO CE TO ODREDITI KAK OCE IZGLEDATI KONACNI STATE
  orange: orangeReducer
})
////////////////////////////////////////////////////////////////////////
//////----------STORE--------------------///////////

const myStore: Store = createStore(rootReducer) 
//////////-------------------------------///////////

// NE MORAS SADA DA dispatch -UJES BILO STA, JER SE DISPATCHING DOGADJA, KADA SI I KREIRAO STORE

// POKUSAJ DA UZMES STATE DA VIDIS KAKO CE ONO IZGLEDATI
//***********************
console.log(

  myStore.getState()

)

//////////////*******ONO STO CE BITI STAMPANO JESTE OVO**********


                    {
                      
                      apple: { porodica: "ajdared" },

                      orange: { boja: "narandzasta" }

                    }


```
