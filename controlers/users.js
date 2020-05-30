const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const objectId = require('mongodb').ObjectID

usersRouter.get('/', async (req , res )=> {
    const users = await User.find({}).populate('blogs',{url:1,title:1,author:1})
    res.json(users.map(user=> user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
    const body = req.body
    if(body.password.length >= 3){
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
        const user = new User ({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        const savedUser = await user.save()
        res.json(savedUser)
    }else {
        console.log('---->Password must contain 3 characters')
        res.status(400).json({ error: 'password must contain 3 characters' })
    }
    
})

module.exports = usersRouter