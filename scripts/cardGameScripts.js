import { saveScore, getHighScore } from './storage.js';

const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
const scoreElement = document.querySelector(".score");

const baseCards = [
  { name: "bear", image: "images/bear.png" },
  { name: "cat", image: "images/cat.png" },
  { name: "dog", image: "images/dog.png" },
  { name: "fox", image: "images/fox.png" },
  { name: "frog", image: "images/frog.png" },
  { name: "panda", image: "images/panda.png" },
  { name: "penguin", image: "images/penguin.png" },
  { name: "rabbit", image: "images/rabbit.png" },
  { name: "tiger", image: "images/tiger.png" },
];

export function initGame() {
cards = [...baseCards, ...baseCards]; 
  shuffleCards();
  generateCards();
  score = 0;
  scoreElement.textContent = score;
}

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
        <img class="front-image" src="${card.image}" alt="${card.name}" ></div>
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
  scoreElement.textContent = score;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  score++;
  scoreElement.textContent = score;
  const highScoreElement = document.querySelector(".high-score");
  saveScore(score);
  highScoreElement.textContent = getHighScore();
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

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'light') document.body.classList.add('light-theme');

  const highScoreElement = document.querySelector(".high-score");
  highScoreElement.textContent = getHighScore();
  initGame();
});1

window.themeSwap = function() {
  document.body.classList.toggle('light-theme');
};

window.restart = restart;
