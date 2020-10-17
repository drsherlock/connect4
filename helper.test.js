
describe('testing helpers', () => {

	beforeEach(() => jest.resetModules());

	describe('reset board', () => {
		test('with default constants', () => {
			const game = {
				board: [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0]
				],
				count: 0
			};

			const helper = require('./helper');
			expect(helper.resetBoard()).toEqual(game);
		});

		test('reset board', () => {
			const game = {
				board: [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				],
				count: 0
			};	

			jest.mock("./constants", () => ({ ROWS: 4, COLUMNS: 4 }));

			const helper = require('./helper');
			expect(helper.resetBoard()).toEqual(game);
		});

		test('reset board', () => {
			const game = {
				board: [
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0]
				],
				count: 0
			};	

			jest.mock("./constants", () => ({ ROWS: 4, COLUMNS: 5 }));

			const helper = require('./helper');
			expect(helper.resetBoard()).toEqual(game);
		});
	});
});