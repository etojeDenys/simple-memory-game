

export class Card {
    _id= null
    _value = null;
    isOpen = false;

    constructor(onCardClick, id) {
        this.id = id

        const div = document.createElement('div')
        div.classList.add('card')

        div.innerHTML = `<div class="front-side"></div><div class="back-side"></div>`

        div.onclick = onCardClick.bind(this)

        this._elem = div;

    }

    get id() {
        return this._id
    }

    set id(idValue) {
        this._id = idValue
    }

    set value(value) {
        this._value = value
    }

    get value() {
        return this._value
    }

    setVisibility(isVisible) {
        this._elem.style.visibility = isVisible ? 'visible' : 'hidden'
    }

    flip() {
        this._elem.classList.toggle('flipped')
        this.isOpen = !this.isOpen

        this._elem.querySelector('.back-side').innerText = this.isOpen ? this.value : '';
    }

    render(elem) {
        elem.appendChild(this._elem)
    }

}

