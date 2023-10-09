const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const btnToAbout = document.getElementById('about');
const btnToGallery = document.getElementById('gallery');

let play, scores, activePlayer, currentScore;

const toAbout = () => {
  window.location.href = '/about';
};

const toGallery = () => {
  window.location.href = '/gallery';
};

btnToAbout.addEventListener('click', toAbout);
btnToGallery.addEventListener('click', toGallery);

function init() {
  play = true;
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
}

init();

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (play) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `../../assets/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (play) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 42) {
      play = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else switchPlayer();
  }
});

btnNew.addEventListener('click', init);
