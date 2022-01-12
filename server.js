require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const routesReport = require('rowdy-logger').begin(app)

app.use(require('morgan')('tiny'))
app.use(require('cors')())
app.use(express.json())

const models = require('./models')

//routes

const signup = async (req,res)=> {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = await models.user.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            token: 0
        })

        const encryptedId = jwt.sign({userId: user.id}, process.env.JWT_SECRET)

        res.json({message: 'ok', user: encryptedId})
    }catch (err) { 
        console.log(err)
    }
}

app.post('/user/signup', signup)


const login = async (req,res) => {
    try {
        const user = await models.user.findOne({
            where: {
                email:req.body.email
            }
        })

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const encryptedId= jwt.sign({ userId: user.id}, process.env.JWT_SECRET)
            // res.json({message: 'login successful', user: user})
            res.json({message: 'login successful', user: encryptedId})
        }else {
            res.status(401)
            res.json({error: 'login failed'})
        }
    } catch(err) {
        console.log(err)
    }
}
app.post('/user/login', login)

const verify = async (req, res) => {
    try {
        const decryptedId = jwt.verify(req,headers.authorization, process.env.JWT_SECRET)

        const user = await models.user.findOne({
            where: {
                // id: req.headers.authorization
                id: decryptedId.userId
            }
        })
        if (user === null) {
            res.status(404).json({error: 'user not found'})
        } else {
            res.json({message: 'user looked up succesffully', user })
        }
    } catch (err) {
        console.log(err)
    }
}
app.get('/user/verify', verify)

const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

const scoreRoutes = require('./routes/scoreRoutes')
app.use('/score', userRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
    routesReport.print()
  })