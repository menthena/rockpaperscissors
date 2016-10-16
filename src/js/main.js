require('../css/main.scss');

import RockPaperScissors from './RockPaperScissors';
import CONST from './constant';

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
const timerElement = document.getElementById('timer');

/** GameUIWrapper
  * Please note that, the focus was on RockPaperScissors class
  * Purpose of this wrapper to bind the game onto view
  * Since there was no frameworks to be used, I had to bind 3 methods to DOM
  */
class GameUIWrapper {
  constructor() {
    this.game = new RockPaperScissors();
  }

  /** Hides certain elements on the view
    */
  clearUI() {
    timerElement.innerText = '';
    player2OptionsWrapper.setAttribute('aria-hidden', true);
    resetButtonElement.removeAttribute('disabled');
    clearInterval(this.intervalId);
  }

  /** Renders time remaining on play screen
    *
    */
  renderTime() {
    timerElement.innerText = this.game.timeleft + 's';
  }

  /** Renders the game screen
    */
  renderGameScreen() {
    gameCustomizationElement.setAttribute('aria-hidden', true);
    gameElement.setAttribute('aria-hidden', false);
    resetButtonElement.setAttribute('disabled', true);
    resetButtonElement.setAttribute('aria-hidden', false);
    if (!this.game.isSimulation) {
      this.renderOptions();
    }
    this.renderTime();

    player2NameElement.innerText = this.game.getPlayerText(2);
    player1NameElement.innerText = this.game.getPlayerText(1);
  }

  /** Renders player's options
    */
  renderOptions() {
    const options = this.game.getOptions();
    let html = '';
    options.forEach((option) => {
      let defaultSelection = ((option === 'Rock') ? 'class="icon-selected"' : '');
      html += '<a id="selection-' + option + '" onclick="changeSelection(\'' + option + '\')"' +
        defaultSelection + '><i class="sprites icon-' + option + '"></i></a>';
    });
    player2OptionsWrapper.setAttribute('aria-hidden', false);

    player2Options.innerHTML = html;
  }

  /** Renders the winner of the game
    */
  renderWinner() {
    player1SelectionElement.className = 'sprites icon-' + this.game.getPlayerSelection(1);
    player2SelectionElement.className = 'sprites icon-' + this.game.getPlayerSelection(2);

    if (!this.game.winner) {
      winnerElement.innerText = 'It is a tie!';
    } else {
      winnerElement.innerText = 'Player ' + this.game.winner + ' wins!';
    }
  }

  /** Lets player to play again or re-run the simulation
    */
  resetGame() {
    if (!this.game.inProgress) {
      player1SelectionElement.className = player2SelectionElement.className = '';
      winnerElement.innerText = '';
      this.startGame();
    }
  }

  /** Starts the game based on customization
    */
  startGame() {
    const isBazingaMode = document.getElementById('game-mode-bazinga').checked;
    const isSimulation = document.getElementById('simulate-cpu').checked;

    this.game.isSimulation = isSimulation;
    this.game.isBazingaMode = isBazingaMode;
    this.game.start();
    this.game.simulate();

    this.intervalId = setInterval(this.renderTime.bind(this), 1000);

    this.game.scheduleEnd(CONST.THROW_TIMEOUT_IN_SECONDS, () => {
      this.renderWinner();
      this.clearUI();
    });

    this.renderGameScreen();
  }

  /** Lets player to change the selection
    */
  changeSelection(selection) {
    const selectedElement = document.querySelector('.icon-selected');
    const newSelectedElement = document.getElementById('selection-' + selection);
    if (selectedElement) {
      selectedElement.className = '';
      newSelectedElement.className = 'icon-selected';
    }
    this.game.makeSelection(2, selection);
  }

  /** Binds methods to DOM
    */
  bindToDOM() {
    window.changeSelection = this.changeSelection.bind(this);
    window.resetGame = this.resetGame.bind(this);
    window.startGame = this.startGame.bind(this);
  }

}

const UIWrapper = new GameUIWrapper();
UIWrapper.bindToDOM();
