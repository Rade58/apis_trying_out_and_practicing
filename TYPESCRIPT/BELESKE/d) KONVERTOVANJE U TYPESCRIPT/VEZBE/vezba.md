# TREBAO BIH 'PARCE' JAVASCRIPT CODE-A DA KONVERTUJEM U TYPESCRIPT (MORACU DA NAUCIM KAKO DA PISEM TESTOVE, ALI NE SADA)

*src/index.js*

```javascript
export class AddressBook {
  contacts = [];

  addContact(contact) {
    this.contacts.push(contact);
  }

  findContactByName(filter) {
    return this.contacts.filter(c => {
      if (
        typeof filter.firstName !== "undefined" &&
        c.firstName !== filter.firstName
      ) {
        return false;
      }
      if (
        typeof filter.lastName !== "undefined" &&
        c.lastName !== filter.lastName
      ) {
        return false;
      }
      return true;
    });
  }
}

export function formatDate(date) {
  return (
    date
      .toISOString()
      .replace(/[-:]+/g, "")
      .split(".")[0] + "Z"
  );
}

function getFullName(contact) {
  return [contact.firstName, contact.middleName, contact.lastName]
    .filter(Boolean)
    .join(" ");
}

export function getVcardText(contact, date = new Date()) {
  const parts = [
    "BEGIN:VCARD",
    "VERSION:2.1",
    `N:${contact.lastName};${contact.firstName};${contact.middleName ||
      ""};${contact.salutation || ""}`,
    `FN:${getFullName(contact)}`,
    ...Object.keys(contact.phones).map(
      phName => `TEL;${phName.toUpperCase()};VOICE:${contact.phones[phName]}`
    ),
    ...Object.keys(contact.addresses)
      .map(addrName => {
        const address = contact.addresses[addrName];
        if (address) {
          return `ADR;${addrName.toUpperCase()}:;;${address.houseNumber} ${
            address.street
          };${address.city};${address.state};${address.postalCode};${
            address.country
          }\nLABEL;${addrName.toUpperCase()};ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:${
            address.houseNumber
          } ${address.street}.=0D=0A=${address.city}, ${address.state} ${
            address.postalCode
          }=0D=0A${address.country}`;
        } else {
          return "";
        }
      })
      .filter(Boolean)
  ];

  if (contact.email) {
    parts.push(`EMAIL:${contact.email}`);
  }
  const d = new Date();
  parts.push(`REV:${formatDate(date)}`);
  parts.push("END:VCARD");
  return parts.join("\n");
}
```

## :one: PRVO STO BIH URADIO JESTE POKRETANJE TESTA NA GORNJEM JAVASCRPT FAJLU (OVDE VECINA STVARI NIJE BAS USPESNO ODRADJENA TAKO DA PRATI SLEDECI NASLOV)

AUTOR TUTORIJALA KORISTI [MOCHA](https://mochajs.org/)

NEMAM VREMENA DA SADA UCIM MOCHA FRAMEWORK TAKO DA CU SADA KORISTITI ONO STA JE PRIPREMIO AUTOR TUTORIJALA

KOPIRATI test/*mocha.opts*

**OVO JE ONO STA CU INSTALIRATI**

- npm install mocha chai ts-node --save-dev

OVAKO IZGLEDA mocha.opts

```javascript

--require ts-node/register
--require source-map-support/register
--timeout 60000
--watch-extensions js,ts,json
test/**/*.test.ts

```

**MOZDA TREBAM INSTALIRATI I TYPESCRIPT LOKALNO** (AKO NESTO NE BUDE FUNKCIONISALO INSTALIRATI I TAJ PAKET LOKALNO)

A **tsconfig.json** IZGLEDA OVAKO

```javascript
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  },
  "include": ["src"]
}
```

SAMO DA KAZEM DA JE **TEST JAVASCRIPT FAJL** NAPISAN I NALAZI JE U **test** FOLDERU, ZAJEDNO SA *mocha.opts* FAJLOM

**SADA MOGU DA POKRENEM TEST**

- npm run test (PS. U package.json FAJLU ZADAT JE SCRIPT -> "test": "mocha") (ONO STO MI JE CUDNO JESTE DA SAM SAMO KUCAO 'mocha' NE BI USPESNO POKRENUO TEST)

USPESNO CE BITI IZVRSENO 14 OD 14 TESTOVA ZA RAZLICITE FEATURE, GORE POMENUTU JAVASCRIPT KLASU I FUNKCIJE IZ src/index.js FAJLA

### SADA TREBAM POMENUTI index.js FAJL PRETVORITI U .ts FAJL

PA BIH TREBAO POKRENUTI COMPILER U VEOMA 'LOOSE MODE'-U (UNTIL WE CAN GET THINGS PASSING)

COMPILER I JESTE SADA U 'LOOSE MODE'-U (POGLEDAJ GORE NJEGOVE OPCIJE (OSTAVIO SAM IH))

RUNN-OVAO SAM OPET TEST I SVE JE BILO USPESNO

SADA CU DODATI, NOVE OPCIJE U *tsconfig.json* FAJL

```javascript
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    // DODAJEM
    "noImplicitAny": false
  },
  "include": ["src"]
}
```

RUNN-OVACU TEST

- npm run test

I SVE CE BITI OK

*JA OVIM NISTA NISAM PROMENIO, U POGLEDU 'LOOSE' KONFIGURACIJE*, JER OVA VREDNSOT JE I false PO DEFAULTU

**OVO BI SADA BIO INITIAL COMMIT**

### AKO SADA OTVORIM FAJL I POGLEDAM, U SUTINI NEMA NIKAKAVIH, 'JAVLJENIH' GRESAKA, A ON HOVER, VIDECU DA MNOGE VREDNOSTI, JESU IMPLICITNO TYPED SA any

## :two: ZABRANJIVANJE IMPLICITNIH any-JA

```javascript
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    // DAKLE DEFINISEM SLEDECE NA true
    "noImplicitAny": true
  },
  "include": ["src"]
}
```

KADA POGLEDAM SADA CODE VIDECU MNOGE STVARI KOJE JE TYPESCRIPT PODVUKAO, A HOVERINGOM PREKO PODVUCENIH STVARI MOGU VIDETI DA JE REC O IMPLICITNO TYPED ENTITETIMA, KOJI SU IMPLICITNO TYPED SA any

MOGU SADA DA POCNEM DA REDEFINISEM CODE. ODNOSNO DA POCNEM DA EKSPLICITNO TYPE-UJEM SVE ONE STVARI KOJE SU IMPLICITNO TYPED SA any

POCECU PRVO OD FUNKCIJA, A NA KRAJU CU SE POZBAVITI SA KLASOM

USTVARI OSTAVICU MOJE RESENJE

```typescript


// PROBLEM JE BI OSTO NISAM OSTAVIO ?: ZA DEFINISANJE DOZVOLJENIH PROPERTIJA I TYPE-OVA
// U INTERFACE-OVIMA, I ZATO TEST NIJE PROLAZIO
// ALI KADA SAM OSTAVIO TU MOGUCNOST, TEST JE PROSAO
/////////////////////////////////////////////

///////////////////////////////////////////////
// // INTERFACE-OVE KOJE SAM UPOTREBIO DODAO SAM DOLE IZMEDJU
// // ALI SVUDA IH KORISTIM

export class AddressBook {
  public contacts: SmallerConntact[] = [];

  addContact(contact: SmallerConntact) {
    this.contacts.push(contact);
  }

  findContactByName(filter: SmallerConntact) {
    return this.contacts.filter(c => {
      if (
        typeof filter.firstName !== "undefined" &&
        c.firstName !== filter.firstName
      ) {
        return false;
      }
      if (
        typeof filter.lastName !== "undefined" &&
        c.lastName !== filter.lastName
      ) {
        return false;
      }
      return true;
    });
  }
}

export function formatDate(date: Date) {
  return (
    date
      .toISOString()
      .replace(/[-:]+/g, "")
      .split(".")[0] + "Z"
  );
}


// DODAO SAM OVA TRI INTERFACE-A
// !!! I OVO JE SVE MOGLO MNOGO BOLJE ZATO POGLEDAJ AUTOREVO RESENJE
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
interface SmallContact {
  firstName?: string;
  middleName?: string;
  lastName?: string;
}

interface SmallerConntact {
  firstName?: string;
  lastName?: string;
  addresses?: Addresses | {};
  phones?: Phones | {}
}

interface Phones {
  [name: string]: string
}

interface Addresses {
  [name: string]: {
    street?: string;
    city?: string;
    country?: string;
    houseNumber?: number;
    postalCode?: number;
    state?: string
  }
}

interface Contact extends SmallContact {
  salutation?: string;
  email?: string;
  phones?: Phones;
  addresses?: Addresses
}
//////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////


function getFullName(contact: Contact) {
  return [contact.firstName, contact.middleName, contact.lastName]
    .filter(Boolean)
    .join(" ");
}

export function getVcardText(contact: Contact, date = new Date()) {
  const parts = [
    "BEGIN:VCARD",
    "VERSION:2.1",
    `N:${contact.lastName};${contact.firstName};${contact.middleName ||
      ""};${contact.salutation || ""}`,
    `FN:${getFullName(contact)}`,
    ...Object.keys(contact.phones).map(
      phName => `TEL;${phName.toUpperCase()};VOICE:${contact.phones[phName]}`
    ),
    ...Object.keys(contact.addresses)
      .map(addrName => {
        const address = contact.addresses[addrName];
        if (address) {
          return `ADR;${addrName.toUpperCase()}:;;${address.houseNumber} ${
            address.street
          };${address.city};${address.state};${address.postalCode};${
            address.country
          }\nLABEL;${addrName.toUpperCase()};ENCODING=QUOTED-PRINTABLE;CHARSET=UTF-8:${
            address.houseNumber
          } ${address.street}.=0D=0A=${address.city}, ${address.state} ${
            address.postalCode
          }=0D=0A${address.country}`;
        } else {
          return "";
        }
      })
      .filter(Boolean)
  ];

  if (contact.email) {
    parts.push(`EMAIL:${contact.email}`);
  }
  const d = new Date();
  parts.push(`REV:${formatDate(date)}`);
  parts.push("END:VCARD");
  return parts.join("\n");
}

```

SADA MOGU RUNN-OVATI TEST

npm run test

TEST JE BIO USPESAN: 14/14

KADA SAM SVE RESIO I **OVO BI TREBALO DA BUDE COMMITED**