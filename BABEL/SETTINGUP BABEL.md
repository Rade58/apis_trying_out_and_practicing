# SETTING UP BABEL

KROZ JEDAN OGLEDNI PROJEKAT

DAKLE ONO STO ZELIM JESTE DA MOJA APLIKACIJA BUDE POKRENUTA U LOCALHOST-U, I DA U NJOJ MOGU KORISTITI import/export SINTAKSU

## 1. KREIRANJE package.json FAJLA

- npm init      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (MORAJU DA POSTOJE package.json I README.md FAJLOVI PRE EGZEKUCIJE KOMANDE)

MOGU KREIRATI I GIT REPO

- git init

## 2. KREIRANJE DVA FOLDERA (DIREKTORIJUMA), U MOM PROJECT FOLDER-U (OVO NIJE MANDATORY, VEC SAMO COMMON PRACTICE)

**JEDAN FOLDER JE ZA DEVELOPMENT** &nbsp;&nbsp;&nbsp;&nbsp;     (src)

**DRUGI FOLDER JE ZA DEPLOYMENT, COMPILED ASSET-OVA** &nbsp;&nbsp;&nbsp;&nbsp;      (dist)

## 3. U src FOLDERU CU STAVITI JEDAN JAVASCRIPT FAJL

TO CE BITI **server.js**

## 4. INSTALIRANJE BABEL-OVIH PAKETA

>>> These respectively take care of babels general working, the usage of babel in the command line, **the ability to use the newest JS features** *(STO MENUI TRENUTNO TREBA)* and the usage of babel with node

- npm install --save-dev '@babel/core' '@babel/cli' '@babel/preset-env' '@babel/node'

## 5. DODAVANJE PAKETA nodemon ZA LAKSI DEVELOPMENT

[nodemon PAKET](https://www.npmjs.com/package/nodemon)

- npm install --save-dev nodemon

>>> which reloads node for us automatically when one of our files is changed.(DAKLE OVO JE LIVE RELOAD PREDPOSTAVLJAM)

## 6. MORAM RECI BABELU DA KORISTI INSTALIRANI '@babel/preset-env', TAK OSTO CU KREIRATI .babelrc FILE

U POMENUTI FAJL STAVLJAM SLEDECE

```javascript
{
  "presets": ["@babel/preset-env"]
}
```

## 7. DODAVANJE BABEL SCRIPT-OVA U package.json FAJL

### a) START SCRIPT

TO MORA DA BUDE

- "nodemon --exec babel-node src/server.js"

>>> This tells the nodemon package to watch for file changes, reload when it detects them and use babel-node to run the file src/server.js. We’ll use this while developing locally.

### b) BUILD SCRIPT

- "babel src --out-dir dist"

>>> This tells babel to compile the files from the src directory and place them in the dist directory.

### c) SERVE SCRIPT

- "node dist/server.js"

>>> This enables us to run our compiled code on a server, the reason we are not just using nodemon for this is it uses quite a bit more memory than just using node and adds some startup time to the process which is fine for some applications but can be a huge performance hit in others.

## 8. KONACAN IZGLED package.json FAJLA, NAKON DODAVANJA SCRIPT-OVA

```javascript

```