import CONST from './constant';

export default class RockPaperScissors {
  constructor() {
    this.isBazingaMode = false;
    this.isSimulation = true;
    this.normalOptions = [CONST.ROCK, CONST.PAPER, CONST.SCISSORS];
    this.bazingaOptions = [...this.normalOptions, CONST.LIZARD, CONST.SPOCK];
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

  makeSelection(playerIndex, optionIndex) {
    const player = this.getPlayer(playerIndex);
    player.selection = optionIndex;
  }

  getPlayer(index) {
    return this['player' + index];
  }

  setPlayers() {
    this.player1 = {
      isHuman: false
    };
    this.player2 = {
      isHuman: false
    };
    if (!this.isSimulation) {
      this.player2.isHuman = true;
    }
  }

  set simulation(isSimulation) {
    this.isSimulation = isSimulation;
  }

  set bazingaMode(isBazingaMode) {
    this.isBazingaMode = isBazingaMode;
  }
}
