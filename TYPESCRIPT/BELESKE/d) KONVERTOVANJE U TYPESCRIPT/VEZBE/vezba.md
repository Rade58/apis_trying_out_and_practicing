# TREBAO BIH 'PARCE' JAVASCRIPT CODE-A DA KONVERTUJEM U TYPESCRIPT (MORACU DA NAUCIM KAKO DA PISEM TESTOVE, ALI NE SADA)

*index.js*

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

- npm run test (PS. U package.json FAJLU ZADAT JE SCRIPT -> "test": "mocha")

USPESNO CE BITI IZVRSENO 14 TESTOVA ZA RAZLICITE FEATURE, GORE POMENUTE JAVASCRIPT KLASE I FUNKCIJA

## :two: SADA TREBAM POMENUTI index.js FAJL PRETVORITI U .ts FAJL

PA BIH TREBAO POKRENUTI COMPILER U VEOMA 'LOOSE MODE'-U (UNTIL WE CAN GET THINGS PASSING)
