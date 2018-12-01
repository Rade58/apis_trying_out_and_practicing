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

// 

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

