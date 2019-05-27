# DEMONSTRACIJA "DINAMICKOG" CODE SPLITTING-A

- U src FOLDERU, KREIRAM NOVI FOLDER, KOJI SE ZOVE **button-styles** I TAMO DODAJEM NEKOLIKO FAJLOVA

- TAMO KREIRAM MODULE:

1. tomato.js

2. olive.js

3. almond.js

- A DIREKTNO U src FOLDER-U, ONI FAJLOVI, KOJI SU BITNI ZA OVU DEMONSTRACIJU SU button-style.js MODUL I, NARAVNO ENTRY POINT index.js

IMAM OVAKVU FILE/FOLDER STRUKTURU

```linux
 src
    |   ...
    │   button-style.js
    │   index.js
    │
    └───button-styles
            almond.js
            olive.js
            tomato.js
```

**tomato.js** FAJL:

```javascript
export default "color: tomato";
```

**olive.js** FAJL:

```javascript
export default "color: olive";
```

**almond.js** FAJL:

```javascript
export default "color: blanchedalmond";
```

****
****

