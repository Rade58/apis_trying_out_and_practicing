# 'Accept' header

['Accept'](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)

DEFINISE, KOJI CONTENT TYPE PRIHVATA CLIENT (ODNOSNO KOJI CONTENT TYPE CLIENT MOZE RAZUMETI)

```javascript
fetch('http://nekilink.blah/', {
    headers: new Headers('Accept', 'application/json')
})
```