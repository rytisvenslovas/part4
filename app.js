const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Blog = require('./models/blog')
const blogsRouter = require('./controlers/blogs')
const usersRouter = require('./controlers/users')
const loginRouter = require('./controlers/login')
const config = require('./utils/config')
mongoose.set('useCreateIndex', true)
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })



app.use(cors())
app.use(express.json())
const tokenExtractor = (req, res, next) => {
    
    const authorization = req.get('authorization')
    const token = authorization && authorization.split(' ')[1].toString() 

    req.token = token
    next()
  }


app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



module.exports = app