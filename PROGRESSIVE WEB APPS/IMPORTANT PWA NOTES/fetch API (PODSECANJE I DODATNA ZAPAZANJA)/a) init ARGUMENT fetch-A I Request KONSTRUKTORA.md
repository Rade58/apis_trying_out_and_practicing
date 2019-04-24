# init OBJEKAT (DRUGI ARGUMENT fetch METODE, ALI I DRUGI ARGUMENT Request KONSTRUKTORA)

**PREDPOSTAVLAJM, DA SE UNDER THE HOOD, KOD POZIVANJA fetch-A, FORMIRA Request INSTANCA, KOJA JE INSTATICIZIRA, SA url ARGUMENTOM, I SA POMENUTIM init OBJEKTOM, KAO ARGUMENTOM**

[OVAJ OBJEKAT](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) (NA OVOM LINKU SE NALAZE NJEGOVA OBJASNJENJA) JE DRUGI ARGUMENT, POMENUTE METODE

[A NA OVOM LINKU](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request#Parameters) MOGU VIDETI DA JE POMENUTI OBJEKAT ISTO ARGUMENT I Request KONSTRUKTORA

init JE OPTIONAL, OPTIONS, OBJEKAT ARGUMENT

>> An options object containing any custom settings that you want to apply to the request. The possible options are:

*OVO SU NJEGOVI PROPERTIJI I NJIHOVE MOGUCE VREDNOSTI (U SLUCAJU POZIVANJA fetch-A)*

- **method**

The request method, e.g., **GET**, **POST**, **HEAD**. Note that the Origin header is not set on Fetch requests with a method of HEAD or GET (this behavior was corrected in Firefox 65 — seebug 1508661).

- **headers**

Any headers you want to add to your request, contained within a Headers object or an object literal with ByteString values. Note that some names are forbidden.

- **body**

Any body that you want to add to your request: this can be a Blob, BufferSource, FormData, URLSearchParams, or USVString object. Note that a request using the GET or HEAD method cannot have a body. (**NE ZNAM ZASTO OVDE NIJE POMENUT ReadableStream**)

- **mode**

The mode you want to use for the request, e.g., **cors**, **no-cors**, or **same-origin**.

- **credentials**

The request credentials you want to use for the request: omit, same-origin, or include. To automatically send cookies for the current domain, this option must be provided. Starting with Chrome 50, this property also takes a FederatedCredential instance or a PasswordCredential instance.

- **cache**

The cache mode you want to use for the request.

- **redirect**

The redirect mode to use: follow (automatically follow redirects), error (abort with an error if a redirect occurs), or manual (handle redirects manually). In Chrome the default is follow (before Chrome 47 it defaulted to manual).

- **referrer**

A USVString specifying no-referrer, client, or a URL. The default is client.

- **referrerPolicy**

Specifies the value of the referer HTTP header. May be one of no-referrer, no-referrer-when-downgrade, origin, origin-when-cross-origin, unsafe-url.

- **integrity**

Contains the subresource integrity value of the request (e.g., sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=).

- **keepalive**

The keepalive option can be used to allow the request to outlive the page. Fetch with the keepalive flag is a replacement for the Navigator.sendBeacon() API.

- **signal**

An AbortSignal object instance; allows you to communicate with a fetch request and abort it if desired via an AbortController.