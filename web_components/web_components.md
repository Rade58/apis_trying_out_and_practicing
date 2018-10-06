# Web Components  
(Prevod, jednog dela, sledećeg članka: https://developer.mozilla.org/en-US/docs/Web/Web_Components)

## TRI KONCEPTA
* Custom elementi (elementi prilagođeni mojim potrebama)  
    * Grupa API-eva koji mi omogućavaju definisanje custom elementa i njihovog ponašanja. Takvi elemnti se, onda mogu koristiti po želji u mom korisničkom interfejsu.
* Shadow DOM
    -  Grupa API-eva, za kačenje učaurenog (encapsulated) "shadow" DOM drveta elemenata, koje se renderuje odvojeno od glavnog `document` DOM-a, i njegove poveyane kontrolisane funkcionalnosti. Na ovaj način mogu zadržati privatnost za karakakteristike elementa, tako da takvi elementi mogu biti script-ovani stilizovani, bez straha da će doći do sudara sa drugim delovima `document`-A.
* HTML Templates  
    - Sledeći elementi: `<template>` i `<slot>` omogućavaju pisanje markup obrazaca koji nisu prikazani u render-ovanoj stranici. Ovakvi elementi, mogu se, iznova koristiti, više puta, predstavljajući osnovu prilagođene strukture elemenata.


## OSNOVNI PRISTUP
1.  Kreirasnje klase ili funkcije u kojoj specificiram funkcionalnost web komponente
1.  Registracija mog prilagođenog elementa uz korišćenje sledeće metode  
    
    ```
    CustomElementRegistry.define()
    ```
    Ovoj metodi prilikom pozivanja dodaju se ime elementa, koji se treba definisati, klasa ili funkcija u kojoj se specificira funkcionalnost, i opciono se može specificirati, odakle element nasleđuje
1.  Ako je potrebno, može se zakačiti shadow DOM na prilagođeni element, uz korišćenje sledeće metode:
    ```
    Element.attachShadow()
    ```
    Child elementi, event handleri itd., mogu se dodavati shadow DOM, korisćenjem uobičajenih DOM metoda.
1.  Ako je to neophodno, može se definisati obrazac, korišćenjem `<template>` i `<slot>` tagova. 
    I isto tako se mogu koristiti uobičajene DOM metode za kloniranje obrazca i njegovo kačenje na shadow DOM.
1.  Koristi prilagođene elemente (custom elements) kako želiš na svojoj stranici, kao što bi to radio       sa regularnim HTML elemntima.
___
#### U OVOM DOKUMENTU BAVIO SAM SE I PONAVLJANJEM NEKIH KONCEPATA, VAZNIH ZA EVENT-OVE