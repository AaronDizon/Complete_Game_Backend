const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController')

//get user info
userRoutes.get('/:userId/info', userController.getInfo)

//get user skins
userRoutes.get('/:userId/getSkins', userController.getUserSkins)

//post score
userRoutes.post('/:userId/score', userController.postScore)

//edit username
userRoutes.put('/:userId', userController.editName)

//change token change
userRoutes.put('/:userId/changetoken', userController.changeToken)

//change token when rolling
userRoutes.put('/:userId/subtracttoken', userController.subtractToken)
// userRoutes.put('/:userId/changetoken', userController.changeToken)



module.exports = userRoutes