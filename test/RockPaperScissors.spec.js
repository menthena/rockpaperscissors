import RockPaperScissors from '../src/js/RockPaperScissors';

describe('RockPaperScissors the game', () => {

	describe('New Game', () => {
		it('the user should be able to create a different mode of game', () => {
			const game = new RockPaperScissors();
			game.setBazingaMode(true);
			expect(game.bazingaMode).to.be.true;
		});

		it('the user should be able to change the game mode during the game', () => {
			const game = new RockPaperScissors();
			game.setBazingaMode(false);
			expect(game.bazingaMode).to.be.false;
			game.setBazingaMode(true);
			expect(game.bazingaMode).to.be.true;
		});

		it('by default the game mode should be normal', () => {
			const game = new RockPaperScissors();
			expect(game.bazingaMode).to.be.false;
		});
	});

});
