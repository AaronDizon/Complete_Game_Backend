const express = require('express');
const scoreRoutes = express.Router();
const scoreController = require('../controllers/scoreController')

//get all the scores
scoreRoutes.get('/all', scoreController.getScores)

module.exports = scoreRoutes