
describe('testing helpers', () => {

	beforeEach(() => {
	    jest.unmock("./constants");
	    jest.resetModules();
	});

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

		test('with mocked constants 1', () => {
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

		test('with mocked constants 2', () => {
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

	describe('make move', () => {
		const testBoard = [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0]
				];

		const helper = require('./helper');

		test('player 1 move', () => {
			const expectedBoard = [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[1, 0, 0, 0, 0, 0, 0]
				];

			helper.makeMove(testBoard, 'YELLOW', 0);
			expect(testBoard).toEqual(expectedBoard);
		});

		test('player 2 move', () => {
			const expectedBoard = [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[1, 2, 0, 0, 0, 0, 0]
				];

			helper.makeMove(testBoard, 'RED', 1);
			expect(testBoard).toEqual(expectedBoard);
		});
	});

	describe('check if win', () => {
		test('player 1 does not win', () => {
			const board = [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0]
				];

			const helper = require('./helper');

			expect(helper.checkIfWin(board, 'YELLOW')).toBe(false);

		});

		test('player 2 win', () => {
			const board = [
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0],
					[2, 2, 2, 2, 0, 0, 0]
				];

			const helper = require('./helper');

			expect(helper.checkIfWin(board, 'RED')).toBe(true);

		});
	});
});