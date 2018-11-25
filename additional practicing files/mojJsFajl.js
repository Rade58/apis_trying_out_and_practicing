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

console.log(    document.forms.moj_formular.elements        );      //-->   HTMLFormControlsCollection
console.log(    document.forms.moj_formular.elements.jedan  );      //-->   <input name="jedan">
console.log(    document.forms.moj_formular.elements[0]     );      //-->   <input name="jedan">

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

// PRVI NACIN JE KAK OSE CINI, NAJOCIGLEDNIJI; ALI SU DRUGI  ITRECI NACIN, OBICNO VISE POGODNIJI

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