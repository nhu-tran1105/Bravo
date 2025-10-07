const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
document.querySelector(".score").textContent = score;

const baseCards = [
  { name: "bear", image: "assets/bear.png" },
  { name: "cat", image: "assets/cat.png" },
  { name: "dog", image: "assets/dog.png" },
  { name: "fox", image: "assets/fox.png" },
  { name: "frog", image: "assets/frog.png" },
  { name: "panda", image: "assets/panda.png" },
  { name: "penguin", image: "assets/penguin.png" },
  { name: "rabbit", image: "assets/rabbit.png" },
  { name: "tiger", image: "assets/tiger.png" },
];

cards = [...baseCards, ...baseCards]; 
  shuffleCards();
  generateCards();

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function generateCards() {
  gridContainer.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src="${card.image}" />
      </div>
      <div class="back"></div>
    `;
    cardElement.addEventListener("click", flipCard);
    gridContainer.appendChild(cardElement);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  score++;
  document.querySelector(".score").textContent = score;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function restart() {
  score = 0;
  document.querySelector(".score").textContent = score;
  resetBoard();
  initGame();
}

initGame();
