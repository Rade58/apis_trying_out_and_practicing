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

const fragment = document.createDocumentFragment();         //STAVLJAM OBA img ELEMENTA U FRAGMENT
fragment.appendChild(nekiElement1);
fragment.appendChild(nekiElement2);

document.getElementById('drugi_koren').appendChild(fragment);       //KACIM FRAGMENT U DOM


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

//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

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
            
<<<<<<< HEAD
            let mouseX;
            let mouseY;

            let k = 0;
            let j = 0;

            const coordXpar = this.offsetLeft;      //KORDINATE PARENTA  (U ODNOSNU NA CLI DOKUMENT)
            const coordYpar = this.offsetTop;
            //console.log(coordXpar, coordYpar);
            const targetX = ev.target.offsetLeft;   //MOGU BIT KOORDINATE PARENTA ILI ITEM-A  (U ODNOSU NA CELI DOKUMENT)
            const targetY = ev.target.offsetTop;
            //console.log(targetX, targetY);
            const innerOffsetX = ev.offsetX;     //MOGU BITI KOORDINATE KLIKA ZA PARENT ILI ZA ITEM
            const innerOffsetY = ev.offsetY;     //OVO SU KOORDINATE KLIKA OD GORNJE GRANICE ELEMENTA
                                                //I OD LEVE GRANICE KLIKA
            //console.log(innerOffsetX, innerOffsetY);
            //console.log(this.visina);
            const parentWidth = parseInt((/\d+/gi).exec(this.getAttribute("sirina")));          
            const parentHeight = parseInt((/\d+/gi).exec(this.getAttribute("visina")));         
                                                                                
            
            //console.log(parentWidth, parentHeight);
            const halfParentWidth = parentWidth/2;
            const halfParentHeight = parentHeight/2;
            //console.log(halfParentWidth, halfParentHeight);
            const koordCenterXparent = coordXpar + halfParentWidth;        //KOORDINATE CENTRA PARENTA
            const koordCenterYparent = coordYpar + halfParentHeight;
            //console.log(koordCenterXparent, koordCenterYparent);
            if(coordXpar !== targetX){
                //console.log(this.getElementsByTagName('div')[0]);
                k = targetX;
                j = targetY;
            }
            //console.log(k, j);

            console.log(innerOffsetX, halfParentWidth);
            console.log(innerOffsetY, halfParentHeight);


            /*let unutrasnjeX;
            let unutrasnjeY;

            if(innerOffsetX > halfParentWidth){
                unutrasnjeX = innerOffsetX - halfParentWidth;
            }else{
                unutrasnjeX = halfParentWidth - innerOffsetX;
            }
            if(innerOffsetY > halfParentHeight){
                unutrasnjeY = innerOffsetY - halfParentHeight;
            }else{
                unutrasnjeY = halfParentHeight - innerOffsetY;
            }*/


            const realCoordX = `${innerOffsetX - halfParentWidth + Math.abs(k)}px`;
            const realCoordY = `${innerOffsetY - halfParentHeight + Math.abs(j)}px`;

            //console.log(realCoordX, realCoordY);
            
            
            //console.log(ev.__proto__);
            //console.log(ev.stopImmediatePropagation);
            //console.log(`||||||${ev.bubbles}||||||||`);
            //console.log(this.getElementsByTagName('div'));
            
            /*console.log(ev.target.offsetX,
                ev.target.offsetY);*/
            ////ZAPAMTI DA JE event.offsetX    A NE     event.target.offsetX
            ////DAKLE, POMENUTA VREDNOST SE CITA DIREKTNO OD Event INSTANCE

            //console.log(ev.target);
            //let coordParentButtX = 0;
            //let coordParentButtY = 0;
            
            //KORISTI REGEXP, KAKO BI NASAO I SIRINU I VISINU I DUGMETA, A I DIVOVA U NJEMU
            /*const halfWidthTarget = window.getComputedStyle(ev.target).width;
            const halfHeightTarget = window.getComputedStyle(ev.target).height;

            const buttCoordX = ev.target.offsetLeft;
            const buttCoordY = ev.target.offsetTop;
            const targetCoordX = ev.offsetX;
            const targetCoordY = ev.offsetY;
=======
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

            /*let i;
            let j;

            i = mouseCoordX - halfWidth;    //ZA PRVI PUT KADA NEMA div ITEM-A
            j = mouseCoordY - halfHeight;

            if(this.hasChildNodes() && this.getElementsByTagName('div')){
                
            }*/
>>>>>>> offset_fix
            
            console.log("X: ", x, " Y: ", y);
            
            let i;
            let j;

<<<<<<< HEAD
            console.log(ev.relatedTarget);*/

            this.onClickRippleNew(
                realCoordX,
                realCoordY
            );

        });

        this.onmouseup = function(ev){
            const divoviObjekat = this.getElementsByTagName('div');
            console.log(divoviObjekat);
            const divObLength = divoviObjekat.length;
            divoviObjekat[divObLength-1].classList.add('transit');
=======
            i = (mouseCoordX - halfWidth) + "px";   //ZA PRVI POKUSAJ BEZ DIVOVA
            j = (mouseCoordY - halfHeight) + "px";

            if(fromKontToItemX !== justForButtonX){   
                i = (x - halfWidth) + "px";   
                j = (y - halfHeight) + "px";
            }

            this.onClickRippleNew(i, j);                        

        });

        this.onmouseup = function(ev){
            //const divoviObjekat = this.getElementsByTagName('div');
            //console.log(divoviObjekat.length)
            
            //this.getElementsByTagName('div')[divoviObjekat.length-1].classList.add('transit');
>>>>>>> offset_fix
            
            if(this.hasChildNodes() && this.getElementsByTagName('div')){
                const length = this.getElementsByTagName('div').length;
                this.getElementsByTagName('div')[length - 1].classList.add('transit');
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

        for(let par of styleMap.entries()){
            //console.log(par);
            divel.style[par[0]] = par[1];
            //console.log(divel);
        }
        
        this.appendChild(divel);
<<<<<<< HEAD
=======
        //divel.setAttribute("disabled", "disabled");
>>>>>>> offset_fix

        divel.classList.add('wave_styles');
        //divel.setAttribute("disabled", "disabled");

        /*divel.onclick = function(ev){
            console.log("klik event prosao");
        };*/

        /*const halfWidth = buttWidth/2;
<<<<<<< HEAD
        const halfHeight = buttHeight/2;
        const koordX = (offsetx - halfWidth) + "px"; 
        const koordY = (offsety - halfHeight) + "px";
=======
        const halfHeight = buttHeight/2;*/
        /*const koordX = (offsetx - halfWidth) + "px"; 
        const koordY = (offsety - halfHeight) + "px";*/
        
>>>>>>> offset_fix
        
        divel.style.left = koordX;
<<<<<<< HEAD
        divel.style.top = koordY;*/
        //console.log(this.zindex);
        //divel.style.zIndex = this.zindex--;
=======
        divel.style.top = koordY;

        divel.classList.add('wave_styles');

        //console.log(this.zindex);
        //divel.style.zIndex = this.zindex--;
        
>>>>>>> offset_fix
        
        divel.style.left = offsetx;
        divel.style.top = offsety;        

        
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


