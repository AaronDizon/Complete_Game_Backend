const models = require('../models')
const jwt = require('jsonwebtoken')
const userController = {}

userController.getInfo = async (req, res) => {

    const decryptedId = jwt.verify(req.params.userId, process.env.JWT_SECRET)
    const decryptedUserId = decryptedId.userId

    try {
        const user = await models.user.findOne({
            where: {
                id: decryptedUserId
            },
            include: models.score
        })
        res.json(user)
    } catch (err) {
        res.json(err)
    }
} 
userController.postScore = async (req, res) => {

    const decryptedId = jwt.verify(req.params.userId, process.env.JWT_SECRET)
    const decryptedUserId = decryptedId.userId

    try {
        const user = await models.user.findOne({
            where: {
                id: decryptedUserId
            }
        })
        const score = await models.score.create({
            score: req.body.score,
            date: req.body.date
        }) 

        await user.addScores(score)
        res.json(score)
    } catch (err) {
        res.json(err)
    }
} 

userController.editName = async (req, res) => {

    const decryptedId = jwt.verify(req.params.userId, process.env.JWT_SECRET)
    const decryptedUserId = decryptedId.userId

    try {
        const user = await models.user.findOne({
            where: {
                id: decryptedUserId
            }
        })

        // const newName = await user.update({
        //     username: req.body
        // })
        const update = req.body
        const updatedName = await user.update(update)
        res.json(updatedName)
    } catch (err) {

    }
}

userController.changeToken = async (req, res) => {
    
    const decryptedId = jwt.verify(req.params.userId, process.env.JWT_SECRET)
    const decryptedUserId = decryptedId.userId

    try {
        const user = await models.user.findOne({
            where: {
                id: decryptedUserId
            }
        })
        user.tokens = (parseInt(user.tokens) + parseInt(req.body.token))
        const update = (parseInt(user.tokens) + parseInt(req.body))
        res.json(update)
        // res.json(req.params)
    } catch (err) {
        res.json(err)
    }
}   

module.exports = userController