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

userController.getUserSkins = async (req, res) => {

    const decryptedId = jwt.verify(req.params.userId, process.env.JWT_SECRET)
    const decryptedUserId = decryptedId.userId

    try {
        const user = await models.user.findOne({
            where: {
                id: decryptedUserId
            },
            include: models.skin
        })

        const skinsArray = []
        for (let i = 0 ; i < user.skins.length; i++){
            skinsArray.push({"name": user.skins[i].name, "color": user.skins[i].color})
        }
        res.json(skinsArray)
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

userController.subtractToken = async (req, res) => {
    
    const decryptedId = jwt.verify(req.params.userId, process.env.JWT_SECRET)
    const decryptedUserId = decryptedId.userId

    const randomNum = Math.floor((Math.random()) * (8))+1

    try {
        const user = await models.user.findOne({
            where: {
                id: decryptedUserId
            }, 
            include: models.skin
        })

        const skin = await models.skin.findOne({
            where:{
                id: randomNum
            }
        })

        const userSkinIds=[]
        for (let i = 0; i < user.skins.length; i++){
            userSkinIds.push(user.skins[i].id)
        }

       let update=''
       let message=''
        
        // res.json (userSkinIds)
        if (userSkinIds.includes(skin.id)) {
            update = {"tokens": `${parseInt(user.tokens-5)}`}
            message = `You have this skin already :( , you get a 5 token refund!`
        } else {
            update = {"tokens": `${parseInt(user.tokens-10)}`}
            user.addSkins(skin)
            message =`You got ${skin.name}!`
        }

        const updateTokens = await user.update(update)
        res.json({"message": message, "skin": skin, "updateTokens": updateTokens})

    } catch (err) {
        res.json(err)
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
        const update = {"tokens": `${parseInt(user.tokens+1)}`}
        const updateTokens = await user.update(update)
        res.json(updateTokens)

    } catch (err) {
        res.json(err)
    }
}   

module.exports = userController

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY0MjEzMDM0Nn0.t2XubeKVbfLmhyVZ3SMxsOyDQWKwalF7RWwfgL_eGtQ

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY0MjEzNTI1NX0.4t9KZytr-6-e0rWnr7X4Wk30vFq_kr9WgcWz10uFuzU