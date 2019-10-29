# VEZBA: ASYNCHRONOUS SERVER

ON OST OSE U SUSTINI RADI U OVOM PRIMERU JESTE DA REDEFINISEM CODE PRETTY SIMPLE SERVERA

KORISTI SE I http PAKET, ZA KOJI JE AUTOR WORKSHOPA REAK ODA CE SE RETKO, DIREKTN KORISTITI ALI DA GA MNOGE STVARI KORISTE UNDER THE HOOD

JA MISLIM DA BI BILO DOBRO DA JA SVE OVE REWRITE-UJEM SA TYPESCRIPT-OM

ZATO CU DA KRENEM OD SAMOG POCETKA

## PROJEKAT SE SASTOJI OD FAJLA KOJI CE BITI RUNN-OVAN SA CLI EXECUTABLE, ALI ON CE USTVARI BITI FAJL U KOJEM CU KREIRATI SERVER

## ALI SASTOJI SE I OD ASSET-A

TO SU U assets FOLDER-U:

html FAJL I css FAJL

SVE USTVARI IZGLEDA OVAKO

```linux
│   server.js
│
└───assets
        index.html
        style.css
```

## USTVARI JA CU IMATI server.ts KOJI CE BITI TRANSPILED TO JAVASCRIPT, A SVE OSTALO JE ISTO

server.ts

```typescript
import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';

// OBRATI PAZNJU DA INTERNAL MODULI KORISTE CALLBACKS
// ALI TI MOZES I NJIH DA KORISTIS U KOMBINACIJI SA PROMISE-IMA

/**
 * OVA FUNKCIJA JE RANIJE KORISTILA SYNC FERZIJU READING-A FILA
 * I TO SAM IZMENIO
 * 
 * OVA FUNKCIJA USTVARI TREBA DA PROCITA SADRZINU CELOG FAJLA
 * 
 * @param name IME ASSETA IZ assets FOLDERA
 */
const findAsset = (name: string): Promise<any> => {  // STAVIO SAM BIO OVDE Promise<string> I NIKAK ONISAM MOGAO DA PRAVILN ODEFINISEM POVRATNU VREDNOST BEZ UPOTREBA as-A (IZGLEDA DA AKO JE if(typeof ...) PREVISE NESTED DA NE FUNKCIONISE, ODNOSN OTYPESCRIPT NECE ZNATI TYPE)
    
    const pathAsseta: string = path.join(__dirname, 'assets', name)

    let dataPromise = new Promise((res, rej) => {

        // EVO TI: ASINHRONI READING SADRZINE FILE-A, UPRAVO KORISTI CALLBACK
        fs.readFile(pathAsseta, (err, data) => {

            if(err){
                rej(`Cant read file: !! [ ${pathAsseta} ] !!`)
            }else{   
                res(data.toString())
            }

        })

    })

    // OVDE SAM IMAO PROBLEM KADA SAM ZA RETURNED VALUE IMAO
    // TYPE ANNOTAION Promise<string>
    // SADA JE U REDU

    return dataPromise;  // POSTOJI MOGUCNOST DA MI OVO NECE TREBATI, ALI
                         // AKO TREBA NESTO DA SE RADI PO ZAVRSETKU CITANJA FAJLA
                         // MOGU CHAIN-OVATI then
}


// POTREBNO JE DA ZADAM VREDNSOTI ZA port I hostname, KOJE CU KORISNITI PRI SERVINGU
// WEB PAGE-A

const hostname: string = '127.0.0.1';
const port: number = 3000;

// HELPER METODA KOJA BI TREBALA DA LOG-UJE U TERMINALU
// NEKOLIKO INFORMACIJA, AKO JE REQUEST USPESAN, ODNOSNO AKO JE REQUESTED
// ONO STO ZNAM DA POSTOJI

type helperFunctionsType = (...params: any[]) => void

const logRequest: helperFunctionsType = (method: string, route: string, status: number) => {
    console.log(method, route, status)
}

// ZELI MDA NAPRAVIM router FUNKCIJU
type routerType = (
    response: http.ServerResponse,
    request: http.IncomingMessage
    
) => void


const router: routerType = (
    response: http.ServerResponse,
    request: http.IncomingMessage

) => {

    const assetname: string = url.parse(request.url).pathname;

    if(assetname === "/" || assetname === "index.html"){

        response.writeHead(200, {'Content-Type': 'text/html'})

        findAsset('index.html').then(asset => {
            
            logRequest(request.method, assetname, 200)
            response.write(asset)
            response.end();
        })
        .catch(reason => {
            console.log(reason)
        })

    }else if(typeof assetname === "string" && assetname !== undefined){

        // response.writeHead(200, {'Content-Type': request.headers["content-type"]})  // IZAZIVALO JE PROBLEME JER NISAM MOGAO DA PROCITAM CONTENT TYPE SA REQUEST-A

        findAsset(assetname).then(asset => {

            logRequest(request.method, assetname, 200)
            response.write(asset)
            response.end();

        })
        .catch(reason => {
            console.log(reason)
        })


    }else{

        console.log("Requested asset isn't part of our app !!!!")

        response.end()

    }


}


const server = http.createServer((req, res) => {

    router(res,req);

})

server.listen(port, hostname, () => {

    console.log(`Server Running at: http://${hostname}:${port}`)

})
```

NECU NISTA DODATNO KOMENTARISATI, UGLAVNOM KADA SE OVO TRANSPILE-UJE U server.ts CODE FUNKCIONISE

MOZDA JE PSOTOJAO BOLJI NACIN DA SE OVO RESI, ALI OVO JE BIO MOJ NACIN

MADA router METODA JE MOGLA DA BUDE async FUNKCIJA GDE BI ONDA KORISTIO await SAMO ZA findAsset POZIV

TAKO NESTO JE RADIO AUTOR WORKSHOPA, PA MOZES DA POGLEDAS NJEGOV VIDEO

## IPAK URADI NJEGOV PRIMER, JER SAM POGRESNO SHVATIO STA BI TO MOGLO BITI router

A TAKODJE ON SE BAVIO MIME TYPE-OVIMA (INSTALIRAO JE NOVI PAKET)

## SPOMINJE TAKODJE DA BIH STATICNE ASSET-OVE TREBAO SERVE-OVATI SA CDN-A

NE RAZUMEM BAS TO NAJBOLJE

## VRATICU SE JOS JEDNOM NA OVO

