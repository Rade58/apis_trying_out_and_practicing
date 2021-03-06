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
//ALI CE IMATI UGRADJENO  U SEBI DA KLIKOM IZAZOVE TLASASTI EFEKAT NA EKRANU

//IDEJA JE DA KORISTIM PSEUDO ELEMENT (TO MOZE BITI I ::after, ALI I ::before)
//POKUSACU DA SAV CODE DEFINISEM, DIREKTNO U OVOM JAVASCRIPT FAJLU


class FancyButton extends HTMLButtonElement {
    constructor(){
        super();
    //ZA POCETAK DA DEFINISEM VELICINU DUGMETA

        if(this.hasAttribute("sirina")){
            this.style.width = this.sirina;
        }
        if(this.hasAttribute("visina")){      
            this.style.height = this.visina;
        }
        this.style.backgroundColor = "pink";
        
        //this.classList.add('ripple');

        /*this.setAttribute('data-top', "0px");
        this.setAttribute('data-left', "0px");*/
        
        const stilElement = document.createElement('style');
    
        
        /*stilElement.textContent = this.stiloviF(
            this.getAttribute('data-top'), 
            this.getAttribute('data-left')
        );*/

        this.appendChild(stilElement);


        this.addEventListener("click", ev => {
            this.onClickRipple(ev.offsetX, ev.offsetY);
        });

        this.addEventListener("animationend", ev => {
            ev.target.classList.remove("ripple");
        });

        //this.onClickRipple = this.onClickRipple.bind(this);

    }

    onClickRipple(offsetx, offsety){
        const polaSirine = parseInt((/\d+/gi).exec(this.getAttribute('sirina')))/2;
        const polaVisine = parseInt((/\d+/gi).exec(this.getAttribute('visina')))/2;
        //this.setAttrinute('data-top', );
        console.log(polaSirine);
        const koordX = (offsetx - polaSirine) + "px";
        const koordY = (offsety - polaVisine) + "px";
        /*this.setAttribute('data-left', koordX + "px");
        this.setAttribute('data-top', koordY + "px");*/
        this.classList.add('ripple');
        const stilovi = this.stiloviF(
            koordY, koordX
        );
        this.getElementsByTagName('style')[0].textContent = stilovi;
        
        /*console.log(koordX, koordY);
        console.log(this);
        console.log(window.getComputedStyle(this, "::before").top);*/
    }

    stiloviF(top, left){
        return `
            .ripple {
                //background-color: pink;
                position: relative; /*KAD PODESIM absolute, POMERI SE NADOLE*/
                overflow: hidden;
            }
            .ripple::before {
                //content: "neki tekst";

                
                content: "";
                border: orange solid 0px;
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: ${top};      
                left: ${left};
                margin: auto auto;
                background-repeat: no-repeat;
                background-image: radial-gradient(circle at center, #51db913b 28%, #88ddb0a4 28.1%, transparent 29.2%);
                transform: scale(0,0);
                opacity: 1;
                /*transition: transform 4s, opacity 4s;*/


                animation-name: gradprogress;
                animation-iteration-count: 1;
                animation-duration: 0.8s;

            }

            /*.ripple:focus::before {
                transform: scale(10,10);
                opacity: 0;
            }
            .ripple:visited::before {
                opacity: 0;
            }*/
            /*MOGAO SAM I DVE ANIMACIJE, JEDNU DUZU ZA opacity I JEDNU KRACU ZA scale*/
            @keyframes gradprogress {
                0% {transform: scale(0,0); opacity: 1;}
                50% {opacity: 0.8}
                38% {opacity: 0.78%}
                100% {transform: scale(10, 10); opacity: 0;}
            }
        `;
    }

    //DEFINISACU SETTERE I GETTERE ZA SIRINU I VISINU
    set sirina(novaSirina){
        this.setAttribute('sirina', novaSirina);
    }
    set visina(novaVisina){
        this.setAttribute('sirina', novaVisina);
    }
    get sirina(){
        return this.getAttribute('sirina'); 
    }
    get visina(){    
        this.getAttribute('visina');
    }

    static get observedAttributes(){
        return ["sirina", "visina", "data-left", "data-top"];
    }

    attributeChangedCallback(attributeName, newValue, oldValue){
        console.log("atribut se promenio", attributeName, oldValue, newValue);
        this.style.width = (attributeName === "sirina")?oldValue:this.sirina;
        this.style.height = (attributeName === "visina")?oldValue:this.visina;

    }

    connectedCallback(){
        console.log(window.getComputedStyle(this, "::before").top);
        //this.parentNode.style.overflow = "hidden";
    }

}

customElements.define('fancy-button', FancyButton, {extends: 'button'});

const fensiDugme = document.createElement('button', {is: 'fancy-button'});
//console.log(fensiDugme instanceof FancyButton);
document.getElementById("koren-2").appendChild(fensiDugme);
fensiDugme.setAttribute("sirina", "180px");
fensiDugme.setAttribute("visina", "120px");
console.log(fensiDugme);


//Napomena: Produžavanje HTMLButtonElement obogaćuje moj fancy button sa svim
// osobinama / metodama DOM-a <button>. To proverava gomilu stvari koje ne moramo
// da implementiramo: disabled property, click() metod, keydown listeners,
// upravljanje tabIndex-om. Umesto toga, moj fokus može biti progresivno povećavanje
// <button> -  A pomoću prilagođene funkcionalnosti, odnosno metode onClickRipple 
// Manje koda, više reuse-A

fensiDugme.setAttribute('disabled', 'disabled');    //BOOLEAN ATRIBUT SE MOZE I OVAKO PODESITI
//A MOZE I OVAKO
fensiDugme.disabled = false;

//JOS JEDNA BITNA STVAR JESTE NA SE INSTANCE, I AUTONOMNIH CUSTOM ELEMENATA, AI CUSTOMIZED BUILT-IN 
//ELEMENATA MOGU KREIRATI POZIVANJEM KONSTRUKTORA, UMESTO METODOM     document,createElement

const drugoFensiDugme = new FancyButton();
const descIm = new DescriptionImage();
console.log(drugoFensiDugme, descIm);



////////////
////////////        NOVI PRIMER CUSTOMIZED BUILT-IN ELEMENTA
//////////// 
////////////    SLIKA KOJA RENDER-UJE VECU SLIKU NOEGO BUILT-IN KLASICNI img ELEMENT
////////////

//////////////PRE NEGO STO POCNEM DEFINISANJE, NAPOMENUCU, JEDNU STVAR O KOJOJ RANIJE NISAM RAZMISLJAO
///////A TO JE DA I KLASA MOZE BITI ANONIMNA

/////ZATIM SE MOGU PODSETITI I DEFAULT PARAMETARA NEKE FUNKCIJE, ODNOSNO KAKO NJIHOVA SINTAKSA IZGLEDA


/////POSTO SAM TO URADIO DEFINISACU CUSTOMIZED BUILT-IN ELEMENT
/////ZELIM CUSTOMIZED ELEMENT, KOJI RENDER-UJE DESET PUTA VECU SLIKU OD NORMALNE, A AKO SLICI NISU 
////NI PODESENI ATRIBUTI width I height, POSTOJACE I DEFAULT VREDNOSTI, KOJE BI SE ONDA
////MNOZILE SA DESET DA BI SE DOBILA SLIKA VELIKIH DIMENZIJA

//OVDE CU ISKORISTITI       Image       KONSTRUKTOR CIJIM IZVRSENJEM SE KREIRA  HTMLImageElement
//KADA SE POZIVA, POMENUTI KONSTRUKTOR, DODAJU MU SE SIRINA I VISINA KAO ARGUMENTI

///PRE NEGO STO POCNEM, MORAM RECI SLEDECE
//OVAKO SE MOZE KREIRATI    HTMLImageElement INSTANCA

const nekaSl = new Image(200, 120);

// ALI OVAKO NE MOZE
//                      new HTMLImageElement();        //DALO BI OVKAV TypeError: Illegal constructor
//
//DO HTMLImageElement INSTANCE MOGU DOCI I NA SLEDECI, VEC POZNAT NACIN

const nekaDrugaSl = document.createElement('img');

console.log(nekaSl instanceof HTMLImageElement, nekaDrugaSl instanceof HTMLImageElement);   // true true

//POGLEDACU JOS MALO STRUKTURU PROTOTIPOVA, KLASA, KAO STO SU HTMLElement, HTMLImageElement, Image
console.log(HTMLElement.prototype);
console.log(HTMLImageElement.prototype);                //      HTMLImageElement   
console.log(Image.prototype);                           //      HTMLImageElement 

//NAKON GORNJE PROVERE VIDEO SAM DA OBE KLASE DELE ISTI PROTOTIP
console.log(HTMLImageElement.prototype === Image.prototype);    //      true      

////////

/////DAKLE      Image       FUNKCIJA           PROSIRUJE       HTMLIMageElement    KLASU   
/////ON OSTO ZNAM JESTE DA JE PROSIRUJE ZA MOGUCNOST DIREKTNOG, U JAVASCRIPTU DEFINISANJA SIRINE I VISINE
///<img> ELEMENTA, KOJI JE INSTANCIZIRAN POZIVANJEM, POMENUTOG KONSTRUKTORA
///POSTO SE         NJEGOVIM      DIREKTNIM POZIVANJEM (Image-KONSTRUKTORA), KRIRA INSTANCA
////    HTMLImageElementKlase
///VERUJEM DA SE IZA KULISA SLEDECEG POZIVANJA      new Image(20, 80)       KRIJE POZIVANJE

////            document.createElement('img', {is: neki string koji "ukazuje" na Image})   
////
///OVO ME NAVODI DA KAZEM DA JE Image FUNKCIJA, UPRAVO FUNKCIJA, KOJOM SE KREIRA CUSTOMIZED
//BUILT-IN img ELEMENT
//ALI SAM SAZNAO DA JE ONA TAKODJE HOST ELEMENT (MORAM DODATNO ISPITATI, HOST SU TAKODJE window, document i console)

class SpecialImage extends Image {
    constructor(width = 280, height = 140){     //AKO SE NE DODA ARGUMENT PRILIKOM POZIVANJA KONSTRUKTORA, OBEZBEDJENE SU DEFAULT VREDNOSTI
        super(width * 10, height * 10);     //SIRINA I VISINA NOVOG CUSTOMIZED IMAGE ELEMENTA, CE UVEK BITI 10
    }                                       //PUTA VECE, OD ONIH VREDNOSTI SIRINE I VISINE DODATIH KAO ARGUMENTI KONSTRUKTORU
}

///MEDJUTIM, NISAM JOS REGISTROVAO, NOVI CUSTOMIZED BUILT-IN HTMLImageElement

window.customElements.define('special-image', SpecialImage, {extends: 'img'});


//POVRATNA VREDNOST customelements.get METODE JESTE KONSTRUKTOR, ZA PREDHODNO DEFINISANI CUSTOM ELEMENT

const SpecialImageConstructor = window.customElements.get('special-image');

console.log(SpecialImageConstructor);

//KREIRANJE INSTANCE Customized HTMLImageElement-A
const specialSlikaEl = new SpecialImageConstructor(58, 58);

document.getElementById('some_koren').appendChild(specialSlikaEl);

specialSlikaEl.src = './img/default.ico';

console.log(document.getElementsByTagName('img'));

/////////////       OSTAJE MI DA PROBAM OVAKAV PRINCIP, U SLUCAJU EXTENDINGA KONSTRUKTORA, KOJI NE 
//////              REPREZENTUJE HOST OBJEKTE KAO STO SU 

                            ////        Image           Form        Element

//////MEDJUTIM, MISLIM, USTVARI ZNAM DA NECU MOCI POZIVATI DIREKTNO KONSTRUKTOR
//////KORISTICU document.createElement METODU, I MISLIM DA MI TU NE BI KORISTILA POVRATNA VREDNOST
//////      customElements.get      METODE


//MORACU USTVARI DA SUMIRAM SITUACIJU

////OVAKVO KREIRANJE    img     ELEMENTA, ODNOSNO KREIRANJE     HTMLImageElement    INSTANCE
////   new HTMLImageElement()        JESTE ZABRANJENO, ODNOSNO DOCI CE DO TypeError-A, SA 
////PORUKOM DA JE REC O ILEGALNOM KONSTRUKTORU

//KREIRACU JEDNU KLASU CUSTOMIZED BUILD IN ELEMENTA, ALI OVOG PUTA, NOVA KLASA NECE EXTEND-OVATI HOST
//ELEMENT

class OtherImage extends HTMLImageElement {
    constructor(width=200, height=200){
        super();
        this.style.width = width  + "px";
        this.style.height = height + "px";
        console.log(this.style.width);
    }
}

//   NI OVO NE BI BILO MOGUCE          new OtherImage(100, 100)     ODNOSNO KREIRANJE ELEMENTA, 
//                                                                  PRE REGISTRACIJE

window.customElements.define('other-image', OtherImage, {extends: 'img'});      //REGISTRACIJA 
//                                                                              CUSTOMIZED ELEMENTA

const nekiElement1 = new OtherImage(100, 100);           //OVDE SAM ZADAO VREDNOSTI ZA SIRINU I VISINU

//  KAO STO VIDIM IZ GORNJEG REDA, KREIRAO SAM INSTANCU, I OVO JE DOZVOLJENO

const nekiElement2 = document.createElement('img', {is: 'other-image'});    //OVDE NISAM ZADAO VREDNOSTI
//                                                                        ZA SIRINU I VISINU
nekiElement1.src = './icon.png';              //DOVODIM FAJLOVE SLIKA DO
nekiElement2.src = './img/default.ico';       //OBA img ELEMENTA

const bodyNeue = document.createDocumentFragment();         //STAVLJAM OBA img ELEMENTA U FRAGMENT
bodyNeue.appendChild(nekiElement1);
bodyNeue.appendChild(nekiElement2);

document.getElementById('drugi_koren').appendChild(bodyNeue);       //KACIM FRAGMENT U DOM


//AKO POGLEDAM WEB STRANICU TREBALO BI DA IMAM JEDNU SLIKU PORED DRUGE
//PRVA TREBA DA IMA SIRINU I VISINU OD 100 PIKSELA
//DRUGA TREBA DA IMA SIRINU I VISINU, KOJU SAM DEFINISAO DEFAULT PARAMETRIMA KONSTRUKTORA

//IZ SVEGA OVOGA MOGU DA SHVATIM DA         Image           KONSTRUKTOR PREDSTAVLJA I VEC DEFINISANU
//KLASU CUSTOMIZED BUILT IN img ELEMENTA, PORED TOGA STO NJENE INSTANCE NAZIVAJU HOST OBJEKTIMA
//ZNAM DA SU NJENE INSTANCE         HTMLImageElement-I   , KOJI SE KAO STO ZNAM, NE MOGU INSTANCIZIRATI
//SAMIM POZIVANJEM HTMLImageElement KONSTRUKTORA

//UPRAVO POSTO SAM U PREDPOSLEDNJEM PRIMERU         extend-OVAO         Image  KLASU
//ISTO TAKO MOGU    extend-OVATI I SAMU KLASU CUSTOMIZED ELEMENTA   KAO STO JE      OtherImage

//STO CU URADITI I SLEDECIM PRIMEROM


class SomeImage extends OtherImage {
    constructor(width, height, src){
        super(width, height);
        this.src = src; 
    }
}

window.customElements.define('some-image', SomeImage, {extends: 'img'});    //  ZAPAMTI OVO JE BITNO
                                                                            //  ZA REGISTRACIJU
                                                                            //  SomeImage     PROSIRUJE
                                                                            // 'img'    ELEMENT
                                                                            //  U INSTANCI 
                                                                //  CustomElementRegistry           
                                                            //  NE MOZE extend-OVATI
                                                        //  VEC REGISTROVANI, NA PRIMER  'other-image'
                                                        //      IAKO SomeImage KLASA EXTEND-UJE
                                                        //      OtherImage  KLASU

                                                        //  IAKO SomeImage KLASA PROSIRUJE OtherImage
                                                        //  KLASU, KOJA PROSIRUJE   HTMLImageElement
                                                        //  KLASU, MORA SE POZNAVATI SLEDECA CINJENICA
                                                        //  OBE KLASE (SomeImage i OtherImage) 
                                                        //  REPREZENTUJU CUSTOMIZED BUILT IN 'img' ELEMENT
                                                        //  I ZATO SE PRILIKOM I REGISTRACIJE I JEDNE I DRUGE KLASE
                                                //MORA DODATI DA SE TOM PRILIKOM PROSIRUJE
                                                // 'img'    ELEMENT     ----->      {extends: 'img'}

                //  UPRAVO ZBOG TOGA SE CUSTOMIZED ELEMENTIMA, PRILIKOM, DIREKTNOG POSTAVLJANJA U
                //  HTML, DODAJE        {is: 'some-image'}
                //  A TAG KOJI SE POSTAVLJA JESTE BUILT IN      <img>   TAG
                //  DAKLE HTML IZGLEDA OVAKO

        //      <img is="some-image" />
        
//U JAVASCRIPTU CUSTOMIZED ELEMENT MOGU DEFINISATI, PREKO KLASE, ODNOSNO KONSTRUKTORA

const nekiImage = new SomeImage(280, 180, './img/default.ico')

//I ONDA GA INSERTOVATI

document.getElementById('treci_koren').appendChild(nekiImage);

//DA SAM KORISTIO       document.createElement('img', {is: 'some-image})
// NE BIH IMAO MOGUCNOS, KAO KAD SAM KORISTIO KONSTRUKTOR, DEFINISEM I SIRINU, I VISINU, I SOURCE FAJLA (src)

//SADA CU KREIRATI, NOVU KLASU, KOJA EXTEND-UJE, SomeImage KLASU, ALI OVOG PUTA, TA NOVA KLASA CE BITI
//ANONIMNA KLASA

window.customElements.define('default-image', class extends SomeImage {
    constructor(width, height, src="./img/synthwave.jpg"){                  //AKO SE NE OBEZBEDI ADRESA SLIKE
        super(width, height, src);                                      //BICE ISKORISCENA DEFAULT SLIKA
    }
}, {extends: 'img'});

//KAKO DA DODJEM DO KONSTRUKTORA, KAKO BI UZ POMOC NJEGA KREIRAO CUSTOMIZED HTMLImageElement INSTANCU
//TO SAD MOGU URADITI UZ POMOC      get     METODE   CustomElementRegistry-JEVOG PROTOTIPA
//                                                                  KAO STO ZNAM, customElements JESTE
                                                                //  INSTANCA CustomElementRegstry KLASE

const DefaultImageConstructor = window.customElements.get('default-image');

//KREIRACU, JEDAN CUSTOMIZED img    ELEMENT, UZ POMOC, POMENUTOG KONSTRUKTORA,
//ALIO NECU ZADAVATI TRECI ARGUMENT, KOJI BI TREBAO DA BUDE ADRESA DO SLIKE

const defaultSlika = new DefaultImageConstructor(420, 268);

//U TOM SLUCAJU, KADA SE NAKACI, POMENUTI CUSTOMIZED img, NA DOM DRVO, TREBALO
//BI DA PRIKAZUJE SYNTWAVE DEFAULT SLIKU

document.getElementById('cetvrti_koren').appendChild(defaultSlika);
//KADA POGLEDAM WEB STRANICU, VIDECU SLIKU, KOJA JE DAFAULT

////////////////////////////SLEDI GOMILE PRIMERA  ///////////////////////////////////////////////
////////////////////////////MNOGO GRESAKA  ////////////////////////////////////////////////
//////////////////////////// MNOGO TEKSTA  ///////////////////////////////////////////////
///////////////////////////PRIMER KOJI MI SE SVIDJA  //////////////////////////////////////////////
/////////////////////////KAKO SAM DEFINISAO POCINJE OD          1708-OG REDA      CTRL + G  ///////////
/////////////////////////////////////////////////////////////////////////////////////////////// 
//  SADA CU SE VRATITI NA PRIMER CUSTOMIZED BUILT IN BUTTON ELEMENTA, KOJEM SAM DODAO RIPPLE EFFECT
//  NAIME, JA SAM PROSIRIO DUGME, TAKO DA ONO IMA RIPPLING EFFECT, PRILIKOM KLIKA, ODNOSNO, TADA SE
//  TRIGGER-UJE, POMENUTA RIPPLING ANIMACIJA
//  KOPIRACU CELOKUPNI CODE TE KLASE, CISTO DA BI OVDE BIO VIDLJIV NA DOHVAT RUKE, A KLASI CU DEFINISTI
//  NOVO IME
//  OVO NAIME SAMO RADIM ZBOG PREGLEDNOSTI, I DA BI ISPOD OVOG TEKSTA IMAO DEFINICIJU KLASE

class HypsterDugme extends HTMLButtonElement {
    constructor(){                                  //MOZDA ZELIM MOGUCNOST DA DEFINISEM VISINU
        super();                                    //I SIRINU ELEMENT, PRI INSTANCITIZIRANJU

        if(this.hasAttribute("sirina")){
            this.style.width = this.sirina;         //PORED OVAKVOG ATRIBUTSKOG DEFINISANJA SIRINE I VISINE
        }                                           //MOZDA BI BILO DOBRO DA DEFINISEM I DA SE
        if(this.hasAttribute("visina")){            //KONSTRUKTORU DODAVAJU ARGUMENTI SIRINE I VISINE
            this.style.height = this.visina;        //MORAM JOS DA RAZMISLIM KAKO BIH U TOM POGLEDU
        }                                           //DEFINISAO I DEFAULT PARAMETRE KONSTRUKTORA
       
        this.style.backgroundColor = "pink";        //ONO STO MI SE NE SVIDJA U POGLEDU OVOG DUGMETA
                                                    //JESTE, STO CE OVO BITI BACKGROUND COLOR SVAKE
                                                                                    //INSTANCE 
        const stilElement = document.createElement('style');    

        this.appendChild(stilElement);

        this.addEventListener("click", ev => {
           // console.log(ev.target);
            this.onClickRipple(ev.offsetX, ev.offsetY);
            //console.log(window.getComputedStyle(ev.target).top, window.getComputedStyle(ev.target).left);
        });

        this.addEventListener("animationend", ev => {
            //console.log(ev.target);
            ev.target.classList.remove("ripple");
            //console.log(window.getComputedStyle(ev.target).top, window.getComputedStyle(ev.target).left);
        });

    }

    onClickRipple(offsetx, offsety){
        const polaSirine = parseInt((/\d+/gi).exec(this.getAttribute('sirina')))/2;
        const polaVisine = parseInt((/\d+/gi).exec(this.getAttribute('visina')))/2;
        const koordX = (offsetx - polaSirine) + "px"; 
        const koordY = (offsety - polaVisine) + "px";
        //console.log(koordX, koordY);
        this.classList.add('ripple');
        const stilovi = this.stiloviF(
            koordY, koordX                                              //MISLIM DA JE OVDE GRESKA
        );                                                              //MISLIM DA NE SMEM DODAVATI
        this.getElementsByTagName('style')[0].textContent = stilovi;    //SVAKI PUT NOVI style TAG
    }                                                                   //MISLIM DA SVAKI SLEDECI style
                                                                        //TAG DODAT, OVERRIDUJE STILOVE
                                                                        //PREDHODNO DEFINISANOG
                                                                        //BOLJE BI BILO DA SAM 
                                                                        //CSS DEFINISAO NA JEDNOM MESTU
                                                                        //I DA SAM ONDA DODAVAO KLASU
                                                                        //A DA SAM      top    i  left
                                                                        //ATRIBUTE, ODNOSNO NJIHOVE
                                                                        //VREDNOSTI DAVAO style ATRIBUTU
                                                                        //this-A
                                                                        //ISTO TAKO MISLIM DA JE
                                                                        //PRINCIP DODAVANJA style TAGA
                                                                        //JEDINO DOBRA IDEJA ZA SLUCAJ
                                                                        //shadow DOM-A

                                    //DAKLE, NEOPHODNO JE DA REDEFINISEM onClickRipple METODU
                                    //OVAJ CODE NECU VISE DIRATI, JER JE TO CODE HypsterDugme    KLASE
                                    //DAKLE, SAMO CU OVERRIDE-OVATI onClickRipple METODU
                                    //U ONOJ KLASI KOJA PROSIRUJE OVU (TO JE SminkerDugme KLASA, I UPRAVO
                                    //DEFINISAJUCI CODE TE KLASE, ODNOSNO KORISTECI INSTANCU 
                                    //CUSTOMIZED BUILT IN ELEMENTA, KOJU OVA KLASA KONSTRUKTUJE, OTKRIO
                                    //SAM GRESKU IZ OVE KLASE, KOJU KAO STO KAZEM MOGU DA POPRAVIM U 
                                    //SminkerDugme KLASI, OVERRIDE-UJUCI METODU KOJU NASLEDJUJE)
    stiloviF(top, left){                                                
        return `                                                        
            .ripple {
                position: relative;
                overflow: hidden;
            }
            .ripple::before {
                content: "";
                border: orange solid 2px;
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: ${top};      
                left: ${left};
                margin: auto auto;
                background-repeat: no-repeat;
                background-image: radial-gradient(circle at center, #51db913b 28%, #88ddb0a4 28.1%, transparent 29.2%);
                transform: scale(0,0);
                opacity: 1;

                animation-name: gradprogress;
                animation-iteration-count: 1;
                animation-duration: 0.8s;
            }
            @keyframes gradprogress {
                0% {transform: scale(0,0); opacity: 1;}
                50% {opacity: 0.8;}
                38% {opacity: 0.78%;}
                100% {transform: scale(10, 10); opacity: 0;}
            }
        `;
    }

    set sirina(novaSirina){
        this.setAttribute('sirina', novaSirina);
    }
    set visina(novaVisina){
        this.setAttribute('sirina', novaVisina);
    }
    get sirina(){
        return this.getAttribute('sirina'); 
    }
    get visina(){    
        this.getAttribute('visina');
    }

    static get observedAttributes(){
        return ["sirina", "visina", "data-left", "data-top"];
    }

    attributeChangedCallback(attributeName, newValue, oldValue){
        //console.log("atribut se promenio", attributeName, oldValue, newValue);
        this.style.width = (attributeName === "sirina")?oldValue:this.sirina;
        this.style.height = (attributeName === "visina")?oldValue:this.visina;

    }

}

window.customElements.define('hypster-dugme', HypsterDugme, {extends: 'button'});

//POSTO SAM GORE POGLEDAO STA MI SE TO NE SVIDJA, ODNOSNO STA ZELIM DA SVE IMA, MOJ NOVI CUSTOMIZED
//BUTTON ELEMENT, MOGU EXTEND-OVATI, GORNJU KLASU


class SminkerDugme extends HypsterDugme {
    constructor(boja="#be88dda4", sirina="180px", visina="80px"){     //KAD KAZEM BOJA MISLIM NA POZADINSKU BOJU

        super();    
        
        
        //U KONSTRUKTORU HypsterDugme KLASE, POSTOJALO JE DEFINISANJE KREIRANJA style TAGA, I NJEGOVO 
        //APPENDOVANJE DUGMETU (this-U)    
        //ZELI MDA UKLONIM TU OPCIJU, JER MI style TAG VISE NECE BITI POTREBAN
        //console.log(this.querySelector('style'));
        this.removeChild(this.querySelector('style'));

        //console.log(this.querySelector('style'));
        
        
                                                    //SVE STO JE DEFINISANO POSLE POZIVANJA super-A
                                                    //MOZE POTENCIJALNO DA OVERRIDE-UJE ONO STO JE 
                                                    //super     "DONEO"  (NEKI ASSIGNMENTI, VARIAJBLE
                                                    // (STO MISLIM I DA TESTIRAM), ALI MISLIM DA SE TU 
                                                    //PRVENSTVENO MOGU OVERRIDE-OVATI DEFINICIJE BUDUCIH
                                                    //PROPERTIJA INSTANCE, DAKLE this.property = nekaVrednost)
        
        this.style.backgroundColor = boja;          //PROMENA BOJE, KOJA IMA I DEFAULT VREDNOST 
                                                    //(DEFAULT PARAMETAR)
        

        //ALI IPAK, AKO POSTOJI ATRIBUT SA IMENOM       boja        ZELIM DA NJEGOVA VREDNOST
        //TAKODJE BUDE DODATA, KAO BOJA

        if(this.hasAttribute('boja')){
            this.style.backgroundColor = this.getAttribute('boja');
        }

        /*if(sirina){ this.style.width = sirina; }*/    //OVO ZNACI DA U SLUCAJU AKO POZIVANJU KONSTRUKTORA
        /*if(visina){ this.style.height = visina; }*/   //NE PROSLEDIM ARGUMENTE SIRINE ILI VISINE
                                                    //OSTACE ONO STO JE DEFINISAO KONSTRUKTOR PROTOTIPA (super)
                                                    //ODNOSNO KONSTRUKTOR KLASE IZ KOJE NOVA KLASA 
                                                    //EXTENDS, A CIJI PROPERTIJI, POZIVANJEM super-A
                                                    //POSTAJU PROPERTIJI NOVE KLASE
                                                //(OVA RECENICA JE VAZILA KADA NISAM IMAO DEFINISANE
                                                  //  DEFAULT PARAMETRE ZA sirina I visin U KONSTRUKTORU) 

    ///ONO STO SAM ZABORAVIO DA PODESIM U GORNJIM USLOVNIM IZJAVAMA
    ///JESTE DA VREDNOSTI SIRINE I VISINE, TREBA DA BUDU I VREDNOSTI ATRIBUTA KOJE NOSE IMENA
    ///sirina I visina
    ///TO JE ZATO STO METODA, KOJA DONOSI RIPPLING EFFECT, UPRAVO KORISTI VREDNOSTI ATRIBUTA
    /// sirina      I       visina
    ///OVDE CU DEFINISATI NOVE DVE USLOVNE IZJAVE, IAKO BI BILO BOLJE DA SAM CODE DEFINISAO U
    ///OBIMIMA GORNJIH USLOVNIH IZJAVA (ALI STEDIM VREME I PISEM DALJE)
    /// ALI KAD RAZMISLIM, NISU MI POTREBNE USLOVNE IZJAVE, VEC BI BILO BOLJE DA DEFINISEM
    ///DEFAULT PARAMETRE ZA PARAMETRE VISINE I SIRINE U KONSTRUKTORU, JER ZNAM DA SE MORAJU DEFINISATI
    ///visina       I    sirina  ATRIBUTI, BEZ OBZIRA NA BILO STA, JER ONI MORAJU DA BUDU PROCITANI OD
    ///POMENUTE METODE KOJA DONOSI RIPPLING EFFECT
    ////A KADA DEFINISEM DEFAULT PARAMETRE U KONSTRUKTORU, I ZA SIRINU I ZA VISINU, NECE MI TREBATI
    /// NI VEC GORE DEFINISANE USLOVNE IZJAVE U CIJIM OBIMIMA SAM APLICIRAO STIL
    
    ///TAKO DA NAKON STO SAM SE VRATIO NA PARAMETRE KONSTRUKTORA, KAKO BIH DEFINISAO DEFAULT PARAMETRE
    ////U NASTAVKU CU PODESITI I ATRIBUTE I DEFINISATI APLICIRANJE STILA
        
        
        //this.style.width = sirina;       // OVO CU PREMESTITI U DONJU USLOVNU IZJAVU                                               
        //this.style.height = visina;      // JER OVO OVERRIDE-UJE 
                                        // VREDNOSTI, KOJE TREBA DA STIGNU OD ATRIBUTA

        /*this.setAttribute('sirina', sirina);        //POGRESNO, UKLONICU I STAVITI U
        this.setAttribute('visina', visina);*/        //DONJU USLOVNU IOZJAVU, 
        if(this.hasAttribute('sirina')){
            this.style.width = this.getAttribute('sirina'); 
        }else{
            this.setAttribute('sirina', sirina);
            this.style.width = this.getAttribute('sirina');
        }

        if(this.hasAttribute('visina')){
            this.style.height = this.getAttribute('visina');
        }else{
            this.setAttribute('visina', visina);
            this.style.height = this.getAttribute('visina');
        }

        

        //NAKON MODIFIKACIJA, KONKRETNO NAKON PREMESTSNJA CELOKUMPNOG CSS-A U ODVOJENI CSS FAJL
        //MOGU U OBIMA KONSTRUKTORA, DODELITI SLEDECU CSS KLASU (IME .ripple SAM IZBACIO, JER MI NE ODGOVARA
        //ONO STO JE NASLEDJENO IZ HypsterDugme KONSTRUKTORA, A TO JE ODUZIMANJE .ripple
        //CSS KLASE PO ZAVRSETKU ANIMACIJE; NAIME TREBALO BI DA SE ODUZME SAMO KLASA ANIMACIJE)
        this.classList.add('waving');
        

        this.addEventListener('animationend', (ev) => {
            ev.target.classList.remove('for_animation');
            //ev.target.removeChild(ev.target.getElementsByTagName('style')[0]);
            const stilovi = ev.target.getElementsByTagName('style');
            const duzina = stilovi.length;
            //console.log(duzina);
            for(let i = 0; i < duzina; i++){
                ev.target.getElementsByTagName('style')[i].remove();
            }
        });

        /*this.addEventListener('blur', (ev) => {
            
            const duzina = this.getElementsByTagName('style').length;
            console.log(duzina);
            for(let i = 0; i < duzina; i++){
                ev.target.removeChild(ev.target.getElementsByTagName('style')[i]);
            }
            //ev.target.classList.remove('for_animation');
            console.log(ev.target.getElementsByTagName('style')[0]);
            //ev.target.removeChild(ev.target.getElementsByTagName('style')[0]);
            //console.log(ev.target.getElementsByTagName('style')[0]);
            
        });*/

        /*const shadowRoot = this.attachShadow({mode: "open"});*/   //ZAKLJUCIO SAM DA CE MI TREBATI SHADOW DOM 
                                                                //SAMO DA BIH MOGAO, NJEMU
                                    //ZAKACITI STYLE ELEMENT, U OKVIRU KOJEG BI DEFINISAO STILOVE, KOJI
                                    //SAMO POZICIONIRAJU PSEUDO ELEMENT
        //OVDE KACIM style  ATRIBUT DOM-U, A U OKVIRU onClickRipple HANDLERA, DAJEM textContent
        //POMENUTOM style TAGU

        /*shadowRoot.appendChild(document.createElement('style'));*/
        //DODAVANJE SHADOW DOM-A CUSTOMIZED BUILT IN ELEMNTIMA NIJE MOGUCE (PROPAO POKUSAJ U POGLEDU SHADOW DOM-A)
    
        this.addEventListener('mouseleave', ev => {
            if(ev.target.classList.contains('for_animation')){ev.target.classList.remove('for_animation');}
            const stilovi = ev.target.getElementsByTagName('style');
            const duzina = stilovi.length;
           // console.log(duzina);
            for(let i = 0; i < duzina; i++){
                ev.target.getElementsByTagName('style')[i].remove();
            }
        });
    
    }

    //TOKOM TESTIRANJA DUGMETA, KOJU PROIZVODI OVA KLASA, OTKRIO SAM DA METODA KLASE, IZ KOJE, 
    //OVA KLASA
    //EXTENDS, NIJE DOBRA, JER SVAKOJ INSTANCI, NESTUJE, PO JEDAN style TAG, ZBOG KOJE SE DOGADJA, 
    //POGRESNI OVERWRITING STILOVA, JER AKO IMAM VISE DUGMADI DA STRANICI, IMAM TOLIKO I style TAGOVA, 
    //A SVAKI ONAJ SLEDECI OVERWRITE-UJE PREDHODNI, CIME IMAM POGRESNE VREDNOSTI STILOVA KADA
    //SE VRATIM NA NEKO PREDHODNO NESTOVANO DUGME, KOJE ZRLIM DA KLIKNEM (ELEMENTU SE TADA DAJU POGRESNE 
    //VREDNOSTI ZA POZICIONIRANJE (top I bottom))
    //NAIME, ZATO JE BOLJE DA SVI STILOVI BIUDU DODATI DIRKTNO this-OVOM style ATRIBUTU (DAKLE, PORED
    //top-A I bottom-A SVI STILOVI TREBA DA BUDU DATI this-U)
    //ALI DODAVANJE SILNIH STILOVA JAVASCRIPTOM MOZE UCINITI CODE OVE METODE, VEOMA EXTENZIVNIM
    //NE ZNAM DA LI CE TO UTICATI NA PERFORMANSE, ODNOSNO FLUIDNOST ANIMACIJE
    //ZATO SAM IPAK ODLUCIO DA U EXTERNAL CSS-U, DEFINISEM KLASU, I PSEUDO ELEMENT, I ONDA DA
    //DEFINISEM DA SE KLIKOM DODAJE KLASA, CIME BI SE TRIGGEROVALA ANIMACIJA, A DA DA JAVASCRIPTOM
    //DEFINISEM POZICIONIRANJE PSEUDO ELEMENTA, ODNOSNO NJEGOVIH top       I        left    PROPERTIJA
    //OTKRIO SAM DA MI ZA OVO MOZE KORISTITI querySelector


    //NAKON TESTIRANJA, UTVRDIO SAM DA IMAM POGRESAN PRISTUP U CSS, NAJBOLJE BI BILO
    //OVAKO DEFINISATI CSS, ODNOSNO PODELITI NA SLEDECE DELOVE

    //JEDNA CSS KLASA DEFINISE STILOVE SAMOG DUGMETA
    //ONA MOZE DA OSTANE DA SE ZOVE                     .ripple
    
    //SLEDECI MSE DEFINISE PSEUDO ELEMENT       TO JE NARAVNO ODREDJEDO         .ripple::before

    //OVI STILOVI KOJE SAM GORE POMENUO, MOGU SE DODATI U OBIMU KONSTRUKTORA (ODNOSNO this-U CU DODATI
    // .ripple SELEKTOR, U KONSTRUKTORU)

    //PROPERTIJI, KOJI SU VEZANI ZA ANIMACIJU TREBAJU DA BUDU U ODVOJENOJ CSS KLASI, ODNOSNO U NJENOM
    //PSEUDO ELEMENTU
    //NEKA SE ONA ZOVE      .for_animation
    //ODNOSNO NEKA PROPERTIJI ZA ANIMACIJU BUDU         U       .for_animation::before      SELEKTORU

    onClickRipple(offsetx, offsety){

        console.log(this.getElementsByTagName('style'));

        const polaSirine = parseInt((/\d+/gi).exec(this.getAttribute('sirina')))/2;
        const polaVisine = parseInt((/\d+/gi).exec(this.getAttribute('visina')))/2;
        const koordX = (offsetx - polaSirine) + "px"; 
        const koordY = (offsety - polaVisine) + "px";
        console.log(polaSirine, polaVisine);
        console.log(koordX, koordY);
        //  OVDE MOGU PSEUDO ELEMENTU DODATI VREDNOSTI ZA      top      I       left    PROPERTI
        
        //shadow dom se ne moze kaciti na customized built in elemente
        // MOGU IPAK DEFINISATI DODAVANJE style TAGA, POD USLOVOM DA GA UKLONIM onanimationend

        const stilPozicioniranja = `
            .for_animation::before {
                left: ${koordX};
                top: ${koordY};
            }
        `;
        
        const stilElement = document.createElement('style');
        stilElement.textContent = stilPozicioniranja;
        this.appendChild(stilElement);



        //  OVDE SASDA MOGU DODATI CSS KLASU, KOJOM SE TRIGGER-UJE ANIMACIJA
        this.classList.add('for_animation');        //OVA KLASA CE BITI ODUZETA NAKON ZAVRSETKA ANIAMCIJE
                                                    //JER SAM TAKO DEFINISAO U HANDLER-U, KOJI SE INVOCIRA                
                                                    //on animation end
        
        
        
        

        console.log(this.children);
    }

    //MORAM I OVERRIDE-OVATI ONO STO SE DESAVA U HANDLERU, KOJI SE POZIVA PO ZAVRSETKU ANIMACIJE
    //U POMENUTO MHANDLERU, KOJI JE PROSLEDJEN KAO ANONIMAN FUNKCIJE ODUZIMA SE .ripple KLASA 
    //this-U
    //ZATO JE BOLJE IZBACITI KORISCENJE KLASE .ripple I DEFINISATI NESTO DRUGO, NA PRIMER DA SE KLASA
    //ZOVE .waving

}

/////////NISAM DEFINISAO NEKE METODE SminkerDugme-TOVOG PROTOTIPA, JER MISLIM DA MI JE
/// SASVIM DOVOLJNA ONA METODA,
///////KOJA KLIKOM DOVODI RIPPLING EFFECT, I DRUGA METODA, KOJA POZ ZAVRSETKU ANIMACIJE ODUZIMA CSS KLASU (DA NE PRICAM O TOME, U GLAVNOM BEZ TE KLASE RIPPLING EFFECAT NIJE MOGUC, I JA PO ZAVRSETKU ANIMACIJE ODUZIMAM KLASU DA BIH JE POSLE, OPET KLIKOM NA DUGME DODAO) 
////// OBE METODE KOJE SAM SPOMENUO JESU METODE HypsterDugme-TOVOG PROTOTIPA, KOJE NASLEDJUJE I 
////// SminkerDugme

//DA REGISTRUJEM NOVO DUGME

window.customElements.define('sminker-dugme', SminkerDugme, {extends: 'button'});

//DEFINISACU SADA NEKOLIKO ROOT ELEMENATA U HTML-U, NA KOJE CU KACITI, INSTANCE NOVOG CUSTOMIZED button-A 

const rootElementi = document.getElementsByClassName('domacin_dugmeta');

//KREIRACU PRVO JEDAN CUSTOMIZED BUTTON, NA PRVI NACIN

const sminker1 = document.createElement('button', {is: 'sminker-dugme'});

//PA JOS JEDAN NA DRUGI NACIN

const sminker2 = new SminkerDugme();

//PA JOS JEDAN NA TRECI NACIN

const sminker3 = new SminkerDugme("#eb6cc0f6");

//PA JOS JEDAN NA CETVRTI NACIN

const sminker4 = new SminkerDugme("#6781d4", "402px"); 

//PA JOS JEDAN NA PETI NACIN

const sminker5 = new SminkerDugme("#ec9358", "206px", "126px"); 

//ZATIM CU IH NAKACITI U DOM TREE

rootElementi[0].appendChild(sminker1);
rootElementi[1].appendChild(sminker2);
rootElementi[2].appendChild(sminker3);
rootElementi[3].appendChild(sminker4);
rootElementi[4].appendChild(sminker5);

//////////////////////////////////////////////////////////////////////////////////////////////////
///OVAJ PRIMER VISE NECU DODATNO KOMENTARISATI////////////////////////////////////////////////////
///////////////////////////////////////////

//MOGAO SAM JEDINO JOS, NESTOVATI, NOVI CUSTOMIZED BULT IN BUTTON, DIREKTNO U HTML, UZ DIREKTNO DODAVANJE
//SVIH, KARAKTERISTICNIH ATRIBUTA

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////
//////////MEDJUTIM, NE SVIDJA MI SE ZATO STO MOJA ANIMACIJA KORISTI, ODNOSNO SCALE-IRA PSEUDO ELEMENT
/////JER PSEUDO ELEMENTU NE MOGU PRISTUPITI, U JAVASCRIPT-U, NITI GA DIREKTNO MOGU MENJATI INLINE
////STILOM U HTML-U
////ZATO CU OPET KREIRATI NOVU KLASU, U KOJOJ CU DEFINISATI OVEERIDING, SVEGA NEOPHODNOG IZ SminkerDugme
///KLASE

class ClassyButton extends SminkerDugme {
    constructor(boja, sirina, visina){
        super(boja, sirina, visina);
        //DAKLE, NISTA NECU MENJATI STO JE DONEO KONSTRUKTOR SminkerDugme KLASE
        //TU PRIPADAJU PODESAVANJA ATRIBUTA, ZATIM CITANJE OD TIH ATRIBUTA I DODELJIVANJE
        //NJIHOVIH VREDNOSTI, STYLE PROPERTIJIMA

        //ONO STO MORAM OVERRIDE-OVATI, JESTE, METODA, KOJA SE POZIVA U OBIMU HANDLERA,
        //KOJI SE SALJE U QUEUE, NA KORINIKOV KLIK 
        //REC JE O onClickRipple FUNKCIJI

        //POTREBNO JE OTKACITI POMENUTI HANDLER (JER KONSTRUKTOROM SminkerDugme-TA, ON JE ZAKACEN)
        //MEDDJUTIM, TO SE NE MOZE U RADITI, ALI NA SRECU, U POMENUTOM HANDLER-U, RANIJE JE SAMO DEFINISANO
        //POZIVANJE   onclickRipple METODE, TAK ODA JE SAMO POTREBNO OVERRIDE-OVATI POMENUTU METODU
        
        this.zindex = 0;
        this.style.zIndex = 1;
        //this.style.position = "absolute";

        //DODAVANJE NEKIH STILOVA DUGMETU

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.style.padding = "0px";
        this.style.margin = "0px"
        this.style.outlineWidth = "0px"
        //this.style.zIndex = 8;

        this.addEventListener('mousedown', function(ev){
            
            let x;
            let y;

            const buttonWidth = this.getAttribute('sirina');
            const buttonHeight = this.getAttribute('visina');

            const halfWidth = parseInt((/\d+/ig).exec(buttonWidth))/2;      //POLA SIRINE I VISINE
            const halfHeight = parseInt((/\d+/ig).exec(buttonHeight))/2;    //BUTTON-A


            console.log(halfWidth, halfHeight);


                                                                //  KOORDINATE
            const fromKontToItemX = ev.target.offsetLeft;       //  MOZE DA BUDE PARENT ILI ITEM
            const fromKontToItemY = ev.target.offsetTop;        //  (AKO JE ON TARGET)
            console.log("mogu da budu negativne", fromKontToItemX, fromKontToItemY);
            const justForButtonX = this.offsetLeft;             //  KORRDINATE, SAMO BUTTON-A
            const justForButtonY = this.offsetTop;
            console.log("samo za dugme", justForButtonX, justForButtonY);
            const mouseCoordX = ev.offsetX;                 //  KOORDINATE OD KONTEJNERA
            const mouseCoordY = ev.offsetY;                 //  DO TAMO GDE JE KLIKNUTO
                                                            //  MOZE DA BUDE BUTTON, ALI SAMO JEDNOM
                                                            //  OSTALO CE BITI KORDINATE KLIKA U NESTED 
                                                            //  ITEMIMA
            console.log("klik coords", mouseCoordX, mouseCoordY);

            x = mouseCoordX;      // U SLUCAJU KADA NI JEDAN div NIJE NESTOVAN (PRVI KLIK)
            y = mouseCoordY;

            if(fromKontToItemX !== justForButtonX){               //   SVAKI SLEDECI KLIK, KADA POSTOJI 
                x = fromKontToItemX + mouseCoordX;
                y = fromKontToItemY + mouseCoordY;
            }
            
            let i;
            let j;

            i = (mouseCoordX - halfWidth) + "px";   //ZA PRVI POKUSAJ BEZ DIVOVA
            j = (mouseCoordY - halfHeight) + "px";

            if(fromKontToItemX !== justForButtonX){   
                i = (x - halfWidth) + "px";   
                j = (y - halfHeight) + "px";
            }

            this.onClickRippleNew(i, j);                        

        });

        this.onmouseup = function(ev){  
            if(this.hasChildNodes() && this.getElementsByTagName('div').length !== 0){
                const length = this.getElementsByTagName('div').length;
                this.getElementsByTagName('div')[length - 1].classList.add('transit');
                console.log("mouseup is triggered");
            }
        };
    }

    onClickRipple(){
        //console.log("do nothing")
    }

    onClickRippleNew(koordX, koordY){
        //SADA MORAM DEFINISATI NOVI CSS, U KOJEM NECE FIGURISATI PSEUDO ELEMENT, VEC OBICNI DIV
        //ABSOLUTNO POZICIONIRAN
        //console.log(offsetx, offsety);
        const buttWidth = parseInt((/\d+/gi).exec(this.getAttribute('sirina')));
        const buttHeight = parseInt((/\d+/gi).exec(this.getAttribute('visina')));
        const divel = document.createElement('div');
        const styleMap = new Map([
            ["width", buttWidth + "px"],
            ["height", buttHeight + "px"],
            ["position", "absolute"],
            ["margin", "0px"],
            ["padding", "0px"],
            ["border", "0px solid orange"]
        ]);

        for(let celija of styleMap.entries()){
            //console.log(celija);
            divel.style[celija[0]] = celija[1];
            //console.log(divel);
        }
        
        this.appendChild(divel);
        //divel.setAttribute("disabled", "disabled");

        //divel.setAttribute("disabled", "disabled");

        /*divel.onclick = function(ev){
            console.log("klik event prosao");
        };*/

        /*const halfWidth = buttWidth/2;
        const halfHeight = buttHeight/2;*/
        /*const koordX = (offsetx - halfWidth) + "px"; 
        const koordY = (offsety - halfHeight) + "px";*/
        
        
        divel.style.left = koordX;
        divel.style.top = koordY;

        divel.classList.add('wave_styles');

        //console.log(this.zindex);
        //divel.style.zIndex = this.zindex--;     
        
        //divel.classList.add('transit');
        //ANIMACIJU I GRADIJENT JE NAJBOLJE DEFINISATI U ODVOJENOM CSS FAJLU
        //console.log(styleMap);
        //JUST PRACTICING IF THIS CAN BE DONE WITH Map
        

        //CITANJE KARAKTERISTIKA ELEMENTA CE OSTATI ISTO KAO I RANIJE

        

        

        //console.log(this);
        
    }
}


//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


window.customElements.define('classy-button', ClassyButton, {extends: 'button'});

const klasiDugme = new ClassyButton("#6781d4", "402px", "208px");

rootElementi[9].appendChild(klasiDugme);
//test












                
                //PRIMER, KOJI SAM KREIRAO I KOJI JE POTPUNIJI OD OSTALIH,
                //KOJI KORISTE RIPPLING EFFECT
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

class RipplingDiv extends HTMLDivElement {
    constructor(width=200, height=100, backgroundColor="#f08fdb"){
        super();
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
        this.style.backgroundColor = `${backgroundColor}`;
        if(this.hasAttribute('width')){
            this.style.width = this.getAttribute('width');
        }
        if(this.hasAttribute('height')){
            this.style.height = this.getAttribute('width');
        }
        if(this.hasAttribute('background-color')){
            this.style.backgroundColor = this.getAttribute('background-color');
        }
        if(this.hasAttribute('hidden')){
            this.style.visibility = 'hidden';
        }
        this.style.position = 'relative';
        this.style.margin = "auto auto";
        this.style.overflow = "hidden";
    }
    //GETTERS               ///MISLIM DA MI GETTER-I NISU BAS DOBRO DEFINISANI JER CITAJU VREDNOST 
    get width(){            //STILA, DIREKTNO, A NE VREDNOST ATRIBUTA
        return this.style.width;
    }
    get height(){
        return this.style.height;
    }
    get backgroundColor(){
        return this.style.backgroundColor;
    }
    //SETTERS //MISLIM DA U NJIMA IMA VISKA CODE-A, ODNOSNO IMA DODELE VREDNOSTI
                //STILOVIMA; NAJBOLJE BI BILO DA SAM STILOVE, KOJE ZAVISE
                //OD PROMENE ATRIBUTA DEFINISAO U attributeChangedCallback-U
                //(TO SAM I URADIO), ALI SADA ZBOG TOGA IMAM DUPLI CODE, KOJI
                //NECU MENJATI, JER ZELIM DA SE VIDI GDE SAM NAPRAVIO VISAK
    set width(width){
        this.style.width = `${width}px`;
        this.setAttribute('width', width);
    }
    set height(height){
        this.style.height = `${height}px`;
        this.setAttribute('height', height);
    }
    set backgroundColor(backgroundColor){
        this.style.backgroundColor = backgroundColor;
        this.setAttribute('background-color', backgroundColor);
    }
    set hidden(val){
        if(val){
            this.setAttribute('hidden','')
            this.style.visibility = 'hidden';
        }else{
            this.removeAttribute('hidden')
            this.style.visibility = 'visible';
        }
    }
    //METHODS
    probnaFunkcija(ev){
        //console.log(ev);
    }
    nestNewElements(ev){
        const divEl = document.createElement('div');
        divEl.classList.add('rippling_item');
        this.appendChild(divEl);
        
        this.appendChild(this.coverEl); //SVAKIM KLIKOM OVAJ ELEMENT CE SE KACITI KAO POSLEDNJI NESTED
        //console.log(this);            //this-A, A ONO STO NISAM ZNAO JESTE DA GA NE MORAM OTKACIVATI
                                        //SA DOM-A (METODOM removeChild), DA BIH GA KASNIJE PONOVO
                                        //ZAKACIO, JER NOVA UPOTREBA appendChild METODE ZNACI DA CE SE
                                        //ON KACITI NA NOVO MESTO (U OVOM SLUCAJU, OPET NA KRAJ
                                        //NESTINGA this-A) 
        const halfWidth = parseInt((/\d+/gi).exec(window.getComputedStyle(this).width))/2;
        const halfHeight = parseInt((/\d+/gi).exec(window.getComputedStyle(this).height))/2;
        //console.log(halfWidth, halfHeight);
        const x = ev.offsetX;
        const y = ev.offsetY;
        //console.log(x, y);

        divEl.style.left = `${x - halfWidth}px`;
        divEl.style.top = `${y - halfHeight}px`;

        divEl.addEventListener('transitionend', ev => {
            ev.target.remove();
        });
    }
    ripplingHandlerUp(ev){
        const divElArr = this.querySelectorAll('.rippling_item');
        const length = divElArr.length;
        divElArr[length-1].classList.add('rippling_effect');
    }
    //LIFECYCLE METHODS
    connectedCallback(){
        this.addEventListener('click', this.probnaFunkcija);
        this.addEventListener('mousedown', this.nestNewElements);
        this.addEventListener('mouseup', this.ripplingHandlerUp);

        this.coverEl = document.createElement('div');
        
        this.coverEl.style.position = "absolute";
        this.coverEl.style.width = "100%";
        this.coverEl.style.height = "100%";
        this.coverEl.style.opacity = 0;
        this.coverEl.style.zIndex = 2;
        this.coverEl.classList.add('cover');

        this.coverEl.style.backgroundColor = "#e07228";
    }
    disconnectedCallback(){
        this.removeEventListener('click', this.probnaFunkcija);
    }
    attributeChangedCallback(name, oldVal, newVal){
        if(name === 'height'){
            this.style.height = `${newVal}px`;
        }
        if(name === 'width'){
            this.style.width = `${newVal}px`;
        }
        if(name === 'background-color'){
            this.style.backgroundColor = newVal;
        }
        if(name === 'hidden'){
            this.style.visibility = !oldVal?'visible':'hidden';
        }
    }
    //OBSERVING ATTRIBUTE
    static get observedAttributes(){
        return ['width', 'height', 'background-color', 'hidden'];
    }
}

window.customElements.define('rippling-div', RipplingDiv, {extends: 'div'});

const wavingDiv = new RipplingDiv(380, 160, "#9de758");
document.querySelector('.rippling_root').appendChild(wavingDiv);
//wavingDiv.hidden = "maybe";
//////////////////////////////////////////////////////////////////////////////////
//U PROSLOM PRIMERU SAM DEFINISAO   hidden ATRIBUT, ODNOSNO DEFINISAO SAM DA JE TO MOGUCI ATRIBUT
//SVAKE INSTANCE CUSTOMIZED ELEMENTA, DEFINSAO SAM STA SE DOGADJA NJEGOVOM PROMENOM
// (NISAM ZANO DA JE TO TAKODJE I GLOBALNI ATRIBUT, KOJI STO RADI ONO STO RADI I MOJ hidden)
//

//POSTO SVAKIM NOVIM DEFINISANJEM LIFECYCLE METODA, UKLJUCUJUCI I STATICKI GETTER observedAttributes,
//ONE OVERRIDUJU, ONE METODE KLASE IZ KOJE NOVA, KLASA EXTENDS 
//ZATO MORAM REDEFINISATI PREDHODNU KLASU (ODNOSNO MORAM, KREIRATI POTPUNO NOVU KLASU KOJA CE
//BITI POTPUNO ISTA KAO I PREDHODNA), U KOJOJ CU POPRAVITI, SVE STO RANIJE NIJE BILO DOBRO
//KOMPONENTU RipplingDiv, KAKO BI DEFINISAO SLEDECE, STO SAM ZAKLJUCIO DA JE VEOMA VAZNO

//---------DA NIZ, KOJI JE POVRATNA VREDNOST       static get observedAttributes,
//          JESTE USTVARI NIZ REFERENCIRAN OD NEKLE, ALI NE SME, ODNOSNO I NE MOZE DA BUDE 
//          PROPERTI INSTANCE, JER KAO STO ZNAM, STATICKE METODE SE PRIMENJUJU NA KONSTRUKTORU
//          KLASE, STO ZNACI DA NE MOGU REFERENCIRATI PROPERTIJE INSTANCE    

//---------DA BIH REDEFINISAO CODE attributeChangedCallback-A , I USVOJIO DA OVAKAV NACIN KORISTIM 
//I U BUDUCE
//DA SAV CODE KOJI SE NALAZI U POMENUTOJ LIFECYCLE METODI BUDE POZIVANJE FUNKCIJA, ODNOSNO METODA ILI
//METODE, KLASE KOJOJ ONE PRIPADAJU
///JER NA TAKAV NACIN, MOGU KORISTITI super NA KOJEM BIH MOGAO PRIMENITI, TAKVE METODE, CIME BIH
//DEFINISAO DA ONAJ CODE KOJI SE ZA PREDHODNU KLASI IZVRSAVA NAKON PROMENE ATRIBUTA, BUDE "NA SNAZI", I DALJE
//OVO CE MI BITI JASNO KASNIJE, TOKOM JEDNOG PRIMERA, U KOJEM BUDEM EXTEND-OVAO SLEDECU KLASU
 
//NOVA KLASA CE NOSITI IME                  DivRipple

const nizPosmatranihAtributa = ['width', 'height', 'background-color', 'hidden'];

class DivRipple extends HTMLDivElement {
    constructor(width=200, height=100, backgroundColor="#f08fdb"){
        super();
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
        this.style.backgroundColor = `${backgroundColor}`;
        if(this.hasAttribute('width')){
            this.style.width = this.getAttribute('width');
        }
        if(this.hasAttribute('height')){
            this.style.height = this.getAttribute('width');
        }
        if(this.hasAttribute('background-color')){
            this.style.backgroundColor = this.getAttribute('background-color');
        }
        if(this.hasAttribute('hidden')){
            this.style.visibility = 'hidden';
        }
        this.style.position = 'relative';
        this.style.margin = "auto auto";
        this.style.overflow = "hidden";

        //  KAKO BIH RAZUMEO ZASTO KREIRAM, SLEDECI NIZ, IDI U OBIM     static get observedAttributes
        //  I PROCITAJ KOMENTARE

        this.observedAttributesNames = ['width', 'height', 'background-color', 'hidden'];
    }
    //GETTERS               //// U PROSLOJ KLASI SU GETTER, UZIMALI VREDNOST OD style ATRIBUTA
    get width(){            ////SADA DEFINISEM DA ONI UZIMAJU VREDNOST OD KARAKTERISTICNIH ATRIBUTA
        if(this.hasAttribute('width')){
            return this.getAttribute('width');
        }else{
            return undefined;
        }
    }
    get height(){
        if(this.hasAttribute('height')){
            return this.getAttribute('height');
        }else{
            return undefined;
        }
    }
    get backgroundColor(){
        if(this.hasAttribute('background-color')){
            return this.getAttribute('background-color');
        }else{
            return undefined;
        }
    }
    //SETTERS 
    //U PREDHODNOM PRIMERU, SETTER-I SU TAKODJE DODELJIVALI VREDNOSTI style-OVIM PROPERTIJIMA, TO OVDE
    //NE ZELIM, JER U ODNOSU NA PROMENU ATRIBUTA, SVE DODELE STILOVA BI TREBALE DA SE NALAZE U OBIMU
    //      atrributeChangedCallback    -A
    set width(width){
        if(width){
            this.setAttribute('width', width);
        }else{
            this.removeAttribute('width');
        }
    }
    set height(height){
        if(height){
            this.setAttribute('height', height);
        }else{
            this.removeAttribute('height');
        }
    }
    set backgroundColor(backgroundColor){
        if(backgroundColor){
            this.setAttribute('background-color', backgroundColor);
        }else{
            this.removeAttribute('background-color');
        }
    }
    set hidden(val){
        if(val){
            this.setAttribute('hidden','')
        }else{
            this.removeAttribute('hidden')
        }
    }
    //METHODS
    probnaFunkcija(ev){
        //console.log(ev);
    }
    nestNewElements(ev){
        const divEl = document.createElement('div');
        divEl.classList.add('rippling_item');
        this.appendChild(divEl);
        this.appendChild(this.coverEl);
        const halfWidth = parseInt((/\d+/gi).exec(window.getComputedStyle(this).width))/2;
        const halfHeight = parseInt((/\d+/gi).exec(window.getComputedStyle(this).height))/2;
        const x = ev.offsetX;
        const y = ev.offsetY;
        divEl.style.left = `${x - halfWidth}px`;
        divEl.style.top = `${y - halfHeight}px`;
        divEl.addEventListener('transitionend', ev => {
            ev.target.remove();
        });
    }
    ripplingHandlerUp(ev){
        const divElArr = this.querySelectorAll('.rippling_item');
        const length = divElArr.length;
        divElArr[length-1].classList.add('rippling_effect');
    }
    //LIFECYCLE CALLBACKS
    connectedCallback(){
        this.addEventListener('click', this.probnaFunkcija);
        this.addEventListener('mousedown', this.nestNewElements);
        this.addEventListener('mouseup', this.ripplingHandlerUp);
        this.coverEl = document.createElement('div');
        this.coverEl.style.position = "absolute";
        this.coverEl.style.width = "100%";
        this.coverEl.style.height = "100%";
        this.coverEl.style.opacity = 0;
        this.coverEl.style.zIndex = 2;
        this.coverEl.classList.add('cover');

        this.coverEl.style.backgroundColor = "#e07228";     //OVO NIJE POTREBNO UZ opacity NULA
                                                            //ALI KORISTILO JE TOKOM DEFINISANJA KAO
                                                            //POMOC 
    }
    disconnectedCallback(){
        this.removeEventListener('click', this.probnaFunkcija);
        //OVDE SAM TREBAO DA DEFINISEM REMOVAL OSTALIH HANDLERA, ALI U CILJU USTEDE VREMENA NISAM
        //TO URADIO
    }
    attributeChangedCallback(name, oldVal, newVal){
    //CODE KAKAV JE U ISTOJ OVAKVOJ LIFECYCLE METODI, PROSLE KOMPONENTE, A KOJI SAM DOLE COMMENTED-OUT
    //DA BIH GA OVDE PRIKAZAO 
    //BIO BI OVERRIDED (ILO OVERWRITEN; JOS NE ZNAM KOJI BI BIO PRAVI IZRAZ ZA OVO), U SLUCAJU KOMPONENTE    
    //KOJKA EXTEND-UJE OVU, ODNOSNO U SLUCAJU CUSTOMIZED ELEMENTA, CIJA KLASA EXTENDUJE IZ OVE, NARAVNO
    //U SLUCAJU KADA BI POMENUTA NOVA KLASA KOJA EXTENDUJE IZ OVE, IMALA DEFINISAN ISTI OVAJ LIFECYCLE
    //CALLBACK    
        
        /*if(name === 'height'){                    //DAKLE OVO JE NEPOVOLJNO U SLUCAJU
            this.style.height = `${newVal}px`;      //KOMPONENTE KOJA BI PROSIRIVALA OVU
        }
        if(name === 'width'){
            this.style.width = `${newVal}px`;
        }
        if(name === 'background-color'){
            this.style.backgroundColor = newVal;
        }
        if(name === 'hidden'){
            this.style.visibility = !oldVal?'visible':'hidden';
        }*/

        //ZATO GORNJI CODE TREBAM "UKAPSULITI", U JEDNU METODU, KOJU BIH POZVAO U OBIMU OVOG
        //LIFECYCLE CALLBACK-A
        //A U DEFINICIJA TE METODE BI SE SASTOJALA IZ COMENTED-OUT CODE-A, KOJI SAM PRIKAZAO GORE

        this.whenAttributeChange(name, oldVal, newVal);
        //OVU METODU CU DEFINISATI, ODMAH ISPOD OVOG LIFCYCLE CALLBACK-A
    }
    whenAttributeChange(name, oldValue, newValue){
        if(name === 'width'){
            this.style.width = `${newValue}px`;
        }
        if(name === 'height'){
            this.style.height = `${newValue}px`;
        }
        if(name === 'background-color'){
            this.style.backgroundColor = newValue;
        }
        if(name === 'hidden'){
            this.style.visibility = newValue?"hidden":"visible";
        }
    }
    //OBSERVING ATTRIBUTE
    static get observedAttributes(){
        //U KOMPONENTI IZ PROSLOG PRIMERA NA SNAZI JE CODE, KOJI SAM JA COMMENTED OUT OVDE
    //  return ['width', 'height', 'background-color', 'hidden'];

        //NAIME, ONO STO ZELIM DA URADIM JESTE DA NIZ KOJI TREBA DA BUDE POVRATNA VREDNOST OVE METODE
        //USTVARI BUDE VREDNOST PROPERTIJA      DivRipple       INSTANCE
        //OVO ISTO RADIM ZBOG KLASE KOJA BI MOGLA EXTEND-OVATI IZ       DivRipple       KLASE
        //AKO BI U POMENUTOJ, NEKOJ NOVOJ KLASI NANOVO DEFINISAO        static get observedAttributes
        //JASNO JE DA BI DOSLO DO VERRIDINGA, I DA SE VISE NE BI PRATILE PROMENE ATRIBUTA, CIJE JE
        //PRACENJE PROMENA DEFINISANO U OVOJ KOMOPONENTI

        //return this.observedAttributesNames;

        //ISKOMENTARISANI I OBJASNJENI NACIN GORE, JESTE POGRESAN I DOVESCE DO ERROR-A, JER SE U OBIMU
        //STATICKIH METODA, NE MOGU REFERENCIRATI PROPERTIJI INSTANCE

        //ZATO, DOBAR NACIN BI BIO DA SE, POMENUTI NIZ REFERENCIRA KAO VREDNOST NEKE GLOBLNE VARIJABLE
        //JA SAM TAKVU VARIJABLU DEKLARISAO, PRE DEFINICIJE OVE KLASE
        //I EVO SADA REFERENCIRAM TU VARIJABLU, KAO POVRATNU VREDNOST OVE STATICKE METODE

        return nizPosmatranihAtributa;

        //NA OVAJ NOVI NACIN, U SLEDECOJ, KOMPONENTI, KOJA BI EXTEND-OVALA OVU, OVA STATICKA METODA 
        //SE NE BI
        //NANOVO, NI DEFINISALA, VEC BIH SAMO DODAO NOVI PROPERTI (IME NOVOG ATRIBUTA ZA PRACENJE),
        //NIZU CIJA REFERENCA JESTE POVRATNA VREDNOST, OVE METODE (I TAJ NIZ, OPET PONAVLJAM NE SME BITI
        //VREDNOST PROPERTIJA, INSTANCE, OVE KLASE)

    }
}

////DEFINISAJUCI OVU KLASU, ALI I CITAJUCI CLANAK GOOGLE DEVELOPERA, O TEMI WEB KOMPONENTI
////VIDEO SAM DA SU ONI U NJIHOVIM SETTER-IMA, DEFINISALI I NEKI CODE KOJI JE KONKRETNO NESTO RADIO
///KAO STO JE TOGGLE-OVANJE NEKIH ELEMENATA, TAKO DA IZ TOG PRIMERA, MOGU DA VIDFIM, DA DODELA STILOVA
///U SAMIM SETTERIM, ZAJEDNO SA SETTING-OM ATRIBUTA

//REGISTROVANJE
window.customElements.define('div-ripple', DivRipple, {extends: 'div'});
//KREIRANJE INSTANCE
const divRipple = new DivRipple(580, 248, "#e47c62");
//KACENJE NA DOM
rootElementi[11].appendChild(divRipple);
//POKUSACU DA PROMENIM NEKI OD ATRIBUTA

divRipple.width = 318;
divRipple.backgroundColor = "#9de758";

divRipple.hidden = "if you want, oh I don't know";
divRipple.hidden = 0;



//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
///////OVDE CU SADA NASTAVITI SA OBJASNJENJIMA VEZANIM ZA CUSTOM ELEMENTE
//PREDHODNI PRIMERI SU BILI SKONCENTRISANI NA RIPPLING TRANZICIJU, IAKO TO MOZDA NIJE 'TEMA OVOG
// REPOZITORIJUMA', IPAK JE VREDELO KREIRANJE CUSTOMIZED BUILT IN DIV ELEMENTA, KOJI IMA RIPPLING
//  TRANZICIJU
//I VREDELO JE JER SAM SAZNAO ZA NEKOLIKO EVENT-OVA, SA KOJIM SE RANIJE NISAM SUSRETAO
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//VEC SAM SE POZABAVIO OBSERVING-OM PROMENA ATRIBUTA
//DODUSE U POSLEDNJEM PRIMERU SAM IMAO VISKA CODE-A U SETTER-IMA ATRIBUTA, JER SAM U NJIMA TAKODJE
//DEFINISAO I DODELU STILOVA
//
//PRAVILNO BI BILO DA SAM URADIO, KAO STO SAM VEC I POMENUO, DA SE DODELE NOVIH VREDNOSTI STILOVIMA
//I TO VREDNOSTI KOJE DEFINISU ILI ZAVISE OD PROMENE ATRIBUTA, DEFINISU U OBIMU
//      attributeChangedCallback    -A
//NARAVNO, KOJE TO PROMENE ATRIBUTA PRATIM DEFINISEM U NIZU KOJI JE POVRATNA VREDNOST    
//      static get observedAttributes
//
///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//SADA CU RECI MALO VISE O PROPERTIJIMA
//
//ODNOSNO RECI CU NESTO O 
//          'REFLEKTOVANJU (ODRAZAVANJU) PROPERTIJA DO ATRIBUTA'

//UOBICAJENO je za HTML PROPERTIJE da reflektuju svoju vrijednost nazad u DOM kao HTML atribut. Na primjer,
 //kada SU vrijednosti     hidden-A  ili  id-JA    promijenjene u JS:

                //      div.id = 'moj-id';
                //      div.hidden = true;
    //vrijednosti se primjenjuju na živi DOM kao atributi:

    //    <div id="mi-id" hidden></div>

//    Ovo se zove "rflektovanje propertij do atributa". Skoro svaki atribut u HTML-u to radi. 
//  Zašto? Atributi su takođe korisni za konfiguriranje elementa deklarativno, a i određeni API-ji
//  kao što su accessibiliti API ili CSS selektori, oslanjaju se na atribute

//REFLEKTOVANJE nekog objekta je korisno BILO GDE, gde želite da zadržite reprezentaciju DOM elementa
// u sinhronizaciji sa STANJEM JavaScript-a. Jedan od razloga zbog kojih biste želeli da reflektujete
 // properti jeste da bi se user-defined stilaplicirao onda kada se javascript stanje promeni

// STA SE PODRAZUMEVA POD OVIM, NAJBOLJE CU VIDETI IZ SLEDECEG PRIMERA 
//PROSIRICU KLASU CUSTOMIZED BILT IN ELEMENTA (PROSLI PRIMER)


class OtherRipplingDiv extends DivRipple {
    constructor(sirina, visina, background_boja){
        super(sirina, visina, background_boja);
        
        //NECU NISTA MENJATI NEGO CU DEFINISATI, NOVI, MOGUCI ATRIBUT OVE INSTANCE KOJI CE NOSITI IME
        //    onesposobljen     (disabled U PREVODU)
        //TO CE BITI BOOLEAN ATRIBUT

        //PRE TOGA CU DEFINISATI DA SVAKA INSTANCA CUSTOMIZED ELEMENTA, IMA KLASU SA IMENOM
        //          .other_rippling

        this.classList.add('other_rippling');

        //IPAK CU MU DATI title ATRIBUT SA NATPISOM (TO RADIM ZA SEBE, DA BIH NA HOVERINGU
        //KURSORA, PREKO ELEMENTA MOGAO VIDETI DA SE RADI O INSTANCI OVE KLASE 
        //(JER IMAM MNOGO ELEMENATA NA STRANICI))

        this.setAttribute('title', "ovo je element koji ima ripplig effect, i koji se moze onemoguciti");
       
        //MEDJUTIM POGRESIO SAM, JER KADA ELEMENT BUDE 
        //ONEMOGUCEN, NECE SE POKAZATI STRING title-A, PRELASKOM KURSORA PREKO innerHTML-A
        //JER CU NAKON KREIRANJA INSTANCE I NJENOG KACENJA NA DOM 
        //DEFINISATI CSS KLASU KOJOM SE APLICIRA DA SE SVAKI pointer-event NE MOZE "TRIGGER-OVATI"
        //A TU KLASU CU DODATI ELEMENTU (A TAJ MOGUCI PRELAZAK KURSORA, PREKO ELEMENTA, JESTE pointer-event)
    }

    //DAKLE KREIRAM SETTER ZA, POMENUTI BOOLEAN ATRIBUT

    set onesposobljen(vrednost){
        if(vrednost){
            this.setAttribute('onesposobljen', "");
        }else{
            this.removeAttribute('onesposobljen');
        }
    }
}
//ONO STO SAM DEFINISAO U CSS A, STO CU PRIKAZATI I OVDE (COMMENTED OUT), JESTE CSS
//PRE TOGA CU RECI SLEDECE, USTVARI RECI CU ZASTO SAM UOPSTE ZELEO DA IMAM, POMENUTI ATRIBUT
//PA ONO STO ZELIM JESTE DA KADA NA ELEMENTU, POSTOJI, POMENUTI ATRIBUT, DA TADA NE FUNKCIONISU
//MOUSE EVENT-OVI, I DA JE ELEMENT NESTO PROZIRNIJI NEGO STO JE TO NORMALNO
//U TU SVRHU MOGU KORISTITI ATRIBUT SELEKTOR U CSS-U
//
//                         .other_rippling[onesposobljen]{
//                              pointer-events: none;
//                              opacity: 0.6;
//                          } 
//
//SADA MOGU REGISTROVATI NOVI CUSTOMIZED BUILT IN div ELEMENT
//ZATIM CU KREIRATI, NOVU INSTANCU, KOJU CU ZAKACITI NA DOM
//PA CU POMENUTOJ NOVOJ INSTANCI, DODATI        onesposobljen       ATRIBUT, KAKO BIH
//VIDEO KAKO CE SE TADA ELEMENT PONASATI

window.customElements.define('other-rippling-div', OtherRipplingDiv, {extends: 'div'});

const someOtherRipplingDiv = new OtherRipplingDiv(420, 210);

rootElementi[12].appendChild(someOtherRipplingDiv);

someOtherRipplingDiv.setAttribute('onesposobljen', '');

someOtherRipplingDiv.removeAttribute('onesposobljen');

//AKO POKUSAM DA PROMENIM NEKE ATRIBUTE, ODNOSNO KARKTERISTIKE, NASLEDJENE OD PREDHODNE KLASE
//I TO MOGU URADITI
someOtherRipplingDiv.width = 680;
someOtherRipplingDiv.backgroundColor = 'silver';
//TREBAM IMATI SLEDECU STVAR NA UMU, KOJA PROIZILAZI IZ CINJENICE DA U GORNJOJ KLASI NISAM 
//DEFINISAO         static get observedAttributes   A NI   attributesChangedCallback
//DA JESAM, TO BI OVERRIDE-OVALO, SVE ONO STO SAM U OBIMAIMA POMENUTIH METODA DEFINISAO, U ONOJ KLASI
//IZ KOJE NASLEDJUJE    OtherRipplingDiv       (REC JE O KLASI DivRipple)
//I POMENUTE KARAKTERITIKE (NASLEDJENE IZ PREDHODNE KLASE NE BI SE MOGLE PROMENITI)
//TAKVU GRESKU PLANIRAM DA NAPRAVIM U SLEDECEM PRIMERU

//POSTIGAO SAM STA SAM ZELEO OVIM PRIMEROM, STO SAM I VIDEO NAKON TESTIRANJA,
//SAGLEDAO SAM, POMENUTU REFLEKSIJU, A ISTO SAM SVE MOGAO POSTICI I OBSERVING-OM PROMENA, U POGLEDU
//atributa      onesposobljen   , ODNOSNO KORISCENJEM       attributeChangedCallback    -A
//STO SAM, VEC RANIJE I POKAZAO
//ALI U CILJU VEZBE CU OPET EXTENDOVATI KLASU , KRIRAJUCI NOVU KLASU, GDE CU DEFINISATI OBSERVING 
//NOVOG ATRIBUTA, KOJI CE TAKODJE BITI BOOLEAN
//NJIME CE SE DODAVATI      box-shadow
//ZASTO OVO RADIM, PA ZATO STO U PROSLOM PRIMERU NISAM KORISTIO     static get observedAttributes
//A NISAM KORISTIO NI       attributesChangedCallback

//NECU NI U SLEDECEM PRIMERU KORISTITI, POMENUTO, VEC U PRIMERU, POTPUNOM DUPLIKATU, SLEDECEG
//TO RADIM, JER ZELIM DA NAMERNO NAPRAVIM GRESKU U POGLEDU DEFINISANJA static get observedAttributes
// I attributesChangedCallback-A

class RipplingShad extends OtherRipplingDiv {
    constructor(sirina, visina, boja){
        super(sirina, visina, boja);

    }

    static get observedAttributes(){
        return ['shadow'];
    }

    attributeChangedCallback(name, oldV, newV){
        if(name === "shadow" && !oldV){
            this.style.boxShadow = "20px 18px orange";
        }
    }
}



window.customElements.define('rippling-shad', RipplingShad, {extends: 'div'});

const rippShad = new RipplingShad(420, 210);

rootElementi[13].appendChild(rippShad);

rippShad.setAttribute('shadow', '');

rippShad.onesposobljen = true;
rippShad.onesposobljen = false;

rippShad.backgroundColor = "yellow";
rippShad.width = 50;
rippShad.height = 80;


////////DEFINISANJE box-shadow VREDNOSTI U OVOM SLUCAJU JE BILO USPESNO
/////ZATIM BILO JE USPESNO 'ONEMOGUCENJE' OVOG ELEMENTA, I NJEGOVO PONOVNO 'OMOGUCENJE'
////STO JE KARAKTERISTICNO ZA SVAKU OtherRipplingDiv KLASU IZ KOJE RipplingShad NASLEDJUJE
//////      ALI ONO STO NIJE USPELO JESTE ONO STO JE KARAKTERISTIKA     DivRipple KLASE IZ KOJE
////NASLEDJUJU I OtherRipplingDiv KLASA, A I KLASA ELEMENTA, KOJIM SE TRENUTNO BAVIM
/////DAKLE ONO STO NIJE USPELO JESTE DEFINISANJE NOVOG BACKGROUND COLOR-A, A NIJE USPELAO NI PROMENA
/////SIRINE, NI PROMENA VISINE, SVE ONO STO JE KARAKTERISTICNO, ZA DivRipple KLASU, A CIJE PROMENE
//// JESU DEFINISANE U OBIMU    attributechangedCallback-A, POMENUTE KLASE I CIJE PRACENJE JE
////DEFINISANO U OBIMU   static get observedAttributes METODE
////DAKLE, POMENUTE METODE DivRipple KLASE SU OVERRIDEN, SA ISTOIMENIM METODAMA RipplingShad KLASE
////KOJA JE 'KLASA NASLEDJIVACICA'

////ZATO NA RipplingShad KLASU, VISE NECU OBRACATI PAZNJU, VEC CU KREIRATI NOVU KLASU

//// KLASA CE NOSITI IME        RipplingShadBetter      IMA CE SLEDECU "STAZU NASLEDJIVANJA"

//      RipplingShadBetter   <---- OtherRipplingDiv   <---- DivRipple      

//PRE TOGA PODSETICU SE JEDNOG NIZA, KOJI SAM KREIRAO, A KOJI JE POVRATNA VREDNSOT
//  static get observedAttributes       METODE, DivRipple INSTANCE

console.log(    nizPosmatranihAtributa    );  //  --> ['width', 'height', 'background-color', 'hidden']      
                                              //DEFINISAN U REDU :1877
//OVAJ NIZ JE NARAVNO VREDNOST GLOBALNE VARIJABLE (KADA SAM GA KREIRAO, TADA SAM I OBJASNIO ZASTO JE TAKO)

//PODSETICU SE, JOS NECEGA, NAIME, JA NISAM DODELU VREDNSOTI style-U, DEFINISAO DIREKTNO U OBIMU
//  atributeChangedCallback-A   DivRipple    INSTANCE, VEC SAM TO URADIO POZIVANJEM METODE (INSTNCE ISTE KLASE)
//U OBIMU, POMENUTOG LIFECYCLE CALLBACKA
//METODA, KOJA JE POZVANA JESTE SLEDECA:          whenAttributeChange       
//POZVANA JE NARAVNO OVAKO:  this.whenAttributeChange(name, oldVal, newVal);    //RED  :2031    

//POSTO SAM SE PODSETIO POMENUTOGA, POCECU SA DEKLARISANJEM     RipplingShadBetter      KLASE
//ALI PE DEFINISANJA KLASE MOGU DODATI JEDAN STRING, NIZU, KOJEG SAM SE PRISETIO
//      nizPosmatranihAtributa.push('shadow');
//REC JE O STRINGU 'shadow', JER CE UPRAVO 'shadow' BITI ATRIBUT, KOJI MOZE IMATI INSTANCA SLEDECE
//KLASE KOJU CU DEFINISATI SADA (RipplingShadBetter)

//MEDJUTIM KADA SAM KREIRAO POMENUTI NIZ (VREDNOST GLOBALNE VARIJABLE), JA NISAM ZNAO DA JE POMENUTOM
//NIZU, MOGUCE PRISTUPITI PUTEM SAMOG STATICKOG GETTERA 
//  observedAttributes
//BILO KOJE KLASE, ODNOSNO WEB KOMPONENTE

//DAKLE, PRISTUPAM POMENUTOM NIZU NA SLEDECI NACIN

console.log(  DivRipple.observedAttributes  ); //-->-->  ['width', 'height', 'background-color', 'hidden']
//ILI UZ POMOC KLASE, KOJA EXTENDS DivRipple
console.log( OtherRipplingDiv.observedAttributes ); //--> ['width', 'height', 'background-color', 'hidden']

//TAKO DA POMENUTI NIZ, NIJE MORAO, USTVARI NIJE NI TREBAO BITI VREDNOST GLOBALNE VARIJABLE, ONDA KAD 
//, ODNOSNO PRE NEGO STO SAM DEFINISAO DA POMENUTI NIZ BUDE POVRATNA VREDNOST, VEC MNOGO PUTA,
// POMINJANOG STATICKOG GETTER-A, KLASE DivRipple
//  KADA TO ZNAM, PROSTO MOGU DEFINISATI DA POVRATNA VREDNSOT ISTOG STATICKOG GETTERA, NOVE KLASE
// UPRAVO BUDE PRIMENA STATICKOG GETTER-A, ONE KLASE IZ KOJE NOVA KLASA NASLEDJUJE
//  STO ZNACI DA POVRATNA VREDNSOT, POMENUTOG STATICKOG GETTER-A, MOZE BITI SLEDECA
            //NOVI NIZ SASTAVLJEN OD SLEDECIH
        //           super.observedAttributes    + NIZ CIJI JE CLAN IME ATRIBUTA,
                                                    //KARAKTERISTICNOG ZA NOVU KLASU
//  super CE SE U NARESNOM SLUCAJU ODNOSITI, NARAVNO NA     OtherRipplingDiv    KLASU

class RipplingShadBetter extends OtherRipplingDiv {
    constructor(sirina, visina, backgroundColor){
        super(sirina, visina, backgroundColor);
    }

    static get observedAttributes(){
        const attributesArray = super.observedAttributes;
        return attributesArray.concat(['shadow']);
    }

    //OSTAJE MI JOS DA DEFINISEM attributesChangedCallback
    //AKO SE PODSETIM, SETICU SE DA SAM DODELU STILOVA (ZA INSTANCE DivRipple KLASE) DEFINISAO
    //U POSEBNOJ METODI, KOJU SAM ONDA POZVAO U OBIMU attributesChangedCallback, KLASE DivRipple
    //REC JE O METODI   whenAttributeChange
    attributeChangedCallback(name, oldval, newval){
        //E PA POMENUTU METODU I OVDE POZVATI
        this.whenAttributeChange(name, oldval, newval);
        //ALI POZVACU I NOVU METODU, KOJU SAM DEFINISAO ISPOD OVOG LIFECYCLE CALLBACK-A
        //JASNO MI JE DA CODE TE METODE DEFINISE DODELU STILOVA, U RELACIJI SA shadow ATRIBUTOM
        // INSTANCE
        this.whenShadowChange(name, oldval);
    }
    
    whenShadowChange(name, oldValue){
        if(name === 'shadow' && !oldValue){
            this.style.boxShadow = "8px 14px #759786d3";
        }
    }
}

//REGISTRACIJA CUSTOMIZED ELEMENTA, ZATIM KREIRANJE JEDNE INSTANCE CUSTOMIZED ELEMENTA 
//I NJENO KACENJE U DOM

window.customElements.define('ripp-div', RipplingShadBetter, {extends: 'div'});
const betterDiv = new RipplingShadBetter(580, 214);
rootElementi[14].appendChild(betterDiv);

//ELEMENT JESTE RENDER-OVAN NA STRANICI
//SADA CU PROVERITI , DA LI CE SE ELEMENTU DODATI BOX SHADOW, KADA POMENUTOM ELEMENTU DODAM
//shadow ATRIBUT

betterDiv.setAttribute('shadow', "");

//AKO POGLEDAM STRANICU, VIDECU DA JE BOX SHADOW USPESNO DODAT, POMENUTOM ELEMENTU
//SADA CU POVECATI VISINU, POMENUTOG ELEMENTA

betterDiv.height = 416;

////AKO POGLEDAM STRANICU, VIDECU DA ELEMENT IMA NOVU VISINU


////PRE NEGO STO NASTAVIM SA OBJASNJAVANJEM CUSTOM ELEMENATA, DOBRO BI BILO DA ODRADIM PRIMER

//// NASTAVICU SA OBJASNJENJIMA VEZANIM ZA CUSTOM ELEMENTE, TAKO STO CU DODATI NESTO VAZNO
//// A STO SAM I PRIMETIO, TOKOM BAVLJENJA SA HTML-OM, ALI I SADA, TOKOM UNOSENJA TAGOVA, CUSTOM
//// ELEMENATA U HTML

////ONO STO JE KARAKTERISTICNO ZA CUSTOM ELEMENTE JESTE PROGRESIVNO POBOLJSANJE, ODNOSNO
////PROGRESSIVE ENHANCEMENT
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////NAIME, CUSTOM ELEMENTI SE MOGU KORISTI, I PRE NEGO STO JE NJIHOVA DEFINICIJA REGISTROVANA
////MOGUCE JE DEKLARISATI GOMILE CUSTOM TAGOVA, BEZ TOGA DA REGISTRUJEM CUSTOM ELEMENTE
////TO JE ZBOG OSOBIME NHTML-A
////EVO, KREIRACU ELEMENT, KOJI NIJE NATURAL HTML ELEMENT, A NIJE NI REGISTROVAN KORISCENJEM define METODE

////A SVI TI TAGOVI, KOJI U SVOM IMENU NEMAJU CRTICU PARSE-UJU SE KAO
////        HTMLUnknownElement          INSTANCE, PORED TOGA STO SU I   HTMLElement     INSTANCE  
//
////STO SE NE DOGADJA SA CUSTOM ELEMENTIMA, KOJI SU NARAVNO HTMLElement INSTANCE,  
//AKO SU KREIRANI SA VALIDNIM IMENOM (U KOJE SE UBRAJA I CRTICA (-)); DAKLE ONI NISU I
//  HTMLUnknownElement INSTANCE

//POKAZACU SLEDECIM PRIMERIM, ONO STO SAM GORE POMENUO

console.log(    document.createElement('neko-dugme') instanceof HTMLElement  );  //     true
console.log(    document.createElement('neko-dugme') instanceof HTMLUnknownElement  );  //     false


console.log(    document.createElement('dugmeneko') instanceof HTMLUnknownElement    );  //  true
console.log(    document.createElement('dugmeneko') instanceof HTMLElement    );         //  true

//   'neko-dugme'  VALIDNO CUSTOM ELEMENT IME       'dugmeneko'     NEVALIDNO CUSTOM ELEMENT IME


//DAKLE, KAO STO SAM REAKO, MOGU DELARISATI GOMILU neko-dugme ELEMNATA, NA STRANICI, BEZ SLEDECEG POZIVANJA
//      window.customElements.define('neko-dugme',.....)
//KOJE MOGU DEFINISATI, KASNIJE (POZIVANJE)
//TO POZIVANJE define METODE SE NAZIVA:
////                                        "ELEMENT UPGRADE"
//I TO JESTE ENDOWING (POBOLJSANJE, PROSIRENJE, OBDARENJE) POSTOJECEG ELEMENTA SA class DEFINICIJOM
////
//// PRI OVAKVOM SLUCAJU NAROCITO JE INTERESANTNA JOS JEDNA METODA CustomElementRegistry INSTANCE, A TO JE
//
//          whenDefined 
//KAO ARGUMENT JOJ SE DODAJE IME CUSTOM TAGA
//POVRATNA VREDNOST, OVE METODE JESTE Promise INSTANCA, KOJ SE RESOL-UJE, TEK ONDA, KADA SE IZVRSI 
//define METODA 
//POSTO JE REC O Promise-U, NA NJEGA SE MOZE CHAIN-OVATI then METODA , SA CALLBACK ARGUMENTOM
//KOJI BI SE SLAO U QUEUE, TEK KAD SE IZVRSI define

const kont_neki = document.querySelector(".neki_kont");
const some_cust = document.createElement('some-element');
some_cust.innerHTML = "TEKST TEKST TEKST TEKST tekst";

kont_neki.appendChild(some_cust);

const PromiseOb = window.customElements.whenDefined('some-element');

PromiseOb.then(val => {
//    console.log(val, "neka radnja");
});

console.log("blocking code");
console.log("blocking code");
console.log("blocking code");
console.log("blocking code");
console.log("blocking code");
console.log("blocking code");
window.setTimeout(ev=>{
    window.customElements.define('some-element', class extends HTMLElement {
        constructor(){
            super();
            this.style.display = "block";
            this.style.width = "200px";
            this.style.height = "100px";
            this.style.backgroundColor = "pink"
        }
    });

//    console.log(ev);

}, 4000);

//MOGAO SAM PRIKAZATI I NESTO BOLJI PRIMER; A LI TO CU URADITI, TEK KAD OBJASNIM JEDNU CSS PSEUDO KLASU
//REC JE O CSS PSEUDO KLASI         :defined
//OVAKAV CODE IMAM U CSS FAJLU

`
    aside:defined {
        background-color: olive;
    }

    novitag:defined {
        background-color: pink;
    }

    novi-tag:defined {
        background-color: yellow;
    }

`
//ONO STO JE INTERESANTNO ZA OVU PSEUDO KLASU JESTE DA SE NJOME ZA STILIZOVANJ, SELEKTUJU ELEMENTI,
//KOJI SU DEFINISANI (REGISTROVANI)

const nestingSpot = document.querySelector('#nesting_spot');

const textsForNesting = [
    "some explanation, blah blah",
    "different text",
    "podcasts are legitness"
];
const o = {
    natural: document.createElement('aside'),
    unknown: document.createElement('novitag'),
    custom: document.createElement('novi-tag')
};
o.natural.innerHTML = textsForNesting[0];
o.unknown.innerHTML = textsForNesting[1];
o.custom.innerHTML = textsForNesting[2];

nestingSpot.appendChild(o.natural);
nestingSpot.appendChild(o.unknown);
nestingSpot.appendChild(o.custom);

//TESTIRACU JOS JEDNOM OVE ELEMENTE U POGLEDU INSTANIC HTMLElement      I   HTMLUnknownElement

console.log(o.natural instanceof HTMLElement, o.natural instanceof HTMLUnknownElement); // true   false
console.log(o.unknown instanceof HTMLElement, o.unknown instanceof HTMLUnknownElement); // true   true 
console.log(o.custom instanceof HTMLElement, o.custom instanceof HTMLUnknownElement);  // true  false

/////////////////////////////////////////////////////////////////////////////////////////////////////

//ONO STO MOGU VIDETI NA STRANICI JESTE DA SU NOVI BACKGROUND COLOR DOBILI NATURALNI I UNKNOWN ELEMENT
//ALI TO NIJE DOBIO CUSTOM ELEMENT, JER JOS NIJE REGISTROVAN (define)

//SADA CU KORISTITI, POSEBNU, BAR ZA MENE
//     PSEUDO KLASU      :not()
//ZAJEDNO SA :defined
//ALI SAMO U SLUCAJU CUSTOM ELEMENTA
`
    aside:defined {
        background-color: olive;
    }

    novitag:defined {
        background-color: pink;
    }

    novi-tag:not(:defined) {
        background-color: yellow;
    }
`

//POSTO SAM KORISTIO KLASU NEGACIJE,         :not()         I TO SA :selected PSEUDO KLASOM KAO PARAMETROM
//STO BI SE MOGLO PREVESTI NA:
            //                      OVE STILOVE APLICIRAJ NA ELEMENT KOJI NIJE DEFINISAN

//RENDER-OVANI CUSTOM ELEMENT JE DOBIO      ZUTI        BACKGROUND COLOR     
//REGISTROVACU GA

//I DOBIO JE BACKGROUND COLOR

//SADA CU KREIRATI JEDAN PRIMER, U KOJEM CU KORISTITI, POMENUTU     whenDefined     METODU
//A KORISTICU I :defined CSS KLASU ALI I :not() CSS KLASU, KAKO BI SELEKTOVAO ODREDJE CUSTOM ELEMENTE

//IDEJA JE SLEDECA:
        //NESTOVATI NEREGISTROVANI CUSTOM ELEMENT, U KOJEM TREBA DA SE PRIKAZU PODACI, KOJI SE
        //ZAHTEVAJU SA SERVERA, ALI KAO STO ZNAM TIM PODACIMA TREBA VREMENA DA STIGNU DO KORISNIKA

        //TAKODJE U ISTOM CONTAINER-U, TREBA NEST-OVATI PLACEHOLDER ELEMENT

        //MOGU KORISTITI ASINHRONOST setTimeout METODE, KAKO BI SIMULIRAO SLANJE PODATAKA SA SERVERA

//ONO STO CU PRVO URADITI JESTE KREIRANJE KLASE, ODNOSNO KOMPONENTE, KOJA BI ENDOW-OVALA CUSTOM 
//ELEMENT, TEK KAD SE PREUZMU PODACI SA SERVERA 



class NekiAnchor extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        const divEl = document.createElement('div');
        divEl.style.width = "100%";
        divEl.style.border = "red solid 2px";
        divEl.style.height = "1.8rem";
        divEl.style.display = "block";
        divEl.style.backgroundColor = "#67f19c85";
        divEl.style.textAlign = "center";
        
        divEl.style.color = "#16181d";
        const anchor = document.createElement('a');
        anchor.setAttribute('href', '#');
        
        anchor.innerText = "loading...";
        anchor.style.textDecorationLine = "none";

        divEl.appendChild(anchor);
        const styles = `
            a {
                color: #16181d;
                opacity: 0;
            

                transition-property: opacity;
                transition: 6s ease-in-out;
            }

            .opacity_trans {
                opacity: 1;
            }
        `;
        const styleEl = document.createElement('style');
        styleEl.textContent = styles;

        this.shadowRoot.appendChild(divEl);
        this.shadowRoot.appendChild(styleEl);

        anchor.addEventListener('click', ev => {ev.preventDefault()});
    }

    set valueChanger(val){
        this.shadowRoot.querySelector('a').innerText = val;
    }
}

class NekiMenu extends HTMLElement {
    constructor(){
        super();
        this.style.width = "68vw";
        const allAnchors = this.querySelectorAll('neki-anchor');
        const length = allAnchors.length;
        this.style.display = "block"
        this.style.height = `${length * 2}rem`;
        this.style.border = "pink solid 1px";
        this.style.textAlign = "center";
        this.style.overflow = "hidden"
        const divPlaceholder = document.createElement('div');
        divPlaceholder.innerText = "Loading...";
        this.appendChild(divPlaceholder);

        //SIMULIRANJE (MAKE BEILIVE) AJAX ZAHTEVA, U MOM SLOBODNOM IZVODJENJU, UZ POMOC    setTimeout

        const nonRegisteredAnchors = this.querySelectorAll(':not(:defined)');
        const nonRegisteredLength = nonRegisteredAnchors.length;

        const contentArray = [];

        let trajanjeZahteva = 2000;  

        for(let i = 0; i < nonRegisteredLength; i++){
            const podaci = ['ayohuasca', 'grass', 'yoga', 'meditation', 'cold water'];
            window.setTimeout(ev => {
                contentArray.push(podaci[i]);

                if(contentArray.length === nonRegisteredLength){
                    window.customElements.define('neki-anchor', NekiAnchor);
                }

            }, trajanjeZahteva+=400);
        }

        window.customElements.whenDefined('neki-anchor').then(()=>{
            let i =0;
            //console.log(nonRegisteredAnchors);
            //console.log(contentArray);
            for(let anch of nonRegisteredAnchors){
                //console.log(anch);
                anch.valueChanger = contentArray[i++];
                //console.log(anch.shadowRoot.querySelector('a'));
                anch.shadowRoot.querySelector('a').classList.add('opacity_trans');
                divPlaceholder.remove();
            }
        });
    }
}

window.customElements.define('neki-menu', NekiMenu);

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

//KREIRACU I JEDAN PRIMER, U KOJEM CU KORISTITI     Promise.all     FUNKCIJU, A TAKODJE I PROPERTI 
//localName KOJIM, MOGU PRISTUPITI IMENU TAGA, NEKOG HTML ELEMENTA (OVO CE BITI KORISNO)

//POCECU TAKO STO CU KREIRATI NOVU KOMPONENTU (CUSTOM ANCHOR ELEMENT)

class SomeAnchor extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        const divElement = document.createElement('div');
        const anchorElement = document.createElement('a');
        const styleElement = document.createElement('style');
        divElement.classList.add('an_kont');

        this._nestedText = this.textContent;
        anchorElement.textContent = this._nestedText;
        anchorElement.setAttribute('href', '#');
        const styleContent = `
            .an_kont {
                box-size: border-box;
                display: inline-block;
                border: pink solid 1px;
                text-align: center;
                margin-top: 4px;
                margin-left: 8px;
                margin-bottom: 4px;
                padding: 2px;
                font-size: 1.4rem;
                height: 1.4rem;
                background-image: linear-gradient(48deg, lightseagreen, tomato);
            }
            
            .an_kont > a {
                color: #292f38;
                text-decoration-line: none;
            }

            .an_kont > a {
                opacity: 0;
                transition-property: opacity;
                transition-duration: 4s;
                transition-timing-function: ease-out;
            }

            .an_kont[opacitated] a {
                opacity: 1;
            }

            .an_kont > a:visited {
                color: #292f38;
            }

            .an_kont > a:active {
                color: lightcyan;
            }

            .an_kont[left_floating] {
                float: left;                /*OBRATI PAZNJU NA ELEMENTE KOJI SU ISTE KLASE*/
            }                               /*A KOJI BI NA PRIMER MOGLI BITI NESTED NEGDE DRUGDE*/
                                            /*U TOM SLUCAJU float JE DOBRO OVAKO DEFINISATI 
                                            /*UZ POMOC DODELJIVANJA ATRIBUTA*/
            
            /*this , ODNOSNO CUSTOM ELEMENT, SE MOZE SELEKTOVATI*/
            /*UZ POMOC :host PSEUDO KLASE ALI OVO SE SAMO MOZE*/
            /*URADITI IZ SHADOW DOM-A, KAO STO JE OVDE SLUCAJ*/
            
            /*:host {

            }*/
            /*.an_kont > a:hover {
                color: wheat;
            }*/
            /*.an_kont:defined {
                box-shadow: green 10px 10px;
            }*/
            /*.an_kont:defined a {
                opacity: 1;
            }*/
            /*.an_kont[opacitated]  a:hover {
                opacity: 1;
            }*/
        `;

        styleElement.textContent = styleContent;
        divElement.appendChild(anchorElement);
        this.shadowRoot.appendChild(styleElement);
        this.shadowRoot.appendChild(divElement);

        anchorElement.addEventListener('click', ev => {
            ev.preventDefault();
        });
    }

    set opacitated(val){
        if(val){
            this.shadowRoot.querySelector('.an_kont').setAttribute('opacitated', '');
        }else{
            this.shadowRoot.querySelector('.an_kont').removeAttribute('opacitated');
        }
    }

    set leftFloating(val){
        if(val){
            this.shadowRoot.querySelector('.an_kont').setAttribute('left_floating', '');
        }else{
            this.shadowRoot.querySelector('.an_kont').removeAttribute('left_floating');
        }
    }
}

//window.customElements.define('some-anchor', SomeAnchor);

        ///////OBRATI PAZNJU, TRANZICIJA SE NE MOZE 'TRIGGEROVATI'(DODELOM KLASE ILI ATRIBUTA ELEMENTU)
        /////U OBIMU then-OVOG CALLBACKA
        /////ZATO NE TREBA KORISTITI Promise-E,
        /////MENI JE POSLUZIO CALLBACK 

/*console.log(document.querySelector('#nesting_kont some-anchor'));
new Promise(function(resolve, reject){
    resolve(document.querySelector('#nesting_kont some-anchor'));
}).then(function(customAnchor){
    setTimeout(function(ev){
        customAnchor.opacitated = true;
    }, 0);
});*/

//SADA CU DEFINISATI CUSTOM CONTAINER, KOJI TREBA DA "ENKAPSULISE" GRUPU CUSTOM ANCHOR-A

class AnchorGroup extends HTMLElement {
    constructor(){
        super();
        
        //IZBOR (I SKLADISTENJE) SVIH NEREGISTROVANIH CUSTOM ANCHOR-A
        this._unregAnchs = this.querySelectorAll(':not(:defined)');
        this._unregNumber = this._unregAnchs.length;
        this._klasaAnchora = SomeAnchor;

        console.log(this._unregAnchs, this._uregNumber);

        const divElement = document.createElement('div');
        const styleElement = document.createElement('style');
        const bodyNeue = document.createDocumentFragment();

        this.attachShadow({mode: 'open'});

        const styles = `
            .an_gr {
                border: olive solid 1px;
                diplsy: block;
                width: 78%;
                position: relative;
            }

            .an_gr[plh]::before {
                display: inline-block;
                content: "Loading...";
                position: absolute;
                left: 0px;
                top: 0px;
            }
            
            /*ZELIM DA NEREGISTROVANI some-anchor ELEMENTI ZAUZMU PROSTOR, ISTI ONAKAV, KAKV BI 
            ZAUZIMALI, DIV ELEMENTI IZ NJIHOVOG SHADOW DOM-A(KADA SE REGISTRUJU) 
            NA OVAJ NACIN SLUZE KAO PLACEHOLDERI (REGISTROVANIH ELEMENATA)
            U CONTAINERU (DIV ELEMNTU SHADOW ROOT-A, anchor-group TAGA), KOJI JE MOGUCE RESIZOVATI*/
            /*BITAN STIL OVOG SELEKTORA JESTE visibility*/
            /*NEKI STILOVI SU SUVISNI, JER SU PREKOPIRANI IZ PREDHODNE KOMPONENTE
            BITNI SU SAMO ONI KOJI SE TICU DIMENZIJA*/
            
            .an_gr > some-anchor:not(:defined) {
                box-size: border-box;
                display: inline-block;
                border: pink solid 1px;
                text-align: center;
                margin-top: 4px;
                margin-left: 8px;
                margin-bottom: 4px;
                padding: 2px;
                font-size: 1.4rem;
                height: 1.4rem;
                background-image: linear-gradient(48deg, lightseagreen, tomato);
                visibility: hidden;
            }
            
        `;

        styleElement.textContent = styles;
        
        divElement.classList.add('an_gr');

        //KACENJE CUSTO ANCH-OVA NA FRAGMENT
        for(let anch of this._unregAnchs){
            bodyNeue.appendChild(anch);
        }

        divElement.appendChild(bodyNeue);

        this.shadowRoot.appendChild(styleElement);
        this.shadowRoot.appendChild(divElement);

        this.plh = true;

        //POTREBNO JE U "SLUCAJU SVAGOG OD" (OVDE SAM STAVIO),
        // NESTED NEREGISTROVANIH CUSTOM ANCHOR-A DEFINISATI
        //OVO RADIM, DA BI IMAO NIZ PROMISE-A, JER MI JE POTREBNO DA TAJ NIZ BUDE DOSTUPAN
        //KAO ARGUMENT ZA Promise.all POZIVANJE
        //OVO CE IZGLEDATI MALO NELOGICNO, ODNOSNO PRVA DVA OD DVA NACINA
        
        //PRVI NACIN
        const nizPromisea = [...this._unregAnchs].map(anch => 
            window.customElements.whenDefined(anch.localName)      
        );
        
        //DRUGI NACIN
        const nizPromisea2 = [];
        for(let anch of this._unregAnchs){
            nizPromisea2.push(window.customElements.whenDefined(anch.localName));
        }

        //TRECI NACIN
        const nizPromisea3 = [];
        for(let i = 0; i < this._unregNumber; i++){
            nizPromisea3.push(window.customElements.whenDefined('some-anchor'));
        }

        //IDEJA IZA OVOGA JESTE DA, KADA SVAKI OD ELEMENATA BUDE REGISTROVAN (IAKO JE REC O 
        //VISE ELEMENATA, KOJE TREBA DA PREDSTAVLJA, JEDAN TE ISTI NAME (TAG), I DA BUDU ENDOWED 
        //JEDNOM TE ISTOM KLASOM, OVO SE RADI DA BIH IMAO NIZ PROMISE-A, KOJI KADA SE SVI BUDU RESOLVE-OVALI
        //MOCI CE SE ODRADITI NESTO DRUGO DEFINISANO then METODOM

        Promise.all(nizPromisea).then(() => {
            window.setTimeout(ev => {
                this._unregAnchs.forEach(anch => {
                    anch.opacitated = true;                    
                });
            }, 2);
            //console.log(this._unregAnchs);
        });

        //PRVO SALJEM ZAHTEV SERVERU
        const thisEl = this;

        this.serverRequestSimulation().then(serverData => {
            //HRANIM ANCHORE, PODACIMA
            let brojac = 0;
            this._unregAnchs.forEach(anch => {
                anch.setAttribute('mock-url', serverData[brojac++]);
            });

            //
            this.plh = false;

            //REGISTRUJEM
            window.customElements.define(this._unregAnchs[0].localName, this._klasaAnchora);
            
        });
       

        //window.customElements.define('some-anchor', SomeAnchor);

    }

    //METODE
    //METODA, KOJA SIMULIRA SERVER REQUEST (PODACI CE STIZATI 4 SEKUNDE)
    serverRequestSimulation(){
        const serverData = [
            '#mock-link-podcasts',
            '#mock-link-authors',
            '#mock-link-herbs',
            '#mock-link-teas'
        ];

        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                resolve(serverData);
            }, 2000);
        });
    }

    //SETTERS
    set plh(val){
        if(val){
            this.shadowRoot.querySelector('.an_gr').setAttribute('plh', '');
        }else{
            this.shadowRoot.querySelector('.an_gr').removeAttribute('plh');
        }
    }

}

window.customElements.define('anchor-group', AnchorGroup);

//console.log(window.customElements.get('anchor-group'));
////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///PRE NEGO STO NASTAVIM, MORAM SE OSVRNUTI I RECI, DA KADA SE CUSTOM ELEMENT REGISTRUJE
    /*`
        neki-custom:not(:defined) {
            stilovi
        }
    `*/
////////////VISE NE VAZI SELEKTOVANJE   :not(:defined)          JER JE ELEMENT POSTAO       :defined
//POMENUTO SE, JOS NAZIVA I PREESTYLING CUSTOM ELEMENATA
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

///////////////STILIZOVANJE
//IAKO POSTOJI style TAG U shadowRoot-U, DALJE STILIZOVANJE CUSTOM ELEMENATA, IZVAN SHADOW DOM-A,
//ODNOSNO USER DEFINED STILIZOVANJE, MOZE OVERRIDOVATI, ONE STILOVE KOJE SU DEFINISANI U SHADOW DOM-U 







//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////TEMPLATES AND SLOTS
////////////////////////////// OBRAZCI I SLOTOVI
//
//
//POCECU S PRIMEROM

//  OVO SAM DEFINISAO U HTML-U
`
<template id="my_paragraph">
    <p>My paragraph</p>
</template>
<div class="za_obrazac"></div>
`

const template = document.getElementById('my_paragraph');
const templateContent = template.content;                   //OVO JE DOCUMENT FRAGMENT
                                                            //KOJI KAD STAMPAM NE PRIKAZUJE SADRZINU
console.log(templateContent);

console.log(templateContent.__proto__);             //I ON IMA SVOJE METODE I PROPERTIJE

//JEDAN OD PROPERTIJA JE
console.log(templateContent.children);              //PRE NEGO STO JE APPEND-OVAN NA DOM
                                                    //OVAJ children NIZ IMA CLANOVE KOJI SU
                                                    //ELEMENTI FRAGMENTA, A KADA SE APPEND-UJE
                                                    //POMENUTI NIZ JE PRAZAN

//document.querySelector('.za_obrazac').appendChild(templateContent);

/////////////////////////////////////////////////////////////////////////////////
//KORISCENJE TEMPLATE-OVA SA WEB KOMPONENTAMA
//
//NECU SUVISNO OBJASNJAVATI, VEC CU SAMO RECI DA CE U OVOM SLUCAJU KORISTI      cloneNode   METODA
//Node-OVOG     PROTOTIPA

window.customElements.define('my-paragraph', class extends HTMLElement {
    constructor(){
        super();
        const templejt = document.getElementById('my_paragraph');
        const templejtSadrzina = templejt.content;
        //ONO STO RANIJE NISAM ZNAO JESTE DA POVRATNA VREDNOST      appendChild     METODE JESTE
        //ELEMENT NA KOJI SE METODA PRIMENILA, ODNOSNO NA KOJI JE NESTO APPENDOVANO, POMENUTOM METODOM 
        const shadowDom = this.attachShadow({mode: 'open'}).appendChild(templejtSadrzina.cloneNode(true));
        //AKO SE BOOLEAN true DODA KAO ARGUMENT PRIMENI cloneNode METODE, TO ZNACI DA CE ZAJEDNO SA 
        //Node
        //ELEMENTOM BITI KLONIRANI I NJEGOVI children ELEMENTI
        //DA SAM DODAO false, BIO BI KLONIRAN SAMO NODE NAD KOJI MSE METODA PRIMENILA
        
        //DAKLE, U OVOM SLUCAJU, KLONIRAN JE FRAGMENT, KOJI OBUHVATA SVE ELEMENTE, NESTOVANE, 
        //U template-U
        //I TAJ CLONE JE, ONDA ZAKACEN U shadowRoot, MOG CUSTOM ELEMENTA  
    }
});

//ONO STO SAM MOGAO URADITI, A NISAM U PREDHODNOM PRIMERU, JESTE DA DODAM, ODNOSNO NESTUJEM style TAG, 
//(NARAVNO ZAJEDNO SA STILOVIMA) U TEMPLATE; NA TAJ NACIN KADA KLONIRAM, SVU TU SADRZINU TEMPLATE-A, I
//ZAKACIM JE U SHADOW DOM, CUSTOM ELEMENTA, NA TAJ NACIN BIH OBEZBEDIO STILIZOVANJE
//

//OVDE SAMO PRIKAZUJEM, KAKO IZGLEDA, MOJ TEMPLATE U HTML-U, KOJI SADA IMA NEST-OVAN I STYLE ELEMENT
var ab=`
<template id="my_paragraph">
    <style>
      p {
        color: #211f2a;
        background-color: indianred;
        padding: 8px;
      }
    </style>
    <p>My paragraph</p>
  </template>
`

const mojParagraf = document.createElement('my-paragraph');
document.getElementsByClassName('neki_kont8')[0].appendChild(mojParagraf);


//////DODAVANJE FLEKSIBILNOSTI SA SLOTOVIMA             slots

//TEKST PARAGRAFA (TEMPLATE-A) U HTML-U CU SADA OBUHVATITI   slot  TAGOM, KOJI CE IMATI name   ATRIBUT
//VREDNOST      name        ATRIBUTA CE MI KORISTITI KADA BUDEM UPOTREBLJAVAO POMENUTI SLOT TEMPLEJTA
var a=`
<template id="my_paragraph">
    <style>
      p {
        color: #211f2a;
        background-color: indianred;
        padding: 8px;
      }
    </style>
    <p><slot name="moj-tekst">My paragraph</slot></p>
</template>
`
//ONO STO JE OBUHVACENO slot TAGOM, MOZE BITI PROMENLJIVO
//JA SADA MOGU UPOTREBITI ISTI name ATRIBUT, KADA BUDEM NEST-OVAO NEKI ELEMENT ILI NEKI DRUGI TEKST,
// U my-paragraph CUSTOM ELEMENTU

//SADA CU DIREKTNO U HTML-U, NESTOVATI, POMENUTI my-paragraph CUSTOM ELEMENT, I OVOG PUTA C MU DODATI
//JOS NEKI NESTED SADRZAJ, A TO CE SVE IZGLEDATI OVAKO
//A SLOT REFERENIRAM UZ POMOC       slot        ATRIBUTA
var b =`
<my-paragraph>
      <span slot="moj-tekst" style="font-style: italic;">Neki drugi tekst</span>
</my-paragraph>
`

//ELEMENTI KOJI MOGU BITI INSERTOVANUI U SLOT SE ZOVU       SLOTABLE        ELEMENTI
//A KADA SE ELEMENT INSERT-UJE U SLOT, KAZE SE DA JE        SLOTTED

////SADA CU KREIRATI, JEDAN PRIMER, KOJI NIJE TRIVIJALAN KAO PREDHODNI
///OVOG PUTA CU U template TAGU UCESTVOVATI ELEMENTI, SA KOJIMA SE RANIJE NISAM SUSRETAO
//TO SU     details     I       summary    (ELEMNT FUNKCIONISE TAKO DA KORISNIK MOZE SAKRITI
//ILI POKAZATI DODATNE INFORMACIJE )
//PISACU PRVO OVDE PA CU PREKOPIRATI U HTML
const templ1 = `
    <template id="detalji-elementa-templejt">
        <style>
            details {
                font-family: "Open Sans Light", Helvetica, Arial;
            }
            .ime{
                font-weight: bold;
                color: #217ac0;
                font-size: 120%;
            }
            h4 {
                margin: 10px 0 -8px 0;
            }
            h4 span {
                background-color: #217ac0;
                padding: 2px 6px 2px 6px;
                border: 1px solid #cee9f9;
                border-radius: 4px;
                color: white;
            }
            .atributi {
                margin-left: 22px;
                font-size: 90%;
            }
            .atributi p {
                margin-left: 16px;
                font-style: italic;
            }
        </style>
        <details>
            <summary>
                <span>
                    <code class="ime">
                        &#60;<slot name="ime_elementa">POTREBNO IME</slot>&#62;
                    </code>
                    <i class="opis">
                        <slot name="opis">POTREBAN OPIS</slot>
                    </i>
                </span>
            </summary>
            <div class="atributi">
                <h4><span>Atributi</span></h4>
                <slot name="atributi"><p>Nijedan</p></slot>
            </div>
        </details>
        <hr/>
    </template>
`;

//SADA CU DEFINISATI, ODNOSNO REGISTROVATI, NOVI CUSTOM ELEMENT KOJI CE IMATI IME   detalji-elementa

window.customElements.define('detalji-elementa', class extends HTMLElement {
    constructor(){
        super();
        const templateContent = document.getElementById('detalji-elementa-templejt').content;
        const shadowRoot = this.attachShadow({mode: 'open'}).appendChild(templateContent.cloneNode(true));
    }
});

//POSTO SAM TO URADIO, SADA CU NESTOVATI MOJ NOVI CUSTOM ELEMENT
///////////////////////////////////////////////////////////////////////////

///////////////
//U CILJU VEZBE OPET RADIM, GOTOVO ISTI PRIMER (NOVI TEMPLATE SAM KREIRAO U HTML-U)

window.customElements.define('element-detail', class extends HTMLElement {
    constructor(){
        super();
        const shadowDom = this.attachShadow({mode: 'open'});
        const templateContent = document.getElementById('element_details').content;

        shadowDom.appendChild(templateContent.cloneNode(true));
    }
});
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////SADA CU SE NESTO DETALJNIJE BAVITI shadowDom-OM
//POSTOJE NEKI rootElementi, KOJIMA I NIJE MOGUCE NAKACVITI SHADOW DOM
//      img         IMA SMISLA ZASTO SE NE MOZE
//      input   textarea    IMAJU SVOJ UGRADJEN ISHADOW DOM

//POMENUCU NEKOLIKO TERMINA
//
//  Shadow host: 
//      Regularni DOM node na koji je shadow DOM prikacen
//  Shadow tree:
//      DOM stablo unutar shadow DOM-A
//  Shadow boundary: 
//      mesto na kojem se shadow DOM završava, a regularni DOM počinje
//  Shadow root
//      root node shadow drveta     (OVO JE FRAGMENT) POVRATNA VREDNOST attachShadow METODE 
//                                                    A TAKODJE MU JE MOGUCE PRISTUPITI UZ POMOC
//                                                     shadowRoot       PROPERTIJA  host-A

/////////////////////////////////POCECU S PRIMEROM////////////////

window.customElements.define('some-practice-element', class SomePracticeElement extends HTMLElement{
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        const nekiParagraf = document.createElement('p');

        nekiParagraf.innerHTML = "Neki tekst";

        shadowRoot.appendChild(nekiParagraf);

        //KACENJE shadowRoot-a

        console.log(     shadowRoot          );          //      -->        STAMPA SE FRAGMENT
                                                                            //  A KADA PRITISNE STRLICU
                                                                            //  VIDI SE CELO shadow drvo

        console.log(     this.shadowRoot     );          //      -->         STAMPA SE ISTO STO I GORE

        console.log(     shadowRoot.host     );          //      -->        STAMPA SE
                                                                            //  <some-practice-element></some-practice-element>
                                                                        //I OPET JE PRITISKOM NA STRELICU MOGUCE 
                                                                        //VIDETI STA JE NESTED U POMENUTOM 
                                                                        //CUSTOM ELEMENTU
                                                                        //ZATIM JE MOGUCE VIDETI shadow root
                                                                        //PRITISNUTI STRELICU I GLEDATI OD CEGA SE
                                                                        //DUBLJE SASTOJI
        
        console.log(     this                );          //      -->        STAMPA SE ISTO STO I GORE 
        
        
        const frag = document.createDocumentFragment();

        console.log(frag);      //STAMPAK KLASICNI FRAGMENT U CILJU UPOREDJIVANJA SA shadow root-OM
    
    
        const styles = `
            :host {             /*DA SAM DEFINISAO STILOVE IZVAN SHADOW DOMA 
                                    ODNOSNO DA SAM KORISTIO TAG SELECTOR  some-practice-element  
                                    OVO STO JE DEFININISANO :host SELEKTOROM, NE BI VAZILO*/ 
                color: pink;
            }
        `;
        
        const styleElement = document.createElement('style');

        styleElement.textContent = styles;

        nekiParagraf.appendChild(styleElement);
    }
});
//AKO NESTU-JEM NEKE ELEMENTE U CUSTOM ELEMENTU, ONI NECE BITI RENDER-OVANI, U SLUCAJU POSTOJANJA
//ZAKACENOG SHADOW DOMA

//JA SAM RANIJE JAVASCRIPT-OM, U KONSTRUKTORU, PRISTUPAO, TIM ELEMENTIMA, PA SAM IH KACIO NA ELEMENTE
//SHADOW TREE-JA, MEDJUTIM, JA SAM MOGAO KORISTITI slot-OVE

//SADA CU SE POZABAVITI         KOMPOZICIJOM  SA    slot    ELEMENTIMA

//MEDJUTIM DA SE PRVO UPOZNAM SA TERMINOLOGIJOM

//          Light DOM
//  MARKUP, KOJI UNOSI KORISNIK MOJIH KOMPONENTI, ODNOSNO ONAJ KOJI IH NESTUJE U HTML, ODNOSNO, MISLIM
//  NA ONAJ HTML CODE, KOJI ZIVI IZVAN SHADOW DOM-A; ODNOSNO TO SU DIREKTNA DECA MOG CUSTOM ELEMENTA

//          Shadow DOM
//NECU GA DODATNO KOMENTARISATI, SAMO CU RECI DA JE LOKALAN ZA KOMPONENTU (DEFINISE NJENU UNUTRASNJU 
//STRUKTURU I SCOPED CSS)

//          Flattened DOM drvo      (izravnano DOM drvo)
//     REZULTAT KOJI BROWSER POSTIZE DISTRIBUCIJOM KORISNIKOVOG (DRUGI DEVELOPER) LIGHT DOM-A,
//      U MOJ SHADOW DOM, RENDER-UJUCI FINALNI PROIZVOD
//TO JE ONO STO SE KAO REZULTAT VIDI U ELEMENT SEKCIJI DEV TOOLS-A, I STA JE RENDER-OVANO NA STRANICI
//
//
//SADA CU NASTAVITI SA          slot    -OVMA
//
//Slots are placeholders inside your component that users can fill with their own markup

//Elementima je dozvoljeno da "prelaze" Shadow boundary kada ih poziva <slot>. Ovi elementi se zovu
//DISTRIBUIRANI node-OVI. Konceptualno, distribuirani node-ovi mogu izgledati malo bizarno
//Slotovi, fizicki ne pomeraju DOM; oni ga rende-uju na drugoj lokaciji unutar shadow DOM-A.
//Komponenta može definirati nula ili više slotova u njenom Shadow Dom-u. Slotovi mogu biti prazni ili
//obezbediti rezervni, odnosno fallback, odnosno default sadržaj
// Ako korisnik ne obezbedi light DOM sadržaj, slot pravi svoj rezervni sadržaj

//PRVO CU SE POZABAVITI NEIMENOVANIM SLOTOVIMA, KOJI NEMAJU name ATRIBUT
//AKO, I AKO DEVELOPER NE OBEZBEDI LIGHT DOM, SLOT RENDERUJE, SVOJ FALLBACK SADRZAJ

window.customElements.define('some-hokus-element', class extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        const divEl = document.createElement('div');
        
        const slot1 = document.createElement('slot');
        const slot2 = document.createElement('slot');
        
        slot1.textContent = "Neki Tekst blah blah";
        slot2.textContent = "Drugi tekst blah slah";

        divEl.appendChild(slot1);
        divEl.appendChild(slot2);

        shadowRoot.appendChild(divEl);
    }
});

const ovo_sam_unneo_u_HTML = `
    <some-hokus-element>
        <p>
            Uneo drugi developer
        </p>
    </some-hokus-element>
`;

//  SADA AKO NEST-UJEM MOJ CUSTOM ELEMENT U HTML, I AKO TOG CUSTOM ELEMENTU, OBEZBEDIM SADRZAJ
//  NA STRANICI CE SE RENDER-OVATI UNETA SADRZINA, ALI TAKODJE I SADRZINA DRUGOG SLOT-A
//
//  DAKLE, KOD VISE NEIMENOVANIH slot-OVA, ODNOSNO DEFAULT SLOTOVA; KORISTICE SE PRVI SLOT, A FALLBACK
//  SADRZINA OSTALIH SLOTOAVA, NARAVNO AKO JE DEFINISANA TA FALLBACK SADRZINA, BICE PRIKAZANA, NAKON
//  ONE SADRZINE KOJU JE DEVELOPER DEFINISAO, I KOJA JE "PROSLEDJENA NA MESTO PRVOG SLOTA"  
//
//  NISAM REKAO, ILI IPAK JESAM, DA MOGU DEFINISATI I PRAZAN slot (BEZ FALLBACK SADRZAJA)
//
//          MOGU NARAVNO KREIRATI I IMENOVANI SLOT      KOJI IMA    name    ATRIBUT
//TO SAM I RADIO U PRIMERU SA details I summary TAGOVIMA
//
window.customElements.define('some-pokus-element', class extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        const divEl = document.createElement('div');
        
        const slot1 = document.createElement('slot');
        const slot2 = document.createElement('slot');
        
        slot1.textContent = "Neki Tekst blah blah";
        slot2.innerHTML = "<h4>Drugi tekst blah slah</h4>";     //OBRATI PAZNJU DA KAD U STRINGU
                                                                //DEFINISES HTML, TADA SAMO KORISTIS
        slot1.name = 'stavros';                                 //      innerHTML        
        slot2.name = 'halkias';                                 //JER DA SAM KORISTIO       innerText
                                                                //  ILI         textContent
        divEl.appendChild(slot1);                               //CELI SADRZAJ STRINGA BI BIO PARSED 
        divEl.appendChild(slot2);                               //KAO TEXT NODE

        shadowRoot.appendChild(divEl);
    }
});

const uneto_u_HTML = `       /*LIGHT DOM*/
    <some-pokus-element>
        <p slot="stavros">
            Ovaj paragraf overriduje slotov fallback sadrzaj 
        </p>
    </some-pokus-element>
`;

const renderovano = `       /*FLATTENED DOM*/
    <some-pokus-element>
        <slot name=stavros>
            <p slot="stavros">
                Ovaj paragraf overriduje slotov fallback sadrzaj 
            </p>
        </slot>
        <slot name="halkias">
            <h4>Drugi tekst blah slah</h4>
        </slot>
    </some-pokus-element>
`;

//  DAKLE SADA JE SADRINA PRVOG SLOT-A OVERRIDEN, SA KORISNIKOVIM (DEVELOPER-OVIM) PARAGRAFOM
//  I TEXT NODE-OM, TOG PARGTRAFA, ALI PORED DEVELOPEROVE SADRZINE, TU CE BITI
//  RENDERED I FALLBACK SADRZINA (h4 ELEMENT) DRUGOG SLOTA, JER NISAM PROSLEDIO NISTA, U SLUCAJU DRUGOG
//  NAMED slot-A

//ONO STO JE MENI JOS INTERESANTNO, JESTE DA SE "FRAGMENTNO" (MOJE RECI), U LIGHT DOM-U MOZE DEFINISATI
//BILO KOJI BROJ ELEMENATA, CIJE CE VREDNOSTI slot ATRIBUTA, KOJE SVAKI ELEMENT IMA, UPRAVO 
//REFERENCIRATI, ISTO IME, ODNOSNO name , JEDNOG    slot-A
//POKAZACU TO PRIMEROM

window.customElements.define('podcasts-element', class extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        const divEl = document.createElement('div');
        const unorList = document.createElement('ul');
        
        const ajtemiSlot = document.createElement('slot');

        ajtemiSlot.name = "podcasts";
        ajtemiSlot.innerText = "OVDE IDE LIST ITEM";

        unorList.appendChild(ajtemiSlot);
        divEl.appendChild(unorList);
        shadowRoot.appendChild(divEl);
    }
});

const light_DOM = `
    <podcasts-element>
        <li slot="podcasts">Tues wth stories</li>
        <li slot="podcasts">Ctown</li>
        <li slot="podcasts">LOS</li>
        <li slot="podcasts">Jeffries show</li>
    </podcasts-element>
`;

const flattened_DOM = `
    <podcast-element>
        <div>
            <ul>
                <slot name="podcasts">
                    <li slot="podcasts">Tues wth stories</li>
                    <li slot="podcasts">Ctown</li>
                    <li slot="podcasts">LOS</li>
                    <li slot="podcasts">Jeffries show</li>
                </slot>
            </ul>
        </div>
    </podcast-element>
`;
//////////////////////////////////////////////////////////////////////
//              STILIZOVANJE
//  NAJVECA PREDNOST JESTE SCOPED CSS, ODNOSNO CSS "OGRANICEN", ILI "UOBIMLJEN", ODNOSNO CSS KOJI SE 
//  NE PRELIVA NA OKOLINU-ELEMENTE IZVAN shadow DOM-A; ODNOSNO STILOVI DEFINISANI UNUTRA, DON'T BLEED OUT
//  
//  CSS SELEKTORI IZ SPOLJASJOSTI SHADOW DOMA, SE NE APLICIRAJU NA UNUTRASNJOST KOMPONENTE
//
//SVE TO ZNACI DA MOGU KORISTITI    id      I       class   SELEKTORE UNUTAR style TAGA U shadow dom-u,
//BEZ BOJAZNI DA CE TO IZAZVATI KONFLIKT BILO GDE DRUGDE NA STRANICI  
//
//MOGU CAK I DEFINISATI I EXTERNAL STYLESHEET, KOJI ONDA, MOGU LINK-OVATI UNUTAR SHADOW DOM-A
//MEDJUTIM, SAZNAO SAM TAKODJE DA MOZE DOCI DO BUG-A, U SLUCAJU webkit-A

//OPET CU KREIRATI NEKI JEDNOSTAVAN PRIMER, U KOJEM CU STILIZOVATI SHADOW TREE, NA POMENUTE RAZLICITE
//NACINE
//

window.customElements.define('podcast-entity', class PodcastEntity extends HTMLElement {
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        const divElement = document.createElement('div');
        const styleElement = document.createElement('style');
        const sekcija = document.createElement('section');
        const nekiParagraf = document.createElement('p');

        divElement.classList.add('kontejner');

        const nekiSlot = document.createElement('slot');
        const opetSlot = document.createElement('slot');

        nekiSlot.name = 'podcast';
        opetSlot.name = 'twitch';
        nekiSlot.innerHTML = "<h1>DEFAULT TEKST</h1>";
        opetSlot.innerHTML = "NEKI DEFAULT TEKST";

        nekiParagraf.textContent = "Tekst paragrafa, koji nije slotted";

        sekcija.appendChild(opetSlot);

        sekcija.appendChild(nekiParagraf);

        divElement.appendChild(nekiSlot);
        divElement.appendChild(sekcija);

        //SLEDECI STILOVI CE BITI DEO style TAGA, KOJI CE BITI TAG SHADOW DRVETA

        const styleContent = `
                                    
            .kontejner {   /*OVDE JE SVE U REDU*/             
                border: yellow solid 2px;       
                text-align: center;
                padding: 8px;
                background-color: #e67ba6;
            }

            /*SADA CU POKAZATI STILIZOVANJE DISTRIBUTED node-OVA*/
            
            
            /*slot {                            POKUSAJ STILIZOVANJA SAMOG SLOT-A, JESTE MOGUC (SAMO DO ODREDJENOG NIVOA, PO MOJOJ PROCENI)
                background-color: pink;         NE TREBAM OVO RADITI NIKADA
                color: lightcyan;               
            }*/                                 /* A ZNAM DA SE ODREDJENI STILOVI NE MOGU NASLEDJIVATI
                                                    JEDNOM RECJU OVO NEMA NIKAKVU POENTU  */
            /*div p {                               
                background-color: #e67ba6;          PROBLEM JE NASTAO JER NE MOGU NA OVAJ NACIN
            }*/                                     /*STILIZOVATI PARAGRAF KOJI JE SLOTTED*/

            


            /*NAIME ZA STILIZOVANJE SLOTTED ELEMENATA, MOGU KORISTITI PSEUDO ELEMENT
                        ::slotted()       
            U ZAGRADU POMENUTOG PSEUDO ELEMENTA, IDE ODGOVARAJUCI SLEKTOR NEKOG OD SLOTTED ELEMENATA
            NA PRIMER           ::slotted(*)        CE SELEKTOVATI SVE SLOTTED ELEMENTE               

                SADA CU STILIZOVATI PARAGRAF ELEMENT KOJI JE SLOTTED (AKO DOLE POGLEDAM LIGHT DOM 
                    (PREKOPIRAO SAM LIGHT DOM (U SLUCAJU JEDNE INSTANCE MOG CUSTOM-A),IZ HTML-A 
                    I DODELIO GA GLOBALNOJ VARIJABLI 
                    DOLE ISPOD, KAKO BI TOKOM OVOG UCENJA SVE BILO PREGLEDNO NA DOHVAT RUKE) 
                    MOGU VIDETI KOJI SU ELEMENTI SLOTTED) ELEMENT                            */
            
            /*      TREBAM ZNATI DA SE        ::slotted()       SELEKTOROM, MOGU SELEKTOVATI SAMO 
            TOP-LEVEL SLOTTOVAN ELEMENT, JER AKO JE SLOTTED JEDAN ELEMENT, KOJI IMA DESCENDANT-E, 
            TI DESCENDATI SE NE MOGU SELEKTOVATI, SELEKTORIMA, U KOJIM UCESTVUJE ::slotted()    */

            ::slotted(p) {      /*OVAKO JE USPESNO DEFINISANJE STILOVA ZA PARAGRF KOJI JE SLOTTED*/
                color: wheat;       
                background-color: olive;
            }

            ::slotted([neki_atribut]) {
                border: #292f38 solid 6px;
                color: white;
            }

            ::slotted(h4) {                 /*OVO CE SELEKTOVATI SVE h4 ELEMENTE*/
                font-size: 2rem;            /*BEZ OBZIRA STO SU SLOTTED U RAZLICITE SLOTOVE*/
                color: #9de758;              
            }

            ::slotted(.tube) {              /*SELEKTOVANJE TOP LEVEL SLOTTED ELEMENTA, NA KOJEM JE APLICIRANA KLASA .tube*/
                border: tomato solid 8px;
            }

            ::slotted(.tube:hover) {        /*MOGUCE JE KORISTITI I PSEUDO KLASE*/
                border-width: 18px;
            }



            ::slotted(.tube p) {            /*OVO NE FUNKCIONISE, JER SE SAMO MOGU SELEKTOVATI*/
                border: black solid 2px;    /*TOP-LEVEL node-OVE, I AKO, DOLE POGLEDAM LIGHT DOM*/
                color: purple;              /*VIDECU DA NIJENAD OD PARAGRAFA, KOJI JE DESCENDANT*/
            }                               /*.tube KLASE, USTVARI NIJE TOP-LEVEL, VEC JE DUBLJE*/
            
            ::slotted(.tube) > p {            /*I OVDE VAZI ISTO STO JE VAZILO GORE*/
                color: #67f19c85;               /*NE FUNKCIONISE*/
            }




            /*  SADA CU SE POZABAVITI      :host    ODNOSNO      :host()      PSEUDO KLASOM, 
                KOJU SAM KORISTIO I RANIJE                                  U OVOM DOKUMENTU    */

            :host {
               display: block;
               border: #21695b8e solid 4px;
            }

            :host([atribut_neki="vrednost"]) {  /*SELEKTUJE SAMO AKO HOST IMA ATRIBUT I KONKRETNU VREDNOST ATRIBUTA*/
                outline-width: thick;
                outline-offset: -28px;
                outline-style: groove;
                outline-color: #eeb752;
                pointer-event: none;
            }

            :host(.podkastovi) {        /*SELEKTUJE AKO HOST IMA NAVEDENU KLASU*/
                margin: 15%;
            }

            :host(:hover) {             /*MOGUCE KORISCENJE SA DRUGIM PSEUDO KLASAMA*/
                outline-width: 16px;
                outline-style: dotted;
            }


            /*MOGUCE JE STILIZOVANJE I U ODNOSU NA CONTEXT*/
            /*ILI PROSTIJE RECENO, OVO JE STILIZOVANJE U ODNOSU NA OKOLINU (KAD KAZEM OKOLINU, MISLIM NA
                ANCESTOR-E) CUSTOM TAGA, ALI I NA SAM CUSTOM TAG, ALI NE I NA NJEGOVE SIBLINGS-E*/
            /*ZA TU POTREBU, KORISTI SE
                                            :host-context()                        */

            :host-context(.podcast_container) {      /* OVO CE SELEKTOVATI HOST (ODNOSNO this)*/
                border: lightgreen solid 28px;       /* AKO NEKI OD NJEGOVIH ANCESTORA IMA ALPICIRANU*/
            }                                        /* .podcast_container    KLASU*/

            :host-context([pozadina_atribut]) {      /*INSTANCA CUSTOM-A, IMA OVAJ ATRIBUT*/
                font-family: sans-serif; /*IAKO SAM ISTO MOGAO POSTICI UZ KORISCENJE SAME*/
            }                                 /*    :host  PSEUDO KLASE    */
                                              /* ALI SAM IPAK, UPOTREBIO, OVAJ NACIN KAKO BIH POKAZAO
                                              DA JE ISTO MOGUCE POSTICI I UZ POMOC  :host-context() */

            :host-context(.podcast_sibling) {     /*OVO NE FUNKCIONISE, ODNOSNO NE SELEKTUJE HOST-A*/
                outline-style: dashed;            /*JER JE .podcast_sibling KLASA APLICIRANA NA*/
            }                                     /*SUSEDNI, ODNOSNO SIBLING ELEMENT MOG CUSTOM-A,
                                                    A NE NA NJEGOV ANCESTOR*/

            /*TREBA DA KAZEM DA JE OVO STILIZOVANJE BAZIRANO NA KONTEKSTU, KORISNO KADA JE U PITANJU
            THEMING, ODNOSNO AKO NA PRIMER body ELEMENT IMA APLICIRANU KLASU .light_theme
            MOGU U ODNOSU NA TAJ ANCESTOR PRILAGODITITI STILOVE CUSTOM ELEMENTA, KAKO BI I ONI IMALI
            LIGHT OSECAJ*/

            /*MEDJUTIM OVAKVO "KONTEKSNO STILIZOVANJE" JE KORISNIJE, KADA SE KORISTI SA CSS
            CUSTOM PROPERTIJIMA, KOJE JA ZNAM KAO       CSS VARIJABLE               */
            /*NAIME, JA CU SADA DEKLARISATI, JEDNU CSS VARIJABLU U EXTERNAL STYLESHEET-U, KOJI
            JE LINKED SA MOJIM HTML DOKUMENTOM*/

            /*DAKLE U EXTERNAL STYLESHEET-U, JE DEFINISANA SLEDECA CSS VARIJABLA(CSS CUSTOM PROPERTY)

                        .podcast_container {                        OVDE JE MOGLO BITI I body ILI NEKI DRUGI ANCESTOR AKO POSTOJI
                            --podcast-font-style: italic;
                        }
            */
            /*  SADA CU APLICIRATI font-style ZA HOST ELEMENT, UZ POMOC     host-context()    */
            /*  ALI U SLUCAJU DA JEDAN OD ANCESTORA CUSTOM ELEMENTA, IMA ATRIBUT
                                                                    font_style_att              */
            
            :host-context([font_style_att]){
                font-style: var(--podcast-font-style, bolder);      /*NE ZABORAVI DA JE MOGUCE DEFINISATI*/
            }                                                       /*ZELJENI BROJ FALLBACK VREDNOSTI*/
                                                                    /*KADA REFERENCIRAM CSS VARIJABLU*/
                                                                    /*KAO STO SAM TO URADIO OVDE*/
            
            /*POMENUTO KORISCENJE CUSTOM PROPERTIJA, ODNOSNO CSS VARIJABLI, DEVELOPER-I, ZOVU I
            KREIRANJE STYLE HOOK-OVA, UZ KORISCENJE CSS VARIJABLI, ODNOSNO CUSTOM PROPERTIJA*/


        `;
        
        styleElement.textContent = styleContent;
        
        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(divElement);


    }

    connectedCallback(){
        // OVO JE JAKO BITNA STVAR KOJA SE TICE, KONKRETNO JAVASCRIPTA
        //ZAPAMTI DA PRISTUPANJE ELEMENTIMA (CUSTOM ILI CUSTOMIZED ILI REGULARNIM), NIJE MOGUCE 
        //UZ POMOC  UZ POMOC PSEUDO ELEMENATA
        //A TAKAV ELEMENT JE I ::slotted
        //ONO STO SAM TAKODJE PROCITAO O PSEUDO ELEMENTIMA, JESTE DA ONI NISU returned
        //MISLIM DA SE TU MISLI UPRAVO NA MOGUCNOST PRISTUPANJA ELEMENTU
        
        const neki_h4_slotted_element = this.shadowRoot.querySelector('::slotted(h4)');
        console.log(neki_h4_slotted_element);   //-> null

        /*PRISTUPICU, JEDNOM OD SLOTTED ELEMENATA, NA DRUGACIJI NACIN, JER ZELIM DA NA TAKAV
        ELEMENT, ZAKACIM EVENT HANDLER*/
        /*ZAPAMTI DA KADA PRISTUPAS SLOTTED ELEMENTIMA U JAVASCRIPTU, NJIMA USTVARI PRISTUPAS U
        LIGHT DOM-U*/
        /*ZASTO TAKO? PA PO MOJOJ PROCENI ZATO STO JE slot ELEMENT, PLACEHOLDER ZA SLOTTED
        ELEMENTE, I KAO TAKAV MOZE MU SE PRISTUPITI U SHADOW DOM-U, JER SAM GA (AKO JESAM) ZAKACIO
        U SHADOW DOM, DOK SE SLOTTED ELEMENTIMA, PRISTUPA U LIGHT DOM-U, JER SE ONI TAMO NEST-UJU*/

        //PRISTUPICU, JEDNOM slot ELEMENTU

        console.log(this.shadowRoot.querySelector('slot'));     //->        <slot>

        //SADA CU PRISTUPITI JEDNOM SLOTTED h4 ELEMENTU, PA CU NA NJEGA ZAKACITI HANDLER
        const neki_h4_slotted = this.querySelector('[neki_atribut]');
        console.log(neki_h4_slotted);

        //KACIM MU LISTENER, JER ZELIM DA SAZNAM VISE O         Event.composedPath()
        //                                                 I    Event.composed     

        neki_h4_slotted.addEventListener('click', ev => {
            console.log(    ev.composedPath()    );         //-> PRIKAZAN JE NIZ KOJI SE SASTOJI OD
                                                            //ELEMENATA KROZ GOJE SE DOGODILA
                                                            //PROPAGATION (U PREVODU "RAZMNOZAVANJE")
                                                            //A JA TO MOGU BOLJE SEBI DA OBJASNIM
                                                            //DA JE NIZ FORMIRAN OD ELEMENATA
                                                            //POCEV OD ONOG GDE JE NASTAO (EVENT), PA KROZ ONE
                                                            //ELEMENTE DOM GRANE, KOJOJ PRIPADA (TAJ ELEMENT)
                                                            //PA NA KRAJU DO Window INSTANCE
            
            console.log(ev.composedPath()[0]);     //->         h4      ELEMENT
                                                        //              GDE JE CLICK EVENT NASTAO

            //ONO STO JE BITNO RECI JESTE DA CE EVENT PROPAGATE-OVATI, KROZ SLOTTED ELEMENT, I KROZ,
            //  slot  ,  KOJI MU JE PLACEHOLDER
            //STO ME NAVODI DA, OPET PONOVIM (IAJKO JE MOZDA SUVISNO), DA SE SLOTTED ELEMENTU, PRISTUPA
            //KAO DA SE NALAZI U LIGHT DOM-U, A EVENT INSTANCA PROPAGATES, KROZ FLATENED DOM                                             
            
            console.log(ev.composedPath()[9] instanceof Window);     //->   window      JE POSLEDNJE
                                                                        // MESTO KROZ KOJI PROPAGATES
                                                                        //POMENUTI EVENT, I ON JE POSLEDNJI
                                                                        //CLAN NIZA, KOJI JE POVRATNA VREDNOST
                                                                        //  composedPath METODE
            
            console.log(        ev.composed          );             //->    true  AKO, UOPSTE POSTOJI
                                                                        //PROPAGATION EVENT-A, A false U
                                                                        //SUPROTNOM
        });


    }
});

const izgled_light_dom = `
    <div class="podcast_container" font_style_att>  <!--SVE SAM STAVIO U CONTAINER DA BIH SE UPZNAO SA    
                                                                                :host-context()   -->
        <div class="podcast_sibling">Neki tekst koji se nalazi u sibling-u, mog custom elementa</div>
        <!--Ovo dole je light DOM (samo napominjem)-->
        <podcast-entity class="podkastovi" atribut_neki="vrednost" pozadina>
            <p slot="podcast">Ovo je tekst nekog slotted paragrafa</p>
            <h4 slot="podcast" neki_atribut>Ovo je naslov koji i tako to</h4>
            <h1 slot="twitch">Na twitch appu se stream-uje nesto</h1>
            <h4 slot="twitch">Opet nesto reci o twitch-u</h4>
            <div class="tube" slot="twitch">
                <p>Opet neki paragraf, koji je deo, novog slot-a</p>
                <div>
                    <h2>Naslov, koji je dublje u slotu</h2>
                    <p>Paragraf, koji je duboko nested u slotu</p>
                </div>
            </div>
        </podcast-entity>
        Ovo je neki tekst, za proveru text node-a
    </div>
`;

/*STILIZOVANJE SPOLJA, NARAVNO POBEDJUJE STILOVE    :host   ELEMENTA ILI KLASE
STO ZNACI DA AKO STILIZUJEM       <podcast-entity>    CUSTOM ELEMENT, SPOLJA, NA PRIMER U EXTERNAL
STYLESHEET-U, TO CE OVERRIDE-OVATI STILOVE  APLICIRANE SA     :host
      :host       SE NE MOZE KORISTITI IZVAN SHADOW DOM-A*/


/*PRE NEGO STO NASTAVIM DALJE PRIKAZACU, JEDAN NACIN, KOJIM JE MOGUCE DA PRISTUPANJE slot ELEMENTIMA; 
KOJE SAM ZAKACIO U MOJ SHADOW DOM
TO, NAIME POSTIZEM TAKO STO, PRISTUPAM PROPERTIJU assignedSlot ONIH ELEMENTA, KOJE SAM NESTOVAO,
ILI KOJE JE KORISNIK MOJE KOMPONENTE NESTOVAO U CUSTOM ELEMENT (ODNOSNO PRISTUPAM PROPERTIJU assignedSlot
ONIH ELEMENATA, KOJI IMAJU name ATRIBUT "KOJI UPUCUJE", NA ODREDJENI SLOT, KOJEG SAM ZAKACIO U SHADOW
DOM, KADA SAM DEFINISAO KLASU CUSTOM ELEMENTA*/

/*JA CU SADA PRISTUPITI, SVIM NESTED ELEMENTIMA (UZ POMOC querySelectorAll METODE) (OVAKO NECE BITI PRISTUPLJENO SHADOW DOMU, ALI MISLIM DA JE TO POZNATO)
I PRISTUPICU VREDNOSTI, NJIHOVOG PROPERTIJA assignedSlot
KADA PRISTUPAM SVIM NESTED ELEMENTIMA */

/*ZA ELEMENTE KOJI NISU SLOTTED, OVAJ PROPERTI CE IMATI VREDNOST null*/
/*ZA ELEMENTE KOJI SU SLOTTED, VREDNOST assignedSlot PROPERTIJA JESTE ODGOVARAJUCI <slot>*/
const podcastEntityElementInside = document.querySelectorAll('podcast-entity *'); //UZ POMOC OVOG SELEKTORA 
                                                                                //PRISTUPA SE SVIM ELEMENTIMA
                                                                                // KOJI SU DESCENDANTI 
                                                                                //podcast-entity ELEMENTA
console.log(podcastEntityElementInside);

for(let element of podcastEntityElementInside){
    console.log(element.assignedSlot);              //U SLUCAJU NEKIH ELEMENATA CE SE STAMPATI null
}                                                   //A U SLUCAJU DRUGIH, ODGOVARAJUCI      <slot>


////////////////////////////////////////////////////////////////////////////////////////////////////////
//      PRE NEGO STO NASTAVIM DALJE, OSVRNUCU SE NA NESTO CIME SAM SE I RANIJE SUSRETAO, A TO JE
//  text Node ELEMENT (MORAM SE UPOZNATI S OVIM, IAKO TO NIJE, KONKRETNA TEMA OVOG DOKUMENTA) 
//NAPRAVICU JEDAN TEXT NODE

const tekstNodeElement = document.createTextNode("some text");
console.log(tekstNodeElement);
console.log(tekstNodeElement.__proto__);

//SADA CU OPET REGISTROVATI JEDAN CUSTOM ELEMENT

window.customElements.define('fensi-pensi', class extends HTMLElement {
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        const divElement = document.createElement('div');
        const nekiSlot = document.createElement('slot');
       // nekiSlot.name = "neki_slot1";
        nekiSlot.innerHTML = "<h1>DEFAULT NASLOV</h1>"
        
        divElement.appendChild(nekiSlot);
        shadowRoot.appendChild(divElement);
    }
});

const fensli_pensiElement_light_dom = `
    <fensi-pensi>
        Ovo je neki text node    OVAJ TEXT NODE CE SE NACI U FLATTENED DOM-U, JER JE TAJ TEXT NODE
    </fensi-pensi>               SLOTTED, JER NE POSTOJI name ATRIBUT NA SLOTU INSERTOVANOM U SHADOW DOM
`;                               //ODNOSNO, POMENUTI    slot (BEZ name-A) JE POSTAO, TEXT node-OV PLACEHOLDER                                                       

//POKUSACU DA PRISTUPIM TEXT NODE-U, NA NAJPOVOLJNIJI MOGUCI NACIN

const fensiPensiElement = document.querySelector('fensi-pensi');
const textNodePensi = fensiPensiElement.childNodes[0];

//PRISTUPICU SADA slot ELEMENTU, POMENUTOG TEXT NODE-A (UZ POMOC    assignedSlot   PROPERTIJA)
console.log(    textNodePensi.assignedSlot    );        //--> <slot><h1>DEFAULT NASLOV</h1></slot>
////////////////////////////////////////////////////////////////////////////////////////////////////////
//IAKO SE KONKRETNO NE TICE assignedSlot PROPERTIJA, PODSETICU SE DA SE TEXT NODE, MOZE I OVAKO KREIRATI

console.log(             document.createTextNode('ovo je tekst, tekst node-a')               );

//POSTOJE I NACINI PROVERE DA LI JE NEKI ELEMENT text node ELEMENT, I TU SE MOGU KORISTITI PROPERTIJI
//KAO STO SU        
                    //          nodeType        ILI         TEXT_NODE
//ALI TO CU ZA SADA PRESKOCITI, KAKO BIH NASTAVIO DALJE BAVLJENJE SA SHADOW ROOT-OM, A DODATNIM STVARIMA
//VEZANIM ZA NODE ELEMENTE, MEDJU NJIMA VEZANIM I TEKST NODE ELEMENTE, SE MORAM POSEBNO POZABAVITI U
//NAJSKORIJE VREME
///////////////////POSTO SAM SE POZABAVIO assignedSlot PROPERTIJEM SLOTTABLE ELEMENATA, I POSTO SAM SE



//                  ADVANCED TOPICS
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
/////           KREIRANJE ZATVORENIH SHADOW ROOT-OVA    ({mode: 'closed})      (TREBA SE IZBEGAVATI)
/////   NEKI ELEMENTI, KAO STO JE <video> IMAJU ZATVOREN SHADOW ROOT       
////        TO ZNACI DA SPOLJNI JAVASCRIPT, NE MOZE PRISTUPATI INTERNAL DOM-U

window.customElements.define('some-closed-element', class extends HTMLElement {
    constructor(){
        super();

        const divElement = document.createElement('div');
        
        const sekcija = document.createElement('section');
        const paragrafZaSekciju = document.createElement('p');
        const tekstNodeParagrafa = document.createTextNode('Tekst node paragrafa, koji je nested u sekciji');

        sekcija.appendChild(paragrafZaSekciju);
        paragrafZaSekciju.appendChild(tekstNodeParagrafa);

        const slotElement = document.createElement('slot');
        slotElement.name = "blah";

        const neimenovaniSlot = document.createElement('slot');


        const shadowRoot = this.attachShadow({mode: 'closed'});   //  ZATVOREN FRAGMENT

        divElement.appendChild(slotElement);
        divElement.appendChild(neimenovaniSlot);

        shadowRoot.appendChild(divElement);
        shadowRoot.appendChild(sekcija);

        console.log(  shadowRoot.host   );          //->     STAMPACE SE HOST SHADOW ROOT-A (divElement)
        console.log(  divElement.shadowRoot  );     //->     ALI OVDE CE STAMPATI     null

        //POKUSACU DA, shadowRoot   SKLADISTIM KAO VREDNOST, PROPERTIJA, INSTANCE, MOG CUSTOM ELEMNTA
        
        this._shadow_root = shadowRoot;         // (NE ZNAM DA LI OVO STO SAM URADIO, PONISTAVA SVRHU
                                                // SHADOW DOM-A)
                                                // ALI OVO JE JEDINI NACIN DA KASNIJE MOGU KORISTITI
                                                // shadowRoot; NA PRIMER U OBIMU connectedCallback-A
    }

    connectedCallback(){
        //SADA CU ZAKACITI, NEKI EVENT LISTENER, NA SLOTTED ELEMENT, JER ZELIM DA VIDIM DA LI MOGU
        //  NAD Event INSTANCIM, PRIMENITI      composedPath       METODU
        //I ZELIM DA VIDIM KOJA CE VREDNOST        composed     PROPERTIJA BITI, U SLUCAJU KADA JE slot
        //U     'closed'     shadowRoot-U 
        
        const slottedHeader = this.querySelector('h1');

        slottedHeader.addEventListener('click', ev => {
            console.log(    ev.composedPath()    );     //-> STAMPACE SE NIZ, ZA KOJ ISAM VEC OBJASNIO
                                                        //  KAKAV JE
            //ALI U SLUCAJU closed SHADOW DOM-A, U TOM NIZU NECE BITI REFERENCIRANI ELEMENTI
            //KOJI SU ELEMENTI SHADOW DOM-A, I KROZ KOJE EVENT PROPAGATE
            //ZATO SE MENJU ELEMENTIMA TOG NIZA NECE REFERENCIRATI      slot       ,CIJI JE     h1
            //SLOTTED ELEMENT                                             
            console.log(        ev.composed          );             //-->     OVO CE BITI         true
                                                                            //JER PROPAGATION POSTOJI
        });

        //ZATIM ZELIM DA ZAKACIM EVENT HANDLER, NA NEKOM ELEMENTU, KOJI NIJE SLOTTED, VEC JE TO SAMO NEKI
        //ELEMENT, CIJU SAM INSERTION U SHADOW DOM, DEFINISAO U CONSTRUCTORU (KAO STO SAM TO RADIO SA
        //slot ELEMENTIM, ALI NECU KACITI HANDLER NA SLOT, VEC NA NEKI DRUGI ELEMENT)

        console.log(this._shadow_root);  //SHADOW ROOT-U MOGU PRISTUPITI, UZ POMOC PROPERTIJA
                                            //  KOJ ISAM DEFINISAO U KONSTRUKTORU

        console.log(this.shadowRoot);       //OVO NARAVNO JESTE   null   ZA SLUCAJ 'closed' SHADOW DOM-A
                                            //KAKAV JE SADA U PITANJU

        const sekcijinParagraf = this._shadow_root.querySelector('section p');

        console.log(sekcijinParagraf);      //ELEMENTU SAM USPESNO PRISTUPIO NA POMENUTI NACIN

        //ZAKACICU SADA EVENT HANDLER, NA TAJ ELEMENT

        sekcijinParagraf.addEventListener('click', ev => {
            console.log(ev.composedPath());     //U GOOGLE WEB FUNDAMENTALS TEKSTU RECENO JE DA OVO
                                                //return-UJE  PRAZAN NIZ; ALI U MOM SLUCAJU NIJE TAKO
                                                //NIZ SE SASTOJI OD SVIH ELEMENATA, KROZ KOJE EVENT
                                                //PROPAGATE, POCEV OD PARAGRAFA, ZATIM SVIH NJEGOVIH 
                                                //ANCESTOR IZ SHADOW DOM-A, PA ONIH ANCESTORA, KOJI SU
                                                //IZVAN SHADOW DOMA, PA SVE DO window-A
            
            console.log(ev.composed);   //-> true
        });

    }


});

const light_dom_for_inserted_some_closed_element = `
    <some-closed-element>
        <h1 slot="blah">Ovo je neki naslov</h1>
        Neki text node
    </some-closed-element>
`;

/*PRISTUPANJE    assignedSlot    PROPERTIJU, SLOTTED ELEMENATA, U SLICAJU CLOSED SHADOW ROOT-A
REZULTOVACE null VREDNOSCU      */

const slotted_h1 = document.querySelector('some-closed-element h1');
const slotted_text_node = document.querySelector('some-closed-element').childNodes[2];

console.log(    slotted_h1.assignedSlot     );      //->       null         
console.log(    slotted_text_node.assignedSlot  );  //->       null

//ZASTO NIKAD NE TREBA KREIRATI KOMPONENTE SA {mode: 'closed}

// 1)     LAZNI OSECAJ SIGURNOSTI, JER NISTA NE SPRECAVA NAPADACA OD HIJACKING-A SLEDECEG 
//              Element.prototype.attachShadow
// 2)     Closed mode prevents your custom element code from accessing its own shadow DOM
//          (OVO SAM VIDEO U SLUCAJU connectedCallback-A)
// 3)     MY COMPONENTS ARE LESS FLEXIBILE FOR END USER (MISLI SE NA DEVELOPERA, KOJI BI KORISTIO, MOJE
//         KOMPONENTE SA 'closed' SHADOW DOM-OM)

//  
//SADA CU NASTAVITI SA ADVANCED TOPICS, VEZANIM ZA SHADOW DOM
//SADA CU SE KONKRETNO POZABAVITI SA UTILITY-IMA, OBEZBEDJENIM OD DELA shadow DOM API-A, KOJI SU NAMENJENI
//ZA RAD SA slot-OVIMA, I DISTRIBUIRANIM node-OVIMA (DRUGI NAZIV: SLOTTED ELEMENTI)

//ZA TU POTREBU, KREIRACU, NOVI PRIMER, ODNOSNO REGISTROVACU NOVI CUSTOM ELEMENT

window.customElements.define('jobly-bobly', class extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        const divElement = document.createElement('div');
        const sekcijaElement = document.createElement('section');
        const paragraf1 = document.createElement('p');
        const paragraf2 = document.createElement('p');
        const textNode1 = document.createTextNode("Ovo je tekst node, prvog paragrafa");
        const textNode2 = document.createTextNode("Ovo je tekst node, drugog paragrafa");

        const slot1 = document.createElement('slot');
        const slot2 = document.createElement('slot');
        const slot3 = document.createElement('slot');

        slot1.name = "podcast";
        slot3.name = "screencast";

        slot1.innerHTML = "<h4>FALLBACK PODCAST BLA</h4>";
        slot2.innerHTML = "<h4>FALLBACK UNNAMED</h4>";
        slot3.innerHTML = "<h4>FALLBACK SCREENCAST BLA</h4>";

        paragraf1.appendChild(textNode1);
        paragraf2.appendChild(textNode2);
        
        sekcijaElement.appendChild(slot2);
        sekcijaElement.appendChild(paragraf2);
        sekcijaElement.appendChild(slot3);
        
        divElement.appendChild(slot1);
        divElement.appendChild(paragraf1);
        divElement.appendChild(sekcijaElement);

        shadowRoot.appendChild(divElement);

        this._a = 0;  //OVO SLUZI SAMO KAO BROJAC (POMOC KOD SHVATANJA NECEGA)

        
    }

    connectedCallback(){
        //NAIME, JA ZELIM DA SE POZABAVIM JEDNIM EVENTOM, KOJI JE EVENT KARAKTERISTICAN ZA SLOTOVE
        //NAIME, REC JE O
                            //              slotchange          EVENT-U
        
        //OVAJ EVENT BIVA TRIGGERED, KADA SE slot-OVLJEVI DISTTRIBUIRANI ELEMENTI (SLOTTED ELEMENTI)
        //PROMENE; A POD TIME SE MISLI, KADA KORISNIK MOG CUSTOM ELEMENTA URADI SLEDECE
        //              DODA ILI UKLONI         DECU IZ LIGHT DOM-A
        //NAIME, OVAJ EVENT, SE MOZE TRIGGEROVATI SAMO NA slot ELEMENTU
        //SDA CU JEDNOM slot-U, IZ MOG PRIMERA, ZAKACITI HANDLER, KOJI SE TREBA IZVRSITI PO
        // TRIGGERINGU          slotchange      EVENT-A
        
        const prviSlot = this.shadowRoot.querySelector('[name=podcast]');
        console.log(prviSlot);
        
        prviSlot.addEventListener('slotchange', ev => {
            console.log(ev.composedPath());
            console.log(++this._a);

            document.body.scrollTop = document.body.scrollHeight;
        });

        //U DOKUMENTACIJI SAM PROCITAO DA SE GORE PROSLEDJENI HANDLER, NECE INVOCIRATI, TOKOM 
        //INSTANCITIRANJA CUSTOM ELEMENTA

        //ALI ONO STO JA VIDIM, JESTE SLEDECE
        //DA NISAM NESTO-VAO, NI JEDAN ELEMENT U LIGHT DOM (REFERENCIRAJUCI slot-OVO IME AKO POSTOJI 
        //NAMED slot U SHADOW DOM-U, ILI NE REFERNIRAJUCI slot-OVO IME (ZA SLUCAJ POSTOJANJA UNAMED 
        //slota U shadow DOM-u; A KOD MENE SU OBA SLUCAJA PRISUTNA)
        //POMENUTI HANDLER SE NE BI INVOCIRAO, STO SAM I POKUSAO I ZAISTA SE I NIJE INVOCIRAO
        //A POSTO SAM U STARTU, ODNOSNO ODMAH KORISTECI MOJ CUSTOM ELEMENT U HTML FAJLU, JA MOJ CUSTOM
        //ELEMENT KREIRAO TAKO DA SE U LIGHT DOM-U, ODMAH NALAZE SLOTTED ELEMENTI, HANDLER JE BIO IVOCIRAN
        //STO ZNACI SLEDECE PO MOM ZAPAZANJU:

        //      slotchange  SE POKRECE PRI BILO KOJEM NESTINGU SLOTTED ELEMENTA U LIGHT DOM
        //                   ILI OTKACIVANJU SLOTTED ELEMENTA IZ LIGHT DOM-A
        //ONO STO SAM POKUSAO, A STO SE MOZE VIDETI DOLE U GLOBALNOM OBIMU, JESTE DA SAM JA PRISTUPAO
        //MOM NESTED CUSTOM ELEMENTU, I VRSIO NEKE MODIFIKACIJE NA LIGHT DOM-U, UZ POMOC JAVASCRIPT-A
        //PA SAM PRATIO KADA CE SE SVE TO TRIGGER-OVATI slotchange EVENT
        
        //SADA CU VIDETI, KAKO SE TO ODRAZILO NA GORE PROSLEDJENI HANDLER, ODNOSNO VIDECU, KADA SE TAJ

        //MOZDA JE SUVISNO RECE ALI MORAM DODATI DA MI, SADA MI IMA SMISLA RECENICA KOJA GLASI DA SE:
        //                                  NECE TRIGGEROVATI slotchange EVENT PRILIKOM INSTATICIRANJA
        //                                  CUSTOM ELEMENTA
        //          JER INSTANTICIRANJE JESTE JEDNO
        //          A NESTOVANJE POTENCIJALNIH SLOTTED ELMENATA, U LIGHT DOM
        //          INSTANTICIRANOG CUSTOM ELMENTA, JESTE DRUGO (I ZA OVO DRUGO SE TRIGGERUJE 
        //                                                          POMENUTI EVENT)
        //A ONO STO SAM JA URADIO UNOSECI TAG CUSTOM ELEMENTA U HTML FAJL, ZNACILO JE INSTANTICIRANJE
        //MOG CUSTOM ELEMENTA, A SLUCAJNO SAM TADA NEST-OVAO NEKOLIKO SLOTTED ELEMENTA, STO JE TRIGGER-
        //OVALO      slotchange     EVENT


        //MEDJUTIM U SLUCAJU JAVASCRIPTA,         slotchange      EVENT SE MOZE TRIGGEROVATI SAMO, AKO SE
        //RMOVE/INSERTION SLOTTED ELEMENTA OBAVLJA U OBIMU CALLBACK-A, POSLATOG U TASK QUEUE (ZNAM SIGURNO
        //DA JE TO MOGUCE ZA MICROTASK, A ZA MACROTASK OSTAJE DA PROVERIM, ALI PO MOJOJ PROCENI NE VIDIM
        //NIKAKVU PREPREKU, JER ONO STO MI PADA NA PAMET JESTE DA BI SE UKLANJANJE/DODAVANJE SLOTTABLE ELEMENATA,
        // MOGLO DOGADJATI KORISNIKOVIM KLIKOM, ILI U CALLBACK ARGUMENTU  setTimeout METODE, ILI 
        // U SLUCAJU MICROTASK-A (KADA SE then-OV CALLBACK SALJE U MICROTASK QUEUE, CIME SAM SE DOLE
        //I BAVIO))

        //ONO STO SAM DOLE OBJASNIO ALI STO CU OVDE NAPOMENUTI JESTE SLEDECE
        //      U SLUCAJU JEDNOG slot-A, KADA SE NJEGOVI DISTRIBUIRANI ELEMENTI DODAVAJU/UKLANJAJU
        //      BEZ OBZIRA KOLIKO SE NJIH DODA/UKLONI TOKOM JEDNOG STACKINGA POZIVA FUNKCIJA (POMENUTIH 
        //      CALLBACK-OVA), slotchange SE IZVRSVA SAMO JEDNOM

        //ALI AO POSMATRAM SITUACIJU OVAKO
        //                  KORISNIK KLIKNE I TIME UKLONI JEDAN SLOTTED ELEMENT 
        //(POSLAO SE CALLBACK U QUEUE I EVENTUALNO JE DOSLO DO SLAGANJA POZIVANJA U STACK) 
        //                          -->  TRIGGEROVAO SE slotchange    JEDANPUT
        //KORISNIK KLIKNE I TIME UKLONI/DODA VISE SLOTTED ELEMENATA IZ/U LIGHT DOM-A
        //                 (POSLAO SE CALLBACK U QUEUE I EVENTUALNO JE DOSLO DO SLAGANJA POZIVANJA U STACK)
        //                  -->     TRIGGEROVAO SE slotchange JEDANPUT 
        //                          (BEZ OBZIRA STO JE UKLONJENO/DODATO VISE SLOTTED ELEMENATA)
        //                              JER onslotchange EVENT SE MOZE TRIGGEROVATI SAMO JEDNOM ZA
        //                                          TRENUTNI STACK
    }
});

const light_dom_za_jobly_bobly = `
    <jobly-bobly>
        <h1 slot="podcast">Ovo je neki naslov, koji je plasiran na mesto prvog slota, koji je named</h1>
        <h1>Ovo je drugi naslov, koji je plasiran na mesto drugog slota, i taj slot je unnamed</h1>
    </jobly-bobly>
`;

//OVO RADIM, CISTO U CILJU PROVERE I BOLJEG SHVATANJA SLOTTED OSOBINA, ALI I CSS SELEKTORA
const slottedWithoutName = document.querySelector('jobly-bobly :not([slot])');      //DAKLE ZELIM DA
                                                                            //PRISTUPIM h1 ELEMENTU
                                                                            //KOJI NEMA slot ATRIBUT
                                                                            //I UZ POMOC OVAKVOG, SELEKTORA
                                                               //KOJI JE ARGUMENT querySelector METODE
                                                               //SAM TO I USPEO             
//SADA CU VIDETI KOJI JE        ASSIGNED slot, PRISTUPLJENOG SLOTTED ELEMNTA

console.log(slottedWithoutName.assignedSlot);               //U KONZOLI SE STAMPAO ODGOVARAJUCI
                                                            //  slot    ELEMENT 

//MODIFIKOVANJE, ODNOSNO PROMENE KOJE VRSIM UZ POMOC JAVASCRIPT-A, ZA JEDAN
// jobly-bobly SLOTTED ELEMENT, I POSMATRANJE KADA SE TO INVOCIRA, onslotchange HANDLER, 
//KOJI JE ZKACEN NA slot ELEMENT (NAIME, DEFINISANJE KACENJA JE OBAVLJENO U OBIMU connectedCallback-A)

const jobly_bobly_Element = document.querySelector('jobly-bobly');

const joblysFirstSlotted = jobly_bobly_Element.querySelector('[slot=podcast]');


joblysFirstSlotted.innerText = "ZAMENJEN TEKST prvog slotted-a"; //SAMO PROVERAVAM UPOTRBU innerText
                                                            //JOS JEDNOM
joblysFirstSlotted.setAttribute('some_attribute', '');

const slotForPods = joblysFirstSlotted.assignedSlot; 
console.log(slotForPods);

slotForPods.querySelector('h4').innerText = "Some kind of new fallback blah"; 
                                                                //PROVERAVAM DA LI querySelector
                                                                //FUNKCIONISE KAD SE PRIMENI NA slot
                                                                //I ISTO FUNKCIONISE KAO I ZA BILO KOJI
                                                                //DRUGI NODE
//joblysFirstSlotted.remove();

console.log(joblysFirstSlotted);

//UKLANJANJE SLOTTED ELEMENTA METODOM   removeChaild , KOJA JE METODA NJGOVOG ANCESTORA (U OVOM SLUCAJU
//TAJ ANCESTOR JE TAG, ODNOSNO ELEMENT, KOJI JESTE MOJ CUSTOM ELEMENT)
//IZMEDJU OSTALOG TO RADIM DA BIH PROVERIO DA LI SE GUBI REFERENCA NA TAJ ELEMENT KADA SE UKLONI

//ALI DEFINISANJE UKLANJENJA SE MORA OBAVITI U CALLBACK-U, KOJI JE POSLAT NA QUEUE 
// RAZLOGE ZASTO, NAVEO SAM NA MNOGO MESTE; U KOMENTARU U OBIMU connectedCallback-A, ALI I U DALJIM
// KOMENTARIMA KOJI SLEDE

new Promise((res, rej) => {
    res();
}).then(() => {
    jobly_bobly_Element.removeChild(joblysFirstSlotted);
    console.log('microtask 1');
});


console.log(joblysFirstSlotted);        //ODGOVOR JE DA SE POMENUTA REFERENCA NE GUBI
//DA BI SE IZGUBILA REFERENCA (I PO MOM SECANJU KAZEM, DA BI SE UKLONIO ELEMENT IZ MEMORIJSKOG PROSTORA)
//TREBALO BI SE URADITI SLEDECE:
//                                      joblysFirstSlotted = null;

//POSTO SE      'slotchange'    EVENT TRIGGEROVAO DVA PUTA
//PRVI PUT, KADA SE DIREKTNO NESTOVAO ELEMENT (SA ATRIBUTOM slot="podcast") U LIGHT DOM, U HTML FAJLU
//DRUGI PUT, KADA JE POZIVANJE CALLBACKA (U CIJEM OBIM USAM DEFINISAO UKLANJANJE SLOTTED ELEMENTA) STAVLJENO NA STACK
//POKUSACU SADA DA DODAM NOVI ELEMENT ZA DISTRIBUTION, U SLUCAJU ISTOG slot-A, PA DA POGLEDAM DA LI CE
//SE TRIGGEROVATI   slotchange  EVENT, PO INSERTOVANJU NOVOG ELEMENTA, KOJI TREBA DA BUDE DISTRIBUIRAN
//ZA slot (name="podcast")

const noviSlotted = document.createElement('h2');
console.log(noviSlotted);
noviSlotted.textContent =   `OVO JE NOVI SLOTTED ELEMENT, NAKNADNO DODAT JAVASCRIPTOM, DAKLE, NIJE NESTED 'RUCNO', U HTML FAJLU`;
noviSlotted.slot = "podcast";      //DODELJUJEM MU VREDNOST ZA slot ATRIBUT, JER JE I OVAKVA 
                                    //DODELA MOGUCA, PORED UPOTREB setAttribute METODE

//KREIRACU NOVU PROMISE INSTANCU, PA CU NA NJU CHAIN-OVATI, OVOG PUTA DVE PRIMENE then-A
//ZASTO TO RADIM?
//PA VEZBAJUCI SAM SHVATIO DA SE        slotchange      TRIGERUJE, SAMO AKO JE DEO CALLBACK-OVA
//POSLATIH NA QUEUE, ALI SVAKA NOVA PROMENA (UKLANJANJE/DODAVANJE SLOTTED ELMENATA), MORA BITI DEO 
//CALLBACK-A, POSLATOG U NOVI MICROTASK QUEUE
new Promise((res, rej) => {
    res();
})
.then(() => {
    //DA SAM OVDE DEFINISAO DODAVANJE NOVOG SLOTTED ELMENTA, NE BI SE, PONOVO TRIGGEROVAO slotchange EVENT, JER
    //TADA BI SE PREDHODNO DEFINISANO ODUZIMANJE DRUGOG SLOTTED-A (U OBIMU CALLBACK-A), NASLO U ISTOM
    //MICROTASKU, KAO I DODAVANJE POMENUTOG NOVOG SLOTTED ELEMENTA, I slottchange EVENT BI BIO TRIGGER-
    //OVAN SAMO JEDNOM

    //NAIME, NAJBOLJE JE DA slotchange EVENT-U, RAZMISLJAM NA SLEDECI NACIN
                //MA KOLIKO PROMENA (REMOVE/ADD) SLOTTED ELEMENATASE DOGODILO U PRI JEDNOM SLOZENOM 
                //CALL STACK-U, JASNO JE DA CE SE   slotchange  EVENT TRIGGEROVATI JEDNOM
                //
                //ZATO AKO ZELIM VISE TRIGGER-OVANJA, ISTOG EVENT-A, (GOVORIM O JEDNOM slot ELEMENTU)
                //TREBALO BI DA OBEZBEDIM VISE CALL STACK-OVA, STO JA OVDE I RADIM
                
                //ALI TAKODJE, PO MOJOJ SLOBODNOJ PROCENI, SMATRAM DA SE PROMENE NA ELEMNTIMA OBAVLJAJU
                //UZ TRIGGERING, NEKIH DRUGIH EVENTOVA (KEYBOARD I MOUSE), CIME CE BITI OMOGUCEN
                //NOVI QUEUING CALLBACK-AKOVA U ODVOJENE TASK QUEUE-E, CIME CE BITI I OMOGUCENO, 
                //VISE SLAGANJA POZIVA, TIH CALLBACK-OVA U CALL STACK-OVE
    return Promise[true?"resolve":"reject"]("neka vrednost");
    //OVO SAM SAMO URADIO DA BIH SE PODSETIO, OVAKVOG "HACKA",
    //IAKO OVO NIJE VEZANO SA TEMOM OVOG DOKUMENTA, A
    //TAKODJE I DA NISAM OBEZBEDIO RESOLVED Promise KAO POVRATNU VREDNOST then-OVOG CALLBACKA
    //POVRATNA VREDNOST then-A, BI BIO RESOLVED Promise (ALI BEZ VREDNOSTI, KOJU SAM JA U OVOM SLUCAJU
    //OBEZBEDIO I SA KOJOM SE RESOLVE-OVAO, OVAJ Promise KOJI JE POVRATNA VREDNOST, OVOG CALLBACK-A)  
})                                              
.then((vrednost) => {                                   
    jobly_bobly_Element.querySelector('h1:not([slot])').insertAdjacentElement(
        'beforebegin',
         noviSlotted                            //INSERTOVAO SAM NOVI SLOTTED 
    );
    
    console.log('microtask 2', vrednost); //STAMPAM OVO CISTO RADI VEZBE I PODSECANJA ASINHRONOSTI
    
    //
    //SAMO OVDE IMA SMISLA DA ISPITAM DA LI JE SLOTTED ELEMENTU ASSIGNED slot 
    console.log(noviSlotted.assignedSlot);      //->    <slot name='podcast'>
    //(DA SAM TO URADIO IZVAN, ODNOSNO, NE U OBIMU then-OVOG CALLBACK-A, 'RADILO BI SE O PREDHODNOM (CAK NE NI PREDHODNOM, VEC U ONOM PRE PREDHODNOG)
    //SLOZENOM CALL STACKU', A TADA OVAJ ELEMNT NISAM NESTOVAO U LIGHT DOM; I ZBOG TOGA BI VREDNOST
    //assignedSlot PROPERTIJA BILA      null)

    //AKO POGLEDAM KONZOLU I STA SE TAMO STAMPALO, VIDECU DA SE slotchange  EVENT, JOS JEDNOM
    //TRIGGER-OVAO
});

const unnamedSlotted = jobly_bobly_Element.querySelector(':not([slot])'); //JEDAN SLOTTED NEMA slot ATRIBUT
                                                                        //NJEGA NISAM MENJAO (NI UKLANJAO NI VRACAO) ALI
                                                                    //POKUSACU DA PRISTUPIM NJEGOVOM
                                                                        //ASSIGNED slot-U
console.log(unnamedSlotted.assignedSlot);       //->    <slot>...</slot>

// POSTO SAM SE POZABAVIO slotchange EVENTOM, KOJIM JE MOGUCE PRATITI UKLANJANJE I INSERTOVANJE
// SLOTTABLE ELEMENATA

// SADA CU SE POZABAVITI, JEDNIM API-EM, KOJI PREPORUCUJE GOOGLE DEVELOPER, KOJI JE NAPISAO CLANKE
// O WEB KOMPONENTAMA (MEDJU NJIMA I shadow DOM) (DEO GRUPACIJE CLANAKA, POD IMENOM WEB FUNDAMENTALS) 
// I KOJI SE BAVI OBSERVINGOM PROMENA
////     ODNOSNO REC JE O API-U, KOJI SE ZOVE     

    MutationObserver 
                    
                //ODNOSNO REC JE O 
////    MutationObserver INTERFACE-U, KOJI DAJE MOGUCNOST POSMATRANJA PROMENA KOJE SE DOGADJAJU NA
////    DOM DRVETU
//  KONSTRUKTOR, KOJI SE KORISTIT JESTE      MutationObserver     (NARAVNO POZIVA SE SA new KEYWORD-OM)
//KREIRA I return-UJE NOVU MutationObserver INSTANCU
//A KAO ARGUMENT, POMENUTOM KONSTRUKTORU, DODAJE SE CALLBACK ARGUMENT
//POMENUTI CALLBACK SE INVOCIRA, KADA SE POJAVE PROMENE NA DOM-U
//POMENUTOM CALLBACK-U, SE PRILIKOM INVOCIRANJA, DODAJU DVA ARGUMENTA
//TO SU:
//            mutation LISTA (PREDPOSTAVLJAM, NIZ ELEMENATA DOM-A, NA KOJIMA SU SE DESILE PROMENE)
//            observer  OBJEKAT (PREDPOSTAVLJAM MutationObserver INSTANCA)
//
//MEDJUTIM, BOLJE JE DA SE POMENUTIM, ZA OVAJ PRVI PUT POZABAVIM, PUTEM PRIMERA

//PRISTUPICU, MOM CUSTOM ELEMENTU, KOJI JE INSERTED U DOM

const joblyBoblyElement = document.querySelector('jobly-bobly');

console.log(jobly_bobly_Element);

//INSTANCITIRACU JEDNU MutationObserver INSTANCU

const mutationObserverObject = new MutationObserver(function(mutationList, observerObjekat){
//    console.log(mutationList, observerObjekat);

    //NA OVO SAM SE VRATIO KASNIJE, POSTO SAM OBJASNIO NEKE OD MOGUCNOSTI OPCIJA
    for(let mutation of mutationList){
        if(mutation.type === 'childList'){  //AKO JE DOSLO DO REMOVE ILI INSERTA CHILD ELEMENTA
            console.log("Child node, je dodat ili uklonjen iz observed custom elementa");
        }

        if(mutation.type === "attributes"){
            console.log("Atribut" + mutation.attribteName + " je modifikovan");     //MOGU SAZNATI
        }                                                                       //IME ATRIBUTA, KOJI JE
                                                                                //PROMENJEN
    }

});

//DEFINISACU, KOJI DOM ELEMENT, KOJI JE INSERTED U DOM, ZELIM DA OBSERVE-UJEM
//TO CE NARAVNO BITI, MOJ CUSTOM ELEMENT
//DEFINISANJE POMENUTOG OBSERVINGA SE POSTIZE PRIMENOM      observe     METODE, MutationObserver-OVOG
//PROTOTIPA
//POMENUTOJ METODI SE PRILIKOM POZIVANJA DODAJU DVA ARGUMENTA

        //DOM ELEMENT, KOJI ZELI MDA POSMATRAM (U OVOM SLUCAJU TO CE BITI <jobly-bobly>)
        //OBJEKAT, OPCIJA, KOJE ZELIM DA SE PRATE, ZA POMENUTI ELEMENT
                        //TO MOGU, NAIME BITI:
                        //          attributes: true|false
                        //          childList: true|false
                        //          subtree: true|false
//OSTALE OPCIJE MOGU PRONACI NA SLEDECOJ WEB STRANICI
//  https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit

//POSTO SAM SE UPOZNAO, DO ODREDJENOG NIVOA , SA ONIM, KAKVE SE MUTACIJE MOGU POSMATRATI
// VRATICU SE NA GORNJI CALLBACK ARGUMENT, KAKO BIH DEFINISAO, STA SETO
//TREBA DOGODITI, AKO SU CHILD ELEMNTI, POSMATRANOG ELEMENTA, USTVARI REMOVED ILI INSERTED
//I STA SE TREBA DOGODITI, AKO JE ATRIBUT ELEMENTA, PROMENJEN

//POSTO SAM DEFINISAO, POMENUTO, MOG USE POZABAVITI SLEDECIM

//NAIME, POMENUTA define METODA, KONFIGURIRA MutationObserver INSTANCU, KAKO BI POMENUTA POCELA DA PRIMA
//NOTIFICATION-E, KROZ CALLBACK (ARGUMENT KONSTRUKTORA), KADA SE DOM PROMENI, MATCH-UJUCI DATU OPCIJU

mutationObserverObject.observe(joblyBoblyElement, {
    attributes: true,
    childList: true,
    subtree: true
});

//AKO ZELIM DA SE OBSERVING, VISE NE OBAVLJA, MOGU, NA    MutationObserver INSTANCI, PRIMENITI
//              disconnect          METODU (BEZ ARGUMENATA)

//POSTO NISAM DISCONNECT-OVAO OBSERVER, MOGU POGLEDATI STA SE TO STAMPALO U KONZOLI, KAO REZULTAT
//ONOGA STO SAM DEFINISAO (U OBIMU GORNJEG CALLBACK-A), DA SE URADI, POSTO JE OBSERVER "UOCIO PROMENU" 

//POSTO ZNAM DA SAM POMENUTI OBSERVING DEFINISAO OVDE, A POSTO ZNAM DA SAM VRSIO NEKE MODIFIKACIJE
//NA CUSTOM ELEMENTU (UKLANJAO I DODAVAO SLOTTED ELEMENTE), A SVE SE TO SLALO (ODNOSNO KOREKTNIJ JE RECI
//DA CE SE SLATI) U QUEUE-E, JASNO MI JE DA TO ZNACI DA SAM OVDE PRVO DEFINISAO DA SE OBSERVUJE
//CUSTOM HTML ELEMENT, A ONO STO JE DEFINISAO U CALLBACKOVIMA (then METODA), JASNO MI JE DA JE ONO NAREDNO
//STO SE IZVRSAVA (SALJE N STACK-OVE), JASNO MI JE DA CU ZAISTA MOCI VIDETI KOJE SU SE TO MUTACIJE DOGODILE
//ZA POMENUTI ELEMENT

//I ZAISTA U KONZOLI SE SVE STAMPALO, KAKO TREBA I TO U TRI NAVRATA, JER SAM IMAO DVA NAVRATA
//REMOVINGA/INSERTION-A, SLOTTED ELEMENATA IZ LIGHT DOM-A, CUSTOM ELEMENTA
//(MEDJUTIM POSTOJE TRI NAVRATA INSERTION/REMOVINGA, ALI PRVI JE POSTIGNUT DIREKTNIM NESTINGOM
//U HTML FAJLU, DAKLE BEZ UPOTREBE JAVASCRIPT-A, I VEROVATNO ZATO NIJE NI PRIMECEN OD OBSERVER-A)

//A ZA MUTACIJE NAD ATRIBUTIMA, NIJE SE NISTA STAMPALO, JER SE NISU NI DGODILE NIKAKVE MUTACIJE SA
//ATRIBUTIMA CUSTOM ELEMENTA

//NARAVNO, TREBA DODATI DA JE POMENUTI CALLBACK (ARGUMENT MutationObserver KONSTRUKTORA),
// ISTO PO NEKOJ MUTACIJI SALJE U QUEUE

//SLEDECE STO JE STAMPANO U KONZOLI MI MOZE TO I PRIKAZATI
const stampano_u_konzoli = `
index.js:3984       (3) [slot, div, document-bodyNeue]
index.js:3985        1
index.js:4102       microtask 1
index.js:4219       Child node, je dodat ili uklonjen iz observed custom elementa   /**/
index.js:3984       (3) [slot, div, document-bodyNeue]
index.js:3985       2
index.js:4162       microtask 2 neka vrednost
index.js:4166       <slot name=​"podcast">​…​</slot>​
index.js:4219       Child node, je dodat ili uklonjen iz observed custom elementa       /**/
index.js:3984       (3) [slot, div, document-bodyNeue]
index.js:3985       3
`;
//OSTAJE PODSETNIK DA SE DETALJNIJE POZABAVIM, ODNOSNO DA DETALJNIJE NAUCIM SVE OSOBINE I METODE,
//I NAJBOLJU PRAKSU PRILIKOM UPOTREBE     MutationObserver INSTANCI, STO MOGU PROCITATI, IZ NEKOLIKO
//MDN CLANAKA

//SADA NASTAVLJAM MOJE BAVLJENJE SA shadow DOM-OM I slot-OVIMA
//
//RANIJE SAM KORISTIO GETTER, ILI PROPERTI assignedSlot, SLOTTED ELEMENTA, KOJIM SE PRISTUPA, NJEGOVOM
//ASSIGNED slot-U, MEDJUTIM, MOGUCE JE PRISTUPITI I SLLOTED ELEMENTU, ILI ELEMENTIMA, KOJI SU DITRIBUIRANI
//PREKO slota, KOJEM SU DISTRIBUIRANE
//
//          TO SE POSTIZE UZ POMOC METODE       assignedNodes()
//
//AKO ZELIM DA SAMO PRISTUPIM SLOTTED ELEMENTIMA, POMENUTOJ METODI CU, KAO ARGUMENT DODATI NISTA
//
//A AKO ZELIM DA PRISTUPIM FALLBACK CONTENT-U, slot-A, U SLUCAJU DA NE POSTOJE DISTRIBUTED NODES
//POMENUTOJ METODI CU DODATI, SLEDECI OBJEKAT, KAO ARGUMENT
//              {flatten: true}

const prviSlot = document.querySelector('jobly-bobly').shadowRoot.querySelector('[name=podcast]');
const treciSlot = document.querySelector('jobly-bobly').shadowRoot.querySelector('[name=screencast]');
console.log(prviSlot, treciSlot);

console.log(    prviSlot.assignedNodes()                        );          //  ->      [h1]    (JEDAN CLAN, ODNOSNO JEDAN SLOTTED h1 ELEMENT)
console.log(    treciSlot.assignedNodes()                       );          //  ->      []      (NEM CLANOVA, ODNOSNO NEMA SLOTTED ELEMENATA)
console.log(    treciSlot.assignedNodes({flatten: true})        );          //  ->      [h4]    (JEDAN CLAN, FALLBACK CONTENT MU JE h4 ELEMENT)
//
//
//SADA CU SE POZABAVITI NECIM STO SE ZOVE       shadow DOM event model
//
//REGISTROVACU NOVI CUSTOM ELEMENT, ZA OVU POTREBU

window.customElements.define('some-bobly-element', class extends HTMLElement {
    constructor(){
        super();

        //KREIRAO SAM, ODNOSNO REGISTROVAO SAM, NOVI CUSTOM ELEMENT, PRVENSTVENO, KAKO BI SAGLEDAO
        //PROPAGATION EVENTA, OD MESTA GDE NASTANU, U shadow DOM-U, PA DO window-A
        
        //PRVENSTVENO TO RADIM, ZBOG RECENICE KOJE SAM PROCITAO U WEB FUNDAMENTALS GOOGLE CLANCIMA, A KOJA
        //GLASI DA, SAMO AKO SE RADI O  open    SHADOW ROOT-U,      event.composedPath()
        //CE return-OVATI NIZ, SA ONIM node-OVIMA, KROZ KOJE SE EVENT PROPAGATE-OVAO, ODNOSNO KROZ
        //KOJE JE PUTOVAO, A MEDJU NJIMA CE SE NALAZITI I node-OVI, KOJI SU DEO SHADOW THREE-JA

        //PREDPOSTAVLJAM DA SE POMENUTIM MISLILO, DA SE U SLUCAJU    closed      SHADOW ROOT-A
        //NECE, U POMENUTOM retur-OVANOM NIZU NACI I ONI node-OVI, KOJI SU DEO SHADOW DOM-A, VEC CE SE
        //RACUNATI, DA SE 'EVENT RODIO', ILI DIREKTNO, U MOM CUSTOM ELEMENTU, ILI U NEKOM NJEGOVOM NESTED 
        //ELEMENTU, KOJI NIJE DEO SHADOW DOM-A

        //SVE POMENUTO CU ISPITATI NA NACIN DA CU TOKOM KACENJA HANDLERA, NA ELEMENTE U SHADOW DOMU,
        //JA MENJATI        
        //                    OPENNESS          I           CLOSENESS
        //                         SHADOW ROOT-A, NA SLEDECI NACIN

        //( OVDE CU SAMO OSTAVITI DA SAM NAKON SVIH TESTIRANJAM ZA KOJE SAM REKAO DA CU SPROVESTI
        //UTVRDIO DA SE GORNJE POMENUTO ODNOSI SAMO NA      SLOTTED         ELEMENTE)

        //const shadowRoot = this.attachShadow({mode: 'closed'});         //DAKLE NEKAD CU COMMENT OUT
                                                                        //OVO, A NEKAD OVO SLEDECE
        const shadowRoot = this.attachShadow({mode: 'open'});

        const textNode1 = document.createTextNode("Tekst prvog paragrafa");
        const textNode2 = document.createTextNode("Ovo je drugi paragraf");
        const textNode3 = document.createTextNode("Treci paragraf ovo je");

        const styleContent = `
            :host {
                border: orange solid 2px;
                display: block;
                padding: 8px;
            }

            ::slotted(*) {
                margin-left: 48px;
                padding: 16px;
            }

            ::slotted(:not([slot])) {
                border: pink solid 1px;
            }

            ::slotted([slot=fidget]) {
                border: tomato solid 8px;
            }

            ::slotted([slot=spinner]) {
                border: olive solid 8px;
            }

            section {
                border : yellow solid 4px;
                padding: 8px;
            }
        `;

        const paragraf1 = document.createElement('p');
        const paragraf2 = document.createElement('p');
        const paragraf3 = document.createElement('p');

        const slot1 = document.createElement('slot');
        const slot2 = document.createElement('slot');
        const slot3 = document.createElement('slot');

        const divElement = document.createElement('div');
        const sekcijaElement = document.createElement('section');
        const styleElement = document.createElement('style');
        
        paragraf1.appendChild(textNode1);
        paragraf2.appendChild(textNode2);
        paragraf3.appendChild(textNode3);

        slot1.name = "fidget";
        slot3.name = "spinner";
        
        slot1.innerHTML = "<h1>SLOT1 FALLBACK</h1>";
        slot2.innerHTML = "<h1>SLOT2 FALLBACK</h1>";
        slot3.innerHTML = "<h1>SLOT3 FALLBACK</h1>";

        styleElement.textContent = styleContent;

        divElement.appendChild(paragraf1);
        sekcijaElement.appendChild(paragraf2);
        divElement.appendChild(slot1);
        sekcijaElement.appendChild(slot2);
        sekcijaElement.appendChild(paragraf3);
        sekcijaElement.appendChild(slot3);

        divElement.appendChild(sekcijaElement);

        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(divElement);

        //HANDLERE CU KACITI OVDE, A NE U OBIMU connectedCallback-a, DA NE BIH MORAO DA SKLADISTIM
        // shadowRoot U PROPERTIJU INSTANCE CUSTOM ELEMENTA (TO BIH MORAO RADITI USLUCAJU
        //CLOSED SHADOW ROOT,A, JER NJEMU NIJE MOGUCE PRISTUPITI)
        //ILI DA NE BIH MORAO SKLADISTITI, NEKI, SHADOW DOM-OV ELEMENT, NA KOJI BIH KACIO HANDLER
        //TO GOVORIM JER, closed SHADOW DOM-U
        //JEDINO MOGU PRISTUPITI, AKO IMAM NJEGOVU REFERENCU, KOJA JE RETURNED, PRILIKOM NJEGOVOG
        //ATTACHING-A
        
        //ZAKACICU HANDLER, NA JEDAN OD PARAGRAFA U SHADOW DOM-U
        
        paragraf3.addEventListener('click', ev => {
            console.log(ev.composedPath());
            // U SLUCAJU OTVORENOG SHADOW ROOT-A, STAMPALO SE SLEDECE
            //[p, section, div, document-bodyNeue, some-bobly-element, body, html, document, Window]
            // DA JE SHADOW ROOT ZATVOREN, STAMPALO BI SE SLEDECE
            //  [p, section, div, document-bodyNeue, some-bobly-element, body, html, document, Window]
            //TAKO DA ONO, STO JE RECENO 
            //          'DA SE U SLUCAJU    closed      SHADOW ROOT-A
            //          NECE, U POMENUTOM retur-OVANOM NIZU NACI I ONI node-OVI, KOJI SU DEO 
            //          SHADOW DOM-A'
            //PO SVEMU SUDECI NIJE TACNO, JER SU SE, I U SLUCAJU CLOSED SHDOW ROOT-A, U RETURNED NIZU
            //NASLI         p         section         div          document-bodyNeue(shadowroot)

            //PROVERICU I KOJU VREDNOST IMA Event-OV, target PROPERTI
            console.log(ev.target);
            //I U SLUCAJU close, I U SLUCAJU open SHADOW ROOT-A, VREDNOST targeta CE BITI PARAGRAF
            //A NE CUSTOM ELEMENT, U CIJEM SHADOW DOM-U, SE OVAJ PARAGRAF NALAZI
        });
        
        //MOZDA SE ONO STO MISLIM DA JE POGRESNO, ODNOSILI SAMO NA slot ELEMENTE, I TO CU PROVERITI
        //TAKO STO CU NA JEDAN OD slot ELEMENATA, ZAKACITI HANDLER
        
        slot2.addEventListener('click', ev => {
            console.log(ev.composedPath());
            //I U OVOM SLUCAJU ISTO VAZI STO JE VAZILO I GORE, JER CE SE I U SLUCAJU OPEN I CLOSED
            //SHADOW ROOT-A, STAMPATI SLEDECE:

         //[h4, slot, section, div, document-bodyNeue, some-bobly-element, body, html, document, Window]
         //DAKLE, BEZ OBZIRA DA LI JE SHADOW ROOT, OPEN ILI CLOSED, U NIZU SE NALAZE, ONAJ SLOTTED ELEMENT,
         // PA NJEGOV ASSIGNED SLOT, PA OSTALI ELEMENTI SHADOW  DOMA, PA DALJE SVE SVE DO window-a

            //PROVERICU I KOJU VREDNOST IMA Event-OV, target PROPERTI
            console.log(ev.target);
            //I U SLUCAJU close, I U SLUCAJU open SHADOW ROOT-A, VREDNOST targeta CE BITI PARAGRAF ILI
            //h4 ELEMENT, U ZAVISNOSTI NA KOJI OD NJIH SAM KLIKNUO 
            //(ONI SU DISTRIBUTED NEIMENOVANOM SLOT-U)
            //A NE SLOT, ILI CUSTOM ELEMENT (some-bobly-element), U CIJI SE POMENUTI SLOT (U SHADOW DOM-U),
            // OVI ELEMENTI DISTRIBUIRAJU
            
        });

        //POSTO SAM ZAKACIO HANDLERE NA JEDNOM ELEMENTU (KOJI NIJE SLOT A NI SLOTTED) SHADOW DOM-A,
        //PA SAM ZAKACIO HANDLER ZAKACIO NA SLOT ELEMENT, OSTAJE MI DA HANDLER ZAKACIM NA SLOTTED ELEMENT
        //I POGLEDAM STA CE SE SVE NALAZITI U NIZU, POVRATNOJ VREDNOSTI   event.composedPath    METODE,
        //I U SLUCAJU OPENA, A I CLOSED SHADOW ROOT-A
        //JA CU USTVARI ZAKACITI onclick HANDLER-E, NA DVA SLOTTED ELEMENTA


        this.querySelector('[slot=fidget]').addEventListener('click', ev => {
            console.log(ev.composedPath());
            //U SLUCAJU     'closed'   SHADOW ROOT-A, STAMPALO SE SLEDECE

            //          [h4, some-bobly-element, body, html, document, Window]
            
            //U SLUCAJU     'open'       SHADOW ROOT-A, STAMPALO SE SLEDECE

            //    [h4, slot, div, document-bodyNeue, some-bobly-element, body, html, document, Window]
            
            //PROVERICU I KOJU VREDNOST IMA Event-OV, target PROPERTI
            console.log(ev.target);
            //I U SLUCAJU close, I U SLUCAJU open SHADOW ROOT-A, VREDNOST targeta CE BITI SLOTTED ELEMENT

        });

        this.querySelector('[slot=spinner]').addEventListener('click', ev => {
            console.log(ev.composedPath());

            //U SLUCAJU     'closed'   SHADOW ROOT-A, STAMPALO SE SLEDECE

            //          [p, div, some-bobly-element, body, html, document, Window]

            //U SLUCAJU     'open'       SHADOW ROOT-A, STAMPALO SE SLEDECE

         //[p, div, slot, section, div, document-bodyNeue, some-bobly-element, body, html, document, Window]
            
            //PROVERICU I KOJU VREDNOST IMA Event-OV, target PROPERTI
            console.log(ev.target);
            //I U SLUCAJU close, I U SLUCAJU open SHADOW ROOT-A, VREDNOST targeta CE BITI SLOTTED ELEMENT
            //U OVOM SLUCAJU TO MOZE BITI (div, KOJI IMA slot ATRIBUT; ILI ELEMENT, KOJI JE NESTED U TOM
            //div-u (div KOJI JE SLOTTED (A KOJI TAKODJE IMA I NESTED ELEMENTE, h4 I p)))

        });

        //I NAKON PREGLEDANJA, POVRATNE VREDNOSTI       ev.composedPath()   POZIVANJA
        //U SLUCAJU KAD JE EVENT HANDLER ZAKACEN NA SLOTTED ELEMENT, POKAZALO
        //SE DA SE U SLUCAJU          closed          SHADOW ROOT-A       U ONOM NIZU, KOJI JE POVRATNA 
        //VREDNOST composedPath POZIVANJA, NALAZE node-OVI, BEZ ONIH KOJI PRIPADAJU SHADOW DOM-U
        //DAKLE, KAO DA JE EVENT TRIGGER-OVAN U LIGHT DOM-U, NAD SLLOTED ELEMENTOM, ODNOSNO KAO DA JE
        //"USKRACENA INFORMACIJA" DA SE RADI O SLOTTED ELEMENTU DISTRIBUIRANOM U SLOT, KOJI SE NALAZI
        //U SHADOW DOM-U

        //I NAKON PREGLEDANJA, POVRATNE VREDNOSTI       ev.composedPath()   POZIVANJA
        //U SLUCAJU KAD JE EVENT HANDLER ZAKACEN NA SLOTTED ELEMENT, POKAZALO
        //SE DA SE U SLUCAJU          open          SHADOW ROOT-A       U ONOM NIZU, KOJI JE POVRATNA 
        //VREDNOST composedPath POZIVANJA, NALAZE node-OVI, MEDJU KOJIMA SU I ONI KOJI PRIPADAJU 
        //SHADOW DOM-U; DAKLE, VIDI SE DA JE EVENT TRIGGER-OVAN NA SLOTTED ELEMENTU, PA SE RAZMNOZAVAO
        //ODNOSNO PROPAGATE-OVAO DO SLOTA, PA OD SLOTA KROZ GRANU SHADOW DOM DRVETA, PA KROZ SHADOW
        //BOUNDARY, "NAPOLJE", SVE DO window-A

        //PROVERA, KADA SE TRIGGERUJU, NEKI OD EVENTOVA (CISTO DA SAZNAM VISE O EVENT-OVIMA, JER SE
        //RANIJE NISAM BAVIO SA MNOGO NJIH) (URADICU TO IAKO TO NIJE KONKRETNA TEMATIKA OVOG DOKUMENTA)

        console.log(this.querySelectorAll('h4:not([slot])')[1]);
        console.log(this.querySelectorAll('p:not([slot])')[1]);

        this.querySelectorAll('h4:not([slot])')[1].addEventListener('mouseenter', ev => {
            //console.log(ev.target);
            console.log("mouseeneter", ev.composedPath());
        });

        this.querySelectorAll('p:not([slot])')[1].addEventListener('mouseover', ev => {
            //console.log(ev.target);
            console.log("mouseover", ev.composedPath());
        });

        slot3.addEventListener('mouseenter', ev => {
            //console.log(1, ev.target);
            console.log(1, ev.composedPath());
        });
        
        slot3.addEventListener('mouseover', ev => {
            //console.log(2, ev.target);
            console.log(2, ev.composedPath());
        });
    }
});

const some_bobly_Element_light_dom = `
<some-bobly-element>
    <h4 slot="fidget">Ovo je fidget</h4>
    <div slot="spinner">
      <h4>Ovo je spinner</h4>
      <p>A ovo je njegov paragraf</p>
    </div>
    <h4>Ovo je neimenovani header</h4>
    <p>Ovo je neimenovanog pargraf</p>
  </some-bobly-element>
`;

//OSTAJE PODSETNIK DA MORAM DA ISPITAM ZASTO SE PO MOJOJ PROCENI DESAVAJU 'CUDNE STVARI', KADA
//SHADOW ROOT PRIKACIM NA NEKI DIV ELEMENT, UMESTO DA GA DIREKTNO KACIM NA this
//ONO STO MOGU TADA DA PRIMETIM JESTE DA FLATTENED DOM IZGLEDA CUDNO NAKON NESTOVANJA SLOTTED ELEMNATA
//MOZDA ZATO STO LIGHT DOM TADA "NIJE CIST", I DESAVA SE DA SE SAM DIV, KOJI SLUZI KAO CONTAINER ZA 
//SHADOW ROOT, USTVARI DISTRIBUIRA, NEIMENOVANO MSLOTU (TAKO DA IMAM NEKU CUDNU 'REKURZIVNU' SITUACIJU)

// SADA CU NASTAVITI BAVLJENJE SA   DOM event model-OM

//KADA SE EVENT BUBBLE-UJE UP, SA NEKOG ELEMENTA U SHADOW DOM-U, EVENT-OV target JE PRILAGODJEN (ADJUSTED)
//KAKO BI ZADRZAO ENCAPSULATION, KOJI OBEZBEDJUJE SHADOW DOM
//ODNOSNO EVENT-OVI SU RETARGETED, KAKO BI IZGLEDALO DA DOLAZE OD KOMPONENTE, UMESTO INTERNAL ELEMENTA,
//U SHADOW DOM-U
//    (OVO STO SAM CITIRAO SA WEB FUNDAMENTALS CLANKA, NE DELUJE ISTINITO, JER SAM JA U GORNJEM PRIMERU
//    STAMPAO VREDNOSTI target-A (I U SLUCAJU ZAKACENOG HANDLERA NA slot, SLOTTED, ELEMENT, ILI ONAJ
//    KOJI NIJE NI SLOT A NI SLOTED, A ZAKACEN JE U SHADOW DOM-U)); I U SVIM TIM SLUCAJEVIMA, target
//    JE BIO KONKRETAN NESTED ELEMENT, MA KOLIKO BIO DUBOKO U SHADOW DOM-U, I BILO DA JE SHADOW ROOT,
//      'open'      ILI     'closed'

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//NE ZNAM DA LI SAM, U PREDHODNOM PRIMERU POGRESIO U TERMINOLOGIJI, UPRAVO IZ RAZLOGA, RANIJEG POVRSNOG
//UPOZNAVANJA SA EVENT-OVIMA, I NJIHOVIM OSOBINAMA
//ZATO IZ TOG RAZLOGA, U NASTAVKU CU SE BAVITI PONAVALJANJEM, SVEGA STO ZNAM O EVENT-OVIMA, I TRUDICU
//SE DA OTKLONIM NEDOUMICE, KOJE IMAM U POGLEDU NJIH
//                    POCECU, SA TERMINOM                  PROPAGATION
//  ZATIM TERMINIMA                             BUBBLING                    CAPTURING
//
//PROPAGATION EVENT-A, ODNOSNO MNOZENJE EVENTA, ILI PRECIZNIJE RECENO RAZMNOZAVANJE JESTE USTVARI TERMIN
//KOJIM SE ZAJEDNICKI OPISUJE PONASANJE EVENTA
//                                 I U SLUCAJU          BUBLLING-A    I U SLUCAJU   CAPTURINGA
//DAKLE REC JE O 'REPLIKACIJI' JEDNOG EVENT-A, A BUBBLING I CAPTURING JESU SMEROVI TOG RAZMNOZAVANJA
//(PO MOJOJ PROCENI, ODNOSNO PO MOM SHVATANJU)

//                              CAPTURING 
//NA KOJI DEV-OVI, MNOGO NE OBRACAJU PAZNJE, JESTE RAZMNOZAVANJE KROZ 
//DOM GRANU, SVE DO ONOG ELEMENTA NA KOJEM JE EVENT TRIGGER-OVAN (target) ('DAKLE, ODOZGO- NADOLE')
//                                                              (OD window-A, DO target-A)
//
//                              BUBBLING 
//RAZMNOZAVANJE EVENTA, KROZ DOM GRAN-U, POCEV OD targeta, KROZ ANCESTOR-E, SVE DO window-A 
//
//SADA, TREBA VODITI RACUNA O SLEDECOJ CINJENICI, A TO JE DA caturing NIJE PO DEFAULT-U, 
//ENABLED KADA SE KACE HANDLERI
//ODNOSNO CAPTURING NIJE NESTO STO SE PO DEFAULT-U UPOTREBLJAVA
//U SLUCAJU KACENJA HANDLER-A, KORISCENJEM      addEventListener    METODE; capturing SE, NAIME MOZE 
//ENABLE-OVATI, KADA SE UZ HANDLER, DODA I BOOLEAN true ARGUMENT
//
//STA TO ZNACI KONKRETNO ZA ELEMENT, NA KOGA JE ZAKACEN HANDLER?
//
//MEDJUTIM, JA NISAM PRICAO O       TARGGETING-U   (NISAM VIDEO DA TO IKO TAKO ZOVE ALI JA SAM TO TAKO
//NAZVAO), A TO JE ONO STO MOGU TAKO ZVATI A ODNOSI SE NA TRIGGERING EVENTA, NA KONKRETNOM ELEMENTU

//ZATO, KAO STO SAM PROCITAO U JEDNOM CLANKU, NAJBOLJE JE DA ONO STO SE TICE EVENT-OVA, POSMATRAM TAKO
//STO CU, SAM PROPAGATION, POSMATRATI, KROZ TRI FAZE

                //CAPTURING   FAZA  (EVENT SE RAMNOZAVA DOLE, KA ELEMENTU)

                //TARGET    FAZA    (EVENT JE DOSTIGAO TARGET ELEMENT)
                            //JAKO BITNO JE RECI DA SE OVA FAZA BAVI ELEMNT-OM NA KOJEM JE EVENT
                            //TRIGGEROVAN, DAKLE NE ELEMENT ZA KOJEG JE ZAKACEN HANDLER, VEC ELEMENT
                            //GDE JE EVENT TRIGGERED
                           //STO ZNACI DA AKO JE KLIKNUTO NA ELEMENTOV (ONAJ ELEMENT NA KOJEM JE 
                           //ZAKACEN HANDLER)
                           //DESCENDANT, ON JESTE       target
                           //STO ZNACI DA, VREDNOST EVENT-OVOG PROPERTIJA    target    JESTU UVEK, 
                           //BEZ OBZIRA NABILO STA DRUGO, ONAJ ELEMENT GDE JE EVENT TRIGGERED
                           
                            // A PROPERTI       currentTarget   UVEK SKLADISTI ELEMENT ZA KOJI JE 
                            //HANDLER ZAKACEN

                //BUBBLING  FAZA    (EVENT BUBBLES UP, ODNOSNO RAZMNOZAVA SE GORE OD ELEMENTA(target-A))

window.customElements.define('some-shably-element', class extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        
        //const shadowRoot = this.attachShadow({mode: 'closed'});

        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const div3 = document.createElement('div');

        const paragraf1 = document.createElement('p');
        const paragraf2 = document.createElement('p');
        const paragraf3 = document.createElement('p');

        paragraf1.textContent = "Tekst prvog paragrafa";
        paragraf2.textContent = "Tekst drugog paragrafa";
        paragraf3.textContent = "Tekst treceg paragrafa";

        const styleElement = document.createElement('style');

        const slot1 = document.createElement('slot');
        const slot2 = document.createElement('slot');
        const slot3 = document.createElement('slot');

        const styleText = `
            :host {
                display: block;
                border: pink solid 4px;
                padding: 8px;
            }

            ::slotted(*) {
                margin-left: 18%;
            }

            ::slotted([slot]) {
                border: orange solid 6px;
            }

            ::slotted(:not([slot])) {
                border: olive solid 4px;
            }

            div {
                border: yellow solid 2px;
                padding: 58px;
                
            }

            p {
                border: tomato solid 4px;
                text-align: center;
            }

            ::slotted(div) {
                font-family: cursive;
            }

            ::slotted(.neka_sekcija_slotted) {
               /*HTEO SAM DA DEFINISEM BORDER, ALI NJEGA OVERRIDUJE section SLEKTOR IZ EXTERNAL STYLESHEET*/
               /*ZATO CU DEFINISATI OUTLINE, SAMO DA SE UVERIM DA OVA JSELEKTOR FUNKCIONISE*/
               outline: dotted 8px #426286;
               padding: 24px;
            }
        `;

        slot1.name = 'ayohuasca';
        slot3.name = 'canabis';

        slot1.innerHTML = "<h1>SLOT1 FALLBACK</h1>";
        slot2.innerHTML = "<h1>SLOT2 FALLBACK</h1>";
        slot3.innerHTML = "<h1>SLOT3 FALLBACK</h1>";

        div1.appendChild(slot1);
        div1.appendChild(paragraf1);

        div2.appendChild(slot2);
        div2.appendChild(paragraf2);

        div3.appendChild(slot3);
        div3.appendChild(paragraf3);

        styleElement.textContent = styleText;

        div2.appendChild(div3);
        div1.appendChild(div2);

        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(div1);
        
        //OVO STAMPAM SAMO KAO PODSETNIK, DA JE MOGUCE PRISTUPITI ELEMENTIMA LIGHT DOM-A
        //NA SLEDECI NACIN (ODNOSNO SLOTTED ELEMENTIMA, NE PRISTUPAM KROZ SHADOW ROOT)
        console.log(        this.querySelector('div[slot=canabis]').querySelector('ol')         );
        //SLOT JE NARAVNO U SHADOW DOM-U
        console.log(        shadowRoot.querySelector('slot[name=canabis]')                      );

        //SADA CU POCETI DA SE, KONKRETNO BAVIM EVENT-OVIMA, I NJIHOVIM ODLIKAMA (NAIME, PROBACU
        //RAZLICITE STVARI, ODNSONO KACICU HANDLERE NA RAZLICITE ELEMENTE (BEZ OBZIRA BILI ONI SLOTTED
        //ELEMENTI, ILI BILI ONI ELEMENTI U SHADOW DOM-U))

        //ZA POCETAK ZELIM DA ZAKACIM, EVENT HANDLER, NA SLOTTED ELEMENT, KOJI JE DISTRIBUIRAN, ONOM 
        //SLOT-U,KOJI JE NAJDUBLJE NESTED U SHADOW DOM
        //ZASTO ZELIM TAJ ELEMENT?
        //PA ZATO STO SE KAO STO SAM REKAO NALAZI DUBOKO U SHADOW DOMU, ALI TAKODJE ZATO STO TAJ
        //SLOTTED ELEMENT, I SAM IMA SVOJE DESCENDANT-E

        //MEDJUTIM, JA CU NA ELEMENT ZAKACITI, DVA HANDLER-A (DAKLE, PRIMENICU DVA PUTA addEventListener
        //NA ISTI ELEMENT, I U SLUCAJU ISTOG EVENT-A (NEKA BUDE TIPA 'click'))
        
        //JEDAN CALLBACK JE ARROW FUNKCIJA (STO ZNACI DA CE SE U OBIMU, JEDNOG CALLBACK-A this ODNOSITI
        //NA CUSTOM ELEMENT (<some-shably-element>)) (OVO NISAM MORAO DA RADIM, ALI ZELIM DA PROVEZBAM STO JE VISE MOGUCE STVARI)

        //CALLABCK DRUGOG addEventListener METODE NECE IMATI BINDED this, JER CE CALLBACK BITI ANONIMNA
        //FUNKCIJA, ALI NE ARROW

        //DAKLE ONO NA STA TREBA DA SE KONCENTRISEM, I KAKO CU NAJBOLJE SHVATITI SVE OVE FAZE, JESTE
        //DA NAKON STO SAM ZAKACIO I DEFINISAO HANDLERE (SVE PRIKAZANO DOLE), JA USTVARI OBAVIM
        //TESTIRANJE NA SLEDECI NACIN:
                    //NECU KLIKNUTI NA DIV, VEC NA NJEGOV DESCENDATN (I TO NEKA NE BUDE CHILD, VEC NEKI
                    //DALJU DESCENDANT, ODNOSNO TO CE BITI JEDAN OD LIST ITEMA ORDERED LISTE)

        this.querySelector('div[slot]').addEventListener('click', ev => {
            console.log('-------------------------');
            console.log(ev.composedPath());  //NIZ IMA RAZLICIT BROJ CLANOVA, U ZAVISNOSTI OD OTVORENOSTI ILI ZATVORENOSTI SHADOW DOM-A, ALI O TOME SAM VEC GOVORIO, I NECU NISTA DODATNO KOMENTARISATI 
            console.log(ev.target); //  target JE UVEK ONAJ ELEMENT NA KOJI SE KLIKNE (<li> ELEMENT U OVOM SLUCAJU)
            console.log(ev.currentTarget);  //ELEMENT NA KOJI JE ZAKACEN HANDLER (div[slot])
            console.log(this);  //  <some-shably-element></some-shably-element>  (BINDED, ZBOG ARROW)
            console.log('--------NO CAPTURE-------');
        }, {capture: false});

        this.querySelector('div[slot]').addEventListener('click', function(ev){
            console.log('-------------------------');
            console.log(ev.composedPath());  //NIZ IMA RAZLICIT BROJ CLANOVA, U ZAVISNOSTI OD OTVORENOSTI ILI ZATVORENOSTI SHADOW DOM-A, ALI O TOME SAM VEC GOVORIO, I NECU NISTA DODATNO KOMENTARISATI 
            console.log(ev.target); //  target JE UVEK ONAJ ELEMENT NA KOJI SE KLIKNE (<li> ELEMENT U OVOM SLUCAJU)    
            console.log(ev.currentTarget);  //ELEMENT NA KOJI JE ZAKACEN HANDLER (div[slot])
            console.log(this);  //  div[slot]         (NEMA BINDING-A this-A; NIJE KORISCEN ARROW A NI bind METODA)
            console.log('-----capture enabled-----');
        }, {capture: true});

        //DOSAO SAM DO NAJBITNIJE STVARI, A TO JE DA OBZNANIM, KOJI SE TO CALLBACK PRVI POSLAO U QUEUE
        //ODNOSNO, POZIVANJE CIJEG CALLBACK-A, SE PRVO SLOZILO NA STACK POZIVA
        
        //PA TO JE ONAJ ARGUMENT CALLBACK, addEventListener POZIVANJA, KOJI JE PORED SEBE IMAO SLEDECI
        //ARGUMENT OBJEKAT
                            //          {capture: true}     (MOGAO SAM STAVITI I SAMO true KAO DRUGI ARGUMENT, A NE CEO OBJEKAT, JER OBJEKAT SE KORISTI, AKO ZELIM DA DEFINISEM, JOS NEKE DRUGE OPCIJE)
        
        //CAK CU NACRTATI I SLIKU KOJA CE POKAZATI CAPTURING I BUBBLING FAZE, CIME CU LAKSE VIDETI 
        //KAK OSE KOJE POZIVANJE SLALO U QUEUE

//                               capturing                                    bubbling
//                                       \                                    /
//                                        \                                 /
//                                         \                              /
//                                          \        div[slot]          /
// callback --> {capture: true} QUEUED FIRST \ -------  ¤    -------  / callback --> {capture: false} QUEUED SECOND
//                                            \   currentTarget     /
//                                             \                  /
//                                 capturing    \               /    bubbling
//                                               \            /
//                                                \         /
//                                                 \      /
//                                                  \   /
//                                                   \/
//                                                 target
//                                                   ¤
//                                                list item

        //POSTOJI JEDNA BITNA STVAR A TICE SE BUBBLING-A I CAPTURING-A, PRI SLEDECIM POSTAVKAMA
        //      target === currentTarget
        //ODNOSNO TO JE SITUACIJA, KADA JE HANDLER ZAKACEN NA ELEMENT, KOJI NEMA CHILD ELEMENT/E
        //U TU SVRHU, ZAKACICU HANDLERE (ISTO ZA 'click' TIP EVENT), ZA JEDAN DRUGI SLOTTED ELEMENT
        console.log(this.querySelector('h2:not([slot])'));
        //NEKA TO BUDE h2 ELEMENT, KOJI NEMA slot ATRIBUT (ODNOSNO KOJI SE DISTRIBUIRA U NEIMENOVANI slot ELEMENT)
        //A NEMA NI CHILD ELEMENT/E

        this.querySelector('h2:not([slot])').addEventListener('click', function(ev){
            console.log('--------NO CAPTURING-------');
            console.log(ev.target === ev.currentTarget);            //OVAJ HANDLER SE PRVI QUEUE-OVAO
        });

        this.querySelector('h2:not([slot])').addEventListener('click', function(ev){
            console.log('-------capture enabled------');
            console.log(ev.target === ev.currentTarget);            //OVAJ HANDLER SE DRUGI QUEUE-OVAO
        }, true);

        //PREDPOSTAVLJAO SAM DA CE SE PRVO IZVRSITI HANDLER, U CIJEM SLUCAJU JE DOZVOLJEN capture, 
        //ALI NIJE TAKO

        //EVENT JE, NAIME BIO U TARGET FAZI, I TADA UOPSTE NIJE BITNO DA LI JE CAPTURE DOZVOLJEN,
        //VEC SU SE HANDLER-I IZVRSILI PO REDOSLEDU, PO KOJEM SU I ZAKACENI NA ELEMENT, KOJI NEMA
        //DESCENDANAT-A
        
        //ONO CIME SADA ZELIM DA SE POZABAVIM, JESTE MOGUCNOST PREKIDA RAZMNOZAVANJA (PROPAGATION)
        //EVENT-A, U OBIMU HANDLER-A (KAD KAZEM PREKIDA PROPAGATION-A, MISLIM NA PREKID BUBBLING UP-A)

        //DEFINISACU KACENJE HANDLERA, NA section ELEMENT, KOJI JE TAKODJE SLOTTED ELEMENT
        //I ONO STO MI JE BITNO JESTE DA TAJ ELEMENT, IMA DESCENDANT-E

        this.querySelector('.neka_sekcija_slotted').addEventListener('click', ev => {
            console.log("EVENT JE PROPAGATE-OVAO DO SEKCIJE");
            //AKO JE ZA JEDAN OD ELEMENATA, KOJI JE DESCENDANT, .neka_sekcija_slotted ELEMENTA, USTVARI
            //ZAKACEN HANDLER, U SLUCAJU ISTOG EVENTA (event.type === 'click' U OVOM SLUCAJU),
            // I AKO JE U OBIMU, 
            //POMENUTOG HANDLERA (ZAKACENOM NA POMENUTI DESCENDANT), NAD Event INSTANCOM PRIMENJENA
            //stopPropagation; OVAJ HANDLER (U KOJEM PISEM OVAJ KOMENTAR), SE NECE IZVRSITI
            //ISTA STVAR BI BILA I DA JE POZVANA stomImmediatePropafation
            //JER BI PRIMENOM BILO KOJE OD TE DVE METODE, BIO PREKINUT PROPAGATION EVENTA (U OVOM
            //SLUCAJU BIO BI PREKINUT BUBBLING, I TIME SE EVENT NE BI RAZMNOZIO DO .neka_sekcija_slotted 
            //ELEMENTA)
            
            //A POSTO POGLEDAM DOLE JEDAN OD HANDLERA, KOJI SU ZAKACENI, NA PARAGRAF, KOJI JE DESCENDANT
            // .neka_sekcija_slotted ELEMENTA, VIDECU DA SAM TAMO POZVAO stopPropagation (ILI stopImmediatePropagation,
            //JER SAM NEKAD PRIMENJIVAO JEDNU, A NEKAD DRUGU METODU, DA BIH VIDEO KAKAV EFEKAT IMAJU)
            //I ZBOG TOGA OVAJ LISTENER, ZAISTA NIJE BIO QUEUED, ZA POZIVANJE
            
            //A DA SAM ZELEO DA SE OVAJ LISTENER IZVRSI, MOGAO SAM DODATI JOS JEDAN ARGUMENT, OVOJ 
            //addEventListener METODI
            //                                {capture: true}           ILI SAMO            true
            //TADA BI BIO ENABLEOVAN CAPTURING, A ZNAM DA SE PRILIKOM CAPTURING-A, EVENT RAZMNOZAVA OD
            //ANCESTORA KA DESCENDATIMA, I TIME BI SE LISTENER ZAISTA POSLAO U QUEUE, JER SAM OMOGUCIO
            //SLANJE TO LISTENER-A NA QUEUE U CAPTURING FAZI EVENT-A, I NEBI GA MOGLO ZAUSTAVITI, ODNOSNO
            //NIKAKAVOG EFEKTA NE BI IMALO POZIVANJE    stopPropagation-A ILI stopImmediatePropagation-A,
            //U HANDLERIMA, KOJI SU ZAKACENI NA DESCENDANTE .neka_sekcija_slotted ELEMENTA 
        });

        //SADA CU DA ZAKACIM HANDLER NA JEDAN OD DESCENDANT-OVA, POMENUTOG SECTION ELEMENTA (TAJ DESCENDANT JE PARAGRAF)

        this.querySelector('.neka_sekcija_slotted p').addEventListener('click', ev => {
            console.log('-------------------------');
            ev.stopImmediatePropagation();
            //ev.stopPropagation();
            console.log('(paragraph) FIRST handler invoked');
            
            console.log('-------------------------');
            //ONO STO JE SIGURNO U SLUCAJU OVOG LISTENER-A, JESTE DA CE ON BITI POSLAT NA QUEUE
            //JER PO OVAKVIM POSTAVKAMA NEMA NISTA STO BI SPRECILO, NJEGOVO SLANJE NA QUEUE (NAKON KILKA)
            //ODNOSNO NIGDE NEMA PREKIDA U PROPAGATION-U, KOJI VODI DO NJEGA
            //ALI ONO STO SAM DEFINISAO U OVOM HANDLER-U, JESTE PRIMENA     stopImmediatePropagation
            //(ILI stopPropagation, JER SAM DA BI VIDEO KAKAV EFEKAT IMAJU TE DVE METODE, PRIMENU
            //ISTIH, STAVLJAO I BRISAO, PA OPET, DA BIH VIDEO KAKAV EFEKAT DONOSE)
            //TO ZNACI DA JE PROPAGATION, ODNOSNO RAZMNOZAVANJE Event-A PREKINUTO, OD NJEGA DO ANCESTORA
            
            //MEDJUTIM, STA JE TO DONOSI PRIMENA        stopImmediatePropagation METODE
            //PA TO ZNACI DA CE PROPAGATION BITI PREKINUT, I PORED TOGA STO SE EVENT NECE RAZMNOZITI 
            //DO ANCESTORA, PREE TOGA NECE SE MOCI U QUEUE, POSLATI HANDLERI, KOJI BI U NASTAVKU 
            //(NOVOM PRIMENOM addEventListener) BIL IZAKACENI
            //NA ISTI PARAGRAF (U SLUCAJU EVENTA, ISTOG TIPA) (sto sam u ovom slucaju, ako pogledam
            //dole i uradio)
        });

        //ZAKACICU, JOS JEDAN HANDLER, NA POMENUTOM PARAGRAFU

        this.querySelector('.neka_sekcija_slotted p').addEventListener('click', ev => {
            console.log('-------------------------');
            
            console.log('(paragraph) SECOND handler invoked');
            
            console.log('-------------------------');               

            //DAKLE KADA JE U PREDHODNOM HANDLER-U, NAD EVENT INSTANCOM PRIMENJENA stopImmediatePropagation
            //METODA, OVAJ LISTENER SE NECE POSLATI NA QUEUE
            
            //A DA JE U PREDHODNOM HANDLERU, NAD Event INSTANCOM BILA PRIMENJENA, stopPropagation METODA
            //OVAJ LISTENER BI BIO POSLAT NA QUEUE

            //MEDJUTIM, IAKO BI OVAJ LISTENER BIO POSAT NA QUEUE, PROPAGATION BI BIO PREKINUT, I NEBI
            //Event SE DALJE NE BI RAZMNOZAVAO DO OSTALIH ELEMENATA, DO KOJIH BI U NORMALNIM
            //USLOVIMA, PROPAGATION DOSTIZAO
        });

        //JOS JEDNA JAKO BITNA CINJENICA VEZANA ZA PROPAGATION
        //
        //                      AKO JE HANDLER POSLAT NA QUEUEU, U CAPTURING FAZI, ON NECE PONOVO
        //                      BITI POSLAT NA QUEUE, U BUBBLING FAZI
        //                      DAKLE, PRI NA PRIME, JEDNOM KLIKU, BEZ OBZIRA STO JE CAPTURE OMOGUCEN
        //                      NECU SE DESITI DVA POZIVANJA, POMENUTOG HANDLER-A, VEC SAMO JEDNO

        //I AJDE DA JOS JEDNOM PONOVIM, IAKO JE TO MOZDA I SUVISNO 
        //(ENABLING CAPTURING ZA currentElement === target), NEMA NIKAVOG
        //EFEKTA NA REDOSLED SLANJA HANDLERA U QUEUE, JER SE TADA HANDLERI, SALJU U QUEUE, PO ISTOM
        //REDOSLEDU, KOJIM SU I ZAKACENI ZA TAJ JEDAN ELEMENT (NARAVNO U SLUCAJU EVENT-A ISTOG TIPA)

        //ZAKACICU HANDLER NA JOS NEKE ELEMENTE, KAKO BI SE UPOZNAO SA bubbles PROPERTIJEM, Event
        //INSTANCE, I JOS NEKIM PROPERTIJIMA, KOJI SU KARAKTERISTICNI ZA Event INSTANCE
        //NAIME MOZDA JE DOBRO DA NAPOMENEM DA POSTOJE I RAZLICITE KLASE EVENTOVA
        //NA PRIMER MouseEvent EKSTENZUJE Event, A TAKODJE I FocusEvent EKSTENZUJE Event

        //ZAKACIO SAM HANDLERE NA DVA RAZLICITA ELEMENTA (KOJI NISU U SRODSTVU, KAD TO KAZEM MISLIM DA
        //NEMAJU ODNOS ANCESTOR/DESCENDANT IZMEDJU SEBE)

        //JEDNOM KACIM HANDLER ZA SLUCAJ EVENT-A, TIPA          'mouseenter'
        //DRUGOM KACIM HANDLER ZA SLUCAJ EVENT-A, TIPA          'mouseover'

        //TO RADIM JER ZELIM DA UPOREDIM, KOJE JE RAZLIKA IZMEDJU OVA DVA EVENTA

        //POZABAVICU SE OVIM NAKNADNO, KADA PONOVIM preventDefault METODU
        //ODNOSNO, JA KONKRETNO ZELIM DA VIDIM, ODNOSNO UPOREDIM SLEDECE METODE
        
        //      defaultPrevented        cancelable      bubbles

        //ONO STO CU SAMO URADITI JESTE KACENJE EVENT LISENERA, ZA SLUCAJEVE, POMENUTIH EVENT-OVA,
        //NA NEKIM ELEMENTIM IZ SHADOW ROOT-A, PA CU POGLEDATI STA KAKO SE TRIGGER-UJU, POMENUTI
        //EVENT-OVI, ALI NECU NISTA KOMENTARISATI

        this.querySelector('.neka_sekcija_slotted div').addEventListener('mouseenter', ev => {
            console.log('------------------------');
            console.log("ENTER");
            console.log("bubbles -->", ev.bubbles);
            console.log("cancelable -->", ev.cancelable);
            console.log(ev.composedPath());
            console.log(ev.target);
            console.log('------------------------');
        });

        this.querySelector('div[slot=canabis]').addEventListener('mouseover', ev => {
            console.log('------------------------');
            console.log("OVER");
            console.log("bubbles -->", ev.bubbles);
            console.log("cancelable -->", ev.cancelable);
            console.log(ev.composedPath());
            console.log(ev.target);
            console.log('------------------------');
        });
    }
});

const shably_light_dom = `
<some-shably-element>
    <h4 slot="ayohuasca">Ovo je AYOHUASCA</h4>
    <p slot="ayohuasca">Ona nije biljka vec napitak koji se spravlja od vise biljaka</p>
    <h2>Dodatno droziranje nije dozvoljeno</h2>
    <div slot="canabis">
        <h3 style="border: tomato solid 1px; margin: 8px;">Naslov za KANABIS</h3>
        <p style="border: tomato solid 1px; margin: 8px;">Kanabis je jednogodisnja biljka iz porodice kanabisnoblabloida, evo ti o njoj</p>
        <ol style="border: tomato solid 1px; margin: 8px;">
            <li>Halucinacije</li>
            <li>Leci sve</li>
        </ol>
    </div>
    <p slot="canabis">Nista vazno, samo neki paragraf</p>
    <p>A nije dozvoljeno iz sledecih razloga...blah..blah</p>
    <section class="neka_sekcija_slotted">
      <div style="outline: tomato ridge 4px; padding: 12px;">
        Div element
        <h1 style="border:chocolate 1px solid">Ovo je header nested u section elementu</h1>
        <p style="border:chocolate 1px solid">Ovo je paragraf nested u section elementu</p>
      </div>
    </section>
</some-shably-element>
`;

                        //BAVLJENJE SA EVENT-OVIMA, NASTAVICU TAKO STO SE PONOVO UPOZNATI SA
                        //DEFAULT PONASANJEM BROWSER-A, ODNOSNO, PONOVICU, KAKAO TO DA
                        //ZAUSTAVIM DEFAULT PONASANJE, KOJE JE BUILT IN, U SLUCAJU 
                        //TRIGGER-OVANJA ODREDJENIH WVENT-OVA, NA ODREDJENIM NATURALNIM
                        //HTML ELEMENTIM-A

//OPET CU KREIRATI JEDAN NOVI CUSTOM ELEMENT, A TO JE GALERIJA; POMENUTI NOVI ELEMENT PRAVIM, KAKO BIH
//NA NAJBOLJI NACIN PRIKAZO PRIMENU

                //preventDefault        METODE
//UZ KORISCENJE EVENT DELEGATION-A

window.customElements.define('image-galery', class extends HTMLElement {
    constructor(srcs){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        const imageNumber = srcs.length;
        const bodyNeue = document.createDocumentFragment();
        const alt = "opis slike";
        const styleElement = document.createElement('style');

        for(let src of srcs){
            let picKont = document.createElement('div');
            let anch = document.createElement('a');
            let img = document.createElement('img');
            picKont.classList.add('pic_kont');
            anch.href = src;
            img.src = src;
            img.alt = alt;
            img.setAttribute('width', '100%');
            anch.appendChild(img);
            picKont.appendChild(anch);
            bodyNeue.appendChild(picKont);
        }

        const styleText = `
            
            :host {
                display: block;
                border: pink solid 2px;
                padding: 8px;
                width: 68%;
                box-sizing: border-box;
            }
            div {
                box-sizing: border-box;
            }
            .pic_kont {
                border: tomato solid 2px;
                width: ${Math.floor(100/(imageNumber-1))}%;
                display: inline-block;
                
            }

            #pic_kont_first {
                width: 100%;
                margin-bottom: 28px;
                height: 38vw;
                overflow: hidden;
            }

            #pic_kont_first img {
                min-width: 300px;
            }
        `;
        
        styleElement.textContent = styleText;

        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(bodyNeue);

        
        const prviPicKont = shadowRoot.querySelector('.pic_kont');
        const prviImg = prviPicKont.querySelectorAll('img')[0];
        prviPicKont.id = 'pic_kont_first';
        console.log(shadowRoot.childNodes);
        
        //DEFINISAN IZBOR SLIKE ZA NAJVECI PROZOR, ALI STO JE VAZNIJE
        //SPRECENO JE DEFAULT PONASANJE BROWSERA, U SLUCAJU ANCHOR-A
        //(DAKLE, ONO STO SE NECE DOGODITI JESTE OTVARANJE NOVE STRANICE, I SKOK NA POCETAK,
        //POSTOJECE STRANICE, KADA KORISNIK KLIKNE NA ANCHOR, ODNOSNO SLIKU, KOJA JE NESTED U ANCHOR-U)

        shadowRoot.addEventListener('click', ev => {
            if(ev.target instanceof HTMLImageElement){
                ev.preventDefault();
            }

            if(ev.target !== prviImg){
                const targetSrc = ev.target.src;
                const srcMain = prviImg.src;

                ev.target.src = srcMain;
                prviImg.src = targetSrc;
            }
        });

        //OVIM SAM SPRECIO DA KADA KORISNIK TRIGGER-UJE DESNI KLIK (contextmenu), NA CELOM SHADOW ROOT-U
        //BUDE SPRECENO DEFAULT PONASANJE SAMO ZA SLUCAJ, KADA target BUDE 'img',
        //ODNOSNO TADA SE NECE OTVORITI MENI, KOJI IMA OPCIJE ZA DOWNLOAD SLIKE, ILI NJENO OTVARANJE
        //U ODVOJENO WINDOW-U

        shadowRoot.addEventListener('contextmenu', ev => {
            if(ev.target instanceof HTMLImageElement || ev.target instanceof HTMLAnchorElement){
                ev.preventDefault();
            }
        });
    }
});
const srcs = [
    './img/galery/1.jpg',
    './img/galery/2.jpg',
    './img/galery/3.jpg',
    './img/galery/4.jpg',
    './img/galery/5.jpg',
];
const Galery = window.customElements.get('image-galery');

const galery = new Galery(srcs);

//DEFINISAO SAM NESTOVANJE, MOG ELEMENT U HTML NA DRUGACIJI NACIN NEGO RANIJE

console.log(window.customElements.get('image-galery'));

const galery_kont = document.querySelector('.galery-kont');

galery_kont.appendChild(galery);


//BAVLJENJE SA preventDefault METODOM, I SA EVENT-OVIMA U ODNOSU NA DEFAULT PONASANJE BROWSER-A,
//NASTAVICU TAKO STO CU RECI DA POSTOJI MOGUCNOST DA 

                //DVA EVENTA, TEKU JEDAN U DRUGI
    //STA POD TIME MISLIM?
    
//PA NA PRIMER TAKVA SITUACIJA JE PRISUTNA U SLUCAJU TRIGGERING-A click EVENTA NA input ELEMENTU
//TADA, ONO STO SE DOGADJE JESTE DA 
                    //                  input       TAKODJE DOBIJE FOCUS, ODNOSNO DA SE NA NJEMU
                    //  TRIGGER-UJJE focus EVENT
//DAKLE, JEDAN EVENT FLOWS U DRUGI

//MEDJUTIM AKO, U SLUCAJU JEDNOG input-A, ODLUCIM DA PRIMENIM      preventDefault     NA Event INSTANCI,
//'mousedown' TIPA, TO CE SPRECITI PONASANJE BROWSER-A, DA U TOM SLUCAJU TRIGGER-UJE I DRUGU Event 
//INSTANCU, TIPA, 'focus' 

//POKAZACU TO, PUTEM PRIMERA

window.customElements.define('broken-inputs', class extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        const input3 = document.createElement('input');
        const input4 = document.createElement('input');

        const styleElement = document.createElement('style');

        input1.value = "(listening for mousedown)NOTHING PREVENTED, tab focusable";
        input3.value = "(listening for click)NOTHING PREVENTED, tab focusable";
        
        input2.setAttribute('for_mousedown', '');
        input4.setAttribute('for_click', '');

        input2.value = "(mousedown PREVENTED) |NO FOCUS after MOUSEDOWN|, tab focusable";
        input4.value = "(click PREVENTED) |YES FOCUS after CLICK|, tab focusable";

        const styleContent = `
            :host {
                display: block;
                width: 68%;
                border: pink solid 2px;
            }
        
            input {
                display: block;
                width: 78%;
                margin: 8px;
                font-size: 1.2rem;
                line-height: 1.2;
            }
        `;
        
        styleElement.textContent = styleContent;

        shadowRoot.appendChild(styleElement); 
        shadowRoot.appendChild(input1); 
        shadowRoot.appendChild(input2); 
        shadowRoot.appendChild(input3); 
        shadowRoot.appendChild(input4);
    }

    connectedCallback(){

        //PRIMENIO SAM preventDefault(), U SLUCAJU mousedown, ALI I U SLUCAJU click
        
        //OVO SAM URADIO KAKO BI SE UVERIO, DA AKO SPECIM DEFAULT PONSANJE U SLUCAJU click-A
        //TO NECE SPRECITI TRIGGEROVANJE focus-A

        //ALI SPRECAVANJA DEFAULT-A, U SLUCAJU mousedown-A, HOCE SPRECITI TRIGGER-OVANJE focus-A

        //A NE SMEM ZABORAVITI DA JE SVIM input-IMA , tabindex PODESEN NA 0, STO IH POSTAVLJA U 
        //TAJ ORDER FOKUSIRANJA, PRITISKOM NA Tab DUGME TASTATURE 

        this.shadowRoot.addEventListener('mousedown', ev => {
            if(ev.target instanceof HTMLInputElement && ev.target.hasAttribute('for_mousedown')){
                ev.preventDefault();    //OVIM SE HOCE SPRECITI TRIGGER-OVANJE FOCUSA
            }
        });

        this.shadowRoot.addEventListener('click', ev =>{
            if(ev.target instanceof HTMLInputElement && ev.target.hasAttribute('for_click')){
                ev.preventDefault();        //OVIM SE DAKLE NECE SPRECITI TRIGGEROVANJE FOCUSA
            }
        });
        //FOCUS DOES NOT PROPAGATE SO YOU CAN'T USE EVENT DELEGATION (ON shadowRoot)
        // (DAKLE DIREKTNO MORAM ZAKACITI HANDLER ZA INPUT U SLUCAJU FOCUS-A)
        this.shadowRoot.querySelector('[for_mousedown]').addEventListener('focus', function(ev){        //NISAM KORISTIO ARROW, DA BI this REFERENCIRALO input,  A NE CUSTOM ELEMENT
            this.value = "GOT FOCUS";
        });
        
    }
});

const broken_inputs_ELEMENT_light_dom = `
    <broken-inputs></broken-inputs>
`;


//ONO STO SE POSTIZE preventDefault METODOM, MOZE SE POSTICI, I AKO SE HANDLER-U, DEFINISE

//            return false;

//ALI TAKAV NACIN NIJE PREPORUCIV DA SE KORISTI, ZAJEDNO SA addEventListener METODOM
//MOZE SE KORISTITI PRILIKOM DEFINISANJA, ODNOSNO KACENJA on HANDLERA (U HTML-U), INLINE, ILI on HANDLERA, U
//JAVASCRIPT-U 


//SADA CU SE POZABAVITI PROPERTIJEM         event.defaultPrevented    (BOOLEAN)
//DAKLE, AKO JE SPRECENO DEFAULT PONASANJE BROWSERA, OVAJ PROPERTI VRACA true

//TO BI UPRAVO ZNACILO DA BI PROPAGATION-OM, ODNOSNO BUBBLING-OM, TAJ EVENT (SA PREVENTED DEFAULT BEHAVIOR-OM)
// STIGAO DO DRUGOG ELEMENTA (ELEMENTI KOJI IMAJU ODNOS ANCESTOR/DESCENDANT), I NOSIO BI TU INFORMACIJU
//O POMENTOM PREVENT-OVANJU

window.customElements.define('button-modals', class extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        const buttonElement = document.createElement('button');
        const styleElement = document.createElement('style');

        buttonElement.innerText = "open context";

        const styleText = `
            :host {
                border: pink solid 2px;
                display: inline-block;
                padding: 4px;
            }

            button {
                background-color: #67f19c85;
                text-align: center;
                font-size: 2rem;
            }
        `;

        styleElement.textContent = styleText;

        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(buttonElement);
    }

    connectedCallback(){
        
        this.shadowRoot.querySelector('button').addEventListener('contextmenu', function(ev){
            ev.preventDefault();
            alert("context menu on button prevented");
            //ALI NISAM ZAUSTAVIO PROPAGATION (BUBBLING)
            //JER ZELIM DA SE OVAJ EVENT RAZMNOZI DO DOKUMENTA
        });

        document.addEventListener('contextmenu', function(ev){
            if(ev.defaultPrevented){
                console.log('prevented event bubbled to document');
                return;           //AKO JE DEAFULT PREVENTED, NEKA SE FUNKCIJA RETURN-UJE
            }

            //DAKLE SLEDECE CE SE IZVRSITI, KADA DO document, NIJE BUBBLED UP EVENT, KOJEM JE PREVENTED
            //DEFAULT (ODNOSNO EVENT KOJI SE PROPAGIRA, OD BUTTON-A PA OVAMO)
            
            // const openContextMenu = confirm("Are you sure you want to open context menu?");

            // !openContextMenu?ev.preventDefault():null;   //OVDE SAM UPOTREBIO TERNARY, IAKO JE LOSA PRAKSA AKO TERNARY NIJE ASSGNMENT
            //DAKLE, AKO KORISNIK U CONFIR DIALOGU PRITISNE: NE; CONTEXT MENU NECE BITI OTVOREN 
        });
    }
});

const button_modals_light_dom = `
<button-modals></button-modals>
`;




//PRE NEGO STO NASTAVIM BAVLJENJE SA KONKRETNIM EVENT-OVIMA, ODNOSNO PRE NEGO STO POCNEM DA SE BAVIM
//SVAKIM, OD EVENT-OVA PO NA OSOB I PRE NEGO STO SE POZABAVIM CUSTOM EVENT-OVIMA
//KREIRACU NEKOLIKO PRIMERA, U KOJIM UCESTVUJE EVENT DELEGATION

window.customElements.define('color-table', class extends HTMLElement {
    constructor(numberOfTableDatas){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        const table = document.createElement('table');
        const styleElement = document.createElement('style');
        const caption = document.createElement('caption');

        let styleText = `
            :host {
                display: block;
                border: pink solid 4px;
                padding: 18px;
            }
            .data_table {
                max-width: 178px;
                height: 98px;
                padding: 18px;
            }
            h4, p {
                text-align: center;
                border: pink solid 2px;
            }
            h4 {
                color: orange;
            }
            p {
                font-family: cursive;
                color: olive;
            }
        `;
        //ZA ZADAVANJE RAZLICITIH BOJA KORISTICU hls FUNKCIJU, CSS-A

        let h = 359;
        let s = 100;
        let l = 100;
        let realH = 28;
        let realS = 18;
        let realL = 8;
        let tableRow = document.createElement('tr');

        for(let i = 0; i < numberOfTableDatas; i++){
            let singleTableDataStyle = `
                .color_data-table_${i} {
                    background-color: hsl(${realH < h ? realH+=8:realH = 28}, ${realS < s ? realS+=8:realS = 18}%, ${realL < l ? realL+=8:realL = 8}%);
                }
            `;
            styleText = styleText + singleTableDataStyle;
            let tableData = document.createElement('td');
            let strongText = "Some kind";
            let italicText = "some explanation";

            let header = document.createElement('h4');
            let paragraf = document.createElement('p');
            let strong = document.createElement('strong');
            let italic = document.createElement('i');
            
            strong.innerText = strongText;
            italic.innerText = italicText;

            header.appendChild(strong);
            paragraf.appendChild(italic);

            tableData.classList.add(`color_data-table_${i}`);
            tableData.classList.add('data_table');
            tableData.appendChild(header);
            tableData.appendChild(paragraf);
            
            if(tableRow.childNodes.length === 4){
                table.appendChild(tableRow);
                tableRow = document.createElement('tr');
            }

            tableRow.appendChild(tableData);
        }

        if(tableRow.childNodes.length){
            table.appendChild(tableRow);
        }

        styleText = styleText + 
        `
            .pick_cell {
                background-color: tomato;
            }
        `;
        caption.textContent = "Neka tabela boja";
        table.appendChild(caption);
        styleElement.textContent = styleText;
        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(table);
        //console.log(shadowRoot.querySelector('td').nodeName);
    }

    connectedCallback(){
        let currentTablePicked; //OVO SLUZI KAO 'IZVOR ISTINE' (ODREDNICA, KOJU SAM PRIHVATIO IZ ReactJS-A)
        
        /*      SLEDECI CODE SAM COMMENT OUT, ZATO STO JE NAKON NJE PONUDJENO EFIKASNIJE RESENJE
                ALI OVO STO SAM NAPISAO KAO OBJASNJENJE U OBIMU HANDLERA, JESTE VAZNO
        
        this.shadowRoot.addEventListener('click', function(ev){
            //POSTO ZELIM DA SE KLIKOM NA td ILI NA NJEGOVE NESTED ELEMENT, PROMENI BACKGROUND COLOR
            //NA td ELEMENTU; MOGU KORISTITI, JEDNU METODU, SA KOJOM SAM SE UPOZNAO U jQuery-JU
            //A KOJU SU, PREDPOSTAVLJAM UVELI I U KLASICNI JAVASCRIPT
            //REC JE O closest METODI (DODAJE JOJ SE STRING SELEKTORA)(KAO KOD querySelector METODE)

            //ELEMENT, KOJI SE BIRA POMENUTOM METODOM, JESTE ELEMENT KOJI JE CLOSEST ANCESTOR, ODNOSNO
            //NAJBLIZI ANCESTOR ELEMENTA, NA KOJEM SE METODA PRIMENJUJE, I TO MORA DA BUDE ANCESTOR
            //KOJEM ODGOVARA CSS SELEKTOR, KOJI SE DODAJE KAO ARGUMENT, POMENUTOJ METODI

            //AKO, POMENUTI SELEKTOR ODGOVARA, SAMAMO ELEMENT NA KOJEM SE METODA PRIMENJUJE, POVRATNA
            //VREDNOST closest METODE, BICE TAJ ELEMENT NA KOJEM SE METODA PRIMENJUJE

            //DAKLE, ZELIM KADA KORISNIK KLIKNE, I NA NESTED ELEMENT-E, td-A, DA SE td-DODA NOVI 
            //BACKGROUND COLOR, A DA SE TAKODJE, DIREKTNIM KLIKOM NA, SAM td ELEMENT, ISTOM DODELI
            //NOVI BACKGROUND COLOR 

            if(ev.target.closest('.data_table') && currentTablePicked){
                currentTablePicked.classList.remove('pick_cell');
            }
            if(ev.target.closest('.data_table')){
                ev.target.closest('.data_table').classList.add('pick_cell');
                currentTablePicked = ev.target.closest('.data_table');
            }
        });

        */


        console.log(this.shadowRoot.querySelector('td').__proto__);

        //MEDJUTIM, POSTOJI JOS JEDNA METODA, SA KOJOM JE DOBRO DA SE UPOZNAM
        //TO JE NAIME METODA, KOJOM SE PROVERAVA, A LI DVA ELEMENTA, IMAJU ODNOS ANCESTOR/DESCENDANT
        //REC JE METODI         contains
        //I JASNO JE DA DA BI POVRATNA VREDNOST OVE METODE, BILA BOLLEAN true, node ELEMENT, KOJI SE
        //DODAJE, KAO ARGUMENT, PRIMENE METODE, MORA BITI DESCENDANT, node-A, NAD KOJIM SE METODA
        //PRIMENJUJE

        this.shadowRoot.addEventListener('click', function(ev){

            const tdElement  = ev.target.closest('.data_table');        //AKO NEMA ELEMENT SA DATIM
                                                                        //SELEKTOROM
                                                                        //POVRATNA VREDNOST JE  null

            //TREBALO BI DA USVOJIM, SLEDECI PRINICIP PRILIKOM KACENJA HANDLER-A, ODNOSNO PRINCIP, KOJI
            //PRIMENJUJEM PRE EVENT DELEGATION-A, ODNOSNO PRINCIP PRI KOJEM, PRVO DEFINISE, KADA BI
            //FUNKCIJA TREBALA DA SE return-UJE KAKO BI MOJ CODE BIO EFIKASNIJI

            //AKO SHADOW ROOT NE SADRZI td ELEMENT TREBALO BI DA SE return-UJE FUNKCIJA (PRVI USLOV)
            /* 
         
            if(!this.contains(tdElement)){     // (this JE U OVOM SLUCAJU ELEMENT NAD KOJIM SE
                return;                        //   addEventListener METODA PRIMENJUJE, ZATO STO HANDLER NIJE ARROW FUNCTION)
            }  
            
            //OVAJ CODE STO SAM PRIKAZO SAM VIDEO U TUTORIJALU, ALI MI IZGLEDA SUVISNO
            */
            //MEDJUTIM, MENI PREDHODNI DEO CODE-A IZGLEDA SUVISAN JER SASVIM JE JASNO DA ev.target
            //U OVOM SLUCAJU MORA BITI ILI NEKI DESCENDANT shadowRoot-A
            //JA BIH MOZDA TREBAO OVAKO DEFINISATI USLOVNU IZJAVU
            /*

            if(!tdElement){                         (OVAJ USLOV JE MOZDA TREBAO DA BUDE PRVI
                return;                             JER AKO JE tdElement, USTVARI null, FUNKCIJA JE
            }                                       TREBALA DA SE return-UJE)

            */

            //IPAK CU ISKOMBINOVATI, DVA USLOVA IZ PREDHODNE DVE COMMENTED OUT USLOVNE IZJAVE
            //JEDAN JE DAKLE IZ TUTORIJALA, A DRUGI DODAJEM JA 'NA SVOJU RUKU'

            //MEDJUTIM, KADA POGLEDAM CODE, IPAK IMA VISE SMISLA DA SE DEFINISU DVE USLOVNE IZJAVE
            //I DA SE FUNKCIJA return-UJE U SLUCAJU ISPUNJENJA JEDNOG USLOVA
            //ZATIM DA SE return-UJE I U SLUCAJU ISPUNJENJA USLOVA, DRUGE USLOVNE IZJAVE

            //NA TAJ NACIN NE BIH SE MORAO PROCENJIVATI DRUGI USLOV
            //JER BI FUNKCIJA VEC return-OVALA
            //I ZA NIJANSU BI BILA EFIKASNIJA

            //DAKLE OSTAVLJAM JEDNU USLOVNU IZJAVU, U CILJU USTEDE VREMENA, ALI CU OPET POMENUTI DA 
            //JE BOLJE DA IMAM DVE ODVOJENE USLOVNE IZJAVE (JEDINO JE DILEMA, USLOVNA IZJAVA SA KOJIM
            //UALOVOM BI ISLA PRE)

            if(!this.contains(tdElement) || !tdElement){
                console.log(2);    //UMESTO this (shadowRoot-A)
                return;                 // OVDE JE MOGAO DA SE           
            }                      //REFERENCIRA table 
            
            if(currentTablePicked &&           //OVO SVE ODAVDE, PA DO KRAJA OBIMA HANDLERA JE MOGLO DA 
                currentTablePicked instanceof HTMLTableCellElement &&    //SE DEFINISE KAO ODVOJENA 
                currentTablePicked.classList.contains('pick_cell')       //METODA, A OVDE DA SE POZOVE         
            ){                                                      //U USLOVU SAM PRIMENIO 
                currentTablePicked.classList.remove('pick_cell');   //classList.contains
            }                                                       //A I instanceof OPERATOR
                                                                    //MOZDA SUVISNO
            currentTablePicked = tdElement;
            tdElement.classList.add('pick_cell');

            //DAKLE NESTO SAM VIDEO IZ POMENUTOG CLANKA, A NEKE STVARI SAM I JA DODAO, I NECU DODATNO
            //KOMENTARISATI, OVAJ PRIMER
        });

    }
});

const nestingRoot = document.querySelector('.table-container');

const ColorTable = window.customElements.get('color-table');

const colorTableElement = new ColorTable(18);

nestingRoot.appendChild(colorTableElement);


//NASTAVLJAM BAVLJENJE SA DELEGATIONOM TAKO STO CU SE POZABAVITI NECIM STO SE ZOVE OPTIMIZACIJA
//HANDLING-A

//ODNOSNO ONO STO ZELIM DA DEFINISEM JESTE KORISCENJE ISTOG HANDLER-A ZA OBAVLJANJE VISE AKCIJA

//SADA NECU DEFINISATI CUSTOM ELEMENT
//ALI CU KORISTITI ES6 KLASE

//OVAKO CE IZGLEDATI HTML

const htmlMenija = `
<div id="neki_menu">
    <button data-akcija="save">Save</button>
    <button data-akcija="load">Load</button>
    <button data-akcija="search">Search</button>
</div>
`;

//U OVOM PRIMERU, POMAZE data ATRIBUT

//POTRBNO JE SVE METODE DEFINISATI NA NACIN DA BUDU METODE JEDNE ES6 KLASE
//KONSTRUKTOR KLASE TREBA DA PARAMETAR, KOJI SE ODNOSI NA JEDAN OD OVA TRI MENIJA

//U OVOM PRIMERU CU KORISTITI, ATRIBUT, SA KOJIM SAM SE RANIJE BAVIO, A TO JE       data-
//U OVOM PRIMERU CU DAKLE KORISTITI dataset PROPERTI KOJI MOZE DA IMA SVAKI ELEMENT, I KOJIM SE PRISTUPA
//UPRAVO DRUGOM DELU data ATRIBUTA, ODNOSNO ONOM DELU NAKON CRTICE 

//ZNACI PRINCIP JE DA RAZLICITI ELEMENTI IMAJU ISTIT data-      ATRIBUT, ALI DA JE VREDNOST TOG
//ATRIBUTA, ZA SVAKI ELEMENT RAZLICITA

class Meni {
    constructor(menuElement){
        
        this._menuElement = menuElement;        //OVO JE SUVISNO, ALI U CLANKU JE DEFINISANO

        this.onClickHandler = this.onClickHandler.bind(this);

        menuElement.addEventListener('click', this.onClickHandler);
        
        //JOS JEDNA BITNA STVAR, A TO JE DA NISAM KORISTIO addEventListener METODU,
        // MORAO BIH NAPISATI OVAKO, UZ DODELOM onclick-U
        
       //        menuElement.onclick = this.onClickHandler.bind(this);
    }

    save(){
        alert('saving!');
    }

    load(){
        alert('loading!');
    }

    search(){
        alert('searching!');
    }

    //CILJ JE DA IMAM JEDAN HANDLER, ALI CU U NJEMU KORISTITI EVENT DELEGATION, KOJA ZAVISI OD 
    //data ATRIBUTA, ODREDJENOG DUGMETA

    onClickHandler(ev){
       // const buttonElement = ev.target.closest('button');  //NISAM MORAO IMATI DVE VARIJABLE, JER
                                                            //SVE JE MOGLO BITI JEDNA
                                                            //ALI U CILJU BOLJEG PRIKAZA NEKA STOJE
                                                            //DVE VARIJABLE OVDE, COMMENTED OUT
        // const dataValue = buttonElement.dataset['akcija'];
        //BOLE JE OVAKO

        const akcija = ev.target.dataset['akcija'];     //AKO NE POSTOJI data-akcija ATRIBUT
                                                        //POVRATNA VREDNOST JE null         

        //JEDNA OD METODA, OVE KLASE JE IZABRANA NA OSNOVU data-   ATRIBUTA
        //TU METODU CU POZVATI OVAKO
        if(akcija){    
            this[akcija]();         //akcija JESTE, SLEDECI MOGUCI STRINGOVI      'save'     'load'   
        }                                                                 //            'search'
    }

}

const meni = new Meni(document.querySelector('#neki_menu'));
//DAKLE NE ZABORAVI         dataset
//A ONO ZASTO JE PREDHODNI PRIMER, VEOMA VAZAN JE JESTE STO SAM MOGA DODATI, KOLIKO HOCU BUTTON-A
//U MENU, I DODATI NOVU METODU, CIJE CE IME BITI ISTO, KAO I DRUGI DEO IMENA (NAKON CRTICE), data-
//ATRIBUTA



document.querySelector('#neki_menu').innerHTML = 
    document.querySelector('#neki_menu').innerHTML + 
    '<button data-akcija="kibla">Isprazni kiblu!</button>';

meni.__proto__.kibla = function(){
    confirm('Isprazni, kiblu?');
};


//SADA CU SE POZABAVITI NECIM STO SE ZOVE           'BEHAVIOR'      PATTERN
                                        //          'PONASANJE'     OBRAZAC

const html_primera_sa_inputima_dugmadima = `
    <div id="dugm_kont">
        BROJAC 1: <input type="button" value="1" data-counter>
        BROJAC 2: <input type="button" value="2" data-counter>
    </div>
`;

document.querySelector('#dugm_kont').addEventListener('click', function(ev){
    let target = ev.target;
    
    // DAKLE KADA JE U PITANJU BOOLEAN ATRIBUT, KAKAV JE OVAJ data-counter
    //AKO GA IMA ELEMENT, VREDNOST ATRIBUTA JESTE PRAZAN STRING

    //DAKLE AKO BUDEM VREDNOSCU, ISTOG ATRIBUTA PRISTUPAO I POMOCU      dataset-A    I POMOCU
    //      getAttribute    METODE, VREDNOST, KOJA CE BITI RETURNED JESTE PRAZAN STRING

    //TO CU I DA PROVERIM

    console.log(    target.getAttribute('data-counter')    );   //-->   ""
    console.log(    target.dataset['counter']              );   //-->   ""

    //ALI POVRATNA VREDNOST, getAttribute METODE I VREDNOST, KOJOJ PRITUPAM U dataset-U CE SE
    //RAZLIKOVATI, U SLUCAJU KADA ELEMENT, NEMA ATRIBUT, KOJI POTRAZUJEM

    console.log(    target.getAttribute('data-brojac')      );  //-->   null
    console.log(    target.dataset['brojac']                );  //-->   undefined

    //KAO STO VIDIM, MOZDA JE DOBRO DA PAZIM, KAKO KORISTIM POVRATNE POMENUTE VREDNOSTI 

    for(data in target.dataset){
        console.log("~~~~~~", data);       //OVO JE SAMO DOKAZ DA JE dataset ZAISTA ITERABLE OBJEKAT
    }

    //DAKLE SVE OVO GORE JE BILO SUVISNO ZA OVU FUNKCIJU,
    //ALI SAM PRISTUPAO NEKIM VREDNOSTIMA, KAKO BI SE PODSETIO
    //NA NEKE STVARI SA KOJIMA SAM SE, DAVNO UPOZNAO

    //OVAJ SLEDECI USLOV SE, U PRIMERU 
    //IZ CLANKA, SAMO SASTOJAO
    //IZ DELA SA UPOTREBOM          dataset    ITERABLE OBJEKTA

    if(target && target.value && target.dataset['counter'] !== undefined){
        console.log(    typeof target.value    );       //-->  "string"
        //KAO STO VIDIM IZ ONOGA STO SAM STAMPAO U KONZOLI VREDNOST value ATRIBUTA JESTE 'string' TIPA

        //ONO STO MI PADA NA PAMET JESTE UPOTREBA       parseInt

        // JER  OVO NE BI BILO MOGUCE     target.value = target.value + 1;    JER BI SE OVIM CONCATENATE
                                                                                //-OVALA DVA STINGA   

        //MEDJUTIM, POSTOJE CAKE U JAVASCRIPT-U, ZA KOJE SAM TEK SAZNAO
        //NAIME, IAKO value JESTE STRING, ONO STO JE, IPAK IZMEDJU ZNAKOVA NAVODA JESTE VALIDNA NUMBER
        //VREDNOST, I AKO SE TAKAVA VREDNOST KORISTI, KAO OPERAND INKREMENTA, ONA CE BITI PRETVORENA
        //U NUMBER I SABRANA SA JEDINICOM, ODNOSNO KALKULACIJA BI BILA MOGUCA
        
        //              target.value++;             OVO SAM COMMENTED OUT, SAMO ZATO STO POSTOJI JOS
                                                    //MOGUCNOSTI
    
        //A POSTOJE I NESTO STO SE ZOVU         UNARY OPERATORS
        //KONKRETNO JE REC O        UNARY +     I       UNARY -
        
        target.value = +target.value + 1;
        //SA UNARY OPERATORIMA CU SE POSEBNO POZABAVITI SA SLEDECE STRANICE
        //  https://javascript.info/operators
        //
        //A POSEBNO CU PRECI I SLEDECU WEB STRANICU
        //    https://javascript.info/number               
    }
});

//DAKLE U PREDHODNOM PRIMERU, BUTTONIMA (INPUTIMA) JE ZADAT, POSEBAN 'BEHAVIOUR' DA BUDU COUNERI

//SADA CU SE POZABAVITI, NOVIM PRIMEROM, A TO JE TOGGLER

const html_for_toggler = `
    <div class="kontish">
        <button data-toggle-id="subscribe-mail">Pokazi formular za subskripciju</button>
        <form id="subscribe-mail" hidden>
            <input type="mail">
        </form>
    </div>
`;

document.querySelector('.kontish').addEventListener('click', function(ev){
    const id = ev.target.dataset['toggleId'];      //NE ZABORAVI DA AKO SE data ATRIBUT SASTOJI OD 
                                                //VISE CRTICA, dataset-OV PROPERI CE BITI cammelCase
                                            //ODNOSNO PRISUTAN JE OVAKAV ATRIBUT    data-toggle-id
                                            //A PROPERTI U dtaset OBJEKTU CE BITI       toggleId
    console.log(id);                        
    
    if(!id){        //!undefined OCEKUJEM OVAKVU VREDNSOT AKO target NEMA POMENUTI data ATRIBUT
        return;                 //RETURNUJEM, AKO target ELEMENT NEMA TAKAV ATRIBUT
    }

   const form = document.querySelector(`#${id}`); //MOGAO SAM I getElementById
   form.hidden = !form.hidden;   //BOOLEAN ATRIBUT (SVAKIM NOVIM KLIKOM DODELJUJE MU SE ILI BOOLEAN 
   //                                                                               true ILI false)
})

//JOS JEDAN PRIMER SA EVENT DELEGATION-OM
const mammals_and_fishes = `
<div class="tree_kont" style="border:darkorange solid 2px">
    <ul>
      <li>
        <h4>Zivotinje</h4>
        <ul>
          <li>
            <h4>Sisari</h4>
            <ul>
              <li>Krave</li>
              <li>Magarci</li>
              <li>Psi</li>
              <li>Tigrovi</li>
            </ul>
          </li>
          <li>
            <h4>Druge</h4>
            <ul>
              <li>Dazdevnjaci</li>
              <li>Ptice</li>
              <li>Zelembaci</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <h4>Ribe</h4>
        <ul>
          <li>
            <h4>Akvarijum</h4>
            <ul>
              <li>Andjeoska ribica</li>
              <li>Zlatna ribica</li>
            </ul>
          </li>
          <li>
            <h4>More</h4>
            <ul>
              <li>Morska pastrmka</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
`;

document.querySelector('.tree_kont').addEventListener('click', ev => {
    if(ev.target.nodeName !== 'H4'){
        return;
    }

    const ul =  ev.target.closest('li').querySelector('ul');
    const ulDisplay = window.getComputedStyle(ul).display;
    let displayNeu = ulDisplay === 'block'?'none':'block';
    ul.style.display = displayNeu;
});


//GORNJI HANDLER SAM TREBAO DA ZAKACIM NA document (TAKO JE BILO U CLANKU)
//A ONO STO JE BITNO JESTE DA SE NIKAD NE KACI on EVENT HANDLER ZA document, ODNOSNO DA SE FUNKCIJA NE 
//DODELJUJE
// on EVENT HANDLER-U, JER AKO SLEDECI PUT BUDEM ZELEO DA ZAKACIM HANDLER, MOZE DOCI DO OVERRIDINGA
// ODNOSNO POJAVE KONFLIKATA

//ZAPAMTI DA SVI ELEMENTI NISU ELEMENTI KOJI SE RAZMNOZAVAJU (PROPAGATE), ODNOSNO BUBBLE UP-UJU,
// KAO STO JE NA PRIMER focus
//I ZA TAKVE EVENTOVE, DEFINISANJE EVENT DELEGATION-A, NEMA NIKAKVOG EFEKTA


//URADICU OPET ISTI PRIMER U CILJU PROSIRENJA ZNANJA U POGLEDU MANIPULACIJE DOM-OM, ALI I ZATO STO JE
//U CLANKU KOJI CITAM, OVAJ PRIMER, NESTO DRUGACIJE ODRADJEN

//ONO STO JE NEPOVOLJNO U GORNJEM PRIMERU JESTE STO JE h4 BLOK ELEMENT, 
//A TO JE PREVISE PROSTORA ZA KLIK (ODNONO KLIK JE MOGUC NA PROSTORU h4 ELEMENTA, GDE NEMA KLIKA)

//TO SAM POPRAVIO, TAKO STO SAM GA UCINIO inline-block ELEMENTOM

//OVAJ PRIMER FUNKCUONISE ALI U CLANKU KOJI CITAM, OVAJ PRIMER JE TAKAV DA SE U HTML-U NIJE NALAZIO
//h4 ELEMENT, VEC SAMO TEKST NESTED U UNORDERED LISTI, A NAKON TEKSTA U UNORDERED LISTI SU JESTE
//SLEDECA UNORDERED LISTA, KAO SIBLING, POMENUTOG TEKSTA

//ONO STO JE U PRIMERU URADJENO, I TO JAVASCRIPT-OM (PREDPOSTAVLJAM U CILJU VEZBE) JESTE PREPEND-OVANJE
//(NESTOVANJE NA POCETAK), span TAGOVA, UNUTAR SVAKOG list ITEM-A, I NAKON TOGA OTKACIVANJE Text node-a
//KOJI JE PRIPADO LIST ITEM-U DIREKTNO, I NJEGOVO KACENJE U POMENUTI span TAG, KOJI JE POSTAO CHILD
//ELEMENT, list item-A

//OPET CU DEFINISATI HTML

const html_drvo = `
<div class="kont_za_drvo">
    <ul>
        <li>
            Zivotinje
            <ul>
                <li>
                    Sisari
                    <ul>
                        <li>Krave</li>
                        <li>Magarci</li>
                        <li>Psi</li>
                        <li>Tigrovi</li>
                    </ul>
                </li>
                <li>
                    Druge
                    <ul>
                        <li>Dazdevnjaci</li>
                        <li>Ptice</li>
                        <li>Zelembaci</li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            Ribe
            <ul>
                <li>
                    Akvarijum
                    <ul>
                        <li>Andjeoska ribica</li>
                        <li>Zlatna ribica</li>
                    </ul>
                </li>
                <li>
                    More
                    <ul>
                        <li>Morska pastrmka</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</div>
`;

//KREIRACU FUNKCIJU U CIJEM OBIMU CU DEFINISATI, POMENUTU DODAVANJE span-OVA, MOM HTML-U

const addSpansToDrvo = function(){
    for(listAjtem of document.querySelectorAll('.kont_za_drvo li')){
        //OVAJ CODE NARAVNO TREBALO JE REFAKTORISATI, ALI OSTAVICU GA OVAKO DA BI SE VIDELO, KAKVE
        //VREDNOSTI KORISTIM, I KAKVE METODE I PROPERTIJE KORISTIM, A IMENA VARIJABLI SU SUGESTIVNA
        
        if(listAjtem.children.length){    //OVU USLOVNU IZJAVU SAM JA DODAO (DAKLE, SPANOVI SE NECE 
                                          //NESTOVATI U ELEMENTIMA U KOJIMA DECA JESU NAJDUBLJE NESTOVANA,
                                          // DAKLE AKO NEMAJU CHILD-A, ILI AKO SU TEXT NODE-OVI) 
            let spanElement = document.createElement('span');
            listAjtem.prepend(spanElement);
            let textNode = spanElement.nextSibling;     //nextSibling REFERENCIRA NAREDNI TEXT NODE SIBLING
            spanElement.append(textNode);               //A POSTOJI PROPERTI nextElementSibling
        }                                            //KOJA RETURNUJE SAMO ELEMENT NODE (NE TEXT NODE)
        //POSTOJE I METODE KAO STO SU 
        //  insertAdjacentElement , I appendChild, ALI U CLANKU SU KORISCENE append I prepend METODE
        //ZA KOJE, OPET PONAVLJAM, ODNOSNO PREDPOSTAVLJAM DA SU PREUZETE IZ jQuery-JA
        //POSTOJI I METODA insertAdjacentHTML (SAMO UZGRED, SPOMINJEM)
    }
};

addSpansToDrvo();

//POSTO SVAKI TEXT NODE, PREDHODNO NESTED (DIREKTNO U HTML) U LIST ITEM-U, SADA JESTE, UZ POMOC
//JAVASCRIPT-A, NESTED U SPAN TAGU, MOGU SE POZABAVITI DODAVANJEM FUNKCIONALNOSTI, KOJOM SE POSTIZE
//DA KLIKOM NA span, NESTANE, unordered list-A, KOJA JE NJEGOV SIBLING

document.querySelector('.kont_za_drvo').addEventListener('click', function(ev){
    const target = ev.target;

    if(target.nodeName !== 'SPAN' || !target.nextElementSibling){ //BOLJE BI BIL ODA SAM IMAO DVE USLOVNE IZJAVE
        //UMESTO        nodeName        MOGLO JE I      tagName
        
        return;                                                             
    }
    //UMESTO KORISCENJA nextElementSibling-A, MOGAO SAM UPOTREBITI I querySelector
    //U PROSLOM PRIMERU SAM KORISTIO display PROPERTI STILOVA, A SADA CU KORISTITI hidden 
    //BOOLEAN ATRIBUT

    ev.target.nextElementSibling.hidden = !ev.target.nextElementSibling.hidden;

});

//BAVLJENJE EVENT DELEGATION-OM CU NASTAVITI, KREIRANJEM, JOS JEDNOG NOVOG PRIMERA, KOJI JE URADJEN U
//CLANKU, ALI POSTO U PRIMERU VIDIM PRILIKU, KOJOM SE MOGU PODSETITI ALGORITAMA (KONKRETNO QUICK SORT-A)
//A I VIDIM DA JE DOBRO DA KREIRAM, JEDAN NOVI CUSTOM ELEMENT

//POCECU S DEFINISANJEM I REGISTROVANJEM, NOVOG CUSTOM ELEMENTA

window.customElements.define('fancy-table', class extends HTMLElement {
    constructor(...imenaIgodine){
        super();
        
        const shadowRoot = this.attachShadow({mode: 'open'});

        const duzinaArgumentNiza = imenaIgodine.length;

        const ageNameCharCodeArray = new Array(0);

        for(let i = 0; i < duzinaArgumentNiza; i++){
            if(!(i % 2) || i === 0){
                ageNameCharCodeArray.push([
                    imenaIgodine[i + 1],
                    imenaIgodine[i],
                    imenaIgodine[i].charCodeAt(0)
                ]);
            }
            if(!(imenaIgodine[i + 2])){
                break;
            }
        }

        const tableElement = document.createElement('table');
        const tableHead = document.createElement('thead');
        const trForHead = document.createElement('tr');
        const thHeadIme = document.createElement('th');
        const thHeadBroj = document.createElement('th');
        const tableBody = document.createElement('tbody');
        const styleElement = document.createElement('style');
        const styleText = `
            tr:nth-child(even) {
                background-color: #f5c9c5;
            }

            table {
                border: tomato solid 2px;
                border-collapse: collapse;
                text-align: center;
            }

            td, th {
                border: olive solid 1px;
                line-height: 1.6;
            }

            th:hover {
                cursor: pointer;
                opacity: 0.8;
            }

            th .picked {
                border-bottom: 
            }
        `;

        thHeadIme.textContent = 'Ime';
        thHeadBroj.textContent = 'Broj godina';

        thHeadIme.dataset['type'] = "string";       //OPET VEZBAM dataset
        thHeadBroj.dataset.type = "number";

        trForHead.appendChild(thHeadBroj);
        trForHead.appendChild(thHeadIme);
        tableHead.appendChild(trForHead);
        
        tableElement.appendChild(tableHead);

        this._tableBody = tableBody;

        for(let celija of ageNameCharCodeArray){
            let currentRow = document.createElement('tr');
            let dataName = document.createElement('td');
            let dataAge = document.createElement('td');
            let textNodeAge = document.createTextNode(`${celija[0]}`);
            let textNodeName = document.createTextNode(celija[1]);
            dataName.appendChild(textNodeName);
            dataAge.appendChild(textNodeAge);
            currentRow.appendChild(dataAge);
            currentRow.appendChild(dataName);
            this._tableBody.appendChild(currentRow);
        }

        this._sortedByAgeBody = null;
        this._sortedByNameBody = null;

        this._ageNameCharCodeArray = ageNameCharCodeArray;

        styleElement.textContent = styleText;
        tableElement.appendChild(this._tableBody);
        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(tableElement);
        
        this.quickSortSet = this.quickSortSet.bind(this);

        //PROVERA CUSTOM QUICK SORT-A
        /*console.log(ageNameCharCodeArray);
        console.log(this.quickSortSet(ageNameCharCodeArray));
        console.log(this.quickSortSet(ageNameCharCodeArray, true));*/

        console.log(this._tableBody);
        console.log(this._sortedByAgeBody);
        console.log(this._sortedByNameBody);

        this._state = {lastClickedType: null};
    }

    connectedCallback(){

        this.shadowRoot.addEventListener('click', ev => {
            const currentTableHeader = ev.target.closest('th');
            const typeOfPreviousHeader = this._state.lastClickedType;

            if(!currentTableHeader){
                return;
            }

            const type = currentTableHeader.dataset['type'];

            if(type === typeOfPreviousHeader){
                return;
            }

            this._state.lastClickedType = type;

            const tableElement = currentTableHeader.closest('table');

            if(this._sortedByAgeBody && this._sortedByNameBody){
                
                let sortedBody = type === 'number'
                ?
                this._sortedByAgeBody
                :
                this._sortedByNameBody;

                let bodyForDetach = sortedBody === this._sortedByAgeBody
                ?
                this._sortedByNameBody
                :
                this._sortedByAgeBody;

                if(bodyForDetach !== null){
                    tableElement.removeChild(bodyForDetach);
                }

               // bodyElement.isConnected?tableElement.removeChild(bodyElement):null;

                tableElement.appendChild(sortedBody);

                return;
            }

            const ageNameCharCodeArray = this._ageNameCharCodeArray;
            const bodyNeue = document.createElement('tbody');
            const sorted = type === 'number'
            ?
            this.quickSortSet(ageNameCharCodeArray)
            :
            this.quickSortSet(ageNameCharCodeArray, true);

            for(let subArray of sorted){
                let tableRow = document.createElement('tr');
                let leftTableData = document.createElement('td');
                let rightTableData = document.createElement('td');
                
                leftTableData.textContent = subArray[0];
                rightTableData.textContent = subArray[1];

                tableRow.appendChild(leftTableData);
                tableRow.appendChild(rightTableData);

                bodyNeue.appendChild(tableRow);
            }

            tableElement.removeChild((type === 'number')
                ?
                ((this._tableBody.isConnected?this._tableBody:null) || this._sortedByNameBody)
                :
                ((this._tableBody.isConnected?this._tableBody:null) || this._sortedByAgeBody)
            );
            tableElement.appendChild(bodyNeue);

            if(type === 'number'){
                this._sortedByAgeBody = bodyNeue;
            }else{
                this._sortedByNameBody = bodyNeue;
            }

        });

    }

    //DODACU, MOJ CUSTOM QUICK SORT ALGORITAM, A NJEGA CU ISPITIVATI U KONSTRUKTORU, ALI
    //CU GA NA KRAJU KORISTITI U EVENT LISTENERU, KOJI CU KACITI NA shadowRoot, U OBIMU connectedCallback-A

    quickSortSet(array, alpha){

        if(array.length < 2){
            return array;
        }

        const index = alpha?2:0;

        const arrayNeue = [].concat(array);
        const len = arrayNeue.length;
        const middleIndex = Math.floor(len/2);
        const middleArrayOfThree = [[].concat(arrayNeue[middleIndex])];
        const leftThrees = arrayNeue.slice(0, middleIndex);
        const rightThrees = arrayNeue.slice(middleIndex + 1, len);


        const left = [];
        const right = [];

        for(let i = 0; i < leftThrees.length; i++){
            
            if(leftThrees[i][index] > middleArrayOfThree[0][index]){
                right.push(leftThrees[i]);
            }else{
                left.push(leftThrees[i]);
            }

            if(!rightThrees[i]){
                break;
            }

            if(rightThrees[i][index] > middleArrayOfThree[0][index]){
                right.push(rightThrees[i]);
            }else{
                left.push(rightThrees[i]);
            }
        }

        return this.quickSortSet(left, alpha).concat(middleArrayOfThree).concat(this.quickSortSet(right, alpha));

    }

});

const FensiTabla = window.customElements.get('fancy-table');
const fensiTablaElement = new FensiTabla(
    'Omlet Imenic', 26,
    'Neko Drugic', 18,
    'Ali Koji', 20,
    'Kengi Pengi', 34,
    'Bleki Kleki', 52,
    'Ahmet Ahmet', 19,
    'Don Dosnon', 18,
    'Lester Najgard', 46,
    'Lorn Malvo', 22,
    'Dunkan Trussel', 41,
    'Tekila Polila', 16,
    'Terance McKenna', 64,
    'Neko'
);

document.querySelector('.fancy_kontejner').appendChild(fensiTablaElement);

//ODRADICU OVAJ PRIMER I ONAKO KAKO JE URADJEN U CLANKU
//OVDE NE KORISTIM CustomElementRegistry

//OVAKO CE IZGLEDATI HTML PRIMERA (DAKLE POTPUNO ISTA TABELA KAKAV JE CUSTOM ELEMENT, KOJI SE 
//INSTANTIZIRA, WEB KOMPONENTOM, KOJU REFERENCIRA FensiTabla)

const tabelin_html = `
<div id="sortable_table">
    <table>      
      <thead>
        <tr>
          <th data-type="number">Age</th>
          <th data-type="string">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>5</td>
          <td>Tim</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jenny</td>
        </tr>
        <tr>
          <td>18</td>
          <td>Eugene</td>
        </tr>
        <tr>
          <td>9</td>
          <td>Anna</td>
        </tr>
        <tr>
          <td>24</td>
          <td>Jally</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Carisa</td>
        </tr>
      </tbody>
    </table>
  </div>
`; 

//PRE NEGO STO NASTAVIM SA PRIMEROM, MORAM DODATI NESTO VAZNO STO DO SADA NISAM ZNAO, A BILO JE UVEK TU
//'ISPRED NOSA', A REC JE O     id   I      name     ATRIBUTIMA

//AKO POGLEDAM HTML, KOJI SE NALAZI U MOM HTML FAJLU, ALI KOJI SAM PRIKAZAO U GORNJEM TEMPLATE STRING-U
//VIDECU DA SAM DEFINISAO, JEDAN    id      ATRIBUT NA CONTAINER-U (KOJI CU KORISTITI U DALJEM KODIRANJU, 
//OVOG PRIMERA) 

//NAIME, AKO ZADAM OVAJ ATRIBUT ELEMENTIMA, NJIHOVE VREDNOSTI CE POSTATI IMENA PROPERTIJA   window-A

console.log(    window.sortable_table    );         //-->       <div id="sortable_table">...</div>

//NAIME, window SE NIJE MORAO REFERENCIRATI (ALI, IPAK URADIO SAM TO U OVOM SLUCAJU)

//KAO STO VIDIM U KONZOLI, ZAISTA SE STAMPAO ELEMENT SA id-JEM, CIJ USAM VREDNSOT KORISTIO, NA PRIKAZANI
//SPECIFICAN NACIN

//SAMO CU DALJE DODATI DA SE POMENUTO NE TREBA KORISTITI (NE PREPORUCUJE SE), I DA JE TO JEDAN FEATURE
//KOJI JE KORISTIO INTERNET EXPLORER (I DALJE GA KORISTI), A KOJI SU ZBOG KOMPATIBILNOSTI, POCELI
//TADA, KORISTITI I DRUGI BROWSER-I (UKLJUCUJUCI CHROM-E I NEKI DRUGI (KOJI GA I DALJE KORISTE))

//MEDJUTIM, JA CU KORISTITI, POMENUTI FEATURE, U MOM CODE, CISTO DA POKAZEM DA JE MOGUCE, ALI I ZATO STO
//JE POMENUTI FEATURE, KORISCEN U CLANKU, KOJI SAM CITAO I CIJE PRIMERE SAM RADIO, DOK SAM PISAO OVE
//KOMENTARE

//PRVO CU DEFINISATI compare FUNKCIJU
//U CIJEM OBIM UCU KORISTITI, POMENUTI FEATURE, CIJA UPOTREBA SE NE PREPORUCUJE

//A TREBA DA OBRATIM PAZNJU, JER CU U SLEDECOJ FUNKCIJI KORISTITI, RAZLICITE KARAKTERISTICNOSTI TABELE,
//KOJE NISAM RANIJE POZNAVAO (KADA TO KAZEM MISLIM NA PROPERTIJE, I PREDPOSTAVLJAM GETTER-E, 
//KARAKTERISTICNE, SAMO ZA table ELEMENT I NJEGOVE DESCENDANT-E)

const sortTable = function(brKolone, type){                        //   type SE ODNOSI NA dataset VREDNOST
                                                   //A KOLONA NA ONU KOLONU TABELE, PO KOJOJ ZELIM
                                                   //DA SORTIRAM

    //PRE NEGO STO POCNEM SA DEFINISANJEM OVE FUNKCIJE, SAMO CU RECI DA CE OVA FUNKCIJA ZA compare
    //KORISTITI sort METODU Array-EVOG PROTOTIPA
    //DAKLE NECE POSTOJATI CUSTOM ALGORITAM ZA compare, VEC CE SE KORISTITI, TAJ OD POMENUTE sort
    //METODE

    const tableBody = sortable_table.querySelector('tbody');

    const rowsIterableObject = tableBody.rows; //POVRATNA VREDNOST, OVOG   rows   GETTER-A JESTE
                                            //       HTMLCollection
                                        //INSTANCA, CIJE SU CELIJE tr ELEMENTI, tbody ELEMENT
                                        //tbody  ELEMENT JESTE INSTANCA   HTMLTableSelectionElement-A
    
    // console.log(rowsIterableObject instanceof HTMLCollection);      //-->   true
    // console.log(tableBody instanceof HTMLTableSectionElement);      //-->   true

    //PREDPOSTAVLJAM DA JE I thead, ISTO TAKO INSTANCA      HTMLTableSelectionElement-A

    //POSTOJI I        cells        GETTER, KOJIM SE 'GET-UJE, ITERABLE OBJEKAT, A TO JE GETTER
    //      HTMLTableRowElementa

    // console.log(  rowsIterableObject[0].cells  );   //STAMPA SE HTMLColection  INSTANCA (ITERABLE OBJEKAT),
                                                        //CIJI SU CLANOVI, USTVARI  th  i/ili   td 
                                                        //ELEMENTI JEDNOG REDA (U OVOM SLUCAJU SAMO 
                                                        //td    ELEMENTI NULTOG ROW-A)
                                                        
    // console.log(  rowsIterableObject[0].cells instanceof HTMLCollection  );     //-->   true

    //OD CELIJA POMENUTE, HtmlCollection INSTANC-E (CLANOVI: tr ELEMENTI), MOGU KREIRATI, ARRAY, UZ POMOC
    //  Array.from    METODE

    const rowsArray = Array.from(rowsIterableObject);       //ARGUMENTI KOJI SE MOGU DODATI OVOJ METODOI
                                                            //JESU   Iterable OBJEKAT, ALI I 
                                                            //map   CALLBACK (FUNKCIONISE ISTO KAO I 
                                                            //map METODA(DAKLE POVRATNA VREDNOST
                                                            //CALLBACK-A, POSTAJE CLAN NOVOG NIZA
                                                            //A JASNO JE DA SE CALLBACK-U, KAO
                                                            //ARGUMENTI 'IZA KULISA', PROSLEDJUJU
                                                            //CLANOVI ITERABLE OBJEKTA))
                                                            //Arrray.from MOZE BITI I GENERATOR NIZA BROJEVA
                                                            //ALI O TOME NECU SADA, (SAMO SAM NEGDE ISPRO
                                                            //BAO OVU MOGUCNOST)

    //ZASTO JA OVAJ     rows       ITERABLE OBJEKAT, USTVARI PRETVARAM U NIZ?
    //PA SAMO IZ JEDNOG RAZLOGA

                        //DA BIH NA TOM NOVOM NIZU MOGAO PRIMENITI      Array.prototype.sort
                        //JER SE TA METODA NE MOZE PRIMENITI NA HTMLCollection INSTANCI, JER JE
                        //TAKVA INSTANCA NE NASLEDJUJE sort
                        //TAKODJE ZELIM I DA IMAM MOGUCNOST KORISCENJA SPREAD SINTAKSE ZA POMENUTI NIZ

    //  sort    METODA, KOJU CU KORISTITI IMA MOGUCNOST DA JOJ SE KAO ARGUMENT DODAJE CALLBACK
    //ODNOSNO MORA JOJ SE DODATI CALLLBACK, AKO ZELIM DA SE SORTIRANJE BUDE KOREKTNO

    //ZASTO TO GOVORIM?
    //PA ZATO STO U SLUCAJU AKO SE sort METODI NE OBEZBEDI CALLBACK ARGUMENT, ONA CE BROJEVE (CLANOVE NIZA)
    //PRETVORITI U STRING-OVE, I KAO TAKVE IH UPOREDJIVATI

    //A TU MOZE NASTATI, NA PRIMER, SLEDECI PROBLEM         "2"  >  "11"    ===    true 

    //POMENUTI CALLBACK ARGUMENT JE USTVARI COMPARING FUNKCIJA
    //SAZNAO SAM OD BRJANA HOLTA (IZ NJEGOVOG TUTORIJALA) DA ALGORITAM KOJI SE KORISTI
    //JESTE:
                //          MERGE SORT, 
                
    // BAR TAKO ON KAZE, DA SE TAKAV ALGORITAM, KORISTI ISPOD sort METODE, U SLUCAJU CHROME-A 
    //(TO MOGU DA ISPITAM ALI NE OVDE, MOZDA NEGDE DOLE U CODE-U)


    //KREIRACU JEDNU VARIJABLU, KOJOJ TREBA DA SE DODELI ODGOVARAJUCA FUNKCIJA, KAO VREDNOST

    let compareCallback;

    //A KOJA FUNKCIJA TREBA DA SE DODELI, ODLUCICE      switch      IZJAVA
    
    switch(type){

        case 'number':
            compareCallback = function(jedanRed, drugiRed){
                //PRE NEGO STO NASTAVIM, RECI CU DA SE U JAVASCRIPTU MOGU VRITI MATEMATICKE
                //OPERACIJE SA DVA STRINGA, KOJI SU NUMERICAL (KOJI SE SASTOJE SAMO OD CIFARA)

                return jedanRed.cells[brKolone].innerHTML - drugiRed.cells[brKolone].innerHTML;  
                                                                        //PODSETI SE
                                                                        // OPET DA JE
            };                                                         //cells USTVARI ITERABLE OBJEKAT
                                                                    //A ITERABLE OBJEKAT IMA INDEKSIRANE
                                                                    //CLANOVE                                                            
            break;                                                  //IT IS CONVINIENT DA SU TI INDEKSI
                                                                    //NUMERISANI SA 0 I 1
                                                                    //A TO SU I BROJEVI KOLONA
        
        
        case 'string':                                              
            compareCallback = function(jedanRed, drugiRed){                              
                //A KADA SE RESAVAJU SLOVA, NA DRUGACIJI NACIN TREBAM IZABRATI DA NEGATIVAN ILI
                //POZITIVAN BROJ BUDU POVRATNE VREDNOSTI CALLBACKA, JER U OVOM SLUCAJU TREBA DA SE
                //SLOZE SLOVA PO VELICINI
                //DAKLE STRINGOVI SA ALPHABETICAL KARAKTERIMA
                //A NE MOGU ODUZIMATI, JEDAN STRING OD DRUGOG, KAKO SAM TO MOGAO SA NUMERICAL STRINGOVIMA

                //IMAJ NA UMU SLEDECE:

                console.log("A" > "B");         //-->   false
                console.log("P" > "F");         //-->   true
                
                //ALI TO NECE UTIACATI NA UPOREDJIVANJE DVE STRING VREDNOSTI U OVOJ FUNKCIJI, JER
                //OVDE SAM DEFINISAO, KAO DA JE         "A" > "B"   ===   true
                //I TAKVO DEFINISANJE JE DONELO TACAN REZULTAT

                return jedanRed.cells[brKolone].innerHTML > drugiRed.cells[brKolone].innerHTML?1:-1;

                //POKUSAO SAM DA ZAMENIM MESTA ZA    1   I      -1
                //ALI NA KRAJU SU VREDNOSTI BILE SLOZENE OD     Z     DO      A  ;  UMESTO OD A  DO  Z

            };
            break;

    }

    //PRIMENA sort METODE, NA NIZU SASTAVLJENOM OD TABLE ROW-OVA; KAO ARGUMENT SE DODAJE compareCallback

    rowsArray.sort(compareCallback);

    //JOS JEDNA BITNA STVAR, KOJA SE TICE APPEND-OVANJA
    //NAIME, VEC NESTOVANI ELEMENTI, SE OPET MOGU APENDOVATI, ONI CE NA TAJ NACIN SAMO PROMENITI SVOJE
    //PRVOBITNO MESTO

    //DAKLE APPEND-UJEM SVE, VEC NESTOVANE TABLE ROWS, CIME CE ONI ZAUZETI NOVO MESTO U TABLE BODY-JU
    //A UZ TO CU KORISTITI I SPREAD SINTAKSU (DODAVANJE ARGUMENATA append METODI)

    tableBody.append(...rowsArray);

}

//DAKLE SADA KACIM LISTENER (UZ KORISCENJE, POMENUTOG NEPREPORUCLJIVOG FEATUREA (KOJI SAM KORISTIO I U
//SAMOJ compare FUNKCIJI)), U KOJEM CU POZVATI, DEFINISANU compare FUNKCIJU

sortable_table.addEventListener('click', function(ev){

    if(ev.target.tagName !== 'TH') return;

    const currentHeader = ev.target;
    const type = currentHeader.dataset.type;
    
    const redniBrojKolone = type === 'number'?0:1;   //MOGAO SAM OVAKO PRISTUPITI REDNOM BROJU KOLONE
                                                    //STO IZGLEDA I LOGICNO
                                                    //ALI IPAK NECU KORISTITI OVU VREDNOST
    //JER, NAIME JA MAOGU KORISTITI, OPET NESTO A TO JE ODLIKA KOLONE
    //TO JE GETTER      cellIndex
    //I TO JE UPRAVO REDNI BROJ KOLONE

    //LEVOM JE NULA, KAO VREDNSOT INDEKSA CELIJE, A DESNOM JE JEDINICA
    //(DAKLE UPRAVO SAM SAZNAO DA SVAKA CELIJA, TJ SVAKI    th      td      ELEMENT, IMA I SVOJ 
    // cellIndex
    //IAKO MU IME SUGERISE DA SVAKA CELIJA IMA SVOJ LICNI UINDEKS, IPAK NIJE TAKO
    //OVO JE BROJ KOLONE, KOJOJ th, ILI td   PRIPADA
    //POMENUTA VREDNOST CE BITI KORISNA KAO ARGUMENT sortTable FUNKCIJE
    //JER U SUSTINI, RESAVACE SE REDOVI NA TAKAV NACIN, DA CE SE PRITUPATI CELIJAMA (NIZU CELIJA 
    //U JEDNOM REDU), I SVAK OD TIH CELIJA U JEDNOM REDU CE IMATI SVOJ INDEX (POSTO IMAM DVE CELIJE U 
    //REDU, INDEKSI CE BITI NULA I JEDAN); A TO MI BAS ODGOVARA JER SADA IMAM I BROJEVE KOLONA
    //A TO SU 0 I 1; TAKO DA UZ POMOC BROJA KOLONE KOJU MOGU KORISTITI KAO 
    //ALI TO SE NARAVNO SVE VIDI U DEFINICIJI

            //  sortTable           FUNKCIJE (KOJU SAM DEFINISAO GORE)

    const redniBrojKol = currentHeader.cellIndex;       //OVO MOZE BITI     0    ILI    1

    sortTable(redniBrojKol, type);
});


//URADICU, JOS JEDAN PRIMER, U KOJEM CE AKCENAT BITI STAVLJEN, JOS JEDNOM, PRETEZNO NA EVENT DELEGATION
//EVENTOVI, KOJI CE BITI ZASTUPLJENI U OVIM PRIMERU JESU
//                                                                mouseover
//                                                                mouseout
//   KAO STO SAM SAZNAO ZA RAZLIKU OD  mouseenter I mouseleave
////            mouseover    I      mouseout        SU ELEMENTI KOJI BUBBLE UP-UJU, I KOJI SU CANCELABLE
////
//ONO STO CE BITI PRISUTNO U OVOM PRIMERU JESU DVA DUGMETA
//I TOOLTIP, KOJI TREBA DA SE POJAVI KADA KURSOROM UDJEM U OBLAST KOJA JE DUGMETOVA
//OBA DUGMETA CE IMATI  
//                              data-tooltip        ATRIBUT
//VREDNOST OVOG ATRIBUTA CE BITI ONO STO SE TREBA PRIKAZATI, KAO TEXT TOOLTIPA
//NARAVNO, KADA KURSOR IZADJE IZ OBLASTI BUTTONA; TOOLTIP TREBA DA SE SKLONI
//STRANICA TREBA DA BUDE SCROLLABLEJER ZELIM DA AKO NEMA MESTA DA SE TOOLTIP PRIKAZE IZNAD DUGMETA;
//DA SE ON PRIKAZE ISPOD DUGMETA

//EVENT LISTENER CU KACITI NA document

const html_button_tooltip_primera = `
    <button data-tooltip="Neki tekst, neko objasnjenje, koje se prikazuje..." style="margin-left: 628px;">
        Ayohuasca
    </button>
    <button data-tooltip="Neki html<br><b>Ovo je</b>">
        Something
    </button>
`;

const css_pomenutog_primera = `
    .tooltip {
        position: fixed;                    /*KADA SE FIKSNO POZICIONIRA ELEMENT, I AKO MU SE*/
        padding: 8px 18px;                  /*NE ZADAJU VREDNOSTI top ILI left CSS PROPERTIJA*/
        border: 1px solid olive;            /*ELEMENT JE POZICIONIRAN NA DNU ISPOD VISLJIVOG DELA*/
        text-align: center;                         /*ODNOSNO 'NEMA GA', NE MOZE SE VIDETI*/
        font: italic 14px/1.3 arial, sans-serif;
        color: #334;
        background: #fff;
        box-shadow: 2px 3px 2px rgba(0, 0, 0, .4);
    }
`;

//U SEDECOJ VARIJABLI CU SKLADISTITI TOOLTIP ELEMENT
let tooltipElement;

document.addEventListener('mouseover', function(ev){
    const target = ev.target;
    
    //MOJ USLOV, KOJI JE, MOZDA PREOPSIRAN, ZATO GA NECU KORISTITI
//  if(target.nodeName !== 'BUTTON' && !target.hasAttribute('data-tooltip')) return;

    const tooltipText = target.dataset.tooltip;

    if(!tooltipText) return;

    //KREIRANJE TOOLTIP-A
    
    tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');
    tooltipElement.innerHTML = tooltipText;     //OVDE JE DOBRO DA SE KORISTI SETTER innerHTML JER
                                                //ONDA AKO SAM DEFINISAO TAGGOVE U VREDNOSTI
                                                //data-     ATRIBUTA, HTML CE BITI DEFINISAN U TOOLTIP
                                                //ELEMENTU

    //OVAJ ELEMENT APPEND-UJEM NA body

    document.body.append(tooltipElement);       //DA, body-JU SE MOZE I TAKO PRISTUPITI

    //ELEMENT SE NE VIDI (ODNOSNO NALAZI SE ISPOD VIDLJIVOG DELA STRANE) ZBOG NJEGOVE FIKSNE POZICIJE (
    //STIL KOJI JE DEFINISAN ZA NJEGOVU CSS KLASU)

    //SADA CU SE BAVITI POZICIONIRANJEM TOOLTIP-A, IZNAD ODGOVARAJUCEG DUGMETA  (top-center)

    const koordinate = target.getBoundingClientRect();   //NISAM RANIJE ZNAO DA OVOM METODOM MOGU 
                                                         //PRISTUPITI OBJEKTU, CIJI SU PROPERTIJI
    // console.log(koordinate);                             //KOORDINATE

    // console.log(    target.offsetWidth  );  //OVIM GETTER-OM, MOGU PRISTUPITI SIRINI ELEMENTA  
                                            //POSTOJI I offsetHeight
    // console.log(    target.offsetHeight );

    //STAMPACU GORNJU I LEVU KOORDINATU, KAKO BIH DOBIO PREDSTAVU GDE JE KOORDINATNI POCETAK

    console.log(koordinate.left);       //-->   8   
    console.log(koordinate.top);        //-->   OKO  182

    //SCROLLUJUCI SHVATIO SAM DA SE VREDNOST ZA top MENJAJU (TO JE IZ SLEDECIH RAZLOGA)

    //ODNOSNO           top         KORDINATA PREDSTAVLJA SLEDECE RAZMAK:
    //                                              OD IVICE WINDOW-A, PA DO GORNJE IVICE ELEMENT-A
    //                                              I AKO SE IVICA WINDOWA I ELEMENT PREKLAPAJU (AKO JE
    //                                              TAKO SCROLL-OVANO),
    //                                              ILI SE ELEMENT NALZAZI DALEKO IZNAD IVICE WINDOW-A 
    //                                              (AKO JE, TAKO SCROLL-OVANO) OVA VREDNOST MOZE BITI I
    //                                              NEGATIVNA
    
    //A VREDNOST ZA     left        PREDSTAVLJA RAZMAK IZMEDJU LEVE GRANICE WINDOW-A I LEVE GRANICE 
    //                                                                                      ELEMENTA

    //POMENUTI OBJEKAT, KOJI SKLADISTI KOORDINATE, IMAT AKODJE I SLEDECE KOORDINATE

                            //              x           I           y

    console.log("x", koordinate.x);         //-->   8 
    console.log("y", koordinate.y);         //-->   OKO  182

    //POSMATRAJUCI, KOJE SU IM VREDNOSTI, SHVATAM DA SU GOTOVO ISTE KAO I ONE ZA        top   I   left
    
    //PRISTUPICU I KOORDINATAMA TOOLTIP-A

    const koordinateTooltipa = tooltipElement.getBoundingClientRect();  //OVO SAMO KORISTIM U CILJU NEKOG
                                                                        //MOG UVERAVANJA KAKVE SU 
                                                                        //KOORDINATE I DIMENIZIJE
                                                                        //OVE VREDNOSTI MI NECE TREBATI
                                                                        //U OVOM PRIMERU
                                                                        //JER JA TOOLTIP POMERAM, A 
                                                                        //OVAJ OBJEKAT SKLADISTI, NJEGOVE
                                                                        //KOORDINATE, KADA SE ON NALAZI
                                                                        //IZVAN VIDLJIVOG DELA STRANE,
                                                                        //ODNOSNO IZVAN ONOG PROSTORA
                                                                        //KOJI OBUHVATA MOJA STRANICA
    console.log(koordinateTooltipa.left);       //-->   8
    console.log(koordinateTooltipa.top);        //-->   OKO  22850
    console.log("x", koordinateTooltipa.x)            //-->   8
    console.log("y", koordinateTooltipa.y)            //-->   OKO  22850
    //KAO STO MOGU VIDETI, POMENUTE VREDNOSTI GOVORI DA JE ELEMENT POZICIONIRAN DALEKO ISPOD IVICE WINDOW-A
    //ODNOSNO, PRAVILNIJE BI BILO DA SAM REKAO ISPOD IVICE MOJE STRANICE (TO KAZEM JER MOZDA, KADA 
    //UPOTREBIM REC WINDOW, TO ZNACI DA JE MOGUCE DOCI DO ELEMENTA SCROLLOVANJEM)
    //DAKLE DO ELEMENTA NIJE MOGUCE DOCI SCROLLOVANJEM JER SE NALAZI DALEKO ISPOD DONJE IVICE
    //SAME STRANICE

    //POSTO SAM SE UPOZNAO, KAKVE TO KOORDINATE SKLADISTI, ILI REFERENCIRA OBJEKATA, KOJI JE POVRATNA
    //VREDNOST          getBoundingClientRect           METODE
    //MOGU SE POSVETITI DEFINISANJEM, NA KOJOJ POZICIJI TREBA DA SE NALAZI TOOLTIP, KADA KORISNIK, POMERI
    //KURSOR UNUTAR DUGMETA

    let left = koordinate.left + (target.offsetWidth - tooltipElement.offsetWidth)/2; //OVIM SE POSTIZE
                                                                                        //D TOOLTIP
                                                                                        //NE MORA DA
                                                                                        //BUDE POZICIONIRAN
                                                                                        //U ISTOJ LINIJI
                                                                                        //KAO I BUUTON
                                                                                        //U SMISLU
                                                                                        //POZICIONIRANJA
                                                                                        //OD LEVE STRANE
                                //POMENUTO IMA SMISLA SAMO DEFINISATI AKO       JE      
                                //      koordinate.left > tooltipElement.offsetWidth
                                //ALI I NE BI IMALO SMISLA DA JE OVO DRUGO VECE
                                //KADA POSMATRAM DIMENZIJE I POZICIJE, POSTAJE JASNIJE

    if(left < 0) left = 0;  //AKO SE BUTTON, PREKLAPA SA LEVOM IVICOM WINDOWA, TO NE MORA I TOOLTIP,
                            //ODNOSNO NEMA SVRHE DA U CELINI NE BUDE VIDLJIV TOOLTIP

    let top = koordinate.top - tooltipElement.offsetHeight - 5;         //5 JE RAZMAK KOJI DELI TOOLTIP
                                                                        //DA SE NE BI NASLANJAO NA
                                                                        //BUTTON

    if(top < 0){                                        //AKO SE GORNJA IVICA WINDOW-A, DUGME PREKLAPAJU
                                                        //(AKO JE TAKO SCROLL-OVANO), STO ZNACI DA JE
                                                        //KURSOROM MOGUCE UCI U OBLAST DUGMETA
                                                        //ALI TADA SE TOOLTIP, NE SME PRIKAZATI IZNAD
                                                        //DUGMETA, VEC TREBA DA SE PRIKAZE ISPOD            
        top = koordinate.top + target.offsetHeight + 5;
    }

    tooltipElement.style.left = left + "px";
    tooltipElement.style.top = top + "px";


});

document.addEventListener('mouseout', function(){
    if(tooltipElement){                                 //AKO JE KREIRAN TOOLTIP
        tooltipElement.remove();                        //KADA KURSOR IZADJE IZ OBLASTI BUTTON-A
        tooltipElement = null;                          //NEKA SE UKLONI TOOLTIP, SA body-JA
    }                                                   //I NEKE AS EUKLONI IZ MEMORIJE (ZATO JE 
                                                        //VARIJABLI DODELJENA null KAO VREDNOST)
});                                                     //JER KADA SE UKLONE SVE REFERENCE (U OVOM
                                                        //SLUCAJU, POSTOJI SAMO JEDNA), ELEMENT JE
                                                        //GARBAGE COLLECTED

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//          DISPATCHING CUSTOM EVENTS      "OTPREMANJE" CUSTOM EVENT-OVA
////////////////////////////////////////////////////////////////////////////////////////////////////////
//SADA CU SE POZABAVITI NECIM STO SE ZOVE GENERISANJE EVENT-OVA
                //NAIME MOGU SE GENERISATI CUSTOM EVENT-OVI, KOJI SLUZE ZA KREIRANJE
                //"GRAFICKIH KOMPONENTI"
                        //NA PRIMER ROOT ELEMENT NEKOG MENU-A, MOGU TRIGGEROVATI EVENT-OVE, KOJI GOVORE
                        //STA SE DOGODILO SA MENU-OM open (MENU OPEN)       SELECT(ITEM JE SELKTOVAN) ITD.
                //A TAKODJE SE MOGU GENERISATI BUILT-IN EVENT-OVI, KAO STO JE click, mousedown ITD.
                //STO MOZE BITI DOBR OZA TESTING

//KORENA KLASA JESTE        Event

//  ARGUMENTI, KOJI SE DODAJU, PRILIKOM INSTATICIRANJA JESU
            //  TIP EVENTA:   KAO STO JE  'click'       ILI MOJ KAO STO JE      'hey-hello!'
            //  OPTIONS OBJEKAT SA SLEDECIM PROPERTIJIMA:
                    // bubbles:         BOOLEAN VREDNOST (AKO RAZMISLJAM O OVOME KAKO TREBA, MOZDA JE
                    //                                          BOLJE DA JE OVAJ PROPERTI NAZVAN
                    //                                              propagates)
                        //ZASTO SAM TO REKAO? PA UPOZNAVAJICI SE SA OSOBINAMA EVENTOVA, MOGAO SAM 
                        //TO ZAKLJUCITI
                        //I ONO STO JE VAZNIJE, MISLIM DA JE OVAJ BOOLEAN ODLUCUJE DA SE NA Event INSTANCI 
                        //MOZE PRIMENITI    stopPropagation
                    // cancelable:       BOOLEAN VREDNOST
                         //ODLUCUJE DA LI CE POSTOJATI MOGUCNOST PREVENTING-A "DEFAULT ACTION-A"

        //PO DEFAULT-U, ODNOSNO KADA SE NE OBEZBEDI OPTIONS OBJEKAT, USVAJA SE SLEDECE:
                                //          {bubbles: false, cancelable: false} 



// SADA CU SE POZABAVITI            dispatchEvent           METODOM         (PRIMENJUJE SE NA ELEMENT
//                                                                      A Event INSTANCA JOJ JE ARGUMENT) 

// KREIRACU JEDNU Event INSTANCU, 'click' TIPA

const someEvent = new Event('click');

// DEFINISACU I HTML

const html_primera_sa_eventovima = `
    <button id="neko_dugme">Autoclick</button>
`;

//ZAKACICU EVENT LISTENER, ZA TO DUGME (ZA SLUCAJ Event-A ,'click' TIPA) 

neko_dugme.addEventListener('click', function(ev){
    //alert('click!');
    
    //STAMPACU I Event INSTANCU, ALI I NEKE NJENE KARAKTERISTIKE
    
    console.log(ev === someEvent);     //-->  true   (AKO FIZICKI NE KLIKNEM, VEC SE HANDLER IZVRSIO KAO POSLEDICA TRIGGERING-A, UZ POMOC dispatchEvent METODE) 
                                        //-->   false   (AKO SAM FIZICKI KLIKNUO)

    console.log(ev.bubbles);    //-->   false   (AKO FIZICKI NE KLIKNEM, VEC SE HANDLER IZVRSIO KAO POSLEDICA TRIGGERING-A, UZ POMOC dispatchEvent METODE)
                                //-->   true    (AKO SAM FIZICKI KLIKNUO)
   
    console.log(ev.cancelable);    //-->   false   (AKO FIZICKI NE KLIKNEM, VEC SE HANDLER IZVRSIO KAO POSLEDICA TRIGGERING-A, UZ POMOC dispatchEvent METODE)
                                //-->   true    (AKO SAM FIZICKI KLIKNUO)

    //UZ POMOC SLEDECEG MOGU PROVERITI DA LI JE NEKI ELEMENT, USTVARI "PRAVI (REAL)" USER EVENT
    //ILI DA LI JE SCRIPT GENERATED

    console.log(ev.isTrusted);  //-->   false   (AKO FIZICKI NE KLIKNEM, VEC SE HANDLER IZVRSIO KAO POSLEDICA TRIGGERING-A, UZ POMOC dispatchEvent METODE)
                                //-->   true    (AKO SAM FIZICKI KLIKNUO)

});

//SADA CU PRIMENITI         dispatchEvent           METODU, NAD GORNJIM ELEMENTOM

neko_dugme.dispatchEvent(someEvent);

//DAKLE, PRIMENOM POMENUTE METODE, NA GORE PRIKAZANI NACIN, JA SAM USTVARI DEFINISAO 
//TRIGGER-OVANJE EVENT-A, TIPA 'click'; CIME SE IZVRSIO HANDLER (ALERT-OVALO SE NESTO) (SDA MOGU DA
//BACIM OKO NA OBIM HANDLER,A I POGLEDAM, I KONZOLU I VIDIM STA SE TO STAMPALO, ODNOSNO DA VIDIM DA 
//LI SE STAMPALO ONO STO SAM JA U OBIMU HANDLERA, COMMENTED OUT, PORED console.log POZIVA)
// A POSLE TOGA CU 'FIZICKI' DA KLIKNEM NA DUGME, PA DA VIDIM DA LI SE, ONO DRUGO COMMENTED OUT
// STAMPALO U KONZOLI

//SVE STO SAM REKAO DA CE SE STAMPATI SE I STAMPALO
//DAKLE MOGU ZAKLJUCITI DA SE PRIMENOM dispatchEvent METODE, HANDLER-U, PROSLEDILA Event INSTANCA
//KOJU SAM JA KONSTRUISAO

//A 'FIZICKIM' KLIKOM SE HANDLER-U PROSLEDILA Event INSTANCA 'click' TIPA, KOJA SE PO DEFAULT-U PROSLEDJUJE
//HANDLER-U (SA true BUBBLING-OM, I true CANCELABLE-OM)
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//SADA CU KREIRATI JEDAN PRIMER, U KOJEM CU INSTANTICIRATI Event INSTANCU, KOJOJ CE bubbling BITI true
//I U OVOM SLUCAJU, POSTO CE Event INSTANCA, IMATI MOGUCNOST BUBBLING-A, KADA BUDEM KACIO HANDLER,
//KORISTICU PRINCIP EVENT DELEGATIONA

//DAKLE, STO SE TICE HTML-A, IAMCU h1 ELEMENT

const html_primera_gde_definisem_da_custom_element_ima_event_bubbling = `
    <h1 id="neki_header">Hello from Ayohuasca land!</h1>
`;

//KACIM EVENT HANDLER NA document-U (U SLUCAJU Event INSTANCE, KOJA JE 'buyaa' TIPA) (TO SAMO MOZE BITI CUSTOM EVENT, KOJI JA INSTANTICIRAM DA BUDE TIPA "buyaa")

document.addEventListener('buyaa', function(ev){
    //alert("Buyaaaaaa bubbled from h1 to document");

    console.log(ev.bubbles);        //-->   true    AKO JE TRIGGERING JAVASCRIPTOM (dispatchEvent MRTODOM)

});                                     

//INSTANTICIRAM Event OBJEKAT, KOJI CE BITI 'buyaa' TIAPA, I KOJI CE MOCI BUBBLE UP-OVATI

const buyaaEvent = new Event('buyaa', {bubbles: true});

//TRIGER-UJEM, ODNOSNO DISPATCH-UJEM POMENUTI EVENT, NA h1 ELEMENTU

neki_header.dispatchEvent(buyaaEvent);

//JOS DVE RECENICE
// "We should use addEventListener for our custom events, because on<event> 
// only exists for built-in events, document.onhello doesn’t work.
// Must set bubbles:true, otherwise the event won’t bubble up."   from TUTORIAL author: Ilya Kantor    

//NAIME MORAM RECI JOS NESTO STO JE VAZNO, A KADA SE RADI O 

//KADA KREIRAM INSTANCE EVENTOVA, UMESTO DA Event OBJEKTE INSTANTICIRAM OVAKO
//      new Event
//NAJBOLEJE JE DA EVENT OBJEKTI BUDU INSTANCE SLEDECIH KLASA
// 
//                  UIEvent
//                  FocusEvent
//                  MouseEvent
//                  WheelEvent
//                  KeyboardEvent
//                      ...            SA OSTALIM SE MOGU UPOZNATI OVDE  https://www.w3.org/TR/uievents/
//

//ZASTO TAKO?
//PA NEKE BUILT IN KARAKTERITIKE KOJE IMAJU MouseEvent INSTANCE, NEMAJU Event INSTANCE

//PRIKAZACU TO OPET, PUTEM PRIMERA

//KREIRACU DVA EVENT OBJEKTA, JEDAN UZ POMOC Event KONSTRUKTORA, A DRUGI UZ POMOC MouseEvent KONSTRUKTORA
//OBA EVENT-A, CE BITI TIPA 'click'

//MEDJUTIM, U OPTIONS OBJECT ARGUMENT-U, JA CU DEFINISATI JOS NEKE KARAKTERISTIKE EVENT-A
//  TO SU       clientY     I       clientx         
//(POMENUTIM PROPERTIJIMA SE DEFINISE GDE CE SE NA STRANICI TRIGGER-OVATI EVENT)
//ODNOSNO TE VREDNSOTI SU RAZMACI IZMEDJU GORNJE STRANE WINDOW-A I MESTA TRIGGER-A, ZATIM LEVE STRANE
//WINDOW-A I MESTA TRIGGER-A

const neki_event = new Event('click', {
    bubbles: true,
    cancelable: true,
    clientX: 28,
    clientY: 58
});

const neki_mouse_event = new MouseEvent('click',{
    bubbles: true,
    cancelable: true,
    clientX: 18,
    clientY: 48
});

//POKUSACU DA PRISTUPIM OVIM VREDNOSTIMA, UZ POMOC GETTER-A

console.log(        neki_event.clientX              );            //-->     undefined
console.log(        neki_event.clientY              );            //-->     undefined
console.log(        neki_mouse_event.clientX        );            //-->     18
console.log(        neki_mouse_event.clientY        );            //-->     48

//ZASTO SU ODREDJENE VREDNOSTI UNDEFINED
//PA ZATO STO       Event    INSTANCA NASLEDJUJE OD  MouseEvent     INSTANCE, VEC OBRNUTO         

console.log(neki_mouse_event instanceof Event);       //-->   true
console.log(neki_mouse_event instanceof MouseEvent);  //-->   true

console.log(neki_mouse_event.__proto__ instanceof Event)  //--> true
console.log(neki_mouse_event.__proto__ instanceof Object)  //--> true

console.log(neki_event instanceof Event);       //-->   true
console.log(neki_event instanceof MouseEvent);  //-->   false

console.log(neki_event.__proto__ instanceof Object)  //--> true
console.log(neki_event.__proto__ instanceof MouseEvent)  //--> false

//MEDJUTIM, POSTOJI I WORKAROUND, MEDJUTIM, NE YNAM KOLIKO JE TO KORISNO
//
//A TO JE DA SE Event INSTANCI (DAKLE, INSTANTICIRANOM OBJEKTU)
//DODELI VREDNOST ZA        clientX   ILI       clientY
//NISAM SIGURAN, DA LI SU U OVOM SLUCAJU clientX   ILI   clientY        USTVAR ISETTER-I
///////////////////////////////////////////////////////////////////////////////////////////////////////

//U SLEDECEM PRIMERU SAMO TESTIRAM MOGUCNOSTI clientX  i clientY
//(MALO CU SE ODALJITI OD TEME, KAKO BIH SE POZABAVIO, KONKRETNO POMENUTIM KARAKTERISTIKAMA 
//clientX   I  clientY (U OBIMU HANDLER-A); KREIRACU, JOS JEDAN PRIMER         
//A MORAM PROCITATI I SLEDECI CLANAK, KOJI SE BAVI SAMO KOORDINATAMA https://javascript.info/coordinates )

//ONO STO KONKRETNO ZELIM DA URADIM

//INSTATICIRAM MouseEvent, SA ZADATIM OPCIJAMA          clientX     clientY

const misEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    clientX: 8,
    clientY: 8
});

//DA DEFINISEM KACENJE HANDLERA, NA document, ZA SLUCAJ EVENTA, TIPA 'click'

/* document.addEventListener('click', function(ev){
    console.log(ev.clientX, ev.clientY);            //      8       8
    console.log(ev.target, ev.currentTarget);       //paragraf    document
}); */

//DAKLE JA SAM DEFINISAO DA SE STAMPA TARGET. ZASTO?
//ZELIM DA VIDIM, KOJI JE TARGET U ODNOSU NA      clientX           I       clientY 

document.querySelector('.parag_neki').dispatchEvent(misEvent);

//NAIME, ONO STO SAM PRIMETIO JESTE DA SAM SE JA PRERACUNAO U ODNOSU NA POMENUTE KORDINATE
//NAIME, NECE BITI TARGETOVAN, ELEMENT, NA KOJEM SU SE SLUCAJNO NASLE KOORDINATE
//MISLIM DA I NEMA NIKAKVOG SMISLA, JER SE VREDNOSTI OVIH KOORDINATA KORISTE, A NE DA ONE KORISTE NESTO NA STRANICI
//(OVO SU NEKA, MOJE, MOZDA, USTVARI NAJVEROVATNIJE, NEPOTREBNA ZAPAZANJA)

//POSTO SAM VIDEO STA SE STAMPALO U KONZOLI, NASTAVLJAM DALJE, TAKO STO CU SE POZABAVITI, KONKRETNO 
                                //CustomEvent               KLASOM, ODNOSNO KONSTRUKTOROM

//JER TU KLASU TREBAM DA KORISTIM, KADA INSTATICIRAM, MOJ CUSTOM EVENT
//
//KADA INSTATICIRAM CUSTOM EVENT, MOGU DODATI, JOS JEDA NPROPERTI, ONOM OPTIONS ARGUMENT OBJEKTU
//TAJ NOVI PROPERTI SE ZOVE
                        //              detail
                        //I NJEGOVA VREDNOST, TREBA DA BUDE OBJEKAT, KOJI MOZE DA IMA BILO KOJE
                        //CUSTOM INSFORMACIJE, KOJE ZELIM DA BUDU PROSLEDJENE ZAJEDNO SA EVENTOM, 
                        //U HANDLER

// TEHNICKI SE I MOZE BEZ OVOG PROPERTIJA, JER MOGU DA SE DEFINISU, BILO KOJI PROPERTIJI
//  SA ZELJENIM VREDNOSTIMA, SAMOM INSTATICIRANOM EVENT OBJEKTU
//  ALI, DA BI SE IZBEGLI, NEKI KONFLIKTI JE IPAK BOLJE TO URADITI SA detail  PROPERTIJEM,
//   PRILIKOM INSTANTICIRANJA,


const h1_u_html_u = `
    <h1 id="neki_h">Hello I'm Stavros</h1>
`;

const nekiCustom = new CustomEvent('hello', {
    detail: {
        ime: "Stavros"
    }
});

neki_h.addEventListener('hello', function(ev){
    console.log(ev.detail.ime);
});

neki_h.dispatchEvent(nekiCustom);



//SADA CU SE POZABAVITI         preventDefault      METODOM
//JASNO MI JE DA KADA IMAM CUSTOM EVENT, ODNOSNO EVENT GENERISAN SCRIPT-OM; DA BI PRIMENA POMENUTE
//METODE DALA "EFEKTA", EVENT MORA BITI INSTANTICIRAN SA   cancelable  KARAKTERISTIKOM, SA VREDNOSCU true
//                  cancelable: true        flag must be specified


// ALI KADA JA INSTANTICIRAM EVENT OBJEKAT, I DEFINISEM DA ON BUDE, NEKOG CUSTOM TIPA (KOJI NIJE BUILT-IN)
// (I DA BUDE CANCELABLE), POSTAVLJA SE PITANJE KAKVU TO DEFAULT AKCIJU, BROWSERA, PRIMENA preventDefault-A
// MOZE DA SPRECI? TO CU SHAVATITI KADA BUDEM KREIRAO PRIMER

//ALI KAKO DO, SAMOG EVENTA DOLAZI INFORMACIJA, DA JE ON PREVENTED, ODNOSNO DA JE CANCELED DEFAULT ACTION
            

            //I UZ POMOC POVRATNE VREDNOSTI     dispatchEvent       METODE
                        //AKO JE POVRATNA VREDNOST PRIMENE OVE METODE   true, EVENT    NIJE   canceled
                        //TO ZNACI DA NA NJEMU NIJE PRIMENJENA preventDefault METODA U OBIMU HANDLER-A

                        //AKO JE POVRATNA VREDNOST PRIMENE OVE METODE   false, EVENT     JESTE  canceled
                        //TO ZNACI DA NA NJEMU JESTE PRIMENJENA preventDefault METODA U OBIMU HANDLER-A

//MORAM NEKEKO DA UPAMTIM, DA KADA JE POVRATNA VREDNOST dispatchEvent METODE       false       TADA JE
//NAD EVENTOM, BILA PRIMENJENA preventDefault METODA

//ZATO CU URADITI, JEDAN PRIMER, KOJI CU JA KREIRATI, KOJI JE NESTO PROSTIJI
//PA CU URADITI PRIMER, KOJI JE U CLANKU, KOJI CITAM, JER JE TAJ PRIMER "NESTO SLOZENIJI"

//U PRIMERU CE UCESTVOVATI SLEDECI HTML

const html_za_trashing = `
    <h4 id="smece_header">Ovo nema veze sa grabage kolektorom</h4>
`;

//DAKLE INSTANTICIRACU, JEDAN   CustomEvent   ,KOJI CE BITI CANACELABLE

const trashEvent = new CustomEvent('trash', {cancelable: true});

//ZAKACICU EVENT HANDLER, ZA h4 ELEMENT, (ZA SLUCAJ EVENTA, TIPA 'trash')
//A U OBIMU HANDLERA CU SPRECITI DEFAULT ACTION

smece_header.addEventListener('trash', function(ev){
    console.log("Izbacile su se neke TRICE sa prozora sprata 26");
    ev.preventDefault();
});

//SADA CU DA DEFINISEM NEKI DEFAULT ACTION, KOJI BI SE IZVRSAVAO, ONDA KADA NA MOJOJ CustomEvent INSTANCI
//NIJE PREVENTED, TAJ DEFAULT ACTION; A KOJI SE NE BI IZVRSIO, KADA BI BIO PREVENTED

//U OVOM SLUCJU NECU KORISTITI POVRATNU VREDNOST dispatchEvent METODE, VEC CU KORISTITI cancelable GETTER

const isNotCanceled = smece_header.dispatchEvent(trashEvent);   //DAO SAM VARIJABLI OVAKVO IME JER JE
                                                                //AKO JE DEFAULT ACTION PREVENTED
                                                                //ONDA JE POVRATNA VREDNOST dispatchEvent 
                                                                //METODE, USTVARI false

if(isNotCanceled){
    console.log("POMIJE SU BACENE I SA SPRATA 48");  //A OVO JE DEFAULT ACTION
}                                              

//I ZAISTA SE NECE DOGODITI DEFAULT ACTION, JER JE PREVENTED; ALI TO IZGLEDA CUDNO, MAKAR SADA, AKO
//NE POZNAJEM ODREDJENE CINJENICE

//PRVO CU RECI, ZASTO IZGLEDA CUDNO
                
                //S OBZIROM DA ZNAM OD RANIJE, ODNOSNO ZNAM DA KADA SAM RANIJE KACIO HANDLERE NA
                //ELEMENTE, U SLUCAJU "BILT IN EVENT-OVA", ODNOSNO EVENTOVA, KOJI NISU CUSTOM
                //, HANDLERI SU BILI QUEUED I CEKALI SU "ISPRED EVENT LOOP-A", NA SVOJ TRIGGERING,
                // KOJI BI SE DESIO "NA NATURALNI NACIN" (BEZ UPOTREBE dispatchEvent METODE)

//UPRAVO KADA SAM TO SPOMENUO, IZGLEDA CUDNO DODELJIVANJE VARIJABLI     isNotCanceled
//I IZGLEDA CUDNO, KAKO SAM TU VREDNOST UPOTREBIO KAO USLOV, USLOVNE IZJAVE
// JER BEZ OBZIRA, KOJA JE POVRATNA VREDNOST I KAKO SE IZVRSILA         dispatchEvent       METODA
//JA ZNAM JEDNO

    //PA TA DODELA JESTE BLOCKING CODE
    //PA ZATIM I IF STATEMENT
    //STO ZNACI DA AKO SE JEDNOM TOJ VARIJABLI DODELI true, TO JESTE true, U CURRENT CALLING STACKU
    //A POSTO JE U ISTOM STACK-U I I IF IZJAVA, JA NE VIDIM, AKO SE HANDLER IZVRSAVA U NOVOM STACKU
    //DA TO IMA BILO KAKVOG UTICAJA NA CURRENT STACK


                //A IZGLEDA CUDNO AKO NE ZNAM JEDNU STVAR, A TO JE SLEDECE I VEOMA JE VAZNO

//      *************    HANDLER USTVARI NIJE QUEUED        ********************

//  I ZISTA JE TAKO
//  DAKLE HANDLER NIJE ZAVRSIO U QUEUE-U, I NIJE "CEKAO NA TRIGGERING" EVENTA NA TAJ NACIN
//  IZVRSIO SE ODMAH, NAKON POKRETANJA      dispatchEvent       METODE
//  A KAO STO ZNAM U HANDLERU JE POZVANA preventDefault METODA
//  DAJUCI NEOPHODNU INFORMACIJU EVENTU, A PREKO EVENTA I dispatchEvent METODI
//  KAKO BI SE DISPATCH EVENT METODA, POTOPUNO IZVRSILA SA      false       RETURNRED VREDNOSCU

//TEK ONDA, JER SAM TAKO DEFINISAO DEFAULT ACTION NIJE IZVRSEN, U ODNOSU NA TU POMENUTU RETURNED VREDNOST

//OVO ME NAVODI DA KAZEM DA U SLUCAJU DEFINISANJA TOG DEFAULT BEHAVIOURA, JA MORAM VODITI RACUNA
//GDE DEFINISEM DEFAULT BEHAVIOUR, ODNOSNO GDE DEFINISEM NJEGOVO POZIVANJE
//DAKLE ONO MORA BITI U ISTOM STACK-U, KAO I POZIVANJE      dispatchEvent       METODE

//MEDJUTIM, JAVLJA MI SE JOS JEDNA DILEMA, A KOJA GLASI

//          STA JE TO ODLUCILO DA SE HANDLER NE SALJE U QUEUE?
//
//  DA LI JE O TOME ODLUCILO PROSLEDJIVANJE STRINGA TIPA, CUSTOM EVENTA, POZIVANJU       addEventListener
//  METODE, ILI NESTO DRUGO?
//
//  NE MISLIM DA JE O TOME ODLUCIO dispatchEvent , JER ON VODI RACUNA O TRIGERING-U, BAR JA TAKO MISLIM
//  OVO MORAM PROVERITI, PUTEM PRIMERA

//NAIME, JA SAM U GORNJIM BELESKAMA NAPISAO DA addEventListener SALJE CALLBACK-OVE U QUEUE
//TO NAIME NIJE TACNO (AddEventListener IH SAMO REGISTRUJE);
// U QUEUE IH SALJE TRIGGERING SAMOG EVENTA (MORAM OPET DETALJNO PROCITATI
//CLANAK "MODEL KONKURENTNOSTI I EVENT LOOP", KAKO BI OPET BOLJE RAZUMEO SAM QUEUEING)
//ALI OVO NE MANJA PRICU VEZANU ZA dispatchEvent (ON JE SINHRON)


//ODNOSNO, PRIMENICU        dispatchEvent   METODU NAD ELEMENTOM, ZA KOJEG JE ZAKACEN HANDLER
//ALI U SLUCAJU BUILT IN TIPA EVENT, KAO STO JE 'click'

//HTML PRIMERA:

const htmlExample = `
    <p class="parag_neki">Neki paragraf blah</p>
`;

//INSTANCITIRACU, JEDNU       MouseEvent      INSTANCU

const neki_mouseEvent = new MouseEvent('click', {cancelable: true});

//PROVERICU DA LI JE, EVENT, ZAISTA CANCELABLE, A UZ TO MOGU PROVERITI I DA LI ON BUBBLES UP (IAKO OVO
//                                                                                            DRUGO NECE
//                                                                                            IMATI NEKU
//                                                                                           ULOGU U OVOM
//                                                                                               PRIMERU)

console.log(neki_mouseEvent.cancelable, neki_mouseEvent.bubbles);       //-->   true  false

//A MOGU I DA PROVERIM DA LI JE 
//VEC PRIMENJENA preventDefault METODA NAD EVENT-OM (NEMA SMISLA DA JESTE, JER ZNAM DA JE NISAM PRIMENIO OVDE
// ALI CISTO POKAZUJEM DA TO MOGU DA PROVERIM)
//NAIME, JA SAM TO I RANIJE RADIO, KORISTECI        defaultPrevented        PROPERTI

console.log(neki_mouseEvent.defaultPrevented);      //-->   false

//SADA CU ZAKACITI HANDLER, NA POMENUTI PARAGRAF (U SLUCAJU EVENTA, TIPA 'click'); U OBIMU DEFINISEM
//SPRECAVANJE DEFAULT ACTION-A

document.querySelector('.parag_neki').addEventListener('click', function(ev){
    console.log("NEKI TEKST, KOJI SE STAMPA BLAH...");
    
    console.log(ev.defaultPrevented);   //-->   false

    ev.preventDefault();
    
    console.log(ev.defaultPrevented);   //-->   true
});


//DEFINISACU NESTO STO CE SLUZITI KAO DEFAULT BEHAVIOUR

const nekiDefaultBehaviour = function(isNotPrevented){
    if(isNotPrevented !== false){
        alert("Neki default behaviour");
    }
};

//SADA CU DA TRIGGERUJEM neki_mouseEvent, UZ POMOC dispatchEvent METODE
//UZ TO "HVATAM" POVRATNU VREDNOST, dispatchEvent PRIMENE

const isNotPrevented = document.querySelector('.parag_neki').dispatchEvent(neki_mouseEvent);

//SADA CE TA POVRATNA VREDNOST DA ODLUCI, DA LI CE SE IZVRSITI DEFAULT ACTION, U ODNOSU NA TO, DA LI JE
//POZVAN-A preventDefault METODA, U OBIMU HANDLER-A

nekiDefaultBehaviour(isNotPrevented);

//DOBRO, JA SAM U OVOM SLUCAJU OPET PROVEZBAO TAJ "DISPATCHING", I SVE OSTALO STO DOLAZI UZ TO
//ALI ONO STO SAM ZELO DA VIDIM, ODNOSNO STO JE BILO PRESUDNO DA VIDIM JESTE, DA LI CE SE 
//EVENT HANDLER POSLATI NA QUEUE

//NECE

//DAKLE,
//BILO DA JE REC O INSTANTICIRANOM CustomEventu, ILI NEKOM DRUGOM (MouseEvent, Event..) 
//KADA SE NA ELEMENTU PRIMENI dispatchEvent METODA, POTPUNO JE SIGURNO (BAR JA TAKO MISLIM),
// DA CE SE HANDLER POZVATI, U SKLOPU IZVRSENJA dipatchEvent METODE, A KADA SE HANDLER IZVRSI
//dispatchEvent CE SE MOCI RETURNOVATI (DAKLE OVO JE SVE BLOCKING), JER NJEGOVA POVRATNA VREDNOST
//ZAVISI OD TOGA, DA LI SE U HANDLERU PRIMENILA preventDefault METODA

//A ZASTO SAM KORISTIO        defaultPrevented    TOKOM OVOG PRIMERA?

console.log(      neki_mouseEvent.defaultPrevented     );       //-->   true

//PITAM SE DA LI JE DOBRO DA UMESTO POVRATNE VREDNOSTI      dispatchEvent   METODE (KOJA SE 
//PRIMENJUJE NA ELEMENTU), KORISTIM, USTVARI VREDNOST          defaultPrevented    PROPERTIJA (NISAM 
//SIGURAN DA LI JE ON PROPERTI ILI GETTER; MISLI MDA JE IPAK PROPERTI), ZA ODLUCIVANJE, DA LI CE SE ILI
//ILI NECE (DAKLE KAO USLOV), EXECUTE-OVATI, NEKI DEFAULT BEHAVIOUR, ODNOSNO DEFAULT ACTION, KOJI SAM ZADAO
//ZA SADA CU NASTAVITI DALJE BEZ DODATNOG OBJASNJENJA; A DOBRO JE I DA SAM SE PODSETIO defaultPrevented-A 

//KREIRACU SADA JEDAN PRIMER, KOJI SAM VIDEO U CLANKU

//PRIME SE SASTOJI I OD pre TAGA, KOJI GOTOVO RANIJE NISAM KORISTIO
//ON NEMA NEKU BITNOST ZA OVAJ PRIMER, ALI DOBRO JE DA ZNAM NJEGOVE ODLIKE

//TAJ TAG JE IZMEDJU OSTALOG preSTILIZOVAN, ODNOSNO PRESTYLED SA SLEDECIM CSS PROPERTIJEM I SLEDECOM
//VREDNOSCU TOG CSS PROPERTIJA

//          whitespace: pre

//OVO ZNACI DA AKO BUDEM DEFINISAO HTML TAG, I AKO NJEGOV NESTED TEXT BUDEM IMAO KONTINUALNI (MOJE RECI) 
//WHITESPACE (VISE OD JEDNOG WHITESPACE-A) ILI AKO NESTED TEXT TAGA SASTOJI OD VISE REDOVA, ILI AKO 
//IMAM PRAZNIH REDOVA, U SLUCAJU VREDNOSTI POMENUTOG CSS PROPERTIJA, TAJ TEKST KADA BUDE RENDERED NA WEB
//STRANICI SE OCE SASTOJATI OD TIH PRAZNIH REDOVA I WHITESPACE-OVA

//ODNOSNO TEKST NECE BITI WRAPPED, KAKO BI SE NUTRALIZOVALA TA, NEPOTREBNA PRAZNA MESTA

//TEKST PARGRAFA 

const pragr = `

<p>Neki tekst     PARAGRAFA     je         ovo 

    ili on ide ovako          tako
  </p>

`;

//BI NAKO NRENDERINGA BIO WRAPPEDI BIO OVAKAV       Neki tekst PARAGRAFA je ovo ili on ide ovako tako     

//E TO SE NECE DOGODITI, U SLUCAJU      pre     TAGA

//DAKLE, SADA KRECEM SA PRIMEROM, TAKO STO CU PRVO KREIRATI JEDAN       pre     ELEMENT

const preElement = document.createElement('pre');

//TEKST, KOJI SAM REKAO DA SE NECE WRAPP-OVATI, MOGU DEFINISATI U TEMPLATE STRING-U (OVO RADIM ZBOG
//KORISNOSNE OSOBINE TEMPLATE STRING-A, KOJU NE MORAM POMINJATI)

const preText = `
    /\\_/\\_/\\
    |   Y   |
   ß\\  °  ° /ß
     |  ˘˘ |
    /  __   \\
    \\       /
     \\  ^^ /
      ¤¤¤¤¤¤
      {>°<}
`;

//MORAO SAM DA IMAM DVA BACKLASHA U STRINGU, DA BIH MOGAO DA SE RENDERUJE JEDAN NA STRANICI 

//NESTOVACU OVAJ TEKST U pre ELEMENT, KOJI CU ONDA ZAKACITI U DOM

preElement.textContent = preText;

document.querySelector('.kont_pre').appendChild(preElement);

//SADA MOGU NA STRANICI VIDETI RENDEROVAN "LIK" NA STRANICI, NAPRAVLJEN OD RAZNIH KARAKTERA

//A ONO STO, USTVARI ZELIM DA DEFINISEM JESTE DA POMENUTI ELEMENT SAKRIJE SA STRANICE, NAKON NEKOLIKO SEKUNDI
//POSLE RELOADA STRANICE; A DA OVAKVO PONASANJE BUDE DEFAULT ACTION, KOJI SE DOGADJA NAKON TRIGGER-INGA
//CUSTOM EVENTA

//NAIME, JA SAM INSTANTICIRANJE CUSTOM EVENTA, ZATIM NJEGOV DISPATCHING, ZAJEDNO SA DEFAULT ACTION-OM
//MOGAO DEFINISATI U OBIMU, JEDNE FUNKCIJE, OVAKO

const hide = function(){
    const hideEvent = new CustomEvent('hide', {cancelable: true});

    if(!preElement.dispatchEvent(hideEvent)){
        console.log("Default action prevented!");       //default action prevented
    }else{
        preElement.hidden = true;   //default actions
    }

}

//ZAKACICU HANDLER ZA pre ELEMENT (U SLUCAJU CUSTOM EVENTA, TIPA 'hide')

preElement.addEventListener('hide', function(ev){
    //MOGU DEFINISATI I confirm DIALOG, KOJI MI MOZE DATI OPCIJU DA SPRECIM ILI DOPUSTIM DEFAULT ACTION
    //ALI TO CE MI STALNO SMETATI, KADA NASTAVIM KODIRANJE U OVOM DOKUMENTU
    
    // if(confirm("Do you want to prevent default behaviour that will hide drawing?")){
    //     ev.preventDefault();
    // }
    
    //ev.preventDefault();
    
});

//POSTO SAM REKAO DA ZELIM DA SE ELEMENT SAKRIJE (ILI NE) NAKON NEKOLIKO SEKUNDI, TRIGGEROVACU CUSTOM 
//EVENT, NAKON NEKOLIKO SEKUNDI

setTimeout(function(){
    hide();
}, 4000);


//POSTO SAM ODRADIO OVAJ PRIMER, POZBAVICU SE JOS NEKIM PRIMERIMA, A KONKRETNO CU SE POZABAVITI JEDNIM
//PROBLEMOM, A TO JE
//****************************************************************************
//TRIGGEROVANJE CUSTOM EVENT-OVA, U OBIMAIMA HANDLERA, KOJE SAM ZAKACIO ZA ELEMENT, KAKO BI SE POMENUTI
//(U SLUCAJU NEKOG BUILT IN EVENTA)

//ODNOSNO ONO STO POSMATRAM OVDE JESTE OPET TA ASINHRONOST KOJU DOVODI TRIGGEROVANJE BUILT IN EVENTOVA, I
//SINHRONOST dispatchEvent METODE

//JA SAM SE TIME BAVIO U PREDHODNIM PRIMERIMA, ALI IPAK CU URADITI, JOS NEKOLIKO PRIMERA

//NECU DAVATI DODATNE KOMENTARE ZA SLEDECE PRIMERE, U CILJU USTEDE VREMENA

const neki_menu_html = `
    <button id="some_menu">Menu</button>
`;

some_menu.addEventListener("click", function(){
    console.log(400000);

    some_menu.dispatchEvent(new CustomEvent('menu-open', {//ZAPAMTI, OVO JE
                                                            //BLOCKING 
        bubbles: true                                       //DAKLE "U SKLOPU OVOGA" (dispatchEvent IZVRSENJA)
                                                            // SE IZVRSA DONJI
    }));                                                    //HANDLER SINHRONO
    //DAKLE POKRENUO SE dispatchEvent, PA HANDLER, KOJI SAM DOLE ZAKACIO, PA SE IZVRSAVA HANDLER
    //PA NA OSNOVU TOGA     dispatchEvent   MOZE DA RETURN-UJE VREDNOST
    //TEK ONDA SE IZVRSAVA DALJI CODE, U OBIMU OVOG HANDLER-A, U KOJEM PISEM OVAJ KOMENTAR

    console.log(800000);                                                        
});

document.addEventListener('menu-open', function(ev){
    console.log(50000);
});

//DAKLE TREBALO BI DA SE STAMPA OVIM REDOSLEDOM

400000
50000
800000

//KLINUCU NA DUGME I PROVERITI U KONZOLI PROVERICU TO  U KONZOLI

//I DA KAD SAM PROVERIO, VIDIM DA JE ZAISTA TAKO

//POMENUTU SITUACIJU BIH MOGAO POPRAVITI TAKO STO BIH DISPATCHING DEFINISAO U OBIMU CALLBACK-A then METODE
//Promise-OVOG PROTOTIPA, ILI U OBIMU HANDLER-A setTimeout METODE

const neki_menu_html2 = `
    <button id="some_menu2">Menu</button>
`;

some_menu2.addEventListener("click", function(){
    console.log(400000);

    new Promise((res, rej) => {
        res();
    })
    .then(function(){
        some_menu2.dispatchEvent(new CustomEvent('menu-openaru', {                                                            
            bubbles: true
        }));                                                    
    });

    console.log(800000);                                                        
});

document.addEventListener('menu-openaru', function(ev){
    console.log(50000);
});

//DAKLE TREBALO BI DA SE STAMPA OVIM REDOSLEDOM

400000
800000
50000

//VIDIM I JESTE TAKO, NAKON STO SAM KLIKNUO NA DUGME I PROVERIO U KONZOLI

//NAKON OVE PRICE O CUSTOM EVENTOVIMA, PRKOPIRACU JOS JEDNU RECENICU IZ CLANKA

    //We shouldn’t generate browser events as it’s a hacky way to run handlers. 
    //That’s a bad architecture most of the time.

////////////////////////////////////////////////////////////////////////////////////////////
//              OSNOVE      MOUSE EVENT-OVA
//
//MOUSE EVENTOVI NE DOLAZE SAMO OD "MOUSE MANIPULATORS"-A, VEC SU TAKODJE EMULATED NA TOUCH UREDJAJIMA
//
//      TIPOVI MOUSE EVENT-OVA
//MOUSE EVENT-OVI SE MOGU PODELITI U DVE KATEGORIJE:
//              'simple'            'complex'

//                  SIMPLE EVENT-OVI SU:
//
//      mousedown/mouseup       MOUSE DUGME JE KLIKNUTO/PUSTENO NA ELEMENTU
//
//      mouseover/mouseout      POINTER MOUSE-A JE USAO/IZASAO U/IZ OBLAST/OBLASTI ELEMENTA
//
//      mousemove               SVAKO POMERANJE POINTERA MISA, PREKO ELEMENTA, TRIGGERUJE OVAJ EVENT
//
//POSTOJI JOS DRUGIH TIPOVA EVENTOVA, KOJIMA CU SE POZABAVITI KASNIJE

//                  COMPLEX EVENT-OVI SU:
//
//      click           TRIGGER-UJE SE NAKON  STO SU SE   mousedown  I mouseup   TRIGGER-OVALI NA ELEMENTU 
//                      (ALI VAZI SAMO ZA TRIGGERINGU NA LEVOM DUGMETU MISA)                      

//      contextmenu     TRIGGER-UJE SE NAKON STO SE TRIGGEROVAO mousedown NA DESNOM DUGMETU MISA 
//                      (ALI VAZI SAMO ZA TRIGGERINGU NA LEVOM DESNOM MISA)                          

//      dblclick        TRIGGER-UJE SE NAKON DUPLOG click TRIGGERING-A NA ELEMENT-U
//                      ALI (BAR JA TAKO MISLIM, ODNOSNO NA OSNOVU TESTA U CLANKU), NE SME PROCI
//                      VISE OD JEDNE SEKUNDE OD TRIGGERINGA PRVOG clicka DO TRIGGERING-A DRUGOG click-A,
//                      DA BI SE TRIGGER-OVAO
//                      (ALI VAZI SAMO ZA TRIGGERINGU NA LEVOM DUGMETU MISA)




//DAKLE KOMPLEKSNI EVENT-OVI SU SAGRADJENI OD ONIH SIMPLE ELEMENATA, TAKO DA SE TEORETSKI GLEDANO, MOZE
//I BEZ NJIH; ALI KOPLEKSNI EVENT-OVI, IPAK POSTOJE, I TO JE DOBRO, ZATO STO SU CONVINIENT


//          EVENTS ORDER       (REDOSLED EVENT-OVA)

//NAIME JEDNO DELOVANJE, ODNOSNO AKCIJA, MOZE TRIGGER-OVATI VISE EVENT-OVA
//DAKLE, AKO POSMATRAM  KLIK
//ON PRVO TRIGGER-UJE    mousedown    KADA JE DUGME PRITISNUTO; PA   mouseup    I   click   KADA SE DUGME
// PUSTI
//DAKLE KADA JEDNA AKCIJA INSTANTICIRA VISE EVENT-OVA, NJIHOV REDOSLED JESTE FIKSIRAN
//STO ZNACI DA SU HANDLERI QUEUED, REDOSLEDOM, KOJI VEZAN ZA SLEDECI REDOSLED EVENTOVA
//U SLUCAJU EVENTOVA KOJE SAM NAVEO HANDLERI SE SALJU OVIM REDOSLEDOM U QUEUE, KOJI ODGOVARA REDOSLEDU
//SLEDECEG TRIGGERING-A EVENT-OVA
//
//          mousedown   -->     mouseup     -->     click


//     POSTO JE SVAKO DUGME NUMERISANO, NJEGOVOM KARAKTERISTICNOM BROJ USE MOZE PRISTUPITI
//              PUTEM           which           PROPERTIJA, ALI TO ZNAM I OD RANIJE
//
//POSTO SAM RANIJE REKAO DA     click          SE MOZE TRIGGEROVATI SAMO LEVIM DUGMETOM MISA, I POSTO SAM
//REKAO DA                      contextmenu    MOZE TRIGGEROVATI SAMO DESNIM DUGMETOM
//U CLANKU JE IZVEDEN ZAKLJUCAK DA ONDA NEMA SMISLA PRATITI which ZA TE KOMPLEKSNE EVENTOVE

//ALI DRUGACIJA JE SITUCIJA TRACKING-OM which PROPERTIJA ZA     mousedown   I    mouseup         
//JER SE ONI MOGU TRIGGEROVATI
//KORISCENJEM SVA TRI DUGMETA MISA
//                                  ev.which === 1          LEVO DUGME
//                                  ev.which === 2          SREDNJE DUGME
//                                  ev.which === 3          DESNO DUGME

//KAZU DA JE SREDNJE DUGME EGZOTICNO I DA SE RETKO KORISTI

        

            //          MODIFIERS:           shift           alt         ctrl        meta

//ZASTO SPOMINJEM TU DUGMAD, KOJA SU NA TASTATURI?

//PA ZATO STO SVAKI MOUSE EVENT NOSI I INFORMACIJU, DA LI JE TOKOM TRIGGERING-A TIH EVENTOVA
//BIO PRITISNUT I NEKI MODIFIER

//TU INFORMACIJU NOSE SLEDECI PROPERTIJI    MouseEvent  INSTANCE:

//      shiftKey        altKey      ctrlKey         metaKey (Cmd U SLUCAJU Mac-A)

/* Pažnja: na Mac-u je obično Cmd umesto Ctrl
Na Vindovs i Linuk postoje modifikacioni tasteri Alt, Shift i Ctrl. Na Mac-u postoji još jedan: 
Cmd, odgovara               metaKey                 PROPERTIJU

U većini slučajeva kada Vindovs / Linuk koristi Ctrl, na Mac-u ljudi koriste Cmd. Dakle, 
kada korisnik Vindovs pritisne Ctrl + Enter ili Ctrl + A, Mac korisnik bi pritiskao 
Cmd + Enter ili Cmd + A i tako dalje, većina aplikacija koristi Cmd umesto Ctrl.

Dakle, ako želimo da podržimo kombinacije poput Ctrl + click, onda za Mac ima smisla koristiti 
Cmd + klik. To je udobnije za Mac korisnike.

Čak i ako želimo da primoramo Mac korisnike da pritisnu Ctrl + klik - to je malo teško. 
Problem je: levi klik sa Ctrlom se tumači kao desnim klikom na Mac i generiše događaj contextmenu, 
a ne klik na Vindovs / Linuk.

Dakle, ako želimo da korisnici svih operativnih sistema budu ugodni, onda zajedno sa ctrlKei trebamo 
koristiti metaKei.

Za JS-kod to znači da treba proveriti SLEDECE               (event.ctrlKey || event.metaKey)
*/
/* Kombinacije tastature su dobre kao dodatak radnom toku. Tako da ako posetioc ima tastaturu - it works. 
I ako vaš uređaj nema - onda postoji i drugi način da se to isto uradi.
*/

//URADICU I JEDAN PRIMER, U KOJEM CE UCESTVOVATI, NEKI OD POMENUTIH MODIFIER PROPERTIJA

const html_dugme_blah = `
    <button id="dugme_neko">Alt + Shift + Click Me!</button>
`;

dugme_neko.addEventListener('click', function(ev){
    if(ev.altKey && ev.shiftKey){
        console.log("Blah blah blah blah blah blah");
    }
});


//          KOORDINATE:             clientX    clientY                  pageX     pageY
//
//  SVI MOUSE EVENTOVI IMAJU KORDINATE, KOJE DOLAZE SA DVA FLAVOURA
//
//     1)  RELATIVNE SA     Window:         clientX         clientY         
//
//     2)  RELATIVNE SA     Document:       pageX           pageY
//
//  MISLIM DA JE SUVISNO KOMENTARISANJE, O OVIM KOORDINATAMA, JER SAM SE SANJIMA SUSRETAO, RANIJE,
//  POPRILICNO JE SUGESTIVNO  TO STO SAM NAVEE "U ODNOSU NA WINDOW I U ODNOSU NA DOCUMENT"
  
//GDE SE NALAZE KOORDINATNI POCECI U OBA SLUCAJA, POPRILICNO JE JASNO DA JE TO GORNJI LEVI UGAO
//MEDJUTIM U JEDNOM SLUCAJU TAJ KOORINATNI POCETAK "SE POMERA", A U DRUGOM NE


// NAIME, U SLUCAJU          clientX       I       clientY           KOORDINATNI POCETAK SE UVERK NALAZI
// U GORNJEM LEVOM UGLU, I NIKAD SE NE POMERA
//ODNOSNO, KOLIKO GOD DA SCROLL-UJEM STRANICU, ODNOSNO, MA KOJI DEO STRANICE, JA PREGLEDAO, MOCI CU
//I AKO KLIKNEM NA      NEKI DEO TE STRANICE, DUZINE DO KOORDINATE KLIKE CE BITI MERENE OD NJEGA PA
//DO GORNJE STRANE BRWOWSEROWOG WINDOW-A (Window    INSTANCE) (ODNOSNO TO JE window) PA DO MESTA KLIKA
//I OD LEVE IVICE window-A, PA DO MESTA, ODNOSNO TACKE KLIKA

//TAKAV SLUCAJ NIJE SA      pageX       I       pageY
//JER TAMO, KOORDINATNI POCETAK NEMA VEZA SA Window-OM, VEC SA POCETKOM STRANICE, TAKO DA AKO MOJA
//STRANICA JESTE POPRILICNO DUGACKA, I AKO SAM SCROLLOVAO POPRILICNO,   pageY   CE BITI JAKO VELIKI BROJ
//JER PREDSTAVLJA RAZDALJINU IZMEDJU TRENUTNOG MESTA NA KOJE SAM KLIKNUO (NA PRIMER NEKI 58MI PARAGRAF)
// I GORNJE IVICE MOJE STRANICE (MOJA STRANICA JE       document)
//ISTO JE I U SLUCAJU     pageX       SAMO STO SE TU RADI O DUZINI IZMEDJU TACKE KLIKA ILEVE IVICE STRANE
//AKO DOPUSTIM DA IMAM TAKVU STRANICU, ODNOSNO DA JE MOGUC I NJEN HORIZONTALNI SCROLL 
//("DESICE SE DA KOORDINATNI POCETAK BUDE IZVAN MOG EKRANA")

//A STA AKO IMAM iframe ELEMENT?
//PA TADA SU KOORDINATE RELATIVNE SA TIM iframe-OM, A NE MOJOM STRANICOM (NARAVNO, DOK VRSIM "MOUSE
//INTERAKCIJU" U TOM IFRAME ELEMENTU)

//MOGU OPET KREIRATI JEDAN PRIMER

const input_element_html = `
    <input 
        class="text_oblast" 
        style="width: 580px; height: 348px;"
        type="textarea"
        value="Pomeraj kursor preko mene"
    >
`;

document.querySelector('.text_oblast').addEventListener('mousemove', function(ev){
    
    const pageKoordinate = `x: ${ev.pageX}, y: ${ev.pageY}`;
    const clientKoordinate = `x: ${ev.clientX}, y: ${ev.clientY}`;

    const value = `
    page coordinates: ${pageKoordinate}   ¤¤¤¤   client coordinates: ${clientKoordinate}
    `;

    ev.target.value = value;
});

//SADA POMERAJUCI KURSOR PREKO INPUT-A, MOGU VIDETI KAKO SE MENJAJU VREDNOSTI ZA KOORDINATE, U VREDNOSTI
//INPUT ELEMENTA

//OVO SAM SAMO DODAO DA NESTO DRUGO BUDE VREDNOST INPUTA, KADA KURSOROM IZADJEM IZ TEXTAREA-A
document.querySelector('.text_oblast').addEventListener('mouseout', function(ev){
    ev.target.value = "pomeraj kursor preko mene!"
});


/////NASTAVLJAM DFALJE TAKO STO CU RECI SLEDECE

            //          KADA TRIGGERUJEM    dblclick    NA NEKOM TEKST, TAJ TEKST CE BITI SELEKTOVAN

//POMENUTA STVAR MOZE BITI VEOMA DISTURBING; ODNOSNO AKO JA ZELIM DA "RUKUJEM PONASANJEM" EVENT-OVA, OVA
//"EXTRA" SELEKCIJA NE IZGLEDA DOBRO
//
//KREIRACU PRIMER, JEDAN PRIMER GDE CE BITI POKAZANO TO SELEKTOVANJE, PA CU ZATIM POGLEDATI I NACINE
//KAKO BIH MOGAO PREVAZICI TAKVU SITUACIJU

const neki_b_tag = `
    <b class="neki_b">Klikni me duplo</b>
`;

document.querySelector('.neki_b').addEventListener('dblclick', function(ev){
    console.log('desio se double click');
});

//SADA, KADA DOUBLE KLIKNEM NA TEKST, ONA REC NA KOJU SAM KLIKNUO CE SE SELECTOVATI, I TO ZAJEDNO SA
//WHITESPACE-OM, OKO NJE

//POSTOJI CSS NACIN, KOJIM MOGU ZAUSTAVITI SELEKTOVANJE

//TO SE, NAIME POSTIZE          user-select         CSS PROPERTIJEM, KADA MU DODELIM VREDNOST       none

//POKAZACU I TO SLEDECIM PRIMEROM

const htmlMogTeksta = `
    <p>
        Ovo je neki, podebljani
        <b class="unselectable">Unselectable tekst</b>
        , koji je poprilicno tekstualan
    </p>
`;

const cssZaUnselectable = `
    .unselectable {
        -webkit-user-select: none;          /*POSTO GA VECINA BROWSERA PODRZAVA SA PREFIKSIMA*/
        -moz-user-select: none;             /* DODAO SAM OVE PREFIKSE */
        -ms-user-select: none;
        user-select: none;
    }
`;

//I UPALILO JE KADA DOUBLE KLIKNEM NA ONO STO OBUHVAT b; ZAISTA SE TEKST NIJE SELEKTOVAO

//MEDJUTIM, OVO JE POTENCIJALNI PROBLEM, JER JE, POMENUTI TEKST, POSTAO TRULY UNSELECTABLE; NAKON STO
//SELEKTUJEM CEO PARAGRAF VIDECU DA JE SVE IZ PARAGRAFA SELEKTOVANO, OSIM ONOGA STO OBUHVATA b ELEMENT
//I KADA KOPIRAM TU SELEKCIJU, PA JE PROSLEDIM NA NEKO MESTO, VIDECU DA U ONOME STO JE PROSLEDJENO NECE
//BITI ONO STO JE PRIPADALO b ELEMENTU; DAKLE, b JE POSTALO TRULY UNSELECTABLE

//A DA LI STVARNO ZELI MDA BUDE TAKO?

//NAIME, U VECINI SLUCAJEVA JA TO NE ZELIM; JER KORISNIK MOZE IMATI VALIDNE RAZLOGE DA PREKOPIRA MOJ
//TEKST

//TAKO DA PREDHODNO CSS RESENJE, I NIJE TAKO DOBRO RESENJE

//DOBRO DA NASTAVIM SA TRAZENJEM BOLJEG RESENJA

//NAIME, POMENUTO SELEKTOVANJE TEKSTA JESTE, DEFAULT BEHAVIOUR; ODNOSNO DEFAULT ACTION JEDNOG EVENT-A
//A TO JE           mousedown

        //MOZDA JE VAZNO DA PONOVO TESTIRAM mousedown EVENT I POGLEDAM DEFAULT AKCIJE, KOJE SE TADA
        //EXECUTE-UJU
                ////////////////////////////////////////////////////////////////////
//  1)   DAKLE AKO PRITISNEM LEVI TASTER MISA TRIGGEROVAO SAM      mousedown       EVENT, I AKO NE PUSTIM,
//POMENUTI TASTER, I AKO NASTAVIM DA POMERAM KURSOR VIDECU DA SE TEKST SELEKTUJE NA STRANICI;(DOBRO JE DA
//UOCIM DA JE MOJE POMERANJE KURSORA, USTVARI mousemove EVENT)
//TAKO DA MOGU DA ZAKLJUCIM DA JE OVO NEKI DEFAULT ACTION NASTAO KADA SAM VEZAO TRIGGEROVANJE 
//      mousedown-A   I  TRIGGEROVANJE      mousemove-A  (BAR JA TAKO MISLIM)
//ONO STO JA MISLIM, JESTE DA JE TO DEFAULT ACTION NASTAO USLED mousemove TRIGGERINGA

//  2)  A AKO KRENEM SA DOUBLE KLIKOM; ODNOSNO AKO TRIGGERUJEM      mousedown   I PUSTIM (CIME SE 
//TRIGERRUJE mouseup) PA NAKON NJEGA click, I AKO NE CEKAM DA PRODJE SEKUND I OPET KLIKNEM 
// LEVI TASTER MISA, OPET CE SE TRIGGEROVATI   mousedown
//U OVOM TRENUTKU IZVRSICE SE DEFAULT ACTION (POSLEDICA TOG DRUGOG mousedown EVENTA), CIME CE SE
//SELEKTOVATI TRENUTNA REC NA KOJU SAM KLIKNUO (ZAJEDNO SA WHITESPACE-OM)
//PUSTAM TASTER, I TADA JE TRIGGEROWAN mouseup, NAKON KOGA JE ODMAH TRIGGEROVAN   click, PA ONDA     
//  dblclick

//DAKLE, IMAM DVA SLUCAJA, U KOJIMA SE JAVLJA DEFAULT BEHAVIOUR; POSTO U PRVOM BAS NISAM SIGURAN, CIJI JE
//TO DEFAULT BEHAVIOUR, ODRADICU JEDAN PRIMER

//ALI POSLE OVOG PRIMERA URADICU I JEDAN ZA DRUGI SLUCAJ

const neki_paragraf_html = `
    <div class="neki_kontejner1" 
    style="border: pink solid 2px; width: 380px; height: 180px; text-align: center; padding: 58px">    
        <p>
            This is ayohuasca dmt drink from the region of Amazon, and it solves mental problems.
        </p>
    </div>
`;

//ZASTO SAM GORNJI PARAGRAF STAVIO U PREVELIKI CONTAINER ELEMENT I CENTRIRAO GA NA SREDINU, POSTACE MI
//JASNO KASNIJE KADA BUDEM VRSIO TRIGGERING     mousedown-A     I      mouseover-A

const nekiKontejner1 = document.querySelector('.neki_kontejner1');

//KACIM HANDLER NA PARAGRAF, ZA SLUCAJ      mousedown       EVENT-A

nekiKontejner1.querySelector('p').addEventListener('mousedown', function(ev){
    console.log('mousedown TRRIGERED');
});

nekiKontejner1.addEventListener('mousemove', function(ev){
    console.log('mousemove TRRIGERED');
    ev.preventDefault();

    console.log(ev.bubbles);
});

//STA CE SE SADA DOGODITI KADA  TRIGGERUJEM  mousedown NA TEKSTU PARAGRAFA (ALI NE SMEM DA PUSTIM TASTER
//DAKLE NE SMEM DA TRIGGER-UJEM mouseup); I POCINJEM POMERANJE KURSORA, PRVO PREKO PARAGRAFA, PA PREKO
//NJEGOVOG CONTAINERA; I ZAISTA PRI TOME SE NIJE DOGODIO DEFAULT ACTION, ODNOSNO, NIJE SE IZVRSILA
//SELEKCIJA TEKSTA; MEDJUTIM POSTO JA I DALJE POMERAM MIS, I IZLAZIM I PREKO GRANICA KONTEJNERA

//CIM SAM IZASAO IZ GRANICA KONTEJNERA TEKST SE SELEKTOVAO OD ONOG MESTA GDE SAM POCEO  mouseover
//DAKLE U CONTAINERU BIO JE SPRECEN DEFAULT ACTION      mouseover EVENT-A; A POSTO SE OVAJ EVENT ZAISTA
//RAZMNOZAVA (PROPAGATE), NJEGOV DEFAULT BEHAVIOUR JE SPRECEN I KADA STIZE DO PARAGRAFA

//MEDJUTIM IZVAN CONTAINERA, TRIGGEROVAN JE mouseover  EVENT, KOJI SE NE RAZMNOZAVA DO, 
//POMENUTOG KONTEJNERA (U KOJEM JE PARAGRAF), CIJI DEFAULT
//BEHAVIOUR NIJE SPRECEN (NEMA KONTEJNERA, ZA KOJI JE SPRECEN DEFAULT ACTION)
//I ZATO, POSTO PRE PRELASKA GRANICE, NISAM PUSTIO TASTER MISA, TEKST JE 
//SELEKTOVAN I AKO SADA PUSTIM TASTER MISA, TEKST CE OSTATI SELEKTOVAN

//DOBRO, POSTO SAM SAZNAO DA JE U OVOM SLUCAJU DEFAULT BEHAVIO DOSAO OD mouseover-A
//POZABAVICU SE POMENUTIM DRUGIM SLUCAJEM U KOJEM JE EVIDENTNO DA PRILIKOM DOUBLE KLIKA NA
//TEKST, ONAJ DRUGI PO REDU         mousedown       IZAZIVA DEFAULT ACTION, KOJIM SE SELEKTUJE
//REC I WHITESPACE OKO NJE

//DAKLE, KREIRAM NOVI PRIMER, NOVI PARAGRAF, I U NJEMU NESTED NOVI b ELEMENT

const html_paragraf2 = `
    <p class="neki-paragraf2">
        Ovo je neki tekst o necemu, opisuje kako ovo i ono
        <b>Klikni na neku od podebljanih reci</b>
        Jer bo se bum se i tulumbe blah
    </p>
`;

const noviParagraf2 = document.querySelector('.neki-paragraf2');

//ZAKACICU HANDLER NA PARAGRAF (ZA SLUCAJ dblclik EVENT-A)

noviParagraf2.addEventListener('dblclick', function(ev){
    console.log('DUPLI KLIK SE DESIO');
});

//SADA CU ZAKACITI HANDLER NA b ELEMENT (ZA SLUCAJ   mousedown   EVENT-A);
//A U OBIMU TOG HANDLERA CU SPRECITI DEFAULT ACTION KOJI mousedown IZAZIVA

noviParagraf2.querySelector('b').addEventListener('mousedown', function(ev){
    console.log('mousedown TRIGGEROVAN');
    ev.preventDefault();
});

//ITERPRETIRACU STA SE DOGODILO TOKOM DUPLOG KLIKA
//PRVO JE TRIGGER-OVAN  mousedown (NA KOJEM JE PRIMENJENA preventDefault METODA, ALI TAJ mousedown MI 
//NIJE BITAN); ZATIM SE TRIGGEROVAO mouseup, PA click, PA SE NAKON TOGA TRIGGEROVAO NOVI mousedown EVENT,
//CIJI DEFAULT ACTION JESTE SPRECEN, STO MI JESTE BITNO, ODNOSNO, SPRECENO JE DA SE SELEKTUJE TEKST b
//ELEMENTA; I ONO STO CE DALJE BITI TRIGGEROVANO MI NIJE VISE BITNO ZA OVAJ PRIMER

//DAKLE SADA SAM PUSTIO TASTERE; I UDAHNUCU I IZDAHNUTI NA PAR SEKUNDI

//ZATIM CU URADITI JOS NESTO, I MISLIM DA CE MI OVO BITI BITNO
//TRIGGEROVACU mousedown NA TEKSTU, PA CU POKUSATI DA GA PREVUCEM, ODNOSNO TRIGGEROVACU I mousemove 
//TEKST SE NECE PREVUCI MA GDE POMERAO KURSOR MISA, IZVAN b ELEMENTA, NISTA NECE OMOGUCITI NJEGOV SELECT

//OVO ZNACI DA SAM JA PREVENTUJUCI DEFAULT PONASANJE mousedown-A, SPRECIO, I ONO STO BIH SPRECIO DA SAM
//PREVENTOVAO DEFAULT ACTION    mousemove-A (A ZNAM DA U OVOM PRIMERU NISAM PREVENTOVAO DEFAULT ACTION
//MOUSEMOVE-A)

//OVO ME DOVODI NA SLEDECI ZAKLJUCAK

        //PRILIKOM TRIGGERINGA NA TEKSTU     mousedown   NAKON KOJEG SLEDI      mousemove
        //IZAZIVAJU DEFAULT ACTION SELEKTOVANJA TEKSTA
        //BILO NA KOJEM OD NJIH DA PRIMENIM preventDefault, SPRECIO SAM DEFAULT PONASANJE BROWSER-A

        //ALI AKO SE DOGADJA KOMPLEKSNI EVENT, A TO JE dblclick, TADA SAMO IMA SMISLA DA SE SPRECI
        //DEFAULT ACTION mousedown EVENTA (U OVOM SLUCAJU NEMA TRIGGERINGA mousemove-A, STO MISLIM DA
        //JE SASVIM JASNO)

//MEDJUTIM
//SADA CU TRIGGEROVATI mousedown NA DELU TEKSTA PARAGRAFA, KOJI NE PRIPADA b ELEMENTU, TRIGGEROVACU
//      mousemove       EVENT POMERANJEM KURSORA; KOJI CU POMERITI I PREKO TEKSTA b ELEMENTA, I GLE
//"CUDA", PORED TOGA STO SE SELEKTOVAO I DEO PARAGRAFA, KOJI NE PRIPADA b, SELEKTOVALO SE I ONOLIKO
// TEKSTA b ELEMENTA, DA KOJEG SAM STIGAO KURSOROM

//ZASTO SE OVO DOGODILO?

//PA mousedown JE TRIGGEROVAN TAMO GDE NIJE SPRECEN NJEGOV DEFAULT ACTION, I DALJIM TRIGGERINGOM
//mousemove EVENTA, PREKO ONOG ELEMENTA, GDE TAKODJE NIJE SPRECEN DEFAULT ACTION, DOGODIO SE POMENUTI
//DEFAULT ACTION

//POKUSACU DA SPRECIM I TO TAKO STO CU PRIMENITI preventDefault METODU NAD mousemove EVENT-OM, KOJI SE 
// TRIGGER-UJE NA b ELEMENTU

noviParagraf2.querySelector('b').addEventListener('mousemove', function(ev){
    console.log("MOVING ACROSS b");
    ev.preventDefault();            //NEMA NIKAKVOG EFEKTA
});

//OVO NIJE IMALO SMISLA; ODNOSNO TEKST SE IDALJE SELKTUJE KADA TRIGGERUJEM mousedown IZVAN b,
//PA KADA TRIGGERUJEM  mousemove, I NASTAVIM NJEGOVO TRIGGEROVANJE I PREKO b, TEKST b-A, CE SE OPET
//SELEKTOVATI

//ZASTO TO?

//PA PO MOM MISLJENJU ZATO STO JE SPRECAVANJE DEFAULT ACTIONA, JEDINO MOGUCE KADA SE NA ISTOM 
// ELEMENTU TRIGGERUJE PRVO mousedown PA mousemove

//MORAM OVO DODATNO ISPITATI; ILI JE PREDHODNA RECENICA SASVIM DOVOLJNO OBJASNJEJE, U SLUCAJU OVAKVE
// SITUACIJE; NISAM SIGURAN

//MOZDA ZATO STO U OVOM SLUCAJU NISAM IMAO PROPAGATION mousedown NA ELEMENTU, NA KOJEM JE POSTOJAO
//PROPAGATION mousemove-A

//ISPITACU OVO IPAK DODATNO, JER MISLIM DA MI NESTO PROMICE U OVOM SLUCAJU

//NAIME, SADA CU POKAZATI JOS DVE STVARI; A TO SU

                //SPRECAVANJE SAME SELEKCIJE, POST-FACTUM (NAKON STO SE SELEKCIJA DOGODILA)
                //ILI UPROSTENO RECENO, VRACANJE SELEKCIJE NA NULTU TACKU

                //SPRECAVANJE KOPIRANJA TEKSTA

//OPET CU KREIRATI NOVI PRIMER, KOJI CE SE SASTOJATI OD JEDNOG PARAGRAFA, JEDNOG NESTED b 
//ELEMENATA U TOM PARAGRAFU; I JEDNOG NESTED i ELEMENTA U TOM PARAGRAFU

const nekiParagraf_markup = `
    <div style="border: pink solid 2px; padding: 38px;">
        Ovo je neki tekst pre paragrafa.
        <p class="paragraf_elem">
            Ovo je, neki tekst paragrafa, koji je sastavljen od reci i sledi neki
            <b>tekst, koji je veoma podebljan</b>,
            a nakon pomenutog teksta, seledi jedan tekst,
            <i>koji je, iznimno italijanski namesten</i>,
            i koji objasnjava, ama bas nista.
        </p>
        A ovo je neki tekst posle paragrafa.
    </div>
`;

//TEK CE MI KASNIJE BITI JASNO, ZASTO SAM U OVOM SLUCAJU DEFINISAO, DA PARAGRAF BUDE U JEDNOM
//KONTEJNERU, U KOJEM SU MU SIBLINGS-I NEKI TEXT NODE ELEMENTI (ALI IPAK KADA SAM VIDEO REZULTATE
//NA KRAJU PRIMERA, SHVATIO SAM DA JE OVO BILO SUVISNO)

const paragraf_Element = document.querySelector('.paragraf_elem');

//PRE NEGO STO SE POZABAVIM KAKO TO DA POST-FACTUM "NEUTRALIZUJEM" SELEKCIJU, MORAM RECI STA CU TOM
//PRILIKOM KORISTITI

//NAIME U TOM SLUCAJU SE KORISTI        window.getSelection       METODA, CIJA POVRATNA VREDNOST JESTE
//      Selection       INSTANCA

//POMENUTA INSTANCA IMA SVE PODATKE, O ONOME STA JE TRENUTNO SELEKTOVANO NA STRANICI
//I DAJE MNOGO INFORMACIJA O TOME U KOM JE ELEMENTU POCELA SELEKCIJA, ODNOSNO REFERENCIRA
//ELEMENT U KOJEM JE POCELA SELEKCIJA (anchorNode), ZATIM ONAJ U KOJEM SE ZAVRSILA SELEKCIJA (focusNode)
//ZA OSTALE PROPERTIJE NEKI KAZU DA SU DUPLIKATI (ODNOSNO REFERENCIRAJU OVE, ISTE NODE-OVE)
//ODNOSNO ZBOG NAMINGA, KOJI JE BIO RAZLICIT OD BROWSERA DO BROWSERA, U ODREDJENIM BROWSER-IMA JE
//ZADRZANI I ADDITIONAL PROPERTIJI...

// A user may make a selection from left to right (in document order) or right to left 
// (reverse of document order). The anchor is where the user began the selection and the focus 


//MEDJUTIM NECU ULAZITI DUBOKO U OBJASNJAVANE OVOG OBJEKTA, JER BI SE TEK TREBAO SA NJIM UPOZNATI
//PRECIZNIJE, AKO ZA TO BUDE BILO POTREBE

//JEDINO CU DODATI, DA Selection INSTANCA IMA MOGUCNOST DA SE ONO STO JE SELEKTOVANO, NEPRECIZNO RECENO:
//UNSELECT-UJE; I ZA TO SE KORISTI METODA:
                                          //      removeAllRanges   
                                          //POSTOJI I METODA        removeRange A TU SE MORAJU UNOSITI                     
                                                                    //    PARAMETRI (ALI O SVEMU TOME CU
                                                                    //  ONDA KADA SE NEKAD BUDEM BAVIO
                                                                    //  POMENUTOM   Selection INSTANCOM)
//JOS JEDNA DIGRESIJA:
        //NE MORA SAMO TEKST BITI SELEKTOVAN NA STRANICI, U TO SE UBRAJAJU I ELEMENT
                            //ALI MENE U OVOM SLUCAJU SAMO ZANIMA TEKST

//DEFINISACU DA SE TAKVA INSTANCA STAMPA, U SLUCAJU TRIGGERINGA mouseup EVENTA; A ZASTO SAM IZABRAO TAJ
//EVENT JESTE PROSTO JE PUSTANJEM DUGMETA MISA IMACU SELEKCIJU, PA CU U KONZOLI PRISTUPITI OBJEKTU
//I VIDETI NJEGOVE POSTAVKE (ALI NECU SE BAVITI SA TIM VREDNOSTIMA OVDE, NAIME SAMO CU IH PREGLEDATI
//I MOZDA MALO PORAZMISLITI NA STA SE ODNOSE ODREDJENE VREDNOSTI)

//ONO STO JOS NISAM REKA OJESTE DA OVAJ OBJEKAT IMA I INFORMACIJU O TACNOJ POZICIJI CARET-A

paragraf_Element.addEventListener('mouseup', function(ev){
    console.log(        window.getSelection()     );
});

//KADA SAM TO URADIO, MOGU ZANEMARITI, OVAJ PREDHODNI CODE, I NASTAVITI DALJE

//SADA CU DEFINISATI DA SE ZAUSTAVI SELEKTOVANJE (POST-FACTUM, KAO STO SAM PROCITAO U CLANKU)

//TO CU URADITI PRVO U SLUCAJU      mousemove EVENTA; NA b ELEMNTU, KOJI JE NESTED U PARAGRAFU
//TO MI ZVUCI POTPUNO LOGICNO, JER KADA SE POMERA KURSOR (PRE TOGA SE NARAVNO mousedown TRIGGERUJE),
// mousemove SE TRIGGERUJE, A KAO DEFAULT ACTIO DOGADJA SE SLEKETOVANJE

//ALI OVOG PUTA SE NE MORA VODITI RACUNA GDE CE SE TRIGGEROVATI   mousedown  (IZ VEC POMENUTIH RAZLOGA)

paragraf_Element.querySelector('b').addEventListener('mousemove', function(ev){
    const selekcija = window.getSelection();
    
    console.log(selekcija);
    
    selekcija.removeAllRanges();
});

//DAKLE, 'SKIDANJE', SELEKCIJE ZAVISI OD RIGGEROVANJA mousemove EVENTA NA b ELEMENTU; I MA GDE JE POCELA
//SELEKCIJA, KADA KURSOR NAIDJE NA b ELEMENT (NJEGOV TEKST); SVA SELEKCIJA SE "PONISTAVA" 

//MEDJUTIM, SELEKCIJA JE I DALJE MOGUCA, ALI KAO DEFAULT ACTION, O KOJEM SAM VEC GOVORIO, A TAJ ACTION
//JESTE SELEKCIJA, KOJA SE DOGADJA NAKON TRIGGER-OVANJA DRUGOG mousedown EVENTA; TOKOM DOUBLE CLICK-A

//MEDJUTIM , I TA SELEKCIJA CE BITI REMOVED KADA POMERIM KUSRSOR DALJE (OPET TRIGGERING mousemove-A)
//ALI POSTO JA NE ZELIM NIKAKVU SELEKCIJ KOJA BI SE DOGODILA NA b ELEMENTU; JA CU ONDA DODATI JOS JEDAN
//HANDLER

//I TO GA KACIM, ZA SLUCAJ dblclick EVENTA; I U OBIMU HANDLERA DEFINISEM REMOVING SELECTIONA
//ZASTO TAD?
//PA OPET CU DATI OBJASNJENJE 
//DAKLE KROZ DOUBLE CLICK IMAM SLEDECA TRIGGEROVANJA

//  mousedown - mauseup - click -  mousedown - (DEFAULT ACTION: SELEKCIJA) -  mouseup - click - dblclick

//I SADA KAD POSMATRAM OVO TRIGGEROVANJE, VIDIM DA SAMO IMA SMISLA DA SE SLUSA ZA   dblclick-OM; I DA SE 
//NAKON NJEGOVOG TRIGGERING-A UKLONI TA SELEKCIJA (POST-FACTUM) (DAKLE TO JE JEDINI NACIN DA SE UKLONI
//TA SELEKCIJA, NASTALA KAO DEFAULT ACTION, NAKON DRUGOG   mousedown-A)

//                  paragraf_Element.querySelector('b').addEventListener('dblclick', function(ev){
//                      window.getSelection().removeAllRanges();
//                  });

//MEDJUTIM, MISLIM DA SAM POGRESIO; NISAM BAS POGRESIO NEGO SAM MOGAO DA SELEKCIJU UKLONIM I PRE
//ODNOSNO NAKON TRIGGER-OVANJA          mouseup     EVENTA

//SADA, KADA SE SELEKTUJE REC, KADA IZVRSIM DOUBLE CLICK, VIDECU ODMAH I UKLANJANJE TE SELEKCIJE

//MEDJUTIM, POSTOJI JOS JEDAN DEFAULT ACTION, KOJI KAO REZULTAT IMA SELEKTOVANJE CELOG TEKSTA
//TAJ DEFAULT ACTION SE DOGADJA, KAO POSLEDICA TRIGGERING-A, mosedown EVENTA, ALI ONOG mousedown EVENTA,
//TRIGGEROVANOG ODMAH NAKON TRIGGEROVANJA dblclick
//POKUSACU DA POST-FACTUM UKLONIM SELEKCIJI I U SLUCAJU TOG EVENT-A
//MEDJUTIM POGRESIO BIH KADA BIH SELEKCIJU UKLANJAO ZA SLUCAJ       mousedown EVENTA
//JER KAO STO KAZEM         SELEKCIJA SE DOGODILA KAO DEFAULT ACTION NAKON TRIGGERA  mousedown-A

//JER SE DEFAULT ACTION DOGADJA NAKOM MOUSEDOWN-A; STO BI ZNACILO DA UKLANJAM NESTO CEGA NEMA
//I ONDA BI SE TO (SELEKCIJA) DOGODILO, A NE BI BILO NISTA DEFINISANO DA GA UKLONI

//JOS CU JEDNOM STVORITI NEKU LISTU EVENT-OVA I DEFAULT AKCIJA, KOJE SE DESAVAJU TOKOM DOUBLE KLIKA, I 
//KLIKOVA POSLE DOUBLE KLIKA

//  mousedown - mauseup - click -  mousedown - (DEFAULT ACTION: SELEKCIJA) -  mouseup - click - dblclick -
//  - mousedown (DEFAULT ACTION: SELEKCIJA, CELOKUPNOG TEKSTA PARAGRAFA)
// I SADA KADA PUSTIM MIS, JASNI JE DA CE BITI TRIGGERED            mouseup     EVENT

//DAKLE, NE VIDIM NI JEDAN RAZLOG ZASTO NE BIH MOGAO DA DEFINISEM DA SE UKLONI SELEKCIJA (NASTALA
//KAO DEFAULT ACTION NAKON TRIGGERING-A mousedown-A (TRECEG PO REDU TOKOM "TRIPPLE KLIKA")) (ALI I ONA 
//SELEKCIJA NASTALA NAKON TRIGGERINGA DRUGOG mousedown-A); TAKO STO BIH DEFINISAO UKLANJANJE SELEKCIJE
//NAKON TRIGGERING-A,   mouseup     EVENT-A

paragraf_Element.querySelector('b').addEventListener('mouseup', function(ev){
    window.getSelection().removeAllRanges();
});

//I ZAISTA, SADA, TOKOM "TRIPPLE CLICK-A", TOKOM PUSTANJA TASTERA MISA, PO TRECI PUT, VIDECU UKLANJANJE
//SELEKCIJE, SA CELOG PARAGRAFA
//A ONO GORNJE KACENJE HANDLERA (U KOJEM UKLANJAM SELEKCIJU) (HANDLER JE ZA SLUCAJ   dblclick-A   )
//MISLIM DA JE SUVISNO, I ZATO SAM GA COMMENT - OUT, KOKO NE BI VAZILO
//JER UKLANJANJE SELEKCIJE PO    mouseup-U, RESAVA SVE PROBLEME, VEZANE ZA SELEKTOVANJE TEKSTA

//SADA CU SE POZABAVITI, SA ONIM STO SAM I REKAO DA CU SE POZABAVITI, A TO JE
                    //PREVENTING, ODNOSNO SPRECAVANJE KOPIRANJA TEKSTA

                    //U TOM SLUCAJU MORAM KORISTITI         copy        EVENT

                    //A DEFAULT ACTION, KOJI NASTAJE, KAO NJEGOVA POSLEDICA JESTE KOPIRANJE SELEKCIJE U
                    //CLIPBOARD

//POSTO JE REC O DEFAULT PONASANJU, SAVRSENO MI JE JASNO KAKO MOGU DA SPRECIM TAJ DEFAULT ACTION

//POTREBNO JE DODATI DA SE EVENTOVI, CIJI SU TIPOVI     'copy'   'cut'   'paste'    MOGU INSTANTICIRATI
//KORISCENJEM       ClipboardEvent      KONSTRUKTORA

//NAIME, UZ POMOC POMENUTIH EVENTOVA, MOZE SE PODESAVATI, STA SE SALJE U CLIPBOARD, ALI JA NECU SAD O TOME
//JER O TOME MOGU PROCITATI NA MDN WEB STRANICI https://developer.mozilla.org/en-US/docs/Web/Events/copy
//A SADA DA SE POZABAVIM PREVENTING-OM, KOPIRANJA

//POSTO VEC IMAM i ELEMENT U PRIMERU, DEFINISACU SPRECAVANJE KOPIRANJA TEKSTA, TOG ELEMENTA

paragraf_Element.querySelector('i').addEventListener('copy', function(ev){
    ev.preventDefault();
});

//AKO SELEKTUJEM SAMO TEKST KOJI JE OBUHVACEN OD i; I AKO OTVORIM CONTEXTMENU, I TAMO IZABEREM COPY
//ILI AKO NAKON SELEKCIJE TEKSTA PRITISNEM SLEDECE      ctrl+C     ; TEKST NECE OTICI U CLIPBOARD
//ALI AKO SELEKTOVANJE POCNEM IZVAN  i ELEMENTA, ON CE BITI KOPIRAN U CLIPBOARD, ZAJEDNO SA DRUGIM TEKSTOM
//NA KOJEM JE POCELA SELEKCIJA


//SADA CU ODRADITI, JEDAN PRIMER

//LISTA CIJI ELEMENTI SE NE MOGU SELEKTOVATI (NECU KORISTITI CSS (user-select))
//KLIKOM NA JEDAN DODAJE MU SE POZADINA, A KLIKOM NA DRUGI DRUGOM SE DODAJE POZADINA, A ONOM 
//PREDHODNO KLIKNUTOM SE ODUZIMA
//AKO PRITISNEM ctrl + KLIK (ILI Cmd + KLIK, ZA MACK) MOGUCE JE SELEKCIJA VISE LIST ITEMA
//I AKO OPET ODLUCIM DA KLIKNEM NA JEDAN ELEMENT (BEZ Cmd-A ILI Ctrl-A), SAMO SE ON SELEKTUJE

const html_selectable_liste = `
    <div id="selectable_list">
        izaberi neku opciju:
        <ul>
            <li>Stavros Halkias</li>
            <li>Adam Friedland</li>
            <li>Nick Mullen</li>
            <li>Tim Dillon</li>
            <li>Ian Findace</li>
            <li>Louis J. Gomez</li>
        </ul>
    </div>
`;

const css_za_selectable_list = `
    .selected_option {
        background-color: pink;
    }

    #selectable_list ul li:hover {
        cursor: pointer;
    }
`;

let selectedItems = [];

selectable_list.querySelector('ul').addEventListener('mousedown', function(ev){
    const target = ev.target;

    if(target.nodeName === 'LI'){
       ev.preventDefault(); 
    }else{
        return;
    }

    console.log(ev.ctrlKey, ev.metaKey);

    const isCtrlOrMetaPressed = ev.ctrlKey || ev.metaKey?true:false;

    if(target instanceof HTMLLIElement && isCtrlOrMetaPressed){
        target.classList.add('selected_option');
        selectedItems.push(target);
    }


    if(target instanceof HTMLLIElement && !isCtrlOrMetaPressed){

        if(selectedItems.length){
            for(let item of selectedItems){    
                item.classList.remove('selected_option');
            }
            selectedItems = [];
        }

        target.classList.add('selected_option');
        selectedItems.push(target);
    }
    
});


//MOJ PRIMER FUNKCIONISE KAKO TREBA, ALI MU TREBA, NEKI REFACTORING, ALI TAKODJE MISLIM DA MOZDA IMAM;
//NEPOTREBAN PUSHING U NIZ, NIZ KOJI SM TREBAO KORISTITI JESTE MOZDA, ONAJ KOJI BI BIO POVRATNA VREDNOST
//      querySelectorAll('li')
//MOZDA CU IPAK REFAKTORISATI, OVAJ CODE (I SMANJITI BROJ USLOVNIH IZJAVA ILI UKLONITI NEPOTREBNE USLOVE
//IZ USLOVNIH IZJAVA)
//DAKLE PONOVO RADIM ISTI PRIMER, ALI ZELIM DA MI CODE BUDE BOLJI

const html_selectable_liste2 = `
    <div id="selectable_list2">
        izaberi neku opciju:
        <ul>
            <li>Stavros Halkias</li>
            <li>Adam Friedland</li>
            <li>Nick Mullen</li>
            <li>Tim Dillon</li>
            <li>Ian Findace</li>
            <li>Louis J. Gomez</li>
        </ul>
    </div>
`;

const css_za_selectable_list2 = `
    .selected_option {
        background-color: pink;
    }

    #selectable_list2 ul li:hover {
        cursor: pointer;
    }
`;


selectable_list2.querySelector('ul').addEventListener('mousedown', function(ev){
    
    if(ev.target.nodeName === 'LI'){
       ev.preventDefault(); 
    }else{
        return;
    }

    const target = ev.target;
    const isCtrlOrMetaPressed = ev.ctrlKey || ev.metaKey?true:false;

    if(isCtrlOrMetaPressed){
        target.classList.add('selected_option');
        selectedItems.push(target);
    }else{
        
        for(let item of target.closest('ul').querySelectorAll('li')){    
            item.classList.remove('selected_option');
        }

        target.classList.add('selected_option');
        selectedItems.push(target);
    }
    
});

//A NA OVOJ STRANICI, MOGU VIDETI, JOS JEDAN NACIN, KOJI JE ORIGINALNI (ODNOSNO KOJI JE BIO SA CLANKOM
//KOJI SAM CITAO)       http://plnkr.co/edit/Ube5FsM6H0aq3Fjo3iRZ?p=preview

//U CLANKU, JE UPRAVO ONAJ DEO SA PETLJOM BIO U OBIMU, ODVOJENE FUNKCIJE, DOK SAM JA SVE RADIO U HANDLERU
//ISTO TAKO U PRIMERU SU KORISCENA DVA EVENT-A; ODNOSNO DVA EVENT HANDLERA ZA SLUCAJ DVA MouseEvent-A

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//SADA CU SE UPOZNATI SA DRUGOM VRSTOM EVETOVA
//OVO SU EVENTOVI, KOJI NASTAJU KADA SE MIS POMERA (OVAKO JE PISALO U CLANKU); ILI KAKO MISLOM DA JE
//PRECIZNIJE RECI KADA SE KURSOR POMERA IZMEDJU ELEMENATA, ODNOSNO SA JEDNOG ELEMENTA NA DRUGI
//REC JE O SLEDECIM EVENT-OVIMA

//           mouseover        mouseout                     mouseenter      mouseleave
//U SKLOPU OVOG DELA CU SE POZABAVITI I SA    mousemove

//MOZDA SAM I RANIJE REKAO DA SE    mouseover   TRIGGER-UJE, KADA KURSOR UDJE U OBLAST ELEMENTA,
//ODNOSNO KADA KURSOR PREDJE GRANICU I IZ NEKOG DRUGOG ELEMENTA, UDJE U POMENUTI ELEMENT (OVO JE NEKO
//MOJE OBJASNJENJE, KOJE JE ZA MENE PRECIZNIJE)

//      mouseout    SE TRIGGER-UJE, KADA KURSOR, PREDJE GRANICU I IZADJE IZ OBLASTI MOG ELEMENTA; I UDJE U OBLAST
//NEKOG DRUGOG ELEMENTA

//MOZDA SU OVA MOJA OBJASNJENJA POMALO OPSIRNA I TIME SE MOZDA MOZE IZGUBITI LOGICNOST

//NAIME POTREBNO JE DA POSMATRAM JEDAN ELEMENT I KAZEM DA CE SE KADA KURSOR KRENE I UDJE U NJEGOVU OBLAST
//TRIGGER-OVATI     mouseover       ; A KADA KURSOR IZADJE IZ OBLASTI MOG ELEMENTA, ONDA CE SE TRRIGGER-
///OVATI    mouseout

//ONO STO ZNAO O OVIM ELEEMNTIMA OD RANIJE JESTE DA ONI BUBBLE-UJU UP, ODNOSNO ONI PROPAGATE-UJU

//A ONO STO JE NOVINA ZA MENE, U POGLEDU OVIH EVENTOVA JE SLEDECE

        //NAIME OVI EVENT-OVI SU SPECIJALNI JER IMAJU               relatedTarget

        //KREIRACU ODREDJENI HTML, KAKO BI NA NAJBOLJI NACIN PRIKAZO OSOBINE, POMENUTIH EVENT-OVA

const neki_elemnti_preko_kojih_cu_prelaziti_kursorem = `
<div id="kont_hov" style="border: olive solid 4px; padding: 18px; width: 280px;">
    <div id="box1" style="width: 128px; height: 108px; border: tomato solid 2px; margin: 16px"></div>
    <div id="box2" style="width: 108px; height: 86px; border: orange solid 2px; margin: 18px"></div>
</div>
`;

//OBJASNICU OVIM PRIMEROM, STA USTVARI REFERENCIRA          relatedTarget       PROPERTI

kont_hov.addEventListener('mouseover', function(ev){
    console.log('**********************************');
    console.log(ev.target);   //ELEMENT NA KOJI JE KURSOR DOSAO          
    console.log(ev.relatedTarget);      //ELEMENT IZ/SA KOJEG JE KURSOR IZASAO, I DOSAO NA target ELEMENT
    console.log(ev.currentTarget);  //ELEMENT NA KOJEM JE HANDLER-ZAKACEN
    console.log('**********************************');
});

kont_hov.addEventListener('mouseout', function(ev){
    console.log('**********************************');
    console.log(ev.target);         //ELEEMNT SA KOJEG JE KURSOR OTISAO
    console.log(ev.relatedTarget);      //ELEMENT U KOJI JE KURSOR USAO, ODLAZECI SA/OD target ELEMENTA
    console.log(ev.currentTarget);  //ELEMENT NA KOJEM JE HANDLER-ZAKACEN
    console.log('**********************************');
});

//MEDJUTIM, PROPERTI    currentTarget       MOZE IMATI I VREDNOST           null
//TO SE DOGADJA KADA JE, U SLUCAJU TRIGGERING-A         mouseover-A    KURSOR DOSAO SA window-A 
//(SA BROWSER-OVOG WINDOW-A)
// I TO SE DOGADJA, KADA JE, U SLUCAJU TRIGGERING-A     mouseout-A     KURSOR OTISAO NA window 

//SADA CU ODRADITI, JEDAN PRIMER, KOJI JE OPET, JEDAN PRIMER IZ CLANKA, KOJI CITAM
//A TO JE PRIMER SA SMAJLIJIMA

//DEFINISACU PRVO HTML

const html_smajlija = `
    <div id="smajli_kontejner">
        <div class="smile-olive">
            <div class="oko-levo"></div>
            <div class="oko-desno"></div>
            <div class="usta"></div>
        </div>
        <div class="smile-orange">
            <div class="oko-levo"></div>
            <div class="oko-desno"></div>
            <div class="usta"></div>
        </div>
        <div class="smile-tomato">
            <div class="oko-levo"></div>
            <div class="oko-desno"></div>
            <div class="usta"></div>
        </div>
        <br>
        <textarea id="dnevnik">Informacije o eventovima ce biti prikazane ovde</textarea>
    </div>
`;

const css_smajlija = `

    /*JEDNA STVAR NE VEZNA ZA OVAJ PRIMER ALI VEZNA ZA CSS; KAD JE ELEMENT display:inline
    TO ZNACI DA NEMA SMISLA DEFINISATI NJEGOVU SIRINU, JER TO NECE IMATI EFEKTA, JER JE TAKAV
    ELEMENT SIROK KOLIKO I NJEGOVA SADRZINA*/

    #smajli_kontejner {
        box-sizing: border-box;   /* OVAJ PROPERTI NIJE PODRZAN U IE6 IE7 */
        border: 1px solid pink;
        width: 420px;
        padding: 10px;
        
    }
    
    #dnevnik {
        width: 362px;
        height: 280px;
        display: block;
        margin-left: 18px;
    }
    
    [class^=smile-] {           /* KAZU DA SU ATTRIBUTE SELEKTORI SA ^ SPORI*/
        display: inline-block;
        width: 110px;
        height: 110px;
        border-radius: 55px;
        border-width: 8px;
        border-style: solid;
        margin-bottom: 25px;
        margin-right: 12px;
        margin-left: 8px;
        text-align: center;
        
        
        border-color: pink;
    }
    
    [class^="oko"] {                     
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 5px;
        margin-top: 28px;
        margin-left:8px;
        margin-right: 8px;
    
        background-color: pink;
    }
    
    .usta {
        display: block;
        width: 38px;
        height: 10px;
        margin: 18px auto;
    
        background-color: pink;
    }
    
    #smajli_kontejner div:nth-child(1) .usta{
        border-bottom-left-radius: 608px;
        border-bottom-right-radius: 608px;
    }
    #smajli_kontejner div:nth-child(2) .usta{
        border-radius: 9px;
    }
    #smajli_kontejner div:nth-child(3) .usta{
        border-top-left-radius: 608px;
        border-top-right-radius: 608px;
    }
    .smile-olive {
        background-color: #3ba34d;
        border-color: olive;
    }
    
    .smile-orange {
        background-color: #f88048;
        border-color: orange;
    }
    
    .smile-tomato {
        background-color: #ff3a3a;
        border-color: tomato;
    }
    
    .smile-olive div {
        background-color: olive;
    }
    .smile-orange div {
        background-color: orange;
    }
    .smile-tomato div {
        background-color: tomato;
    }
    
    .color_neue {
        background-color: #f664b2;
    }
    
    .smile-olive .color_neue, .smile-orange  .color_neue, .smile-tomato .color_neue {
        background-color: #f664b2;
    }
`;

//CSS IZ ORIGINALNOG PRIMERA JE BIO DRUGACIJI, A JA SAM IMAO DRUGACIJU IDEJU, TAKO DA SAM NA SVOJ NACIN
//DEFINISAO CSS BEZ MNOGO POSMATRANJA CSS PRIMERA, KOJEG MOGU NACI OVDE http://plnkr.co/edit/TIlPIqwHoLfPBnQ0R7ic?p=preview

const crossingHandler = function(ev){

    

    if(!ev.relatedTarget) return;         //OVO NE VALJA, I ZATO SAM GA COMMENTED OUT
                                            //AKO SE RELOADUJE STRANICA I AKO SE KURSOR NADJE NA ELEMENTU
    const tipEventa = ev.type;              
    const target = ev.target;                           //NE BI SE DESILA TA PROMENA BOJE, JER BI TADA  
    const relatedTarget = ev.relatedTarget;             //relatedTarget   BIO     null 
                                                        //JER KUSRSOR NIJE DOSAO NIOTKUDA NA ELEMENT
                                                        // VEC JE BIO TU NA RELOADU
                                                        //A SADA, KADA SE MIS POMERI, IAKO JE 
                                                        //KURSOR VEC BIO NA ELEMENTU, DESICE TRIGGER-OVACE
                                                        //SE    mouseover

                                                        //MEDJUTIM, TAKODJE SE MOZE DOGODITI DO POJAVE
                                                        //ERROR-A
                                                        //U CODE-U, KOJI JE VEZAN ZA DEFINISANJE DODELE VREDNOSTI
                                                        //ZA VALUE      dnavnik-A (TEXTAREA)
                                                        //TADA BI SE DOGODILO POKUSAJ PRISTUPA NEKOM
                                                        //PROPERTIJU NA     null   VREDNOSTI
                                                        //I KAO POSLEDICA BI SE DESIO ERROR
                                                        //ZATO SAM IPAK IZABRAO DA ZADRZIM POMENUTI CODE

    if(target instanceof HTMLTextAreaElement && tipEventa === 'mouseover') return;

    if(tipEventa === 'mouseover'){
        target.classList.add('color_neue');
    }

    if(tipEventa === 'mouseout'){
        target.classList.remove('color_neue');
    }

    //U CLANKU NIJE KORISCEN REGEXP; VEC GA JA SAMO OVDE VEZBAM

    const fruitRelated = /(olive|orange|tomato)/.exec(relatedTarget.className);
    const fruit = /(olive|orange|tomato)/.exec(target.className);

    console.log(fruit);

    const fruitClassRelated = fruitRelated?fruitRelated.input:null;
    const fruitClass = fruit?fruit.input:null;

    

    dnevnik.value += `--------------` +
                    `\n${tipEventa} **` + 
                    `relatedTarget = ${fruitClassRelated || relatedTarget.id || relatedTarget.nodeName}` +
                    `** target = ${fruitClass || target.id || target.nodeName} \n---------------`

    dnevnik.scrollTop = dnevnik.scrollHeight;    //OVO JE KORISCENO U CLANKU, I JA NE MOGU SADA DA SE  
                                                    //BAVIM TIME, JER CU SE U OVOM DOKUMENTU POSEBNO
                                                    //BAVITI SCROLLOVANJEM,M A POSTO JE TRENUTNA TEMA
                                                    // EVENTOVI, KOJI NEMAJU VEZE SA CROLLOM
};                                                  //ONDA CU OVO ZANEMARITI; ALI CU SE OVIM DRUGOM PRILIKOM
                                                    //POSEBNO POZABAVITI
                                                    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop

                                                    //KASNI JAM SAZNAO JEDE DA OVAKAV ASSIGNING scrollTop
                                                    //PROPERTIJU, CINI DA SCROLL ELEMENT, UVEK BUDE NA DNU 
                                                    //ODNOSNO DA SE PRIKAZUJE KRAJ UNOSA
                                                    //DA NISAM TO DODAO, MORAO BI DA SCROLLUJEM DA VIDIM
                                                    //STA JE POSLEDNJE UNESENO


smajli_kontejner.addEventListener('mouseover', crossingHandler);
smajli_kontejner.addEventListener('mouseout', crossingHandler);


//SADA CU DODATI NESTO STO SE TICE      EVENT FREQUENCY     (EVEN UCESTALOST)
// ODNOSNO OVO SE NAJVISE TICE     mousemove    EVENTA, S KOJI MSAM SE BAVIO I RANIJE

// Event mousemove se pokreće kada se miš kreće. Ali to ne znači da svaki piksel vodi do eventa

// Pregledač proverava položaj miša s vremena na vreme. I ako primećuje promene onda aktivira event

// To znači da ako posjetilac brzo premješta miš, onda se elementi DOM-a mogu preskočiti

//POTPUNO ISTO VAZI I ZA       mouseover    I     mouseout

//ZATO CU ZAMISLITI NA IMAM NESTED NEKOLIKO DIV-OVA (SIBLINGSA), NA PRIMER 6;
//PRVI OD NJIH IMA     ID       #from           A POSLEDNJI IMA         #to
//MOGU ZAMISLITI DA SU I INLINE-BLOCK (MADA MOGU DA BUDU I BLOCK ALI OVAKO SE LEPSE VIDI), 
//A DA IZMAEDJU NJIH IMA RAZMAKA 

// Ako se miš brzo kreće od #from do #to elemenata, tada se može preskočiti 
// srednji <div> (ili neki od njih).              mouseout           Event pokrenuti na        #from      
// a BRZIM POMERANJEM SE DESIO DA JE, SLEDECI            mouseover       TRIGGERED NA        #to     

// U praksi to je korisno, jer ako može biti mnogo elemenata U SREDINI. Mi zaista ne želimo da 
// procesiramo in I out IZ svakog.

// S druge strane, treba imati na umu da ne možemo pretpostaviti da se miš polako kreće sa jednog
// elementa na drugi. Ne, može "skočiti".

// Naročito je moguće da kursor skoči iz središta stranice iznad prozora. I relatedTarget = null, jer je
//  došao od "nikuda":

//KAKO BIH TO VIDEO KREIRACU, JEDAN PRIMER
//DVA ELEMENTA, JEDAN NESTED U DRUGOM; ELEMENT KONTEJNER JE SMESTEN TIK UZ DESNU STRANICU BROWSER-OVOG
//WINDOW-A (NIJE TAKO BITNO); NA ODREDJENIM MESTIMA, RAZMAK IZMEDJU IVICA, NESTED ELEMENT I ELEMENTA 
//KONTEJNER-A, JE VEOMA MALI; MENI DOVOLJAN KAKO BI IMAO SLUCAJ DA KURSOR 'PRESKOCI' NEKI ELEMENT
//ODNOSNO DA NE DODJE DO TRIGGERINGA, NEKOG OD 
                //      mouseover
                //      mouseout
                //      mousemove

//JA USTAVRI PRAVIM MALU 'APLIKACIJU'; KOJOJ JE CILJ DA PROCITA KOLIKO SE PUTA POMENUTI EVENT-OVI
//TRIGGER-OVALI NA DVEME DIV ELEMENTIMA, PRI RAZLICITIM BRZINAMA POMERANJA KURSORA

const html_for_cursor_skippings = `
    <div id="so_kon">
        <div class="maslina">
            <div class="paradajz">Neki tekst</div>
        </div>
        <input id="clear_dugme" type="button" value="clear me">
        <textarea id="neki_dnevnik"></textarea>
    </div>
`;

const style_for_so_kont = `
    #so_kon {
        border: orange solid 4px;
        overflow: none;
    }

    #so_kon > textarea {
        display: block;
        width: 38%;
        height: 38vw;
    }

    #so_kon > input {
        display: block;
        margin-left: 62%;
    }

    #so_kon > div, #so_kon > textarea {
        margin-right: 0px;
        margin-left: auto;
    }

    .maslina {
        border: olive solid 1px;
        width: 38%;
        height: 280px;
        text-align: center;
        background-color: olive;
    }

    .maslina div {
        border: tomato solid 1px;
        display: inline-block;
        width: 84%;
        margin-top: 4px;
        height: 50%;
        padding-top: 8%;
        background-color: tomato;
    }
`;

//DAKLE, IMACU LOG DEO, ODNOSNO DNEVNIK TRIGGER-OVANJA, KAO I U GORNJOJ 'APLIKACIJI SA SMAJLIJIMA'

//MEDJUTIM, ZELIM DA NACIN LOGOVANJA BUDE DA AKO KURSOR MIRUJE VISE OD POLA MINUTE, DA SE POCNE SA NOVIM
//UNOSOM, ODNOSNO DA SE IZNOVA POCNE SA BROJANJEM EVENT-OVA
//KAD KAZEM BROJANJE, MISLIM SAMO NA    mousemove       EVENT, OSTALI, NEK SE BELEZE REDNO
//NEKA TU BUDU I INFORMACIJE O          target-U      


let lastMovmentTime = 0;
let mouseMovements = 0;
let lastMessage = "";


const handlerCross = function(ev){


    const currentTime = new Date();    
    let interval = 0;

    if(lastMovmentTime){
        interval = currentTime - lastMovmentTime;
        console.log(typeof interval === 'number');      //-->true    
    }

    let intervalString = "";

    if(interval > 500){
        mouseMovements = 0;
        intervalString = "\n----------------";
    }

    const target = ev.target;
    const tipEventa = ev.type;

    let baseString = intervalString + `\nevent: ${tipEventa} element: ${target.className}`;

    let movingString;

    if(tipEventa === 'mousemove'){
        mouseMovements++;
        if(mouseMovements === 1){
            movingString = baseString + ' x 1';
            lastMessage = lastMessage + movingString;
        }else{
            let fronString = lastMessage.slice(0, lastMessage.lastIndexOf('x') + 1); 
            movingString = ` ${mouseMovements}`;
            lastMessage = fronString + movingString;
        }
    
    }else{
        mouseMovements = 0;
        lastMessage += baseString;
    }

    lastMovmentTime = currentTime;

    neki_dnevnik.value = lastMessage;
    neki_dnevnik.scrollTop = neki_dnevnik.scrollHeight;
};

const cleaningHandler = function(ev){

    ev.stopPropagation();           //OVO RADIM ZBOG TOGA STO SAM RANIJE U CODE-U, ZA DRUGE ELEMENTE
                                    //(KOJI SU ANCESTOR ELEMENTI BUTTONA), ZAKACIO HANDLERE
                                    //MOZDA CAK NA body ILI document
    console.log(`--------${ev.target}-------`);
    neki_dnevnik.value = "";
    lastMessage = "";
};

document.querySelector('.maslina').addEventListener('mouseover', handlerCross);
document.querySelector('.maslina').addEventListener('mouseout', handlerCross);
document.querySelector('.maslina').addEventListener('mousemove', handlerCross);

clear_dugme.onclick = cleaningHandler;

//HANDLERE SAM MOGAO ZAKACITI I NA JEDNOSTAVNIJI NACIN, KORISCENJEM   " onHandler "   SINTAKSE

//          document.querySelector('.maslina').onmousemove = document.querySelector('.maslina').onmousemove = document.querySelector('.maslina').onmousemove = handlerCross;
//ALI KAO STO MOGU VIDETI NISAM TO URADIO

//NECU DODATNO KOMENTARISATI PRIMER, ZADAO MI JE NESTO VISE MUKA NEGO STO JE TREBAO

//ONO STO CU SAMO DODATI JESTE DA CU U DVENIKU (TEXTAREA) VIDETI DA JE MOGUCE, AKO JE BRZ KURSOR, TO
// PRESKAKANJE POMENUTIH EVENT-OVA 

//  ONO STO SAM JOS SAZNAO U OVOJ LEKCIJA, A STO JE NE VEZANO ZA TEMU JESTE JEDNA ODLIKA    Date
//INSTANCI
// NAIME, MOGUCE JE ODUZETI JEDNU Date INSTANCU OD DRUGE, CIME SE DOBIJA RAZLIKA U VREMENU, ODNOSNO 
// VREMENSKI INTERVAL (MORAM JOS ISPITATI, KAKO JE OVO MOGUCE); ODNOSNO NUMBER KOJI JE KAO TAKAV MOGUCE
//KORISTITI

// MEDJUTIM SADA CU SE POZABAVITI JEDNOM CINJENICOM, A KOJU SAM I SAM PRIMETIO, JESTE DA SE

                        // mouseout     TRIGGERUJE, ZA PARENT ELEMENT, KADA KURSOR ULAZI U PARENT-OV, 
                                        //  CHILD ELEMENT

//DAKLE, KAD GOVORIM O TOM PARENTU, KURSOR JE JOS U NJEMU; ALI ONO STO SE DOGODILO JESTE TRIGGEROVAN 
//TO IZGLEDA CUDNO, ALI SE MOZE OBJASNITI

//NAIME PO BROWSER-OVOJ LOGICI, KURSOR MISA, MOZE SE NALAZITI SAMO IZNAD JEDNOG ELEMENTA U BILO KOM
// VREMENU 

//NAIME KADA POSMATRAM ELEMENT, AKO JE ON, MOST NESTED, ODNOSNO "NAJDUBLJU DESCENDANT"; ON JE TAKODJE TOP
//ODNOSNO NAJGORNJI, PO JEDNOM KRITERIJUMU, KOJI SAM KORISTIO I RANIJE, A TO JE         

                                                                    //                  z-index
// 
// DAKLE, KADA KURSOR ODE NA DESCENDANT ELEMENT, ON JE, USTVARI NAPUSTIO PARENT ELEMENT
//                                                                     TOLIKO JE JEDNOSTAVNO 
/////////////////////////////////////////////////////////////////////////////////////////////////////
//OVDE OSTAJEM DUZAN JEDAN PRIMER ZA KOJI CU JOS VIDETI DA LI GA TREBAM KREIRATI (MISLIM DA JE DOBRO
//URADITI GA, JER IMA ODREDJENI ODLIKE (MISLIM NA IZABRANU SINTAKSU, KOJE SE TREBA PODSETITI), KOJE SE
//  KONKRETNO NISU BITNE ZA SADASNJU TEMU)



const html_parent_child_primera = `
    <div class="ins_elem">
        <div class="rose" onmouseover="coralHandler(event)" onmouseout="coralHandler(event)">
            <div class="coral"></div>
        </div>
        <input type="button" value="clear" onclick="clHandler(event)">
        <textarea></textarea>
    </div>
`;

// KAO STO SE VIDI I HTML-A, HANDLERE SAM ZAKACIO INLINE
// ONO STO JE INTERESANTNO, JESTE DA SAM HANDLER-E POZVAO, I DA SAM IM PROSLEDIO    event   KAO ARGUMENT
// VALJDA SE, TOJ VARIJABLOJ PROSLEDJUJE Event INSTANCA, PRILIKOM INVOKACIJE

const stilovi_parent_child_primera = `
    .ins_elem {
        border: pink solid 2px;
        width: 84%;
        padding: 12px;
    }

    .ins_elem > div {
        background-color: lightcoral;
        height: 28vw;
        padding: 12px;
        margin-bottom: 20px;
    }

    .ins_elem > div div {
        background-color: mistyrose;
        width: 56%;
        height: 56%;
        margin: 12% auto;

    }

    .ins_elem input[type=button] {
        display: block;
    }

    .ins_elem > * {
        width: 62%;
    }

    .ins_elem textarea {
        height: 28vw;
    }
`;

const coralHandler = function(ev){
    const target = ev.target;
    const evType = ev.type;
    const elemClass = target.className
    const text = `\n[ ${evType} ----> ${elemClass} ]`;
    const tekstOblast = target.closest('.ins_elem').querySelector('textarea');
    tekstOblast.value = tekstOblast.value + text;
    tekstOblast.scrollTop = tekstOblast.scrollHeight;
};

const clHandler = function(ev){
    ev.target.closest('.ins_elem').querySelector('textarea').value = "";
};


//OVAKVE OSOBINE POMENUTIH EVENTOVA, KADA SE KORISTE, PRILOKOM NEKIH KOMPLEKSNIJIH STVARI, MOGU
//IZAZVATI NEKE SIDE-EFFECTS; I ZATO CU SE UPOZNATI SA JOS DVA TIPA EVENT-OVA, ZA KOJE SAM CUO
////////////////////////////////////////////////////////////////////////////////////////////////////////

// DAKLE SADA CU SE POZABAVITI            mouseenter          I           mouseleve           EVENT-IMA

//ZA RAZLIKU OD PREDHODNIH POMENUTIH VRSTA, OVA DVA EVENTA:

                        //  NE BUBBLE-UJU  UP
                        //  I TRANZICIJE UNUTAR ELEMENTA (O CEMU JE GOVORIO PREDHODN PRIMER)
                                    //ZAISTA SE NE UZIMAJU U OBZIR
                                    //ODNOSNO OVO EVENT-OVI SE NE TRIGGERUJU, PRILIKOM POMERANJA
                                    //KURSORA U/IZ PARENT/A IZ/U CHILD/A  

//  ZBOG POMENUTOGA, OVI EVENTOVI SU INTUITIVNO, VEOMA JASNI

// Kada pokazivač (KURSOR) ulazi u element -            mouseenter    se aktivira, a zatim nije važno gde 
// ide dok je unutar elementa.  mouseleave pokreće samo kada ga kursor napusti.

// Ako napravimo isti primer KAO I PREDHODNI, ali stavimo mouseenter/mouseleave na orange <div> i uradimo
//  isto - vidimo da se EVENTOVI pokreću samo prilikom unosa i napuštanja ORANGE <div>
//  Nema dodatnih događaja kada idete na OLIVE i natrag. Deca su ignorisana

const html_parent_child_primera2 = `
    <div class="lins_elem">
        <div class="rose" onmouseenter="coralHandler2(event)" onmouseleave="coralHandler2(event)">
            <div class="coral"></div>
        </div>
        <input type="button" value="clear" onclick="clHandler2(event)">
        <textarea></textarea>
    </div>
`;

const stilovi_parent_child_primera2 = `
    .lins_elem {
        border: pink solid 2px;
        width: 84%;
        padding: 12px;
    }

    .lins_elem > div {
        background-color: lightcoral;
        height: 28vw;
        padding: 12px;
        margin-bottom: 20px;
    }

    .lins_elem > div div {
        background-color: mistyrose;
        width: 56%;
        height: 56%;
        margin: 12% auto;

    }

    .lins_elem input[type=button] {
        display: block;
    }

    .lins_elem > * {
        width: 62%;
    }

    .lins_elem textarea {
        height: 28vw;
    }
`;

const coralHandler2 = function(ev){
    const target = ev.target;
    const evType = ev.type;
    const elemClass = target.className
    const text = `\n[ ${evType} ----> ${elemClass} ]`;
    const tekstOblast = target.closest('.lins_elem').querySelector('textarea');
    tekstOblast.value = tekstOblast.value + text;
    tekstOblast.scrollTop = tekstOblast.scrollHeight;
};

const clHandler2 = function(ev){
    ev.target.closest('.lins_elem').querySelector('textarea').value = "";
};

// I U OVOM SLUCAJU KACIO SAM HANDLERE INLINE (ODNOSNO POZIVAO SAM IH INLINE, PROSLEDJUJUCI IM event
// VARIJABLU) 

//MEDJUTIM ONO STO JE VAZNIJE JESTE STA SE DOGADJA U SLUCAJU TRIGGERINGA, POMENUTIH EVENT-OVA
                                        //                      mouseenter      mouseleave

// POSTO HANDLERE NISAM KACIO NA CHILD ELEMENT, NISTA SE NIJE DOGODILO PRILIKOM ULASKA U CHILD ELEMENT
// A KAO STO SAM REKAO, OVI EVENT-OVI NE BUBBLE-UJU UP, ODNOSNO NE PROPAGATE-UJU, TAK ODA EVENT DELEGATION
// NIJE MOGUC

// A POSTO SAM HANDLER ZAKACIO NA PARENTA, TRIGGEROVALI SU SE EVENTOVI, NA ENTER/LEAVE IZ TOG ELEMENTA
// I KAO STO SAM REKAO, PRI ULASKU U CHILD ELEMENT, NEMA TRIGGERINGA mouseleave-A ZA PARENT; JER SE TO NE
// SMATRA ULASKOM U NOVI ELEMENT I IZLASKOM IZ PARENTA

// Eventovi mouseenter/leave su veoma jednostavni, i jednostavni za korištenje. But they don't Bubble up 
// Dakle, ne možemo koristiti delegiranje eventova sa njima.

// Zamislite da želimo da handle-ujemo enter/leave za ćelije tabele; I DA POSTOJE STOTINE CELIJA TABELE

// Prirodno rešenje bi bilo - da postavite HANDLER na <table> i procesirate EVENT-OVE tamo. 
// Međutim, mouseenter/leave, NE BUBLLE-UJU UP. Dakle, ako se takav EVENT dešava na <td>,
// onda bi ga HANDLER ZAKACEN ZA TAJ <td> , JEDINO MOGAO UHVATITI

// Handlere for mouseenter/leave na <table> samo SE TRIGGERUJE prilikom ulaska / napuštanja CELE TABELE
// Nemoguće je dobiti bilo kakve informacije o tranzicijama unutar nje

// NEMA PROBLEMA, KORISTICU     mouseover/out

const html_tabele_1 = `
<div class="table_kont_one">
    <table>
        <tr>
            <th colspan="3">Feng Shui <em>Bagua</em> tabela(chart): Smer, Element, Boja, Znacenje </th>            
        </tr>
        <tr>
            <td class="sz">
                <strong>Severozapad</strong><br>
                Metal<br>
                Srebro<br>
                Starci
            </td>
            <td class="s">
                <strong>Sever</strong><br>
                Voda<br>
                Plavo<br>
                Promena
            </td>
            <td class="si">
                <strong>Severoistok</strong><br>
                Zemlja<br>
                Zuta<br>
                Smer
            </td>
            </tr>
        <tr>
            <td class="z">
                <strong>Zapad</strong><br>
                Metal<br>
                Zlato<br>
                Mladost
            </td>
            <td class="c">
                <strong>Centar</strong><br>
                Sve<br>
                Purpurno<br>
                Harmonija
            </td>
            <td class="i">
                <strong>Istok</strong><br>
                Drvo<br>
                Plava<br>
                Buducnost
            </td>
        </tr>
        <tr>
            <td class="jz">
                <strong>Jugozapad</strong><br>
                Zemlja<br>
                Braun<br>
                Spokojstvo
            </td>
            <td class="j">
                <strong>Jug</strong><br>
                Vatra<br>
                Narandzasta<br>
                Slava
            </td>
            <td class="ji">
                <strong>Jugoistok</strong><br>
                Drvo<br>
                Zelena<br>
                Romansa
            </td>
        </tr>
    </table>
    <input class="ciscenje" type="button" value="clear">
    <textarea class="oblast_logovanja"></textarea>
</div>
`;

const stilovi_tabele_1 = `
    .table_kont_one {
        border: 4px solid bisque;
        width: 92%;
        padding: 18px;
    }

    .table_kont_one table {
        width: 94%;
        margin: auto;
        border-collapse: separate;
        border-spacing: 8px;
    }

    .table_kont_one textarea {
        width:94%;
        display: block;
        margin: auto;
        height: 22vw;
    }

    .table_kont_one input {
        display: block;
        width: 18%;
        margin-top: 18px;
        margin-right: 79%;
        margin-left: auto;
    }

    .table_kont_one td {
        text-align: center;
        padding: 18px;
        line-height: 1.8em;
        color: blanchedalmond;
    }

    .table_kont_one .sz {
        background-color: silver;
        color: #292f38;
    }
    .table_kont_one .s {
        background-color: royalblue;
    }
    .table_kont_one .si {
        background-color: yellow;
        color: #292f38;
    }
    .table_kont_one .z {
        background-color: gold;
        color: #292f38;
    }
    .table_kont_one .c {
        background-color: darkviolet;
    }
    .table_kont_one .i {
        background-color: deepskyblue
    }
    .table_kont_one .jz {
        background-color: saddlebrown
    }
    .table_kont_one .j {
        background-color: orangered;
    }
    .table_kont_one .ji {
        background-color: springgreen;
    }

    .table_kont_one .fuchsia {
        background-color: fuchsia;
    }
`;

const hoversOverOut = function(ev){

    

    const target = ev.target;
    const evType = ev.type;
    const previousClassName = target.className;     //OVO, AKO SE REFAKTORISE CODE, JESTE SUVISNO 
    
    //KORISTICU     className      ; MADA ZNAM DA JE UZ POMOC     classList     JEDNOSTAVNIJE

    target.className = evType === 'mouseover'
    ?
    previousClassName + " fuchsia"
    :
    previousClassName.slice(0, previousClassName.lastIndexOf('f') - 1);

    //KORISTIO SAM RegExp U OVOM PRIMERU, KAKO BIH GS PROVEZBAO OPET, STO MORAM URADITI POSEBNO
    //ODNOSNO MORAM RegExp-U POSVETITI SVU PAZNJU U BUDUCNOSTI

    const fuchsiaArray = /(\D+) fuchsia$/ig.exec(previousClassName);  //"fuchsia" at back
    let classString = fuchsiaArray?fuchsiaArray[1]:previousClassName;     //"fuchsia" excluded
                                                                            //or className that doesn't
                                                                            //have "fuchsia" in it
    // RegExp SAM KORISTIO DA BIH IMAO CIST STRING, BEZ DODATNE fuhsia KLASE, DA BIH TAKAV STRIN, BEZ
    // POMENUTOGA DODAO PORUCI KOJA SE DODAJE VREDNOSTI DNEVNIKA, ODNOSNO textarea-A

    classString = classString === ' fuchsia'?null:classString;  //PREVIDEO, ODNOSNO 
                                                                //DEFINISAO RegExp; 
                                                                //I ZATO SAM OVO DODAO
                                                                // JER NE ZELIM DA OPET REDEFINISEM
                                                                //CEO PRIMER

                                                                //ODNOSNO OVO STO SAM DEFINISAO
                                                                //U SLUCAJU KADA SU TARGET-I, ONI ELEMENTI
                                                                //KOJI NISU CELIJE TABELE (table ELEMENT,
                                                                //I strong ELEMENT KOJI JE DESCENDANT CELIJE
                                                                //A TAKODJE I th ELEMENT), DA IM SE NE LOGUJE
                                                                //KLASA (JER KADA DOBIJU BOJU, NJIHOVA 
                                                                //KLASA JE fucshia; A JA ZELIM DA SE UMESTO
                                                                //TE KLASE LOGUJE NJIHOV nodeName)

    const message = `\n[ ${evType} ----> ${classString || target.nodeName} ]`;
    const dnevnik = target.closest('.table_kont_one').querySelector('textarea');

    dnevnik.value = dnevnik.value + message;
    dnevnik.scrollTop = dnevnik.scrollHeight;
};

document.querySelector('.table_kont_one > table').onmouseover = 
document.querySelector('.table_kont_one > table').onmouseout = hoversOverOut;

document.querySelector('.table_kont_one > input').onclick = function(ev){
    ev.target.closest('.table_kont_one').querySelector('textarea').value = "";
};

// NA SLEDECOJ STRANICI, OVAJ PRIMER, ODNOSNO HANDLERI SU DEFINISANI DRUGACIJE (MOZDA PROSTIJE)
// http://plnkr.co/edit/Lkv2FMFbAXK1FK8jHuat?p=preview

// hoversOverOut HANDLER RADI kada se KURSOR  PREDJE SA JEDNOG ELEMENTA NA DRUGI
// ALI JA ZELIM DA HANDLE-UJEM TRANZICIJE, IZ/U    TABLE DATA ELEMENT, KAO CELINE 
// I DA HIGHLIGHT-UJEM TABLE DATA ELEMENT KAO CELINU

//U OVOM SLUCAJU, JASNO JE DA KADA KURSOROM UDJEM U PROSTOR IZMEDJU CELIJA, ILI KADA PREDJEM PREKO 
//TABLE HEADERA, DA CE SE I TADA DESITI TRIGGERING, POMENUTIH EVENT-OVA IZ POMENUTIH RAZLOGA
//A DESICE SE I HIGHLIGHTING NESTED ELEMENATA (strong ELEMENT), POMENUTOG TABLE DATA ELEMENTA

//JA TO NE ZELIM

        // Jedno od rešenja:

// Zapamtite trenutno istaknutu <td> u varijabli.
// onmouseover - ignorišite EVENT ako smo još u trenutnom <td>.
// onmouseout - ignorišite ako nismo izašli iz trenutnog <td>.
// To BI FILTRIRALO "dodatne" EVENT-OVE kada se krećemo između dece <td>.


//DAKLE, KOPIRAM PREDHODNI PRIMER OVDE, PA CU IZMENITI NJEGOV CODE, KAKKO BI ODGOVARAO, ONOME STA ZELIM
//ODNOSNO ONOME STO JE NAVEDENO

const html_tabele_2 = `
<div class="table_kont_two">
    <table>
        <tr>
            <th colspan="3">Feng Shui <em>Bagua</em> tabela(chart): Smer, Element, Boja, Znacenje </th>            
        </tr>
        <tr>
            <td class="sz">
                <strong>Severozapad</strong><br>
                Metal<br>
                Srebro<br>
                Starci
            </td>
            <td class="s">
                <strong>Sever</strong><br>
                Voda<br>
                Plavo<br>
                Promena
            </td>
            <td class="si">
                <strong>Severoistok</strong><br>
                Zemlja<br>
                Zuta<br>
                Smer
            </td>
            </tr>
        <tr>
            <td class="z">
                <strong>Zapad</strong><br>
                Metal<br>
                Zlato<br>
                Mladost
            </td>
            <td class="c">
                <strong>Centar</strong><br>
                Sve<br>
                Purpurno<br>
                Harmonija
            </td>
            <td class="i">
                <strong>Istok</strong><br>
                Drvo<br>
                Plava<br>
                Buducnost
            </td>
        </tr>
        <tr>
            <td class="jz">
                <strong>Jugozapad</strong><br>
                Zemlja<br>
                Braun<br>
                Spokojstvo
            </td>
            <td class="j">
                <strong>Jug</strong><br>
                Vatra<br>
                Narandzasta<br>
                Slava
            </td>
            <td class="ji">
                <strong>Jugoistok</strong><br>
                Drvo<br>
                Zelena<br>
                Romansa
            </td>
        </tr>
    </table>
    <input class="ciscenje" type="button" value="clear">
    <textarea class="oblast_logovanja"></textarea>
</div>
`;

const stilovi_tabele_2 = `
    .table_kont_two {
        border: 4px solid bisque;
        width: 92%;
        padding: 18px;
    }

    .table_kont_two table {
        width: 94%;
        margin: auto;
        border-spacing: 8px;
    }

    .table_kont_two textarea {
        width:94%;
        display: block;
        margin: auto;
        height: 22vw;
    }

    .table_kont_two input {
        display: block;
        width: 18%;
        margin-top: 18px;
        margin-right: 79%;
        margin-left: auto;
    }

    .table_kont_two td {
        text-align: center;
        padding: 18px;
        line-height: 1.8em;
        color: blanchedalmond;
    }

    .table_kont_two .sz {
        background-color: silver;
        color: #292f38;
    }
    .table_kont_two .s {
        background-color: royalblue;
    }
    .table_kont_two .si {
        background-color: yellow;
        color: #292f38;
    }
    .table_kont_two .z {
        background-color: gold;
        color: #292f38;
    }
    .table_kont_two .c {
        background-color: darkviolet;
    }
    .table_kont_two .i {
        background-color: deepskyblue;
    }
    .table_kont_two .jz {
        background-color: saddlebrown;
    }
    .table_kont_two .j {
        background-color: orangered;
    }
    .table_kont_two .ji {
        background-color: springgreen;
    }

    .table_kont_two .fuchsia {
        background-color: fuchsia;
    }

`;


//OVA FUNKCIJA JE SKROZ PROBLEMATICNA ZATO CU POKUSATI I TRECI PUT DA ODRADIM OVAJ PRIMER, TAKO DA MOGU
//PRESKOCITI, REVIEWING SLEDEC CODE-A I PRECI NA NOVI, ODNOSNO ISTI OVAKAV PRIMER, U KOJEM SAM OTKLONIO
//GRESKU

const hoversHandl = function(ev){

    //SLEDECE DVE PRVE USLOVNE IZJAVE return-UJU HANDLER, U SLUCAJU TRIGGERING-A mouseover/out
    //EVENT-OVA, PRI IZLASKU/ULASKU KUSRSORA NA/SA NESTED ELEMENATA, OD 'TD' TARGET-A (U PITANJU JE JEDAN 
    // NESTED ELEMENT A TO JE strong; U OVOM SLUCAJU)
    //MEDJUTIM JA SAM DEFINISAO CODE, U SLUCAJU BILO KOJEG NESTED-A

    //MOZDA BI SE POMENUTO TREBALO I REFACTORISATI

    if(ev.traget && ev.relatedTarget){
        if(ev.type === 'mouseover' && ev.target.nodeName !== 'TD' && ev.relatedTarget.nodeName !== 'TD') return;
    }

    //if(ev.type === 'mouseover' && !currentElement) return;
        
        //MORAM JOS RADITI NA OVOM PRIMERU; I KONKRETNO MORAM
                                            //KORISTITI     contains    METODU JER SAM TO VIDEO U TUTORIJLU 
    if(ev.type === 'mouseout' && ev.relatedTarget &&
        ev.target.nodeName === 'TD' && ev.relatedTarget.nodeName !== 'TD')
    {
        if(ev.relatedTarget.closest('TD')){
            return;
        }
    }
    
    if(ev.type === 'mouseover' && ev.relatedTarget &&
        ev.target.nodeName === 'TD' && ev.relatedTarget.nodeName !== 'TD')
    {
        if(ev.relatedTarget.closest('TD')){
            return;
        }
    
    }
    
    //AKO SE TRIGGERUJE 'mouseover', NA BILO KOJEM ELEMENTU TABELE, A DA TAJ ELEMENT NIJE NIJE
    //  'TD', RETURN-OVACE SE FUNKCIJA  (KAD SAM OVO DEFINISAO, IMAO SAM NA UMU, PRVENSTVENO table I
    //I PRVI RED TABELE; NE ZELIM DA PRATIM mouseover ZA TE ELEMENTE)

    if(ev.type === 'mouseover' && ev.target.nodeName !== 'TD') return;
    if(ev.type === 'mouseleave' && ev.target.nodeName !== 'TD') return;
    
    const target = ev.target;
    const evType = ev.type;
    const previousClassName = target.className;

    currentElement = evType === 'mouseout'?target:null;
    
    let classString;

    target.className = evType === 'mouseover'
    ?
    previousClassName + " fuchsia"
    :
    previousClassName.slice(0, previousClassName.lastIndexOf('f') - 1);
    

    const fuchsiaArray = /(\D+) fuchsia$/ig.exec(previousClassName);
    classString = fuchsiaArray?fuchsiaArray[1]:previousClassName;    

    classString = classString === ' fuchsia'?null:classString;
    

    const message = `\n[ ${evType} ----> ${classString || target.nodeName} ]`;
    const dnevnik = target.closest('.table_kont_two').querySelector('textarea');

    dnevnik.value = dnevnik.value + message;
    dnevnik.scrollTop = dnevnik.scrollHeight;
};

document.querySelector('.table_kont_two > table').onmouseover = 
document.querySelector('.table_kont_two > table').onmouseout = hoversHandl;

document.querySelector('.table_kont_two > input').onclick = function(ev){
    ev.target.closest('.table_kont_two').querySelector('textarea').value = "";
};

//////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//DAKLE OPET RADIM ISTI PRIMER (BAGUA CHART)

const html_tabele_3 = `
<div class="table_kont_three">
    <table>
        <tr>
            <th colspan="3">Feng Shui <em>Bagua</em> tabela(chart): Smer, Element, Boja, Znacenje </th>            
        </tr>
        <tr>
            <td class="sz">
                <strong>Severozapad</strong><br>
                Metal<br>
                Srebro<br>
                Starci
            </td>
            <td class="s">
                <strong>Sever</strong><br>
                Voda<br>
                Plavo<br>
                Promena
            </td>
            <td class="si">
                <strong>Severoistok</strong><br>
                Zemlja<br>
                Zuta<br>
                Smer
            </td>
            </tr>
        <tr>
            <td class="z">
                <strong>Zapad</strong><br>
                Metal<br>
                Zlato<br>
                Mladost
            </td>
            <td class="c">
                <strong>Centar</strong><br>
                Sve<br>
                Purpurno<br>
                Harmonija
            </td>
            <td class="i">
                <strong>Istok</strong><br>
                Drvo<br>
                Plava<br>
                Buducnost
            </td>
        </tr>
        <tr>
            <td class="jz">
                <strong>Jugozapad</strong><br>
                Zemlja<br>
                Braun<br>
                Spokojstvo
            </td>
            <td class="j">
                <strong>Jug</strong><br>
                Vatra<br>
                Narandzasta<br>
                Slava
            </td>
            <td class="ji">
                <strong>Jugoistok</strong><br>
                Drvo<br>
                Zelena<br>
                Romansa
            </td>
        </tr>
        <input class="ciscenje" type="button" value="clear">
        <textarea class="oblast_logovanja"></textarea>
    </table>
</div>
`;

const stilovi_tabele_3 = `
    .table_kont_three {
        border: 4px solid bisque;
        width: 92%;
        padding: 18px;
    }

    .table_kont_three table {
        width: 94%;
        margin: auto;
        border-spacing: 8px;
    }

    .table_kont_three textarea {
        width:94%;
        display: block;
        margin: auto;
        height: 22vw;
    }
    
    .table_kont_three input {
        display: block;
        width: 18%;
        margin-top: 18px;
        margin-right: 79%;
        margin-left: auto;
    }    

    .table_kont_three td {
        text-align: center;
        padding: 18px;
        line-height: 1.8em;
        color: blanchedalmond;
    }

    .table_kont_three .sz {
        background-color: silver;
        color: #292f38;
    }
    .table_kont_three .s {
        background-color: royalblue;
    }
    .table_kont_three .si {
        background-color: yellow;
        color: #292f38;
    }
    .table_kont_three .z {
        background-color: gold;
        color: #292f38;
    }
    .table_kont_three .c {
        background-color: darkviolet;
    }
    .table_kont_three .i {
        background-color: deepskyblue;
    }
    .table_kont_three .jz {
        background-color: saddlebrown;
    }
    .table_kont_three .j {
        background-color: orangered;
    }
    .table_kont_three .ji {
        background-color: springgreen;
    }

    .table_kont_three .fuchsia {
        background-color: fuchsia;
    }
`;

//NE ZNAM DA LI JE DOBRO DEFINISATI HANDLER, KOJI SE KACI NA ISTI ELEMENT U SLUCAJU mouseover/out EVENT-
// OVA, JER JE U CLANKU KORISTIO DVA ODVOJENA, ALI POKUSACU OPET DEFINISANJE JEDNOG HANDLER-A

//ONO STO MORAM URADITI, JESTE DEFINISANJE DAVANJA CSS KLASE KOJA DAJE NOVI BACKGROUND COLOR
//STO SE TREBA DOGODITI NAKO NTRIGGERING-A      mouseover-A     NA TD  ELEMENTU

//I ODUZIMANJA TE KLASE, NAKON TRIGGERING-A     mouseout-A EVENTA NA TD ELEMENT

//POMENUTE EVENT-OVE, TREBA IGNORISATI ZA ANCESTORE, POMENUTOG TD-A

//A TREBA NA PRAVI NACIN DEFINISATI DA SE BACKGROUND NE MENJA KADA SE TRIGGERUJE mouseover/out NA
//DESCENDANTIMA, POMENUTOG 'TD' ELEMENTA

//I TREBA DA NA PRAVI NACIN, VIDIM, KAKO BI PREVAZISAO SITUACIJE, KADA SE KURSOR POMERA BRZO
//ODNOSNO KADA SE 

//ODNOSNO PROBLEM MOZE NASTATI PRI BRZOM IZLASKU IZ DESCENDANTA, POMENUTOG 'TD' ELEMENTA
//TADA SE MOZE DESITI, DA KURSOR BUDE PREBRZ, I NE REGISTRUJE SE, ODNOSNO NE TRIGGERUJE SE
//  mouseout        ZA  TD  ELEMENT
//TADA ELEMENT IMA I DALJE ONU CSS KLASU KOJA MU JE DALA NOVI BACKGROUND COLOR; UMESTO DA JE
//IZGUBI, I DA OPET IMA SVOJ DEFAULT BACKGROUND COLOR

// AUTOR CLANKA JE GOVORIO DA JE U OVOKVOJ SITUACIJI POTREBNO SKLADISTITI 'TD', KOJI DOBIJE NOVI COLOR
// NAKON TRIGGERING-A        mouseover       EVENTA

// U TOM SLUCAJU JA BIH MORAO DEFINISATI DA SE NAKON STO SE, NA DRUGIM ELEMENTIMA (TU SE UBRAJA
//  I NEKI DRUGI TD) TRIGGERUJE     mouseover EVENT , DA SE TADA, UKLONI POMENUTA BACKGROUND KLASA ZA
// SKLADISTENI TD ELEMENT

//OVAJ GORNJI BLOKOVI TEKSTA SU KONFUZAN; JER TEK KADA SAM URADIO PRIMER, I KADA SAM GA ISKOMENTARISAO 
// DOLE STVARI SU POSTALE JASNIJE


//SLEDECA VARIJABLA SKLADISTI ELEMENT, KOJI IMA CSS KLASU .fuchsia

let trenutniTDFuchsia;

//SADA CU DEFINISATI HANDLER

const floatingHandler = function(ev){
    const lastTDisFus = trenutniTDFuchsia?true:false;      //AKO POSTOJI ELEMENT KOJI IMA KLASU .fuchsia
                                                            //ODNOSNO AKO GLOBALNA VARIJABLA SKLADISTI
                                                            // 'TD' KOJI IMA fuchsia BACKGROUND
                                                            //KASNIJE SAM VIDEO DA JE OVO SUVISNO
                                                            //ODNOSNO ZA SVE POTREBE U OVOJ FUNKCIJI
                                                            // MOGAO SAM KORISTITI, ODNOSNO REFERENCIRATI
                                                            // SAMU GLOBALNU VARIJABLU
                                                            //JER ONA MOZE IMATI TD ELEMENT, KAO VREDNOST
                                                            // ILI null (NA POCETKU undefined)
    const target = ev.target;
    const relatedTarget = ev.relatedTarget;
    const tipEventa = ev.type;

    //OVIM SLEDECIM TERNARY-JEVIMA DOLAZIM DO TOGA, DA: AKO POSTOJE I TARGET I RELATED TARGET
    //JA VIDIM DA LI ONI IMAJU ANCESTOR/DESCENDANT ODNOS

    //POSTO SE MOZE DESITI DA   relatedTarget BUDE null JA SAM PRVO DEFINISAO OVE TERNARYJE, ODNOSNO
    // NJIHOVE USLOVE

    //NISAM SIGURAN DA LI SAM MORAO I DA PROVERAVAM I target, ALI I TO CU KASNIJE VIDETI

    const relatedContainsTarget = relatedTarget && target?relatedTarget.contains(target):false;
    const targetContainsRelataed = relatedTarget && target?target.contains(relatedTarget):false;

    //UMESTO DA KORISTIM contains METODU, MOGAO SAM SAM DA PROVERIM DA LI ELEMENTI IMAJU ODNOS
    //ANCESTOR/DESCENDANT I DA LI JE ANCESTOR, USTVARI 'TD', U ISTO VREME, KORISCENJEM NECEGA DRUGOG
    //U TOM SLUCAJU BIH KORISTIO while LOOP, NA SPECIFICAN NACIN; 
    // MISLIM DA UPRAVO TAKAV CODE STOJI IZA DEFINICIJE, POMENUTE    contains    METODE

    // DAKLE SELEDECI CODE NIJE NESTO STO JE UTICE NA BILO STA U OVOM PRIMERU
    // NA POCETKU SAM REKAO DA CU POKAZATI STA SE TO MOZE KORISTITI UMESTO Node.prototype.contains
    // METODE (ODNOSNO OVAKAV CODE SE VEROVATNO KRIJE IZA 'KULISA' contains METODE)

    ////////
    //PROVERA DA LI target IMA ANCESTORA KOJI JE 'TD'
    let targetHasTDAncestor;
    let tempAncestor = target;
    while(tempAncestor = tempAncestor.parentNode){
        console.log('nothing');
        if(tempAncestor.nodeName === 'TD'){
            targetHasTDAncestor = true;
            console.log("Target Has TD Ancestor: ", targetHasTDAncestor);
            break;
        }
    }
     //PROVERA DA LI relatedTarget IMA ANCESTORA KOJI JE 'TD'
    if(relatedTarget){
        let relatedTargetHasTDAncestor;
        let tempAncestor2 = relatedTarget;
        while(tempAncestor2 = tempAncestor2.parentNode){
            console.log('nothing');
            if(tempAncestor2.nodeName === 'TD'){
                relatedTargetHasTDAncestor = true;
                console.log("Realated Target Has TD Ancestor: ", relatedTargetHasTDAncestor);
                break;
            }
        }
    }

    /////////////
    //SAD CU SE VRATITI NA MOJ PRIMER, I IPAK CU KORISTITI VREDNOSTI U CIJEM NASTAJANJU JE UCESTVOVALA
    //contains METODA, JER SAM S NJOM POCEO

    if(
        relatedContainsTarget && relatedTarget.nodeName === 'TD' ||
        targetContainsRelataed && target.nodeName === 'TD'
    ){
        // DAKLE AKO I TARGET I RELATED TARGET; BEZ OBZIRA NA TIP EVENTA, IMAJU ANCESTOR/DESCENDANT ODNOS
        // I DA JE PRI TOME 'TD' ANCESTOR; ONDA NE ZELIM DA SE BILO STA RADI; ONOSNO NE ZELIM NIKAKVO
        // DAVANJE NOVOG BACKGROUND COLOR-A, ILI MENJANJE VREDNOSTI, POMENUTE GLOBALNE VARIJABLE

        //ZATO RETURN-UJEM FUNKCIJU
        return;

    }else{
        //A U SUPROTNOM, AKO GORNJE NIJE ISPUNJENO; OVDE CU DEFINISATI STA SE TO DOGADJA
        //PRI TRANZICIJAMA KURSORA KOJE NEMAJU VEZE SA NESTED ELEMENTIMA 'TD'-A

        //AKO RAZMISLIM NA STA TREBAM OBRATITI PAZNJU, VIDECU DA MI JE  PRACENJE    'mouseover'
        // EVENTA NAJBITNIJE

        // JER AKO SE mouseover TRIGGERUJE NA 'TD' ZELIM DA MU SE DODA NOVI BACKGROUND, A DA SE;
        // TAJ 'TD' SA NOVIM FUCHSIA BACKGROUND-OM DODELI KAO VREDNOST, POMENUTOJ GLOBALNOJ VARIJABLOJ

        //OVO CE INVOCIRATI TO DODAVAJE, KADA NI JEDAN 'TD' NIJE IMAO, OD RANIJE,
        // POMENUTU FUSCHIA BACKROUND BOJU

        if(tipEventa === 'mouseover' && target.nodeName === 'TD' && !lastTDisFus){
            target.classList.add('fuchsia');
            trenutniTDFuchsia = target;

            return;
        }

        // A OVO KADA JEDAN OD PREDHODNO PREDJEDJENIH 'TD'-OVA JESTE IMAO POMENUTU ROZIKASTU BOJU
        // TU BOJU JE POTREBNO SKINUTI SA TOG PREDHODNOG ELEMENTA, DODATI FUCHSIA TARGETU (NOVOM TD-U),
        // ZATIM JE POTREBNO TAJ NOVI TD DODELITI GLOBALNOJ VARIJABLOJ KAO VREDNOST
        
        if(tipEventa === 'mouseover' && target.nodeName === 'TD' && lastTDisFus){
            trenutniTDFuchsia.classList.remove('fuchsia');
            target.classList.add('fuchsia');
            trenutniTDFuchsia = target;

            return;
        }

        //ZATIM, JA I DALJE NE MORAM DA PRATIM  mouseout IZ 'TD' ELEMENTA
        //VEC CU DA DEFINISEM STA SE TO DESAVA KADA SE DESI mouseover NA ELEMENTIMA KOJI NISU
        //  'TD'
        //PA TADA JE POTREBNO DA SE ODUZME FUSCHIA BACKGROUND, ONOM ELEMENTU, KOJI JU JE IMAO
        // I POTREBNO JE DA GLOBALNA VARIJABLA VISE NE REFERENCIRA, TAJ ELEMENT

        if(tipEventa === 'mouseover' && target.nodeName !== 'TD' && lastTDisFus){
            trenutniTDFuchsia.classList.remove('fuchsia');
            trenutniTDFuchsia = null;

            return;
        }

        // SADA SE MOGU POSVETITI, STA SE TO TREBA DOGODITI, KADA SE TRIGGERUJE mouseout NA 'TD' TARGET-U
        //  MORAM IMATI NA UMU DA TAKAV ELEMENT, VEC PREDHODNO IMA TU ROZIKASTU NOVU BOJU, JER SE NA 'TD'
        // VEC RANIJE TRIGGER-OVAO  mouseover , A GORE SAM DEFINISAO (PRVA DVA USLOVA U OVOM BLOKU); DA SE
        //TADA, POMENUTA BOJA FUCSHIA DODA
        //E PA NA mouseout, ONA TREBA DA SE UKLONI TAKO STO CU ELEMENTU, KOJEM SAM NA mouseover DODAO BOJU,
        //  SADA NJU NA mouseout ODUZETI, I GLOBALNOJ VARIJABLOJ DODELITI null KAO VREDNOST

        if(tipEventa === 'mouseout' && target.nodeName === 'TD' && lastTDisFus){
            trenutniTDFuchsia.classList.remove('fuchsia');
            trenutniTDFuchsia = null;

            return;
        }

    }
   
};

document.querySelector('.table_kont_three > table').onmouseover = 
document.querySelector('.table_kont_three > table').onmouseout = floatingHandler;

document.querySelector('.table_kont_three > input').onclick = function(ev){
    ev.target.closest('.table_kont_three').querySelector('textarea').value = "";
};

//OVAJ PRIMER JE AUTOR, POTPUNO DRUGACIJE URADIO
// I U NJEGOVOM PRIMERU SE U GLOBALNOJ VARIJABLOJ SKLADISTI 'TRENUTNO ROZIKASTI ELEMENT';
// ALI ON JE DEFINISAO DVA HANDLERA, ZA RAZLIKU OD MENE, JEDAN ZA mouseover, A DRUGI ZA mouseout
// I ON IMA, ZNATNO MANJE USLOVNIH IZJAVA
// OSTAVICU OVDE LINK DO NJEGOVE VERZIJE  http://plnkr.co/edit/S4efBBUJsdcYo4kKF81E?p=preview


//SADA CU URADITI, JOS PAR PRIMERA, VEZANIH ZA OVE EVENT-OVE, KOJI SE TRIGGERUJU, POMERANJEM KURSORA

//PRVI PRIMER, KOJI CU RADITI JE TOOLTIP PRIMER
//PRE NEGO STO KRENEM U DEFINISANJE HTML-A; MORAM RECI DA KAKO BI PRIMER BIO DEFINISAN KAKO TREBA,
// POTREBNO JE DA BUDE MOGUCE SCROLLOVANJE, NA NACIN DA SE ELEMENTI OVOG PRIMERA BUDU MOGLI POMERENI 
// GORE, I DA SE BUDU MOGLI 'SAKRITI IZNAD WINDOW-OVE GORNJE IVICE' TAKO DA CU UNESTI MNOGO <br> <hr>
// ELEMENATA, A NEGDE U SREDINU (USTVARI BLIZE POCETKU, JER JE BITNO DA NAKON HTML MOG PRIMERA
// BUDE NEKI EKSTENZIVNI SADRZAJ (HTML)) TOG UNOSA, DEFINISACU HTML MOG PRIMERA

const html_for_house_example = `
<div data-tool="Ovo je enterijer kuce" id="kuca">
    <div data-tool="Ovo je krov kuce" id="krov"></div>
    <p> Nekada je postojala majka svinja koja je imala tri male svinje. </p>
    <p>Tri male svinje su postale toliko velike da im je njihova majka rekla: "Vi ste preveliki 
    da više živite ovde. Morate ići i sami graditi kuće, ali pobrinite se da vas vuk ne uhvati. "</p>
    <p>Tri male svinje su se pokrenule. "Pobrinućemo se da nas vuk ne uhvati", rekli su. </p>
    <p> Ubrzo su upoznali čoveka. 
        <a 
        href="https://sr.wikipedia.org/wiki/%D0%A2%D1%80%D0%B8_%D0%BF%D1%80%D0%B0%D1%81%D0%B5%D1%82%D0%B0"
        data-tool="Read on ..."
        > 
            Hoveruj kursorom preko mene 
        </a> 
    </p>
</div>
`;

const css_for_house_example = `
    #kuca {
        border: pink solid 2px;
        margin-top: 58px;
        margin-left: 28px;
        width: 420px;
        box-sizing: border-box;
    }

    #krov {             /*OVDE JE PRISUTNO, VEOMA INTERESANTNA UPOTREBA BORDER-A*/
        width: 0;
        height: 0;
        border-left: 209px solid transparent; 
        border-right: 209px solid transparent;
        border-bottom: 28px solid firebrick;
        margin-top: -29px;
    }

    #kuca p {
        text-align: justify;
        margin: 12px 4px;
    }

    /*tooltip*/

    .tool {
        position: fixed;
        display: inline;
        z-index: 100;
        text-align: center;
        font: italic 14px/1.3 sans-serif; /*MORAM SAZNATI, KAKAV JO OVO RAZLOMAK PRI DEFINISANJU VELICINE FONTA*/
        border: 2px solid blanchedalmond;
        background-color: mistyrose;
        color: #1d1d08;
        padding: 8px 18px;
    }
`;

//GLOBALNA VARIJABLA, CIJA JE NAMENA DA SKLADISTI TRENUTNO PRIKAZANI TOOLTIP
let trenutniTooltip = null;

//HANDLER KOJI CU KAZITI ZA #kuca   ZA SLUCAJ   mouseover/out
const giveTakeTooltip = function(ev){
    //target SAM DEKLARISAO KAO VARIJABLU, A NE KONSTANTU, ZATO STO SAM U JEDNOM SLUCAJU, VIDEO DA JE
    //KORISNO DA OVA VARIJABLA PROMENI VREDNOST, ODNOSNO DA DRUGI ELEMENT POSTANE REFERENCIRAN OD STRANE
    // target VARIJABLE
    let target = ev.target;
    // OSTALE REFERENCE, KOJE SU MI POTREBNE A KOJIMA PRISTUPAM PREKO INSTANCE EVENTA
    const relatedTarget = ev.relatedTarget;
    const tipEventa = ev.type;
    const koords = ev.target.getBoundingClientRect();
    // PRILICNO SUGESTIVAN NAZIV OVE METODE
    const hisAncestorIsHouseOrHeIsHouse = function(element){
        while(element){
            if(element.id === 'kuca'){
                return true;
            }
            element = element.parentNode;
        }
        return false;
    };
    //ISTO TAKO, NAZIV SLEDECE METODE JE ISTO SUGESTIVAN
    //POZIVANJEM OVE METODE SE OTKACUJE TOLLTIP OBJEKAT IZ DOMA (TACNIJE SA body ELEMENTA, JER body
    // TREBA DA BUDE, NJEGOV PARENT) 
    const removingTooltip = function(){
        trenutniTooltip.remove();
        trenutniTooltip = null;
    };
    // IMENA SLEDECIH KONSTANTI SU POPRILICNO SUGESTIVNA
    const targetIsAnchor = target && target.nodeName === 'A' && hisAncestorIsHouseOrHeIsHouse(target)
        ?
        true
        :
        false;

    const targetIsHouse = target && target.id === 'kuca' && hisAncestorIsHouseOrHeIsHouse(target)
        ?
        true
        :
        false;

    const targetIsRoof = target && target.id === 'krov' && hisAncestorIsHouseOrHeIsHouse(target)
        ?
        true
        :
        false;

    const targetIsParagraph = target && target.nodeName === 'P' && hisAncestorIsHouseOrHeIsHouse(target)
        ?
        true
        :
        false;

    //PREDHODNI TERNARY-JI TREBA DA SE REFAKTORISU, I SAMO JEDNO POZIVANJE  hisAncestorIsHouseOrHeIsHouse
    //JE SASVIM DOVOLJNO, A JA IH IMAM MNOGO (TO JE PREVISE while LOOP-OVA)
    
    //PRVO DEFINISEM STA TREBA DA BUDE IZVRSENO TRIGGERING-OM       mouseover EVENTA 
    if(tipEventa === 'mouseover'){

        if(targetIsHouse || targetIsParagraph){     //U SLUCAJU KADA SU TARGETI ILI #house  ILI    p
                                                    //MENI USTVARI SAMO TREBA #kuca KOJA JE                   
            if(targetIsParagraph){                  //PARAGRAFOV ANCESTOR
                target = target.closest('#kuca');   //I ZATO, KADA JE target NEKI OD PARAGRAFA, JA
            }                                       //TADA ZELIM DA SE SVE POTREBNO IZVRSI ZA NJEGOVOG
                                                    //ANCESTORA, #kucu, JER SE TOOLTIP PRIKAZUJE ZA #kuca
            if(trenutniTooltip){
                removingTooltip();  //AKO POSTOJI STARI TOOLTIP, KOJI JE PRIKAZAN
            }                       //TREBA SE OTKACITI SA body-JA I NJEGOVA REFERENCA 'UNISTITI'

            trenutniTooltip = document.createElement('div');        //KREIRANJE NOVOG TOOLTIPA
            trenutniTooltip.textContent = target.dataset['tool'];   //DODELJIVANJE TOOLTIP-U TEKSTA, KOJEG SKLADISTI data-tool VARIJABLA target-A
            trenutniTooltip.classList.add('tool');      //STILIZOVANJE TOOLTIP-A
            document.body.append(trenutniTooltip);      //KACENJE TOOLTIPA NA BODY

            const koordinateTargeta = target.getBoundingClientRect();       
            const yFromWin = koordinateTargeta.y;       //POTREBAN MI JE RAZMAK OD GORNJE IVICE window-A, DO GORNJE IVICE target-A
            const xFromWin = koordinateTargeta.x;       //I RAZMAK OD LEVE IVICE window-A, DO LEVE IVICE target-A
            const targetHeight = koordinateTargeta.height;  //VISINA target-A
            const targetWidth = koordinateTargeta.width;    //SIRINA target-A
            //UMESTO STO SAM PRISTUPAO OBJEKTU, U SLEDECA DVA SLUCAJ, MOGAO SAM KORISTITI offsetWidth I offsetHeight
            const tooltipHeight = trenutniTooltip.getBoundingClientRect().height; //VISINA TOOLTIP-A
            const tooltipWidth = trenutniTooltip.getBoundingClientRect().width;   //SIRINA TOOLTIP-A

            // POZICIONIRANJE TOOLTIP-A
            if(yFromWin > tooltipHeight){
                trenutniTooltip.style.top = yFromWin - tooltipHeight - 4 + "px";
            }else{
                trenutniTooltip.style.top = yFromWin + targetHeight + 4 + "px";
            }

            if(xFromWin < 0){
                trenutniTooltip.style.left = "4px"
            }else{
                trenutniTooltip.style.left = xFromWin + targetWidth/2 - tooltipWidth/2 + "px";
            }

            return;

        }
        
        if(targetIsRoof){               //NEMA POTREBE OVO OBJASNJAVATI; JER JE CODE ISTI KAO I GORE
                                        //SAMO STO JE OVO SLUCAJ, KADA JE target, USTVARI #krov ELEMENT
            if(trenutniTooltip){            //CEO CODE SVA TRI BLOKAS, ODNOSNO ZA SLCAJ TRI ELEMENTA (ZA KOJE SE PRIKAZUJE TOOLTIP)
                removingTooltip();          //JE TREBAO DA BUDE UCAUREN U JEDNU FUNKCIJU I DA SE,                                 
            }                               //TAKAV KORISTI, ODNOSNO POZIVA U OBIMAMIAMA, SVAKE OD OVIH
                                            // if BLOKOVA
            trenutniTooltip = document.createElement('div');
            trenutniTooltip.textContent = target.dataset['tool'];
            trenutniTooltip.classList.add('tool');
            document.body.append(trenutniTooltip);

            const koordinateTargeta = target.getBoundingClientRect();
            const yFromWin = koordinateTargeta.y;
            const xFromWin = koordinateTargeta.x;
            const targetHeight = koordinateTargeta.height;
            const targetWidth = koordinateTargeta.width;
            const tooltipHeight = trenutniTooltip.getBoundingClientRect().height;
            const tooltipWidth = trenutniTooltip.getBoundingClientRect().width;

            if(yFromWin > tooltipHeight){
                trenutniTooltip.style.top = yFromWin - tooltipHeight - 4 + "px";
            }else{
                trenutniTooltip.style.top = yFromWin + targetHeight + 4 + "px";
            }

            if(xFromWin < 0){
                trenutniTooltip.style.left = "4px"
            }else{
                trenutniTooltip.style.left = xFromWin + targetWidth/2 - tooltipWidth/2 + "px";
            }

            return;
        }

        if(targetIsAnchor){             //NEMA POTREBE OVO OBJASNJAVATI; JER JE CODE ISTI KAO I GORE
                                        //SAMO STO JE OVO SLUCAJ, KADA JE target, USTVARI <a> ELEMENT
            if(trenutniTooltip){
                removingTooltip();
            }

            trenutniTooltip = document.createElement('div');
            trenutniTooltip.textContent = target.dataset['tool'];
            trenutniTooltip.classList.add('tool');
            document.body.append(trenutniTooltip);

            const koordinateTargeta = target.getBoundingClientRect();
            const yFromWin = koordinateTargeta.y;
            const xFromWin = koordinateTargeta.x;
            const targetHeight = koordinateTargeta.height;
            const targetWidth = koordinateTargeta.width;
            const tooltipHeight = trenutniTooltip.getBoundingClientRect().height;
            const tooltipWidth = trenutniTooltip.getBoundingClientRect().width;

            if(yFromWin > tooltipHeight){
                trenutniTooltip.style.top = yFromWin - tooltipHeight - 4 + "px";
            }else{
                trenutniTooltip.style.top = yFromWin + targetHeight + 4 + "px";
            }

            if(xFromWin < 0){
                trenutniTooltip.style.left = "4px"
            }else{
                trenutniTooltip.style.left = xFromWin + targetWidth/2 - tooltipWidth/2 + "px";
            }

            return

        }
    }else{      //KADA SE TRIGGER-UJE mouseout EVENT
        //U SLUCAJU mouseovera POTREBNO JE SAMO VODITI RACUNA KADA relatedTarget NE PRIPADA #kuca-A
        // I TADA TREBA UKLONITI TAJ TOLTIP, I UNISTITI, NEGOVU REFERENCU
        if(trenutniTooltip && !hisAncestorIsHouseOrHeIsHouse(relatedTarget)){    
            removingTooltip();
        }

        return;
    }
};

kuca.addEventListener('mouseover', giveTakeTooltip);
kuca.addEventListener('mouseout', giveTakeTooltip);

// PRIMER JE DRUGACIJE URADJEN U CLANKU, SA ZNATNO MANJE CODE-A; OSTAVICU LINK DO NJEGOVOG CODE-A
// http://plnkr.co/edit/jhXLvR2Ct0LIjyYAs3Z2?p=preview
//U OVOM SLUCAJU (IZ CLANKA) PRIMER JE JEDNOSTAVNIJI; JER JA MISLIM DA JA IMAM PRETRAN BROJ USLOVA 
//I USLOVNIH IZJAVA; U SUSTINI, POTREBNO JE SAMO PROVERITI DA LI ELEMENT, ILI NJEGOV ANCESTOR IMAJU
// data-tool KLASU (UZ POMOC closest    METODE   I ATRIBUT SELEKTORA) (ZANEMARITI TAGOVE)

// JA I DALJE NECU KORISTITI CODE IZ CLANKA, VEC CU SAMO REFAKTORISSATI CODE MOG PRIMERA


// PREDHODNI ('NOVI') PRIMER REFACTORED

const html_for_house_example2 = `
<div data-tool="Ovo je enterijer kuce" id="house">
    <div data-tool="Ovo je krov kuce" id="roof"></div>
    <p> Nekada je postojala majka svinja koja je imala tri male svinje. </p>
    <p>Tri male svinje su postale toliko velike da im je njihova majka rekla: "Vi ste preveliki 
    da više živite ovde. Morate ići i sami graditi kuće, ali pobrinite se da vas vuk ne uhvati. "</p>
    <p>Tri male svinje su se pokrenule. "Pobrinućemo se da nas vuk ne uhvati", rekli su. </p>
    <p> Ubrzo su upoznali čoveka. 
        <a 
        href="https://sr.wikipedia.org/wiki/%D0%A2%D1%80%D0%B8_%D0%BF%D1%80%D0%B0%D1%81%D0%B5%D1%82%D0%B0"
        data-tool="Read on ..."
        > 
            Hoveruj kursorom preko mene 
        </a> 
    </p>
</div>
`;

const css_for_house_example2 = `
    #house {
        border: pink solid 2px;
        margin-top: 58px;
        margin-left: 28px;
        width: 420px;
        box-sizing: border-box;
    }

    #roof {             /*OVDE JE PRISUTNO, VEOMA INTERESANTNA UPOTREBA BORDER-A*/
        width: 0;
        height: 0;
        border-left: 209px solid transparent; 
        border-right: 209px solid transparent;
        border-bottom: 28px solid firebrick;
        margin-top: -29px;
    }

    #house p {
        text-align: justify;
        margin: 12px 4px;
    }

    /*tooltip*/

    .tool_klasa {
        position: fixed;
        display: inline;
        z-index: 100;
        text-align: center;
        font: italic 14px/1.3 sans-serif; /*MORAM SAZNATI, KAKAV JO OVO RAZLOMAK PRI DEFINISANJU VELICINE FONTA*/
        border: 2px solid blanchedalmond;
        background-color: mistyrose;
        color: #1d1d08;
        padding: 8px 18px;
    }
`;

let tempTooltip = null;

const addRemoveTooltip = function(ev){
    
    let target = ev.target;
    
    const tipEventa = ev.type;

    const hisAncestorIsHomeOrHeIsHome = function(element){
        while(element){
            if(element.id === 'house'){
                return true;
            }
            element = element.parentNode;
        }
        return false;
    };
    
    const removingTooltip = function(){
        tempTooltip.remove();
        tempTooltip = null;
    };
    
    const hisAncestorIsHouseOrHeIsHouse = hisAncestorIsHomeOrHeIsHome(target);


    if(tipEventa === 'mouseover'){

        let targetIsAnchor, targetIsHouse, targetIsRoof, targetIsParagraph;

        if(hisAncestorIsHouseOrHeIsHouse){

            targetIsAnchor = target.nodeName === 'A' && hisAncestorIsHouseOrHeIsHouse?true:false;
            targetIsHouse = target.id === 'house' && hisAncestorIsHouseOrHeIsHouse?true:false;
            targetIsRoof = target.id === 'roof' && hisAncestorIsHouseOrHeIsHouse?true:false;
            targetIsParagraph = target.nodeName === 'P' && hisAncestorIsHouseOrHeIsHouse?true:false;
        }

        const removeOldAddNewTooltip = function(target){
            if(tempTooltip){
                removingTooltip();
            }
    
            tempTooltip = document.createElement('div');
            tempTooltip.textContent = target.dataset['tool'];
            tempTooltip.classList.add('tool_klasa');
            document.body.append(tempTooltip);
    
            const koordinateTargeta = target.getBoundingClientRect();
            const yFromWin = koordinateTargeta.y;
            const xFromWin = koordinateTargeta.x;
            const targetHeight = koordinateTargeta.height;
            const targetWidth = koordinateTargeta.width;
            const tooltipHeight = tempTooltip.offsetHeight;
            const tooltipWidth = tempTooltip.offsetWidth;
    
            if(yFromWin > tooltipHeight){
                tempTooltip.style.top = yFromWin - tooltipHeight - 4 + "px";
            }else{
                tempTooltip.style.top = yFromWin + targetHeight + 4 + "px";
            }
    
            if(xFromWin < 0){
                tempTooltip.style.left = "4px"
            }else{
                tempTooltip.style.left = xFromWin + targetWidth/2 - tooltipWidth/2 + "px";
            }
        };

        if(targetIsHouse || targetIsParagraph){

            if(targetIsParagraph){
                target = target.closest('#house');
            }
            
            removeOldAddNewTooltip(target);

            return;
        }
        
        if(targetIsRoof){               
            
            removeOldAddNewTooltip(target);

            return;
        }

        if(targetIsAnchor){             
            
            removeOldAddNewTooltip(target);

            return;

        }

    }else{

        const relatedTarget = ev.relatedTarget;

        if(tempTooltip && !hisAncestorIsHomeOrHeIsHome(relatedTarget)){
            removingTooltip();
        }

        return;
    }
};

house.addEventListener('mouseover', addRemoveTooltip);
house.addEventListener('mouseout', addRemoveTooltip);

// //////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////

// SADA CU ODRADITI NOVI PRIMER, A TO JE PRIMER, KOJI SE U CLANKU ZOVE "SMART TOOLTIP"
// ODNOSNO, POTREBNO JE DEFINISATI DA SE TOOLTIP PRIKAZE NA ELEMENTU, TEK ONDA, KASDA KURSOR PRESTANE
// DA SE KRECE I ZADRZI SE NA ELEMENTU
// ONO CEGA NE SME BITI JESTE BLINKING, ODNOSNO PRIKAZIVANJE I SKLANANJANJE TOOLTIPA, TOKOM POMERANJA
// KURSORA, PREKO ELEMENTA, VEC SAMO KAD SE KURSOR ZADRZI MIRAN NA ELEMENTU

// IDEJA, KAKO OVO DA NAPRAVIM JESTE 
        //IGNORISANJE   mousemove EVENTA; ODNOSNO, DOK GOD SE TRIGERUJE mousemove TREBALO BI DA 
        // GLOBALNA VARIJABLA UVEK BUDE null

// MOZDA POSTOJI VISE NACINA DA SE DEFINISE DA SE TOOLTIP PRIKAZE NAKON STO ELEMENT STANE
// A JA IMAM IDEJU DA KORISTIM Date INSTANCE, ODNOSNO DA AKO JE VREMENSKA RAZLIKA IZMEDJU DVA SUSEDNA
// TRIGGERING-A mousemove-A PREVELIKA, ODNOSNO AKO NAKON ODREDJENOG INTERVALA, NEMA NOVOG TRIGGERING-A
// mousemove-A, DA SE TADA 'UHVATI' mouseover I DA SE PRIKAZE TOOLTIP

window.customElements.define('smart-tooltip', class extends HTMLElement {
    constructor(){
        super();
        
        const shadowRoot = this.attachShadow({mode: 'open'});
        
        const slotForElement = document.createElement('slot');
        
        const styleElement = document.createElement('style');

        const styleText = `
            :host {
                box-sizing: border-box;
                display: block;
                border: pink solid 2px;
            }
            
            /* STIL ZA DEFAULT SLOTTED (AKO JE SLOTTED ELEMENT, div) */
            ::slotted(div) {
                border: olive solid 2px;
                margin: 18px;
                text-align: justify;
            }
        `;

        slotForElement.name = 'element';
        styleElement.textContent = styleText;

        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(slotForElement);

        this._tempTooltip = null;

        this.removingTooltip = this.removingTooltip.bind(this);
        this.removeOldAddNewTooltip = this.removeOldAddNewTooltip.bind(this);
        this.hoveringHandler = this.hoveringHandler.bind(this);
        this.onMouseOutHandler = this.onMouseOutHandler.bind(this);

        this.onMovingHandler = this.onMovingHandler.bind(this);

        this.timerHandler = this.timerHandler.bind(this);

        this.timerGapEnoughHandler = this.timerGapEnoughHandler.bind(this);

        this.timerNumber = null;
        this._timerFunctionRemoved = null;

    }

    connectedCallback(){

        this.shadowRoot.querySelector('[name=element]').addEventListener(
            'mousemove', 
            this.onMovingHandler
        );

        /*this.shadowRoot.querySelector('[name=element]').addEventListener(
            'mouseover', 
            this.hoveringHandler
        );*/ 
        
        this.shadowRoot.querySelector('[name=element]').addEventListener(
            'mouseout',
            this.onMouseOutHandler
        );

        this.shadowRoot.querySelector('[name=element]').addEventListener(
            'time-gap-enough', 
            this.timerGapEnoughHandler
        );

    }

    //EVENT HANDLERS//////////////////////////////

    onMovingHandler(ev){
        if(this._tempTooltip){
            this._tempTooltip.remove();
            this._tempTooltip = null;
        }

        if(this.timerNumber){
            window.clearInterval(this.timerNumber);
            this._timerFunctionRemoved = true;
        }

        this._initialMovingTime = new Date();

        this.timerNumber = window.setInterval(this.timerHandler, 100);

    }

    hoveringHandler(ev){
        this.removeOldAddNewTooltip(ev.target);
    };

    timerHandler(){
        const currentTime = new Date();

        if(currentTime - this._initialMovingTime > 480){
            this.shadowRoot.querySelector('[name=element]').dispatchEvent(
                new CustomEvent('time-gap-enough',{
                    bubbles: true, cancelable: true
                })
            );
        }

        console.log('something');
    }

    ////////////////////Handler for custom event///////////////////////////////////
    timerGapEnoughHandler(ev){
        
        for(let node of ev.target.assignedNodes()){         //OVO JE MORALO OVAKO (MISLIM NA PRISTUPANJE slot-OVLJEVIM, SLOTTED ELEMENTIMA)
            if(node.hasAttribute('data-tooltipsy')){        //ZBOG PROBLEMA SA CUSTOM EVENT-OVIMA
                this.removeOldAddNewTooltip(node);          //I SLOTOVIMA (OVO BI TEK TREBALO OBJASNITI)
                break;
            }
        }                                                   

    }
    
    /////////////////////////////////////////////////////////////

    removingTooltip(){
        this._tempTooltip.remove();
        this._tempTooltip = null;
    }

    removeOldAddNewTooltip(target){

        target = target.closest('[data-tooltipsy]');

        if(this._tempTooltip){
            this.removingTooltip();
        }

        this._tempTooltip = document.createElement('div');
        this._tempTooltip.textContent = target.dataset['tooltipsy'];
        
        //OVO MORA OVAKO JER TOOLTIP TREBA DA BUDE APPENDOVAN NA body, A NE MOGU MU APLICIRATI STILOVE IZ 
        // SHADOW ROOT-A
        const tooltipsyStyles = [
            ["position", "fixed"],
            ["display", "inline"],
            ["zIndex", "100"],
            ["font", "italic 14px/1.3 sans-serif"],
            ["border", "2px solid blanchedalmond"],
            ["backgroundColor", "mistyrose"],
            ["color", "#1d1d08"],
            ["padding", "8px 18px"],
        ];

        for(let i = 0; i < tooltipsyStyles.length; i++){
            this._tempTooltip.style[tooltipsyStyles[i][0]] = tooltipsyStyles[i][1]; 
        }

        document.body.append(this._tempTooltip);

        const koordinateTargeta = target.getBoundingClientRect();
        const yFromWin = koordinateTargeta.y;
        const xFromWin = koordinateTargeta.x;
        const targetHeight = koordinateTargeta.height;
        const targetWidth = koordinateTargeta.width;
        const tooltipHeight = this._tempTooltip.offsetHeight;
        const tooltipWidth =this._tempTooltip.offsetWidth;

        if(yFromWin > tooltipHeight){
            this._tempTooltip.style.top = yFromWin - tooltipHeight - 4 + "px";
        }else{
            this._tempTooltip.style.top = yFromWin + targetHeight + 4 + "px";
        }

        if(xFromWin < 0){
            this._tempTooltip.style.left = "4px";
        }else{
            this._tempTooltip.style.left = xFromWin + targetWidth/2 - tooltipWidth/2 + "px";
        }

        window.clearInterval(this.timerNumber);
        
    }

    onMouseOutHandler(ev){
        // console.log(ev.relatedTarget)
        if(ev.relatedTarget){
            if(!ev.relatedTarget.closest('[name=element]') && this._tempTooltip){
                this._tempTooltip.remove();
                this._tempTooltip = null;
                
            }
        }

        if(this.timerNumber){
            window.clearInterval(this.timerNumber);
        }
    }

});

//TREBAO SAM SE VRATITI NA PREDHODNI PRIMER, I DOBRO IZKOMENTARISATI, SAV CODE, OVOG CUSTOM ELEMENTA

// U PRIMERU IZ CLANKA, OVAJ TOOLTIP JE DEFINISAN DRUGACIJE; A UZ TO, NIJE KORISCEN CustomEventRegistry
// OSTAVICU, RESENJE OVDE
// MENI SE LICNO NE SVIDJA, JER SAM PRIMETIO DA KAD SE PREDJE PREKO CHILD ELEMENATA, ILI KAD SE KURSOR
//  OSTAVI DA STOJI, PREKO CHILD ELEMENATA (ONOG ELEMENATA ZA KOJI TREBA DA SE PRIAKZE TOOLTIP),
//  DA SE TADA TOOLTIP VISE NE PRIKAZUJE; ALI IPAK CU OSTAVITI LINK OVOG PRIMERA; 
// http://plnkr.co/edit/2DeX3W61SFZa8OqqzjI0?p=preview
// AKO NEKAD KASNIJE BUDEM ZELO DA GA REVIEW-JUJEM

//OVIMN PRIMEROM(MOJIM PRIMER-OM, ODNOSNO MOJOM VERZIJOM) SAM ZAVRSIO SA UPOZNAVANJEM SA
//  mousemove, mouseover/out, mouseenter/leave 
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
                


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// SADA NASTAVLJAM PRICU SA EVENT-OVIMA
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// POZABAVICU SE SA KEYBOARD EVENT-OVIMA:      
                    //                          keydown     I       keyup
                    
// ALI PRE NEGIO STO DODJEM DO KEYBOARD-A, MORAM ZNATI DA NA MODERNIM DEVICE-OVIMA, POSTOJE DRUGI NACINI
// DA SE 'NESTO UNESE' ('input something')
// NA PRIMER, LJUDI KORISTE SPEECH RECOGNITION (POSEBNO NA MOBILNIM UREDJAJIMA), ILI KORISTE copy/paste
// UZ POMOC MISA
// TAKO DA AKO ZELIM DA TRACK-UJEMBILO KOJI UNOS U <input> FIELD, KEYBOARD EVENT-OVI NISU DOVOLJNI
// ZATO POSTOJI JEDAN EVENT, KOJI SE ZOVE:
//                                                 'input'      EVENT
//                                                                   KOJI HANDLE-UJE PROMENE <input>
//                                                                   FIELD-A, PROMENE POUZROKOVANE
//                                                                   BILO KOJIM SREDSTVIMA (BY ANY MEANS)
// I ZA HANDLE-OVANJE PROMENA <input> FIELD-A, KORISCENJE 'input' EVENTA JE BOLJI IZBOR
// A S POMENUTIM CU SE UPOZNATI KASNIJE KADA SE BUDEM BAVIO EVENTOVIMA TIPA:  'change' , 'input' 
//                                                                            'cut', 'copy', 'paste'
//                                                                             (TO JE U SKLOPU CLANAKA
//                                                                             KOJI SE BAVE FORMULARIMA
//                                                                             I KONTROLAMA)

// NAIME, KEYBOARD EVENT-OVI SE TREBAJU KORISTITI, KADA ZELIM DA HANDLE-UJEM KEYBOARD ACTIONS
// TU SE UBRAJA I VIRTUELNA TASTATURA
// NA PRIMER, ZA REACTION NA ARROW KEY-OVE   Up  I  Down ,  ILI HOTKEYS (UKLJUCUJUCI I KOMBINACIJU KEY-EVA) 

//     keydown     i      keyup
// keydown     EVENTOVI (DAKLE MNOZINA; OVO JE VEOMA VAZNO) SE TRIGGER-UJU, KADA JE DUGME PRITISNUTO NADOLE
// A    keyup EVENT (JEDNINA) SE TRIGGER-UJE, KADA SE DUGME PUSTI

//      event.code          event.key
// 
//  key     PROPERTI INSTANCE EVENTA, OMOGUCAVA GETT-OVANJE KARAKTERA, DOK      code        PROPERTI
// INSTANCE EVENT-A, OMOGUCAVA GETT-OVANJE, NECEGA STO SE ZOVE          'PHISYCAL KEY CODE'
//                                                                      ('FIZICKI CODE DUGMETA')

// NA PRIMER, JEDAN TE ISTI KEY        Z        MOZE BITI PRITISNUT SA, ILI BEZ   'Shift'-A
// TO MI DAJE DVA RAZLICITA KARAKTERA:
        //                              LOWERCASE 'z'   I   uppercase 'Z'
// U TOM SLUCAJU    event.key   VREDNOST JE EGZAKTAN KARAKTER, BICE RAZLICITA (DAKLE BICE ILI 'z' ILI 'Z') 
// ALI ONO STO OSTAJE ISTO U OBA SLUCAJE JESTE   event.code

// PRISTISNUTO                         event.key                            event.code
        //      Z                          'z'   (LOWERCASE)                       'KeyZ'
        //      Shift + Z                  'Z'   (UPPERCASE)                       'KeyZ'
////////////////////////////////////////////////////////////////////////////////////////////////////////
// A AKO KORISNIK RADI SA RAZLICITIM JEZICIMA, ONDA BI SWITCHING NA DRUGI LANGUAGE, BI UCINLO DA KADA SE
// PRITISNE         Z       TO USTVARI BUDE POTPUNO DRUGACIJI KARAKTER, ODNOSNO DA BUDE UNESEN POTPUNO
// DRUGACIJI KARAKTER, TO ZNACI DA CE VREDNOST      event.key       BITI PROMENJENA
                // ALI event.code      OSTAJU ISTO          A TO JE U OVOM PRIMERU      'KeyZ'

// UPAMTI DOBRO, DA JE VREDNOST         event.code        JE UVEK TAKVA DA   'Key'     DEO, UVEK POCINJE
// VELIKIM SLOVOM, A TAKODJE I OSTALO (ODNONO ONO STO SE ODNOSI NA KARAKTER (U OVOM SLUCAJU 'Z')), JESTE
// UVEK NAPISANO VELIKIM SLOVOM  (DAKLE NIJE   keyz, ILI Keyz ILI keyZ   VEC JESTE   KeyZ)

//      OVO BI BILO         false       KADA BIH NAPISAO OVAKO      event.code === "keyZ"
// STO ZNACI DA       CASE MATTERS 

// NAIME, SVAKI KEY IMA    code     KOJI ZAVISI OD NJEGOVE LOKACIJE NA TASTATURI; I Key codes SU OPISANI
// U NECEMU STO SE ZOVE         UI Events code specification    https://www.w3.org/TR/uievents-code/
        
// NA PRIMER 
        // LETTER KEYS IMAJU code-OVE, KOJI IZGLEDAJU OVAKO:    'Key<letter>'
        //                                                                        "KeyA", "KeyB"  etc.
        // DIGIT KEYS IMAJU code-OVE, KOJI IZGLEDAJU OVAKO:     'Key<number>'
        //                                                                         "Digit0", "Digit1"  etc.
        // SPECIAL KEYS SU CODED BY THEIR NAMES:  "Enter", "Backspace", "Tab"  etc.

// NAIME, POSTOJI NEKOLIKO RASPROSTRANJENOSTI (WIDESPREAD, MOZDA SE MISLI DA POSTOJI NEKOLIKO TIPOVA
// TASTATURA, SA RAZLICITO PROSTRTIM KEY-OVIMA) KEYBOARD LAYOUT-A; I SPECIFIKACIJA DAJE key codes ZA SVAKU
// OD NJIH (MOZDA SE IPAK MISLILO NA SEKCIJE JEDNE TASTATURE (ODNOSNO DA POSTOJI SEKCIJA GDE SU LETTERS, 
// PA SEKCIJA GDE SU DIGITS, ZATIM SPECIAL...)) OSTAVICU LINK ZA TE SVE SPECIFIKACIJE
// https://www.w3.org/TR/uievents-code/#key-alphanumeric-section

// STA AKO KEY NE PRUZA NI JEDAN KARAKTER? STA PO D TIME MISLIM?
        // PA NA PRIMER         F1     ili     Shift     ili neki drugi 
        // ONI ZAISTA NE DAJU NIAKAKAV KARAKTER, KADA PRITISNEM NA NJIH
    // ZA NJIH      event.key       JESTE PRIBLIZNO (VIDECU ZASTO SAM REKAO PRIBLIZNO ODNOSNO APPROXYMATELY) 
    // ISTO, KAO    event.code
// POSMATRACU SLEDECI PRIKAZ

            //      Key                     event.key                       event.code
            //            F1                            'F1'                            'F1'
            //            Backspace                     'Backspace'                     'Backspace'
            //            Shift                         'Shift'             ILI 'ShiftRight' ILI 'ShiftLeft'

// AKO POGLEDAM OVE VREDNOSTI, I AKO POGLEDAM VREDNOST      event.code      VIDECU DA ON SPECIFICIRA
// KOJI JE KONKRETNO KEY PRITISNUT
// NA PRIMER, MNOGE TASTATURE IMAJU      DVA Shift KEYA     ; JEDAN NA LEVOJ I JEDAN NA DESNOJ STRANI
// event.code GOVORI KOJI JE TACNO OD NJIH PRESSED; A       event.key       JE ODGOVORAN ZA 'ZNACENJE'
// ODNOSNO RESPONISBILE FOR THE 'MEANING' OF THE KEY: ODNOSNO 'STA JE?' (TO JE 'Shift')

// ZAMISLICU DA JA SADA ZELIM DA HANDLE-UJEM HOTKEY:      Ctrl+Z (TO JE ISTO STO I  Cmd+Z  U SLUCAJU Mac-a)
// A MNOGI TEKST EDITORI HOOK-UJU (ODNOSNO POVEZU PRITISKANJE OVE KOMBINACIJE KEY-EVA) SA "Undo" AKCIJOM
// (PONISTAVANJE PREDHODNOG UNOSA)
// MOZE SE PODESITI LISTENER (ON keydown) I PROVERITI, KOJI JE TO KEY PRITISNUT; KAKO BI DETEKTOVAO, KADA 
// IMAM HOTKEY
// SADA JE U CLANKU POSTAVLJENO JEDNO PITANJE U POGLEDU TAKVOG LISTENERA; A ONO GLASI:
//                                     STA SE TREBA KORISTITI U TOM HANDLERU DA BI PROVERIO DA LI JE REC
//                                     O HOTKEY-U ILI NE? DA LI TREBA KORISTITI  event.key  ILI  event.code ?

// ODGOVOR JE DA JE ZA POMENUTU POTREBU, NARAVNO TREBA KORISTITI        event.code       
// DAKLE ZA POMENUTU PROVERU DA LI JE HOTKEY PRITISNU, NE TREBA MI      event.key; ZATO STO SE NJEGOVA
// VREDNOST MOZE MENJATI; U ZAVISNOSTI OD ENABLOVANOG JEZIKA (MISLIM NA JEZIK UNOSA A NE PROGRAMSKI) ILI
// PRITISNUTOG CapsLock-A
// A VREDNOST         event.code-A      JE STRIKTNO VEZANA ZA KEY

// SADA CU UPRAVO DEFINISATI I ZAKACITI TAKAV HANDLER, KOJI PROVERAVA DA LI JE PRITISNUT HOTKEY
//      Ctrl + Z    ILI     Cmd + Z             (NE ZABORAVI DA SE metaKey PROPRTYI, USTVARI KORISTI DA 
//                                               SE PROVERI DA LI JE Cmd NA Mac-u PRITISNUT)

document.addEventListener('keydown', function(ev){
    if(ev.code === 'KeyZ' && (ev.ctrlKey || ev.metaKey)) alert('Undo!');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
// MISLIM DA SAM OVO VEC RANIJE SPOMENUO, A STO SE ODNOSNI NA   keydown JESTE
//                                                                                 AUTO-REPEAT

// AKO JE KEY PRITISNUT DOVOLJNO DUGO VREMENA, TRIGGEROVANJE    keydown-A   POCINJE DA SE PONAVLJA, IZNOVA
// I IZNOVA
// I ONDA KADA SE PUSTI DUGME, KONACNO TRIGGER-UJE SE   keyup   
// NAIME, IT'S KIND OF NORMAL: 
//                              TO, IMANJE MNOGO keydown-OVA, I TO IAMNJE SAMO JEDNOG keyup-A
// ZA SVE REPEATING KEYS event OBJEKAT IMA      
//                                              
//                                              event.repeat        PROPERTI, PODESEN NA        true

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////// DEFAULT ACTIONS VEZANE ZA KEYBOARD EVENT-OVE
// DEFAULT akcije VARIJAJU, jer postoji mnogo mogućih stvari koje MOZE INICIRATI tastatura.
// Na primer:
            //      POJAVA KARAKTERA NA EKRANU (NAJOCIGLEDNIJI ISHOD (MOST OBVIOUS OUTCOME)) 
            //      KARAKTER JE DELET-OVAN  (Delete KEY)
            //      STRANICA JE SCROLL-OVANA (PageDown KEY)
            //      BROWSER OTVORA 'Save Page' DIALOG (Ctrl + S)
            //      ... I TAKO DALJE I TAKO DALJE

// PREVENT-OVANJE DEFAULT AKCIJA U      ON keydown      HANDLER-U MOZE CANCEL-OVATI VECINU NJIH;
// SA IZUZETKOM, NEKIH OS-based SPECIJALNIH KEY-EVA NA PRIMER Windows-OV        Alt + F4    ZATVARA
// BROWSER; I NE POSTOJI NACIN DA SE SPRECI, TAKO STO BI PREVENT-OVAO DEFAULT ACTION U 
// JAVASCRIPT-U
// ZATO CU SADA KREIRATI, JEDAN PRIMER

// U PRIMERU CE SE SPRECAVATI DEFAULT ACTION, U ON keydown HANDLER-U (ZAKACENOM ZA input FIELD),
// U SLUCAJU, KADA SE PRITISKAJU KEY-EVI, KOJI NISU SPECIFICNI ZA BROJ TELEFONA
// DAKLE, POTREBNO JE SPRECITI DEFAULT ACTION, AKO SE PRITISKA NA NON Digit KEY-EVE, ANO PORED DIGIT
// KEY-EVA TREBA DA BUDE OMOGUCENO JESU KAY-EVI             '('   ')'    '+'    '-'

let checkPhoneKey = function(key){
    return (key >= 0 && key <= 9) || key === '+' || key === '-' || key === '(' || key === ')';
};

// GORNJU FUNKCIJU CU POZVATI INLINE, U OBIMU   onkeydown   HANDLERA. SLEDECEG input FIELD-A
const input_broja_tel = `
<input class="za_tel" onkeydown="return checkPhoneKey(event.key)" placeholder="Phone please" type="tel">
`;
// ZNACI AKO JE POVRATNA VREDNOST EVENT HANDLER-A, false , ONDA JE SPRECEN DEFAULT BEHAVIOR
// U OVOM SLUCAJU CE BITI SPRECEN DEFAULT (A JEDAN OD DEFAULT-OVA JE UNOS KARAKTERA U INPUT)
// AKO KARAKTER NIJE JEDAN OD GORE POMENUTIH

// MEDJUTIM TREBA PRIMETITI DA U PREDHODNOM PRIMERU, SPECIJALNI KEY-EVI KAO STO SU:
                                        //       Backspace      Left      Right     NE RADE U INPUT-U
                                        // A NE RADI NI HOTKEY      ctrl + V    (PASTING, ODNOSNO
                                        //                                          PROSLEDJIVANJE)
// TO JE, NAIME OSTLO KAO SIDE EFFECT STRIKNOG FILTERA      checkPhoneKey

// TAKO DA CU MALO RELAKSIRATI SITUACIJU

checkPhoneKey = function(key){
    return (key >= 0 && key <= 9) || key === '+' || key === '-' || key === '(' || key === ')' ||
            key === 'ArrowRight' || key === 'Backspace' || key === 'Delete' || key === 'ArrowLeft'
};
// DAKLE SADA STRELICE I DELITION RADE KAKO TREBA
// ONO STO I DALJE NE RADI JESTE    PASTING     PUTEM       Ctrl + V
// MEDJUTIM DRUGACIJI PASTE, JESTE MOGUC ,ALI TAJ PAST NE IZISKUJE TRIGGERING KEYBOARD EVENT-OVA   

// NAIME, I DALJE JE MOGUC UNOS BILO CEGA (BILO KAKVIH KARAKTERA, STO MI NARAVNO NE ODGOVARA),
// I TO UZ KORISCENJE    right-click + Paste
// TAKO DA FILTER NIJE 100% POUZDAN
// MOGU GA SAMO PUSTITI DA BUDE TAKAV, ZATO STO U VECIN ISLUCAJEVA FUNKCIONISE (OSI MZA POMENUTI)
// ILI SE MOZE PRIMENITI ALTERNATIVNI PRISTUP, KOJI SE SASTOJI OD TOGA DA SE TRACK-UJE input EVENT
// KOJI SE TRIGGERUJE, NAKON BILO KOJE MODIFIKACIJE (UNOSA, UKLANJANJA) INPUTA
// U ON inpot HANDLER-U BIH CHECK-OVAO NOVE VREDNOSTI; I HIGHLIGHT-OVAO/MODIFY-OVAO, KADA SU INVALID
///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////
// NASLEDJE (LEGACY)
//U prošlosti postojao je EVENT             'keypress'             TIPA, kao i 
// keyCode       charCode      which      PROPERTIJI EVENT OBJEKTA
// Bilo je toliko browser incompatabilities da su programeri specifikacije odlučili da ih   deprecate-UJU
// ODNOSNO OZNACE KAO ZASTARELE
// Stari kod još uvek funkcioniše, pošto ih pretraživač nastavlja podržavati, ali uopšte nema potrebe da 
// ih koristite
// Bilo je vremena kada je ovo poglavlje uključilo njihov detaljni opis. Ali od sada možemo zaboraviti
// na to

/////////////////////////////////////////  SUMMARY U POGLEDU KEYBOARD EVENT-OVA
// Pritiskom na taster uvek se generiše event tastature, bilo da se radi o simbolnim key-ovima
// ili specijalnim key-ovima, kao što su Shift ili Ctrl i tako dalje. Jedini izuzetak je Fn ključ
// koji se ponekad stavlja na laptopovoj tastaturi. (IMA GA I MOJA DESKTOPA TASTATURA) 
// Za to nema eventa na tastaturi, jer se često
// implementira na nižem nivou od operativnog sistema.

// EVENT-OVI na tastaturi:

// keydown - pritiskom na taster (automatsko ponavljanje ako je dugme pritisnuto dugo),
// keyup - kada pustim key


// Glavne karakteristike event-ova tastature:

// event.code - "key code" ("KeyA", "ArrovLeft" i tako dalje), specifični za fizičku lokaciju keya na
// tastaturi.
// event.key - karakter ("A", "a" i tako dalje), za non-character tastere obično imaju istu vrijednost kao
// event.code
// U prošlosti se događaji tastature ponekad koristili za praćenje korisničkog unosa u form fields 
// To nije pouzdano, jer ulaz može biti iz različitih izvora. Imamo    'input'      i       'change' 
// EVENT OVE, ZA HANDLOVANJE
// bilo kog unosa (BICE pokriveno kasnije KADA SE BUDEM BAVIO EVENTOVIMA:
// change, input, cut, copy, paste
// TRIGGER-UJU SE nakon bilo kog unosa, uključujući MOUSE ILI prepoznavanje govora (SPEECH RECOGNITION)

// Trebali bismo koristiti događaje na tastaturi kada zaista želimo tastaturu. Na primer, ZA REAKCIJE na
// hotkeys-EVIMA ili special key-ovima

// ONO STO NIJE BILO NAVEDENO U CLANKU, A STA SAM PRIMETIO JESTE DA ELEMENT MORA BITI FOCUSED DA BI SE NA
// NJEMU TRIGGEROVAO    keydown
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// SADA CU ODRADITI JEDAN PRIMER
// TREBA DA SE KREIRA FUNKCIJA, KOJA CE SE ZVATI        invocateOnKeys
// KOJOJ SE KAO ARGUMENTI DODAJU:                                       
//                                  CALLBACK
//                                  NEOGRANICEN BROJ KEY CODE-OVA
// 
// POMENUTI CALLBACK TREBA DA SE INVOCIRA, TEK KADA SU, ZAJEDNO PRITISNUTI
// SVI KEY-EVI, KOJIMA ODGOVARAJU POMENUTI STRINGOVI (U 'FORMATU' KEY code-A) DODATI KAO ARGUMENTI

// NAIME, MORA SE VODITI RACUNA, KOJI SU KEY-EVI PRITISNUTI, TAKO STO BI    DODAVAO NIZU,     ODNOSNO SET-U
// (JER JE SET BOLJI U OVAKVOM SLUCAJU (JER NE POSTOJI MOGUCNOT DA IMAM DVA ISTA KEY code-A))
// SVE ONE KEY code-OVE, KEYEVA KOJI SU TRENUTNO PRITISNUTI
// ONO STO SE MORA UPOTREBITI JESTE I keyup HANDLER, KAKO BI SE 'POCISTIO' TAJ SET
// ODNOSNO, KADA SE DOGODI,    keyup        EVENT, ONDA NESTO STO JE BILO PRITISNUTO, TO VISE NIJE, I
// NEMA POTREBE DA SE PROVERAVAJU code-OVI U SET-U

// MOZDA CU U OVOM PRIMERU, KORISTITI I     Set     INSTANCU JAVASCRIPT-A

// DAKLE, OVA FUNKCIJA, TREBA DA ZAKACI, NEOPHODNE HANDLERE, KEYBOARD EVENT-OVA NA ELEMENT
// (NISAM O TOME TAKO RAZMISLJAO I NAISAO SAM NA PROBLEMATIKU) (JER ORIGINALNO, JA SAM FUNKCIJI HTEO
// POZVATI U HANDLER-IMA, ALI TO NEMA NEKOG SMISLA U OVOM PRIMERU)

// IZMENIO SAM MALO FUNKCIJU, JER U PRIMERU IZ CLANKA, FUNKCIJI SE NE DODAJE ELEMENT, KAO ARGUMENT
// JA SAM GA IPAK DODAO

// OVO JE MOJA VERZIJA
const invocateOnKeys = function(element, funk, ...kodovi){
    const kodSet = new Set;     // DA, MOGUCE JE INSTANTICIRATI Set, BEZ DODAVANJA ZAGRADA KONSTRUKTORU
    element.addEventListener('keydown', function(ev){
        
        for(let code of kodovi){
            if(code === ev.code){       // DODAJEM SET-U, CLANOVE, SAMO AKO ODGOVARAJU NEKOM OD
                kodSet.add(ev.code);    // code ARGUMENTA
            }
        }

        if(kodSet.size === kodovi.length && ev.repeat){   // OVDE JE PRESUDILO ev.repeat
            funk();                                       // DA SAM DEFINISAO DA MORA BEZ REPEAT-A keydown-A
            kodSet.clear();                               // MOGLO BI I SA UZASTOPNO (DAKLE NE
        }                                                 // ISTOVREMENO, VEC UZASTOPNO) PRITISNUTIM  
                                                          // KEY-OVIMA (SPECIFICIRANIH code-OVA)

                                                            //A ZASTO SE SET CLEAR-UJE?
                                                            // PA MORA, JER DA NIJE, ONDA 
                                                            // KADA BI SE SLEDECI PUT BUDE
                                                            // TRIGGER-OVAO keydown, BEZ OBZIRA
                                                            // KOLIKO JE DUGMADI    
    }, false);
};

// U OVOM PRIMERU, KAO STO SE VIDI, NISAM UPOTREBIO I keyup EVENT


// ISPITACU OVU FUNKCIJU NA JEDNOM PARAGRAFU (DA, TO NEMA SMISLA, JER SE NE MOZE UNOSTITI TEKST U PARAGRAF)
// KOJI SAM UCINIO FOCUSABLE-IM, CIME CE SE, NA NJEMU MOCI TRIGGER-OVATI keydown I  keyup
const paragraf_lorem = `
    <p tabindex="0" class="lorem_ipsum">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit sint atque dolorum fuga ad
        incidunt voluptatum error fugiat animi amet!Odio temporibus nulla id unde quaerat dignissimos enim
        nisi rem provident molestias sit tempore omnis recusandae
        esse sequi officia sapiente.
    </p>
`;

invocateOnKeys(
    document.querySelector('.lorem_ipsum'),
    () => {alert('the real keys')},
    'KeyJ',
    'KeyK',
    'KeyL'
);

//PRIMER FUNKCIONISE, ALI JE U CLANKU ON DEFINISAN NESTO DRUGACIJE


// U PRIMERU IZ CLANKA, DUGMAD SE KRACE DRZE NEGO U SLUCAJU MOG RESENJA, KOJE ZAHTEVA REPEATING TRIGGERING
// keydown-A 

// URADICU I TAJ PRIMER

// MISLIM DA U SVOM RESAVANJU POLAZIM IZ POGRESNOG PRISTUPA, U OVOM PRIMERU
// COVEK POCINJE SA ONIM SLUCAJEVIMA, KADA SE FUNKCIJA TREBA RETURN-OVATI

const runOnKeys = function(element, funk, ...codes){
    const setOfCodes = new Set();

    element.addEventListener('keydown', function(ev){

        setOfCodes.add(ev.code);     // SVAKI KEY code SE DODAJE SETU, NAKON TRIGGERA EVENTA

        for(let code of codes){
            if(!setOfCodes.has(code)) return;       // PROVERAVA SE DA LI U TOM SETU IMA ISTIH code-OVA
        }                                           // KOJI SU DODATI KAO ARGUMENTI
                                                    // AKO NEMA, POTREBNO JE RETURN-OVATI FUNKCIJU

        // OVO ZNACI DA SE FUNKCIJA NIJE RETURN-OVALA, JER SU PRONADJENI SVI code-OVI U SETU
        // I DA NIJE POSTOJALO ONIH KOJI NISU SPECIFICIRANI
        // CALLBACK SE MOZE IZVRSITI

        setOfCodes.clear();  // OVO JE ZA SLUCAJ, AKO SE U SKLOPU funk IZVRSAVA alert
                             // AKO JE TAJ SLUCAJ alert CE UCINITI DA SE NE REGISTRUJE PUSTANJE DUGMADI
                             // ODNOSNO DA SE NE REGISTRUJE keydown EVENT, CIME SET NE BI BIO 'OCISCEN'
        funk();

         
    });
    
    element.addEventListener('keyup', function(ev){
        setOfCodes.delete(ev.code);     // UKLANJANJE code-OVA IZ SETA, DA BI NAKON SLEDECH TRIGGERINGA 
                                        // keydown-A, IMAO PRAZAN SET
    });
}

runOnKeys(
    document.querySelector('.lorem_paragraf'),
    () => {alert('the real keys')},
    'KeyJ',
    'KeyK',
    'KeyL'
);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// NASTAVLJAM SADA DALJE, SA EVENT-OVIMA
// SLEDECI EVENTOVI JESU                                EVENTOVI                           
                                    //              Page lifecycle-A
// ODNOSNO                                                 
//                                              ZIVITNOG CIKLUSA STRANICE
// TU SE UBRAJAJU:

//                                    DOMContentLoaded      load        beforeunload        unload
// 
// NAIME, ZIVOTNI CIKLUS HTML page-A IMA TRI VAZNA EVENT-A:
//      1)      DOMContentLoaded        -->  BROWSER JE FULLY LOADOVAO HTML, I IZGRADJENO JE DOM DRVO, ALI
                                            // SPOLJASNJI RESURSI, KAO STO SU SLIKE <img>, I 
                                            // stylesheets  MOZDA NISU JOS LOADED

//      2)      load                    -->  BROWSER JE LOAD-OVAO SVE RESURSE (images, styles etc.)

//      3)      beforeunload/unload     -->  KADA KORISNIK NAPUSTA STRANICU

// SVAKI OD EVENT-OVA MOZE BITI KORISTAN:////////////////////////////////////////////////////////////////

//)  DOMcontentLoaded    EVENT     : DOM JE READY, TAKO DA HANDLER MOZE POTRAZITI DOM NODES, I INICIJALI-
                                    //  ZIRATI INTERFACE
//)  load                EVENT     : DODADATNI RESURSI SU LOADED, MOZEMO GET-OVATI VELICINE SLIKE
                                    // (AKO ONE NISU SPECIFICIRANE U HTML/CSS-U) etc.
//)  beforeunload/unload    EVENT  : KORISNIK ODLAZI; I MOZEMO PROVERITI DA LI JE KORISNIK SACUVAO
                                    // PROMENE I PITATI GA, DA LI STVARNO ZELI DA NAPUSTI STRANICU

// ////////////////////////////////////////////////////////////////////////////////////////////////////
        // SADA CU ISTRAZITI DETALJE, POMENUTIH EVENT-OVA
//////////////////////////////////////////////////////////////////////////////////////////////////////
//                               DOMContentLoaded

// OVAJ EVENT SE TRIGGER-UJE, ODNOSNO DOGODI SE NA      document    OBJEKTU, I MORAM KORISTITI 
// addEventListener     KAKO BI GA UHVATIO
// ODRADICU, JEDAN PRIMER
// OVO JE DEO, HTML-A, KOJI JE VEZAN ZA MOJ PRIMER

const html_slike_i_scripta_bla = `
    <script>
        document.addEventListener('DOMContentLoaded', function(ev){
            console.log('DOM is ready');

            // SLIKA JOS NIJE LOADED (SEM AKO JE CACHED, ONDA JE LOADED)

            console.log(        // TAKO DA SLEDECE VREDNOSTI TREBA DA SU NULA

                'Velicine slike: ${slika.offsetWidth} X ${slika.offsetHeight}'
            );
        });
    </script>

    <img id="slika" src="https://upload.wikimedia.org/wikipedia/commons/3/32/Panobogmonse.JPG">
`;

// DAKLE U OVOM PRIMERU,  ON DOMContentLoaded HANDLER, POKRENUT JE KADA document LOADED, ALI NE CEKA NA
// SLIKU, DA SE I ONA LOAD-UJE
                //              TAKO DA SU SE U KONZOLI STAMPALE NULTE VREDNOSTI ZA offsetWidth/Height
// NA PRVI POGLED ON DomContentLoaded EVENT SE CINI VEOMA JAEDNOSTAVNIM; NAIME DOM DRVO JE SPREMNO I EVO GA
// EVENT
// ******************************************************************************************************
// ******************************************************************************************************
// E PA MISLIM DA OVO U POTPUNOSTI NIJE TACNO, JER SU SE MENI STAMPALE TACNE VELICINE SLIKE
// **********************************************************************************************
// **********************************************************************************************
// A OVO SAM PRONASAO U JEDNOM POSTU:
// DOMContentLoaded isn't guaranteed to fire before images have started loading. Browsers optimize 
// and start loading images as soon as possible, a behavior we won't be able to (and don't want 
// to) change.
// *********************************************************
// *********************************************************
// A OVO JE JOS JEDAN POST, KOJI SAM PROCITAO:
// The concept behind DomContentLoaded is, to have an event which fires when the full Dom is loaded 
// (the html-structure).
// A t this point every Javascript-command accessing elements wont fail anymore.
// You dont need the images to do something with an img-tag for example.
// If you wanna wait until the full page is completely loaded use onload instead.
// *********************************************************
// TAKO DA NIJE GARANTOVANO DA SLIKA NECE BITI LOADED, KADA JE CEO HTML UCITAN (KADA SE TRIGGERUJE
// DOMContentLoaded)
// *********************************************************
// TAKO DA MOGU DA PRIMETIM DA JE RUSKI CLANAK, NEPOTPUN U POGLEDU OVE LEKCIJE
// ******************************************************************************************************

// POSTOJE, PAR PECULIARITIES (CUDNIH STVARI) U POGLEDU DOMContendLoaded-A (TAKO STOJI U RUSKOM CLANKU)
//
//                                         DOMContentLoaded   AND SCRIPTS

// Kada pretraživač u početku učita HTML i naiđe na     <script> ... </ script>      u tekstu,
// ne može nastaviti da gradi DOM. ON ODMAH, ODNOSNO Trenutno mora izvršiti skriptu. Dakle, 
// DOMContentLoaded se može desiti samo nakon izvršenja svih takvih skripti
// Spoljni script-ovi (sa src-om) takođe stavljaju DOM building na pauzu, dok se skripta učitava i izvršava.
// Dakle, DOMContentLoaded čeka i spoljne skripte takođe.
// Jedini izuzetak su eksterne skripte sa atributima      async     i     defer      
// One govore pretraživaču da nastavi sa procesiranjem bez čekanja na skripte. Ovo omogućava korisniku
// da vidi stranicu pre nego što skript-ovi završe učitavanje, što je dobro za performanse

//                             SCRIPTS   SA          async       I       defer
// Atributi async i defer radi samo za spoljne script-ove. Ako script-e nemaju   src,  async/defer se 
// ignorisu 
// I   async    I   defer govore pregledaču da on može nastaviti da radi sa stranicom i učita script 
// "u pozadini", a zatim da pokrene script, kada se učita. Stoga script ne blokira izgradnju DOM-a i
// prikazivanje stranica.

// Postoje dve razlike između async I defer

// Razlikuju se u pogledu:
                            // REDOSLEDA (ORDER-A) EXECUTE-OVANJA                   

//          script-OVI SA   async   EXECUTE-UJU SE PO REDOLSLEDU      'LOAD-FIRST'
                                    // DAKLE NJIHOV REDOSLED U document-U, NE ZNACI NISTA
                                    // A TO ZNACI, KOJI SE LOAD-UJE PRVI, TAJ CE SE script I PRVI
                                    // RUN-OVATI
//          script-OVI SA   defer   UVEK SE EXECUTE-UJU PO document ORDER-U, ODNONO PO REDOSLEDU, I KAKAV
                                    // IMAJU U document-U

                            // I U POGLEDU     DOMContentLoaded-A

//          script-OVI SA   async   MOGU SE LOAD-OVATI I EXECUTE-OVATI, I DOK document NIJE JOS FULLY 
                                    // DOWNLOADED; TO SE DOGADJA AKO SU script-OVI MALI, ILI CASHED
                                    // I AKO JE document DOVOLJNO DUGACAK
//          script-OVI SA   defer   EXECUTE-UJU SE NAKON STO JE document LOADED, I PARSED (CEKAJU AKO JE
                                    // NEOPHODNO), NEPOSREDNO PRE DOMContentLoaded EVENT-A

// Dakle,   async    se koristi za nezavisne script-OVE, kao što su:       brojači (counters)      ili 
//                                                                         oglasi (ads)

// kojima ne trebaju pristupati sadržaju stranice. A njihov redosled izvršenja nije bitan

// Dok se     defer    se koristi za script-ove, kojima je potreban DOM i/ili je njihov relativni redosled
// izvrsenja važan.

//                                    DOMContentLoaded      I       STILOVI

// EXTERNAL STYLESHEET-OVI      NE UTICU NA     DOM     I ZBOG TOGA         DOMContentLoaded    NE CEKA NA
// EXTERNAL STYLESHEET-OVE
// ALI TU POSTOJI KLOPKA (PITFALL); NAIME, AKO U HTML-U, IMAM   script   TAG, PRE   style-A     , ONDA TAJ
// script MORA CEKATI NA EXECUTE-OVANJE, POMENUTOG style-A

const html_scripta_i_styla = `
    <link type="text/css" rel="stylesheet" href='./src/slilovi_dva.css'>
    <script>
        // SCRIPT NECE BITI EXECUTED, SVE DOK SE STYLESHEET NE LOAD-UJE
        console.log(window.getComputedStyle(document.querySelector('.novi_div_kul')).margin);
    </script>
    
`;
// Razlog je taj što skripta možda želim da dobije koordinate (STO SE SECAM IZ CLANKA O KOORDINATAMA
// DA SE NE PREPORUCUJE CITANJE DIMENZIJA I KOORDINTA IZ CSS-A) i druge style-dependant propertije 
// elemenata , kao u prethodnom primeru. Prirodno je da se mora čekati na stilove da se učitaju
// Kako DOMContentLoaded čeka na skripte, on čeka i na stilove pre njih, takodje
//************************************************************************************* 
// MEDJUTIM POSTO SU MI MNOGI PRIMERI, U OVOM CELOM CLANKU, POPRILICNO NERAZUMLJIVI (NEKI OD NJIH NE DAJU
// REZULTAT, ZA KOJI JE RECENO DA CE GA DATI), PLANIRAM DA
// OPET PROCITAM OVAJ CLANAK, NEKOLIKO PUTA, NAKON STO ZAVRSIM SA PISANJEM KOMENTARA OVDE;
// NAKON TOGA CU ODRADITI PRIMERE, VEZNAE ZA NEKI DRUGI HTML FAJL (KOJI IMA MNOGO MANJE CODE-A, NEGO OVAJ
// SADA, A NE ODGOVARA MI I STO SAM MNOGO CODE-A, VEC NAPISAO ; DAKLE VEZBACU KASNIJE U NOVOM FAJLU,
// JER ZELIM DA IMAM, JASNIJU PREDSTAVU O SVEMU)
// *****************************************************************************************************
// ONO STO SAM JOS PROCITAO U NEKOM POSTU JESTE SLEDECE
// It is recommended placing style tag of external style sheet in head section, because when you have the
// CSS declared before <body> starts, your styles has actually loaded already.
// So very quickly users see something appear on their screen (e.g. background colors). 
// If not, users see blank screen for some time before the CSS reaches the user.
// Also, if you leave the the styles somewhere in the <body>, the browser has to re-render the page
// (new and old when loading) when the styles declared has been parsed.
// *****************************************************************************************************
// NASTAVICU, SADA DA NAVODIM ONO STO JE NAPISANO U RUSKOM CLANKU
// ODNOSNO NASTAVICU SA NOVIM PODNASLOVOM
/////////////////////////////////////////
//////////////                      
//                                                 BUILT-IN BROWSER AUTOFILl

// Firefox, Chrome i Opera autofill-UJU (AUTOMATSKI POPUNJAVAJU) forms-E (OBRAZCE) NA TRIGGERING-U
// DOMContentLoaded-A
// Na primjer, ako stranica ima form sa login-OM i lozinkom, a pretraživač zapamtio vrijednosti,
// onda će ih na DOMContentLoaded pokušati autofilirati (ako je to odobreno od strane korisnika)
// Dakle, ako je DOMContentLoaded odložen (postponed) dugotrajnim skriptama, onda i autofill čeka.
// Verovatno ste to videli na nekim lokacijama (ako koristite autofilter pretraživača) - 
// -polja za prijavu / lozinku se odmah ne autofil-UJU, ali postoji kašnjenje dok se stranica ne učita
// potpuno. To je zapravo kašnjenje do triggering-A DOMContentLoaded

// Jedna od manjih prednosti u korišćenju async i defer za spoljne skripte - 
// -oni ne blokiraju DOMContentLoaded i ne odlažu autofill pregledača
////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//                                       window.onload
// 'load' Event na window objektu, trigger-uje se, kada se cijela stranica učita, uključujući stilove, slike
// i druge resurse
// Primer dolje ispravno prikazuje veličinu slike, jer window.onload čeka sve slike:
// (OVAKO JE PISALO U CLANKU, A JA NIKAKO DA MI USPE, TO DA UVIDIM, DA SLIKA NIJE LODED ON DOMContentLoaded
// JER SAM I U TO MSLUCAJU USPEO DA PROCITAM VELICINU SLIKE; MORACU, TO KAO STO SAM REKAO, ISPITATI DETALJNIJE)
const html_slike_i_scripta_bla_dva = `
    <script>
        document.addEventListener('DOMContentLoaded', function(ev){
            console.log('Page loaded');

            // U OVOM TRENUTKU IMAGE IS LOADED

            console.log(  
                'Velicine slike: ${slika.offsetWidth} X ${slika.offsetHeight}'
            );
        });
    </script>

    <img id="slika" src="https://upload.wikimedia.org/wikipedia/commons/3/32/Panobogmonse.JPG">
`;
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                                       window.onunload
// Kada posetilac napusti stranicu, 'unload' event se trigger-uje na window-u
// Možemo tamo uraditi nešto što ne uključuje kašnjenje, kao što je zatvaranje related popup prozora
// Ali ne možemo otkazati prelazak na drugu stranicu
// Za to bi trebalo da koristim još jedan događaj       'beforeunload'
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                                       window.onbeforeunload
// Ako je visitor pokrenuo navigaciju away od stranice ili pokušavao da zatvori prozor, U OBIMU
// ON beforeunload HANDLER-A MOZE DA SE UPUTE KORISNIKU, DODATNE CONFIRMATION-E
// TAJ HANDLER Može RETURN-OVATI niz sa pitanjem? Istorijski pretraživači su to pokazivali, 
// ali sada samo neki od njih pokazuju confirmation-E
// To je zato što su određeni webmasters-I zloupotrebili ovaj event handler, PRIKKZUJUCI
// MISLEADING AND HACKISH MESSAGES (PORUKE KE KOJE SU ZBUNJUJUCE I HACKISH)
// Možete ga probati tako što ćete pokrenuti ovaj kod i ponovo učitati stranicu

//       window.onbeforeunload = function(){
//         return "There are unsaved changes. Leave now?";    /*OVO BI TREBALO DA SE alert-UJE (ALI NECE)*/
//       };

// MEDJUTIM OVO NE RADI
// OVDE CU DODATI JEDAN TEKST JEDNOG POSTA, KOJI OBJASNJAVA ZASTO NE RADI
// Since 25 May 2011, the HTML5 specification states that calls to window.showModalDialog(), 
// window.alert(), window.confirm(), and window.prompt() methods may be ignored during this event.
// It is also suggested to use this through the addEventListener interface:
// You can and should handle this event through window.addEventListener() and the beforeunload event.
// The updated code will now look like this:
    `       window.addEventListener("beforeunload", function(e){
                saveFormData();

                (e || window.event).returnValue = null;
                return null;
            });                                                       `;


window.addEventListener('beforeunload', function(ev){
    condirm();

    return 'There are unsved changes. Leave now?';
});
// OVAJ PRIMER UOPSTE NE FUNKCIONISE TAKO DA NE ZNAM DA LI JE ONO STO SAM PAST-OVAO IZ POSTA, JESTE TACNO
// JER NEKI GOVORE DA JE CAK, VISE NEMOGUCE KORISTITI,
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// NASTAVLAM DALJE SA OVIM CLANKO
// SADA CU SE POZABAVITI SA                     readyState

// Šta se događa ako postavimo ON DOMContentLoaded HANDLER nakon što je dokument ucitan?
// Naravno, taj handler, nikad nece biti pokrenut.
// Postoje slučajevi kada nismo sigurni da li je dokument spreman ili ne, na primer spoljašnja skripta sa
// atributom    async   load-uje se i pokrece se asinhrono. U zavisnosti od mreže, može se učitati i 
// izvršiti pre nego što je dokument completed ili nakon toga; ne možemo biti sigurni.
// Dakle, trebali bismo znati trenutačno stanje dokumenta.
// MOZDA SAM JA UPRAVO IMAO PROBLEMA SA PRIMERIMA IZ OVE LEKCIJE, UPRAVO ZATO STO JE OVAJ JAVASCRIPT
// FAJL U KOJEM PISEM, UPRAVO POSLEDNJI NESTED TAG, body-JA (KAO STO SAM REKAO, SVE CU TO PROVERITI,
// U DRUGOM FAJLU; SADA NASTAVLJAM SA readyState-OM)

document.readyState     //UPRAVO DAJE POMENUTU INFORMACIJU
// A POSTOJE TRI MOGUCE VREDNOSTI (TO SU USTVARI STANJA), KOJE MOZE DATI

                //      'loading'           document IS LOADING

                //      'interactive'       document IS FULLY LOADED

                //      'complete'          document IS FULLY READ (U POTPUNOSTI PROCITAN) I SVI RESURSI
                //                                   POPUT SLIKA SU, TAKODJE LOADED

// NAIME, ZATO MOGU PROVERITI       document.readyState     I ZKACITI HANDLER, ILI EXECUTE-OVATI CODE, 
// IMMEDIATELLY, AKO JE READY

// NA PRIMER OVAKO

const work = function(){/*  */};

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoade', work);
}else{
    work();
}
// POSTOJI I:
//              readystatechange        EVENT, KOJI SE TRIGGER-UJE, KADA SE STATE PROMENI, TAKO DA MOGU
//                                      PRINT-OVATI, SVA POMENUTA STANJA

// TRENUTNO STANJE
console.log(document.readyState);
// PRINT-OVANJE PROMENA STANJA
document.addEventListener('readystatechange', () => console.log(document.readyState));

// EVENT readystatechange je alternativni mehanizam praćenja stanja učitavanja dokumenta, 
// davno se pojavio. Danas se retko koristi, ali moram ga pokriti u cilju kompletnosti
// Koje je mesto        readystatechange       medju ostalim eventovima?
// Da biste videli tajming, evo dokumenta sa <iframe>, <img>, i handlerima koji log-uju event-OVE

const iframe_img_and_scripts_example = `
<script>
    function log(text){console.log(text)}
    document.addEventListener('readystatechange', () => log('reeadyState: '+ document.readyState));
    document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));
    window.onload = () => log('window onload');
  </script>
  <iframe
    src="../additional_practicing_files/index.html"
    onload="log('iframe onload')"
  >
  </iframe>
  <img id="img" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/ChampagnePool-Wai-O-Tapu_rotated_MC.jpg">
  <script>
    img.onload = () => log('img onload');
  </script>
`;

// Tipičan output:

//       1.      [1] initial readyState: loading
//       2.      [2] readyState: interactive
//       3.      [2] DOMContentLoaded
//       4.      [3] iframe onload
//       5.      [4] img onload
//       6.      [4] readyState: complete
//       7.      [4] window onload

// Brojevi u kvadratnim zagradama označavaju približno vreme kada se event desio.
//  Realno vreme je malo veće, ali događaji označeni sa istom cifrom se događaju približno istovremeno
//  (± nekoliko ms).

// (a)          document.readyState          postaje   interactive   , neposredno pre DOMContentLoaded. 
//                                                                  Ova dva događaja zapravo znače isto

// (b)          document.readiState          postaje   complete    , kada su svi resursi (iframe i img)
//                                                                                              učitani.
                //  Ovde možemo videti da se to dešava u približno istom 
                // trenutku kao img.onload (img je poslednji resurs)
                //  i window.onload. Prebacivanje na complete stanje znači isto kao i window.onload.
                // Razlika je u tome što window.onload uvek radi nakon svih ostalih load handler-A


//IZ COMMENTA ISPOD CLANKA  ///////////////////////////////////////////////////////////////////////////////
// You're not quite right about your explanation of the timing of the defer attribute. Deferred scripts are 
// guaranteed to execute before DOMContentLoaded event

//ODLUCIO SAM DA ODSADA SVE PISEM U NOVIM FAJLOVIMA; GDE CU I PROVEZBATI 
// PAGE LIFECYCLE EVENT-OVE

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
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
        //console.log("||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||INSTANCA ZA NEKI ELEMENT NAPRAVLJENA*****IGNORE||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    }
}

window.customElements.define('neki-element', NekiElement);
const nekiElement = document.createElement('neki-element');

document.querySelector('body').appendChild(nekiElement);
/*
console.log(nekiElement instanceof NekiElement);

console.log(customElements.__proto__);
*/

////////////////////////VEZBANJE RADIALNOG GRADIENT-A, NE OBRACAJ PAZNJU NA OVO
//(OVO SE SAMO TICE POZADINE ELEMENT-A)
////////ELEMENT NAPRAVLJEN U HTML-U, KLASA .neki_el

///ONO STO MOGU POSTICI RADIJALNIM GRADIENT-OM, JESTE DA IMAM NACRTAN KRUZNI OBLIK
///ODNOSNO PRSTENASTE OBLASTI BOJA
///SVAKA BOJA SE NASTAVLJA JEDNA NA DRUGU
////izmedju njih nejasna granica, odnosno MOGU SE PRELIVATI JEDNA U DRUGU 
////U MOM SLUCAJU TO CE BITI, KONKRETNO KRUGOVI (circle) BOJA, JEDNI OKO DRUGIH
////I ONO STO JE TQKODJE VAZNO, JESTE DA ODREDJENE OBLASTI (ILI SVE), NE MORAJU BITI BOJA, 
///VEC TRANSPARENTNOST, ODNOSNO PROZIRNOST
///SADA CU POCETI SA STILIZOVANJEM .neki_el U CSS-U
///A ZA DEFINISANJE GRADIOJENTA, ODGOVORAN JE PROPERTI background-image
///
///DAKLE KRIRAO SAM JEDAN ELEMENT, TO CE UPRAVO BITI ONAJ .neki_el, I INLINE DEFINISAO SAM MU GRANICU, 
//SIRINU I VISINU (DA BI GA IMAO SPREMNOG) (STILOVE MOGU DEFINISATI I OVAKO U JAVASCRIPT-U)

const nekiEl = document.querySelector('.neki_el');

const stilElement = document.createElement('style');
const stiloviZaNeki = `
        .neki_el {
            background-image: radial-gradient(circle at top, green, purple 10%, transparent 28%, orange 100%);
        }

        /*INTERPRETIRACU GORNJE POZIVANJE   radial-gradient     FUNKCIJE*/
        /*NAIME, ONA KAZE DA SE POZADINA ELEMENT, OBOJI NA SLEDECI NACIN*/
        /*   NEKA BOJENJE BUDE KRUZNO, ODNOSNO U OBLIKU PRSTENOVA BOJE
            I NEKA KRENE OD CENTRA KOJI CE SE NALAZITI
            NA CENTRU GORNJE GRANICE ELEMENTA
            POCINJE SE OD ZELENE BOJE U CENTRU
            NA 10% SIRINE ELEMENTA KRECE LJUBICASTA
            NA 28% SIRINE ELEMNTA, KRECE TRANSPARENTNOST
            NA 100% SIRINE ELEMENTA, KRECE NARANDZASTA

            ONO STO SE DOGADJA IZMEDJU OVIH BOJA JESTE GRADIJENTNOST, ODNOSNO, POSTEPENO PRELIVANJE
            JEDNE U DRUGU
        */
`;

stilElement.textContent = stiloviZaNeki;

nekiEl.appendChild(stilElement);

//console.log(nekiEl);
///
///
///
///
///
///
///NE OBRACAJ PAZNJU NA OVO; OVO JE PODSECANJE NA super KEYWORD

class BoljiZivot {
    constructor(stan, posao, playstation = true){
        this.stan = stan;
        this.posao = posao;
        this.playstation = playstation;

        super.kornjaca = "neke nidze kornace bla";

        this.naivno = "veoma naivno";
    }

    odigrajSkyrim(){
        let stanje;
        const igram = "tandrlakača tandrlakača";
        const neIgram = "zgembo zgemb jooooooj zgemb";
        stanje = this.playstation?igram:neIgram;
        //console.log(stanje);
        //console.log(this.naivno);
        
        //console.log(super.valueOf());
        
    }
}

const zivotarenje = new BoljiZivot('beo na vodi', 'u guglju', false);
zivotarenje.odigrajSkyrim();
//console.log(zivotarenje);

class JosBoljiZivot extends BoljiZivot {
    constructor(){
        super("novogradnja", "u upravi");
        this.posao = "u na turizmu";
        super.kornjaca = "neka kornjaca";
        this.naivno = "pa ovo su pocetne faze naivnosti";
    }


}

const zivotarenjePlus = new JosBoljiZivot();

zivotarenjePlus.odigrajSkyrim();
//console.log(zivotarenjePlus);
//console.log(zivotarenjePlus.__proto__);

const novaSlika = new Image();
const drugaSlika = new Image(100, 200);
novaSlika.width = 280;
//console.log(novaSlika.width, drugaSlika.width);

///
///
///
///
///
///
///
///
///
///
///
///
///
///
///
///
///
///
///
///
///
///
///


const borderArr = ["yellow", "green", "purple", "olive", "orange"];

for(let i = 0; i<5; i++){
    let item = document.createElement('div');
    item.style.height = "200px";
    item.style.width = "100px";
    item.style.border = `${borderArr[i]} solid 4px`;
    document.getElementsByClassName('vezba_poz_kon')[0].appendChild(item);

}

const konti = document.getElementsByClassName('vezba_poz_kon')[0];
konti.addEventListener('click', function(ev){
    console.log(ev.target);

    console.log(ev.target.offsetLeft, ev.target.offsetTop)
});
konti.querySelectorAll('div')[4].style.width = "100%";






//wavingDiv.width = 800;



//console.log(wavingDiv);


const el2 = document.createElement('div');

el2.classList.add('normal_class');
el2.innerText = "neki tekst";
const root2 = document.getElementsByTagName('section')[0];

root2.appendChild(el2);

root2.addEventListener('click', function(ev){
    const el = this.querySelector('.normal_class');
    console.log(ev.target);
    console.log(el)
    el2.classList.add('transition_class');
});




class OblastElement extends HTMLElement {
    constructor(){
        super();
        const divElement = document.createElement('div');
        const anchorElement = document.createElement('a');
        const styleElement = document.createElement('style');
        const styles = `
            .opsta_klasa {
                border: pink solid 2px;
                width: 280px;
                height: 100px;
                background: yellow;
            }

            .opsta_klasa a {
                opacity: 0;
                transition-property: opacity;
                transition-duration: 2s;
                transition-timing-function: ease-in;
            }

            .opsta_klasa[opacitated] a {
                opacity: 1;
            }
        `;

        styleElement.textContent = styles;
        
        divElement.classList.add('opsta_klasa');

        anchorElement.innerText = "pritisni";
        anchorElement.setAttribute('href', '#');

        divElement.appendChild(anchorElement);

        this.attachShadow({mode: 'open'});

        this.shadowRoot.appendChild(styleElement);
        this.shadowRoot.appendChild(divElement);
        
        this.shadowRoot.querySelector('a').addEventListener('click', ev => ev.preventDefault());

        const custEl = this;
        
        custEl.addEventListener('click', function(ev){
            custEl.opacitated = true;
        });
    }

    set opacitated(val){
        if(val){
            this.shadowRoot.querySelector('.opsta_klasa').setAttribute('opacitated', '');
        }else{
            this.shadowRoot.querySelector('.opsta_klasa').removeAttribute('opacitated');
        }
    }
}



new Promise((resolve, rejct) => {
    window.customElements.define('oblast-element', OblastElement);
    resolve();
}).then(function(){
    //document.querySelector('.some_div_el').querySelector('oblast-element').opacitated = true;
});





const nekiDiv = document.getElementsByClassName('neki-div')[0];



/*console.log(nekiDiv.nodeName);
console.log(nekiDiv.nodeType);
console.log(nekiDiv.nodeValue);*/



//////////////////// DODATNI PRIMERI VEZANI ZA SLOT///////////////////////////////////
const someHTMLCode = `<template id="form_kont">
    <style>
      ::slotted(input) {
        background: skyblue;
      }
    </style>
    <div>
      <slot name="first-slot"></slot>
      <slot name="second-slot"></slot>
      <slot></slot>
    </div>
  </template>
  
  <form-container>
    <label slot="first-slot">Label</label>
    <input slot="second-slot" type="text">
    <button>Button</button>
  </form-container>
`;


class FormContainer extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const template = document.querySelector('#form_kont');
        
        shadowRoot.appendChild(template.content.cloneNode(true));
    }
}
  
window.customElements.define('form-container', FormContainer);

///////////////////////////////////////////////////////////////////////////////////////////////////////

window.customElements.define('fancy-he', class extends HTMLElement {
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        const divElement = document.createElement('div');
        const slotElement = document.createElement('slot');
        const styleElement = document.createElement('style');

        slotElement.name = "stuff";
        slotElement.innerHTML = "<h4>DEFAULT CONTENT</h4>";
        const styleContent = `
            div {
                border: pink solid 2px;
                text-align: center;
                padding: 18px;
            }

            :host {
                display: block;
                border: 4px solid olive;
                padding: 4px;
            }

            slot {
                border: green solid 28px;
            }

            ::slotted(h4) {
                font-size: 2em;
                color: #e67ba6;
            }

            ::slotted(p) {
                background-color: #67f19c85;
                line-height: 4;
                color: orange;
                font-size: 1.2em;
            }
        `;
        styleElement.textContent = styleContent;

        divElement.appendChild(slotElement);
        
        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(divElement);
    }
});


const buya = document.querySelector('.buyaaaa');

buya.addEventListener('click', ev => {
    let confirmation;
    if(ev.target instanceof HTMLAnchorElement || ev.target !== ev.currentTarget){
        confirmation = window.confirm("Would you like segnor?");
        if(confirmation){
            return;
        }else{
            ev.preventDefault();
        }
    }
});


console.log(location.href);
/*let len = 10;
let i = 1;

let a = (i < 0)?Math.max(0, len + i):i;
let b = i?a:0;
i = b;
*/
//    i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

/*
const someFunk = function(){
    console.log('varijabla!');
};

function someFunk(){            //DOCI CE DO ERROR-A
    console.log('funkcija');        
}

someFunks();
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// compare    ALGORITMI/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////    PODSECANJE, VEZBANJE I ISPITIVANJE, KOJI TO compare ALGORITAM, KORISTI 
///////////////////////////////               Array.prototype.sort

const nekiNiz = [28, 1, 56, 2, 18, 4, 42, 68];

//let brojRekurzija = 0;

const quickSort = function(niz){
    
    if(niz.length < 2){
        return niz;
    }

    const noviIstiNiz = niz.concat([]);
    const len = noviIstiNiz.length;
    const middleIndex = Math.floor(len/2);
    const middleNiz = [].concat(noviIstiNiz[middleIndex]);
    const levi = noviIstiNiz.slice(0, middleIndex);
    const desni = noviIstiNiz.slice(middleIndex+1, len);
    
    const noviLevi = [];
    const noviDesni = [];

    for(let i = 0; i<levi.length; i++){
        
        console.log('quick sort', levi[i], desni[i]);

        if(levi[i] > middleNiz[0]){
            noviDesni.push(levi[i]);
        }else{
            noviLevi.push(levi[i]);
        }

        if(!desni[i]){
            break;
        }

        if(desni[i] > middleNiz[0]){
            noviDesni.push(desni[i]);
        }else{
            noviLevi.push(desni[i]);
        }

    }

    /*console.log(levi);
    console.log(desni);

    console.log(noviLevi);
    console.log(middleNiz);
    console.log(noviDesni);*/

    //brojRekurzija++;

    return quickSort(noviLevi).concat(middleNiz).concat(quickSort(noviDesni));
}

//const sredjenNiz = quickSort(nekiNiz);

//console.log(sredjenNiz);
//console.log(brojRekurzija);



const alphLow = 'abcdefghijklmnopqrstuvwxyz';
const alphHigh = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

for(let i = 0; i<alphLow.length; i++){
    console.log(alphLow.charCodeAt(i), alphHigh.charCodeAt(i));
}


//GENERATOR BROJEVA, UZ POMOC Array.from METODE
const noviNiz1 = Array.from({length: 8}, function(_,i){
    return i;
});

// console.log(noviNiz1);

const array1 = [8,5,12,1,4,6,8,2];

const array2 = array1.sort(function(a,b){
    //console.log('sort', a , b);
    return a-b;
});

const array3 = array1.sort();
// console.log(array1 === array2)
// console.log(array2);
// console.log(array3);

const array8 = [42, 58, 2, 1, 18, 26, 5, 462, 521, 68, 12, 842, 521, 11, 2];

const bubbleSort = function(array){
    const arryForcompare = [].concat(array);

    let kontrola = true;

    while(kontrola){
        let i = 0;

        let unutrasnjaKontrola = 0;
        
        while(i < arryForcompare.length){
            if(arryForcompare[i] > arryForcompare[i+1]){

                console.log('bubble sort', arryForcompare[i], arryForcompare[i + 1]);

                let memberArr = arryForcompare.splice(i, 1)[0];
                arryForcompare.splice(i+1, 0, memberArr);

                unutrasnjaKontrola++;
            }

            i++;
        }

        kontrola = unutrasnjaKontrola === 0?false:kontrola;
    }

    return arryForcompare;

};

//console.log(bubbleSort(array8));

const array4 = [8,5,12,1,4,6,8,2];

const array5 = bubbleSort(array4);

console.log(array5);

const insertionSort = function(array){
    const arr = [].concat(array);

    let j = arr.length - 1;

    while(j > 0){

        let i = 0;

        while(i !== j){
            
            if(arr[j] < arr[i]){

                console.log('insertion sort', arr[j], arr[i]);

                const member = arr.splice(j, 1)[0];
                
                if(i === 0){
                    arr.unshift(member);
                }else{
                    arr.splice(i, 0, member);
                }
            }

            i++;
        }

        j--;
    }
    
    return arr;    
    
};

// const array6 = insertionSort(array4);

// const array18 = quickSort(array4);

//console.log(array6);

// console.log(array18);


const mergeSort = function(array){

    if(array.length  <= 1){
        return array;
    }

    const stitch = function(left, right){
        const arrayForPushingLesser = [];
        let i = 0;      //SAMO JEDAN i (DAKLE NEMA j); A OVO i TOKOM LOOPINGA SE NIKAD NECE PROMENITI
        while(left[i] !== undefined && right[i] !== undefined){ //KADA JEDAN OD NIZOVA OSTANE BEZ CLANOVA 
            if(left[i] <= right[i]){                            //PETLJA CE PRESTATI SA LOOPING-OM
                let member = left.shift(i);
                arrayForPushingLesser.push(member);
            }else{
                let member = right.shift(i);
                arrayForPushingLesser.push(member);
            }

            console.log('merge sort', left[i], right[i]);
        }

        return arrayForPushingLesser.concat(left).concat(right);

    };

    const arr = [].concat(array);
    const length = arr.length;
    const middleIndex = Math.floor(length/2);
    const leftArr = arr.slice(0, middleIndex);
    const rightArr = arr.slice(middleIndex, length);
    
    /*console.log(middleIndex);
    console.log(arr[middleIndex]);
    console.log(leftArr, rightArr);*/

    return stitch(mergeSort(leftArr), mergeSort(rightArr));
    
};


const array9 = [42, 58, 2, 1, 18, 26, 5, 462, 521, 68, 12, 842, 521, 11, 2];


//console.log(mergeSort(array9));


//////////////////////////////////////////////////////////////////////////////////////////////////
//NAKON SVEOG OVOG PODSECANJA I DEFINISANJA compare ALGORITAMA
//DEFINISACU JEDAN NIZ
////////////////////////////////////////////////////////////////////////////////////////////
const jedanNiz = [56, 11, 298, 64 , 52, 488, 298, 641, 2, 26, 16, 4, 26, 8, 10, 8];

////////     SADA CU UPOTREBITI OVAJ NIZ, TAKO STO CE POMENUTI BITI ARGUMENT, KADA BUDEM
///////      EGZEKUTOVAO, MOJE, GORE DEFINISANE ALGORITME
///////      A NA KRAJU CU I NA POMENUTOM NIZU, PRIMENITI       sort        METODU, NIZOVOG
///////      PROTOTIPA
////////     A KAKO CU SAZNATI, KOJI JE OD POMENUTIH ALGORITAMA, UPOTREBLJEN U DEFINICIJI, compare METODE?
//////       PA DEFINISAO SAM, U OBIMIMA, SVAKOG compare ALGORITMA, DA SE STAMPAJU TRENUTNI BROJEVI
/////        KOJI SE SORTIRAJU, UZ INFORMACIJU O KOM ALGORITMU SE RADI

////ISTO CU DEFINISATI I U CALLBACK-U, KOJEG BUDEM PROSLEDJIVAO KAO ARGUMENTA, sort PRIMENE


/* const A = quickSort(jedanNiz);
const B = bubbleSort(jedanNiz);
const C = insertionSort(jedanNiz);
const D = mergeSort(jedanNiz);
                                                // OVO JE COMMENTED OUT ZATO STO IMA MNOGO STAMPANJA
const E = jedanNiz.sort(function(a,b){                    //A MOGU KOMENTARE UKLONITI AKO BUDEM ZELEO DA POGLEDAM
    console.log('Array.prototype.sort', a , b);        //KOJE SE TO VREDNOSTI STAMPAJU
    return a - b;
});


console.log(`
    ${A}
    ${B}
    ${C}
    ${D}
    ${E}
`); */





//JOS JEDNA VEZBA, VEZANA ZA KOORDINATE

/* const misovEvenrt = new MouseEvent('click', {bubbles: true, cancelable: true});

document.body.addEventListener('click', function(ev){
    console.log(ev.target);
    ev.target.classList.contains('neki_pgf')
    ?
    console.log("koordinata x:", ev.clientX, "koordinata y:", ev.clientY)
    :
    console.log('body');
});

new Promise((res, rej) => {
    res();
}).then(function(){
    document.querySelector('.neki_pgf').dispatchEvent(misovEvenrt);
});


//VEZBA VEZANA ZA EVENT-OVE

let nekiHolder = 1;

new Promise((res, rej) => {
    res();
}).then(() => {
    nekiHolder = 0;
});

if(nekiHolder){
    console.log("***********************************", nekiHolder, "******************");
} */


/* 
let keyEventBlah;

document.addEventListener('keydown', function(ev){
    keyEventBlah = ev;
    console.log(keyEventBlah);
});

document.addEventListener('click', function(ev){
    console.log("broj dugmeta", ev.which);
});

document.addEventListener('contextmenu', function(ev){
    console.log("broj dugmeta", ev.which);
});
 */


 //////////////////////////////////////////////////////////////////////////////////////////////////////// 
//JOS JEDNA PROVERA KOJA POKAZUJE DA SE NAKON mousedown-A N INPUT DOGADJA FOCUS KAO DEFAULT 
    //BEHAVIOUR
document.querySelector('input[name=neki_unos]').addEventListener('mousedown', function(ev){
    ev.preventDefault();
});

document.querySelector('input[name=neki_unos]').addEventListener('focus', function(ev){
    
    console.log("FOCUSED!");
});
///////////////////////////////////////////////////////////////////////////////////////////////////////


document.querySelector('#prelaz_o1 > div').addEventListener('mouseover', function(ev){
    console.log(ev.type < 10);
    console.log("usao u OLIVE");
});

document.querySelector('#prelaz_o1 > div').querySelector('div').addEventListener('mouseover', function(ev){
    console.log("usao u TOMATO");
});


let type = "neki_tekst";
while(type < 11) console.log(type);

let oneOrOther = false;

let vreme1;

let vreme2;

so_kon.onclick = function(ev){

    if(!vreme1){
        vreme1 = new Date();
    }

    if(vreme1 && oneOrOther){
        vreme2 = new Date();
    }

    if(vreme2 && !oneOrOther){
        vreme1 = new Date();
    }

    const razlikaVremena = vreme1 && vreme2?Math.abs(vreme2 - vreme1):vreme1||vreme2;

    oneOrOther = !oneOrOther;

    console.log(razlikaVremena);
    return razlikaVremena;
};

document.body.scrollTop = document.body.scrollHeight;



const nekiDivEl = document.querySelectorAll('.neki_d_el');

nekiDivEl[0].addEventListener('mousedown', function(ev){
    console.log("KOORDINATA Y -----> ", ev.pageY);
    console.log(ev.currentTarget.getBoundingClientRect());
}); 

nekiDivEl[1].addEventListener('mousedown', function(ev){
    console.log("KOORDINATA Y -----> ", ev.pageY);
    console.log(ev.currentTarget.getBoundingClientRect());
}); 


const nekiListItem = document.querySelector('li > ul > li > ul > li');

const ancestorBeforeDocument = function(element){
    let el = element;

    if(el instanceof Document) return null;

    while(el = el.parentNode){
        console.log(el);

        if(el instanceof Document){
            break;
            console.log("||||||||||IT'S DOCUMENT|||||||||||||||");
        }

    }
    
};


ancestorBeforeDocument(nekiListItem);


document.querySelector('.ctown').addEventListener('mousedown', function(ev){
    
    const y = ev.target.offsetTop;
    
    ev.target.style.position = "absolute";

    ev.target.style.top = Math.round(y) + "px";

});

document.querySelector('.za_sakr').hidden = true;


/* const loremParagraf = document.querySelector('.lorem_paragraf');
console.log(loremParagraf);

loremParagraf.addEventListener('keydown', function(ev){
    if(!ev.repeat) console.log('KEYDOWN-->', ev.code);
});

loremParagraf.addEventListener('keyup', function(ev){
    console.log('KEYUP', ev.code);
}); */





