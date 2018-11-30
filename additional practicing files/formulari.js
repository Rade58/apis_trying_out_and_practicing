const mojaFunkcija = function(){
    console.log('Moja funkcija executed');
}
mojaFunkcija();


// *******************************************************************************************************
// *******************************************************************************************************
// *******************************************************************************************************
// *******************************************************************************************************
//////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                      FORMULARI I KONTROLE
// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//              PROPERTIJI I METODE FORMULARA

// FORMULARI I CONTROL ELEMENTI, KAO STO JE <input> IMAJU MNOGE SPECIJALNE PROPERTIJE I EVENT-OVE
// RAD SA FORMULARIMA, MOZE BITI POGODNIJI (CONVENIENT), AKO POZNAJEM SVE TE SPECIJALNE PROPERTIJE
// METODE I EVENT-OVE

//          NAVIGACIJA: FORMULARI I ELEMENTI

const dvaFormulara = `
    <form name="moj_formular">
        <input name="jedan" value="1">
        <input name="dva" value="2">
    </form>
    <form>
        <input>
    </form>
`;

// FORMULARI document-A, SU CLANOVI SPECIJALNE KOLEKCIJE:
//                                                                  document.forms
// TO JE NESTO STO SE ZOVE 'NAMED COLLECTION'; ODNOSNO TO JE INSTANCA:
                                                        HTMLCollection
// STO ZNACI DA MOGU KORISTITI BROJEVE (INDEKSE), ALI I IMENA DA BIH PRISTUPIO FORMULARIMA
// KADA KAZEM IMENA, MISLIM NA VREDNOST ATRIBUTA:
                                //                        name

console.log(    document.forms                 );   //-->       HTMLCollection
console.log(    document.forms.moj_formular    );   //-->       <form name="moj_formular">...<form>
console.log(    document.forms[1]              );   //-->       <form>...</form>

// A AKO SU U FORMULAR NESTED ELEMENTI, ONI SU DOSTUPNI, PREKO, KOLEKCIJINOG    elements    GETTER-A
// CIJA JE POVRATNA VREDNOST:
                                    HTMLFormControlsCollection 
// INSTANCA, KOJA SE SASTOJI OD ELEMENATA, FORMULARA; ODNOSNO OD KONTROLA TOG FORMULARA
// I NJIMA JE MOGUCE PRISTUPITI UZ POMOC VREDNOSTI      name       ATRIBUTA, ALI I      INDEKSA

console.log(    document.forms.moj_formular.elements            );      //-->   HTMLFormControlsCollection
console.log(    document.forms.moj_formular.elements.jedan      );      //-->   <input name="jedan">
console.log(    document.forms.moj_formular.elements[0]         );      //-->   <input name="jedan">

///////////////////////////////////////////////////////////////////////////////////////////////////////
// MEDJUTIM, CESTA JE SITUACIJA DA POSTOJI VISE ELEMNATA JEDNOG FORMULARA, KOJI IMAJU ISTU VREDNOST
// name     ATRIBUTA; TAKVA JE SITUACIJA SA RADIO BUTTONS

const radio_buttons_inside_form = `
    <form name='radio-dugmad'>
        <input type="radio" name="godine" value="10">
        <input type="radio" name="godine" value="38">
        <input type="radio" name="godine" value="24">
        <input type="radio" name="godine" value="48">
    </form>
`;

console.log(    document.forms['radio-dugmad'].elements.godine    );        //--> RadioNodeList     INSTANCA

// KAO STO VIDIM, TADA JE ONO STO PROIZILAZI (KADA SE UPOTREBI VREDNOST name ATRIBUTA KAO GETTER) JESTE
// 
                RadioNodeList
    //                                  INSTANCA CIJU SU ELEMENTI, SVI INPUTI, ODNOSNO SVI RADIO BUTTON-I
    //                                  DAKLE, TO JE ISTO KOLEKCIJA ELEMENATA

// MOZDA SAM POGRESNO UPOTREBIO TERMIN GETTER; OVO SU NAIME SVE BILI
//                                                                          NAVIGACIONI PROPERTIJI FORMULARA

// NAIME, SVI OVI NAVIGACIONI PROPERTIJI NE ZAVISE OD TAG STRUKTURE; SVI ELEMENTI, BEZ OBZIRA KOLIKO DUBOKO
// BILI U FORMULARU, DOSTUPNI SU PUTEM:
//                                          elements        PROPERTIJA
// DAKLE, TO NECE BITI SAMO CHILD ELEMENTI
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//          
//                      FIELDSET-OVI KAO 'PODFORMULARI'    (Fieldsets as 'subforms')
// FORMULAR MOZE IMATI JEDAN ILI VISE
//                                          <fieldset></fieldset>        ELEMENATA
// I ONI TAKODJE PODRZAVAJU     
                        //          elements        PROPERTI

const form_with_fieldset = `
    <form id="formular">
        <fieldset name="userFields">
            <legend>info</legend>
            <input name="login" type="text">
        </fieldset>
    </form>
`;

console.log(      formular.userFields.elements          );          //-->     HTMLCollection      INSTANCA
console.log(      formular.userFields.elements.login    );          //-->     <input name="login">  
//////////////////////////////////////////////////////////////////////////////////////////////////////////

            //              KRACE PISANJE (SHORTER NOTATION)  form.name
// 
// U SLUCAJ UPREDHODNOG PRIMERA, ALI I INACE, JA NISAM MORAO PISATI OVAKO
// 
//                                                                 formular.userFields.elements.login
// VEC SAM MOGAO NAPISATI OVO       formular.login

console.log(        formular.login        );    //-->       <input name="login">

// DAKLE, POMENUTO ISTO FUNKCIONISE, ALI POSTOJI JEDAN MINOR ISSUE:
//              NAIME, AKO PRISTUPIM ELEMENTU, I PROMENIM MU VREDNOST   name-A
//              NEJEMU CE SE MOCI PRISTUPITI, I PUTEM STARE VREDNOSTI name, I PUTEM NOVE VREDNOSTI

formular.login.name = "user-name";      // PROMENIO SAM name INPUT-U

console.log(    formular.login          );              //-->   <input name="login">
console.log(    formular['user-name']   );              //-->   <input name="login">
console.log(formular.login === formular['user-name']);  //-->   true

// KAO STO VIDIM, ZAISTA SAM ELEMENTU PRISTUPIO, I PUTEM NOVOG I PUTEM STAROG NAVIGATION PROPERTIJA
//          OVO NAJCESCE, NE MOZE STVORITI PROBLEME, JER RETKO SE MENJA VREDNOST name-A, ZA ELEMENTE
//          FORMULARA
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//                  BACKREFERENCE   (REFERENCA U SUPROTNOM SMERU)

// ZA SVAKI ELEMENT, NJEGOV form ELEMENT, JESTE DOSTUPAN, PROPERTIJEM       form
// TAKO DA FORMULAR REFERENCIRA, SVE ELEMENTE, I SVI ELEMENTI REFERENCIRAJU FORMULAR

console.log(    formular.login.form    );       //-->          <form id="formular">...</form>
///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////    ////                          ////    /////////////////////////////////////////////
                //            ELEMENTI FORMULARA 
// SADA CU GOVORITI O KONTROLAMA FORMULARA
// MORAM OBRATITI PAZNJU NA SPECIJALNE FEATURE SVAKE OD KONTROLA (ELEMNATA) FORMULARA

//***************************************************************************************************
//       1)     input       I       textarea
// 
const input_checkboxInput_textarea = `
    <form id="some_form">
        <input name="zaTekst" type="text" value="8">
        <input name="zaChekiranje" type="checkbox">
        <textarea name="oblast_teksta">Neki tekst</textarea>
    </form>
`;
//
// STO SE TICE  input-A, VREDNOSTIMA input-A, MOGU PRISTUPITI PUTEM         value       PROPERTIJA
// A AKO JE U PITANJU type="checkbox", ONDA PRISTUPAM VREDNOSTI, PUTEM      checked     PROPERTIJA

console.log(    some_form.zaTekst.value           );    //-->       "8"
console.log(    some_form.zaChekiranje.checked    );    //-->       false

// A U SLUCAJU    textare-A    NIKAKO I NIKAD NE TREBA KORISTITI       texarea.innerHTML
// ZATO STO OVAJ PROPERTI SKLADISTI SAMO ONU INICIJALNU VREDNOST NESTED U HTML-U
// VEC TREBA KORISTITI:
//                          textarea.value

console.log(    some_form.oblast_teksta.value     );    //-->       "Neki tekst"

//***************************************************************************************************
//      2)      select      I       option
// 
// <select>  ELEMNT IMA TRI VAZNA PROPERTIJA:           options       value         selectedIndex
// 
//    a) options         COLLECTION   option  ELEMNATA
//    b) value           VREDNOST IZABRANOG   option-A
//    c) selectedIndex   BROJ SELECT-OVANOG   option-A (INDEKS)

// TAKO DA JE VREDNOST, select-A, MOGUCE PODESITI NA TRI NACINA:
//  
//         a)  PRONALAZENJEM ZELJENOG option-A, DEFINISANJEM DA VREDNOST, NJEGOVOG    selected    PROPERTIJA
//             BUDE        true
//         
//         b)  PODESAVANJEM NOVE VREDNSOTI    select-OVOG       value       PROPERTIJA
// 
//         c)  DODELOM NOVOG BROJA(INDEX-A, ZELjENOG option-A)    select-OVOM    selectedIndex    PROPERTIJU
// 
const selectElement = `
    <select id="selekt_element" size="2">              <!- size    ATRIBUT DEFINISE KOLIKO JE OPCIJA -->
        <option value="jabuke">Jabuke</option>         <!- VIDLJIVO KORISNIKU ODJEDNOM (DEFAULT JE JEDNA)-->
        <option value="kruske">Kruske</option>
        <option value="banane">Banane</option>
        <option value="limun">Limun</option>
    </select>
`;

// PRVI NACIN JE KAKO SE CINI, NAJOCIGLEDNIJI; ALI SU DRUGI  I TRECI NACIN, OBICNO VISE POGODNIJI

selekt_element.options[1].selected = true;
console.log(        selekt_element.value        );      //-->   "kruske"
selekt_element.value = 'banane';
console.log(        selekt_element.value        );      //-->   "banane"
selekt_element.selectedIndex = 0;
console.log(        selekt_element.value        );      //-->   "jabuke"

// ZA RAZLIKU OD DRUGIH KONTROLA, selected DOZVOLJAVA VISE IZBORA; U TOM SLUCAJU, MORA SE 'PROHODATI PREKO'
// ('WALK OVER')   options  PROPERTIJA   (TADA select ELEMENT, MORA IMATI BOOLEAN ATRIBUT   multiple  )

const selectMulti = `
    <select id="sel_el" multiple>
        <option value="jabuke">Jabuke</option>
        <option value="kruske">Kruske</option>
        <option value="banane">Banane</option>
        <option value="limun">Limun</option>
    </select>
`;

sel_el.options[1].selected = true;
sel_el.options[3].selected = true;

// NAIME, GORE SAM REKAO "WALK OVER", JER NE MOGU DOBITI CITAJUCI      value      PROPERTI      selected-A
// VISE SELEKTOVANIH VREDNOSTI (ZATO DAKLE MORAM DA CITAM   selected   PROPERTI SVAKOG oprion-A)

// KOLEKCIJU, PRVO PRETVARAM U NIZ, DA BIH NA NJOJ MOGAO PRIMENITI METODE, NIZOVOG PROTOTIPA
const vise_sel_vrednosti = Array.from(sel_el.options).filter(option =>  //ZATIM FILTRIRAM, SVE SELEKTED 
    option.selected
).map(option =>             //ZATIM VREDNOST, SVAKOG selected OPTIONA, POSTAVLJAM U NOVI NIZ
    option.value
);

console.log(vise_sel_vrednosti);        //-->       ["kruske", "limun"]

// POSTO JE MOGUCE SAZNATI JOS ODLIKA, select I options ELEMENATA (MISLIM DA ONI IMAJU JOS ATRIBUTA ETC.)
// MOGU PROCITATI SPECIFIKACIJU select-A:
//                          https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// specifikacija za option:  https://html.spec.whatwg.org/multipage/form-elements.html#the-option-element
//////////////////////////////////////////////////////////////////////////////////////////////////////////
                            
                                Option    //KONSTRUKTOR
// U SPECIFIKACIJI ZA option
//                              OBJASNJENA JE FINA, KRATKA SINTAKSA ZA KREIRANJE      <option>  -OVA
// 
//    PARAMETRI OVOG KONSTRUKTORA SE ODNOSE NA :            
//                                                 text (HTML)   value    defaultSelected      selected

            //          text                -->    NESTED TEXT option-A

            //          value               -->    VREDNOST option-A

            //          defaultSelected     -->    AKO JE true, TAJ option DOBIJA selected ATRIBUT
                                                   // DAKLE POSTAJE DEFAULT SELECTED

            //          selected            -->    AKO JE true, ONDA JE TAJ option SELECTED
                                                   // NJEGOV selected PROPERTI ONDA IMA true VREDNOST

// KREIRACU NEKOLIKO options ELEMENAT, ODNOSNO PAR Options INSTANCI

const optionElement1 = new Option("Grejp", "gerjpfruit");
const optionsElement2 = new Option("Mango", "mango", true, true);

console.log(
    optionElement1.selected, optionsElement2.selected           //-->   false    true
);

console.log(
    optionElement1.hasAttribute('selected'), optionsElement2.hasAttribute('selected')   //-->   false, true
);

//////////////////////////////// DODATNI PROPERTIJI     options     ELEMENTA
// 
//                          selected        -->       OPTION JE SELEKTOVAN, AKO JE true
//                          index           -->       REDNI BROJ OPCIJE, KADA JE ONA NESTED U select ELEMNTU
//                          text            -->       TEXT SADRZAN OD OPCIJE (VIDJEN OD STRANE VISITOR-A)
// 
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
/////////////////////////////////////////////////////////////
// PRIMER:
// MORAM KREIRATI    <options>       ELEMNT;     SA         vlue-OM             'classic'
                                           //    SA         text-OM             'Classic'  
                                           //    DA BUDE             selected

// I TAKAV ELEMENT, TREBAM NESTOVATI U SLEDECI      <select>

const primerZaoption = `
    <select id="genres">
        <option value="rock">Rock</option>
        <option value="blues" selected>Blues</option>
    </select>
`;

// MORAM PRVO UKLONITI  selected    ATRIBUT, SA JEDNOG OD option-A
genres.options[genres.selectedIndex].removeAttribute('selected');     // OVO SE NIJE NI TRAILO U PRIMERU
                                                                      // VEC SAMO DA SE PRIKAZE, KAKO JE
                                                                      // CONVINIENT, IZABRATI selected
                                                                      // OPCIJU, PUTEM  selectedIndex-A
genres.append(new Option("Classic", "classic", true, true));

/////////////////////////
// REZIME
// 
// Formular navigaciju:

//            document.forms
    // FOTMULAR je dostupan kao document.forms [name / indek].
//            form.elements
    // Elementi formulara su dostupni kao form.elements [name / indek], ili mogu koristiti samo oblik 
    // [nme / indeks]. PROPERTI       elements           takođe radi za <fieldset>
//             element.form
    // Elementi upućuju na njihovog formulara

// Vrednost je dostupna kao                          input.value    textarea.value     select.value      etc. 
// ili          input.checked           za checkox      i       radio buttons

// Za <select> takođe možemo dobiti vrednost indeksom   select.selectedIndex        ili kroz opciju 
//      select.options      ; Puna specifikacija ovog i drugih elemenata je na
//              https://html.spec.whatwg.org/multipage/forms.html

// To su osnove za početak rada sa formularima. U sledećem poglavlju ćemo pokriti     focus   i     blur 
// EVENT-OVE, koji se mogu pojaviti na bilo kom elementu, ali se uglavnom HANDLE-UJU SA FORMULARIMA


// *******************************************************************************************************
// *******************************************************************************************************
// *******************************************************************************************************
// *******************************************************************************************************
//                      
//                          FOCUSING:       focus/blur

// ELEMENT, MOZE PRIMITI    focus    , AKO KORISNIK, KLIKNE NA NJEGA, ILI AKO KORISNIK ISKORISTI   Tab   KEY,
// NA TASTATURI ONO STO TAKODJE POSTOJI JESTE        autofocus        HTML ATRIBUT, KOJI CE ELEMENT STAVITI
// U FOKUS, PO DEFAULT-U, KADA SE STRANICA LOAD-UJE, ILI NEKIM DRUGIM NACINOM DOBIJANJA FOKUSA
// 
// FOKUSIRANJE, GENERALNO ZNACI:        "PRIPREMI SE DA OVDE PRIHVATIS PODATKE"         ; TAKO DA JE TO 
// MOMENAT KADA MOGU POKRENUTI CODE, KOJI INICIJALIZUJE ILI LOAD-UJE NESTO
// 
// MOMENAT, GUBITKA FOKUSA (    'blur'    ) MOZE BITI, CAK I VAZNIJI; TO JE MOMENAT KADA KORISNIK KLIKNE
// NEGDE DRUGDE, ILI PRITISNE   Tab    , KAKO BI SE OTISLO DO SLEDECEG FORM FIELD-A, ILI BILO KOJIM DRUGIM
// NACINOM

// GUBITAK FOKUS-A, GENERALNO ZNACI:    "PODACI SU UNETI"       , TAKO DA SE MOZE POKRENUTI CODE, ZA PROVERU,
// ILI CAK ZA SACUVAVANJE TIH PODATAKA NA SERVERU, ETC.

// POSTOJE VAZNE PECULIARITIES (JEDINSTVENOSTI), PRILIKO MRADA SA       focus       EVENT-OVIMA, A TRUDICU SE
// DA IH NAJBOLJE SHVATIM IZ SLEDECIH OBJASNJENJA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//      EVENT-OVI:      focus/blur

//  focus       EVENT SE TRIGGER-UJE, KADA SE ELEMENT FOKUSIRA
//  blur        EVENT SE TRIGGER-UJE, KA ELEMENT IZGUBI FOKUS

// SADA CU KORISTITI, POMENUTE EVENT-OVE, PRILIKOM VALIDACIJE input FIELD-A
// U SLEDECEM PRIMERU:
//                      - ON   blur    TREBA DA HANDLE-UJE PROVERE, DA LI JE UNESEN TEKST U FORMATU email-A
                                       // AKO NIJE UNESEN, PRAVI MAIL, TREBA DA SE PRIKAZE ERROR PORUKA
                        
//                      - ON   focus   HANDLER, TREBA DA SAKRIJE ERROR

const elementi_primera_focus_blur = `
    Your email please: <input type="email" id="input_email">
    <div id="error_element"></div>
`;

const stilovi_za_primer_focus_blur = `
    #error_element {
        color: red;
    }

    .invalid {
        border-color: red;
    }
`;

input_email.onfocus = function(ev){
    if(this.classList.contains('invalid')){
        this.classList.remove('invalid');
        error_element.innerHTML = "";
    }
};

input_email.onblur = function(ev){
    if(!this.value.includes('@')){
        this.classList.add('invalid');
        error_element.innerHTML = "Please enter acorrect email.";
    }
};

// (ONO STO SAM PRIMETIO U SLUCAJ UFIREFOX-A, JESTE DA ON CAK TOKOM UNOSA MENJA BOJU BORDER-A, INPUTA
// KAKO BI UKAZAO DA LI JE UNOS U PRAVOM FORMAT-U)

// MODERNI HTML DOZVOLJAVA UPOTREBU, MNOGIH VALIDACIJA, UZ KORISCENJE ATRIBUTA:     required     pattern
// ETC.
// I PONEKAD, TI ATRIBUTI SU TACNO ONO STO M ITREBA
// JAVASCRIPT SE MOZE KORISTI, KADA ZELIM VISE FLEKSIBILNOSTI; TAKODJE, AUTOMATSKI SE SERVERU MOGU SLATI
// PROMENJENE VREDNOSTI, AKO SU CORRECT

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//      METODE:     focus/blur

// METODE               element.focus     I      element.blur               SET-UJU/UNSET-UJU
                                                                            // focus NA ELEMENTU

// NA PRIMER, HAJDE NA DEFINISEM TO, DA KORISNIK NE BUDE U MOGUCNOSTI DA ODE IZ INPUT-A, AKO JE VREDNOST
// NEVALIDNA 

const html_primer_focus_method = `
    Your email please: <input type="email" id="email_input" style="margin-top: 4px;">
    <input
        type="text"
        placeholder="ucini email nevalidnim i pokusaj da fokusiras ovde (bilo kojim nacinom)"
        style="width: 68%; margin-top: 4px;"
    >
`;

const style_for_focus_method = `
    .error_class {
        background: red;
    }
`;

window.email_input.onblur = function(ev){

    if(!this.value.includes('@')){
        this.classList.add('error_class');
        this.focus();           // AKO UNOS NIJE VALIDAN, focus METHOD CE UVEK BITI POZIVAN NAKON 
                                // TRIGGER-INGA    blur    EVENT-A
    }else{
        this.classList.remove('error_class');
    }
};

// OVO FUNKCIONISE U SVIM BROWSER-IMA, OSIM         FIREFOX-A  (POSTOJI BUG)

// Ako unesemo nešto u input, a zatim pokušamo da koristimo Tab ili kliknete dalje od <input>, onda
// onblur vraća fokus.

// Imajte na umu da ne možemo "sprečiti gubitak fokusa" pozivanjem      event.preventDefault()      
// u onblur-u, jer onblur radi nakon što element izgubi fokus

////////
// JAVASCRIPT-OM INICIRAN GUBITAK focus-A

// GUBITAK FOKUSA MOZE SE POJAVITI, IZ MNOSTVA RAZLOGA
// JEDAN OD NJIH JESTE KADA KORISNIK KLIKNE NEGDE DRUGDE, AL ITAKODJE SAM JAVASCRIPT MOZE IZAZVATI
// GUBITAK FOKUSA; NA PRIMER:
//                              alert POMERA focus, NA SEBE, TAKO DA IZAZIVA GUBITAK FOKUSA NA 
//                              ELEMENTU (ODNOSNO IZAZIVA TRIGGERING blur-A NA ELEMENTU)
//                              I KADA JE alet DISMISS-OVAN, FOKUS (focus EVENT) DOLAZI NAZAD DO
//                              ELEMENTA
// 
//                              AKO JE ELEEMNT UKLONJEN IZ DOM-A, ONDA TO TAKODJE IZAZIVA GUBITAK
//                              FOKUS-A; I AKO SE ELEMENT REINSERT-UJE, KASNIJE, FOKUS, SE NECE
//                              VRATITI
//
// OVI FEATURE-I, PONEKAD IZAZIVAJU     focus/blur     HANDLER-E DA SE MIBEHAVE-UJU (ODNOSNO DA SE
// TRIGGER-UJU, KADA NISU POTREBNI)
// NAJBOLJI RECEPT JE BITI OPREZAN, KADA SE KORISTE OVI EVENT-OVI; A AKO ZELIM DA PRATIM GUBITAK
// FOKUSA, IZAZVANOG OD STRANE KORISNIKA, ONDA TREBAM DA, I JA IZBEGAVAM IZAZIVANJE, TAKVOG
// GUBITKA FOKUSA
/////////////////////////////////////////////////////////////////////////////////////////////////// 
// 
//                     DOZVOLJAVANJE FOCUSING-A NA ELEMENTU:       tabindex
// 
// PO DEFAULT-U, MNOGI ELEMENTI NE PODRZAVAJU FOKUSIRANJE
// 
// Lista se razlikuje između pretraživača, ali jedna stvar je uvek tačna: podrška za
// focus/blur garantuje se za elemente sa kojima posjetitelj može interaktirati: 
//      <button>    <input>     <select>    <a>             etc. 
// S druge strane, elementi koji postoje da bi se formatirao nešto poput <div>, <span>, <table> 
// podrazumevano se ne mogu fokusirati. Metoda      elem.focus()        ne funkcioniše na njima,
//  a event-OVI     focus/blur   nikada se ne pokreću

// Ovo se može promeniti koristeći HTML-atributa            tabindex

// Svrha ovog atributa je da specificira redosledni broj elementa kada se Tab koristi za 
// prebacivanje između njih

// To je tako: ako imamo dva elementa: 
//                                      prvi ima tabindex = "1",
//                                      a drugi ima tabindex = "2", 
// a zatim pritiskom Tab-A dok smo u prvom elementu - pomera nas u drugi

// Postoje dve posebne vrednosti:
//                                      tabindex = "0"      OVO CINI ELEMENT POSLEDNJIM
//                                      
//                                      tabindex = "-1"     ZNACI DA BI tab TREBAO IGNORISATI
//                                                                                  ELEMENT
// 
// SVAKI ELEMENT SUPPORT-UJE FOKUSIRANJE, AKO IMA       tabindex

// NA PRIMER, KREIRACU JEDNU LISTU

const unordered_list_primer = `
    <ul class="u_list">
        <li tabindex="1">One</li>
        <li tabindex="0">Zero</li>
        <li tabindex="2">Two</li>
        <li tabindex="-1">Minus one</li>
    </ul>
`;

const stil_unordered_liste = `
    .u_list > li {cursor: pointer;}
    .u_list > li:focus {outline: 1px dashed green;}
`;

// OVO SAM TREBAO MOZDA DEFINISATI U iframe-U, JER OVAKO NA STRANICI NECU POSTICI DA IMAM
// REDOSLED FOKUSIRANJA     One-Two-Zero
// A ZNAM I OD RANIJE, ALI VIDIM I IZ NEKIH CLANAKA DA SE TREBA IZBEGAVATI DEFINISANJE tabindex-A
// VECEG OD NULE

// POGOTOVO JE ZBUNJUJUCE STO JE PO REDOSLEDU PRVI FOCUSABLE ELEMENT, KOJI IMA 1, A DRUGI KOJI IMA 
// 2...A 0(nula) JE POSLEDNJA FOCUSABLE

// UGLAVNO, POSTIGAO SAM U OVOM PRIMERU DA LIST ITEM BUDE FOCUSABLE, STO PO DEFAULTO ON NIJE
// DAKLE tabindex JE NEKIM ELEMENTIMA DAO MOGUCNOST DA BUDU FOCUSABLE
// A PSEUDO KLASA :focus JE OMOGUCILA DA SE ZADA POSEBAN STIL, KOJI ELEMENT IMA TOKOM FOKUSA 
/////////////////
// ELEMENTU, MOGU ZADATI tabindex, I IZ JAVASCRIPT-A, KORISTECI:
                                                            //       element.tabIndex    PROPERTI

console.log(document.querySelector('.u_list li:last-of-type').tabIndex);    //-->   -1
document.querySelector('.u_list').lastElementChild.tabIndex = 0;
console.log(document.querySelector('.u_list').lastElementChild.tabIndex);   //-->    0

/////////////////////////
// TRENUTNO FOKUSIRANOM ELEMENTU, U JAVASCRIPT-U SE MOZE PRISTUPITI, UZ POMOC:

                                                                            document.activeElement
setTimeout(()=>{console.log(document.activeElement);}, 2000);

//////////////////////////////////////////////////////////////////////////////////////////////////
//
//              DELEGATION:         focusin/focusout

// EVENT-OVI    focus       I         blur        NE BUUBLE-UJU UP

// NA PRIMER, NE MOGU ZAKACITI     onfocus     NA FORMULAR, DA BIH GA HIGHLIGHT-OVAO
// I SLEDECI PRIMER NE FUNKCIONISE

const cant_put_onfocus_handler = `
    <form onfocus="this.className = 'focused'" id="wrong_stuff">
        <input type="text" name="name" value="Name">
        <input type="text" name="surname" value="Surname">
    </form>
`;
const style_for_wrong = `
    .focused { outline: 1px solid red; }
`;

// Gornji primer ne funkcioniše, jer kada korisnik fokusira na <input>, focus EVENT se aktivira
//  samo na taj input. Ne bubble-uje up. Tako da se         form.onfocus         nikada ne pokreće

//                                          Postoje dva rešenja

// Prvo, tu je smešna istorijska karakteristika: fokus/blur ne      bubble-uju up, 
// već propagiraju u capturing fazi

// Ovo će raditi:

const can_put_onfocus_handler = `
    <form id="good_stuff">
        <input type="text" name="name" value="Name">
        <input type="text" name="surname" value="Surname">
    </form>
`;
const style_for_good = `
    .focused_good_stuff { outline: 1px solid red; }
`;

good_stuff.addEventListener('focus', function(){
    this.classList.add('focused_good_stuff');
}, true);

good_stuff.addEventListener('blur', function(){
    this.classList.remove('focused_good_stuff');
}, true);

// Drugo, postoje                       focusin          i          focusout           
// upravo isti kao i focus / blur
//  ali oni                          BUBBLE-UJU UP

// Imajte na umu da moraju biti dodijeljeni koristeći elem.addEventListener, a ne sa on event handler-om

// Evo još jedna varijanta koja funkcionise:

const focusin_and_out = `
    <form id="form_in_out">
        <input type="text" name="name" value="Name">
        <input type="text" name="surname" value="Surname">
    </form>
`;
const style_for_fin_and_out = `
    .fo { outline: 1px solid red; }
`;

form_in_out.addEventListener('focusin', function(){
    this.classList.add('fo');
});

form_in_out.addEventListener('focusout', function(){
    this.classList.remove('fo');
});

//////////////////////////////////////////////////////////////////////////////////////////////////
// REZIME
// EVENT-OVI        focus           I               blur            TRIGGER-UJU SE NA
//                                                                  FOKUSIRANJE / GUBLJENJE FOKUSA
//    NJIHOVE SPECIJALNOSTI SU:
//                                      ONI NE BUBBLE-UJU UP (A AKO HOCU TO DA PREVAZIDJEM
//                                      MOGU IH HVATATI U CAPTURING FAZI; ILI MOGU KORISTITI
//                                      focusin / focusout    EVENT-OVE)
// 
//                                      MNOGI ELEMENTI NE PODRZAVAJU        focus   PO DEFAULT-U
//                                      A KORISCENJEM   tabindex   ATRIBUTA ILI     tabIndex
//                                      PROPERTIJA, MOGU BILO STA UCINITI FOCUSABLE-IM
// 
// TRENUTNO FOKUSIRANOM ELEMENTU, U JAVASCRIPT-U SE MOZE PRISTUPITI, UZ POMOC:
                                                                            document.activeElement
///////////////////////////////////////////////////////////////////////////////////////////////////
// PRIMERI:
//  U SLEDECEM PRIMERU TREBA DA KREIRAM  div  ELEMENT, KOJI SE NAKON KLIKA PRETVARA U
//                                                                                       textarea
// NAIME, KADA KORISNIK PRITISNE Enter , ILI KADA ELEMENT IZGUBI FOKUS textarea TREBA DA SE
// PRETVORI NAZAD U     div     I DA NJENA SADRZINA POSTANE     NESTED HTML div-A

const div_tekst_element_primer = `
    <div style="height: 138px">     /*STAVIO SAM DIV ELEMENT U WRAPPER, ZATO STO MOZE DOCI DO
                                    'SKOKOVA' (STO UTICE NA OKOLNE ELEMENTE) 
                                    PRI INSERTOVANJU/EKSERTOVANJU ELEMENTA*/

        <div id="tekst_elem" class="tekst-elem-size">Pocni unos...</div>

    </div>
`;

const style_div_tekst_element_primer = `
    .tekst-elem-size {
        box-sizing: border-box;
        display: inline-block;
        width: 200px;
        height: 120px;
        margin: 10px;
        line-height: 18px;
        margin-bottom: 10px;
        border: black solid 2px;
        padding: 10px;
    }

    .tekst-elem-size:focus {
        outline: #47ffa9bd solid 1px;
        border: black solid 1px;
    }
`;

tekst_elem.tabIndex = 0;

tekst_elem.onfocus = function(){

    const divElement = this;
    let textarea = document.createElement('textarea');
    divElement.insertAdjacentElement('beforebegin', textarea);
    textarea.innerText = divElement.innerText;
    
    textarea.onfocus = function(){
        divElement.remove();
    };
    textarea.onblur = function(){
        divElement.innerText = this.value;
        this.insertAdjacentElement('beforebegin', divElement);
        this.remove();
        textarea = null;
    };
    textarea.onkeydown = function(ev){
        if(ev.code === 'Enter') this.blur();
    };

    textarea.classList.add("tekst-elem-size");
    textarea.focus();
    
};
// OVO JE MOJE RESENJE, KOJE FUNKCIONISE, ALI RESENJE IZ CLANKA JE NESTO DRUGACIJE
// A TAMO JE KORISCEN I JEDNA METODA, ZA KOJU DO SADA NISAM CUO, A TO JE    
//                                                                                  
//                                                                          replaceWidth
// A POSTOJE I JOS TAKVIH EKSPERIMENTALNIH METODA, KAO STO SU:
//                                                                after     before      remove

// (OVO SU METODE ChildNode-a (ON SE NE MOZE KONSTRUISATI U KLASICNOM SMISLU, UZ POMOC
// KONSTRUKTORA, ALI Element KLASA GA IMPLEMENTIRA...(
// PROCITATI OVDE:      https://developer.mozilla.org/en-US/docs/Web/API/ChildNode       )))

// OVO CE BITI HTML, PRIMERA IZ CLANKA

const html_tarea_div_primer_ruski_clanak = `
    <div id="view" class="view">Tekst</div>
`;

// CSS CE BITI NESTO KOMPLEKSNIJI, NEGO U SLUCAJU, MOG PRIMER-A

const css_tarea_div_primer_ruski_clanak = `
    /*I      div     I       textarea        TREBA DA IMAJU, OVAKVE STILOVE */
    .view, .edit {
        height: 150px;
        width: 428px;
        font-family: sans-serif;
        font-size: 14px;
        display: block;
    }

    /*div  TREBA DA IMA     padding + border = 3px */
    .view {
        padding: 2px;
        border: 1px solid black;
    }

    /*KADA SE UMESTO div-A, INSERT-UJE textarea, NJEN BORDER NEKA BUDE 3px ,A PADDING NULA PIKSELA*/
    /*ZASTO JE OVO URADJENO NA OVAKV NACIN JESTE, PREDPOSTAVLJAM DA NE DODJE DO 'SKOKA'*/
    /*KOJI SAM RANIJE POMENUO (OVO MORAM PROSTUDIRATI DETALJNO, JEDNOM PRILIKOM)*/
    .edit {
        border: 3px solid blue;
        padding: 0px;
    }

    .edit:focus {
        outline: none;      /*OVAKO ZE UKLANJA OUTLINE (A TO JE FOCUS BORDER) U SAFARI BROWSER-U*/
    }
`;

// STO SE TICE JAVASCRIPTA, TREBA DEFINISATI VARIJABLU, KOJA CE REFERENCIRATI, TRENUTNI textarea
let area = null;

const view = document.getElementById('view');

// SLEDECA FUNKCIJA CE BITI POZVANA U   onblur  HANDLERU, KOJI BUDE BIO ZKACEN NA textarea-A    
// A ONO STO CE TAJ HANDLER URADITI, JESTE DAVANJE value-A OD textarea-A, div ELEMENTU, DA POSTANE
// NJEGOV innerHTML, I ZAKACICE NAZAD div, A UKLONICE textarea

const editEnd = function(){
    view.innerHTML = area.value;
    area.replaceWith(view);
};

// ZATIM DEFINISANJE, PA ZATIM KACENJE ON click HANDLER-A (JA SAM U GORNJEM PRIMERU KORISTIO onfocus
// MOZDA KREATOR PRIMERA NE ZELI DA SE Tab-OM, OMOGUCI FOKUSIRANJE, VEC DA KORISNIK MORA
// KLIKNUTI NA ELEMENT), NA div ELEMENT, I TAJ HANDLER TREBA DA, OBAVI ONO STO JE onfocus HANDLER
// OBAVIO U MOM PRIMERU 

//OVA FUNKCIJA CE BITI POZVANA U POMENUTOM onclick HANDLER-U
const editStart = function(){
    area = document.createElement('textarea');
    area.className = 'edit';
    area.value = view.innerHTML;

    //DEFINISEM onkeydown HANDLER ZA texarea-U

    area.onkeydown = function(ev){
        if(ev.key === 'Enter') this.blur();
    };

    // DEFINISANJE onblur HANDLERA textare-E

    area.onblur = function(){
        // POZIVANJE FUNKCIJE KOJA CE DATI textare-IN value, div-U, I div INSERTOVATI NAZAD UMESTO 
        // textare-E
        editEnd();
    }

    // DAKLE U OVOJ FUNKCIJI KOJA CE BITI POZVANA U onclick HANDLER-U; DEFINISEM DA SE
    // div ZAMENI SA textare-OM U DOM-U, I DA SE textare-A, FOKUSIRA

    view.replaceWith(area);
    area.focus();

};

view.onclick = function(){
    editStart();
}

// MISLIM DA OVAJ PRIMER IMA PAMETNIJI CSS OD MOG I ZATO BI GA TREBAO PROUCITI
///////////////// 
// SLEDECI PRIMER, JESTE PRIMER SA BAGUA TABELOM, KOJU SAM KORISTIO (PRI VEZBANJU mouseover/out)

// TREBAM UCITI POLJA TABELE EDITABLE ON click
// NAIME    
//        - ON click CELIJA BI TREBALA POSTATI 'EDITABLE' (textarea TREBA DA SE POJAVI UNUTRA)
//                   (U textare-I, TREBA DA SE NALAZI HTML, ZA EDITOVANJE (HTML CELIJE))
//                    I TREBAL BI BITI SACUVANA SVA GEOMETRIJA, DAKLE NE TREBA BITI RESIZE (OVO
//                    POSLEDNJE MORAM SHVATITI KAKO DA URADIM)
// 
//        - DUGMAD  OK  I  CANCEL    TREBAJU DA SE POJAVE ISPOD CELIJE, I SLUZICE ZA  finish / cancel 
//                                                                               EDITOVANJA
// 
//        - SAMO JEDNA CELIJA MOZE BITI EDITABLE AT THE MOMENT; ODNOSNO FOK JE      td      U
//              EDIT MODE-U, click-OVI NA DRUGIM CELIJAMA, TREBA DA SE IGNORISU
// 
//        - TABELA MOZE IMATI MNOSTVO CELIJA; KORISTITI EVENT DELEGATION

// OVAKO CE IZGLEDATI HTML I CSS PRIMERA
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
`;

const majorClickHandler =  function(ev){
    if(!ev.target.closest('td')) return;
    const td = ev.target.closest('td');
    const currentTarget = ev.currentTarget;
    let area = null;
    const ok = document.createElement('button');
    const cancel = document.createElement('button');
    let okCancel = document.createElement('div');
    let tdTemp = null;

    const tdWidth = td.offsetWidth;
    const tdHeight = td.offsetHeight;
    const tdCoordsAndSizes = td.getBoundingClientRect();

    const tdPageBottom = tdCoordsAndSizes.bottom + document.documentElement.scrollTop;
    const tdPageLeft = tdCoordsAndSizes.left;
    

    ok.innerText = 'OK';
    cancel.innerText = 'CANCEL';
    okCancel.style.dysplay = 'inline-block';
    okCancel.append(ok);
    okCancel.append(cancel);
    okCancel.style.position = 'absolute';
    okCancel.style.border = 'green solid 1px';


    const editStart = function(){
        tdTemp = document.createElement('td');
        area = document.createElement('textarea');
        tdTemp.append(area);
        area.style.width = tdWidth - 10 + 'px';
        area.style.height = tdHeight - 10 + 'px';
        tdTemp.style.width = tdWidth + 'px';
        tdTemp.style.height = tdHeight + 'px';
        tdTemp.style.padding = '0px';
        area.value = td.innerHTML;
        td.replaceWith(tdTemp);
        document.documentElement.append(okCancel);
        okCancel.style.left = tdPageLeft + 'px';
        okCancel.style.top = tdPageBottom + 'px';
        area.focus();

        okCancel.onclick = function(ev){
            if(ev.target.innerHTML === 'OK'){
                td.innerHTML = area.value;
                tdTemp.replaceWith(td);
                okCancel.remove()
                okCancel = null;
                area = null;
                tdTemp = null;
                currentTarget.onclick = majorClickHandler;
            }
            if(ev.target.innerHTML === 'CANCEL'){
                tdTemp.replaceWith(td);
                okCancel.remove()
                okCancel = null;
                area = null;
                tdTemp = null;
                currentTarget.onclick = majorClickHandler;
            }
        }

    };

    editStart();

    document.querySelector('.table_kont_one').onclick = null;

};

document.querySelector('.table_kont_one').onclick = majorClickHandler;

// MOJE RESENJE FUNKCIONISE, ALI OPET JE PROBLEM CSS; POGLEDACU KAKAVO JE RESENJE IZ CLANKA
// PA DA VIDIM STA SE MOZE POMRAVITI
// MEDJUTIM, GLEDAJUCI RESENJE PRIMERA IZ CLANKA SHVATIO SAM DA I TAMO IMA 'SKOKOVA', PRILIKOM
// REPLACEMENT-OVA (PROCITACU IPAK CODE POMENUTOG PRIMERA, PA CU VEROVATNO ODRADITI PRIMER,
// KAKO JE U ORGINALU URADJEN I U CLANKU)
// IPAK CU OSTAVITI LINK DO RESENJA, PA CU PRIMER ODRADITI, NEKOM DRUGOM PRILIKOM, U CILJU USTEDE
// VREMENA
// http://next.plnkr.co/edit/0TJJus0XtFNQYjSNp2rr?p=preview&preview
////////////////////////////////
// URADICU SADA JOS JEDAN PRIMER
// SLEDECI PRIMER JESTE 'MIS (SLIKA SASTAVLJENA OD KARAKTERA)'
// POTREBNO JE DA SE FOKUSIRA, I DA SE ONDA ARROW KEY-OVIMA POMERA (ELEMENT JE I Tab FOCUSABLE)

// OVO JE HTML I STIL PRIMERA
const pre_tag_mouse = `
    <pre id="mouse">
         _   _
        (q\_/p)
         /. .\
        =\_t_/=   __
         /   \   (
        ((   ))   )
        /\) (/\  /
        \  Y  /-'
         nn^nn
    </pre>
`;
const pre_tag_css = `
#mouse {
    display: inline-block;
    cursor: pointer;
    margin: 0;
  }

  #mouse:focus {
    outline: 1px dashed black;
  }
`;

mouse.tabIndex = 0;

mouse.addEventListener('focus', function(ev){

    this.style.position = 'absolute';

    const offsetW = ev.target.offsetWidth;
    const offsetH = ev.target.offsetHeight;

    console.log(offsetW, offsetH);

    this.addEventListener('keydown', function(ev){

        const current = ev.currentTarget;

        const offsetLeft = current.offsetLeft;

        const offsetTop = current.offsetTop;


        ev.preventDefault();

        if(ev.code === 'Tab'){
            current.blur();
            return;
        }


        console.log(ev.code);

        const up = ev.code === 'ArrowUp'?true:false;
        const down = ev.code === 'ArrowDown'?true:false;
        const left = ev.code === 'ArrowLeft'?true:false;
        const right = ev.code === 'ArrowRight'?true:false;

        const vert = up || down?true:false;
        const horizon = left || right?true:false;

        const moveLeft = left?(-offsetW):0;
        const moveRight = right?(offsetW):0;
        const moveUp = up?(-offsetH):0;
        const moveDown = down?(offsetH):0;

        current.style.left = (horizon?(offsetLeft + moveLeft + moveRight):(offsetLeft)) + 'px';
        current.style.top = (vert?(offsetTop + moveUp + moveDown):(offsetTop)) + 'px';

    });

});

// MOJ PRIMER FUNKCIONISE, ALI JE OPET, U CLANKU URADJENO DRUGACIJE; KONKRETNO IZMEDJU OSTALOG
// KORISCENA JE
//                  switch      IZJAVA
//                  I UMESTO        addEventListener-A, KORISCENI SU SVUGDE on HANDLERI

// ODRADICU I NACINOM KOJI JE URADJEN U CLANKU, CIJI CU LINK OVDE OSTAVITI
//                        http://next.plnkr.co/edit/AZLBihrgORhfYdVTxdjD?p=preview&preview

// DAKLE, NEKOM DRUGOM PRILIKOM CU ODRADITI, OVAJ PRIMER IZ RUSKOG CLANKA, CIJI SAM LINK OSTAVIO
// A SADA CU SE POZABAVITI NOVIM CLANKOM VEZANIM ZA VELIKI NASLOV 'FORMS, CONTROLS'
/////////////////////////////////////////////////////////////////////////////////////////////////
// *******************************************************************************************************
// *******************************************************************************************************
// *******************************************************************************************************
// *******************************************************************************************************
// 
//                     EVENT-OVI:           change      input       cut         copy        paste

// OVDE CE SE DISKUTOVATI O, RAZNIM EVENT-OVIMA, KOJI PRATE DATA UPDATES
////////////////////////

//      change      EVENT

// OVAJ EVENT SE TRIGGER-UJE, KADA JE ELEMENT ZAVRSIO SA, SVOJIM MENJANJEM, ODNOSNO KADA SE ZAVRSILA
// PROMENA NA TO ELEMENTU

// ZA TEKST INPUT-OVE, TO ZNACI DA SE EVENT JAVLJA KADA TAKAV input IZGUBI FOKUS (ALI NECE SE TRIGGER-OVATI
// SAMO AKO ELEMENT IZGUBI FOKUS, NAIME, MORA DA SE ZADA NOVI value , PA TEK ONDA AKO ELEMENT IZGUBI FOKUS
// TRIGGER-OVACE SE I change EVENT)

// NA PRIMER, DOK BUDEM KUCAO U TEXT FIELDU (KOJI CU KREIRATI, I CIJI HTML SAM PREDSTAVIO DOLE); NECE BITI 
// TRIGGERING-A EVENT-A
// ALI KADA POMERIM FOKUS NEGDE DRUGDE, NA PRIMER, AKO KLIKNEM NA BUTTON; TRIGGER-OVACE SE  change  EVENT, NA
// POMENUTOM input-U
const primer_za_change = `
    <input type="text" onchange="console.log(this.value)">
    <input type="button" value="Button">
`;
// ZA DRUGE ELEMENTE, KAO STO SU:
//                                      select, input(type=checkbox/radio)
// TRIGGER-OVACE SE ODMAH KADA SE
// IZVRSI NOVA SELEKCIJA; ODNOSNO KADA SE SELEKCIJA PROMENI   
// /////////////////////////////////////////////////////////////

//    input        EVENT
// 
// OVOJ EVENT SE TRIGGER-UJE, SVAKI PUT, KADA SE      value         MODIFIKUJE
// NA PRIMER:
const primer_za_input_event = `
    <input id="input" type="text"> oninput: <span id="result"></span>
`;

input.oninput = function(){
    result.innerHTML = this.value;
};

// AKO ZELIM DA HENDLE-UJEM, SVAKU MODIFIKACIJU NA <input> -U, ONDA JE OVAJ EVENT, NAJBOLJI IZBOR

// ZA RAZLIKU OD KEYBOARD EVENT-OVA; OVAJ EVENT RADI NA BILO KOJOJ PROMENI value-A; CAK I ONOJ PROMENI, KOJA
// NE UKLJUCUJE         KEYBOARD ACTIONS:
//                                          PASTING UZ POMOC MISA, ILI KORISCENJEM SPEECH RECOGNITION-A ZA
//                                                                  DIKTIRANJE TEKSTA
// ////
// NE MOZE SE NISTA PREVENT-OVATI, U    oninput     HANDLER-U
// input EVENT SE JAVLJA, NAKON STO JE value MODIFIKOVAN
// TAKO DA SE NE MOZE KORISTITI: 
//                                  event.preventDefault()      U POMENUTOM HANDLER-U, JER JE PREKASNO
//                                                              I TO NE BI DALO NIKAKVOG EFEKTA
//////////////////////////////////////////////////////////
// 
//    cut       copy        paste       EVENT-OVI
// 
// OVI EVENT-OVI SE TRIGGER-UJU, ON     cuutting/copying/pasting    VREDNOSTI
// ONI PRIPADAJU ClipboardEvent  KLASI (https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces)
// I OMOGUCUJU ACCESS PODACIMA, KOJI SU     copied/pasted
// TAKODJE, MOZE SE KORISTITI       event.preventDefault()      ZA ABORT-OVANJE ACTION-A
// NA PRIMER, CODE DOLE, PREVENTIRA, SVAKI OD POMENUTIH EVENT-OVA, I POKAZUJE DA ZELIM DA POKUSAVAM DA
//                                                                                          cut/copy/paste
// 
const primer_za_cut_copy_paste = `
    <input id="input_sec" type="text">
`;
 
input_sec.oncopy = input_sec.oncut = input_sec.onpaste = function(ev){
    ev.preventDefault();
    console.log(
        'prevented ' + ev.type + ' --> ' + ev.clipboardData.getData('text/plain')
    );

    // A UMESTO POZIVANJA preventDefault-A, MOGAO SAM IZ OVE FUNKCIJE      return-OVATI  false
};

// U SLUCAJU paste EVENTA, MOGAO SAM VIDETI I STA BI SE PASTE-OVALO, DA DEFAULT ACTION NIJE PREVENTED
// A PRISTUPIO SAM CLIPBOARD-U, UZ POMOC
//                                                      event.clipboardData    (ONDA SAM NAD OBJEKTOM
//                                                                              KOJEM SAM PRISTUPIO
//                                                                              PRIMENIO  getData METODU)
// TEHNICKI, MOZE SE COPY-RATI I PASTE-OVATI BILO STA
// NA PRIMER, MOZE SE KOPIRATI I FILE U OS FILE MANAGER-U I PASTE-OVATI
// POSTOJI LISTA METODA U SPECIFIKACIJAMA:
                        //                  https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer
// SA KOJIM SE MOZE RADITI SA RAZLICITIM DATA TYPES, READ/WRITE-OVATI U CLIPBOARD
// ALI MOLIM DA OBRATIS PAZNJU DA JE CLIPBOARD JESTE "GLOBAL" OS-LEVEL THING; VECINA BROWSER-A DOZVOLJAVAJU
// READ/WRITE U CLIPBOARD, SAMO U OBIMU ODREDJENIH USER ACTION-A, U CILJU SAFETY-JA
// TAKODJE ZABRANJENO JE KREIRANJE "CUSTOM" CLIPBOARD EVENT-OVA U SVIM BROWSER-IMA, IZUZEV FIREFOX-A
//////////
//          REZIME:

//          Event                           OPIS                                SPECIJALI (SPECIALS)
// 
//      change                value SE PROMENILO                       ZA text input-E, NKON GUBITKA FOKUSA
// 
//      input                 ZA text inpute-E, NA SVAKOJ              ZA RAZLIKU OD chang-A, TRIGGERUJE SE
//                              PROMENI                                                             ODMAH
// 
//      cut/copy/paste        CUT/COPY/PASTE ACTIONS                   ACTION MOZE BITI PREVENTED; I 
//                                                                     event.clipboardData     PROPERTI
//                                                                     DAJE READ/WRITE PRISTUP CLIPBOARD-U
// /////////////////////////////////////////////////////////////////////////////////////////////////////////
// PRIMER:
// DEPOSIT CALCULATOR
// 
// TREBAM, NAIME KREIRATI INTERFEJS, KOJI OMOGUCAVA UNOS SUME BANKOVNOG DEPOZITA I PROCENATA, I KOJI
// IZRACUNAVA KOLIKI CE BITI IZNOS NAKON, ODREDJENOG VREMENA
// 
// SVAKA PROMENA INPUT-A, TREBA DA BUDE PROCESSED IMMEDIATELLY
// FORMULA ZA PRIMER JE SLEDECA:

//      initial             -->     INICIJALNA SUMA NOVCA
//      interestRate        -->     NA PRIMER   0.05    ZNACI       5%  GODISNJE
//      years               -->     KOLIKO GODINA SE CEKA
//  
//      OVAKO     let result = Math.round(initial * interestRate * years + initial)
//      ODNOSNO OVAKO       result = Math.round(initial * (1 + interestRate * years))

// DEFINISACU HTML I CSS

const html_primera_input_eventa = `
    Deposit calculator.
    <form name="calculator">
        <table>
            <tr>
                <td>Initial deposit</td>
                <td>
                    <input name="money" type="number" value="10000" required>
                </td>
            </tr>
            <tr>
                <td>How many months?</td>
                <td>
                    <select name="months">
                        <option value="3">3 (minimum)</option>
                        <option value="6">6 (half-year)</option>
                        <option value="12">12 (one-year)</option>
                        <option value="18">18 (1.5 years)</option>
                        <option value="24">24 (2 years)</option>
                        <option value="30">30 (2.5 years)</option>
                        <option value="36">36 (3 years)</option>
                        <option value="60">60 (5 years)</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Interest per year?</td>
                <td>
                    <input name="interest" type="number" value="5" required>
                </td>
            </tr>
        </table>
    </form>
    <table id="diagram">
        <tr>
            <th>Was:</th>
            <th>Becomes:</th>
        </tr>
        <tr>
            <th id="money-before"></th>
            <th id="money-after"></th>
        </tr>
        <td>
            <div style="background: tomato; width: 38px; height: 100px;">
            </div>
        </td>
        <td>
            <div style="background: olive; width: 38px; height: 0;">
            </div>
        </td>
    </table>
`;

const css_primera_input_eventa = `
    td select, td input {
        width: 208px;
    }

    #diagram td {
        vertical-align: bottom;
        text-align: center;
        padding: 10px;
    }

    #diagram div {
        margin: auto;
    }
`;

// A OVO JE JAVASCRIPT

const depositFunc = function(){
    const formular = document.forms.calculator;
    const elements = formular.elements;
    
    const moneyInput = elements.money;
    const monthsSelect = elements.months;
    const rateInput = elements.interest;

    const diagram = window.diagram;

    const divWas = diagram.querySelectorAll('div')[0];
    const divBecomes = diagram.querySelectorAll('div')[1];

    const moneyBefore = window['money-before'];
    const moneyAfter = window['money-after'];
    
    const equasion = function(deposit, months, rate){
        return Math.round(deposit * (1 + (months/12) * rate/100));
    };

    const onInputHandler = function(ev){
        if(
            ev.type === 'input' && 
            ev.target === moneyInput || ev.target === monthsSelect || ev.target === rateInput
        ){
            divWas.style.height = (ev.target === moneyInput?(moneyInput.value/100 + 'px'):window.getComputedStyle(divWas).height);
            divBecomes.style.height = equasion(moneyInput.value, monthsSelect.value, rateInput.value)/100 + 'px';
            moneyBefore.innerHTML = moneyInput.value;
            moneyAfter.innerHTML = equasion(moneyInput.value, monthsSelect.value, rateInput.value);
        }
    }

    formular.addEventListener('input', onInputHandler);

};

depositFunc();

// USPESNO SAM DEFINISAO, POMENUTI KALKULATOR; ALI OPET DO REZULTATA SE, DO ODREDJENOG NIVOA RESENJE U CLANKU
// JESTE DRUGACIJE, ALI I BOLJE, ZATO JE DOBRO URADITI TAJ PRIMER, ONAKO KAKO JE I RESENJE U CLANKU, JER
// IPAK TO JE RADIO ISKUSNI DEVELOPER; OSTAVICU OVDE LINK
// http://next.plnkr.co/edit/AN8sxfdS7rFo4Et6x2NZ?p=preview&preview
// ODRADICU OVO TOKOM PONAVLJANJA (MORAM SVE OVE PRIMERE I OBJASNJENJA, JEDNOM PONOVITI), A SADA PRELAZIM NA
// NOVI CLANAK
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// *******************************************************************************************************
// *******************************************************************************************************
// *******************************************************************************************************
// *******************************************************************************************************
//
//                                  PODNOSENJE FORMULARA (FORM SUBMISSION)
//
//                                  EVENT   submit         METODA     submit  
// 
// EVENT submit će se trigger-ovati kada se formular podnese, obično se koristi za validaciju obrazca
// prije slanja na server ili za prekidanje submission-A i processing u JavaScriptu.

// Metoda   form.submit()      omogućava iniciranje slanja obrazaca iz JavaScript-a
// Možemo je koristiti za dinamičko kreiranje i slanje sopstvenih formulara na server

// Da vidimo više detalja o njima.
//////////////////////////////////
//                                             EVENT   submit
// 
// POSTOJE DVA OSNOVNA NACINA DA SE SUBMITUJE FORMULAR
//          1) KADA SE KLIKNE NA          <input type="submit">       ILI         <input type="image">
//          2) KADA SE PRITISNE      Enter   KEY  NA  input FIELD-U
// 
// OBA ACTION-A, VODE DO            submit          EVENT-A NA FORMULARU
// HANDLER MOZE PROVERITI PODATKE (CHECK THE DATA), I AKO POSTOJE ERROR-I, PRIKAZATI IH I POZVATI:
// 
//                                                                              event.preventDefault()
//                                                                          (ILI return-OVATI   false    )
//                                                                         I TADA FORMULAR NECE BITI POSLAT
//                                                                         SERVER-U
// U FORMULARU, KOJI SAM DOLE KREIRAO
//                                          1) UCI CU U <input> FIELD I PRITISNUCU Enter
//                                          2) KLIKNUCU NA <input type="submit"> 
const html_submit_primera = `
    <form onsubmit="console.log('SUBMIT!'); return false;">
        Prvo: pritisni Enter u input polju: <input type="text" value="text"><br>
        Drugo: Click-ni "submit": <input type="submit" value="Submit">
    </form>
`;

// OBA POMENUTA ACTION-A CE STAMPATI ZADATI STRING U KONZOLI, A FORMULAR NIGDE NECE BITI POSLAT, ODNOSNO 
// SUBMIT-OVAN, ZATO STO SAM U OBIMU HANDLER-A, NAPISAO         
//                                                              return false;
///////////////////////////////////////////////////////
// 
//      ODNOS IZMEDJU       submit      I       click
// 
// KADA JE FORMULAR POSLAT, KORISCENJEM     Enter-A     NA INPUT POLJU,     click      EVENT SE TRIGGER-OVAO
// NA       <input type="submit">
// THAT'S RATHER FUNNY, zato sto uopste nije bilo nikakvog KLIKA
// 
// EVO JE I DEMONSTRACIJA POMENUTOGA:

const html_drugog_submit_primera = `
    <form>
        <input type="text" size="28" value="Focus here and press Enter">
        <input type="submit" value="Submit" onclick="alert('CLICK!');">
    </form>
`;
/////////////////////////////////////////////////////////

//              METODA      submit
// 
// ZA MANUELNO SUBMIT-OVANJE FORMULARA, SERVERU, MOZE SE POZVATI            form.submit()
// 
// TADA     submit      EVENT, NIJE GENERISAN; NAIME TADA SE PREDPOSTAVLJA DA AKO JE PROGRAMER POZVAO
//   form.submit()   , SCRIPT JESTE ODRADIO SAV RELATED PROCESSING

// PONEKAD, POMENUTO SE KORISTI DA SE MANUELNO KREIRA I POSALJE FORMULAR, UPRAVO OVAKO:

const submitingFunk = function(){
    const form = document.createElement('form');

    form.action = 'https://google.com/search';
    form.method = 'GET';

    form.innerHTML = '<input name="q" value="test">'

    document.body.append(form);

    form.submit();
};
// MOGU OVU FUNKCIJU POZVATI U KONZOLI PA DA VIDIM STA CE SE DOGODITI
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SADA CU DEFINISATI, JEDAN PRIMER VEZAN ZA OVAJ CLANAK
// TREBAM KREIRATI FUNKCIJU
//                                              showPrompt(html, callback)
// KOJA POKAZUJE FORMULAR SA PORUKOM (html ARGUMENT), input POLJE I DUGMADI     OK/CANCEL
// 
//                  -KORISNIK BI TREBAO NESTO KUCATI U TEXT FIELD I PRITISNUTI Enter ILI OK DUGME;
//                          TADA BI TREBALO DA SE POZIVA        callback(value)        ; NARAVNO   value  JE 
//                                                                            VREDNOST, KOJU JE KORISNIK UNEO
//                  -U SUPROTNOM, AKO KORISNIK PRITISNE     Esc     ILI     CANCEL    DUGME ,  ONDA TREBA DA
//                          SE OPOZOVE      callback(null)

//          U OBA SLUCAJA, POMENUTO CE PREKINUTI INPUT PROCES I UKLONICE SE FORMULAR

//      ZAHTEVI (EQUIREMENTS):
//  - FORMULAR TREBA DA BUDE U CENTRU        window-A
//  - FORMULAR JE modal. DRUGIM RECIMA, NI JEDNA INTERAKCIJA SA OSTATKOM STRANICE, NIJE MOGUCA DOK, KORISNIK
//      NE ZATVORI, TAJ modal
//  - KADA JE FORMULAR PRIKAZAN, FOKUS TREBA DA BUDE UNUTAR     <input>  ZA KORISNIKA 
//  - KEY-OVI      Tab / Shift + Tab   TREBAJU DA MENJAJU (SHIFT-UJU) FOKUS IZMEDJU FORM POLJA; A NE SME SE 
//      DOPUSTIT ODLAZAK FOKUSA NA DRUGA PAGE LEMENTE

const showPrompt = function(html, callback){
    const divEl = document.createElement('div');
    const formEl = document.createElement('form');
    const inputField = document.createElement('input');
    const coverDiv = document.createElement('div');

    coverDiv.classList.add('cover');
    divEl.classList.add('modal');

    inputField.type = 'text';
    inputField.value = 'Unesi tekst';
    
    inputField.style.margin = '8px';

    const okButton = document.createElement('input');
    const cancelButton = document.createElement('input');

    okButton.type = 'submit';
    cancelButton.type = 'button';

    okButton.value = 'OK';
    cancelButton.value = 'CANCEL';

    cancelButton.setAttribute('cancel_btn', '');

    divEl.innerHTML = html;
    formEl.append(inputField);
    divEl.appendChild(document.createElement('br'));
    divEl.append(formEl);
    formEl.appendChild(document.createElement('br'));
    formEl.append(okButton);
    formEl.append(cancelButton);

    coverDiv.style.position = 'fixed';
    coverDiv.style.left = '0px';
    coverDiv.style.top = '0px';
    coverDiv.style.zIndex = '1000';
    coverDiv.style.width = /* document.documentElement.clientWidth + 'px'; */ '100%';
    coverDiv.style.height = /* document.documentElement.clientHeight + 'px'; */ '100%';
    coverDiv.style.border = 'olive solid 4px';
    coverDiv.style.backgroundColor = '#c557a448';
    coverDiv.style.boxSizing = 'border-box';
    
    divEl.style.position = 'absolute';
    divEl.style.textAlign = 'center';
    divEl.style.backgroundColor = '#fff';
    
    coverDiv.appendChild(divEl);
    document.body.appendChild(coverDiv);

    /* divEl.style.left = coverDiv.clientWidth/2 - divEl.clientWidth/2 + 'px';
    divEl.style.top = coverDiv.clientHeight/2 - divEl.clientHeight/2 + 'px'; */

    const catcher = document.createElement('div');
    coverDiv.appendChild(catcher);
    catcher.tabIndex = 0;



    // ZELIM DA IMAM VREDNOSTI U PROCENTIMA, JER KADA RESIZE-UJEM window BROWSERA, ZELIM, DA MODAL UVEK
    // BUDE NA SREDINI window-A

    divEl.style.left = ((coverDiv.clientWidth/2 - divEl.clientWidth/2) / coverDiv.clientWidth) * 100 + '%';
    divEl.style.top = ((coverDiv.clientHeight/2 - divEl.clientHeight/2) / coverDiv.clientHeight) * 100 + '%';


    coverDiv.tabIndex = 0;
    divEl.tabIndex = 0; 

    inputField.focus();

    let shiftKey = false;


    coverDiv.onkeydown = coverDiv.onkeyup = function(ev){
        console.log(ev.shiftKey);

        shiftKey = ev.shiftKey;
    }

    cancelButton.onblur = function(ev){
        if(!shiftKey) inputField.focus();
    };

    divEl.onfocus = coverDiv.onfocus = function(){
        if(shiftKey){
            cancelButton.focus();
            return;
        }

        inputField.focus();
    }

    formEl.onsubmit = function(ev){
        console.log(ev.target);

        if(inputField.value === '') return false;

        coverDiv.remove();
        coverDiv.onkeydown = cancelButton.onblur = 
        divEl.onfocus = coverDiv.onfocus = 
        formEl.onsubmit = cancelButton.onmousedown = null;

        callback(inputField.value);
    }

    cancelButton.onmousedown = function(){
        coverDiv.remove();
        coverDiv.onkeydown = cancelButton.onblur = divEl.onfocus = coverDiv.onfocus = formEl.onsubmit =
        cancelButton.onmousedown = null;
        callback(null);
    }

};

// showPrompt('neki tekst');
// KACIM showPrompt FUNKCIJU, KAO onmousedown HANDLER, NA NEKI BUTTON U HTML-U
const neki_button_za_showing_prompt = `
    <button id="dugme">Click to show the form</button>
`;

dugme.onmousedown = function(ev){
    showPrompt('Tekstualni tekst blah blah', function(param){alert(param);})
};

// MISLIM DA SAM USPESNO DEFINISAO, POMENUTI PRIMER, I OSTAJE MI DA VIDIM, KAKVO JE ONE RESENJE U CLANKU
// NARAVNO, TREBALO BI OPET RESITI, ISTI PRIMER, ALI NACINOM, KAKAV JE KORISCEN U CLANKU
// http://next.plnkr.co/edit/sKOOkafZh6Bsn1iGBExU?p=preview&preview
////////////////////////////////////////////////////////////////////////////////////////////////////////////








