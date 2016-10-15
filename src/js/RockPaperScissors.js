import CONST from './constant';

export default class RockPaperScissors {
  constructor() {
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

  start() {
    this.setPlayers();
  }

  getOptions() {
    if (this.isBazingaMode) {
      return this.bazingaOptions;
    }
    return this.normalOptions;
  }

  makeSelection(playerIndex, option) {
    const player = this.getPlayer(playerIndex);
    player.selection = option;
  }

  getPlayer(index) {
    return this['player' + index];
  }

  isFirstPlayerWinner(firstPlayerSelection, secondPlayerSelection) {
    for (let index in this.winningScenarios) {
      let ruleMatchesSelection = index === firstPlayerSelection;
      let isWinningScenario = this.winningScenarios[index].includes(secondPlayerSelection);
      if (ruleMatchesSelection && isWinningScenario) {
        return true;
      }
    }
  }

  setPlayers() {
    this.player1 = {
      isHuman: false,
      selection: CONST.ROCK
    };
    this.player2 = {
      isHuman: false,
      selection: CONST.ROCK
    };
    if (!this.isSimulation) {
      this.player2.isHuman = true;
    }
  }

  getPlayerSelection(playerIndex) {
    let player = this.getPlayer(playerIndex);
    return player.selection;
  }

  play() {
    let firstPlayerSelection = this.getPlayerSelection(1);
    let secondPlayerSelection = this.getPlayerSelection(2);

    if (firstPlayerSelection === secondPlayerSelection) {
      this.winner = undefined;
    } else if (this.isFirstPlayerWinner(firstPlayerSelection, secondPlayerSelection)) {
      this.winner = 1;
    } else {
      this.winner = 2;
    }
  }

  set simulation(isSimulation) {
    this.isSimulation = isSimulation;
  }

  set bazingaMode(isBazingaMode) {
    this.isBazingaMode = isBazingaMode;
  }
}
