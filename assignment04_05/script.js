const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "aqua",
  "yellow",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "aqua",
  "yellow",
  "pink"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

class MemoryGame {
  constructor() {
    this.clickCount = 0
    this.el = document.getElementById("game")
    this.innerEl = this.el.querySelector('#game-inner')
    this.scoreEl = document.getElementById('game-score')
    this.clickCountEl = document.getElementById('game-clicks')
    this.resetBtnEl = document.getElementById('game-reset')
    this.startBtnEl = document.getElementById('game-start')
    this.cards = []
    this.flippedCards = []
    this.matchedCards = []
    this.initialize()
  }

  initialize() {
    window.scrollTo({ top: 0 })
    this.createCards(shuffle(COLORS))
    this.cards.forEach(card => {
      card.el.addEventListener('click', e => {
        this.handleCardClick(card)
      })
    })
    this.resetBtnEl.addEventListener('click', () => this.resetGame())
    this.startBtnEl.addEventListener('click', () => window.scrollTo({ top: this.el.offsetTop, behavior: 'smooth' }))
    // console.dir(this.el)
  }

  createCards(colors) {
    for (let color of colors) {
      const card = new Card(color)
      this.addCard(card)
    }
  }

  addCard(card) {
    this.cards.push(card)
    this.innerEl.appendChild(card.el)
  }

  handleCardClick(card) {
    if (card.flipped) {
      return
    }
    this.setClickCount(this.clickCount+1)
    if (this.flippedCards.length < 2) {
      card.flip()
      this.flippedCards.push(card)
    }
    if (this.flippedCards.length === 2) {
      if (this.doCardsMatch(this.flippedCards[0], this.flippedCards[1])) {
        this.matchedCards.push(...this.flippedCards)
        this.setScore(this.matchedCards.length/2)
      } else {
        const tempCards = this.flippedCards.slice()
        setTimeout(() => this.resetFlippedCards(tempCards), 700)
      }
      this.flippedCards = []
    }
  }

  resetFlippedCards(_cards) {
    const cards = _cards || this.flippedCards
    cards.forEach(card => card.flip())
  }

  doCardsMatch(card1, card2) {
    return card1.color === card2.color
  }

  resetGame() {
    const cards = [...this.flippedCards, ...this.matchedCards]

    cards.forEach(card => {
      if (card.flipped) {
        card.flip()
      }
    })

    this.flippedCards = []
    this.matchedCards = []
    this.setClickCount(0)
    this.setScore(0)

    const colors = shuffle(COLORS)
    colors.forEach((color, i) => this.cards[i].setColor(colors[i]))
  }

  setScore(score=0) {
    this.scoreEl.innerText = score
  }

  setClickCount(count=0) {
    this.clickCount = count
    this.clickCountEl.innerText = count
  }
}

class Card {
  constructor(color) {
    this.color = color
    this.el = document.createElement("div")
    this.matched = false
    this.flipped = false
    this.initialize()
  }

  initialize() {
    this.el.classList.add("card")

    const inner = document.createElement("div")
    inner.classList.add("card-inner")
    this.el.appendChild(inner)

    const front = document.createElement("div")
    front.classList.add("card-front")
    inner.appendChild(front)

    const back = document.createElement("div")
    back.classList.add("card-back")
    back.style.color = this.color
    inner.appendChild(back)
  }

  flip() {
    this.flipped = !this.flipped
    this.el.classList.toggle("flipped", this.flipped)
  }

  setColor(color) {
    this.color = color
    this.el.querySelector('.card-back').style.color = color
  }
}

const game = new MemoryGame()