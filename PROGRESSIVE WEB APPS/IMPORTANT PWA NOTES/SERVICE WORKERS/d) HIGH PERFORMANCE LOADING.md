# HIGH PERFORMANCE LOADING

[tekst prati ovaj clanak](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading)

POTREBNO GA JE PROCITATI, A JA NECU OVDE MNOGO ULAZITI U DETALJE, VEC CU SAM OOSTAVITI NEKE CITATE ILI PRENETI NAJVAZNIJE UTISKE

## STA SU TO NAVIGATION REQUEST-OVI

>> [A navigation request is a request whose destination is "document"](https://fetch.spec.whatwg.org/#navigation-request)

POMENUTO KAZU SPECIFIKACIJE

MORAM DAKLE RECI SLEDECE:

**KOLOKVIJALNO RECENO, NAVIGATION REQUEST SE DOGADJA, SVAKI PUT, KADA UNESES URL U BROWSER location BAR (ONO MESTO GDE UNOSIS NORMALNO ADRESU), S KOJIM VRSIM INTERAKCIJU, KADA PRISTUPIM:**

- **window.location**

**I NAVIGATION REQUEST SE DOGADJA KADA POSETIS LINK FROM ONE WEB PAGE TO ANOTHER**

**STAVLJANJE iframe-A NA WEB STRANICU, TAKODJE CE DOVESTI DO NAVIGATION REQUEST-A, ZA iframe-OV src**

>>> Note: Single page applications, relying on the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) and in-place DOM modifications, tend to avoid navigation requests when switching from view to view. But the initial request in a browser's session for a single page app is still a navigation. I NEMOJ OVO MESATI SA [WEB EXTENSIONS HISTORY](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/history)

DOK TVOJA WEB APPLICATION, MOZE NAPRAVITI MNOGE DRUGE:

- **SUBRESOURCE REQUESTOVE**

>>>> A subresource request is a request whose destination is "audio", "audioworklet", "font", "image", "manifest", "paintworklet", "script", "style", "track", "video", "xslt", or the empty string. [SPEC](https://fetch.spec.whatwg.org/#subresource-request)

KAKO BI DISPLAY-OVALA, SVU SVOJU SADRZINU, ZA ELEMENTE, KAO STO SU scripts, images, or styles; **HTML, U NAVIGATION RESPONSE-OVIMA, JESTE ODGOVORAN ZA KIKING OFF (ZAPOCINJANJE), BILO KOJIH DRUGIH REQUEST-OBVA**

**SVAKI DELEY-OVI U RESPONSE-OVIMA, ZA INITIAL NAVIGATION REQUEST-OVE, BICE BOLNO OCIGLEDNE ZA KORISNIKA, JER CE KORISNIK OSTATI DA BLEJI U PRAZAN EKRAN, NA NEODREDJENO VREME**

## ZAOBIDJI NETWORK, U SLUCAJU NAVIGATION-A, KAKO BI POSTIGAO BEST PERFORMANCES

>>> The biggest impact of adding a service worker to your web application comes from responding to navigation requests without waiting on the network.

## KORISTI APP SHELL MODEL

There's a clear-cut strategy for handling navigation requests without relying on the network: each navigation request, regardless of the specific URL, is fulfilled with a cached copy of a generic "shell" of an HTML document. The shell includes everything needed to bootstrap the single page application, and client-side routing logic can then render the content specific to the request's URL.

```javascript
// U SUSTINI, UVEK JE, POTREBNO respondWith SA CACHE-D ASSET-OM, AKO SE RADI O NAVIGATIO NREQUEST-U

self.addEventListener('fetch', function(ev){
    if(ev.request.mode === 'navigate'){

        ev.respondWith(
            self.caches.open('page-cahe-v1')
            .then(function(cache){
                return cache.mathh('/app-shell.html');
            })
            .then(function(response){
                return response;
            })
        )

    }
})

// A MOGUCE JE I KRACE PISANJE OVOGA, ALI JA UVEK NEKAKO ODLUCUJEM DA KORISTIM METODE Cache INSTANCE, UMESTO CacheStorage INSTANCE

// DA KORISTIM CacheStorage, IMAO BIH KRACE PISANJE

```

POTREBNO JE TAKODJE POZBAVITI SE [WORKBOX-OM](https://developers.google.com/web/tools/workbox/) U NEKOM TRENUTKU

## PERFORMANCE GOTCHAS

Never use a "passthrough" fetch handler

```javascript
// NIKAD NE KORISTI OVO
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});

```

## PROCITAJ I CLANAK CACHING BEST PRACTICES KOJI SE NE ODNOSI NA WORKER-E

[TRADITIONAL CACHING BEST PRACTICES](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching#top_of_page)

[HTTP/2 server push](https://developers.google.com/web/fundamentals/performance/http2/#server_push)

OVO NEMA VEZE SA SERVICE WORKER-IMA, ALI IAPAK TREBA DA PROCITAS

## CHACHING STATIC HTML (ZABORAVIO DA PREDJEM)

[PROCITAJ OVO](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#caching_static_html)

KORISCENE SU async FUNKCIJE U OVOM CODE-U

A POSTOJE I NEKE NEJASNOCE, PRVENSTVENO OKO TERMINA: 'NORMALIZING URL' (MORAM OTKRITI STA TACNO ZNACI NORMALIZING URL-A)