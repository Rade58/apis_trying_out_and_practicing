# SETTING UP BABEL

## 1. KREIRANJE package.json FAJLA

- npm init      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (MORAJU DA POSTOJE package.json I README.md FAJLOVI PRE KOMANDE)

MOGU KREIRATI I REPO

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

