const models = require('../models')
const scoreController = {}

scoreController.getScores = async (req, res) => {
    try {
        const scores = await models.score.findAll({
            include: models.user
        })
        res.json(scores)
    } catch (err) {
        res.json(err)
    }
}

module.exports = scoreController