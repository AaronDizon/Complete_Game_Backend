const models = require('../models')
const userController = {}

userController.getInfo = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.params.userId
            },
            include: models.score
        })
        res.json(user)
    } catch (err) {
        res.json(err)
    }
} 
userController.postScore = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.params.userId
            }
        })
        const score = await models.score.create({
            description: req.body.score,
            date: req.body.date
        }) 

        await user.addScores(score)
        res.json(score)
    } catch (err) {
        res.json(err)
    }
} 

userController.editName = async (req, res) => {
    try {
        const user = await models.user.findOne({
            where: {
                id: req.params.userId
            }
        })

        const newName = await user.update({
            name: req.body
        })
        // const update = req.body
        // const updatedName = await user.update(update)
        res.json(newName)
    } catch (err) {

    }
}

module.exports = userController