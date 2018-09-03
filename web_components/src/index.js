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
                                                    //INVOKE KADA SE TRIGGERUJE KLIKE EVENT NA
                                                    //CUSTOM ELEMENTU
                                                    //A ON OSTO SAM DEFINISAO, JESTE DA TIME BUDE POZVANA I
                                                    //toggleDrawer METODA, ALI AKO ELEMENT NEMA disabled
                                                    //ATRIBUT
            if(this.disabled){
                return;
            }
            this.toggleDrawer();
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


//NEKE PROVERE  //////////////////////////////////////////////////////////////////////////////////////

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
    }
}

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


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
////////              A STA SE TO MIZE DOGADJATI SA OBSERVED ATRIBUTOM:  
////////                    ON SE MOZE dodati, ukloniti, update-ovati, ili zameniti
////////              OVA METODA SE TAKODJE POZIVA ZA INICIJALNE VREDNOSTI, KADA SE CUSTOM ELEMENT
////////              KREIRA OD STRANE parser-A, ILIO KADA SE UPGRADE-UJE
////////              (MNOGO SPOMINJEM UPGRADE-OVANJE LEMENATA, TAKO DA CU SE TIME POSEBNO POZABAVITI, VRLO USKORO)
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
////////    POMENUTI    attributeChangedCallback    
////////    ISTO TAKO ODMAH NAKON SE MOJ ELEMENT UKLONI IZ DOM-A (POZIVANJEM NA PRIMER el.remove()) 
////////    BROWSER  CE POZVATI disconnectedCallback 
////////
////////        
////////
////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////
////////        
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////
////////











///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////NASTAVICU S PRIMERIMA ///////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
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














