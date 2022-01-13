const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController')

//get user info
userRoutes.get('/:userId/info', userController.getInfo)

//post score
userRoutes.post('/:userId/score', userController.postScore)

//edit username
userRoutes.put('/:userId', userController.editName)

//edite tokens
userRoutes.put(':userId/addtoken', userController.addToken)

module.exports = userRoutes