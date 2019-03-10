# JEDAN PRIMER SA PLAYING KARTAMA

```HTML
<div class="_">
    <div class="shpil">
        <div class="whole_card diamond">
            <div class="card_back card"></div>
            <div class="card_front card">
                <div></div>
            </div>
            <div></div>
        </div>
        <div class="whole_card spade">
            <div class="card_back card"></div>
            <div class="card_front card">
                <div></div>
            </div>
            <div></div>
        </div>
        <div class="whole_card heart">
            <div class="card_back card"></div>
            <div class="card_front card">
                <div></div>
            </div>
            <div></div>
        </div>
        <div class="whole_card club">
            <div class="card_back card"></div>
            <div class="card_front card">
                <div></div>
            </div>
            <div></div>
        </div>
    </div>
</div>

<style>

    div._ {
        width: 100%; height: 100%; position: fixed; top: 0; left: 0;}

    div.whole_card {
        background-color: rgba(255, 235, 205, 0);
        cursor: pointer;
        display: inline-block;

        width: 180px;
        height: 298px;
        border: tomato solid 0px;

        transform-style: preserve-3d;
    }

    div.whole_card:active {
        cursor: grab;
    }

    div.card {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.548);
        border-radius: 12px;
        background-color: rgba(255, 235, 205, 0.383);
        padding: 20px;
    }

    div.card_back {
        position: absolute;
        background-size: 10px 10px;
        background-image: linear-gradient(
            to bottom right, 
            rgb(158, 250, 135) 30%, 30%, 
            rgba(231, 205, 171, 0.233) 80%, 80%,
            rgb(203, 228, 196) 
        ),
        radial-gradient(2px 2px at center, rgb(97, 14, 84), rgba(199, 45, 58, 0.829));
        ;
        
        background-clip: content-box;
        transform: translateZ(-1px);
        top: 0;
        z-index: -1;
    }

    /* div.card_back::after {
        position: absolute;
        content: "";
        border-radius: inherit;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(179, 185, 159, 0.164);
    } */

    div.card_front {
        background-color: whitesmoke;
        box-sizing: border-box;
        padding: 20px;
        font-size: 2.8em;
        text-align: center;
        transform: rotateY(180deg) translateZ(2px);
        position: absolute;
        z-index: -1;
    }

    div.card_front::before{
        content: 'A';
        position: absolute;
        top: 5%;
        left: 10%;
    }

    div.card_front.card_front::after {
        content: 'A';
        position: absolute;
        bottom: 5%;
        right: 10%;
        transform: rotateZ(180deg);
    }

    div.card_front div {
        padding: 0;
        font-size: 5rem;
        margin-top: 50%;
    }

    div.whole_card.diamond div.card_front div::before {
        content: '♦';
    }

    div.whole_card.diamond div.card_front {
        color: red;
    }
    
    div.whole_card.spade div.card_front div::before {
        content: '♠';
    }

    div.whole_card.spade div.card_front {
        color: black;
    }
    div.whole_card.heart div.card_front div::before {
        content: '♥';
    }

    div.whole_card.heart div.card_front {
        color: red;
    }
    div.whole_card.club div.card_front div::before {
        content: '♣';
    }

    div.whole_card.club div.card_front {
        color: black;
    }

    /*/////////////*/
    /* MULTIPLE CARDS */

    div.shpil {
        position: relative;
        display: block;
        border: tomato solid 0px;
        /* width: min-content; */
        width: 189px;
        
        margin: auto;

        margin-top: 34%;
    }


    div.shpil div.whole_card {
        position: absolute;
    }

    div.shpil div.diamond.whole_card {
        transform: rotateZ(0deg) translateZ(10px);
    }
    
    div.shpil div.spade.whole_card {
        transform: rotateZ(8deg) translateZ(20px);
        /* z-index: 3; */
    }

    div.shpil div.heart.whole_card {
        transform: rotateZ(16deg) translateZ(30px);
        /* z-index: 2; */
    }

    div.shpil div.club.whole_card {
        transform: rotateZ(24deg) translateZ(41px);
        /* z-index: 1; */
    }

    /*////////////////////////////////////////////////*/
    /* ANIMATION */
    div.whole_card {
        animation-duration: 1s;
        /* animation-delay: 408ms; */
        animation-timing-function: ease;
        animation-fill-mode: forwards;
    }

    .go_diamond {
        animation-name: turning_diamond;
    }

    .goBack_diamond {
        animation-name: turningBack_diamond;
    }

    .go_spade {
        animation-name: turning_spade;
    }

    .goBack_spade {
        animation-name: turningBack_spade;
    }

    .go_heart {
        animation-name: turning_heart;
    }

    .goBack_heart {
        animation-name: turningBack_heart;
    }

    .go_club {
        animation-name: turning_club;
    }

    .goBack_club {
        animation-name: turningBack_club;
    }
    /*//////////////////////////////////////////////////*/
    @keyframes turning_diamond {
        from {
            transform: rotateY(0deg);
        }

        50% {
            transform: translateX(-120%) rotateY(45deg);
        }

        to {
            transform: translateX(-130%) rotateY(180deg) translateZ(10px);
        }
    }

    @keyframes turning_spade {
        from {
            transform: rotateX(0deg);
        }

        50% {
            transform: translateY(60%) rotateX(45deg);
        }

        to {
            transform: translateY(100%) rotateX(180deg) translateZ(20px);
        }
    }


    @keyframes turning_heart {
        from {
            transform: rotateY(0deg);
        }

        50% {
            transform: translateX(80%) rotateY(45deg);
        }

        to {
            transform: translateX(120%) rotateY(180deg) translateZ(30px);
        }
    }

    @keyframes turning_club {
        from {
            transform: rotateX(0deg);
        }

        50% {
            transform: translateY(-60%) rotateX(45deg);
        }

        to {
            transform: translateY(-100%) rotateX(180deg) translateZ(42px);
        }
    }

    
    /* /////////////////////////////////////////////////// */
    /* back */
    @keyframes turningBack_diamond {
        from {
            transform: translateX(-130%) rotateY(180deg);
        }

        50% {
            transform: rotate(0deg) translateX(-120%);
        }

        to {
            transform: rotateY(0deg) translateZ(10px);
        }
    }

    @keyframes turningBack_spade {
        from {
            transform: translateY(100%) rotateX(24deg);
        }

        50% {
            transform: translateY(60%) rotateX(45deg);
        }

        to {
            transform: rotateX(0deg) rotateZ(32deg) translateZ(20px);
        }
    }

    @keyframes turningBack_heart {
        from {
            transform: translateX(120%) rotateY(180deg);
        }

        50% {
            transform: translateX(80%) rotateY(45deg);
        }

        to {
            transform: rotateY(0deg) rotateZ(8deg) translateZ(30px);
        }
    }

    @keyframes turningBack_club {
        from {
            transform: translateY(-100%) rotateX(180deg);
        }

        50% {
            transform: translateY(-60%) rotateX(45deg);
        }

        to {
            transform: rotateX(0deg) rotateZ(16deg) translateZ(41px);
        }
    }

    

</style>

<script>
    const cards = document.querySelectorAll('div.whole_card');

    cards.forEach((card) => {

        let classes = ['diamond', 'club', 'spade', 'heart'];

        for(let cl of classes){

            if(!card.classList.contains(cl)){
                continue;
            }else{
                
                card.addEventListener('mousedown', ev => {
                    const hasClass = ev.currentTarget.classList.contains(`go_${cl}`);

                    if(hasClass) {
                        ev.currentTarget.classList.add(`goBack_${cl}`);
                        ev.currentTarget.classList.remove(`go_${cl}`);
                        return;
                    }else{
                        ev.currentTarget.classList.add(`go_${cl}`);
                        ev.currentTarget.classList.remove(`goBack_${cl}`);
                    }

                });

            }

        }
    });
</script>
```