const cards = document.querySelectorAll('.memory-card');
const reset = document.querySelector(".reset-btn");

let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlipped) {
        // flipped card for the first time
        hasFlipped = true;
        firstCard = this;
        return;
    }
    // clicks second card
    secondCard = this;

    checkMatch();
}

function checkMatch() {
    // check if the cards match
    // use dataset object to get access to data in html
    const firstValue = firstCard.dataset.image;
    const secondValue = secondCard.dataset.image;
    if (firstValue === secondValue) {
        disableCards();
    } else {
        enableCards();
    }
}

function disableCards() {
    // cards have matched !!
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    // reset board so that current cards do not flip
    resetBoard();
}

function enableCards() {
    lockBoard = true;
    // cards do not match : (
    setTimeout(() => {
        secondCard.classList.remove('flip');
        firstCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    hasFlipped = false;
    lockBoard = false;
    [firstCard, secondCard] = [null, null];
}

function randomShuffle() {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * cards.length);
    })
}

// for random shuffling of cards for every reset/reload

reset.addEventListener('click', randomShuffle);

randomShuffle();
cards.forEach(card => card.addEventListener('click', flipCard));
