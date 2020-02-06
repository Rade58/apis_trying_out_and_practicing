# FIBONACCI-JEV ALGORITAM

ZNAS STA JE FIBONACIJEVA SEKVENCA BROJEVA:

AKO STAVIS PRST NA JEDAN BROJ U SEKVENCI, VIDECES DA JE ZBIR PREDHODNA DVA BROJA, UPRAVO TAJ BROJ

KOD TAKVE SEKVENCE BROJEVA, NULA JE UVEK PRVI CLAN, A JEDAN JE UVEK DRUGI CLAN

NA OSNOVU TOGA MOGU KREIRATI ALGORITAM, CIJE JE INPUT INDEKS U SEKVENCI; A OUTPUT TREBA DA BUDE BROJ

```javascript

const fib = fibIndeks => {

  const result = []
  result[0] = 0
  result[1] = 1

  // PRVA DVA BROJA SU POZNATA KRECES OD TRECEG (i === 2)

  for(let i = 2; i<=fibIndeks; i++){
    result[i] = result[i - 1] + result[i-2]
  }

  // POSLEDNJI CLAN U NIZU JE BROJ KOJEG TRAZIM

  return result[fibIndeks]

}
```

## REKUZRZIVNI FIBONACCI

```javascript
const reqFib = fibIndeks => {

  if(fibIndeks < 2 && fibIndeks > 0){

    return fibIndeks

  }

  return reqFib(fibIndeks - 1) + reqFib(fibIndeks -2)

}
```
