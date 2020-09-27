const { v4: uuidv4 } = require('uuid');

const helper = require('./helper');

const { PLAYERS } = require('./constants');

let store = {};

const startGame = (req, res) => {
	const token = uuidv4();

	store[token] = helper.resetBoard();

	return res.json({status: 'READY', token: token});
}

const playerMove = (req, res) => {
	const body = req.body;

	const token = body.token;
	const turn = body.turn;
	const column = body.column;

	if (!token || !turn || !column) {
		return res.json({status: 'INVALID', error: 'Missing parameters'});
	}

	if (!store[token]) {
		return res.json({status: 'INVALID', error: 'Invalid token'});
	}

	if ((store[token]['count'] % 2) + 1  !== PLAYERS[turn]) {
		return res.json({status: 'INVALID', error: 'Wrong turn'});
	}

	if (store[token]['board'][0][column] !== 0) {
		return res.json({status: 'INVALID', error: 'Column full'});
	}

	helper.makeMove(store[token]['board'], turn, column);
	store[token]['count']++;

	if (helper.checkIfWin(store[token]['board'], turn)) {
		store[token] = helper.resetBoard();

		return res.json({status: `${turn} wins`});
	}

	return res.json({status: 'VALID'});
}

module.exports = {
	startGame,
	playerMove
}