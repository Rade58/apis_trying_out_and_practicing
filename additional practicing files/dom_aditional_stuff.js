console.log('////////////////////////////////////////////////////////////////////////////////////////////');
// OVAJ FAJL JE LOADED U      pageLifecycleEventsSec.html
// DAKLE NASTAVLJAM SA CLANCIMA VEZNAIM ZA          Browser: Document, Events, Interfaces
// SADA CU SE BAVITI, SAMIM    Document-OM, ODNOSNO ONO STO BUDE MSAZNAO I Z SLEDECEG CLANKA, BICE METODE
// I NACINI, KOJIMA SE MODIFIKUJE document
// ZATO SE SLEDECA LEKCIJA, ODNOSNO CLANAK ZOVE:
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//          
//       MODIFIKOVANJE document-A    (MODIFYING THE document)

// 
///////////////////////////////////////////////////////////////////////////////////////////

//                                 ****KREIRANJE ELEMENATA****:
// 
//            document.createElement(tag)             document.createTextNode(text)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                               ****METODE INSERTION-A**** (INSERTIN METHODE)
// 
//    METODE KOJE SE PRIMENJUJU NA PARENT ELEMENT-U:

//          parentElement.appendChild(node)

//          parentElement.insertBefore(node, nextSibling)

//          parentElement.replaceChild(node, oldChild)         OVA METODA JEDAN ELEMENT UKLANJA I NJA NJEGOVO
//                                                             MESTO INSERT-UJE DRUGI
// 
// **********************************************************************************************************

//    SLEDECI SET METODA, OMOGUCAVA VISE FLEKSIBILAN INSERTION:
//          ONO STO JE KARAKTERISTICNO ZA OVE METODE, JESTE DA SE NJIMA KAO ARGUMENTI MOGU DAVATI
//                                          I node  ELEMENI
//                                          I string-OVI

//          A TAKODJE TIM METODAMA SE MOZE DODAVATI VISE ARGUMENATA, ODNOSNO KADA POZOVEM TAKVU METODU
//          NJENI ARGUMENTI MOGU VITI:
//                                          VISE    node    ELEMENATA
//                                          VISE    string-OVA
//                                          ZAJEDNO, VISE node-OVA I string-OVA

// MEDJUTIM SHVATIO SAM DA TREBA VODITI RACUNAO O INSERTION-U STRING-OVA, NA OVAJ NACIN, JER MOGU UCI
// U ISKUSENJE DA INSERT-UJEM OVAKAV STRING:
                                                    '<li>Jabuka</li>'
// VEMOMA JE VAZNO SHVATITI DA POMNUTI STRING    NECE I NECE      BITI HTML ELEMENT, VEC SAMO TEKST
// STO ZNACI DA AKO POMENUTI ELEMENT INSERTUJEM UZ POMOC METODA (KOJE CU USKORO NABROJATI)      <li></li>
// ce biti do teksta ibice vidljiv, kada budem pogledao moju stranicu, odnosno  tagovi, bnece biti parsed
// i ucitani kao da je rec o html elementu

// SADA CU NABROJATI, SVE TE, METODE, KOJE PRUZAJU FLEKSIBILNIJI INSERTION

//      node.append(...nodes or strings)
//      node.prepend(...nodes or strings)
//      node.before(...nodes or strings)
//      node.after(...nodes or strings)

//      node.replaceWith(...nodes or strings)              OVA METODA JEDAN ELEMENT UKLANJA I NA NJEGOVO
//                                                         MESTO INSERT-UJE node ILI string
//                                                         (RECI CU DA JE OVO POSEBNA METODA, JER ONA
//                                                         UKLANJA node, A NA NJEGOVOM MESTU 
//                                                         INSERT-UJE DRUGI node ILI string)

// *********************************************************************************************************
// SADA CU SE POZABAVITI SA JOS TRI POSEBNE METODE, KOJE ISTO SLUZE ZA INSERT-OVANJE
// (PRE NEGO STO NAVEDEM KOJE SU TO METODE RECI CU DA 'ADJACENT' U PREVODU ZNACI 'SUSEDNO/I/A')
// 
//          elem.insertAdjacentElement           elem.insertAdjacentHTML              elem.insertAdjacentText
// 
// OVIM METODAMA SE MOGU DODATI DVA ARGUMENTA
// OBJASNICU, KOJI JE TO DRUGI ARGUMENT, U SLUCAJU SVAKE METODE
// 
// DRUGI ARGUMENT  KOJI SE DODAJE:
//                             insertAdjacentElement         JESTE ELEMENT KOJI ZELIM DA INSERTUJEM

//                             insertAdjacentHTML            JESTE STRING HTML-A KOJI ZELIM DA INSERT-UJEM

//                             insertAdjacentText            JESTE STRING TEKSTA, KOJEG ZELIM DA INSERT-UJEM

// PRVI ARGUMENT, POMENUTIH FUNKCIJA SE ODNOSI NA MESTO GDE ZELIM DA IZVRSIM INSERTION
// POMENUTI ARGUMENT, JESTE STRING, A OVO SU NJEGOVE, PRILICNO SUGESTIVNE VARIJACIJE, KOJE NE TREBA DODATNO
// KOMENTARISATI
//                          'beforebegin'   'afterend'
//                          'afterbegin'    'beforeend'

// SAMO CU RECI DA SE ODREDNICE     'begin'   I      'end'      ODNOSE NA OPENING I CLOSING TAG, NEKOG
// ELEMENTA
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                                    ****KLONIRANJE node-OVA****
// 
// POSTIZE SE UZ POMOC          node.cloneNode       METODE
// 
// KAO ARGUMENT JOS SE MOGU DODATI BOOLEAN      true , ILI   false
// 
//          true    ZANACI DA CE SE IZVRSITI, TAKOZVANO 'deep'  KLONIRANJE
//                  KOJE UKLJUCUJE SVE ATRIBUTE I SVE SUBELEMENTE, ONOG ELEMENTA KOJI SE KLONIRA
// 
//          false   KLON CE BITI NAPRAVLJEN, ALI SUBELEMENTI NECE BITI KLONIRANI, DAKLE BICE KLONIRAN SAMO
//                  ONAJ ELEMNT, NAD KOJI MSE METODA PRIMENILA
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                                    ****METODE ZA UKLANJANJE****(REMOVAL METHODS)
// POSTOJE DVE METODE:
// 
//                  parentElement.removeChild(node)                             node.remove()
// 
// 
// NAIME, VIDI SE DA JE DRUGA METODA, ZNATNO KRACA (A PRVA POSTOJI SAMO IZ ISTORIJSKIH RAZLOGA)
// TREBA ZAPAMTITI I SLEDECE:
//                              AKO ZELIM DA POMERIM ELEMENT NA NOVO MESTO, NEMA POTREBE DA GA
//                              EKSPLICITNO UKLANJAM SA POSTOJECEG MESTA; JER SVAKA INSERTION METODA
//                              AUTOMATSKI UKLANJA node, SA STAROG MESTA
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                              ////        PAR RECI O      document.write        ////

// ZA OVU METODU KAZU DA JE DREVNA (ANCIENT), METODA ZA DODAVANJE NECEGA NA WEB STRANICI
// 
// OVA METODA, KADA SE POZOVE, NAKON STO SE PAGE LOAD-OVAO, DESICE SE DA CE SAV SADRZAJ BITI UKLONJEN
// DAKLE, METODA MOZE DA SE POZOVE, TOKOM LOAD-OVANJA STRANICE
// TAKO STO BIH NA STRANICI NESTOVAO script TAG U CIJEM OBIMU BIH DEFINISAO POZIVANJE POMENUTE METODE
// (PREDPOSTAVLJAM DA BI SE TAD IZBEGAO TRIGGERING   DOMContentLoaded       EVENTA (AKO TO NESTO ZNACI U
// OVOM SLUCAJU?))
// NA PRIMER OVAKAVO KORISCENJE SCRIPT-A BI NA STRANICI
const neki_script_sa_writeom = `
    <p>Negde u stranici...</p>
    <script>
        document.write('<b>Hello from JS<b>');
    </script>
    <p>Kraj blah</p>
`;
// 'WRITE-OVA' POMENUTI <b></b> ELEMENT, BEZ TOGA DA BILO STA UKLONI (DAKLE, OKOLNJI PARAGRAFI BI BILI
// NETAKNUTI)
// ALI ONO STO CE PROUZROKOVATI, OVAKVO, ODLOZENO POZIVANJE     document.write-A
const neki_drugi_script_sa_writeom = `
    <p>Negde u stranici...</p>
    <script>
        setTimeout(() => document.write('<b>Hello from JS</b>'), 2000);
    </script>
    <p>Kraj blah</p>
`;
// JESTE DA CE NAKON DVE SEKUND SVE BITI UKLONJJENO, A DA CE NA STRANICI, SAMO OSTATI HTML UNESEN, UZ POMOC
// document.write METODE

// KADA KORISCENJE document.write METODE, JEDINO MOZE BITI KORISNO OBJASNJAVA SLEDECI PASUS:
// 
// So if we need to add a lot of text into HTML dynamically, and we’re at page loading phase, and the
// speed matters, it may help. But in practice these requirements rarely come together. And usually we can
// see this method in scripts just because they are old.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REZIME (PREKOPIRAN, KAO IZ RUSKOG CLANKA, KAO I PREDHODNI PASUS):
// 
// Methods to create new nodes:

/*      document.createElement(tag) – creates an element with the given tag,
        document.createTextNode(value) – creates a text node (rarely used),
        elem.cloneNode(deep) – clones the element, if deep==true then with all descendants.

Insertion and removal of nodes:

- From the parent:
  .  parent.appendChild(node)
  .  parent.insertBefore(node, nextSibling)
  .  parent.removeChild(node)
  .  parent.replaceChild(newElem, node)

    All these methods return node.

- Given a list of nodes and strings:
  .  node.append(...nodes or strings) – insert into node, at the end,
  .  node.prepend(...nodes or strings) – insert into node, at the beginning,
  .  node.before(...nodes or strings) –- insert right before node,
  .  node.after(...nodes or strings) –- insert right after node,
  .  node.replaceWith(...nodes or strings) –- replace node.
  .  node.remove() –- remove the node.

    Text strings are inserted “as text”.

- Given a piece of HTML: elem.insertAdjacentHTML(where, html), inserts depending on where:
   . "beforebegin" – insert html right before elem,
   . "afterbegin" – insert html into elem, at the beginning,
   . "beforeend" – insert html into elem, at the end,
   . "afterend" – insert html right after elem.

    Also there are similar methods elem.insertAdjacentText and elem.insertAdjacentElement, they insert text
    strings and elements, but they are rarely used.

- To append HTML to the page before it has finished loading:
    document.write(html)

    After the page is loaded such a call erases the document. Mostly seen in old scripts. */


// OVIM JE OVAJ CLANAK, KOJ ISE BAVI METODAMA, KOJIMA SE MODIFIKUJE document, ZAVRSEN
// A PRIMERE CU URADITI NA KRAJU, KADA ZAVRSIM SA SERIJOM CLANAKA, KOJI SE BAVE     Document-OM (ODNOSNO
// DODATNIM STVARIMA, KOJIMA RANIJE NISAM DAO PAZNJU KAKVU ZASLUZUJU)   

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
// SADA CU SE POZABAVITI, MOZDA ONIM CIME SAM SE, PRVO TREBAO POZABAVITI (PRE BILO CEGA DRUGOG
// NAIME, PRE EVENT-OVA, KOORDINATA, SCROLLING-A, MODIFYING-A document-A ETC), A TO JE
//                  
//                              BROWSER ENVIROMENT, SPECS
// 
// JavaScript je inicijalno kreiran za web pregledače. Od tada je evoluirao i postao jezik sa mnoštvom
// upotreba i platformi. Platforma može biti pretraživač, web server ili mašina za pranje veša ili drugi host.
//  Svaki od njih pruža funkcionalnost specifične za platformu. Specifikacija JavaScript-a naziva to 
// okruženje domaćina (HOST ENVIROMENT).
// Lokalno okruženje pruža objektima i funkcijama specifičnim za platformu dodatak jezičnom jezgru (LANGUAGE
// CORE)
// Web pretraživači daju sredstva za kontrolu veb stranica. Node.JS nudi funkcije na serveru i tako dalje.

// *********************************************************************************************************
// NA SLICI, KOJU SAM UCITAO (PRVA SLIKA UCITANA U HTML FAJL), I KOJU SAM PREUZEO IZ RUSKOG CLANKA, 
// NALAZI SE, TAKORECI BIRD'S-EYE POGLED, ONOGA SVEGA STA POSTOJI, KADA JE JAVASCRIPT POKRENUT U BROWSER-U
// *********************************************************************************************************

// Postoji "root" objekt nazvan         window.             Ima dve uloge:     
// Prvo, -----to je globalni objekat za JavaScript code    
// Drugo, ----on predstavlja "prozor pretraživača" i pruža metode za njegovu kontrolu.
// Na primjer, ovdje ga koristimo kao globalni objekt:

var sayHi = function(){             //  IAKO NEMA MNOGO VEZE SA OVOM LEKCIJOM, ALI IPAK POSTAVLJAM OVO 
    console.log('Hello');           //  ASTO SAM OVU VARIJABLU DEKLARISAO SA var, A NE const, STO UVEK RADIM
};                                  // PA ZATO STO AKO BI KASNIJE, POKUSAO DA JOJ PRISTUPIM, PREKO
                                    // window-A, NE BIH MOGAO (TO VAZI I ZA const I ZA let), ODNOSNO DOSLO
                                    // DO TypeError-A, JER VARIJABLE DEKLARISANE SA const I let, NE POSTAJU
                                    // PROPERTIJI   window-A, A VARIJABLE DEKLARISANE SA var I DEKLARISANE
                                    // FUNKCIJE, ZISTA POSTAJU PROPERTIJI window-A
window.sayHi();
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                              Document Object Model

// document OBJEKAT daje pristup sadržaju stranice. Mi možemo promijeniti ili kreirati bilo šta na stranici
// koristeći ga.
// SVA DOKUMENTACIJA I PUBLISHING VEZANA ZA DOM SE NALAZE OVDE:

//   1)   W3C      https://www.w3.org/TR/dom        (https://en.wikipedia.org/wiki/World_Wide_Web_Consortium)     
//   2)   WhatWG   https://dom.spec.whatwg.org      (https://en.wikipedia.org/wiki/WHATWG)

// Kako se to događa? Dve grupe se ne slažu uvek, tako da imamo dva seta standarda.
// Ali one su veoma slične i na kraju se stvari merge-UJU. Dokumentacija koju možete pronaći na datim 
// resursima je vrlo slična, sa oko 99% MATCH-A. Postoje vrlo male razlike koje verovatno nećeTE primetiti.
// ILYA KANTOR, LICNO, NALAZI DA JE  WhatWG prijatnije za korišćenje. U drevnoj prošlosti, uopšte nije
// postojao nikakav standard - svaki pretraživač je implementira kako je želeo. 
// Različiti pregledači su imali različite skupove, metode i osobine za istu stvar, a programeri su morali da
// napišu različite kodove za svaku od njih. Mračna, gadna vremena. Čak i sada možemo ponekad sresti stari 
// code koja koristi browser specific propertije i radi oko nekompatibilnosti.
// Ali u ovom ruskom prirucniku (clanicima) koriste se moderne stvari: nema potrebe da naučite stare stvari
// dok vam stvarno nije potrebno (velike su šanse da nećete). Zatim se pojavio DOM standard, u pokušaju da
// se svi dovedu u dogovor. Prva verzija bila je "DOM nivo 1", zatim je proširena DOM nivoom 2,
// zatim DOM nivoom 3, a sada je dostigao DOM nivo 4. Ljudi iz WhatWG grupe su se umorili od brojeva verzije
// i nazivaju ga samo "DOM", bez broja. Tako je radjeno i u ovim clancima
// **********************************
// MORAM DODATI NESTO, STO JE VAZNO:
// DOM nije samo za pretraživače
// DOM specifikacija objašnjava strukturu dokumenta i pruža objekte za manipulaciju njime. Postoje i 
// non-browser instrumenti, koji ga koriste, takodje
// Na primjer, alatke sa servera koje učitavaju HTML stranice i procesiraju ih koristeći DOM.
// Međutim, oni mogu podržati samo dio specifikacije
// **********************************
// CSSOM za stilizovanje        https://www.w3.org/TR/cssom-1/
// CSS Pravila i stylesheet-ovi, nisu strukturirani kao HTML. Postoji, odvojena, odnosno posebna
// specifikacija CSSOM, koja objašnjava kako su stilovi predstavljena kao objekti i kako ih čitati i pisati.
// CSSOM se koristi zajedno sa DOM-om kada modifikujemo pravila stila za dokument. U praksi, CSSOM retko se 
// zahteva, jer su obično CSS pravila statična. Redko je potrebno dodati / ukloniti CSS pravila iz 
// JavaScript-a, tako da ga sada nećemo pokrivati.
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                      BRROWSER OBJECT MODEL        BOM (DEO HTML spec)

// Model objekata pretraživača (BOM) su dodatni objekti koje pruža pretraživač (host okruženje) da rade sa 
// svime osim
//                      document-A

// Na primer:

// Objekt navigatora pruža osnovne informacije o pretraživaču i operativnom sistemu.
// Postoji mnogo osobina, ali dve najčešće su:
//                                             navigator.userAgent          - o sadašnjem pretraživaču 
//                       I                     navigator.platform           - o platformi (može pomoći
//                                                                                 TO DIFER između
//                                                                                 Windovs / Linux / Mac etc.)
// Objekt       location            nam omogućava da pročitamo trenutnu URL adresu 
//                                  i možemo preusmeriti pretraživač na novu.

// EVO KAKO MOGU KORISTITI      location        OBJEKAT

console.log(      location.href      );     //POKAZUJE TRENUTNI URL

//       if(confirm('Go to wikipedia?')) location.href = 'https://wikipedia.org';

//      DAKLE OVIM GORE AKO, confirm , return-UJE true, BROWSER CE BITI REDIRECTED DO NOVOG URL-A

// Funkcije         alert / confirm / prompt            su takođe deo BOM-A: oni nisu direktno povezani sa 
// document-OM, već predstavljaju ciste browser metode za komunikaciju sa korisnikom
// ******************
// BOM je deo opštih HTML specifikacija   (   https://html.spec.whatwg.org/   )
// Da, to ste dobro čuli. HTML specifikacija na https://html.spec.whatwg.org ne odnosi se samo na "HTML jezik"
// (oznake, atributi), već obuhvata i gomilu objekata, metoda i DOM specifičnih ekstenzija za pretraživače.
// To je "HTML u širokom smislu"
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REZIME (PREUZET U ORIGINALU IZ RUSKOG CLANKA):
// 
// GOVORECI O STANDARDIMA, PRISUTNO JE SLEDECE:
// 
// ----     DOM specification
// Describes the document structure, manipulations and events, see     https://dom.spec.whatwg.org

// ----     CSSOM specification 
// Describes stylesheets and style rules, manipulations with them and their binding to documents, see 
//      https://www.w3.org/TR/cssom-1/

// ----     HTML specification
// Describes the HTML language (e.g. tags) and also the BOM (browser object model) – various browser
// functions: setTimeout, alert, location and so on, see        https://html.spec.whatwg.org
// It takes the DOM specification and extends it with many additional properties and methods
// Now we’ll get down to learning DOM, because the document plays the central role in the UI
// Please note the links above, as there’s so much stuff to learn it’s impossible to cover and 
// remember everything.
// When you’d like to read about a property or a method, the Mozilla manual at
//                                                              https://developer.mozilla.org/en-US/search        
// is a nice resource, but reading the corresponding spec may be better: it’s more complex and longer to read,
// but will make your fundamental knowledge sound and complete.
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************


//                  DOM DRVO    (I OVO SAM TREBAO RANIJE PROCITATI, ALI NEMA VEZE)

// U OVOM CLANKU POSTOJE SJAJNE INTERAKTIVNE REPREZENTACIJE, DOM DRVETA I ZATO TREBA POSETITI
// STRANICU, POMENUTOG CLANKA, KAKO BI IH SVE VIDEO       https://javascript.info/dom-nodes
// 
// Osnova (backbone) HTML dokumenta su tagovi
// Prema Document object Model-u (DOM), svaka HTML-tag je objekat. Ugrađeni tagovi se zovu "children"
// ODNONO DECA ONOG ENCLOSING taga
// Tekst unutar oznake je i objekt
// Svi ovi objekti su dostupni koristeći JavaScript
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//              PRIMER DOM-A

// EXPLORE-OVACU      DOM     ZA SLEDECI document

const neki_dom = `
<!DOCTYPE html>
<html>
    <head>
        <title>About elks</title>
    </head>
    <body>
        The truth about elks.
    </body>
</html>
`;

// DOM predstavlja HTML kao TREE strukturu tagova
// Tag-ovi se nazivaju node-OVI (ili samo elementi). NESTED TAGOVI postaju deca, onih ENCLOSED
// Kao rezultat toga imamo drvo elemenata: <html> je u korenu, onda su <head> i <bodi> njEGOVA djeca, etc.

// Tekst unutar elemenata formira     text node-OVE      , označene, odnosno labeled kao:

//                                                                                          #text 
// 

// Tekst node sadrži samo string. Može da nema, ili ima dece, i uvijek je 'LIST' (POSLEDNJI NIVO NESTING-A)
// dom drveta
// Na primer, pomenuti tag iz pimera:       <title>About elks</title>            ima nested         
//                                                                               text node      "About elks"

// Obratite pažnju na posebne karaktere u text node-OVIMA (MORAM MALO BOLJE POGLD):

    //              new line (novi red):        ↵           (u JavaScript-u poznat kao \n)
    //              space (prostor):            ␣      
    
// AKO MI NIJE JASNO GDE SE ONI NALAZE, MOGU POSMATRATI GORNJI DOKUMENT, KOJI SAM PREDSTAVIO:
// NAIME, SVAKI NOVI RED (↵  NAKON TAGA) PREDSTAVLJA        text node , ILI SVAKI UDAREN 
// TAB ILI SPACE, ISTO TAKO PREDSTAVLJA text node-OVE

// space i new line - su potpuno važeći karakteri, formiraju tekst node-OVE i postaju deo DOM-a.
// Tako, na primjer, u primjeru iznad; tag <head> sadrži neke prostore prije <title> i taj tekst postaje
// #text node (sadrži samo novu liniju i samo neke prostore)

        // Postoje samo dva izuzetka najvišeg nivoa:

//  1)   spaces     i     new lines       pre <head> se ignorišu iz istorijskih razloga

            // SLEDECE JE PO MENI, VEOMA VAZNO
//  2)   Ako stavimo nešto posle </ body>, onda se to automatski pomiče unutar  body-A  , na NJEGOVOM kraju,
//       jer HTML specifikacija zahteva da svi sadržaji moraju biti unutar <body>. Tako da nakon </ body>
//       ne sme biti prostora       space-OVA

// U ostalim slučajevima, sve je straightforward -       ako u       document-U       postoje space-OVI 
// (baš kao i bilo koji drugi karakter), oni postaju text node-OVI u DOM-u, a ako ih uklonimo,
// onda ih neće biti

// EVO IH U OVOM SLUCAJU, SAMO NON-SPACES-ONLY text node-OVI

const no_spaces = ` <!DOCTYPE HTML>
                    <html><head><title>About elks</title></head><body>The truth about elks.</body></html>  `;

//***********************************************************************************************************
//      'EDGE SPACES'     I      'IN-BETWEEN-EMPTY TEXT'             SU NAJCESCE HIDDEN U ALATIMA
// BROWSER TOOLS (KOJIMA CU SE, USKORO POZABAVITI), KOJI RADE SA DOM-OM, OBICNO NE POKAZUJU SPACE-OVE, NA
// POCETKU/KRAJU        EMPTY text node-OVA (LINE-BREAKS) BETWEEN TAGS
// TO JE ZATO STO SE ONI PRETEZNO KORISTE ZA DEKORISANJE HTML-A (KORISCENJE TABOVA U CILJU LEPSEG IZGLEDA 
// NESTING-A), I NE UTICU, NA PRIKAZ (BAR U NAJVECEM BROJU SLUCAJEVA)

// **********************************************************************************************************

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//                                      AUTOCORRECTION  (AUTOKOREKCIJA) 
// 
// AKO BROWSER NAIDJE NA MALFORMED (malformisan, nakazan) HTML. BROWSER GA AUTOMATSKI POPRAVLJA, TOKOM
// KREIRANJA DOM-A
// NA PRIMER,TOP TAG JESTE UVEK     <html></html>   ; CAK IAKO NE POSTOJI U document-U (BOLJE RECI IAKO GA
// DEVELOPER NIJE EKSPLICITNO KREIRAO); DAKLE ON CE POSTOJATI U DOM-UBROWSER CE GA KREIRATI
// ISTO VAZI I ZA       <body></body>    TAG

// KAO PRIMER, AKO HTML FAJL JESTE SINGLE WORD     "Hello"    ,BROWSER CE JE WRAPP-OVATI U     <html></html>
// I U    <body></body>     ; A DOM-U CE BITI DODAT I POTREBNI      <head></head>

// NAIME, PRILIKOM GENERISANJA DOM-A, BROWSER AUTOMATSKI    PROCESS-UJE ERROR-E U document-U, ZATVARA TAGOVE
// ETC.

// SLEDECI NEVALIDNI document
const nevalidni_dokument = `
    <p>Hello
    <li>Mom
    <li>and
    <li>Dad
`;
// POSTACE NORMALNI DOM, DOK BROWSER CITA TAG-OVE A RESTORES MISSING PARTS
//***********************************************************************************************************
//      TABELE UVEK IMAJU        <tbody></tbody>
// INTERESANTNI   'SPECIJALNI SLUCAJ'   SU TABELE. PO DOM SPECIFIKACIJI ONI MORAJU DA IMAJU   <tbody></tbody>
// ALI GA HTML TEKST (HTML KOJI DEFINISE DEVELOPER), MOZE IZOSTAVITI; I U TOM SLUCAJU CE BROWSER AUTOMATSKI
// KREIRATI     <tbody></tbody>
// 
// ZA SLEDECI HTML
const tabela_bez_tbody = `
    <table id="table"><tr><td>1</td></tr></table>
`;
// DOM STRUKTURA JE AUTOCCORECTED I IZGLEDA OVAKO
const tabela_sa_tbody_autocorrected = `
    <table id="table"><tbody><tr><td>1</td></tr></tbody></table>
`;
// KAO STO VIDIS    <tbody></tbody>         SE POJAVIO NIOTKUDA (TO MOGU VIDETI U ELEMENT ILI INSPECTOR
                                                                // SEKCIJAMA, BROWSERA)
// TREBAO BIH OVO IMATI NA UMU, DOK RADIM SA TABELAMA, KAKO BI IZBEGAO IZNENADJENJA 
//***********************************************************************************************************
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//                                      DRUGI TIPOVI    node-OVA 
// 
// DODACU JEDNOJ STRANICI JOS NEKOLIK OTAGOVA, ALI I COMMENT
const page_with_comment = `
    <!DOCTYPE html>
    <html>
    <body>
        The truth about elks.
        <ol>
            <li>An elk is smart</li>
            <!-- komentar -->
            <li>...and cunning animal!</li>
        </ol>        
    </body>
    </html>
`;

// GORE SE MOZE VIDETI      NOVI node TYPE      -    COMMENT node       ; A LABELED JE KAO      #comment
// Možda mislimo - zašto je COMMENT dodat u DOM? To ne utiče na vizuelnu predstavu na bilo koji način. 
// Ali postoji pravilo - ako je nešto u HTML-u, onda mora biti i u DOM stablu

//     *********** SVE U HTML-U, CAK COMMENTS, POSTAJU DEO DOM-A*****************
// CAK I <!DOCTYPE...> DIRECTIVA NA SAMOM POCETKU HTML-A, JE ISTO TAKO DOM node; I NALAZI SE U DOM DRVETU,
// ODMAH PRE <html></html>
// TAJ node NIKO NE DIRA (A NIJE NI CRTAN NA DIAGRAMIMA, KOJI SU U RUSKO MCLANKU); ON JE JEDNOSTAVNO TU
// 
//      document        OBJECT, KOJI REPREZENTUJE CEO DOKUMENT, JESTE FORMALNO, DOM node, TAKODJE 
// 
// POSTOJI          12  node TIPOVA      https://dom.spec.whatwg.org/#node   
// A U PRAKSI, NAJCESCE SE RADI SA SLEDECA 4 TIPA:
//                                                        1) document         -THE 'entry point' into DOM
//                                                        2) element nodes    -HTML tagovi, BUILDING BLOKOVI
//                                                        3) text nodes       -contain text (sadrzani text)
//                                                        4) comments         -ponekad mozemo staviti
//                                                                             informaciju tamo; nece biti
//                                                                              prikazani, ali ih javascript,
//                                                                              moze citati iz DOM-A
// ****                                                                                                  ****
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                              VIDI TO I SAM
// 
// DA VIDIM DO MSTRUKTURU IN REAL-TIME, PROBAJ     LIVE DOM VIEWER:

//                                                   http://software.hixie.ch/utilities/js/live-dom-viewer/  
// 
// KUCAJ U document-U, I PRIKAZACE DOM, AT AN ISNSTANT
// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//               U BROWSER-OVOM INSPECTOR-U

// Drugi način istraživanja DOM-a je korištenje BROWSER DEVELOPER TOOLS. Zapravo, to SE I koristi 
// prilikom development-A
// Da biste to uradili, otvorite web stranicu   https://javascript.info/article/dom-nodes/elks.html   ,
// (POMENUTA STRANICA JE SAMO PRIMER I Z RUSKOG TUTORIJALA) uključite alate za programer pretraživača 
// i prebacite se na karticu Elements

// TAMO MOGU VIDETI     DOM         , ZATIM MOGU KLIKNUTI NA ELEMENTE, VIDETI NJIHOVE DETALJE ETC.

// Imajte na umu da je struktura DOM-a u alatkama za programer pojednostavljena. Tekst node-ovi prikazani su
// tek kao tekst. I uopšte nema "blank" (space only) text node-ova. To je u redu, jer nas većinu vremena
// zanimaju element node-OVI

// POSTOJI I DUGME U LEVOM GORNJEM UGLU (DEVELOPER TOOLS SEKCIJE), NA KOJE KADA KLIKNEM SE ULAZI U
        // 'SELECT ELEMENT MODE' (JA SAM GA TAKO PROZVAO)
// NAKIN CEGA KADA KLIKNEM NA NEKI ELEMENT, NA SAMOJ STRANICI (NE DOM REPREZENTACIJE, VEC SAMOM PAGE-U)
// MOGU IZABRATI node , DAKLE KORISCENJEM MISA (ILI DRUGIH POINTER UREDJAJA) MOGU       'INSPECT'-OVATI

// KAKO BUDEM PRELAZIO KURSOROM MISA PREKO ZELJENOG ELEMENA, DOK TOG NODE-A CE SE SCROLL-OVATI U    ELEMENT
// SEKCIJI DEV TOOLSA , I TAJ ODGOVARAJUCI  node CE SE HIGHLIGHT-OVATI
// Ovo radi odlično kada imamo ogromnu HTML stranicu (i odgovarajući ogromni DOM) i želimo da vidimo mesto 
// određenog elementa u njemu

// Drugi način da to uradite bilo bi samo klik desnim klikom na web stranicu i odabrati "Inspect" u 
// kontekstnom meniju
// Na desnom delu alata nalaze se i sledeći subtabovi:

//      Styles              - možemo vidjeti da se CSS primjenjuje na trenutni element, pravilo po pravilu,
// uključujući built-in pravila (siva). 
// Skoro sve se može urediti na licu mesta, uključujući dimenzije / margine / padding polja ispod

//      Computed            - da vidimo CSS primenjen na element po propertiju: za svaku osobinu možemo videti
// pravilo koje ga daje (uključujući CSS nasleđivanje i slično).

//      Event Listeners     - da biste videli posmatrače događaja koji su povezani sa elementima DOM-a


// Najbolji način da ih proučavate je da kliknete naokolo. Većina vrednosti se može edit na licu mesta
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//          INTERAKCIJA SA KONZOLOM

// Dok istražujemo DOM, možda ćemo htjeti primijeniti i JavaScript. Kao: getting node-A i pokretanje nekog 
// code-A da biste ga izmenili, kako biste videli kako izgleda. Evo nekoliko saveta za putovanje između
// kartice Elements i konzole.

//      - Izaberite prvi <div> u Elements tab-u, dev tools-a
//      - Pritisnite Esc - otvoriće konzolu odmah ispod Elaments tab-A (S PREMN OZA UNOSENJE CODE-A)
// 
// Sada je poslednji izabrani element dostupan kao          $0      , prethodno selectovani je 
                                //                                                              $1       etc.

// Na njima možemo pokrenuti komande. Na primer,            $0.style.background = 'olive'

//*********************************************************************************************************

const elementDiv = document.createElement('div');
elementDiv.innerText = "Neki blah tekst";
document.body.prepend(elementDiv);

// Sa druge strane, ako smo u konzoli i imamo promenljivu koja referencira DOM node,
// onda možemo koristiti komandu        
//                                  inspect(node)
//                                                          da ga vidimo u Elements pane-U
// 
// ZA GORNJI ELEMENT, OVO SAM MOGAO NAPISATI U KONZOLI
                                            //                    inspect(elementDiv)

// DA SAM OVO NAPISAO OVDE U JAVASCRIPT FAJLU, DOSLO BI DO ERROR-A, JER JE      inspect     KONZOLINA KOMANADA
// A MOGAO SAM JEDNOSTAVNO I OUTPUT-OVATI       IME VARIJEABLE U KONZOLI STO SAM I RANIJE RADIO
//************************************************************************************************************
// NAIME, POMENUTO JE SVE BILO ZA       DEBUGGING       POTREBE, NARAVNO  (U NEKIM OD CLANAKA JA SA VEC
// MODIFIKOVAO DOM, A U JEDNOM OD CLANAKA CU SE PODSETITI I PROSIRITI ZNANJE O ACCESING-U DOM-A)
// 
// Developer tools su velika pomoć u development-u: možemo istražiti DOM, probati stvari i videti
// šta ide naopako
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
// REZIME:
// OSTAVICU OVAJ REZIME NA ENGLESKOM

// An HTML/XML document is represented inside the browser as the DOM tree.
// Tags become element nodes and form the structure.
// Text becomes text nodes.
// …etc, everything in HTML has its place in DOM, even comments.
// We can use developer tools to inspect DOM and modify it manually.
// Here we covered the basics, the most used and important actions to start with. 
// There’s an extensive documentation about Chrome Developer Tools at
//                 https://developers.google.com/web/tools/chrome-devtools. 
// The best way to learn the tools is to click here and there, read menus: most options are obvious. 
// Later, when you know them in general, read the docs and pick up the rest.

// DOM nodes have properties and methods that allow to travel between them, modify, move around the page
// and more

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************

//                          HODANJE DOM-OM (Walking the DOM)     

// DOM dozvoljava da uradi bilo šta sa elementima i njihovim sadržajem, ali prvo moramo doći do odgovarajućeg
// DOM objekta, prebaciti ga u varijablu, a onda ćemo ga moći promijeniti.
// Sve operacije na DOM-u počinju sa objektom dokumenta. Iz nje možemo pristupiti svakom čvoru.
// **********************************************************************************************************
// NA POCETKU HTML STRANICE (pageLifecycleEvents.html)  DODACU JEDNU SLIKU, NA KOJOJ SU PRIKAZANI 
// SVI PROPERTIJI (ILI 'LINKOVI' KOJI OMOGUCUJU TRAVELING IZMEDJU DOM node-OVA) (PREUZETO IZ RUSKOG
// TUTORIJALA)
// **********************************************************************************************************
// DISKUTOVACU SADA O SVIM TIM PROPERTIJIMA (IN MORE DETAIL)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                  NA TOP-U:      documentElement      I       body

// top-most  node-OVI  drveta su dostupni direktno kao propertiji  document-A:

        //          <html>:
                                document.documentElement
                                // TOPMOST document node JESTE POMENUTI, I TO JE DOM node <html> TAGA

        //          <body>:
                                document.body
                                // DRUGI, NASIROKO KORISCENI DOM node JESTE <body> ELEMENT: -   document.body

        //          <head>:
                                document.head
                                // <head> TAG JE DOSTUPAN KAO document.head

// **********************************************************************************************************
// **** POSTOJI NEZELJENA SITUACIJA (THERE'S A CATCH)              document.body        MOZE BITI       null
// SCRIPT NE MOZE PRISTUPITI ELEMENT-U, KOJI NE POSTOJI U TRENUTKU RUNNING-A SCRIPT-A
// NA PRIMER:   script      NESTED <head>-A ; TADA JE       document.body       NEDOSTUPNO; ZATO STO BROWSER,
// NIJE, JOS PROCITAO body
// tak oda u sledecem primero, ono sto ce biti stampano u konzoli, jeste            null
const example_with_body_null = `
<!DOCTYPE>
<html>
    <head>
        <script>
            console.log('body NE POSTOJI JER document.body JESTE': document.body);          //STAMPA SE null
        </script>
    </head>
    <body>
        <script>
        console.log('body POSTOJI EVO GA': document.body);
        </script>
    </body>
</html>
`;
// **********************************************************************************************************
// U DOM-U, REC         null            ZANCI:               'NE POSTOJI'
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//             DECA (CHILDREN):            childNodes          firstChild          lastChild
// 
// POSTOJE DVA TERMINA KOJA TREBAM KORISTITI (KORISTIO SAM IH I RANIJE), A TO SU:

//          1)      CHILD nodes  (IL IDECA);        TO SU ELEMENTI, KOJI SU DIREKTNA DECA; DRUGIM RECIMA
//                                                  DRUGIM RECIMA, ONI SU NESTED EXACTLY, U DATOM node-U

//          2)      DESCENDANTS (POTOMCI);          SVI ELEMENTI, KOJI SU NESTED U DATOM, UKLJUCUJUCI DECU,
//                                                  DECINU DECU ETC.

// Na primer, u sledecem primeru, <body> ima decu <div> i <ul> (i nekoliko praznih tekst node-OVA):
const blah_dom = `
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>
      <b>Information</b>
    </li>
  </ul>
</body>
</html>`;
// ... I ako tražimo sve descendante <body>-JA, onda dobijamo direktnu decu <div>, <ul> , alii takođe i više
// ugnežene elemenate kao što je <li> (dijete <ul>-A) i <b> (dijete <li>-A) - odnosno cijelo poddrvo (SUBTREE)

// KOLEKCIJA        childNodes       omogućava pristup svim child node-OVIMA, uključujući i text node-OVE
// I NAPOMINJEM DA NIJE REC OSVIM DESCENDANT-IMA, VEC O DIREKTNOJ DECI






console.log('////////////////////////////////////////////////////////////////////////////////////////////');
const nekiDiv = document.createElement('div');
const drugiDiv = document.createElement('div');
drugiDiv.innerHTML = '<strong>Neki Tekst</strong> a pored teksta weak';
drugiDiv.setAttribute('custom_attribute', 'custom attribute');
nekiDiv.tabIndex = 0;
// nekiDiv.hidden = true;
nekiDiv.append(drugiDiv);

document.body.append(nekiDiv);

const divCloneDeep = nekiDiv.cloneNode(true);
const divCloneShallow = nekiDiv.cloneNode(false);

window.console.log(divCloneDeep, '<-------->', divCloneShallow);
window.console.log('SOMETHING BLAH');
console.log('////////////////////////////////////////////////////////////////////////////////////////////');

