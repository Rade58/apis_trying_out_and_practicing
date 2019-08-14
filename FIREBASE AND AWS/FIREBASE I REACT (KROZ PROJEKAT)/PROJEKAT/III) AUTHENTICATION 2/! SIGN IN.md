# JA SAM NAIME RANIJE UVOZIO I KORISTIO RAZNE auth FUNKCIJE; MEDJUTIM MNOGE OD NJIH SU SE SAMO ODNOSILE NA SIGNING UP, ODNOSNO NA KREIRANJE USER-A U AUTHENTICATIO NDELU FIREBASE-A; ONO STO SAM PROPUSTIO JESTE DA DEFINISEM SIGNING IN SA EMAIL-OM I PASSWORD-OM

NAIME RANIJE SAM DEFINISAO OAuth SA GOOGLE ACCOUNT-OM

DEFINISAO SAM I SIGBING UP SA EMAIL PASSWORD-OM

TAKODJE SAM KORISTIO I FUNKCIJU SA SIGNING OUT

SVE SU ONE UZETE IZ OBJEKTA KOJI JE KREIRAN U MOM APP-U, KAO auth (NASTAO IZ POZIVANJA firebase.auth() FUNKCIJE)

## DAKLE SAMO SAM ZABORAVIO DA UVEZEM *SIGNING IN* FUNKCIJU I DA JE POZOVEM NA ODGOVARAJUCEM MESTU

src/firebase.js

```javascript
import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBNNF3Fz3Q8SLRUzmpDvEFG29QiMUQnGWg",
    authDomain: "think-clone.firebaseapp.com",
    databaseURL: "https://think-clone.firebaseio.com",
    projectId: "think-clone",
    storageBucket: "gs://think-clone.appspot.com",
    messagingSenderId: "885463908020",
    appId: "1:885463908020:web:ba744ff22f41a4a7"
};

firebase.initializeApp(firebaseConfig);


export const storage = firebase.storage();

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signOut = () => auth.signOut();

// EVO KREIRAO SAM I IZVEZAO FUNKCIJU U KOJOJ SE POZIVA SIGNING IN SA EAMIL-OM I SIFROM
export const signIn = (email, password) => auth.signInWithEmailAndPassword(email,password);
//******************************************************************************

export const getUserProfileDocument = async (uid) => {
    if(!uid) return null;

    try{
        return firestore.collection('users').doc(uid)

    }catch(error){

        console.error("Error fetching user: ", error.message);

    }


}

export const createUserProfileDocument = async (user, additionalData) => {
    if(!user) return;

    const userRef = firestore.doc(`users/${user.uid}`);

    const docSnapshot = await userRef.get();

    if(!docSnapshot.exists){

        const createdAt = new Date();

        const {displayName, photoURL, email} = user;


        try{
            userRef.set({
                displayName,
                photoURL,
                email,
                createdAt,
                ...additionalData
            })

        }catch(error){
            console.error("Error creating user: ", error.message);
        }

    }

    return getUserProfileDocument(user.uid);

}


window.firebase = firebase;

export default firebase;
```

SADA CU TU FUNKCIJU KORISTITI U SignIn KOMPONENTI

src/components/SignIn.jsx

```javascript
import React, {Component} from 'react';

import {signInWithGoogle} from '../firebase';

import {signIn} from '../firebase';  // EVO UVEZAO SAM FUNKCIJU, KOJU CU
                                    // POZVATI U onSubmit HANDLERU ZAKACENOM ZA FORMULAR

class SignIn extends Component {

    state = {email: '', password: ''};

    handleChange = ev => {

        const {name, value} = ev.target;

        this.setState({
            [name]: value
        });

    };

    handleSubmit = ev => {
        ev.preventDefault();

        // EVO OVDE KORISTIM POMENUTU FUNKCIJU
        // NE MORAM OBJASNJAVATI KAK OJER JE POPRILICNO JASNO
        const {email, password} = this.state;
        signIn(email, password);
        //********************************************

        this.setState({
            email: '',
            password: ''
        });

    };

    render(){

        const {email, password} = this.state;

        return (
            <form className="sign_in" onSubmit={this.handleSubmit}>
                <h2>Sign In</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleChange}
                />
                <input
                    type="submit"
                    value="Sign In"
                />
                <button onClick={signInWithGoogle}>Sign In With Google</button>
            </form>
        )

    };

}

export default SignIn;
```

DAKLE SADA KADA UNSESEM EMAIL I PASSWORD, TRIGGER-OVACE SE ON AUTH STATE CHANGE, (TO ZNACI DA user OBJEKAT PROSLEDJEN TO MCHANGE-U, VISE NIJE null)

DALJE SE DESAVA MNOGO STOSTA, KAO STO JE UZIMANJE PODATKA IZ ODGOVARAJUCEG DOKUMENTA 'users' KOLEKCIJE; A AKO NEMA TAKVOG DOKUMENTA BICE NAPRAVLJEN (JER SAM TAKO DEFINISAO RANIJE U UserProvider KOMPONENTI)

ONDA CE PODACI ODGOVARAJUCEG DOKUMENTA IZ user KOLEKCIJE BITI FETCHED (ON SNAPSHOT) I DATA CE MOCI DA POPULAT-UJE CurrentUser KOMPONENTU
