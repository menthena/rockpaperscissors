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

  makeSelection(playerIndex, option) {
    const player = this.getPlayer(playerIndex);
    player.selection = option;
  }

  getPlayer(index) {
    return this['player' + index];
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

  play() {

  }

  set simulation(isSimulation) {
    this.isSimulation = isSimulation;
  }

  set bazingaMode(isBazingaMode) {
    this.isBazingaMode = isBazingaMode;
  }
}
