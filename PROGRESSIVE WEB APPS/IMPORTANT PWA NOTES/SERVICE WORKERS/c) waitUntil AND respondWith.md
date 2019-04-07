# DAKLE, OVDE CU SE POZABAVITI METODAMA, KOJE SE PRIMENJUJU NAD event INSTANCAMA, U OBIMIMA, SLEDECIH HANDLERA

- oninstall

- onactivate

>>>>>>>>>>

- onfetch

>>>>>>>>>>

PRVO CU SE POZBAVITI EVENT-OM, KOJI SE TRIGGERUJU, ON install I on activate

## ExtendableEvent INSTANCA

TO JE Event INSTANCA, KOJOJ MOGU PRISTUPITI, U OBIMU:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **oninstall** ILI **onactivate** HANDLER-A

IZ PREDHODNOG BI, TAKODJE TREBAL ODA MI BUDE JASNO DA SE

ExtendableEvent MOZE BITI: *"install"* I *"activate"* TIPA (ILI SU TO ONI OD TIPOVA, KOJI MENE ZANIMAJU)

ALI, MISLIM DA JE BOLJE DA PRIKAZEM OVE EVENT-OVE, U CODE-U, NEGO DA PRETERANO PISEM O NJIMA

```javascript
self.addEventListener('install', function(ev){
    console.log(ev instanceof Event);               // -->    true
    console.log(ev instanceof ExtendableEvent);     // -->    true
    console.log(ev.type);                           // -->  'install'
});

self.addEventListener('activate', function(ev){
    console.log(ev instanceof Event);               // -->    true
    console.log(ev instanceof ExtendableEvent);     // -->    true
    console.log(ev.type);                           // -->  'activate'
});
```

ALI ONO STO JOS POSTOJI JESTE **InstallEvent** INSTANCA, ODNOSNO TO JE IPAK PRIMARNA INSTANCA oninstall HANDLER-A

NAIME U PITANJU JE SLEDECE INHERITANCE CHAIN:

**InstallEvent** INSTANCA NASLEDJUJE OD *ExtendableEvent* KLASE, KOJA NASLEDJUJE OD *Event* KLASE

EVO GA I DOKAZ:

```javascript
self.addEventListener('install', function(ev){
    console.log(ev);                                                   // --> InstallEvent {}
    console.log(ev.__proto__);                                         // --> InstallEvent {}
    console.log(ev.__proto__.__proto__);                               // --> ExtendableEvent {}
    console.log(ev.__proto__.__proto__.__proto__);                     // --> Event {}
});
```

A ON OSTO **NE POSTOJI** JESTE **ActivateEvent**

## waitUntill METODA ExtendableEvent-OVOG PROTOTIPA

[OVA METODA](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil) EVENT DISPATCH-ERU GOVORI DA JE WORK ONGOING

>> The extendableEvent.waitUntil() method tells the event dispatcher that work is ongoing. It can also be used to detect whether that work was successful. In service workers, waitUntil() tells the browser that work is ongoing until the promise settles, and it shouldn't terminate the service worker if it wants that work to complete.

>> The install events in service workers use waitUntil() to hold the service worker in the installing phase until tasks complete. If the promise passed to waitUntil() rejects, the install is considered a failure, and the installing service worker is discarded. This is primarily used to ensure that a service worker is not considered installed until all of the core caches it depends on are successfully populated.

>> The activate events in service workers use waitUntil() to buffer functional events such as fetch and push until the promise passed to waitUntil() settles. This gives the service worker time to update database schemas and delete outdated caches, so other events can rely on a completely upgraded state.

>> The waitUntil() method must be initially called within the event callback, but after that it can be called multiple times, until all the promises passed to it settle.

DAKLE, KADA DEFINISEM CACHING ILI DELETING ASSET-OVA IZ CACHEA, ODNOSNO KADA DEFINISEM SAV CACHE WORK, POTREBNO JE DA Promise, KOJI PROIZILAZI IZ TOG RADA SA CACHE-IMA, BUDE ARGUMENT **waitUntill** METODE, KAKO BI OSIGURAO DA JE INSTLACIJA SERVICE WORKERA, PRODUZENA SVE DOK SE TE STVARI NE OBAVE, A ISTO VAZI I ZA AKTIVACIJU

## respondWith METODA FetchEvent-OVOG PROTOTIPA

> The [respondWith()](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) method of FetchEvent prevents the browser's default fetch handling, and allows you to provide a promise for a Response yourself.

POVRATNA VREDNOST, METODE JE NARAVNO Promise OBJEKAT, KOJI TREBA DA BUDE RESOLVED SA Response INSTANCOM

NAJBOLJE JE PROCITATI SVE O OVOJ METODI SA LINKA, KOJ ISAM OBEZBEDIO, A JA ZA SADA ZNAM NJEN BASIC USE
