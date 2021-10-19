class Game {
    constructor() {
        this.imgList = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8', 'img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7', 'img8'];
        this.pair = [];
        this.timeToreturn = 700;

        this.cardsList = document.getElementsByClassName('card');
        this.gridItem = document.querySelectorAll(".gridItem");
        this.flippedCards = document.getElementsByClassName("flip");

        this.loadCards();
        this.checkPair();

        document.getElementById('reload').addEventListener('click', () => {this.loadCards()});
    }

    loadCards() {
        if (this.flippedCards.length == 0) {
            //all cards are mixed
            this.mixCards();
        } else {
            //all cards returned
            Array.from(this.flippedCards).forEach(el => el.classList.remove('flip'));
            //all cards are mixed after time to return cards
            setTimeout(() => {
                this.mixCards();
            }, this.timeToreturn);
        }
    }

    mixCards() { //mix cards randomly and attributes each one to a grid item
        this.imgList.sort(()=> Math.random() - 0.5);
        for (let i = 0; i < this.cardsList.length; i++) {
            this.cardsList[i].setAttribute("src", `images/${this.imgList[i]}.jpg`);
            this.gridItem[i].setAttribute("id", `${this.imgList[i]}`);
        }
    }
    
    checkPair() { //compares 2 flipped cards, and flips them back if they are different
        this.gridItem.forEach(element => {
            element.addEventListener('click', () => {
                if(!element.classList.contains('flip')) {
                    if (this.pair.length == 0) {
                        element.classList.add('flip');
                        this.pair.push(element.id);
                    } else if (this.pair.length == 1) {
                        element.classList.add('flip');
                        this.pair.push(element.id);
                        if (element.id == this.pair[0]) {
                            this.pair.splice(0, 2);
                        } else {
                            const flipBack = new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    this.pair.forEach(el => {
                                        document.querySelector('.flip#' + el).classList.remove('flip');
                                    })
                                    resolve();
                                }, this.timeToreturn);
                            })
                            flipBack.then(() => this.pair.splice(0, 2));
                        }
                    }
                }
            });
        })
    }
}

let newGame = new Game;