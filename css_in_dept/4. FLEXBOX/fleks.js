/* console.log('external script');

customElements.define('my-video', class extends HTMLVideoElement {
    constructor(){
        super();

        // const shadow = this.attachShadow({mode: 'open'});

        console.log(this.shadowRoot);

        this.elFunk = this.elFunk.bind(this);

        this.elFunk();
    }

    elFunk(par){
        console.log(this.constructor);
        // console.log(this.shadowRoot);
    }

}, {extends: 'video'}); */

