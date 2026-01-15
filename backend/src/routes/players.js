const express = require('express');
const router = express.Router();
const playersController = require('../controllers/playersController');

// GET /api/players - Get all players (with optional sorting)
router.get('/', playersController.getAllPlayers);

// GET /api/players/:id - Get a single player
router.get('/:id', playersController.getPlayerById);

// PUT /api/players/:id - Update a player's stats
router.put('/:id', playersController.updatePlayer);

module.exports = router;
