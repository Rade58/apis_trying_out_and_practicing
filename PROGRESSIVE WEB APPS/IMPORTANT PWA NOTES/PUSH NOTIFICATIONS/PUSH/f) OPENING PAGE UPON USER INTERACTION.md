# OTVARANJE STRANICE, KADA KORISNIK INRACTS SA NOTIFICATION-OM

[GOVORIO SAM RANJE, KAK ODA ZADAM ACTIONS NA NOTIFIKACIJAMA](https://github.com/Rade58/apis_trying_out_and_practicing/blob/master/PROGRESSIVE%20WEB%20APPS/IMPORTANT%20PWA%20NOTES/PUSH%20NOTIFICATIONS/10.%20ACTIONS%20ON%20NOTIFICATION-IMA.md)

SADA CU TO PRIMENITI ZA Notification, CIJI DISPLAYING INICIJALIZUJEM U SERVICE WORKER-U

ACTIONS (ONI USTVARI REPREZENTUJU DUGMAD NA NOTIFICATION-IMA) SE KAO STO SAM GOVORIO, DEFINISU U options OBJEKT ARGUMENTU

A REAGOVANJE NA ACTIONS MOGU DEFINISATI, KADA SLUSAM notificationclick ILI notificationclose EVENT-OVE

## PRIKAZACU SAV DOSADASNJI CODE SERVICE WORKER-A, KOJI SE TICAO NOTIFICATION-A; A KONKRETNO ME ZANIMA ONAJ CODE GDE SAM SLUSAO NA notificationclick EVENT

sw.js FAJL:

```javascript
self.addEventListener('notificationclick', ev => {

    const notification = ev.notification;

    console.log(notification);

    const action = ev.action;

    // OVAJ NOTIFICATION KOJEM JE ZADAT action OBJEKAT, KOJEM JE ODREDJEN SA
    // STRINGOM 'confirm' (TO JE USTVARI DUGME, KAO STO SAM I REKAO)
    // ON JE DEFINISAN JE U app.js

    if(action === 'confirm'){

        // OVO DEFINISE DA SE KLIKOM IL ITAPOM NA TO DUGME USTAVRI NOTIFICATIO NZATVORI
        notification.close()

    }else{

        console.log(action);

        // ALI PRE NEGO STO SE NOTIFICATION ZATVORI (JER TO I TREBA DA BUDE PRAKSA
        // PRI SVAKOM TAPINGU NA NOTIFICATION, IKAO NIJE PRITISNUTO NIKAKVO DUGME
        // (BAR SAM TO PRIMETIO NA SVAKO MANDROID UREDJAJU)) JA ZELIM DA DEFINISEM
        // DA SE OTVORI BROWSER I DA SE INICIRA POSETA MOJOJ WEB APLIKACIJI

                        // TO CU DEFINISATI OVDE, PRE ZATVARANJA NOTIFICATION-A

        //-----------------------

        notification.close()
    }

})

```

## ZELIM DAKLE DA DEFINISEM DA SE BILO KOJI CLIENT, KOJEG KONTROLISE MOJ SERVICE WORKER, USTVARI OTVORI; I DA SE NARAVNO OTVORI I PAGE, MOJE APLIKACIJE

MORACU OPET KORISTITI waitUntil METODU

A KAKO BI PRISTUPIO SVIM CLIENT-IMA, KOJE KONTROLISE MOJ SERVICE WORKER (PREDPOSTAVLJAM DA CE TO NAJCESCE BITI JEDAN CLIENT, ODNOSNO JEDAN BROWSER), KORISTIM

- **self.clients**

- ALI MORAM PRIMENITI matchAll METODU NAD clients OBJEKTOM

I OVO RETURN-UJE Promise, KOJI JE RESOLVED SA NIZOM OBJEKATA KOJE REPREZENTUJU CLIENT-E, KOJE KONTROLISE OVAJ SERVICE WORKER (OBICNO JE TO SAMO JEDAN CLIENT)

**MEDJUTIM ,ZELIM DA DEFINISEM DA SE TRIGGERUJE POSETA, MOJOJ WEB APLIKACIJI, PRVO AKO JE CLIENT OTVOREN**

**AKO NIJE OTVOREN, MORACU DA DEFINISEM DA SE ON OTVORI**

U SVEMU OVOME POMOCI CE M INIZ HELPER METODA, KOJE CU KORISTITI U MOM CODE-U

sw.js FAJL:

```javascript
self.addEventListener('notificationclick', ev => {

    const notification = ev.notification;

    console.log(notification);

    const action = ev.action;


    if(action === 'confirm'){

        notification.close()

    }else{

        console.log(action);

        // DAKLE DEFINISEM waitUntil

        ev.waitUntil(
            self.clients.matchAll()
            .then(cls => {

                let firstVisibleClient = cls.find(client => {     // PRONALAZIM CLIENTE, KOJI SU OTVORENI UZ POMOC find HELPER FUNKCIJE
                                                                  // NE ZNAM ZASTO JE OVDE ODLUCENO DA SE KORISTI find METODA
                    return client.visibilityState === 'visible';
                                                                // TO GOVORIM JER CE ONA RETURN-OVATI PRVI ELEMENT, KOJI ZADOVOLJAVA USLOV 
                                                                // KOJI SAM ZADAO
                                                                // OVO ZNACI DA AKO IMA VISE CLIENT-A, NECE SVI BITI OTVORENI
                                                                // ZATO MISLI MDA JE OVDE BOLJE DEFINISATI LLOPING KROZ SVE CLIENTE
                                                                // MOZDA BI map METODA BILA BOLJI IZBOR
                });

                // AKO IMAM VISIBLE CLIENT-A

                if(!firstVisibleClient === undefined){
                    // MOGU INICIRATI NAVIGATIO NDO MOJE WEB STRANICE
                    visibleClient.navigate('https://instapwaclone.firebaseapp.com/')

                }else{    // AKO NEMA VISIBLE, ODNOSNO OTVORENOG CLENTA
                          // MORAM GA OTVORITI, PA ONDA INICIRATI NAVIGATION DO MOJE
                          // WEB STRANICE
                    self.clients.openWindow('https://instapwaclone.firebaseapp.com/')

                }

                // ZATVARANJE NOTIFICATIONA, MOGU SADA DEFINISATI OVDE

                notification.close();

            })
        );

        // notification.close()
    }

})

```

## MOGU SADA TESTIRATI MOJ APP; MOGU NA DESKTOP-U SLATI NOTIFICATION, NA PRIMER U OPERA BROWSERU; I GLEDATI DA L ICE SE NA MOM ANDROID UREDJAJU POJAVITI NOTIFICATION

NA ANDROIDU SAM NA MOM APP-U DOZVOLIO NOTIFICATIONS U SLUCAJU CHROME-A

I SVE FUNKCIONISE

NA OPERI BROWSER-U NA DESKTOP-U ,PAGE SE ROLAD-OVAO NAKON KLIKA NA NOTIFIKACIJU

A NA ANDROIDU, GDE JE MOJ PAGE BIO ZATVOREN, I GDE JE BROWSER BIO ZATVOREN; CHROME SE OTVORIO I MOJ APP SE UCITAO