import RockPaperScissors from '../src/js/RockPaperScissors';

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

});
