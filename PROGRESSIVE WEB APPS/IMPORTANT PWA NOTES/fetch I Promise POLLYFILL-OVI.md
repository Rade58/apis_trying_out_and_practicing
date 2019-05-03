# POLYFILLS ZA fetch I Promise

**ALI KORISCENJEM BABAEL-A, OVO BI BILO SUVISNO URADITI, JER AKO KORISTIM BABEL, ON CE I U STARIJIM BROWSER-IMA RUNN-OVATI, MODERNI JAVASCRIPT**

[fetch](https://github.com/github/fetch)

[Promise](https://github.com/stefanpenner/es6-promise)

- *MAXIMILIAN SHWARTZMILLER JE KORISTIO SLEDECE POLLYFILL ZA Promise*

[Promise](https://github.com/Octane/Promise)

[package](https://www.npmjs.com/package/es6-promises)

USTAVRI POTREBNO JE DA DAOWNLOADUJES CODE (USTVARI DA GA KOPIRAS U SVOJ Promise.js FAJL)

[code polyfill-a (Promise)](https://raw.githubusercontent.com/Octane/Promise/master/promise.js)

NE ZABORAVI DA UCITAS script TAGOVE, U HTML

- *A EVO GA I JAVASCRIPT POLYFILL-A ZA fetch*

[fetch polyfill](https://cdnjs.cloudflare.com/ajax/libs/fetch/3.0.0/fetch.js)

## ZA KORISCENJE Promise-A

```javascript
if(!window.Promise){
    window.Promise = Promise;
}

// DAKLE, DODELIO SAM POLYFILL AKO ON NE POSTOJI KA NATIVE FEATURE BROWSER-A
```