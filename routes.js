const express = require('express')
const router = express.Router()

const handler = require('./handler');

router.post('/start', handler.startGame);

router.put('/move', handler.playerMove);

module.exports = router