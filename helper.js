const { WIN_COUNT, ROWS, COLUMNS, PLAYERS } = require('./constants');

const resetBoard = () => {
	const game = {};
	game['board'] = new Array(ROWS).fill(0).map(() => new Array(COLUMNS).fill(0));
	game['count'] = 0;

	return game;
}

const makeMove = (board, turn, column) => {
	for (let row = ROWS-1; row >= 0; row--) {
		if (board[row][column] === 0) {
			board[row][column] = PLAYERS[turn];

			return;
		}
	}
}

const checkIfWin = (board, turn) => {
	// check horizontal
	for (let row = 0; row < ROWS; row++) {
		let count = 0
		for (let column = 0; column < COLUMNS; column++) {
			if (board[row][column] !== PLAYERS[turn]) {
				count = 0;
			}
			else {
				count++;
			}

			if (count === WIN_COUNT) {
				return true;
			}
		}
	}

	// check vertical
	for (let column = 0; column < COLUMNS; column++) {
		let count = 0
		for (let row = 0; row < ROWS; row++) {
			if (board[row][column] !== PLAYERS[turn]) {
				count = 0;
			}
			else {
				count++;
			}

			if (count === WIN_COUNT) {
				return true;
			} 
		}
	}

	// check diagnol
	for (let row = ROWS-1; row >= 0; row--) {
		for (let column = 0; column < COLUMNS; column++) {
			if (board[row][column] == PLAYERS[turn]) {
				let i = row, j = column, count = 0;
				while (true) {
					i--;
					j--;

					if (board[i][j] !== PLAYERS[turn]) {
						break;
					}
					else {
						count++;
					}

					if (count === WIN_COUNT) {
						return true;
					}
				}

				i = row, j = column, count = 0;
				while (true) {
					i--;
					j++;

					if (board[i][j] !== PLAYERS[turn]) {
						break;
					}
					else {
						count++;
					}

					if (count === WIN_COUNT) {
						return true;
					}
				}
			}
		}
	}

	return false;
}

module.exports = {
	resetBoard,
	makeMove,
	checkIfWin,
}