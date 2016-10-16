require('../css/main.scss');

import RockPaperScissors from './RockPaperScissors';

const gameCustomizationElement = document.getElementById('game-customization');
const gameElement = document.getElementById('game');
const resetButtonElement = document.getElementById('reset-game');

function displayGameCustomization() {
  gameCustomizationElement.setAttribute('aria-hidden', false);
  gameElement.setAttribute('aria-hidden', true);
}

function displayGame() {
  gameCustomizationElement.setAttribute('aria-hidden', true);
  gameElement.setAttribute('aria-hidden', false);
  resetButtonElement.setAttribute('aria-hidden', false);
}

window.resetGame = () => {
  console.log('Reset...');
};

window.startGame = () => {
  displayGame();

  const isBazingaMode = document.getElementById('game-mode-bazinga').checked;
  const isSimulation = document.getElementById('simulate-cpu').checked;
  console.log(isBazingaMode, isSimulation);
  let game = new RockPaperScissors();
  console.log(game);
};

window.newGame = () => {
  displayGameCustomization();
};
