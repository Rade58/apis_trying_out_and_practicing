# DRAG'N'DROP

```javascript
//SADA CU SE POZABAVITI, NECIM SA CIME SA RANIJE NISAM SUSRETAO, A TO JE
//          
//POVLACENJE I PUSTANJE, ODNOSNO          Drag'n'Drop    SA MOUSE EVENT-OVIMA

//OSNOVNI Drag'n'Drop ALGORITAM IZGLEDA OVAKO:
            // 1.CATCHING   mousedown-A  NA ELEMENTU, KOJI JE DRAGGGABLE 
            // 2.PRIPREMANJE ELEMENTA ZA POMERANJE (MOZDA PRAVLJENJE NJEGOVE KOPIJE ILI BILO STA)
            // 3.ONDA ON mousemove , POMERANJE TOG TOG DRAGGABLE ELEMENTA, 
                    //      PODESAVAJUCI MU             position     NA     absolute
                    //      I PROMENOM VREDNOSTI ZA      left      I       top
            // 4.I ON mouseup (PUSTANJE DUGMETA)-OBAVLJANJE SVIH ACTIONA VEZANIH ZA ZAVRSETAK Drag'n'Drop-A

//URADICU JEDAN PRIMER
//U OVOM SLUCAJU CU KORISTITI iframe ELEMNT
const iframe_za_dargendrop_primer = `
<div id="drag_drop">
    <iframe style="width: 78%; height: 468px;"></iframe>
    <div>
      Icons made by 
        <a href="http://www.freepik.com" title="Freepik">Freepik</a> from 
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>is licensed by 
        <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
          CC 3.0 BY
        </a>
    </div>
    <div>Icons made by 
      <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from 
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by 
      <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
        CC 3.0 BY
      </a>
    </div>
</div>
`;
//PRE NEGO STO POCNEM SA IZGRADNJOM DRAG'N'DROP - A; PRIKACICU, NEKE FOTOGRAFIJE U PRIKAZANI ifrmae
const pictureOne = document.createElement('picture');
const picUrl1 = './img/baseball.svg';
const source1 = document.createElement('source');
const pictureTwo = document.createElement('picture');
const picUrl2 = './img/baseball_glove.svg';
const source2 = document.createElement('source');
const defaultImg = document.createElement('img');
defaultImg.src = './img/default.ico';
defaultImg.style.width = "10vw";
defaultImg.alt="Baseball";

source1.srcset = picUrl1;
source2.srcset = picUrl2;
pictureOne.appendChild(source1);
pictureTwo.appendChild(source2);
pictureOne.classList.add('ball');
pictureTwo.classList.add('glove')
pictureOne.appendChild(defaultImg.cloneNode());
pictureTwo.appendChild(defaultImg.cloneNode());

//  POSTO SE RANIJE NISAM SUSRETAO SA iframe-OM, DOBRO JE DA KAZEM, KAKO SE MOZE PRISTUPITI NJEGOVOM
//  NJEGOVOM        window.document    OBJEKTU  
//  NAIME, NJEGOVOJ Document INSTANCI, PRISTUPAM, PUTEM     
                                        //      contentWindow    ILI    contentDocument   GETTER-A
//
//      contentWindow   NIJE RADILO U SLUCAJU   CHROME-A, ZATO KORISTIM     contentDocument
const iframesDocument = document.querySelector('#drag_drop iframe').contentDocument;

console.log(iframesDocument);

// ZAKACICU SADA ELEMENTE U iframe-OV body
iframesDocument.body.appendChild(pictureTwo);
iframesDocument.body.appendChild(pictureOne);

////////////////////////////Drag'n'Drop 'Algorithm'//////////////////////////////////////////////

let pickedUp = false;       //false TREBA DA BUDE NAKON TRIGGERINGA mouseup EVENTA NA ELEMENTU 

iframesDocument.querySelector('.ball').addEventListener('mousedown', function(ev){

    pickedUp = true;    //POMENUTA GLOBALNA VARIJABLA, CE ODLUCITI DA LI CE ELEMENT DOBITI NOVO
                        //  POZICIONIRANJE (KADA SE TRIGGERUJE 'mousemove', NA NJEGOVOM KONTEJNERU)
    const picture = ev.target.closest('picture');
    picture.style.position = "absolute";   //POZICIONIRA SE U ODNOSU NA IVICE PARENT NODE-A

    ev.preventDefault();        //SPRECAVA DEFAULT AKCIJU, KOJA JE VEC UGRADJENA I PRILIKOM
                                //TRIGGERING-A, mousedown-A, NA SLICI (NJEN DUPLIKAT (CLONE) SE POMERA
                                // TI ONDA PRILIKOM POMERANJA KURSORA A IMACI CRNI ZNAK ZA 
                                // NA SEBI (PREDPOSTAVLJAM NEKO UPOZORENJE))
                                // E PA JA SAM TO UKLONIM PRIMENOM preventDefault METODE
                                // MOGAO SAM I DA return-UJEM false U OVOM SLUCAJU (I TO BI SPRECILO DEFAULT
                                // POMENUTI ACTION)
});

// HANDLER ZA mousemove (NA DOKIMENTU, ALI JA CU GA ZAKACITI NA body)
const draggingHandler = function(ev){
    
    const ball = ev.currentTarget.querySelector('.ball');
    
    if(window.getComputedStyle(ball).position === 'absolute' && pickedUp){
        const cursorCoordX = ev.pageX;
        const cursorcoordY = ev.pageY;
        const ballCoordsAndSizes = ball.getBoundingClientRect();
        // KADA SE ELEMENT PICKED UP KURSOR CE BITI NA SREDINI ELEMENTA PRILIKOM NJEGOVOG
        // DRAGGING-A (OVO CU DA POPRAVIM U NEKO MDRUGOM PRIMERU, A ONO STO ZELIM JESTE DA KADA SE 
        // ELEMENT POCNE POVLACITI, DA SE POVLACI U ONOJ TACKI U KOJOJ JE mousedown TRIGGER-OVAN  RANIJE)
        const halfWidth = ballCoordsAndSizes.width/2;
        const halfHeight = ballCoordsAndSizes.height/2;
        ball.style.left = cursorCoordX - halfWidth + 'px';
        ball.style.top = cursorcoordY - halfHeight + 'px';
    }

};

iframesDocument.querySelector('body').addEventListener('mousemove', draggingHandler);

iframesDocument.querySelector('.ball').addEventListener('mouseup', function(ev){
    if(ev.currentTarget.nodeName === 'PICTURE'){
        pickedUp = false;
    }
});

// PRE NEGO STO POCNEM SA PRIMEROM MORAM RECI DA JE VEOMA VAZNO DA SE, JEDNOM PRILIKOM U BUDUCNOSTI
// POZABAVIM KOORDINATAMA, ALI VEOMA DETALJNO

// SADA CU URADITI ONO STO SAM OBECAO (ONO STO ZELIM JESTE DA KADA SE 
// ELEMENT POCNE POVLACITI, DA SE POVLACI U ONOJ TACKI U KOJOJ JE mousedown TRIGGER-OVAN  RANIJE)
// ZA TU POTREBU CU ISKORISTI DRUGI picture NESTED U body-JU iframe-A
// POKUSACU DA U OVOM SLUCAJU NAPRAVIM CUSTOM ELEMNT, ODNOSNO DA KADA SE SLOTT-UJE BILO KOJI ELEMENT
// U MOJ CUSTOM TAG, DA TADA TAJ ELEMNT, POSTANE DRAGGABLE, PO PARENTU, MOG CUSTOM ELEMENTA

// TEK SAM KASNIJE SHVATIO DA SAM OVAJ PRIMER DEFINISAO, ZA PREDUMISLJAJEM DA NEMA NIKAKVE SADRZINE
// PRE ELEMENTA (ODNOSNO, TO SAM ZANEMARIO)
// ALI CE SLEDECI CUSTOM ELEMENT I DALJE FUNKCIONISATI, AKO IZA DRAGGABLE ELEMENTA, NE NALAZI 
// MNOSTVO ELEMENATA, KOJI CE IZAZVATI SCROLLING STRANICE, U TOM SLUCAJU KOORDINATE CE BITI POGRESNE I 
// KOORDINATAMA MORAJU DA SE DODAJU VREDNOSTI, ZA KOLIKO SE SCROLLOVALA STRANICA, ALI POSTO POSLE
// OVE KOMPONENTE, PLANIRAM DA DEFINISEM, JOS JEDAN PRIMER U KOJEM CU, ISPRAVITI OVU GRESKU
// I U TOM PRIMERU CU OPET KORISTITI iframe, ALI U TOM SLUCAJU MNOSTVO ELEMENATA CE BITI DATO
// body-JU iframe-A, I TO MNOSTVO ELEMENATA CE PREDHODITI ONIM ELEMENTYIMA, KOJE KASNIJE ZELIM DA UCINIM
// DRAGGABLEIMA (TADA CU STVORITI USLOVE, KOJI NISU IDEALNI KAO U OVOM PRIMERU)


// MISLIM DA SAM NAPRAVIO KARDINALNU GRESKU U OVOM PRIMERU, MESAJUCI, ODNOSNO KORISTECI U MATEMATICKIM
// OPERACIJAM ONE KOORDINATE KOJE SU RELATIVNE NA page (document) I ONE KOJE SU RELATIVNE NA 
// client (window)     (NARAVNO U SLUCAJU iframe-OVIH Document I Window INSTANCI)

// ALI SVE JE ISPALO TACNO, ZATO STO NA STRANICI, ODNOSNO iframe-U, NIJE BIO PRISUTAN SCROLLING, ODNOSNO
// NISAM IMAO TAKO 'DUGACKU' STRANICU, JER JE ONA STALA U FRAME iframe-A

// ALI OVO JE POGRESNO, DAKLE, OVO JE POGRESNO I OVAJ PRIMER NE BIH NI TREBAO RAZMATRATI JER JE OPASAN 
// PO ZNANJE

/////////////////////////////////////////////OVAJ PRIMER RADI ALI NE VALJA///////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
window.customElements.define('draggable-element-inside', class extends HTMLElement {
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        const slotElement = document.createElement('slot');
        const styleElement = document.createElement('style');
        const styleText = `
            :host {
                /*SAMO U CILJU NEKIH PROVERA (ZA OVAJ PRIMER MI JE styleElement BIO I SUVISAN)*/
                /* display: block;
                border: olive solid 2px;
                width: 100%;
                height: 10vw; */
                
                /* display: inline;
                border: pink solid 1px; */
            }
        `; 
        
        styleElement.textContent = styleText;
        slotElement.name = 'draggable';
        
        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(slotElement);
        
        this._isPickedUp = false;    //false TREBA DA BUDE NAKON TRIGGERINGA mouseup EVENTA NA ELEMENTU
                                     // true DOZVOLJAVA DA SE ON mousemove, PODESE NOVE KOORDINATE
                                     // ZA ELEMENT 
        
        // OVAJ OBJEKAT CE SKLADISTITI VREDNOSTI, PREUZETE NAKON TRIGGERING-A mousedown-A, A KOJE SU
        // POTREBNE ZA PODESAVANJE POZICIONIRANJA, TRIGGER-OVANJEM mousemove-A (NA PARENT-U, I KADA KAZEM
        // PARENT, NE MISLIM NA this, VEC NA this-OV PARENT)
        // DAKLE, ZA VREDNOSTI, DODATE x I y OVOG OBJEKTA, TRIGGERING-OM mousemove-A, TREBA ODUZETI OD
        // ODGOVARAJUCE KOORDINATE pageX/pageY; DA BI IZGLEDALO DA ELEMENT POVLACIM IZ TACKE ELEMENTA 
        // NA KOJOJ SAM RANIJE TRIGGER-OVAO mousedown
        this._minusBy = {x: 0, y: 0};

        this.pickItUp = this.pickItUp.bind(this);
        this.moveIt = this.moveIt.bind(this);
        this.dropIt = this.dropIt.bind(this);
    }

    connectedCallback(){
        //MOGU DEFINISATI, KOJI CE ELEMENTI BITI SLOTTED I U connectedCallback-U
        // NEKA TO BUDE BILO KOJI, JE REPREZENTOVAN OD NESTED TAGA, U TAGU CASTOM ELEMENTA
        this.childNodes[0].setAttribute('slot', 'draggable');

        //KACENJE ON mousedown HANDLER-A NA SLOT
        this.shadowRoot.querySelector('slot[name=draggable]').addEventListener(
            'mousedown',
            this.pickItUp
        );

        // KACENJE ON mousemove EVENT HANDLERA NA PARENT ELEMENT MOG CUSTOM ELEMENTA (DA SE NE RADI
        // O CUSTOM ELEMENTU, KACIO BIH EVENT HANDLER, NA PARENTA ONOG ELEMENTA ZA KOJI ZELIM DA BUDE
        // DRAGGABLE, A SADA IMAM this (CUSTOM EL.) IZMEDJU DRAGABLLE-A(SLOTTED-A) I body-JA)
        // ZELIM NARAVNO DA SE SLOTTED ELEMENT, POMERA, 'PO POVRSINI' body-JA (MOZDA NE BIH TREBALO DA 
        // GOVORIM body VEC DA GOVORIM 'ELEMENT, PREKO CIJE POVRSINE SE VRSI POZICIONIRANJE')
        this.parentNode.addEventListener('mousemove', this.moveIt);
        
        // KACENJE ON mouseup HANDLERA NA DRGGASBLE ELEMENTU
        this.shadowRoot.querySelector('slot[name=draggable]').addEventListener('mouseup', this.dropIt);
    }

    //ON mousedown  HANDLER

    pickItUp(ev){
        const element = ev.target.closest('[slot=draggable]');

        // KADA KORISNIK KLIKNE NA ELMENT, I POMERI KURSOR, ZELIM DA KURSOR I SLOTTED
        // BUDU KONSTANTNO 'ZALEPLJENI' U TOJ 'INICIJALNOJ' TACKI, U KOJOJ SE TRIGGER-OVAO
        // mousedown NA SLOTTED-U; ODNOSNO NAKON TRIGGERINGA mousemove-A, PREKO BODY-JA iframe-A, JA 
        // ZELIM DA SE ELEMENT POMERA TAKO (DA DOBIJA TAKVO POZICIONIRANJE UZ KORISCENJE KOORDINATA),
        // DA KURSOR I ELEMENT BUDU DODIRNUTI U ISTOJ ONOJ TACKI SLOTTEDA, U KOJOJ SE DESIO mousedown

        // POTREBNO JE OCITATI KOORDINATE; ALI IMA JEDAN PROBLEM
        // KADA PODESIM DA NEKEI ELEMENT BUDE POZICIONIRAN APSOLUTNO, NJEMU SE MENJAJU NEKE KARAKTERISTIKE
        // ZA KOJI PIKSEL, ON SE SPUSTI DOLE (MISLIM DA OVO IMA VEZE SA MARGINOM ALI MORAM D PROVERIM)
        // ZATIM, PROMENI MU SE I SIRINA ZA KOJI PIKSEL (MISLIM DA SE SMANJI, I TO N EZNAM ZASTO, A MORAM
        // SAZNATI)

        // DAKLE ELEMENT POZICIONIRAM APSOLUTNO
        element.style.position = "absolute";

        // A KADA BUDE BIO POVLACEN PREKO DRUGIH ELEMENATA, ZELIM DA ON BUDE ONAJ ELMEMENT KOJI CE BITI
        // PREKO
        // ZATO DEFINISEM z-index

        element.style.zIndex = 1000;
    
        // ZATIM CU PROCITATI KORDINATE KURSORA
        const pageX = ev.pageX;
        const pageY = ev.pageY;

        // I PRISTUPAM I KOORDINATMA I VELICINAMA ELEMENTA
        const elementCoordAndSizes = element.getBoundingClientRect();
        // RANIJE SAM IMAO PROBLEMA SA KOORDINATAMA (JER SAM IM PRISTUPAO, ONDA KADA ELEMENT NIJE BIO
        // POZICIONIRAN APSOLUTNO), TAKO DA SAM IH OVDE STMAPAO (I ONO STO BI TREBALO DA BUDE JESTE
        // DA SU KOORDINATE KURSORA UVEK VECE OD KOORDINATA ELEMENTA (RANIJE SAM IMAO PROBLEMA BAS U TOM
        // POGLEDU, JER JE BILO SUPROTNO))

        // DAKLE, POTREBNA MI JE RAZLIKA IZMEDJU KOORDINATA KURSORA I ELEMENTOVIH KOORDINATA
        // ZA TE VREDNOSTI TOKOM POMERANJA KURSORA PREKO this-OVOG PARENT-A, TREBA ODUZETI OD KUSRSOR
        // EVE KOORDINATE, DA BI IZGLEDALO KAKO POVLACIM ELEMENT, ZA ONU TACKU NA KOJOJ SAM TRIGGER-OVAO
        // mousedown
        const xValue = pageX - elementCoordAndSizes.x;
        const yValue = pageY - elementCoordAndSizes.y;
        // DAKLE, VREDNOSTI, DODATE xValue-U I yValue-U, TRIGGERING-OM mousemove-A, TREBA ODUZETI OD
        // ODGOVARAJUCE KOORDINATE pageX/pageY; DA BI IZGLEDALO DA ELEMENT POVLACIM IZ TACKE ELEMENTA 
        // NA KOJOJ SAM RANIJE TRIGGER-OVAO mousedown
        // KADA NACRTAM SLIKU STVARI POSTAJU JASNIJE
        
        //DAKLE, POMENUTE VREDNOSTI DAJEM PODOBJEKTU INSTANCE CUSTOM ELEMENTA, KAKO BIH KASNIJE KORISTIO
        // U ON mousemove HANDLERU 
        this._minusBy.x = xValue;
        this._minusBy.y = yValue;

        // TICAJUCI SE NAREDNOG (ON mousemove) HANDLERA (ONOG KOJI KACIM NA this-OV PARENT, 
        // U SLUCAJU mousemove-A) KOJEG CU DEFINISATI NAKON OVOG HANDLERA, MORAM RECI SLEDECE
        // ZA xValue I yValue JE POTREBNO POMERITI SLOTTED ELEMENT, 'UNAZAD', TOKOM POVLACENJA PREKO 
        // this-OVOG PARENT-A, KAKO BI IMAO UTISAK DA 'DRAGG-UJEM' ELEMENT, "ZALEPIVSI KURSOR ZA NJEGA 
        // U ZELJENOJ TACKI (TO SAM VEC REKAO NEKOLIKO PUTA ALI POSTO SAM IMAO PROBLEMA SA OVIM PRIMEROM
        // NAPISAH OVAJ KOMENTAR VISE PUTA A DA TO TEK PRIMECUJEM SADA, ALI NEMA VEZE)

        //SPRECAVAM DEFAULT ACTION, KOJI SE DESAVA NAKON TRIGGERINGA mousedown-A NA SLIKAMA (MISLIM DA 
        // SAM, RANIJE OBJASNIO O CEM USE RADI)
        if(element.nodeName === 'PICTURE' || element.nodeName === 'IMG') ev.preventDefault();
        
        // I U OVOM TRENUTKU ELEMENT JE 'POKUPLJEN' DA BI SE MOGAO DRAGG-OVATI (VREDNOST SLEDECEG
        // PROPERTIJA CUSTOM ELEMENT-A, CE TO UPRAVO 'MOCI RECI' OBIMU ON mousemove HANDLER-A)
        this._isPickedUp = true;

    }

    // ON mousemove HANDLER

    moveIt(ev){

        if(this._isPickedUp){

            const element = ev.currentTarget.querySelector('[slot=draggable]');
            // PRISTUPAM OPET KOORDINATAMA KURSORA
            const pageX = ev.pageX;
            const pageY = ev.pageY;
            
            // A APSOLUTNO POZICIONIRANI SLOTTED ELEMENT, DALJE POZICIONIRAM NA SLEDECI NACIN

            // DAKLE ODUZIMAM ONE VREDNOSTI, ZA KOJE SAM VEC RANIJE DAO OBJASNJENJE ZASTO IH ODUZIMAM
            // I DAO SAM OBJASNJENJE, KAKO SAM IH PROIZVEO, ODNOSNO IZRACUNAO

            element.style.left = pageX - this._minusBy.x + "px";
            element.style.top = pageY - this._minusBy.y + "px";

        }

    }

    // ON mouseup HANDLER

    dropIt(ev){
        // TRIGGERING-OM mouseup-A NA ELEMENTU KOJI POZICIONIRAM; TREBA DA PRESTANE TO POZICIONIRANJE
        // I TO CU POSTICI SLEDECIM (STO CE DATI INFORMACIJU OBIMU ON mousemove HANDLERA, ZAKACENOG
        // ZA this-OV PARENT), DA POZICIONIRANJE NE TREBA DA SE OBAVI
        this._isPickedUp = false;

    }

    // OVIM SAM NARAVNO ZAVRSIO DEFINISANJE, ODNOSNO REGISTROVANJE NOVOG CUSTOM ELEMENTA
    // TREBALO BI OBAVITI REFACTORING CODE-A, ALI ZA TO JA NEMAM VREMENA

});

//KREIRANJE INSTANCE MOG CUSTOM ELEMENTA
const draggableElement = document.createElement('draggable-element-inside');

//KLONIRANJE JEDNE OD SLIKA KOJU SAM POSTAVIO U IFRAME (ZAPAMTI DA SE cloneNode PRIMENJUJE NA 
// ELEMENTU, KOJI ZELIM DA KLONIRAM)
const dokumentIframea = document.querySelector('iframe:first-of-type').contentDocument;
const glovePictureCloned = dokumentIframea.querySelector('.glove').cloneNode();
//POSTO SE KLONIRANJEM NE KLONIRA I SADRZINA, NEKOG ELEMENTA, PRISTUPICU innerHTML ELEMENTU, KOJIEG KLONIRAM
// I ONO STO DOBIJEM DODELICU innerHTML-U, KLON-A
glovePictureCloned.innerHTML = dokumentIframea.querySelector('.glove').innerHTML;

// SADA CU OVAJ KLON ELEMENT NEST-OVATI U MOJ CUSTOM ELEMENT, KOJI CINI DA EELMENT BUDE DRAGGABLE
draggableElement.appendChild(glovePictureCloned);
// PA CU MOJ CUSTOM ELEMENT, NESTOVATI U body ELEMENT, iframe-A (NALAZICE SE PORED DVA POSTOJECA ELEMENTA
// OD KOJIH SAM JEDAN, RANIJE UCINIO DRGGABLE-IM)
dokumentIframea.body.appendChild(draggableElement);

// U OVOM PRIMERU SAM POSTIGAO USPESNO POZICIONIRANJE, VEZANO ZA DRAG AND DROP 
// SADA CU NASTAVITI BAVLJENJE SA DRAG'N'DROP-OM

/////////////////////////////////////////////PREDHODNI PRIMER RADI ALI NE VALJA//////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
// NE BIH GA TREBAO RAZMATRATI ZBOG POGRESNE STVARI KOJE SAM URADIO U POGLEDU KORDINATA
/////////////////////////////////////////////////////////////////////////////////////////////////////

// MEDJUTIM PREDPOSLEDNJI PRIMER, TREBALO JE DA BUDE DRAG'N'DROP ALGORITAM, ODNOSNO SAV CODE JE TREBAO
// DA BUDE U ISTOJ FUNKCIJI, ODNOSNO TREBAO SAM IMATI, JEDAN ON mousedown HANDLER, I U NJEGOVOM OBIMU
// TREBAO SAM DEFINISATI SVAKO DRUGO KACENJE EVENT LISTENERA (ZA mousemove I mouseup), I UKLANJANJE
// LISTENER-A, KADA ONI VISE NISU POTREBNI

// POSTO U BODY-JU iframe-A IMAM JOS JEDAN ELEMENT, UCINICU GA DRAGGABLE-OM, UZ KORISCENJE POMENUTOG
// ALGORITMA

// NE ZNAM DA LI MOZE DOCI DO NEKOG OVERRIDING-A, PRILIKOM STILIZOVANJA, JER IMAM DVA ELEMENTA, KOJI
// IMAJU ISTU KLASU (JEDAN OD NJIH JE KLON ONOG DRUGOG), 
// MEDJUTIM JEDAN OD NJIH JE ELEMENT, KOJI JE SMESTEN U SHADOW ROOT, DRUGOG ELEMENTA; ALI BEZ OBZIRA
// NA TO STO JE U SHADOW ROOT-U, NJEMU JE MOGUCE PRISTUPITI IZVAN SHADOW ROOT-A, I MOGUCE MU JE APLICIRATI 
// STILOVE FROM IZVAN GRANICA SHADOW ROOT-A

//////////////////////////////////////////////////////////////////////////////////////////////////////

// IPAK CU KRIRATI, POTPUNO NOVI IFRAME, U KOJEM CU NESTOVATI GOMILU LINE I TEMATSKIH BREAK-OVA, KOJI CE
// PREDHODITI ELEMENTU ILI ELEMENTIMA, KOJE ZELIM DA UCINIM DRAGGABLE-IMA
// TO CE MI POMOCI DA BOLJE DEFINISEM DRAGING AND DROPPING, ODNOSNO KOORDINATE
// JER VEC SAM REKAO DA KORDINATE MOGU BITI POGRESNE JER U OBZIR NISAM UZEO PRISUSTVO VLIKOM
// BROJA ELEMENATA; U TOM SLUCAJU, MORAM 'DUZINU SCROLLA' KORISTITI, U MOJIM KORDINATAMA

//U OVOM PRIMERU ISPRAVLJENA JE POGRESNA STVAR, KOJU SAM PRAVIO U PROSLOM PRIMERU
// A TO JE:   KORISCENJE ZAJDNO ONIH VREDNOSTI, ODNOSNO KOORDINATA, KOJE SU RELATIVNE NA document 
// I KOJE SU RELATIVNE NA window



// MNOGO TEKSTA, MALO STA JE FUNKCIONISALO, KAKO SAM ZELEO
// MISLIM UGLAVNOM JE SVE FUNKCIONISALO, ALI RAZMISLAM DA OPET ODRAQDIM SLICAN ILI GOTOVO ISTI PRIMER
// SLEDECI PRIMER, IMA DOBRU DOZU KOMENTARA, KOJI JESU KOREKTNI ALI, POSTOJ ODREDJENE GRESKE
// ZATO SAM ODLUCIO DA KREIRAM, POTPUNO NOVI PRIMER


// /////////////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
// GLAVNI PROBLEMI, KOJI SU NASTALI U OVOM PRIMERIMA DRAGGABLE ELEMENTA SU NASTALI, JER SAM KORISTIO 
// EKSPERIMENTALNI picture TAG, KOJI SAM NESTOVAO U LIGHT DOM A TAJ  picture BI BIVAO SLOTTED 

const pocetni_html_novog_drag_drop_primera = `
<div style="border: olive solid 4px; padding: 18px; width: 86%;">
    AKO IMAM DILEMU GDE SU IVICE iframe, RECI CU DA SU ONE, ROZE BOJE, DAKLE TU ODMAH ISPOD JESTE iframe
    <iframe class='halloween' style="width: 100%; height: 78vw; border: #e673a8 solid 2px">
    </iframe>
    <div>
        Icons made by 
        <a href="https://www.flaticon.com/authors/payungkead" title="Payungkead">Payungkead</a> from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
        <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
            CC 3.0 BY
        </a>
    </div>
    <div>
        Icons made by 
        <a href="http://www.freepik.com" title="Freepik">Freepik</a> from 
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by 
        <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
            CC 3.0 BY
        </a>
    </div>
  </div>   
`;

// ZABORAVIO SAM DA DODAM LINE I THEMATIC BREAKS PRE SAMOG PICTURE ELEMENTA
// MOGU TO I SADA URADITI

for(let i = 0; i < 28; i++){
    document.querySelector('.halloween').contentDocument.body.insertAdjacentElement(
        'afterbegin',
        document.createElement('hr')
    );
    document.querySelector('.halloween').contentDocument.body.insertAdjacentElement(
        'afterbegin',
        document.createElement('br')
    );
}

// POSTO SAM SVE TO URADIO, OPET CU DEFINISATI, ODNOSNO REGISTROVATI, NOVI CUSTOM ELEMENT

// ONO STO CU URADITI U OVOM PRIMERU, JESTE DA CU DEFINISATI WEB KOMPONENTU, NA TAKAV NACIN DA CU
// CU UVESTI MOGUCNOST DA CUSTO MELEMENT BUDE NESTED I U NEKOM DRUGOM CONTAINERU, KOJI NIJE BODY
// ALI JE CHILD BODY-JA
// ZASTO TO RAZMATRAM?
// PA KADA SE SLOTTED ELEMENT POZICIONIRA APSOLUTNO, PA KADA MU SE BUDU 'DAVALE NOVE KOORDINATE', TOKOM
// DRAGGING-A, JA USTVARI TOM ELEMENTU ZADAJEM, ZA KOLIKO PIKSELA CE SE ON NALAZITI OD LEVE IVICE I OD 
// GORNJE IVICE SVOG CONTAINER-A
// AKO JE ELEMENT, NESTED U BODY-JU, TU NEMA NEKAKVIH PROBLEMA, U POGLEDU KOORDINATA, ALI MISLIM DA BI IH
// MOGLO BITI, AKO JE CUSTOM ELEMENT USTVARI NESTED U JOS JEDNOM NESTED ELEMENT-U body-JA

window.customElements.define('draggable-element', class extends HTMLElement {
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        const slotElement = document.createElement('slot');
        const styleElement = document.createElement('style');
        const styleText = `
            /* :host {
                
                border: pink solid 4px;
            }  */
        `;

        styleElement.textContent = styleText;
        slotElement.name = "dragg";
        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(slotElement);

        // BINDING this U EVENT HANDLERIMA
        this.pickItUp = this.pickItUp.bind(this);
        this.moveIt = this.moveIt.bind(this);
        this.dropItDown = this.dropItDown.bind(this);

        // BINDING METODE, CIJA POVRATNA VREDNOST, CE BITI ONAJ ANACESTOR ELEMENT, POZICIONIRAN RELATIVNO 
        // ILI APSOLUTNO ILI body ELEMENT (NA TAJ ELEMENT CU KACITI ON mousemove HANDLER)
        
        this.absOrRelOrBodyPicker = this.absOrRelOrBodyPicker.bind(this);

        // 'STATE' PROPERTIJI I OBJEKTI
        this._backBy = {x: 0, y: 0};
        this._isPickedUp = false;

        this.klasa = null;
    }

    connectedCallback(){
        // UMESTO DAVANJA slot ATRIBUTA U HTML-U (slot ATRIBUT DAJEM PVOM NESTED ELEMENTU LIGHT DOM-A)
        this.children[0].setAttribute('slot', 'dragg');

        // UOPSTE NECU PRISTUPATI ELEMENTIMA LIGHT DOM-A DIREKTNO (ODNOSNO JEDNOM ELEMENTU KOJI
        // JE SLOTTED), JER ZELIM DA KACIM HANDLERE NA slot ELEMENT
        // TO JE NAIME MOGUCE; JER EVENT-OVI, PROPAGATE-UJU IZMEDJU SLOTA I SLOTTED-A
        // MOZDA JE CAK POGRESNO SPOMINJATI PROPAGATION, JER
                    // KADA SE NA PRIMER ZAKACI ON click HANDLER NA SLOT, TADA JE PRISUTNO SLEDECE:
                                // target   JE   SLOTTEDOV NESTED ELEMENT, ILI SAM SLOTTED (SVE U 
                                // (ZAVISNOSTI GD SAM KLIKNUO)
                                // ZATIM EVENT BUBBLE-UJE UP, DO SLOT-A

        // OVO JE SAMO PROVERA KOJU SAM OBAVIO U CILJU DA PRIKAZEM DA STVARNO EVENT-OVI PROPAGATE
        // IZMEDJU SLOTA I SLOTTED-A (SADA TO MOGU DA COMMENT OUT)
        /* this.shadowRoot.querySelector('[name=dragg]').addEventListener('mousedown', function(ev){
            console.log(ev.target, ev.currentTarget);
        });
        
        this.shadowRoot.querySelector('[name=dragg]').assignedNodes()[0].addEventListener('mousedown', function(ev){
            console.log(ev.target, ev.currentTarget);
        }); */

        // KACENJE HANDLERA

                    // NA slot (name="dragg"), U SLUCAJU 'mousedown'-A
        this.shadowRoot.querySelector('[name=dragg]').addEventListener('mousedown', this.pickItUp);
            // NA this-OV PARENT, U SLUCAJU 'mousemove'-A STO JE POGRESNO, ODNOSNO
            // ZBOG OVOGA JE DOSLO DA NEKIH NEZELJENIH SITUACIJA, KOJE SAM OBJASNIO U SAMOM OBIMU HANDLERA
            //                  this.parentNode.addEventListener('mousemove', this.moveIt);
                    // I ZATO SE ODLUCIH DA HANDLER KACIM            
                    // NA PRVI APSOLUTE ILI RELATIVE POZICIONIRAN ANCESTOR, A U ODSUSTVU TAKVOG
                    // KACICU HANDLER NA body ELEMENT
        
        this.absOrRelOrBodyPicker().addEventListener('mousemove', this.moveIt);
        
        

                    // NA slot (name="dragg"), U SLUCAJU 'mouseup'-A
        this.shadowRoot.querySelector('[name=dragg]').addEventListener('mouseup', this.dropItDown);

        console.log(document.defaultView);
        console.log(window === document.defaultView);
        console.log(window.getComputedStyle(this));

        this.closest('body').scrollTop = this.closest('body').scrollHeight;
    }

    // EVENT HANDLER-I
    pickItUp(ev){           //ZA mousedow

        ev.preventDefault();

        const draggable = ev.target.closest('[slot=dragg]');

        // DA UCINIM OVAJ ELEMENT, POZICIONIRANIM APSOLUTNO
        // KAO STO ZNAM TO HOCE MALO PROMENITI VREDNOSTI ELEMENTA
        // ALI TO NECE UTICATI NA 'POREDAK KOORDINATA' (KAD TO KAZEM MISLIM DA CE I DALJE 
        // ODREDJENI PROPERTIJI SKLADISTITI VREDNOSTI KOORDINATA
        //     JEDNE KOJE SU RELATIVNE NA  Window   INSTANCU I DRUGE RELATIVNE NA Document INSTANCU)

        //NAKON TRIGGERING-A mousemove-A, MORAM PRISTUPITI PRAVOM ELEMENTU, A AKO MU PRISTUPIM
        //PUTEM slot ATRIBUTA TO NECE VALJATI, JER AKO IMA VISE         draggable-element
        // ELEMENATA U ISTOM KONTEJNERU, MOZE ISPASTI DA KADA BUDEM PRATIO mousemove PREKO KONTEJNERA
        // A U OVOM SLUCAJU SE ZADESILO DA JE TO html ELEMENT
        // I KADA BI querySelectorom PRISTUPIO SLOTTED-U, MOGLO BI SE DESITI DA SE SELEKTUJE PRVI SLOTED
        // TIME BI SE DEFINISALO DA SE EVENT HANDLEROM, ZAKACENIM ZA NEKI OUTER ELEMENT, A TO KACENJE SE
        // DOGODILO U JEDNOM CUSTOM ELEMENTU, USTVARI PRISTUPA SLOTTED ELEMENTU DRUGE INSTANCE TOG CUSTOM
        // ELEMENTA, STO MI SE I DOGODILO, PA SAM DEFINISAO SLEDECI PROPERTI

        this.klasa = draggable.classList[0];

        // MEDJUTIM JA MISLIM I DA JE SLEDECI PROPERTI LOSE RESENJE
        // JER KAD SAM VEC DEFINISEM CUSTOM ELEMENT, TREBAO BIH KORISTITI METODE I PROPERTIJE
        // VEZANE, UPRAVO ZA NJEGA, DA IZBEGNEM OVAJ OVERRIDING


    // MEDJUTIM ZABORAVIO SAM JEDNU BITNU STVAR VEZANU ZA APSOLUTNO POZICIONIRAN ELEMENT
    // NJEGOVE DIMENIZIJE I KOORDINATE POSTAJU 
                                
                            // RELATIVNE NE KONKRETNO NA PARENT, VEC NA PRVI 'absolute' ILI 'relative'
                            // POZICIONIRAN ANCESTOR ELEEMENT
                    //DA TAJ ELEMENT MOZE BITI PARENT, 
                    // U PRIMERU (OVDE VEC GOVORIM O INSTANCI MOG CUSTOM ELEMNTA, I ELEMENTU NESTOVANOM
                    // U NJEGA KOJI JE POSTAO SLOTTED I DRAGGABLE, I KOJEG REFERENCIRA  pictureViking  
                    // KONSTANTA; ONO STO HOCU DA KAZEM JEESTE DA JE U MOM PRIMERU CUSTOM ELEMENT
                    // SA NJIM I SLOTTED picture, NESTOVANI U JEDNO CONTAINER-U, U body-JU iframe-A, A TAJ 
                    // POMENUTI CONTAINER NIJE POZICIONIRAN  NI absolute A NI relative ),
            // A NI JEDAN ANCESTOR NEMA ZADATO POZICIONIRANJE KOJE JE  relative ILI absolute
            // KAD TO KAZIM MISLIM NA BILO KOJO CONTAINER, IZMEDJU      draggable-A I html-A (STRANICE)
            
            // E UPRAVO PRI TAKVOJ SITUACIJI, ELEMNT CE BITI POZICIONIRAN U ODNOSU NA   html-A
            // ODNOSNO U ODNOSU NA page

        /* draggable.style.position = "absolute";

        draggable.style.zIndex = 6000; */
        
        // KOORDINATAMA ELEMENTA CU PRISTUPITI I NA SLEDECI NACIN
        const draggableCoordsAndSizes = draggable.getBoundingClientRect();

        const offsetLeft = draggable.offsetLeft;
        const offsetTop = draggable.offsetTop;
        
        // POSTO OVOM PRILIKOM ZELIM DA 'UPOREDIM' (DA SAMO STAMPAM), SVE KOORDINATE MISA SA SVIM 
        // KOORDINATAMA ELEMENT PRISTUPICU I SVIM KOORDINATAMA MISA
        const clientX = ev.clientX;
        const clientY = ev.clientY;
        const pageX = ev.pageX;
        const pageY = ev.pageY;
        
        console.log("CURSOR----->", 'client: ', clientX, clientY, 'page: ', pageX, pageY);
        console.log("OFFSET VALUES----->", 'left and top: ', offsetLeft, offsetTop);
        console.log(draggableCoordsAndSizes);

        // NAKON STO SAM POGLEDAO SVE TE VREDNOSTI, ODNOSNO KOORDINATE ELEMENTA, MOGU ZAKLJUCITI SLEDECE:

        // offsetTop        I       offsetLeft      SU KOORDINATE KOJE 'SE MERE' OD ELEMENTA, PA DO
        
        // IVICA page-A, ODNOSNO ONE DAJU VREDNOSTI ZA 'SLUCAJ ISTOG KOORDINATNOG POCETKA' 
        // (POCETAK STRANICE), KAO I ONE VREDNOSTI KOORDINATA KURSORA; TO SU:     
        //                                                                      pageX      I      pageY   

        // I ONO STO JE JAKO BITNO JESTE SLEDECE:    OBJEKAT, POVRATNA VREDNOST  
                            //                                                  getBoundingClientRect

        // METODE SADRZI VREDNOSTI, KOJE SE ODNOSE NA RAZMAK IZMEDJU IVICA ELEMENTA (top, left, bottom,
        // right) I IVICA BROWSER-OVOG window-A

        // ODNOSNO ONE DAJU VREDNOSTI ZA 'SLUCAJ ISTOG KOORDINATNOG POCETKA' 
        // (POCETAK Window INSTANCE), KAO I ONE VREDNOSTI KOORDINATA KURSORA; TO SU:     
        //                                                                     clientX      I    clientY

        // NAIME, DOBRO BI BILO DA ZAPAMTIM SVE OVO VEZANO ZA, POMENUTE PROPERTIJE I NA STA SE ODNOSE
        // VREDNOSTI, POMENUTIH PROPERTIJA (I KURSORA)

        // KAKO BI PRONASAO RAZLIKU IZMEDJU KOORDINATE KURSORA I KOORDINATE ELEEMNTA 
        // (KOJA MI NARAVNO TREBA DA BIH KASNIJE TRIGGERINGOM 'mousemove' IZGLEDALO DA POVLACIM
        // ELEMENT, U TACKI U KOJOJ JE TRIGGEROVAN mousedown)
        // MOGU KORISTITI I KOORDINATE, RELATIVNE NA Window INSTANCU (A RANIJE SAM REKAO KOJE SU TO 
        // VREDNOSTI)


       /*  this._backBy.x = clientX - draggableCoordsAndSizes.x;
        this._backBy.y = clientY - draggableCoordsAndSizes.y; */

        
        // U OVOM SLUCAJU, NAKON TRIGGERING-A mousemove-A NA PARENT-U, this-A, BICE POTREBNA I RAZLIKA
        // IZMEDJU KOORDINATA PARENTA this, I STRANICE, ODNOSNO page-A
        
        // MEDJUTIM, OPET MISLIM DA SAM NAPRAVIO GRESKU, A TO JE DA SAM KOORDINATE, ELEMENTU, TREBAO 
        // ZADATI I OVDE, JER PRIMETIO SAM KADA TRIGGER-UJEM, mousedown NA ELEMNTU, PRVO STO SE DOGODI JESTE
        // SLEDECE: 
        
                    //ISKAKANJE IZ NORMALNOG TOKA, JER JE ELEMENT POSTAO APSOLUTAN
                    // AKO MU PREDHODI, NEKI SIBLINGS, KOJI JE UZ TO VISI OD NJEGA, ZNACI DA CE ELEMENT
                    // ODSKOCITI NAGORE, KAKO BI BIO UZ IVICU, SVOG CONTAINERA

        // ZATO BI BILO DOBRO DA MU KOORDINATE ZADAM I NA OVOM MESTU

        const elPageX = draggable.offsetLeft;
        const elPageY = draggable.offsetTop;


        draggable.style.position = "absolute";

        draggable.style.left = Math.round(elPageX) + "px";
        draggable.style.top = Math.round(elPageY) + "px";


        this._backBy.x = clientX - draggableCoordsAndSizes.x;
        this._backBy.y = clientY - draggableCoordsAndSizes.y;


        this._isPickedUp = true;

    }

    moveIt(ev){
        if(this._isPickedUp){
            // DAKLE SADA BIRAM MOJ SLOTTED ELEMENT UZ POMOC NJEGOVE KLASE, JER DA SAM TO URADIO UZ POMOC
            // ATRIBUT SELEKTORA, GDE BIH SELEKTOVAO ELEMENT SA ATRIBUTOM slot, MOGLO BI SE DESITI
            // DA SE IZABERE SLOTTED ELEEMNT POGRESNE INSTANCE MOG CUSTOM ELEMNTAA (AKO IMA
            // VISE CUSTOM-A, U ISTOM CONTAINERU, STO CE U OVOM PRIMERU I BITI SLUCAJ, JER PLANIRAM
            // U ISTI CONTAINER DA NESTUJE VISE INSTANCI draggable-element -A)
            
            //      const draggable = ev.currentTarget.getElementsByClassName(this.klasa)[0];

            // ZASTO SAM ISKOMENTARISAO PREDHODNI CODE?


            // STA AKO SE DESI DA 'VUKUCI' DRAGGABLE ELEMENT, NAIDJEM NA NEKI DRUGI ELEMNT
            // ODNOSNO target, ODNOSNO currentTarget A DA TAJ ELEMENT JESTE USTVARI ELEMENT, KOJI 
            // NIJE PARENT ILI ANCESTOR, MOM DRAGGABLE-U

            // TADA NI PREDHODNA SELEKCIJA, NECE BITI KOREKTNA
            // I ZATO, KADA DEFINISEM WEB KOMPONENTU, SHVATAM, DA JA NE TREBAM MNOGO PAZNJE DA OBRACAM NA SELEKTOVANJE
            //  I NA KORISCENJE RAZNIH TRAVERING KOJIM SE PRISTUPA ELEMENTIMA IZVAN KOMPONENTE,
            // ILI AKO U KOMPONENTI DEFINISEM DA NEKI SPOLJASNJI ELEMNT PRISTUPA
            // DELOVIMA, MOJE KOMPONENTE JER NA TAJ NACIN SIGURNO MOZE 
            // DOCI DO GRESKI, KA OSTO BI BILA POMENUTA

            // ZATO, JA CU DRAGGABLE ELEMENTU PRISTUPITI IZ MOJE KOMPONENTE, ODNOSNO, PREKO slota

            const draggable = this.shadowRoot.querySelector('[name=dragg]').assignedNodes()[0];

            // MEDJUTIM CAK, IAKO JE PREDHODNO IZRECENO, MOZDA DOBRA PRAKSA, IPAK ONA
            // NIJE BILA RESENJE MOG PROBLEMA


            // PROBLEM SAM NASAO U ELEMENT-U, NA KOJEM SAM PRVOBITNO ZAKACIO, POMENUTI HANDLER, A ZAKACIO
            // SAM GA NA parentNode  MOG CUSTOMA, ODNOSNO this-A

            // NA TAKAV NACIN, KADA IZADJEM KUSRSOROM IZ GRANICA TOG parentNode-A
            // I AKO BRZO POMERAM KURSOR, NECE SE REGISTROVATI mousemove U JEDNOM TRENUTKU
            
            // ODNOSNO mousemove SE NECE REGISTROVATI NA MOM DRAGGABLE-U, A TO ZNACI DA ON NECE BUBBLE-OVATI
            // UP DO CONTAINER-A, ZA KOJEG JE ZAKACEN HANDLER, VEC CE SE DOGODITI DA POMERANJEM
            //  PREKO NEKOG POTPUNO DRUGOG ELEMNTA, NEMA VISE PROPAGATIONA, ODNOSNO, NEMA VISE
            // TRIGGERINGA, mousemove-A, NA POMENUTOM CONTAINERU

            // A TO ZNACI DA SE OVAJ HANDLER NECE IZVRSAVATI

            // POPRAVKA ZA TO JE VRACANJE NA connectedCallback I SKIDANJE OVOG HANDLER-A, SA PARENT-A, 
            // this-A ODNOSNO UKLANJANJE TOG CODE-A

            // A NA KOJI ELEMENT BI BILO DOBRO DA ZAKACIM, OVAJ HANDLER

            // PA UZIMAJUCI U OBZIR SVU SITUACIJU, KOJA JE PRISUTNA U POGLEDU APSOLUTNOG POZICIONIRANJA
            // DRAGGABLE-A; NAJBOLJE BI BILO DA OVAJ ON mousemove HANDLER ZAKACIM NA
            // PRVI ELEMENT, KOJI BI IMAO position: relative || absolute
            // A AKO NE PRONADJEM TAKAV this.ELEMENT_NODE, NAJBOLJE BI BILO DA HANDLER ZKACIM NA body

            // MORAM SAGRADITI FUNKCIJU, KOJA CE POMNUTU PROVERU IZVRSITI U connectedCallback-U
            // I KADA SE PRONADJE ELEMENT, ZAKACITI MU OVAJ ON mousemove HANDLER

            // DAKLE        draggable JE POSITIONED APSOLUTNO, STO ZNACI U ODNOSU NA PRI APSOLUTNO ILI
            // RELATIVE POZICIONIRAN ANCESTOR

            // KAO STO SAM I REKAO TAKAV ANCESTOR U MOM PRIMERU, JESTE      html      ODNOSNO      page
            // ZATO KORISTIM I KORDINATE, KOJE SU RELATIONAL NA TAJ ELEMNT
            // ODNOSNO POCETAK STRANICE

            draggable.style.left = ev.pageX - this._backBy.x + "px";
            draggable.style.top = ev.pageY - this._backBy.y + "px";

            // NAIME, OVO JE DOBRO, ALI ONO STO SE SADA DESAVA JESTE RESIZING ELEMENTA, TOKOM POMERANJA
            // NE ZNAM ZASTO?

            // OTKRIO SAM GDE JE PROBLEM
            // PROBLEM MOZE NASTATI, AKO JE ELEMENTOVA SIRINA DEFINISANA U PROCENTIMA
            // TO JE KOD MENE SLUCAJ JER SAM JA U INSTANCU CUSTOM ELEMENTA (NJEGOCOG TAGA), 
            // NEST-OVAO SLIKU, CIJA SIRINA JESTE U PROCENTIMA
            
            // TADA JE SIRINA ELEMENTA RELATIVNA NA html, ODNONO page
            // A JA NECU ZA SADA DA PREDPOSTAVLJAM, ZASTO SIRINA ELEMNTA, RELATIVNA (U PROCENTIMA)
            // NA html TAG MENJA SVOJE DIMENZIJE TOKOM POMERANJA
            // MOZDA DA SAM html TAGU ZADAO VREDNOST SIRINE, MOZDA BI TO PROMENILO STVARI

            // ALI POSTO MI NIJE CILJ DA MODIFIKUJEM html , TO NECU URADITI
        }
    }

    dropItDown(ev){
        if(ev.target.closest('[slot=dragg]')){
            this._isPickedUp = false;
        }
    }

    // METODA ZA IZBOR ELEMENTA NA KOJEM ZELIM DA ZAKACIM ON mousemove HANDLER

    absOrRelOrBodyPicker(){
        let el = this;
        while(true){

            console.log(el);
            if(el.nodeName === 'BODY'){
                break;
            }

            let positioning = window.getComputedStyle(el)['position'];
                
            if(positioning === 'relative' || positioning === 'absolute'){
                
                return el;
            
            }

            el = el.parentNode;
        }

        return this.closest('body');
    }

});

// KREIRACU ELEMENT, KOJI ZELIM DA STAVIM U LIGHT DOM INSTANCE draggable-element-A

const pictureViking = document.createElement('picture');
const sourceViking = document.createElement('source');
const imgDefaV = defaultImg.cloneNode();
pictureViking.classList.add('viking');
imgDefaV.removeAttribute('style');
// OVU VREDNOST SIRINE SAM ZADAO U PROCENTIMA
// OVO CE IZAZVATI PROBLEM, JER KADA BUDEM DRAGGOVAO ELEMENT, MENJACE SE NJEGOVA SIRINA
// A JA TO NIKAKO NE ZELIM
// NAIME, OVA VREDNOST U PROCENTIMA ZNACI DA ELEMENT TREBA DA IMA SIRINU, KOJA JE 14 PROCENATA OD SIRINE
// NJEGOVOG CONTAINER-A
// ALI, POSTO U PROCESU DRAGGING-A, MOJ ELEMENT POSTAJE APSOLUTNO POZICIONIRAN, STO ZNACI DA CE ISKOCITI
// IZ NORMALNOG TOKA STRANICE
// OVA VREDNOST SE VISE NECE ODNOSITI NA PROCENTE SIRINE CONTAINERA
imgDefaV.style.width = "16%";
// MOZDA NISAM REKAO ALI KADA DEFINISEM SIRINU          picture         ELEMENTA
// JA USTVARI ZADAJEM SIRINU NA NJEGOVOM PLACHOLDER     img     ELEMENTU
// TO SAM URADIO U SLUCAJU       picture    ELEEMNT, KOJI REFERENCIRA         pictureViking
// SIRINU MOGU DEFINISATI I     sizes   PROPERTIJEM     source ELEMENTA
// ALI TO CU TEK URADITI ZA SLUCAJ DRUGOG       picture     ELEMENTA     
sourceViking.srcset = './img/viking.svg';
pictureViking.appendChild(sourceViking);
pictureViking.appendChild(imgDefaV);

const draggableViking = document.createElement('draggable-element');
// ELEMENT, KOJI ZELIM DA BUDE DRAGGABLE NEST-UJEM U LIGHT DOM INSTANCE, MOG CUSTOM ELEMENTA
draggableViking.appendChild(pictureViking);
// ALI MOJ NOVI CUSTOM draggable-element NESTUJEM U JEDAN KONTEJNER, KOJI CE BITI MALO POVECI
const nekiDivKontejner = document.createElement('div');
nekiDivKontejner.style.width = "100%";
nekiDivKontejner.style.height = "78vw";
nekiDivKontejner.style.border = "1px solid tomato";

nekiDivKontejner.appendChild(draggableViking);

// ZATIM CU TAJ CONTAINER NESTOVATI U body, MOG iframe-A
document.querySelector('.halloween').contentDocument.body.appendChild(nekiDivKontejner);

// I ZAISTA, KADA BUDEM DRAGG-OVAO ELEEMNT, ON SE HOCE POMERATI, ALI CE SE DESITI DA SE I RESIZE-UJE
// ZBOG ONE SIRINE U PROCENTIMA, KOJU SAM DEFINISAO
// POSTO NE ZELIM DA POPRAVLJAM   POSTAVKE    picture  ELEMNTA, KOJI REFERENCIRA  pictureViking KONSTANTA
// JA CU KREIRATI NOVI    picture   ELEMENT, KOJI CU NESTOVATI U ISTI CONTAINER, KOJI OBUHVATA pictureViking
// ali sirinu, odnosno sirine , POMENUTOG  NOVOG picture ELEMNTA, JA CU DEFINISATI UZ POMOC 

                    //          sizes       ATRIBUTA        source      ELEMENTA, POMENUTOG
                                                                        // NOVOG picture TAG-A
//OPET POGRESNO,

            //NAIME     sizes       ATRIBUT MORAM OBNOVITI, A ON IMA VEZE KADA SE UCITAVA VISE SLIKA
            // RAZLICITIH DIMENZIJA ZA JEDAN picture TAG

            // POSTO U OVOM SLUCAJU IMAM, SAMO JEDNU SLIKE, OPET CU DODELITI NOVU SIRINU
            // img PLACEHOLDER-U, picture ELEMENTA
            // ALI NOVA SIRINA CE BITI FIKSNA (NAIME, NECU KORISTITI RELATIVNE DIMENZIJE KAO STO JE 
            // PROCENAT); NAIME KORISTICU PIKSELE

// GORE U KOMENTARIMA, SAME KOMPONENTE, OBJASNIO SAM, ZASTO JE SIRINA PROMENLJIVA TOKOM POMERANJA
// PA ZATO STO JE ELEMENT U OVOM PRIMERU POZICIONIRAN RELATIVNO NA html, JER IZMEDJU    pictureViking-A
// I html   NEMA position: relative|| absolute      POZICIONIRANOG CONTAINER-A, I ZATO SE
// DIMENZIJE I KOORDINATE, UZIMAJU U ODNOSU NA TAJ ELEMNT

//ALI DOSTA SAM O TOME REKA, DAKLE DEFINISACU NOVI ELEMENT, KOJI CU NESTOVATI U INSTANCU MOG CUSTOMA
// MISLIM NA 
//                              draggable-element

// I ONDA CU TU INSTANCU NESTOVATI, U BODY  iframe-A, I SADA POSTO SAM OTKLONIO NEDOUMICU U POGLEDU 
// 'relative' POSITIONING-A, NIJE BITNO GDE CU NESTOVATI U BODY-JU POMENUTI CUSTOM, ALI NEMA VEZE,
// NESTOVACU GA U ISTI CONTAINER UNUTAR BODY-JA, GDE SAM NESTOVAO I PREDHODNU INSTANCU

const draggableFrank = document.createElement('draggable-element');

const pictureFrank = document.createElement('picture');
const sourceFrank = document.createElement('source');
const imgDefaF = defaultImg.cloneNode();

imgDefaF.removeAttribute('style');
pictureFrank.classList.add('frank');

imgDefaF.style.width = "68px";
sourceFrank.srcset = './img/frankenstein.svg';
pictureFrank.appendChild(sourceFrank);
pictureFrank.appendChild(imgDefaF);

draggableFrank.appendChild(pictureFrank);

document.querySelector('.halloween').contentDocument.body.querySelector('div').appendChild(draggableFrank);


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

// HITNO ODRADITI ONU FUNKCIJU, KOJA PROVERAVA DA LI JE NEKI ELEMNT APSOLUTNO ILI RELATIVNO POZICIONIRAN
// IMAO SAM PROBLEMA, SA KORISCENJEM break-A, ILI JE TO BIO PROBLEM SA instanceof OPERATOROM
// ILI SA DODELOM U USLOVU while LOOP-A; MORAM TO PROVERITI

// MISLIM DA NIJE BIO PROBLEM ZBOG POGRESNOG KORISCENJA NEKIH OD OPERATORA PETLJE, VEC CINJENICA
// DA SAM U iframe-U

// MISLIM DA MORAM NAUCITI, KAKO DA REFERENIRAM         Window   INSTANCU, JEDNOG iframe-A

// MOZDA JE GRESKA NASTALA, JER STALNO ZABORAVLJAM CINJENICE VEZANE ZA LOOPING
// ZABORAVLJAM NA PRIMER SLEDECE OPERATORE:


        //          break         OPERATOR         ,USTVARI PREKIDA POTPUNO LOOPING PETLJE
                                                    // OD ONOG MOMENTA KADA JE EXECUTED 


        //          continue      OPERATOR         ,SA KOJIM SE SUSRECEM PRVI PUT, USTVARI, PREKIDA
                                                   // NE CELU PETLJU, VEC SAMO TRENUTNI KORAK, 
                                                    //    U KOJEM SE  EXECUTE-OVAO
                                                    // STO ZANACI DA PETLJA NASTAVLJA SA ITERATION-IMA
                                                    // KOJI SU JOJ PREOSTALI
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// OVO CE KONACNO BITI USPESAN PRIMER VEZAN ZA DRAG'N'DROP
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// DAKLE RADIM, PONOVO GOTOVO ISTI PRIMER CUSTOM ELEMNTA  ///////////////
// DAKLE, PONOVO ZELIM DA NAPRAVIM CUSTOM ELEMENT, CIJI CE SLOTTED IMATI TAKVU FUNKCIONALNOST, DA BUDE
// DRGGABLE ELEMENT, ODNOSNO DA SE S NJIM MOZE OBAVLJATI drag'n'drop RADNJA

// DEFINISACU SADA NOVI iframe

// NAIME, POSTO JE U RANIJIM PRIMERIMA, NASTAO PROBLEM PRILIKOM POZICIONIRANJA picture TAGOVA
// JA CU SE U OVOM PRIMERU BAZIRATI NA POZICIONIRANJE ELEMENATA, KOJI NISU KAO picture ALI CU TAKODJE
// KONDICIONALNO DEFINISATI I KAKO BI SE POZICIONIRALA SLIKA ('DOVEDENA' picture TAGOM)

// JA MISLIM DA JE picture TAG I SAM PROBLEMATICAN ZBOG TOGA STO SE NJEMU DIREKTNO NE MOGU DEFINISATI NEKI
// STILOVI, JER JE TO NEOPHODNO ODRADITI NA SMOM, CHILD img TAGU picture-A
// img USTVARI OVERFLLOWING, SVOJ picture PARENT

// DA ZA POZICIONIRANJE picture TAGA JE JEDINO BITNO RECI DA NJEGOV NESTED SADRZINA (img) NE ODREDJUJE
// NJEGOVU VISINU, KOJA JE MANJA OD SADRZINOINE VISINE (img-OVE VISINE, I TU MOGU NASTATI PROBLEMI,
// PRI POZICIONIRANJU)

//                      ODMAH, JEDAN MOGUCI PROBLEM - NAKON TRIGGERINGA mouseup-A, NA ELEMNTU
// DAKLE, KLIKNUO SAM NA img I TO NEGDE PRI VRHU, A KOORDINATE ELEMENTA SU picture-OVE, ODNOSNO
// VECE SU OD KOORDINA KURSORA (KOORDINATA ELEMNTA NE MOZE, ODNOSNO NE SME DA BUDE VECA OD KOORDINATE KURSORA)

// DAKLE KADA BUDEM DEFINISAO NOVI CUSTOM ELEMNT, IMACU POMENUTO NA UMU

const html_potreban_u_vezi_droppable_primera = `
<div style="border: olive solid 4px; padding: 18px; width: 86%;">
    AKO IMAM DILEMU GDE SU IVICE iframe, RECI CU DA SU ONE, ROZE BOJE, DAKLE TU ODMAH ISPOD JESTE iframe
    <iframe class='some_frame' style="width: 100%; height: 78vw; border: #e673a8 solid 2px"></iframe>
    <div>
        Icons made by 
        <a href="https://www.flaticon.com/authors/payungkead" title="Payungkead">Payungkead</a> from
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by
        <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
            CC 3.0 BY
        </a>
    </div>
    <div>
        Icons made by 
        <a href="http://www.freepik.com" title="Freepik">Freepik</a> from 
        <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by 
        <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">
            CC 3.0 BY
        </a>
    </div>
</div>   
`;

// DODACU iframe-U, ODNOSNO NJEGOVOM, body-JU, KLON JEDNOG CONTAINERA, KOJEG SAM KORISTIO I U PROSLOM
// PRIMERU (NISTA NIJE SPECIJALNO U VEZI NJEGA, SMAO ZELIM ISTE DIMENZIJE I U CILJU USTEDE VREMENA
// NE ZELIM DA PRAVIM NOVI CONTAINER)

document.querySelector('div > .some_frame').contentDocument.body.appendChild(nekiDivKontejner.cloneNode());

// DODACU BODY-JU IFRAME-A, NEKE LINE I THEMATIC BREAKOVE  (INSERTOVACU IH PRE GORE POMENUTOG CONTAINER-A)

for(let i = 0; i < 28; i++){
    document.querySelector('.some_frame').contentDocument.body.insertAdjacentElement(
        'afterbegin',
        document.createElement('hr')
    );
    document.querySelector('.some_frame').contentDocument.body.insertAdjacentElement(
        'afterbegin',
        document.createElement('br')
    );
}


// SADA MOGU POCETI SA DEFINISANJEM NOVE WEB COMPONENTE, KOJA CE REPREZENTOVATI ISTO ONO, KAO I PROSLA
// WEB KOMPONENTA A TO JE 'CONTAINER' ZA DRAGGABLE ELEMENT, ODNOSNO CONTAINER, KOJI SLOTTED ELEMENT
// CINI DRAGGABLE-IM

window.customElements.define('drag-drop', class extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        const slotElement = document.createElement('slot');
        const styleElement = document.createElement('style');
        const styleText = ``;

        slotElement.name = "draggable";
        styleElement.textContent = styleText;

        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(slotElement);

        // BINDINZI
        this.pickItUp = this.pickItUp.bind(this);
        this.moveIt = this.moveIt.bind(this);
        this.dropItDown = this.dropItDown.bind(this);

        this.documentSelector = this.documentSelector.bind(this);
        this.olderZIndex = this.olderZIndex.bind(this);
        this.absOrRelAncestorOrBody = this.absOrRelAncestorOrBody.bind(this);

        // METODA U KOJU SAM UKAPSULIO SAV CODE KOJI SE TREBA NACI U connectedCallback-U
        this._onConnected = this._onConnected.bind(this);

        // SKLADISTI KORDINATE RAZLIKE IZMEDJU KURSOREVIH CLIENT KOORDINATA I DRAGGABLE-OVIH CLIENT KOORD.
        this._backBy = {x: 0, y: 0};
        // DEFINISAO SAM SLEDECU VREDNOST, KOJA TREBA DA SKLADISTI Date MOUNTINGA (POTREBNO ZA JEDNU METODU
        // KOJA PODESAVA z-index)
        this._dateOfMounting = null;
        // SLEDECI PROPERTI TREBA DA SKLADISTI INFORMACIJU, DA LI JE DRAGGABLE PICKED UP, ILI NIJE
        // ODNOSNO, DA LI JE ILI NIJE, NA NJEMU TRIGGEROVAN mousedown 
        this._isPickedUp = false;

    }

    // ONO STO CE BITI KRUCIJALNO U OVOM SLUCAJU JESTE, KAPSULJENJE CELOG CODE-A 
    //  connectedCallback-A, U JEDNU    FUNKCIJU
    // IZ RAZLOGA EXTENDING-A, OVE KOMPONENTE, STO JA MOZDA ZELIM URADITI U BUDUCNOSTI, NAJBOLJE JE
    // (JASNO JE, DA BI CEO CODE connectedCallbacka BIO UNREACHABLE, DRUGOJ KOMPONENTI, KOJA BI
    // EXTEND-OVALA OVU)
    // DRUGO RESENJE ZA OVAKVU SITUACIJU BI BILO DA SAM SAV CODE, NAMENJEN connectedCallback-U
    //  DEFINISAO U KONSTRUKTORU

    connectedCallback(){
        this._onConnected();
    }

    // FUNKCIJA U KOJOJ JE SAV CODE, NAMENJEN connectedCallback-U

    _onConnected(){

        // OVO CU KORISTITI KAO VREDNOST, KAKO BI PODESIO DA zIndex ZAVISI OD VREMENA
        // KOLIKO JE TO DOBRO NE ZNAM, ILI IMA EFEKTA, ALI POSTO ZURIM SAMO CU TO URADITI
        this._dateOfMounting = new Date();

        // DA NE MORA DA SE DODAJE SLOT ATRIBUT ELEMENTU U LIGHT DOM-U
        this.children[0].setAttribute('slot', 'draggable');

        // PODESAVANJE SCROLL-A, body ELEMENTA, UVEK POKAZUJE KRAJ SADRZINE
        // (OVDE CU UPOTREBITI, JEDNU METODU, KOJU SAM KREIRAO, 
        // I NAMENIO JE ZA NESTO DRUGO, ALI OVDE ZELIM DA JE ISPROBAM) (DA body ELEMENT SAM MOGAO SELEKTOVATI
        // UZ POMOC closest METODE, ALI IPAK ZELIM DA ISPROBAM METODU)
        const bodyElement = this.documentSelector().body;
        bodyElement.scrollTop = Math.round(bodyElement.scrollHeight);

      // KACENJE HANDLER-OVA
            // ON mousedown
        this.shadowRoot.querySelector('[name=draggable]').addEventListener('mousedown', this.pickItUp);

            // ON mousemove
        // MORAM IZABRATI PRVI DRAGGABLE-OV ANCESTOR, KOJI IMA      position: absolute || relative
        // A AKO NEMA TAKVOG ELEMENTA, IZABRATI body (ZA IZABRANI ELEMENT, KACIM ON mousemove HANDLER)
        // DA BIH PRONASAO POMENUTI ELEMENT, NA KOJEG CU KACITI HANDLER, KORISTIM METODU
        //          this.absOrRelAncestorOrBody  ,KOJU SAM KREIRAO
        // ZASTO OVO RADIM I NE KACIM HANDLER NA this-OV PARENT (ZBOG NEZELJENE SITUACIJE, KADA BIH
        // MOUSEMOVE-OM POZICIONIRAO ELEMENT IZVAN TOG CONTAINERA, I KADA BI BRZO POMERAO KURSOR
        // MOGLO BI DOCI DO PRESKAKANJA REGISTRACIJE TRIGGERINGA mousemove-A OD STRANE BROWSER-A
        // TADA, BI DOSLO DO TOGA DA SE PREKINE POZICIONIRANJE DRAGGABLE ELEMENTA)
        this.absOrRelAncestorOrBody().addEventListener('mousemove', this.moveIt);

            // ON mouseup
        this.shadowRoot.querySelector('[name=draggable]').addEventListener('mouseup', this.dropItDown);

    }

    // EVENT HANDLERI
    pickItUp(ev){
        
        ev.preventDefault();
        
        let draggable = ev.target.closest('[slot=draggable]');

        //AKO JE SLOTTED ELEMNT, USTVARI picture TAG, NE ZELIM DA MANIPULISEM S NJIM VEC SA img ELMENTOM
        // KOJI JE NESTED U picture-U
        if(draggable.nodeName === 'PICTURE'){
            draggable = draggable.querySelector('img');
        }

        // CLIENT KOORDINATE KURSORA
        const clientX = ev.clientX;
        const clientY = ev.clientY;
        
    ///////KOORDINATE PREUZETE, PRE APSOLUTNOG POZICIONIRANJA draggable-A 
       ///// // CLIENT KOORDINATE DRAGGABLE-A
        const clientDraggable = draggable.getBoundingClientRect();
        const elClientX = clientDraggable.x;
        const elClientY = clientDraggable.y;

        // PAGE KOORDINATE DRAGGABLE-A
        const elPageX = draggable.offsetLeft;
        const elPageY = draggable.offsetTop;


    //////////////////////////////////////////////////////
        // RAZLIKA IZMEDJU CLIENT KURSOR KOORD. I CLIENT DRAGGABLE COORD. (POTREBNO ZA EFEKAT
        // 'VUCENJA U IZABRANOJ TACKI' (OVE VREDNOSTI CE SE KORISTITI U OBIMU ON mousemove HANDLER-A))
        this._backBy.x = clientX - elClientX;
        this._backBy.y = clientY - elClientY;

        // APSOLUTNO POZICIONIRANJE DRAGGABLE-A
        draggable.style.position = "absolute";
        
        // PODESAVANJE z-index , UZ POMOC FUNKCIJE KOJA KORISTI Date OBJEKAT (ODNOSNO SEKUNDE)
        // KORISTIM METODU, KOJU SAM JA NAPRAVIO, KOJA MERI RAZLIKU U VREMENU, OD MOUNTINGA METODE
        // DO OVOG KLIKA, I ONDA SE DODAJE 100 I TO JE VREDNOST zIndex-A 
        draggable.style.zIndex = this.olderZIndex(new Date());

        // DAKLE KADA SE ELEMENTU PODESI position: absolute, ONDA ON MA GDE SE NALAZIO U CONTAINER-U, 
        // 'ON SKOCI NA VRH CONTAINER-A' (U OVOM SLUCAJU TO JE this-OV CONTAINER)
        // KAKO BI GA JA VRATIO NA SVOJU POCETNU POZICIJU, KORISTIM ONE PAGE KOORDINATE, OCITANE
        // PRE SETTING UP-A APSOLUTNOG POZICIONIRANJA

        draggable.style.left = Math.round(elPageX) + "px";
        draggable.style.top = Math.round(elPageY) + "px";

        // IMAJ NA UMU I DA KADA ELEMNT, KOJI JE NAJVISI, I KOJI SE POZICIONIRA APSOLUTNO, ISKACE IZ
        // NORMALNE POZICIJE, I TADA CE RED U KOJEM SE NALAZIO, BITI VISOK, KAO INJEGOV SLEDECI 
        // NAJVISI SIBLING, KOJI JE PO VISINI MANJI OD APSOLUTNO POZICIONIRANOG ELEMENTA, ALI PO
        // VISINI VECI OD OSTALIH SIBLINGS-A

        // JOS DA OBZNANIM INSTANCI, DA JE DRAGGABLE, PICKED UP

        this._isPickedUp = true;
        
    }

    moveIt(ev){
        // AKO JE PREDHODNO TRIGGEROVAN mousedown, IZVRSICE SE SLEDECE U OVOM if BLOKU
        if(this._isPickedUp){
            const pageX = ev.pageX;
            const pageY = ev.pageY;
            let draggable = this.shadowRoot.querySelector('[name=draggable]').assignedNodes()[0];

            if(draggable.nodeName === 'PICTURE'){
                draggable = draggable.querySelector('img');
            }

            draggable.style.left = Math.round(pageX - this._backBy.x) + "px";
            draggable.style.top = Math.round(pageY - this._backBy.y) + "px";
        }
    }

    dropItDown(ev){
        this._isPickedUp = false;
    }

    //METODE
    documentSelector(){

        let element = this;
        
        if(element.nodeName === '#document') return element;

        while(element = element.parentNode){
            if(element.nodeName === '#document') return element;
        }
    }

    olderZIndex(neueDate){
        return Math.round((neueDate - this._dateOfMounting)/10);
    }

    absOrRelAncestorOrBody(){
        let el = this;

        if(el.nodeName === '#document' || el.nodeName === 'BODY') return el.body || el;

        while(el = el.parentNode){
            
            if(
                window.getComputedStyle(el)['position'] === 'absolute' || 
                window.getComputedStyle(el)['position'] === 'relative' 
            ){
                return el;
            }

            if(el.nodeName === '#document' || el.nodeName === 'BODY') return el.body || el;
        }
    }

});



// KREIRACU CETIRI ELEMENTA, KOJA CU NESTOVATI U ONAJ CONTAINER, KOJI SE NALAZI U BODY-JU iframe-A
// BITNO MI JE DA TA DVA ELEMENTA NEMAJU SIRINE U RELATIVNIM JEDINICAMA I BITNO MI JE DA TA DVA ELEMENTA
// IMAJU RAZLICITE VISINE  (OPET JE REC O 4 SLIKE, CETIRI .svg FAJLA)

// ELEMNTE, KOJI ZELIM DA KREIRAM, JESU OPET DVA picture TAGA
// OVI TAGOVI JESU EKSPERIMENTALNI, ZATO SE I MENI U PREDHODNOM  PRIMERU, JAVIO UPRAVO JEDAN PROBLEM
// O KOJEM SAM I GOVORIO (VEZANOM ZA picture I img)
// PROBLEM SE, USTVARI JAVIO U POGLEDU POZICIONIRANJA

// ZATO CE, OSTALA DVA ELEMENTA, OD POMENUTA CETIRI, BITI SAMO img TAGOVI

const pictureSpook = document.createElement('picture');
const sourceSpook = document.createElement('source');
const imgDefa = defaultImg.cloneNode();
pictureSpook.classList.add('spook');
imgDefa.removeAttribute('style');
imgDefa.style.width = "60px";
sourceSpook.srcset = './img/spooky.svg';
pictureSpook.appendChild(sourceSpook);
pictureSpook.appendChild(imgDefa);

const pictureDevice = document.createElement('picture');
const sourceDevice = document.createElement('source');
const imgDefaD = defaultImg.cloneNode();
pictureDevice.classList.add('device');
imgDefaD.removeAttribute('style');
imgDefaD.style.width = "72px";
sourceDevice.srcset = './img/device.svg';
pictureDevice.appendChild(sourceDevice);
pictureDevice.appendChild(imgDefaD);

const frankeru = document.createElement('img');
frankeru.src = "./img/frankeru.svg";
frankeru.alt = "halloween images";
frankeru.style.width = "84px";

const monster = document.createElement('img');
monster.src = "./img/monster.svg";
monster.alt = "halloween images";
monster.width = "58";

// KREIRANJE drag-drop ELEMENATA

// OVDE CU NESTO DODATI VEZANO ZA CUSTOM ELMENTE, STO MISLI MDA JE VAZNO, A ODNOSI SE NA NJIHOVE
// DIMENZIJE, ODNOSNO VISINU:
                                // VISINI CUSTOM TAGA JE, UVEK 17 PIKSELA
// JA IPAK MISLIM DA NIJE POTREBNO KORISITIT DIMENZIJE ILI KOORDINATE DIREKTNO, CUSTOM TAGA, VEC ONIH 
// ELEMENATA IZ SHADOW ILI FLATTENED DOM-A

const draggableSpook = document.createElement('drag-drop');
const draggableDevice = document.createElement('drag-drop');

const draggableFrankeru = document.createElement('drag-drop');
const draggableMonster = document.createElement('drag-drop');

// NESTOVANJE   pictureSpook-A     I     pictureDevice-A    U      drag-drop         ELEMENTE

draggableSpook.appendChild(pictureSpook);
draggableDevice.appendChild(pictureDevice);

// NESTOVANJE img ELEMNATA U LIGHT DOM-OVE OSTALIH drag-drop ELMENATA

draggableFrankeru.appendChild(frankeru);
draggableMonster.appendChild(monster);

// NESTOVANJE, POMENUTIH drag-drop ELEMENATA U POMENUTI CONTAINER, IZ body-JA, iframe-A

document.querySelector('div > .some_frame').contentDocument.body.querySelector('div').appendChild(draggableSpook);
document.querySelector('div > .some_frame').contentDocument.body.querySelector('div').appendChild(draggableDevice);
document.querySelector('div > .some_frame').contentDocument.body.querySelector('div').appendChild(draggableFrankeru);
document.querySelector('div > .some_frame').contentDocument.body.querySelector('div').appendChild(draggableMonster);

// DAKLE, OVO KONACNO JESTE BIO USPESAN PRIMER U POGLEDU DRAG'N'DROP-A, ALI ONO STO JA NISAM URADIO
// JESTE DA         DRAG'N'DROP-OVA FUNKCIONALNOST, BUDE 'UKAPSULJENA', U JEDNOJ FUNKCIJI
// ODNOSNO, DA SVE BUDE JEDAN DRAG'N'DROP ALGORITAM

// POSTO JE SAV CODE, KOJI JE DONOSIO DRAG'N'DROP EFEKAT, U SLUCAJU PREDHODNE KOMPONENTE, DEFINISAN
// DA SE IZVRSI POZIVANJEM JEDNE KLASINE METODE, KADA EKSTENDUJEM PREDHODNU KLASU, 
// NOVA KLASA NECE IMATI EXECUTED CODE, KOJI DONOSI DRAG'N'DROP, ALI CE IMATI SVE NEOPHODNE METODE,
// KOJIMA TO MOGU POSTICI, ALI JA TO ZELIM DA POSTIGNEM NA NACIN DA DEFINISE, JEDAN DRAG'N'DROP 
// ALGORITAM, DAKLE JEDNU FUNKCIJU
// MOZDA ISKORISTIM, ODREDJENE METODE U KOJE IMA PREDHODNA KOMPONENTA, A KOJE, MOJA NOVA KOMPONENTA
// NASLEDJUJE

// ///////////////////////////////////JA USTVARI ZELIM DA DEFINISEM DRAG'N'DROP ALGORITAM, JER 
// JE U CLANKU DEFINISAN DRAG'N'DROP ALGORITAM, A POSTO SAM MISLIO DA MOGU ISKORISTITI
// I METODE PREDHODNE KOMPONENTE, ODLUCIH SE DA EXTENDUJEM TU KOMPONENTU SLEDECOM
// U KOJOJ BI ISKORISTIO TE METODE
// ALI TE METODE NISU BAS REUSABLE, KAKO SAM MISLIO
// MEDJUTIM STA JE TU JE, POSTO ZELIM DA PROVEZBAM EXTENDOVANJE, JA CU IPAK EXTENDOVATI PREDHODNU KLASU
// ALI CU U SKLOPU NOVE KOMPONENTE, KREIRATI, NOVU METODU, KOJA CE USTVARI BITI DRAG'N'DROP
// ALGORITAM, UCAUREN U ON mousedown LISTENER

// ONO STA SAM TAKODJE SAZNAO U OVOM PRIMERU JESTE DA SE NE MORA DEFINISATI PSEUDO KLASA (KAO :hover)
// KAKO BI SE ZADAO ODREDJENI OBLIK KURSORA (MOZE KLASICNIM STILIZOVANJEM), JA SAM OVDE 
// OBLIK KURSORA ZADAVAO U JAVASCRIPTOM, DEFINISUCI cursor U VREDNOSTI style ATRIBUTA

window.customElements.define('draggable-dropable', class extends window.customElements.get('drag-drop') {
    constructor(){
        super();
        // METODA SE NE MOZE POZIVATI U KONSTRUKTORU
        // ZATO STO U DEFINICI METODE (COMMENTED OUT, NENO POZIVANJE, DOLE) 
        // METODI REFERENCIRAM SLOTTED (DAKLE, IMAM JE SMISLA POZVATI SAMO U connectedCallback-u)

        // this._onConnected();

        // BINDING this-A U DRAG'N'DROP ALGORITMA, JER JE ON HANDLER ON mousedown
        this.dragDropAlorythm = this.dragDropAlorythm.bind(this);
        
        

       
    }

    connectedCallback(){
        // this._onConnected();             //OVDE DAKLE FUNKCIONISE, ALI NE TREBA MI ONA U OVOM SLUCAJU
                                            // TREBAJU MI DRUGE METODE, PROTOTIPA drag-drop INSTANCI
                                            // A KOJE SU POZVANE U _onConnected
                                            // MEDJUTIM MISLIM DA POMENUTE METODE, NISU BAS POGODNE ZA
                                            // REUSE, ODNOSNO NE MOGU UCESTVOVATI U DRAG'N'DROP
                                            // ALGORITMU

        this.children[0].setAttribute('slot', 'draggable');    
    
        this.shadowRoot.querySelector('[name=draggable]').addEventListener(
            'mousedown',
            this.dragDropAlorythm
        );
        
        // KURSOR
        this.shadowRoot.querySelector('[name=draggable]').assignedNodes()[0].style.cursor = "grab";
        
        // absOrRelAncestorOrBody  JE NASLEDJENA IZ KLASE IZ KOJE MOJA KLASE NASLEDJUJE (KOJU MOJA
        // KLASA EXTENDS)

        // POMENUTI DEFAULT BEHAVIOUR (DRAGGING DUPLIKATA SLIKE)
        // MOGAO SAM SPRECITI I U HANDLERU, KOJ ISE KACI U SLUCAJU   dragstart      EVENTA
        // KOJI SE TRIGGER-UJE, NA POCETKU DRAGGING-A

        this.shadowRoot.querySelector('[name=draggable]').ondragstart = function(ev){
            return false;
        };


    
    }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
    // RANIJE SAM MISLIO DA MOGU ISKORISTITI METODE ONE KOMPONENTE IZ KOJE OVA KOMPONENTA EXTENDS
    // ALI PREVARIO SAM SE, JER TE METODE, NISU BAS TAKVE, DA IH MOGU 

    //ZATO DEFINISEM POTPUNO, NOVI ON mousedown HANDLER; A UNJEMU CE SE NALAZITI I KACENJE, ALI I
    // SKIDANJE onmousemove ALI I onmouseup HANDLER

    // DAKLE IDEJA JE DA ELEMENT POSTANE DRAGGABLE TRIGGERINGOM mousedown
    // ZATIM U OBIMU mousedown HANDLERA, JA DEFINISEM DA JE TO OKIDAC DA TAJ ELEEMNT POSTANE
    // I DRAGGABLE, ODNOSNO MOVABLE (PREKO ANCESTORA O KOJIM SAM GOVORIO, TOKOM DEFINISANJA I 
    // GORNJE KOMPONENTE); A ZATIM DA TRIGGERINGOM mouseup (DEFINICIJA KACENJA HANDLERA ISTO U OBIMU
    // SLEDECE METODE), ONESPOSOBIM mousemove, (I UNISTIM REFERENCU I NA mousemove, ALI I NA mouseup) 

    dragDropAlorythm(ev){

        // ev.preventDefault();         UMESTO OVOGA, ILI UMESTO DA U OVOJ FUNKCIJI RETURNUJEM
                                        // false, JA SAM DEFINISAO I ZAKACIO ondragstart HANDLER
                                        // U KOJEM SAM RETURNOVAO false, I NEM VISE POVLACENJA DUPLIKATA
                                        // IMAGE-A

        let draggable = ev.target.closest('[slot=draggable]');
        
        if(draggable.nodeName === 'PICTURE'){
            draggable = draggable.querySelector('img');
        }

        const pageDragXBefAbs = draggable.pageX;
        const pageDragYBefAbs = draggable.pageY;

        const cursorClientX = ev.clientX;
        const cursorClientY = ev.clientY;

        const clientDragX = draggable.getBoundingClientRect().x;
        const clientDragY = draggable.getBoundingClientRect().y;

        const moveBackByX = cursorClientX - clientDragX;
        const moveBackByY = cursorClientY - clientDragY;

        draggable.style.position = "absolute";
        // OVDE MOGU ISKORISTITI ODREDJENE METODE, KOJE NASLEDJUJE OVA KLASA (VEZANO ZA z-index)
        draggable.style.zIndex = this.olderZIndex(new Date());

        draggable.style.left = Math.round(pageDragXBefAbs) + "px";
        draggable.style.top = Math.round(pageDragYBefAbs) + "px";

        ////////////////////////////////////////////////////////////////////////////////
        draggable.style.cursor = "grabbing";    //OVAKAV KURSOR INDICIRA DA JE NESTO ZGRABLJENO
                                                // ODNOSNO U OVOM SLUCAJU MOJ DRAGGABLE
        ////////////////////////////////////////////////////////////////////////////////

    
        

        // I OVDE MOGU ISKORISTITI NASLEDJENU METODU, KOJU SAM DEFINISAO U 
        // KAO METODU PREDHODNE KOMPONENTE, I KOJA BIRA this-OV APSOLUTNO ILI RELATIVNO
        // POZICIONIRANI ELMENT, A AKO NI JEDAN ANCESTOR NIJE, TAKO POZICIONIRAN, BIRA SE body TAG
        
        const elementForMovingAcross =  this.absOrRelAncestorOrBody();
        
        elementForMovingAcross.onmousemove = function(ev){
            
            const pageX = ev.pageX;
            const pageY = ev.pageY;
        

            draggable.style.left = Math.round(pageX - moveBackByX) + "px";
            draggable.style.top = Math.round(pageY - moveBackByY) + "px";
        };
    

        draggable.onmouseup = function(ev){
            draggable.style.cursor = 'grab'; //OVAKAV KURSOR INDICIRA DA JE NESTO GRABBABLE
            
            elementForMovingAcross.onmousemove = null;
            ev.currentTarget.onmouseup = null;
            this._grabbed = false;
        }

    }
  //////////////////////////////////////////////////////////////////////////////////////////////////////

    // OVDE CU DEFINISATI I HANDLER, KOJI SE TICE KURSORA, ODNOSNO, NJEGOVE PROMENE, NAKON
    // TRIGGERING-A mouseover
    cursorOnOveringAncestor(ev){
        ev.target.closest('[slot=draggable]').style.cursor = 'grab';
    }

});

const movingElement = document.createElement('div');
movingElement.style.width = "128px";
movingElement.style.height = "58px";
movingElement.style.border = "8px solid pink"
movingElement.style.backgroundColor = "transparent";
const draggableDroppableEl = document.createElement('draggable-dropable');
draggableDroppableEl.appendChild(movingElement);
document.querySelector('div > .some_frame').contentDocument.body.insertAdjacentElement(
    'afterbegin',
    draggableDroppableEl
);

const draggableNeue = document.createElement('draggable-dropable');
const pictureClone = pictureSpook.cloneNode();
const sourceClone = sourceSpook.cloneNode();
const someDefaultImg = imgDefa.cloneNode();
pictureClone.appendChild(sourceClone);
pictureClone.appendChild(someDefaultImg);
draggableNeue.appendChild(pictureClone);
document.querySelector('div > .some_frame').contentDocument.body.insertAdjacentElement(
    'beforeend',
    draggableNeue
);

// U POSLEDNJOJ KOMPONENTI SAM UPOTREBIO I EVENT, KOJI JE KONKRETNO VEZAN ZA DRAGGING
        
        //          dragstart               (TRIGGER-UJE SE, NAKON POCETKA DRAGG-A)

        // MEDJUTIM, POSTOJE I SLEDECI EVENTOVI
        
//                  drag            (TRIGGERUJE SE DOK TRAJE DRAGGING)
                                    // PREDPOSTAVLJAM, SVAKI PUT, KADA SE ELEMENT, POZICIONIRA
                                    // SAZNAO SAM DA SE TRIGGER-UJE SVAKIH 350 ms

//                  dragend         (TRIGGERUJE SE, KADA KORISNIK ZAVRSI DRAGGING)
//                                      PREDPOSTAVLJAM, NAKON TRIGGERING-A  mouseup-A

// POMENUTI EVENTOVI SU EVENT-OVI, KOJI SE TRIGGER-UJU,     NA                          DRAGG TARGET-U

// NAIME, OVDE SAM UPOTREBIO TERMIN        DRAGG TARGET, MEDJUTIM TAKODJE POSTOJI I 
//                                  
//                                                                                      DROP TARGET


// RECI CU, KOJI SU SVE TO EVENT-OVI, TRIGGER-UJU, NA DROP TARGET-U, TEK KADA SE POZABAVIM SLEDECIM
// A STO JE I OBJASNJENO U CLANKU KOJI CITAM, A TO JE

                    //          DETEKTOVANJE   DROPPABLE-OVA         (DETECTING DROPPABLES)

// U prethodnim primerima, slike i elementi () bi se mogla drop-ovati "bilo gdje" i da tu ostanu. 
// U stvarnom životu obično uzimamo jedan element i spustimo ga na drugi. 
// Na primer, fajl u fasciklu ili korisnik, fsciklu u smeće ili bilo gde drugde.
// Abstraktno, uzmemo 'draggable' element  i spustimo ga na "droppable" element.


// NAIME, ONO STO JA MORAM ZNATI JESTE TARGET DROPPABLE NA KRAJU DRAG'N'DROP-A
// KAKO BI IZVEO ODGOVARAJUCU AKCIJU
// TAKODJE POZELJNO JE DA ZNAM ZA DROPPALE, TOKOM DRAGGING PROCES-A, TAKO STO BI DROPPABLE BIO HIGHLIGHTED

// RESENJE JE INTERESANTNO, ALI MALKO TRICKY, A OVDE CU SE NJIME POZABAVITI

// PRVA IDEJA JESTE KACENJE onmouseover  I onmouseup HANDLER-A, NA POTENCIJALNI DROPPABLE, I DETEKTOVANJE
// KADA SE POINTER MISA POJAVI PREKO DROPPABLE-A; I TAKO MOGU ZNATI DA JA DRAGGUJEM ILI DROPPUJEM PREKO TOG
// DROPPABLE ELEMENTA

// ALI TO NE BI FUNKCIONISALO

// PROBLEM SE OGLEDA U TOME, STO DOK JA DRAGG-UJEM, DRAGGABLE ELEMENT JE UVEK IZNAD DRUGIH ELEMENATA
// I Mouse EVENT-OVI SE UVEK DESAVAJU NA TOP ELEMENT, A NE NA ONIM ELEMENTIMA, ISPOD NJEGA

// NA PRIMER, IMAM DVA DIV-A; JEDAN TOMATO I DRUGI OLIVE
// NE POSTOJI MOGUCNOST DA SE CATCH-UJE EVENT, NA TOMATO-U, ZATO STO JE OLIVE PREKO NJEGA

const dva_diva = `
    <div onclick="alert('tomato')" class="tomato_zada"></div>
    <div onclick="alert('olive')" class="olive_zada"></div>
`;

const style_dva_diva = `
    div.tomato_zada {
        background-color: tomato;
        cursor: pointer;
    }
    div.olive_zada {
        background-color: olive;
    }

    div.tomato_zada, div.olive_zada {
        height: 80px;
        width: 80px;
        cursor: text;

        position: absolute;
        left: 20px;
    }
`;

// document.querySelector('div.olive_zada').style.cursor = 'grab';


// Isto je sa draggable elementom. Element je uvek iznad drugih elemenata, tako da
//  se EVENT-OVI, TRIGGERUJU NA NJEMU. Bez obzira na to koji su LISTENERI postavLJENI na ELEMENTE ISPOD,
// oni neće raditi.
// Zbog toga početna ideja SA STAVLJANJEM HANDLER-A NA potencijalnim DROPPABLE-IMA ne funkcioniše u praksi. 
// TI HANDLERI NECE RADITI

// U SVEMU TOME MI MOZE POMOCI METODA, ZA KOJU PRVI PUT CUJEM

                        document.elementFromPoint          

// POMENUTOJ METODI SE KAO ARGUMENTI DODAJU,         BROJNE VREDNOSTI, KOJE SE ODNOSE NA WINDOW RELATED 
// (ODNOSNO CLIENT) KOORDINATE
// POVRATNA VREDNOST POMENUTE METODE JESTE ELEMENT, KOJI JE NAJDUBLJE NESTED, NA DATIM WINDOW RELATED
// KOORDINATAMA, DODATIM, KAO ARGUMENTI; ILI POVRATNA VREDNOST JESTE null, AKO SU KOORDINATE IZVAN
// window-A

// TAKO DA BI U BILO KOJEM MOUSE EVENT HANDLER-U, MOZE SE DETEKTOVATI, POTENCIJALNI DROPPABLE ISPOD
// POINTERA
// MEDJUTIM U TRENUTKU POZIVANJA, POMENUTE METODE, DROPPABLE SE MOR SAKRITI, JER AKO TO NE URADIM
// ON CE BITI POVRATNA VREDNOST, POMENUTE METODE

// DAKLE PISEM OVAKO

//                      droppable.hidden = true;
//                      const elementIspod = document.elementFromPoint(ev.clientX, ev.clientY);
//                      droppable.hidden = false;

// KAO STO VIDIIM, NAKON POZIVA POMENUTE        document.elementFromPoint  METODE, OPET CINIM
// DROPPABLE, VIDLJIVIM

// SDA CU UPOTREBI OVU METODU, U MOM CODE-U, ODNOSNO U MOM          DRAG'N'DROP ALGORITMU
// ODNOSNO, KREIRACU NOVU KOMPONENTU KOJA CE REPREZENTOVATI DRAGGABLE CONTAINER (DAKLE KOMPONENTA,
// CIJI ELEMENT, KOJI REPREZENTUJE, IMA POTPUNO ISTE OSOBINE, KAO I INSTANCE PREDHODNIH
// dragg-drop KOMPONENTI)

// U            moveIt          (ON mousemove) HANDLER-U, JA CU PRIMENITI, POMENUTU
//      document.elemntFromPoint        METODU 

window.customElements.define('drag-drop-container', class extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});

        const slotElement = document.createElement('slot');
        const styleElement = document.createElement('style');
        const styleText = `
            /* STILOVI, KOJI CE BITI APLICIRANI DROPPABLE-U (POSTO JE SVAKI DRAGGABLE I POTENCIJALNI
               DROPPABLE) */

            ::slotted([olive_outline]){
                outline: olive 4px solid;
            }

            /*SLEDECA SELEKCIJA NIJE MOGUCA*/
            /*
            ::slotted(picture > img){
                display: none;
            }
            */
        `;

        slotElement.name = "draggable";
        styleElement.textContent = styleText;

        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(slotElement);

        // BINDINZI
        this.pickItUp = this.dragNDropAlgorythm.bind(this);
        this.moveIt = this.moveIt.bind(this);

        this.changeCursor = this.changeCursor.bind(this);

        this.documentSelector = this.documentSelector.bind(this);
        this.olderZIndex = this.olderZIndex.bind(this);
        this.absOrRelAncestorOrBody = this.absOrRelAncestorOrBody.bind(this);

        
        this._onConnected = this._onConnected.bind(this);

        //////////////////////////////////////////////////
        this._backBy = {x: 0, y: 0};
        
        this._dateOfMounting = null;

        // SLEDECI PROPERTI BI TREBALO DA SKLADISTI TRENUTNI        DROPPABLE       ELEMENT
        this._currentDroppable = null;
        // SLEDECI PROPERTI BI TREBALO DA SKLADISTI VREDNOST ZA outline STIL, MOGUCEG DROPPABLE-A
        this._imageOldStyle = "";

    }
    
    connectedCallback(){
        this._onConnected();
    }

    // FUNKCIJA U KOJOJ JE SAV CODE, NAMENJEN connectedCallback-U
    _onConnected(){

        this._dateOfMounting = new Date();

        this.children[0].setAttribute('slot', 'draggable');
        
        const bodyElement = this.documentSelector().body;
        bodyElement.scrollTop = Math.round(bodyElement.scrollHeight);

        this.shadowRoot.querySelector('[name=draggable]').addEventListener('mousedown', this.pickItUp);

        this.shadowRoot.querySelector('[name=draggable]').addEventListener('mouseover', this.changeCursor);
    }

    // EVENT HANDLERI
    dragNDropAlgorythm(ev){
        
        ev.preventDefault();
        
        let draggable = ev.target.closest('[slot=draggable]');
        if(draggable.nodeName === 'PICTURE'){
            draggable = draggable.querySelector('img');
        }

        draggable.style.cursor = 'grabbing';

        const clientX = ev.clientX;
        const clientY = ev.clientY;
    
        const clientDraggable = draggable.getBoundingClientRect();
        const elClientX = clientDraggable.x;
        const elClientY = clientDraggable.y;

        const elPageX = draggable.offsetLeft;
        const elPageY = draggable.offsetTop;
        
        this._backBy.x = clientX - elClientX;
        this._backBy.y = clientY - elClientY;

        
        draggable.style.position = "absolute";
        
        draggable.style.zIndex = this.olderZIndex(new Date());
        
        draggable.style.left = Math.round(elPageX) + "px";
        draggable.style.top = Math.round(elPageY) + "px";

        
        const aOrBOrBody = this.absOrRelAncestorOrBody();
        
        const moveIt = this.moveIt;

        aOrBOrBody.addEventListener('mousemove', moveIt);

        draggable.onmouseup = function(ev){
            draggable.style.cursor = "grab";
            aOrBOrBody.removeEventListener('mousemove', moveIt);
            ev.currentTarget.onmouseup = null;
        };
        
    }

    // EVENT LISTENER-I
    moveIt(ev){
        
        const pageX = ev.pageX;
        const pageY = ev.pageY;
        let draggable = this.shadowRoot.querySelector('[name=draggable]').assignedNodes()[0];

        if(draggable.nodeName === 'PICTURE'){
            draggable = draggable.querySelector('img');
        }

        draggable.style.left = Math.round(pageX - this._backBy.x) + "px";
        draggable.style.top = Math.round(pageY - this._backBy.y) + "px";

      // DAKLE DEFINISANJE NEOPHODNOG CODE-A, KOJI SE TICE DROPPABLE ELEMENT, MOGU NASTAVITI
      // OVDE U NASTAVKU, moveIt HANDLERA, KOJI SE, KAO STO SAM RANIJE OBJASNJAVAO, KACI NA
      // PRVI APSOLUTNO POZICIONIRANI, ILI RELATIVNO POZICIONIRANI this-OV ANCESTOR, ILI AKO TAKVOG NEMA
      // KACI SE NA body ELEMENT
        /////////////////////////////////////////////////////////////////////////////////////////////
        // PRIMENJUJEM elementFromPoint METODU
        // NJENU POVRATNU, VRDEDNOST, ODNONO DROPPABLE ELMENT REFERENCU, SKLADISTIM, KAO
        // VREDNOST PROPERTIJA, OVE INSTANCE
        // NARAVNO, DEFINISEM I POMENUTA SAKRIVANJA I PONOVNO VRACANJE VIDLJIVOSTI DRAGGABLE-U

        // ALI NA UMU MORAM IMATI JEDNU BITNIU STVAR,
        // JA SAM U OVOM PRIMERU KREIRAO NEKOLIKO INSTANCU, OVOG, MOG CUSTOM ELEMENTA
        // ALI SAM NJU NESTOVA U body   ifram-A
        // STO ZNACI DA KADA BIH KORISTIO           document     ELEMENT, KOJI BI BIO POVRATNA VREDNOST
        // POMENUTE METODE BIO BI SAM  iframe, JER ZAISTA JA KURSOR OM PRELAZIM PREKO iframe
        // A document, NEMA PRISTUP ONOME, UNUTAR iframe-OVOG documenta
        // ZATO JE NAJBOLJE DA SELEKTUJEM  iframe-OV document, PA DA ONDA NA NJEMU PRIMENIM
        // elementFromPoint METODU
        // A JA SAM SLUCAJNO KREIRAO TAKVU METODU
        //              this.documentSelector
        // KOJOJ JE POVRATNA VREDNOST TRENUTNA Document INSTANCA, 
        // ANCESTOR, MOG INSERTOVANOG CUSTOM ELEMENTA

        draggable.hidden = true;
        const potentialDroppableIspod = this.documentSelector().elementFromPoint(ev.clientX, ev.clientY);
        draggable.hidden = false;

        // console.log(potentialDroppableIspod.closest('[slot=draggable]'));

        ///////////////////////////////////////////////////////////////////////////////////////////
        // POSTO SAM SVE POMENUTO DEFINISAO, MORAM SADA RECI, ZASTO JA USTVARI ZELIM DA SKLADISTIM,
        // TRENUTNI DROPPABLE ELEMENT

        // TREBAM IMATI NA UMU SLEDECE:
        // JA ZELIM DA OVDE DEFINISEM NEKU MANIPULACIJU (DODAM STILIZOVANJE) DROPPABLE ELEMENT
        // ALI JA ZELIM STIL DA DODAM SAMO JEDNOM
        // A POSTO SAM U ON mousemove HANDLER-U, JASNO JE DA BI SE TAKAV STILL IZNOVA I IZNOVA DODAVAO
        // A U OSTALOM, JA ZELIM DA SE MOJ STIL UKLONI IZ DROPPABLE, KADA SE IZ NJEGA UKLONI
        // SPUSTENI DRAGGABLE
        // RANIJE SAM DEFINISAO DA SE POTENCIJALNI DROPPABLE SKLADISTI U PROPERTIJU
        //                                                                        this._currentDroppable


        // AKO POSTOJI DROPPABLE
        if(this._currentDroppable){
            // PROVERAVAM, KOJI JE NOVI ELEMENT DOBIJEN PRIMENOM elementFromPoint
            // AKO JE REC O ISTOM ELEMENTU, NIJE POTRREBNO DA SE UKLANJA REFERENC IZ VREDNOSTI
            // CUSTOM ELEMENT INSTANCE
            // U SUPRONOM UKLANJAM
            
            if(!potentialDroppableIspod){
                if(this._currentDroppable.nodeName === 'PICTURE'){
                    this._currentDroppable.querySelector('img').style.outline = this._imageOldStyle;
                    this._imageOldStyle = '';
                    this._currentDroppable = null;
                }else{
                    this._currentDroppable.removeAttribute('olive_outline');
                    this._currentDroppable = null;
                }

                return;
            }

            if(this._currentDroppable !== potentialDroppableIspod.closest('[slot=draggable]')){ 
                if(this._currentDroppable.nodeName === 'PICTURE'){

                // MEDJUTIM POSTO SAM JA RADIO SA picture TAGOM , U MOJIM PRIMERIMA, TAKO DA JE ON 
                // SLOTTED DRAGGABLE (A TAKODJE MOGUCI DROPPABLE) ELEMENT
                // ZBOG NJEGOVIH OGRANICENJA U STILIZOVANJU, ZATO STO DIREKTNO NA PICTURE TAGU
                // NE MOGU DEFINISATI STILOVE, A TAKODJE STO ::sloted() PSEUDO KLASOM MOGU DA STILIZUJEM
                // SLOTTED ELEMENT, A NE I NJEGOVE DESCENDANTE, KAO STO JE img TAG NESTED U picture-U

                // MORACU DIREKTNO DA UKLANJAM style TAG SA img-A (KOJI SAM NARAVNO DODAO, KADA JE
                // TAKAV picture ELEMENT PRONADJEN I NJEGOVA REFERENCA SKLADISTENA U PROPERIJU
                // CUSTOM ELEMENT INSTANCE)

                    this._currentDroppable.querySelector('img').style.outline = this._imageOldStyle;
                    this._imageOldStyle = '';
                    this._currentDroppable = null;
                }else{
                    this._currentDroppable.removeAttribute('olive_outline');
                    this._currentDroppable = null;
                }
                
                return;
            }                                                        
            
        }



        if(potentialDroppableIspod){         // NAIME, POTREBNO JE PROVERITI DA LI JE NOVI
                                             //ELEEMNT, ZAISTA DROPPABLE   
                                              
            // AKO SE I DALJE MOUSEMOVING VRSI, TAKO DA JE ISPOD VEC ONAJ SELEKTOVANI DROPPABLE
            // FUNKCIJA SE MOZE RETUTNOVASTI, ODNOSNO NEMA POTREBE NISTA DEFINISATI ZA ONAJ
            // DROPPABLE, KOJI JE VEC RANIJE SELEKTOVAN
            if(potentialDroppableIspod.closest('[slot=draggable]') === this._currentDroppable){
                return;
            }

            // AKO SE RADI O RAZLICITIM ELEMENTIMA
            // POTREBNO JE USKLADISTITI NOVI DROPPABLE I DODELITI MU ZELJENE STILOVE
            // (OVA I PREDHODNA if IZJAVA SU MOGLE BITI if else IZJAVA)
            if(potentialDroppableIspod.closest('[slot=draggable]') !== this._currentDroppable){
                                                                    // POSTO U MOM PRIMERU JA JESAM
                                                                    // DEFINISAO NEKOLIKO
                                                                    // INSTANCI CUSTOM ELMENTA
                                                                    // U TOM SMISLU, JA MOGU
                                                                    // ONAJ POTENCIJALNI NEKI DRUGI
                                                                    // DRAGGABLE (DEO POTPUNO ISTOG
                                                                    // OVAKVOG CUSTOMA) ELEMENT
                                                                    // POSMATRATI I KAO DROPPABLE
                                                                    // ZATO NEKA UPRAVO POSTOJANJE
                                                                    //  slot='draggable' ATRIBUTA
                                                                    // BUDE USLOV DA JE TAKV ELEMENT
                                                                    // I DROPPABLE ELEMENT;
                                                                    // U PRIMERU IZ CLANKA
                                                                    // DROPPABLE JE BIIO ONAJ ELMENT
                                                                    // STILIZOVAN KLASOM .droppable
                this._currentDroppable = potentialDroppableIspod.closest('[slot=draggable]');

                // OVDE MOGU DODATI STIL 
                // MEDJUTIM POSTO SAM JA RADIO SA picture TAGOM , U MOJIM PRIMERIMA, TAKO DA JE ON 
                // SLOTTED DRAGGABLE (A TAKODJE MOGUCI DROPPABLE) ELEMENT
                // ZBOG NJEGOVIH OGRANICENJA U STILIZOVANJU, ZATO STO DIREKTNO NA PICTURE TAGU
                // NE MOGU DEFINISATI STILOVE, A TAKODJE STO ::sloted() PSEUDO KLASOM MOGU DA STILIZUJEM
                // SLOTTED ELEMENT, A NE I NJEGOVE DESCENDANTE, KAO STO JE img TAG NESTED U picture-U

                // MORACU DIREKTNO DA STILIZUJEM img INSIDE picture

                if(this._currentDroppable.nodeName === 'PICTURE'){
                    const image = this._currentDroppable.querySelector('img');
                    this._imageOldStyle = window.getComputedStyle(image).outline;
                    image.style.outline = "pink solid 4px";
                }else{  //SVAKI DRUGI ELEMENT SE MOZE STILIZOVATI CSS KLASOM FROM INSIDE SHADOW ROOT
                    this._currentDroppable.setAttribute('olive_outline', '');
                }
            }else{
                return;
            }

        }

        
      ////////////////////////////////////////////////////////////////////////////////////////////

        // NIJE null, ODNOSNO AKO SE OD RANIJE 
            // SACUVAO DROPPABLE
            // ALI I AKO JE SADA KAO  POTENCIJALNI
            // PRISUTAN NOVI ELEEMNT (DAKLE
            // DRAGGING SE NASTAVIO IZVAN DROPPABLE-A)

            // POTREBNO JE DA DOLEIM null 
            //  this._currentDroppable-U


        
    }

    changeCursor(ev){
        const draggable = ev.currentTarget;
        draggable.style.cursor = 'grab';
    }

    //METODE
    documentSelector(){

        let element = this;
        
        if(element.nodeName === '#document') return element;

        while(element = element.parentNode){
            if(element.nodeName === '#document') return element;
        }
    }

    olderZIndex(neueDate){
        return Math.round((neueDate - this._dateOfMounting)/10);
    }

    absOrRelAncestorOrBody(){
        let el = this;

        if(el.nodeName === '#document' || el.nodeName === 'BODY') return el.body || el;

        while(el = el.parentNode){
            
            if(
                window.getComputedStyle(el)['position'] === 'absolute' || 
                window.getComputedStyle(el)['position'] === 'relative' 
            ){
                return el;
            }

            if(el.nodeName === '#document' || el.nodeName === 'BODY') return el.body || el;
        }
    }

});

const draggableOtherKont = document.createElement('drag-drop-container');
const pikClone = pictureSpook.cloneNode();
const srcClone = sourceSpook.cloneNode();
const someDefaultImgClone = imgDefa.cloneNode();
pikClone.appendChild(srcClone);
pikClone.appendChild(someDefaultImgClone);
draggableOtherKont.appendChild(pikClone);
document.querySelector('div > .some_frame').contentDocument.body.insertAdjacentElement(
    'afterbegin',
    draggableOtherKont
);

const movableDiv = document.createElement('div');
movableDiv.style.width = "128px";
movableDiv.style.height = "58px";
movableDiv.style.border = "8px solid pink";
movableDiv.style.backgroundColor = "transparent";
const draggableDroppableContainer = document.createElement('drag-drop-container');
draggableDroppableContainer.appendChild(movableDiv);
document.querySelector('div > .some_frame').contentDocument.body.insertAdjacentElement(
    'afterbegin',
    draggableDroppableContainer
);

// TAKODJE POSTOJI, I METODA

                        document.elementsFromPoint
// TA MEDOTA JESTE EKSPERIMENTALNA, A POVRATNA VREDNOST JOJ JE NIZ ELEMENATA NA SPECIFICIRANOJ TACKI;
// ODNOSNO, OD TARGETA U KOJEM JE TACKA, DO TARGETOVOG, NAJ DALJEG ANCESTOR-A

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// SADA CU SE POZABAVITI SA JOS PRIMERA VEZANIH ZA DRAG'N'DROP
// PRVO CU NAPRAVITI, JEDAN SLAJDER

window.customElements.define('custom-slider', class extends HTMLElement {
    constructor(){
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        const progressBar = document.createElement('div');
        const slideBar = document.createElement('div');
        const styleElement = document.createElement('style');
        const styleText = `
            .slide_bar {
                cursor: pointer;
                width: 8px;
                height: 28px;
                border-radius: 2px;
                background-color: #67f19c85;
                position: absolute;
                top: -9px;
                left: 3px;            /* POMEREN ULEVO, ZA PARENTOV BORDER RADIUS */  
            }

            .progress_bar {
                box-sizing: border-box;
                padding: 0px;
                width: 92%;
                height: 10px;
                border-radius: 3px;
                background-color: #f5c9c5;
                position: relative;
            }
        `;
        styleElement.textContent = styleText;
        progressBar.classList.add('progress_bar');
        slideBar.classList.add('slide_bar');
        progressBar.append(slideBar);
        shadowRoot.appendChild(styleElement);
        shadowRoot.appendChild(progressBar);

        // bindings
        this.grabIt = this.grabIt.bind(this);
    
    }

    // LIFECYCLE CALLBACKS
    connectedCallback(){
        const shadowRoot = this.shadowRoot;

        shadowRoot.querySelector('.slide_bar').addEventListener('mousedown', this.grabIt)
    }

    // EVENT HANDLERS
    grabIt(ev){
        const slajder = ev.currentTarget;
        const progress = slajder.parentNode;
        const slajderCoordsAndSizes = slajder.getBoundingClientRect();
        const progressCoordsAndSizes = progress.getBoundingClientRect();
        
        // TREBACE MI I PROGRESSOV BORDER RADIUS, JER I ON MORA UCI U, NEKE OD SLEDECIH 'RACUNICA'
        const progressBorderRadiusNumb = 
            parseInt(/[0-9]*/.exec(window.getComputedStyle(progress).borderRadius)[0]);        

        // ZA POCETAK; DA IMAM 'EFEKAT POVLACENJA U JEDNOJ TACKI' IZMEDJU KURSOR I SLAJDERA-A
        const cursorClientX = ev.clientX;
        const moveBackBy = cursorClientX - slajderCoordsAndSizes.x;
        slajder.style.left = Math.round(
            cursorClientX - progressCoordsAndSizes.left - moveBackBy 
        ) + "px";

        
        // MINIAMLNA I MAKSIMALNA WINDOW REALTED KOORDINATA DO KOJIH KURSOR SME BITI POZICIONIRAN
        const zero = progressCoordsAndSizes.left;
        const max = progressCoordsAndSizes.right;
    

        // KACENJE onmousemove HANDLERA, NA this-OV PARENT ELEMENT 
        // (ELEMENT U KOJEM JE NESTED MOJ CUSTOM)
        const parentOfThis = this.parentNode;

        parentOfThis.onmousemove = function(ev){
            const cursorClientX = ev.clientX;
    
            if(cursorClientX < zero){
                slajder.style.left = progressBorderRadiusNumb + "px";    
            }else if(cursorClientX > max){
                slajder.style.left = Math.round(
                    max - progressCoordsAndSizes.left - progressBorderRadiusNumb - 
                    slajderCoordsAndSizes.width 
                ) + "px";
            }else{ 
                slajder.style.left = 
                Math.round(cursorClientX - progressCoordsAndSizes.left - moveBackBy) + "px";
            }

        };
        
        // KACENJE onmouseup HANDLER-A

        parentOfThis.onmouseup = function(ev){
            ev.currentTarget.onmousemove = ev.currentTarget.onmouseup = null;
        }

        return false;

    }

});

const html_za_slajder = `
<div class="kontejner_slajdera" style="width: 86%; height: 208px; border: pink solid 1px; padding: 80px">
</div>
`

const nekiSlajder = document.createElement('custom-slider');
document.querySelector('.kontejner_slajdera').appendChild(nekiSlajder);


// SLEDECI PRIMER CE IZGLEDATI, KAO, MOJ PREDPOSLEDNJI PRIMER (AKCENAT NIJE NA DROPPABLE-U, ALI U CILJU
// USTEDE VREMENA, JA CU PREKOPIRATI CEO PRIMER)
// PRIMER CU PREKOPIRATI U CILJU USTEDE VREMENA, A ONO STO HOCU DA DODAM JESTE SLEDECE

                // DA NE MA HORIZONTALNOG SCROLLING-A NA STRANICI, ODNOSNO KADA GRANICA ELEMNTA
                // DODJE DO LEVE I DESNE GRANICE PROZORA, DA SE TU I ZAUSTAVI, BEZ OBZIRA STO JE KURSOR
                // IZASAO NAPOLJE

                // A DA VERTIKALNI SCROLLING BUDE PRISUTAN, ALI DA ELEMENT NIKAD NE IZADJE SA STRANICE
                // NI TOKOM TOG SCROLLINGA
                // ODNOSNO DA IVICA ELEMENTA (NARAVNO, GORNJA ILI DONJA), BUDE PRILJUBLJENA
                // UZ GORNJU ILI DONJU IVICU CLIENTA (window-A), NARAVNO DOK SE ELEMENT POZICIONIRA
                // (DOK SE 'DRZI' TASTER MISA)
                
                // SVE OSTALO JE, ISTO, KAO I IZ PREDPOSLEDNJEM PRIMERA
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
// MEDJUTIM, JA SE NISAM DOVOLJNO DOBRO UPOZNAO SA SCROLLING-OM, TAKO DA CU SE SADA BACITI NA CLANKE, U
// KOJIMA JE OBJASNJEN SCROLLING; A MOZDA OBNOVIM SVE KOORDINATE, NAKON TOGA
// PA CU SE TEK POZABAVITI OVAKVIM PRIMEROM 

// U PRVOM DELU VEZANOM ZA SCROLLING POZBAVICU SE 'VELICINOM ELEMENTA I SCROLLING-OM', ZATIM 
// 'VELICINAMA WINDOW-A I SCROLLING-OM'
///////////////////////////////////////////////////////////////////////////////////////////////////////

//                  
///////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////NAKON SLEDECEG CLANAK//////////////////////////////////PODSETNIK DA SE POZABAVIM SA ////////////
//////////////////////////////////////          scroll-behavior
/////////////////////////////////////////
//////////////////////////////////////////////////////////////////A SADA CU POCETI SA IZUCAVANJEM, NOVOG
//                                                                              CLANKA
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 
//                    
//                          
```