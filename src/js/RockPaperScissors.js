import CONST from './constant';

export default class RockPaperScissors {
  constructor() {
    this.timeLeft = 0;
    this.isBazingaMode = false;
    this.isSimulation = true;
    this.normalOptions = [CONST.ROCK, CONST.PAPER, CONST.SCISSORS];
    this.bazingaOptions = [...this.normalOptions, CONST.LIZARD, CONST.SPOCK];
    this.winningScenarios = {
      [CONST.ROCK]: [CONST.SCISSORS, CONST.LIZARD],
      [CONST.PAPER]: [CONST.ROCK, CONST.SPOCK],
      [CONST.SCISSORS]: [CONST.PAPER, CONST.LIZARD],
      [CONST.LIZARD]: [CONST.PAPER, CONST.SPOCK],
      [CONST.SPOCK]: [CONST.ROCK, CONST.SCISSORS]
    };
  }

  /** Starts the game
    */
  start() {
    this.reset();
    this.inProgress = true;
    this.setPlayers();
  }

  /** Player's options to play
    * (On bazinga moda) returns different option
    * @returns {Array} Options
    */
  getOptions() {
    if (this.isBazingaMode) {
      return this.bazingaOptions;
    }
    return this.normalOptions;
  }

  /** Lets player to make a choice
    * @param {Number} playerIndex
    * @param {String} option
    */
  makeSelection(playerIndex, option) {
    const player = this.getPlayer(playerIndex);
    player.selection = option;
  }

  /** Returns the player object by index
    * @param {Number} index
    * @returns {Object} Player
    */
  getPlayer(index) {
    return this['player' + index];
  }

  /** Returns human-friendly text
    * @param {Number} index
    * @returns {String} text
    */
  getPlayerText(index) {
    const player = this.getPlayer(index);
    if (player.isHuman) {
      return 'You'
    } else {
      return 'CPU';
    }
  }

  /** Verifies whether first player won or not
    * @param {String} firstPlayerSelection
    * @param {String} secondPlayerSelection
    * @returns {Boolean} isFirstPlayerWinner
    */
  isFirstPlayerWinner(firstPlayerSelection, secondPlayerSelection) {
    for (let index in this.winningScenarios) {
      let ruleMatchesSelection = index === firstPlayerSelection;
      let isWinningScenario = this.winningScenarios[index].includes(secondPlayerSelection);
      if (ruleMatchesSelection && isWinningScenario) {
        return true;
      }
    }
  }

  /** Sets players of the game
    */
  setPlayers() {
    this.player1 = {
      isHuman: false
    };
    this.player2 = {
      isHuman: false
    };
    if (!this.isSimulation) {
      this.player2 = {
        isHuman: true,
        selection: CONST.ROCK
      }
    }
  }

  /** Returns player's selection
    * @param {Number} playerIndex
    * @returns {Obbject} selection
    */
  getPlayerSelection(playerIndex) {
    let player = this.getPlayer(playerIndex);
    return player.selection;
  }

  /** Returns one random selection
    * @returns {String} randomSelection
    */
  getRandomSelection() {
    let options = this.getOptions();
    let randomIndex = Math.round(Math.random() * (options.length - 1));
    return options[randomIndex];
  }

  /** Simulates a selection
    */
  simulate() {
    [1, 2].forEach((playerIndex) => {
      let player = this.getPlayer(playerIndex);
      if (!player.isHuman) {
        player.selection = this.getRandomSelection();
      }
    });
  }

  /** Returns the time left for players to play the game
    * @returns {Number} timeleftInSeconds
    */
  get timeleft() {
    if (!this.timeLeft) {
      return CONST.THROW_TIMEOUT_IN_SECONDS;
    } else {
      const now = new Date();
      return Math.ceil((this.timeLeft - now) / 1000);
    }
  }

  /** Schedules the end method and updates the time left
    * @param {Number} timeoutInSeconds
    * @param {Function} callback
    */
  scheduleEnd(timeoutInSeconds, cb) {
    const now = new Date();
    this.timeLeft = now.setSeconds(now.getSeconds() + timeoutInSeconds);
    setTimeout(() => {
      this.end();
      if (cb) {
        cb();
      }
    }, timeoutInSeconds * 1000);
  }

  /** Ends the game
    */
  end() {
    let firstPlayerSelection = this.getPlayerSelection(1);
    let secondPlayerSelection = this.getPlayerSelection(2);

    if (firstPlayerSelection === secondPlayerSelection) {
      this.winner = undefined;
    } else if (this.isFirstPlayerWinner(firstPlayerSelection, secondPlayerSelection)) {
      this.winner = 1;
    } else {
      this.winner = 2;
    }
    this.reset();
  }

  /** Reset game parameters
    */
  reset() {
    this.inProgress = false;
    this.timeLeft = undefined;
  }

  set simulation(isSimulation) {
    this.isSimulation = isSimulation;
  }

  set bazingaMode(isBazingaMode) {
    this.isBazingaMode = isBazingaMode;
  }
}
