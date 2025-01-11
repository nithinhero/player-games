const gameBoard = document.getElementById("gameBoard");
const scoreDisplay = document.getElementById("score");

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;

// Card symbols
const symbols = ["🍎", "🍌", "🍓", "🍇", "🍒", "🍉", "🍋", "🍍"];

function startGame() {
    resetGame();
    initializeBoard();
}

function resetGame() {
    gameBoard.innerHTML = "";
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    score = 0;
    updateScore();
}

function initializeBoard() {
    const cardSymbols = [...symbols, ...symbols]; // Duplicate symbols for pairs
    shuffleArray(cardSymbols);

    cardSymbols.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.addEventListener("click", handleCardClick);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function handleCardClick(event) {
    const clickedCard = event.target;

    if (clickedCard.classList.contains("flipped") || flippedCards.length === 2) {
        return;
    }

    clickedCard.classList.add("flipped");
    clickedCard.textContent = clickedCard.dataset.symbol;
    flippedCards.push(clickedCard);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        matchedPairs++;
        score += 10;
        flippedCards = [];
        checkWinCondition();
    } else {
        score -= 2;
        setTimeout(() => {
            card1.classList.remove("flipped");
            card1.textContent = "";
            card2.classList.remove("flipped");
            card2.textContent = "";
            flippedCards = [];
        }, 1000);
    }

    updateScore();
}

function checkWinCondition() {
    if (matchedPairs === symbols.length) {
        setTimeout(() => alert(`You win! Final Score: ${score}`), 500);
    }
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start the game
startGame();
