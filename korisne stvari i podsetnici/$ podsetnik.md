# PODSETNIK

1. ZAUSTAVLJANJE SCROLLING-A NA ELEMENTU (POGLEDAJ SVE ODGOVORE, JER POSTOJI VISE NACINA DA SE POMENUTO POSTIGNE):[stackoverflow](https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily)

2. PROCITAJ MDN-OV FLEXBOX TUTORIJAL, KONKRETNO [FLEXBOX MIXINS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Mixins) (TEK KAD NAUCIS SASS) i [TIPICNI USE CASES ZA FLEXBOX](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Typical_Use_Cases_of_Flexbox)

3. POZABAVI SE **@counter-style** PRAVILOM, AKO ZA TO BUDE BILO POTREBE

[MDN](https://developer.mozilla.org/sr/docs/Web/CSS/@counter-style)

OVO GOVORIM JER SE ZA SLUCAJ ORDERED I UNORDERERD LISTE, BROJEVI ODNONO BULLETS, PRIKAZUJU NA RAZLICITIM MESTIMA, U ELEMENTU (U FIREFOX-U SU ONI ODMAH UZ TEKST, A U DRUGIM BROWSER-IMA, IZVAN LIST ITEMA, DAKLE SPOLJA SU)

4. POZBAVI SE PROPERTIJIMA [filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) I [backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)

KONKRETNO SE POZBAVI, NJIHOVOM VREDNOSCU [drop-shadow()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow)

I VIDI ZASTO JE TAJ DROP SHADOW DOBRO DEFINISATI, KADA DEKLARISEM BACKGROUND IMAGE

[caniuse](https://caniuse.com/#feat=css-filters)

5. OBAVEZNO [PROCITAJ OVAJ CLANAK](http://css3.bradshawenterprises.com/cfimg/), KOJI POKAZUJE, KAKO DA DEFINISEM CROSS FADING MULTIPLE SLIKA, UZ KORISCENJE TRANZICIJA, ANIMACIJA ...