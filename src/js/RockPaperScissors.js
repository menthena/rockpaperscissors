export default class RockPaperScissors {
  constructor() {
    this.isBazingaMode = false;
    this.isSimulation = true;
  }

  start() {
    this.setPlayers();
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
