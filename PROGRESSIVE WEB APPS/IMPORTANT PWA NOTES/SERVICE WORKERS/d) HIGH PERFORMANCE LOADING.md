# HIGH PERFORMANCE LOADING

## STA SU TO NAVIGATION REQUEST-OVI

>> [A navigation request is a request whose destination is "document"](https://fetch.spec.whatwg.org/#navigation-request)

POMENUTO KAZU SPECIFIKACIJE

MORAM DAKLE RECI SLEDECE:

**KOLOKVIJALNO RECENO, NAVIGATION REQUEST SE DOGADJA, SVAKI PUT, KADA UNESES URL U BROWSER location BAR (ONO MESTO GDE UNOSIS NORMALNO ADRESU), S KOJIM VRSIM INTERAKCIJU, KADA PRISTUPIM:**

- **window.location**

**I NAVIGATION REQUEST SE DOGADJA KADA POSETIS LINK FROM ONE WEB PAGE TO ANOTHER**

**STAVLJANJE iframe-A NA WEB STRANICU, TAKODJE CE DOVESTI DO NAVIGATION REQUEST-A, ZA iframe-OV src**

>>> Note: Single page applications, relying on the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) and in-place DOM modifications, tend to avoid navigation requests when switching from view to view. But the initial request in a browser's session for a single page app is still a navigation. I NEMOJ OVO MESATI SA [WEB EXTENSIONS HISTORY](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/history)

DOK TVOJA WEB APPLICATION, MOZE NAPRAVITI MNOGE DRUGE

- **SUBRESOURCE REQUESTOVE**

>>>> A subresource request is a request whose destination is "audio", "audioworklet", "font", "image", "manifest", "paintworklet", "script", "style", "track", "video", "xslt", or the empty string. [SPEC](https://fetch.spec.whatwg.org/#subresource-request)

KAKO BI DISPLAY-OVALA, SVU SVOJU SADRZINU, ZA ELEMENTE, KAO STO SU scripts, images, or styles; **HTML, U NAVIGATION RESPONSE-OVIMA, JESTE ODGOVORAN ZA KIKING OFF (ZAPOCINJANJE), BILO KOJIH DRUGIH REQUEST-OBVA**

**SVAKI DELEY-OVI U RESPONSE-OVIMA, ZA INITIAL NAVIGATION REQUEST-OVE, BICE BOLNO OCIGLEDNE ZA KORISNIKA, JER CE KORISNIK OSTATI DA BLEJI U PRAZAN EKRAN, NA NEODREDJENO VREME**

## ZAOBIDJI NETWORK, U SLUCAJU NAVIGATION-A, KAKO BI POSTIGAO BEST PERFORMANCES



## PROCITAJ I CLANAK CACHING BEST PRACTICES KOJI SE NE ODNOSI NA WORKER-E

[TRADITIONAL CACHING BEST PRACTICES](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching#top_of_page)

[HTTP/2 server push](https://developers.google.com/web/fundamentals/performance/http2/#server_push)

OVO NEMA VEZE SA SERVICE WORKER-IMA, ALI IAPAK TREBA DA PROCITAS

