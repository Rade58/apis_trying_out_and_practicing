//ZA REGISTROVANJE CUSTOM EKLEMENTA, KORISTI SE KORISTI INSTANCA SLEDECE KLASE
CustomElementRegistry;
//KOJA PREDSTAVLJA KONTROLER CUSTOM ELEMENATAWEB DOKUMENTA
//I TAKVA INSTANCA MI OMOGUCAVA DA REGISTRUJEM CUSTOM ELEMNT NA STRANICI

//TAKVU INSTANCU ZA STRANICU, REFERENCIRA SLEDECI OBJEKAT 
window.customElements;
/////////////////////////////////////////////////////////////
console.log(        CustomElementRegistry                               );
console.log(        customElements                                      );
console.log(        customElements instanceof CustomElementRegistry     );  //------->       true
////////////////////////////////////////////////////////////

//DA REGISTRUJEM CUSTOM ELEMENT NA WEB STRANICI, KORISTIM define METRODU KOJU IMA SVAKA 
//CustomElementRegistry INSTANCA, STO ZNACI DA OVU METODU MOGU PRIMENITI NA customElements OBJEKTU,
//KADA BUDE BILO POTREBNO DA DEFINISEM NOVI CUSTOM ELEMENT
//ZA SADA CU SAMO STAMPATI POMENUTU METODU

console.log(        CustomElementRegistry.prototype.define          );
console.log(        customElements.define                           );

//POMENUTOJ define METODI SE PRILIKOM POZIVANJA DODAJU SLEDECI ARGUMENTI:

//      1)     DOMstring       (string imena novog custom elementa)
//                                MORA SADRZAVATI CRTICU, ODNOSNO DASH U SVOM IMENU

//      2)     KLASA (class) KOJA DEFINISE PONASANJE CUSTOM ELEMENTA

//      3)     OPCIONO, KAO ARGUMENT SE MOZE DODATI I option OBJEKAT, KOJI IMA      extends    PROPERTI 
//             POMENUTI extends PROPERTI, MORA SPECIFICIRATI BUILT-IN ELEMENT, IZ KOJEG CUSTOM ELEMENT
//              TREBA DA NASLEDJUJE






class BrojacReci extends HTMLParagraphElement {
    constructor(){
        //super SE PRVO POZIVA U KONSTRUKTORU, CIME NOVI CUSTOM ELEMENT DOBIJA SVE PROPERTIJE,
        //KOJE IMA I JEDNA  HTMLParagraphElement INSTANCA, I PREDPOSTAVLJAM DA NA OVAKAV NACIN MOGU 
        //REDEFINISATI NEKI PROPERTI, DA BI BIO PRILAGODJEN CUSTOM ELEMENTU
        super();

        //DALJE MOGU DA DEFINISEM METODE I PROPERTIJE KOJI SU KARAKTERISTICNI SAMO ZA MOJ
        //CUSTOM ELEMENT
    }
}

//JEDNOSTAVAN PRIMER DEFINISANJA CUSTOM ELEMENTA, KOJI BI NASLEDJIVAO OD HTMLParagraphElement
//INSTANCE, ODNOSNO CIJI BI PROTOTIP OBJEKAT BILA HTMLParagraphElement INSTANCA, BI IZGLEDAO OVAKO

customElements.define('brojac-reci', BrojacReci, {extends: 'p'});

//A OVAKO BI IZGLEDALA class-A KOJA BI DEFINISALA PONASANJE, POMENUTOG CUSTOM ELEMENTA KOJI EXTENDS
//PARAGRAF





/////////////////////////////   PRAVILA PRILIKOM KREIRANJE CUSTOM ELEMNATA          ///////////////////

//                              1)  IME CUSTOM ELEMENTA, KAO STO SAM REKAO MORA SE SASTOJATI I OD
//                                   DASH (CRTICA) KARAKTERA; DAKLE TO MORA BITI DASH, I TO NE SME BITI
//                                                                                 OVO (_)("DONJI" DASH)
//                                  POMENUTO SE RADI ZBOG HTML PARSERA, KAKO BI ON 
//                                  MOGAO RAZLIKOVATI CUSTOM OD REGULARNIH ELEMNATA
                                    //A TAKODJE JE TIME OMOGUCEN I FORWARD COMPATIBILITY (https://en.wikipedia.org/wiki/Forward_compatibility)
//                                  
//                              2)  NIJE MOGUCE REGISTROVATI ISTI TAG, VISE OD JEDNOG PUTA
//                                    AKO SE TO URADI BICE throw-OVAN DOMException
//                                     KAD SE JDNOM BROWSER-U KAZE ZA NOVI TAG, TO JE TO, I NEMA
//                                      POVRATKA NAZAD
//
//                              3)  CUSTOM ELEMENT NE SME BITI SELF-CLOSING
//                                  DAKLE U OBZIR DOLAZE SAMO DVOSTRUKI TAGOVI
//                                  (MORA SE SASTOJATI IZ OPENING I IZ CLOSING TAGA)
//



////////////////////////////////////PRIMERI////////////////////////////////////////////////////////////
//
//////////////////////////app-drawer///////////////////////////////////////////////////////////////////
//


class AppDrawer extends HTMLElement {

    //OBJASNICU OPET I GETTERE I SETTERE, IAKO TO NIJE TEMA OVIH BELESKI 
    //GETTER ZA open PROPERTI
    //AKO JE PROPERTI DEFINISAN return-OVACE BOOLEAN true
    get openProp(){
        return this.hasAttribute('open');
    }

    //SETTER ZA open PROPERTI
    //BILO KOJA VREDNOST SE DODELI SETTER-U (JER U SLUCAJU GETTER-A, IAKO SINTAKSA IZGLEDA KAO ASSIGNMENT
    //GETTER-U, A USTVARI SE VREDNOST PROSLEDJUJE SETTER FUNKCIJI, KOJA S NJOM RADI ONO STO SAM DEFINISAO) 
    //U OVOM SLUCAJU SETTER DEFINISE ATRIBUT CUSTOM ELEMENTA, I U ODNOSU NA TO toggle-UJE ELEMENT
    //TO toggle-OVANJE SE VEROVATNO ODNOSI NA DEFINISANJE CSS display PROPERTIJA
    //NAIME, AKO JE VREDNOST DATA SETTERU, USTVARI VREDNOST KOJA JE TRUTHY, ONDA CE CUSTOM ELEMENTU
    //BITI DODAT ATRIBUT, SA IMENOM open
    set openProp(vrednost){    //ime setter-a ali i gornjeg getter-a, trebalo je da bude ----open   ali ja sam ga tako zadao iz razloga da lakse citam, odnosno lakse review-ujem ovaj code  
        if(vrednost){
            this.setAttribute('open', '');      //ZADAO SAM DA JE VREDNOST ATRIBUTA, USTVARI PRAZAN STRING
                                                //KADA SE OVAKO DEFINISE ATRIBUT, REC JE O BOOLEAN
                                                //ATRIBUTU, CIJE PRISUSTVO U TAGU, USTVARI ZNACI DA JE
                                                //open USTVARI true
        }else{
            this.removeAttribute('open');       //AKO SE SETTER-U NE DODELI VREDNOST, ODNOSNO AKO MU SE
                                                //DAJE VREDNOST, KOJA JE FALSY, ONDA SE open ATRIBUT
                                                //UKLANJA IZ TAGA
        }

        this.toggleDrawer();                   
    }

    //POSTO SAM ZA open PROPERTI ILI ATRIBUT DAO GORE, MOZDA I, SUPERFLUOUS OBJASNJENJE NECU TO RADITI
    //U SLUCAJU GETTER-A I SETTER-A, disabled PROPERTIJA, ODNOSNO ATRIBUTA
    get disabled(){
        return this.hasAttribute('disabled');
    }

    set disabled(val){
        if(val){
            this.setAttribute('disabled', '');
        }else{
            this.removeAttribute('disabled');
        }
    }

    constructor(){
        super();    //POZIVANJE KONSTRUKTORA KLASE IZ KOJE CUSTOM ELEMENT INHERITS ILI EXTENDS
                    //TO DAJE INSTANCI CUSTOM ELEMENTA, UPRAVO PROPERTIJE, KOJE IMA OBJEKAT, KOJI JE
                    //PROTOTIP OBJEKAT, INSTANCE AppDrawer
                    //REC JE O OBJEKTU, ODNOSNO INSTANCI HTMLElement KLASE KOJU, AppDrawer, USTVARI extends
                    //A TA INSTANCA JE I __proto__ SVAKOJ AppDrawer INSTANCI

        this.addEventListener('click', e => {       //KACENJE LISTENERA U SLUCAJU, KOJI CE BITI 
                                                    //INVOKE KADA SE TRIGGERUJE KLIK EVENT NA
                                                    //CUSTOM ELEMENTU
                                                    //A ON OSTO SAM DEFINISAO, JESTE DA TIME BUDE POZVANA I
                                                    //toggleDrawer METODA, ALI AKO ELEMENT NEMA disabled
                                                    //ATRIBUT
            if(this.disabled){
                return;
            }
            this.toggleDrawer();

            console.log("AppDrawer instantiated");
        });
    }

    toggleDrawer(){
        const display = window.getComputedStyle(this).display;
        let displayVal;
        displayVal = (display === 'none'||'')?'block':'none';
        this.style.display = displayVal;
    }

}


window.customElements.define('app-drawer', AppDrawer);      //REGISTRUJEM CUSTOM ELEMENTA

const appDrawerOb = document.createElement('app-drawer');     //AppDrawer INSTANCA
/////////////////////"POGRESNO" KREIRANJE INSTANCE (KONSTRUKTOR CE BITI POZVAN JEDINO DEFINSANJEM
////////////////////CUSTOM ELEMENTA DIREKTNO U HTML FAJLU), OVO MORAM DODATNO ISPITATI
////////////////////MISLIM DA ODGOVOR TREBA POTRAZITI U KORISCENJU LIFECYCLE CALLBACK-OVA


//NEKE PROVERE  //////////////////////////////////////////////////////////////////////////////////////

console.log(appDrawerOb);
console.log(1,      appDrawerOb instanceof AppDrawer                    );   //-->  1 true
console.log(2,      appDrawerOb.__proto__ instanceof HTMLElement        );   //-->  2 true
console.log(3,      HTMLElement.prototype.isPrototypeOf(appDrawerOb)    );   //-->  3 true
console.log(4,      AppDrawer.prototype.isPrototypeOf(appDrawerOb)      );   //-->  4 true
console.log(5,      AppDrawer.prototype === appDrawerOb.__proto__       );   //-->  5 true

console.log("A",    HTMLElement.prototype !== appDrawerOb.__proto__     );          //-->   A  true (ALI)
console.log("B",    HTMLElement.prototype.isPrototypeOf(AppDrawer.prototype ));     //-->   B true
console.log("Љ",    HTMLElement.prototype !== AppDrawer.prototype       );      //-->   Љ  true
console.log("a",    HTMLElement.prototype.constructor                   );   //-->   a  f HTMLElement
console.log("b",    appDrawerOb.__proto__.constructor                   );   //-->   b  class AppDrawer   


console.log(    HTMLElement.prototype.__proto__ === Element.prototype   );     //-->  true

console.log(        AppDrawer.prototype instanceof HTMLElement      );         //-->  true 

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////NAKON OVIH PROVERA, ZAKACICU, MOJ CUSTOM ELEMENT NA DOM TREE

const koren = document.getElementById("root");

koren.appendChild(appDrawerOb);
appDrawerOb.innerHTML = "Neki tekst";       //I SADA MOGU VIDETI, DEFINISANI TEKST NA WEB STRANICI

//SADA CU KORISTITI SETTER-E I GETTER-E 
//A IZMEDJU NJIHOVE UPOTREBE POSMATRACU STA SE DOGADJA NA STRANICI, ALI I U 'Elements' SEKCIJI CHROME-A

console.log(appDrawerOb.openProp)           //U KONZOLI BI TREBALO DA SE STAMPA false
                                            //KAD POGLEDAM DEFINICIJU POMENUTOG openProp GETTER-A
                                            //BICE MI JASNO ZASTO

//SADA CU KORISTITI JEDAN OD SETTER-A

appDrawerOb.openProp = "ovo nije falsy vrednost";
                                    //TREBALO BI DA MOJ ZAKACENI CUSTOM ELEMENT DOBIJE SLEDECI STIL:
                                                                        //      display: none
                                    //ZASTO JE TAKO, MOGU SHVATITI KAD POGLEDAM DEFINICIJU GETTER-A
                                    //ZNACI, CUSTOM ELEMENT, NIJE VISE PRIKAZAN NA STRANICI

//A AKO POGLEDAM Elements SEKCIJU CHROME-A, VIDECU DA ZAKACENI <app-drawer></app-drawer> TAG IMA 
//BOOLEAN ATRIBUT       open        , A ZASTO GA IMA MOGU SHAVATITI, KADA OPET POGLEDAM CODE
//openProp SETTER-A, AppDrawr KLASE
//NARAVNO IMA, TAKODJE I POMENUTI open BOOLEAN ATRIBUT, PORED style ATRIBUTA, SA ODGOVARAJUCOM VREDNOSCU (KAO 
                                                //POSLEDICA IZVRSENJA   toggleDrawer      METODE)

//SADA CU DA UCINIM DA ELEMENT, BUDE PONOVO PRIKAZAN, TAKO STO CU PONOVO KORISTITI, ISTI SETTER

appDrawerOb.openProp = "";  //obrati paznju da je ovo FALSY vrednost 

//KAO POSLEDICA OVOGA, ELEMENT JE PONOVO DISPLAY-OVAN, ODNOSNO, ON I DALJE IMA style ATRIBUT, KOJI SADA
//IMA SLEDECE KARAKTERISTIKE    display: block
//MEDJUTIM, ELEMENT VISE NEMA open BOOLEAN ATRIBUT


//SADA ONO STO ZELIM DA URADIM, JESTE DA KORISTIM disabled SETTER
//UPRAVO NA NACIN, KOJI JE DEFINISAN OVAJ SETTER, AKO MALO POGLEDAM NJEGOV CODE I AKO RAZMISLIM
//VIDECU DA OVAJ ATRIBUT UPRAVO REGULISE DA LI CE INVOKACIJOM EVENT ("click") LISTENERA BITI 
//INVOCIRANA I toggleDrawer METODA

// ZA disabled SETT-OVACU, PRVO truthy VREDNOST

appDrawerOb.disabled = true;

//POKUSACU SADA DA KLIKNEM NA MOJ CUSTOM ELEMENT, PRIKAZAN NA STRANICI
//KLIKTANJE NEMA EFEKTA, ELEMENT NE NESTAJE

//SETOVACU disabled SETTER, NA falsy VREDNOST

appDrawerOb.disabled = false;

//POKUSACU SADA DA KLIKNEM NA MOJ CUSTOM ELEMENT, PRIKAZAN NA STRANICI
//KLIKNUCU NA, MOJ CUSTOM ELEMENT, PRIKAZAN NA STRANICI
//I ON JE OVOG PUTA ZISTA NESTAO (display: none JE PRIMENJEN)

//NASTAVICU SADA SA OBJASNJENJIMA

//////////////////////////////////////////DVA TIPA CUSTOM ELEMENATA
        //  AUTONOMNI CUSTOM ELEMENTI
// NE NASLEDJUJU IZ STANDARDNIH HTML ELEMENATA
//OVAKVI ELEMENTI SE PROSTO KORISTE PISAJUCI IH, ODNOSNO UNOSECI IH U HTML NA KLASICAN NACIN
//NAPISAO SAM TAKV JEDANU HTML FAJLU, KOJI SE ZOVE, ODNOSNO KOJEM SAM DAO IME       <pop-up></pop-up>
//A MOGAO SAM GA KREIRATI I NA SLEDECI NACIN    document.createElement('pop-up') PA TEK KASNIJE OKACITI U DOM
        //CUSTOMIZED built-in ELEMENTI
//ONI NASLEDJUJU OD OSNOVNIH HTML ELEMENATA
//KAKO BI KREIRAO OVE, MORAM DA SPECIFICIRAM, KOJE TO ELEMENTE, ONI USTVARI extend , KAO STO SAM
//I PRIKAZAO U PRIMERU (AppDrawer)
//ONI SE KORISTE TAKO STO SE ISPISE OSNOVNI ELEMENT, ALI SE SPECIFICIRA IME CUSTOM ELEMENTA
//A SPECIFICIRA SE KAO VREDNOST       is      PROPERTIJA, ARGUMENT OBJEKTA document.createElement
//METODE, NA SLEDECI NACIN

document.createElement('p', {is: "word-count"});
//A MOZE DIREKTNO U HTML-U (STO SAM I URADIO, U HTML FAJLU)

///////////////////////////////////PRIMERI VEZANI ZA OVA DVA TIPA ELEMENATA

////////////////PRIMER ZA       AUTONOMNI CUSTOM ELEMENT 
//
//CUSTOM ELEMENT KOJI CU DEFINISATI ZVACE SE popup-info-box
//ONO OD CEGA CE SE SASTOJATI JESTE IMAGE ICON I TEKSTUALNI STRING
//KADA IKONA BUDE FOCUSED, TREBA DA SE DISPALAY-UJE POMENUTI TEKST U POP-UP INFORMATION BOX-U
//KAKO BI SE PRUZILE DODATNE INFORMACIJE, KORISNIKU U ZAVISNOSTI OD KONTEKSTA

class PopUpInfo extends HTMLElement {
    constructor(){
        super();
        //DALJE U KONSTRUKTORU DEFINISEM FUNKCIONALNOST
        //PRVO ZELIM DA BUDUCA INSTANCA IMA ZAKACEN, ODNOSNO NESTED shadow root
        //A ZELIM I DA IMAM REFERENCU NA TU     shadowDOM   INSTANCU

        const senka = this.attachShadow({mode: "open"});
        //mode ZADAJEM DA JE open, DA BIH MOGAO KASNIJE PRISTUPITI POMENUTOJ shadowDOM INSTANCI
        
        //ZELIM DA BUDU KREIRANA TRI span ELEMENTA
        const omotac = document.createElement('span');
        const ikona = document.createElement('span');
        const info = document.createElement('span');

        //ZELIM DA BUDE KREIRANA I JEDAN    img     ELEMENT
        const image = document.createElement('img');

        //KREIRACU I JEDNU VARIJABLU, KOJOJ BI TREBALO DA SE KASNIJE DODELI URL SLIKE
        let imgUrl;

        //DEFINISACU DODAVANJE NEKIH ATRIBUTA, POMENUTIM span ELEMENTIMA, VECINOM   class   ATRIBUTA
        info.setAttribute('class', 'info');
        omotac.setAttribute('class', 'wrapper');
        ikona.setAttribute('class', 'icon');
        ikona.setAttribute('tabindex', 0);          //OVIM ATRIBUTOM SE MORAM POZABAVITI POSEBNO
                                                    //NAIME OVO DEFINISE DA, KADA SE PRITISNE TAB NA TASTATURI
                                                    //BUDE FOKUSIRAN ELEMENT, A U ZAVISNOSTO OD DOELJENOG BROJA ATRIBUTU
                                                    //DEFINISAN JE I REDOSLED FOKUSIRANJA, TAKO DA PRVIM PRITISKOM TABA                                                    
                                                    //U SLUCAJU OVOG PRIMERA PRVI CE BITI FOKUSIRAN UPRAVO OVAJ
                                                    //ELEMENT;  DA SAM DEFINISAO ZA NEKI ELEMENT tabindex
                                                    //KOJI BI IMAO VREDNOST 1, ONDA BI SLEDECIM PRITISKOM TABA, 
                                                    //BIO FOKUSIRAN UPRAVO TAJ ELEMENT
        
        //DEFINISATI DA SE MOGUCEM      data-text       ATRIBUTU CUSTOM ELEMENTA 
        //                          (CIJE DEFINISANJE GORE, KAO STO SE I VIDI NISAM DEFINISAO) 
        //PRISTUPI VREDNOSTI, I DA TU VREDNOST DOBIJE       textContent     PROPERTI    span    ELEMENTA
        //KOJEG SKLADISTI GORE DEKLARISANA info VARIJABLA
        //UPAMTI DA OVDE NECU KLORISTITI    Node.innerHTML  JER MI NE TREBA HTML (SAMO IME PROPERTIJA 
                                                                            //NAZNACAVA DA JE REC O HTML-U)
        //KORISTICU PROPERTI SA KOJIM SE DO SADA NISAM SUSRETAO, A TO JE:
                   //             textContent


        console.log(this.getAttribute("data-text"));

        info.textContent = this.getAttribute("data-text");

        //AKO MOJ CUSTOM ELEMENT IMA ATRIBUT    img     POTREBNO JE PRISTUPITI NJEGOVOJ VREDNOSTI
        //I TU VREDNOST TREBA DODELITI  imgUrl  VARIJABLI, JER BI TREBALO DA img ATRIBUT SKLADISTI
        //URL NEKE SLIKE (ZELJENA IKONICA)
        //U SUPROTNOM,      imgUrl  TREBA DA SKLADISTI ADRESU DEFAULT SLIKE

        if(this.hasAttribute('img')){
            imgUrl = this.getAttribute('img');
        }else{
            imgUrl = './img/default.ico';
        }

        //SADA MOGU DEFINISATI DA SLIKA (KOJU SKLADISTI image VARIJABLA), DOBIJA ADRESU, UZ POMOC, NJENOG
        //src ATRIBUTA, ODNOSNO PROPERTIJA

        image.src = imgUrl;


        //if(this.hasAttribute('img') && )

        //span ELEMENT, KOJEG SKLADISTI ikona VARIJABLA TREBA DA DOBIJE SLIKU, KAO NJEN NESTED ELEMENT

        ikona.appendChild(image);

        //KREIRACU I JEDAN style ELEMENT
        //ZASTO?    PA ZATO STO ZELIM DA DEFINISEM NEKE STILOVE, KOJI CE BITI APLICIRANI NA ELEMENTIMA SHADOW DOM-A

        const stilovi = document.createElement('style');
        //SADA MOGU DEFINISATI      textContent     PROPERTI, OVOG style ELEMENTA, ODNOSNO style TAGA,
                                                                            //ODNOSNO Node ELEMENTA
        //DAKLE, ZELIM DA DEFINISEM STILOVE I ZA .wrapper, I ZA .icon , I ZA .info KLASE
        //KORISTICU TEMPLATE STRING, ODNOSNO    textContext     PROPERTIJU CU ASSIGN-OVATI TEMPLATE
        //STRING KAO VREDNOST, DA BIH MOGAO DA DEFINISEM STILOVE (CSS SELECTORE) U VISE REDOVA, ZATO DA
        //NE BIH MORAO DA KORISTIM OBICAN STRING, JER TADA AKO ZELIM CODE U VISE REDOVA, MORAM TO
        //PRATITI SA CONCATENATION-OM
        stilovi.textContent = `
            .wrapper {
                position: relative;
            }

            .info {
                font-size: 0.8rem;
                width: 80vw;
                display: inline-block;
                padding: 8px;
                background-color: seashell;
                border: pink solid 2px;
                border-radius: 8px;
                opacity: 0;            /*POTPUNO PROZIRAN*/
                transition: 0.6s all;
                position: absolute;   /*APSOLUTNO POZICIONIRAN*/
                bottom: 20px;         /*NALAZICE SE, ZA DUZINU 20px OD DONJE IVICE SVOG PARENTA, KA GORE; ODNOSNO DO SVOJE DONJE IVICE DO PARENDOVE DONJE IVICE DUZINA CE BITI 20px*/
                left: 10px;           /*10 PIKSELA CE BITI POMEREN U DESNO; OD LEVE IVICE PARENTA DO SVOJE LEVE IVICE BICE RAZMAK OD 10px*/
                z-index: 3;           /*OSIGURANJE DA NECE BITI PREKLOPLJEN DRUGIM ELEMENTIMA*/
            }                          /*DA BI ON BIO POZICIONIRAN NA POMENUTI NACIN, NJEGOV PARENT MORA DA BUDE POZICIONIRAN ABSOLUTNO ILI RELATIVNO (I JESTE)*/

            img {
                width: 1.2rem;
            }

            .icon:hover + .info, .icon:focus + .info {      /*HOVER-OM ILI FOCUS-OM PREKO IKONICE NJEN SIBLING, KOJI SLEDI NAKON IKONICE, I KOJI IMA KLASU .info; POSTACE NEPROZIRAN*/
                opacity: 1;
            }
        `;

        //SADA style TAG, ODNOSNO HTMLElement, KOJI OBUHVATA STILOVE KOJA SAM DEFINISAO, MOGU DA APPEND-UJEM, U SHADOW DOM
        senka.appendChild(stilovi);
        //DA BIH DEFINISAO PROVERU DA JE POMENUTI ELEMENT ZAISTA ZAKACEN U SHADOW DOM, KORISTICU  Node.isConnected PROPERTI
        //POMENUTI PROPERTI CE return-OVATI true AKO JE ELEMENT ZAKACEN NA SHADOW DOM (STO CE OVDE BITI SLUCAJ), ILI ZAKACEN NA document
        console.log(stilovi.isConnected);
        //SADA CU APPENDOVATI, PRVO IKONICU ELEMENT PA INFO ELEMENT, U WRAPPER ELEMENT
        omotac.appendChild(ikona);
        omotac.appendChild(info);
        //PA CU OMOTAC APPEND-OVATI U SHADOW DOM
        senka.appendChild(omotac);
        

        console.log('****KONSTRUKTOR INVOCIRAN****');
    }

    //NEKE MOJE PROVER, ZA SADA NE OBRACAJ PAZNJU NA OVE SETTER-E I GETTER-E
    /*get text(){
        return this.hasAttribute('data-text');
    }

    get adresa(){
        return this.hasAttribute('img');
    }
    
    set text(vrednost){
        if(this.hasAttribute('data-text')){
            this.setAttribute('data-text', vrednost);
        }
    }

    set adresa(vrednost){
        if(this.hasAttribute('img')){
            this.setAttribute('img', vrednost);
        }
    }*/
}

//SADA CU DEFINISATI, NOVI CUSTOM ELEMENT
window.customElements.define('pop-up-info', PopUpInfo);

//POSTO SAM, PONOVO PROSTUDIRAO CODE PopUpInfo KLASE, KONKRETNO data-text ATRIBUT, MOGU ZAKLJUCITI
//DA SE OVIM ATRIBUTOM POSTIZE, UPRAVO NESTO STO ME PODSECA NA PROPS IZ React-A 
const popUpInfoElement = document.createElement("pop-up-info");

popUpInfoElement.setAttribute("data-text", "bla bla bla");
popUpInfoElement.setAttribute("img", './icon.png');


document.getElementById('root').appendChild(popUpInfoElement);

console.log(popUpInfoElement);

document.getElementsByTagName('pop-up-info')[0].setAttribute('data-text', "ovaj tekst tekst tekst");
////POSLEDNJI RED CODE-A, UOPSTE NEMA EFEKTA
////////////////////////////////////////////////////////////////////////////////////////////////////////
//      CODE SA SLIKE GORE, ODNOSNO OVAKVO ('NAKNADNO') DEFINISANJE ATRIBUTA NECE DATI NIKAKAVOG EFEKTA,
//      MISLIM NA NAKNADNO DEFINISANJE ATRIBUTA, KAO STO SAM TO URADIO
//      (A ONO STA SAM OTKRIO JESTE DA define METODA,
//      KONSTRUKTORA CUSTOM ELEMENTA, USTVARI POZIVA PRILIKOM KREIRANJA INSTANCE ILI NJENOG UPDATE-A), 
//      A ZNAM DA SE, U SLUCAJU OVOG PRIMERA KONSTRUKTOR IZVRSAVA
//      SAMO ONDA KADA SE KREIRA    PopUpInfo   INSTANCA
//      JER NEMA NIKAKVOG UPDATE-A
//          
//      ODNOSNO AKO SE PROUCI KADA SVE TO PARSER POZIVA constructor (KAO ONO STO SE DOGADJA KAO
//      POSLEDICA KAKO SU, USTVARI KREATORI WEB KOMPONENTI DEFINISALI define METODU)
//      JA U SLUCAJU MOG PRIMERA, MOGU SHVATITI DA SE KONSTRUKTOR POZIVA SAMO JEDNOM
//      A U TOM SLUCAJU 
//              data-text ATRIBUT NE POSTOJI, KAO ATRIBUT CUSTOM ELEMENTA
//              (AKO BUDEM DEFINISAO NJEGOVO STAMPANJE, VIDECU DA JE NJEGOVA VREDNOST null)
//
//              img ATRIBUT IMA VREDNOST, KOJA JE USTVARI RELATIVNA ADRESSA DO DEFAULT SLIKE
//
//ZATO, MOGU DODELITI ZELJENE VREDNOSTI ATRIBUTA DIREKTNO U HTML-U, A NE MOGU JAVASCRIPT-OM
//
////////////////////////////////////////////////////////////////////////////////////////////////////////
//                  ODGOVOR NA OVO CU POTRAZITI U KORISCENJU LIFECYCLE CALLBACK-OVA

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////CUSTOM ELEMENT REACTION (REAKCIJE)////////////////////////
//////////////////////////MOGU IH TAKODJE ZVATI I LIFECYCLE HOOKS, KAO STO SU ONE U REACT-U/////////
/////////////////////////ILI KAO STO IH ZOVU NA MDN-U, ----->  LIFECYCLE CALLBACKS ////////////
//NABROJACU SADA KOJI SU TO LIFECYCLE HOOK-OVI /////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
/////////      1)     constructor       INVOCIRA SE KADA SE KREIRA INSTANCA ELEMENTA, ILI KADA SE       
////////                                INSTANCA ELEMENTA UPGRADE-UJE
////////                 KORISNO ZA:    a)  INICIJALIZACIJU state-A (STANJA)
////////                                b)  KACENJE EVENT LISTENERA
////////                                c)  KREIRANJE shadow dom-A
////////                               
////////       2)     connectedCallback     POZIVA SE SVAKI PUT KADA SE ELEMENT INSERTUJE U DOM                       
////////                                
////////                 KORISNO ZA:    a)  FETCHING RESURSA ZA RENDER-OVANJE
////////                                b)  I OSTALI SETT UP CODE
////////                                
////////       3)     disconnectedCallback   POZIVA SE SVAKI PUT NAKON UKLANJANJA ELEMENTA IZ DOM-A                  
////////                 
////////                 KORISNO:       ZA POKRETANJE CLENUP CODE-A               
////////
////////       4)     attributeChangedCallback(imeAtributa, staraVrednost, novaVrednost)
////////
////////              OVAJ CALLBACK SE INVOCIRA, KADA SE DOGADJA NESTO SA OBSERVED (ONAJ KOJI SE POSMATRA)
////////              ATRIBUTOM (DA BIH OVO ZNAO MORAM SE PODSETITI STATICKIH METODA JEDNE KLASE, STO CU
////////              I URADITI VRLO USKORO)
////////              A STA SE TO MOZE DOGADJATI SA OBSERVED ATRIBUTOM:  
////////                    ON SE MOZE dodati, ukloniti, update-ovati, ili zameniti
////////              OVA METODA SE TAKODJE POZIVA ZA INICIJALNE VREDNOSTI, KADA SE CUSTOM ELEMENT
////////              KREIRA OD STRANE parser-A, ILI KADA SE UPGRADE-UJE
////////              (MNOGO SPOMINJEM UPGRADE-OVANJE ELEMENATA, TAKO DA CU SE TIME POSEBNO POZABAVITI, VRLO USKORO)
////////        
////////              BROWSER POZIVA POMENUTI CALLBACK ZA SVAKI ATRIBUT, KOJI JE whitelisted U SLEDECEM       
////////              NIZU:         observedAttributes
////////                (JA CU SE USKORI POZABAVITI POMENUTIM CALLBACK-OM, I POMENUTIM NIZOM)
////////              U SUSTINI, OVO JE PERFORMANCE OPTIMIZATION
////////              KADA KORISNIK PROMENI NEKI COMMON ATRIBUT, KAO STO JE TO style ILI class,
////////              NE BI TREBAL ODA SE DOGODI SPAMMOVANJE, KOJE SE OGLEDA U INVOKACIJI TONE
////////              CALLBACK-OVA
////////        5)    addoptedCallback      INVOCIRA SE KADA CUSTOM ELEMENT BIVA POMEREN U NOVI
////////                                                                                    document  
////////               ZA OVO JE NEOPHODNO DA POGLEDAM JEDNU METODU SA KOJOM SE RANIJE NISAM BAVIO
////////               TO JE        document.adoptNode      METODA
////////                https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptNode
////////
////////    REACTION CALLBACKOVI, ILI KAKO IH DRUGI ZOVU LIFECYCLE CALLBACK-OVI, JESU SINHRONI
////////    AKO NEKO POZOVE         el.setAtribute()    NA MOM CUSTOM ELEMENTU, BROWSER CE ODMAH ZVATI
////////    POMENUTI        attributeChangedCallback    (AKO JE ATRIBUT OBSERVED)
////////    ISTO TAKO ODMAH NAKON SE MOJ ELEMENT UKLONI IZ DOM-A (POZIVANJEM NA PRIMER el.remove()) 
////////    BROWSER  CE POZVATI disconnectedCallback 
////////
////////        MISLIM DA JE OVA POSLEDNJA RECENICA, KOJA SE TICE   attributeChangedCallback    -A
////////        JESTE KRUCIJALNA ZA MOJ NEUSPEH U PREDHODNOM PRIMERU, GDE SU PRILIKON INSTANTIATION-A
////////        ODNOSNO KREIRANJA INSTANCE, JESU SAMO PROSLEDILE ONE DEFAULT VREDNOSTI ATRIBUTA, DO ONIH 
////////        ELEMENATA U SHADOW DOM-U
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////
////////        PONOVO CU PREKOPIRATI CELU MOJU KLASU KOJU SAM DEFINISAO, DAKLE SASTOJACE SE OD ISTOG CODE-A
////////        ALI OVOG PUTA CE IMATI DRUGO IME
////////
////////    OVO RADIM ZBOG FRESH STARTA, JER SAM FLOOD-OVAO CEO OVAJ DOKUMENT SA COMMENTED OUT TEKSTOM
////////    TAKO DA MI JE MALO TESKO DA SE ORGANIZUJEM
////////
console.log("**************************************************************************************************************************************************************************");
////DAKLE, NOVA KLAS SA ISTIM CODE-OM, KAOI I PREDHODNA CE NOSITI IME       DescriptionImage
/////////////////////////////////I ONO STO MORAM POZNAVATI A STO SAM U MEDJUVREMENU I POGLEDAO JESTE
//                                    shadowDom 
//          ODNOSNO POGLEDAO SAM NJEGOV __proto__ OBJEKAT I METODE I VODEO DA MOGU PRISTUPATI NJEGOVIM ELEMENTIMA
//          TO SAM U OVOM PRIMERU I URADIO
//          NAIME, JA SAM DEFINISAO DA SE POSMATRA PROMENA DVA ATRIBUTA CUSTOM ELEMENATA
//      DA VIDIS KOJE ATRIBUTE SAM "OZNACIO" ZA OBSERVED, POGLEDAJ  STATICNI GETTER, KOJI SAM DEFINISAO
//      KAO METODU KLASE, A REC JE O METODI

//                      static get observedAttributes
// ONO STO SE MORA DEFINISATI KAO POVRATNA VREDNOST OVE METODE JESTE NIZ, CIJE SU VREDNOSTI CELIJA, UPRAVO
// ATRINGOVI IMENA, ONIH ATRIBUTA, ZA KOJE ZELIM DA SE POSMATRAJU, ODNOSNO BUDU OBSERVED
//          SVAKI PUT KADA SE PROMENI NEKI OD OBSERVED ATRIBUTA POZIVA SE
//     
//                                  attributeChangedCallback                  
// 
//      KAO STO SE MO0ZE VIDETI U NJEGOVOM OBIMU (U CODE-U DOLE) JA SAM PRISTUPIO shadowRoot-U
//      I MENJAO KARAKTERISTIKE, NJEGOVIH ELEMENATA, U ODNOSU NA VREDNOST OBSERVED ATRIBUTA
//
class DescriptionImage extends HTMLElement {
    constructor(){
        super();

        const senka = this.attachShadow({mode: "open"});

        const omotac = document.createElement('span');
        const ikona = document.createElement('span');
        const info = document.createElement('span');
        const image = document.createElement('img');
        
        let imgUrl;
        
        imgUrl = './img/default.ico';

        info.setAttribute('class', 'info');
        omotac.setAttribute('class', 'wrapper');
        ikona.setAttribute('class', 'icon');
        ikona.setAttribute('tabindex', 0);

        info.textContent = this.getAttribute("data-text");

        if(this.hasAttribute('img')){
            imgUrl = this.getAttribute('img');
        }
        
        image.src = imgUrl;
        
        ikona.appendChild(image);

        const stilovi = document.createElement('style');
        
        stilovi.textContent = `
            .wrapper {
                position: relative;
            }

            .info {
                font-size: 0.8rem;
                width: 80vw;
                display: inline-block;
                padding: 8px;
                background-color: seashell;
                border: pink solid 2px;
                border-radius: 8px;
                opacity: 0;         
                transition: 0.6s all;
                position: absolute;   
                bottom: 20px;         
                left: 10px;           
                z-index: 3;           
            }                    

            img {
                width: 1.2rem;
            }

            .icon:hover + .info, .icon:focus + .info {      
                opacity: 1;
            }
        `;
        
        senka.appendChild(stilovi);

        console.log(stilovi.isConnected);

        omotac.appendChild(ikona);
        omotac.appendChild(info);
        senka.appendChild(omotac)
        
        console.log('KONSTRUKTOR    DescriptionImage    KLASE   INVOCIRAN');
    }

    attributeChangedCallback(ime, svre, nvre){

        const shadowRoot = this.shadowRoot;

        const wrapper = shadowRoot.children[1];
        const icon = wrapper.firstChild.firstChild;
        const info = wrapper.lastChild;
        
        console.log(ime, svre, nvre);
        console.log(icon, info);
        console.log(shadowRoot);
        
        if(ime === 'img'){
            icon.src = nvre;
        }
        if(ime === 'data-text'){
            info.textContent = nvre;
        }


        console.log("pokusaj pristupa elementu u shadow root-u");
    }

    static get observedAttributes(){
        return ["img", "data-text"];
    }
}

window.customElements.define('description-image', DescriptionImage);

const opisnaSlika = document.createElement('description-image');
//console.log(opisnaSlika);
const korenElement = document.querySelector('.koren');
korenElement.appendChild(opisnaSlika);
opisnaSlika.setAttribute('img', './icon.png');
opisnaSlika.setAttribute('data-text', "react jste framework ili nije, neko kaze da je polimer biblioteka a react framework i tako")

////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
        ///DAKLE GORE SAM DEFINISAO KOJI ATRIBUTI SE POSMATRAJU (UZ POMOC static get observedAttributes), ODNOSNO CIJA PROMENA SE POSMATRA
        ////I KADA SU DEFINISANI ATRIBUTI PROMENJENI, PKRECE SE 


////                attributeChangedCallback            ZA SVAKI OD PROMENJENIH ATRIBUTA

//Definišite reakcije ako / I kada TO IMA SMISLA
// Ako je vaš element dovoljno složen i otvara vezu sa INDEKSOVANOM BAZOM PODATAKA 
//u connectedCallback-U , uradite neophodnu funkciju čišćenja u   disconectedCallback-U
//Ali budite oprezni! Ne možete se osloniti na uklanjanje vašeg elementa iz DOM u svim okolnostima
//Na primer, disconnectedCallback, nikada neće biti pozvan ako korisnik zatvori TAB (KARTICU) WEB STRANICE



///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////NASTAVICU S PRIMERIMA ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////PRIMER ZA CUSTOMIZED BUILT-IN CUSTOM ELEMENT


/////KOD OVIH ELEMENATA DEFINISE SE KLASA, KOJA PROSIRUJE, NE HTMLElement, IZ KOJE SVI POSEBNI BUILT-IN 
//, VEC NEKU DRUGU
///SPECIFICNU KLASU ZA SPECIFICNI BUILT-IN HTML ELEMENT, KAO STO JE     HTMLUListElement
//TO CE UPRAVO MOJU KLASU ELEMNATA ODLIKOVATI KAO KLASU CUSTOMIZED BUILT IN ELEMENATA
//JER ELEMENT CE IMATI KARAKTERISTIKE               HTMLUListElement-A      SA FUNKCIONALNOSCU KOJU
//JA DEFINISEM, SAGRADJENOM NA VRHU, ZA RAZLIK UOD AUTONOMNOG STANDALONE ELEMENTA

//REGISTRACIJA:
// POZIVANJU define METODE SE, PORED STRINGA ZELJENOG IMENA I REFERECE KLASE, DODAJE I OBJEKAT, KOJI IMA extends PROPERTI
//CIJA VREDNSOT TREBA DA BUDE STRING IMENA NATIVE HTML ELEMENTA KOJEG MOJ CUSTOM ELEMENT PROSIRUJE

//KREIRANJE ELEMENTA:
//A KADA SE KREIRA ELEMENT document.createElement  METODI SE DODAJE IME BUILT IN ELEMENTA, ALI PORED NJEGA SE DODAJE
//I DRUGI ARGUMNT, A TO JE OBJEKAT SA PROPERTIJEM is, CIJA VREDNOST ,JESTE IMENOVANJE, MOG CUSTOMIZED ELEMENTA
//A AKO TO RADIM DIREKTNO U HTML-U, ZADAJE SE ATRIBUT       is      SA ISTOM VREDNOSCU

//U SLEDECEM PRIMERU, DEFINISACU KLASU ZA FENSI DUGME KOJE CE EXTEND-OVATI OBICNO DUGME
//ALI CE IMATI UGRADJENO  USEBI DA KLIKOM IZAZOVE TLASASTI EFEKAT NA EKRANU

//PRVO CU DEFINISATI CSS


class FancyButton extends HTMLButtonElement {
    constructor(){
        super();
        this.addEventListener('click', ev => this.drawRipple(ev.offsetX, ev.offsetY));
    }

    drawRipple(x, y){
        const div = document.createElement('div');
        div.classList.add('ripple');
        this.appendChild(div);
        div.style.top = `${y-div.clientHeight/2}px`;
        div.style.left = `${x - div.clientWidth/2}px`;
        div.style.backgroundColor = 'currentcolor';
        div.classList.add('run');
        div.addEventListener('transitioned', e => div.remove());
    }

}

customElements.define('fancy-button', FancyButton, {extends: 'button'});

const fensiDugme = document.createElement('button', {is: 'fancy-button'});
document.getElementById("koren-2").appendChild(fensiDugme);




















//NE OBRACAJ PAZNJU NA OVO, OVO JE PODSECANJE NA GETTER I SETTER
/*const objekat = {
    properti1: 8,
    properti2: "neki string",

    get prop1(){
        return this.properti1;
    },

    set prop1(val){
        this.properti1 = val;
    }
};


console.log(objekat.prop1);

objekat.prop1 = 10;

console.log(objekat.prop1);

console.log(objekat.properti1, objekat.properti2);*/

////////////////////////////////////////////////////////////////////////////////////




///////////////VEZBANJE Web KOMONENTI; NE OBRACAJ PAZNJU NA OVO///////////////////

class NekiElement extends HTMLElement {
    constructor(){
        super();
        const element = document.createElement('div');
        element.innerHTML = "********neki********** tekst************";
        const senka = this.attachShadow({mode: 'open'});
        senka.appendChild(element);
        console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||INSTANCA ZA NEKI ELEMENT NAPRAVLJENA*****IGNORE||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    }
}

window.customElements.define('neki-element', NekiElement);
const nekiElement = document.createElement('neki-element');

document.querySelector('body').appendChild(nekiElement);
/*
console.log(nekiElement instanceof NekiElement);

console.log(customElements.__proto__);
*/



