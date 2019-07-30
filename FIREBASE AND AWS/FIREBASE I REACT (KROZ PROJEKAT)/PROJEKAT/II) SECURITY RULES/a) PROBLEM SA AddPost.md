# PROBLEM SA AddPost U SLUCAJU UNAUTHORIZED KORISNIKA

## OVAJ PROBLEM JE NASTAO KADA SAM ODLUCIO DA KORISTIM auth.currentUser, U Obimu AddPost KOMPONENTE

## PROBLEM JE NASTAO ISKLJUCIVO ZBOG React, ODNOSNO FRONT END-A

ZA SADA SE KOD MENE REACT ELEMENT, REPRESENTED BY AddPost COMPONENT UVEK RENDERUJE, BEZ OBZIRA auth.currentUser BIO null ILI NE

POGLEDAJ Posts KOMPONENTU

```javascript
import React from 'react';

import Post from './Post';
import AddPost from './AddPost';

const Posts = ({posts}) => {

    return (
        <section className="posts">
            <AddPost/>
            {posts.map(post => <Post {...post} key={post.id} />)}
        </section>
    )

}

export default Posts;
```

KAO STO VIDIS, KAO DEO render METODE, PREDHODNE KOMPONENTE, JESTE REACT ELEMENT, REPRESENTED BY AddPost COMPONENT, I TAJ REACT ELEMENT SE NE RENDERUJE CONDITIONALlY VEC JE UVEK TU BEZ OBZIRA NA TO LI JE USER AUTHORIZED ILI NE

```javascript
import React, {Component} from 'react';

import {firestore} from '../firebase';

// EVO OVDE GA UVOZIM
import {auth} from '../firebase';

class AddPost extends Component {

    state = {title: '', content: ''};

    handleChange = ev => {
        const {name, value} = ev.target;

        this.setState({[name]: value});
    }

    handleSubmit = ev => {

        ev.preventDefault();

        const {title, content} = this.state;

        // RESTRUKTURIRANJE         auth.currentUser
        // KAO STO SAM OVDE URADIO
                                    // ZAISTA MZOE DOVESTI DO ERROR-A
                                    // U SLUCAJU KADA JE                auth.currentUser === null

                                    // ODNOSNO KADA KORISNIK NIJE AUTHORIZED

                                    // JER NE MOGU SE RETRUKTURIRATI null ILI undefined
                                    // U OVOM SLUCAJU JE MOGUCA VREDNOST null
                                    // AKO KORISNIK NIJE AUTHORIZED

        const {uid, displayName, email, photoURL} = auth.currentUser;

        const post = {
            title,
            content,

            user: {
                uid,
                displayName,
                email,
                photoURL
            },

            createdAt: new Date().toISOString(),
            stars: 0,
            comments: 0
        }

        firestore.collection('posts').add(post)

        this.setState({
            title: '',
            content: ''
        })

    }

    render(){

        const {title, content} = this.state;

        return (
            <form className="add_post" onSubmit={this.handleSubmit}>
                <input
                    name="title"
                    value={title}
                    type="text"
                    placeholder="Title"
                    onChange={this.handleChange}
                />
                <input
                    name="content"
                    value={content}
                    type="text"
                    placeholder="Content"
                    onChange={this.handleChange}
                />
                <input
                    type="submit"
                    value="Create Post"
                    className="create_post"
                />
            </form>
        );
    }

}

export default AddPost;
```

DAKLE, KADA BI KAO UNAUTHORIZED KORISNIK ZELEO DA DODAM NOVI POST, IMAO BIH POMENUTI ERROR

OVAJ ERROR JE MENI BITAN JER REACT ZBOG SVOG LINTINGA (MISLIM DA JE REC O TOME) (I TO SE UCITAVA UZ POMOC WEBPACKA), ZA SLUCAJ OVOG ERROR-A, PREKO CELE STRANICE RENDER-UJE ERROR MESSAGE

## POSTO SAM JA U SREDINI DEVELOPMENT-A, PREDPOSTAVLJAM DA SE SVE ONO STO REPREZENTUJE AddPost KOMPONENTA NE TREBA NI PRIKAZIVATI UNAUTHORIZED KORISNIKU

VEROVATNO CU TO NA KRAJU TUTORIJALA I DEFINISATI
