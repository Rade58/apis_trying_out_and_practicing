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
//                  ***** NA TOP-U:      documentElement      I       body       ******

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

//*******   DECA (CHILDREN):            childNodes          firstChild          lastChild       **********
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
// *******************************************************************************************************
// KOLEKCIJA        childNodes       omogućava pristup svim child node-OVIMA, uključujući i text node-OVE
// I NAPOMINJEM DA NIJE REC OSVIM DESCENDANT-IMA, VEC O DIREKTNOJ DECI
// *******************************************************************************************************
// SLEDECI PRIMER POKAZUJE CHILDREN     document.body -JA
const another_blah_dom = `
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>

    for(let i = 0; i < document.body.childNodes.length; i++){
        console.log(    document.body.childNodes[i]     );          // Text, DIV, Text, UL, ..., SCRIPT
    }

  </script>
  ...more stuff...
</body>
</html>
`;
// Imajte na umu zanimljiv detalj ovde. Ako pokrenemo gornji primer, poslednji prikazani element je <script>.
// Zapravo, dokument ima više stvari ispod ('...more stuff...'), ali u trenutku izvršenja skripte pretraživač
// ga još nije pročitao, tako da skripta to ne vidi
// *******************************************************************************************************
// PROPERTIJI       firstChild      I       lastChild       DAJU BRZ PRISTUP PRVOM I, POSLEDNJEM CHILD-U
// ONI SU SAMO SHORTHANDI
// *******************************************************************************************************
// KREIRACU PARENT I CHILD ELEMENT
const divElementPaps = document.createElement('div');
const divElementJunior1 = document.createElement('div');
const divElementJunior2 = document.createElement('div');
divElementJunior1.id = 'junior1';
divElementJunior2.id = 'junior2';
divElementPaps.append(divElementJunior1);
divElementPaps.append(divElementJunior2);
// AKO ELEMNT IMA DECU, ONDA SU SLEDECE IZJAVE, UVEK        true
console.log(  divElementPaps.childNodes[0] === divElementPaps.firstChild  );
console.log(  divElementPaps.childNodes[divElementPaps.childNodes.length - 1] === divElementPaps.lastChild  );
//  I U KONZOLI SE STAMPALO         true        ZA OBE IZJAVE

// TAKODJE POSTOJI I SPECIJALNA FUNKCIJA, A TO JE:                  hasChildNodes

console.log(    divElementPaps.hasChildNodes()    );      //  true

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    DOM KOLEKCIJE       (DOM collections)              
// 
// Kao što vidimo,      childNodes          izgleda kao niz. Ali zapravo to nije Array, već collection 
// - poseban objekat, koji se ponaša kao array
// Postoje dve važne posledice koriscenja, pomenutog objekta:

//      1. MOZEMO KORISTITI         for of          KAKO BI ITERAT-OVAO, PREKO TOG OBJEKTA
//         to je zato sto je pomenuti objekat iterable (PROVIDED JE     Symbol.iterator     properti, STO JE I
//                                                      REQUIRED DA BI NEKI OBJEKAT MOGAO BITI KORISCEN SA
//                                                      for-of  PETLOM)
        
                    for(let child of divElementPaps.childNodes){
                        console.log(child);                             //-->   <div></div>
                    }

//      2. METODE NIZA SE NE MOGU PRIMENITI (ODNOSNO NECE RADITI), ZATO STO KOLEKCIJA NIJE   Array   INSTANCA

                    console.log(  document.body.childNodes.filter  );       //-->   undefined
        
    //PRVA STVAR JE NICE, DRUGA JE TOLERABLE IZ JEDNOG RAZLOGA
    // NAIME POSTOJI METODA:
                                    Array.from

                    // KOJU KORISTIM, KADA ZELIM DA 'OD KOLEKCIJE NAPRAVIM "NOVI" NIZ'
                    // (JA USTVARI PRVIM NOVI NIZ, A NE MODIFIKUJEM KOLEKCIJU)
                    // 
                    // 
            
        console.log(    Array.from(document.body.childNodes).filter    );          // SADA JE METODA TU
                                                                                   // DAKLE MOZE SE PRIMENITI
                                                                                   // NA OVAJ NOVI NIZ
// **********************************************************************************************************
// DOM  collections SU READ-ONLY
// DOM COLLECTIONS, ALI I SVI DRUGI NAVIGACIONI PROPERTIJI SPOMENUTI U OVOM CLANKU SU READ-ONLY
// NE MOZE SE REPLACE-OVATI CHILD ELEMENT, DODELOM NOVOG ELEMENTA childNodes[0] = ...
// promena doma zahteva druge metode, koje sam vec spominjao
// **********************************************************************************************************
// DOM collections SU ZIVE
// GOTOVO SVE DOM KOLEKCIJE, SA MANJIM IZUZECIMA, JESU ZIVE; DRUGIM RECIMA. ONE REFLECT-UJU CURRENT STATE
// DOM-A
// AKO ZADRZIM NEGDE REFERENCU ZA   elem.childNodes I AKO ADD/REMOVE node-OVE U/IZ DOM-A; ONDA CE SE TI
// ELEMENTI, AUTOMATSKI POJAVITI U POMENUTIM KOLEKCIJAMA
// **********************************************************************************************************
// NE KORISTITI        for in       PETLJU, PREKO KOLEKCIJE
// KOLEKCIJE SU ITERABLE UZ KORISCENJE  for of  PETLJE. PONEKAD, LJUDI POKUSAVAJU DA KORISTE KOLEKCIJE SA
//      for in
//                      ******MOLIM VAS NE MOJTE OVO RADITI*********
// JER KOLEKCIJA IMA ODREDJENE 'EXTRA', RETKO KORISCENE PROPERTIJE; KOJIMA PO OBICAJU NE ZELIM DA PRISTUPIM
// JER, OBICNO ZELIM DA, SAMO PRISTUPIM node ELEMENTIMA KOLEKCIJE

    for(let dete in divElementPaps.childNodes){
        console.log(dete);                          //--> 0     length      item        entries     forEach
     }                                              //                  keys     values
                                                    // (DAKLE NECU KORISTITI for in PETLJU SA KOLEKCIJAMA)
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                      ****    SIBLINGS    AND THE     PARENT    ****
// 
// Siblings su node-OVI koji su deca istog roditelja. Na primer, <head> i <body> su SIBLINGS-I (RODITELJ
// IM JE html):
// 
//                   ZA   <body>   SE KAZE DA JE    'next'    ILI    'right'    SIBLING  <head> -A
//                   ZA   <head>   SE KAZE DA JE    'previous'  ILI  'left'     SIBLING  <body> -JA
// 
// NAIME, PARENT JESTE DOSTUPAN, KAO          parentNode

// NEXT node (NEXT SIBLING) U ISTOM PARENTU JESTE:               
//                                                                  nextSibling
// PREVIOUS node (PREVIOUS SIBLING) U ISTOM PARENTU, JESTE:
//                                                                  previousSibling



console.log(      document.body.parentNode === document.documentElement      );         //-->   true

console.log(      document.body.previousSibling      );                                 //-->   #text

console.log(      document.head.nextSibling     );                                      //-->   #text

console.log(      document.body.nextSibling === document.head.previousSibling      );   //-->   true


console.log(      divElementJunior1.parentNode === divElementPaps     );                //-->   true

console.log(      divElementJunior1 === divElementJunior2.previousSibling    );         //-->   true

console.log(      divElementJunior2 === divElementJunior1.nextSibling      );           //-->   true

// PRIMECUJEM GORE DA JE       
//                                  previousSibling       body ELEMENT-A, UPRAVO      text node
// I PRIMECUJEM DA JE          
//                                  nextSibling           head ELEMENT-A, UPRAVO      text node

// I TAJ text node, JESTI ISTI text node KOJI SE NALAZI IZMEDJU     <head>-A    I   <body>-JA

// TAJ text node, JESTE ONAJ NODE KOJI REPREZENTUJE WHITE SPACE, KADA SAM PRISTISNUO ENTER, DA BIH
// MI body TAG POCINJAO U NOVOM REDU HTML DOKUMENTA

// U SLEDECEM PODNASLOVU CU SE UPRAVO POZABAVITI, KAKO DA ZAOBIDJEM OVU SITUACIJU, KOJA MOZE BITI NEZELJENA
// AKO SAM ZELO DA PREDHODNIM NACINOM PRISTUPIM element node-U, A NE text node-U
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//              ELEMENT-ONLY NAVIGATION

// NAVIGACIONI PROPERTIJI, KOJI SU NAVEDENI U PREDHODNOM DELU OVOG CLANKA, ODNOSE SE NA SVE node ELEMENTE
// NA PRIMER , U      childNodes        KOLEKCIJI, MOZEMO VIDETI I        text node-OVE    I    elemnt node-
// OVE, PA CAK I      comment none-OVE     , AKO POSTOJE

// ALI, U NAJVISE SLUCAJEVA, MENI       NE TREBAJU  text node-OVI  I  comment  node-OVI; DAKLE, U NAJVECEM
// BROJU SLUCAJEVA JA ZELIM DA MANIPULISEM SA     element node-OVIMA    ,KOJI REPREZENTUJU TAGOVE I FORMIRAJU
// STRUKTURU STRANICE
// **********************************************************************************************************
// (OPET SAM PEUZEO SLIKU IZ RUSKOG CLANKA I POSTAVIO SAM JE, U HTML STRANICI, U KOJU JE UCITAN OVAJ SCRIPT)
// **********************************************************************************************************
// NAVIGACIONI PROPERTIJI, ILI KAKO IH U CLANKU ZOVU 'NAVIGACIONI LINKOVI', SLICNI SU ONIMA, KOJI SU NAVEDENI
// U PREDHODNIM DELOVIMA OVOG CLANKA; SAM OSTO JE U OVOM SLUCAJU,
// U IMENU PROPERTIJA PRISUTNA I ODREDNICA:
                                    //              'Element' 

// TO SU SLEDECI NAVIGACIONI PROPERTIJI:

//              children                                                 -SAMO ONI CHILD-OVI, KOJI JESU
//                                                                        element node-OVI

//              firstElementChild         lastElementChild               -PRVI I POSLEDNJI CHILD element node

//              previousElementSibling    nextElementSibling             -SUSEDNI  element node-OVI

//              parentElement                                            -PARENT ELEMENT

// *********************************************************************************************************
// ZASTO        parentElement      ? ZAR POSTOJI MOGUCNOST DA PARENT NE BUDE ELEMENT? (OVO PITANJE SE
//                                                                                  POSTAVLJA, PREDPOSTAVLJAM
//                                                                                  ZATO STO SE U PREDHODNOM 
//                                                                                  DELU, OVOM ELEMENTU
//                                                                                  PRISTUPALO PUTEM
//                                                                                   parentNode 
//                                                                                                PROPERTIJA)

// PROPERTI parentElement return-UJE parent "element", dok parentNode vraća "bilo koji node" parent. Ovi 
// propertiji su obično isti: oba gett-uju roditelja
// AL ISA IZUZETKOM:
                            document.documentElement

// NAIME,       documentElement (<html>) JESTE ROOT node

console.log(       document.documentElement.parentNode       );         //-->   #document

console.log(       document.documentElement.parentElement    );         //-->   null

// FORMALNO, IMA    document     , ZA PARENT-A
// ALI   document    NIJE element node; TAKO DA JE      parentNode      return-UJE OBJEKAT, DOK
// parentElement    return-UJE     null
// PONEKAD OVO MATTERS, KADA HODAMO PREKO CHAIN-A PARENT-OVA I POZIVAMO NEKU METODU, NA SVAKOM OD PARENT-OVA
// ALI U TOM SLUCAJU        document        NE BI IMAO PARENT-A, TAKO DA GA MORAM EXCLUDE-OVATI
// **********************************************************************************************************
// PRIMER SA    children    PROPERTIJEM:
// 
        for(let childElement of document.head.children){
            console.log(childElement);                      // SAD SAU SE STAMPALI SAMO element node-OVI
        }                                                   // DA SAM KORISTIO childNodes BILI BI STAMPANI
                                                            // PRAZNI text node-OVI, ALI I comment
                                                            // node-ovi, KOJIH IMA OGROMAN BROJ, JER SAM
                                                            // OSTAVIO, OGROMAN BROJ KOMENTARA, U RELATED
                                                            // HTML ELEMENTU
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//          JOS NAVIGACIONIH LINKOVA: TABELE

// Do sada smo opisali osnovne navigacijske propertije
// Pojedini tipovi DOM elemenata mogu pružiti dodatne propertije, specifična za njihov tip, radi praktičnosti.
// Tabele su sjajan primer i važan poseban slučaj toga.
// Element <table> podržava (pored gore navedenog) ova svojstva:

//              table.rows                               - kolekcija <tr> elemenata tabele

//              table.caption/tHead/tFoot                - reference na elemente
//                                                               <caption>, <thead>, <tfoot>.

//              table.tBodies                            - kolekcija <tbody> elemenata (MOZE IH BITI VISE
//                                                                                      TAKO KAZE STANDARD)

//   <thead>, <tfoot>, <tbodi>      IMAJU   roes    PROPERTI:

//              tbody.rows                               - kolekcija <tr> unutra

//   <tr>:

//              tr.cells               - kolekcija <td> i <th> ćelija unutar datog <tr>.

//              tr.sectionRowIndex     - pozicija (indeks) datog <tr> u enclosing:
//                                                                               <thead> / <tbody> / <tfoot>

//              tr.rowIndex            - broj <tr> u tabeli kao celini (uključujući sve table row-OVE)

//   <td> i <th>:

//              td.cellIndex           - broj ćelije u okruženju <tr>

const tabela_neka = `
    <table id="tabela1">
        <tr>
            <td>one</td><td>two</td>
        </tr>
        <tr>
            <td>three</td><td>four</td>
        </tr>
    </table>
`;

console.log(    tabela1.rows[0].cells[1].innerHTML    );         //--> 2

// OVDE CU OSTAVITI I LINK SPECIFIKACIJA ZA  TABULAR DATA   https://html.spec.whatwg.org/multipage/tables.html

// POSTOJE, TAKODJE I DODATNI NAVIGACIONI PROPERTIJI ZA HTML FORMULARE, KOJIMA SAM SE POZABAVIO RANIJE, ALI
// MORAM DA IH PONOVIM, NEKOM PRILIKOM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//      REZIME:
// 
// ZAMISLJAJUCI DA SAM NA DOM node-U, mogu da odem do njegovih neposrednih susjeda koristeći
// propertije navigacije
// Postoje dve glavne grupe:

//              ZA SVE node-OVE:        parentNode      childNodes      firstChild      lastChild
//                                              previousSibling                 nextSibling

//              ZA SAMO element node-OVE:           parentElement       children
//                                              firstElementChild       lastElementChild
//                                             previousElementSibling   nextElementSibling

// Neke vrste DOM elemenata, npr. tabele, pružaju dodatne propertije i kolekcije za pristup njihovoj
// sadrzine (MISLI SE NA TABELE I FORMULARE I NJIHOVE, SPECIJALNE NAVIGACIONE PROPERTIJE)
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PRIMERI: OSTAVICU, NJIHOV LINK DA BI IH ODRADIO KASNIJE
// https://javascript.info/dom-navigation

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
// 
//                              SEARCHING:      getElement/s*             querySelector*                            
// 
// DOM navigation propertiji su odlični kada su elementi blizu jedni drugih. Šta ako nisu? Kako dobiti
// arbitrary element na stranice?
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                           document.getElementById        ILI         id

// DOBRO SADA VEC ZNAM DA ELEMENTU MOGU PRISTUPITI, SAMO PREKO VREDNOSTI id-JA, JER JE TA VREDNOST, POSTALA
// IME PROPERTIJA       window      OBJEKTA

// ALI MORAM VODITI RACUNA DA NE DEKLARISEM GLOBALNU VARIJABLU, CIJE BI IME BILO ISTO KAO VREDNOST, 
// POMENUTOG id-JA

// TADA DOLAZI DO OVERRIDING-A (JER KAO STO SAM SE UVERIO, VARIJABLE SU USTVARI PROPERTIJI   window  OBJEKTA)
// *********************************************************************************************************
// ID MORA BITI UNIQUE
// DAKLE, U document-u, MORA POSTOJATI, SAMO JEDAN ELEMENT, SA JEDNIM id-JEM, JER U SUPROTNOM IMAO BI
// NEPREDVIDIVO PONASANJE, CORRESPONDING METODA
// JER BI BROWSER MOGAO RANDOMLY return-OVATI, BILO KOJI ELEMENT SA ISTIM ID-JEM
// *********************************************************************************************************
// *********************************************************************************************************
// MOGUCE JE ZABORAVITI SE I PRIMENITI getElementById, NA BILO KOJI node; TO NAIME NE TREBA RADITI JER:
// POMENUTA METODA SE MOZE PRIMENITI SAMO NA           document             OBJEKAT
// DAKLE, METODA TRAZI DATI id, PO CELOM DOKUMENTU
// I OPET PONAVLJAM, JEDINO JE OVAKO, KOREKTNO, POZIVANJE, POMENUTE METODE:
                                                                        document.getElementById('neki_id')
// *********************************************************************************************************
// U RANIJIM CLANCIMA (ALI I U BUDUCIM CLANCIMA CU TO RADITI U CILJU SAZETOSTI), PREKO NJIHOVOG ID-JA, JA SAM 
// PRISTUPAO ELEMENTIMA, TAKO STO SAM KORISTIO   ID-JEVE, KAO PROPERTIJE window OBJEKTA
// MEDJUTIM, TO U PRAKSI (IN REAL LIFE) NE TREBA RADITI, VEC TREBA KORISTITI METODU:
//                                                                  document.getElementById 
// *********************************************************************************************************
// ISTO TAKO MOGUCE JE NAPRAVITI POCETNICKU GRESKU (KOJU SAM PRAVIO), KOJA SE OGLEDA U TOME
// DA, POKUSAVAJUCI DA PRIMENIM METODU NPISEM      'Elements'   UMESTO      'Element'
// POMENUTO JE NARAVNO POGRESNO
// A I STVAR JE SASVIM LOGICNA DA TREBA KORISTITI JEDNINU, JER JEDAN ELEMENT IMA JEDAN KARAKTERISTICAN ID
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                                         elem.getElementsBy*                     

// POSTOJI NEKOLIKO OVAKVIH METODA:
// 
//      elem.getElementsByTagName       elem.getElementsByClassName         elem.getElementsByName
// 
// PRVIM DVEMA SU IMENA PRILICNO SUGESTIVNA, A I ZNAM OD RANIJE KAKO SE KORISTE I STA RETURN-UJU
// ALI PREDPOSTAVLJAM I PREKO KOJE KARAKTERISTIKE ELEMENTA, SE PRISTUPA ELEMENTU, PUTEM POMENUTE TRECE
// METODE
// ZA       elem.getElementsByTagName       SAMO CU RECI DA POSTOJI MOGUCNOST, DA SE U KOLEKCIJI, KOJA JE
// POVRATNA VREDNOST, POMENUTE METODE, SVI ELEMENI CELOG   document-A; TADA, KAO ARGUMENT, PRIMENI POMENUTE
// METODE, DODAJEM:
                            '*'     // ZVEZDICU
// UPRAVO OVAKO
const kolekcija_svih_elemenata = document.getElementsByTagName('*');

console.log(    kolekcija_svih_elemenata    );       //-->    HTMLCollection INSTANCA (U SLUCAJU OVE STRANICE
//                                                            VIDIM DA OVAJ ITERABLE OBJEKAT OBUHVATA PREKO 
//                                                            420 ITEM-A (ODNOSNO HTML ELEMENATA))
// BEZ DODATNIH PRIMERA, SAMO CU RECI DA SE, POMENUTOM METODOM
// KADA SE NJENOJ PRIMENI DODA STRING IMENA TAGA, ONDA JE POVRATNA VREDNOST TE METODE, KOJEKCIJA, TAGOVA
// ******************************************************************************************************
// A SVE TRI POMENUTE METODE SE MOGU PRIMENITI NA BILO KOJEM ELEMENTU (DAKLE, TO NE MORA BITI SAMO document)
// U SLUCAJU POZIVANJA    elem.getElementsByTagName
//          U KOLKICIJI CE SE NACI, SVI ELEMENTI KOJI SU DESCENDANTS-I, POMENUTOG ELEMENTA, A KOJI SU U 
//          HTML-U REPREZENTOVANI, SA TAGOM, CIJE SAM STRING IMENA, ZADAO DA BUDE ARGUMENT, POMENUTE METODE
// *********************************************************************************************************
// VEC SAM REKAO ALI CU PONOVITI DA SU POMENUTE METODE CALLABLE, U KONTEKSTU BILO KOG DOM ELEMENTA
// A NE SAMO    document-A
// *********************************************************************************************************
// I OPET GOVORIM DA OBRATIM PAZNJU DA OVDE PRISTUPAM KOLEKCIJI, STO ZNACI DA KORISTIM MNOZINU, KADA PISEM
// IME OVIH METODA, ODNOSNO U OVO MSLUCAJU PISEM ODREDNICU  'Elements'  A NE   'Element'
// *********************************************************************************************************
// OSTALE DVE METODE (U CLANKU PISE), DA SE REDJE KORISTE

//    METODA       elem.getElementsByClassName        return-UJE ELEMENTE (kolekciju), 
//                                                              KOJI ODGOVARAJU STRINGU IMENA KLASE
//                                                              KOJI JE DODAT KAO ARGUMENT

// ****SLEDECA METODA SE MOZE PRIMENITI SAMO NA         document        OBJEKTU**** 

//    METODA       document.getElementsByName             return-uje KOLEKCIJU KOJA SE SASTOJI OD ELEMENATA, KOJI
//                                                              SVI IMAJU     name   ATRIBUT, SA VREDNUSCU
//                                                              KOJU SAM NAVEO KAO ARGUMENT, PRI POZIVANJU
//                                                              OVE METODE

// U CLANKU PISE DA SE OVA POSLEDNJA METODA, RETKO KORISTI, I DA POSTOJI SAMO IZ ISTORIJSKIH RAZLOGA
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SLEDECE METODE, KOJIMA CU SE POZABAVITI JESU METODE KOJE SAM NAJVISE KORISTIO
// PRVA OD NJIH JE:
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                                 elem.querySelectorAll
// 
// KAO STO SU REKLI U CLANKU 'SADA IDE TESKA ARTILJERIJA' (MISLECI NA METODE, KOJE IMAJU ODREDNICU 'query'
// U SEBI)

// POMENUTA METODA MATCHUJE ELEMENTE, SA CSS SELECTOR-OM (CIJI STRING DODAJEM, KAO ARGUMENT POMENUTOJ METODI)
// TO SU ELEMENTI, INSIDE ELEMENT (DESCENDANTI ELEMENTA), NAD KOJIM SE METODA PRIMENILA
//**********************************************************************************************************
// POMENUTOJ METODI SE MOZE ZADATI I STRING PSEUDO KLASE
// DODACU OVDE TEKST IZ CLANKA, U ORIGINALU (PREVEDEN)
// Pseudo-klase u CSS selektoru kao što su:     :hover     i     :active     su takođe podržani. Na primer, 
//          document.querySelectorAll (':hover') return-uje kolekciju elemenata preko kojih, se kursor
//                                                                                 trenutno nalazi
//                                                                                 (u nesting order-u: 
//                                                                                 od najspolasnijeg (<html>) 
//                                                                                 do najunutrasnjeg)
                                                                            // ODNOSNO OD OUTERMOST DO 
                                                                            // INNERMOST
//**********************************************************************************************************
const lastDatas = document.querySelectorAll('td:last-child');

console.log(      lastDatas instanceof NodeList      );    //--> true
                                                           // POVRATNA VREDNOST JESTE OBJEKAT, ODNOSNO
                                                           // NodeList INSTANCA, CIJI ELEMENTI JESU node-OVI
                                                           // KOJI SE MOGU SELKTOVATI, POMENUTIM CSS
                                                           // SELEKTOROM
for(let node of lastDatas){
    console.log(node);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                                 elem.querySelector
// 
// PREDHODNA METODA JE RETURN-OVALA CELU LISTU node-OVA, A OVA METODA RETURN-UJE PRVI ELEMENT KOJI ODGOVARA
// ZADATOM CSS SELEKTORU
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                                 elem.matches
//                                  
// PREDHODNE METODE SU TRAZILE PO DOM-U
// OVA CIJI LINK SPECIFIKACIJE CU OVDE OSTAVITI https://dom.spec.whatwg.org/#dom-element-matches
// JESTE METODA KOJA NE SEARCH-UJE, ZA ICIM, VEC MERELY(SAMO) PROVERI, DA LI SE ELEMENT MATCH-UJE, SA DATIM
// CSS SELEKTOROM (STRING SELEKTORA SE DODAJE, KAO ARGUMENT, POMENUTE METODE)
// AKO SELEKTOR ODGOVARA ELEMENT, METODA CE return-OVATI    true        , A AKO CSS SELECTOR NE ODGOVARA
// ELEMENTU, METODA CE return-OVATI     false
// METODA SE POKAZUJE, KAO KORISNOM, PRILIKOM ITERATING-A, OVER THE ELEMENTS (KAO STO TO RADIM S NIZOM)
// I FILTRIRANJA ONOG ELEMENTA, KOJI ME INTERESUJE
// PRIKAZACU TO PUTEM PRIMERA
// KREIRACU DVA ANCHOR ELEMENTA:
const dva_anchora = `
    <a href="http://example.com/file.zip">...</a>
    <a href="http://ya.ru">...</a>
`;

// SADA CU PROVERITI DA LI NEKI OD element node-OVA, MOJE STRANICE, JESTE ANCHOR ELEMENT, KOJI IMA href 
// ATRIBUT, A DA SE VREDNOST TOG ATRIBUTA ZAVRSAVA SA KARAKTERIMA     'zip'

for(let nodeEl of document.body.children){
    
    if(nodeEl.matches('a[href$=zip]')){

        console.log('adresa: ', nodeEl.href);

    }

}
// I PRISTUPIO SAM PRAVOM ELEMENTU, ZATO STO JE OBEZBEDJEN MATCHING, UZ POMOC POVRATNE VREDNOSTI, POMENUTE
// METODE
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                             elem.closest
// 
// DAKLE, OVA METODA return-UJE NAJBLIZE ANCESTOR, KOJI ODGOVARA CSS SELEKTORU, DODATOM, KAO ARGUMENT,
// POMENUTE METODE
// AKO NE PRONADJE NI JEDAN ELEMENT, KOJI ODGOVARA, ONDA return-UJE null (TAKVA JE SITUACIJA I SA OSTALIM
// METODAMA)
// NECU DODATNO KOMENTARISATI OVU METODU, I NECU RADITI DODATNE PRIMERE, U CILJU USTEDE VREMENA, JER SAM 
// TO VEC, MNOGO PUTA RADIO
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                      ZIVA KOLEKCIJA (LIVE COLLECTION)
// 
// SVE METODE       getElementsBy*      return-UJU, 'LIVE COLLECTION'
// TAKVA KOLEKCIJA, UVEK REFLEKTUJE TRENUTNO STANJE     document-A     I 'AUTO-UPDATE-UJE' SE, PRI SVAKOJ
// PROMENI
// POMENUTA TVRDNJA SE, NAJLAKSE MOZE PROVERITI, UZ POMOC PRIMERA
// SLEDECI PRIMER SE SASTOJI OD DVA script-A

//      1)  U PRVOM SCRIPT-U CU KREIRATI REFERENCU, KOJA CE BITI REFERENCA NA KOLEKCIJU <div> ELEMENATA
//          MOG document-A
//      2)  'IZMEDJU TIH SCRIPT-OVA' DODACU, JEDAN <div>    ELEMENT, I JASNO JE DA TAJ DIV ELEMENT, NIJE
//          BIO UCITAN, KADA SE KREIRALA REFERENCA NA KOLEKCIJU <div> ELEMENATA
//      3)  TRECI SCRIPT CE KORISTITI, POMENUTU, KREIRANU REFERENCU KOLEKCIJE

const primer_divovi_i_scriptovi_kolekcija = `
    <div>First div</div>
    <script>
    
        const divsovi = document.getElementsByTagName('div');
        
        console.log(divsovi);         //--> U KOLEKCIJI SE NE NALAZI div NESTOVAN, NAKON OVOG script-A

    </script>
    <div>Second div</div>

    <script>
        console.log(divsovi);         //--> KOLEKCIJA SADA IMA JEDAN DIV VISE
    </script>
`;
//*********************************************************************************************************
// ZA RAZLIKU OD POMENUTIH KOLEKCIJA, ONA KOLEKCIJA, KOJU return-UJE        elem.querySelectorAll
// JESTO KOLEKCIJA, KOJA 'NIJE ZIVA' KOLEKCIJA; ODNOSNO TO JE STATICNA KOLEKCIJA, ILI FIXED ARRAY,
// SASTAVLJEN OD ELEMENATA

const primer_divovi_i_scriptovi_node_lista = `
    <div>First div</div>
    <script>
    
        const nodeLista = document.querySelectorAll('div');
        
        console.log(nodeLista);       //-->   OVA    NodeList INSTANCA IMA 10 CLANOVA

    </script>
    <div>Second div</div>

    <script>
        console.log(nodeLista);       //-->   I DALJE, ISTA  NodeList INSTANCA  IMA 10 CLANOVA
    </script>
`;

// Sada možemo lako videti razliku. Statička kolekcija se nije povećala nakon pojavljivanja novog div-A
// u dokumentu.
// Ovde smo koristili odvojene skripte kako bismo ilustrovali kako dodavanje elementa utiče na collection
// ALI SVAKA DOM MANIPULACIJA UTICE NA TE KOLEKCIJE ()
//*********************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// REZIME:
// Postoji 6 glavnih metoda za pretraživanje node-OVA u DOM-u
// 
//      METODA                          TRAZENJE PREMA           MOZE BITI POZVANA NA           return-UJE       
//                                                               BILO KOJEM ELEMENTU        LIVE COLLECTION

//  document.getElementById                 id-JU                   NE (SAMO document)             NE
// 
//  document.getElementsByName              name-U                  NE (SAMO document)             DA
// 
//  elem.getElementsByTagName               tag-U  ILI  '*'         DA                             DA
// 
//  elem.getElementsByClassName             class-I                 DA                             DA
// 
//  elem.querySelector                      CSS selector-U          DA                             NE
// 
//  elem.querySelectorAll                   CSS selector-U          DA                             NE


// Imajte na umu da se metode    getElementById    i    getElementsByName     mogu pozvati samo u kontekst
// document-A:    document.getElementById(...) .   Ali ne na elementu:   elem.getElementById(...)
// bi izazvao ERROR
// Druge metode se mogu pozvati i na elemente. Na primer:
// elem.querySelectorAll(...) će pretraživati unutar elementa (DOM subtree-JU)

// PORED TOGA:

// --  POSTOJI I   elem.matches(css)    U CILJU PROVERE DA LI ELEMNTU, ODGOVARA DATI CSS SELECTOR
// 
// --  POSTOJI I   elem.closest(css)    KOJI TRAZI NAJBLIZEG ANCESTOR-A, KOJEM ODGOVARA DATI CSS SELECTOR
//                                      AKO SAMOM    elem      ODGOVARA, DATI SELECTOR, ONDA JE ELEMENT, KOJI
//                                      CE SE return-OVATI, BITI elem   
// 
//**********************************************************************************************************
//     ZA KRAJ JE U CLANKU POMENUTA, I JOS JEDNA METODA, KOJOM SE PROVERAVA     DESCENDANT-ANCESTOR    ODNOS
//     TO JE METODA:
//                              contains
//     A OVAKO SE PRIMENJUJE:
//                              elemA.contains(elemB)
// 
//     BICE RETURNED      true       AKO      elemA     SADRZI      elemB   , ODNOSNO AKO JE        elemB
//                                                                                DESCENDANT    elemA-A
//          ALI TREBA OBRATITI PAZNJU DA CE,  true      BITI RETURNED I KADA
//          JE SLEDECI IZRAZ true:
//                                      elemA === elemB
//**********************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//      PRIMERI:       (U OVOM PRIMERU SE RADI O ZAMISLJENOJ TABELI, KOJA IMA id="age-table")
// 
//      1) PRONALAZENJE table-A SA id="age-table"
            document.getElementById('age-table');
//      2) PRONALAZENJE SVIH label ELEMENATA, UNUTAR table-A
            document.getElementsByTagName('table')[0].getElementsByTagName('label');
//      3) PRONALAZENJE PRVOG td U TABELI 
            document.getElementsByTagName('table')[0].getElementsByTagName('td')[0];
//      4) PRONALAZENJE form-A ,KOJI IMA name ATRIBUT SA VREDNOSCU 'search'
            let search_form;
            Array.from(document.getElementsByName('search')).forEach(function(elem){
                if(elem.nodeName === 'FORM'){
                    search_form = elem;
                }
            });
//      5) PRONALAZENJE PRVOG input-A FORMULARA
            document.querySelector('form input:first-of-type');
//      6) PRONALAZENJE POSLEDNJEG input-A FORMULARA
            document.querySelector('form').querySelectorAll('input')[
                document.querySelector('form').querySelectorAll('input').length - 1
            ];


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
// 
//              Node  PROPERTIJI:
//                                         type         tag         contents
// 
// SADA CU MALO DUBLJE (MORE IN-DEPTH) GLEDATI DOM nodes
// U OVOM CLANKU POGLEDACU CAK VISE O TOME, STA SU USTVARI DOM node-OVI, I KOJI SU NJIHOVI, NAJCESCE
// KORISCENI PROPERTIJI
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                         class -E     DOM node-OVA     (JAVASCRIPT class -E) 
// 
// DOM node-OVI imaju različita propertije u zavisnosti od njihove klase. Na primer, element node-OVI, 
// kojima odgovara tag <a> imaju link-related osobine, a onima kojima odgovara <input> imaju propertije
// corresponding do input-A ETC.
// text node-OVI, nisu isti kao element node-OVI. Međutim, postoje i zajednička svojstva
// i metode među njima, jer sve klase DOM node-OVA, predstavljaju jedinstvenu hijerarhiju
// Svaki DOM node pripada odgovarajućoj built-in klasi
// Koren hijerarhije jeste:
                                EventTarget
                                // (https://dom.spec.whatwg.org/#interface-eventtarget)
// iz koje nasledjuje:
                                Node
                                // (https://dom.spec.whatwg.org/#interface-node)
// a drugi DOM node-OVI nasleđuju od njega
//**********************************************************************************************************
// SLIKU KOJU SAM UCITAO U HTML PAGE (pageLifecycleEventsSec.html),će pratiti sva objašnjenja
// koja će slediti
//**********************************************************************************************************
// KLASE SU:
    //********************************//
                EventTarget
    // POMENUTA KLASA, JESTE ROOT 'ABSTRACT' KLASA
    // OBJEKTI VOE KLASE SE NIKAD NE KREIRAJU
    // SLUZI KAO BAZA, ODNOSNO OSNOVA, TAKO DA SVI DOM node-OVI PODRZAVAJU, TAKOZVANE 'events'
    //********************************//
                Node
    // JE ISTO TAKO 'ABSTRACT' KLASA, KOJA SLUZI KAO OSNOVA ZA DOM node-OVE
    // OBEZBEDJUJE, OSNOVNI, ODNOSNO CORE TREE FUNCTIONALITY:
    //      parentNode, nextSibling, childNodes     etc.(SVI SU ONI GETTER-I)
    // OBJEKTI Node KLASE, NIKAD NISU KREIRANI; ALI POSTOJE CONCRETE(KONKRETNE)   node  KLASE, KOJE
    // NASLEDJUJU OD NJIH, I TO SU:
                // ZA text node-OVE
                            Text
                // ZA element node-OVE
                            Element
                // ZA comment node-OVE
                            Comment
    //*********************************//
                Element
    // JE OSNOVNA KLASA ZA DOM ELEMENT-E
    // OBEZBEDJUJE ELEMENT-LEVEL NAVIGACIJU, KAO STO JE               nextElementSibling     children        
    // I METODE         getElementsByTagName        querySelector
    // U BROWSER-U NE MORA BITI SAMO HTML DOKUMENT, VEC TU MOGU BITI I XML I SVG DOKUMENTI
    // Element KLASA SLUZI KAO OSNOVA(BASE), ZA VISE SPECIFICNEKLASE, KAO STO SU:
                                                                        SVGElement

                                                                //      XMLElement  (MISLIM DA
                                                                            //      JE OVA KALSA NEPOSTOJECA
                                                                            //      JER DOLAZI DO REFERENCE
                                                                            //      ERROR-A, KADA JE
                                                                            //      KORISTIM)

                                                                        HTMLElement
    //*********************************//
               HTMLElement
    // CIJE LINK SPECIFIKACIJA CU OSTAVITI OVDE    
    //                                         https://html.spec.whatwg.org/multipage/dom.html#htmlelement
    // JE, KONACNO OSNOVNA KLASA HTML ELEMENATA
    // NASLEDJUJU JE RAZNI HTML ELEMENTI:
                                            // KLASA ZA <input> ELEMENTE
                                                    HTMLInputElement
                                            // KLASA ZA <body> ELEMENTE
                                                    HTMLBodyElement
                                            // KLASA ZA <a> ELEMENTE
                                                    HTMLAnchorElement
                                            // ...and so on, SVAKI TAG IMA SVOJU KLASU, KOJA MOZE
                                            // OBEZBEDJIVATI, SPECIFICNE PROPERTIJE I METODE
    //*********************************//
// 
// Dakle, puni skup propertija i metoda određenog node-A dolazi kao rezultat nasleđivanja.
// Na primer, uzecu u obzir DOM objekat <input> elementa. ON PRIPADA
                                                            //          HTMLInputElement        klasi
// i on dobija propertije i metode kao suppozicija 
// sledecih klasa:

                            //          HTMLInputElement

                            // POMENUTA KLASA OBEZBEDJUJE input-SPECIFIC PROPERTIJE, I NASLEDJUJE OD...

                            //          HTMLElement

                            // KLASE, KOJA OBEZBEDJUJE COMMON, ODNOSNO ZAJEDNICKE METODE I PROPERTIJE
                            // HTML ELEMENATA, I NASLEDJUJE OD

                            //          Element

                            // KLASE, KOJA OBEZBEDJUJE GENERIC ELEMENT METODE I NASLEDJUJE OD

                            //          Node

                            // KLASE, KOJA OBEZBEDJUJE COMMON DOM node PROPERTIJE, I NASLEDJUJE OD

                            //          EventTarget

                            // KOJA PRUZA PODRSKU ZA EVENT-OVE; I KONACNO OVA KLASA NASLEDJUJE OD

                            //          Object

                            // KLASE, TAKO DA SU   'PURE OBJECT'  METODE, POPUT     hasOwnProperty
                            // TAKODJE DOSTUPNE

// KAKO BIH VIDEO KLASU, ODNOSNO KAKO BIH DOSAO DO IMENA KLASE DOM node-A, TO MOGU POSTICI, AKO SE PODSETIM
// DA OBJEKAT , OBICNO IMA      constructor     PROPERTI
// KOJI REFERENCIRA NAZAD DO    class  constructor-A
// A KAKO BI SAMO PRISTUPIO IMENU, KORISTIM name PROPERTI

console.log(      document.body.constructor         );          //-->      function HTMLBodyElement {...}
console.log(      document.body.constructor.name    );          //-->      "HTMLBodyElement"

// ILI SAM MOGAO PRIMENITI      toString        METODU, NAD ELEMENTOM

console.log(      document.body.toString()      );              //-->      [object HTMLBodyElement]

// A TAKODJE SAM MOGAO KORISTITI        instanceof          KAKO BI PROVERIO INHERITANCE

console.log(    document.body instanceof HTMLBodyElement    );          //-->       true
console.log(    document.body instanceof HTMLElement        );          //-->       true
console.log(    document.body instanceof Element            );          //-->       true
console.log(    document.body instanceof Node               );          //-->       true
console.log(    document.body instanceof EventTarget        );          //-->       true

// KAO STO MOZEMO VIDETI, DOM nodes, JESU REGULARNI JAVASCRIPT OBJEKTI; I ONI KORISTE

//               PROTOTYPE-BASED CLASSES FOR INHERITANCE

// DAKLE KORISTE        KLASE BAZIRANE NA PROTOTIPU ZA NASLEDJIVANJE

//**********************************************************************************************************
// TO JE TAKODJE LAKO VIDETI, KADA OUTPUT-UJEM ELEMENT, UZ KORISCENJE       
                                                                            console.dir
                                                                            // OVAKO
                                                                            //              console.dir(elem)
                                                                            // U BROWSER-U
// TAMO U KONZOLI MOGU VIDETI
                                    HTMLElement.prototype
// I                                
                                    Element.prototype
// I TAKO DALJE...

//                 ****      console.log         VERSUS         console.dir      ******

// MNOGI BROWSERI PODRZAVAJU DVE KOMANDE U SVOJIM DEVELOPER TOOLS-IMA
// TO SU:
                            console.log

                            console.dir

// TE KOMANDE OUTPUT-UJU, ARGUMENTE U KONZOLI
// ZA JAVASCRIPT OBJEKTE, OVE KOMANDE, OBICNO OUTPUT-UJU, ISTE VREDNOSTI
// ALI U SLUCAJU    DOM         ELEMENATA, POZIVANJE OVIH METODE DAJE RAZLICIT REZULTAT

console.log(    document.body    );             //-->           PRIKAZUJE ELEMENT-OVO DOM DRVO 
//                                                              (MISLIM DA JE BOLJE RECI: DOM GRANU)

console.dir(    document.body    );             //-->           PRIKAZUJE ELEMENT, KAO DOM OBJEKAT; POGODAN
//                                                              JER MOGU ISTRAZITI, NJEGOVE PROPERTIJE

//**********************************************************************************************************

//          IDL IN THE SPEC (INTERFACE DESCRIPTION LANGUAGE U SPECIFIKACIJAMA)     
//            https://en.wikipedia.org/wiki/Interface_description_language
// 
// U specifikaciji se KLASE SU OPISANE BEZ KORISCENJA JAVASCRIPT-A, već posebnog jezika za opis interfejsa 
//                  (IDL  -->      INTERFACE DESCRIPTION LANGUAGE)
// koji je obično lako razumjeti
// U IDL-u svi propertiji su prepended sa svojim tipovima. Na primer, DOMString, boolean i tako dalje.
// Evo izgovora iz IDL-A, sa komentarima:
const idl_htmlinput = `

    // DEFINISANJE HTMLInputElement-A
    // COLON (DVE TACKE ':' ZNACI DA HTMLInputElement NASLEDJUJE OD HTMLElement-A)
    
    interface HTMLInputElement: HTMLElement {
        // OVDE IDU PROPERTIJI I METODE <input> ELEMENATA

        // "DOMString" ZNACI DA SU VREDNOSTI OVIH PROPERTIJA STRINGOVI

        attribute DOMString accept;
        attribute DOMString alt;
        attribute DOMString autocomplete;
        attribute DOMString value;

        // boolean value PROPERTI (true/false)
        
        attribute boolean autofocus;

        ...
        // SADA METODA: 'void', ZNACI DA METODA NE return-UJE I JEDNU VREDNOST
        void select();
        ...
    }

`;
// DRUGE KLASE SU DONEKLE(SOMEWHAT) SLICNE
//**********************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                              'nodeType'      PROPERTI

// Properti nodeType pruža staromodan način da dobije "tip" DOM node-A
// Ima numeričku vrednost:

// ZA element node JESTE 1
console.log(    document.createElement('div').nodeType === 1    );              //-->   true
// ZA text node JESTE 3
console.log(    document.createTextNode('Neki tekst').nodeType === 3    );      //-->   true
// ZA document JESTE 9
console.log(    document.nodeType === 9    );                                   //-->   true

// POSTOJE I NEKOLIKO DRUGIH VREDNOSTI; STO SE MOZE VIDETI U SPECIFIKACIJI:
// (NE MOGU DA DODJEM DO LINKA TE SPECIFIKACIJE, MOZDA ZATO STO JE OVAJ PROPERTI OBSOLETE(KAKO SAM PROCITAO
//                                                                                          NA MDN-U)) 

// U savremenim script-OVIMA možemo da koristimo:
//                                                  instanceof 
// i druge class-based testove da vidimo tip
// node-A, ali ponekad nodeType može biti jednostavniji izbor

// NAIME,   nodeType    JE SAMO READ ONLY, STO ZNACI DA GA NE MOZEMO MENJATI
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                        TAG:        nodeName        I           tagName

// Za dati DOM node, možemo da pročitamo ime, njegovog taga putem:
                //                                                 nodeName     ili    tagName     propertija:
console.log(    document.body.nodeName    );     //-->   'BODY'
console.log(    document.body.tagName     );     //-->   'BODY'

// Postoji li razlika između        tagName     i     nodeName      ?
// Naravno, razlika se ogleda u njihovim imenima, ali je zaista manje suptilna.
    
    //   tagName     PROPERTI, POSTOJI SAMO ZA Element node-OVE

    //   nodeName    JESTE DEFINISANO ZA BILO KOJI Node :
                            //                             ZE elements ZNACI ISTO STO I     tagName
                            
                            //                             ZA DRUGE node types (text, comment, etc.)
                            //                                      NJEGOVA VREDNOST JE STRING node type-A

// DRUGIM RECIMA, tagName JE SAMO PODRZANO OD STRANE element node-OVA (ZATO STO POTICE OD Element KLASE)
// DOK nodeName MOZE DA KEZE NESTO I O DRUGIM node TIPOVIMA

// NA PRIMER, UPOREDJIVACU      tagName    I    nodeName    ZA  document , I ZA      comment  node
// (UNECU  comment U HTML, KAO FIRST CHILD body-JA (URADICU TO JAVASCRIPT-OM, JER SAM VEC RANIJE
// PREPEND-OVAO, JEDAN DIV ELEMENT))
// MOGU KREIRATI comment node, KORISCENJEM METODE:
//                                                      document.createComment
const komentar = document.createComment('komentar');
// SADA CU OVAJ comment node, PREPEND-OVATI U body
document.body.prepend(komentar);

// ZA comment STAMPAM    tagName   I   nodeName   PROPERTIJE
console.log(    document.body.firstChild.tagName     );         //-->   undefined       (nije element node)
console.log(    document.body.firstChild.nodeName    );         //-->   #comment
// ZA document STAMPAM    tagName   I   nodeName   PROPERTIJE
console.log(    document.tagName     );                         //-->   undefined       (nije element node)
console.log(    document.nodeName    );                         //-->   #document
// 
// AKO SAMO RUKUJEM SA ELEMENTIMA, ODNOSO element node-OVIMA, ONDA SAM OTREBAM DA KORISTIM      tagName
// *********************************************************************************************************
//          tag name JE UVEK U  UPPER CASE-U, IZUZEV       XHTML-A
// Pregledač ima dva načina obrade dokumenata: HTML  i   XML. Obično se HTML-mode koristi za web stranice.
// XML-mode je omogućen kada pregledač prima XML dokument sa header-OM: 
//                                                                       Content-Type: application/xml+xhtml
// U HTML-mode-U,   tagName/nodeName            je uvek U UPPERCASE-U: 
//                                                      to je, UVEK  'BODY'  bilo za    <body>  ili  <BoDy>
// U XML-mode-U case(VELICINA SLOVA U TEKSTU) se čuva "kao što i jeste".
// Danas se XML režim rijetko koristi
// *********************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                              innerHTML   :    sadrzine (contents)

// SPECIFIKACIJA:   https://w3c.github.io/DOM-Parsing/#widl-Element-innerHTML
// 
// innerHTML properti dozvoljava da se HTML postavi unutar elementa kao string
// Takođe možemo da modifikujemo, pomenuti properti.
// Dakle, to je jedan od najsnažnijih načina za promjenu na page-U.
// Primer prikazuje sadržaj, JEDNOG DIV-A     document.body-JA     , a zatim ga u potpunosti zamenjuje
// content, POMENUTOG DIV-A:

console.log(    document.querySelector('div').innerHTML   );      //-->  'Neki blah tekst'
document.querySelector('div').innerHTML = 'Novi DIV!'
console.log(    document.querySelector('div').innerHTML   );      //-->  'Novi DIV!'

// MOGU I DA POKUSAM DA UNESEM INVALID HTML; AKO TO URADIM, BROWSER CE POPRAVITI MOJE ERRORE (GRESKE)

document.querySelector('div').innerHTML = '<b>Neki tekst';     // KAO STO SE VIDI ZABORAVIO SAM DA CLOSE-UJEM
                                                               // TAG
console.log(   document.querySelector('div').innerHTML   );             //-->  <b>Neki tekst</b> 
                                                                        // (KAO STO VIDIM, TAG JE FIXED)
// *********************************************************************************************************
//                  SCRIPT-OVI SE NE EXECUTE-UJU
// Ako innerHTML insert-uje <script> tag u document - taj script se ne izvršava.
// Postaje deo HTML-a, baš kao i script koji je već, ranije pokrenut i zavrsio je s radom.
// *********************************************************************************************************
//      TREBA VODITI RACUNA O SLEDECEM:
//                                              innerHTML+=    
//                                                                  OBAVLJA POTPUNI OVERWRITE
// 
// POMOCU POMENUTOGA, MOGU APPEND-OVATI, JOS HTML-A; OVAKO:
document.querySelector('div').innerHTML += '<div>Hello<img src="./images/icon.png"> !</div>';
document.querySelector('div').innerHTML += 'Kako ide?';

// Ali trebali bismo biti vrlo pažljivi kada to radimo, jer ono što se dešava nije addition, već 
// potpuni overwrite.
// Tehnički gledano, ove dvije linije (dva reda code-a) su iste:
document.querySelector('div').innerHTML += "...";
document.querySelector('div').innerHTML = document.querySelector('div').innerHTML + "...";

// Drugim rečima, innerHTML + = čini ovo:
//           1)   Stari sadržaj je uklonjen.
//           2)   Umesto toga napisan je novi unutrašnji HTML (concatenation starog i novog).
// Kako je sadržaj "zeroed out" i rewritten from the scratch, sve slike i drugi resursi će se ponovo učitati.
// U primeru div ELEMENT, iznad innerHTML + = "Kako ide?" ponovo kreira HTML sadržaj i 
// ponovo učitava icon.png (nadam se da je keširan). Ako taj div ima puno drugih tekstova i slika,
// onda se oni ponovno učitavanje i to postaje jasno vidljivo.
// Postoje i drugi neželjeni efekti. Na primer, ako je postojeći tekst izabran pomoću miša, 
// većina pretraživača će ukloniti izbor nakon rewriting-a innerHTML-a. A ako je bio <input>
// sa tekstom koji je unesio user, onda će tekst biti uklonjen. I tako dalje.
// Srećom, postoje i drugi načini dodavanja HTML-a pored innerHTML-a, i uskoro ćemo ih proučavati.
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                              outerHTML    :  full HTML, ELEMENTA

//      outerHTML       properti sadrži pun HTML elementa. To je kao innerHTML plus sam element. Evo primera:

console.log(   document.querySelector('div').outerHTML   );     //-->   '<div><b>Neki tekst</b>...</div>'

// Pazite: za razliku od innerHTML-a, pisanje u outerHTML ne menja element
// Umesto toga, u celini ga zamenjuje u spoljašnjem kontekstu
// Da, zvuči čudno, i to je čudno, zato smo napravili posebnu napomenu o tome. Pogledaj.
// Razmotrite primer:

const divEl = document.querySelector('div');
// ZAMENA POMENUTOG DIV-A SA PARGRAFOM
divEl.outerHTML = '<p>Novi element!</p>';    // (*)
// SAD JE PARAGRAF RENDERED NA STRANICI UMESTO DIV-A

// AKO STAMPAM DIV, VIDECU DA JE I DALJE ISTI (ODNOSNO AKO STAMPAM NJEGOV outerHTML)

console.log(    divEl.outerHTML    );       //-->     '<div><b>Neki tekst</b>...</div>'

// U gornjem redu oznacenom sa (*), uzimamo pun HTML od <div>...</ div> i zamijenimo ga <p>...</ p>
// U outer document-U možemo videti novi sadržaj umesto <div>. Ali stara div varijabla je i dalje ista
// outerHTML assignment ne mijenja DOM element, već ga izvlači iz spoljašnjeg konteksta i umjesto njega
// insert-uje, novi deo HTML-a
// NOVICE DEVELOPERS ponekad prave grešku: oni modifikuju div.outerHTML i onda nastavljaju da rade sa 
// divom kao da ima novi sadržaj u njemu
// To je moguće sa innerHTML, ali ne sa outerHTML-om.
// Možemo da napišemo u outerHTML, ali treba imati u vidu da ne menja element kojem pišemo
// On stvara novi sadržaj na svom mestu umesto samog sebe
// Možemo dobiti referencu za nove elemente tako što ćemo ureaditi querying DOM-A
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                  nodeValue     data            :  TEXT SADRZINA node-OVA

// innerHTML PROPERTI JE SAMO VALIDAN ZA element node-OVE
// OSTALI nodeTypes IMAJU SVOJ COUNTERPART:
//                                            nodeValue    I    data                    PROPERTIJE
// 
// Ove dva propertija su, skoro ista za praktičnu upotrebu; postoje samo manje specifikacijske razlike
// U RUSKOM CLANKU, INSISTIRAJU NA KORISCENJU
//                                                  data
// JER JE KRACE PISANJE
// (PRE NEGO STO ISPITAM OVAJ PROPERTI, PREPEND-OVACU, text node, NA POCETAK body-JA)
document.body.prepend(document.createTextNode('Neki tekst nested na pocetku body-ja'));
// PRISTUPICU texr node-U
const textNaPocetku = document.body.firstChild;
// PRISTUPICU I comment node-U, KOJI TREBA DA JE nextSibling TEXT node-A
const commentNode = textNaPocetku.nextSibling;
// SADA CU PRISTUPATI   data    PROPERTIJU, POMENUTIH NODE-OVA
console.log(    textNaPocetku.data    );   //-->    'Neki tekst nested na pocetku body-ja'

console.log(    commentNode    );          //-->    <!--komentar-->

console.log(    commentNode.data    );     //-->    'komentar'

// Za text node-OVE možemo zamisliti razlog da ih čitamo ili modifikujemo, ali ZASTO BI CITALI COMENTARE?
// Uobičajeno, oni uopšte nisu zanimljivi, ali ponekad programeri ugrađuju informacije u HTML u njima,
// ovako:
const html_s_komentrima = `

    <!-- if isAdmin-->
        <div>Welcome, Admin!</div>
    <!--/if-->

`;  
//...ONDA TO JAVASCRIPT MOZE PROCITATI I PROCESS-OVATI EMBEDDED INSTRUCTIONS
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                    textContent           :  CISTI TEKST (PURE TEXT)

// textContent       omogućava pristup tekstu unutar elementa: samo tekst, minus svi <tagovi>
// DA VIDIM TO, PUTEM PRIMERA
// 
const vesti = `
    <div id="news">
        <h1>Headline!</h1>
        <p>Martians attack people!</p>
    </div>
`;

console.log(    news.textContent    );      //-->   Headline!
//                                                  Martians attack people!

// Kao što vidimo, vraćen je samo tekst, kao da su svi <tagovi> isključeni, ali je tekst u njima ostao.
// U praksi, čitanje takvog teksta retko je potrebno.
// ********************************************************************************************************
//  WRITTING U textContent JE MNOGO VISE KORISNO, ZATO STO OMOGUCAVA WRITING TEXT-A, NA SIGURAN NACIN 
                                                                                        // (SAFE WAY)
// RECIMO DA IMAMO ARBITRARY(PROIZVOLJAN) STRING, NA PRIMER UNESEN OD STRANE KORISNIKA, I ZELIM DA GA
// PRIKAZEM 
                //      SA      innerHTML   MORAO BI GA INSERT-OVATI 'KAO HTML-A', SA SVIM HTML TAGOVIMA
                //      SA      textContent MORAO BI GA INSERTOVATI 'KAO TEXT-A', I SVI SIMBOLI 
                                //                                  (UKLJUCUJUCI TAGOVE) BI BILI TRETIRANI 
                                //                                   LITERALY, ODNOSNO DOSLOVNO

// **KORISTICU DUGME U PRIMERU JER NE ZELIM DA MI SE PROPMPT OTVARA PRI SVAKOM RELOAD-U
const promptDugmeIElement = `
    <button id="prompt_dugme">Pritisni za prompt</button>
    <div id="element1">Neki tekst</div>
    <div id="element2">Drugi tekst</div>
`;

prompt_dugme.onmousedown = function(ev){
    let ime = prompt('Kako se zoves?', '<b>Winnie-the-poop!</b>');

    window.element1.innerHTML = ime;

    window.element2.textContent = ime;

};

// 1)  Prvi <div> dobiva ime "kao HTML": svi tagovi postaju tagovi, pa vidimo bold ime.
// 2)  Drugi <div> dobiva ime "kao tekst", tako da bukvalno vidimo <b>Winnie-the-poop!</b>.

// U većini slučajeva očekujemo tekst od korisnika i želimo ga tretirati kao tekst.

// Ne želimo neočekivan HTML na našem sajtu. ASSIGNMENT-OM textContent-U UPRAVO POSTIZE TO.

// ********************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                          'hidden'        PROPERTI

// Atribut     hidden      i istoimeni properti DOM-A određuju da li je element vidljiv ili ne.
// Možemo ga koristiti u HTML-u ili dodeliti pomoću JavaScript-a, ovako:

// OBA DIV-A DOLE JESU SKRIVENA
const skriveni_divovi = `
    <div hidden>Neki tekst u divu</div>
    <div class="div_za_sakriti">Neki sadrzajni tekst u drugom divu</div>
`;
document.querySelector('.div_za_sakriti').hidden = true;

// Tehnički,    hidden       radi isto kao i        style="display: none"          Ali, kraće ga je pisati.

// Evo treperavog elementa:
setInterval(function(){
    document.querySelector('.div_za_sakriti').hidden = !document.querySelector('.div_za_sakriti').hidden
}, 580);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//                              JOS PROPERTIJA

// Elementi DOM-a takođe imaju dodatne propertije, od kojih su mnogi obezbedjeni od strane klase:
//    -  value  -  vrednost za <input>, <select> i <textarea> (HTMLInputElement, HTMLSelectElement ...)
//    -  href   -  "href" za <a href="..."> (HTMLAnchorElement)
//    -  id     -  vrednost atributa "id", za sve elemente (HTMLElement).
//    -  …i još mnogo toga…

// Većina standardnih HTML atributa ima odgovarajuće osobine DOM-a, i mi možemo pristupiti tako.

// Ako želimo da saznamo potpunu listu podržanih propertija za određenu klasu, možemo ih naći u 
// specifikaciji. Na primer, HTMLInputElement je dokumentovan na
//                                                           https://html.spec.whatwg.org/#htmlinputelement

// Ili, ako želimo da ih gett-ujemo brzo ili smo zainteresovani za konkretniju browser specifikaciju
// - uvek možemo da output-UJEMO element pomoću console.dir (elem) i pročitamo propertije.
//  Ili istražite "DOM propertije" na kartici Elements u developer alatkama pretraživača.
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//      REZIME: 

// Svaki DOM node pripada određenoj klasi. Klase formiraju hijerarhiju. Puni skup propertija i metoda
//  dolazi kao rezultat nasleđivanja.

// Glavne osobine DOM node-OVA su:

//              nodeType
// nodeType  možemo dobiti od DOM object class-A, ali često nam je potrebno samo da vidimo da li je to
// text ili element node. nodeType properti je dobar za to. Ima numeričke vrednosti, najvažnije su: 
            // 1 - za element, 3 - za text node-OVE. 
//POMENUTI PROPERTI JE READ ONLY

//             nodeName/tagName
// Za elemente, ime tag-A (velika slova, osim ako nije XML-mode). Za node-OVE koji nisu elementi nodeName 
// opisuje šta je taj node.
// READ-ONLY

//             innerHTML
// HTML sadržaj elementa. 
// Može se mijenjati.

//             outerHTML
// Puni HTML elementa. 
// Operacija pisanja u elem.outerHTML ne dodiruje sam elem. Umesto toga, zamenjuje se novim HTML-om 
// u spoljnom kontekstu.

//             nodeValue / data
// Sadržaj non-element node-A (text, comment). Ove dva propertija su skoro ista, a obično koristimo    data
//  Može se modifikovati
        
//             textContent
// Tekst unutar elementa, u osnovi HTML minus svi <tagovi>.
// Pisanje u njega stavlja tekst unutar elementa, sa svim specijalnim karakterima i oznakama tretiranim 
// tačno kao tekst. Može safely insert-ovati tekst generisan od strane korisnika i zaštititi od neželjenih 
// HTML umetaka (insertion-a)

//             hidden
// Kada je postavljen na true, to isto radi CSS        display: none

// DOM node-OVI takođe imaju druge propertije u zavisnosti od njihove klase. Na primer, elementi
//  <input> (HTMLInputElement) podržavaju   value, type, 
// dok <a> elementi (HTMLAnchorElement) podržavaju href itd.
// Većina standardnih HTML atributa ima i odgovarajući properti DOM-a.

// Ali HTML atributi i propertiji DOM-a nisu uvijek isti, kao što ćemo videti u sledećem clanku

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PRIMERI:

// 1) PREBROJ DESCENDANTE

// POSTOJI TREE STRUKTURA, NESTOVANIH ul/li
// ZA SVASKI LIST ITEM TREBA PRIKAZATI
//                                         - text UNUTAR NJEGA (BEZ SUBTREE-JA)
//                                         - BROJ NESTED LIST ITEM-A U NJEMU 
//                                          (BROJ SVIH LIST ITEM DESCENDANATA, UKLJUCUJUCI I ONE
//                                          DEEPLY NESTED)

const drvo_blah = `
<ul id="zivotinje">
<li>Animals
  <ul>
    <li>Mammals
      <ul>
        <li>Cows</li>
        <li>Donkeys</li>
        <li>Dogs</li>
        <li>Tigers</li>
      </ul>
    </li>
    <li>Other
      <ul>
        <li>Snakes</li>
        <li>Birds</li>
        <li>Lizards</li>
      </ul>
    </li>
  </ul>
</li>
<li>Fishes
  <ul>
    <li>Aquarium
      <ul>
        <li>Guppy</li>
        <li>Angelfish</li>
      </ul>
    </li>
    <li>Sea
      <ul>
        <li>Sea trout</li>
      </ul>
    </li>
  </ul>
</li>
</ul>
`;


Array.from(zivotinje.querySelectorAll('li')).forEach(function(ajtem){
    
    console.log(ajtem.firstChild.data.trim() + ", " +  ajtem.getElementsByTagName('li').length);
    
});
// UMESTO Array.from, MOGLA JE DA SE KORISTI I for of PETLJA
// http://plnkr.co/edit/IK1QDDSRKvoMvdD7psXY?p=preview

// 2) STA JE U nodeType-U

// STA SLEDECI SCRIPT POKAZUJE

const sledeci_script = `
<html>

    <body>
        <script>
            alert(document.body.lastChild.nodeType);
        </script>
    </body>

</html>
`;
// Tu postoji cka
// U trenutku izvršenja <script>-A poslednji DOM node je upravo <script>,
// jer pretraživač još nije obrađivao ostatak stranice.
// Dakle rezultat je 1 (element node).

// DA SAM NA PRIMER TRAZIO firstChild REZULTAT BI BIO 3 (text node)
// A DA SAM TADA UKLONIO WHITESPACE IZMEDJU sctipt I body TAGA, firstChild I lastChild BI BIO <script>

// 3)   STA SLEDECI CODE POKAZUJE?

const sledeci_code = `
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // what's here?
</script>`

// POKAZUJE         'BODY'

// 4) GDE JE document U HIJERARHIJI?
//      DA LI NASLEDJUJE OD Node ILI Element KLASE  ILI MOZDA HTMLElement?

// KORISCENJEM      __proto__       LANCANO, MOGU VIDETI DA JE TO Node
// A MOZE SE KORISTITI I        console.dir     KAKO BI TO VIDEO

console.log(document); // [object HTMLDocument]
console.log(document.constructor.name); // HTMLDocument
console.log(HTMLDocument.prototype.constructor === HTMLDocument); // true
console.log(HTMLDocument.prototype.constructor.name); // HTMLDocument
console.log(HTMLDocument.prototype.__proto__.constructor.name); // Document
console.log(HTMLDocument.prototype.__proto__.__proto__.constructor.name); // Node

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
// 
//                              ATRIBUTI I PROPERTIJI
// 
// KADA BROWSER LOAD-UJE STRANICU, ON 'CITA'(DRUGA REC: 'PARSE-UJE') HTML I GENERISE DOM Object Model IZ,
// TOG HTML-A
// ZA element node-OVE, NAJSTANDARDNIJI HTML ATRIBUTI AUTOMATSKI POSTAJU I PROPERTIJI DOM OBJEKTA
// NA PRIMER, AKO SE HTML-U SASTOJI OD SLEDECI TAG-A:
//                                                            <body id="page"></body> 
// ONDA DOM Object IMA SLEDECE:
//                                                            body.id === "page"
// 
// ALI attribute-property mapping NIJE one-to-one
// U OVOM CLANKU VODICE SE RACUNA O RAZDVAJANJU, OVA DVA POJMA(NOTION-A), ZATIM O NACINUKAKO DA RADIM SA
// NJIMA, KADA SU ONI ISTI, I KADA SU RAZLICITI
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                  DOM properties

// Već smo videli built-in DOM propertije. Ima ih mnogo. Ali tehnički niko nas ne ograničava, da dodamo
// svoje propertije
// DOM čvorovi su redovni JavaScript objekti. Možemo ih promeniti.
// Na primer, kreirajmo novi properti u document.body

document.body.myData = {
    name: 'Caesar',
    title: 'Imperator'
};

console.log(  document.body.myData.title  );        //-->   'Imperator'

// A MOGU, TAKODJE DODATI I METODE

document.body.sayTagName = function(){
    console.log(this.tagName);
}

document.body.sayTagName();                 //-->   'BODY'      
                                                                    //  VREDNOST this-A JE KAO STO SE VIDI
                                                                    //  document.body

// TAKO DA JA MOGU MODIFIKOVATI BUILT-IN PROPERTIJE, KAO STO JE     Element.prototype

Element.prototype.sayHi = function(){
    console.log(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi();               //-->   'Hello, I'm HTML'
document.body.sayHi();                          //-->   'Hello, I'm BODY'

// DAKLE, DOM PROPERTIJI I METODE SE PONASAJU, UPRAVO KAO ONI U REGULARNIM JAVASCRIPT OBJEKTIMA

//                      - MOGU DA IMAJU BILO KOJU VREDNOST
//                      - ONI SU CASE-SENSITIVE (  DAKLE OVO JE PRAVILNO     elem.nodeType     
//                                                 A OVO JE NEPRAVILNO       elem.NoDeTyPe  )
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//              HTML attributes

// U HTML-u, tagovi mogu imati atribute. Kada pregledač parse-uje HTML za kreiranje DOM objekata za tagove,
// browser prepoznaje standardne atribute i kreira DOM propertije od njih.

// Dakle, kada element ima id ili neki drugi 'standardni' atribut, odgovarajući properti se kreira
// Ali to se ne dešava ako je atribut nestandardan (non-standard)

// NA PRIMER:
// 
const neki_html_sa_atributima = `
    <body id="test" something="non-standard">
    </body>
`;

console.log(document.body.id);          //-->   'test'
console.log(document.body.something);   //-->   undefined

// Imajte na umu da standardni atribut za jedan element može biti undefined za drugi. 
// Na primjer, "type" je standardan za <input> (HTMLInputElement), ali ne i za <body> (HTMLBodiElement)
// Standardni atributi su opisani u specifikaciji za odgovarajuću klasu elemenata.

// Ovde možemo, pomenuti i da vidimo:

const neki_html_sa_atributima_dodatno = `
    <body id="test" something="non-standard" type="louis">
        ...
        <input id="neki_unos" type="text">
        ...
    </body>
`;

console.log(neki_unos.type);       //-->   'text'
console.log(document.body.type);    //-->   undefined
//                                                      DOM properti nije kreiran jer nije standardni

// Dakle, ako je atribut nestandardan, za njega nece biti kreiran DOM properti.

// Postoji li način pristupa takvim atributima?

// Naravno. Svi atributi su dostupni korišćenjem sledećih metoda:

//              elem.hasAttribute(name)         -->    PROVERAVA POSTOJANJE

//              elem.getAttribute(name)         -->    GETT-UJE VREDNOST

//              elem.setAttribute(name, value)  -->    SETT-UJE VREDNOST

//              elem.removeAttribute(name)      -->    UKLANJA ATRIBUT

// OVE METODE OPERISU, TACNO SA ONIM STO JE NAPISANO U HTML-U

// TAKODJE, POSTOJI JEDAN PROPERTI
//                                      elem.attributes
//                                                           TO JE COLLECTION OBJEKATA KOJI PRIPADAJU
//                                                           BUILT-IN   Attr    class-I
//                                                           TI OBJEKTI IMAJU PROPERTIJE  name  I  value
// EVO JE DEMONSTRACIJA, KAKO TO CITATI
// NESTANDARDNE PROPERTIJE:

console.log(    document.body.getAttribute('something')    );       //-->       'non-standard'

// HTML ATRIBUTI IMAJU SLEDECE FEATURE-E:

//          NJIHOVO     name    JESTE CASE-INSENSITIVE      (id     JE ISTO KAO I     ID)
//          NJIHOVO     value   JESTE UVEK STRING

// EVO JE PROSIRENA DEMONSTRACIJA RADA SA ATRIBUTIMA:

const neki_html_za_rad_s_atributima = `
    <div id="some_elem" about="Elephant"></div>
`;

console.log(  some_elem.getAttribute('About')  );   //-->   'Elephant'
some_elem.setAttribute('Test', 123);                     // writting
console.log(  some_elem.outerHTML  );               // provera da li je novododati atribut, zaista tamo

for(let attr of some_elem.attributes){              // LISTANJE SVIH ATRIBUTA
    
    console.log(`${attr.name}="${attr.value}"`);

}
// TREBA ZABELEZITI SLEDECE U VEZI PREDHODNOG CODE-A

//   (1)        getAttribute('About') - prvo slovo je veliko, a u HTML-u su sve male slova.
//              Ali to nije važno: name-OVI atributa su case-insensitive

//   (2)        Mi možemo dodeliti bilo šta atributu, ali to ce postati string
//              Dakle, ovde imamo "123" kao vrednost.

//   (3)        Svi atributi uključujući one koji smo postavili su vidljivi u      outerHTML-U

//   (4)        KOLEKCIJA atributa je iterable i ima sve atribute elementa (standardne ili nestandardne) kao
//              objekte sa      name    I   value    PROPERTIJIMA
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//        PROPERTI-ATRIBUT SINHRONIZACIJA     (Property-attribute synchronization)
// 
// Kada se standardni atribut promeni, odgovarajući properti se automatski ažurira (updateuje) 
// i (uz izuzetke) obrnuto.
// U dolje navedenom primeru id je modifikovan kao atribut, a mi možemo vidjeti i promjenu propertija. 
// I onda isto to unazad:

let inputElement = document.querySelector('input');

//      atribut ----->  properti
inputElement.setAttribute('id', 'id');
console.log(    inputElement.id    );       //-->   'id'    (updated)

//      properti ----->  atribut
inputElement.id = "newID";
console.log(    inputElement.getAttribute('id')   );    //-->    'newID'    (updated)

// Ali postoje izuzeci, na primer, input.value sinhronizuje se samo od atributa → na properti, ali ne i 
// nazad:

//      atribut ----->  properti
inputElement.setAttribute('value', 'text');
console.log(    inputElement.value    );        //-->   'text'

//      NOT   properti ----->  atribut
inputElement.value = 'newValue';
console.log(    inputElement.getAttribute('value')    );    //-->    'text'     (not updated)

// U gore navedenom primeru:
//     ----     Promena vrijednosti atributa ažurira properti
//     ----     Ali promena propertija ne utiče na atribut
// Taj "feature" može zapravo biti zgodan, jer korisnik može modificirati vrijednost, a nakon toga,
// ako želimo da vratimo "prvobitnu" vrijednost iz HTML-a, ona je u atributu.
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//          DOM propertiji su       TYPED       (IMAJU SVOJ TIP)

// DOM PROPERTIJI NISU UVEK STRING-OVI
// NA PRIMER        input.checked       PROPERTI (ZA checkboxes) JESTE BOOLEAN

const inputElementBla = `
    <input id="neki_input_element" type="checkbox" checked> blah
`;

console.log(    neki_input_element.getAttribute('checked')    );     // VREDNOST ATRIBUTA JESTE PRAZAN
                                                                                            // STRING

console.log(    neki_input_element.checked    );                     //VREDNOST PROPERTIJ JE BOOLEAN true

// POSTOJE I DRUGI PRIMERI POMENUTOGA
//                                           VREDNOST       style       ATRIBUTA, JESTE STRING

//                                           VREDNOST       style       PROPERTIJA, JESTE OBJEKAT

const neki_div_sa_style_atributom = `
    <div id="nekidiv" style="color: red; font-size: 120%;">Hello</div>
`;

console.log(    nekidiv.style    );                     //-->       CSSStyleDeclaration     INSTANCA

console.log(    nekidiv.style.color    );               //-->       'red'

console.log(    nekidiv.getAttribute('style')    );     //-->       'color: red; font-size: 120%;'

// To je bitna razlika. Ali čak i ako tip DOM propertija jeste string , može se razlikovati od atributa!
// Na primer, href DOM properti je uvek potpuna URL adresa, čak i ako atribut sadrži relativni URL ili samo
// #hash.
// Evo primera:

const neki_anchor_el = `
    <a id="a" href="#hello">link</a>
`;

console.log(    a.getAttribute('href')    );        //-->   '#hello'

console.log(    a.href    );        //--> e:///C:/Users/Documents/vezbe_za_web_aplikacije/
//                                          apis_trying_out_and_practicing/additional%20practicing%20files/
//                                          pageLifecyleEventsSec.html#hello

// Ako nam treba vrednost href ili bilo kojeg drugog atributa, tačno onakva kakva je napisana u HTML-u,
// možemo koristiti         getAttribute
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//              NESTANDARDNI (non-standard) ATRIBUTI       I        dataset     PROPERTI 

// Prilikom pisanja HTML-a koristimo dosta standardnih atributa. Ali šta je sa nestandardnim, onim custom?
// Prvo, da vidimo da li su korisni ili ne? I Za šta, ako jesu?
// Ponekad se nestandardni atributi koriste za prenošenje custom podataka iz HTML-a u JavaScript ili za
// "označavanje" ('mark') HTML-elemenata za JavaScript.
// Ovako:

const markirani_html_sa_custom_atributima = `
        <!--markiran div, za pokazivanje 'name'-A u njemu-->
    <div show-info="name"></div>
        <!--markiran div, za pokazivanje 'age'-A u njemu-->
    <div show-info="age"></div>
`;

let user = {
    name: "Pete",
    age: 25
};

// SLEDECI CODE PRONALAZI ELEMENT, OZNACEN POMENUTIM ATRIBUTOM, I PRIKAZUJE, U NJEMU ONO STO JE REQUESTED

for(let div of document.querySelectorAll('[show-info]')){
    let infoValue = div.getAttribute('show-info');
    div.innerHTML = user[infoValue];                    // JEDNOM DIV-U CE SE DODATI Pete, A DRUGOM 25
}

// TAKODJE SE MOZE KORISTITI ZA STILIZOVANJE ELEMENATA
// NA PRIMER OVDE, ZA STATE ORDER-A ODNOSNO ZA STANJE NARUDZBINU, KORISTI SE ATRIBUT   order-state

const stilovi_za_elemente_sa_pomenutim_atributom = `
    /* STILOVI SE OSLANJAJU NA CUSTOM ATRIBUT     order-state   */

    .order[order-state="new"] {
        color: green;
    }

    .order[order-state="pending"] {
        color: blue;
    }

    .order[order-state="canceled"] {
        color: red;
    }
`;

const html_elemenata_sa_order_state_atributom = `
    <div class="order" order-state="new">
        A new order.
    </div>
    <div class="order" order-state="pending">
        A pending order.
    </div>
    <div class="order" order-state="canceled">
        A canceled order.
    </div>
`;

// Zašto atribut može biti poželjniji za klase kao što su   .order-state-new    ,   .order-state-pending    , 
// order-state-canceled ?
// To je zato što je atribut pogodniji za upravljanje. State se može promeniti jednostavno kao:

document.querySelector('.order').setAttribute('order-state', 'pending');

// Ali može postojati problem sa prilagođenim (custom) atributima
// Šta ako koristimo nestandardni atribut u naše svrhe, a kasnije ga standard uvodi i učini da taj atribut 
// ima neku drugu svthu?
// HTML jezik je živ, raste.
// U tom slučaju mogu biti neočekivani efekti.
// Da bi se izbegli sukobi, postoje atributi            data-*             atributi

// https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes

//      SVI ATRIBUTI, KOJI POCINJU SA:                          data-
//      REZERVISANI SU ZA KORISCENJE OD STRANE PROGRAMERA
//      DOSTUPNI SU U           dataset         PROPERTIJU
// 
// NA PRIMER AKO ELEMENT IMA ATRIBUT, KOJI SE ZOVE      data-about   ON JE DOSTUPAN KAO
//                                                                                      elem.dataset.about
// OVAKO:
// 
const nekiDivSa_data_Atributom = `
    <div id="el" data-about="Elephants"></div>
`;

console.log(    el.dataset.about    );          //-->   'Elephants'

// MULTIWORD ATRIBUTI, ODNOSNO ATRIBUTI SASTAVLJENI OD VISE RECI, KAO STO JE        data-order-state
// POSTAJU      camelCased      PROPERTIJI   dataset-A

// EVO GA REWRITTEN 'order-state' PRIMER
const stilovi_za_elemente_sa_data_atributima = `

    .ord[dat-order-state="new"] {
        color: green;
    }

    .ord[data-order-state="pending"] {
        color: blue;
    }

    .ord[data-order-state="canceled"] {
        color: red;
    }
`;

const html_elemenata_sa_data_attr = `
    <div class="ord" data-order-state="new">
        A new order.
    </div>
    <div class="ord" data-order-state="pending">
        A pending order.
    </div>
    <div class="ord" data-order-state="canceled">
        A canceled order.
    </div>
`;

console.log(    document.querySelector('.ord').dataset.orderState    );         //-->   'new'

document.querySelector('.ord').dataset.orderState = 'pending';     //(*)

// Korišćenje      data-*      atributa je validan, i siguran način za prosleđivanje custom podataka
// Imajte na umu da ne možemo samo pročitati, već i modifikovati    data     atribute
// Zatim CSS ažurira prikaz prema tome: u primeru iznad poslednji red(*) menja color
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//     REZIME:
// 
//  -    ATRIBUTI       ono sto je napisano u HTML-U
//  -    PROPERTIJI     ono sto je u DOM objektima
// 
//   MALO UPOREDJIVANJE:
// 
//              PROPERTIJI                                                      ATRIBUTI

//   tip         bilo koja vrednost, standardni propertiji imaju tipove           string
//               opisane u specifikaciji

//   ime         ime propertija je case-sensitive                                 ime atributa je
//                                                                                case-insensitive
// METODE ZA RAD SA ATRIBUTIMA:
// 
//              elem.hasAttribute(name)         -->    PROVERAVA POSTOJANJE

//              elem.getAttribute(name)         -->    GETT-UJE VREDNOST

//              elem.setAttribute(name, value)  -->    SETT-UJE VREDNOST

//              elem.removeAttribute(name)      -->    UKLANJA ATRIBUT

//              elem.attributes         JE KOLEKCIJA SVIH ATRIBUTA


// Za većinu potreba, propertiji DOM-a nam mogu dobro poslužiti
// Trebali bismo da refer-ujemo na atribute samo kada nam se DOM propertiji ne uklapaju, kada nam trebaju
// tačno atributi, na primer:

//         -     Potreban nam je nestandardni atribut. Ali ako pocinje sa     data-      , onda treba 
//               koristiti      dataset

//         -     Želimo da pročitamo vrednost "tacno onako kako je napisana" u HTML-u
//               Vrednost propertija DOM-a može biti drugačija, na primer, properti href-a je uvek pun URL,
//               a možda ćemo želeti da dobijemo i "originalnu" vrednost
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//  PRIMERI:

//      (1) 
// CITANJE VREDNOSTI    data-widget-name     ATRIBUTA IZ DOKUMENTA

const html_primera_sa_atributom = `
    <div data-widget-name="menu">Chose the genre</div>
`;

// PRVI NACIN
console.log(    document.querySelector('[data-widget-name]').dataset.widgetName     );      //-->   'menu'
// DRUGI NACIN
console.log( document.querySelector('[data-widget-name]').getAttribute('data-widget-name') );  //-->  'menu'

//      (2)
// CINJENJE DA SVI EXTERNAL LINKOVI, SLEDECEG PRIMERA BUDU ORANGE
const html_linkova = `
    <a name="list">the list</a>
    <ul>
        <li><a href="http://google.com">http://google.com</a></li>
        <li><a href="/tutorial">/tutorial.html</a></li>
        <li><a href="local/path">local/path</a></li>
        <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
        <li><a href="http://nodejs.org">http://nodejs.org</a></li>
        <li><a href="http://internal.com/test">http://internal.com/test</a></li>
    </ul>
`;
// PRE NEGO STO POCNEM SA RESAVANJEM POTREBNO JE RECI DA, DA JE EXTERNAL LINK, ONAJ LINK

//          ----        KOJI IMA    href    ATRIBUT SA VREDNOSCU, KOJA IMA SLEDECE KARAKTERE:
//                                                                                                ://
//          ----        I CIJA VREDNOST NE SME DA POCINJE SA SLEDECIM KARAKTERIMA:
//                                                                                       http://internal.com

const ajtems = document.getElementsByName('list')[0].nextElementSibling.children;

// OPET PONAVLJAM, TREBA DA KORISTIM VREDNOST href ATRIBUTA, A NE href PROPERTIJA

for(let ajtem of ajtems){

    if(!ajtem.querySelector('a').getAttribute('href')) continue;  // ZA SLUCAJ DA JE PRAZAN STRING VREDNOST

    if(!ajtem.querySelector('a').getAttribute('href').includes('://')) continue;

    if(ajtem.querySelector('a').getAttribute('href').startsWith('http://internal.com')) continue;

    ajtem.querySelector('a').style.color = 'orange';

}

// DRUGI NACIN BI BIO DA KORISTIM ATRIBUT SELEKTOR, VECINM KAPACITETOM, ALI I   :not        SELECTOR

const links = document.getElementsByName('list')[0].nextElementSibling
                .querySelectorAll('a[href*="://"]:not([href^="http://internal.com"])');
 
Array.from(links).forEach(function(link){
    link.style.color = "tomato";
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// **********************************************************************************************************
// 
//                      STILOVI I KLASE     (Styles  and    classes)
// 
// Pre nego što pređemo na načine JavaScripta u dealing-u sa stilovima i klasama - evo ga važno pravilo.
// Nadam se da je dovoljno očigledno, ali moramo i dalje pomenuti
// Obično postoje dva načina za stilizovanje elementa:

//              Kreiranje klase u CSS-u i njeno dodavanje 
                                        // <div class = "..."> 

//              Pisanje propertija direktno u style:
                                        // <div stile = "...">

// CSS je uvek najpoželjniji način - ne samo za HTML, već i za JavaScript

// Trebali bismo samo manipulisati      style    propertijem, ako klase "to ne mogu handle-OVATI"

// Na primer,    style    je prihvatljiv ako dinamički izračunamo koordinate elementa i želimo da ih
// postavimo iz JavaScripta, ovako
// 

//              let top = /* kompleksne kalkulacije */;
//              let left = /* kompleksne kalkulacije */;
// 
//              elem.style.left = left      //eg.   '148px'
//              elem.style.top = top        //eg.   '448px'

// U drugim slučajevima, kao što je napraviti tekst crvenim, dodavanje ikone pozadine - opišite to u
// CSS-u, a zatim primenite CSS class. To je fleksibilniji i lakse za odrzavati (support)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                      className       I       classList
// 
// Promena klase je jedna od najčešće korišćenih akcija u script-OVIMA
// U drevnim vremenu, bilo je ograničenja u JavaScriptu: rezervirana reč kao što je "class" nije 
// mogla biti objektov properti
// To ograničenje trenutno ne postoji, ali u to vrijeme bilo je nemoguće imati properti "class",
// kao što je:
//                      elem.class

// Dakle, za klase je predstavljen sličan properti          "className" 

//  elem.className      odgovara atributu       "class"

// Na primer:

const body_sa_klasom = `
    <body class="main page">...</body>
`;

console.log(    document.body.className    );       //-->   'main page'

// Ako dodelimo nešto           elem.className -U         , on zamenjuje čitave stringove klasa
// Ponekad nam je to potrebno, ali često želimo da dodamo / uklonimo jednu klasu
// Za to postoji još jedna karakteristika: 
//                                                  elem.classList

// elem.classList       je poseban objekat sa metodama za   dodavanje/uklanjanje/prebacivanje   klasa
// Na primer:

document.body.classList.add('article');

console.log(        document.body.className         );      //-->   'main page article'

// Dakle, možemo raditi i sa punim stringom klasa, koristeći className ili pojedinačnim klasama 
// koristeći classList. Ono što izaberemo zavisi od naših potreba

//                  Metode  classList    :
//                                               elem.classList.add('class')         DODAJE KLASU

//                                               elem.classList.remove('class)       ODUZIMA KLASU

//                                               elem.classList.toggle('class')      AKO KLASA POSTOJI
//                                                                                      UKLANJA JE
//                                                                                   U SUPROTNOM JE DODAJE

//                                               elem.classList.contains('class')    return-UJE  true  ILI 
//                                                                                      false ; PROVERAVA
//                                                                                   POSTOJANJE DATE KLASE
// 
// PORED TOGA       classList       JE ITERABLE; TAKO DA MOGU DA IZLISTAM SVE KLASE, OVAKO:
// 
for(let imeKlase of document.body.classList){
    console.log(imeKlase);                          //-->   (0)    'main'             (1)   'page'
                                                    //                    (2)   'article'     
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                         Element   style
// 
// Properti 
//              elem.style 
//                             je objekat koji odgovara onome što je napisano u atributu "style"
// Podešavanje elem.style.width = "100px" radi kao da smo imali atribut     style = "width: 100px"

// Za multi-word propertije, koristi se camelCase:
                                                    //  background-color  => elem.style.backgroundColor
                                                    //  z-index           => elem.style.zIndex
                                                    //  border-left-width => elem.style.borderLeftWidth

//      document.body.style.backgroundColor = prompt('background color?', 'green');
//**********************************************************************************************************
//      PREFIXED PROPERTIJI
// 
// BROWSER-PREFIXED PROPERTIJIKAO STO SU:
//                                          -moz-border-radius
//                                          -webkit-border-radius
// PRATE ISTA PRAVILA, NA PRIMER:
//                                        button.style.MozBorderRadius = "8px";
//                                        button.style.WebkitBorderRadius = "8px";
// 
// KAO STO VIDIM       dash (-)     SE "PRETVORILO" U       UPPERCASE
//********************************************************************************************************** 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                       RESETOVANJE style PROPERTIJA
// 
// NEKAD ZELIMO DA ASSIGN-UJRMO style PROPERTI, I KASNIJE DA GA UKLONIMO
// Na primer, da sakrijemo element, možemo podesiti elem.style.display = "none"
// Zatim ćemo možda želeti da uklonimo styl.display kao da nije postavljen. Umesto da izbrišemo 
// elem.style.display, trebamo mu dodijeliti prazan string:     elem.style.display = ""

document.body.style.display = "none"; // sakrivanje (ili bolje reci 'uklanjanje')

setTimeout(() => document.body.style.display = "", 1000); // nazad u normalu

// Ako postavimo display da bude prazan string, pretraživač, normalno primenjuje CSS klase i njegove 
// built-in stilove, kao da uopšte nije ni postojao      display    PROPERTI
//**********************************************************************************************************
//      POTPUNI REWRITE SA      style.cssText

// Obično koristimo     style     Za dodjelu individualnih stilova
//                      NE MOZEMO podesiti pun stil kao: 
//                                                         div.style = "color: red, width: 100px"
// jer      div.style   je objekat i samo je za čitanje
// Da biste postavili ceo stil kao string, postoji poseban properti     
//                                                                          style.cssText
// 
const neki_div_kojem_menjam_css_tekst = `
    <div id="some_div_blah">Button</div>
`;

some_div_blah.style.cssText = `
    color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
`;

console.log(some_div_blah.style.cssText);

// Redko ga koristimo, jer ovakav zadatak uklanja sve postojeće stilove: ne dodaje, već ih zamenjuje
// Može ponekad izbrisati nešto što je potrebno. Ali i dalje se može uraditi za nove elemente kada 
// znamo da nećemo izbrisati nešto važno.

// ISTO SE MOZE POSTICI SETTING-OM ATRIBUTA

some_div_blah.setAttribute('style', `
    color: tomato !important;
    background-color: olive;
    width: 108px;
    text-align: left;
`);
//**********************************************************************************************************
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                          OBRATI PAZNJU NA JEDINICE
// 
// CSS JEDINICE SE MORAJU OBEZBEDITI U STIL VREDNOSTIMA
// NA PRIMER 
// NE TREBA SE      elem.style.top      PODESITI NA    '10'        
// VEC SE TREBA                         PODESITI NA    '10px'

document.body.style.margin = 20;
console.log(document.body.style.margin); // --> '' (PRAZAN STRING, ASSIGMENT JE IGNORISAN)

// SADA CU DODATI CSS JEDINICE, I RADICE
document.body.style.margin = '20px';
console.log(document.body.style.margin);      // --> 20px
console.log(document.body.style.marginTop);   // --> 20px
console.log(document.body.style.marginLeft);  // --> 20px
document.body.style.margin = '0px';

// Obratite pažnju na to kako pretraživač "unpacks" properti        style.margin
// style.marginLeft I style.marginTop (i druge delimične margine)   TAKODJE SE:
//                                                                              MENJAJU, KADA SE IZVRSI
//                                                                             ASSIGNMENT, margin PROPERTIJU 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                         COMPUTED STILOVI:      getComputedStyle
// 
// MODIFIKOVANJ STILA JE LAKO.      ALI KAKO CITATI STIL?
// Na primer, želimo da znamo veličinu, margin, color elementa. Kako se to radi?
// 
//      NAIME,  style   PROPERTI OPERISE SAMO NA VREDNOSTI      'style'     ATRIBUTA, BEZ BILO KOJE CSS
//                                                                                                  cascade

// 

console.log('/////////////////////////////////////////////////////////////////////////////////////////////');
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
console.log('/////////////////////////////////////////////////////////////////////////////////////////////');















