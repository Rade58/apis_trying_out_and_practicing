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
