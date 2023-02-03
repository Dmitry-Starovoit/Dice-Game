"use strict";

const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score1 = document.querySelector("#score--0");
const score2 = document.querySelector("#score--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");

let result, activePlayer, resultScore, isPlaying;

const initGame = () => {
  activePlayer = 0;
  resultScore = [0, 0];
  result = 0;
  isPlaying = true;
  dice.classList.remove("show");

  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  score1.textContent = 0;
  score2.textContent = 0;

  player0.classList.remove("player--active");
  player1.classList.remove("player--active");
  player0.classList.add("player--active");

  player0.classList.remove("player--winner", "name");
  player1.classList.remove("player--winner", "name");
};

initGame();

const clickBtnRoll = () => {
  if (isPlaying) {
    let numbers = Math.trunc(Math.random() * 6) + 1;
    console.log(numbers);
    dice.src = `images/dice${numbers}.png`;
    dice.classList.add("show");
    if (numbers !== 1) {
      result += numbers;
      document.getElementById(`current--${activePlayer}`).textContent = result;
    } else {
      switchActivePlayer();
    }
  }
};

const switchActivePlayer = () => {
  result = 0;
  document.getElementById(`current--${activePlayer}`).textContent = result;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

const clickBtnHold = () => {
  if (isPlaying) {
    resultScore[activePlayer] += result;
    document.getElementById(`score--${activePlayer}`).textContent =
      resultScore[activePlayer];
    console.log(resultScore[activePlayer]);

    if (resultScore[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner", "name");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      console.log("palyer won");
      dice.classList.remove("show");
    } else {
      switchActivePlayer();
    }
  }
};

btnRoll.addEventListener("click", clickBtnRoll);
btnHold.addEventListener("click", clickBtnHold);
btnNewGame.addEventListener("click", initGame);
