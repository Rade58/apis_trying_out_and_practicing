# OVDE CU OSTAVITI NEKA DODATNA ZAPAZANJA KOAJ SU VAZNA, I ZATO OVO TREBA PROCITATI

## KADA COPOSEUJES DEVELOPMENT SCRIPT DODAJ SLEDECE: (OVO SE MOZE DEFINISATI I U KONFIGURACIJSKOM OBJEKTU ALI MOZI I U SCRIPT-U) (TI USTVARI OVERRIDE-UJES, NEKE DEFAULT-OVE SA OVIM)

- --[inline](https://webpack.js.org/configuration/dev-server/#devserverinline) (**OVEO JE REQUIRED ZA HOT MODULE REPLACEMENT**) (DAKLE SADA OVO KORISTIM UMESTO --hot (HOT JOS POSTOJI I ISTRAZI ZASTO OVO DRUGO KORISTIS UMESTO NJEGA))

>> This means that a script will be inserted in your bundle to take care of live reloading, and build messages will appear in the browser console

>> Inline mode is recommended for Hot Module Replacement as it includes an HMR trigger from the websocket

I ZADAJ

- --[content-base]()

[OVDE PROCITAJ](https://webpack.js.org/configuration/dev-server/#devservercontentbase)
