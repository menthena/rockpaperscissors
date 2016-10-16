require('../css/main.scss');

import RockPaperScissors from './RockPaperScissors';
import CONST from './constant';

let intervalId;
const game = new RockPaperScissors();
const gameCustomizationElement = document.getElementById('game-customization');
const gameElement = document.getElementById('game');
const resetButtonElement = document.getElementById('reset-game');
const player1SelectionElement = document.getElementById('player1-selection');
const player2OptionsWrapper = document.getElementById('player2-options-wrapper');
const player2Options = document.getElementById('player2-options');
const player2SelectionElement = document.getElementById('player2-selection');
const player1NameElement = document.getElementById('player1');
const player2NameElement = document.getElementById('player2');
const winnerElement = document.getElementById('winner');
const timer = document.getElementById('timer');

const clearUI = () => {
  timer.innerText = '';
  player2OptionsWrapper.setAttribute('aria-hidden', true);
  clearInterval(intervalId);
};

const renderInitialUI = () => {
  gameCustomizationElement.setAttribute('aria-hidden', true);
  gameElement.setAttribute('aria-hidden', false);
  resetButtonElement.setAttribute('aria-hidden', false);
  if (!game.isSimulation) {
    renderOptions();
  }
  renderTime();

  player2NameElement.innerText = game.getPlayerText(2);
  player1NameElement.innerText = game.getPlayerText(1);
};

const renderTime = () => {
  timer.innerText = game.timeleft + 's';
};

const renderOptions = () => {
  const options = game.getOptions();
  let html = '';
  options.forEach((option) => {
    let defaultSelection = ((option === 'Rock') ? 'class="icon-selected"' : '');
    html += '<a id="selection-' + option + '" onclick="changeSelection(\'' + option + '\')"' +
      defaultSelection + '><i class="sprites icon-' + option + '"></i></a>';
  });
  player2OptionsWrapper.setAttribute('aria-hidden', false);

  player2Options.innerHTML = html;
};

const renderWinner = () => {
  player1SelectionElement.className = 'sprites icon-' + game.getPlayerSelection(1);
  player2SelectionElement.className = 'sprites icon-' + game.getPlayerSelection(2);

  if (!game.winner) {
    winnerElement.innerText = 'It is a tie!';
  } else {
    winnerElement.innerText = 'Player ' + game.winner + ' wins!';
  }
};

window.resetGame = () => {
  player1SelectionElement.className = player2SelectionElement.className = '';
  winnerElement.innerText = '';
  window.startGame();
};

window.startGame = () => {
  const isBazingaMode = document.getElementById('game-mode-bazinga').checked;
  const isSimulation = document.getElementById('simulate-cpu').checked;

  game.isSimulation = isSimulation;
  game.isBazingaMode = isBazingaMode;
  game.start();
  game.simulate();

  intervalId = setInterval(renderTime, 1000);

  game.scheduleEnd(CONST.THROW_TIMEOUT_IN_SECONDS, () => {
    renderWinner();
    clearUI();
  });

  renderInitialUI();
};

window.changeSelection = (selection) => {
  const selectedElement = document.querySelector('.icon-selected');
  const newSelectedElement = document.getElementById('selection-' + selection);
  if (selectedElement) {
    selectedElement.className = '';
    newSelectedElement.className = 'icon-selected';
  }
  game.makeSelection(2, selection);
};
