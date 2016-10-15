import RockPaperScissors from '../src/js/RockPaperScissors';
import CONST from '../src/js/constant';

describe('RockPaperScissors the game', () => {

	describe('New Game', () => {
		it('the user should be able to create a different mode of game', () => {
			const game = new RockPaperScissors();
			game.bazingaMode = true;
			expect(game.isBazingaMode).to.be.true;
		});

		it('the user should be able to change the game mode during the game', () => {
			const game = new RockPaperScissors();
			game.bazingaMode = false;
			expect(game.isBazingaMode).to.be.false;
			game.bazingaMode = true;
			expect(game.isBazingaMode).to.be.true;
		});

		it('by default the game mode should be normal', () => {
			const game = new RockPaperScissors();
			expect(game.isBazingaMode).to.be.false;
		});

		it('by default the simulation mode should be true', () => {
			const game = new RockPaperScissors();
			expect(game.isSimulation).to.be.true;
		});

		it('when the simulation is true, the players should be computers', () => {
			const game = new RockPaperScissors();
			game.start();
			expect(game.player1.isHuman).to.be.false;
			expect(game.player2.isHuman).to.be.false;
		});

		it('when the simulation is false, the second player should be human', () => {
			const game = new RockPaperScissors();
			game.simulation = false;
			game.start();
			expect(game.player1.isHuman).to.be.false;
			expect(game.player2.isHuman).to.be.true;
		});

	});

	describe('Options', () => {
		it('the game should give players options for the game', () => {
			const game = new RockPaperScissors();
			game.start();
			const options = game.getOptions();
			expect(options).not.to.be.undefined;
			expect(options.length).to.equal(3);
		});

		it('when the game is in bazinga mode, it should give different options', () => {
			const game = new RockPaperScissors();
			game.bazingaMode = true;
			game.start();
			const options = game.getOptions();
			expect(options).not.to.be.undefined;
			expect(options.length).to.equal(5);
		});
	});

	describe('Play', () => {
		it('Before making selection, the player`s selection should be rock', () => {
			const game = new RockPaperScissors();
			game.start();
			const player1 = game.getPlayer(1);
			expect(player1.selection).to.equal(CONST.ROCK);

			const player2 = game.getPlayer(2);
			expect(player2.selection).to.equal(CONST.ROCK);
		});

		it('When the player makes a selection, the game should save it', () => {
			const game = new RockPaperScissors();
			game.start();
			const player1 = game.getPlayer(1);
			game.makeSelection(1, 0);
			expect(player1.selection).to.be.defined;

			const player2 = game.getPlayer(2);
			game.makeSelection(1, 0);
			expect(player2.selection).to.be.defined;
		});

		it('When the players both throw their selection, their selections reset', () => {
			const game = new RockPaperScissors();
			game.start();
			const player2 = game.getPlayer(2);
			game.makeSelection(2, CONST.PAPER);
			expect(player2.selection).to.equal(CONST.PAPER);
		});

	});

	describe('Rules', () => {
		it('Should be resulted as tie when both players select the same', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.PAPER);
			game.makeSelection(2, CONST.PAPER);
			game.play();
			expect(game.winner).to.be.undefined;
		});

		it('Paper against rock should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.PAPER);
			game.makeSelection(2, CONST.ROCK);
			game.play();
			expect(game.winner).to.equal(1);
		});

		it('Paper against spock should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.SPOCK);
			game.makeSelection(2, CONST.PAPER);
			game.play();
			expect(game.winner).to.equal(2);
		});

		it('Rock against scissors should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.ROCK);
			game.makeSelection(2, CONST.SCISSORS);
			game.play();
			expect(game.winner).to.equal(1);
		});

		it('Rock against lizard should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.ROCK);
			game.makeSelection(2, CONST.LIZARD);
			game.play();
			expect(game.winner).to.equal(1);
		});

		it('Scissors against paper should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.SCISSORS);
			game.makeSelection(2, CONST.PAPER);
			game.play();
			expect(game.winner).to.equal(1);
		});

		it('Scissors against lizard should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.SCISSORS);
			game.makeSelection(2, CONST.LIZARD);
			game.play();
			expect(game.winner).to.equal(1);
		});

		it('Lizard against paper should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.LIZARD);
			game.makeSelection(2, CONST.PAPER);
			game.play();
			expect(game.winner).to.equal(1);
		});

		it('Lizard against spock should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.LIZARD);
			game.makeSelection(2, CONST.SPOCK);
			game.play();
			expect(game.winner).to.equal(1);
		});

		it('Spock against rock should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.SPOCK);
			game.makeSelection(2, CONST.ROCK);
			game.play();
			expect(game.winner).to.equal(1);
		});

		it('Spock against scissors should win', () => {
			const game = new RockPaperScissors();
			game.start();
			game.makeSelection(1, CONST.SPOCK);
			game.makeSelection(2, CONST.SCISSORS);
			game.play();
			expect(game.winner).to.equal(1);
		});
	});

});
