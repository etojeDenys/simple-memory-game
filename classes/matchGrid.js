import { shuffleArray } from "../utils.js";
import { Card } from "./card.js";
import { Timer } from "./timer.js";

export class MatchGrid {
    openedCards = [];

    firstOpened = null;
    secondOpened = null;

    nrOfColumns = 0;
    nrOfRows = 0;

    timeLimit = 0;

    entities = []
    cards = []

    isStarted = false

    _elem = null
    pauseElement = null
    constructor(
        elem,
        width,
        height,
        nrOfColumns,
        nrOfRows,
        timeLimit,
        theme,
        entities,
    ) {
        this._elem = elem
        this.nrOfColumns = nrOfColumns;
        this.nrOfRows = nrOfRows;
        this.timeLimit = timeLimit;
        this.entities = entities;


        if(this.nrOfRows * this.nrOfColumns % 2 !== 0) {
            throw new Error('number of rows or columns are invalid')
        }

        if(this.entities.length * 2 !== this.nrOfColumns * this.nrOfRows) {
            throw new Error('entities data is invalid')
        }


        if(theme.fontSize){
            this._elem.style.fontSize = theme.fontSize
        }
        this._elem.style.gridTemplateColumns = `${width} `.repeat(this.nrOfColumns)
        this._elem.style.gridTemplateRows = `${height} `.repeat(this.nrOfRows)

        const nrOfCards = this.nrOfRows * this.nrOfColumns;
        for(let i = 0; i < nrOfCards; i++) {
            this.cards[i] = new Card((e) => this.onCardClick(e,i), i)
        }

        this.pauseElement = document.createElement('div');
        this.pauseElement.classList.add('pause')

        this._elem.addEventListener('mouseleave', ()=> {
            if (this.isStarted) {
                this.pauseGame()
            }
        })
        this.pauseElement.addEventListener('click', ()=> {
            this.resumeGame()
        })

    }

    onCardClick(e, id) {
        if (!this.isStarted) {
            alert('click "Start" to start the game :)')
            return
        }

        const card = this.cards.find(c => c.id === id)

        if (card === this.firstOpened) {
            return
        }

        if (this.firstOpened) {
            this.secondOpened = card;
            this.secondOpened.flip()

            if (this.firstOpened.value === this.secondOpened.value){
                this.openedCards.push(this.firstOpened, this.secondOpened)

                if(this.openedCards.length === this.cards.length){
                    this.won()
                } else {
                    setTimeout(() => {
                        this.firstOpened.setVisibility(false)
                        this.secondOpened.setVisibility(false)

                        this.firstOpened = null;
                        this.secondOpened = null
                    }, 500)
                }



            } else {
                setTimeout(() => {
                    this.firstOpened.flip()
                    this.secondOpened.flip()

                    this.firstOpened = null;
                    this.secondOpened = null
                }, 500)

            }


            return
        }

        this.firstOpened = card;
        this.firstOpened.flip()
    }

    pauseGame() {
        this.timer.pause()


        anime({
            targets: this.pauseElement,
            opacity: {
                value: [0,1],
                duration: 1600,
                easing: 'easeInOutQuart'
            },
        });

        this._elem.appendChild(this.pauseElement)
    }

    resumeGame() {
        this.timer.resume()

        this._elem.removeChild(this.pauseElement)
    }
    start() {
        if(this.isStarted) {
            this.end()
        }

        for (const card of this.cards) {
            if(card.isOpen) {
                card.flip()
            }
        }

        const nrOfCards = this.nrOfRows * this.nrOfColumns;

        let j = 0;
        for(let i = 0; i < nrOfCards - 1; i= i + 2){
            this.cards[i].value = this.entities[j]
            this.cards[i+1].value = this.entities[j]
            j++;
        }

        shuffleArray(this.cards)


        this.render()
        this.isStarted = true;

        this.timer = new Timer(()=> {
            if (this.isStarted) {
                this.loose()
            }
        }, this.timeLimit)
    }


    render() {
        this._elem.innerHTML = '';

        for (const card of this.cards) {
            card.render(this._elem);
        }
    }

    end() {
        if(!this.isStarted) {
            return
        }

        this.openedCards = []
        this.firstOpened = null;
        this.secondOpened = null

        for(const card of this.cards) {
            card.setVisibility(true)

            if(!card.isOpen){
                card.flip()
            }
        }

        this.isStarted = false
    }

    won() {
        this.end()
        alert('Congratulations! you won the game')
    }

    loose() {
        this.end()
        alert('sorry but you lost the game :(');
    }

}
