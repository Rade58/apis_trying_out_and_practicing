# PROBLEM KADA KORISTIS *NODE_ENV* U SCRIPT-OVIMA NA WINDOOWS-U

RESENJE: KORISTI [node-env](https://www.npmjs.com/package/cross-env)

NA PRIMERU UOVOM PRIMERU

```java
"test": "NODE_ENV=testing jest --forceExit --detectOpenHandles  --silent",
```

KADA INSTALIM PAKET GLOBALNO DODAJEM cross-env ISPRED SCRIPT-A

```java
"test": "cross-env NODE_ENV=testing jest --forceExit --detectOpenHandles  --silent",
```

## A BEZ INSTALIRANJA PAKETA MOGAO SAM DODATI **SET** I SCRIPT-OVE ODVOJITI SA **&**

OVAKO

```java
"test": "SET NODE_ENV=testing & jest --forceExit --detectOpenHandles  --silent",
```
