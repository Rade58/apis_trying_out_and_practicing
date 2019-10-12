# TREBAO BIH 'PARCE' JAVASCRIPT CODE-A DA KONVERTUJEM U TYPESCRIPT (OVO CE SVE DA SACEKA DOK NE NAUCIM KAKO DA PISEM TEST-OVE)

*primer1.js*

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

## :one: PRVO STO BIH URADIO JESTE POKRETANJE TESTA NA GORNJEM JAVASCRPT FASJLU

AUTOR TUTORIJALA KORISTI [MOCHA](https://mochajs.org/)

NEMAM VREMENA DA SADA UCIM MOCHA FRAMEWORK TAKO DA CU URADITI DVE STVARI

KOPIRATI **test/mocha.opts** FAJL, PA CU GA MALO MODIFIKOVATI

PRVO CU INSTALIRATI MOCHA FRAMEVORK GLOBALNO

- npm install mocha -g

OVAKO IZGLEDA mocha.opts

```javascript

--require ts-node/register
--require source-map-support/register
--timeout 60000
--watch-extensions js,ts,json
test/**/*.test.ts

```

A LOKALNO CU DA INSTALIRAM I ts-node

- npm install ts-node --save-dev

*OVO JE ZATO STO mocha KORISTI Node.Js ZA OBAVLJANJE TESTIRANJA*

**ALI NA PRIMER KORISTI SE chai PACKAGE**

I POTREBNO JE NAPISATI TEST, STO JA JOS UVEK NE ZNAM

ALI IMAM PRIPREMLJEN TEST FAJL TAKO DA CU IPAKT NASTAVITI VEZBU U WORKSHOP-OVOM ZVANICNOM PROJEKTU

**STO SE TICE mocha, RUNN-UJEM ISTOIMENU KOMANDU KOJA CE TESTIRATI JAVASCRIPT FAJL** (TEST JE NAPISAN)

*STO SE TICE ts-node, INSTALIRAJ GA U ROOT-U PROJEKTA, NE U SAMIM CHALENG-OVIMA*

*MISLIM I DA SE typescript MORA INSTALIRATI SA --save* (npm install typescript --save)

(AKO NE BUDE FUNKCIONISALO, PROBAJ DA INSTALIRAS LOKALNO SVE TRUI PAKETA ts-node, mocha I typescript)

### NASAO SAM PROBLEM, mocha NE MOZE DA RESOLVE-UJE PATH-OVE

nakon svih instaliranja DODAJ node_modules ISPRED

ts-node/register
source-map-support/registeR

PRIKAZNAIH PATH-OVA U FAJLU test/mocha.opts

TAKODJE INSTALIRAJ I chai

## :two: PRVO TREBAM GORNJI FAJL PRETVORITI U .ts FAJL

PA BIH TREBAO POKRENUTI COMPILER U VEOMA 'LOOSE MODE'-U (UNTIL WE CAN GET THINGS PASSING)

